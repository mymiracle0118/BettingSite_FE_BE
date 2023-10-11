import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        WMSG: '',
        user: {
            bal: 0,
            exp: 0,
            uname: ''
        },
        adminUser: {
        },
        acl: {
          dashboard:false,
          ma:false,
          ulist:false,
          uinsert:false,
          bank:false,
          raccst: false,
          reportpl: false,
          reportcb: false,
          reportuh: false,
          glock: false,
          casinores: false,
          lcasinores: false,
          casinolist: false,
          events: false,
          searchanalysis: false,
          loginuc: false,
          withdraw: false,
          depo: false,
          creditref: false,
          uinfo: false,
          upass: false,
          ulock: false,
          block: false,
          reporttu: false
        },
        userdata: {},
        calDateFormate:'DD/MM/YYYY',
        collapsSidebar: false,
        collapsMobileSidebar: false,
        isLoading:false,
        useri18n:{
            uname:'User Name',
            fname: 'Full Name',
            mno:'Mobile Number',
            ct: "City",
            webdom: 'Web Domain',
            webref:'Web Reference',
            cbal:'Credit Balance',
            sbal:'S Balance',
            bal:'Balance',
            gen:'General Balance',
            crebal:'crebal',
            tparty:'tparty',
            pname: 'Partnership Type',
            part: 'Partnership',
            plname: 'Panel Part',
            cdt: 'Created Date'
        },
        tree: [],
        etid: null, 
        cid: null,
        gameId: null,
        betSoda: null,
        sportbetBook: null,
        fancybetBook: null,
        casinoBetSoda: null,
        casinobetBook: null,
        casinoFancybetBook: null,
        userLock: [
        ],
        generalLock: {
            guid: '',
            mpass: '',
        },
        calDateFormat: "DD/MM/YYYY",
        is_tablet: IS_TABLET,
        is_mobile: IS_MOBILE
    },
    getters: {
        ipAddress() {
            return IP_ADDRESS;
        },
        sortedCasinoList: state => {
            return _.orderBy(state.casinoList, "listono");
        },
        isTablet: state => {
            //return IS_TABLET;
            return state.is_tablet
        },
        isMobile: state => {
            //return IS_MOBILE;
            return state.is_mobile
        },
        treeData: state => {
            // console.log('+++++++++++++++++++')
            // console.log('eid', state.etid)
            // console.log('cid', state.cid)

            if (state.tree && state.tree.length) {
                for (let i = 0; i < state.tree.length; i++) {
                    const event = state.tree[i];
                    if (state.etid == event.etid) {
                        Vue.set(event, 'expand', true)
                    } else {
                        Vue.set(event, 'expand', false)
                    }

                    if (event.children && event.children.length) {
                        for (let j = 0; j < event.children.length; j++) {
                            const compition = event.children[j];
                            if (state.cid == compition.cid) {
                                Vue.set(compition, 'expand', true)
                            } else {
                                Vue.set(compition, 'expand', false)
                            }
                        }
                    }
                }
            }

            return state.tree
        },
        treeTotalEvents: (state) => (etid) => {
            let eventsCount = 0
            if (state.tree && state.tree.length) {
                for (let i = 0; i < state.tree.length; i++) {
                    const event = state.tree[i];
                    if (etid == event.etid) {
                        if (event.children && event.children.length) {
                            for (let j = 0; j < event.children.length; j++) {
                                const compition = event.children[j];
                                eventsCount += compition.children.length
                            }
                        }
                    }
                }
            }
            return eventsCount
        }
    },
    mutations: {
        initialiseStore(state) {
         // console.log("always come")
         // JSON.parse(this.$ls.get("admin_user"))
          if (localStorage.getItem('admin_user')) {
            let adminUser = JSON.parse(localStorage.getItem('admin_user'));
            this.commit('updatePermission', adminUser.pcode)

          }
        },
        updatePermission(state, pcode){
            let permissionList = pcode.split(",");
            let acl = {
                dashboard: permissionList.includes("dashboard") ? true : false,
                ma: permissionList.includes("ma") ? true : false,
                ulist:permissionList.includes("ulist") ? true : false,
                uinsert:permissionList.includes("uinsert") ? true : false,
                bank:permissionList.includes("bank") ? true : false,
                raccst: permissionList.includes("raccst") ? true : false,
                reportpl: permissionList.includes("reportpl") ? true : false,
                reportcb: permissionList.includes("reportcb") ? true : false,
                reportuh: permissionList.includes("reportuh") ? true : false,
                glock: permissionList.includes("glock") ? true : false,
                casinores: permissionList.includes("casinores") ? true : false,
                lcasinores: permissionList.includes("lcasinores") ? true : false,
                casinolist: permissionList.includes("casinolist") ? true : false,
                events: permissionList.includes("events") ? true : false,
                searchanalysis: permissionList.includes("searchanalysis") ? true : false,
                loginuc: permissionList.includes("loginuc") ? true : false,
                withdraw: permissionList.includes("withdraw") ? true : false,
                depo: permissionList.includes("depo") ? true : false,
                creditref: permissionList.includes("creditref") ? true : false,
                uinfo: permissionList.includes("uinfo") ? true : false,
                upass: permissionList.includes("upass") ? true : false,
                ulock: permissionList.includes("ulock") ? true : false,
                block: permissionList.includes("block") ? true : false,
                reporttu: permissionList.includes("reporttu") ? true : false,
            }
            state.acl = acl;
        },
        toggleMainSidebar(state) {
            state.collapsSidebar = !state.collapsSidebar;
            console.log(state.collapsSidebar);
            state.collapsSidebar
                ? document.body.classList.add("sidebar-xs")
                : document.body.classList.remove("sidebar-xs");
        },
        toggleMobileSidebar(state) {
            state.collapsMobileSidebar = !state.collapsMobileSidebar;
            if (state.collapsMobileSidebar) {
                document.body.classList.add("sidebar-mobile-main");
                document.body.classList.remove("sidebar-mobile-secondary");
                document.body.classList.remove("sidebar-mobile-right");
            } else {
                document.body.classList.remove("sidebar-mobile-main");
            }
        }
    }
});
