const fs = require('fs');

class Folder {
  static getImages() {
    return new Promise((resolve, reject) => {
      const names = [];
      fs.readdir('./assets/', (err, files) => {
        files.forEach((file) => {
          names.push(file);
        });
        resolve(names);
      });
    });
  }
}

//console.log(getDirectories('./assets'));

module.exports = { Folder };