<template>
  <div class="report-box withdraw-request">
    <div class="report-title">
      <div class="report-name">Withdraw Request</div>
    </div>

    <ValidationObserver tag="div" ref="wdrFrm" class="report-form" v-slot="{ invalid }">
      <ValidationProvider name="Amount" tag="div" class="form-group pr mb-4" v-slot="{ errors }"
        :rules="{required: true, numeric: true, regex: /^[0-9]+$/}">
        <label>Amount</label>
        <input type="text" v-model.number="params.amt" placeholder="Amount" class="form-control"
          onkeypress='return event.charCode >= 48 && event.charCode <= 57' />
        <span v-if="errors[0]" class="error">
          {{ errors[0] }}
        </span>
      </ValidationProvider>
      <ValidationProvider name="Account Number" tag="div" class="form-group pr mb-4" v-slot="{ errors }"
        :rules="{ required: true }">
        <label>Account Number</label>
        <input type="text" v-model="params.anumber" placeholder="Account Number" class="form-control" />
        <span v-if="errors[0]" class="error">
          {{ errors[0] }}
        </span>
      </ValidationProvider>
      <ValidationProvider name="Account Name" tag="div" class="form-group pr mb-4" v-slot="{ errors }"
        :rules="{ required: true }">
        <label>Account Name</label>
        <input type="text" v-model="params.aname" placeholder="Account Name" class="form-control" />
        <span v-if="errors[0]" class="error">
          {{ errors[0] }}
        </span>
      </ValidationProvider>
      <ValidationProvider name="Bank Name" tag="div" class="form-group pr mb-4" v-slot="{ errors }"
        :rules="{ required: true }">
        <label>Bank Name</label>
        <input type="text" v-model="params.bname" placeholder="Back Name" class="form-control" />
        <span v-if="errors[0]" class="error">
          {{ errors[0] }}
        </span>
      </ValidationProvider>
      <ValidationProvider name="IFSC" tag="div" class="form-group pr mb-4" v-slot="{ errors }"
        :rules="{ required: true }">
        <label>IFSC</label>
        <input type="text" v-model="params.ifsc" placeholder="IFSC Code" class="form-control" />
        <span v-if="errors[0]" class="error">
          {{ errors[0] }}
        </span>
      </ValidationProvider>
      <ValidationProvider name="Account Type" tag="div" class="form-group pr mb-4" v-slot="{ errors }"
        :rules="{ required: true }">
        <label>Account Type</label>
        <select class="form-control" v-model.number="params.atype">
          <option value="savings">Savings</option>
          <option value="current">Current</option>
        </select>
        <span v-if="errors[0]" class="error">
          {{ errors[0] }}
        </span>
      </ValidationProvider>
      <div class="form-group pr mb-4">
        <label class="d-block">&nbsp;</label>
        <button class="btn btn-primary" @click="addWIthdrawRequest()" :disabled="invalid">Submit</button>
      </div>
    </ValidationObserver>

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
    </div>
    <div class="report-table ac-statement table-responsive" :class="{ 'loader-section-parent': loading }">
      <Loader :isVisible="loading"></Loader>
      <table class="table table-hover">
        <thead>
          <tr>
            <th class="">
              <div>Account Number</div>
            </th>
            <th class="">
              <div>Account Name</div>
            </th>
            <th class="text-right">
              <div>Amount</div>
            </th>
            <th class="">
              <div>Bank Name</div>
            </th>
            <th class="">
              <div>IFSC Code</div>
            </th>
            <th class="">
              <div>Account Type</div>
            </th>
            <th class="">
              <div>Date</div>
            </th>
            <th class="">
              <div>Remark</div>
            </th>
            <th class="">
              <div>Status</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="reportData && reportData.length">
            <template v-for="(ac, key) in reportData">
              <tr :key="key">
                <td class="">
                  <div>{{ ac.anumber }}</div>
                </td>
                <td class="">
                  <div>{{ ac.aname }}</div>
                </td>
                <td class="text-right">
                  <div>{{ ac.amt }}</div>
                </td>
                <td class="">
                  <div>{{ ac.bname }}</div>
                </td>
                <td class="">
                  <div>{{ ac.ifsc }}</div>
                </td>
                <td class="">
                  <div>{{ ac.atype }}</div>
                </td>
                <td class="">
                  <div>{{ changeDateFormat(ac.edt) }}</div>
                </td>
                <td class="">
                  <div>{{ ac.rmk }}</div>
                </td>
                <td class="">
                  <div v-if="ac.rstatus == 0">
                    Pending
                  </div>
                  <div v-else>
                    Processed
                  </div>
                </td>
              </tr>
            </template>
          </template>
          <template v-else>
            <tr class="no-record">
              <td colspan="9">No records found</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <paginate v-if="page.totalPages > 0" v-model="page.currunt" :pageCount="page.totalPages" :clickHandler="changePage"
      :prevText="'<'" :nextText="'>'" :container-class="'pagination justify-content-center mt-2'"
      :page-class="'page-item'" :page-link-class="'page-link'" :prev-class="'page-item'" :prev-link-class="'page-link'"
      :next-class="'page-item'" :next-link-class="'page-link'" :first-last-button="true" :first-button-text="'<<'"
      :last-button-text="'>>'">
    </paginate>
  </div>
</template>

<script>
  import jsPDF from "jspdf";
  import ServiceApi from "@/services/ServiceApi";
  import "jspdf-autotable";
  import JsonExcel from "vue-json-excel";
  import moment from "moment-timezone";
  // moment.tz.setDefault("Asia/Calcutta");
  import Loader from "@/components/loader";

  export default {
    components: {
      JsonExcel,
      Loader,
    },
    mounted() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    data() {
      return {
        fields: [{
            label: "Account Number",
            key: "anumber",
          },
          {
            label: "Account Name",
            key: "aname",
          },
          {
            label: "Bank Name",
            key: "bname",
          },
          {
            label: "IFSC Code",
            key: "ifsc",
          },
          {
            label: "Account Type",
            key: "atype",
          },
          {
            label: "Remark",
            key: "rem",
          },
          {
            label: "Status",
            key: "status",
          },
        ],
        imgPath: IMG_PATH,
        params: {
          atype: "savings",
          bname: "",
          ifsc: "",
          aname: "",
          anumber: "",
          amt: "",
          uname: this.$store.getters.user.uname,
        },
        searchText: "",
        page: {
          perPage: 25,
          currunt: 1,
          totalPages: 0,
        },
        perPage: [10, 25, 50, 100, 200, 300, 400, 500],
        data: [],
        loading: false,
      };
    },
    computed: {
      reportData() {
        this.page.totalPages = Math.ceil(this.data.length / this.page.perPage);
        if (this.page.currunt > this.page.totalPages) {
          this.page.currunt = 1
        }
        return this.paginate(this.data)
      },
    },
    mounted() {
      this.getRequest();
    },
    methods: {
      changeDateFormat(date) {
        return moment(String(date), 'MM-DD-YYYY hh:mm:ss A').format('DD/MM/YYYY HH:mm:ss')
      },
      getRequest() {
        this.loading = true;
        ServiceApi.callApi("api/front/get-withdraw-request", this.params)
          .then((response) => {
            if (response.status == 200) {
              this.data = response.data;
              this.page.totalPages = Math.ceil(this.data.length / this.page.perPage);
              if (this.page.currunt > this.page.totalPages) {
                this.page.currunt = 1;
              }
              this.loading = false;
            } else {
              this.data = [];
              this.page.currunt = 1;
              this.page.totalPages = 0;
              this.loading = false;
            }
          })
          .catch((e) => {
            this.data = [];
            this.page.currunt = 1;
            this.page.totalPages = 0;
            this.loading = false;
          });
      },
      addWIthdrawRequest(scope) {
        ServiceApi.callApi("api/front/withdraw-request", this.params)
          .then((response) => {
            if (response.status == 200) {
              this.getRequest();
              this.params = {
                atype: "savings",
                bname: "",
                ifsc: "",
                aname: "",
                anumber: "",
                amt: "",
                uname: this.$store.getters.user.uname,
              };
              this.$bvToast.toast(response.msg, {
                variant: "success",
                toaster: "b-toaster-top-full",
                autoHideDelay: 3000,
              });
              this.$refs.wdrFrm.reset();

            } else {
              this.$bvToast.toast(response.msg, {
                variant: "danger",
                toaster: "b-toaster-top-full",
                autoHideDelay: 3000,
              });
            }
          })
          .catch((e) => {
            this.$bvToast.toast(e, {
              variant: "danger",
              toaster: "b-toaster-top-full",
              autoHideDelay: 3000,
            });
          });
      },
      changePage(page) {
        this.page.currunt = page
      },
      changePerPage(event) {
        this.page.totalPages = Math.ceil(this.data.length / this.page.perPage);
        if (this.page.currunt > this.page.totalPages) {
          this.page.currunt = 1
        }
      },
      paginate(array) {
        let curruntPage = this.page.currunt - 1 // because pages logically start with 1, but technically with 0
        return array.slice(curruntPage * this.page.perPage, (curruntPage + 1) * this.page.perPage);
      },
    },
  };
</script>