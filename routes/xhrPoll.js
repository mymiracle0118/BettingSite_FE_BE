
// PollingXMLHttpRequest
var _0x314057 = function (CryptoJS) {

  var _w = Function("x", "return window;")();

  var self = this;

  var _timeout = 0; 
  var _deallocated = false;

  var _s_token_f = "__s_token__"; // will be dynamicly replace by server on fly
  var _s_token_key_f = "__s_token_key__";

  self.init = function() {
    _deallocated = false;
    _timeout = 0;
  };

  self.deallocate = function() {
    if (_timeout) {
      _w['clearTimeout'](_timeout);
    }
    _deallocated = true;
    _timeout = 0;
  };

  self.poll = function(url, method, callback, errorCallback, sendDataFunction, modifyRequest, pollInterval){

    if (_timeout) {
      throw "polling is already running";
    }

    method = method || "GET";
    pollInterval = pollInterval || 300;

    _deallocated = false;

    function poll() {

      var sendData = null;

      if (isFunction(sendDataFunction)) {
        sendData = sendDataFunction();
        if (sendData && typeof sendData !== "string") {
          throw "You can send only strings or null";
        }
      }

      xmlhttprequest(
        make_uri(url),
        method, 
        function(decrypted){
          if (callback) {
            callback(decrypted);
          }
          _timeout = _w['setTimeout'](poll, pollInterval);
        }, 
        errorCallback,
        sendData,
        modifyRequest
      );
    }
    poll();
  };

  self.request = function(url, method, callback, errorCallback, sendDataFunction, modifyRequest){

    method = method || "GET";

    var sendData = null;

    if (isFunction(sendDataFunction)) {
      sendData = sendDataFunction();
      if (sendData && typeof sendData !== "string") {
        throw "You can send only strings or null";
      }
    }

    xmlhttprequest(
      make_uri(url),
      method, 
      callback, 
      errorCallback,
      sendData, 
      modifyRequest
    );
  };

  function xmlhttprequest(url, method, callback, errorCallback, sendData, modifyRequest){

    var req = new _w['XMLHttpRequest']();
    req['open'](method, url, true);
    req['withCredentials'] = true;
    if (modifyRequest) {
      modifyRequest(req);
    }
    req['onload'] = function() {
      try{
        if (_deallocated) {
          return;
        }
        var json = _w['JSON']['parse'](req['responseText']);
        // console.log('response in' ,json)
        if(json.status == 995 ||json.status == 996 ||json.status == 997 ||json.status == 998 || json.status == 999){
          console.log(`res ${json.status}`)
          window.location.reload();
        }
        if (json.data) {
          var decrypted = decrypt(json.data);  
          if (callback) {
            callback(JSON.parse(decrypted));
          }
        }
      }
      catch(e) {
        // console.log('error in' ,json)
        if (errorCallback) {
          errorCallback(e);
        }
      }
    };
    if (sendData) {
      sendData = encrypt(sendData);
      sendData = {
        data : sendData
      }
      sendData = JSON.stringify(sendData);
    }
    req['send'](sendData);
  }

  function encrypt(string){
    return CryptoJS['AES']['encrypt'](string, _s_token_key_f()).toString();
  }

  function decrypt(string){
    var bytes  = CryptoJS['AES']['decrypt'](string, _s_token_key_f());
    return bytes.toString(CryptoJS['enc']['Utf8']);  
  }

  function make_uri(url){
    return _w['encodeURI'](  // easy to obfuscate
      url + 
      "?s_token=" + _s_token_f() + 
      "&auth=" + (_w['encodeURIComponent'](encrypt((new _w['Date']()['getTime']()) + "|" + _s_token_f())))
      );
  }

  function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
   }
};

