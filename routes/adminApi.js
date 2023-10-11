const express = require('express');
const router = express.Router();
const crypto = require('../helpers/admin/crypto')
const api = require('../helpers/admin/api')
const CryptoJS = require("crypto-js");
const middlewares = require("../middlewares/admin")

const userController = require('../controllers/admin/userController');
const reportController = require('../controllers/admin/reportController');
const casinoController = require('../controllers/admin/casinoController');
const gameController = require('../controllers/admin/gameController');
const mediaController = require('../controllers/admin/mediaController');

const { decryptRequest, loginValidationRules, validate } = require('../helpers/admin/validator')

/* User controller routes */
router.post('/login', [middlewares.decryptRequest, loginValidationRules(), validate], userController.login);
router.post('/ocp', [middlewares.decryptRequest], userController.ownPhangePassword),
router.post('/changepass-login', [middlewares.decryptRequest], userController.ownPhangePasswordLogin),
router.post('/logout', [middlewares.decryptRequest], userController.logout);
router.post('/bal', [middlewares.decryptRequest], userController.getBalance);
router.post('/treedata', [middlewares.decryptRequest], userController.treeData);
router.post('/treeviewdatamar', [middlewares.decryptRequest], userController.treeviewDataMarket);
//router.get('/mediaplayercasino/:type/:token', mediaController.mediaplayerCasino);
//router.get('/mediaplayergame/:gameID/:ip', mediaController.mediaplayerGame)
//router.get('/mediaplayervirtual/:gameID/:ip', mediaController.mediaplayerVirtual)


///# get call data
router.post('/creditdata', [middlewares.decryptRequest], userController.creditData),
router.post('/dipowidrawdata', [middlewares.decryptRequest], userController.dipowidrawData),
router.post('/profiledata', [middlewares.decryptRequest], userController.profileData),
router.post('/panelpartdata', [middlewares.decryptRequest], userController.panelPartData),
router.post('/acccreateload', [middlewares.decryptRequest], userController.accCreateLoad)

router.post('/dashboard', [middlewares.decryptRequest], userController.dashboard);
router.post('/report/marketanalysis', [middlewares.decryptRequest], userController.marketAnalysis);
router.post('/userlist', [middlewares.decryptRequest], userController.getUserList),
router.post('/cp', [middlewares.decryptRequest], userController.changePassword),
router.post('/insertuser', [middlewares.decryptRequest], userController.insertUser),
router.post('/checkun', [middlewares.decryptRequest], userController.checkUsername),
router.post('/bankuserlist', [middlewares.decryptRequest], userController.bankUserList),
router.post('/bankdepowithdraw', [middlewares.decryptRequest], userController.bankDepoWithdraw),
router.post('/userlistpdf', [middlewares.decryptRequest], userController.userListPdf),
router.post('/bankuserlistpdf', [middlewares.decryptRequest], userController.bankUserListPdf),
//### user list popup functions
router.post('/wc', [middlewares.decryptRequest], userController.withdrawCredit),
router.post('/ac', [middlewares.decryptRequest], userController.addCredit),
router.post('/ct', [middlewares.decryptRequest], userController.casinoTransfer),
router.post('/wg', [middlewares.decryptRequest], userController.withdrawGen),
router.post('/cg', [middlewares.decryptRequest], userController.creditgen),
router.post('/bl', [middlewares.decryptRequest], userController.betLock),
router.post('/ul', [middlewares.decryptRequest], userController.userLock),
router.post('/lock', [middlewares.decryptRequest], userController.lock),
router.post('/cphistory', [middlewares.decryptRequest], userController.changepasswordHistory),
router.post('/acchistrorydata', [middlewares.decryptRequest], userController.accHistroryData),
router.post('/credithistorydata', [middlewares.decryptRequest], userController.creditHistoryData),
router.post('/reventrylist', [middlewares.decryptRequest], userController.reventryList),
router.post('/reventrybal', [middlewares.decryptRequest], userController.reventryBal),
router.post('/user/updateprofile', [middlewares.decryptRequest], userController.updateUserProfile),
router.post('/favmasterlist', [middlewares.decryptRequest], userController.favMasterList),

router.post('/rules', [middlewares.decryptRequest], userController.getRules)
router.post('/acceptrules', [middlewares.decryptRequest], userController.acceptRules)
router.post('/fixturedata', [middlewares.decryptRequest], userController.fixtureData)
router.post('/fixturedata2', [middlewares.decryptRequest], userController.fixtureDataAuth)
router.post('/winners', [middlewares.decryptRequest], userController.winners)


/* Report controller routes */
router.post('/searchalluser', [middlewares.decryptRequest], reportController.searchAllUser),
router.post('/searchdownuser', [middlewares.decryptRequest], reportController.searchDownUser),
router.post('/generallocklist', [middlewares.decryptRequest], reportController.generalLockList),
router.post('/generallock', [middlewares.decryptRequest], reportController.generalLock),
router.post('/generalunlock', [middlewares.decryptRequest], reportController.generalUnlock),
router.post('/casinolist', [middlewares.decryptRequest], reportController.casinoList),
router.post('/acccasinolist', [middlewares.decryptRequest], reportController.accountCasinoList),
router.post('/sportlist', [middlewares.decryptRequest], reportController.sportList),
router.post('/gametypelist', [middlewares.decryptRequest], reportController.gameTypeList),
router.post('/report/currentbets', [middlewares.decryptRequest], reportController.currentBets),
router.post('/report/searchanalysis', [middlewares.decryptRequest], reportController.searchAnalysis),
router.post('/report/searchanalysispopup', [middlewares.decryptRequest], reportController.searchAnalysisPopup),
router.post('/report/accountstatement', [middlewares.decryptRequest], reportController.accountStatement),
router.post('/accstatepopup', [middlewares.decryptRequest], reportController.accStatePopup),
router.post('/accdababet', [middlewares.decryptRequest], reportController.accDabaBet),
router.post('/accdreambet', [middlewares.decryptRequest], reportController.accDreamBet),
router.post('/report/login-history', [middlewares.decryptRequest], reportController.loginHistory),
router.post('/report/pass-history', [middlewares.decryptRequest], reportController.changepassHistory),
router.post('/report/checkip', [middlewares.decryptRequest], reportController.checkIp),
router.post('/report/profitloss', [middlewares.decryptRequest], reportController.profitLoss),
router.post('/report/casino', [middlewares.decryptRequest], reportController.casino),
router.post('/report/casinoresult', [middlewares.decryptRequest], reportController.casinoResult),
router.post('/report/tpgtypelist', [middlewares.decryptRequest], reportController.tpGtypeList),
router.post('/report/tpusersearch', [middlewares.decryptRequest], reportController.tpUserSearch),
router.post('/report/tpreportuserwise', [middlewares.decryptRequest], reportController.tpReportUserwise),
router.post('/report/tpcurrentbets', [middlewares.decryptRequest], reportController.tpCurrentBets),
router.post('/report/turnover', [middlewares.decryptRequest], reportController.turnoverReport),
router.post('/report/userauthlist', [middlewares.decryptRequest], reportController.userAuthList),

/* Casino controller routes */
router.post('/casino/data', [middlewares.decryptRequest], casinoController.getCasinoData),
router.post('/casino/book', [middlewares.decryptRequest], casinoController.casinoBookData),
router.post('/casino/viewmorebets', [middlewares.decryptRequest], casinoController.viewMoreBets),
router.post('/casino/lastresults', [middlewares.decryptRequest], casinoController.lastResults),
router.post('/casino/rules', [middlewares.decryptRequest], casinoController.casinoRules);
router.post('/casino/gettoken', [middlewares.decryptRequest], casinoController.getToken);
router.post('/casino/tablist', [middlewares.decryptRequest], casinoController.getTabList);
router.post('/casino/tablelist', [middlewares.decryptRequest], casinoController.getTableList);
router.post('/casino/fancybookpopup', [middlewares.decryptRequest], casinoController.fancybookpopup);
router.post('/casino/ruleshtml', [middlewares.decryptRequest], casinoController.casinoRulesHtml);

/* Virtual Casino routes*/
router.post('/vcasino/data', [middlewares.decryptRequest], casinoController.getVCasinoData),
router.post('/vcasino/book', [middlewares.decryptRequest], casinoController.vCasinoBookData),
router.post('/vcasino/lastresults', [middlewares.decryptRequest], casinoController.vCasinoLastResults),

/* Game controller routes */
router.post('/game/detail', [middlewares.decryptRequest], gameController.getGameDetail),
router.post('/game/data', [middlewares.crypto_check({ polling_timeout: 300 })], gameController.getGameData),
router.post('/game/userbook', [middlewares.decryptRequest], gameController.getUserBook),
router.post('/game/marketlist', [middlewares.decryptRequest], gameController.getMarketList),
router.post('/game/getmarketid', [middlewares.decryptRequest], gameController.getMarketId),
router.post('/game/getbetmarketlist', [middlewares.decryptRequest], gameController.getBetMarketList),
router.post('/game/getmarketbets', [middlewares.decryptRequest], gameController.getMarketBets),
router.post('/game/lockuserlist', [middlewares.decryptRequest], gameController.getLockUserList),
router.post('/game/lockusergame', [middlewares.decryptRequest], gameController.lockUserGame),
router.post('/game/lockallusergame', [middlewares.decryptRequest], gameController.lockAllUserGame),
router.post('/game/allbook', [middlewares.decryptRequest], gameController.getAllBook),
router.post('/game/fancybookdata', [middlewares.decryptRequest], gameController.getFancyBookData),
router.post('/game/getcricketvdata', [middlewares.decryptRequest], gameController.getCricketvData),

/* Create Account */
router.post('/user/perlist', [middlewares.decryptRequest], userController.getPermissionList),
router.post('/user/peruserlist', [middlewares.decryptRequest], userController.getPerUserList),
router.post('/user/insertperuser', [middlewares.decryptRequest], userController.insertPerUser),
router.post('/user/editper', [middlewares.decryptRequest], userController.editPermission),
router.post('/user/updateper', [middlewares.decryptRequest], userController.updatePerUser)
router.post('/user/updateperstatus', [middlewares.decryptRequest], userController.updatePerStatus)
router.post('/user/perchangepass', [middlewares.decryptRequest], userController.perChangePassword)

/* Two Factor auth */
router.post('/user/getauth', [middlewares.decryptRequest], userController.getauth)
router.post('/user/authon', [middlewares.decryptRequest], userController.authon)
router.post('/user/authoff', [middlewares.decryptRequest], userController.authoff)
router.post('/user/authontele', [middlewares.decryptRequest], userController.authontele)
router.post('/user/genotptele', [middlewares.decryptRequest], userController.genotptele)
router.post('/user/userchecktele', [middlewares.decryptRequest], userController.userchecktele)
router.post('/user/verifycode', [middlewares.decryptRequest], userController.verifycode)
router.post('/adminsetting/get', [middlewares.decryptRequest], userController.getAdminSetting)
router.post('/adminsetting/update', [middlewares.decryptRequest], userController.updateAdminSetting)
/* Glive TV Token */ 
router.post('/game/tv', [middlewares.decryptRequest], userController.tvUrl)

router.post('/getmid', [middlewares.decryptRequest], userController.getmid)
module.exports = router;