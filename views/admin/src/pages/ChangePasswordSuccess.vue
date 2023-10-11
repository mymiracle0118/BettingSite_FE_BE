<template>
  <div class="cp-success-box">
    <div class="text-center container">
        <h1><span class="text-success">Success! Your password has been updated successfully.</span></h1> 
        <h1>Your transaction password is <span class="text-info token-box">{{ transactionToken }}</span>. </h1>
        <h2>Please remember this transaction password, from now on all transcation of the website can be done only with this password and keep one thing in mind, do not share this password with anyone.</h2>
        <h2 class="mt-3 text-dark">Thank you, Team {{ domain }}</h2>
        
        <div class="font-hindi">
            <h1 class="mt-5"><span class="text-success">Success! आपका पासवर्ड बदला जा चुका है।</span></h1> 
            <h1>आपका लेनदेन पासवर्ड <span class="text-info token-box">{{ transactionToken }}</span> है।</h1>
            <h2>कृपया इस लेन-देन के पासवर्ड को याद रखें, अब से वेबसाइट के सभी हस्तांतरण केवल इस पासवर्ड से किए जा सकते हैं और एक बात का ध्यान रखें, इस पासवर्ड को किसी के साथ साझा न करें।</h2>
            <h2 class="mt-3 text-dark">धन्यवाद, टीम {{ domain }}</h2>
        </div>
        <router-link class="btn btn-dark btn-lg mt-5" :to="{ name: 'login'}" style="min-width: 200px"><i class="fas fa-arrow-left mr-3"></i>Back</router-link>
<!-- 
        <a href="/admin" class="btn btn-dark btn-lg mt-5" style="min-width: 200px"><i class="fas fa-arrow-left mr-3"></i>Back</a> -->
    </div>
  </div>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";
export default {
  mounted() {
    this.transactionToken = this.$route.params.token
  },
  data() {
    return {
      isLoading: false,
      transactionToken: "",
      domain: DOMAIN
    };
  },
  methods: {
    
  },
  beforeDestroy() {}
};
</script>

<style>
</style>