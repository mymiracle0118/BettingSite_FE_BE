<template>
<div>
  <PageHeader :title="'Party Win Loss'" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="false" data-vv-scope="InserUserAccount" method="post">
              <div class="row row5">
                
                <div class="form-group col-md-3">
                  <b-form-select v-model="pty.utype" :options="usertype" class></b-form-select>
                </div>
                <div class="form-group col-md-9">
                  <b-button variant="primary" type="button" @click="getHistory">Load</b-button>
                  <button type="button" class="btn btn-light" id="reset" @click="resetReportForm()">Reset</button>
                  <downloadexcel
                  :class="{'disabled':profitLoss.length == 0}"
                  :fetch="fetchData"
                  :fields="listColumns"
                  type="xls"
                  name="partyWinLoss.xls"
                  class="d-inline-block"
                  >
                  <b-button variant="success" type="button" :disabled="profitLoss.length == 0">
                  <i class="fas fa-file-excel"></i>
                  </b-button>
                  </downloadexcel>
                  <b-button
                  variant="danger"
                  @click="exportPdf"
                  type="button"
                  :disabled="profitLoss.length == 0"
                  >
                  <i class="fas fa-file-pdf"></i>
                  </b-button>
                </div>
              </div>
            </form>
         
            
            <div class="row">
             
              <div class="col-sm-12 col-md-12">
                <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                  <label class="d-inline-flex align-items-center">
                    Search:
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Search..."
                      class="form-control form-control-sm ml-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
            </div>
            <div class="table-responsive mb-0">
              <b-table
                show-empty
                bordered
                
                foot-clone
                id="plTbl"
                class="table no-footer table-hover"
                :fields="partyWinLossFields"
                :items="profitLoss"
                :filter="filter"
                @filtered="onFiltered"
              >
                <template v-slot:cell(index)="data">{{
                  (currentPage - 1) * perPage + (data.index + 1)
                }}</template>
                <template v-slot:cell(cbal)="data">
                  <p class="mb-0" v-currency="data.item.cbal"></p>
                </template>
                <template v-slot:cell(sbal)="data">
                  <p class="mb-0" v-currency="data.item.sbal"></p>
                </template>
                <template v-slot:cell(bal)="data">
                  <p class="mb-0" v-currency="data.item.bal"></p>
                </template>
                <template v-slot:cell(tpbal)="data">
                  <p class="mb-0" v-currency="data.item.tpbal"></p>
                </template>
                <template v-slot:cell(pl)="data">
                  <p
                    class="mb-0"
                    v-currency="data.item.cbal + data.item.sbal + data.item.tpbal"
                  ></p>
                </template>
                <template v-slot:cell(total)="data">
                  <p
                    class="mb-0"
                    :class="[
                      {
                        'text-success':
                          data.item.cbal +
                            data.item.sbal +
                            data.item.bal +
                            data.item.tpbal >
                          0,
                      },
                      {
                        'text-danger':
                          data.item.cbal +
                            data.item.sbal +
                            data.item.bal +
                            data.item.tpbal <
                          0,
                      },
                    ]"
                    v-currency="
                      data.item.cbal + data.item.sbal + data.item.bal + data.item.tpbal
                    "
                  ></p>
                </template>
                <template v-slot:foot()="data">
                  <span v-if="data.column == 'index'"></span>
                  <span v-else-if="data.column == 'uname'"></span>
                  <span v-else-if="data.column == 'lvl'"></span>
                  <span
                    v-else-if="data.column == 'cbal'"
                    v-currency="totalBal.cbal"
                  ></span>
                  <span
                    v-else-if="data.column == 'sbal'"
                    v-currency="totalBal.sbal"
                  ></span>
                  <span
                    v-else-if="data.column == 'tpbal'"
                    v-currency="totalBal.tpbal"
                  ></span>
                  <span v-else-if="data.column == 'pl'" v-currency="totalBal.pl"></span>
                  <span v-else-if="data.column == 'ptype'"></span>
                </template>
              </b-table>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";
import PageHeader from "@/components/page-header";
import DatePicker from "vue2-datepicker";
import downloadexcel from "vue-json-excel";
import Multiselect from "vue-multiselect";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  components: {
    PageHeader,
    DatePicker,
    downloadexcel,
    Multiselect,
  },
  mounted() {},
  data() {
    return {
      fromto: [],
      profitLoss: [],
      type: "login",
      pty: {
        utype: "all",
      },
      usertype: [{"value":"all", "text": "All"}, {"value":"user", "text": "User"}],
      items: [
        {
          text: "Home",
          to: { name: "home" },
        },
        {
          text: "Profit Loss",
          active: true,
        },
      ],
      partyWinLossFields: [
        {
          key: "index",
          label: "No",
        },
        {
          key: "uname",
          label: "User Name",
        },
        {
          key: "lvl",
          label: "Level",
        },
        {
          key: "cbal",
          label: "Casino Pts",
          thClass: "text-right",
          tdClass: "text-right",
        },
        {
          key: "sbal",
          label: "Sport Pts",
          thClass: "text-right",
          tdClass: "text-right",
        },
        /*{
          key: "bal",
          label: "Pts",
          thClass: "text-right",
          tdClass: "text-right",
        },*/
        {
          key: "tpbal",
          label: "Third Party Pts",
          thClass: "text-right",
          tdClass: "text-right",
        },
        {
          key: "pl",
          label: "Profit/Loss",
          thClass: "text-right",
          tdClass: "text-right",
        },
        {
          key: "ptype",
          label: "Ptype",
          thClass: "text-left",
          tdClass: "text-left",
        },
        /*{
          key: "total",
          label: "Total",
          thClass: "text-right",
          tdClass: "text-right",
        },*/
      ],
      listColumns: {
        "No":'index',
        "User Name": "uname",
        Level: "lvl",
        "Casino Pts": "cbal",
        "Sport Pts": "sbal",
        //"Pts": "bal",
        "Third Party Pts": "tpbal",
        "Profit/Loss": "pl",
        "Ptype": "ptype"
        //"Total": "total",
      },
      pdfColumn: [
        { title: "No", dataKey: "index" },
        { title: "User Name", dataKey: "uname" },
        { title: "Level", dataKey: "lvl" },
        { title: "Casino Pts", dataKey: "cbal" },
        { title: "Sport Pts", dataKey: "sbal" },
        //{ title: "Pts", dataKey: "bal" },
        { title: "Third Party Pts", dataKey: "tpbal" },
        //{ title: "Total", dataKey: "total" },
        { title: "Profit/Loss", dataKey: "pl" },
        { title: "Ptype", dataKey: "ptype" }
      ],
      currentPage: 1,
      filter: null,
      perPage: 25,
      totalLength: 0,
      totalRows: 0,
      pageOptions: [25, 50, 75, 100, 125, 150],
      totalBal:{
        pl:0,
        cbal: 0,
        sbal: 0,
        tpbal: 0
      }
    };
  },
  watch: {},
  methods: {
    async exportPdf() {
      var self = this;
      var data = await this.preparedata();
      if (data.length !== 0) {
        var doc = new jsPDF("p", "pt");
        doc.text("Party Profit Loss", 220, 25);
        doc.autoTable(self.pdfColumn, data);
        // doc.autoTable({ html: "#lossTbl" });
        doc.save("Party Profit Loss.pdf");
      }
    },
    async fetchData() {
      const response = this.preparedata();
      return response;
    },
    resetReportForm(){
      this.pty.utype ="all"
      this.profitLoss = []
      this.currentPage = 1;
      this.totalRows = 0;
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      let self = this;
      this.totalBal = {
        pl: 0,
        cbal: 0,
        sbal: 0,
        tpbal: 0,
      };
      _.forEach(filteredItems, function (value) {
        self.totalBal.pl += value.cbal + value.sbal + value.tpbal;
        self.totalBal.cbal += value.cbal;
        self.totalBal.sbal += value.sbal;
        self.totalBal.tpbal += value.tpbal;
      });
      this.filtersprofitLoss = filteredItems
      this.currentPage = 1;
    },
    async preparedata() {
      var data = [];
      for (let index = 0; index < this.filtersprofitLoss.length; index++) {
        data.push({
          index: index + 1,
          uname: this.filtersprofitLoss[index].uname,
          lvl: this.filtersprofitLoss[index].lvl,
          cbal: this.$helpers.toCurrency(this.filtersprofitLoss[index].cbal),
          sbal: this.$helpers.toCurrency(this.filtersprofitLoss[index].sbal),
          //bal: parseFloat(this.filtersprofitLoss[index].bal).toFixed(2),
          tpbal: this.$helpers.toCurrency(this.filtersprofitLoss[index].tpbal),
          pl: this.$helpers.toCurrency(
            this.filtersprofitLoss[index].cbal +
              this.filtersprofitLoss[index].sbal +
              this.filtersprofitLoss[index].tpbal
          ),
          ptype: this.filtersprofitLoss[index].ptype,
          //total: parseFloat(this.profitLoss[index].cbal+this.profitLoss[index].sbal+this.profitLoss[index].bal+this.profitLoss[index].tpbal).toFixed(2),
        });
      }
      data.push({
        index: "",
        uname: "",
        lvl: "",
        pl: this.$helpers.toCurrency(this.totalBal.pl),
        cbal: this.$helpers.toCurrency(this.totalBal.cbal),
        sbal: this.$helpers.toCurrency(this.totalBal.sbal),
        tpbal: this.$helpers.toCurrency(this.totalBal.tpbal),
        ptype: "",
      });
      return data;
    },
    getHistory() {
      let self = this;
      if (this.fromto !== null) {
        this.totalBal = {
          pl:0,
          cbal: 0,
          sbal: 0,
          tpbal: 0
        }
        this.$store.state.isLoading = true;
        ServiceApi.callApi("report/profitloss", this.pty)
          .then((response) => {
            this.$store.state.isLoading = false;
            if (response.success) {

              this.profitLoss = response.data.t1;
              _.forEach(this.profitLoss, function (value) {
                  self.totalBal.pl += (value.cbal + value.sbal + value.tpbal)
                  self.totalBal.cbal += value.cbal
                  self.totalBal.sbal += value.sbal
                  self.totalBal.tpbal += value.tpbal
              });
              //console.log(this.totalBal)
              /*this.profitLoss.push({
                uname: "",
                lvl: "",
                pl: this.totalBal.pl,
                cbal: this.totalBal.cbal,
                sbal: this.totalBal.sbal,
                tpbal: this.totalBal.tpbal
              })*/
              this.filtersprofitLoss = this.profitLoss
              this.totalRows = this.profitLoss.length;
            } else {
              this.profitLoss = [];
              this.totalRows = 0;
            }
          })
          .catch((e) => {
            //console.log(e)
            this.$store.state.isLoading = false;
            this.profitLoss = [];
            this.totalRows = 0;
          });
      }
    },
  },
};
</script>
