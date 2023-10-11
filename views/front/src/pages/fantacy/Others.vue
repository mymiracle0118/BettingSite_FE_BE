<template>
    <div class="report-box casino-box w-100" :class="{'frame-open':$store.state.fantacy.showFrame}">
        <!-- <div class="casino-title">
            <div class="Casino-name">{{ gameName }}</div>
            <div class="report-search search-box">
                <div class="form-group mb-0">
                    <input type="text" v-model="searchText" placeholder="Search" class="form-control"> 
                    <img :src="imgPath + 'front/img/search.svg'" class="search-icon">
                    </div>
            </div>
        </div> -->
        <div class="slot-note">
            <div class="note-title">Note:</div>
            <div class="note-desc d-none-mobile">Follow FAQ when none of these games work.</div>
            <div class="note-desc d-none-desktop"><marquee>Follow FAQ when none of these games work.</marquee></div>
            <router-link :to="{ name: 'Faq' }" class="btn btn-primary mr-2">Click Here</router-link>
        </div>
        <div class="casino-banners mt-0" :class="{ 'loader-section-parent' : $store.state.fantacy.loading}">
            <Loader :isVisible="$store.state.fantacy.loading"></Loader>

            <template v-for="(table, key) in filteredTableList">
                <div class="casino-banner-item" :key="key" @click="showCasino(table.gmid, table.gname)">
                    <template v-if="table.imgpath">
                        <img :src="casinoBannersPath + table.imgpath" class="img-fluid">
                    </template>
                    <template v-else>
                        <img :src="imgPath + 'front/img/casino/default.jpeg'" class="img-fluid">
                    </template>
                </div>
            </template>
        </div>

        <template v-if="$store.getters.isTablet">
            <transition name="fade" mode="out-in">
                <template v-for="(table, key) in filteredTableList">
                    <template v-if="gmid == table.gmid">
                        <div class="fantasy-desc-container mt-1" :key="key">
                            <div class="container-fluid container-fluid-5">
                                <div class="row row5">
                                    <div class="col-12 col-md-6">
                                        <img :src="casinoBannersPath + table.imgpath" class="img-fluid w-100">
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <h1 class="fantasy-detail-title">
                                            <span>{{ gmTitle }}</span>
                                            <!-- <a href="javascript:void(0);" @click="closeCasino()"><img
                                                    :src="`${imgPath}front/img/close.svg`" class="float-right"></a> -->
                                        </h1>
                                        <div class="">
                                            <button class="btn btn-lg btn-primary" :disabled="$store.state.fantacy.loading"
                                                @click="launchCasino(table.gmid, table.gname)">Play</button>
                                        </div>

                                        <template v-if="gmid == 'dream'">
                                            <dream />
                                        </template>

                                        <template v-if="gmid == 'daba'">
                                            <dabba />
                                        </template>

                                        <template v-if="gmid == 'sports-runner'">
                                            <runner />
                                        </template>

                                        <template v-if="gmid == 'pop-the-ball'">
                                            <pop-the-ball />
                                        </template>

                                        <template v-if="gmid == 'binary'">
                                            <binary />
                                        </template>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </template>
            </transition>
        </template>

        <b-modal ref="my-modal" size='xl' hide-footer :title="gmTitle">
            <template v-for="(table, key) in filteredTableList">
                <template v-if="gmid == table.gmid">
                    <div class="fantasy-desc-container mt-1" :key="key">
                        <div class="container-fluid container-fluid-5">
                            <div class="row row5">
                                <div class="col-12 col-md-6">
                                    <img :src="casinoBannersPath + table.imgpath" class="img-fluid w-100">
                                </div>
                                <div class="col-12 col-md-6">
                                    <h1 class="fantasy-detail-title">
                                        <span>{{ gmTitle }}</span>
                                        <!-- <a href="javascript:void(0);" @click="closeCasino()"><img
                                                    :src="`${imgPath}front/img/close.svg`" class="float-right"></a> -->
                                    </h1>
                                    <div class="">
                                        <button class="btn btn-lg btn-primary" :disabled="$store.state.fantacy.loading"
                                            @click="launchCasino(table.gmid, table.gname)">Play</button>
                                    </div>

                                    <template v-if="gmid == 'dream'">
                                        <dream />
                                    </template>

                                    <template v-if="gmid == 'daba'">
                                        <dabba />
                                    </template>

                                    <template v-if="gmid == 'sports-runner'">
                                        <runner />
                                    </template>

                                    <template v-if="gmid == 'pop-the-ball'">
                                        <pop-the-ball />
                                    </template>

                                    <template v-if="gmid == 'binary'">
                                        <binary />
                                    </template>

                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </template>
        </b-modal>

        <div class="banner-iframe slot-iframe" v-if="$store.state.fantacy.showFrame" :class="{'banner-frame-show':$store.state.fantacy.showFrame}">
            <!-- <div class="banner-iframe-header">
                <div class="banner-iframe-name">{{ $store.state.fantacy.title }}</div>
                <div class="close-frame" @click="closeCasino()">
                    <img :src="imgPath + 'front/img/close.svg'">
                </div>
                <div class="close-frame" @click="closeCasino()">
                    <button class="btn btn-reset">Close</button>
                </div>
            </div> -->
            <!-- <div class="close-frame-fantacy" @click="closeCasino()">
                <i class="fas fa-times"></i>
            </div> -->
            <iframe allow="autoplay" :src="$store.state.fantacy.url"></iframe>
        </div>
    </div>
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    import Loader from '@/components/loader'
    import Dream from '@/pages/fantacy/Dream'
    import Dabba from '@/pages/fantacy/Dabba'
    import Runner from '@/pages/fantacy/Runner'
    import PopTheBall from '@/pages/fantacy/PopTheBall'
    import Binary from '@/pages/fantacy/Binary.vue';

    export default {
        mounted() {
            // this.getTableList()
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            this.casinoList.push({"gmid":"binary","gname":"Binary Options","imgpath":"binary.jpg","sno":5,"tabno":7})
            if (this.$route.params.gmid) {
                const self = this
                this.casinoList.forEach(casino => {
                    if(casino.gmid == self.$route.params.gmid){
                        // if (IS_TABLET) {
                            this.showCasino(casino.gmid, casino.gname)
                        // }
                    }
                });
            }else{
                if (IS_TABLET) {
                    this.showCasino(this.casinoList[0].gmid, this.casinoList[0].gname)
                }
            }
        },
        components: {
            Loader,
            Dream,
            Dabba,
            Runner,
            PopTheBall,
            Binary
        },
        data() {
            return {
                imgPath: IMG_PATH,
                gameName: '',
                casinoList: [],
                searchText: '',
                casinoBannersPath: BUCKET_PATH + 'casino_icons/other/',
                gmid: '',
                gmTitle: '',
                // url: '',
                // loading: false,
                // showFrame: false,
                // title: '',
            }
        },
        computed: {
            filteredTableList() {
                var self = this
                var results = _.filter(this.casinoList, function (item) {
                    return _.some(item, v => _.includes(v.toString().toLowerCase(), self.searchText))
                });
                return _.orderBy(results, 'sno')
            }
        },
        methods: {
            closeCasino() {
                this.$store.state.fantacy.url = ""
                this.$store.state.fantacy.showFrame = false
                this.$store.state.fantacy.title = ''
                this.$store.state.fantacy.loading = false
                document.body.style.overflow = 'auto'
            },
            // getTableList() {
            //     ServiceApi.callApi("api/front/casino/other", {
            //             "mobile": IS_MOBILE,
            //             "type": "OC"
            //         })
            //         .then(response => {
            //             if (response.status == 200) {
            //                 this.casinoList = response.data
            //                 this.casinoList.push({"gmid":"binary","gname":"Binary","imgpath":"binary.jpg","sno":5,"tabno":7})
            //                 if (IS_TABLET) {
            //                     this.showCasino(this.casinoList[0].gmid, this.casinoList[0].gname)
            //                 }
            //             } else {
            //                 this.casinoList = []
            //             }
            //         })
            //         .catch(e => {
            //             this.casinoList = []
            //         });
            // },
            showCasino(gmid, name) {
                this.gmid = gmid
                this.gmTitle = name
                if (!IS_TABLET) {
                    this.$refs['my-modal'].show()
                }
            },
            launchCasino(gmid, name) {
                // console.log(gmid, name)
                if (this.$store.state.fantacy.loading)
                    return
                this.$refs['my-modal'].hide()
                this.$store.state.fantacy.url = ''
                this.$store.state.fantacy.loading = true
                this.$store.state.fantacy.showFrame = false
                this.$store.state.fantacy.title = ''
                ServiceApi.callApi("api/front/casino/launchother", {
                        'device': IS_MOBILE ? 'MOBILE' : 'DESKTOP',
                        'id': gmid
                    })
                    .then(response => {
                        if (response.status == 200) {
                            // console.log(response.data)
                            if (IS_MOBILE) {
                                this.$store.state.fantacy.loading = false
                                window.open(response.data, "_blank");
                            }else{
                                this.$store.state.fantacy.url = response.data
                                this.$store.state.fantacy.title = name
                                this.$store.state.fantacy.loading = false
                                this.$store.state.fantacy.showFrame = true
                                document.body.style.overflow = 'hidden'
                            }
                        } else if(response.status == 300){
                            this.$bvToast.toast(response.msg, {
                                variant: 'danger',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                            this.$store.state.fantacy.url = ''
                            this.$store.state.fantacy.loading = false
                        } else {
                            this.$store.state.fantacy.url = ''
                            this.$store.state.fantacy.loading = false
                        }
                    })
                    .catch(e => {
                        this.$store.state.fantacy.url = ''
                        this.$store.state.fantacy.loading = false
                    });
            },
        },
        beforeDestroy() {
            document.body.style.overflow = 'auto' 
            this.closeCasino()  
        }
    }
</script>