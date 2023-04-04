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
      expect(stdout).to.include('please supply valid image type')
      done()
    })
  })
})
