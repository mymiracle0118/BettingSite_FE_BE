const express = require("express");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const JavaScriptObfuscator = require("javascript-obfuscator");
const router = express.Router();
const AWS = require("aws-sdk");
const config = require("config");
const createError = require("http-errors");
const { nanoid } = require("nanoid");

const redisHelper = require("./../helpers/redis");
const { redisClient } = redisHelper;

const axios = require("axios");
const api = require("../helpers/api");

/* GET home page. */
router.get("/", async function (req, res, next) {
  if (req.header("X-Requested-With") == "com.world777.app") {
    res.redirect("https://sitethemedata.com/pages/1000error/index.html");
  }

  let themeDetail = {};

  let domain = api.getDomain(req.headers.host);
  // let domain = 'loveexch.com'
  // console.log(req.useragent);
  if (req.useragent) {
    if (req.useragent.isBot || req.isCurl) {
      return next(createError(404));
    }
    if (req.useragent.browser == "unknown" || req.useragent.os == "unknown") {
      return next(createError(404));
    }
  }

  // if(req.headers.referer && req.headers.referer.includes("theworld777")){
  //   console.log('referer', req.headers.referer, req.headers.referer.includes("theworld777"))
  //   return next(createError(404));
  // }

  let country = req.headers["cf-ipcountry"]; // HTTP_CF_IPCOUNTRY
  // country = 'US'

  let staticUrl = config.assetsFrom == "s3" ? config.staticUrl : "/static/";

  let rounds = config.casinoRounds;

  let logoPath = "";

  // GET THEMEDETAILS
  await axios({
    method: "post",
    url: `${config.themedataUrl}content/theme`,
    timeout: 1000 * 5, // Wait for 5 seconds
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      domain: domain,
    },
  })
    .then((responseData) => {
      // console.log(responseData.data.data);
      themeDetail = responseData.data.data;
    })
    .catch((error) => {
      console.log(error);
    });

  // await axios
  //   .post(`${config.themedataUrl}content/theme`, timeout: 1000 * 5, {
  //     'domain': domain
  //   })
  //   .then(responseData => {
  //     // console.log(responseData.data.data)
  //     themeDetail = responseData.data.data
  //   })
  //   .catch(error => {
  //     console.error(error)
  //   })

  // SHOW MAINTENANCE PAGE
  if (themeDetail.maintenance == 1) {
    return res.render("errors/maintenance", {
      staticUrl: staticUrl,
      msg: themeDetail.maintenancemsg,
    });
  }

  let version = themeDetail.web_version ? themeDetail.web_version : "007";

  logoPath = `${themeDetail.base_theme_url}${themeDetail.image_logo}`;

  let enc = config.encResponse;
  let securePolling = config.securePolling;
  let scoreboardUrl = config.scoreboardUrl;
  let bucketPath = config.bucketPath;
  let isNewTeen = process.env.NEW_TEEN ? process.env.NEW_TEEN : false;

  if (!req.session.theme) {
    req.session.theme = "dark";
  }

  // req.session.theme = "dark"

  const app_js_path = "/js/app.js";
  let env = config.node_env || "development";

  // READING app.js
  let app_js = fs.readFileSync(
    path.join(__dirname, "../public/static/front" + app_js_path),
    {
      encoding: "utf8",
    }
  );

  // READING encrypt.js
  let encrypt_js = fs.readFileSync(path.join(__dirname, "/encrypt.js"), {
    encoding: "utf8",
  });

  // SET VARIABLES PASSES TO FRONT SIDE
  let front_vars = `
        var SECURE_POLLING = ${securePolling};
        var ENC_RESPONSE = ${enc};
        var COUNTRY = '${country}';
        var SCOREBOARD_URL = '${scoreboardUrl}';
        var BUCKET_PATH = '${bucketPath}';
        var IMG_PATH = '${staticUrl}';
        var EVENT_DT = '${themeDetail.event_dt}';
        var WHATSAPP_LINK = '${themeDetail.whatsapp_link}';
        var FACEBOOK_LINK = '${themeDetail.facebook_link}';
        var TWITTER_LINK = '${themeDetail.twitter_link}';
        var INSTAGRAM_LINK = '${themeDetail.instagram_link}';
        var TELEGRAM_LINK = '${themeDetail.telegram_link}';
        var YOUTUBE_LINK = '${themeDetail.youtube_link}';
        var SUPPORT_NO = '${themeDetail.support_num}';
        var FOOTER_MSG = '${themeDetail.footer_msg}';
        var NEW_EVENTS = ${JSON.stringify(themeDetail.events)};
        var HOME_THEME_BANNERS = '${themeDetail.banners}';
        var HOME_THEME_BANNERS_FROM = '${themeDetail.banners_url}';
        var SLOT_BANNERS = ${JSON.stringify(themeDetail.slot_banners)};
        var SLOT_BANNERS_FROM = '${themeDetail.slot_banner_url}';
        var LOGIN_BG_IMG = '${themeDetail.image_loginbg}';
        var LOADER_IMG = '${themeDetail.image_loader}';
        var AUTH_APK_URL = '${themeDetail.auth_apk_url}';
        var AUTH_APK_VERSION = '${themeDetail.auth_app_version}';
        var APK_URL = '${themeDetail.apk_url}';
        var APK_VERSION = '${themeDetail.app_version}';
        var NEWS = '${themeDetail.news}';
        var THEME_TYPE = '${themeDetail.theme}';
        var BG_BODY = '${themeDetail.bgsidebar}';
        var ADMIN_SETTING = ${JSON.stringify(themeDetail.adminsetting)};
        var ANIMATION_MSG = ${JSON.stringify(themeDetail.anim_msg)};
        var ROUNDS = '${rounds}';
        var NT = '${isNewTeen}';
        var LOGO_PATH_LOGIN = '${logoPath}';
        var INACTIVITY_MODAL = true;
        var DEFAULT_TIMEZONE = 'Asia/Calcutta';
        var RECAPTCHAV3_PUBLIC_KEY = '${config.recaptchav3.public_key}';
        `;

  // front_vars OBFUSCATION
  if (true || env === "production") {
    const encryptJsObfuscationResult = JavaScriptObfuscator.obfuscate(
      front_vars,
      {
        banner: "var data=null;",
        domainLock: [],
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: true,
        debugProtection: false,
        debugProtectionInterval: false,
        disableConsoleOutput: config.consoleDebug,
        identifierNamesGenerator: "hexadecimal",
        log: false,
        renameGlobals: false,
        rotateStringArray: true,
        selfDefending: true,
        unicodeEscapeSequence: true,
      }
    );

    front_vars = encryptJsObfuscationResult.getObfuscatedCode();
  }

  // encrypt.js OBFUSCATION
  if (true || env === "production") {
    const encryptJsObfuscationResult = JavaScriptObfuscator.obfuscate(
      encrypt_js,
      {
        banner: "var data=null;",
        domainLock: [],
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: true,
        debugProtection: false,
        debugProtectionInterval: false,
        disableConsoleOutput: config.consoleDebug,
        identifierNamesGenerator: "hexadecimal",
        log: false,
        renameGlobals: false,
        rotateStringArray: true,
        selfDefending: true,
        unicodeEscapeSequence: true,
      }
    );

    encrypt_js = encryptJsObfuscationResult.getObfuscatedCode();
  }

  // ONLY ENCTYPTION (securePolling = 0)
  if (config.securePolling == 0) {
    app_js = "(function(){" + front_vars + encrypt_js + app_js + "\n})();";

    res.render("front/index", {
      enc: enc,
      securePolling: securePolling,
      domain: domain,
      scoreboardUrl: scoreboardUrl,
      bucketPath: bucketPath,
      staticUrl: staticUrl,
      logoPath: logoPath,
      themeDetail: themeDetail,
      theme: req.session.theme,
      country: country,
      rounds: rounds,
      version: version,
      isNewTeen: isNewTeen,
      app_js: app_js,
    });
  }

  // SECURE POLLING ENABLED (securePolling = 1)
  else if (config.securePolling == 1) {
    const polling_token = nanoid();
    const polling_private_key = nanoid();
    const s_token_btoa = Buffer.from(polling_token).toString("base64");
    const s_token_key_btoa =
      Buffer.from(polling_private_key).toString("base64");

    const clientData = {
      polling_token: polling_token,
      polling_private_key: polling_private_key,
    };

    const key = "client::" + polling_token;
    const oneDay = 60 * 60 * 24;

    redisClient.setex(key, oneDay, JSON.stringify(clientData), function (err) {
      let script_string =
        `
          (function(){
            var _w = Function("x", "return window;")();
            var g_polling_token = "` +
        s_token_btoa +
        `" + "||+||" + "` +
        s_token_key_btoa +
        `";
            g_polling_token = _w["btoa"](g_polling_token);
            g_polling_token = g_polling_token[6] + g_polling_token[10] + g_polling_token[13] + g_polling_token;
            _w['sessionStorage']['setItem']("polling_token", g_polling_token);
          })();
        `;

      // script_string obfuscation
      if (env === "production") {
        const options = {
          banner: "var data=null;",
          domainLock: [],
          compact: true,
          controlFlowFlattening: false,
          deadCodeInjection: true,
          debugProtection: false, // TRY with this setting too
          debugProtectionInterval: false,
          // disableConsoleOutput: false,
          identifierNamesGenerator: "hexadecimal",
          log: false,
          renameGlobals: false,
          rotateStringArray: true,
          selfDefending: true,
          unicodeEscapeSequence: true,
          splitStrings: true,
        };

        script_string = JavaScriptObfuscator.obfuscate(
          script_string,
          options
        ).getObfuscatedCode();
      }

      app_js = "(function(){" + front_vars + encrypt_js + app_js + "\n})();";

      res.render("front/index", {
        enc: enc,
        securePolling: securePolling,
        domain: domain,
        scoreboardUrl: scoreboardUrl,
        bucketPath: bucketPath,
        staticUrl: staticUrl,
        logoPath: logoPath,
        themeDetail: themeDetail,
        script_string: script_string,
        theme: req.session.theme,
        country: country,
        rounds: rounds,
        version: version,
        isNewTeen: isNewTeen,
        app_js: app_js,
      });
    });
  }
});

module.exports = router;
