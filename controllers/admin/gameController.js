const api = require('../../helpers/admin/api')
const {v4: uuidv4} = require('uuid');
const crypto = require('../../helpers/admin/crypto')
const CryptoJS = require("crypto-js");
const config = require('config');
const redisHelper = require('../../helpers/redis')

exports.getGameDetail = function(req, res) {
  let data = req.body
  if(config.securePolling == 2){
    let s_token = data.s_token 
    redisHelper.getRedisClientData(s_token).then(clientData => {
      clientData.jwt_token = req.session.admin_jwt_token;
      clientData.type = 'ADMIN';
      redisHelper.setRedisClientData(s_token, clientData).then(err => {
        //console.log("Client Data JWT Set :: " + err);
      });
    });
  }

  let params = {
    "gid": parseInt(data.gid),
    "etid": parseInt(data.etid)
  }
  api.callAuth('backoffice/gamedetail', params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};


// Game Data Polling
/*router.post('/gamedata', crypto_check({
  polling_timeout: 300
}), (req, res) => {
  
});*/
exports.getGameData = function(req, res) {
  if (config.securePolling == 1) {
    const s_token = req.query.s_token;
    const s_token_object = req.session.s_tokens[s_token];
    const s_token_key = s_token_object.s_token_key;
    //console.log(s_token_key)
    let data = {
      error: "no data"
    };

    if (req.body.data) {
      try {
        const data_bytes = CryptoJS.AES.decrypt(req.body.data, s_token_key);
        data = data_bytes.toString(CryptoJS.enc.Utf8);
        data = JSON.parse(data);
        //console.log(data)
      } catch (e) {
        console.error();
      }
    }

    let params = {
      "gid": data.gid,
      //"mid": data.mid,
      "m":data.m ? data.m : 0
    }

    let action = ""
    if(data.etid && data.etid == 4){
      action = "backoffice/gamedatacri"
    }else{
      action = "backoffice/gamedata"
      params.mid = data.mid
    }
    
    api.callAuth(action, params, req, (data, status) => {
      encrypted = crypto.prepareResponse(data, s_token_key)
      res.status(status).json({
        'data': encrypted
      });
    }, (error, status) => {
      encrypted = crypto.prepareResponse(error, s_token_key)
      res.status(status).json({
        'data': encrypted
      });
    });
  } else if(config.securePolling == 0){
    let data = crypto.decrypt(req.body)
    let params = {
      "gid": data.gid,
     // "mid": data.mid,
      "m":data.m ? data.m : 0
    }

    let action = ""
    if(data.etid && data.etid == 4){
      action = "backoffice/gamedatacri"
    }else{
      action = "backoffice/gamedata"
      params.mid = data.mid
    }
    //console.log(action)
    //console.log(params)
    api.callAuth(action, params, req, (data, status) => {
      encrypted = crypto.encrypt(data)
      res.status(status).json(encrypted);
    }, (error, status) => {
      encrypted = crypto.encrypt(JSON.stringify(error))
      res.status(status).json(encrypted);
    });
  }

};

exports.getUserBook = function(req, res) {
  let data = req.body
  let action = ""
  let params = {}
  if(data.etid == 4){
    action = "backoffice/getbookdatacri"
    params = {
      "gid": data.gid
    }
  }else{
    action = "backoffice/getbookdata"
    params = {
      "gid": data.gid,
      "mid": data.mid
    }
  }
  api.callAuth(action, params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.getMarketList = function(req, res) {
  let data = req.body
  let params = {
    "gid": data.gid
  }
  api.callAuth("backoffice/getmarketbetcnt", params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.getMarketId = function(req, res) {
  let data = req.body
  let params = {
    "gmid": data.gmid,
    "etid": data.etid,
    "mid": data.mid,
  }
  api.callAuth("backoffice/marketid", params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.getBetMarketList = function(req, res) {
  let data = req.body
  let params = {
    "gid": data.gid
  }
  api.callAuth("backoffice/getbetmarketlist", params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.getMarketBets = function(req, res) {
  let data = req.body
  let params = {
    "gid": data.gid,
    "mid": data.mid
  }
  api.callAuth("backoffice/getmarketbets", params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.getLockUserList = function(req, res) {
  let data = req.body
  let params = {
    "gid": data.gid,
    "mid": data.mid
  }
  api.callAuth("backoffice/getgamelockuserlist", params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.lockUserGame = function(req, res) {
  let data = req.body
  let params = {
    "gid": data.gid,
    "mid": data.mid,
    "guid": data.guid,
    "mpass": data.mpass
  }
  let action = "backoffice/unlockusergame"
  if(data.isact == 1){
    action = "backoffice/lockusergame"
  }
  api.callAuth(action, params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.lockAllUserGame = function(req, res) {
  let data = req.body
  let params = {
    "gid": data.gid,
    "mid": data.mid,
    "mpass": data.mpass
  }
  let action = "backoffice/unlockallusergame"
  if(data.islock == 1){
    action = "backoffice/lockallusergame"
  }
  api.callAuth(action, params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};
  
exports.getAllBook = function(req, res) {
  let data = req.body
  let params = {
    "gmid": data.gid,
    "mid": data.mid,
    "gtype": data.gtype
  }
  api.callAuth("backoffice/allbook", params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};

exports.getFancyBookData = function(req, res) {
  let data = req.body
  let params = {
    "gmid": data.gmid,
    "mid": data.mid,
    "sid": data.sid,
    "type": data.type
  }
  
  api.callAuth("backoffice/fancybook", params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};


exports.getCricketvData = function(req, res) {
  let data = req.body
  let params = {
    "gmid": data.gmid,
    "gtype": data.gtype
  }
  
  api.callAuth("backoffice/getcricketvdata", params, req, (data, status) => {
    encrypted = crypto.encrypt(data)
    res.status(status).json(encrypted);
  }, (error, status) => {
    encrypted = crypto.encrypt(JSON.stringify(error))
    res.status(status).json(encrypted);
  });
};
