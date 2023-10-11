const api = require("../../helpers/admin/api");
const { v4: uuidv4 } = require("uuid");
const crypto = require("../../helpers/admin/crypto");
const CryptoJS = require("crypto-js");
const axios = require("axios");
const AWS = require("aws-sdk");
const config = require("config");
const redis = require("redis");
const s3 = new AWS.S3({
  accessKeyId: config.s3.accessKey /* Put your iam user key */,
  secretAccessKey: config.s3.secretKey /* Put your iam user secret key */,
  Bucket: config.s3.bucketName /* Put your bucket name */,
});

exports.login = async function (req, res) {
  let data = req.body;
  let params = {
    uname: data.username,
    pass: data.password,
    webdom: api.getDomain(req.headers.host),
    // 'webdom': "world777.com"
  };

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

  api.call("dimadminsub/login", params, req, function (data, err) {
    delete req.session.admin_barcod;
    let resData = {};
    if (data.status == 200) {
      resData.data = {};
      resData.msg = data.msg;
      resData.status = data.status;
      req.session.admin_jwt_token = data.data.token;
      req.session.admin_uname = data.data.uname;

      resData.data.token = uuidv4();
      resData.data.uname = data.data.uname;
      resData.data.login = data.data.flogin;
      resData.data.rdisplay = data.data.rdisplay;
      resData.data.pcode = data.data.pcode;
      resData.data.auth = data.data.auth;
    } else {
      resData.msg = data.msg;
      resData.status = data.status;
    }
    encrypted = crypto.encrypt(resData);
    res.status(200).json(encrypted);
  });
};

exports.getBalance = function (req, res) {
  api.callAuth(
    "backoffice/baldata",
    {},
    req,
    (data, status) => {
      if (data.data && req.session.admin_barcod) {
        if (req.session.admin_barcod != data.data.bcode) {
          delete req.session.admin_jwt_token;
          delete req.session.admin_barcod;
          resData = {
            success: false,
            msg: "Please Login",
            status: 401,
          };
          return res.status(401).json(resData);
        }
      }
      if (data.data) {
        req.session.admin_barcod = data.data.bcode;
      }
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.ownPhangePasswordLogin = function (req, res) {
  let data = req.body;
  let params = {
    cpass: data.password,
    pass: data.newPassword,
    uname: req.session.admin_uname,
  };
  api.callAuth(
    "dimadminsub/ownchangepasspopup",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    },
    config.adminApiOpenUrl
  );
};

exports.ownPhangePassword = function (req, res) {
  let data = req.body;
  let params = {
    cpass: data.password,
    pass: data.newPassword,
    uname: req.session.admin_uname,
  };
  api.callAuth(
    "dimadminsub/ownchangepass",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.treeData = function (req, res) {
  api.callAuth(
    "backoffice/treeviewdata",
    {},
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.treeviewDataMarket = function (req, res) {
  api.callAuth(
    "backoffice/treeviewdatamar",
    {},
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.marketAnalysis = function (req, res) {
  api.callAuth(
    "backoffice/marketanalysisreport",
    {},
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.dashboard = function (req, res) {
  api.callAuth(
    "dimadminsub/dashboard",
    {},
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.getUserList = function (req, res) {
  let data = req.body;

  let action = "";
  let params = {
    pno: data.pno,
    row: data.row,
    uname: data.uname,
  };

  if (data.guid && data.guid != "") {
    params.guid = data.guid;
    action = "dimadminsub/childuserlist";
  } else {
    action = "dimadminsub/getuserlist";
  }
  api.callAuth(
    action,
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.changePassword = function (req, res) {
  let data = req.body;

  let params = {
    guid: data.user,
    pass: data.password,
    mpass: data.mpassword,
    uname: req.session.admin_uname,
  };
  api.callAuth(
    "dimadminsub/changepass",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.logout = function (req, res) {
  delete req.session.admin_jwt_token;
  delete req.session.admin_barcod;
  delete req.session.admin_uname;
  resData = {
    status: 200,
    msg: "logout successfully",
  };
  // encrypted = crypto.prepareResponse(resData, s_token_key)
  // res.status(data.status).json({
  //   'data': encrypted
  // });
  res.status(200).json(resData);
};

exports.checkUsername = function (req, res) {
  let data = req.body;
  let params = {
    uname: data.username,
  };
  api.callAuth(
    "dimadminsub/chkusername",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.insertUser = function (req, res) {
  let data = req.body;
  let action = "";
  let params = {
    uname: data.username,
    fname: data.fullname,
    pass: data.password,
    ct: data.city,
    mno: data.mono,
    mpass: data.mpassword,
    ptype: data.ptype.toString(),
    camt: data.camt,
    spart: 0,
    spart1: 0,
    point: 0,
    comm: 0,
    remark: data.remark,
    plock: data.plock,
  };

  if (data.ptype == "1") {
    params.spart = data.spart;
  } else if (data.ptype == "2") {
    params.spart1 = data.spart1;
  } else if (data.ptype == "3") {
    params.point = data.point;
  } else if (data.ptype == "4") {
    params.comm = data.comm;
  }

  if (data.lvlno && data.lvlno >= 3) {
    action = "dimadminsub/insertuserbelow3rd";
    params.newlvlno = data.newlvlno;
  } else {
    action = "dimadminsub/insertuser";
  }
  //console.log(params)
  api.callAuth(
    action,
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.bankUserList = function (req, res) {
  let data = req.body;
  let params = {
    pno: data.pno,
    row: data.row,
  };
  api.callAuth(
    "backoffice/bankuserlist",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.bankDepoWithdraw = function (req, res) {
  let data = req.body;
  let params = {
    guid: data.guid,
    amt: data.amt,
    state: data.state,
    mpass: data.mpass,
  };
  api.callAuth(
    "backoffice/bankdepowith",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.userListPdf = function (req, res) {
  let data = req.body;
  let params = {
    uid: data.guid,
  };
  api.callAuth(
    "dimadminsub/userlistpdf",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.bankUserListPdf = function (req, res) {
  let data = req.body;
  let params = {
    uid: data.guid,
  };
  api.callAuth(
    "backoffice/bankuserlistpdf",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.withdrawCredit = function (req, res) {
  let data = req.body;
  let params = {
    mpass: data.mpassword,
    rmk: data.remark,
    guid: data.guid,
    amt: parseFloat(data.amount),
  };
  api.callAuth(
    "dimadminsub/withdrawcredit",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.addCredit = function (req, res) {
  let data = req.body;
  let params = {
    mpass: data.mpassword,
    rmk: data.remark,
    guid: data.guid,
    amt: parseFloat(data.amount),
  };
  api.callAuth(
    "dimadminsub/addcredit",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.casinoTransfer = function (req, res) {
  let data = req.body;
  let params = {
    mpass: data.mpassword,
    rmk: data.remark,
    guid: data.guid,
    amt: parseFloat(data.amount),
  };
  api.callAuth(
    "dimadminsub/casinotransfer",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.withdrawGen = function (req, res) {
  let data = req.body;
  let params = {
    mpass: data.mpassword,
    rmk: data.remark,
    guid: data.guid,
    amt: parseFloat(data.amount),
  };
  api.callAuth(
    "dimadminsub/withdrawgen",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.creditgen = function (req, res) {
  let data = req.body;
  let params = {
    mpass: data.mpassword,
    rmk: data.remark,
    guid: data.guid,
    amt: parseFloat(data.amount),
  };
  api.callAuth(
    "dimadminsub/creditgen",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.betLock = function (req, res) {
  let data = req.body;
  let params = {
    guid: data.guid,
    isact: data.isact ? false : true,
    mpass: data.mpassword,
  };
  api.callAuth(
    "dimadminsub/betlock",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.userLock = function (req, res) {
  let data = req.body;
  let params = {
    guid: data.guid,
    isact: data.isact ? false : true,
    mpass: data.mpassword,
  };
  api.callAuth(
    "dimadminsub/userlock",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.lock = function (req, res) {
  let data = req.body;
  let params = {
    guid: data.guid,
    isuser: data.isuser ? false : true,
    isbet: data.isbet ? false : true,
    mpass: data.mpassword,
  };
  //console.log(params)
  api.callAuth(
    "dimadminsub/lock",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.updateUserProfile = function (req, res) {
  let data = req.body;
  let params = {
    guid: data.guid,
    plock: data.plock,
    fmst: data.fmst,
    fname: data.fname,
    mpass: data.mpass,
  };
  api.callAuth(
    "dimadminsub/tplock",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.checkUsername = function (req, res) {
  let data = req.body;
  let params = {
    uname: data.username,
  };
  api.callAuth(
    "dimadminsub/chkusername",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.panelPartData = function (req, res) {
  let data = req.body;
  let params = {};
  api.callAuth(
    "dimadminsub/panelpartdata",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.accCreateLoad = function (req, res) {
  let data = req.body;
  let params = {};
  api.callAuth(
    "dimadminsub/acccreateload",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.changepasswordHistory = function (req, res) {
  let data = req.body;
  let params = {
    guid: data.guid,
    uname: data.uname,
  };
  api.callAuth(
    "dimadminsub/historypasschange",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.accHistroryData = function (req, res) {
  let data = req.body;
  let params = {
    guid: data.guid,
  };
  api.callAuth(
    "dimadminsub/acchistorydata",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.creditHistoryData = function (req, res) {
  let data = req.body;
  let params = {
    guid: data.guid,
  };
  api.callAuth(
    "dimadminsub/credithistorydata",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.creditData = function (req, res) {
  let data = req.body;
  let params = {
    guid: data.guid,
  };
  api.callAuth(
    "dimadminsub/creditdata",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.dipowidrawData = function (req, res) {
  let data = req.body;
  let params = {
    guid: data.guid,
  };
  api.callAuth(
    "dimadminsub/dipowidrawdata",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.profileData = function (req, res) {
  let data = req.body;
  let params = {
    guid: data.guid,
  };
  api.callAuth(
    "dimadminsub/profiledata",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.getRules = function (req, res) {
  let data = req.body;
  let params = {};
  api.callAuth(
    "dimadminsub/rules",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.acceptRules = function (req, res) {
  let data = req.body;
  let params = {};
  api.callAuth(
    "dimadminsub/acceptrules",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.reventryList = function (req, res) {
  let data = req.body;
  let params = {
    etype: data.etype,
    goppid: data.guid,
    //mpass: data.mpass
  };
  //console.log(params)
  api.callAuth(
    "dimadminsub/reventrylist",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.reventryBal = function (req, res) {
  let data = req.body;
  let params = {
    etype: data.etype,
    goppid: data.guid,
    rmk: data.rmk,
    mpass: data.mpass,
  };
  api.callAuth(
    "dimadminsub/reventrybal",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.getPermissionList = function (req, res) {
  let data = req.body;
  let params = {};
  api.callAuth(
    "dimadminsub/perlist",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.getPerUserList = function (req, res) {
  let data = req.body;
  let params = {};
  api.callAuth(
    "dimadminsub/peruserlist",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.insertPerUser = function (req, res) {
  let data = req.body;
  let params = {
    uname: data.uname,
    fname: data.fullname,
    pass: data.pass,
    plist: data.plist.toString(),
    mpass: data.mpass,
  };
  //console.log(params)
  api.callAuth(
    "dimadminsub/insertperuser",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.updatePerUser = function (req, res) {
  let data = req.body;
  let params = {
    guid: data.guid,
    fname: data.fullname,
    plist: data.plist.toString(),
    mpass: data.mpass,
  };
  //console.log(params)
  api.callAuth(
    "dimadminsub/updateper",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.editPermission = function (req, res) {
  let data = req.body;
  let params = {
    guid: data.guid,
  };
  //console.log(params)
  api.callAuth(
    "dimadminsub/editper",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.updatePerStatus = function (req, res) {
  let data = req.body;
  let params = {
    guid: data.guid,
    mpass: data.mpass,
    isact: data.isact,
  };
  //console.log(params)
  api.callAuth(
    "dimadminsub/updateperstatus",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

exports.perChangePassword = function (req, res) {
  let data = req.body;

  let params = {
    guid: data.guid,
    pass: data.password,
    mpass: data.mpassword,
    uname: req.session.admin_uname,
  };
  api.callAuth(
    "dimadminsub/perchangepass",
    params,
    req,
    (data, status) => {
      encrypted = crypto.encrypt(data);
      res.status(status).json(encrypted);
    },
    (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error));
      res.status(status).json(encrypted);
    }
  );
};

// Upcoming Fixture Open
exports.fixtureData = (req, res) => {
  let url = config.adminApiOpenUrl + "dimadminsub/getsportteam";

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

  /* api.call("dimadminsub/getsportteam", {}, req, (data, status) => {
    console.log(data)
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    console.log(error)
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });*/
};

// Upcoming Fixture Auth
exports.fixtureDataAuth = (req, res) => {
  api.callAuth(
    "dimadminsub/getsportteam",
    {},
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
exports.winners = async function (req, res) {
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

  // console.log("assad")
  // let url = config.adminApiUrl + 'dimadminsub/getuserentry'
  // //console.log(url)
  // axios
  //   .post(url, {domain: api.getDomain(req.headers.host)})
  //   .then(data => {
  //    // console.log(`statusCode: ${data.statusCode}`)
  //     // console.log(data.data)
  //     encrypted = crypto.encrypt(data.data)
  //     return res.status(200).json(encrypted);
  //   })
  //   .catch(error => {
  //     console.error(error)
  //   })
};

// Get Auth Status
exports.getauth = (req, res) => {
  api.callAuth(
    "dimadminsub/getauth",
    {},
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

// Auth On
exports.authon = (req, res) => {
  api.callAuth(
    "dimadminsub/authon",
    {},
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

// Auth off
exports.authoff = (req, res) => {
  let data = req.body;
  var URL = "";
  if (data.authId == "1") {
    URL = "dimadminsub/authoff";
  } else if (data.authId == "2") {
    URL = "dimadminsub/authofftele";
  }

  let params = {
    code: data.code,
  };

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

// Get Tele Connection Id
exports.authontele = (req, res) => {
  let data = req.body;

  let params = {
    upass: data.password,
  };

  api.callAuth(
    "dimadminsub/authontele",
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

// Tele generate OTP
exports.genotptele = (req, res) => {
  api.callAuth(
    "dimadminsub/genotptele",
    {},
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

// Tele user chech
exports.userchecktele = (req, res) => {
  api.callAuth(
    "dimadminsub/userchecktele",
    {},
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

// Verify OTP
exports.verifycode = (req, res) => {
  let data = req.body;

  var URL = "";
  if (data.authId == "1") {
    URL = "dimadminsub/verifycode";
  } else if (data.authId == "2") {
    URL = "dimadminsub/verifycodetele";
  }

  let params = {
    code: data.code,
  };
  api.callAuth(
    URL,
    params,
    req,
    (data, status) => {
      if (data.status == 200) {
        req.session.admin_jwt_token = data.data;
        //console.log(data)
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
// Verify OTP
exports.tvUrl = (req, res) => {
  let data = req.body;
  let userAgent = req.useragent;
  let params = {
    gmid: data.gmid,
    platform: userAgent.platform,
    ipa: data.ip,
  };
  api.callAuth(
    "dimadminsub/tvurl",
    params,
    req,
    (data, status) => {
      if (data.status == 200) {
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

// Fav master list
exports.favMasterList = (req, res) => {
  api.callAuth(
    "dimadminsub/adminfavmst",
    {},
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

// get admin setting
exports.getAdminSetting = async (req, res) => {
  let response = {
    status: 200,
    data: {},
  };
  let domain = api.getDomain(req.headers.host);
  /*let redisClientObj = redis.createClient({
    host: config.redis1.host,
    port: config.redis1.port,
    db: config.redis1.db,
  });
  redisClientObj.set(domain, "this is test data1 json last");*/

  let commonDataPromise = new Promise((resolve, reject) => {
    try {
      var options = {
        Bucket: config.s3.bucketName,
        Key: config.s3.themeDir + domain + "/adminsetting.json",
      };

      s3.getObject(options, function (err, data) {
        if (data) {
          response.data = JSON.parse(data.Body);
          response.status = 200;
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

  encrypted = crypto.encrypt(response);
  res.status(200).json(encrypted);
};

// update admin setting
exports.updateAdminSetting = async (req, res) => {
  let data = req.body;
  let response = {
    status: 200,
    data: {},
  };
  let domain = api.getDomain(req.headers.host);

  /* Delete key from redis before update */
  let redisClientObj1 = redis.createClient({
    host: config.redis1.host,
    port: config.redis1.port,
    db: config.redis1.db,
  });
  redisClientObj1.del(domain, function (err, o) {
    // console.log(err)
  });
  let updatePromise = new Promise((resolve, reject) => {
    try {
      var options = {
        Bucket: config.s3.bucketName,
        Key: config.s3.themeDir + domain + "/adminsetting.json",
        Body: JSON.stringify(data, null, 2),
      };
      s3.upload(options, function (s3Err, data) {
        if (s3Err) throw s3Err;
        //console.log(`File uploaded successfully at ${data.Location}`)
        resolve("success");
        response.msg = "Admin Settings updated successfully";
      });
    } catch (error) {
      resolve("error");
    }
  });
  await updatePromise; // wait until the promise resolves (*)
  encrypted = crypto.encrypt(response);
  res.status(200).json(encrypted);
};

// for keep alive session
exports.getmid = (req, res) => {
  api.callAuth(
    "dimadminsub/getmid",
    {},
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
