<template>
  <!-- Header -->
  <header class="header">
    <!-- <div class="menu-button-mobile" @click="$store.commit('toggleSidebar')"> -->
    <div class="menu-button-mobile" @click="$store.state.collapsSidebar = !$store.state.collapsSidebar">
      <span class="menu-button-bar"></span>
      <span class="menu-button-bar"></span>
      <span class="menu-button-bar"></span>
    </div>

    <b-sidebar id="sidebar-border" sidebar-class="d-none-desktop" :visible="$store.state.collapsSidebar" width="80%"
      no-header @hidden="$store.state.collapsSidebar = false" backdrop-variant="dark" backdrop shadow>
      <div class="sidebar-left" id="sidebar-left-mo">
        <div class="d-none-desktop tabs-mobile">
          <ul class="">
            <li>
              <router-link :to="{ name: 'home' }" @click.native="$store.commit('toggleSidebar')">
                Exchange
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'owncasinolist' }" @click.native="$store.commit('toggleSidebar')">
                Live Casino
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'slotcasinolist' }" @click.native="$store.commit('toggleSidebar')">
                Slot
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'fantacy' }" @click.native="$store.commit('toggleSidebar')">
                Fantasy Games
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'others' }" @click.native="$store.commit('toggleSidebar')">
                Others
              </router-link>
            </li>
          </ul>
        </div>

        <div class="menu-scrolable">
          <div class="search-box">
            <div class="form-group d-inline-block mb-0">
              <input type="text" @keyup="searchEvent" v-model="$store.state.searchText" placeholder="Search"
                class="form-control" style="text-transform: lowercase" autocomplete="off" />
              <template v-if="$store.state.searchLoader">
                <i class="fa fa-spinner fa-spin search-icon"></i>
              </template>
              <template v-else>
                <img :src="imgPath + 'front/img/search.svg'" class="search-icon" />
              </template>
            </div>
            <!-- <div class="d-inline-block d-none-desktop close-mobile-menu" @click="$store.state.collapsSidebar = false">
              <i class="fas fa-arrow-left"></i>
            </div> -->
            <div class="menu-button-mobile d-none-desktop" @click="$store.state.collapsSidebar = false">
              <span class="menu-button-bar"></span>
              <span class="menu-button-bar"></span>
              <span class="menu-button-bar"></span>
            </div>
          </div>

          <template v-if="$store.getters.searchedData && $store.getters.searchedData.length">
            <div class="search-list d-none-desktop">
              <div class="search-title">Search Result</div>
              <div class="search-content">
                <template v-for="(data, key) in $store.getters.searchedData">
                  <div class="search-event-title" :key="`header${key}`">
                    {{ data.etype }}
                  </div>
                  <template v-for="(event, key2) in data.events">
                    <router-link :key="`body${key}-${key2}`" @click.native="clearSearch" :to="{
                        name: event.etid == 4 ? 'gameDetailCricket' : 'gameDetail',
                        params: {
                          etid: $base64.enc(event.etid),
                          gameId: $base64.enc(event.gmid),
                        },
                      }">
                      <div class="search-game">
                        <div class="search-game-name">{{ event.ename }}</div>
                        <div class="search-game-time">{{ changeDateFormat(event.stime) }}</div>
                      </div>
                    </router-link>
                  </template>
                </template>
              </div>
            </div>
          </template>

          <div class="menu-box">
            <!-- <ul class="navbar-nav">
          <li class="favourite">
            <a href="#">
              <img :src="imgPath + 'front/img/favourite.svg'" class="favourite-icon">
              <span>Favourite</span>
              <img :src="imgPath + 'front/img/arrow-down.svg'" class="float-right menu-down">
            </a>
          </li>
        </ul> -->

            <!-- <template v-for="(item, key) in $store.getters.treeData">
              <ul class="navbar-nav" :key="key">
                <tree-item :item="item"></tree-item>
              </ul>
            </template> -->
            <template v-if="!$store.getters.isTablet">
              <tree-menu />
            </template>
          </div>

          <!-- <template v-if="!$store.getters.isTablet">
            <Footer />
          </template> -->
        </div>
      </div>
    </b-sidebar>

    <div class="logo-box d-none-desktop">
      <router-link :to="{ name: 'home' }">
        <div class="logo">
          <!-- <template v-if="showHoli">
            <template v-for="(i, key) in holiObject.logo">
              <holi :key="`logo-${key}`" name="logoMobile" />
            </template>
          </template> -->
          <!-- <img :src="imgPath + 'front/img/logo.png'" class="img-fluid"> -->
          <img :src="logoPath" class="img-fluid" />
        </div>
      </router-link>
    </div>

    <!-- <template v-if="showFixture"> -->
    <div class="upcoming-fixure d-none-mobile">
      <div class="fixure-title">Upcoming Fixtures</div>
      <div class="fixure-box-container">
        <div id="carousel0" class="carousel vert slide" data-ride="carousel" data-interval="3000">
          <div class="carousel-inner" v-if="fixtureData && fixtureData.length">
            <template v-for="(data, key) in fixtureData">
              <div class="carousel-item" :class="{'active': key == 0}" :key="key">
                <div class="fixure-box">
                  <router-link
                    :to="{ name: data.sportid == 4 ? 'gameDetailCricket' : 'gameDetail', params: { etid: $base64.enc(data.sportid), gameId: $base64.enc(data.eid) }}">
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

    <div class="news-bar d-none-mobile" v-if="$store.state.newsMsg">
      <marquee>
        {{ $store.state.newsMsg }}
      </marquee>
      <div class="news-title">
        <template v-if="theme == 'light'">
          <img :src="`${imgPath}front/img/icons/speaker-light.svg`">
        </template>
        <template v-else>
          <img :src="`${imgPath}front/img/icons/speaker.svg`">
        </template>
      </div>
    </div>
    <!-- </template> -->

    <div class="float-right header-right">
      <span class="balance d-none-mobile">Pts:
        <span class="balance-value" v-if="$store.state.user.bal">{{
          parseFloat($store.state.user.bal)
        }}</span>
        <span v-else class="balance-value">0</span>
        <span class="balance-value" @click="getMyMarket()">
          | {{ parseFloat($store.state.user.exp) }}
        </span>
      </span>

      <div class="username-info d-none-mobile" data-toggle="collapse" data-target="#user-dropdown">
        <span class="user-icon">
          <img :src="imgPath + 'front/img/user.svg'" />
        </span>
        <span class="username" v-if="$store.getters.user.uname">{{
          $store.getters.user.uname
        }}</span>
        <img :src="imgPath + 'front/img/arrow-down.svg'" />
        <div class="collapse user-dropdown" id="user-dropdown">
          <template v-if="$store.getters.domain == 'wolf777.com'">
            <router-link :to="{ name: 'coupons' }">Coupons</router-link>
          </template>
          <router-link :to="{ name: 'accountstatementReport' }">Account Statement</router-link>
          <router-link :to="{ name: 'currentbetsReport' }">Current Bets</router-link>
          <router-link :to="{ name: 'activity' }">Activity Log</router-link>
          <router-link :to="{ name: 'casinoResult' }">Casino Results</router-link>
          <router-link :to="{ name: 'liveCasinoResult' }">Live Casino Bets</router-link>
          <a href="javascript:void(0)" @click="showSetButton()">Set Button Value</a>
          <a href="javascript:void(0)" @click="showChangePassword()">Change Password</a>
          <router-link :to="{ name: 'secureAuth' }">Security Auth Verification</router-link>

          <!-- <router-link :to="{ name: 'Faq' }">Frequently Asked Questions (FAQ)</router-link> -->
          <!-- <template v-if="$store.getters.domain == 'wolf777.com'">
            <a href="javascript:void(0)" @click="showDePositeMdl()">Deposit</a>
            <router-link :to="{ name: 'WithdrawRequest' }">Withdrawal</router-link>
          </template> -->
          <div class="login-seperator"></div>
          <a href="javascript:void(0)" @click="logoutUser()">Logout</a>
        </div>
      </div>
      <div class="text-center d-none-desktop bal-point">
        Pts:
        <span v-if="$store.state.user.bal">{{ parseFloat($store.state.user.bal) }}</span>
        <span v-else>0</span>
        <span @click="getMyMarket()">
          | {{ parseFloat($store.state.user.exp) }}</span>
      </div>
      <div class="username-info d-none-desktop">
        <div class="d-inline-block" data-toggle="collapse" data-target="#user-dropdown">
          <span class="user-icon">
            <img :src="imgPath + 'front/img/user.svg'" />
          </span>
          <span class="username" v-if="$store.getters.user.uname">{{
            $store.getters.user.uname
          }}</span>
          <img :src="imgPath + 'front/img/arrow-down.svg'" />
        </div>
        <div class="collapse user-dropdown" id="user-dropdown">
          <template v-if="adminSettins">
            <template
              v-if="(adminSettins.button2 && adminSettins.button2.show) || (adminSettins.button3 && adminSettins.button3.show)">
              <div class="depo-withdraw-btn">
                <template v-if="adminSettins.button2 && adminSettins.button2.show">
                  <a :href="adminSettins.button2.link" class="btn" target="_blank"
                    :style="{ backgroundColor : adminSettins.button2.color, borderColor : adminSettins.button2.color, color : adminSettins.button2.fontcolor }">{{ adminSettins.button2.title }}</a>
                </template>
                <template v-if="adminSettins.button3 && adminSettins.button3.show">
                  <a :href="adminSettins.button3.link" class="btn" target="_blank"
                    :style="{ backgroundColor : adminSettins.button3.color, borderColor : adminSettins.button3.color, color : adminSettins.button3.fontcolor }">{{ adminSettins.button3.title }}</a>
                </template>
              </div>
            </template>
          </template>

          <!-- <template v-if="$store.getters.domain == 'world777.com'"> -->
          <!-- <div class="login-seperator"></div> -->

          <div class="color-box-container">
            <div class="w-100 select-theme-title">Pick your theme</div>
            <div class="color-box dark-box" @click="switchTheme('dark')"></div>
            <div class="color-box light-box" @click="switchTheme('light')"></div>
            <div class="color-box" v-if="themeType == '1'" :style="{ 'background-color' : bgBody }"
              @click="switchTheme('custom')"></div>
            <div class="color-box blue-box" v-else @click="switchTheme('blue')"></div>
          </div>
          <!-- </template> -->

          <div class="login-seperator"></div>
          <template v-if="$store.getters.domain == 'wolf777.com'">
            <router-link :to="{ name: 'coupons' }">Coupons</router-link>
          </template>
          <router-link :to="{ name: 'accountstatementReport' }" @click.native="$store.commit('toggleSidebar', true)">
            Account Statement</router-link>
          <router-link :to="{ name: 'currentbetsReport' }" @click.native="$store.commit('toggleSidebar', true)">Current
            Bets</router-link>
          <router-link :to="{ name: 'activity' }" @click.native="$store.commit('toggleSidebar', true)">Activity Log
          </router-link>
          <router-link :to="{ name: 'casinoResult' }">Casino Results</router-link>
          <router-link :to="{ name: 'liveCasinoResult' }">Live Casino Bets</router-link>
          <a href="javascript:void(0)" @click="showSetButton()">Set Button Value</a>
          <a href="javascript:void(0)" @click="showChangePassword()">Change Password</a>
          <router-link :to="{ name: 'secureAuth' }">Security Auth Verification</router-link>

          <!-- <router-link :to="{ name: 'Faq' }">Frequently Asked Questions (FAQ)</router-link> -->
          <div class="login-seperator"></div>
          <a href="javascript:void(0)" @click="logoutUser()">Logout</a>
        </div>
      </div>
    </div>

    <b-modal ref="setButtonModal" title="Set Button Value" hide-footer>
      <setButtonValue />
    </b-modal>

    <b-modal ref="changePassword" title="Change Password" hide-footer>
      <changePassword />
    </b-modal>

    <b-modal ref="marketAnalaysis" title="My Market" size="lg" hide-footer>
      <marketAnalysis :marketAnalysis="marketAnalysisData" />
    </b-modal>

    <b-modal ref="rulesModal" title="Rules" size="lg" hide-footer no-close-on-esc no-close-on-backdrop
      hide-header-close>
      <rules :rules="rulesData" />
    </b-modal>

    <b-modal ref="welcomeBannerModal" size="lg" @hide="hideWelcomeBanner()" centered modal-class="home-modal"
      hide-footer>
      <template #modal-header>
        <div class="close-home-modal" @click="hideWelcomeBanner()">
          <i class="fas fa-times"></i>
        </div>
      </template>
      <div class="home-modal-title" v-if="welcomeMsg">
        <img :src="`${imgPath}front/img/icons/warning.png`">
        <div>{{ welcomeMsg }}</div>
      </div>
      <img class="img-fluid" :src="welcomebanner" v-if="welcomebanner" />
      <!-- <div class="home-main-banner">
        <img :src="`${imgPath}front/img/home-main-banner.png`" class="img-fluid">
      </div>
      <div class="text-center home-modal-title">
        <h4>Welcome to World777.com</h4>
        <div>Enjoy live casinos and sports events by signing up to our website.</div>
        <div class="home-sub-banners">
          <img :src="`${imgPath}front/img/casino-banners/race20.jpg`">
          <img :src="`${imgPath}front/img/casino-banners/queen.jpg`">
        </div>
      </div> -->
    </b-modal>
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
  </header>
  <!-- /Header -->
</template>

<script>
  import ServiceApi from "@/services/ServiceApi";
  import sideBar from "@/components/side-bar";
  import setButtonValue from "@/components/SetButtonValue";
  import changePassword from "@/components/ChangePassword";
  import marketAnalysis from "@/components/MarketAnalysis";
  import rules from "@/components/Rules";
  // import treeItem from "@/components/GameSidebarTreeComponent";
  import treeMenu from '@/components/GameSidebarTreeMenu';
  // import Footer from "@/components/footer";
  import CustomMarquee from "@/components/CustomMarquee";
  import Loader from "@/components/loader";
  import moment from 'moment'
  // import Holi from '@/components/Holi.vue';
  /**
   * Nav-bar Component
   */
  export default {
    data() {
      return {
        // showHoli: false,
        // holiObject: {
        //   logo: this.getRndInteger(3, 5)
        // },
        adminSettins: ADMIN_SETTING,
        welcomebanner: "",
        welcomeMsg: "",
        imgPath: IMG_PATH,
        // logoPath: BUCKET_PATH + 'sitethemes/' + DOMAIN + '/front/logo.png',
        logoPath: LOGO_PATH,
        user: {},
        marketAnalysisData: [],
        rulesData: [],
        fixtureData: [],
        showFixture: false,
        theme: THEME,
        depositeAmt: "",
        loading: false,
        themeType: THEME_TYPE,
        bgBody: BG_BODY
      };
    },
    mounted() {
      // setTimeout(() => {
      //   this.showHoli = true
      // }, 1000);
      $('#carousel0').carousel({
        interval: 3000
      })
      this.user = JSON.parse(this.$ls.get("user"));

      this.$store.state.rdisplay = _.get(this.user, "rdisplay", false);
      this.$store.state.ipop = _.get(this.user, "ipop", false);

      // const self = this
      // var myElement2 = document.querySelector("#sidebar-left-mo")

      // var hammertime2 = new Hammer(myElement2);
      // hammertime2.on('swipeleft', function (ev) {
      //   // console.log('left', ev)
      //   if (IS_MOBILE) {
      //     self.$store.state.collapsSidebar = false
      //   }
      // });
      if (!this.$store.getters.isMobile) {
        this.getFixture();
      }
      if (this.$store.state.rdisplay) {
        this.getRules();
      } else {
        if (this.$store.state.ipop) {
          ServiceApi.callApi("api/front/welcomebanners")
            .then((response) => {
              if (response.status == 200) {
                if (response.data.t1 && response.data.t1[0].bimg) {
                  this.welcomebanner = BUCKET_PATH + "common/wel-banner/" + response.data.t1[0].bimg;
                  this.welcomeMsg = response.data.t1[0].bdesc
                  this.$refs["welcomeBannerModal"].show();
                  this.$store.state.ipop = false;
                  this.user.ipop = false;
                  localStorage.setItem("user", JSON.stringify(this.user));
                }
              } else {}
            })
            .catch((e) => {});
        }
      }
    },
    components: {
      sideBar,
      // Holi,
      setButtonValue,
      changePassword,
      marketAnalysis,
      rules,
      treeMenu,
      // treeItem,
      // Footer,
      CustomMarquee,
      Loader,
    },
    methods: {
      // getRndInteger(min, max) {
      //   return Math.floor(Math.random() * (max - min + 1)) + min;
      // },
      changeDateFormat(date) {
        return moment(String(date), 'MM-DD-YYYY hh:mm:ss A').format('DD/MM/YYYY HH:mm:ss')
      },
      showUpdateButtonMsg(msg, type) {
        this.$bvToast.toast(msg, {
          variant: type,
          toaster: 'b-toaster-top-full',
          autoHideDelay: 3000,
        })
      },
      showDePositeMdl() {
        this.$refs["depositeModal"].show();
      },
      hideDepositeModal() {
        this.$refs["depositeModal"].hide();
      },
      getPaymentLink() {
        this.loading = true;
        var windowReference = window.open();
        ServiceApi.callApi("api/front/deposite", {
            amt: this.depositeAmt,
          })
          .then((response) => {
            if (response.status == 200) {
              windowReference.location = response.data.url;
              // window.open(response.data.url, "_blank");
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
      getFixture() {
        ServiceApi.callApi("api/front/fixture2")
          .then((response) => {
            if (response.status == 200) {
              // console.log(response.data)
              this.fixtureData = response.data;
            } else {
              this.fixtureData = [];
            }
          })
          .catch((e) => {
            this.fixtureData = [];
          }).finally(e => {
            this.showFixture = true
          });
      },
      resetFlags() {
        // this.user.rdisplay = false
        // this.user.ipop = false
        // this.$store.state.rdisplay = false
        // this.$store.state.ipop = false
        //localStorage.setItem('user', JSON.stringify(this.user))
        //localStorage.clear();
        localStorage.removeItem("user");
        this.$auth.logout();
      },
      clearSearch(event) {
        if (this.$store.state.searchText) {
          this.$store.commit("resetSearch");
          this.$store.commit("toggleSidebar", true);
        }
      },
      searchEvent() {
        // console.log(this.$store.state.searchText)
        // alert('OUT')
        if (this.$store.state.searchText.length == 3) {
          // alert(this.$store.state.searchText)
          this.$store.state.searchLoader = true;
          ServiceApi.callApi("api/front/searchgame", {
              name: this.$store.state.searchText,
            })
            .then((response) => {
              if (response.status == 200 && this.$store.state.searchText.length) {
                this.$store.state.searchItems = response.data;
              } else {
                this.$store.state.searchItems = [];
              }
            })
            .catch((e) => {
              this.$store.state.searchItems = [];
            })
            .finally((res) => {
              this.$store.state.searchLoader = false;
            });
        } else if (this.$store.state.searchText.length < 3) {
          this.$store.state.searchItems = [];
        }
      },
      getRules() {
        this.rulesData = [];
        ServiceApi.callApi("api/front/rules")
          .then((response) => {
            if (response.status == 200) {
              this.rulesData = response.data;
              this.showRules();
            } else {
              this.rulesData = [];
            }
          })
          .catch((e) => {
            this.rulesData = [];
          });
      },
      getMyMarket() {
        ServiceApi.callApi("api/front/marketanalysis")
          .then((response) => {
            if (response.status == 200) {
              this.marketAnalysisData = response.data;
              this.showMarketAnalysis();
            } else {
              this.marketAnalysisData = [];
            }
          })
          .catch((e) => {
            this.marketAnalysisData = [];
          });
      },
      logoutUser() {
        // localStorage.clear();
        localStorage.removeItem("user");
        this.$auth.logout();
      },
      showSetButton() {
        this.$store.commit("toggleSidebar", true);
        this.$refs["setButtonModal"].show();
      },
      hideSetButton() {
        this.$refs["setButtonModal"].hide();
      },
      showChangePassword() {
        this.$store.commit("toggleSidebar", true);
        this.$refs["changePassword"].show();
      },
      hideChangePassword() {
        this.$refs["changePassword"].hide();
      },
      showMarketAnalysis() {
        this.$refs["marketAnalaysis"].show();
      },
      hideMarketAnalysis() {
        this.$refs["marketAnalaysis"].hide();
      },
      showRules() {
        this.$refs["rulesModal"].show();
      },
      hideRules() {
        this.$refs["rulesModal"].hide();
        // localStorage.clear();
        // this.$auth.logout();
      },
      hideWelcomeBanner() {
        this.$refs["welcomeBannerModal"].hide();
      },
    },
  };
</script>