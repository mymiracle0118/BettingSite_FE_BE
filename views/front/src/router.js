import VueRouter from "vue-router";
// GAME PAGES
// import Login from '@/pages/Login'
import Login from "@/pages/Login";
import Dashboard from "@/layouts/Dashboard";
import Home from "@/pages/Home";
import GameDetail from "@/pages/GameDetail";
import GameDetailCricket from "@/pages/GameDetailCricket";
import VirtualCricket from "@/pages/VirtualCricket";
import VirtualGame from "@/pages/VirtualGame";

// EXTRA PAGES
import EighteenPlus from "@/pages/extra/EighteenPlus";
import AboutUs from "@/pages/extra/AboutUs";
import FAQ from "@/pages/extra/FAQ";
import GameRules from "@/pages/extra/GameRules";
import Promotion from "@/pages/extra/Promotion";
import ResponsibleGaming from "@/pages/extra/ResponsibleGaming";
import TermsAndConditions from "@/pages/extra/TermsAndConditions";

// REPORT PAGES
import CurrentbetsReport from "@/pages/reports/Currentbets";
import AccountStatementReport from "@/pages/reports/AccountStatement";
import Activity from "@/pages/reports/ActivityLog";
import CasinoResult from "@/pages/reports/CasinoResult";
import LiveCasinoResult from "@/pages/reports/LiveCasinoResult";
import SecureAuth from "@/pages/reports/SecureAuth";
import LoginAuth from "@/pages/LoginAuth";
import WithdrawRequest from "@/pages/WithdrawRequest";
import Settings from "@/pages/reports/Settings";

// CASINO PAGES
import CasinoDashboard from "@/layouts/CasinoDashboard";
import OwnCasinoList from "@/pages/casino/OwnCasinoList";
import Fantasy from "@/pages/fantacy/Fantasy";
import Others from "@/pages/fantacy/Others";
import SlotCasinoList from "@/pages/casino/SlotCasinoList";
import TeenpattiOneday from "@/pages/casino/TeenpattiOneDay";
import TeenpattiT20 from "@/pages/casino/TeenpattiT20";
import TeenpattiT20B from "@/pages/casino/TeenpattiT20B";
import TeenpattiOpen from "@/pages/casino/TeenpattiOpen";
import TeenpattiTest from "@/pages/casino/TeenpattiTest";
import Baccarat from "@/pages/casino/Baccarat";
import Baccarat2 from "@/pages/casino/Baccarat2";
import Lucky7 from "@/pages/casino/Lucky7";
import Lucky7eu from "@/pages/casino/Lucky7eu";
import Lucky7eu2 from "@/pages/casino/Lucky7eu2";
import PokerOneday from "@/pages/casino/PokerOneDay";
import PokerT20 from "@/pages/casino/PokerT20";
import Poker6Player from "@/pages/casino/Poker6Player";
import DragonTigerOneDay from "@/pages/casino/DragonTigerOneDay";
import DragonTigerT20 from "@/pages/casino/DragonTigerT20";
import DragonTigerT202 from "@/pages/casino/DragonTigerT202";
import DragonTigerLionT20 from "@/pages/casino/DragonTigerLionT20";
import AAA from "@/pages/casino/AAA";
import BollywoodTable from "@/pages/casino/BollywoodTable";
import Worli from "@/pages/casino/Worli";
import InstantWorli from "@/pages/casino/InstantWorli";
import CasinoWar from "@/pages/casino/CasinoWar";
import ThreeCardsJudgement from "@/pages/casino/3CardsJudgement";
import Card32 from "@/pages/casino/Card32";
import Card32EU from "@/pages/casino/Card32EU";
import AndarBahar from "@/pages/casino/AndarBahar";
import AndarBahar2 from "@/pages/casino/AndarBahar2";
import Queen from "@/pages/casino/Queen";
import Teenpatti2 from "@/pages/casino/Teenpatti2";
import cmeter from "@/pages/casino/cmeter";
import Race20 from "@/pages/casino/Race20";
import CMatch20 from "@/pages/casino/CricketMatch2020";
import CricketV3 from "@/pages/casino/CricketV3";
import SuperOver from "@/pages/casino/SuperOver";
import Lottery from "@/pages/casino/Lottery";
import Trap from "@/pages/casino/Trap";
import Teenpatti2Cards from "@/pages/casino/Teenpatti2Cards";
import Khal29 from "@/pages/casino/Khal29";
import TeenpattiMuflis from "@/pages/casino/TeenpattiMuflis";
import Race17 from "@/pages/casino/Race17";
import Trio from "@/pages/casino/Trio";
import NoteNumber from "@/pages/casino/NoteNumber";
import Teenpatti2024 from "@/pages/casino/Teenpatti2024";
import KBC from "@/pages/casino/KBC";
import Teenpatti1CardOneDay from "@/pages/casino/Teenpatti1CardOneDay";
import Teenpatti1CardT20 from "@/pages/casino/Teenpatti1CardT20";

import VTeenpattiT20 from "@/pages/virtualCasino/vTeenpattiT20";
import VTeenpattiOneDay from "@/pages/virtualCasino/vTeenpattiOneDay";
// import VDragonTigerOneDay from "@/pages/virtualCasino/vDragonTigerOneDay";
// import VDragonTigerT20 from "@/pages/virtualCasino/vDragonTigerT20";
// import VLucky7 from "@/pages/virtualCasino/vLucky7";

import Coupons from "@/pages/reports/Coupons";
import Error404 from "@/pages/Error404";

// Routes
const routes = [
  {
    path: "*",
    redirect: "/",
    meta: {
      auth: false,
    },
  },
  {
    path: "/",
    name: "login",
    component: Login,
    meta: {
      auth: undefined,
    },
  },
  {
    path: "/loginauth/:authId?",
    name: "loginAuth",
    component: LoginAuth,
    meta: {
      auth: undefined,
    },
  },

  // EXTRA ROUTES
  {
    path: "/eighteen-plus",
    name: "EighteenPlus",
    component: EighteenPlus,
    meta: {
      auth: undefined,
    },
  },
  {
    path: "/about-us",
    name: "aboutUs",
    component: AboutUs,
    meta: {
      auth: undefined,
    },
  },
  {
    path: "/game-rules",
    name: "gameRules",
    component: GameRules,
    meta: {
      auth: undefined,
    },
  },
  {
    path: "/promotion",
    name: "promotion",
    component: Promotion,
    meta: {
      auth: undefined,
    },
  },
  {
    path: "/responsible-gaming",
    name: "responsibleGaming",
    component: ResponsibleGaming,
    meta: {
      auth: undefined,
    },
  },
  {
    path: "/terms-and-conditions",
    name: "termsAndConditions",
    component: TermsAndConditions,
    meta: {
      auth: undefined,
    },
  },

  // GAME ROUTES
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
    children: [
      {
        path: "/sport",
        name: "home",
        component: Home,
      },
      {
        path: "/sport/detail/:etid/:gameId",
        name: "gameDetail",
        component: GameDetail,
      },
      {
        path: "/sport/cricket/:etid/:gameId",
        name: "gameDetailCricket",
        component: GameDetailCricket,
      },
      {
        path: "/sport/virtualcricket/:etid/:gameId",
        name: "virtualCricket",
        component: VirtualCricket,
      },
      {
        path: "/sport/virtualgame/:etid/:gameId",
        name: "virtualGame",
        component: VirtualGame,
      },

      // SLOT LIST
      {
        path: "/slot",
        name: "slotcasinolist",
        component: SlotCasinoList,
      },

      // CASINO ROUTES
      {
        path: "casino",
        name: "owncasinolist",
        component: OwnCasinoList,
      },

      {
        path: "casino/teenpattioneday",
        name: "teenpattiOneday",
        component: TeenpattiOneday,
      },
      {
        path: "casino/teenpattit20",
        name: "teenpattiT20",
        component: TeenpattiT20,
      },
      {
        path: "casino/teenpattit20b",
        name: "teenpattiT20B",
        component: TeenpattiT20B,
      },
      {
        path: "casino/teenpattiopen",
        name: "teenpattiOpen",
        component: TeenpattiOpen,
      },
      {
        path: "casino/teenpattitest",
        name: "teenpattiTest",
        component: TeenpattiTest,
      },
      {
        path: "casino/baccarat",
        name: "baccarat",
        component: Baccarat,
      },
      {
        path: "casino/baccarat2",
        name: "baccarat2",
        component: Baccarat2,
      },
      {
        path: "casino/lucky7",
        name: "lucky7",
        component: Lucky7,
      },
      {
        path: "casino/lucky7eu",
        name: "lucky7eu",
        component: Lucky7eu,
      },
      {
        path: "casino/lucky7eu2",
        name: "lucky7eu2",
        component: Lucky7eu2,
      },
      {
        path: "casino/pokeroneday",
        name: "pokerOneday",
        component: PokerOneday,
      },
      {
        path: "casino/pokert20",
        name: "pokerT20",
        component: PokerT20,
      },
      {
        path: "casino/poker6player",
        name: "poker6Player",
        component: Poker6Player,
      },
      {
        path: "casino/dragontigeroneday",
        name: "dragonTigerOneDay",
        component: DragonTigerOneDay,
      },
      {
        path: "casino/dragontigert20",
        name: "dragonTigerT20",
        component: DragonTigerT20,
      },
      {
        path: "casino/dragontigert202",
        name: "dragonTigerT202",
        component: DragonTigerT202,
      },
      {
        path: "casino/dragontigerliont20",
        name: "dragonTigerLionT20",
        component: DragonTigerLionT20,
      },
      {
        path: "casino/aaa",
        name: "AAA",
        component: AAA,
      },
      {
        path: "casino/bollywoodtable",
        name: "bollywoodTable",
        component: BollywoodTable,
      },
      {
        path: "casino/worli",
        name: "worli",
        component: Worli,
      },
      {
        path: "casino/instantworli",
        name: "instantWorli",
        component: InstantWorli,
      },
      {
        path: "casino/war",
        name: "casinoWar",
        component: CasinoWar,
      },
      {
        path: "casino/3cardsjudgement",
        name: "3cardsJudgement",
        component: ThreeCardsJudgement,
      },
      {
        path: "casino/card32-A",
        name: "card32",
        component: Card32,
      },
      {
        path: "casino/card32-B",
        name: "card32EU",
        component: Card32EU,
      },
      {
        path: "casino/andarbahar",
        name: "andarBahar",
        component: AndarBahar,
      },
      {
        path: "casino/andarbahar2",
        name: "andarBahar2",
        component: AndarBahar2,
      },
      {
        path: "casino/queen",
        name: "queen",
        component: Queen,
      },
      {
        path: "casino/teenpatti2",
        name: "teenpatti2",
        component: Teenpatti2,
      },
      {
        path: "casino/cmeter",
        name: "cmeter",
        component: cmeter,
      },
      {
        path: "casino/race20",
        name: "race20",
        component: Race20,
      },
      {
        path: "casino/cricket-match-2020",
        name: "cMatch20",
        component: CMatch20,
      },
      {
        path: "casino/5fivecricket",
        name: "cricketV3",
        component: CricketV3,
      },
      {
        path: "casino/superover",
        name: "superOver",
        component: SuperOver,
      },
      {
        path: "casino/lottery",
        name: "lottery",
        component: Lottery,
      },
      {
        path: "casino/trap",
        name: "trap",
        component: Trap,
      },
      {
        path: "casino/teenpatti2cards",
        name: "teenpatti2Cards",
        component: Teenpatti2Cards,
      },
      {
        path: "casino/29cardbaccarat",
        name: "khal29",
        component: Khal29,
      },
      {
        path: "casino/teenmuf",
        name: "teenpattiMuflis",
        component: TeenpattiMuflis,
      },
      {
        path: "casino/raceto17",
        name: "race17",
        component: Race17,
      },
      {
        path: "casino/trio",
        name: "trio",
        component: Trio,
      },
      {
        path: "casino/notenum",
        name: "noteNumber",
        component: NoteNumber,
      },
      {
        path: "casino/teen2024",
        name: "teenpatti2024",
        component: Teenpatti2024,
      },
      {
        path: "casino/kbc",
        name: "kbc",
        component: KBC,
      },
      {
        path: "casino/1card1day",
        name: "teen1oneday",
        component: Teenpatti1CardOneDay,
      },
      {
        path: "casino/1card2020",
        name: "teen1t20",
        component: Teenpatti1CardT20,
      },

      // VIRTUAL START
      {
        path: "vcasino/teen20",
        name: "vTeen20",
        component: VTeenpattiT20,
      },
      {
        path: "vcasino/teen",
        name: "vTeen",
        component: VTeenpattiOneDay,
      },
      // {
      //   path: "vcasino/dt6",
      //   name: "vDt6",
      //   component: VDragonTigerOneDay,
      // },
      // {
      //   path: "vcasino/dt20",
      //   name: "vDt20",
      //   component: VDragonTigerT20,
      // },
      // {
      //   path: "vcasino/lucky7",
      //   name: "vLucky7",
      //   component: VLucky7,
      // },

      {
        path: "coupons",
        name: "coupons",
        component: Coupons,
      },

      // ERROR
      {
        path: "/404",
        name: "error404",
        component: Error404,
      },
    ],
    meta: {
      auth: true,
    },
  },
  // SLOT ROUTES
  {
    path: "/",
    name: "casinodashboard",
    component: CasinoDashboard,
    children: [
      // REPORTS
      {
        path: "/report/currentbets",
        name: "currentbetsReport",
        component: CurrentbetsReport,
      },
      {
        path: "/report/accountstatement",
        name: "accountstatementReport",
        component: AccountStatementReport,
      },
      {
        path: "/report/activity",
        name: "activity",
        component: Activity,
      },
      {
        path: "/report/casinoresult/:gameType?",
        name: "casinoResult",
        component: CasinoResult,
      },
      {
        path: "/report/livecasinoresult",
        name: "liveCasinoResult",
        component: LiveCasinoResult,
      },
      {
        path: "/secureauth",
        name: "secureAuth",
        component: SecureAuth,
      },
      {
        path: "/withdraw-request",
        name: "WithdrawRequest",
        component: WithdrawRequest,
      },
      {
        path: "/settings",
        name: "Settings",
        component: Settings,
      },

      {
        path: "/faq",
        name: "Faq",
        component: FAQ,
      },

      {
        path: "fantasy/:gmid?",
        name: "fantacy",
        component: Fantasy,
      },
      {
        path: "others/:gmid?",
        name: "others",
        component: Others,
      },
    ],
    meta: {
      auth: true,
    },
  },
  {
    path: "*",
    redirect: "/404",
    meta: {
      auth: true,
    },
  },
];
const router = new VueRouter({
  base: process.env.MIX_VUE_BASE_URL || "/",
  history: true,
  mode: "history",
  routes,
});
export default router;
