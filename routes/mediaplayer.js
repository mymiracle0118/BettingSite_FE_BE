const express = require("express");
const config = require("config");
const request = require("request");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const { nanoid } = require("nanoid");
const { customAlphabet } = require("nanoid/non-secure");

const JavaScriptObfuscator = require("javascript-obfuscator");

const api = require("../helpers/api");
const createError = require("http-errors");
const { json } = require("express");
const axios = require("axios");

const localCache = {};

// GET VIRTUAL TV
router.get("/virtual/:gameID/:ip", function (req, res, next) {
  let staticUrl = config.assetsFrom == "s3" ? config.staticUrl : "/static/";
  let userAgent = req.useragent;
  let mType = "";
  switch (userAgent.platform) {
    case "iPhone":
      mType = "ios";
      break;
    case "iPad":
      mType = "ios";
      break;
    case "Apple Mac":
      mType = "ios";
      break;

    default:
      mType = userAgent.platform;
      break;
  }
  let params = {
    gmid: parseInt(req.params.gameID),
    mtype: mType,
  };
  console.log(params);
  let tvData = null;
  api.callAuth(
    "tvdata",
    params,
    req,
    (data, status) => {
      console.log(data);
      if (data && data.data) {
        tvData = data.data[0];
        console.log(tvData);
        // UNREAL MEDIA PLAYER
        if (data.data[0].ttype == 1) {
          res.render("mediaplayers/unrealMediaplayer", {
            tvData: tvData,
            platform: mType,
            isMobile: userAgent.isMobile,
            staticUrl: staticUrl,
          });
        }
        // 3RD PARTY
        else if (data.data[0].ttype == 2) {
          var channelId = tvData.cam;
          var ip = req.params.ip;
          if (ip == "null") {
            return next(createError(404));
          }
          var url = `https://glivestreaming.com/api.php?action=geth5link&apiuser=whitesolutions&key=En2Kg0Cb2H&ch=${channelId}&uid=myuser123&ip=${ip}`;
          request(url, function (error, resp, body) {
            if (!error && resp.statusCode == 200) {
              console.log("glive res", body);
              let response = JSON.parse(body);
              if (response.Status) {
                if (response.H5LINKROW) {
                  res.render("mediaplayers/providerMediaplayer", {
                    isMobile: userAgent.isMobile,
                    url: response.H5LINKROW,
                  });
                } else {
                  next(createError(404));
                }
              }
            } else {
              next(createError(404));
            }
          });
        }
        // NANO MEDIA PLAYER
        else if (data.data[0].ttype == 5) {
          let streamName = data.data[0].cam;
          let nanoParam = {
            domainname: req.headers.host,
            streamname: streamName,
            //tag: data.data[0].ptype,
            referer: req.headers.host,
            expires: 0,
            tag: req.session.user.uname, //data.data[0].cam,
      
          };
          console.log("nanoParam", nanoParam);
          api.callNanoApi(
            "AddSession",
            nanoParam,
            req,
            (nanoData, nanoStatus) => {
              console.log("add session", nanoData);
              if (nanoData.status == 200) {
                // tvResponse = {
                //     "streamName": streamName,
                //     "securityToken": nanoData.data.token,
                //     "securityExpires": nanoData.data.expires,
                //     "securityOptions": nanoData.data.options,
                //     "securityTag": nanoData.data.tag
                // }

                const nanoid_custom = customAlphabet(
                  "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
                  10
                );
                const videoPlayerId = nanoid_custom();

                let app_js = `
                            (function(){
                                var NanoPlayer = window.NanoPlayer;
                                delete window.NanoPlayer;
                                var staticUrl = '${staticUrl}';
                                var videoPlayerId = '${videoPlayerId}';
                                var streamName = '${streamName}';
                                var securityToken = '${nanoData.data.token}';
                                var securityExpires = '${nanoData.data.expires}';
                                var securityOptions= '${nanoData.data.options}';
                                var securityTag = '${nanoData.data.tag}';`;

                // TODO - cache a js
                if (!localCache.nmediaplayer_js) {
                  localCache.nmediaplayer_js = fs.readFileSync(
                    path.join(__dirname, "./mediaplayer-clientside.js"),
                    {
                      encoding: "utf8",
                    }
                  );
                }

                const nmediaplayer_js = localCache.nmediaplayer_js;

                app_js += nmediaplayer_js + `})();`;

                if (true) {
                  // 'true' debug
                  const options = {
                    banner: "var data=null;",
                    domainLock: [],
                    compact: true,
                    controlFlowFlattening: false,
                    deadCodeInjection: true,
                    debugProtection: false,
                    debugProtectionInterval: false,
                    disableConsoleOutput: false,
                    identifierNamesGenerator: "hexadecimal",
                    log: true,
                    renameGlobals: false,
                    rotateStringArray: true,
                    selfDefending: true,
                    unicodeEscapeSequence: true,
                  };

                  app_js = JavaScriptObfuscator.obfuscate(
                    app_js,
                    options
                  ).getObfuscatedCode();
                }

                res.render("mediaplayers/nanoMediaplayer", {
                  media: {
                    app_js: "<script>" + app_js + "</script>",
                  },
                  staticUrl: staticUrl,
                });
              } else {
                next(createError(404));
              }
            },
            (error, status) => {
              console.log(status, error);
            },
            config.nano.createSessionUrl
          );
        }
      } else {
        next(createError(404));
      }
    },
    (error, status) => {
      res.send(status, error);
    }
  );
});

// GET CASINO TV
router.get("/:type/:token", function (req, res, next) {
  // var tokenUrl = config.checkTokenUrl + 'framelogin'
  var tokenUrl = config.frontApiUrl + "framelogin";
  let authToken = req.session.jwt_token;
  const headers = {
    Authorization: "Bearer " + authToken,
  };
  var para = {
    token: req.params.token,
    gtype: "tv",
  };
  console.log(tokenUrl, para, headers);
  axios
    .post(tokenUrl, para, {
      headers: headers,
    })
    .then((data) => {
      console.log(data.data.status, data.data);
      if (data.data.status == 200) {
        let staticUrl =
          config.assetsFrom == "s3" ? config.staticUrl : "/static/";
        let userAgent = req.useragent;

        let params = {
          gtype: req.params.type,
          mtype: userAgent.platform,
        };
        let tvData = null;
        console.log(params);
        api.callAuth(
          "tvcsdata",
          params,
          req,
          (data, status) => {
            console.log("tvcsdata", data);
            if (data.data) {
              tvData = data.data[0];
              // UNREAL MEDIA PLAYER
              if (data.data[0].ttype == 1) {
                res.render("mediaplayers/unrealMediaplayer", {
                  tvData: tvData,
                  platform: mType,
                  isMobile: userAgent.isMobile,
                  staticUrl: staticUrl,
                });
              }
              // 3RD PARTY
              else if (data.data[0].ttype == 2) {
              }
              // NANO MEDIA PLAYER
              else if (data.data[0].ttype == 5) {
                let streamName = data.data[0].ip;
                let nanoParam = {
                  domainname: req.headers.host,
                  streamname: streamName,
                  //tag: data.data[0].cam,
                  referer: req.headers.host,
                  expires: 0,
                  tag: req.session.user.uname, //data.data[0].cam,
           
                };
                console.log("nanoParam", nanoParam);
                api.callNanoApi(
                  "AddSession",
                  nanoParam,
                  req,
                  (nanoData, nanoStatus) => {
                    console.log("add session", nanoData);
                    if (nanoData.status == 200) {
                      const nanoid_custom = customAlphabet(
                        "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
                        10
                      );
                      const videoPlayerId = nanoid_custom();

                      let app_js = `
                                        (function(){
                                            var NanoPlayer = window.NanoPlayer;
                                            delete window.NanoPlayer;
                                            var staticUrl = '${staticUrl}';
                                            var videoPlayerId = '${videoPlayerId}';
                                            var streamName = '${streamName}';
                                            var securityToken = '${nanoData.data.token}';
                                            var securityExpires = '${nanoData.data.expires}';
                                            var securityOptions= '${nanoData.data.options}';
                                            var securityTag = '${nanoData.data.tag}';`;

                      // TODO - cache a js
                      if (!localCache.nmediaplayer_js) {
                        localCache.nmediaplayer_js = fs.readFileSync(
                          path.join(__dirname, "./mediaplayer-clientside.js"),
                          {
                            encoding: "utf8",
                          }
                        );
                      }

                      const nmediaplayer_js = localCache.nmediaplayer_js;

                      app_js += nmediaplayer_js + `})();`;

                      if (true) {
                        // 'true' debug
                        const options = {
                          banner: "var data=null;",
                          domainLock: [],
                          compact: true,
                          controlFlowFlattening: false,
                          deadCodeInjection: true,
                          debugProtection: false,
                          debugProtectionInterval: false,
                          disableConsoleOutput: false,
                          identifierNamesGenerator: "hexadecimal",
                          log: true,
                          renameGlobals: false,
                          rotateStringArray: true,
                          selfDefending: true,
                          unicodeEscapeSequence: true,
                        };

                        app_js = JavaScriptObfuscator.obfuscate(
                          app_js,
                          options
                        ).getObfuscatedCode();
                      }

                      res.render("mediaplayers/nanoMediaplayer", {
                        media: {
                          app_js: "<script>" + app_js + "</script>",
                        },
                        staticUrl: staticUrl,
                      });
                    } else {
                      next(createError(404));
                    }
                  },
                  (error, status) => {
                    console.log(status, error);
                  },
                  config.nano.createSessionUrl
                );
              }
            } else {
              next(createError(404));
            }
          },
          (error, status) => {
            res.send(status, error);
          }
        );
      } else {
        next(createError(451));
      }
    })
    .catch((error) => {
      console.error(error);
      next(createError(404));
    });
});

// GET GAME TV
router.get("/game/:gameID/:ip", function (req, res, next) {
  let staticUrl = config.assetsFrom == "s3" ? config.staticUrl : "/static/";
  let userAgent = req.useragent;
  let mType = "";
  switch (userAgent.platform) {
    case "iPhone":
      mType = "ios";
      break;
    case "iPad":
      mType = "ios";
      break;
    case "Apple Mac":
      mType = "ios";
      break;

    default:
      mType = userAgent.platform;
      break;
  }
  let params = {
    gmid: parseInt(req.params.gameID),
    mtype: mType,
  };
  console.log(params);
  let tvData = null;
  api.callAuth(
    "tvdata",
    params,
    req,
    (data, status) => {
      console.log(data);
      if (data && data.data) {
        tvData = data.data[0];
        console.log(tvData);
        // UNREAL MEDIA PLAYER
        if (data.data[0].ttype == 1) {
          res.render("mediaplayers/unrealMediaplayer", {
            tvData: tvData,
            platform: mType,
            isMobile: userAgent.isMobile,
            staticUrl: staticUrl,
          });
        }
        // 3RD PARTY
        else if (data.data[0].ttype == 2) {
          var channelId = tvData.cam;
          var ip = req.params.ip;
          if (ip == "null") {
            return next(createError(404));
          }
          var url = `https://glivestreaming.com/api.php?action=geth5link&apiuser=whitesolutions&key=En2Kg0Cb2H&ch=${channelId}&uid=myuser123&ip=${ip}`;
          request(url, function (error, resp, body) {
            if (!error && resp.statusCode == 200) {
              console.log("glive res", body);
              let response = JSON.parse(body);
              if (response.Status) {
                if (response.H5LINKROW) {
                  res.render("mediaplayers/providerMediaplayer", {
                    isMobile: userAgent.isMobile,
                    url: response.H5LINKROW,
                  });
                } else {
                  next(createError(404));
                }
              }
            } else {
              next(createError(404));
            }
          });
        }
        // NANO MEDIA PLAYER
        else if (data.data[0].ttype == 5) {
          let streamName = data.data[0].ip;
          let nanoParam = {
            domainname: req.headers.host,
            streamname: streamName,
            referer: req.headers.host,
            expires: 0,
            tag: req.session.user.uname, //data.data[0].cam,
      
          };

          api.callNanoApi(
            "AddSession",
            nanoParam,
            req,
            (nanoData, nanoStatus) => {
              if (nanoData.status == 200) {
                // tvResponse = {
                //     "streamName": streamName,
                //     "securityToken": nanoData.data.token,
                //     "securityExpires": nanoData.data.expires,
                //     "securityOptions": nanoData.data.options,
                //     "securityTag": nanoData.data.tag
                // }

                const nanoid_custom = customAlphabet(
                  "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
                  10
                );
                const videoPlayerId = nanoid_custom();

                let app_js = `
                            (function(){
                                var NanoPlayer = window.NanoPlayer;
                                delete window.NanoPlayer;
                                var staticUrl = '${staticUrl}';
                                var videoPlayerId = '${videoPlayerId}';
                                var streamName = '${streamName}';
                                var securityToken = '${nanoData.data.token}';
                                var securityExpires = '${nanoData.data.expires}';
                                var securityOptions= '${nanoData.data.options}';
                                var securityTag = '${nanoData.data.tag}';`;

                // TODO - cache a js
                if (!localCache.nmediaplayer_js) {
                  localCache.nmediaplayer_js = fs.readFileSync(
                    path.join(__dirname, "./mediaplayer-clientside.js"),
                    {
                      encoding: "utf8",
                    }
                  );
                }

                const nmediaplayer_js = localCache.nmediaplayer_js;

                app_js += nmediaplayer_js + `})();`;

                if (true) {
                  // 'true' debug
                  const options = {
                    banner: "var data=null;",
                    domainLock: [],
                    compact: true,
                    controlFlowFlattening: false,
                    deadCodeInjection: true,
                    debugProtection: false,
                    debugProtectionInterval: false,
                    disableConsoleOutput: false,
                    identifierNamesGenerator: "hexadecimal",
                    log: true,
                    renameGlobals: false,
                    rotateStringArray: true,
                    selfDefending: true,
                    unicodeEscapeSequence: true,
                  };

                  app_js = JavaScriptObfuscator.obfuscate(
                    app_js,
                    options
                  ).getObfuscatedCode();
                }

                res.render("mediaplayers/nanoMediaplayer", {
                  media: {
                    app_js: "<script>" + app_js + "</script>",
                  },
                  staticUrl: staticUrl,
                });
              } else {
                next(createError(404));
              }
            },
            (error, status) => {
              console.log(status, error);
            },
            config.nano.createSessionUrl
          );
        }
      } else {
        next(createError(404));
      }
    },
    (error, status) => {
      res.send(status, error);
    }
  );
});

// ANIMATION
router.get("/scorestats/:eventId", function (req, res, next) {
  res.render("mediaplayers/scoreStats", {
    eventId: parseInt(req.params.eventId),
  });
});

module.exports = router;
