var CryptoJS = require("crypto-js");
const config = require('config');
var SecretKey = 'cae7b808-8b1e-4f47-87a5-1a4b6a08030e'

module.exports = {

  encrypt(json) {
    if(config.encResponse){
      // let encrypted = CryptoJS.TripleDES.encrypt(JSON.stringify(json), SecretKey).toString();
      // let encrypted = CryptoJS.DES.encrypt(JSON.stringify(json), SecretKey).toString();
      // let encrypted = CryptoJS.RC4.encrypt(JSON.stringify(json), SecretKey).toString();
      let encrypted = CryptoJS.AES.encrypt(JSON.stringify(json), SecretKey).toString();
      return {'data': encrypted}
    }else{
      return json
    }
  },

  decrypt(string) {
    if(config.encResponse){
      // var bytes = CryptoJS.TripleDES.decrypt(string.data, SecretKey);
      // var bytes = CryptoJS.DES.decrypt(string.data, SecretKey);
      // var bytes = CryptoJS.RC4.decrypt(string.data, SecretKey);
      var bytes = CryptoJS.AES.decrypt(string.data, SecretKey);
      return JSON.parse(bytes.toString(CryptoJS['enc']['Utf8']));
    }else{
      return string
    }
  },

  prepareResponse(res, s_token_key) {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(res),
      s_token_key
    ).toString();

    return encrypted
  }

}