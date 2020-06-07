const config = require('../config');
const axios = require('axios').default;

class Fb {
  publishImage(image) {
    return new Promise((resolve, reject) => {
      const data = {
          url: `${config.server}/public/${image}`,
          access_token: config.token
      };
      axios.post(
        `https://graph.facebook.com/shekinahclub21/photos?url=${data.url}&access_token=${data.access_token}`
      )
      .then((response) => {
        console.log(response);
        resolve({
          success: data.url
        });
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = { Fb };
