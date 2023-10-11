<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
         <!--  <router-link :to="{name:'home'}" class="logo logo-dark">
            <span class="logo-sm">
              <img :src="imgPath+'admin/img/logo.png'" alt height="22" />
            </span>
            <span class="logo-lg">
              <img :src="imgPath+'admin/img/logo-dark.png'" alt height="17" />
            </span>
          </router-link> -->

          <router-link :to="{name:'home'}" class="logo logo-light">
            <span class="logo-sm">
              <img :src="imgPath+'admin/img/icon.png'" alt height="22" />
            </span>
            <span class="logo-lg">
              <img :src="logoPath" alt class="site-logo" />
            </span>
          </router-link>
        </div>

        <button
          id="vertical-menu-btn"
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item"
          @click="toggleMenu"
        >
          <i class="fa fa-fw fa-bars"></i>
        </button>

        <!-- App Search-->
        <div class="site-searchbox mt-3 d-none d-lg-inline-block" v-if="$store.getters.isTablet && $store.state.acl.searchanalysis" >
          <!-- <input type="text" class="form-control" placeholder="Search..." /> -->
          <multiselect
            @search-change="searchUser"
            v-model="search.username"
            :searchable="true"
            :internal-search="true"
            :clear-on-select="false"
            :close-on-select="true"
            label="uname"
            track-by="uguid"
            :options="search.searchedUsers"
            @input="searchAnalysis()"
            :select-label="''"
            :deselect-label="''"
            :show-labels="false"
            placeholder="Search User"
          >
            <span slot="noResult">No elements found</span>
          </multiselect>
          <!-- <span class="bx bx-search-alt"></span> -->
        </div>
        
      </div>

      <div class=" w-100" v-if="fixtureData && fixtureData.length > 0">
        <div class="upcoming-fixure fixture-nav">
          <div class="fixure-title">Upcoming Fixtures</div>
          <!-- <marquee > -->
            <div class="fixure-box-container1">
              <VueSlickCarousel  v-bind="sliderSetting">
              <template v-if="fixtureData && fixtureData.length > 0" v-for="(data, key) in fixtureData" >
                <router-link :to="{ name: 'GameDetail', params: { etid: $base64.encode(data.sportid), gameId: $base64.encode(data.eid) }}" >
                <div class="fixure-box" :key="key">
                  <div class="f-title">
                    <i class="d-icon mr-2" :class="`icon-${data.sportid}`"></i>
                    {{ data.ename }}
                  </div>
                  <div v-format-datetime="{date: data.dt}"></div>
                </div>
                </router-link>
              </template>
            </VueSlickCarousel>
            </div>
          <!-- </marquee> -->

        </div>
      </div>
      <div class="d-flex">
        

        <b-dropdown
          class="d-inline-block d-lg-none ml-2"
          variant="black"
          menu-class="dropdown-menu-lg p-0"
          toggle-class="header-item noti-icon"
          right
        >
          <template v-slot:button-content>
            <i class="mdi mdi-magnify"></i>
          </template>

          <form class="p-3">
            <div class="form-group m-0">
              <div class="input-group">
                <!-- <input
                  type="text"
                  class="form-control"
                  placeholder="Search ..."
                  aria-label="Recipient's username"
                /> -->
                 <multiselect
                  @search-change="searchUser"
                  v-model="search.username"
                  :searchable="true"
                  :internal-search="true"
                  :clear-on-select="false"
                  :close-on-select="true"
                  label="uname"
                  track-by="uguid"
                  :options="search.searchedUsers"
                  @input="searchAnalysis()"
                  :select-label="''"
                  :deselect-label="''"
                  :show-labels="false"
                  placeholder="Search User"
                >
                  <span slot="noResult">No elements found</span>
                </multiselect>
               <!--  <div class="input-group-append">
                  <button class="btn btn-primary" type="submit">
                    <i class="mdi mdi-magnify"></i>
                  </button>
                </div> -->
              </div>
            </div>
          </form>
        </b-dropdown>

        <div class="dropdown d-none d-lg-inline-block ml-1">
          <button type="button" class="btn header-item noti-icon" @click="initFullScreen">
            <i class="bx bx-fullscreen"></i>
          </button>
        </div>
        <div class="d-none d-sm-inline-block rules-icon nowrap">
          <span class="main-rules" @click="getRules()">
            <a href="javascript:void(0)"><i class="fas fa-info-circle mr-1"></i>Rules</a>
          </span>
        </div>
        <div class="dropdown d-none d-sm-inline-block ml-1 " v-if="$store.state.user"> 
          <button type="button" class="btn header-item noti-icon">
            <span class="balance nowrap">Pts:
              <span class="balance-value">
                <b v-currency="$store.state.user.bal" v-if="$store.state.user.bal && $store.state.user.bal != 0"></b>
                <b v-else>0</b>
              </span> 
              <template v-if="$store.state.user.exp && $store.state.user.exp != 0">
                | <span class="balance-value" v-currency="$store.state.user.exp"></span>
              </template>
            </span>
          </button>
        </div>

        <b-dropdown right variant="black" toggle-class="header-item">
          <div class="dropdown  d-sm-none ml-1 mr-1" v-if="$store.state.user"> 
          <div class="bal-box">
            <span class="balance nowrap">Pts:
              <span class="balance-value">
                <b v-currency="$store.state.user.bal" v-if="$store.state.user.bal && $store.state.user.bal != 0"></b>
                <b v-else>0</b>
              </span> 
              <template v-if="$store.state.user.exp && $store.state.user.exp != 0">
                | <span class="balance-value" v-currency="$store.state.user.exp"></span>
              </template>
            </span>
          </div>
        </div>
          <template v-slot:button-content>
            <span class=" ml-1">{{username.uname}}</span>
            <i class="mdi mdi-chevron-down"></i>
          </template>
          <!-- item-->
          <a class="dropdown-item d-sm-none" href="javascript: void(0);" @click="getRules()">
            <i class="fas fa-info-circle mr-1"></i> Rules
          </a>
          <!-- <div class="d-none d-sm-inline-block rules-icon nowrap">
          <span class="main-rules" @click="getRules()">
            <a href="javascript:void(0)"><i class="fas fa-info-circle mr-1"></i>Rules</a>
          </span>
        </div> -->
        <b-dropdown-item>
          <router-link :to="{name:'secureAuth'}"> 
            <i class="bx bx-lock-open font-size-16 align-middle mr-1"></i>
            Secure Auth
             </router-link>
          </b-dropdown-item>
         <!--  <b-dropdown-item>
          <router-link :to="{name:'AdminSetting'}"> 
            <i class="bx bx-wallet font-size-16 align-middle mr-1"></i> Admin Settings
          </router-link>
           </b-dropdown-item> -->
          <a class="dropdown-item" href="javascript: void(0);" @click="openChangepasswordMdl()">
            <i class="bx bx-wallet font-size-16 align-middle mr-1"></i> Change Password
          </a>
          <!-- <a class="dropdown-item d-block" href="javascript: void(0);">
            <i class="bx bx-wrench font-size-16 align-middle mr-1"></i> Settings
          </a>
          <a class="dropdown-item" href="javascript: void(0);">
            <i class="bx bx-lock-open font-size-16 align-middle mr-1"></i> Lock screen
          </a> -->
          <div class="dropdown-divider"></div>
          <a class="dropdown-item text-danger" href="javascript:void(0)" @click="logoutUser()">
            <i class="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i> Logout
          </a>
        </b-dropdown>
        <b-modal ref="changepasswordMDL" header-bg-variant="default" hide-footer>
          <template slot="modal-header" class>
            <h5 class="modal-title text-uppercase">Change Password</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              @click="hideModal('changepasswordMDL')"
            >&times;</button>
          </template>
          <form
            @submit.prevent="doChangePassword('ChangePassword')"
            data-vv-scope="ChangePassword"
            method="post"
          >
            <div class="form-group">
              <input
                placeholder="Transaction Code"
                class="form-control"
                v-model="user.password"
                v-validate="'required'"
                data-vv-as="Transaction Code"
                type="password"
                name="password"
                :class="{ 'is-invalid' : verrors.first('ChangePassword.password')}"
              />
              <small v-if="verrors.has('ChangePassword.password')" class="error">
                {{ verrors.first("ChangePassword.password") }}
              </small>
            </div>
            <div class="form-group">
              <input
                placeholder="New Password"
                class="form-control"
                v-model="user.newPassword"
                type="password"
                v-validate="'required|min:8|verify_password'"
                data-vv-as="New Password"
                name="NewPassword"
                ref="newPassword"
                :class="{ 'is-invalid' : verrors.first('ChangePassword.NewPassword')}"
              />
              <small v-if="verrors.has('ChangePassword.NewPassword')" class="error">
                {{ verrors.first("ChangePassword.NewPassword") }}
              </small>
              <!-- <small>Alphanumeric with one uppercase</small> -->
            </div>
            <div class="form-group">
              <input
                placeholder="Confirm New Password"
                class="form-control"
                v-model="user.newPasswordConfirm"
                data-vv-as="Confirm Password"
                type="password"
                v-validate="'required|confirmed:newPassword|verify_password'"
                name="ConfirmNewPassword"
                :class="{ 'is-invalid' : verrors.first('ChangePassword.ConfirmNewPassword')}"
              />
              <small v-if="verrors.has('ChangePassword.ConfirmNewPassword')" class="error">
                {{ verrors.first("ChangePassword.ConfirmNewPassword") }}
              </small>
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-block" type="submit">
                Change Password
                <i class="fas fa-chevron-circle-right ml-2"></i>
              </button>
            </div>
          </form>
        </b-modal>

        <b-modal ref="searchAnalysisModal" size="big" title="Market Analysis"  hide-footer>
          <!-- <template slot="modal-header" class>
            <h5 class="modal-title text-uppercase text-white">Market Analysis</h5>
            <button
              type="button"
              class="close text-white"
              data-dismiss="modal"
              @click="hideModal('searchAnalysisModal')"
            >&times;</button>
          </template> -->
          <div class="search-analysis">
            <div class="row row5" v-if="searchAnalysisData != null">
                <div class="col-md-3" v-if="searchAnalysisData.t1">
                    <div class="block-title">
                        <span>Game Detail</span>
                    </div>
                    <div class="analysis-detail">
                        <div class="row row5">
                            <label class="col-md-6"><b>Username</b></label>
                            <div class="col-md-6 text-right">
                              <b :title="searchAnalysisData.t1[0].fname">{{ searchAnalysisData.t1[0].uname }}</b>
                            </div>
                        </div>
                        <div class="row row5">
                            <label class="col-md-6">Account Type</label>
                            <div class="col-md-6 text-right">{{ searchAnalysisData.t1[0].lname }}</div>
                        </div>
                        <div class="row row5">
                            <label class="col-md-6">General</label>
                            <div class="col-md-6 text-right" v-currency="searchAnalysisData.t1[0].gen"></div>
                        </div>
                        <div class="row row5">
                            <label class="col-md-6">Exposure</label>
                            <div class="col-md-6 text-right" v-currency="searchAnalysisData.t1[0].exp"></div>
                        </div>
                        <!-- <div class="row row5">
                            <label class="col-md-6">Exposure Limit</label>
                            <div class="col-md-6 text-right" v-currency="searchAnalysisData.t1[0].elimit"></div>
                        </div> -->
                        <div class="row row5">
                            <label class="col-md-6">Credit Reference</label>
                            <div class="col-md-6 text-right" v-currency="searchAnalysisData.t1[0].cbal"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="block-title">
                        <span>User Lock</span>
                    </div>
                    <div class="search-analysis-table mb-3">
                      <table class="table">
                          <thead>
                              <tr>
                                  <th>Master Name</th>
                                  <th class="text-center">User Act</th>
                                  <th class="text-center">Bet Active</th>
                              </tr>
                          </thead>
                          <tbody v-if="searchAnalysisData.t2 != null">
                              <tr v-for="(data, key) in searchAnalysisData.t2">
                                  <td>{{ data.uname }}</td>
                                  <td class="text-center">
                                      <i v-if="data.uact == true" class="fas fa-check-square"></i>
                                      <i v-else class="far fa-square"></i>
                                  </td>
                                  <td class="text-center">
                                      <i v-if="data.bact == true" class="fas fa-check-square"></i>
                                      <i v-else class="far fa-square"></i>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="block-title">
                        <span>Game Lock</span>
                    </div>
                    <div class="search-analysis-table mb-3">
                      <table class="table">
                          <thead>
                              <tr><th>S.No.</th>
                              <th>Master Name</th>
                              <th class="text-center">Bet Lock</th>
                              <th>Event Name</th>
                          </tr></thead>
                          <tbody v-if="searchAnalysisData.t3 != null">
                              <tr  v-for="(data, key) in searchAnalysisData.t3">
                                <td>{{ key+1 }}</td>
                                <td>{{ data.uname }}</td>
                                <td class="text-center">
                                    <i v-if="data.isact == true" class="fas fa-square"></i>
                                    <i v-else class="far fa-check-square"></i>
                                </td>
                                <td>
                                    {{ data.lkname }}
                                </td>
                              </tr>
                          </tbody>
                          <tbody v-else>
                            <tr>
                              <td colspan="4" class="text-center">No records found</td>
                            </tr>
                          </tbody>
                      </table>
                    </div>
                </div>
            </div>
            <div class="market-analysis-container" v-if="searchAnalysisData != null">
              <template v-if="searchAnalysisData.t4">
              <div v-for="(event, key) in searchAnalysisData.t4" class="market-analysis-container">
                  <div class="market-analysis-title">
                      <div><a href="javascript:void(0)" class="">{{ event.ename }}</a></div>
                      <div v-format-datetime="{date:event.gstime}"></div>
                  </div>
                  <div class="market-analysis-content">
                      <div class="row row5">
                          <div class="col-md-4" v-for="(market, key1) in event.market">
                              <div class="market-analysis-content-detail">
                                  <table class="table">
                                      <thead>
                                          <tr>
                                              <th colspan="2">{{ market.mname }}</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          <tr v-for="(section, key2) in orderBy(market.section, 'srno')">
                                              <td>{{ section.sname }}</td>
                                              <td class="text-right">{{ section.amt }}</td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                          
                      </div>
                  </div>
              </div>
              </template>
              <template v-if="searchAnalysisData && searchAnalysisData.t5">
              <div  class="market-analysis-container">
                  <div class="market-analysis-title">
                      <div>PLayer Battle</div>
                  </div>
                  <div class="market-analysis-content">
                      <div class="row row5">
                          <div class="col-md-4" v-for="(event, key) in searchAnalysisData.t5">
                              <div class="market-analysis-content-detail">
                                  <table class="table">
                                      <thead>
                                          <tr>
                                              <th>{{ event.ename }}</th>
                                              <th class="text-right" v-format-datetime="{date: event.gstime}"></th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          <tr v-for="(market, key2) in event.market">
                                              <td>{{ market.mname }}</td>
                                              <td class="text-right" v-currency="market.amt">{{ market.amt }}</td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                          
                      </div>
                  </div>
              </div>
              </template>
              <template v-if="searchAnalysisData && searchAnalysisData.t6">
              <div  class="market-analysis-container">
                  <div class="market-analysis-title">
                      <div>Diam 11</div>
                  </div>
                  <div class="market-analysis-content">
                      <div class="row row5">
                          <div class="col-md-4" v-for="(event, key) in searchAnalysisData.t6">
                              <div class="market-analysis-content-detail">
                                  <table class="table">
                                      <thead>
                                          <tr>
                                              <th>{{ event.ename }}</th>
                                              <th class="text-right" v-format-datetime="{date: event.gstime}"></th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          <tr v-for="(market, key2) in event.market">
                                              <td>{{ market.mname }}</td>
                                              <td class="text-right" v-currency="market.amt">{{ market.amt }}</td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                          
                      </div>
                  </div>
              </div>
              </template>
            </div>
          </div>
        </b-modal>
        <b-modal ref="rulesModal" title="Rules" size="lg" hide-footer>
          <rules :rules="rulesData" />

          <div class="row row5 mt-3 align-items-center" v-if="$store.state.rdisplay == true">

              <div class="col-7">I have read above rules</div>
              <div class="col-5 text-right">
                  
                  <button type="button" class="btn btn-success"  @click="acceptRules()">Accept</button>
                 <!--  <button type="button" class="btn btn-success"  @click="hideRules()">Cancel</button> -->
              </div>
          </div>
        </b-modal>
      </div>
    </div>
  </header>
</template>
<script>
import simplebar from "simplebar-vue";
import ServiceApi from "@/services/ServiceApi";
import Multiselect from "vue-multiselect";
import rules from "@/components/Rules"
import VueSlickCarousel from 'vue-slick-carousel'

/**
 * Nav-bar Component
 */
export default {
  components: { 
    simplebar,
    Multiselect,
    rules,
    VueSlickCarousel
  },
  data() {
    return {
      logoPath: LOGO_PATH,
      user: {
        password: '',
        newPassword: '',
        newPasswordConfirm: '',
        uname: ""
      },
      username: "",
      isLoading: false,
      callApi: true,
      imgPath: IMG_PATH,
      search:{
        username: '',
        searchedUsers:[],
      },
      searchAnalysisData: null,
      rulesData: [],
      fixtureData: [],
      sliderSetting: {
        "arrows": false,
        "dots": false,
        "infinite": true,
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "centerPadding": "20px",
        "autoplay": true,
        "speed": 2000,
        "autoplaySpeed": 3000,
        //"cssEase": "linear",
        //"variableWidth": true,
        "pauseOnHover": false,
        "vertical": true,
        "verticalSwiping": true
      }
    };
  },
  mounted() {
    this.username = JSON.parse(this.$ls.get("admin_user"));
    this.$store.state.adminUser = this.username;
    if(this.$store.state.rdisplay == true){
      //this.$store.state.rdisplay = false;
      this.getRules()
    }
    this.getUserData();
    this.getKeepAliveData();
    this.getFixture();

    //this.searchAnalysis();
  },
  methods: {
    getFixture() {
      ServiceApi.callApi("fixturedata2")
        .then(response => {
          if (response.status == 200) {
            // console.log(response.data)
            this.fixtureData = response.data
          } else {
            this.fixtureData = []
          }
        })
        .catch(e => {
          //this.fixtureData = []
        });
    },
    getKeepAliveData(){
      ServiceApi.callApi("getmid", {})
      .then((response) => {
        
        if (this.callApi == true) {
          setTimeout((res) => {
            this.getKeepAliveData();
          }, 300000);
        }
      })
      .catch((e) => {
        if (this.callApi == true) {
          setTimeout((res) => {
            this.getKeepAliveData();
          }, 300000);
        }
       // this.$store.state.user = null;
      });
    },
    getUserData() {
      ServiceApi.callApi("bal", {})
        .then((response) => {
          if (response.status == 200) {
            this.$store.state.user = response.data
            this.$store.state.is_mobile = IS_MOBILE
            this.$store.state.is_tablet = IS_TABLET
          } else if (response.status == 402) {
            this.$auth.logout();
            this.$ls.remove("admin_token");
            this.$ls.remove("admin_user");
            window.location.reload();
          }
          if (this.callApi == true) {
            setTimeout((res) => {
              this.getUserData();
            }, 1000);
          }
        })
        .catch((e) => {
          if (this.callApi == true) {
            setTimeout((res) => {
              this.getUserData();
            }, 1000);
          }
         // this.$store.state.user = null;
        });
    },
    searchAnalysis() {
      //console.log(this.search.username)
      this.$store.state.isLoading = true
      let uid = this.search.username != null ? this.search.username.uguid : ""
      ServiceApi.callApi("report/searchanalysis", {'uid': uid})
      .then((response) => {
        this.$store.state.isLoading = false
        if (response.status == 200) {
          this.searchAnalysisData = response.data;
          this.search.username = null;
          this.$refs["searchAnalysisModal"].show();
        }
      })
      .catch((e) => {
          this.$store.state.isLoading = false
      });
    },
    openChangepasswordMdl() {
      this.$refs["changepasswordMDL"].show();
    },
    hideModal(ref) {
      this.$refs[ref].hide();
    },
    logoutUser() {
      this.$ls.remove("admin_token");
      this.$ls.remove("admin_user");
      this.$auth.logout();
      this.$router.push({
        name: "login"
      });
    },
    resetUserValue() {
      this.user = {
        password: '',
        newPassword: '',
        newPasswordConfirm: '',
        uname: this.$store.state.adminUser.uname
      };
      this.$validator.reset();
    },
    doChangePassword(scope) {
      this.$validator.validateAll(scope).then(valid => {
        if(valid){
        this.isLoading = true;
        this.user.uname = this.username.uname;
        ServiceApi.callApi("ocp", this.user)
          .then(response => {
            this.isLoading = false;
            if (response.status == 200) {
              this.$swal({
                
                icon: "success",
                text: response.msg
              });
              this.resetUserValue();
              var self = this;
              setTimeout(function() {
                self.$ls.remove("admin_token");
                self.$ls.remove("admin_user");
                self.$auth.logout();
                self.$router.push({
                  name: "login"
                });
              }, 3000);
            } else if (response.status == 405) {
              this.$swal({
               
                icon: "error",
                text: response.msg
              });
            } else {
              this.$swal({
                
                icon: "error",
                text: response.msg
              });
            }
          })
          .catch(e => {
            this.isLoading = false;
          });
        }
      });
    },
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */ !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    searchUser(query) {
      if (query.length >= 3 && this.search.searchedUsers.length == 0) {
        
        ServiceApi.callApi("searchalluser", {
          uname: query,
        })
          .then((response) => {
            
            if (response.success) {
              this.search.searchedUsers = response.data.t1;
            } else {
              this.search.searchedUsers = [];
            }
          })
          .catch((e) => {
            
            this.search.searchedUsers = [];
          });
      }else if(query.length < 3){
        console.log("here")
        this.search.searchedUsers = [];
      }
    },
    showRules() {
      this.$refs['rulesModal'].show()
    },
    hideRules() {
      this.$refs['rulesModal'].hide()
      this.$store.state.rdisplay = false;
    },
    getRules(){
      this.rulesData = []
      this.$store.state.isLoading = true;
      ServiceApi.callApi("rules")
        .then(response => {
          if (response.status == 200) {
            this.rulesData = response.data
            this.showRules()
          } else {
            this.rulesData = []
          }
          this.$store.state.isLoading = false;
        })
        .catch(e => {
          this.$store.state.isLoading = false;
          this.rulesData = []
        });
    },
    acceptRules(){
      this.hideRules();
      ServiceApi.callApi("acceptrules")
        .then(response => {
          if (response.status == 200) {
          }
          this.$store.state.isLoading = false;
        })
        .catch(e => {
          this.$store.state.isLoading = false;
          
        });
    }
  },
  beforeDestroy() {
    this.callApi = false
  }
};
</script>


