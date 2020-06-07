const config = require('./config');
const { Utils } = require('./src/utils');
const { Folder } = require('./src/folder');
const { Bible } = require('./src/bible');
const { Generator } = require('./src/generator');
const { Fb } = require('./src/fb');
var express = require('express');

var app = express();
app.use('/public', express.static('out'));
const generator = new Generator();
const fb = new Fb();

(async () => {
  //const names = await Folder.getImages();
  //const bible = new Bible();
  //const message = await bible.findPasage('Filipenses 4:13');
  //const generator = new Generator();
  //generator.generate(names[Utils.getRandom(0, [1,2,3,4,5].length)], { title: message.pasaje, subTitle: message.versiculo });
  //console.log(message);
  //console.log(names);
})();

const books = 'Gn, Ex, Lv, Nm, Dt, Jos, Jue, Rt, 1 S, 2 S, 1 R, 2 R, 1 Cr, 2 Cr, Esd, Neh, Est, Job, Sal, Pr, Ec, Cnt, Is, Jer, Lm, Ez, Dn, Os, Jl, Am, Abd, Jon, Mi, Nah, Hab, Sof, Hag, Zac, Mal, Mt, Mr, Lc, Jn, Hch, Ro, 1 Co, 2 Co, Ga, Ef, Fil, Col, 1 Ts, 2 Ts, 1 Ti, 2 Ti, Tit, Flm, He, Stg, 1 P, 2 P, 1 Jn, 2 Jn, 3 Jn, Jud, Ap.'

app.get('/', function (req, res) {
  res.send(books);
});

app.get('/post', async (req, res) => {
  console.log(req.query);
  const pasaje = req.query.pasaje;
  if (!pasaje) {
    return res.json(books);
  }
  try {
    const names = await Folder.getImages();
    const bible = new Bible();
    const message = await bible.findPasage(pasaje);
    const image = await generator.generate(names[Utils.getRandom(0, [1,2,3,4,5].length)], { title: message.pasaje, subTitle: message.versiculo });
    console.log(image);
    const answer = await fb.publishImage(image);
    res.json(answer);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

app.listen(10000, function () {
  console.log('Example app listening on port 10000!');
});

// https://developers.facebook.com/docs/pages/access-tokens