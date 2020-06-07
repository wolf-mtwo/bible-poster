const { Utils } = require('./utils');
const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(1920, 1080);
const ctx = canvas.getContext('2d');
const cty = canvas.getContext('2d');
const fs = require('fs');
const { v4 } = require('uuid');

class Generator {
  generate(image, data) {
    loadImage(`assets/${image}`)
    .then((background_image) => {
      loadImage('assets/transparent.png')
      .then((transparent) => {
      ctx.drawImage(background_image, 0, 0, 1920, 1080)
      ctx.drawImage(transparent, 0, 0, 1920, 1080)

      var gradient = ctx.createLinearGradient(0, 0, 500, 0);
      gradient.addColorStop(0, '#fff');
      gradient.addColorStop(0.5, '#fff');
      gradient.addColorStop(1.0, '#fff');

      //ctx.font = '150px Comic Sans MS';
      ctx.font = '150px Verdana';
      ctx.textAlign = 'center';
      ctx. textBaseline = 'middle';
      ctx.fillStyle = gradient;
      //ctx.scale(5,5);
      const e = Utils.getlines(ctx, `${data.title}`, canvas.width / 2, canvas.height / 2, 1800, 150);
      Utils.wrapText(ctx, `${data.title}`, canvas.width / 2, (canvas.height / 2) - ((e / 2) * 150), 1800, 150);

      cty.textAlign = 'center';
      cty.font = 'bold 70px Monospace';
      cty.fillText(`(${data.subTitle})`, canvas.width / 2, canvas.height - 50);

      let base64Image = canvas.toDataURL().split(';base64,').pop();
      fs.writeFile(`out/${v4()}.png`, base64Image, {encoding: 'base64'}, function(err) {
          console.log('File created');
      });
      })
    });
  }
}

module.exports = { Generator };