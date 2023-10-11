// const { config } = require('aws-sdk');
const request = require("request");
const config = require("config");
const psl = require("psl");

module.exports = {
  getDomain(url) {
    if (url == "dimwebnode.local") {
      return "world777.com";
      // return "goexch777.com"
      // return "krishiv555.com"
      // return "wolf777.com"
      // return "fairbet777.com"
      // return "yellow777.com"
    }
    if (url == "wolfweb.local") {
      return "wolf777.com";
      // return "goexch777.com"
      // return "krishiv555.com"
      // return "wolf777.com"
      // return "fairbet777.com"
      // return "yellow777.com"
    }
    if (url == "192.168.1.143") {
      return "world777.com";
      // return "wolf777.com"
      // return "global7777.com"
    }
    var parsed = psl.parse(url);
    console.log(parsed);
    if (parsed.listed) {
      return parsed.domain;
    } else {
      return url;
    }
  },

  call(uri, params, req, callback, endPoint = "") {
    let userAgent = req.useragent;
    params.bdetail = userAgent.source;
    ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    ip = ip.split(",")[0];
    params.ip = ip;
    let url = endPoint ? endPoint + uri : config.frontApiUrl + uri;

    var options = {
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      body: params,
      timeout: 5000,
      json: true,
    };
    //  console.log(options)
    request(options, function (error, response, body) {
      console.log(error);
      if (!error && response.statusCode == 200) {
        let data = {
          success: false,
          msg: "Error in response",
          status: 0,
        };

        if (body.status) {
          // console.log(body.status, body.msg)
          if (body.status == 300) {
            data = {
              success: false,
              msg: body.msg,
              status: body.status,
            };
          } else if (body.status == 100) {
            data = {
              success: false,
              msg: "Error in response",
              status: body.status,
            };
          } else if (body.status == 400) {
            data = {
              success: false,
              msg: body.msg,
              status: body.status,
            };
          } else if (body.status == 402) {
            data = {
              success: false,
              msg: body.msg,
              status: body.status,
            };
          } else if (body.status == 200) {
            data = {
              success: true,
              msg: body.msg,
              status: body.status,
              data: body.data ? body.data : {},
            };
          } else if (body.status == 302) {
            data = {
              success: false,
              msg: "Error in response",
              status: body.status,
            };
          }
        }

        return callback(data, false);
      } else {
        err = {
          success: false,
          msg: "Unhandled Request",
        };
        return callback(err, error);
      }
    });
  },

  callAuth(
    uri,
    params,
    req,
    callback,
    callbackerror,
    endPoint = "",
    timeout = 10000
  ) {
    try {
      let userAgent = req.useragent;

      params.bdetail = userAgent.source;
      ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      ip = ip.split(",")[0];
      params.ip = ip;

      let url = endPoint ? endPoint + uri : config.frontApiUrl + uri;
      // console.log("#### URL ###", url)
      let headers = {
        "Content-Type": "application/json",
      };

      let authToken = req.session.jwt_token;
      // console.log(authToken)
      if (authToken) {
        headers.Authorization = "Bearer " + authToken;
      } else {
        err = {
          success: false,
          msg: "Please Login",
          status: 401,
        };
        return callbackerror(err, 401);
      }
      var options = {
        method: "POST",
        url: url,
        headers: headers,
        body: params,
        timeout: timeout,
        json: true,
      };
      //  console.log(params)
      request(options, function (error, response, body) {
        let data = {
          success: false,
          msg: "Error in response",
          status: 0,
        };
        if (response && response.statusCode == 200) {
          if (!error) {
            if (body && body.status) {
              // console.log(body.status, body.msg)
              if (body.status == 300) {
                data = {
                  success: false,
                  msg: body.msg,
                  status: body.status,
                };
              } else if (body.status == 100) {
                data = {
                  success: false,
                  // 'msg': 'Error in response',
                  msg: body.msg,
                  status: body.status,
                };
              } else if (body.status == 402) {
                data = {
                  success: false,
                  msg: body.msg,
                  status: body.status,
                };
              } else if (body.status == 400) {
                data = {
                  success: false,
                  msg: body.msg,
                  status: body.status,
                };
              } else if (body.status == 200) {
                data = {
                  success: true,
                  msg: body.msg,
                  status: body.status,
                  data: body.data ? body.data : {},
                };
              } else if (body.status == 302) {
                data = {
                  success: false,
                  msg: "Error in response",
                  status: body.status,
                };
              } else if (body.status == 401) {
                data = {
                  success: false,
                  msg: "Please Login",
                  status: body.status,
                };
                delete req.session.jwt_token;
              }
            } else {
              console.log(response);
            }
          } else {
            console.log(error);
          }
        } else {
          if (
            response &&
            (response.statusCode == 401 || response.statusCode == 417)
          ) {
            data = {
              success: false,
              msg: "Please login",
              status: response.statusCode,
            };
            delete req.session.jwt_token;
          } else {
            data = {
              success: false,
              // msg: response.statusMessage, // Debug
              msg: "Unhandled Request", // Live,
              status: response ? response.statusCode : 0,
            };
          }
        }

        callback(data, 200);
      });
    } catch (e) {
      console.error("ERROR: ", uri);
      console.error(e);
    }
  },
  callNanoApi(
    uri,
    params,
    req,
    callback,
    callbackerror,
    endPoint = "",
    customHeader = null
  ) {
    let userAgent = req.useragent;

    let url = endPoint ? endPoint + uri : config.nano.createSessionUrl + uri;
    console.log(url);
    let headers = {
      "Content-Type": "application/json",
    };

    if (customHeader) {
      headers = {
        ...headers,
        ...customHeader,
      };
    }

    let authToken = req.session.jwt_token;
    if (authToken) {
      headers.Authorization = "Bearer " + authToken;
    } else {
      err = {
        success: false,
        msg: "Please Login",
        status: 401,
      };
      return callbackerror(err, 401);
    }

    params.ip = req.headers["cf-connecting-ip"] || req.query.ip;

    var options = {
      method: "POST",
      url: url,
      headers: headers,
      body: params,
      timeout: 5000,
      json: true,
    };
    //  console.log(options)
    request(options, function (error, response, body) {
      let data = {
        success: false,
        msg: "Error in response",
        status: 0,
      };

      if (!error) {
        return callback(body);
      } else {
        console.log(error);
      }

      callback(data, 200);
    });
  },
  getPaymentUrl(orderid, amt, callback) {
    var data = {
      order_id: orderid,
      amount: amt,
      environment: config.payment_call_back,
      me_id: config.merchant_id,
    };
    let headers = {
      "Content-Type": "application/json",
      APIKey: config.paymentKey,
    };
    var options = {
      method: "POST",
      url: config.paymentUrl,
      headers: headers,
      body: data,
      timeout: 5000,
      json: true,
    };
    //
    request(options, function (error, response, body) {
      let data = {
        success: false,
        msg: "Error in response",
        status: 0,
      };
      if (!error) {
        if (body.status == "Success") {
          data = {
            success: true,
            msg: "Success",
            data: { url: body.reason },
            status: 200,
          };
        } else {
          data = {
            success: false,
            msg: body.reason,
            status: 300,
          };
        }

        return callback(data, 200);
      } else {
        console.log(error);
      }

      callback(data, 200);
    });
  },
  callSocket(uri, params, authToken, callback, callbackerror, endPoint = "") {
    let url = endPoint ? endPoint + uri : config.frontApiUrl + uri;
    let headers = {
      "Content-Type": "application/json",
    };

    if (authToken) {
      headers.Authorization = "Bearer " + authToken;
    } else {
      err = {
        success: false,
        msg: "Please Login",
        status: 401,
      };
      return callbackerror(err, 401);
    }
    var options = {
      method: "POST",
      url: url,
      headers: headers,
      body: params,
      timeout: 20000,
      json: true,
    };
    //  console.log(options)
    request(options, function (error, response, body) {
      let data = {
        success: false,
        msg: "Error in response",
        status: 0,
      };
      if (response && response.statusCode == 200) {
        if (!error) {
          if (body && body.status) {
            if (body.status == 300) {
              data = {
                success: false,
                msg: body.msg,
                status: body.status,
              };
            } else if (body.status == 100) {
              data = {
                success: false,
                msg: "Error in response",
                status: body.status,
              };
            } else if (body.status == 400) {
              data = {
                success: false,
                msg: body.msg,
                status: body.status,
              };
            } else if (body.status == 200) {
              data = {
                success: true,
                msg: body.msg,
                status: body.status,
                data: body.data ? body.data : {},
              };
            } else if (body.status == 302) {
              data = {
                success: false,
                msg: "Error in response",
                status: body.status,
              };
            } else if (body.status == 401) {
              data = {
                success: false,
                msg: "Please Login",
                status: body.status,
              };
              callbackerror(data, body.status);
            }
            callback(data, response.statusCode);
          } else {
            console.log(response);
          }
        } else {
          console.log(error);
        }
      } else {
        if (
          response &&
          (response.statusCode == 401 || response.statusCode == 417)
        ) {
          data = {
            success: false,
            msg: "Please login",
            status: response.statusCode,
          };
          // delete req.session.jwt_token
        } else {
          data = {
            success: false,
            // 'msg': response.statusMessage, // Debug
            msg: "Unhandled Request", // Live,
            status: response ? response.statusCode : 0,
          };
        }

        callback(data, response ? response.statusCode : 200);
      }
    });
  },
};
