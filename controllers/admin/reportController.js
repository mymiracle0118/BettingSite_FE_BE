const api = require('../../helpers/admin/api')
const {v4: uuidv4} = require('uuid');
const crypto = require('../../helpers/admin/crypto')
const CryptoJS = require("crypto-js");

exports.currentBets = function(req, res) {
  let data = req.body
  let params = {
    "stmt": data.type,
    gtype: data.gtype,
  }
  api.callAuth('backoffice/currentbetreport', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.searchAnalysis = function(req, res) {
  let data = req.body
  let params = {
    "guid": data.uid
  }
  api.callAuth('backoffice/searchanalysis', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.searchAnalysisPopup = function(req, res) {
  let data = req.body
  let params = {
    "guid": data.uid
  }
  api.callAuth('backoffice/marketanalysispopup ', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.searchAllUser = function(req, res) {
  let data = req.body
  let params = {
    "uname": data.uname
  }
  api.callAuth('backoffice/searchalluser', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.searchDownUser = function(req, res) {
  let data = req.body
  let params = {
    "uname": data.uname
  }
  api.callAuth('backoffice/searchdownuser', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.accountStatement = function(req, res) {
  let data = req.body
  let params = {
    "uid": data.uid,
    "fdt": data.fdt,
    "tdt": data.tdt,
    "type": data.type,
    "gtype": data.gtype,
    "eid": data.eid,
    "sta": data.sta,
  }
  if(data.gtype == ""){
    data.gtype = "all"
  }
  api.callAuth('dimadminsub/accountstatement', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.accStatePopup = function(req, res) {
  let data = req.body
  
  let action = "";
  let params = "";
  if(data.gtype == "cricketv" || data.gtype == "cricketv2" || data.gtype == "cricketv3"){
    params = {
      "mid": parseInt(data.mid),
      "uid": data.uid
    }
    action = 'backoffice/cricketv3popup'
  }else if(data.gtype == "superover"){
    params = {
      "mid": parseInt(data.mid),
      "uid": data.uid
    }
    action = 'backoffice/cricketsopopup'
  }else{
    params = {
      "dtype": data.dtype,
      "gmid": data.gmid,
      "gtype": data.gtype,
      "mid": data.mid,
      "uid": data.uid,
    }
    action = 'dimadminsub/accstatepopup'
  }
  api.callAuth(action, params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.accDabaBet = function(req, res) {
  let data = req.body
  let params = {
    "btid": data.btid
  }
  api.callAuth('dimadminsub/accdababet', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.accDreamBet = function(req, res) {
  let data = req.body
  let params = {
    "btid": data.btid
  }
  api.callAuth('dimadminsub/accdreambet', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.loginHistory = function(req, res) {
  let data = req.body
  let params = {
    "guid": data.guid,
    "fdt": data.fdt,
    "tdt": data.tdt
  }
  api.callAuth('backoffice/loginhistory', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.changepassHistory = function(req, res) {
  let data = req.body
  let params = {
    "guid": data.guid,
    "fdt": data.fdt,
    "tdt": data.tdt
  }
  api.callAuth('backoffice/changepasshistory', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.checkIp = function(req, res) {
  let data = req.body
  let params = {
    "ipDemo": data.ip
  }
  api.callAuth('dimadminsub/chkip', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.profitLoss = function(req, res) {
  let data = req.body
  let params = {
    "type": data.utype
  }
  api.callAuth('backoffice/reportprofitloss', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.casino = function(req, res) {
  api.callAuth('dimadminsub/casino', {}, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.casinoResult = function(req, res) {
  let data = req.body
  let params = {
    "dt": data.dt,
    "gtype": data.gtype
  }
  api.callAuth('dimadminsub/casinores', params, req, (data, status) => {
    /*let arr = []
    for(i=0;i<2000;i++){
      arr = arr.concat(data.data)
    }
    data.data = arr*/
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.tpGtypeList = function(req, res) {
  api.callAuth('backoffice/tpgtypelist', {}, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.tpUserSearch = function(req, res) {
  let data = req.body
  let params = {
    "uname": data.uname
  }
  api.callAuth('backoffice/tpusersearch', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.tpReportUserwise = function(req, res) {
  let data = req.body
  let params = {
    "uid": data.uid ? data.uid : "00000000-0000-0000-0000-000000000000",
    "dt": data.dt,
    "ctype": data.gtype
  }
  
  api.callAuth('backoffice/tpreportuserwise', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.tpCurrentBets = function(req, res) {
  let data = req.body
  let params = {
    "uid": data.uid ? data.uid : "00000000-0000-0000-0000-000000000000"
  }
  api.callAuth('backoffice/tpcurrentbets', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.generalLockList = function(req, res) {
  let data = req.body
  if(data.guid == "")
        data.guid = "00000000-0000-0000-0000-000000000000"
  let params = {
    "guid": data.guid,
    "mpass": data.mpass
  }
  api.callAuth('backoffice/generallocklist', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.generalLock = function(req, res) {
  let data = req.body
  if(data.guid == "")
        data.guid = "00000000-0000-0000-0000-000000000000"
  let params = {
    "guid": data.guid,
    "lkid": data.lkid,
    "lkname": data.lkname,
    "lktype": data.lktype,
    "gtype": data.gtype,
    "mpass": data.mpass
  }
  api.callAuth('backoffice/generallock', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.generalUnlock = function(req, res) {
  let data = req.body
  if(data.guid == "")
    data.guid = "00000000-0000-0000-0000-000000000000"
  let params = {
    "guid": data.guid,
    "lkid": data.lkid,
    "lkname": data.lkname,
    "lktype": data.lktype,
    "gtype": data.gtype,
    "mpass": data.mpass
  }
  api.callAuth('backoffice/generalunlock', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.casinoList = function(req, res) {
  let data = req.body
  let params = {
  }
  api.callAuth('backoffice/casinolist', {}, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.accountCasinoList = function(req, res) {
  let data = req.body
  let params = {
  }
  api.callAuth('backoffice/acccasinolist', {}, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.sportList = function(req, res) {
  let data = req.body
  let params = {
  }
  api.callAuth('backoffice/sportlist', {}, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.gameTypeList = function(req, res) {
  let data = req.body
  let params = {
  }
  api.callAuth('backoffice/gametypelist', {}, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.turnoverReport = function(req, res) {
  let data = req.body
  let params = {
    uid: data.uid,
    fdt: data.fdt,
    tdt: data.tdt,
    gtype: data.gtype,
    type: data.type,
    etid: data.etid == "" ? 0 : data.etid
  }
  //console.log(params)
  api.callAuth('backoffice/turnover', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.userAuthList = function(req, res) {
  let data = req.body
  let params = {
  }
  api.callAuth('backoffice/userauthlist', {}, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

