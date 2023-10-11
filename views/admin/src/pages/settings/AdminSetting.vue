<template>
  <div>
    <PageHeader :title="'Admin Settings'" :items="items" />
    
    <form method="post" @submit.prevent="submitForm('adminSetting')" data-vv-scope="adminSetting">
      <div class="create-account-form">
          <div>
              
              <div class="row pt-2">
                  <div class="col-md-3 form-group pt-2 mb-4">
                      <!-- <label>Button 1</label> -->
                      <b-form-checkbox name="plist" v-model="formData.button1.show">First Button <br><small>Show in Hompage, in side of Login Button</small></b-form-checkbox>
                  </div>
                  <template v-if="formData.button1.show">
                  <div class="col-md-2 form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" v-model="formData.button1.title" name="button1title" placeholder="Title"
                    v-validate="'required'"
                    :class="{ 'is-invalid' : verrors.first('adminSetting.button1title')}">
                  </div>
                  <div class="col-md-3 form-group">
                    <label>Target Link</label>
                    <input type="text" class="form-control" v-model="formData.button1.link" name="button1link"  placeholder="Target Link" v-validate="'required|url'"
                    :class="{ 'is-invalid' : verrors.first('adminSetting.button1link')}">
                  </div>
                  <div class="col-md-2 form-group">
                    <label>Button Background</label>
                    <colorpicker
                    ref="button1color"
                    :color="formData.button1.color"
                    v-model="formData.button1.color"
                  />
                  </div>
                  <div class="col-md-2 form-group">
                    <label>Font Color</label>
                    <select class="form-control" name="button1fontcolor" v-model="formData.button1.fontcolor" v-validate="'required'" :class="{ 'is-invalid' : verrors.first('adminSetting.button1fontcolor')}">
                        <option value="">Select Font Color</option>
                        <option value="#ffffff">White</option>
                        <option value="#000000">Black</option>
                    </select>
                  </div>
                  </template>
              </div>
              <div class="row pt-2">
                  <div class="col-md-3 form-group pt-2 mb-4">
                      <b-form-checkbox name="plist" v-model="formData.button2.show" >Second Button <br><small>Show in Header, after user logged in</small></b-form-checkbox>
                  </div>
                  <template v-if="formData.button2.show">
                  <div class="col-md-2 form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" v-model="formData.button2.title" name="button2title" placeholder="Title" v-validate="'required'"
                    :class="{ 'is-invalid' : verrors.first('adminSetting.button2title')}">
                  </div>
                  <div class="col-md-3 form-group">
                    <label>Target Link</label>
                    <input type="text" class="form-control" v-model="formData.button2.link" name="button2link"  placeholder="Target Link" v-validate="'required|url'"
                    :class="{ 'is-invalid' : verrors.first('adminSetting.button2link')}">
                  </div>
                  <div class="col-md-2 form-group">
                    <label>Button Background</label>
                    <colorpicker
                    ref="button2color"
                    :color="formData.button2.color"
                    v-model="formData.button2.color"
                  />
                  </div>
                  <div class="col-md-2 form-group">
                    <label>Font Color</label>
                    <select class="form-control" name="button2fontcolor" v-model="formData.button2.fontcolor" v-validate="'required'" :class="{ 'is-invalid' : verrors.first('adminSetting.button2fontcolor')}">
                        <option value="">Select Font Color</option>
                        <option value="#ffffff">White</option>
                        <option value="#000000">Black</option>
                    </select>
                  </div>
                  </template>
              </div>
              <div class="row pt-1">
                  <div class="col-md-3 form-group pt-2 mb-4">
                      <b-form-checkbox name="plist" v-model="formData.button3.show" >Third Button <br><small>Show in Header, after user logged in</small></b-form-checkbox>
                  </div>
                  <template v-if="formData.button3.show">
                  <div class="col-md-2 form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" v-model="formData.button3.title" name="button3title" placeholder="Title" v-validate="'required'"
                    :class="{ 'is-invalid' : verrors.first('adminSetting.button3title')}">
                  </div>
                  <div class="col-md-3 form-group">
                    <label>Target Link</label>
                    <input type="text" class="form-control" v-model="formData.button3.link" name="button3link"  placeholder="Target Link" v-validate="'required|url'"
                    :class="{ 'is-invalid' : verrors.first('adminSetting.button3link')}">
                  </div>
                  <div class="col-md-2 form-group">
                    <label>Button Background</label>
                    <colorpicker
                    ref="button3color"
                    :color="formData.button3.color"
                    v-model="formData.button3.color"
                  />

                  </div>
                  <div class="col-md-2 form-group">
                    <label>Font Color</label>
                    <select class="form-control" name="button3fontcolor" v-model="formData.button3.fontcolor" v-validate="'required'" :class="{ 'is-invalid' : verrors.first('adminSetting.button3fontcolor')}">
                        <option value="">Select Font Color</option>
                        <option value="#ffffff">White</option>
                        <option value="#000000">Black</option>
                    </select>
                  </div>
                  </template>
              </div>
              <div class="form-group row">
                <div class="col-12">
                  <button type="submit" class="btn btn-primary">
                    submit
                    <i class="fas fa-sign-in-alt ml-1"></i>
                  </button>
                </div>
              </div>
          </div>
         
      </div>
    </form>
  </div>
</template>
<script>
import ServiceApi from "@/services/ServiceApi";
import Multiselect from "vue-multiselect";
import PageHeader from "@/components/page-header";
import colorpicker from "@/components/color-picker";
export default {
  components: {
    Multiselect,
    PageHeader,
    colorpicker
  },
  mounted() {
    this.getAdminSetting();
    //this.getCasinoList();
  },
  data() {
    return {
      items: [
        {
          text: "Home",
          to: { name: "home" },
        },
        {
          text: "Admin Settings",
          active: true,
        },
      ],
      formData:{
        button1: {
          show: false,
          title: "",
          link: "",
          color: "#000000",
          fontcolor: "#ffffff"
        },
        button2: {
          show: false,
          title: "",
          link: "",
          color: "#000000",
          fontcolor: "#ffffff"
        },
        button3: {
          show: false,
          title: "",
          link: "",
          color: "#000000",
          fontcolor: "#ffffff"
        }
      }
    };
  },
  computed: {},
  methods: {
    submitForm(scope) {
      this.$validator.validateAll(scope).then((valid) => {
        if (valid){
          this.$store.state.isLoading = true;

          /*if(this.formData.button1.color == ""){
            this.formData.button1.color = "#23292E"
          }
          if(this.formData.button2.color == ""){
            this.formData.button2.color = "#23292E"
          }
          if(this.formData.button3.color == ""){
            this.formData.button3.color = "#23292E"
          }*/

          ServiceApi.callApi("adminsetting/update", this.formData)
          .then((response) => {
            this.$store.state.isLoading = false;
            if (response.status == 200) {
              this.$swal("", response.msg, "success");
              this.getAdminSetting();
            } else {
              this.$swal("", response.msg, "error");
            }
          })
          .catch((e) => {
            this.$store.state.isLoading = false;
            this.casinoList = [];
          });
        }
      });
    },
    getAdminSetting(){
      this.$store.state.isLoading = true;
      ServiceApi.callApi("adminsetting/get", {})
      .then((response) => {
        this.$store.state.isLoading = false;
        if (response.status == 200) {
          this.formData = response.data
        } 
      })
      .catch((e) => {
        this.$store.state.isLoading = false;
        this.casinoList = [];
      });
    }
  },
  beforeDestroy() {},
};
</script>
