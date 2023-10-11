<template>
    <div class="report-box casino-box" :class="{'frame-open':$store.state.slot.showFrame}">
        <div class="casino-box-tabs">
            <div class="casino-tabs-menu">
                <a @click="scroll_left(1, 'both')" href="javascript:void(0)" class="arrow-tabs arrow-left">
                    <i class="fas fa-chevron-left"></i>
                </a>
                <ul class="nav nav-pills" id="tab1">
                    <template v-for="(casino, key) in $store.state.slot.providerList">
                        <li class="nav-item" :key="key">
                            <a href="javascript:void(0)" class="nav-link"
                                :class="{'active': $store.state.slot.providerId==casino.pid}"
                                @click="changeCasinoType(casino.pid, casino.type)">
                                {{ casino.pname }}
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
                <div class="close-frame-fantacy" @click="closeSlot()" v-if="$store.state.slot.showFrame">
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
                    <template v-for="(tab, key) in $store.state.slot.catList">
                        <li class="nav-item" :key="key">
                            <a href="javascript:void(0)" class="nav-link"
                                :class="{'active': $store.state.slot.catId==tab.cid}"
                                @click="changeCatId(tab.cid, tab.cname)">
                                {{ tab.cname }}
                            </a>
                        </li>
                    </template>
                </ul>
                <a @click="scroll_right(2, 'mobile')" class="arrow-tabs arrow-right" href="javascript:void(0)">
                    <i class="fas fa-chevron-right"></i>
                </a>
            </div>
            <div class="casino-search"
                :class="[{'open-search':$store.state.slot.searchOpen}, {'close-search':!$store.state.slot.searchOpen}]">
                <input type="text" v-model="$store.state.slot.searchText" placeholder="Search for Casino"
                    class="form-control" ref="searchbox" style="text-transform: lowercase;">
                <div class="search-icon" @click="changeSearch()">
                    <!-- <img :src="imgPath + 'front/img/search.svg'"> -->
                    <i class="fas fa-search"></i>
                </div>
            </div>
        </div>

        <!-- <div class="casino-title">
            <div class="casino-name">{{ $store.state.slot.gameName }}</div>
            <div class="report-search search-box">
                <div class="form-group mb-0">
                    <input type="text" v-model="$store.state.slot.searchText" placeholder="Search" class="form-control">
                    <img :src="imgPath + 'front/img/search.svg'" class="search-icon">
                </div>
            </div>
        </div> -->

        <div class="casino-banners">
            <template v-for="(table, key) in filteredTableList">
                <div class="casino-banner-item" :key="key">
                    <template v-if="table.cid == 12">
                        <template v-if="table.imgpath">
                            <!-- <vue-img :full="getEncodedUrl(table.imgpath)" width="200px"></vue-img> -->
                            <div style="background-size: cover;
                                background-position: center center;
                                padding-top: 75%;" :style="`backgroundImage: url(${getEncodedUrl(table.imgpath)}), url(${imgPath}front/img/casino/default.jpeg);`" />
                            <!-- <img :src="table.imgpath" class="img-fluid"> -->
                        </template>
                        <template>
                            <div class="slot-title">
                                <div>{{ table.gname }}</div>
                                <div class="btn" @click="launchCasino(table.gmid, table.gname, table.cid)">Play</div>
                            </div>
                        </template>
                    </template>

                    <template v-else-if="table.cid == 4">
                        <router-link :to="{ name: $pages.getVcCasinoRoute(table.gmid) }">
                            <template v-if="table.imgpath">
                                <div style="background-size: cover;
                                    background-position: center center;
                                    padding-top: 53.33%; filter:unset;" :style="`backgroundImage: url(${getEncodedUrl(vCasinoBannersPath + table.imgpath)}), url(${imgPath}front/img/casino/default.jpeg);`" />
                            </template>
                            <template v-else>
                                <div style="background-size: cover;
                                    background-position: center center;
                                    padding-top: 53.33%; filter:unset;" :style="`backgroundImage: url(${getEncodedUrl(imgPath + 'front/img/casino/default.jpeg')}), url(${imgPath}front/img/casino/default.jpeg);`" />
                                <!-- <img :src="imgPath + 'front/img/casino/default.jpeg'" class="img-fluid"> -->
                            </template>
                        </router-link>
                        <!-- <template v-if="!($store.state.slot.providerId == 6 && $store.state.slot.catId == 19)">
                            <div class="slot-title">
                                <div>{{ table.gname }}</div>
                                <div class="btn" @click="launchCasino(table.gmid, table.gname, table.cid)">Play</div>
                            </div>
                        </template> -->
                    </template>
                    
                    <template v-else>
                        <template v-if="table.imgpath">
                            <div style="background-size: cover;
                                background-position: center center;
                                padding-top: 75%;" :style="`backgroundImage: url(${getEncodedUrl(slotBannersPath + table.imgpath)}), url(${imgPath}front/img/casino/default.jpeg);`" />
                            <!-- <img :src="slotBannersPath + table.imgpath" class="img-fluid"> -->
                        </template>
                        <template v-else>
                            <div style="background-size: cover;
                                background-position: center center;
                                padding-top: 75%;" :style="`backgroundImage: url(${getEncodedUrl(imgPath + 'front/img/casino/default.jpeg')}), url(${imgPath}front/img/casino/default.jpeg);`" />
                            <!-- <img :src="imgPath + 'front/img/casino/default.jpeg'" class="img-fluid"> -->
                        </template>
                        <template v-if="!($store.state.slot.providerId == 6 && $store.state.slot.catId == 19)">
                            <!-- <div class="slot-title">{{ table.gname }}</div> -->
                            <div class="slot-title">
                                <div>{{ table.gname }}</div>
                                <div class="btn" @click="launchCasino(table.gmid, table.gname, table.cid)">Play</div>
                            </div>
                        </template>
                    </template>
                </div>
            </template>
        </div>

        <div class="banner-iframe" v-if="$store.state.slot.showFrame"
            :class="{'banner-frame-show':$store.state.slot.showFrame}">
            <!-- <div class="close-frame-fantacy" @click="closeSlot()">
                <i class="fas fa-times"></i>
            </div> -->
            <iframe :src="$store.state.slot.url"></iframe>
        </div>
    </div>
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    export default {
        mounted() {
            this.getProviderList()
        },
        data() {
            return {
                imgPath: IMG_PATH,
                // url: '',
                // loading: false,
                // showFrame: false,
                // title: '',
                vCasinoBannersPath: BUCKET_PATH + 'casino_icons/vc/',
                slotBannersPath: BUCKET_PATH + 'casino_icons',
            }
        },
        computed: {
            filteredTableList() {
                var self = this
                window.scrollTo({top: 0, behavior: 'smooth'});
                var results = _.filter(this.$store.state.slot.slotList, function (item) {
                    return _.some(item, v => _.includes(v.toString().toLowerCase(), self.$store.state.slot.searchText.toLowerCase()))
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
            launchCasino(gid, name, pid) {
                console.log(gid, name, pid)
                if (this.$store.state.slot.loading)
                    return
                this.$store.state.slot.url = ''
                this.$store.state.slot.loading = true
                this.$store.state.slot.showFrame = false
                this.$store.state.slot.title = ''
                ServiceApi.callApi("api/front/casino/slot", {
                        'gid': gid,
                        'type': pid
                    })
                    .then(response => {
                        if (response.status == 200) {
                            // console.log(response)
                            if (IS_MOBILE) {
                                this.$store.state.slot.loading = false
                                window.open(response.data, "_blank");
                            } else {
                                this.$store.state.slot.url = response.data
                                this.$store.state.slot.title = name
                                this.$store.state.slot.loading = false
                                this.$store.state.slot.showFrame = true
                                document.body.style.overflow = 'hidden'
                            }
                        } else if (response.status == 300) {
                            this.$bvToast.toast(response.msg, {
                                variant: 'danger',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                            this.$store.state.slot.url = ''
                            this.$store.state.slot.loading = false
                        } else {
                            this.$store.state.slot.url = ''
                            this.$store.state.slot.loading = false
                        }
                    })
                    .catch(e => {
                        this.$store.state.slot.url = ''
                        this.$store.state.slot.loading = false
                    });
            },
            closeSlot() {
                this.$store.state.slot.showFrame = false
                this.$store.state.slot.title = ''
                this.$store.state.slot.url = ''
                document.body.style.overflow = 'auto'
                this.$store.state.slot.loading = false
            },
            changeSearch() {
                this.$store.state.slot.searchOpen = !this.$store.state.slot.searchOpen
                if (this.$store.state.slot.searchOpen) {
                    this.$refs.searchbox.focus();
                }
            },
            scroll_left(tabNo, type) {
                console.log(tabNo, type)
                if (tabNo == 1) {
                    var content = document.getElementById("tab1");
                } else if (tabNo == 2) {
                    if (type == 'mobile') {
                        var content = document.getElementById("tabMobile2");
                    } else {
                        var content = document.getElementById("tabMobile2");
                    }
                }
                content.scrollLeft -= 300;
            },
            scroll_right(tabNo, type) {
                console.log(tabNo, type)
                if (tabNo == 1) {
                    var content = document.getElementById("tab1");
                } else if (tabNo == 2) {
                    if (type == 'mobile') {
                        var content = document.getElementById("tabMobile2");
                    } else {
                        var content = document.getElementById("tabMobile2");
                    }
                }
                content.scrollLeft += 300;
            },
            getProviderList() {
                ServiceApi.callApi("api/front/casino/providerlist", {})
                    .then(response => {
                        if (response.status == 200) {
                            this.$store.state.slot.providerList = response.data
                            this.$store.state.slot.providerId = _.get(_.head(this.$store.state.slot.providerList),
                                'pid')
                            this.getCategoryList(this.$store.state.slot.providerId)
                        } else {
                            this.$store.state.slot.providerList = []
                            this.$store.state.slot.providerId = null
                        }
                    })
                    .catch(e => {
                        this.$store.state.slot.providerList = []
                        this.$store.state.slot.providerId = null
                    });
            },
            changeCasinoType(ctype, type) {
                this.resetAllData()
                this.closeSlot()
                this.$store.state.slot.providerId = ctype
                this.getCategoryList(this.$store.state.slot.providerId)
            },
            getCategoryList(providerId) {
                this.$store.state.slot.searchText = ''
                this.$store.state.slot.catList = []
                this.$store.state.slot.catId = null

                ServiceApi.callApi("api/front/casino/catlist", {
                        'pid': providerId
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.$store.state.slot.catList = response.data
                            this.$store.state.slot.catId = _.get(_.head(this.$store.state.slot.catList), 'cid')
                            this.$store.state.slot.gameName = _.get(_.head(this.$store.state.slot.catList), 'cname')
                            this.getSlotList(this.$store.state.slot.catId)
                        } else {
                            this.$store.state.slot.catList = []
                            this.$store.state.slot.catId = null
                        }
                    })
                    .catch(e => {
                        this.$store.state.slot.catList = []
                        this.$store.state.slot.catId = null
                    });
            },
            changeCatId(gmid, gamename) {
                this.$store.state.slot.catId = gmid
                this.$store.state.slot.gameName = gamename
                this.getSlotList(this.$store.state.slot.catId)
            },
            resetAllData() {
                this.$store.state.slot.catList = []
                this.$store.state.slot.catId = null
                this.$store.state.slot.slotList = []
                this.$store.state.slot.searchText = ''
            },
            getSlotList(catId) {
                window.scrollTo({top: 0, behavior: 'smooth'});
                this.$store.state.slot.slotList = []
                ServiceApi.callApi("api/front/casino/slotlist", {
                        'cid': catId
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.$store.state.slot.slotList = response.data
                        } else {
                            this.$store.state.slot.slotList = []
                        }
                    })
                    .catch(e => {
                        this.$store.state.slot.slotList = []
                    });
            }
        },
        beforeDestroy() {
            this.$store.state.slot.providerList = []
            this.$store.state.slot.providerId = null
            this.$store.state.slot.catList = []
            this.$store.state.slot.catId = null
            this.$store.state.slot.gameName = ''
            this.$store.state.slot.slotList = []
            this.$store.state.slot.searchOpen = false
            this.$store.state.slot.searchText = ''
            this.closeSlot()
        }
    }
</script>