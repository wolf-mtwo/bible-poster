const config = require('./config');

const { Utils } = require('./src/utils');
const { Folder } = require('./src/folder');
const { Bible } = require('./src/bible');
const { Generator } = require('./src/generator');

(async () => {
  const names = await Folder.getImages();
  //const bible = new Bible();
  //const message = await bible.findPasage('Filipenses 4:13');
  //const generator = new Generator();
  //generator.generate(names[Utils.getRandom(0, [1,2,3,4,5].length)], { title: message.pasaje, subTitle: message.versiculo });
  console.log(message);
  //console.log(names);
})();
