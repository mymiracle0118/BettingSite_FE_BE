<template>
  <!-- start footer -->
  <footer class="footer">
    <div class="footer-logo">
      <!-- <img :src="imgPath + 'front/img/logo.png'"> -->
      <img :src="logoPath" />
    </div>
    <div class="footer-social d-none-desktop">
      <a :href="footerData.wp_link" target="_blank" v-if="footerData.wp_link">
        <img :src="imgPath + 'front/img/home-banners/social/whatsapp.png'" />
      </a>
      <a :href="footerData.fb_link" target="_blank" v-if="footerData.fb_link">
        <img :src="imgPath + 'front/img/home-banners/social/facebook.png'" />
      </a>
      <a :href="footerData.insta_link" target="_blank" v-if="footerData.insta_link">
        <img :src="imgPath + 'front/img/home-banners/social/instagram.png'" />
      </a>
      <a :href="footerData.tele_link" target="_blank" v-if="footerData.tele_link">
        <img :src="imgPath + 'front/img/home-banners/social/telegram.png'" />
      </a>
      <a :href="footerData.tw_link" target="_blank" v-if="footerData.tw_link">
        <img :src="imgPath + 'front/img/home-banners/social/twitter.png'" />
      </a>
      <a :href="footerData.youtube_link" target="_blank" v-if="footerData.youtube_link">
        <img :src="imgPath + 'front/img/home-banners/social/youtube.png'" />
      </a>
    </div>
    <div class="footer-box">
      <div class="footer-top">
        <span class="support" v-if="footerData.support_no">Support: {{ footerData.support_no }}</span>
        <div class="text-center d-block w-100 d-none-big">
          <a href="javascript:void(0)" v-b-modal.eighteenPlus>
            <img :src="imgPath + 'front/img/18plus.png'" />
          </a>
          <a href="https://www.gamcare.org.uk/" target="_blank">
            <img :src="imgPath + 'front/img/gamecare.png'" />
          </a>
          <a href="https://www.gamblingtherapy.org/en" target="_blank">
            <img :src="imgPath + 'front/img/gt.png'" />
          </a>
          <template v-if="!$store.getters.isTablet">
            <a href="javascript:void(0)" class="vm">
              <div class="d-inline-block vm" id="apg-750c6d2a-0352-4b88-aaa7-72085659af51"
                data-apg-seal-id="750c6d2a-0352-4b88-aaa7-72085659af51" data-apg-image-size="30"
                data-apg-image-type="basic-small" v-if="domain == 'wolf777.com'"></div>
              <div class="d-inline-block vm" id="apg-88d68be7-5ff9-4b1f-9dde-51c50279f0d4"
                data-apg-seal-id="88d68be7-5ff9-4b1f-9dde-51c50279f0d4" data-apg-image-size="30"
                data-apg-image-type="basic-small" v-if="domain == 'world777.com'"></div>
            </a>
          </template>
        </div>
        <div class="d-inline-block d-none-small">
          <a href="javascript:void(0)" v-b-modal.eighteenPlus>
            <img :src="imgPath + 'front/img/18plus.png'" />
          </a>
          <a href="https://www.gamcare.org.uk/" target="_blank">
            <img :src="imgPath + 'front/img/gamecare.png'" />
          </a>
          <a href="https://www.gamblingtherapy.org/en" target="_blank">
            <img :src="imgPath + 'front/img/gt.png'" />
          </a>
          <template v-if="$store.getters.isTablet">
            <a href="javascript:void(0)" class="vm">
              <div class="d-inline-block vm" id="apg-750c6d2a-0352-4b88-aaa7-72085659af51"
                data-apg-seal-id="750c6d2a-0352-4b88-aaa7-72085659af51" data-apg-image-size="30"
                data-apg-image-type="basic-small" v-if="domain == 'wolf777.com'"></div>
              <div class="d-inline-block vm" id="apg-88d68be7-5ff9-4b1f-9dde-51c50279f0d4"
                data-apg-seal-id="88d68be7-5ff9-4b1f-9dde-51c50279f0d4" data-apg-image-size="30"
                data-apg-image-type="basic-small" v-if="domain == 'world777.com'"></div>
            </a>
          </template>
        </div>
        <div class="footer-social d-none-mobile">
          <a :href="footerData.wp_link" target="_blank" v-if="footerData.wp_link">
            <img :src="imgPath + 'front/img/home-banners/social/whatsapp.png'" />
          </a>
          <a :href="footerData.fb_link" target="_blank" v-if="footerData.fb_link">
            <img :src="imgPath + 'front/img/home-banners/social/facebook.png'" />
          </a>
          <a :href="footerData.insta_link" target="_blank" v-if="footerData.insta_link">
            <img :src="imgPath + 'front/img/home-banners/social/instagram.png'" />
          </a>
          <a :href="footerData.tele_link" target="_blank" v-if="footerData.tele_link">
            <img :src="imgPath + 'front/img/home-banners/social/telegram.png'" />
          </a>
          <a :href="footerData.tw_link" target="_blank" v-if="footerData.tw_link">
            <img :src="imgPath + 'front/img/home-banners/social/twitter.png'" />
          </a>
          <a :href="footerData.youtube_link" target="_blank" v-if="footerData.youtube_link">
            <img :src="imgPath + 'front/img/home-banners/social/youtube.png'" />
          </a>
        </div>
      </div>
      <div class="footer-bottom">
        <span v-if="footerData.msg">{{ footerData.msg }}</span>
        <div class="text-center mt-2">© Copyright 2021. All Rights Reserved.</div>
      </div>
    </div>
    <div class="footer-menu">
      <ul class="">
        <li>
          <router-link :to="{ name: 'aboutUs' }" target="_blank">About Us</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'gameRules' }" target="_blank">Game Rules</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Faq' }">FAQ</router-link>
        </li>
        <li>
          <a href="javascript:void(0);" @click="getRules()">Rules</a>
        </li>

        <!-- <li>
          <router-link :to="{name: 'promotion'}" target='_blank'>Promotion</router-link>
        </li> -->
        <!-- <template v-if="$store.getters.domain == 'world777.com' || $store.getters.domain == 'wolf777.com'"> -->
        <template v-if="$store.getters.domain == 'world777.com'">
          <li>
            <router-link :to="{ name: 'termsAndConditions' }" target="_blank">Terms and Conditions</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'responsibleGaming' }" target="_blank">Responsible Gaming</router-link>
          </li>
        </template>
      </ul>
    </div>

    <b-modal ref="rulesModal" title="Rules" size="lg" hide-footer no-close-on-esc no-close-on-backdrop
      hide-header-close>
      <rules :rules="rulesData" />
    </b-modal>

    <b-modal id="eighteenPlus" hide-footer :title="domain" modal-class="modal-18plus">
      <EighteenPlus />
    </b-modal>
  </footer>
  <!-- end footer -->
</template>
<script>
  import EighteenPlus from "@/pages/extra/EighteenPlus";
  import rules from "@/components/Rules";
  import ServiceApi from "@/services/ServiceApi";

  export default {
    components: {
      EighteenPlus,
      rules
    },
    data() {
      return {
        domain: DOMAIN,
        imgPath: IMG_PATH,
        // logoPath: BUCKET_PATH + 'sitethemes/' + DOMAIN + '/front/logo.png',
        logoPath: LOGO_PATH,
        footerData: {
          support_no: SUPPORT_NO,
          wp_link: WHATSAPP_LINK,
          fb_link: FACEBOOK_LINK,
          tw_link: TWITTER_LINK,
          insta_link: INSTAGRAM_LINK,
          tele_link: TELEGRAM_LINK,
          youtube_link: YOUTUBE_LINK,
          msg: FOOTER_MSG,
        },
        rulesData: [],
      };
    },
    mounted() {
      const self = this;
      setTimeout(function () {
        if (DOMAIN == "wolf777.com") {
          apg_750c6d2a_0352_4b88_aaa7_72085659af51.init();
        }
        if (DOMAIN == "world777.com") {
          apg_88d68be7_5ff9_4b1f_9dde_51c50279f0d4.init();
        }
      }, 1000);
    },
    methods: {
      getRules() {
        this.rulesData = [];
        ServiceApi.callApi("api/front/rules")
          .then((response) => {
            if (response.status == 200) {
              this.rulesData = response.data;
              this.showRules();
            } else {
              this.rulesData = [];
            }
          })
          .catch((e) => {
            this.rulesData = [];
          });
      },
      resetFlags() {
        // this.user.rdisplay = false
        // this.user.ipop = false
        // this.$store.state.rdisplay = false
        // this.$store.state.ipop = false
        //localStorage.setItem('user', JSON.stringify(this.user))
        //localStorage.clear();
        localStorage.removeItem("user");
        this.$auth.logout();
      },
      showRules() {
        this.$refs["rulesModal"].show();
      },
      hideRules() {
        this.$refs["rulesModal"].hide();
        // localStorage.clear();
        // this.$auth.logout();
      },
    }
  };
</script>