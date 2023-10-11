<template>
<div v-if="$store.state.acl.dashboard">
  <template v-if="dashboardData != null">
  <div class="row">
    <div class="col-xl-4">
      <div class="card">
          <div class="card-body">
              
              <div>
                  <div class="mb-4 me-3">
                      <i class="mdi mdi-account-circle text-primary h1"></i>
                  </div>

                  <div>
                      <h5>{{ $store.state.adminUser.uname }}</h5>
                      
                  </div>
              </div>
          </div>

          <div class="card-body border-top">
              <div class="row">
                  <div class="col-sm-6">
                      <div>
                          <p class="fw-medium mb-2">Balance:</p>
                          <h4 v-currency="$store.state.user.bal"></h4>
                      </div>
                  </div>
                  <div class="col-sm-6">
                      <p class="fw-medium mb-2">Exposure:</p>
                      <h4 v-currency="$store.state.user.exp"></h4>
                  </div>
              </div>
          </div>

         <!--  <div class="card-footer bg-transparent border-top">
              <div class="text-center">
                  <a href="#" class="btn btn-outline-light me-2 w-md">Deposit</a>
                  <a href="#" class="btn btn-primary me-2 w-md">Buy / Sell</a>
              </div>
          </div> -->
      </div>
      
    </div>
    <div class="col-xl-8">
        <div class="row mb-3">
          <div class="col">
            <div  v-if="(commonBanners && commonBanners.length) || (themeBanners && themeBanners.length)">
              <b-carousel  indicators :interval="10000">
              <template v-for="(data, key) in commonBanners">
              <b-carousel-slide :key="`com${key}`" :img-src="`${comBannerPath}${data}`"></b-carousel-slide>
              </template>
              <template v-for="(data, key) in themeBanners">
              <b-carousel-slide :key="`wp${key}`" :img-src="`${themeBannerPath}${data}`"></b-carousel-slide>
              </template>
              </b-carousel>
            </div>
          </div>
        </div>
       <div class="row">
    <!-- <div  class="col">
      <State :icon="'bx bx-copy-alt'" :title="'Credit Balance'" :value="dashboardData.crebal" />
    </div>-->
    <div class="col">
      <div class="card mini-stats-wid">
        <div class="card-body">
          <div class="media">
            <div class="media-body">
              <p class="text-muted font-weight-medium">Credit Pts</p>
              <h4
              class="mb-0"
              :class="dashboardData.crebal > 0 ? 'text-success': 'text-danger'"
              v-currencyint="dashboardData.crebal"
              ></h4>
            </div>
            <div class="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
              <span class="avatar-title">
               Pts
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card mini-stats-wid">
        <div class="card-body">
          <div class="media">
            <div class="media-body">
              <p class="text-muted font-weight-medium">All Pts</p>
              <h4
              class="mb-0"
              :class="dashboardData.allbal > 0 ? 'text-success': 'text-danger'"
              v-currencyint="dashboardData.allbal"
              ></h4>
            </div>
            <div class="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
              <span class="avatar-title">
               Pts
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col" v-if="dashboardData.allbal">
      <div class="card mini-stats-wid">
        <div class="card-body">
          <div class="media">
            <div class="media-body">
              <p class="text-muted font-weight-medium">Settlement Pts</p>
              <h4
              class="mb-0"
              :class="(dashboardData.allbal - dashboardData.crebal) > 0 ? 'text-success': 'text-danger'"
              v-currencyint="dashboardData.allbal - dashboardData.crebal"
              ></h4>
            </div>
            <div class="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
              <span class="avatar-title">
               Pts
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
   
    
  </div>
  <div class="row ">
     <div class="col-4">
      <div class="card mini-stats-wid">
        <div class="card-body">
          <div class="media">
            <div class="media-body">
              <p class="text-muted font-weight-medium">Sports P/L</p>
              <h4
              class="mb-0"
              :class="dashboardData.sbal > 0 ? 'text-success': 'text-danger'"
              v-currencyint="dashboardData.sbal"
              ></h4>
            </div>
            <div class="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
              <span class="avatar-title">
               Pts
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card mini-stats-wid">
        <div class="card-body">
          <div class="media">
            <div class="media-body">
              <p class="text-muted font-weight-medium">Casino P/L</p>
              <h4
              class="mb-0"
              :class="dashboardData.cbal > 0 ? 'text-success': 'text-danger'"
              v-currencyint="dashboardData.cbal"
              ></h4>
            </div>
            <div class="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
              <span class="avatar-title">
               Pts
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card mini-stats-wid">
        <div class="card-body">
          <div class="media">
            <div class="media-body">
              <p class="text-muted font-weight-medium">Third Party Casino P/L</p>
              <h4
              class="mb-0"
              :class="dashboardData.tpbal > 0 ? 'text-success': 'text-danger'"
              v-currencyint="dashboardData.tpbal"
              ></h4>
            </div>
            <div class="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
              <span class="avatar-title">
               Pts
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row ">
     <div class="col-4">
      <div class="card mini-stats-wid">
        <div class="card-body">
          <div class="media">
            <div class="media-body">
              <p class="text-muted font-weight-medium">Total P/L</p>
              <h4
              class="mb-0"
              :class="dashboardData.sbal + dashboardData.cbal +dashboardData.tpbal > 0 ? 'text-success': 'text-danger'"
              v-currencyint="dashboardData.sbal + dashboardData.cbal +dashboardData.tpbal"
              ></h4>
            </div>
            <div class="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
              <span class="avatar-title">
               Pts
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- <DashboardChart :chart-data="chartData"/> -->
    </div>

    
    

  </div>
 
  </template>

  <div class="row">
    <div class="col-6">
      <div class="card">
        <div class="card-body">
       <!--    <h4 class="card-title mb-3">Pts</h4> -->
          <div class="row">
            <div class="col-6">
              
              <apexchart height="350" type="radialBar" :options="chartOptions" :series="series"></apexchart>
            </div>
            <div class="col-6 align-self-center">
                <div>
                    <p class="mb-2"><i class="mdi mdi-circle align-middle font-size-10 me-2 text-primary"></i> Sports P/L</p>
                    <h5 v-currencyint="dashboardData.sbal"></h5>
                </div>

                <div class="mt-4 pt-2">
                    <p class="mb-2"><i class="mdi mdi-circle align-middle font-size-10 me-2 text-warning"></i> Casino P/L</p>
                    <h5 v-currencyint="dashboardData.cbal"></h5>
                </div>

                <div class="mt-4 pt-2">
                    <p class="mb-2"><i class="mdi mdi-circle align-middle font-size-10 me-2 text-info"></i> Third Party Casino P/L</p>
                    <h5 v-currencyint="dashboardData.tpbal"></h5>
                </div>
                <div class="mt-4 pt-2">
                    <p class="mb-2"><i class="mdi mdi-circle align-middle font-size-10 me-2 text-info"></i> Total P/L</p>
                    <h5 v-currencyint="dashboardData.sbal+dashboardData.cbal+dashboardData.tpbal"></h5>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6"></div>
  </div>
  <div class="row">
    <div class="col-12">
      <h4 class="sport-list-title">Our Live Casino</h4>
      <div data-simplebar style="max-height: 470px;">
            <div class="casino-banners">
                <template v-for="(table, key) in casinoList">
                    <div class="casino-banner-item" :key="key" v-if="getCasinoRoute(table.gtype)">
                        <template v-if="table.gtype">
                            <router-link :to="{ name: getCasinoRoute(table.gtype) }">
                                <img :src="casinoBannersPath + table.gtype + '.jpg'" class="img-fluid">
                            </router-link>
                        </template>
                        <template v-else>
                            <img :src="imgPath + 'front/img/casino/default.jpeg'" class="img-fluid">
                        </template>
                    </div>
                </template>
            </div>
          </div>
        </div>
  </div>
  <!-- <h4>Latest Events</h4>
  <div class="row">
    <div class="col-4">
      <div class="card mini-stats-wid">
        <div class="card-body p-0">
          <div class="media">
            <router-link class="side-nav-link-ref" :to="{ name: 'GameDetail', params: { etid: $base64.encode(4), gameId: $base64.encode(27996014) }}" 
            >   
            <img :src="`${imgPath}admin/img/bbl.jpg`" class="desktop-banner">  
            </router-link>
          </div>
          </div>
        </div>
      </div>
  </div> -->
  </div>
  </template>
<script>
import ServiceApi from "@/services/ServiceApi";
import store from "@/store";
//import Swal from "sweetalert2";
//import Stat from "@/components/stat";
//import PageHeader from "../components/page-header";
//import DashboardChart from "@/pages/charts/dashboard-chart";
import VueApexCharts from 'vue-apexcharts'
//Vue.use(VueApexCharts)

//Vue.component('apexchart', VueApexCharts)

export default {
  components: {
    'apexchart': VueApexCharts
   // PageHeader,
   // Stat,
    // DashboardChart
  },
  mounted() {
    if (this.$store.state.WMSG != "") {
      this.$swal({
       
        text: this.$store.state.WMSG,
        icon: "success",
      });
      this.$store.state.WMSG = "";
    }
    if(this.$store.state.acl.dashboard){
      this.getDashboard();
    }
    this.getCasinoList();
    this.commonBanners = HOME_COMMON_BANNERS ? HOME_COMMON_BANNERS.split(',') : []
    this.themeBanners = HOME_THEME_BANNERS ? HOME_THEME_BANNERS.split(',') : []
    //console.log(this.$store.state.user.uname)
  },
  data() {
    return {
      imgPath: IMG_PATH,
      items: [
        {
          text: "Home",
          active: true,
        },
      ],
      dashboardData: null,
      chartData: [],
      casinoList: [],
      casinoBannersPath: BUCKET_PATH + 'casino_icons/lc/',
      commonBanners: [],
      themeBanners: [],
      comBannerPath: BUCKET_PATH + 'common/home-banners/',
      series: [0, 0],
      chartOptions: {
        chart: {
          height: 350,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '22px',
              },
              value: {
                fontSize: '16px',
              },
              total: {
                show: true,
                label: '',
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return ''
                }
              }
            }
          }
        },
        labels: ['Credit Pts', 'All Pts'],
      },
      
    };
  },
 
  methods: {
    getDashboard() {
      this.$store.state.isLoading = true;
      ServiceApi.callApi("dashboard")
        .then((response) => {
          this.$store.state.isLoading = false;
          if (response.status == 200) {
            this.dashboardData = response.data[0];
            /*this.chartData = [this.dashboardData.crebal, this.dashboardData.allbal, parseInt(this.dashboardData.allbal - this.dashboardData.crebal), this.dashboardData.sbal, this.dashboardData.cbal, this.dashboardData.tpbal, (this.dashboardData.sbal+this.dashboardData.cbal+this.dashboardData.tpbal)]
            console.log(this.chartData)*/
            this.series = [this.dashboardData.crebal, this.dashboardData.allbal]
          } else {
            this.dashboardData = null;
            this.$swal({
             
              icon: "error",
              text: response.msg,
            });
          }
        })
        .catch((e) => {
          this.dashboardData = null;
          this.$store.state.isLoading = false;
          /*this.$swal({
           
            icon: "error",
            text: "error in export",
          });*/
        });
    },
    getCasinoList() {
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
          
      ]
      let data = _.find(casinoWithType, {'type': type})
      return _.get(data,'route')
  },
  },
  beforeDestroy() {},
};
</script>