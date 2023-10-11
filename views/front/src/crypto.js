var CryptoJS = require("crypto-js");
var SecretKey = '1234567890123456'

export default {
    
    encrypt_token(data) {
      var key = CryptoJS.enc.Utf8.parse(SecretKey);
      var iv = CryptoJS.enc.Utf8.parse("AAAAAAAAAAAAAAAA") //CryptoJS.lib.WordArray.random(16);
   
      var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        keySize: 16
      });
      //console.log(iv)
      return encrypted.ciphertext.toString(CryptoJS.enc.Base64)

    },

    decrypt_token(data) {
      var ciphertext = CryptoJS.enc.Base64.parse(data);
      // split iv and ciphertext
      var iv = ciphertext.clone();
      iv.sigBytes = 16;
      iv.clamp();
      ciphertext.words.splice(0, 4); // delete 4 words = 16 bytes
      ciphertext.sigBytes -= 16;
      var key = CryptoJS.enc.Utf8.parse(SecretKey);
      // decryption
      var decrypted = CryptoJS.AES.decrypt({ciphertext: ciphertext}, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC
      });
      return decrypted.toString(CryptoJS.enc.Utf8);    
    },

}