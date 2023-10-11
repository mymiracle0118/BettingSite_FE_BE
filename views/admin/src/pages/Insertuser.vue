<template>
  <div>
    <PageHeader :title="'Create Account'" :items="items" />
    <form
      @submit.prevent="insertuser('InserUserAccount')"
      data-vv-scope="InserUserAccount"
      method="post"
    >
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">General Information</h4>
              <div class="form-group">
                <label>User name:</label>
                <input
                  placeholder="User Name"
                  class="form-control animation"
                  v-model="user.username"
                  type="text"
                  v-validate="'required|min:4|max:15|alpha_num'"
                  name="username"
                  data-vv-as="User Name"
                  @keyup="checkUserName($event)"
                  autocomplete="new-password"
                  :class="[{ 'is-invalid' : (verrors.first('InserUserAccount.username') || isUserNameAvailable == 2) },{'is-valid':isUserNameAvailable == 1}]"
                />
                <small v-if="verrors.has('InserUserAccount.username')" class="error">
                  {{ verrors.first("InserUserAccount.username") }}
                </small>
              </div>
              <div class="form-group">
                <label>Full Name:</label>
                <input
                  placeholder="Full Name"
                  class="form-control animation"
                  v-model="user.fullname"
                  data-vv-as="Full Name"
                  type="text"
                  v-validate="'required|min:4|max:50'"
                  name="fullname"
                  :class="{ 'is-invalid' : verrors.first('InserUserAccount.fullname')}"
                />
                <small v-if="verrors.has('InserUserAccount.fullname')" class="error">
                  {{ verrors.first("InserUserAccount.fullname") }}
                </small>
              </div>
              <div class="form-group">
                <label>Password:</label>
                <input
                  placeholder="Password"
                  class="form-control animation"
                  v-model="user.password"
                  type="password"
                  data-vv-as="Password"
                  v-validate="'required|min:8|max:20|verify_password'"
                  name="password"
                  ref="password"
                  :class="{ 'is-invalid' : verrors.first('InserUserAccount.password')}"
                />
                <small v-if="verrors.has('InserUserAccount.password')" class="error">
                  {{ verrors.first("InserUserAccount.password") }}
                </small>
                <!-- <small>Alphanumeric with one uppercase</small> -->
              </div>
              <div class="form-group">
                <label>Confirm Password:</label>
                <input
                  placeholder="Confirm Password"
                  class="form-control animation"
                  v-model="user.cpassword"
                  type="password"
                  data-vv-as="Confirm Password"
                  v-validate="'required|confirmed:password'"
                  name="cpassword"
                  :class="{ 'is-invalid' : verrors.first('InserUserAccount.cpassword')}"
                />
                <small v-if="verrors.has('InserUserAccount.cpassword')" class="error">
                  {{ verrors.first("InserUserAccount.cpassword") }}
                </small>
                <!-- <small>Alphanumeric with one uppercase</small> -->
              </div>
              <div class="form-group">
                <label>City:</label>
                <input
                  placeholder="City"
                  class="form-control animation"
                  v-model="user.city"
                  type="text"
                  data-vv-as="City"
                  v-validate="'required|min:3|max:20'"
                  name="city"
                  :class="{ 'is-invalid' : verrors.first('InserUserAccount.city')}"
                />
                <small v-if="verrors.has('InserUserAccount.city')" class="error">
                  {{ verrors.first("InserUserAccount.city") }}
                </small>
              </div>
              <div class="form-group">
                <label>Mobile Number:</label>
                <input
                  placeholder="Mobile Number"
                  class="form-control animation"
                  v-model="user.mono"
                  type="text"
                  data-vv-as="Mobile Number"
                  v-validate="'required|numeric|min:10|max:15'"
                  name="mono"
                  maxlength="15"
                  :class="{ 'is-invalid' : verrors.first('InserUserAccount.mono')}"
                />
                <small v-if="verrors.has('InserUserAccount.mono')" class="error">
                  {{ verrors.first("InserUserAccount.mono") }}
                </small>
              </div>
              <!--  <div class="form-group">
                <label>Web domain:</label>
                  <input
                    placeholder="Web domain"
                    class="form-control animation"
                    v-model="user.domain"
                    type="text"
                    v-validate="'url'"
                    name="domain"
                    :class="{ 'is-invalid' : verrors.first('InserUserAccount.domain')}"
                  />
              </div>-->
              <!-- <div class="form-group">
                <label>Web Reference:</label>
                  <input
                    placeholder="Web Reference"
                    class="form-control animation"
                    v-model="user.webreff"
                    type="text"
                    name="webreff"
                    :class="{ 'is-invalid' : verrors.first('InserUserAccount.webreff')}"
                  />
              </div>-->
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
             <!--  <div class="form-group tag-select">
                <label>Panel Part:</label>
                <select
                  v-model="user.ppart"
                  name="ppart"
                  label="label"
                  class="form-control"
                  data-vv-as="Panel Part"
                  v-validate="'required'"
                  :class="{ 'is-invalid' : verrors.first('InserUserAccount.ppart')}"
                >
                  <option value>Select Panel Part</option>
                  <template v-for="value in ppartOptions">
                    <option :value="value.pnlid">{{ value.pnlname }}</option>
                  </template>
                </select>
                <small v-if="verrors.has('InserUserAccount.ppart')" class="error">
                  {{ verrors.first("InserUserAccount.ppart") }}
                </small>
              </div> -->
              <div class="form-group">
                <label>Credit Amount:</label>
                <input
                  placeholder="Credit Amount"
                  class="form-control"
                  v-model="user.camt"
                  type="number"
                  data-vv-as="Credit Amount"
                  v-validate="'max:20'"
                  name="camt"
                  :class="{ 'is-invalid' : verrors.first('InserUserAccount.camt')}"
                />
                <small v-if="verrors.has('InserUserAccount.camt')" class="error">
                  {{ verrors.first("InserUserAccount.camt") }}
                </small>
              </div>

              <div class="form-group tag-select" v-if="user.lvlno >= 3">
                <label>User Type:</label>
                <select
                  v-model="user.newlvlno"
                  name="newlvlno"
                  label="label"
                  class="form-control"
                  data-vv-as="User Type"
                  v-validate="'required'"
                  :class="{ 'is-invalid' : verrors.first('InserUserAccount.newlvlno')}"
                >
                  <option value="0">Select User Type</option>
                  <template v-for="(value, key) in lvlnoOptions">
                    <option :value="value.lvlno" :key="key">{{ value.lname }}</option>
                  </template>
                </select>
                <small v-if="verrors.has('InserUserAccount.newlvlno')" class="error">
                  {{ verrors.first("InserUserAccount.newlvlno") }}
                </small>
              </div>

              <template v-if="user.newlvlno != '7'">
                <h4 class="card-title">Partnership Information</h4>
                <div class="form-group tag-select" v-if="user.lvlno < 3">
                  <label>Partnership Type:</label>
                  <select
                    v-model="user.ptype"
                    name="ptype"
                    label="label"
                    class="form-control"
                    data-vv-as="Partnership Type"
                    v-validate="'required'"
                    @change="fillValue()"
                    :class="{ 'is-invalid' : verrors.first('InserUserAccount.ptype')}"
                  >
                    <option value>Select Partnership Type</option>
                    <template v-for="(value, key) in ptypeOpt">
                      <option :value="value.ptid" :key="key">{{ value.pname }}</option>
                    </template>
                  </select>
                  <small v-if="verrors.has('InserUserAccount.ptype')" class="error">
                    {{ verrors.first("InserUserAccount.ptype") }}
                  </small>
                </div>
                <div>
                  <!-- <h4 class="card-title">Partnership Value Information</h4> -->
                  <div class="form-group" v-if="user.ptype == 1">
                    <label>Partnership With Return:</label>
                    <input
                      placeholder="Partnership With Return"
                      class="form-control animation"
                      v-model.number="user.spart"
                      type="text"
                      name="spart"
                      data-vv-as="Partnership With Return"
                      v-validate="'required'"
                      @keypress="checkPtVal($event, 'spart')"
                      :readonly="user.ptype != 1"
                      :class="{ 'is-invalid' : verrors.first('InserUserAccount.spart')}"
                      maxlength="4"
                    />
                    <small v-if="verrors.has('InserUserAccount.spart')" class="error">
                      {{ verrors.first("InserUserAccount.spart") }}
                    </small>
                    <p class="help is-success m-0 d-inline-block">Our : {{ user.spart }} | Down Line: {{ parseFloat(ptUline - user.spart) }}</p>
                  </div>
                  <div class="form-group" v-if="user.ptype == 2">
                    <label>Partnership With No Return:</label>
                    <input
                      placeholder="Partnership With No Return"
                      class="form-control animation"
                      v-model.number="user.spart1"
                      type="text"
                      name="spart1"
                      @keypress="checkPtVal($event, 'spart1')"
                      data-vv-as="Partnership With No Return"
                      v-validate="'required'"
                      :readonly="user.ptype != 2"
                      maxlength="4"
                      :class="{ 'is-invalid' : verrors.first('InserUserAccount.spart1')}"
                    />
                    <small v-if="verrors.has('InserUserAccount.spart1')" class="error">
                      {{ verrors.first("InserUserAccount.spart1") }}
                    </small>
                    <p class="help is-success m-0 d-inline-block">Our : {{ user.spart1 }} | Down Line: {{ parseFloat(ptUline - user.spart1) }}</p>
                  </div>
                  <div class="form-group" v-if="user.ptype == 3">
                    <label>Points:</label>
                    <input
                      placeholder="Points"
                      class="form-control animation"
                      v-model="user.point"
                      type="text"
                      name="point"
                      v-validate="'required'"
                      data-vv-as="Points"
                      @keypress="checkPtVal($event, 'point')"
                      :readonly="user.ptype != 3"
                      maxlength="4"
                      :class="{ 'is-invalid' : verrors.first('InserUserAccount.point')}"
                    />
                    <small v-if="verrors.has('InserUserAccount.point')" class="error">
                      {{ verrors.first("InserUserAccount.point") }}
                    </small>
                    <p class="help is-success m-0 d-inline-block">Our : {{ user.point }} | Down Line: {{ parseFloat(ptUline - user.point) }}</p>
                  </div>
                  <div class="form-group" v-if="user.ptype == 4">
                    <label>Commission:</label>
                    <input
                      placeholder="commission"
                      class="form-control animation"
                      v-model="user.comm"
                      type="text"
                      name="comm"
                      v-validate="'required'"
                      @keypress="checkPtVal($event, 'comm')"
                      :readonly="user.ptype != 4"
                      max="1000"
                      :class="{ 'is-invalid' : verrors.first('InserUserAccount.comm')}"
                    />
                    <small v-if="verrors.has('InserUserAccount.comm')" class="error">
                      {{ verrors.first("InserUserAccount.comm") }}
                    </small>
                    <p class="help is-success m-0 d-inline-block">Our : {{ user.comm }} | Down Line: {{ parseFloat(ptUline - user.comm) }}</p>
                  </div>
                </div>

              </template>

              <div class="form-group">
                <label>Remark:</label>
                <textarea
                  placeholder="Remark"
                  class="form-control"
                  v-model="user.remark"
                  data-vv-as="Remark"
                  v-validate="'max:500'"
                  name="remark"
                  :class="{ 'is-invalid' : verrors.first('InserUserAccount.remark')}"
                />
                <small v-if="verrors.has('InserUserAccount.remark')" class="error">
                  {{ verrors.first("InserUserAccount.remark") }}
                </small>
              </div>

             
             
              <div class="form-group mb-3" v-if="user.newlvlno == '7'">
                 <b-form-checkbox v-model="user.plock" switch class="mb-2">Change Password Lock</b-form-checkbox>
              </div>
              
              <div class="d-flex justify-content-end align-items-center">
                <input
                  placeholder="Transaction Code"
                  class="form-control"
                  v-model="user.mpassword"
                  type="password"
                  v-validate="'required'"
                  name="mpassword"
                  :class="{ 'is-invalid' : verrors.first('InserUserAccount.mpassword')}"
                />
                <button type="submit" class="btn btn-primary ml-2" id="spinner-dark-8">
                  <i v-if="isLoading" class="icon-spinner11 spinner mr-2"></i>Submit
                </button>
              </div>
            </div>
          </div>
        </div>
       <!--  <div class="col-md-4">
          <div class="card"></div>
        </div> -->
      </div>
    </form>
  </div>
</template>
<script>
import ServiceApi from "@/services/ServiceApi";
import Multiselect from "vue-multiselect";
import PageHeader from "../components/page-header";
export default {
  components: {
    Multiselect,
    PageHeader,
  },
  mounted() {
    this.accountCreateLoadData();
  },
  data() {
    return {
      items: [
        {
          text: "Home",
          to: { name: "home" },
        },
        {
          text: "Users",
          to: { name: "users" },
        },
        {
          text: "Create Account",
          active: true,
        },
      ],
      user: {
        username: "",
        fullname: "",
        password: "",
        cpassword: "",
        city: "",
        mono: "",
        //domain: "",
        //webreff: "",
        mpassword: "",
        spart: "",
        point: "",
        spart1: "",
        comm: "",
        ptype: "",
        //ppart: "",
        newlvlno: 0,
        lvlno: "",
        camt: '',
        remark: '',
        plock: false
      },
      isCheckingUserName: false,
      isUserNameAvailable: 0, //1 for available, 2 for not available
      ptypeOpt: [],
      isLoading: false,
      ptypeData: [],
      ppartOptions: [],
      lvlnoOptions: [],
      ptUline: 0
    };
  },
  methods: {
    /* pTypeData(key) {
      return this.ptypeData.indexOf(key);
    },*/
    /*arrengePtypes(){
      this.ptypeData = []
      for (let i = 0; i < this.ptype.length; i++) {
        this.ptypeData.push(this.ptype[i].value)
      }
    },*/
    checkPtVal(evt, type){
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      }
      setTimeout(res => {
        if(type == 'spart'){
          if(this.user.spart > this.ptUline){
              this.user.spart = this.ptUline;
          }
        }else if(type == 'spart1'){
          if(this.user.spart1 > this.ptUline){
              this.user.spart1 = this.ptUline;
          }
        }else if(type == 'point'){
          if(this.user.point > this.ptUline){
              this.user.point = this.ptUline;
          }
        }else if(type == 'comm'){
          if(this.user.comm > this.ptUline){
              this.user.comm = this.ptUline;
          }
        }
      }, 300);
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    fillValue() {
      let ptval = 0;
      if (this.user.ptype == "1") {
        var index = _.findIndex(this.ptypeOpt, function (o) {
          return o.ptid == "1";
        });
        this.user.spart = this.ptypeOpt[index].ptval;
        this.ptUline = this.ptypeOpt[index].ptval;
      }
      if (this.user.ptype == "2") {
        var index = _.findIndex(this.ptypeOpt, function (o) {
          return o.ptid == "2";
        });
        this.user.spart1 = this.ptypeOpt[index].ptval;
        this.ptUline = this.ptypeOpt[index].ptval;
      }
      if (this.user.ptype == "3") {
        var index = _.findIndex(this.ptypeOpt, function (o) {
          return o.ptid == "3";
        });
        this.user.point = this.ptypeOpt[index].ptval;
        this.ptUline = this.ptypeOpt[index].ptval;
      }
      if (this.user.ptype == "4") {
        var index = _.findIndex(this.ptypeOpt, function (o) {
          return o.ptid == "4";
        });
        this.user.comm = this.ptypeOpt[index].ptval;
        this.ptUline = this.ptypeOpt[index].ptval;
      }
      
      
    },
    checkPartnershipValue() {
      if (this.user.ptype == "1") {
        var index = _.findIndex(this.ptypeOpt, function (o) {
          return o.ptid == "1";
        });
        return this.user.spart <= this.ptypeOpt[index].ptval;
      }
      if (this.user.ptype == "2") {
        var index = _.findIndex(this.ptypeOpt, function (o) {
          return o.ptid == "2";
        });
        return this.user.spart1 <= this.ptypeOpt[index].ptval;
      }
      if (this.user.ptype == "3") {
        var index = _.findIndex(this.ptypeOpt, function (o) {
          return o.ptid == "3";
        });
        return this.user.point > this.ptypeOpt[index].ptval;
      }
      if (this.user.ptype == "4") {
        var index = _.findIndex(this.ptypeOpt, function (o) {
          return o.ptid == "4";
        });
        return this.user.comm <= this.ptypeOpt[index].ptval;
      }
      return true;
    },
    resetUserValue() {
      this.user = {
        username: "",
        fullname: "",
        password: "",
        cpassword: "",
        city: "",
        mono: "",
        //domain: "",
        //webreff: "",
        mpassword: "",
        spart: "",
        point: "",
        spart1: "",
        comm: "",
        ptype: "",
        lvlno: "",
        camt: "",
        remark: ""
      };

      this.$validator.reset();
    },
    checkUserName(event) {
      if (this.user.username.length > 3) {
        this.isCheckingUserName = true;
        ServiceApi.callApi("checkun", { username: this.user.username })
          .then((response) => {
            this.isCheckingUserName = false;
            if (response.success) {
              this.isUserNameAvailable = 1;
            } else {
              this.isUserNameAvailable = 2;
            }
          })
          .catch((e) => {
            this.isCheckingUserName = false;
          });
      }
    },

    insertuser(scope) {
      this.$validator.validateAll(scope).then((valid) => {
        this.isLoading = true;
        this.$store.state.isLoading = true;
        if (this.checkPartnershipValue()) {
          if (valid) {
            this.user.camt = this.user.camt == "" ? 0 : parseFloat(this.user.camt)
            ServiceApi.callApi("insertuser", this.user)
              .then((response) => {
                this.$store.state.isLoading = false;
                this.isLoading = false;
                if (response.status == 200) {
                  this.$swal({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    //type: "success",
                    icon: "success",
                    text: response.msg,
                  });
                  this.resetUserValue();
                  this.$router.push({
                    name: "users",
                  });
                } else if (response.status == 405) {
                  this.$swal({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                   // type: "error",
                    icon: "error",
                    text: response.msg,
                  });
                } else {
                  this.$swal({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    //type: "error",
                    icon: "error",
                    text: response.msg,
                  });
                }
              })
              .catch((e) => {
                this.$store.state.isLoading = false;
                this.isLoading = false;
              });
          } else {
            this.$store.state.isLoading = false;
            this.isLoading = false;
          }
        } else {
          this.$store.state.isLoading = false;
          this.isLoading = false;
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            //type: "error",
            icon: "error",
            text: "error in partnership",
          });
        }
      });
    },

    accountCreateLoadData() {
      ServiceApi.callApi("acccreateload", {})
        .then((response) => {
          if (response.success) {
            this.ppartOptions = response.data.t3;
            this.ptypeOpt = response.data.t2;
            this.lvlnoOptions = response.data.t4;
            this.user.lvlno = response.data.t1[0].lvlno;
            if(this.user.lvlno >= 3){
              this.user.ptype = this.ptypeOpt[0].ptid;
              this.fillValue()
            }
          } else {
            this.ppartOptions = [];
            this.ptypeOpt = [];
            this.lvlnoOptions = [];
            this.user.lvlno = "";
          }
        })
        .catch((e) => {
          this.ppartOptions = [];
          this.ptypeOpt = [];
          this.lvlnoOptions = [];
          this.user.lvlno = "";
        });
    },
  },
  beforeDestroy() {},
};
</script>
