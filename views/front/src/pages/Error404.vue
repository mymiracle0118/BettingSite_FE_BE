<script>
  export default {
    mounted() {
      if (!this.$auth.check()) {
        this.$router.push({
          name: 'login'
        })
      }
    },
    data() {
      return {
        imgPath: IMG_PATH,
      }
    },
  }
</script>
<template>
  <div class="error-page report-box">
    <img :src="imgPath + 'front/img/icon-404.svg'">
    <div class="error-name">Page Not Found</div>
    <div class="back-to-main-page">
      <router-link :to="{name: 'home'}">
        <button class="btn btn-primary">Back to the main page</button>
      </router-link>
    </div>
  </div>
</template>