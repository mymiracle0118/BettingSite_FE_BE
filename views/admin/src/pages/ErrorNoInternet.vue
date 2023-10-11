<template>
    <div class="no-internet container" >
      <div class="align-items-center d-flex" style="height:100vh">
        <div class="w-100 text-center">
            <!-- <div class="text-center">
              <img src="/static/admin/img/no-internet.png" alt class="img-fluid" />
            </div> -->
            <!-- <h1 class="display-2 font-weight-medium">
              N<i class="bx bx-buoy bx-spin text-primary display-3"></i> Internet C<i class="bx bx-buoy bx-spin text-primary display-3"></i>nnection 
            </h1> -->
            <h3 class=" mt-5">No Internet! <br>Please check your internet connection and try again</h3>
            <div class="mt-5 text-center">
              <a class="btn btn-primary btn-rounded waves-effect waves-light" href="/admin">Retry</a>
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
<style>
.no-internet .btn-primary{
  width:150px;
}
</style>