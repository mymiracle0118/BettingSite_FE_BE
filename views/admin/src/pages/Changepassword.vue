<template>
  <div class="row justify-content-center">
    <div class="col-6">
      <div class="card">
        <div class="card-body">
          <form
            @submit.prevent="doChangePassword('ChangePassword')"
            data-vv-scope="ChangePassword"
            method="post"
          >
            <div class="form-group">
              <div class="form-group-feedback form-group-feedback-right">
                <input
                  placeholder="Password"
                  class="form-control"
                  v-model="user.password"
                  type="password"
                  v-validate="'required|min:8|verify_password'"
                  name="password"
                  ref="password"
                  :class="{ 'border-danger' : verrors.first('ChangePassword.password')}"
                />
                <div
                  v-if="verrors.first('ChangePassword.password') && verrors.first('ChangePassword.password') != ''"
                  class="form-control-feedback text-danger"
                >
                  <i class="icon-cancel-circle2"></i>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group-feedback form-group-feedback-right">
                <input
                  placeholder="Confirm Password"
                  class="form-control"
                  v-model="user.cpassword"
                  data-vv-as="password"
                  type="password"
                  v-validate="'required|confirmed:password'"
                  name="cpassword"
                  :class="{ 'border-danger' : verrors.first('ChangePassword.cpassword')}"
                />
                <div
                  v-if="verrors.first('ChangePassword.cpassword') && verrors.first('ChangePassword.cpassword') != ''"
                  class="form-control-feedback text-danger"
                >
                  <i class="icon-cancel-circle2"></i>
                </div>
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-block" type="submit">
                Change Password
                <i class="fas fa-chevron-circle-right ml-2"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";
export default {
  mounted() {
  },
  data() {
    return {
      user: {
        password: "",
        cpassword: "",
        uname: ''
      },
      isLoading: false
    };
  },
  methods: {
    resetUserValue() {
      this.user = {
        password: "",
        cpassword: "",
        uname: this.$store.state.user.uname
      };
      this.$validator.reset();
    },
    doChangePassword(scope) {
      this.$validator.validateAll(scope).then(valid => {
        this.isLoading = true;
        this.user.uname = this.$store.state.user.uname
        ServiceApi.callApi("ocp", this.user)
          .then(response => {
            this.isLoading = false;
            if (response.status == 200) {
              this.$swal({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                icon: "success",
                text: response.msg
              });
              this.resetUserValue();
              var self = this;
              setTimeout(function() {
                self.$ls.remove("token");
                self.$ls.remove("user");
                self.$auth.logout();
                self.$router.push({
                  name: "login"
                });
              }, 3000);
            } else if (response.status == 405) {
              this.$swal({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                icon: "error",
                text: response.msg
              });
            } else {
              this.$swal({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                icon: "error",
                text: response.msg
              });
            }
          })
          .catch(e => {
            this.isLoading = false;
          });
      });
    }
  },
  beforeDestroy() {}
};
</script>

<style>
</style>