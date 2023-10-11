<template>
  <div v-if="isVisible" class="loader-section">
    <template v-if="loaderImg && loaderImg != ''">
      <img :src="getLoaderImg()" />
    </template>
    <template v-else>
      <!-- <div class="loader-section-icon"></div> -->
      <!-- <div class="lds-dual-ring"></div> -->
      <div class="lds-ripple"><div></div><div></div></div>
    </template>
  </div>
</template>

<script>
export default {
  name: "Loader",
  data(){
    return{
      loaderImg: ''
    }
  },
  props: {
    isVisible: { type: Boolean, required: true }
  },
  methods:{
    getLoaderImg(){
      if(LOADER_IMG && LOADER_IMG != ''){
        return `${BUCKET_PATH}sitethemes/${DOMAIN}/front/${LOADER_IMG}`
      }
    }
  }
};
</script>
<style scoped>
/* .lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} */
</style>