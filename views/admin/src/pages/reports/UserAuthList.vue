<template>
  <div>
    <PageHeader :title="'User Authentication'" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-md-12 ">
                <div class="d-inline-block">                  
                  <downloadexcel
                    :class="{'disabled':reportData.length == 0}"
                    :fetch="fetchExcelData"
                    :fields="listColumns"
                    type="csv"
                    :name="'casinoresults.xls'"
                    class="d-inline-block"
                  >
                    <b-button class="mr-1" variant="success" type="button" :disabled="reportData.length == 0">
                      <i class="fas fa-file-excel"></i>
                    </b-button>
                  </downloadexcel>
                  <b-button
                    variant="danger"
                    @click="exportPdf"
                    type="button"
                    :disabled="reportData.length == 0"
                  >
                    <i class="fas fa-file-pdf"></i>
                  </b-button>
                </div>
              </div>
            </div>
            
            <div class="row">
              <div class="col-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select v-model="perPage" :options="pageOptions" size="sm"></b-form-select>&nbsp;entries
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-6 text-right">
                <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                  <label class="d-inline-flex align-items-center">
                  
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Search..."
                      class="form-control form-control-sm ml-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table
                show-empty
                bordered
                fixed
                responsive="sm"
                id="eventsListTbl"
                class="table no-footer table-hover"
                :fields="reportFields"
                :items="reportData"
                :filter="filter"
                @filtered="onFiltered"
                :current-page="currentPage"
                :per-page="perPage"
              >
               
               
              </b-table>
            </div>
            <div class="row pt-3">
              <div class="col">
                <div class="dataTables_paginate paging_simple_numbers float-right">
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <b-pagination
                      align="right"
                      :total-rows="totalRows"
                      :per-page="perPage"
                      v-model="currentPage"
                      class="dataTables_paginate paging_simple_numbers my-0"
                    />
                  </ul>
                </div>
              </div>
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
import downloadexcel from "vue-json-excel";
import moment from "moment-timezone";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  components: {
    PageHeader,
    downloadexcel
  },
  mounted() {
    this.getUserAuthList();
  },
  data() {
    return {
      reportData: [],
      items: [
        {
          text: "Home",
          to: { name: "home" },
        },
        {
          text: "User Authentication",
          active: true,
        },
      ],
      reportFields: [
        {
          key: "uname",
          label: "Username",
          sortable: true,
        },
        {
          key: "auth",
          label: "Authentication",
          sortable: true,
        }
      ],
      listColumns: {
        "Username": "uname",
        "Authentication": "auth"
      },
      pdfColumn: [
        { title: "Username", dataKey: "uname" },
        { title: "Authentication", dataKey: "auth" }
      ],
      currentPage: 1,
      filter: null,
      perPage: 25,
      totalLength: 0,
      totalRows: 0,
      pageOptions: [25, 50, 75, 100, 125, 150],
      
    };
  },
  watch: {
  },
  computed: {
  },
  methods: {
    async fetchExcelData() {
      const response = _.cloneDeep(this.reportData); 
      return response;
    },
    exportPdf() {
      var self = this;
      if (self.reportData.length !== 0) {
        var doc = new jsPDF("l", "pt");
        doc.text("Casino Result Report", 380, 25);
        doc.autoTable(self.pdfColumn, self.reportData);
        doc.save("casinoresults.pdf");
      }
    },
    getUserAuthList() {
      this.$store.state.isLoading = true;
      ServiceApi.callApi("report/userauthlist", {})
        .then((response) => {
          this.$store.state.isLoading = false;
          if (response.status == 200) {
            this.reportData = response.data;
            this.totalRows = this.reportData.length;
          } else {
            this.reportData = [];
            this.totalRows = 0;
          }
        })
        .catch((e) => {
          this.$store.state.isLoading = false;
          this.reportData = [];
          this.totalRows = 0;
        });
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    
  },
};
</script>
