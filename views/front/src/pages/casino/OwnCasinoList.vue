<template>
    <div class="report-box casino-box" :class="{'frame-open':$store.state.casino.showFrame}">
        <div class="casino-box-tabs">
            <div class="casino-tabs-menu">
                <a @click="scroll_left(1, 'both')" href="javascript:void(0)" class="arrow-tabs arrow-left">
                    <i class="fas fa-chevron-left"></i>
                </a>
                <ul class="nav nav-pills" id="tab1">
                    <template v-for="(casino, key) in $store.state.casino.casinoList">
                        <li class="nav-item" :key="key">
                            <a href="javascript:void(0)" class="nav-link" :class="{'active': $store.state.casino.casinoType==casino.ctype}"
                                @click="changeCasinoType(casino.ctype, casino.type)">
                                <img :src="`${imgPath}front/img/icons/${casino.ctype}.png`">
                                <span>{{ casino.cname }}</span>
                            </a>
                        </li>
                    </template>
                </ul>
                <a @click="scroll_right(1, 'both')" href="javascript:void(0)" class="arrow-tabs arrow-right">
                    <i class="fas fa-chevron-right"></i>
                </a>
            </div>
            
            <transition name="custom-classes-transition"
                enter-active-class="animated flipInY"
                leave-active-class="animated flipOutY">
                <div class="close-frame-fantacy" @click="closeCasino()" v-if="$store.state.casino.showFrame">
                    <i class="fas fa-times"></i>
                </div>
            </transition>
        </div>
        <div class="casino-tabs d-none-desktop">
            <div class="casino-tabs-menu">
                <a @click="scroll_left(2, 'mobile')" class="arrow-tabs arrow-left" href="javascript:void(0)">
                    <i class="fas fa-chevron-left"></i>
                </a>
                <ul class="nav nav-tabs" id="tabMobile2">
                    <template v-for="(tab, key) in $store.state.casino.tabList">
                        <li class="nav-item" :key="key">
                            <a href="javascript:void(0)" class="nav-link" :class="{'active': $store.state.casino.tabId==tab.gmid}"
                                @click="changeTabId(tab.gmid, tab.gname)">
                                {{ tab.gname }}
                            </a>
                        </li>
                    </template>
                </ul>
                <a @click="scroll_right(2, 'mobile')" class="arrow-tabs arrow-right" href="javascript:void(0)">
                    <i class="fas fa-chevron-right"></i>
                </a>
            </div>
            <div class="casino-search" :class="[{'open-search':$store.state.casino.searchOpen}, {'close-search':!$store.state.casino.searchOpen}]">
                <input type="text" v-model="$store.state.casino.searchText" placeholder="Search for Casino" class="form-control"
                    ref="searchbox" style="text-transform: lowercase;">
                <div class="search-icon" @click="changeSearch()">
                    <!-- <img :src="imgPath + 'front/img/search.svg'"> -->
                    <i class="fas fa-search"></i>
                </div>
            </div>
        </div>

        <!-- <div class="casino-title">
            <div class="casino-name">{{ $store.state.casino.gameName }}</div>
            <div class="report-search search-box">
                <div class="form-group mb-0">
                    <input type="text" v-model="$store.state.casino.searchText" placeholder="Search" class="form-control">
                    <img :src="imgPath + 'front/img/search.svg'" class="search-icon">
                </div>
            </div>
        </div> -->

        <div class="casino-banners live-casino-banners" id="own-casino">
            <template v-for="(table, key) in filteredTableList">
                <template v-if="$store.state.casino.type == 'LC'">
                    <!-- OWN CASINO -->
                    <template v-if="$store.state.casino.casinoType == 4">
                        <div class="casino-banner-item" :key="key" :class="{'launch-soon' : !$pages.getCasinoRoute(table.gid)}">
                            <template v-if="table.imgpath">
                                <router-link :to="{ name: $pages.getCasinoRoute(table.gid) }">
                                    <!-- <img :src="casinoBannersPath + table.imgpath" class="img-fluid"> -->
                                    <div style="background-size: cover;
                                        background-position: center center;
                                        padding-top: 53.33%;" :style="`backgroundImage: url(${getEncodedUrl(casinoBannersPath + table.imgpath)}), url(${imgPath}front/img/casino/default-2.jpeg);`" />
                                </router-link>
                            </template>
                            <template v-else>
                                <!-- <img :src="imgPath + 'front/img/casino/default.jpeg'" class="img-fluid"> -->
                                <div style="background-size: cover;
                                    background-position: center center;
                                    padding-top: 53.33%;" :style="`backgroundImage: url(${imgPath}front/img/casino/default-2.jpeg);`" />
                            </template>
                        </div>
                    </template>

                    <!-- VIRTUAL CASINO -->
                    <template v-if="$store.state.casino.casinoType == 19">
                        <div class="casino-banner-item" :key="key" :class="{'launch-soon' : !$pages.getVcCasinoRoute(table.gid)}">
                            <template v-if="table.imgpath">
                                <router-link :to="{ name: $pages.getVcCasinoRoute(table.gid) }">
                                    <!-- <img :src="casinoBannersPath + table.imgpath" class="img-fluid"> -->
                                    <div style="background-size: cover;
                                        background-position: center center;
                                        padding-top: 53.33%;" :style="`backgroundImage: url(${getEncodedUrl(vCasinoBannersPath + table.imgpath)}), url(${imgPath}front/img/casino/default-2.jpeg);`" />
                                </router-link>
                            </template>
                            <template v-else>
                                <!-- <img :src="imgPath + 'front/img/casino/default.jpeg'" class="img-fluid"> -->
                                <div style="background-size: cover;
                                    background-position: center center;
                                    padding-top: 53.33%;" :style="`backgroundImage: url(${imgPath}front/img/casino/default-2.jpeg);`" />
                            </template>
                        </div>
                    </template>
                </template>
                <template v-else>
                    <div class="casino-banner-item" 
                        :key="key">
                        <template v-if="table.imgpath">
                            <!-- <img :src="slotBannersPath + table.imgpath" class="img-fluid"> -->
                            <div style="background-size: cover;
                                background-position: center center;
                                padding-top: 53.33%;" :style="`backgroundImage: url(${getEncodedUrl(slotBannersPath + table.imgpath)}), url(${imgPath}front/img/casino/default-2.jpeg);`" />
                        </template>
                        <template v-else>
                            <!-- <img :src="imgPath + 'front/img/casino/default.jpeg'" class="img-fluid"> -->
                            <div style="background-size: cover;
                                background-position: center center;
                                padding-top: 53.33%;" :style="`backgroundImage: url(${imgPath}front/img/casino/default-2.jpeg);`" />
                        </template>
                        <!-- <template v-if="!($store.state.casino.casinoType == 6 && $store.state.casino.tabId == 19)"> -->
                            <div class="slot-title">
                                <div>{{ table.gname }}</div>
                                <div class="btn" @click="launchCasino(table.gid, table.gtid, table.gname, $store.state.casino.casinoType)">Play</div>
                            </div>
                        <!-- </template> -->
                    </div>
                </template>
            </template>
        </div>

        <div class="banner-iframe" v-if="$store.state.casino.showFrame" :class="{'banner-frame-show':$store.state.casino.showFrame}">
            <!-- <div class="close-frame-fantacy" @click="closeCasino()">
                <i class="fas fa-times"></i>
            </div> -->
            <iframe :src="$store.state.casino.url"></iframe>
        </div>
    </div>
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    export default {
        beforeMount(){
            this.getCasinoList()
        },
        mounted() {
            // this.getCasinoList()
        },
        data() {
            return {
                imgPath: IMG_PATH,
                // url: '',
                // loading: false,
                // showFrame: false,
                // title: '',
                casinoBannersPath: BUCKET_PATH + 'casino_icons/lc/',
                vCasinoBannersPath: BUCKET_PATH + 'casino_icons/vc/',
                slotBannersPath: BUCKET_PATH + 'casino_icons',
            }
        },
        computed: {
            filteredTableList() {
                var self = this
                window.scrollTo({top: 0, behavior: 'smooth'});
                var results = _.filter(this.$store.state.casino.tableList, function (item) {
                    return _.some(item, v => _.includes(v.toString().toLowerCase(), self.$store.state.casino.searchText.toLowerCase()))
                });
                return _.orderBy(results, 'srno')
            }
        },
        methods: {
            getEncodedUrl(url){
                if(url == decodeURIComponent(url)){
                    return encodeURI(url)
                }else{
                    return url
                }
            },
            launchCasino(gid, gtid, name, casinoType) {
                // console.log(gid, gtid, name, casinoType)
                if (this.$store.state.casino.loading)
                    return
                this.$store.state.casino.url = ''
                this.$store.state.casino.loading = true
                this.$store.state.casino.showFrame = false
                this.$store.state.casino.title = ''
                ServiceApi.callApi("api/front/casino/slot", {
                        'gamename': gtid,
                        'tableid': gid,
                        'type': casinoType
                    })
                    .then(response => {
                        if (response.status == 200) {
                            // console.log(response)
                            if (IS_MOBILE) {
                                this.$store.state.casino.loading = false
                                window.open(response.data, "_blank");
                            }else{
                                this.$store.state.casino.url = response.data
                                this.$store.state.casino.title = name
                                this.$store.state.casino.loading = false
                                this.$store.state.casino.showFrame = true
                                document.body.style.overflow = 'hidden'
                            }
                        } else if (response.status == 300) {
                            this.$bvToast.toast(response.msg, {
                                variant: 'danger',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                            this.$store.state.casino.url = ''
                            this.$store.state.casino.loading = false
                        } else {
                            this.$store.state.casino.url = ''
                            this.$store.state.casino.loading = false
                        }
                    })
                    .catch(e => {
                        this.$store.state.casino.url = ''
                        this.$store.state.casino.loading = false
                    });
            },
            closeCasino() {
                this.$store.state.casino.showFrame = false
                this.$store.state.casino.title = ''
                this.$store.state.casino.url = ''
                document.body.style.overflow = 'auto'
                this.$store.state.casino.loading = false
            },
            changeSearch() {
                this.$store.state.casino.searchOpen = !this.$store.state.casino.searchOpen
                if (this.$store.state.casino.searchOpen) {
                    this.$refs.searchbox.focus();
                }
            },
            scroll_left(tabNo, type) {
                console.log(tabNo, type)
                if(tabNo == 1){
                    var content = document.getElementById("tab1");
                }
                else if(tabNo == 2){
                    if(type == 'mobile'){
                        var content = document.getElementById("tabMobile2");
                    }else{
                        var content = document.getElementById("tabMobile2");
                    }
                }
                content.scrollLeft -= 300;
            },
            scroll_right(tabNo, type) {
                console.log(tabNo, type)
                if(tabNo == 1){
                    var content = document.getElementById("tab1");
                }
                else if(tabNo == 2){
                    if(type == 'mobile'){
                        var content = document.getElementById("tabMobile2");
                    }else{
                        var content = document.getElementById("tabMobile2");
                    }
                }
                content.scrollLeft += 300;
            },
            getCasinoList() {
                ServiceApi.callApi("api/front/casino/alllist", {})
                    .then(response => {
                        if (response.status == 200) {
                            this.$store.state.casino.casinoList = response.data
                            
                            // this.$store.state.casino.casinoList.push({ctype: 16, sno: 7, cname: "TGS Casino", type: "CS"})

                            if(this.$route.query.tabid){
                                this.$store.state.casino.tabId = this.$route.query.tabid
                                this.getGameList(this.$store.state.casino.tabId)
                            }else{
                                this.$store.state.casino.casinoType = _.get(_.head(this.$store.state.casino.casinoList), 'ctype')
                                this.$store.state.casino.type = _.get(_.head(this.$store.state.casino.casinoList), 'type')
                                this.getTabList(this.$store.state.casino.casinoType)
                            }
                        } else {
                            this.$store.state.casino.casinoList = []
                            this.$store.state.casino.casinoType = null
                            this.$store.state.casino.type = null
                        }
                    })
                    .catch(e => {
                        this.$store.state.casino.casinoList = []
                        this.$store.state.casino.casinoType = null
                        this.$store.state.casino.type = null
                    });
            },
            changeCasinoType(ctype, type) {
                this.resetAllData()
                this.closeCasino()
                this.$store.state.casino.casinoType = ctype
                this.$store.state.casino.type = type
                this.getTabList(this.$store.state.casino.casinoType)
            },
            getTabList(ctype) {
                this.$store.state.casino.searchText = ''
                // this.$store.state.casino.tabList = []
                // this.$store.state.casino.tabId = null

                ServiceApi.callApi("api/front/casino/tablist", {
                        'type': ctype
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.$store.state.casino.tabList = response.data.t1
                            this.$store.state.casino.tabId = _.get(_.head(this.$store.state.casino.tabList), 'gmid')
                            this.$store.state.casino.gameName = _.get(_.head(this.$store.state.casino.tabList), 'gname')
                            this.getGameList(this.$store.state.casino.tabId)
                        } else {
                            this.$store.state.casino.tabList = []
                            this.$store.state.casino.tabId = null
                        }
                    })
                    .catch(e => {
                        this.$store.state.casino.tabList = []
                        this.$store.state.casino.tabId = null
                    });
            },
            changeTabId(gmid, gamename) {
                this.$store.state.casino.tabId = gmid
                this.$store.state.casino.gameName = gamename
                this.getGameList(this.$store.state.casino.tabId)
            },
            resetAllData() {
                this.$store.state.casino.tabList = []
                this.$store.state.casino.tabId = null
                this.$store.state.casino.tableList = []
                this.$store.state.casino.searchText = ''
            },
            getGameList(gmid) {
                window.scrollTo({top: 0, behavior: 'smooth'});
                this.$store.state.casino.tableList = []
                ServiceApi.callApi("api/front/casino/tablelist", {
                        'gmid': gmid,
                        'ismob': IS_MOBILE ? 0 : 1
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.$store.state.casino.tableList = response.data.t1
                        } else {
                            this.$store.state.casino.tableList = []
                        }
                    })
                    .catch(e => {
                        this.$store.state.casino.tableList = []
                    });
            }
        },
        beforeDestroy(){
            // this.$store.state.casino.type = null
            // this.$store.state.casino.casinoList = []
            // this.$store.state.casino.casinoType = null
            // this.$store.state.casino.tabList = []
            // this.$store.state.casino.tabId = null
            this.$store.state.casino.gameName = ''
            this.$store.state.casino.tableList = []
            this.$store.state.casino.searchOpen = false
            this.$store.state.casino.searchText = ''
            this.closeCasino()
        }
    }
</script>