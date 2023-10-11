<template>
  <div class="container-fluid row align-items-center login-bg">
    <!-- <div class="col-4 login-bg">
      <div class="login-text-box">
        <img :src="logoPath" alt class="logo-img" height="60" />
        <div class="mt-2">Welcome to World777 Admin Panel</div>
      </div>
      <div class="login-bottom-text">
        © 2020 World777
      </div>
    </div> -->
    <div class="col-12">
      <div class="row justify-content-center">
        <div class="col-md-12" style="max-width:450px">
          <div class="card overflow-hidden">
            <img :src="logoPath" alt class="logo-img" height="60" />
            <div class="card-body">
              <template v-if="isLogin">
                <h3 class="text-center mt-2 mb-0">Welcome to Admin Panel</h3>
                <p class="text-center text-secondary">Enter your Username and Password</p>
              </template>
              <template v-else>
                <h3 class="text-center mt-2 text-uppercase">Change Password</h3>
              </template>
              <b-alert v-model="isAuthError" variant="danger" class="mt-3" dismissible>{{authError}}</b-alert>

              <b-form
                autocomplete="off"
                @submit.prevent="login"
                class="p-2 mt-4"
                :action="submitUrl"
                method="POST"
                v-if="isLogin"
              >
                <slot />
                <b-form-group id="input-group-1" label="" label-for="input-1">
                  <b-form-input
                    id="input-1"
                    name="username"
                    v-model="user.username"
                    type="text"
                    placeholder="Enter Username"
                    v-validate="'required'"
                    class="form-control-lg"
                  ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="" label-for="input-2">
                  <b-form-input
                    id="input-2"
                    v-model="user.password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    v-validate="'required'"
                    class="form-control-lg"
                  ></b-form-input>
                </b-form-group>
                <div class="mt-3">
                  <b-button type="submit" class="btn-block btn-theme1 btn-lg btn-submit">Sign In</b-button>
                </div>
              </b-form>

              <form class="change-form p-2" @submit.prevent="updatePassword('form-changepassword')" data-vv-scope="form-changepassword" v-if="!isLogin" key="2">
                <div class="form-group">
                  <label class="user-email-text">Old Password</label>
                  <input type="password" v-model="changePassword.password" v-validate="'required'" name="OldPassword" class="form-control">
                  <span v-if="verrors.has('form-changepassword.OldPassword')" class="error">
                      {{ verrors.first('form-changepassword.OldPassword') }}
                  </span>
                </div>
                <div class="form-group">
                  <label class="user-email-text">New Password</label>
                  <input type="password" v-model="changePassword.newPassword" v-validate="'required|verify_password|min:8|max:20'" 
                    name="NewPassword" ref="NewPassword" class="form-control">
                  <span v-if="verrors.has('form-changepassword.NewPassword')" class="error">
                      {{ verrors.first('form-changepassword.NewPassword') }}
                  </span>
                </div>
                <div class="form-group">
                  <label class="user-email-text">Confirm Password</label>
                  <input type="password" v-model="changePassword.newPasswordConfirm" v-validate="'required|confirmed:NewPassword|verify_password|min:8|max:20'" 
                    name="ConfirmNewPassword" data-vv-as="NewPassword" class="form-control">
                  <span v-if="verrors.has('form-changepassword.ConfirmNewPassword')" class="error">
                      {{ verrors.first('form-changepassword.ConfirmNewPassword') }}
                  </span>
                </div>
                <div class="form-group mb-0">
                  <button class="btn btn-primary btn-block btn-lg" type="submit">Change Password</button>
                </div>
              </form>

            </div>
            <div class="copyright-text">
              © 2020 World777
            </div>
            <!-- end card-body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->
      </div>
    </div>
  </div>
</template>
<script>
import ServiceApi from "@/services/ServiceApi";
import crypto from '@/crypto';
export default {
  beforeMount() {
    if(this.$auth.check()){ 
      this.$router.push({
        name: 'home'
      })
    }
    $("body").addClass("login");
  },
  beforeDestroy(){
    $("body").removeClass("login");
  },
  mounted() {
    //
  },
  data() {
    return {
      logoPath: LOGO_PATH,
      user: {
        username: "",
        password: ""
      },
      submitted: false,
      has_error: false,
      errors: {},
      error: "",
      authError: "",
      isAuthError: false,
      submitUrl: "",
      imgPath: IMG_PATH,
      isLogin: true,
      changePassword: {
        password: '',
        newPassword: '',
        newPasswordConfirm: '',
        uname: ''
      },
      isMobileDevice: IS_MOBILE_DEVICE
    };
  },
  methods: {
    updatePassword(scope) {
      if (this.loading)
        return
      this.$validator.validateAll(scope).then(valid => {
        if (valid) {
          this.loading = true
          this.changePassword.uname = this.user.username
          ServiceApi.callApi("ocp", this.changePassword)
            .then(response => {
              if (response.status == 200) {
                this.$swal({
                  icon: "success",
                  text: response.msg
                });
                this.isLogin = true
                this.loading = false
              } else {
                this.$swal({
                  icon: "error",
                  text: response.msg
                });
                this.loading = false
              }
            })
            .catch(e => {
              if (e.response) {
                if (e.response.status == 405) {
                  this.$swal({
                    icon: "success",
                    text: e.response.data.msg
                  });
                  
                }
              }
              this.loading = false
            });
        }
      })

    },
    
    login() {
      if (this.submitted) {
        return;
      }
      this.has_error = false;
      this.errors = {};
      this.error = "";

      this.submitted = true;

      this.$validator.validateAll().then(result => {
        if (result) {
          let params = ENC_RESPONSE == true ? {
              data: _0x895125e(this.user, require("crypto-js"))
            } : this.user

          this.$auth.login({
            data: params,
            success: function(res) {
              this.submitted =  false;
             // let response = res.data;
              let response = ENC_RESPONSE == true ? _0x895125d(res.data.data, require("crypto-js")) : res
                  .data

              if (response.status == 200) {
                this.$store.state.rdisplay = response.data.rdisplay;
                
                this.$store.commit('updatePermission', response.data.pcode);

                if (response.data.login) {
                  this.$ls.set("admin_user", JSON.stringify(response.data));
                  this.$auth.token(null, response.data.token, false);

                  this.$store.state.WMSG = response.msg;

                  this.$router.push({
                    name: "home" 
                  });
                } else {
                  this.isLogin = response.data.login
                  this.user.password = ""
                  this.$swal({
                    icon: "success",
                    text: "Welcome, You are logged in first time. Please change your password to continue."
                  });
                  //console.log(response.data.login)
                }
              } else {
                this.$swal({
                  icon: "error",
                  text: response.msg
                });
                //  this.flash("Login failed! Please try again!", 'error',{timeout: 5000});
              }
            },
            error: function(res) {
              this.submitted = false;
              this.has_error = true;
              //console.log(res.response.status);
              if (res.response.status == 405) {
                this.errors = res.response.data.errors || {};
              } else {
                this.error = res.response.data.msg;
              }
              this.resetUserValue();
            },
            rememberMe: false,
            fetchUser: false
          });
        } else {
          this.submitted = false;
          return;
        }
      });
    },
    resetUserValue() {
      this.user.password = "";
      this.user.username = "";
      this.$validator.reset();
    }
  }
};
</script>

<style scoped>
.page-content {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.content-wrapper {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex: 1;
  flex: 1;
  overflow: auto;
}

.content {
  padding: 1.25rem 1.25rem;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

</style>
