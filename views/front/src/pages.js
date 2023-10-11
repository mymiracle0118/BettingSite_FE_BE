let casinoPages = [
  "kbc",
  "teenpatti2024",
  "noteNumber",
  "trio",
  "teenpattiT20B",
  "race17",
  "teenpattiMuflis",
  "khal29",
  "teenpattiT20M",
  "teenpattiT20F",
  "teenpatti2Cards",
  "trap",
  "superOver",
  "cricketV3",
  "cMatch20",
  "queen",
  "teenpatti2",
  "cmeter",
  "race20",
  "andarBahar",
  "andarBahar2",
  "card32EU",
  "card32",
  "3cardsJudgement",
  "casinoWar",
  "instantWorli",
  "worli",
  "bollywoodTable",
  "AAA",
  "dragonTigerLionT20",
  "dragonTigerT202",
  "dragonTigerT20",
  "dragonTigerOneDay",
  "teenpattiTest",
  "poker6Player",
  "pokerOneday",
  "pokerT20",
  "teenpattiOneday",
  "teenpattiT20",
  "baccarat",
  "teenpattiOpen",
  "baccarat2",
  "lucky7",
  "lucky7eu",
  "lucky7eu2",
  "teen1oneday",
  "teen1t20",
];
let fullWidthCasinoPages = [
  "lottery",
  "vTeen",
  "vTeen20",
  "vDt6",
  "vDt20",
  "vLucky7",
];
let reportPages = [
  "Settings",
  "WithdrawRequest",
  "Faq",
  "secureAuth",
  "error404",
  "liveCasinoResult",
  "casinoResult",
  "activity",
  "currentbetsReport",
  "accountstatementReport",
  "owncasinolist",
  "slotcasinolist",
  "fantacy",
  "others",
  "coupons",
];
let gamePages = [
  "home",
  "gameDetail",
  "gameDetailCricket",
  "virtualCricket",
  "virtualGame",
];

let casinoWithType = [
  { type: "lottcard", route: "lottery" },
  { type: "cricketv3", route: "cricketV3" },
  { type: "cmatch20", route: "cMatch20" },
  { type: "queen", route: "queen" },
  { type: "race20", route: "race20" },
  { type: "cmeter", route: "cmeter" },
  { type: "teen6", route: "teenpatti2" },
  { type: "ab20", route: "andarBahar" },
  { type: "abj", route: "andarBahar2" },
  { type: "card32eu", route: "card32EU" },
  { type: "card32", route: "card32" },
  { type: "3cardj", route: "3cardsJudgement" },
  { type: "war", route: "casinoWar" },
  { type: "worli2", route: "instantWorli" },
  { type: "worli", route: "worli" },
  { type: "btable", route: "bollywoodTable" },
  { type: "aaa", route: "AAA" },
  { type: "dtl20", route: "dragonTigerLionT20" },
  { type: "dt202", route: "dragonTigerT202" },
  { type: "dt20", route: "dragonTigerT20" },
  { type: "dt6", route: "dragonTigerOneDay" },
  { type: "poker6", route: "poker6Player" },
  { type: "poker", route: "pokerOneday" },
  { type: "poker20", route: "pokerT20" },
  { type: "teen", route: "teenpattiOneday" },
  { type: "teen20", route: "teenpattiT20" },
  { type: "teen8", route: "teenpattiOpen" },
  { type: "teen9", route: "teenpattiTest" },
  { type: "baccarat", route: "baccarat" },
  { type: "baccarat2", route: "baccarat2" },
  { type: "lucky7", route: "lucky7" },
  { type: "lucky7eu", route: "lucky7eu" },
  { type: "lucky7eu2", route: "lucky7eu2" },
  { type: "superover", route: "superOver" },
  { type: "trap", route: "trap" },
  { type: "patti2", route: "teenpatti2Cards" },
  { type: "teensin", route: "khal29" },
  { type: "teenmuf", route: "teenpattiMuflis" },
  { type: "race17", route: "race17" },
  { type: "teen20b", route: "teenpattiT20B" },
  { type: "trio", route: "trio" },
  { type: "notenum", route: "noteNumber" },
  { type: "teen2024", route: "teenpatti2024" },
  { type: "kbc", route: "kbc" },
  { type: "teen1", route: "teen1oneday" },
  { type: "teen120", route: "teen1t20" },
];

let vCasinoWithType = [
  { type: "vteen", route: "vTeen" },
  { type: "vteen20", route: "vTeen20" },
];

export default {
  getCasinoRoute(type) {
    let data = _.find(casinoWithType, { type: type });
    return _.get(data, "route");
  },
  getVcCasinoRoute(type) {
    let data = _.find(vCasinoWithType, { type: type });
    return _.get(data, "route");
  },
  getDetailRoute(iscc, eType) {
    // console.log(iscc, eType)
    if (iscc == 0) {
      if (eType == 4) {
        return "gameDetailCricket";
      } else {
        return "gameDetail";
      }
    } else if (iscc == 1) {
      return "virtualCricket";
    } else if (iscc == 2) {
      return "virtualGame";
    }
  },
  is(type, route) {
    if (type == "fullwidthcasino") {
      return fullWidthCasinoPages.includes(route);
    }
    if (type == "casino") {
      return casinoPages.includes(route);
    }
    if (type == "report") {
      return reportPages.includes(route);
    }
    if (type == "game") {
      return gamePages.includes(route);
    }
  },
  isNot(type, route) {
    if (type == "fullwidthcasino") {
      return !fullWidthCasinoPages.includes(route);
    }
    if (type == "casino") {
      return !casinoPages.includes(route);
    }
    if (type == "report") {
      return !reportPages.includes(route);
    }
    if (type == "game") {
      return !gamePages.includes(route);
    }
  },
};
