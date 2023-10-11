<template>
<div class="p-1" v-if="$store.state.acl.dashboard">
  <template v-if="dashboardData != null">
    <div class="row row5">
        <div class="col-6 col-md-3">
            <div class="card mini-stats-wid">
                <div class="card-body">
                   <p class="text-muted fw-medium">Balance</p>
                   <h4 v-currency="$store.state.user.bal"></h4>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="card mini-stats-wid">
                <div class="card-body">
                   <p class="text-muted fw-medium">Exposure</p>
                   <h4 v-currency="$store.state.user.exp"></h4>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="card mini-stats-wid">
                <div class="card-body">
                   <p class="text-muted fw-medium">Credit Pts</p>
                   <h4 v-currencyint="dashboardData.crebal"></h4>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="card mini-stats-wid">
                <div class="card-body">
                   <p class="text-muted fw-medium">All Pts</p>
                   <h4 v-currencyint="dashboardData.allbal"></h4>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="card mini-stats-wid">
                <div class="card-body">
                   <p class="text-muted fw-medium">Settlement Pts</p>
                   <h4 v-currencyint="dashboardData.allbal - dashboardData.crebal"></h4>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="card mini-stats-wid">
                <div class="card-body">
                   <p class="text-muted fw-medium">Upper Pts</p>
                   <h4 v-currencyint="dashboardData.ubal"></h4>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="card mini-stats-wid">
                <div class="card-body">
                   <p class="text-muted fw-medium">Down Pts</p>
                   <h4 v-currencyint="dashboardData.dbal"></h4>
                </div>
            </div>
        </div>
    </div>
  </template>

  <div class="row" v-if="dashboardData != null && dashboardData.crebal">
    <div class="col-12" v-if="favMasterList.length > 0">
      <div class="card">
        <div class="card-body">
            <div class="d-flex">
                <div class="me-2">
                    <h4 class="mb-4">Favorite Master <a href="javascript:void(0)" title="Refresh Data" @click="getFavMasterList()" class="text-dark pl-2"><i class="fa fa-sync" :class="{'fa-spin': isFavLoading == true}"></i>
            </a></h4>
                </div>
               
            </div>

            <div class="table-responsive">
              <table class="table align-middle table-nowrap mb-0">
                  <tbody>
                    <tr>
                      <th scope="col" >Name</th>
                      
                      
                      <th scope="col" class="text-right">CR</th>
                      <th scope="col" class="text-right">Pts</th>
                      <th scope="col" class="text-right">Client(P/L)</th>
                      <th scope="col" class="text-right">Exp</th>
                      <th scope="col" class="text-right">Available Pts</th>
                    </tr>
                  </tbody>
                  <tbody>
                      <tr  v-for="(data, key) in favMasterList">
                          <td>
                              <h5 class="font-size-13 text-truncate mb-1">{{data.fname}}</h5>
                              <p class="text-muted mb-0">Username: {{data.uname}}</p>
                          </td>
                          
                          
                          <td class="text-right"><span v-currencyint="data.cbal"></span></td>
                          <td class="text-right"><span v-currencyint="data.sgen"></span></td>
                          <td class="text-right"><span v-currencyint="data.pl"></span></td>
                          <td class="text-right"><span v-currencyint="data.exp"></span></td>
                          <td class="text-right"><span v-currencyint="data.bal"></span></td>
                      </tr>                    
                  </tbody>
              </table>
            </div>
        </div>
    </div>
    </div> 

    <div class="col-xl-12">
      <div class="card">
        <div class="card-body">
      <apexchart height="350" type="bar" :options="chartOptions1" :series="series1"></apexchart>
      <div class="row row5 align-self-center text-center">

          <div class="col-6 col-sm">
              <p class="mb-2 font-size-11"><i class="mdi mdi-circle align-middle font-size-10 me-2 text-primary"></i> Credit Pts</p>
              <h5 v-currencyint="dashboardData.crebal"></h5>
          </div>

          <div class="col-6 col-sm">
              <p class="mb-2 font-size-11"><i class="mdi mdi-circle align-middle font-size-10 me-2 text-warning"></i> All Pts</p>
              <h5 v-currencyint="dashboardData.allbal"></h5>
          </div>

          <div class="col-4 col-sm">
              <p class="mb-2 font-size-11"><i class="mdi mdi-circle align-middle font-size-10 me-2 text-info"></i> Settlement Pts</p>
              <h5 v-currencyint="dashboardData.allbal - dashboardData.crebal"></h5>
          </div>

          <div class="col-4 col-sm">
              <p class="mb-2 font-size-11"><i class="mdi mdi-circle align-middle font-size-10 me-2 text-success"></i> Upper Pts</p>
              <h5 v-currencyint="dashboardData.ubal"></h5>
          </div>

          <div class="col-4 col-sm">
              <p class="mb-2 font-size-11"><i class="mdi mdi-circle align-middle font-size-10 me-2 text-dark"></i> Down Pts</p>
              <h5 v-currencyint="dashboardData.dbal"></h5>
          </div>
         
      </div>
    </div>
  </div>
    </div>
    <div class="col-xl-12">
      <div class="card">
        <div class="card-body">
            <div>
              <apexchart height="350" type="bar" :options="chartOptions" :series="series"></apexchart>
            </div>
          <div class="">
            
            <div class="row row5 align-self-center text-center">

                <div class="col-6 col-sm-3">
                    <p class="mb-2 font-size-11"><i class="mdi mdi-circle align-middle font-size-10 me-2 text-primary"></i> Sports P/L</p>
                    <h5 v-currencyint="dashboardData.sbal"></h5>
                </div>

                <div class="col-6 col-sm-3">
                    <p class="mb-2 font-size-11"><i class="mdi mdi-circle align-middle font-size-10 me-2 text-warning"></i> Casino P/L</p>
                    <h5 v-currencyint="dashboardData.cbal"></h5>
                </div>

                <div class="col-6 col-sm-3 ">
                    <p class="mb-2 font-size-11"><i class="mdi mdi-circle align-middle font-size-10 me-2 text-info"></i> Tp Casino P/L</p>
                    <h5 v-currencyint="dashboardData.tpbal"></h5>
                </div>
                <div class="col-6 col-sm-3">
                    <p class="mb-2 font-size-11"><i class="mdi mdi-circle align-middle font-size-10 me-2 text-success"></i> Total P/L</p>
                    <h5 v-currencyint="dashboardData.sbal+dashboardData.cbal+dashboardData.tpbal"></h5>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  <div class="row">
    
    <div class="col-12">
      <h4 class="sport-list-title pl-2">Our Live Casino</h4>
      <div data-simplebar style="max-height: 470px;">
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
  </div>
  <!-- <h4>Latest Events</h4>
  <div class="row">
    <div class="col-4">
      <div class="card mini-stats-wid">
        <div class="card-body p-0">
          <div class="media">
            <router-link class="side-nav-link-ref" :to="{ name: 'GameDetail', params: { etid: $base64.encode(4), gameId: $base64.encode(27996014) }}" 
            >   
            <img v-lazy="`${imgPath}admin/img/bbl.jpg`" class="desktop-banner">  
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
    this.getFavMasterList();
    //this.commonBanners = HOME_COMMON_BANNERS ? HOME_COMMON_BANNERS.split(',') : []
    //this.themeBanners = HOME_THEME_BANNERS ? HOME_THEME_BANNERS.split(',') : []
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
      favMasterList: [],
      isFavLoading: false,
      dashboardData: null,
      chartData: [],
      casinoList: [],
      casinoBannersPath: BUCKET_PATH + 'casino_icons/lc/',
      //commonBanners: [],
      //themeBanners: [],
      comBannerPath: BUCKET_PATH + 'common/home-banners/',
      
      series: [{
        data: [400, 430, 448]
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: true,
            //borderRadius: 6,
            barHeight: '30',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['Sports P/L', ' Casino P/L', 'Third Party Casino P/L', 'Total P/L' ],
        },
        responsive: [
          {
            breakpoint: 764,
            options: {
              plotOptions: {
                bar: {
                  horizontal: false,
                  //borderRadius: 6,
                  columnWidth: '20',
                  distributed: true,
                }
              },
              legend: {
                position: "top"
              }
            }
          }
        ],
        colors: ['#556ee6', '#f1b44c', '#50a5f1', '#34c38f'],
      },

      series1: [{
        data: [0, 0, 0]
      }],
      chartOptions1: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: true,
            //borderRadius: 6,
            barHeight: '35',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        tooltip: {
          enabled: true,
        },
        xaxis: {
          categories: ['Credit Pts', 'All Pts', 'Settlement Pts', 'Upper Pts', 'Down Pts'],
          labels: {
            show: true,
            //formatter: (val: string) => {'$'+val}
          }
        },
       
        responsive: [
          {
            breakpoint: 764,
            options: {
              plotOptions: {
                bar: {
                  horizontal: false,
                  //borderRadius: 6,
                  columnWidth: '25',
                  distributed: true,
                }
              },
              legend: {
                position: "top"
              }
            }
          }
        ],
        colors: ['#556ee6', '#f1b44c','#50a5f1', '#34c38f', '#343a40'],
      },

     /* chartOptions: {
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              name: {
                fontSize: '22px',
              },
              value: {
                fontSize: '16px',
              },
              total: {
                show: true,
                label: 'Total',
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return ''
                }
              }
            }
          }
        },
        labels: ['Sports P/L', ' Casino P/L', 'Third Party Casino P/L'],
      },*/
      
    };
  },
 
  methods: {
    getDashboard() {
      //this.$store.state.isLoading = true;
      ServiceApi.callApi("dashboard")
        .then((response) => {
          this.$store.state.isLoading = false;
          if (response.status == 200) {
            this.dashboardData = response.data[0];
            /*this.chartData = [this.dashboardData.crebal, this.dashboardData.allbal, parseInt(this.dashboardData.allbal - this.dashboardData.crebal), this.dashboardData.sbal, this.dashboardData.cbal, this.dashboardData.tpbal, (this.dashboardData.sbal+this.dashboardData.cbal+this.dashboardData.tpbal)]
            console.log(this.chartData)*/
            let totalPl = parseInt(this.dashboardData.sbal + this.dashboardData.cbal + this.dashboardData.tpbal);
            this.series[0].data = [this.dashboardData.sbal, this.dashboardData.cbal, this.dashboardData.tpbal, totalPl]

            let settlementPts = parseInt(this.dashboardData.allbal - this.dashboardData.crebal)
            this.series1[0].data = [this.dashboardData.crebal, this.dashboardData.allbal, settlementPts, this.dashboardData.ubal, this.dashboardData.dbal]
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
      this.casinoList = []
      ServiceApi.callApi("casino/tablelist", {
          'gmid': 35,
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
    getFavMasterList(){
      this.isFavLoading = true;
      ServiceApi.callApi("favmasterlist", {})
      .then(response => {
          if (response.status == 200) {
              this.favMasterList = response.data
          } else {
              this.favMasterList = []
          }
          this.isFavLoading = false;
      })
      .catch(e => {
          this.favMasterList = []
          this.isFavLoading = false
      });
    }
  },
  beforeDestroy() {},
};
</script>