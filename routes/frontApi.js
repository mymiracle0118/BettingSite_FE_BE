const express = require("express");
const router = express.Router();
const crypto = require("../helpers/crypto");
const api = require("../helpers/api");
const { v4: uuidv4 } = require("uuid");
const middlewares = require("../middlewares/front");

const frontController = require("../controllers/front/frontController");

// Change Theme
router.post("/changetheme", frontController.changeTheme);
// Home Upcoming Fixture Open
router.post("/fixture", frontController.fixture);
// Home Upcoming Fixture With Auth
router.post("/fixture2", frontController.fixtureAuth);
// Top Winners
router.post("/winners", frontController.winners);
// Login
router.post("/login", frontController.login);
// Register
router.post("/register", frontController.register);
// Logout
router.post("/logout", frontController.logout);
// Fetch User
router.post("/user", frontController.user);
// Refresh
router.post("/refresh", frontController.refresh);
// User Data
router.post("/userdata", frontController.userdata);
// Tree Data
router.post("/treedata", frontController.treedata);
// Event List
router.post("/eventlist", frontController.eventlist);
// Tab List
router.post("/tablist", frontController.tablist);
// Button List Sports
router.post("/buttonlist", frontController.buttonlist);
// Button List Casino
router.post("/buttonlistcs", frontController.buttonlistCs);
// Change Auto Con
router.post("/changeautocon", frontController.changeautocon);
// Get Data
router.post("/getdata", frontController.getdata);
// Highlight Home Data
router.post("/highlighthome", frontController.highlighthome);
// Game Details
router.post("/gamedetail", frontController.gamedetail);
// Cricket V Data
router.post("/cricketvdata", frontController.cricketvData);
// Cricket V3 Data
router.post("/cricketv3data", frontController.cricketv3Data);
// User Book
router.post("/userbook", frontController.userbook);
// Game Data Polling
router.post(
  "/gamedata",
  middlewares.crypto_check({ polling_timeout: false }),
  frontController.gamedata
);
// fancy Book Game Detail
router.post("/fancybookdata", frontController.fancybookdata);
// fancy Book Patti2
router.post("/fancybookpopup", frontController.fancybookpopup);
// Diamond/Slot Casino List
router.post("/casino/list", frontController.casinoList);
// Diamond Casino List NEW
router.post("/casino/alllist", frontController.casinoAllList);
// Slot Provider List NEW
router.post("/casino/providerlist", frontController.casinoProviderList);
// Slot Category List NEW
router.post("/casino/catlist", frontController.casinoCatList);
// Slot List NEW
router.post("/casino/slotlist", frontController.casinoSlotList);
// Diamond/Slot Casino Tab List
router.post("/casino/tablist", frontController.casinoTabList);
// Diamond/Slot Casino Table List
router.post("/casino/tablelist", frontController.casinoTableList);
// Slot Casino Banners
router.post("/banners", frontController.banners);
// welcome Banners
router.post("/welcomebanners", frontController.welcomeBanners);
// Launch Slot Casino Iframe
router.post("/casino/slot", frontController.casinoSlot);
// Fantacy Games (Other)
router.post("/casino/other", frontController.casinoOther);
// Launch Fantacy Games (Other)
router.post("/casino/launchother", frontController.casinoLaunchOther);
// Rules
router.post("/rules", frontController.rules);
// Accept Rules
router.post("/acceptrules", frontController.acceptRules);
// Account Statement Report
router.post("/accountstatement", frontController.accountstatement);
// Account Statement Popup
router.post("/accstatepopup", frontController.accstatepopup);
// Account Statement Slot Casino (TP) List
router.post("/tpcasinolist", frontController.tpcasinolist);
// Account Statement Slot Casino (TP) Soda
router.post("/tpcasinosoda", frontController.tpcasinosoda);
// Account Statement Dabba
router.post("/accdabaplayers", frontController.accdabaplayers);
// Account Statement Dream
router.post("/accdreambet", frontController.accdreambet);
// Current Bet Report
router.post("/currentbets", frontController.currentbets);
// Activity Report
router.post("/activity", frontController.activity);
// Ip Detail
router.post("/ipdetail", frontController.ipdetail);
// Casino Result Table List
router.post("/tablelist", frontController.tablelist);
// Casino Results Report
router.post("/casinoresults", frontController.casinoresults);
// Live Casino Settled Bets Report
router.post("/tpcasinoresult", frontController.tpcasinoresult);
// Live Casino Un-Settled Bets Report
router.post("/tpcurrentbets", frontController.tpcurrentbets);
// Update Button Values
router.post("/buttonupdate", frontController.buttonupdate);
// Update Casino Button Values
router.post("/buttonupdatecs", frontController.buttonupdatecs);
// Change Password
router.post("/passwordupdate", frontController.passwordupdate);
// Search By Gamename
router.post("/searchgame", frontController.searchgame);
// Market Analysis
router.post("/marketanalysis", frontController.marketanalysis);
// Get Redis Id
// router.post('/getdetail', frontController.getdetail);
// Casino Rules
router.post("/casino/rules", frontController.casinoRules);
// Casino Rules HTML
router.post("/casinorules", frontController.casinoRulesHtml);
// KBC Payout
router.post("/kbc/payout", frontController.kbcPayout);
// Casino Data
router.post("/casino/data", frontController.casinoData);
// Virtual Casino Data
router.post("/vcasino/data", frontController.vCasinoData);
// Casino Book
router.post("/casino/book", frontController.casinoBook);
// Virtual Casino Book
router.post("/vcasino/book", frontController.vCasinoBook);
// Casino Last 10 Results
router.post("/casino/lastresults", frontController.casinoLastResults);
// Virtual Casino Last 10 Results
router.post("/vcasino/lastresults", frontController.vCasinoLastResults);
// Placebet Game Detail
router.post("/placebet", frontController.placebet);
// Placebet Trader Game Detail
router.post("/placebettdr", frontController.placebettdr);
// Placebet Casino
router.post("/placebetcasino", frontController.placebetcasino);
// Lottery Repeat Placebet
router.post("/repeatplacebet", frontController.repeatPlacebet);
// Lottery Delete Placebet
router.post("/deleteplacebet", frontController.deletePlacebet);
// Worli Sectiondata
router.post("/worlisectiondata", frontController.worliSectionData);
// Worli Section Rules
router.post("/sectionpana", frontController.worliSectionPana);

// Auth Status
router.post("/getauth", frontController.getauth);
// Auth On
router.post("/authon", frontController.authon);
// Auth off
router.post("/authoff", frontController.authoff);

// Tele Connection Id
router.post("/authontele", frontController.authontele);
// Tele generate OTP
router.post("/genotptele", frontController.genotptele);
// Tele user check
router.post("/userchecktele", frontController.userchecktele);

// Verify OTP
router.post("/verifycode", frontController.verifycode);

// Get TV Url
router.post("/gettv", frontController.getTvUrl);

//deposite withdraw apis
router.post("/deposite", frontController.getDepositeUrl);
router.post("/withdraw-request", frontController.addWithdrawRequest);
router.post("/get-withdraw-request", frontController.getWithdrawRequest);

router.post("/getcop", frontController.getcop);

module.exports = router;
