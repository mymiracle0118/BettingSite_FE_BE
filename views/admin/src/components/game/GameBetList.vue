<template>
  <div>
    <div v-if="gameSoda && gameSoda.length">
      <form
        method="post"
        data-vv-scope="searchBets"
        v-on:submit.prevent="searchBetList('searchBets')"
        class="ajaxFormSubmit"
      >
        <div class="row row5 align-items-center mb-3">
          <div class="col-xl-2">
            <label for="uname">Username</label>
            <b-form-input
              id="uname"
              v-model="searchForm.uname"
              type="text"
              placeholder="Search Username"
            ></b-form-input>
          </div>
          <div class="col-xl-3">
            <div class="row row5">
              <div class="col-6">
                <label for="amountfrom">Amount From</label>
                <b-form-input
                  id="amountfrom"
                  v-model="searchForm.amountFrom"
                  v-validate="'decimal:3'"
                  type="text"
                  name="amountFrom"
                  :class="{ 'is-invalid': verrors.first('searchBets.amountFrom') }"
                  placeholder="Amount From"
                ></b-form-input>
              </div>
              <div class="col-6">
                <label for="amountto">Amount To</label>
                <b-form-input
                  id="amountto"
                  v-model="searchForm.amountTo"
                  type="text"
                  v-validate="'decimal:3'"
                  :class="{ 'is-invalid': verrors.first('searchBets.amountto') }"
                  name="amountto"
                  placeholder="Amount To"
                ></b-form-input>
              </div>
            </div>
          </div>
          <div class="col-xl-2">
            <label for="amountto">IP Address</label>
            <b-form-input
              id="ipaddr"
              v-model="searchForm.ip"
              v-validate="'ip'"
              :class="{ 'is-invalid': verrors.first('searchBets.ip') }"
              type="text"
              name="ip"
              placeholder="IP Address"
            ></b-form-input>
          </div>
          <div class="col-xl-2 mt-4">
            <b-button type="submit" variant="primary">Search</b-button>
            <b-button type="button" variant="light" @click="resetSearchForm()"
              >Reset</b-button
            >
          </div>
        </div>
      </form>
      <b-form-radio-group
        id="radio-group-1"
        v-model="searchForm.betType"
        :options="options"
        name="radio-options"
        class="float-left"
        @change="changeType($event)"
      ></b-form-radio-group>

      <div class="custom-control-inline float-right">
        <h5>
          Total Soda: <span class="text-success mr-2">{{ sodaTotal }}</span> Total Amount:
          <span
            :class="{ 'text-success': winTotal >= 0, 'text-danger': winTotal < 0 }"
            v-currency="winTotal"
          ></span>
        </h5>
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
            <th class="text-right bet-amount">
              <div>Amount</div>
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
        <tbody v-if="sodaList && sodaList.length > 0">
          <template v-for="(data, key) in sodaList">
            <tr
              :class="[
                { 'back-border': data.btype.toLowerCase() == 'back' },
                { 'lay-border': data.btype.toLowerCase() == 'lay' },
              ]"
              :key="key"
            >
              <td class="user-name">
                <div>{{ data.uname }}</div>
              </td>
              <td class="event-name">
                <div>{{ data.sname }} <template v-if="data.gtype.toLowerCase() == 'fancy'">
                              / {{ data.bhav }}
                            </template></div>
              </td>
              <td class="text-right bet-user-rate">
                <div>{{ data.urate }}</div>
              </td>
              <td class="text-right bet-amount">
                <div v-currency="data.amt"></div>
              </td>

              <td class="bet-date">
                <div v-format-datetime="{ date: data.pdt }"></div>
              </td>
              <td>
                <a href="javascript:void(0)" @click="checkIP(data.ip)">{{ data.ip }}</a>
              </td>
              <td>
                
                <a class="text-success" href="javascript:void(0)" v-b-tooltip="data.bdetail">Detail</a>
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
          </template>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="text-center" colspan="8">No Record Found</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="table-responsive report-table text-center">No records found</div>
    <b-modal
      ref="ipdetail"
      size="sm"
      title="IP Details"
      header-bg-variant="success"
      hide-footer
      class
    >
      <b-table-simple hover small caption-top responsive>
        <b-thead head-variant="dark">
          <b-tr>
            <b-th>Key</b-th>
            <b-th>Value</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <!-- <b-tr v-bind:key="index" v-for="(value, propertyName, index) in ipdetail">
            <b-th>{{ propertyName }}</b-th>
            <b-th>{{ value }}</b-th>
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
import moment from "moment";
import ServiceApi from "@/services/ServiceApi";
export default {
  props: ["gameSoda"],
  data() {
    return {
      //betType: 'all',
      winTotal: 0,
      sodaTotal: 0,
      selected: [],
      ipdetail: "",
      options: [
        { text: "All", value: "all" },
        { text: "Back", value: "back" },
        { text: "Lay", value: "lay" },
        { text: "Deleted", value: "deleted" },
      ],
      searchForm: {
        uname: "",
        ip: "",
        amountFrom: "",
        amountTo: "",
        betType: "all",
      },
      sodaList: [],
    };
  },
  mounted() {
    console.log(this.gameSoda);
    this.sodaList = this.gameSoda;
    this.calculateTotalWin();
  },
  computed: {
    /*sodaList(){
                if(this.betType == 'all')
                    return _.filter(this.gameSoda, { 'match': true});
                else if(this.betType == 'back')
                    return _.filter(this.gameSoda, { 'btype': 'back', 'match': true});
                else if(this.betType == 'lay')
                    return _.filter(this.gameSoda, { 'btype': 'lay', 'match': true});
                else if(this.betType == 'deleted')
                    return _.filter(this.gameSoda, { 'match': false });
                else
                    return []
            }*/
  },
  watch: {
    selected() {
      let self = this;
      if (this.selected.length > 0) {
        this.winTotal = 0;
        this.sodaTotal = 0;
        _.forEach(this.sodaList, (o, key) => {
          if (self.selected.includes(key)) {
            this.winTotal += o.amt;
            this.sodaTotal++;
          }
        });
      } else {
        this.calculateTotalWin();
      }
    },
    gameSoda() {
      //this.betType = "all";
      //this.calculateTotalWin();
      this.resetSearchForm();
    },
  },
  methods: {
    changeDataFormat(date) {
      return moment(String(date)).format("YYYY/MM/DD");
    },
    changeType(value) {
      this.selected = [];
      this.searchForm.betType = value;
      this.searchBetList();
      //this.calculateTotalWin();
    },
    calculateTotalWin() {
      this.sodaTotal = this.sodaList ? this.sodaList.length : 0;
      if (this.searchForm.betType == "deleted") {
        this.winTotal = 0;
      } else {
        this.winTotal = _.sumBy(this.sodaList, function (o) {
          return o.amt;
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
    searchBetList(scope) {
      this.$validator.validateAll(scope).then((valid) => {
        if (valid) {
          let sodaList = [];
          _.forEach(this.gameSoda, (data, key) => {
            let isMatched = true;
            if (this.searchForm.uname != "") {
              if (data.uname.toLowerCase().indexOf(this.searchForm.uname) > -1) {
                //sodaList.push(data)
              } else {
                isMatched = false;
              }
            }
            if (this.searchForm.amountFrom != "") {
              if (data.amt < this.searchForm.amountFrom) {
                isMatched = false;
              }
            }
            if (this.searchForm.amountTo != "") {
              if (data.amt > this.searchForm.amountTo) {
                isMatched = false;
              }
            }
            if (this.searchForm.ip != "") {
              if (data.ip.indexOf(this.searchForm.ip) > -1) {
                //sodaList.push(data)
              } else {
                isMatched = false;
              }
            }

            if (this.searchForm.betType != "") {
              if (this.searchForm.betType == "all") {
                if (data.match != true) {
                  isMatched = false;
                }
              } else if (this.searchForm.betType == "back") {
                if (data.match == true && data.btype == "back") {
                } else {
                  isMatched = false;
                }
              } else if (this.searchForm.betType == "lay") {
                if (data.match == true && data.btype == "lay") {
                } else {
                  isMatched = false;
                }
              } else if (this.searchForm.betType == "deleted") {
                if (data.match == true) {
                  isMatched = false;
                }
              }
            }

            if (isMatched == true) {
              sodaList.push(data);
            }
          });
          this.sodaList = sodaList;
          this.calculateTotalWin();
        }
      });
    },
    resetSearchForm() {
      this.searchForm = {
        uname: "",
        ip: "",
        amountFrom: "",
        amountTo: "",
        betType: "all",
      };
      this.sodaList = this.gameSoda;
      this.calculateTotalWin();
    },
  },
};
</script>

<style></style>
