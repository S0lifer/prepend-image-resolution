const assert = require('chai').assert
const expect = require('chai').expect
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { stdout } = require('process')

describe('prepend-image-resolution tests', function () {
  it('should quit if supplied with nothing', function (done) {
    exec('node prepend-image-resolution.js', (error, stdout, stderr) => {
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
      }
      expect(stdout).to.include('no folder of images was supplied')
      done()
    })
  })

  it('should quit if supplied with something other than a folder', function (done) {
    exec('node prepend-image-resolution.js package.json', (error, stdout, stderr) => {
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
      }
      expect(stdout).to.include('Unable to scan directory:')
      done()
    })
  })

  it('app should check if supplied folder exists', function (done) {
    exec('node prepend-image-resolution.js cat', (error, stdout, stderr) => {
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
      }
      expect(stdout).to.include('folder not found')
      done()
    })
  })

  

  it('app should check if dimensions were added to file name', function (done) {
    exec('node prepend-image-resolution.js images', (error, stdout, stderr) => {
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
      }
      const donutOne = fs.existsSync('images')
      const donutTwo = fs.existsSync('images')
      const pumpkins = fs.existsSync('images/sub-image')
      assert.equal(pumpkins, true)
      assert.equal(donutTwo, true)
      assert.equal(donutOne, true)
      fs.renameSync('images/sub-image/347x200_Pumpkins.jpeg','images/sub-image/Pumpkins.jpeg')
      fs.renameSync('images/360x360_Donut2.jpeg', 'images/Donut2.jpeg')
      fs.renameSync('images/455x360_Donut1.jpeg', 'images/Donut1.jpeg')
      done()
    })
  })
})