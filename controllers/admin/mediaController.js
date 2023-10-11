const api = require('../../helpers/admin/api')
const {v4: uuidv4} = require('uuid');
const crypto = require('../../helpers/admin/crypto')
const CryptoJS = require("crypto-js");
const config = require('config');
const createError = require('http-errors');
const request = require('request');
const axios = require('axios')
const { nanoid } = require('nanoid');
const { customAlphabet } = require('nanoid/non-secure');
const JavaScriptObfuscator = require('javascript-obfuscator');
const localCache = {};
const fs = require('fs');
const path = require("path");

exports.mediaplayerCasino = function(req, res, next) {
    let staticUrl = config.assetsFrom == "s3" ? config.staticUrl : '/static/'
    let userAgent = req.useragent

    var tokenUrl = config.adminApiUrl + 'dimadminsub/framelogin'
    let authToken = req.session.admin_jwt_token
    axios.post(tokenUrl, {
        'token': req.params.token,
        'gtype': 'tv'
    },{
      headers: {
        'Authorization': 'Bearer '+ authToken,
      }
    })
    .then(data => {
        //console.log(data)
        if (data.data.status == 200) {
            let params = {
                'gtype': req.params.type,
                'mtype': userAgent.platform
            }
            let tvData = null
           // console.log(params)
            api.callAuth('dimadminsub/tvcsdata', params, req, (data, status) => {
             //    console.log(data)
                if (data.data) {
                    tvData = data.data[0]
                    // UNREAL MEDIA PLAYER
                    if (data.data[0].ttype == 1) {

                    }
                    // 3RD PARTY
                    else if (data.data[0].ttype == 2) {

                    }
                    // NANO MEDIA PLAYER
                    else if (data.data[0].ttype == 5) {
                        let streamName = data.data[0].ip
                        let nanoParam = {
                            "domainname": req.headers.host,
                            "streamname": streamName,
                            "tag": data.data[0].cam,
                            "referer": req.headers.host,
                            "expires": 0
                        }
                        console.log('nanoParam', nanoParam)
                        
                        
                        api.callNanoApi('AddSessionadminsub', nanoParam, req, (nanoData, nanoStatus) => {
                            //console.log('AddSessionadminsub', nanoData)
                            if(nanoData && nanoData.status == 200){
                                const nanoid_custom = customAlphabet('qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM', 10)
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
                                        path.join(
                                            __dirname, 
                                            '../../routes/mediaplayer-clientside.js'
                                        ), 
                                        {
                                            encoding:"utf8"
                                        }
                                    );
                                }

                                const nmediaplayer_js = localCache.nmediaplayer_js;

                                app_js += nmediaplayer_js + `})();`;                                         

                                if (true) { // 'true' debug
                                    const options = {
                                        banner: 'var data=null;',
                                        domainLock: [ ],
                                        compact: true,
                                        controlFlowFlattening: false,
                                        deadCodeInjection: true,
                                        debugProtection: false,
                                        debugProtectionInterval: false,
                                        disableConsoleOutput: false,
                                        identifierNamesGenerator: 'hexadecimal',
                                        log: true,
                                        renameGlobals: false,
                                        rotateStringArray: true,
                                        selfDefending: true,
                                        unicodeEscapeSequence: true
                                    };
                                
                                    app_js = JavaScriptObfuscator.obfuscate(app_js, options).getObfuscatedCode();
                                }

                                res.render('mediaplayers/nanoMediaplayer', {
                                    media: {
                                        "app_js": "<script>" + app_js + "</script>"
                                    },
                                    staticUrl: staticUrl
                                });
                                /*let nanoRes = nanoData.data
                                tvResponse = {
                                    "streamName" : streamName,
                                    "securityToken": nanoRes.token,
                                    "securityExpires": nanoRes.expires,
                                    "securityOptions": nanoRes.options,
                                    "securityTag": nanoRes.tag
                                }
                                res.render('mediaplayers/nanoMediaplayer', {
                                    media: tvResponse,
                                    staticUrl: staticUrl
                                });*/
                            }else{
                             
                               res.render('errors/error', {
                                    message: "404 not found",
                                    error: {
                                      status: "404",
                                      stack: ""
                                    }
                                });
                               // createError(404);
                            }

                        },
                        (error, status) => {
                            console.log(status, error);
                        },
                        config.nano.createSessionUrl
                        );


                        // api.callAuth('AddSession', nanoParam, req, (nanoData, nanoStatus) => {
                        //     console.log(nanoData)
                        //     if(nanoData.status == 200){
                        //         tvResponse = {
                        //             "streamName" : streamName,
                        //             "securityToken": nanoData.data.token,
                        //             "securityExpires": nanoData.data.expires,
                        //             "securityOptions": nanoData.data.options,
                        //             "securityTag": nanoData.data.tag
                        //         }
                        //         res.render('mediaplayers/mediaplayer', {
                        //             media: tvResponse
                        //         });
                        //     }else{
                        //         next(createError(404));
                        //     }
                        // },
                        // (error, status) => {
                        //     console.log(status, error);
                        // },
                        // config.nano.createSessionUrl);
                    }
                }else {
                    next(createError(404));
                }
            }, (error, status) => {
                next(createError(404));
                //res.send(status, error);
            });
        }else{
            next(createError(404));
        }
    })
    .catch(error => {
        //console.error(error)
        next(createError(404));
    })


    

};

exports.mediaplayerGame = function(req, res) {
    let staticUrl = config.assetsFrom == "s3" ? config.staticUrl : '/static/'
    let userAgent = req.useragent
    let mType = ""
    switch (userAgent.platform) {
        case 'iPhone':
            mType = 'ios'
            break;
        case 'iPad':
            mType = 'ios'
            break;
        case 'Apple Mac':
            mType = 'ios'
            break;
     
        default:
            mType = userAgent.platform
            break;
    }
    let params = {
        'gmid': parseInt(req.params.gameID),
        'mtype': mType
    }
    let tvData = null
    api.callAuth('dimadminsub/tvdata', params, req, (data, status) => {
        //console.log(data)
        if (data.data) {
            tvData = data.data[0]
            // UNREAL MEDIA PLAYER
            if (data.data[0].ttype == 1) {
                res.render('mediaplayers/unrealMediaplayer', {
                    tvData: tvData,
                    platform : mType,
                    isMobile: userAgent.isMobile,
                    staticUrl: staticUrl
                });
            }
            // 3RD PARTY
            else if (data.data[0].ttype == 2) {
                var channelId = tvData.cam
                var ip = req.params.ip
                var url = `https://glivestreaming.com/api.php?action=geth5link&apiuser=whitesolutions&key=En2Kg0Cb2H&ch=${channelId}&uid=myuser123&ip=${ip}` 
                request(url, function(error, resp, body) {
                    if(!error && resp.statusCode == 200){
                        let response = JSON.parse(body)
                        if(response.Status){
                            if(response.H5LINKROW){
                                res.render('mediaplayers/admin/providerMediaplayer', {
                                    url: response.H5LINKROW
                                });
                            }
                            else {
                                next(createError(404));    
                            }
                        }
                    }
                    else {
                        next(createError(404));
                    }
                });
            }
            // NANO MEDIA PLAYER
            else if (data.data[0].ttype == 5) {
                let streamName = data.data[0].ip
                let nanoParam = {
                    "domainname": req.headers.host,
                    "streamname": streamName,
                    "tag": data.data[0].cam,
                    "referer": req.headers.host,
                    "expires": 0
                }
                //console.log(nanoParam)
                
                
                api.callNanoApi('AddSessionadminsub', nanoParam, req, (nanoData, nanoStatus) => {
                    //console.log(nanoData)
                    if(nanoData && nanoData.status == 200){
                     
                        let nanoRes = nanoData.data
                        tvResponse = {
                            "streamName" : streamName,
                            "securityToken": nanoRes.token,
                            "securityExpires": nanoRes.expires,
                            "securityOptions": nanoRes.options,
                            "securityTag": nanoRes.tag
                        }
                        res.render('mediaplayers/mediaplayer', {
                            media: tvResponse
                        });
                    }else{
                     
                       res.render('errors/error', {
                            message: "404 not found",
                            error: {
                              status: "404",
                              stack: ""
                            }
                        });
                       // createError(404);
                    }

                },
                (error, status) => {
                    console.log(status, error);
                },
                config.nano.createSessionUrl
                );


                // api.callAuth('AddSession', nanoParam, req, (nanoData, nanoStatus) => {
                //     console.log(nanoData)
                //     if(nanoData.status == 200){
                //         tvResponse = {
                //             "streamName" : streamName,
                //             "securityToken": nanoData.data.token,
                //             "securityExpires": nanoData.data.expires,
                //             "securityOptions": nanoData.data.options,
                //             "securityTag": nanoData.data.tag
                //         }
                //         res.render('mediaplayers/mediaplayer', {
                //             media: tvResponse
                //         });
                //     }else{
                //         next(createError(404));
                //     }
                // },
                // (error, status) => {
                //     console.log(status, error);
                // },
                // config.nano.createSessionUrl);
            }
        }
    }, (error, status) => {
        res.send(status, error);
    });

};

exports.mediaplayerVirtual = function(req, res) {
    let staticUrl = config.assetsFrom == "s3" ? config.staticUrl : '/static/'
    let userAgent = req.useragent
    let mType = ""
    switch (userAgent.platform) {
        case 'iPhone':
            mType = 'ios'
            break;
        case 'iPad':
            mType = 'ios'
            break;
        case 'Apple Mac':
            mType = 'ios'
            break;
     
        default:
            mType = userAgent.platform
            break;
    }
    let params = {
        'gmid': parseInt(req.params.gameID),
        'mtype': mType
    }
    let tvData = null
    api.callAuth('dimadminsub/tvdata', params, req, (data, status) => {
        console.log('tvdata', data)
        if (data.data) {
            tvData = data.data[0]
            // UNREAL MEDIA PLAYER
            if (data.data[0].ttype == 1) {
                res.render('mediaplayers/unrealMediaplayer', {
                    tvData: tvData,
                    platform : mType,
                    isMobile: userAgent.isMobile,
                    staticUrl: staticUrl
                });
            }
            // 3RD PARTY
            else if (data.data[0].ttype == 2) {
                var channelId = tvData.cam
                var ip = req.params.ip
                var url = `https://glivestreaming.com/api.php?action=geth5link&apiuser=whitesolutions&key=En2Kg0Cb2H&ch=${channelId}&uid=myuser123&ip=${ip}` 
                request(url, function(error, resp, body) {
                    if(!error && resp.statusCode == 200){
                        let response = JSON.parse(body)
                        if(response.Status){
                            if(response.H5LINKROW){
                                res.render('mediaplayers/admin/providerMediaplayer', {
                                    url: response.H5LINKROW
                                });
                            }
                            else {
                                next(createError(404));    
                            }
                        }
                    }
                    else {
                        next(createError(404));
                    }
                });
            }
            // NANO MEDIA PLAYER
            else if (data.data[0].ttype == 5) {
                let streamName = data.data[0].cam
                let nanoParam = {
                    "domainname": req.headers.host,
                    "streamname": streamName,
                    "tag": data.data[0].ptype,
                    "referer": req.headers.host,
                    "expires": 0
                }
                console.log('nanoParam', nanoParam)
                
                api.callNanoApi('AddSessionadminsub', nanoParam, req, (nanoData, nanoStatus) => {
                    console.log('AddSessionadminsub', nanoData)
                    if(nanoData && nanoData.status == 200){
                        const nanoid_custom = customAlphabet('qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM', 10)
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
                                path.join(
                                    __dirname, 
                                    '../../routes/mediaplayer-clientside.js'
                                ), 
                                {
                                    encoding:"utf8"
                                }
                            );
                        }

                        const nmediaplayer_js = localCache.nmediaplayer_js;

                        app_js += nmediaplayer_js + `})();`;                                         

                        if (true) { // 'true' debug
                            const options = {
                                banner: 'var data=null;',
                                domainLock: [ ],
                                compact: true,
                                controlFlowFlattening: false,
                                deadCodeInjection: true,
                                debugProtection: false,
                                debugProtectionInterval: false,
                                disableConsoleOutput: false,
                                identifierNamesGenerator: 'hexadecimal',
                                log: true,
                                renameGlobals: false,
                                rotateStringArray: true,
                                selfDefending: true,
                                unicodeEscapeSequence: true
                            };
                        
                            app_js = JavaScriptObfuscator.obfuscate(app_js, options).getObfuscatedCode();
                        }

                        res.render('mediaplayers/nanoMediaplayer', {
                            media: {
                                "app_js": "<script>" + app_js + "</script>"
                            },
                            staticUrl: staticUrl
                        });
                        /*let nanoRes = nanoData.data
                        tvResponse = {
                            "streamName" : streamName,
                            "securityToken": nanoRes.token,
                            "securityExpires": nanoRes.expires,
                            "securityOptions": nanoRes.options,
                            "securityTag": nanoRes.tag
                        }
                        console.log(tvResponse)
                        res.render('mediaplayers/nanoMediaplayer', {
                            media: tvResponse,
                            staticUrl: staticUrl
                        });*/
                    }else{
                     
                       res.render('errors/error', {
                            message: "404 not found",
                            error: {
                              status: "404",
                              stack: ""
                            }
                        });
                       // createError(404);
                    }

                },
                (error, status) => {
                    console.log(status, error);
                },
                config.nano.createSessionUrl
                );


                // api.callAuth('AddSession', nanoParam, req, (nanoData, nanoStatus) => {
                //     console.log(nanoData)
                //     if(nanoData.status == 200){
                //         tvResponse = {
                //             "streamName" : streamName,
                //             "securityToken": nanoData.data.token,
                //             "securityExpires": nanoData.data.expires,
                //             "securityOptions": nanoData.data.options,
                //             "securityTag": nanoData.data.tag
                //         }
                //         res.render('mediaplayers/mediaplayer', {
                //             media: tvResponse
                //         });
                //     }else{
                //         next(createError(404));
                //     }
                // },
                // (error, status) => {
                //     console.log(status, error);
                // },
                // config.nano.createSessionUrl);
            }
        }
    }, (error, status) => {
        res.send(status, error);
    });

};
