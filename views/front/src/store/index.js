import Vue from "vue";
import Vuex from "vuex";
// import { BToast } from 'bootstrap-vue'
// let bootStrapToaster = new BToast();
// bootStrapToaster.$bvToast.toast('hello', {
//     variant: 'danger',
//     toaster: 'b-toaster-top-full',
//     autoHideDelay: 3000,
// })
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    casino: {
      type: null,
      casinoList: [],
      casinoType: null,
      tabList: [],
      tabId: null,
      gameName: "",
      tableList: [],
      searchOpen: false,
      searchText: "",
      url: "",
      loading: false,
      showFrame: false,
      title: "",
    },
    slot: {
      type: null,
      providerList: [],
      providerId: null,
      catList: [],
      catId: null,
      gameName: "",
      slotList: [],
      searchOpen: false,
      searchText: "",
      url: "",
      loading: false,
      showFrame: false,
      title: "",
    },
    fantacy: {
      url: "",
      loading: false,
      showFrame: false,
      title: "",
    },
    lastResults: [],
    casinoGameType: "",
    casinoMarketId: "",
    placebetInterval: 0,
    showAnimation: false,
    searchMarktetText: "",
    user: {},
    tree: [],
    isLoading: false,
    eventListHome: [],
    eventListSlot: [],
    banners: [],
    buttonList: [],
    autocon: null,
    etid: null,
    cid: null,
    gameId: null,
    isTv: false,
    showTv: false,
    showTvTo: "",
    tvUrl: "",
    collapsSidebar: false,
    bet: null,
    traderBet: null,
    casinoBet: null,
    betSoda: null,
    loadingCasinoPlacebet: false,
    loadingPlacebet: false,
    traderloadingPlacebet: false,
    sportbetBook: null,
    fancybetBook: null,
    casinoBetSoda: null,
    casinobetBook: null,
    casinoFancybetBook: null,
    casinoRules: null,
    searchText: "",
    searchLoader: "",
    searchItems: [],
    newsMsg: "",
    showTv: false,
    rdisplay: false,
    ipop: false,
    kbc: {
      betSelect: {
        redBlack: {
          sid: null,
          ssid: null,
          nat: null,
        },
        oddEven: {
          sid: null,
          ssid: null,
          nat: null,
        },
        upDown: {
          sid: null,
          ssid: null,
          nat: null,
        },
        cardj: {
          sid: null,
          ssid: null,
          nat: null,
        },
        color: {
          sid: null,
          ssid: null,
          nat: null,
        },
      },
    },
    lottery: {
      btnVal: 100,
      single: {
        selected: [],
      },
      double: {
        selected: [],
      },
      triple: {
        selected: [],
      },
    },
    worlitabdata: {
      rulesStatus: false,
      ruleList: [],
      totalRule: 0,
      single: {
        multi: 0,
        single: 0,
        selected: null,
      },
      pana: {
        sp: 0,
        dp: 0,
        tp: 0,
        selected: [],
      },
      sp: {
        rate: 0,
        selected: null,
      },
      dp: {
        rate: 0,
        selected: null,
      },
      trio: {
        rate: 0,
        selected: null,
      },
      cycle: {
        selected: [],
      },
      motor: {
        rate: 0,
        selected: [],
      },
      chart56: {
        rate: 0,
        selected: null,
      },
      chart64: {
        rate: 0,
        selected: null,
      },
      abr: {
        rate: 0,
        selected: null,
      },
      commonSP: {
        rate: 0,
        selected: null,
      },
      commonDP: {
        rate: 0,
        selected: null,
      },
      colorDP: {
        rate: 0,
        selected: null,
      },
    },
    runNo: null,
    is_tablet: IS_TABLET,
    is_mobile: IS_MOBILE,
  },
  getters: {
    domain() {
      return DOMAIN;
    },
    domainName() {
      return DOMAIN.split(".")[0];
    },
    ipAddress() {
      return IP_ADDRESS;
    },
    isTablet: (state) => {
      return state.is_tablet;
      // return IS_TABLET;
    },
    isMobile: (state) => {
      return state.is_mobile;
      // return IS_MOBILE;
    },
    user() {
      // return JSON.parse(localStorage.getItem('user'))
      return Vue.auth.user();
    },
    searchedData: (state) => {
      var serchedData = state.searchItems.filter((data) => {
        return data.ename
          .toLowerCase()
          .includes(state.searchText.toLowerCase());
      });

      return _.chain(serchedData)
        .groupBy("etype")
        .map((events, etype) => ({
          events,
          etype,
        }))
        .value();
    },
    sortedEventListHome: (state) => {
      return _.orderBy(state.eventListHome, "listono");
    },
    sortedEventListSlot: (state) => {
      return _.orderBy(state.eventListSlot, "listono");
    },
    bannerList: (state) => {
      // return _.orderBy(state.banners, "listono");
      return state.banners;
    },
    treeData: (state) => {
      // console.log('+++++++++++++++++++')
      // console.log('eid', state.etid)
      // console.log('cid', state.cid)

      if (state.tree && state.tree.length) {
        for (let i = 0; i < state.tree.length; i++) {
          const event = state.tree[i];
          if (state.etid == event.etid) {
            Vue.set(event, "expand", true);
          } else {
            Vue.set(event, "expand", false);
          }

          if (event.children && event.children.length) {
            for (let j = 0; j < event.children.length; j++) {
              const compition = event.children[j];
              if (state.cid == compition.cid) {
                Vue.set(compition, "expand", true);
              } else {
                Vue.set(compition, "expand", false);
              }
            }
          }
        }
      }

      return state.tree;
    },
    treeTotalEvents: (state) => (etid) => {
      let eventsCount = 0;
      if (state.tree && state.tree.length) {
        for (let i = 0; i < state.tree.length; i++) {
          const event = state.tree[i];
          if (etid == event.etid) {
            if (event.children && event.children.length) {
              for (let j = 0; j < event.children.length; j++) {
                const compition = event.children[j];
                eventsCount += compition.children.length;
              }
            }
          }
        }
      }
      return eventsCount;
    },
    betSodaTotal: (state) => {
      let betSodaCount = 0;
      if (state.betSoda && state.betSoda.length) {
        for (let i = 0; i < state.betSoda.length; i++) {
          const soda = state.betSoda[i];
          if (soda.sdata && soda.sdata.length) {
            betSodaCount += soda.sdata.length;
          }
        }
      }
      return betSodaCount;
    },

    betCasinoSodaTotal: (state) => {
      let casinoBetSodaCount = 0;
      if (state.casinoBetSoda && state.casinoBetSoda.length) {
        casinoBetSodaCount = state.casinoBetSoda.length;
      }
      return casinoBetSodaCount;
    },
  },
  mutations: {
    toggleAnimation(state) {
      state.showAnimation = !state.showAnimation;
      if (!state.showAnimation) {
        $("body").removeClass("animate-on");
      }
    },
    toggleTv(state) {
      state.showTv = !state.showTv;
    },
    showSidebar(state) {
      if (IS_MOBILE) {
        state.collapsSidebar = true;
      }
    },
    hideSidebar(state) {
      if (IS_MOBILE) {
        state.collapsSidebar = false;
      }
    },
    toggleSidebar(state, close = false) {
      if (IS_MOBILE) {
        state.collapsSidebar = !state.collapsSidebar;
        if (close) state.collapsSidebar = false;
        // console.log(state.collapsSidebar);
        // let el = document.querySelector(".sidebar-left")
        // if (el) {
        //     state.collapsSidebar ?
        //         el.style.display = 'block' :
        //         el.style.display = 'none';
        // }
      }
    },
    setBetData(state, betData) {
      state.bet = betData;
    },
    updateBetAmount(state, amount) {
      state.bet.amount = amount;
      if (!isNaN(amount) && amount != "") {
        // CRICKETV3 PROFIT
        if (state.bet.cType == "cricketv3" || state.bet.cType == "superover") {
          if (state.bet.gType == "match1") {
            // BACK
            if (state.bet.betType.toLowerCase() == "back") {
              state.bet.profit = parseFloat(
                (state.bet.uRate - 1) * state.bet.amount
              ).toFixed(2);
            }
            // LAY
            if (state.bet.betType.toLowerCase() == "lay") {
              state.bet.profit = parseFloat(state.bet.amount).toFixed(2);
            }
          }
        } else {
          // MATCH PROFIT
          if (
            state.bet.gType == "match" ||
            state.bet.gType == "cricketcasino"
          ) {
            // BACK
            if (state.bet.betType.toLowerCase() == "back") {
              state.bet.profit = parseFloat(
                (state.bet.uRate - 1) * state.bet.amount
              ).toFixed(2);
            }
            // LAY
            if (state.bet.betType.toLowerCase() == "lay") {
              state.bet.profit = parseFloat(state.bet.amount).toFixed(2);
            }
          }
          // MATCH1 PROFIT
          else if (state.bet.gType == "match1") {
            // BACK
            if (state.bet.betType.toLowerCase() == "back") {
              state.bet.profit = parseFloat(
                (state.bet.uRate * state.bet.amount) / 100
              ).toFixed(2);
            }
            // LAY
            if (state.bet.betType.toLowerCase() == "lay") {
              state.bet.profit = parseFloat(state.bet.amount).toFixed(2);
            }
          }
        }
      } else {
        state.bet.profit = 0;
      }
    },
    resetBetData(state) {
      state.bet = null;
    },

    setTraderData(state, betData) {
      state.traderBet = betData;
    },
    resetTraderBetData(state) {
      state.traderbet = null;
    },

    incrementStep(state) {
      if (state.bet.uRate >= 10000) {
        state.bet.uRate = 10000;
        return;
      }
      if (state.bet.gType == "khado") {
        let maxKhado = parseFloat(parseFloat(state.bet.oRate) + 100);
        let minKhado = parseFloat(parseFloat(state.bet.oRate) - 100);
        if (state.bet.uRate > minKhado && state.bet.uRate < maxKhado) {
          state.bet.uRate = state.bet.uRate + 1;
        }
        if (state.bet.uRate == maxKhado) {
          state.bet.uRate = state.bet.uRate;
        }
        if (state.bet.uRate >= 10000) {
          state.bet.uRate = 10000;
        }
        state.bet.profit = state.bet.khado + state.bet.uRate - 1;
      } else if (state.bet.gType == "match") {
        this.commit("getIncremantal");
      }
    },
    decrementStep(state) {
      if (state.bet.uRate <= 1.01) {
        state.bet.uRate = 1.01;
        return;
      }
      if (state.bet.gType == "khado") {
        let maxKhado = parseFloat(parseFloat(state.bet.oRate) + 100);
        let minKhado = parseFloat(parseFloat(state.bet.oRate) - 100);
        if (state.bet.uRate > minKhado && state.bet.uRate < maxKhado) {
          state.bet.uRate = state.bet.uRate - 1;
        }
        if (state.bet.uRate == maxKhado) {
          state.bet.uRate = state.bet.uRate;
        }
        if (state.bet.uRate < 2) {
          state.bet.uRate = 1;
        }
        state.bet.profit = state.bet.khado + state.bet.uRate - 1;
      } else if (state.bet.gType == "match") {
        this.commit("getDecremantal");
      }
    },

    getIncremantal(state) {
      var val = state.bet.uRate;
      var step = 0;
      if (state.bet.gType == "match") {
        if (val < 2) {
          step = 0.01;
        } else if (val >= 2 && val < 3) {
          step = 0.02;
        } else if (val >= 3 && val < 4) {
          step = 0.05;
        } else if (val >= 4 && val < 6) {
          step = 0.1;
        } else if (val >= 6 && val < 10) {
          step = 0.2;
        } else if (val >= 10 && val < 20) {
          step = 0.5;
        } else if (val >= 20 && val < 30) {
          step = 1;
        } else if (val >= 30 && val < 50) {
          step = 2;
        } else if (val >= 50 && val < 100) {
          step = 5;
        } else if (val >= 100 && val < 1000) {
          step = 10;
        } else if (val > 1000) {
          step = 0;
        }
      }
      //console.log(step)
      //console.log(state.bet.uRate)
      //console.log(parseFloat(state.bet.uRate + step).toFixed(2))
      state.bet.uRate = Number(
        parseFloat(parseFloat(state.bet.uRate) + parseFloat(step)).toFixed(2)
      );
      // console.log(typeof(state.bet.uRate), state.bet.uRate)
      this.commit("updateBetAmount", state.bet.amount);
    },
    getDecremantal(state) {
      var val = state.bet.uRate;
      var step = 0;
      if (state.bet.gType == "match") {
        if (val <= 2) {
          step = 0.01;
        } else if (val > 2 && val <= 3) {
          step = 0.02;
        } else if (val > 3 && val <= 4) {
          step = 0.05;
        } else if (val > 4 && val <= 6) {
          step = 0.1;
        } else if (val > 6 && val <= 10) {
          step = 0.2;
        } else if (val > 10 && val <= 20) {
          step = 0.5;
        } else if (val > 20 && val <= 30) {
          step = 1;
        } else if (val > 30 && val <= 50) {
          step = 2;
        } else if (val > 50 && val <= 100) {
          step = 5;
        } else if (val > 100 && val <= 1000) {
          step = 10;
        } else if (val > 1000) {
          step = 0;
        }
      }
      //console.log(step)
      //console.log(parseFloat(state.bet.uRate - step).toFixed(2))
      state.bet.uRate = Number(
        parseFloat(parseFloat(state.bet.uRate) - parseFloat(step)).toFixed(2)
      );
      // console.log(typeof(state.bet.uRate), state.bet.uRate)
      this.commit("updateBetAmount", state.bet.amount);
    },

    removeKbcSelection(state, bet) {
      //   console.log(bet);
      state.kbc.betSelect[bet.key].sid = null;
      state.kbc.betSelect[bet.key].ssid = null;
      state.kbc.betSelect[bet.key].nat = null;
      this.commit("checkKbcAllSelect");
    },
    checkKbcAllSelect(state) {
      for (let key1 in state.kbc.betSelect) {
        if (state.kbc.betSelect.hasOwnProperty(key1)) {
          var value = state.kbc.betSelect[key1];
          if (!value.sid && !value.ssid) {
            state.casinoBet.betStatus = false;
          }
        }
      }
      state.casinoBet.betData = state.kbc.betSelect;
      //   console.log(state.casinoBet);
    },
    setCasinoBetData(state, betData) {
      state.casinoBet = betData;
    },
    resetCasinoBetData(state) {
      state.casinoBet = null;

      state.kbc = {
        betSelect: {
          redBlack: {
            sid: null,
            ssid: null,
            nat: null,
          },
          oddEven: {
            sid: null,
            ssid: null,
            nat: null,
          },
          upDown: {
            sid: null,
            ssid: null,
            nat: null,
          },
          cardj: {
            sid: null,
            ssid: null,
            nat: null,
          },
          color: {
            sid: null,
            ssid: null,
            nat: null,
          },
        },
      };

      state.worlitabdata.single.selected = null;
      state.worlitabdata.pana.selected = [];
      state.worlitabdata.sp.selected = null;
      state.worlitabdata.dp.selected = null;
      state.worlitabdata.trio.selected = null;
      state.worlitabdata.cycle.selected = [];
      state.worlitabdata.motor.selected = [];
      state.worlitabdata.chart56.selected = null;
      state.worlitabdata.chart64.selected = null;
      state.worlitabdata.abr.selected = null;
      state.worlitabdata.commonSP.selected = null;
      state.worlitabdata.commonDP.selected = null;
      state.worlitabdata.colorDP.selected = null;
      state.worlitabdata.ruleList = [];
      state.worlitabdata.totalRule = 0;
      state.worlitabdata.rulesStatus = false;
    },
    updateCasinoBetAmount(state, amount) {
      state.casinoBet.amount = amount;
    },

    resetSearch(state) {
      state.searchText = "";
      state.searchItems = [];
    },
  },
});
