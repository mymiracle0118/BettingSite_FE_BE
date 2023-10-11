<template>
    <div>
        <PageHeader :title="pageTitle" :items="items" />
        <div class="card">
            <div class="casino-tabs-admin p-2">
                <div class="casino-tabs-menu w-100">
                    <a @click="scroll_left()" class="arrow-tabs arrow-left" href="javascript:void(0)">
                       
                        <i class="mdi mdi-chevron-left"></i>
                    </a>
                    <ul class="nav nav-tabs  nav-tabs-custom">
                        <template v-for="(tab, key) in tabList">
                            <li class="nav-item" :key="key">
                                <a href="javascript:void(0)" class="nav-link" :class="{'active': gameId==tab.gmid}"
                                    @click="changeGameId(tab.gmid, tab.gname)">
                                    {{ tab.gname }}
                                </a>
                            </li>
                        </template>
                    </ul>
                    <a @click="scroll_right()" class="arrow-tabs arrow-right" href="javascript:void(0)">
                         <i class="mdi mdi-chevron-right"></i>
                    </a>
                </div>
            </div>
            <div class="casino-banners">
                <template v-for="(table, key) in casinoList">
                    <div class="casino-banner-item" :key="key" v-if="getCasinoRoute(table.gid)">
                        <template v-if="table.gid">
                            <router-link :to="{ name: getCasinoRoute(table.gid) }">
                                <img v-lazy="casinoBannersPath + table.gid + '.jpg'" class="img-fluid">
                            </router-link>
                        </template>
                        <template v-else>
                            <img v-lazy="imgPath + 'front/img/casino/default.jpeg'" class="img-fluid">
                        </template>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    import PageHeader from "@/components/page-header";

    export default {
        components: {
            PageHeader
        },
        mounted() {
            this.getTabList()

        },
        data() {
            return {
                imgPath: IMG_PATH,
                pageTitle: "Our Casino",
                items: [
                    {
                      text: "Home",
                      to: { name: "home" },
                    },
                    {
                      text: "Our Casino",
                      active: true,
                    },
                ],
                casinoList: [],
                casinoBannersPath: BUCKET_PATH + 'casino_icons/lc/',
                title: '',
                tabList: [],
                gameId: null,
                casinoList: []
            }
        },
        computed: {
          
        },
        methods: {
            scroll_left() {
                let content = document.querySelector(".casino-tabs-admin .nav-tabs");
                content.scrollLeft -= 300;
            },
            scroll_right() {
                let content = document.querySelector(".casino-tabs-admin .nav-tabs");
                content.scrollLeft += 300;
            },
            getCasinoRoute(type){
                let casinoWithType = [
                    { 'type': 'worli', 'route': 'worli' },
                    { 'type': 'worli2', 'route': 'worli2' },
                    { 'type': 'btable', 'route': 'bollywoodTable' },
                    { 'type': 'aaa', 'route': 'AAA'},
                    { 'type': 'dtl20', 'route': 'dragonTigerLionT20'},
                    { 'type': 'dt202', 'route': 'dragonTigerT202'},
                    { 'type': 'dt20', 'route': 'dragonTigerT20'},
                    { 'type': 'dt6', 'route': 'dragonTigerOneDay'},
                    { 'type': 'poker6', 'route': 'poker6Player'},
                    { 'type': 'poker', 'route': 'pokeroneday'},
                    { 'type': 'poker20', 'route': 'pokerT20'},
                    { 'type': 'teen', 'route': 'TeenpattiOneday' },
                    { 'type': 'teen20', 'route': 'teenpattiT20' },
                    { 'type': 'teen8', 'route': 'teenpattiOpen' },
                    { 'type': 'teen9', 'route': 'teenpattiTest' },
                    { 'type': 'baccarat', 'route': 'baccarat' },
                    { 'type': 'baccarat2', 'route': 'baccarat2' },
                    { 'type': 'lucky7', 'route': 'lucky7' },
                    { 'type': 'lucky7eu', 'route': 'lucky7eu' },
                    { 'type': 'lucky7eu2', 'route': 'lucky7eu2' },
                    { 'type': 'war', 'route': 'war' },
                    { 'type': '3cardj', 'route': 'ThreeCardJudgement' },
                    { 'type': 'cmeter', 'route': 'CasinoMeter' },
                    { 'type': 'card32', 'route': 'Card32A' },
                    { 'type': 'card32eu', 'route': 'Card32B' },
                    { 'type': 'queen', 'route': 'Queen' },
                    { 'type': 'cmatch20', 'route': 'CMatch20' },
                    { 'type': 'ab20', 'route': 'AndarBahar' },
                    { 'type': 'abj', 'route': 'AndarBahar2' },
                    { 'type': 'race20', 'route': 'Race20' },
                    { 'type': 'teen6', 'route': 'Teenpatti2' },
                    { 'type': 'cricketv3', 'route': 'Cricketv3' },
                    { 'type': 'lottcard', 'route': 'Lottery' },
                    { 'type': 'paasa', 'route': 'Paasa' },
                    { 'type': 'superover', 'route': 'SuperOver' },
                    { 'type': 'trap', 'route': 'Trap' },
                    { 'type': 'patti2', 'route': 'Teenpatti2Cards' },
                    { 'type': 'teensin', 'route': 'Khal29' },
                    { 'type': 'teenmuf', 'route': 'TeenpattiMuflis' },
                    { 'type': 'race17', 'route': 'Race17' },
                    { 'type': 'teen20b', 'route': 'TeenpattiT20B' },
                    { 'type': 'trio', 'route': 'Trio' },
                    { 'type': 'notenum', 'route': 'NoteNumber' },
                    { 'type': 'teen2024', 'route': 'Teenpatti2024' },
                    { 'type': 'kbc', 'route': 'Kbc' },
                    { 'type': 'teen1', 'route': 'teen1oneday' },
                    { 'type': 'teen120', 'route': 'teen1t20' }
                ]
                let data = _.find(casinoWithType, {'type': type})
                return _.get(data,'route')
            },
            /*getCasinoList() {
                ServiceApi.callApi("report/casino", {})
                    .then(response => {
                        if (response.status == 200) {
                            this.casinoList = response.data
                        } else {
                            this.casinoList = []
                        }
                    })
                    .catch(e => {
                        this.casinoList = []
                    });
            },*/
            getTabList() {
                this.tabList = []
                this.gameId = null

                ServiceApi.callApi("casino/tablist", {
                        'type': 4
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.tabList = response.data
                            this.gameId = _.get(_.head(this.tabList), 'gmid')
                            this.getGameList(this.gameId)
                        } else {
                            this.tabList = []
                            this.gameId = null
                        }
                    })
                    .catch(e => {
                        this.tabList = []
                        this.gameId = null
                    });
            },
            changeGameId(gmid, gamename) {
                this.gameId = gmid
                this.gameName = gamename
                this.getGameList(this.gameId)
            },
            getGameList(gmid) {

                this.casinoList = []
                ServiceApi.callApi("casino/tablelist", {
                    'gmid': gmid,
                    'ismob': IS_MOBILE ? 0 : 1
                })
                .then(response => {
                    if (response.status == 200) {
                        this.casinoList = response.data
                    } else {
                        this.casinoList = []
                    }
                })
                .catch(e => {
                    this.casinoList = []
                });
            }
           
        }
    }
</script>

<style>

</style>