const FormData = require('form-data');
const axios = require('axios').default;
const cheerio = require('cheerio');

class Bible {
  findPasage(pasaje) {
    var bodyFormData = new FormData();
    bodyFormData.append('pasaje', pasaje);
    bodyFormData.append('version[]', 'rv95');
    //bodyFormData.append('version[]', 'rv60');
    bodyFormData.append('singup', '');
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: 'https://www.biblia.es/biblia-buscar-pasajes.php',
        data: bodyFormData,
        headers: {
          'content-type': `multipart/form-data; boundary=${bodyFormData._boundary}`
        }
      })
      .then((response) => {
        const $ = cheerio.load(response.data);
        const regex = new RegExp(/"([^"]*)"|'([^']*)'/g,'i');
        resolve({
          pasaje: regex.exec($('.col_i_1_int_1 h5').text())[1],
          versiculo: $('.caja_980 h1').text().split(' - ')[1]
        });
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
}

module.exports = { Bible };
