const crypto = require("../../helpers/crypto");
const api = require("../../helpers/api");
const redisHelper = require("../../helpers/redis");
const CryptoJS = require("crypto-js");
const request = require("request");
const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const config = require("config");
const s3 = new AWS.S3({
  accessKeyId: config.s3.accessKey /* Put your iam user key */,
  secretAccessKey: config.s3.secretKey /* Put your iam user secret key */,
  Bucket: config.s3.bucketName /* Put your bucket name */,
});

const axios = require("axios");
const { param } = require("../../routes/front");

// Login
exports.login = async (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  ip = ip.split(",")[0];

  const recaptchaResponse = await axios.get(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      params: {
        secret: config.recaptchav3.secret_key,
        response: data.recaptcha,
        remoteip: ip,
      },
    }
  );
  if (
    recaptchaResponse.data &&
    recaptchaResponse.data.success &&
    recaptchaResponse.data.success == true &&
    recaptchaResponse.data.score > 0
  ) {
    //true
  } else {
    encrypted = crypto.encrypt({
      success: false,
      status: 300,
      msg: "Request Timeout. Please reload the page.",
    });
    return res.status(200).json(encrypted);
  }

  let params = {
    uname: data.username,
    pass: data.password,
    webdom: api.getDomain(req.headers.host),
    // 'webdom': "world777.com"
  };
  api.call("login", params, req, function (data, err) {
    let resData = {};
    if (data.status == 200) {
      console.log(data);
      resData.data = {};
      resData.msg = data.msg;
      resData.status = data.status;
      req.session.jwt_token = data.data.t1.token;
      req.session.barcod = data.data.t1.barcod;

      resData.data.token = uuidv4();
      resData.data.uname = data.data.t1.uname;
      resData.data.login = data.data.t1.flogin;
      resData.data.rdisplay = data.data.t1.rdisplay;
      resData.data.ipop = data.data.t1.ipop;
      resData.data.auth = data.data.t1.auth;

      req.session.user = {
        uname: data.data.t1.uname,
      };
    } else {
      resData.msg = data.msg;
      resData.status = data.status;

      // console.log('err', data)
    }
    encrypted = crypto.encrypt(resData);

    res.status(200).json(encrypted);
  });
};

// Register
exports.register = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    uname: data.username,
    pass: data.password,
    fname: data.fname,
    ct: data.city,
    mno: data.moNo,
  };
  api.call("usercreate", params, req, function (data, err) {
    encrypted = crypto.encrypt(data);
    res.status(200).json(encrypted);
  });
};

// Logout
exports.logout = (req, res) => {
  delete req.session.jwt_token;
  delete req.session.barcod;
  delete req.session.user;
  resData = {
    status: 200,
    msg: "logout successfully",
  };
  res.status(200).json(resData);
};

// Fetch User
exports.user = (req, res) => {
  resData = {
    data: req.session.user,
  };
  res.status(200).json(resData);
};

// Refresh
exports.refresh = (req, res) => {
  resData = {
    data: req.session.user,
  };
  res.status(200).json(resData);
};

// User Data
exports.userdata = (req, res) => {
  let params = {};
  api.callAuth(
    "userdata",
    params,
    req,
    (data, status) => {
      if (data.data && req.session.barcod) {
        // console.log(req.session.barcod, data.data.bcode)
        if (req.session.barcod != data.data.bcode) {
          // console.log('logout here')
          delete req.session.jwt_token;
          delete req.session.barcod;
          delete req.session.user;

          resData = {
            success: false,
            msg: "Please Login",
            status: 401,
          };
          return res.status(401).json(resData);
        }
        req.session.barcod = data.data.bcode;
      }
      try {
        encrypted = crypto.encrypt(data);
      } catch (e) {
        console.error("ERROR: userdata >> crypto.encrypt(data)");
        console.error(e);
        return res.status(500);
      }
      res.status(status).json(encrypted);
    },
    (error, status) => {
      try {
        encrypted = crypto.encrypt(error);
      } catch (e) {
        console.error("ERROR: userdata >> crypto.encrypt(error)");
        console.error(e);
        return res.status(500);
      }
      res.status(status).json(encrypted);
    },
    undefined,
    5000
  );
};

// Upcoming Fixture Open
exports.fixture = (req, res) => {
  let url = config.frontApiOpenUrl + "getsportteam";
  axios
    .post(url, {})
    .then((data) => {
      // console.log(`statusCode: ${data.statusCode}`)
      // console.log(data.data)
      encrypted = crypto.encrypt(data.data);
      return res.status(200).json(encrypted);
    })
    .catch((error) => {
      console.error(error);
    });
};

// Upcoming Fixture with Auth
exports.fixtureAuth = (req, res) => {
  let params = {};
  api.callAuth(
    "getsportteam",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Top Winner
exports.winners = async (req, res) => {
  let domain = api.getDomain(req.headers.host);
  let winnersDetail = {
    status: 200,
    data: {
      t1: [],
    },
  };
  let commonDataPromise = new Promise((resolve, reject) => {
    try {
      var options = {
        Bucket: config.s3.bucketName,
        Key: config.s3.themeDir + "common/topten.json",
      };

      s3.getObject(options, function (err, data) {
        if (data) {
          winnersDetail.data = JSON.parse(data.Body);
          winnersDetail.status = 200;
          // console.log(config.s3.themeDir + 'common/topten.json', winnersDetail.data)
          resolve("success");
        } else {
          resolve("error");
        }
      });
    } catch (error) {
      resolve("error");
    }
  });

  await commonDataPromise; // wait until the promise resolves (*)

  let themeDataPromise = new Promise((resolve, reject) => {
    try {
      var options = {
        Bucket: config.s3.bucketName,
        Key: config.s3.themeDir + domain + "/topten.json",
      };

      s3.getObject(options, function (err, data) {
        if (data) {
          winnersDetail.data = JSON.parse(data.Body);
          winnersDetail.status = 200;
          // console.log(config.s3.themeDir + domain + '/topten.json', winnersDetail.data)
          resolve("success");
        } else {
          resolve("error");
        }
      });
    } catch (error) {
      resolve("error");
    }
  });

  await themeDataPromise; // wait until the promise resolves (*)

  encrypted = crypto.encrypt(winnersDetail);
  return res.status(200).json(encrypted);

  // let data = req.body
  // data = crypto.decrypt(data)
  // // console.log(data)
  // let url = config.frontApiUrl + 'getuserentry'
  // axios
  //   .post(url, {
  //     'domain': data.d
  //   })
  //   .then(data => {
  //     // console.log(`statusCode: ${data.statusCode}`)
  //     // console.log(data.data)
  //     encrypted = crypto.encrypt(data.data)
  //     return res.status(200).json(encrypted);
  //   })
  //   .catch(error => {
  //     console.error(error)
  //   })
};

// Tree Data
exports.treedata = (req, res) => {
  let params = {};
  api.callAuth(
    "treeviewdata",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Change Theme
exports.changeTheme = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);
  console.log(data.theme);
  req.session.theme = data.theme;
  res
    .status(200)
    .json(crypto.encrypt({ status: 200, msg: "theme change successfully" }));
};

// Event List
exports.eventlist = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    picon: data.picon,
  };

  api.callAuth(
    "casinolist",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Tab List
exports.tablist = (req, res) => {
  let params = {};

  api.callAuth(
    "gametab",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Button List Sports
exports.buttonlist = (req, res) => {
  let params = {};

  api.callAuth(
    "buttonlist",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Button List Casino
exports.buttonlistCs = (req, res) => {
  let params = {};

  api.callAuth(
    "buttonlistcs",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Change Auto Con
exports.changeautocon = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    autocon: data.value,
  };

  api.callAuth(
    "autoconupdate",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Get Data
exports.getdata = (req, res) => {
  let params = {};

  api.callAuth(
    "getmid",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Highlight Home Data
exports.highlighthome = (req, res) => {
  let data = req.body;
  try {
    data = crypto.decrypt(data);
  } catch (e) {
    console.error("ERROR: highlightdata >> crypto.decrypt(data)");
    console.error(e);
    return res.status(500);
  }

  let params = {
    etid: data.etid,
    m: data.m,
    action: "all",
  };

  api.callAuth(
    "highlightdata",
    params,
    req,
    (data, status) => {
      try {
        encrypted = crypto.encrypt(data);
      } catch (e) {
        console.error("ERROR: highlightdata >> crypto.encrypt(data)");
        console.error(e);
        return res.status(500);
      }
      res.status(status).json(encrypted);
    },
    (error, status) => {
      try {
        encrypted = crypto.encrypt(error);
      } catch (e) {
        console.error("ERROR: highlightdata >> crypto.encrypt(error)");
        console.error(e);
        return res.status(500);
      }
      res.status(status).json(encrypted);
    }
  );
};

// Game Details
exports.gamedetail = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);
  if (config.securePolling == 2) {
    let s_token = data.s_token;
    redisHelper.getRedisClientData(s_token).then((clientData) => {
      clientData.jwt_token = req.session.jwt_token;
      clientData.type = "FRONT";
      redisHelper.setRedisClientData(s_token, clientData).then((err) => {
        // console.log("Client Data JWT Set :: " + err);
      });
    });
  }

  let params = {
    gmid: data.gmid,
    etid: data.etid,
  };

  api.callAuth(
    "gamedetail",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// CricketV Data
exports.cricketvData = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    gmid: data.gmid,
    gtype: data.gtype,
  };

  api.callAuth(
    "getcricketvdata",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// User Book
exports.userbook = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    gmid: data.gmid,
  };

  api.callAuth(
    "userbook",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Game Data Polling
exports.gamedata = (req, res) => {
  // Normal Encrypted
  if (config.securePolling == 0) {
    let data = req.body;
    data = crypto.decrypt(data);

    if (data.vir == false) {
      if (data.etid == 4) {
        var url = "gamedata2";
      } else {
        var url = "gamedata";
      }
    } else {
      var url = "gamedata";
    }

    // console.log(url)

    let params = {
      gmid: data.gmid,
      m: data.m,
    };

    api.callAuth(
      url,
      params,
      req,
      (data, status) => {
        // console.log(data)
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      },
      (error, status) => {
        encrypted = crypto.encrypt(error);
        res.status(status).json(encrypted);
      },
      config.frontGameDataApiUrl,
      3000
    );
  }
  // XHR Polling with S_Token
  else if (config.securePolling == 1) {
    const s_token = req.query.s_token;
    const s_token_object = req.session.s_tokens[s_token];
    const s_token_key = s_token_object.s_token_key;

    let data = {
      error: "no data",
    };

    if (req.body.data) {
      try {
        const data_bytes = CryptoJS.AES.decrypt(req.body.data, s_token_key);
        data = data_bytes.toString(CryptoJS.enc.Utf8);
        data = JSON.parse(data);
      } catch (e) {
        console.error();
      }
    }

    let params = {
      gmid: data.gmid,
      m: data.m,
    };

    if (data.vir == false) {
      if (data.etid == 4) {
        var url = "gamedata2";
      } else {
        var url = "gamedata";
      }
    } else {
      var url = "gamedata";
    }

    // console.log(url)

    api.callAuth(
      url,
      params,
      req,
      (data, status) => {
        encrypted = crypto.prepareResponse(data, s_token_key);
        res.status(status).json({
          data: encrypted,
        });
      },
      (error, status) => {
        encrypted = crypto.prepareResponse(error, s_token_key);
        res.status(status).json({
          data: encrypted,
        });
      },
      config.frontGameDataApiUrl
    );
  }
};

// fancy Book Game Detail
exports.fancybookdata = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  if (data.type == "fancy" || data.type == "khado" || data.type == "meter") {
    let params = {
      gmid: data.gmid,
      mid: data.mid,
      sid: data.sid,
      type: data.type,
    };

    api.callAuth(
      "fancybook",
      params,
      req,
      (data, status) => {
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      },
      (error, status) => {
        encrypted = crypto.encrypt(error);
        res.status(status).json(encrypted);
      }
    );
  }
};

// fancy Book Patti2
exports.fancybookpopup = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    mid: data.mid,
    sid: data.sid,
  };

  api.callAuth(
    "fancypopup",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Diamond/Slot Casino List
exports.casinoList = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    webdom: api.getDomain(req.headers.host),
    // 'webdom': "world777.com",
    ctype: data.type,
  };
  // console.log(params);
  api.callAuth(
    "getcasinolist",
    params,
    req,
    (data, status) => {
      // console.log(data)
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// All Casino List
exports.casinoAllList = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {};
  // console.log(params);
  api.callAuth(
    "casinolisttest",
    params,
    req,
    (data, status) => {
      // console.log(data)
      // data.data.push({ctype: 16, sno: 1.1, cname: "Vivo Games", type: "CS"})
      // data.data.push({ctype: 17, sno: 1.2, cname: "Lucky Streak", type: "CS"})
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Slot Provider List
exports.casinoProviderList = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {};
  // console.log(params);
  api.callAuth(
    "providerlist",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Slot Category List
exports.casinoCatList = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    pid: data.pid,
  };

  api.callAuth(
    "categorylist",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Slot List
exports.casinoSlotList = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    cid: data.cid,
  };
  // console.log(params)
  api.callAuth(
    "slotlist",
    params,
    req,
    (data, status) => {
      // console.log(data)
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Diamond/Slot Casino Tab List
exports.casinoTabList = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    webdom: api.getDomain(req.headers.host),
    ctype: data.type,
  };

  api.callAuth(
    "getcasinotablist",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Diamond/Slot Casino Table List
exports.casinoTableList = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    webdom: api.getDomain(req.headers.host),
    gmid: data.gmid,
    ismob: data.ismob,
  };

  api.callAuth(
    "GetCasinoTableList",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Slot Casino Banners
exports.banners = async (req, res) => {
  let domain = api.getDomain(req.headers.host);
  let bannersDetail = {
    status: 200,
    data: {
      t1: [],
    },
  };
  let commonDataPromise = new Promise((resolve, reject) => {
    try {
      var options = {
        Bucket: config.s3.bucketName,
        Key: config.s3.themeDir + "common/cbanners.json",
      };

      s3.getObject(options, function (err, data) {
        if (data) {
          bannersDetail.data = JSON.parse(data.Body);
          bannersDetail.from = "common";
          bannersDetail.status = 200;
          // console.log(config.s3.themeDir + 'common/cbanners.json', bannersDetail.data)
          resolve("success");
        } else {
          resolve("error");
        }
      });
    } catch (error) {
      resolve("error");
    }
  });

  await commonDataPromise; // wait until the promise resolves (*)

  let themeDataPromise = new Promise((resolve, reject) => {
    try {
      var options = {
        Bucket: config.s3.bucketName,
        Key: config.s3.themeDir + domain + "/cbanners.json",
      };

      s3.getObject(options, function (err, data) {
        if (data) {
          bannersDetail.data = JSON.parse(data.Body);
          bannersDetail.from = domain;
          bannersDetail.status = 200;
          // console.log(config.s3.themeDir + domain + '/cbanners.json', bannersDetail.data)
          resolve("success");
        } else {
          resolve("error");
        }
      });
    } catch (error) {
      resolve("error");
    }
  });

  await themeDataPromise; // wait until the promise resolves (*)

  encrypted = crypto.encrypt(bannersDetail);
  return res.status(200).json(encrypted);

  // let data = req.body
  // data = crypto.decrypt(data)

  // let params = {}

  // api.callAuth('bannerdata', params, req, (data, status) => {
  //   encrypted = crypto.encrypt(data)
  //   res.status(status).json(encrypted);
  // }, (error, status) => {
  //   encrypted = crypto.encrypt(error)
  //   res.status(status).json(encrypted);
  // });
};

// Welcome Banners
exports.welcomeBanners = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {};

  api.callAuth(
    "pbannerdata",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Launch Slot Casino Iframe
exports.casinoSlot = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  // EZUGI
  if (data.type == 1) {
    let params = {
      tid: data.tableid,
    };

    api.callAuth(
      "loginez",
      params,
      req,
      (data, status) => {
        if (data.status == 200) {
          data.data = data.data.url;
        }
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      },
      (error, status) => {
        encrypted = crypto.encrypt(error);
        res.status(status).json(encrypted);
      }
    );
  }
  // Super Spade
  else if (data.type == 2) {
    let params = {
      rurl: api.getDomain(req.headers.host),
      gamename: data.gamename,
      tid: data.tableid,
    };
    // console.log(params)
    api.callAuth(
      "loginss",
      params,
      req,
      (data, status) => {
        // console.log(data)
        if (data.status == 200) {
          data.data = data.data.url;
        }
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      },
      (error, status) => {
        encrypted = crypto.encrypt(error);
        res.status(status).json(encrypted);
      }
    );
  }
  // QTech
  else if (data.type == 3) {
    let params = {
      device: "desktop",
      gid: data.gid,
    };
    console.log(params);
    api.callAuth(
      "loginqt",
      params,
      req,
      (data, status) => {
        console.log(data);
        if (data.status == 200) {
          data.data = data.data.url;
        }
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      },
      (error, status) => {
        encrypted = crypto.encrypt(error);
        res.status(status).json(encrypted);
      }
    );
  }
  // Evolution
  else if (data.type == 5) {
    let params = {
      tid: data.tableid,
    };

    api.callAuth(
      "LoginEv",
      params,
      req,
      (data, status) => {
        if (data.status == 200) {
          data.data = data.data.url;
        }
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      },
      (error, status) => {
        encrypted = crypto.encrypt(error);
        res.status(status).json(encrypted);
      }
    );
  }
  // CockFight
  else if (data.type == 6) {
    let params = {
      gamename: data.tableid,
    };
    // console.log(params)
    api.callAuth(
      "logincf",
      params,
      req,
      (data, status) => {
        // console.log(data)
        if (data.status == 200) {
          data.data = data.data.url;
        }
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      },
      (error, status) => {
        encrypted = crypto.encrypt(error);
        res.status(status).json(encrypted);
      }
    );
  }

  // TGS
  else if (data.type == 12) {
    let params = {
      gid: data.gid,
    };
    console.log(params);
    api.callAuth(
      "logintgs",
      params,
      req,
      (data, status) => {
        console.log(data);
        if (data.status == 200) {
          data.data = data.data.url;
        }
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      },
      (error, status) => {
        encrypted = crypto.encrypt(error);
        res.status(status).json(encrypted);
      }
    );
  }

  // TGS CASINO
  else if (data.type == 16 || data.type == 17) {
    let params = {
      gid: data.tableid,
    };
    console.log(params);
    api.callAuth(
      "logintgs",
      params,
      req,
      (data, status) => {
        console.log(data);
        if (data.status == 200) {
          data.data = data.data.url;
        }
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      },
      (error, status) => {
        encrypted = crypto.encrypt(error);
        res.status(status).json(encrypted);
      }
    );
  }

  // PlayGon
  else if (data.type == 13) {
    let params = {
      tid: data.tableid,
    };
    console.log(params);
    api.callAuth(
      "loginvl",
      params,
      req,
      (data, status) => {
        console.log(data);
        if (data.status == 200) {
          data.data = data.data.url;
        }
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      },
      (error, status) => {
        encrypted = crypto.encrypt(error);
        res.status(status).json(encrypted);
      }
    );
  }

  // EVO SLOT
  else if (data.type == 14) {
    let params = {
      gid: data.gid,
    };
    console.log(params);
    api.callAuth(
      "logines",
      params,
      req,
      (data, status) => {
        console.log(data);
        if (data.status == 200) {
          data.data = data.data.url;
        }
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      },
      (error, status) => {
        encrypted = crypto.encrypt(error);
        res.status(status).json(encrypted);
      }
    );
  }
};

// Fantacy Games (Other)
exports.casinoOther = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    mobile: data.mobile,
    ctype: data.type,
  };

  api.callAuth(
    "othercasino",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Launch Fantacy Games (Other)
exports.casinoLaunchOther = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  // RUNNER
  if (data.id == "sports-runner") {
    let params = {
      rurl: api.getDomain(req.headers.host),
      gamename: data.id,
      device: data.device,
    };

    api.callAuth(
      "loginr",
      params,
      req,
      (data, status) => {
        if (data.status == 200) {
          data.data = data.data.gameUrl;
        }
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      },
      (error, status) => {
        encrypted = crypto.encrypt(error);
        res.status(status).json(encrypted);
      }
    );
  }
  // DREAM11
  else if (data.id == "dream") {
    let params = {
      gtype: data.id,
    };

    api.callAuth(
      "userlogin",
      params,
      req,
      (data, status) => {
        if (data.status == 200) {
          data.data = data.data.url;
        }
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      },
      (error, status) => {
        encrypted = crypto.encrypt(error);
        res.status(status).json(encrypted);
      }
    );
  }
  // DABBA
  else if (data.id == "daba") {
    let params = {
      gtype: data.id,
    };

    api.callAuth(
      "userlogin",
      params,
      req,
      (data, status) => {
        if (data.status == 200) {
          data.data = data.data.url;
        }
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      },
      (error, status) => {
        encrypted = crypto.encrypt(error);
        res.status(status).json(encrypted);
      }
    );
  }
  // POPtheball
  else if (data.id == "pop-the-ball") {
    let params = {
      gtype: data.id,
    };
    // console.log(params)
    api.callAuth(
      "loginpoptheball",
      params,
      req,
      (data, status) => {
        // console.log(data)
        if (data.status == 200) {
          data.data = data.data.url;
        }
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      },
      (error, status) => {
        encrypted = crypto.encrypt(error);
        res.status(status).json(encrypted);
      }
    );
  }
  // LUDO CLUB
  else if (data.id == "ludo-club") {
    let params = {
      gtype: data.id,
    };
    // console.log(params)
    api.callAuth(
      "loginludo",
      params,
      req,
      (data, status) => {
        // console.log(data)
        if (data.status == 200) {
          data.data = data.data.url;
        }
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      },
      (error, status) => {
        encrypted = crypto.encrypt(error);
        res.status(status).json(encrypted);
      }
    );
  }
  // LUDO LANDS
  else if (data.id == "ludo-lands") {
    let params = {
      gtype: data.id,
    };
    // console.log(params)
    api.callAuth(
      "loginludolands",
      params,
      req,
      (data, status) => {
        // console.log(data)
        if (data.status == 200) {
          data.data = data.data.url;
        }
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      },
      (error, status) => {
        encrypted = crypto.encrypt(error);
        res.status(status).json(encrypted);
      }
    );
  }
  // RUMMY CLUB
  else if (data.id == "rummy") {
    let params = {
      gtype: data.id,
    };
    console.log(params);
    api.callAuth(
      "loginrummy",
      params,
      req,
      (data, status) => {
        console.log(data);
        if (data.status == 200) {
          data.data = data.data.url;
        }
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      },
      (error, status) => {
        encrypted = crypto.encrypt(error);
        res.status(status).json(encrypted);
      }
    );
  }
  // BINARY
  else if (data.id == "binary") {
    let params = {
      gtype: data.id,
    };
    // console.log(params)
    api.callAuth(
      "loginiqoption",
      params,
      req,
      (data, status) => {
        // console.log(data)
        if (data.status == 200) {
          data.data = data.data.url;
        }
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      },
      (error, status) => {
        encrypted = crypto.encrypt(error);
        res.status(status).json(encrypted);
      }
    );
  }
  // TV, Score Board, and Graphics
  else if (data.id == "tv" || data.id == "sb" || data.id == "graphic") {
    let params = {
      gtype: data.id,
    };
    // console.log('userlogin' , params)
    api.callAuth(
      "userlogin",
      params,
      req,
      (data, status) => {
        // console.log(data)
        if (data.status == 200) {
          // if(data.id == 'graphic'){
          //   data.data = data.data.url
          // }else{
          //   data.data = data.data.token
          // }
        }
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      },
      (error, status) => {
        encrypted = crypto.encrypt(error);
        res.status(status).json(encrypted);
      }
    );
  }
};

// Rules
exports.rules = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {};

  api.callAuth(
    "rules",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Accept Rules
exports.acceptRules = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {};

  api.callAuth(
    "acceptrules",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Account Statement Report
exports.accountstatement = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    fdt: data.dateFrom,
    tdt: data.dateTo,
    type: data.type,
  };

  api.callAuth(
    "accountstatement",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Account Statement Popup
exports.accstatepopup = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);
  if (
    data.gtype == "cricketv" ||
    data.gtype == "cricketv2" ||
    data.gtype == "cricketv3"
  ) {
    var url = "cricketv3popup";
    var params = {
      mid: parseInt(data.mid),
    };
  } else if (data.gtype == "superover") {
    var url = "cricketsopopup";
    var params = {
      mid: parseInt(data.mid),
    };
  } else {
    var url = "accstatepopup";
    var params = {
      gmid: data.gmid,
      mid: data.mid,
      gtype: data.gtype,
      dtype: data.dtype,
    };
  }
  // console.log(params)
  api.callAuth(
    url,
    params,
    req,
    (data, status) => {
      // console.log(data)
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Account Statement Slot Casino (TP) List
exports.tpcasinolist = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {};

  api.callAuth(
    "tpgtypelist",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Account Statement Slot Casino (TP) Soda
exports.tpcasinosoda = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    ctype: data.ctype,
  };

  api.callAuth(
    "tpreport",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Account Statement Dabba
exports.accdabaplayers = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    btid: data.btid,
  };

  api.callAuth(
    "accdababet",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Account Statement Dream
exports.accdreambet = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    btid: data.btid,
  };

  api.callAuth(
    "accdreambet",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Current Bet Report
exports.currentbets = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    gtype: data.gtype,
    type: data.type,
  };

  api.callAuth(
    "matchdtlbet",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Activity Report
exports.activity = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    fdt: data.dateFrom,
    tdt: data.dateTo,
    type: data.type,
  };

  api.callAuth(
    "history",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Ip Detail
exports.ipdetail = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    ipDemo: data.ip,
  };

  api.callAuth(
    "chkip",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Get Auth Status
exports.getauth = (req, res) => {
  api.callAuth(
    "getauth",
    {},
    req,
    (data, status) => {
      // console.log(data)
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Auth On
exports.authon = (req, res) => {
  api.callAuth(
    "authon",
    {},
    req,
    (data, status) => {
      // console.log(data)
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Auth off
exports.authoff = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  var URL = "";
  if (data.authId == "1") {
    URL = "authoff";
  } else if (data.authId == "2") {
    URL = "authofftele";
  }

  let params = {
    code: data.code,
  };

  api.callAuth(
    URL,
    params,
    req,
    (data, status) => {
      // console.log(data)
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Get Tele Connection Id
exports.authontele = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    upass: data.password,
  };

  api.callAuth(
    "authontele",
    params,
    req,
    (data, status) => {
      // console.log(data)
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Tele generate OTP
exports.genotptele = (req, res) => {
  api.callAuth(
    "genotptele",
    {},
    req,
    (data, status) => {
      // console.log(data)
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Tele user chech
exports.userchecktele = (req, res) => {
  api.callAuth(
    "userchecktele",
    {},
    req,
    (data, status) => {
      // console.log("userchecktele", data)
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Verify OTP
exports.verifycode = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);
  // console.log(data)
  var URL = "";
  if (data.authId == "1") {
    URL = "verifycode";
  } else if (data.authId == "2") {
    URL = "verifycodetele";
  }

  let params = {
    code: data.code,
  };
  // console.log(URL, params)
  api.callAuth(
    URL,
    params,
    req,
    (data, status) => {
      if (data.status == 200) {
        req.session.jwt_token = data.data;
        // console.log(data)
      }
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Casino Result Table List
exports.tablelist = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {};

  api.callAuth(
    "casino",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Casino Results Report
exports.casinoresults = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    dt: data.dateFrom,
    gtype: data.type,
  };

  api.callAuth(
    "casinores",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Get TV Url
exports.getTvUrl = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);
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
    gmid: data.gmid,
    platform: mType,
    ipa: data.ip,
  };
  // console.log(params)
  api.callAuth(
    "tvurl",
    params,
    req,
    (data, status) => {
      // console.log(data)
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Get Deposite Url
exports.getDepositeUrl = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);
  let depoAmt = data.amt;
  let params = {
    amt: parseInt(depoAmt),
  };
  // console.log(params)
  api.callAuth(
    "paymentval",
    params,
    req,
    (data, status) => {
      // console.log(data)
      if (status == 200 && data.status == 200) {
        api.getPaymentUrl(data.data.cod, depoAmt, (paymentUrlData, status) => {
          encrypted = crypto.encrypt(paymentUrlData);
          res.status(status).json(encrypted);
        });
      } else {
        encrypted = crypto.encrypt(data);
        res.status(status).json(encrypted);
      }
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Live Casino Settled Bets Report
exports.addWithdrawRequest = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    atype: data.atype,
    bname: data.bname,
    ifsc: data.ifsc,
    aname: data.aname,
    anumber: data.anumber,
    rem: "",
    amt: data.amt,
    uname: data.uname,
  };
  // console.log(params)
  api.callAuth(
    "createreq",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Live Casino Settled Bets Report
exports.getWithdrawRequest = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    dt: data.dateFrom,
    ctype: data.type,
  };

  api.callAuth(
    "getreq",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};
// Live Casino Settled Bets Report
exports.tpcasinoresult = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    dt: data.dateFrom,
    ctype: data.type,
  };

  api.callAuth(
    "tpallreport",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Live Casino Un-Settled Bets Report
exports.tpcurrentbets = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {};

  api.callAuth(
    "tpcurrentbets",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Update Button Values
exports.buttonupdate = async (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  var response = [];

  for (let index = 0; index < data.btns.length; index++) {
    const btn = data.btns[index];
    var buttonUpdate = new Promise((resolve, reject) => {
      try {
        let params = {
          bid: btn.bid,
          btxt: btn.btxt,
          bval: btn.bval,
        };

        api.callAuth(
          "buttonupdate",
          params,
          req,
          (data, status) => {
            response = data;
            resolve("success");
          },
          (error, status) => {
            response = error;
            resolve("error");
          }
        );
      } catch (error) {
        resolve("error");
      }
    });

    await buttonUpdate; // wait until the promise resolves (*)
  }
  // console.log(response)
  // res.status(200).json(response);
  encrypted = crypto.encrypt(response);
  res.status(200).json(encrypted);
};

// Update Casino Button Values
exports.buttonupdatecs = async (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  var response = [];

  for (let index = 0; index < data.btns.length; index++) {
    const btn = data.btns[index];
    var buttonUpdate = new Promise((resolve, reject) => {
      try {
        let params = {
          bid: btn.bid,
          btxt: btn.btxt,
          bval: btn.bval,
        };

        api.callAuth(
          "buttonupdatecs",
          params,
          req,
          (data, status) => {
            response = data;
            resolve("success");
          },
          (error, status) => {
            response = error;
            resolve("error");
          }
        );
      } catch (error) {
        resolve("error");
      }
    });

    await buttonUpdate; // wait until the promise resolves (*)
  }
  // console.log(response)
  // res.status(200).json(response);
  encrypted = crypto.encrypt(response);
  res.status(200).json(encrypted);
};

// Change Password
exports.passwordupdate = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    uname: data.uname,
    newpass: data.newPassword,
    pass: data.password,
    webdom: api.getDomain(req.headers.host),
    // 'webdom': "world777.com"
  };
  // console.log(params)
  api.callAuth(
    "changepass",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Search By Gamename
exports.searchgame = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    ename: data.name,
  };
  // console.log(params)
  api.callAuth(
    "gameser",
    params,
    req,
    (data, status) => {
      // console.log(data)
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Market Analysis
exports.marketanalysis = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {};

  api.callAuth(
    "marketanalysis",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Get Redis Id
// exports.getdetail = (req, res) => {
//   let data = req.body
//   data = crypto.decrypt(data)

//   let params = {
//     'etid': data.id
//   }

//   api.callAuth('getm', params, req, (data, status) => {
//     encrypted = crypto.encrypt(data)
//     res.status(status).json(encrypted);
//   }, (error, status) => {
//     encrypted = crypto.encrypt(error)
//     res.status(status).json(encrypted);
//   });
// }

// Casino Rules
exports.casinoRules = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    gtype: data.type,
  };
  // console.log(params)
  api.callAuth(
    "casinorules",
    params,
    req,
    (data, status) => {
      // console.log(data)
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Casino Rules HTML
exports.casinoRulesHtml = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    gtype: data.type,
  };
  // console.log(params)
  api.callAuth(
    "getrules",
    params,
    req,
    (data, status) => {
      // console.log(data)
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// KBC Payout
exports.kbcPayout = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    gtype: data.type,
    mid: data.mid,
    pid: data.pid,
    sta: data.sta,
  };
  console.log(param);
  api.callAuth(
    "kbcpayout",
    params,
    req,
    (data, status) => {
      console.log(data);
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Casino Data
exports.casinoData = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    gtype: data.type,
  };

  api.callAuth(
    "getteenodds",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Virtual Casino Data
exports.vCasinoData = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    gtype: data.type,
  };

  api.callAuth(
    "getvodds",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Cricket V3 Data
exports.cricketv3Data = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    gtype: data.type,
  };

  api.callAuth(
    "getcricketv3data",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Casino Book
exports.casinoBook = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    mid: data.mid,
    gtype: data.gType,
  };

  let URL = data.gType == "kbc" ? "kbcuserbook" : "casinouserbook";

  api.callAuth(
    URL,
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Virtua Casino Book
exports.vCasinoBook = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    mid: data.mid,
    gtype: data.gType,
  };

  let URL = "vcasinouserbook";
  // console.log(URL, params);
  api.callAuth(
    URL,
    params,
    req,
    (data, status) => {
      // console.log(data);
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Casino Last 10 Results
exports.casinoLastResults = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    gtype: data.gType,
  };

  api.callAuth(
    "last10result",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Virtual Casino Last 10 Results
exports.vCasinoLastResults = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    gtype: data.gType,
  };

  api.callAuth(
    "vlast10result",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Worli Section Data
exports.worliSectionData = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    sid: data.sid,
    gtype: data.gtype,
  };

  api.callAuth(
    "worlirule",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Worli Section Pana
exports.worliSectionPana = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    sid: data.sid,
    urate: data.urate.toString(),
  };
  // console.log(params)
  api.callAuth(
    "worlipana",
    params,
    req,
    (data, status) => {
      // console.log(data)
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};

// Placebet Game Detail
exports.placebet = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  if (data.amount <= 0 || data.uRate <= 0) {
    let data = {
      success: false,
      msg: "Enter valid data",
    };
    let encrypted = crypto.encrypt(data);
    return res.status(200).json(encrypted);
  }

  let params = {
    gmid: data.gameId,
    mid: data.marketId,
    sid: data.sectionId,
    urate: data.uRate,
    amt: data.amount,
    btype: data.betType,
    gtype: data.gType,
    etid: data.etid,
    cid: data.cid,
  };

  let URL = "";
  if (data.gType == "match") {
    URL = "placebet";
  } else if (data.gType.toLowerCase() == "match1" && !data.cType) {
    URL = "placebetbm";
  } else if (
    data.gType.toLowerCase() == "match1" &&
    (data.cType == "cricketv" ||
      data.cType == "cricketv2" ||
      data.cType == "match")
  ) {
    if (data.cType) {
      params.sgtype = data.cType;
    }
    URL = "placebetbm";
  } else if (
    data.gType.toLowerCase() == "match1" &&
    (data.cType == "cricketv3" || data.cType == "superover")
  ) {
    params.sgtype = data.cType;
    URL = "placebetcricketv3";
  } else if (data.gType.toLowerCase() == "fancy") {
    if (data.cType) {
      params.sgtype = data.cType;
    }
    URL = "placebetfancy";
    params.bhav = data.size;
  } else if (data.gType == "meter") {
    URL = "placebetmeter";
    params.bhav = data.size;
  } else if (data.gType == "khado") {
    URL = "placebetkhado";
    params.bhav = data.size;
  } else if (
    data.gType == "fancy1" ||
    data.gType == "oddeven" ||
    data.gType == "four" ||
    data.gType == "six" ||
    data.gType == "wicket"
  ) {
    if (data.cType) {
      params.sgtype = data.cType;
    }
    URL = "placebetfancy1";
  } else if (data.gType == "cricketcasino") {
    URL = "placebetcrics";
  } else {
    URL = "";
  }
  console.log(URL, params);
  api.callAuth(
    URL,
    params,
    req,
    (response, status) => {
      console.log(response);
      encrypted = crypto.encrypt(response);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    },
    config.frontPlacebetUrl
  );
};

// Placebet Trader Game Detail
exports.placebettdr = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  if (data.amount <= 0 || data.uRate <= 0) {
    let data = {
      success: false,
      msg: "Enter valid data",
    };
    let encrypted = crypto.encrypt(data);
    return res.status(200).json(encrypted);
  }
  console.log(data);
  let params = {
    gmid: data.gameId,
    mid: data.marketId,
    sid: data.sectionId,
    urate: data.uRate,
    uamt: data.amount,
    btype: data.betType,
    gtype: data.gType,
    btid: data.btId,
    etid: data.etid,
    cid: data.cid,
  };

  let URL = "placebettdr";

  api.callAuth(
    URL,
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    },
    config.frontPlacebetUrl
  );
};

// Placebet Casino
exports.placebetcasino = (req, res) => {
  // const size = Buffer.byteLength(JSON.stringify(req.body));
  // console.log(size);
  let data = req.body;
  data = crypto.decrypt(data);

  if (data.amount <= 0 || data.uRate <= 0) {
    let data = {
      success: false,
      msg: "Enter valid data",
    };
    let encrypted = crypto.encrypt(data);
    return res.status(200).json(encrypted);
  }

  let params = {
    subtype: data.subType,
    mid: data.marketId,
    sid: data.sectionId,
    subid: data.subId,
    urate: data.uRate,
    amt: data.amount,
    btype: data.betType,
    gtype: data.gameType,
  };

  let URL = "";
  if (
    data.gameType == "teen" ||
    data.gameType == "teen20" ||
    data.gameType == "teen20b" ||
    data.gameType == "teen8" ||
    data.gameType == "teen9" ||
    data.gameType == "teen6"
  ) {
    URL = "placebetteen";
  } else if (data.gameType == "baccarat" || data.gameType == "baccarat2") {
    URL = "placebetbaccarat";
  } else if (
    data.gameType == "lucky7" ||
    data.gameType == "lucky7eu" ||
    data.gameType == "lucky7eu2"
  ) {
    URL = "placebetlucky7";
  } else if (
    data.gameType == "poker" ||
    data.gameType == "poker6" ||
    data.gameType == "poker20"
  ) {
    URL = "placebetpoker";
  } else if (
    data.gameType == "dt6" ||
    data.gameType == "dt20" ||
    data.gameType == "dt202" ||
    data.gameType == "dtl20"
  ) {
    URL = "placebetdt";
  } else if (data.gameType == "aaa" || data.gameType == "btable") {
    URL = "placebetbc";
  } else if (data.gameType == "worli" || data.gameType == "worli2") {
    params.urate = parseInt(data.bhav);
    URL = "placebetworli";
  } else if (data.gameType == "war" || data.gameType == "paasa") {
    URL = "placebetother";
  } else if (data.gameType == "queen") {
    URL = "placebetqueen";
  } else if (data.gameType == "race20") {
    URL = "placebetrace";
  } else if (data.gameType == "3cardj") {
    if (data.ucard) {
      let ucard = data.ucard;
      let ucardLength = ucard.length;
      // console.log(ucardLength)

      if (ucardLength == 3) {
        if (ucard.includes(10)) {
          respons = {
            success: false,
            msg: "Invalid Params Given0",
            status: 300,
          };
          encrypted = crypto.encrypt(respons);
          return res.status(200).json(encrypted);
        }

        var regex = /^[AJQK0-9]{3}$/;
        if (!ucard.match(regex)) {
          respons = {
            success: false,
            msg: "Invalid Params Given1",
            status: 300,
          };
          encrypted = crypto.encrypt(respons);
          return res.status(200).json(encrypted);
        }
      } else if (ucardLength == 4) {
        if (!ucard.includes(10)) {
          respons = {
            success: false,
            msg: "Invalid Params Given2",
            status: 300,
          };
          encrypted = crypto.encrypt(respons);
          return res.status(200).json(encrypted);
        }
        var regex = /^[AJQK0-9]{4}$/;
        if (!ucard.match(regex)) {
          respons = {
            success: false,
            msg: "Invalid Params Given3",
            status: 300,
          };
          encrypted = crypto.encrypt(respons);
          return res.status(200).json(encrypted);
        }
      } else {
        respons = {
          success: false,
          msg: "Invalid Params Given4",
          status: 300,
        };
        encrypted = crypto.encrypt(respons);
        return res.status(200).json(encrypted);
      }
    } else {
      respons = {
        success: false,
        msg: "Cards Not Given",
        status: 300,
      };
      encrypted = crypto.encrypt(respons);
      return res.status(200).json(encrypted);
    }

    params.btype = "back";
    params.ucard = data.ucard;
    URL = "placebet3cardj";
  } else if (data.gameType == "card32" || data.gameType == "card32eu") {
    URL = "placebetcard32";
  } else if (data.gameType == "ab20" || data.gameType == "abj") {
    params.btype = "back";
    URL = "placebetab";
  } else if (data.gameType == "cmeter") {
    params.btype = "back";
    URL = "placebetsport";
  } else if (data.gameType == "cmatch20") {
    URL = "placebetsport";
  } else if (data.gameType == "lottcard") {
    params.ucard = data.ucard;
    URL = "placebetlottery";
  } else if (
    data.gameType == "trap" ||
    data.gameType == "teensin" ||
    data.gameType == "teenmuf" ||
    data.gameType == "race17"
  ) {
    URL = "placebettrap";
  } else if (data.gameType == "patti2" || data.gameType == "trio") {
    params.bhav = data.bhav;
    URL = "placebetpatti2";
  } else if (
    data.gameType == "notenum" ||
    data.gameType == "teen2024" ||
    data.gameType == "teen1" ||
    data.gameType == "teen120"
  ) {
    URL = "placebetnotenum";
  } else if (data.gameType == "kbc") {
    delete params.subtype;
    delete params.sid;
    delete params.subid;
    delete params.urate;
    delete params.btype;

    let betData = data.betData;

    if (
      betData.hasOwnProperty("redBlack") &&
      betData.hasOwnProperty("oddEven") &&
      betData.hasOwnProperty("upDown") &&
      betData.hasOwnProperty("cardj") &&
      betData.hasOwnProperty("color")
    ) {
      for (let key in betData) {
        if (betData.hasOwnProperty(key)) {
          value = betData[key];
          if (value.hasOwnProperty("nat")) {
            delete value.nat;
          }
          if (key == "redBlack" || key == "oddEven" || key == "upDown") {
            if (value.hasOwnProperty("sid") && value.hasOwnProperty("ssid")) {
              if (![1, 2, 3].includes(value.sid)) {
                respons = {
                  success: false,
                  msg: "Ente Valid Data (ser) 1",
                  status: 300,
                };
                encrypted = crypto.encrypt(respons);
                return res.status(200).json(encrypted);
              }

              if (![1, 2].includes(value.ssid)) {
                respons = {
                  success: false,
                  msg: "Ente Valid Data (ser) 1.1",
                  status: 300,
                };
                encrypted = crypto.encrypt(respons);
                return res.status(200).json(encrypted);
              }
            }
          } else if (key == "cardj" || key == "color") {
            if (value.hasOwnProperty("sid") && value.hasOwnProperty("ssid")) {
              if (![4, 5].includes(value.sid)) {
                respons = {
                  success: false,
                  msg: "Ente Valid Data (ser) 2",
                  status: 300,
                };
                encrypted = crypto.encrypt(respons);
                return res.status(200).json(encrypted);
              }

              if (![1, 2, 3, 4].includes(value.ssid)) {
                respons = {
                  success: false,
                  msg: "Ente Valid Data (ser) 2.1",
                  status: 300,
                };
                encrypted = crypto.encrypt(respons);
                return res.status(200).json(encrypted);
              }
            }
          }
        }
      }
    } else {
      respons = {
        success: false,
        msg: "Ente Valid Data (ser) 0",
        status: 300,
      };
      encrypted = crypto.encrypt(respons);
      return res.status(200).json(encrypted);
    }

    let betJson = [];

    betJson.push(betData.redBlack);
    betJson.push(betData.oddEven);
    betJson.push(betData.upDown);
    betJson.push(betData.cardj);
    betJson.push(betData.color);

    params.bjson = JSON.stringify(betJson);

    if (data.bt) {
      params.bt = data.bt;
    } else {
      params.bt = 3;
    }

    URL = "placebetkbc";
  } else if (data.gameType == "vteen" || data.gameType == "vteen20") {
    URL = "placebetvteen";
  } else if (data.gameType == "vdt6" || data.gameType == "vdt20") {
    URL = "placebetvdt";
  } else if (data.gameType == "vlucky7") {
    URL = "placebetvlucky7";
  }
  console.log(params);
  console.log(URL);
  api.callAuth(
    URL,
    params,
    req,
    (data, status) => {
      console.log(data);
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    },
    config.frontPlacebetUrl
  );
};

// Lottery Repeat Placebet
exports.repeatPlacebet = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    mid: data.mid,
    gtype: data.gtype,
  };
  // console.log(params)
  api.callAuth(
    "placebetlotteryrep",
    params,
    req,
    (data, status) => {
      // console.log(data)
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    },
    config.frontPlacebetUrl
  );
};

// Lottery Delete Placebet
exports.deletePlacebet = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);

  let params = {
    mid: data.mid,
    gtype: data.gtype,
    subtype: "1",
  };
  if (data.type == "all") params.ste = "Allbetclear";
  else if (data.type == "last") params.ste = "betremove";
  // console.log(params)
  api.callAuth(
    "placebetlotterydtl",
    params,
    req,
    (data, status) => {
      // console.log(data)
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    },
    config.frontPlacebetUrl
  );
};

// getcop - wolf only
exports.getcop = (req, res) => {
  let data = req.body;
  data = crypto.decrypt(data);
  let params = {};
  api.callAuth(
    "getcop",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(error);
      res.status(status).json(encrypted);
    }
  );
};
