
// PollingXMLHttpRequest
var _0x314057 = function (CryptoJS) {

    var _w = Function("x", "return window;")();
  
    var self = this;
  
    var _s_token_f = "__s_token__"; // will be dynamicly replaced by server on fly
    var _s_token_key_f = "__s_token_key__";
  
    self.make_uri = 0; // override if needed
  
    self.setSToken = function(){
      _w['sessionStorage']['setItem']('s_token', encrypt(getToken()) );
    }
  
    self.encrypt = function(string, key) {
      let result = "";
      try{
        result = encrypt(string, key);
      }
      catch(e) {
        result = "";
      }
      return result;
    };
    
    self.decrypt = function(string) {
      let result = "";
      try{
        result = decrypt(string);
      }
      catch(e) {
        result = "";
      }
      return result;
    };
  
    function getToken(){
      let _s_token = "";
      if (typeof _s_token_f === "string") {
        _s_token = _s_token_f;
      }
      else {
        _s_token = _s_token_f();
      }
      return _s_token;
    }
  
    function getTokenKey(){
      let s_token_key = "";
      if (typeof _s_token_key_f === "string") {
        s_token_key = _s_token_key_f;
      }
      else {
        s_token_key = _s_token_key_f();
      }
      return s_token_key;
    }
  
    function encrypt(string, key){
      key = key || getTokenKey();
      return CryptoJS['AES']['encrypt'](string, key).toString();
    }
  
    function decrypt(string){
      var bytes  = CryptoJS['AES']['decrypt'](string, getTokenKey());
      return bytes.toString(CryptoJS['enc']['Utf8']);  
    }
  };
  
  try{
    if (process && process['env'] && process['env']['NODE_ENV'] === 'development') {
      var _w = Function("x", "return window;")();
      _w['_0x314057'] = _0x314057;
    }
  }
  catch(e) {
    e;
  }
  