<template>
  <div>
    <PageHeader :title="'Multi Login Account'" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body create-account-container">
            <form method="post" @submit.prevent="submitForm('userInsert')" data-vv-scope="userInsert">
              <div class="create-account-form">
                  <div>
                      <h5 class="mb-0">Personal Information</h5>
                      <div class="row">
                          <div class="col-md-3 form-group">
                              <label>Client ID</label>
                              <input :readonly="formData.guid != ''" type="text" name="uname" class="form-control" v-model="formData.uname"  v-validate="'required|min:4|max:20|alpha_num'" :class="[{ 'is-invalid' : (verrors.first('userInsert.uname') || isUserNameAvailable == 2) },{'is-valid':isUserNameAvailable == 1}]" @keyup="checkUserName($event)" data-vv-as="Client ID"> 
                              <small v-if="verrors.has('userInsert.uname')" class="error">
                                {{ verrors.first("userInsert.uname") }}
                              </small>
                          </div>
                          <div class="col-md-3 form-group">
                              <label>Full Name</label>
                              <input type="text" class="form-control" v-model="formData.fullname" v-validate="'required|min:4|max:50'" name="fullname" :class="{ 'is-invalid' : verrors.first('userInsert.fullname')}" data-vv-as="Full Name">
                              <small v-if="verrors.has('userInsert.fullname')" class="error">
                                {{ verrors.first("userInsert.fullname") }}
                              </small>
                          </div>
                          <div class="col-md-3 form-group" v-if="formData.guid == ''">
                              <label>Password</label>
                              <input type="password" class="form-control"  
                              v-model="formData.pass" 
                              data-vv-as="Password"
                              v-validate="'required|min:8|max:20|verify_password'"
                              name="password"
                              ref="password"
                              :class="{ 'is-invalid' : verrors.first('userInsert.password')}">
                              <small v-if="verrors.has('userInsert.password')" class="error">
                                {{ verrors.first("userInsert.password") }}
                              </small>
                          </div>
                          <div class="col-md-3 form-group"  v-if="formData.guid == ''">
                              <label>Confirm Password</label>
                              <input type="password" name="" class="form-control"  
                              v-model="formData.cpass"
                              data-vv-as="Confirm Password"
                              v-validate="'required|confirmed:password'"
                              name="cpass"
                              :class="{ 'is-invalid' : verrors.first('userInsert.cpass')}"
                              >
                              <small v-if="verrors.has('userInsert.cpass')" class="error">
                                {{ verrors.first("userInsert.cpass") }}
                              </small>
                          </div>
                      </div>
                  </div>
                  <div class="mt-2 previlages" v-if="perList && perList.length >0">
                      <h5 class="mb-0">Privileges</h5>
                      <div class="previlage-box">
                        <div class="previlage-item">
                          <div>
                              <b-form-checkbox name="plist" v-model="checkAll" @change="checkAllList($event)">All</b-form-checkbox>
                          </div>
                        </div>
                          <br>
                          <div class="previlage-item" v-for="(data, key) in perList">
                              <div>
                                  <b-form-checkbox name="plist" data-vv-as="Privileges" :value="data.pid" v-model="formData.plist" v-validate="'required'" :class="{ 'is-invalid' : verrors.first('userInsert.plist')}">{{ data.pname }}</b-form-checkbox>
                              </div>
                          </div>
                      </div>
                      <small v-if="verrors.has('userInsert.plist')" class="error">
                        {{ verrors.first("userInsert.plist") }}
                      </small>
                      <div class="previlage-master mt-2">
                          <div class="form-group mb-0">
                              
                              <!-- <label>Transaction Code</label> -->
                              <input type="password" name="mpass" class="form-control mpass-text" v-model="formData.mpass"  :class="{ 'is-invalid' : verrors.first('userInsert.mpass')}" v-validate="'required'" placeholder="Transaction Code">
                              <!-- <small v-if="verrors.has('userInsert.mpass')" class="error">
                                {{ verrors.first("userInsert.mpass") }}
                              </small> -->
                             
                              <button class="btn btn-success" type="submit">Submit</button>
                              <button type="button" class="btn btn-light" id="reset" @click="resetFormData()">Reset</button>
                          </div>
                      </div>
                  </div>
              </div>
            </form>
            <div class="outer mt-4">
                <div class="inner">
                    
                      <table class="table table-bordered">
                        <tbody><tr>
                            <th class="fixed-col-1">Action</th>
                            <th class="fixed-col-2">Username</th>
                            <th class="fixed-col-3">Full Name</th>
                            <th v-for="(data, key) in perList">{{ data.pname }}</th>
                            
                        </tr>
                        <tr  v-for="(user, key) in userList">
                            <td class="fixed-col-1">
                                <a href="javascript:void(0)" class="text-white btn btn-primary" @click="editPermission(user.guid)">U</a>
                                <a href="javascript:void(0)" class="text-white btn btn-info" @click="showUserStatusForm(user.guid)">S</a>
                                <a href="javascript:void(0)" class="text-white btn btn-success" @click="showChangePasswordForm(user.guid)">P</a>
                            </td>
                            <td class="fixed-col-2">{{ user.uname }} 
                              <i v-if="user.isact == true" class="text-success fas fa-check pl-2"></i> 
                              <i v-else class="text-light fas fa-check  pl-2"></i>
                            </td>
                            <td class="fixed-col-3">{{ user.fname }}</td>
                            <td class="text-center" v-for="(data, key) in perList">
                                  <i v-if="checkPermission(user.pid, data.pid)" class="fas fa-check-circle"></i>
                                  <i v-else class="far fa-circle"></i>
                            </td>      
                        </tr>
                      </tbody>
                  </table>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal ref="status-modal" hide-footer size="md" title="Change User Status">
       <form
          @submit.prevent="updateUserStatus('UserLock')"
          data-vv-scope="UserLock"
          method="post"
        >
          <div class="form-group row">
            <label class="col-form-label col-4">User lock</label>
            <b-form-checkbox v-model="statusFormData.isact" switch class="mb-1"></b-form-checkbox>
          </div>
          <div class="form-group row">
            <label class="col-form-label col-4">Transaction Code</label>
            <div class="col-8 form-group-feedback-right pl-0">
              <input
                placeholder="Transaction Code"
                class="form-control"
                v-model="statusFormData.mpass"
                type="password"
                name="UserLockMpassword"
                v-validate="'required'"
                :class="{ 'is-invalid' : verrors.first('UserLock.UserLockMpassword')}"
              />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-12 text-right">
              <button type="submit" class="btn btn-primary">
                submit
                <i class="fas fa-sign-in-alt ml-1"></i>
              </button>
            </div>
          </div>
        </form>
    </b-modal>
    <b-modal ref="cp-modal" hide-footer size="md" title="Change Password">
      <form
        @submit.prevent="changePassword('cpass')"
        data-vv-scope="cpass"
        method="post"
      >
        <div class="form-group row">
          <label class="col-form-label col-4">Password</label>
          <div class="col-8 form-group-feedback form-group-feedback-right">
            <input
              placeholder="Password"
              class="form-control"
              v-model="cpass.password"
              type="password"
              name="cppassword"
              v-validate="'required|min:8|verify_password'"
              data-vv-as="Password"
              ref="password"
              :class="{ 'is-invalid' : verrors.first('cpass.cppassword')}"
            />
            <small v-if="verrors.has('cpass.cppassword')" class="error">
              {{ verrors.first("cpass.cppassword") }}
            </small>
            <!-- <small>Alphanumeric with one uppercase</small> -->
          </div>
        </div>
        <div class="form-group row">
          <label class="col-form-label col-4">Confirm Password</label>
          <div class="col-8 form-group-feedback form-group-feedback-right">
            <input
              placeholder="Confirm Password"
              class="form-control"
              v-model="cpass.cpassword"
              type="password"
              name="cpcpassword"
              v-validate="'required|min:8|confirmed:password'"
              data-vv-as="Confirm Password"
              :class="{ 'is-invalid' : verrors.first('cpass.cpcpassword')}"
            />
            <small v-if="verrors.has('cpass.cpcpassword')" class="error">
              {{ verrors.first("cpass.cpcpassword") }}
            </small>
            <!-- <small>Alphanumeric with one uppercase</small> -->
          </div>
        </div>
        <div class="form-group row">
          <label class="col-form-label col-4">Transaction Code</label>
          <div class="col-8 form-group-feedback form-group-feedback-right">
            <input
              placeholder="Transaction Code"
              class="form-control"
              v-model="cpass.mpassword"
              type="password"
              name="cpmpassword"
              v-validate="'required'"
              data-vv-as="Transaction Code"
              :class="{ 'is-invalid' : verrors.first('cpass.cpmpassword')}"
            />
            <small v-if="verrors.has('cpass.cpmpassword')" class="error">
              {{ verrors.first("cpass.cpmpassword") }}
            </small>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12 text-right">
            <button type="submit" class="btn btn-primary">
              submit
              <i class="fas fa-sign-in-alt ml-1"></i>
            </button>
          </div>
        </div>
      </form>

       
    </b-modal>
  </div>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";
import PageHeader from "@/components/page-header";
import DatePicker from 'vue2-datepicker'
import downloadexcel from "vue-json-excel";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import CasinoResult from '@/components/casino/results/CasinoResults'
import AccountStatementSoda from '@/components/AccountStatementSoda'

export default {
  components: {
    PageHeader,
    downloadexcel,
    DatePicker,
    CasinoResult,
    AccountStatementSoda
  },
  mounted() {
    
    this.getPermissionList();
    this.getUserList();
  },
  data() {
    return {
      userList: [],
      items: [
        {
          text: "Home",
          to: { name: "home" },
        },
        {
          text: "Multi Login Account",
          active: true,
        },
      ],
      formData: {
        guid: "",
        uname: "",
        fullname: "",
        pass: "",
        cpass: "",
        plist: [],
        mpass: ""
      },
      statusFormData: {
        guid: "",
        isact: false,
        mpass: ""
      },
      perList: [],
      isUserNameAvailable: 0,
      cpass: {
        password: "",
        cpassword: "",
        mpassword: "",
        guid: ""
      },
      checkAll: false
    };
  },
  watch: {
  },
  computed: {
  },
  methods: {
    checkPermission(permissions, per){
      let perList = permissions.split(",")
      if(perList.includes(per.toString())){
        return true
      }else{
        return false
      }
    },
    checkAllList(event){
      let self = this
      if(event == true){
        this.perList.forEach(function(item){
            self.formData.plist.push(item.pid)
        })
      }else{
        this.formData.plist = []
      }
    },
    getPermissionList() {
      ServiceApi.callApi("user/perlist", {})
        .then((response) => {
          if (response.status == 200) {
            this.perList = response.data;
          } else {
            this.perList = [];
          }
        })
        .catch((e) => {
          this.perList = [];
        });
    },
    checkUserName(event) {
      if (this.formData.uname.length > 3) {
        ServiceApi.callApi("checkun", { username: this.formData.uname })
          .then((response) => {
            if (response.success) {
              this.isUserNameAvailable = 1;
            } else {
              this.isUserNameAvailable = 2;
            }
          })
          .catch((e) => {
          });
      }
    },
    editPermission(guid){
      this.$store.state.isLoading = true;
      ServiceApi.callApi("user/editper", { guid: guid })
      .then((response) => {
        if (response.success) {
            this.formData = {
                guid: response.data[0].guid,
                uname: response.data[0].uname,
                fullname: response.data[0].fname,
                pass: "",
                cpass: "",
                plist: response.data[0].pid.split(","),
                mpass: ""
              }
              this.checkAll = false
              window.scrollTo(0,0);
        } else {
          this.$swal("", response.msg, "error");
        }
        this.$store.state.isLoading = false;
      })
      .catch((e) => {
        this.resetFormData();
        this.$store.state.isLoading = false;
      });
    },
    submitForm(scope) {
      this.$validator.validateAll(scope).then((valid) => {
        //console.log(valid)
        if(this.formData.guid != ''){
          if (valid) {
            this.updatePermission()
          }else{
            this.$swal("", "Please fill required fields", "error");
          }
        }else{
          if (valid && this.isUserNameAvailable == 1) {
            this.insertPermission()
          }else{
            this.$swal("", "Please fill required fields", "error");
          }
        }
      });
    },
    insertPermission(){
      this.$store.state.isLoading = true;
      ServiceApi.callApi("user/insertperuser", this.formData)
      .then((response) => {
        this.$store.state.isLoading = false;
        if (response.status == 200) {
          this.resetFormData();
          this.getUserList();
          this.$swal("", response.msg, "success");
          
        } else {
          this.$swal("", response.msg, "error");
        }
      })
      .catch((e) => {
          this.$swal("", "Error in response. Please try again", "error");
          this.$store.state.isLoading = false;
      });
    },
    updatePermission(){
        this.$store.state.isLoading = true;
        ServiceApi.callApi("user/updateper", this.formData)
        .then((response) => {
          this.$store.state.isLoading = false;
          if (response.status == 200) {
            this.resetFormData();
            this.getUserList();
            this.$swal("", response.msg, "success");
            
          } else {
            this.$swal("", response.msg, "error");
          }
        })
        .catch((e) => {
            this.$swal("", "Error in response. Please try again", "error");
            this.$store.state.isLoading = false;
        });
    },
    resetFormData(){
      this.formData = {
        guid: "",
        uname: "",
        fullname: "",
        pass: "",
        cpass: "",
        plist: [],
        mpass: ""
      }
      this.isUserNameAvailable = 0;
      this.checkAll = false
      this.$validator.reset();
    },
    getUserList() {
      //this.$store.state.isLoading = true;
      ServiceApi.callApi("user/peruserlist", {})
      .then((response) => {
        this.$store.state.isLoading = false;
        if (response.status == 200) {
          this.userList = response.data;
        } else {
          this.userList = [];
        }
      })
      .catch((e) => {
        this.$store.state.isLoading = false;
        this.userList = [];
      });
    },
    hideModal(ref) {
      this.$refs[ref].hide();
    },
    showUserStatusForm(guid){
      this.$store.state.isLoading = true;
      ServiceApi.callApi("user/editper", { guid: guid })
      .then((response) => {
        if (response.success) {
          this.statusFormData = {
            guid: response.data[0].guid,
            isact: response.data[0].isact,
            mpass: ""
          }
          this.$refs["status-modal"].show();
        } else {
          this.$swal("", response.msg, "error");
        }
        this.$store.state.isLoading = false;
      })
      .catch((e) => {
        this.resetStatusFormData();
        this.$store.state.isLoading = false;
      });
    },
    resetStatusFormData(){
      this.statusFormData = {
        guid: "",
        isact: false,
        mpass: ""
      }
    },
    updateUserStatus(scope) {
      this.$validator.validateAll(scope).then((valid) => {
        if (valid) {
          this.$store.state.isLoading = true;
          ServiceApi.callApi("user/updateperstatus", this.statusFormData)
            .then((response) => {
              if (response.success) {
                this.hideModal("status-modal");
                this.$swal("", response.msg, "success");
                this.resetStatusFormData();
                this.getUserList();
              } else {
                this.$swal("", response.msg, "error");
              }
              this.$store.state.isLoading = false;
            })
            .catch((e) => {
              this.$store.state.isLoading = false;
            });
        }
      });
    },
    showChangePasswordForm(guid){
      this.resetChangePassForm();
      this.cpass.guid = guid;
      this.$refs["cp-modal"].show();
    },
    changePassword(scope) {
      this.$validator.validateAll(scope).then((valid) => {
        if (valid) {
          ServiceApi.callApi("user/perchangepass", this.cpass)
            .then((response) => {
              if (response.success) {
                this.resetChangePassForm();
                this.$swal("", response.msg, "success");
                this.hideModal("cp-modal");
              } else {
                this.$swal("", response.msg, "error");
              }
            })
            .catch((e) => {

            });
        }
      });
    },
    resetChangePassForm(){
      this.cpass = {
        password: "",
        cpassword: "",
        mpassword: "",
        guid: ""
      };
      this.$validator.reset();
    }
  },
};
</script>
