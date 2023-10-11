<template>
<div>
    <div class="mt-4" v-if="gameSoda && gameSoda.length">
        <div class="custom-control custom-radio custom-control-inline">
            <input type="radio" class="custom-control-input" id="soda-all" name="example" value="all"
                @change="changeType($event)" checked>
            <label class="custom-control-label" for="soda-all">All</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
            <input type="radio" class="custom-control-input" id="soda-back" name="example" value="back"
                @change="changeType($event)">
            <label class="custom-control-label" for="soda-back">Back</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
            <input type="radio" class="custom-control-input" id="soda-lay" name="example" value="lay"
                @change="changeType($event)">
            <label class="custom-control-label" for="soda-lay">Lay</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
            <input type="radio" class="custom-control-input" id="soda-deleted" name="example" value="deleted"
                @change="changeType($event)">
            <label class="custom-control-label" for="soda-deleted">Deleted</label>
        </div>
        <div class="custom-control-inline float-right">
            <h5>Total Bets: <span class="text-success mr-2">{{ sodaTotal }}</span> Total Win: <span :class="{'text-success':winTotal >= 0, 'text-danger': winTotal < 0}" v-currency="winTotal"></span></h5>
        </div>
    </div>
    <div class="table-responsive report-table" v-if="sodaList && sodaList.length">
        <table class="table">
            <thead>
                <tr>
                    <th class="user-name">
                        <div>Username</div>
                    </th>
                    <th class="event-name">
                        <div>Nation</div>
                    </th>
                    <th class="text-right bet-user-rate">
                        <div>Rate</div>
                    </th>
                    <th class="text-right bet-user-rate" v-if="isDtypeSS">
                        <div>Bhav</div>
                    </th>
                    <th class="text-right bet-amount">
                        <div>Amount</div>
                    </th>
                    <th class="text-right bet-amount">
                        <div>Win</div>
                    </th>
                    <th class="bet-date">
                        <div>Date</div>
                    </th>
                    
                    <th>
                        <div>IP</div>
                    </th>
                    <th>
                        <div>B Details</div>
                    </th>
                    <th class="text-right">
                        <div>Action</div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(data, key) in sodaList">
                    <tr :class="[{'back-border':data.btype.toLowerCase() == 'back'}, {'lay-border':data.btype.toLowerCase() == 'lay'}]" :key="key">
                        <td class="user-name">
                            <a v-if="data.natjson" href="javascript:void(0)" class="pointer" @click="toggleDiv(key)" ><u>{{ data.uname }}</u></a>
                            <span v-else>{{ data.uname }}</span>
                        </td>
                        <td class="event-name">
                            <div>{{ data.nat }}</div>
                        </td>
                        <td class="text-right bet-user-rate">
                            <div>{{data.urate}}</div>
                        </td>
                        <td class="text-right bet-user-rate" v-if="isDtypeSS">
                            <div v-if="data.bhav != ''">{{data.bhav}}</div>
                            <div v-else>-</div>
                        </td>
                        <td class="text-right bet-amount">
                            <div v-currency="data.amt"></div>
                        </td>
                        <td class="text-right bet-amount">
                            <div v-if="data.match" :class="{'text-success': data.wl >= 0, 'text-danger': data.wl < 0}"  v-currency="data.wl"></div>
                            <div v-else>-</div>
                        </td>
                        <td class="bet-date">
                            <div v-format-datetime="{date:data.pdt}"></div>
                        </td>
                        <td>
                            <a href="javascript:void(0)" @click="checkIP(data.ip)">{{data.ip}}</a>
                        </td>
                        <td>
                             <!-- <a
                                href="javascript:void(0)"
                                data-toggle="tooltip"
                                data-placement="top"
                                :title="data.bdetail"
                                class="text-success"
                                :data-original-title="data.bdetail"
                              >Detail</a> -->
                              <a class="text-success" href="javascript:void(0)" v-b-tooltip.hover  :title="data.bdetail">Detail</a>
                        </td>
                        <td class="text-right">
                            <b-form-checkbox :value="key" v-model="selected"></b-form-checkbox>
                           <!--  <input type="checkbox" name="checkval" :id="'check-'+key" :value="key" v-model="checked" @click="calculateTotalWin"> -->
                           <!--  <div class="custom-control custom-checkbox">
                                <input type="checkbox" name="checkval" :id="'check-'+key" :value="key" v-model="checked" @click="calculateTotalWin" class="custom-control-input"> 
                                <label class="custom-control-label" for="checkval"></label>
                            </div> -->
                        </td>
                    </tr>
                    <tr v-if="data.natjson && showDesc === key">
                        <td colspan="8">
                            <div class="kbc-result-box">
                                <template v-for="(nat, key1) in data.natjson">
                                    <div class="casino-box-row" :key="key1">
                                        <div class="question-name">
                                            <b>{{`[Q${key1+1}]`}} {{ nat.n }}</b>
                                        </div>
                                        <div class="answer-name" :class="{true: rdesc[key1] == nat.c[0].s, false: rdesc[key1] != nat.c[0].s}">{{ nat.c[0].s }}</div>
                                    </div>
                                </template>
                                <template v-if="data.bhav">
                                    <div class="casino-box-row">
                                        <div class="kbchf">
                                            <div class="kbc-result-box-half" v-if="data.bhav == 1">4 Cards Quit</div>
                                            <div class="kbc-result-box-full" v-else-if="data.bhav == 2">50-50 Quit</div>
                                            <div class="kbc-result-box-five" v-else-if="data.bhav == 3">5 Cards</div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
    <b-modal ref="ipdetail" size="sm" title="IP Details" header-bg-variant="success" hide-footer class>
      
      <b-table-simple hover small caption-top responsive>
        <b-thead head-variant="dark">
          <b-tr>
            <b-th>Key</b-th>
            <b-th>Value</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <!-- <b-tr v-bind:key="index" v-for="(value, propertyName, index) in ipdetail">
            <b-th>{{propertyName}}</b-th>
            <b-th>{{value}}</b-th>
          </b-tr> -->
          <b-tr>
            <b-td><b>IP:</b></b-td>
            <b-td>{{ipdetail.query}}</b-td>
          </b-tr>
          <b-tr>
            <b-td><b>City:</b></b-td>
            <b-td>{{ipdetail.city}}</b-td>
          </b-tr>
          <b-tr>
            <b-td><b>Country:</b></b-td>
            <b-td>{{ipdetail.country}}</b-td>
          </b-tr>
          <b-tr>
            <b-td><b>Mobile:</b></b-td>
            <b-td>{{ipdetail.mobile}}</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-modal>
</div>
</template>

<script>
    import moment from 'moment'
    import ServiceApi from "@/services/ServiceApi";
    export default {
        props:['gameSoda', 'isDtypeSS', 'desc'],
        data(){
            return{
                betType: 'all',
                winTotal: 0,
                sodaTotal:0,
                selected: [],
                ipdetail: "",
                rdesc: null,
                showDesc: null
            }
        },
        mounted() {
            this.calculateTotalWin();
            this.rdesc = this.desc.replace(/ /g,"");
            this.rdesc = this.rdesc.split("#")
            console.log(this.rdesc)
        },
        computed: {
            sodaList(){
                if(this.betType == 'all')
                    return _.filter(this.gameSoda, { 'match': true });
                else if(this.betType == 'back')
                    return _.filter(this.gameSoda, { 'btype': 'back', 'match': true });
                else if(this.betType == 'lay')
                    return _.filter(this.gameSoda, { 'btype': 'lay', 'match': true });
                else if(this.betType == 'deleted')
                    return _.filter(this.gameSoda, { 'match': false });
                else
                    return []
            }
        },
        watch: {
            selected() {
                let self = this;
                if(this.selected.length > 0){
                    this.winTotal = 0;
                    this.sodaTotal = 0;
                    _.forEach(this.sodaList, (o,key) => {
                        if(self.selected.includes(key)){
                            this.winTotal +=  o.wl;
                            this.sodaTotal++;
                        }
                    });
                }else{
                    this.calculateTotalWin();
                }
            }
        },
        methods: {
            toggleDiv(key){
                if(this.showDesc === key){
                    this.showDesc = null
                }else{
                    this.showDesc = key
                }
            },
            changeDataFormat(date) {
                return moment(String(date)).format('YYYY/MM/DD')
            },
            changeType(event) {
                this.selected = [];
                this.betType = event.target.value
                this.calculateTotalWin();
            },
            calculateTotalWin(){
                this.sodaTotal = (this.sodaList) ? this.sodaList.length : 0;
                if(this.betType == "deleted"){
                    this.winTotal = 0
                }else{
                   this.winTotal = _.sumBy(this.sodaList, function (o) {
                        return o.wl;
                    }); 
                }
                
            },
            checkIP(ip) {
              this.$store.state.isLoading = true;
              ServiceApi.callApi("report/checkip", {
                ip: ip,
              })
                .then((response) => {
                  this.$store.state.isLoading = false;
                  if (response.success) {
                    this.ipdetail = response.data;
                    this.$refs["ipdetail"].show();
                  } else {
                    this.ipdetail = [];
                  }
                })
                .catch((e) => {
                  this.$store.state.isLoading = false;
                  this.ipdetail = [];
                });
            },
        }
    }
</script>

<style>

</style>