import VueRouter from 'vue-router'
import store from '@/store';

// Pages
import Login from '@/pages/Login'
import Error404 from '@/pages/Error404'
import Error403 from '@/pages/Error403'
import ErrorNoInternet from '@/pages/ErrorNoInternet'

import SecureAuth from '@/pages/SecureAuth'
import LoginAuth from '@/pages/LoginAuth'

import Dashboard from '@/pages/Dashboard'
import Home from '@/pages/Home'
import MarketAnalysis from '@/pages/MarketAnalysis'

import Insertuser from '@/pages/Insertuser'
import Users from '@/pages/Users'
import Changepassword from '@/pages/Changepassword'
import ChangePasswordSuccess from '@/pages/ChangePasswordSuccess'

import GameDetail from '@/pages/GameDetail'
import VirtualCricket from '@/pages/VirtualCricket'
import VirtualGame from '@/pages/VirtualGame'

import CurrentBets from '@/pages/reports/CurrentBets'
import AccountStatement from '@/pages/reports/AccountStatement'
import ProfitLoss from '@/pages/reports/ProfitLoss'
import UserHistory from '@/pages/reports/UserHistory'
import CasinoResult from '@/pages/reports/CasinoResult'
import Bank from '@/pages/reports/Bank'
import TpCasinoReport from '@/pages/reports/TpCasinoReport'
import UserLock from '@/pages/settings/UserLock'
import TurnOverReport from '@/pages/reports/TurnOverReport'
import UserAuthList from '@/pages/reports/UserAuthList'

import CasinoList from '@/pages/casino/CasinoList'
import TeenpattiOneday from '@/pages/casino/TeenpattiOneday'
import TeenpattiT20 from  '@/pages/casino/TeenpattiT20'
import TeenpattiOpen from '@/pages/casino/TeenpattiOpen'
import TeenpattiTest from '@/pages/casino/TeenpattiTest'
import Baccarat from '@/pages/casino/Baccarat'
import Baccarat2 from '@/pages/casino/Baccarat2'
import Lucky7 from '@/pages/casino/Lucky7'
import Lucky7eu from '@/pages/casino/Lucky7eu'
import Lucky7eu2 from '@/pages/casino/Lucky7eu2'
import PokerOneDay from '@/pages/casino/PokerOneDay'
import PokerT20 from '@/pages/casino/PokerT20'
import Poker6Player from '@/pages/casino/Poker6Player'
import DragonTigerOneDay from '@/pages/casino/DragonTigerOneDay'
import DragonTigerT20 from '@/pages/casino/DragonTigerT20'
import DragonTigerT202 from '@/pages/casino/DragonTigerT202'
import DragonTigerLionT20 from '@/pages/casino/DragonTigerLionT20'
import AAA from '@/pages/casino/AAA'
import BollywoodTable from '@/pages/casino/BollywoodTable'
import Worli from '@/pages/casino/Worli'
import Worli2 from '@/pages/casino/Worli2'
import War from '@/pages/casino/War'
import ThreeCardJudgement from '@/pages/casino/ThreeCardJudgement'
import CasinoMeter from '@/pages/casino/CasinoMeter'
import Card32A from '@/pages/casino/Card32A'
import Card32B from '@/pages/casino/Card32B'
import Queen from '@/pages/casino/Queen'
import CMatch20 from '@/pages/casino/CMatch20'
import AndarBahar from '@/pages/casino/AndarBahar'
import AndarBahar2 from '@/pages/casino/AndarBahar2'
import Teenpatti2 from '@/pages/casino/Teenpatti2'
import Race20 from '@/pages/casino/Race20'
import Cricketv3 from '@/pages/casino/Cricketv3'
import SuperOver from '@/pages/casino/SuperOver'
import Lottery from '@/pages/casino/Lottery'
import Trap from '@/pages/casino/Trap'
import Teenpatti2Cards from '@/pages/casino/Teenpatti2Cards'
import Khal29 from '@/pages/casino/Khal29'
import TeenpattiMuflis from '@/pages/casino/TeenpattiMuflis'
import Race17 from '@/pages/casino/Race17'
import TeenpattiT20B from '@/pages/casino/TeenpattiT20B'
import Trio from '@/pages/casino/Trio'
import NoteNumber from '@/pages/casino/NoteNumber'
import Teenpatti2024 from '@/pages/casino/Teenpatti2024'
import Kbc from '@/pages/casino/Kbc'
import Teenpatti1CardOneDay from "@/pages/casino/Teenpatti1CardOneDay";
import Teenpatti1CardT20 from "@/pages/casino/Teenpatti1CardT20";

import vCasinoList from '@/pages/vcasino/vCasinoList'
import vTeen from "@/pages/vcasino/vTeen";
import vTeen20 from "@/pages/vcasino/vTeen20";

import CreateAccount from '@/pages/CreateAccount'

//import AdminSetting from '@/pages/settings/AdminSetting'


// Routes
const routes = [
    /*{
        path: '/admin',
        name: 'landing',
        redirect: {
            name: 'home'
        },
        meta: {
            auth: undefined
        }
    },*/
    {
        path: '*',
        redirect: '/admin',
        meta: {
            auth: false
        }
    },
    {
        path: '/admin',
        name: 'login',
        component: Login,
        meta: {
            auth: undefined
        },

    },
    {
        path: '/admin/loginauth/:authId?',
        name: 'loginAuth',
        component: LoginAuth,
        meta: {
            auth: undefined
        }
    },
    {path: '/admin/change-password-success/:token', name: 'ChangePasswordSuccess', component: ChangePasswordSuccess, meta: {
            auth: undefined
        }}, 
    // USER ROUTES
    {
        path: '/admin/',
        name: 'dashboard',
        component: Dashboard,
        children: [
            {path: '/admin/home', name: 'home', component: Home}, 
            {path: '/admin/market-analysis', name: 'MarketAnalysis', component: MarketAnalysis, meta: { per: 'ma' }}, 
            
            {path: '/admin/change-password', name: 'Changepassword', component: Changepassword, meta: { per: 'cpass' }}, 
            
            
            {path: '/admin/users', name: 'users', component: Users, meta: { per: 'ulist' }}, 
            {path: '/admin/child/:guid', name: 'childusers', component: Users , meta: { per: 'ulist' }}, 
            {path: '/admin/users/insertuser', name: 'Insertuser', component: Insertuser, meta: { per: 'uinsert' }}, 
            {path: '/admin/game/details/:etid/:gameId', name: 'GameDetail', component: GameDetail, meta: { per: 'events' }},
            {
                path: '/admin/virtualcricket/:etid/:gameId',
                name: 'VirtualCricket',
                component: VirtualCricket,
                meta: { per: 'events' }
            },
            {
                path: '/admin/virtualgame/:etid/:gameId',
                name: 'VirtualGame',
                component: VirtualGame,
                meta: { per: 'events' }
            },

            {
                path: 'casino/list',
                name: 'casinolist',
                component: CasinoList,
                meta: { per: 'casinolist' }
            },
            {path: '/admin/casino/teenpattioneday', name: 'TeenpattiOneday', component: TeenpattiOneday, meta: { per: 'casinolist' }},
            {path: 'casino/teenpattit20', name: 'teenpattiT20', component: TeenpattiT20, meta: { per: 'casinolist' }},
            {path: 'casino/teenpattiopen', name: 'teenpattiOpen', component: TeenpattiOpen , meta: { per: 'casinolist' }},
            {
                path: 'casino/teenpattitest',
                name: 'teenpattiTest',
                component: TeenpattiTest, meta: { per: 'casinolist' }
            },
            {path: 'casino/baccarat', name: 'baccarat', component: Baccarat , meta: { per: 'casinolist' }},
            {path: 'casino/baccarat2', name: 'baccarat2', component: Baccarat2 , meta: { per: 'casinolist' }},
            { path: 'casino/lucky7', name: 'lucky7', component: Lucky7 , meta: { per: 'casinolist' }},
            { path: 'casino/lucky7eu', name: 'lucky7eu', component: Lucky7eu , meta: { per: 'casinolist' }},
            { path: 'casino/lucky7eu2', name: 'lucky7eu2', component: Lucky7eu2 , meta: { per: 'casinolist' }},
            { path: 'casino/pokeroneday', name: 'pokeroneday', component: PokerOneDay },
            { path: 'casino/poker20', name: 'pokerT20', component: PokerT20 , meta: { per: 'casinolist' }},
            { path: 'casino/poker6player', name: 'poker6Player', component: Poker6Player, meta: { per: 'casinolist' }},
            { path: 'casino/dragontigeroneday', name: 'dragonTigerOneDay', component: DragonTigerOneDay, meta: { per: 'casinolist' }},
            {
                path: 'casino/dragontigert20',
                name: 'dragonTigerT20',
                component: DragonTigerT20, meta: { per: 'casinolist' }
            },
            {
                path: 'casino/dragontigert202',
                name: 'dragonTigerT202',
                component: DragonTigerT202, meta: { per: 'casinolist' }
            },
            {
                path: 'casino/dragontigerliont20',
                name: 'dragonTigerLionT20',
                component: DragonTigerLionT20, meta: { per: 'casinolist' }
            },
            {
                path: 'casino/aaa',
                name: 'AAA',
                component: AAA, meta: { per: 'casinolist' }
            },
            {
                path: 'casino/bollywoodtable',
                name: 'bollywoodTable',
                component: BollywoodTable, meta: { per: 'casinolist' }
            },
            {
                path: 'casino/worli',
                name: 'worli',
                component: Worli, meta: { per: 'casinolist' }
            },
            {
                path: 'casino/instantworli',
                name: 'worli2',
                component: Worli2, meta: { per: 'casinolist' }
            },
            {
                path: 'casino/war',
                name: 'war',
                component: War, meta: { per: 'casinolist' }
            },
            {
                path: 'casino/3cardj',
                name: 'ThreeCardJudgement',
                component: ThreeCardJudgement, meta: { per: 'casinolist' }
            },
            {
                path: 'casino/meter',
                name: 'CasinoMeter',
                component: CasinoMeter, meta: { per: 'casinolist' }
            },
            {
                path: 'casino/card32a',
                name: 'Card32A',
                component: Card32A, meta: { per: 'casinolist' }
            },
            {
                path: 'casino/card32b',
                name: 'Card32B',
                component: Card32B, meta: { per: 'casinolist' }
            },
            {
                path: 'casino/queen',
                name: 'Queen',
                component: Queen, meta: { per: 'casinolist' }
            },
            {
                path: 'casino/cmatch20',
                name: 'CMatch20',
                component: CMatch20, meta: { per: 'casinolist' }
            },
            {
                path: 'casino/andar-bahar',
                name: 'AndarBahar',
                component: AndarBahar, meta: { per: 'casinolist' }
            },
            {
                path: 'casino/andar-bahar2',
                name: 'AndarBahar2',
                component: AndarBahar2, meta: { per: 'casinolist' }
            },
            {
                path: 'casino/teenpatti2',
                name: 'Teenpatti2',
                component: Teenpatti2, meta: { per: 'casinolist' }
            },
            {
                path: 'casino/race20',
                name: 'Race20',
                component: Race20, meta: { per: 'casinolist' }
            },
            {
                path: 'casino/cricketv3',
                name: 'Cricketv3',
                component: Cricketv3, meta: { per: 'casinolist' }
            },
            {
                path: 'casino/superover',
                name: 'SuperOver',
                component: SuperOver, meta: { per: 'casinolist' }
            },
            {
                path: 'casino/lottery',
                name: 'Lottery',
                component: Lottery, meta: { per: 'casinolist' }
            },
            {path: 'casino/trap', name: 'Trap', component: Trap, meta: { per: 'casinolist' }},
            {path: 'casino/teenpatti2cards', name: 'Teenpatti2Cards', component: Teenpatti2Cards, meta: { per: 'casinolist' }},
            {path: 'casino/29cardbaccarat', name: 'Khal29', component: Khal29, meta: { per: 'casinolist' }},
            {path: 'casino/teenmuf', name: 'TeenpattiMuflis', component: TeenpattiMuflis, meta: { per: 'casinolist' }},
            {path: 'casino/raceto17', name: 'Race17', component: Race17, meta: { per: 'casinolist' }},
            {path: 'casino/teenpattit20b', name: 'TeenpattiT20B', component: TeenpattiT20B, meta: { per: 'casinolist' }},
            {path: 'casino/trio', name: 'Trio', component: Trio, meta: { per: 'casinolist' }},
            {path: 'casino/notenum', name: 'NoteNumber', component: NoteNumber, meta: { per: 'casinolist' }},
            {path: 'casino/teen2024', name: 'Teenpatti2024', component: Teenpatti2024, meta: { per: 'casinolist' }},
            {path: 'casino/kbc', name: 'Kbc', component: Kbc, meta: { per: 'casinolist' }},
            {path: 'casino/1card1day', name: 'teen1oneday', component: Teenpatti1CardOneDay, meta: { per: 'casinolist' }},
            {path: 'casino/1card2020', name: 'teen1t20', component: Teenpatti1CardT20, meta: { per: 'casinolist' }},
             
            {path: 'vcasino/list', name: 'vCasinoList', component: vCasinoList, meta: { per: 'casinolist' }},
            {path: 'vcasino/teen', name: 'vTeen', component: vTeen, meta: { per: 'casinolist' }},
            {path: 'vcasino/teen20', name: 'vTeen20', component: vTeen20, meta: { per: 'casinolist' }},
           

            {path: '/admin/reports/currentbets', name: 'CurrentBets', component: CurrentBets, meta: { per: 'reportcb' }},
            {path: '/admin/reports/accountstatement', name: 'AccountStatement', component: AccountStatement, meta: { per: 'raccst' }},
            {path: '/admin/reports/userhistory', name: 'UserHistory', component: UserHistory, meta: { per: 'reportuh' }},
            {path: '/admin/reports/profitloss', name: 'ProfitLoss', component: ProfitLoss, meta: { per: 'reportpl' }},
            {path: '/admin/reports/casinoresult/:gtype?', name: 'CasinoResult', component: CasinoResult, meta: { per: 'casinores' }},
            {path: '/admin/reports/livecasinoreport/:gtype?', name: 'TpCasinoReport', component: TpCasinoReport, meta: { per: 'lcasinores' }},
            {path: '/admin/reports/turnover', name: 'TurnOverReport', component: TurnOverReport},
            {path: '/admin/reports/authlist', name: 'UserAuthList', component: UserAuthList},
            
            {path: '/admin/reports/bank', name: 'Bank', component: Bank, meta: { per: 'bank' }},
            {path: '/admin/settings/userlock', name: 'UserLock', component: UserLock, meta: { per: 'ulock' }},
            {path: '/admin/createaccount', name: 'CreateAccount', component: CreateAccount, meta: { per: 'loginuc' }},

            {path: '/admin/secureauth',name: 'secureAuth',component: SecureAuth},
           // {path: '/admin/adminsetting',name: 'AdminSetting',component: AdminSetting},

            
        ],
        meta: {
            auth: true
        }
    },
    {
        path: '/admin/404',
        name: 'error404',
        component: Error404
    },
    {
        path: '/admin/nointernet',
        name: 'ErrorNoInternet',
        component: ErrorNoInternet,
        meta: {
            auth: undefined
        }
    },
    {
        path: '/admin/403',
        name: 'error403',
        component: Error403
    },
    {
        path: '*',
        redirect: '/admin/404'
    }
]
const router = new VueRouter({
    base: (process.env.MIX_VUE_BASE_URL || '/'),
    history: true,
    mode: 'history',
    routes,
})
router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.per) {
        if (localStorage.getItem('admin_user')) {
            let adminUser = JSON.parse(localStorage.getItem('admin_user'));
            store.commit('updatePermission', adminUser.pcode)
        }
        if (!store.state.acl[to.meta.per]){
            next({name:'error403'})
        }else{
            next()    
        }
    } else {
        next()
    }
})
export default router
