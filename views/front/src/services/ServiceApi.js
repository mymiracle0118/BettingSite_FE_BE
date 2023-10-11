// import axios from 'axios'
// import store from '@/store';
// import crypto from '@/crypto'

export default {
  callNewApi(url, params = {}, callback) {
    const polling = new _0x314057(require("crypto-js")); // PollingXMLHttpRequest

    polling.request(
      // you can send only strings
      url,
      "POST",
      (res) => {
        // console.log(res);
        return callback(res);
      },
      (error) => {
        console.error(error);
        return callback({
          success: false,
          msg: error.response.data.msg,
        });
      },
      JSON.stringify(params) // you need to manually stringify json
    );
  },
  callApi(url, params = {}, timeout = 10000) {
    var params =
      ENC_RESPONSE == true
        ? {
            data: _0x895125e(params, require("crypto-js")),
          }
        : params;
    return axios.post(url, params, { timeout: timeout }).then((response) => {
      // return response.data;
      // console.log(response.data.status)
      // if(response.data.status == 402){

      // }
      var res =
        ENC_RESPONSE == true
          ? _0x895125d(response.data.data, require("crypto-js"))
          : response.data;
      return res;
    });
  },
};
