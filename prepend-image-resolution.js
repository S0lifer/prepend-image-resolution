const path = require('path')
const fs = require('fs')
const sizeOf = require('image-size')
const FileType = require('file-type')
const imageFolder = process.argv[2]
if(imageFolder === undefined) {
  console.log('no folder of images was supplied')
  process.exit(1)
}

if (fs.existsSync(imageFolder) === false) {
  console.log('folder not found')
  process.exit(1)
}

;(async () => {
async function getAllFiles (dirPath, arrayOfFiles) {
  let files = []
  const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png']

  try {
      files = fs.readdirSync(dirPath)
  } catch (err) {
      console.log('Unable to scan directory: ' + err)
      process.exit(1)
  }

  arrayOfFiles = arrayOfFiles || []

  for (const file of files) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      const type = await FileType.fromFile(path.join(__dirname, dirPath, "/", file))
      if (file && type && acceptedImageTypes.includes(type.mime)) {
         const dimensions = sizeOf(path.join(__dirname, dirPath, "/", file))
          const oldPath = path.join(__dirname, dirPath, "/", file)
          const newPath = path.join(__dirname, dirPath, "/", dimensions.width + 'x'+ dimensions.height + '_' + file)
          if (!file.includes(dimensions.width + 'x'+ dimensions.height + '_')) {
            fs.renameSync(oldPath, newPath)
          }
      }
    }
  }

  return arrayOfFiles 
}

const results = await getAllFiles(imageFolder)
})()