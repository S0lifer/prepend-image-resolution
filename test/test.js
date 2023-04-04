const assert = require('chai').assert
const expect = require('chai').expect
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { stdout } = require('process')

describe('prepend-image-resolution tests', function () {
  it('app has been supplied with nothing', function (done) {
    exec('node prepend-image-resolution.js', (error, stdout, stderr) => {
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
      }
      expect(stdout).to.include('no folder of images was supplied')
      done()
    })
  })

  it('app should check if supplied file exists', function (done) {
    exec('node prepend-image-resolution.js cat', (error, stdout, stderr) => {
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
      }
      expect(stdout).to.include('folder not found')
      done()
    })
  })

  //this test is going to check for dimensions on file name
  /*it('app should check if dimensions were added to file name', function (done) {
    exec('node prepend-image-resolution.js images', (error, stdout, stderr) => {
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
      }
      expect(stdout).to.include('')
      done()
    })
  })*/
})
