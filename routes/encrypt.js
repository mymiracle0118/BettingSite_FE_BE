const _0x895125 = "cae7b808-8b1e-4f47-87a5-1a4b6a08030e"

function _0x895125e(string, CryptoJS){
  return CryptoJS['AES']['encrypt'](JSON.stringify(string), _0x895125).toString();
}

function _0x895125d(string, CryptoJS){
  var bytes  = CryptoJS['AES']['decrypt'](string, _0x895125);
  return JSON.parse(bytes.toString(CryptoJS['enc']['Utf8']));  
}