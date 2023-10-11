<template>
<div class="account-pages my-5 pt-5">
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="text-center mb-5">
          <h1 class="display-2 font-weight-medium">
          4<i class="bx bx-buoy bx-spin text-primary display-3"></i>3
          </h1>
          <h4 class="text-uppercase">You don't have permission to access this page</h4>
          <div class="mt-5 text-center">
            <a class="btn btn-primary" href="/admin/home">Back to Dashboard</a>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-8 col-xl-6">
        <div>
          <img src="/static/admin/assets/images/error-img.png" alt class="img-fluid" />
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
    export default {
        mounted() {
            if(!this.$auth.check()){ 
              this.$router.push({
                name: 'login'
              })
            }
        },
        data() {
            return {
               
            }
        },
        methods:{
          
        },
        components: {
            //
        },
        beforeDestroy() {
           
        }
    }
</script>
