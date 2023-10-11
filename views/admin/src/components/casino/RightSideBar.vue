<template>
 <!-- Right Sidebar Start-->
<div class="right-sidebar">
<simplebar v-if="!$store.getters.isMobile"  data-simplebar-auto-hide="true">
<div class="casino-right-sidebar">
  
  <div class="card m-b-10 my-bet">
    <div class="card-header">
      <h6 class="card-title float-left">My Bets</h6>
      <a href="javascript:void(0)" class="btn btn-back float-right" @click="getViewMoreBets()">View More</a>
    </div>
    <div class="card-body1">
      <div class="tab-content">
        <div id="matched-bet" class="tab-pane active">
          <div class="table-responsive1">
            <table class="table coupon-table table-striped mb-0" v-if="gtype=='kbc'">
              <thead>
                <tr>
                  <th style="min-width: 90px;">UserName</th>
                  <!-- <th style="min-width: 90px;">Nation</th> -->
                  <th class="text-right" style="min-width: 50px;">Amount</th>
                  <th class="text-right" style="min-width: 70px;">Date</th>
                  
                </tr>
              </thead>
              <tbody v-if="$store.state.casinoBetSoda != null">
                <template v-for="bet in $store.state.casinoBetSoda">
                
                <tr :class="[{'back-border': bet.btype.toLowerCase() == 'back' && $route.name != 'AndarBahar'}, 
                    {'lay-border': bet.btype.toLowerCase() == 'lay' && $route.name != 'AndarBahar'}, 
                    {'andar-border': bet.nat.match(/andar/i) && $route.name == 'AndarBahar'}, 
                    {'bahar-border': bet.nat.match(/bahar/i) && $route.name == 'AndarBahar'}]"
                     >
                  <td>{{ bet.uname }}</td>
                  <td class="text-right" v-currency="bet.amt"></td>
                  <td class="text-right" ><span class="float-right">{{ bet.pdt }}</span></td>
                </tr>
                <tr :class="[{'back-border': bet.btype.toLowerCase() == 'back' && $route.name != 'AndarBahar'}, 
                    {'lay-border': bet.btype.toLowerCase() == 'lay' && $route.name != 'AndarBahar'}, 
                    {'andar-border': bet.nat.match(/andar/i) && $route.name == 'AndarBahar'}, 
                    {'bahar-border': bet.nat.match(/bahar/i) && $route.name == 'AndarBahar'}]">
                  <td colspan="3">
                    <div class="kbcbtesbox casino-place-bet-row ">
                        <template v-for="(nat, key1) in bet.natjson">
                          <div class="bet-box" :key="key1">
                              <span>{{`[Q${key1+1}] ${nat.c[0].s}`}}</span>
                          </div>
                        </template>
                        <div class="text-center" v-if="bet.bhav">
                          <div class="hbtn" v-if="bet.bhav == 1">
                              [4 Cards Quit]
                          </div>
                          <div class="fbtn" v-else-if="bet.bhav == 2">
                              [50-50 Quit]
                          </div>
                          <div class="fivebtn" v-else-if="bet.bhav == 3">
                              [5 Cards]
                          </div>
                        </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="3"  style="height:3px; padding:0"></td>
                </tr>
                </template>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="3" class="text-center">No records found</td>
                </tr>
              </tbody>
            </table>
            <table class="table coupon-table table-striped mb-0" v-else>
              <thead>
                <tr>
                  <th style="min-width: 90px;">UserName</th>
                  <!-- <th style="min-width: 90px;">Nation</th> -->
                  <th class="text-right" style="min-width: 50px;">Rate</th>
                  <th class="text-right" style="min-width: 70px;">Amount</th>
                  
                </tr>
              </thead>
              <tbody v-if="$store.state.casinoBetSoda != null">
                <template v-for="bet in $store.state.casinoBetSoda">
                
                <tr :class="[{'back-border': bet.btype.toLowerCase() == 'back' && $route.name != 'AndarBahar'}, 
                    {'lay-border': bet.btype.toLowerCase() == 'lay' && $route.name != 'AndarBahar'}, 
                    {'andar-border': bet.nat.match(/andar/i) && $route.name == 'AndarBahar'}, 
                    {'bahar-border': bet.nat.match(/bahar/i) && $route.name == 'AndarBahar'}]"
                     >
                  <td colspan="4">
                    <b>{{ bet.nat }}</b>
                    <span class="float-right">{{ bet.pdt }}</span>
                  </td>
                </tr>
                <tr :class="[{'back-border': bet.btype.toLowerCase() == 'back' && $route.name != 'AndarBahar'}, 
                    {'lay-border': bet.btype.toLowerCase() == 'lay' && $route.name != 'AndarBahar'}, 
                    {'andar-border': bet.nat.match(/andar/i) && $route.name == 'AndarBahar'}, 
                    {'bahar-border': bet.nat.match(/bahar/i) && $route.name == 'AndarBahar'}]">
                  <td>{{ bet.uname }}</td>
                  <!-- <td>{{ bet.nat }}</td> -->
                  <td class="text-right">{{ bet.urate }}</td>
                  <td class="text-right" v-currency="bet.amt"></td>
                </tr>
                <tr>
                  <td colspan="4"  style="height:3px; padding:0"></td>
                </tr>
                </template>
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
    </div>
  </div>
  <div class="card m-b-10" v-if="casinoRules && casinoRules.length > 0">
      <div class="card-header">
          <h6 class="card-title d-inline-block">
          Rules
          </h6>
      </div>
      <div class="card-body" style="padding: 10px;">
          <table class="table table-bordered rules-table" v-for="(data, key) in casinoRules">
              <tbody>
                  <template >
                      <tr class="text-center">
                          <th colspan="2">{{ data.hed }}</th>
                      </tr>
                      <tr v-for="(rule, key1) in data.child">
                          <td width="60%">{{ rule.nat }}</td>
                          <td>{{ rule.resval }}</td>
                      </tr>
                  </template>
              </tbody>
          </table>
      </div>
  </div> 
  
</div>
</simplebar>
<div class="casino-right-sidebar" v-else>
  
  <div class="card m-b-10 my-bet" id="casino-bets">
    <div class="card-header">
      <h6 class="card-title float-left">My Bets</h6>
      <a href="javascript:void(0)" class="btn btn-back float-right" @click="getViewMoreBets()">View More</a>
    </div>
    <div class="card-body1">
      <div class="tab-content">
        <div id="matched-bet" class="tab-pane active">
          <div class="table-responsive1">
            <table class="table coupon-table table-striped mb-0" v-if="gtype == 'kbc'">
              <thead>
                <tr>
                  <th style="min-width: 90px;">UserName</th>
                  <!-- <th style="min-width: 90px;">Nation</th> -->
                  <th class="text-right" style="min-width: 50px;">Amount</th>
                  <th class="text-right" style="min-width: 70px;">Date</th>
                  
                </tr>
              </thead>
              <tbody v-if="$store.state.casinoBetSoda != null">
                <template v-for="bet in $store.state.casinoBetSoda">
                
                <tr :class="[{'back-border': bet.btype.toLowerCase() == 'back' && $route.name != 'AndarBahar'}, 
                    {'lay-border': bet.btype.toLowerCase() == 'lay' && $route.name != 'AndarBahar'}, 
                    {'andar-border': bet.nat.match(/andar/i) && $route.name == 'AndarBahar'}, 
                    {'bahar-border': bet.nat.match(/bahar/i) && $route.name == 'AndarBahar'}]"
                     >
                  <td>{{ bet.uname }}</td>
                  <td class="text-right" v-currency="bet.amt"></td>
                  <td class="text-right" ><span class="float-right">{{ bet.pdt }}</span></td>
                </tr>
                <tr :class="[{'back-border': bet.btype.toLowerCase() == 'back' && $route.name != 'AndarBahar'}, 
                    {'lay-border': bet.btype.toLowerCase() == 'lay' && $route.name != 'AndarBahar'}, 
                    {'andar-border': bet.nat.match(/andar/i) && $route.name == 'AndarBahar'}, 
                    {'bahar-border': bet.nat.match(/bahar/i) && $route.name == 'AndarBahar'}]">
                  <td colspan="3">
                    <div class="kbcbtesbox casino-place-bet-row ">
                        <template v-for="(nat, key1) in bet.natjson">
                          <div class="bet-box" :key="key1">
                              <span>{{`[Q${key1+1}] ${nat.c[0].s}`}}</span>
                          </div>
                        </template>
                        <div class="text-center" v-if="bet.bhav">
                          <div class="hbtn" v-if="bet.bhav == 1">
                              4 Cards Quit
                          </div>
                          <div class="fbtn" v-else-if="bet.bhav == 2">
                              50-50 Quit
                          </div>
                          <div class="fivebtn" v-else-if="bet.bhav == 3">
                              5 Cards
                          </div>
                        </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="3"  style="height:3px; padding:0"></td>
                </tr>
                </template>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="3" class="text-center">No records found</td>
                </tr>
              </tbody>
            </table>
            <table class="table coupon-table table-striped mb-0" v-else>
              <thead>
                <tr>
                  <th style="min-width: 90px;">UserName</th>
                  <!-- <th style="min-width: 90px;">Nation</th> -->
                  <th class="text-right" style="min-width: 50px;">Rate</th>
                  <th class="text-right" style="min-width: 70px;">Amount</th>
                  
                </tr>
              </thead>
              <tbody v-if="$store.state.casinoBetSoda != null">
                <template v-for="bet in $store.state.casinoBetSoda">
                
                <tr :class="[{'back-border': bet.btype.toLowerCase() == 'back' && $route.name != 'AndarBahar'}, 
                    {'lay-border': bet.btype.toLowerCase() == 'lay' && $route.name != 'AndarBahar'}, 
                    {'andar-border': bet.nat.match(/andar/i) && $route.name == 'AndarBahar'}, 
                    {'bahar-border': bet.nat.match(/bahar/i) && $route.name == 'AndarBahar'}]"
                     >
                  <td colspan="4">
                    <b>{{ bet.nat }}</b>
                    <span class="float-right">{{ bet.pdt }}</span>
                  </td>
                </tr>
                <tr :class="[{'back-border': bet.btype.toLowerCase() == 'back' && $route.name != 'AndarBahar'}, 
                    {'lay-border': bet.btype.toLowerCase() == 'lay' && $route.name != 'AndarBahar'}, 
                    {'andar-border': bet.nat.match(/andar/i) && $route.name == 'AndarBahar'}, 
                    {'bahar-border': bet.nat.match(/bahar/i) && $route.name == 'AndarBahar'}]">
                  <td>{{ bet.uname }}</td>
                  <!-- <td>{{ bet.nat }}</td> -->
                  <td class="text-right">{{ bet.urate }}</td>
                  <td class="text-right" v-currency="bet.amt"></td>
                </tr>
                <tr>
                  <td colspan="4"  style="height:3px; padding:0"></td>
                </tr>
                </template>
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
    </div>
  </div>
  <div class="card m-b-10" v-if="casinoRules && casinoRules.length > 0">
      <div class="card-header">
          <h6 class="card-title d-inline-block">
          Rules
          </h6>
      </div>
      <div class="card-body" style="padding: 10px;">
          <table class="table table-bordered rules-table" v-for="(data, key) in casinoRules">
              <tbody>
                  <template >
                      <tr class="text-center">
                          <th colspan="2">{{ data.hed }}</th>
                      </tr>
                      <tr v-for="(rule, key1) in data.child">
                          <td width="60%">{{ rule.nat }}</td>
                          <td>{{ rule.resval }}</td>
                      </tr>
                  </template>
              </tbody>
          </table>
      </div>
  </div> 
  
</div>
<div v-if="$store.getters.isMobile" class="market-show-icon d-none-desktop" @click="$helpers.scrollToId('casino-bets')">
    <div class="bet-cnt">{{ $store.state.casinoBetSoda ? $store.state.casinoBetSoda.length : 0 }}</div>
    <div class="bet-title">Bets</div>
</div>
<b-modal ref="viewMoreBetsModal" hide-footer title="View More" size="big" class="">
    <div class="m-t-20 view-more-modal">
        <div id="matched-bet2" class="tab-pane active">
            <div class="table-responsive">
                <table class="table table-diamond table-bordered">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>UserName</th>
                            <th>Nation</th>
                            
                            <th class="text-right">Amount</th>
                            <th class="text-right">User Rate</th>
                            <th>Place Date</th>
                            <th>IP</th>
                            <th>Browser Details</th>
                        </tr>
                    </thead>
                    <tbody v-if="viewMoreBets != null && viewMoreBets.length > 0">
                      <template v-for="(bet, index) in viewMoreBets" >
                        <tr :class="{'back-border': bet.btype.toLowerCase() == 'back', 'lay-border': bet.btype.toLowerCase() == 'lay'}">
                            <td>{{ index + 1 }}</td>
                            <td>
                              <a v-if="gtype == 'kbc'" href="javascript:void(0)" @click="toggleDiv(index)"><u>{{ bet.uname }}</u></a>
                              <span v-else>{{ bet.uname }}</span>
                            </td>
                            <td>{{ bet.nat }}</td>
                           
                            <td class="text-right" v-currency="bet.amt"></td>
                            <td class="text-right">{{ bet.urate }}</td>
                            <td v-formatDatetime="{date: bet.pdt}"></td>
                            <td>{{ bet.ip }}</td>
                            <td>
                              <a class="text-success" href="javascript:void(0)" v-b-tooltip="bet.bdetail">Detail</a>
                            </td>
                        </tr>
                        <tr v-if="bet.natjson && showDesc === index">
                            <td colspan="8">
                              <div class="kbcbtesbox casino-place-bet-row ">
                                  <template v-for="(nat, key1) in bet.natjson">
                                    <div class="bet-box" :key="key1">
                                        <span>{{`[Q${key1+1}] ${nat.c[0].s}`}}</span>
                                    </div>
                                  </template>
                                  <div class="bet-box" v-if="bet.bhav">
                                    <div class="hbtn" v-if="bet.bhav == 1">
                                        [4 Cards Quit]
                                    </div>
                                    <div class="fbtn" v-else-if="bet.bhav == 2">
                                        [50-50 Quit]
                                    </div>
                                    <div class="fivebtn" v-else-if="bet.bhav == 3">
                                        [5 Cards]
                                    </div>
                                  </div>
                              </div>
                            </td>
                        </tr>
                      </template>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="8" class="text-center">No records found</td>
                      </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  </b-modal>
</div>
<!-- Right Sidebar End-->
</template>
<script>
  import simplebar from "simplebar-vue";

    import ServiceApi from "@/services/ServiceApi";
    export default {
        data(){
            return {
                imgPath: IMG_PATH,
                viewMoreBets: [],
                casinoRules: [],
                showDesc: null
            }
        },
        props:['mid', 'gtype'],
        components: { 
          simplebar
        },
        mounted() {
          this.getCasinoRules();
        },
        methods: {
          toggleDiv(key){
              if(this.showDesc === key){
                  this.showDesc = null
              }else{
                  this.showDesc = key
              }
          },
          getViewMoreBets(){
              this.$store.state.isLoading = true;
              ServiceApi.callApi("casino/viewmorebets", {
                  mid: parseInt(this.mid),
                  gtype: this.gtype
                })
                .then(response => {
                  if (response.status == 200) {
                    this.viewMoreBets = response.data
                  } else {
                    this.viewMoreBets = []
                  }
                  this.$store.state.isLoading = false;
                  this.$refs['viewMoreBetsModal'].show()
                })
                .catch(e => {
                  this.viewMoreBets = []
                  this.$store.state.isLoading = false;
                });
            },
            getCasinoRules() {
                this.casinoRules = []
                ServiceApi.callApi("casino/rules", {
                    'gtype': this.gtype,
                })
                .then(response => {
                    if (response.status == 200) {
                        this.casinoRules = response.data
                    } else {
                        this.casinoRules = []
                    }
                })
                .catch(e => {
                    this.casinoRules = []
                });
            },
        }
    }
</script>

<style>

</style>