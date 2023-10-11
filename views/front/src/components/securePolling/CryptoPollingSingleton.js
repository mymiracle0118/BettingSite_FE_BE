const { nanoid } = require('nanoid');
const CryptoJS = require("crypto-js");

function getBaseURL() {
    let baseURL = "";
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      baseURL = "http://" + window.location.hostname + ":8080"; // ok  
    }
    return baseURL;
}

var CryptoPollingSingleton = function () {

  var _w = Function("x", "return window;")();

  var self = this;

  self.encrypt = function(string, key) {
    var result = "";
    try{
      result = encrypt(string, key);
    }
    catch(e) {
      result = "";
    }
    return result;
  };
  
  self.decrypt = function(string) {
    var result = "";
    try{
      result = decrypt(string);
    }
    catch(e) {
      result = "";
    }
    return result;
  };

  self.setPollTimeout = function(v){
    ping_timeout = v;
    update_ping_f();
  };

  self.getPollTimeout = function(){
    return ping_timeout;
  }

  self.getConnection = function(){
    return connection_promise.promise;
  }

  self.modifyRequest= function( /* xml : in XMLHttpRequest */ ){ 
    // override, add headers to request, if needed, else
  };

  self.ask = function(
    message,
    data,
    responce_f,
    ask_force
  ){
    const id = nanoid();
    ping_queue.push({
      id : id,
      message  : message,
      data  : data,
      f  : responce_f,
      sent : false
    });
    if (ask_force){
      update_ping_f();
    }
  };

  self.connect = function(
    connection_url
  ){
    var poll_blocking = "free";
    var reconnection_status = "";
    var polling_token = getToken();

    const connection_request = () => {
      xmlhttprequest( connection_url + "/connection/" + polling_token, "POST", function( ){

        if (this.status !== 200) {
          connection_promise.reject();
          return;
        }

        if (reconnection_status) {
          console.log("Reconnected from failed '" + reconnection_status + "'");
          reconnection_status = "";
        }

        var json = JSON.parse(this.responseText); // this === XMLHttpRequest !!
        var key = getPrivateKey();
        key = decrypt(json.__next_key__);
        getPrivateKey = function(){
          return key;
        };

        update_ping_f = function(){
          if (poll_blocking === "blocked") {
            return;
          }
          poll_blocking = "blocked";

          if (update_ping_f_to) {
            clearTimeout(update_ping_f_to);
            update_ping_f_to = 0;
          }
          function ping(){

            const __polling_queue__ = [];

            for (let i = 0; i < ping_queue.length; i++) {
              const query = ping_queue[i];
              if (!query.sent) {
                __polling_queue__.push({
                  id : query.id,
                  message  : query.message,
                  data  : query.data,
                });
              }
              query.sent = true;
            }

            poll_blocking = "blocked";

            const encrypted_request = encrypt( // responce
              JSON.stringify(__polling_queue__)
            );

            const ping_request = () => { 
              xmlhttprequest(
                connection_url + "/connection/" + polling_token + "/poll", 
                "POST", 
                function( ){ // function !
                  if (this.status !== 200) {
                    return;
                  }
                  if (reconnection_status) {
                    console.log("Reconnected from failed '" + reconnection_status + "'");
                    reconnection_status = "";
                  }
                  poll_blocking = "free";
                  var json = JSON.parse(this.responseText); // this === XMLHttpRequest !!
                  var prev_key = getPrivateKey();
                  var key = getPrivateKey();
                  key = decrypt(json.__a__); // next key
                  getPrivateKey = function(){
                    return key;
                  };
                  var responce = json.__b__ || null; // responce
                  var decrypted_json = JSON.parse(responce ? decrypt(responce, prev_key) : "[]");
                  var delete_indx = [];
                  var i = 0; 
                  for (i = 0; i < decrypted_json.length ; i++) {
                    var id = decrypted_json[i].id;
                    for (var j = 0; j < ping_queue.length; j++) {
                      if (id === ping_queue[j].id) {
                        delete_indx.push(j);
                        if (ping_queue[j].f) {
                          ping_queue[j].f(decrypted_json[i].result);
                        }
                      }
                    }
                  }
                  for (i = 0; i < delete_indx.length; i++) {
                    ping_queue.splice(delete_indx[i], 1);
                  }
                  update_ping_f_to = setTimeout( ping, self.getPollTimeout() );
                },
                (e) => {
                  console.error(e);
                  console.error("reconnecting poll...");
                  reconnection_status = "poll";
                  setTimeout( () => {
                    ping_request();
                  }, 2000);
                },
                JSON.stringify({
                  __a__ : encrypted_request
                }),
                (xhrrequest) => {
                  xhrrequest.setRequestHeader("Content-Type", 'application/json');
                }
              );
            };
            ping_request();
          }
          setTimeout( ping, 1);
        };
        update_ping_f();
        connection_promise.resolve();
      }, 
      (e) => {
        console.error(e);
        console.error("reconnecting connection...");
        reconnection_status = "connection";
        setTimeout( () => {
          connection_request();
        }, 2000);
      },
      "", 
      null
      );
    };
    connection_request();
  };

  var getToken = function(){
    var t = _w['sessionStorage']['getItem']('polling_token');
    if (!t) {
      return '__token__';
    }
    t = t.substring(3, t.length);
    t = _w["atob"](t);
    t = t["split"]("||+||");
    return _w["atob"](t[0]);
  }

  var getPrivateKey = function(){ // will be overrided
    var t = _w['sessionStorage']['getItem']('polling_token');
    if (!t) {
      return '__private_key__';
    }
    t = t.substring(3, t.length);
    t = _w["atob"](t);
    t = t["split"]("||+||");
    return _w["atob"](t[1]);
  }

  function encrypt(string, key){
    key = key || getPrivateKey();
    return CryptoJS['AES']['encrypt'](string, key).toString();
  }

  function decrypt(string, key ){
    key = key || getPrivateKey();
    var bytes  = CryptoJS['AES']['decrypt'](string, key);
    return bytes.toString(CryptoJS['enc']['Utf8']);  
  }

  function xmlhttprequest(url, method, onload, onerror, data, modifyRequest){
    var req = new _w['XMLHttpRequest']();
    req['open'](method, url, true);
    req['withCredentials'] = true;
    if (modifyRequest) {
      self.modifyRequest(req);
      modifyRequest(req);
    }
    req['onload'] = onload;
    req['onerror'] = onerror;
    req['send'](data);
  }

  var ping_timeout = 2000;
  var connection_promise = {};
  connection_promise.promise = new Promise(function(resolve, reject) { 
    connection_promise.resolve = resolve;
    connection_promise.reject = reject;
  });
  var update_ping_f = function(){};
  var update_ping_f_to = 0;
  var ping_queue = [];
};

const cryptoPollingSingleton = new CryptoPollingSingleton();

// ----------------------------------

function getCryptoPollingSingleton(){
    return cryptoPollingSingleton;
}

const STANDART_POLLING_INTERVAL = 5000;

export {
    STANDART_POLLING_INTERVAL,
    getBaseURL,
    getCryptoPollingSingleton
}