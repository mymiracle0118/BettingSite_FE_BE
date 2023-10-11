<template>
  <div>
    <PageHeader :title="'Bank'" :items="items" />
    <div class="row bank-panel">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <form
              @submit.prevent="transferBalanceAll('transferAll')"
              data-vv-scope="transferAll"
              method="post"
            >
            <div class="report-form mb-1">
              <div class="row row5">
                
                <div class="col-12 text-right">
                  <div class="d-inline-block">
                    <downloadexcel
                      :fields="excelColumns"
                      :fetch="fetchExcelData"
                      type="csv"
                      :name="'bankuserlist.xls'"
                      class="d-inline-block"
                    >
                      <b-button class="mr-1" variant="success" type="button" :disabled="userList.length == 0">
                        <i class="fas fa-file-excel"></i>
                      </b-button>
                    </downloadexcel>
                    <b-button
                      variant="danger"
                      @click="exportPdf"
                      type="button"
                      :disabled="userList.length == 0"
                    >
                      <i class="fas fa-file-pdf"></i>
                    </b-button>
                  </div>

                  <div class="d-inline-block form-group form-group-feedback form-group-feedback-right">
                        
                        <input type="password" name="masterPassword" v-model="mpass" class="form-control" placeholder="Transaction Code" 
                        v-validate="'required|max:20'"
                        data-vv-as="Transaction Code"
                        :class="{ 'is-invalid' : verrors.first('transferAll.masterPassword')}"
                          >
                        <!-- <small v-if="verrors.has('transferAll.masterPassword')" class="error">
                          {{ verrors.first("transferAll.masterPassword") }}
                        </small> -->
                    </div>
                    <div class="d-inline-block">
                     
                    <button type="submit" class="btn btn-primary" id="transferSubmit">Transfer All</button>
                    </div>
                  </div>
                
              </div>
            </div>
            </form>
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
                responsive="sm"
                
                id="eventsListTbl"
                class="table no-footer table-hover"
                :fields="userstblfields"
                :items="userList"
                :filter="filter"
                @filtered="onFiltered"
              >
               <template v-slot:table-colgroup="scope">
                <col
                  v-for="field in scope.fields"
                  :key="field.key"
                  :style="{ width: getColWidth(field.key) }"
                >
              </template>
                <template v-slot:cell(uname)="data">
                 
                  <span class="text-ellipsis" :title="data.item.uname+' ('+data.item.fname+')'">{{data.item.uname}}</span>
                </template>
                <template v-slot:cell(crebal)="data">
                  <p  class="text-right mb-0" v-currencyint="data.item.crebal"></p>

                </template>
                <template v-slot:cell(subgen)="data">
                  <p class="text-right mb-0" v-currencyint="data.item.subgen"></p>
                </template>
                <template v-slot:cell(pl)="data">
                  <p class="text-right mb-0" v-currencyint="data.item.pl"></p>
                </template>
                <template v-slot:cell(expo)="data">
                  <p class="text-right mb-0" v-currencyint="data.item.expo"></p>
                </template>
                <template v-slot:cell(bal)="data">
                  <p class="text-right mb-0" v-currencyint="data.item.bal"></p>
                </template>
                <template v-slot:cell(action)="data">
                  <a href="javascript:void(0)" class="text-success" @click="setTransferAmount(data.index, data.item)">All <i class="fas fa-arrow-right"></i></a>
                  <input type="number" class="form-control form-control-sm transfer-amt" name="amount" v-model="data.item.amount" placeholder="0">
                  
                  <button class="btn btn-info btn-sm" @click="transferBalanceSingle(data.item.guid, data.item.amount)">Submit</button>
                </template>
                
                <template v-slot:cell(status)="data">
                  <span v-if="tranStatus[data.item.guid]" :class="{'text-success': tranStatus[data.item.guid].type == 'success', 'text-danger':tranStatus[data.item.guid].type == 'error'}">{{ tranStatus[data.item.guid].msg }}</span>
                </template>
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
            <!-- <div class="table-responsvie" >
                <table class="table table-bordered table-fixed" id="bankdatahtmladmin">
                    <thead>
                        <tr>
                            <th>UserName</th>
                            <th>Account Type</th>
                            <th>Credit</th>
                            <th>Balance</th>
                            <th>Client (P/L)</th>
                            <th>Exposure</th>
                            <th>Available Bal</th>
                            <th width="245"></th>
                            <th width="250">Status</th>
                        </tr>
                    </thead>
                    <tbody v-if="userList && accountType !==''">
                        <tr v-for="(user, key) in userList" :key="key">
                            <td>{{ user.uname}}</td>
                            <td> {{user.utype}}</td>
                            <td class="text-right" v-currency="user.crebal"></td>
                            <td class="text-right" v-currency="user.bal"></td>
                            <td class="text-right" v-currency="user.pl"></td>
                            <td class="text-right" v-currency="user.expo"></td>
                            <td class="text-right">
                              <span v-if="user.utype.toLowerCase() == 'user'" v-currency="parseFloat(user.bal - user.expo)"></span>
                              <span v-else>{{ user.bal }}</span>
                            </td>
                            <td class="text-center">
                                <a href="javascript:void(0)" class="text-success" @click="setTransferAmount(key, user)">All <i class="fas fa-arrow-right"></i></a>
                                <input type="text" class="form-control form-control-sm transfer-amt" name="amount" v-model="user.amount" placeholder="0">
                                
                                <button class="btn btn-info btn-sm" @click="transferBalanceSingle(user.guid, user.amount)">Submit</button>
                            </td>
                            <td class="bank-row-width">
                                <span v-if="tranStatus[user.guid]" :class="{'text-success': tranStatus[user.guid].type == 'success', 'text-danger':tranStatus[user.guid].type == 'error'}">{{ tranStatus[user.guid].msg }}</span>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="8" class="text-center">{{recordmsg}} </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div> -->
            
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
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  components: {
    PageHeader,
    downloadexcel,
  },
  mounted() {
    this.getBankUserList();
  },
  data() {
    return {
      mpass:'',
      items: [
        {
          text: "Home",
          to: { name: "home" },
        },
        {
          text: "Bank",
          active: true,
        },
      ],
      userList:[],
      recordmsg: '',
      accountType: '',
      tranStatus:{},
      transfer:0,
      transferList:[],
      bankColumns: {
          'UserName': 'uname',
          'Credit Reference': 'cref',
          'Pts': 'gen',
          'Client (P/L)': 'client',
          'Exposure' : 'exp',
          'Available Pts' : 'wgen'
      },
      userstblfields: [
        {
          key: "uname",
          label: "User Name",
          sortable: false,
        },
        {
          key: "crebal",
          label: "CR",
          sortable: false,
          thClass: 'text-right'
        },
        {
          key: "subgen",
          label: "Pts",
          sortable: false,
          thClass: 'text-right'
        },
        {
          key: "pl",
          label: "Client(P/L)",
          sortable: false,
          thClass: 'text-right'
        },
        {
          key: "expo",
          label: "Exposure",
          thClass: 'text-right'
        },
        {
          key: "bal",
          label: "Available Pts",
          thClass: 'text-right'
        },
        {
          key: "utype",
          label: "Account Type",
          sortable: false,
        },
        {
          key: "action",
          label: "Action",
        },
        {
          key: "status",
          label: "Status",
        },
      ],
      currentPage: 1,
      filter: null,
      perPage: 25,
      totalLength: 0,
      totalRows: 0,
      pageOptions: [25, 50, 100, 250, 500, 750, 1000],
      excelColumns:{
        "User Name": "uname",
        "CR": "crebal",
        "Pts": "subgen",
        "Client(P/L)": "pl",
        "Exposure": "expo",
        "Available Pts": "bal",
        "Account type": "utype",
      },
      pdfColumn: [
        { title: "User Name", dataKey: "uname" },
        { title: "CR", dataKey: "crebal" },
        { title: "Pts", dataKey: "subgen" },
        { title: "Client(P/L)", dataKey: "pl" },
        { title: "Exposure", dataKey: "expo" },
        { title: "Available Pts", dataKey: "bal" },
        { title: "Account type", dataKey: "utype" }
      ],
      transerAllFlag: false
    };
  },
  watch: {
    currentPage(newPage, oldPage) {
      this.getBankUserList(newPage);
      this.$emit("input", newPage);
    },
    perPage(newvalue, oldvalue) {
      this.$emit("input", newvalue);
      this.getBankUserList();
    },
  },
  computed: {
     
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async getExportData(){
      let exportData = [];
      await ServiceApi.callApi("bankuserlistpdf", {guid: ''})
      .then((response) => {
        this.$store.state.isLoading = false;
        if (response.success) {
          exportData = response.data;
          
        } else {
          console.log("ASdsad")
          this.$store.state.isLoading = false;
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            type: "error",
            text: response.msg,
          });
        }
      })
      .catch((e) => {
        console.log(e)
      });
      _.forEach(exportData, function (value, key) {
        exportData[key].uname = exportData[key].uname+" ("+exportData[key].fname+")"
        
      });
      return exportData;
    },
    fetchExcelData() {
      let exportData = [];
      this.$store.state.isLoading = true;
      exportData = this.getExportData();
      if (exportData.length !== 0) {
        return exportData;
      }else{
        return false;
      }
     
    },
    async exportPdf() {
      var self = this;
      let exportData = await self.getExportData();
      if (exportData.length !== 0) {  
        var doc = new jsPDF("l", "pt");
        doc.text("Bank User List", 400, 25);
        doc.autoTable(self.pdfColumn, exportData);
        doc.save("bankuserlist.pdf");
      }
    },
    getColWidth(key){
      if(key == 'action'){
        return '250px'
      }else if(key == 'uname'){
        return '200px'
      }else if(key == 'status'){
        return '200px'
      }else{
        return 'auto'
      }
    },
    getBankUserList(newPage = 1) {
      this.$store.state.isLoading = true;
      ServiceApi.callApi("bankuserlist", {pno:newPage,row:this.perPage})
        .then((response) => {
          this.$store.state.isLoading = false;
            let resData = '';
            if(response.status == 200){
              this.userList = response.data.t1;
              this.totalRows = response.data.t2.trow;
            }
            else{
                this.userList = null;
                 this.totalRows = 0
                //this.exceldata = this.userList
               // this.recordmsg = response.msg;
            }
        })
        .catch((e) => {
          this.$store.state.isLoading = false;
          this.userList = null;
           this.totalRows = 0;
        });
    },
    validateAmount(uid, amount) {
      return true;
      amount = parseFloat(amount);
      let userIndex = _.findIndex(this.userList, function (o) {
        return o.guid == uid;
      });
      if (amount === 0 || this.userList[userIndex].pl == 0) {
        return false;
      } 
      else if (
        (this.userList[userIndex].pl > 0 && amount > 0) ||
        (this.userList[userIndex].pl < 0 && amount < 0)
      ) {
        return false;
      } else if (
        this.userList[userIndex].pl > 0 &&
        amount < 0 &&
        amount * -1 <= this.userList[userIndex].pl
      ) {
        return true;
      } else if (
        this.userList[userIndex].pl < 0 &&
        amount > 0 &&
        amount * -1 >= this.userList[userIndex].pl
      ) {
        return true;
      } else {
        return false;
      }
    },
    transferBalanceSingle(uid, amount){
      
      Vue.set(this.tranStatus, uid, {'type':'','msg':''});
      Vue.set(this.tranStatus, uid, { type: "", msg: "" });
      if (this.validateAmount(uid, amount)) {
        if(this.mpass == ""){
          Vue.set(this.tranStatus, uid, {'type':'error','msg': "Please enter master password"});
          return;
        }
        if(amount == undefined || amount == ""){
          Vue.set(this.tranStatus, uid, {'type':'error','msg': "Please enter amount"});
          return;
        }
        if(this.$store.state.isLoading == true){
          return false;
        }
        this.$store.state.isLoading = true;
        let formdata = null;

        if(amount > 0){
            formdata = {"amt": parseFloat(amount), "guid":uid, "state":"deposite", "mpass": this.mpass};    
        }else{
            amount  = -1*amount;
            formdata = {"amt": parseFloat(amount), "guid":uid, "state":"withdraw", "mpass": this.mpass};
        }
        
        ServiceApi.callApi("bankdepowithdraw", formdata).then(response => {
            //this.$store.state.isLoading = false;
            setTimeout((res) => {
              this.$store.state.isLoading = false;
              this.istransfer = true;
              if (response.status == 200) {    
                  Vue.set(this.tranStatus, uid, {'type':'success','msg':response.msg});
                  this.getBankUserList(this.currentPage);
              } else{
                  Vue.set(this.tranStatus, uid, {'type':'error','msg':response.msg});
                  this.$store.state.isLoading = false;
              }
            }, 2500);
            

        }).catch(e => {
            this.$store.state.isLoading = false;
            this.istransfer = true;
            if (e.response.status == 422) {
              /*this.$swal({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                type: "error",
                text: response.msg,
              });*/
              Vue.set(this.tranStatus, uid, {'type':'error','msg':response.msg});
            } else {
                this.form_errors = [];
                
            }
            this.$store.state.isLoading = false;
        }).then(response => {
            this.istransfer = true;
          //  this.$store.state.isLoading = false;
        });
      } else {
        Vue.set(this.tranStatus, uid, {
          type: "error",
          msg: "Amount not valid",
        });
      }
    },
    async transferBalanceSingle1(uid, amount){
      Vue.set(this.tranStatus, uid, { type: "", msg: "" });
      if (this.validateAmount(uid, amount)) {
        if(this.mpass == ""){
          Vue.set(this.tranStatus, uid, {'type':'error','msg': "Please enter master password"});
          return;
        }
        if(amount == undefined || amount == ""){
          Vue.set(this.tranStatus, uid, {'type':'error','msg': "Please enter amount"});
          return;
        }
        let formdata = null;
        if(amount > 0){
            formdata = {"amt": parseFloat(amount), "guid":uid, "state":"deposite", "mpass": this.mpass};    
        }else{
            amount  = -1*amount;
            formdata = {"amt": parseFloat(amount), "guid":uid, "state":"withdraw", "mpass": this.mpass};
        }
        
        await ServiceApi.callApi("bankdepowithdraw", formdata).then(response => {
          if (response.status == 200) {    
              Vue.set(this.tranStatus, uid, {'type':'success','msg':response.msg});
              this.getBankUserList(this.currentPage);
          } else{
              Vue.set(this.tranStatus, uid, {'type':'error','msg':response.msg});
          }
        }).catch(e => {
            if (e.response.status == 422) {
              Vue.set(this.tranStatus, uid, {'type':'error','msg':response.msg});
            } else {
                this.form_errors = [];   
            }
        }).then(response => {
        });
      } else {
        Vue.set(this.tranStatus, uid, {
          type: "error",
          msg: "Amount not valid",
        });
      }
      await new Promise(resolve => setTimeout(resolve, 2500));

      return this.tranStatus;
    },
    transferBalanceAll(scope){ 
      if(this.transerAllFlag == true){
        return false
      }
      this.transerAllFlag = true
      this.$validator.validateAll(scope).then((valid) => {
        if (valid) {
          var self = this;
          let list=[];
          this.userList.forEach(function (value, key) {
              if(value.amount != "" && value.amount != 0 && value.amount){
                  // new code
                  list.push({
                      'guid': value.guid,
                      'amount': value.amount
                  });
                  // end new
                  // self.transferBalanceSingle(value.uid, value.amount);
              }
              
          });
          this.transferList = list;
          this.transfer = 0;
          let length = list.length;
          if(list.length == 0){
            this.$swal({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              type: "error",
              text: "Please enter amount",
            });
            return;
          }
          this.transferallaccount()
        }
      });  
    },
    async transferallaccount(){
        let response = ""
        if(this.transfer < this.transferList.length ){
            this.$store.state.isLoading = true;
            //setTimeout(res => {
                // if(this.istransfer == true){
                    var self = this;
                    response = await self.transferBalanceSingle1(self.transferList[self.transfer].guid, self.transferList[self.transfer].amount);
                    //self.istransfer = false;
                    self.transfer = self.transfer+1;
                    self.transferallaccount()
                // }
           // }, 2500);
        }
        else{
          this.$store.state.isLoading = false;
          this.transerAllFlag = false
           // this.mpass = '';
        }
    },
    /*resetBalanceAll(uid, transferStatus){
        this.userList.forEach(function (value, key) {
            if(value.uid == uid){
                value.transt = transferStatus    
            }
            value.amount = '';
        });
    },*/
    setTransferAmount(key, data){
      data.amount = parseFloat(-1*(data.pl)).toFixed(2);
      _.forEach(this.userList, (o,key1) => {
          if(o.guid == data.guid){
            o.amount = parseFloat(-1*(data.pl)).toFixed(2);
            Vue.set(this.userList, key1, o);
          }
      });
    }
  },
};
</script>
