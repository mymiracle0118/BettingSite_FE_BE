<template>
  <div class="report-box">
    <div class="report-title">
      <div class="report-name">Casino Results</div>
      <div class="report-search search-box">
        <div class="form-group mb-0">
          <input type="text" v-model="searchText" placeholder="Search" class="form-control" />
          <img :src="imgPath + 'front/img/search.svg'" class="search-icon" />
        </div>
      </div>
    </div>
    <div class="report-form">
      <div class="form-group from-date">
        <label>Date</label>
        <DatePicker v-model="params.dateFrom" :disabled-date="disabledFromDate" lang="en" value-type="MM/DD/YYYY"
          format="DD/MM/YYYY" />
      </div>
      <div class="form-group to-date">
        <label>Type</label>
        <select class="form-control" v-model="params.type" @change="data = []">
          <option value="">Select Type</option>
          <template v-for="(data, key) in tableList">
            <option :value="data.gtype" :key="key">{{ data.cname }}</option>
          </template>
        </select>
      </div>
      <button class="btn btn-primary" @click="loadReport()">Submit</button>
    </div>
    <div class="report-page-count">
      <div class="form-group mb-0">
        <label>Show</label>
        <select class="form-control" v-model="page.perPage" @change="changePerPage($event)">
          <template v-for="(page, key) in perPage">
            <option :key="key" :value="page">{{ page }}</option>
          </template>
        </select>
        <label>Entries</label>
      </div>
      <div class="file-icons">
        <div @click="generatePdf()">
          <i class="fas fa-file-pdf" :class="{ disabled: !(this.data && this.data.length) }"></i>
        </div>
        <JsonExcel :fields="exportTable.excelHeading" :data="data" name="Casino Results.xls">
          <i class="fas fa-file-excel" :class="{ disabled: !(this.data && this.data.length) }"></i>
        </JsonExcel>
      </div>
    </div>
    <div class="report-table d-none-mobile" :class="{ 'loader-section-parent': loading }">
      <!-- <div class="loader-section" v-if="loading">
                <div class="loader-section-icon"></div>
            </div> -->
      <Loader :isVisible="loading"></Loader>
      <table class="table table-hover">
        <thead>
          <tr>
            <th class="bet-amount">
              <div>Round ID</div>
            </th>
            <th class="bet-remark">
              <div>Winner</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="reportData && reportData.length">
            <template v-for="(data, key) in reportData">
              <tr :key="key" @click="showResult(data.mid)" class="pointer">
                <td class="bet-event-name">
                  <div>{{ data.mid }}</div>
                </td>
                <td class="bet-date">
                  <div>{{ data.nat }}</div>
                </td>
              </tr>
            </template>
          </template>
          <template v-else>
            <tr class="no-record">
              <td colspan="2">No records found</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div class="report-table d-none-desktop" :class="{ 'loader-section-parent': loading }">
      <!-- <div class="loader-section" v-if="loading">
                <div class="loader-section-icon"></div>
            </div> -->
      <Loader :isVisible="loading"></Loader>
      <template v-if="reportData && reportData.length">
        <template v-for="(data, key) in reportData">
          <div class="report-row" :key="key" @click="showResult(data.mid)">
            <div>
              <span class="bet-heading">Round ID</span>
              <span>{{ data.mid }}</span>
            </div>
            <div>
              <span class="bet-heading">Winner</span>
              <span>{{ data.nat }}</span>
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="report-row no-record">No records found</div>
      </template>
    </div>

    <paginate v-if="page.totalPages > 0" v-model="page.currunt" :pageCount="page.totalPages" :clickHandler="changePage"
      :prevText="'<'" :nextText="'>'" :container-class="'pagination justify-content-center mt-2'"
      :page-class="'page-item'" :page-link-class="'page-link'" :prev-class="'page-item'" :prev-link-class="'page-link'"
      :next-class="'page-item'" :next-link-class="'page-link'" :first-last-button="true" :first-button-text="'<<'"
      :last-button-text="'>>'">
    </paginate>

    <b-modal ref="detail-modal" modal-class="casino-result" hide-footer :size="getModalSize()">
      <template #modal-title>
        {{ gameDetail.ename }} Result
      </template>
      <!-- CASINO -->
      <CasinoResult :resultData="gameDetail" />
      <template v-if="gameDetail.gType == 'kbc'">
        <AccountStatementSoda :gameSoda="gameSoda" :gtype="gameDetail.gType" :desc="gameDetail.rdesc"
          :isDtypeSS="gameDetail.gType == 'cricketv' || gameDetail.gType == 'cricketv2' || gameDetail.gType == 'cricketv3' || gameDetail.gType == 'superover' ? true : false" />
      </template>
      <template v-else>
        <AccountStatementSoda :gameSoda="gameSoda"
          :isDtypeSS="gameDetail.gType == 'cricketv' || gameDetail.gType == 'cricketv2' || gameDetail.gType == 'cricketv3' || gameDetail.gType == 'superover' ? true : false" />
      </template>
    </b-modal>
  </div>
</template>

<script>
  import ServiceApi from "@/services/ServiceApi";
  import DatePicker from "vue2-datepicker";
  import CasinoResult from "@/components/casino/results/CasinoResults";
  import AccountStatementSoda from "@/components/AccountStatementSoda";
  import jsPDF from "jspdf";
  import "jspdf-autotable";
  import JsonExcel from "vue-json-excel";
  import moment from "moment-timezone";
  // moment.tz.setDefault("Asia/Calcutta");
  import Loader from "@/components/loader";

  export default {
    components: {
      JsonExcel,
      DatePicker,
      CasinoResult,
      AccountStatementSoda,
      Loader,
    },
    mounted() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      if (this.$route.params.gameType) {
        this.params.type = this.$route.params.gameType;
        this.loadReport();
      }
      this.getCasinoType();
    },
    data() {
      return {
        imgPath: IMG_PATH,
        params: {
          dateFrom: moment(new Date()).tz(DEFAULT_TIMEZONE).format("MM/DD/YYYY"),
          type: "",
        },
        searchText: "",
        page: {
          perPage: 25,
          currunt: 1,
          totalPages: 0,
        },
        perPage: [10, 25, 50, 100, 200, 300, 400, 500],
        data: [],
        tableList: [],
        gameDetail: [],
        gameSoda: [],
        exportTable: {
          pdfHeading: [{
              title: "Round ID",
              dataKey: "mid"
            },
            {
              title: "Winner",
              dataKey: "nat"
            },
          ],
          excelHeading: {
            "Round ID": "mid",
            Winner: "nat",
          },
        },
        ipDetail: null,
        loading: false,
      };
    },
    computed: {
      reportData() {
        var self = this;
        var results = _.filter(this.data, function (item) {
          return _.some(item, (v) =>
            _.includes(v.toString().toLowerCase(), self.searchText)
          );
        });
        this.page.totalPages = Math.ceil(results.length / this.page.perPage);
        if (this.page.currunt > this.page.totalPages) {
          this.page.currunt = 1
        }
        return this.paginate(results);
      },
    },
    watch: {
      searchText() {
        // console.log('change')
        // this.page.currunt = 1;
        // this.page.data = this.paginate(this.reportData)
        this.page.totalPages = Math.ceil(this.data.length / this.page.perPage);
      },
    },
    methods: {
      getModalSize() {
        var size = 'xl'
        if (this.params.type == '3cardj') {
          size = 'lg';
        } else if (this.params.type == 'lucky7') {
          size = 'lg';
        } else if (this.params.type == 'lucky7eu') {
          size = 'lg';
        } else if (this.params.type == 'lucky7eu2') {
          size = 'lg';
        } else if (this.params.type == 'worli') {
          size = 'lg';
        } else if (this.params.type == 'worli2') {
          size = 'lg';
        } else if (this.params.type == 'aaa') {
          size = 'lg';
        } else if (this.params.type == 'lottcard') {
          size = 'lg';
        } else if (this.params.type == 'cmatch20') {
          size = 'lg';
        } else {
          size = 'xl';
        }
        return size
      },
      showResult(mid, type) {
        if (this.loading) return;
        this.loading = true;
        // console.log(gmid, mid, gtype, dtype, popup)
        ServiceApi.callApi("api/front/accstatepopup", {
            gmid: 0,
            mid: mid,
            gtype: this.params.type,
            dtype: "cs",
          })
          .then((response) => {
            if (response.status == 200) {
              this.gameDetail = _.get(response.data, "t1") ?
                _.get(response.data, "t1") : {};
              Vue.set(this.gameDetail, "gType", this.params.type);
              Vue.set(this.gameDetail, "dType", "cs");
              this.gameSoda = _.get(response.data, "t2");

              this.$refs["detail-modal"].show();
              this.loading = false;
            } else {
              this.gameDetail = {};
              this.gameSoda = [];
              this.loading = false;
            }
          })
          .catch((e) => {
            this.gameDetail = {};
            this.gameSoda = [];
            this.loading = false;
          });
      },
      generatePdf() {
        if (this.data && this.data.length) {
          const doc = new jsPDF();
          var header = function (data) {
            doc.setFontSize(16);
            doc.text("Casino Results", data.settings.margin.left, 20);
          };
          doc.autoTable(this.exportTable.pdfHeading, this.data, {
            margin: {
              top: 25
            },
            didDrawPage: header,
          });
          doc.save("Casino Results.pdf");
        }
      },
      changeDateTimeFormat(date) {
        var day = moment(String(date), "MM-DD-YYYY hh:mm:ss A");
        var time = day.format("DD/MM/YYYY HH:mm:ss");
        return time;
      },
      disabledFromDate(date) {
        const today = new Date(moment().tz(DEFAULT_TIMEZONE).format("YYYY/MM/DD"));
        const beforeOneMonth = new Date(
          moment().tz(DEFAULT_TIMEZONE).subtract(1, "months").format("YYYY/MM/DD")
        );
        today.setHours(0, 0, 0, 0);

        return (
          date >= this.params.dateTo || date > today || date < beforeOneMonth
        );
      },
      getCasinoType() {
        ServiceApi.callApi("api/front/tablelist")
          .then((response) => {
            if (response.status == 200) {
              this.tableList = response.data;
            } else {
              this.tableList = [];
            }
          })
          .catch((e) => {
            this.tableList = [];
          });
      },
      loadReport() {
        this.searchText = "";
        if (this.loading) return;

        if (this.params.type == "") {
          this.$bvToast.toast("Select Casino Type!", {
            variant: "danger",
            toaster: "b-toaster-top-full",
            autoHideDelay: 3000,
            appendToast: false,
            static: true
          });
          return;
        }
        this.loading = true;
        ServiceApi.callApi("api/front/casinoresults", this.params)
          .then((response) => {
            if (response.status == 200) {
              this.data = response.data;
              this.page.totalPages = Math.ceil(
                this.data.length / this.page.perPage
              );
              if (this.page.currunt > this.page.totalPages) {
                this.page.currunt = 1
              }
              this.loading = false;
            } else {
              this.data = [];
              this.page.currunt = 1
              this.page.totalPages = 0;
              this.loading = false;
              this.$bvToast.toast(response.msg, {
                variant: 'danger',
                toaster: 'b-toaster-top-full',
                autoHideDelay: 3000,
              })
            }
          })
          .catch((e) => {
            this.data = [];
            this.page.currunt = 1
            this.page.totalPages = 0;
            this.loading = false;
          });
      },

      prevPage() {
        if (this.page.currunt > 1) {
          this.page.currunt--;
          // this.page.data = this.paginate(this.reportData)
        }
      },
      nextPage() {
        if (this.page.currunt < this.page.totalPages) {
          this.page.currunt++;
          // this.page.data = this.paginate(this.reportData)
        }
      },
      firstPage() {
        this.page.currunt = 1;
        // this.page.data = this.paginate(this.reportData)
      },
      lastPage() {
        this.page.currunt = this.page.totalPages;
        // this.page.data = this.paginate(this.reportData)
      },
      changePage(page) {
        this.page.currunt = page;
        // this.page.data = this.paginate(this.reportData)
      },
      changePerPage(event) {
        // console.log(event.target.value)
        // this.page.currunt = 1;
        this.page.totalPages = Math.ceil(this.data.length / this.page.perPage);
        if (this.page.currunt > this.page.totalPages) {
          this.page.currunt = 1
        }
      },
      paginate(array) {
        let curruntPage = this.page.currunt - 1; // because pages logically start with 1, but technically with 0
        return array.slice(
          curruntPage * this.page.perPage,
          (curruntPage + 1) * this.page.perPage
        );
      },
    },
  };
</script>