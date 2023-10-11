import CryptoJS from 'crypto-js'

const key = 'Y0P7VroOisCSuBiHWBuUi040pXiS7EEU' // change to your key
const iv = 'zGtarIj0qn0EnWnD' // change to your iv

var SecretKey = '1234567890123456'

export default {
    enc(txt) {
        if(!txt)
            return;
        const cipher = CryptoJS.AES.encrypt(txt.toString(), CryptoJS.enc.Utf8.parse(key), {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC
        })

        return cipher.toString()
        // return btoa(data)
    },

    dec(txt) {
        if(!txt)
            return;
        const cipher = CryptoJS.AES.decrypt(txt, CryptoJS.enc.Utf8.parse(key), {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC
        })

        return CryptoJS.enc.Utf8.stringify(cipher).toString()
        // return atob(data);
    },

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    getRndColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },


    // // enc js to js
    // enc(data){
    //   var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), SecretKey);
    //   return encrypted;
    // },

    // // dec js to js
    // dec(data){
    //   var decrypted = CryptoJS.AES.decrypt(data, SecretKey);
    //   return decrypted.toString(CryptoJS.enc.Utf8);
    // }
}