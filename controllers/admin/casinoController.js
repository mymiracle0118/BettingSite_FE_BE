const api = require('../../helpers/admin/api')
const {v4: uuidv4} = require('uuid');
const crypto = require('../../helpers/admin/crypto')
const CryptoJS = require("crypto-js");

exports.getCasinoData = function(req, res) {
  let data = req.body
  let params = {
      "gtype": data.type
    }
  let action = ""
  if(data.type == "cricketv3" || data.type == "superover"){
    action = "backoffice/getcricketv3data"
  }else{
    action = "backoffice/getteenodds"
  }
  api.callAuth(action, params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};


exports.getVCasinoData = function(req, res) {
  let data = req.body
  let params = {
    "gtype": data.type
  }
  api.callAuth("backoffice/getvodds", params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};


exports.vCasinoBookData = function(req, res) {
  let data = req.body
  let params = {
    "mid": data.mid,
    "gtype": data.gType
  }
  api.callAuth("backoffice/vcasinomasterbook", params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.casinoBookData = function(req, res) {
  let data = req.body
  let params = {
    "mid": data.mid,
    "gtype": data.gType
  }
  let action = 'backoffice/casinomasterbook'

  if(params.gtype == "kbc"){
    action = "backoffice/kbcmasterbook"
  }
  api.callAuth(action, params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.viewMoreBets = function(req, res) {
  let data = req.body
  let params = {
    "mid": data.mid,
    "gtype": data.gtype
  }
  let action = "backoffice/casinoviewmore"
  if(params.gtype == "kbc"){
    action = "backoffice/kbcviewmore"
  }
  if(params.gtype == "vteen" || params.gtype == "vteen20"){
    action = "backoffice/vcasinoviewmore"
  }
  api.callAuth(action, params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.lastResults = function(req, res) {
  let data = req.body
  let params = {
    "gtype": data.gType
  }
  api.callAuth('backoffice/last10result', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.vCasinoLastResults = function(req, res) {
  let data = req.body
  let params = {
    "gtype": data.gType
  }
  api.callAuth('backoffice/vlast10result', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.casinoRules = function(req, res) {
  let data = req.body
  let params = {
    "gtype": data.gtype
  }
  api.callAuth('backoffice/casinorules', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.getToken = function(req, res) {
  let data = req.body
  let params = {
    "gtype": data.id
  }
  api.callAuth('dimadminsub/subadminlogin', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.getTabList = function(req, res) {
  let data = req.body
  let params = {
    'webdom': api.getDomain(req.headers.host),
    'ctype': data.type
  }
  api.callAuth('dimadminsub/getcasinotablist', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.getTableList = function(req, res) {
  let data = req.body
  let params = {
    'webdom': api.getDomain(req.headers.host),
    'gmid': data.gmid,
    'ismob': data.ismob,
  }
  //console.log(params)
  api.callAuth('dimadminsub/getcasinotablelist', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    //console.log(encrypted)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.fancybookpopup = function(req, res) {
  let data = req.body
  let params = {
    'mid': data.mid,
    'sid': data.sid
  }
  api.callAuth('backoffice/fancypopup', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.casinoRulesHtml = function(req, res) {
  let data = req.body
  let params = {
    'gtype': data.type
  }
  api.callAuth('backoffice/getrules', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};



