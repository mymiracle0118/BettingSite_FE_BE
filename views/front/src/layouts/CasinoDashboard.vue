<template>
    <div class="wrapper">
        <!-- <let-it-snow v-bind="snowConf" :show="show"></let-it-snow> -->
        <!-- <div class="animated-header" v-if="$store.state.showAnimation">
            <template v-if="timer">
                <span class="d-none-desktop mob">{{ timer }}</span>

                <span class="d-none-mobile web">{{ timer }}</span>
            </template>

            <div id="iplAnimation2" style="height: 34px;">
            </div>
            <span class="fas fa-times" @click="$store.commit('toggleAnimation')"></span>
        </div> -->

        <div class="animated-header" v-if="$store.state.showAnimation">
            <section class="header-animated-banner" id="animationCasinoDashboard">
                <div>
                    <img :src="`${imgPath}front/img/animation/anim-banner-bg.png`" alt="" class="bg">
                    <img :src="`${imgPath}front/img/animation/anim-banner-10.png`" alt="">
                    <div class="item">
                        <img :src="`${imgPath}front/img/animation/anim-banner-1.png`" alt="">
                        <img :src="`${imgPath}front/img/animation/anim-banner-2.png`" alt="">
                    </div>
                    <div class="item">
                        <img :src="`${imgPath}front/img/animation/anim-banner-3.png`" alt="">
                        <img :src="`${imgPath}front/img/animation/anim-banner-4.png`" alt="">
                    </div>
                    <div class="text">
                        <!-- <img :src="`${imgPath}front/img/animation/anim-banner-9.png`" alt=""> -->
                        <span></span>
                        <!-- <img :src="`${imgPath}front/img/animation/anim-banner-9.png`" alt=""> -->
                    </div>
                    <div class="item">
                        <img :src="`${imgPath}front/img/animation/anim-banner-5.png`" alt="">
                        <img :src="`${imgPath}front/img/animation/anim-banner-6.png`" alt="">
                    </div>
                    <div class="item">
                        <img :src="`${imgPath}front/img/animation/anim-banner-7.png`" alt="">
                        <img :src="`${imgPath}front/img/animation/anim-banner-8.png`" alt="">
                    </div>
                    <img :src="`${imgPath}front/img/animation/anim-banner-10.png`" alt="">
                </div>
            </section>
            <span class="fas fa-times" @click="$store.commit('toggleAnimation')"></span>
        </div>

        <div class="header-top">
            <!-- <template v-if="showHoli">
                <template v-for="(i, key) in holiObject.left">
                    <holi :key="`left-${key}`" name="left" />
                </template>
            </template> -->

            <ul class="">
                <li>
                    <router-link :to="{name: 'home'}">Exchange</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'owncasinolist'}">Live Casino</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'slotcasinolist'}">Slot</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'fantacy'}">Fantasy Games</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'others'}">Others</router-link>
                </li>
            </ul>

            <!-- <template v-if="$store.getters.domain == 'world777.com'"> -->
            <div class="color-box-container">
                <div class="color-box dark-box" @click="switchTheme('dark')"></div>
                <div class="color-box light-box" @click="switchTheme('light')"></div>
                <div class="color-box" v-if="themeType == '1'" :style="{ 'background-color' : bgBody }"
                    @click="switchTheme('custom')"></div>
                <div class="color-box blue-box" v-else @click="switchTheme('blue')"></div>
                <template v-if="adminSettins">
                    <template
                        v-if="(adminSettins.button2 && adminSettins.button2.show) || (adminSettins.button3 && adminSettins.button3.show)">
                        <div class="depo-withdraw-btn">
                            <template v-if="adminSettins.button2 && adminSettins.button2.show">
                                <a :href="adminSettins.button2.link" class="btn btn-sm mr-2" target="_blank"
                                    :style="{ backgroundColor : adminSettins.button2.color, borderColor : adminSettins.button2.color, color : adminSettins.button2.fontcolor }">{{ adminSettins.button2.title }}</a>
                            </template>
                            <template v-if="adminSettins.button3 && adminSettins.button3.show">
                                <a :href="adminSettins.button3.link" class="btn btn-sm" target="_blank"
                                    :style="{ backgroundColor : adminSettins.button3.color, borderColor : adminSettins.button3.color, color : adminSettins.button3.fontcolor }">{{ adminSettins.button3.title }}</a>
                            </template>
                        </div>
                    </template>
                </template>
            </div>
            <!-- </template> -->

            <!-- <template v-if="showHoli">
                <template v-for="(i, key) in holiObject.right">
                    <holi :key="`right-${key}`" name="right" />
                </template>
            </template> -->

            <b-modal ref="depositeModal" size="md" modal-class="deposit-modal" hide-footer>
                <Loader :isVisible="loading"></Loader>
                <!-- <div class="report-form"> -->
                <ValidationObserver tag="div" class="report-form" v-slot="{ invalid }">
                    <ValidationProvider name="Amount" tag="div" class="form-group" v-slot="{ errors }"
                        :rules="{required: true, numeric: true, min_value:1, regex: /^[0-9]+$/}">
                        <label>Amount</label>
                        <input type="text" v-model.number="depositeAmt" placeholder="Amount" class="form-control"
                            onkeypress='return event.charCode >= 48 && event.charCode <= 57' />
                        <span v-if="errors[0]" class="error">
                            {{ errors[0] }}
                        </span>
                    </ValidationProvider>

                    <div class="form-group">
                        <button class="btn btn-primary" @click="getPaymentLink()" :disabled="invalid">Deposit</button>
                    </div>

                    <!-- <div class="form-group">
                        <label>Amount</label>
                        <input type="text" name="" v-model="depositeAmt" class="form-control" />
                        </div> 
                        <button class="btn btn-primary" @click="getPaymentLink()" :disabled="invalid">Deposit</button> -->
                </ValidationObserver>
                <!-- </div> -->
                <div class="mt-3">
                    <p>
                        After you deposit the amount please send the screenshot of
                        your transaction to our support whatsapp number
                    </p>
                    <p><i class="fab fa-whatsapp mr-2"></i>+447575757572 / +447377773777</p>
                    <p>For more transaction security we accept only indian cards and wallets</p>
                </div>
            </b-modal>
        </div>
        <div class="main-container" :class="{'frame-open':$store.state.slot.showFrame}">
            <NavBar />
            <div class="logo-box d-none-mobile logo-casino">
                <div class="logo">
                    <!-- <template v-if="showHoli">
                        <template v-for="(i, key) in holiObject.logo">
                            <holi :key="`logo-${key}`" name="logo" />
                        </template>
                    </template> -->
                    <router-link :to="{name: 'home'}">
                        <!-- <img :src="`${imgPath}front/img/logo.png`" class="img-fluid"> -->
                        <img :src="logoPath" class="img-fluid">
                    </router-link>
                </div>
            </div>

            <div class="center-main-content" :class="[{'report-container' : $pages.is('report',$route.name)}]">
                <div class="news-bar d-none-desktop">
                    <marquee>{{ $store.state.newsMsg }}</marquee>
                    <div class="news-title">
                        <template v-if="theme == 'light'">
                            <img :src="`${imgPath}front/img/icons/speaker-light.svg`">
                        </template>
                        <template v-else>
                            <img :src="`${imgPath}front/img/icons/speaker.svg`">
                        </template>
                    </div>
                </div>

                <div class="upcoming-fixure d-none-desktop">
                    <div class="fixure-title">Upcoming Fixtures</div>
                    <div class="fixure-box-container">
                        <div id="carousel2" class="carousel vert slide" data-ride="carousel" data-interval="3000">
                            <div class="carousel-inner" v-if="fixtureData && fixtureData.length">
                            <template v-for="(data, key) in fixtureData">
                                <div class="carousel-item" :class="{'active': key == 0}" :key="key">
                                <div class="fixure-box">
                                    <router-link :to="{ name: data.sportid == 4 ? 'gameDetailCricket' : 'gameDetail', params: { etid: $base64.enc(data.sportid), gameId: $base64.enc(data.eid) }}">
                                    <div>
                                        <i class="d-icon mr-2" :class="`icon-${data.sportid}`"></i>
                                        {{ data.ename }}
                                    </div>
                                    <div>{{ changeDateFormat(data.dt) }}</div>
                                    </router-link>
                                </div>
                                </div>
                            </template>
                            </div>
                        </div>
                    </div>
                </div>

                <router-view :key="$route.fullPath"></router-view>


            </div>
            <!-- <template v-if="$store.getters.isTablet"> -->
            <Footer />
            <!-- </template> -->
        </div>
    </div>
</template>

<script>
    import NavBar from "../components/casino/nav-bar";
    import Footer from "../components/footer";
    import Loader from '@/components/loader'
    import ServiceApi from "@/services/ServiceApi";
    // import LetItSnow from 'vue-let-it-snow';
    import moment from 'moment-timezone'
    moment.tz.setDefault(DEFAULT_TIMEZONE);
    // import Holi from '@/components/Holi.vue';

    var snowInterval

    export default {
        components: {
            NavBar,
            Footer,
            Loader,
            // LetItSnow,
            // Holi,
        },
        data() {
            return {
                // showHoli: false,
                // holiObject: {
                //     logo: this.getRndInteger(2, 4),
                //     left: this.getRndInteger(4, 6),
                //     right: this.getRndInteger(4, 6)
                // },
                adminSettins: ADMIN_SETTING,
                loading: false,
                depositeAmt: "",
                fixtureData: [],
                rulesData: [],
                snowConf: {
                    windPower: 1,
                    speed: 1,
                    count: 12,
                    size: 5,
                    opacity: 3,
                    images: [
                        'https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/snow.png',
                        // 'https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/sock.png',
                        // 'https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/tree.png'
                    ]
                },
                show: false,
                imgPath: IMG_PATH,
                // logoPath: BUCKET_PATH + 'sitethemes/' + DOMAIN + '/front/logo.png',
                logoPath: LOGO_PATH,
                callUserDataApi: true,
                callApi: true,
                // callTreeApi: true,
                loadingPlacebet: false,
                timer: "",
                theme: THEME,
                themeType: THEME_TYPE,
                bgBody: BG_BODY
            };
        },
        created: () => {

        },
        mounted() {
            $('#carousel2').carousel({
                interval: 3000
            })
            this.show = true
            if (this.$store.state.showAnimation) {
                setTimeout(() => {
                    new Typed('#animationCasinoDashboard .text span', {
                        strings: ANIMATION_MSG,
                        typeSpeed: 60,
                        backSpeed: 60,
                        loop: true,
                        showCursor: false,
                    })
                }, 1000);
            }
            // const countDownDate = moment(EVENT_DT, "MM-DD-YYYY hh:mm:ss A");
            // const self = this
            // var x = setInterval(function () {
            //     var now = moment()
            //     var distance = countDownDate - now;

            //     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            //     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            //     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            //     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            //     self.timer = days + "d " + hours + "h " +
            //         minutes + "m " + seconds + "s ";

            //     if (distance < 0) {
            //         clearInterval(x);
            //         self.timer = "";
            //     }
            // }, 1000);

            // if (this.$store.state.showAnimation) {
            //     let svgContainer = document.getElementById('iplAnimation2');
            //     let path = !this.$store.getters.isTablet ? IMG_PATH + "front/js/Banner_3.json" : IMG_PATH +
            //         "front/js/Banner_2.json"
            //     // console.log(path)
            //     let animItem = bodymovin.loadAnimation({
            //         wrapper: svgContainer,
            //         animType: 'svg',
            //         loop: true,
            //         path: path
            //     });
            // }

            // setTimeout(() => {
            //     this.showHoli = true
            // }, 1000);
            // snowInterval = setInterval(() => {
            //     this.snowConf.size = _.random(2, 4, false)
            //     this.snowConf.count = _.random(3, 6, false)
            //     this.snowConf.windPower = _.random(-1, 4, true)
            // }, 10000);

            // const self = this
            // var myElement = document.querySelector("#app")
            // var hammertime = new Hammer(myElement);
            // hammertime.on('swiperight', function (ev) {
            //     // console.log('right', ev)
            //     if (IS_MOBILE) {
            //         self.$store.state.collapsSidebar = true
            //     }
            // });
            if (this.$store.getters.isMobile) {
                this.getFixture();
            }
            // this.getButtonList()
            this.getUserData()
            this.getData()
            // this.getTreeData();
        },
        methods: {
            switchTheme(themeColor) {
                ServiceApi.callApi("api/front/changetheme", {
                        theme: themeColor,
                    })
                    .then((response) => {
                        // console.log(response)
                        if (response.status == 200) {
                            // localStorage.setItem("theme", themeColor);
                            window.location.reload();
                        } else {

                        }
                    })
                    .catch((e) => {

                    });
            },
            getRndInteger(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            changeDateFormat(date) {
                return moment(String(date), 'MM-DD-YYYY hh:mm:ss A').format('DD/MM/YYYY HH:mm:ss')
            },
            showDePositeMdl() {
                this.$refs["depositeModal"].show();
            },
            hideDepositeModal() {
                this.$refs["depositeModal"].hide();
            },
            getPaymentLink() {
                this.loading = true;
                ServiceApi.callApi("api/front/deposite", {
                        amt: this.depositeAmt,
                    })
                    .then((response) => {
                        if (response.status == 200) {
                            window.open(response.data.url, "_blank");
                            setTimeout((res) => {
                                this.depositeAmt = "";
                                this.hideDepositeModal();
                            }, 1000);
                        } else {
                            this.$bvToast.toast(response.msg, {
                                variant: "danger",
                                toaster: "b-toaster-top-full",
                                autoHideDelay: 3000,
                            });
                        }
                    })
                    .catch((e) => {
                        this.$bvToast.toast(e, {
                            variant: "danger",
                            toaster: "b-toaster-top-full",
                            autoHideDelay: 3000,
                        });
                    })
                    .finally((res) => {
                        this.loading = false;
                    });
            },
            getFixture() {
                ServiceApi.callApi("api/front/fixture2")
                    .then(response => {
                        if (response.status == 200) {
                            // console.log(response.data)
                            this.fixtureData = response.data
                        } else {
                            this.fixtureData = []
                        }
                    })
                    .catch(e => {
                        this.fixtureData = []
                    });
            },
            resetFlags() {
                // this.user.rdisplay = false
                // this.user.ipop = false
                // this.$store.state.rdisplay = false
                // this.$store.state.ipop = false
                localStorage.setItem('user', JSON.stringify(this.user))
                localStorage.clear();
                this.$auth.logout();
            },
            hideRules() {
                this.$refs['rulesModal'].hide()
                // localStorage.clear();
                // this.$auth.logout();
            },
            getRules() {
                this.rulesData = []
                ServiceApi.callApi("api/front/rules")
                    .then(response => {
                        if (response.status == 200) {
                            this.rulesData = response.data
                            this.$refs['rulesModal'].show()
                        } else {
                            this.rulesData = []
                        }
                    })
                    .catch(e => {
                        this.rulesData = []
                    });
            },
            scroll_left() {
                let content = document.querySelector(".nav-tabs");
                content.scrollLeft -= 200;
            },
            scroll_right() {
                let content = document.querySelector(".nav-tabs");
                content.scrollLeft += 200;
            },

            // getButtonList() {
            //     ServiceApi.callApi("api/front/buttonlist")
            //         .then(response => {
            //             if (response.status == 200) {
            //                 this.$store.state.buttonList = response.data.t1
            //                 this.$store.state.autocon = response.data.autocon
            //             }
            //         })
            //         .catch(e => {
            //             this.$store.state.buttonList = []
            //         });
            // },
            getUserData() {
                ServiceApi.callApi("api/front/userdata", {}, 5000)
                    .then(response => {
                        if (response.status == 200) {
                            this.$store.state.user = response.data
                            this.$store.state.is_mobile = IS_MOBILE
                            this.$store.state.is_tablet = IS_TABLET
                            if (this.callUserDataApi == true) {
                                setTimeout(res => {
                                    this.getUserData();
                                }, 1000);
                            }
                        } else if (response.status == 402) {
                            this.$auth.logout();
                            localStorage.clear();
                            window.location.reload();
                        } else {

                            if (this.callUserDataApi == true) {
                                setTimeout(res => {
                                    this.getUserData();
                                }, 1000);
                            }
                        }
                    })
                    .catch(e => {
                        if (this.callUserDataApi == true) {
                            setTimeout(res => {
                                this.getUserData();
                            }, 1000);
                        }
                    });
            },
            // getTreeData() {
            //     if (IS_MOBILE) {
            //         ServiceApi.callApi("api/front/treedata", {}).then(response => {
            //                 if (response.status == 200) {
            //                     this.$store.state.tree = response.data.t1
            //                 }
            //                 if (this.callTreeApi == true) {
            //                     setTimeout(res => {
            //                         this.getTreeData();
            //                     }, 300000);
            //                 }

            //             })
            //             .catch(e => {
            //                 if (this.callTreeApi == true) {
            //                     setTimeout(res => {
            //                         this.getTreeData();
            //                     }, 300000);
            //                 }
            //                 // this.$store.state.tree = []
            //             });
            //     }
            // },
            getData() {
                ServiceApi.callApi("api/front/getdata", {})
                    .then(response => {
                        if (response.status == 200) {
                            // this.$store.state.newsMsg = response.msg
                            this.$store.state.newsMsg = NEWS
                            if (this.callApi == true) {
                                setTimeout(res => {
                                    this.getData();
                                }, 300000);
                            }
                        } else {
                            if (this.callApi == true) {
                                setTimeout(res => {
                                    this.getData();
                                }, 300000);
                            }
                        }
                    })
                    .catch(e => {
                        if (this.callApi == true) {
                            setTimeout(res => {
                                this.getData();
                            }, 300000);
                        }
                    });
            },
            placebet() {
                if (this.loadingPlacebet)
                    return
                this.loadingPlacebet = true
                ServiceApi.callApi("api/front/placebet", this.$store.state.bet)
                    .then(response => {
                        if (response.success) {
                            this.$bvToast.toast(response.msg, {
                                variant: 'success',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                            // console.log('success', response.msg)
                            this.$store.commit('resetBetData')
                            this.loadingPlacebet = false
                        } else {
                            this.$bvToast.toast(response.msg, {
                                variant: 'danger',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                            // console.log('fail', response.msg)
                            this.$store.commit('resetBetData')
                            this.loadingPlacebet = false
                        }
                    })
                    .catch(e => {
                        // console.log('error', e)
                        this.$store.commit('resetBetData')
                        this.loadingPlacebet = false
                    });
            }
        },
        beforeDestroy() {
            this.show = false
            clearInterval(snowInterval)
            this.callUserDataApi = false
            this.callApi = false
            // this.callTreeApi = false
        }
    };
</script>