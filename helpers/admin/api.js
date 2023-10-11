const request = require('request');
const crypto = require('../admin/crypto')
const config = require('config');
const psl = require('psl');
const { CostExplorer } = require('aws-sdk');

module.exports = {
  getDomain(url){
    if(url == 'dimwebnode.local' || url == '192.168.1.56' || url =='127.0.0.1:8080'){
      return "world777.com"
    }
    var parsed = psl.parse(url)
    //console.log(parsed)
    if(parsed.listed){
      return parsed.domain
    }else{
      return url
    }
  },

  call(uri, params, req, callback, endPoint = '') {
    let userAgent = req.useragent
    params.bdetail = userAgent.source
    ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    ip = ip.split(',')[0]
    params.ip = ip
    let url = endPoint ? endPoint + uri : config.adminApiUrl + uri
    
    var options = {
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      body: params,
      timeout: 120000,
      json: true
    };
    request(options, function (error, response, body) {
     
      if (!error && response.statusCode == 200) {
        let data = {
          'success': false,
          'msg': 'Error in response',
          'status': 0
        }
        if (body.status == 300) {
          data = {
            'success': false,
            'msg': body.msg,
            'status': body.status
          }
        } else if (body.status == 100) {
          data = {
            'success': false,
            'msg': 'Error in response',
            'status': body.status
          }
        } else if (body.status == 400) {
          data = {
            'success': false,
            'msg': body.msg,
            'status': body.status
          }
        } else if (body.status == 402) {
            data = {
              'success': false,
              'msg': body.msg,
              'status': body.status
            }
        } else if (body.status == 200) {
          data = {
            'success': true,
            'msg': body.msg,
            'status': body.status,
            'data': body.data ? body.data : {},
          }
        }
        else if (body.status == 302) {
          data = {
            'success': false,
            'msg': 'Error in response',
            'status': body.status
          }
        }

        return callback(data, false);

      } else {
        err = {
          'success': false,
          'msg': 'Please Login'
        }
        return callback(err, error);
      }
    });

  },

  callAuth(uri, params, req, callback, callbackerror, endPoint = '') {
    let userAgent = req.useragent
    params.bdetail = userAgent.source
    ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    ip = ip.split(',')[0]
    params.ip = ip

    let url = endPoint ? endPoint + uri : config.adminApiUrl + uri
    console.log(endPoint, url)
    let headers = {
      'Content-Type': 'application/json'
    }
    let authToken = req.session.admin_jwt_token
    if(authToken){
      headers.Authorization = 'Bearer '+ authToken
    }else{
      err = {
        'success': false,
        'msg': 'Please Login',
        'status': 401
      }
      return callbackerror(err, 401)
    }
    var options = {
      method: 'POST',
      url: url,
      headers: headers,
      body: params,
      timeout: 120000,
      json: true
    };
    request(options, function (error, response, body) {
        let data = {
          'success': false,
          'msg': 'Error in response',
          'status': 0
        }
        // console.log(body)
        if(response && response.statusCode == 200){
          if(!error){
            if(body && body.status){
              if (body.status == 300) {
                data = {
                  'success': false,
                  'msg': body.msg,
                  'status': body.status
                }
              } else if (body.status == 100) {
                data = {
                  'success': false,
                  //'msg': 'Error in response',
                   'msg': body.msg,
                  'status': body.status
                }
              } else if (body.status == 400) {
                data = {
                  'success': false,
                  'msg': body.msg,
                  'status': body.status
                }
              }  else if (body.status == 402) {
                  data = {
                    'success': false,
                    'msg': body.msg,
                    'status': body.status
                  }
              } else if (body.status == 200) {
                data = {
                  'success': true,
                  'msg': body.msg,
                  'status': body.status,
                  'data': body.data ? body.data : {},
                }
              }
              else if (body.status == 302) {
                data = {
                  'success': false,
                  'msg': 'Error in response',
                  'status': body.status
                }
              }
              else if (body.status == 401) {
                data = {
                  'success': false,
                  'msg': 'Please Login',
                  'status': body.status
                }
                delete req.session.admin_jwt_token
              }
            }else{
              //console.log(response)
            }
          }else{
            //console.log(error)
          }
        }else{
          if(response && (response.statusCode == 401 || response.statusCode == 417)){
            data = {
              'success': false,
              'msg': "Please login",
              'status': response.statusCode
            }
            delete req.session.admin_jwt_token
          }else{
            data = {
              'success': false,
              'msg': response ? response.statusMessage : "",
              'status': response ? response.statusCode : 0
            }  
          }
          
        }
        callback(data, 200) 
    });

  },

  callNanoApi(uri, params, req, callback, callbackerror, endPoint = '', customHeader = null) {
    let userAgent = req.useragent
  
    let url = endPoint ? endPoint + uri : config.nano.createSessionUrl + uri
    let headers = {
      'Content-Type': 'application/json'
    }

    if(customHeader){
      headers = {
        ...headers,
        ...customHeader
      }
    }

    let authToken = req.session.admin_jwt_token
    if(authToken){
       headers.Authorization = 'Bearer '+ authToken
    }else{
      err = {
        'success': false,
        'msg': 'Please Login',
        'status': 401
      }
      return callbackerror(err, 401)
    }
    /*ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    ip = ip.split(',')[0]*/
    params.ip = req.headers["cf-connecting-ip"] || req.query.ip

    var options = {
      method: 'POST',
      url: url,
      headers: headers,
      body: params,
      timeout: 5000,
      json: true
    };
     console.log(options)
    request(options, function (error, response, body) {
        let data = {
          'success': false,
          'msg': 'Error in response',
          'status': 0
        }
        
        if(!error){
          return callback(body)
        }else{
          console.log(error)
        }

        callback(data, 200)
    });

  },

  callSocket(uri, params, authToken, callback, callbackerror, endPoint = '') {
    let url = endPoint ? endPoint + uri : config.adminApiUrl + uri
    let headers = {
      'Content-Type': 'application/json'
    }

    if(authToken){
      headers.Authorization = 'Bearer '+ authToken
    }else{
      err = {
        'success': false,
        'msg': 'Please Login',
        'status': 401
      }
      return callbackerror(err, 401)
    }

    var options = {
      method: 'POST',
      url: url,
      headers: headers,
      body: params,
      timeout: 20000,
      json: true
    };
    // console.log(options)
    request(options, function (error, response, body) {
        let data = {
          'success': false,
          'msg': 'Error in response',
          'status': 0
        }
        //console.log(body)
        if(response && response.statusCode == 200){
          if(!error){
            if(body && body.status){
              if (body.status == 300) {
                data = {
                  'success': false,
                  'msg': body.msg,
                  'status': body.status
                }
              } else if (body.status == 100) {
                data = {
                  'success': false,
                  'msg': 'Error in response',
                  'status': body.status
                }
              } else if (body.status == 400) {
                data = {
                  'success': false,
                  'msg': body.msg,
                  'status': body.status
                }
              }  else if (body.status == 402) {
                data = {
                  'success': false,
                  'msg': body.msg,
                  'status': body.status
                }
              } else if (body.status == 200) {
                data = {
                  'success': true,
                  'msg': body.msg,
                  'status': body.status,
                  'data': body.data ? body.data : {},
                }
              }
              else if (body.status == 302) {
                data = {
                  'success': false,
                  'msg': 'Error in response',
                  'status': body.status
                }
              }
              else if (body.status == 401) {
                data = {
                  'success': false,
                  'msg': 'Please Login',
                  'status': body.status
                }
                callbackerror(data, body.status)
              }
              callback(data, response.statusCode)
            }else{
              //console.log(response)
            }
          }else{
            //console.log(error)
          }
        }else{
          if(response && (response.statusCode == 401 || response.statusCode == 417)){
            data = {
              'success': false,
              'msg': "Please login",
              'status': response.statusCode
            }
            // delete req.session.jwt_token
          }else{
            data = {
              'success': false,
              // 'msg': response.statusMessage, // Debug
              'msg': "Unhandled Request", // Live,
              'status': response ? response.statusCode : 0
            }  
          }
          
          callback(data, response ? response.statusCode : 200)
        }

    });

  },


}