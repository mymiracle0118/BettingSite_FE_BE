<template>
  <div class="market-analysis">
    <div class="row"> 
      <div class="col-12">
        <div class="page-title-box d-flex align-items-center justify-content-between">
          <h4 class="mb-0 font-size-18">
            Market Analysis
            <a href="javascript:void(0)" title="Refresh Data" @click="loadReport()" class="text-dark pl-2"><i class="fa fa-sync" :class="{'fa-spin': isLoading == true}"></i>
            </a>
          </h4> 

          <div class="page-title-right">
            <!-- <b-breadcrumb :items="items" class="m-0"></b-breadcrumb> -->
            <input
              type="text"
              name="searchMarktetText"
              v-model="searchMarktetText"
              value=""
              class="form-control"
              placeholder="Search Event"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="market-analysis-container">
      <template v-if="marketData1()">
        <div v-for="(event, key) in marketData1()" class="market-analysis-container" >
          <div class="market-analysis-title">
            <div>
              <router-link
                v-if="event.iscc == 0"
                :to="{
                  name: 'GameDetail',
                  params: {
                    etid: $base64.encode(event.etid),
                    gameId: $base64.encode(event.eid),
                  },
                }"
                class="ma-link"
                >{{ event.ename }}</router-link
              >
              <template v-else-if="event.iscc == 1">
                <router-link
                  v-if="event.shlight == 1"
                  :to="{
                    name: 'VirtualCricket',
                    params: {
                      etid: $base64.encode(event.etid),
                      gameId: $base64.encode(event.eid),
                    },
                  }"
                  class="ma-link"
                  >{{ event.ename }}</router-link
                >
                <router-link
                  v-if="event.shlight == 0"
                  :to="{ name: 'Cricketv3' }"
                  class="ma-link"
                  >{{ event.ename }}</router-link
                >
              </template>
              <template v-else-if="event.iscc == 2">
                <router-link
                  v-if="event.shlight == 1"
                  :to="{
                    name: 'VirtualGame',
                    params: {
                      etid: $base64.encode(event.etid),
                      gameId: $base64.encode(event.eid),
                    },
                  }"
                  class="ma-link"
                  >{{ event.ename }}</router-link
                >
              </template>
              <template v-else-if="event.iscc == 3">
                <router-link
                  v-if="event.shlight == 0"
                  :to="{ name: 'SuperOver' }"
                  class="ma-link"
                  >{{ event.ename }}</router-link
                >
              </template>
            </div>
            <div v-format-datetime="{ date: event.gstime }"></div>
          </div>
          <div class="market-analysis-content">
            <div class="row row5">
              <div class="col-lg-4" v-for="(market, key1) in event.market">
                <div class="market-analysis-content-detail" data-simplebar>
                  <table class="table">
                    <thead>
                      <tr>
                        <th colspan="2">{{ market.mname }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(section, key2) in orderBy(market.section, 'srno')">
                        <td>{{ section.sname }}</td>
                        <td class="text-right" v-currency="section.amt">
                          {{ section.amt }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="reportData && reportData.t2">
        <div class="market-analysis-container">
          <div class="market-analysis-title">
            <div>PLayer Battle</div>
          </div>
          <div class="market-analysis-content">
            <div class="row row5">
              <div class="col-lg-4" v-for="(event, key) in marketData2()">
                <div class="market-analysis-content-detail" data-simplebar>
                  <table class="table">
                    <thead>
                      <tr>
                        <th>{{ event.ename }}</th>
                        <th
                          class="text-right"
                          v-format-datetime="{ date: event.gstime }"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(market, key2) in event.market">
                        <td>{{ market.mname }}</td>
                        <td class="text-right" v-currency="market.amt">
                          {{ market.amt }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="reportData && reportData.t3">
        <div class="market-analysis-container">
          <div class="market-analysis-title">
            <div>Diam 11</div>
          </div>
          <div class="market-analysis-content">
            <div class="row row5">
              <div class="col-lg-4" v-for="(event, key) in marketData3()">
                <div class="market-analysis-content-detail" data-simplebar>
                  <table class="table">
                    <thead>
                      <tr>
                        <th>{{ event.ename }}</th>
                        <th
                          class="text-right"
                          v-format-datetime="{ date: event.gstime }"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(market, key2) in event.market">
                        <td>{{ market.mname }}</td>
                        <td class="text-right" v-currency="market.amt">
                          {{ market.amt }}
                        </td>
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
</template>
<script>
import ServiceApi from "@/services/ServiceApi";
import store from "@/store";
import Swal from "sweetalert2";
import PageHeader from "@/components/page-header";
import simplebar from "simplebar-vue";

export default {
  components: {
    PageHeader,
    simplebar
  },
  mounted() {
    // this.$swal({
    //     toast: true,
    //     position: "top-end",
    //     showConfirmButton: false,
    //     timer: 3000000,
    //     type: "success",
    //     text: 'test message',
    //     icon: "success",
    //   });
    if (this.$store.state.WMSG != "") {
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        type: "success",
        text: this.$store.state.WMSG,
        icon: "success",
      });
      this.$store.state.WMSG = "";
    }
    this.loadReport();
  },
  data() {
    return {
      items: [
        {
          text: "Home",
          active: true,
        },
      ],
      reportData: [],
      searchMarktetText: "",
      isLoading: false
    };
  },
  computed: {
    // marketData1() {
    //   var self = this;
    //   var results = _.filter(this.reportData.t1, function (item) {
    //     return _.some(item, (v) =>
    //       _.includes(v.toString().toLowerCase(), self.searchMarktetText)
    //     );
    //   });
    //   return results;
    // },
    // marketData2() {
    //   var self = this;
    //   var results = _.filter(this.reportData.t2, function (item) {
    //     return _.some(item, (v) =>
    //       _.includes(v.toString().toLowerCase(), self.searchMarktetText)
    //     );
    //   });
    //   return results;
    // },
    // marketData3() {
    //   var self = this;
    //   var results = _.filter(this.reportData.t3, function (item) {
    //     return _.some(item, (v) =>
    //       _.includes(v.toString().toLowerCase(), self.searchMarktetText)
    //     );
    //   });
    //   return results;
    // },
  },
  methods: {
    marketData1() {
      var self = this;
      var results = _.filter(this.reportData.t1, function (item) {
        return _.some(item, (v) =>
          _.includes(v.toString().toLowerCase(), self.searchMarktetText.toLowerCase())
        );
      });
      return results;
    },
    marketData2() {
      var self = this;
      var results = _.filter(this.reportData.t2, function (item) {
        return _.some(item, (v) =>
          _.includes(v.toString().toLowerCase(), self.searchMarktetText.toLowerCase())
        );
      });
      return results;
    },
    marketData3() {
      var self = this;
      var results = _.filter(this.reportData.t3, function (item) {
        return _.some(item, (v) =>
          _.includes(v.toString().toLowerCase(), self.searchMarktetText.toLowerCase())
        );
      });
      return results;
    },
    loadReport() {
      this.isLoading = true
      ServiceApi.callApi("report/marketanalysis", {})
        .then((response) => {
          if (response.status == 200) {
            this.reportData = response.data;
            // this.searchMarket();
          } else {
            this.reportData = [];
          }
          this.isLoading = false
        })
        .catch((e) => {
          this.reportData = [];
          this.isLoading = false
        });
    },
  },
  beforeDestroy() {},
};
</script>
