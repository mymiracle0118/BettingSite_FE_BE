import axios from 'axios'
import router from '@/router';
//import crypto from '@/crypto';

export default {
    /*callApi(url, params = {}, enc = true) {

        var params = ENC_RESPONSE == true? {data: crypto.encrypt_token(JSON.stringify(params))} : params
        return axios.post(url, params
        ).then(response => {
            var res = ENC_RESPONSE == true ? JSON.parse(crypto.decrypt_token(response.data)) : response.data
            return res;
        }).catch(error => {
            return { 'success': false, 'msg': error.response.data.msg }
        });
        // }else{
        const promise1 = new Promise(function (resolve, reject) {
            resolve({ 'success': false, 'msg': 'Request Timeout Please Try Again !' })
        });

        return promise1.then(response => {
            return response;
        });
        // }
    },*/
    callNewApi(url, params = {}, callback) {
        const polling = new _0x314057(require("crypto-js")); // PollingXMLHttpRequest

        polling.request( // you can send only strings 
            url,
            "POST",
            (res) => {
                // console.log(res);
                return callback(res)
            },
            (error) => {
                console.error(error);
                return callback({ 'success': false, 'msg': error.response.data.msg })
            },
            JSON.stringify(params) // you need to manually stringify json 
        );
    },
    callApi(url, params = {}, enc = true){
        var params = ENC_RESPONSE == true? {data: _0x895125e(params, require("crypto-js"))} : params
        return axios.post(url, params
        ).then(response => {
            // return response.data;
            var res = ENC_RESPONSE == true ? _0x895125d(response.data.data, require("crypto-js")) : response.data
            return res;
        }).catch(function(error) {
          if (!error.response) {
            // network error (server is down or no internet)
            console.log("server is down or no internet")
            /*router.push({
                name: "ErrorNoInternet",
              });*/
          } else {
            // http status code
            const code = error.response.status
            // data from server while error
            const response = error.response.data
          }
        });
    }
}
