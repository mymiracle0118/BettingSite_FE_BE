const express = require("express");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const JavaScriptObfuscator = require("javascript-obfuscator");
const router = express.Router();
const AWS = require("aws-sdk");
const config = require("config");
const axios = require("axios");
const s3 = new AWS.S3({
  accessKeyId: config.s3.accessKey /* Put your iam user key */,
  secretAccessKey: config.s3.secretKey /* Put your iam user secret key */,
  Bucket: config.s3.bucketName /* Put your bucket name */,
});

const redisHelper = require("./../helpers/redis");
const { redisClient } = redisHelper;

const api = require("../helpers/admin/api");

/* GET home page. */
router.get("/*", async function (req, res, next) {
  let userAgent = req.useragent;
  //console.log(userAgent.isMobile)

  if (!req.session.s_tokens) {
    req.session.s_tokens = {};
    //console.log("debug1")
    res.redirect("/admin"); // we needed for 'reboot' cookies, so redirect once
    return;
  }

  const s_token = uuidv4();
  const s_token_key = uuidv4();
  const s_token_btoa = Buffer.from(s_token).toString("base64");
  const s_token_key_btoa = Buffer.from(s_token_key).toString("base64");

  if (config.securePolling == 1) {
    req.session.s_tokens[s_token] = {
      s_token_key: s_token_key,
    };
  } else if (config.securePolling == 2) {
    const clientData = {
      s_token: s_token,
      s_token_key: s_token_key,
      ws_id: null,
    };

    const key = config.redis.prefix + "ws:" + s_token;
    const oneDay = 60 * 60 * 24;

    redisClient.setex(key, oneDay, JSON.stringify(clientData));
  }

  const app_js_path = "/static/admin/js/app.js";

  let app_js = fs.readFileSync(
    path.join(__dirname, "../public" + app_js_path),
    {
      encoding: "utf8",
    }
  );

  let encrypt_js = fs.readFileSync(path.join(__dirname, "/encrypt.js"), {
    encoding: "utf8",
  });

  let poll_js_name = "";
  switch (config.securePolling) {
    case 1:
      poll_js_name = "/xhrPoll.js";
      break;

    case 2:
      poll_js_name = "/wsPoll.js";
      break;

    default:
      poll_js_name = "";
      break;
  }

  let poll_js = "";
  if (config.securePolling == 1 || config.securePolling == 2) {
    poll_js = fs.readFileSync(path.join(__dirname, poll_js_name), {
      encoding: "utf8",
    });

    poll_js = poll_js.replace(
      '"__s_token__"',
      'function(){return atob("' + s_token_btoa + '")}'
    );
    poll_js = poll_js.replace(
      '"__s_token_key__"',
      'function(){return atob("' + s_token_key_btoa + '")}'
    );
  }

  let domain = api.getDomain(req.headers.host);
  // let domain = '127.0.0.1:8000'
  let enc = config.encResponse;
  let securePolling = config.securePolling;
  let scoreboardUrl = config.scoreboardUrl;
  let bucketPath = config.bucketPath;
  let staticUrl = config.assetsFrom == "s3" ? config.staticUrl : "/static/";
  let logoPath = "";
  let themeDetail = {
    facebook_link: "",
    twitter_link: "",
    instagram_link: "",
    telegram_link: "",
    youtube_link: "",
    footer_msg: "",
    support_num: "",
    image_logo: "",
    image_loginbg: "",
    image_loader: "",
    banners: "",
  };

  let promise = new Promise((resolve, reject) => {
    try {
      axios({
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
        .then((response) => {
          if (response.data.status == 200) {
            themeDetail = response.data.data;
            if (themeDetail.image_logo) {
              logoPath = `${config.bucketPath}sitethemes/${domain}/admin/${themeDetail.image_logo}`;
            }
          }
          resolve("done!");
        })
        .catch((error) => {
          resolve("error");
          // next(createError(404));
        });
    } catch (error) {
      resolve("error");
    }
  });
  let result = await promise; // wait until the promise resolves (*)

  if (themeDetail.maintenance == "1") {
    return res.render("errors/maintenance", {
      staticUrl: staticUrl,
      msg: themeDetail.maintenancemsg,
    });
  }
  let authApkUrl = config.authApkUrl;
  let version = themeDetail.web_version ? themeDetail.web_version : "007";
  let front_vars = "";
  if (true || env === "production") {
    // SET VARIABLES PASSES TO FRONT SIDE
    front_vars = `
      var SECURE_POLLING = ${securePolling};
      var ENC_RESPONSE = ${enc};
      var SCOREBOARD_URL = '${scoreboardUrl}';
      var BUCKET_PATH = '${bucketPath}';
      var IMG_PATH = '${staticUrl}';
      var HOME_THEME_BANNERS = '${themeDetail.banners}';
      var LOADER_IMG = '${themeDetail.image_loader}';
      var LOGO_PATH = '${logoPath}';
      var AUTH_APK_URL = '${themeDetail.auth_apk_url}';
      var AUTH_APK_VERSION = '${themeDetail.auth_app_version}';
      var DEFAULT_TIMEZONE = 'Asia/Calcutta';
      var THEME_DETAILS = ${JSON.stringify(themeDetail)};
      var RECAPTCHAV3_PUBLIC_KEY = '${config.recaptchav3.public_key}';
      `;

    // front_vars OBFUSCATION
    const encryptJsObfuscationResult1 = JavaScriptObfuscator.obfuscate(
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
    front_vars = encryptJsObfuscationResult1.getObfuscatedCode();

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

    if (config.securePolling == 1 || config.securePolling == 2) {
      const obfuscationResult = JavaScriptObfuscator.obfuscate(poll_js, {
        banner: "var data=null;",
        domainLock: [],
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: true,
        debugProtection: false,
        debugProtectionInterval: false,
        disableConsoleOutput: false,
        identifierNamesGenerator: "hexadecimal",
        log: false,
        renameGlobals: false,
        rotateStringArray: true,
        selfDefending: true,
        unicodeEscapeSequence: true,
      });

      poll_js = obfuscationResult.getObfuscatedCode();
    }
  }

  app_js =
    "(function(){" + front_vars + encrypt_js + poll_js + app_js + "\n})();";

  res.render("admin/index", {
    enc: enc,
    securePolling: securePolling,
    domain: domain,
    scoreboardUrl: scoreboardUrl,
    bucketPath: bucketPath,
    staticUrl: staticUrl,
    logoPath: logoPath,
    themeDetail: themeDetail,
    app_js: app_js,
    authApkUrl: authApkUrl,
    isMobile: userAgent.isMobile,
    version: version,
  });
});

module.exports = router;
