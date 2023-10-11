import CryptoJS from 'crypto-js'

const key = 'Y0P7VroOisCSuBiHWBuUi040pXiS7EEU' // change to your key
const iv = 'zGtarIj0qn0EnWnD' // change to your iv

export default {
    encode(txt) {
        const cipher = CryptoJS.AES.encrypt(txt.toString(), CryptoJS.enc.Utf8.parse(key), {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC
        })

        return cipher.toString()
        // return btoa(data)
    },

    decode(txt) {
        const cipher = CryptoJS.AES.decrypt(txt, CryptoJS.enc.Utf8.parse(key), {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC
        })

        return CryptoJS.enc.Utf8.stringify(cipher).toString()
        // return atob(data);
    }
}