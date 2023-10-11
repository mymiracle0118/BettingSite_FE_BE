<template>
  <div class="login-page-container" v-if="country == 'US' || country == 'CA'">
    <div class="text-center logo-login">
      <img :src="logoPath" class="img-fluid" />
    </div>

    <ValidationObserver tag="form" class="login-form" autocomplete="off" @submit.prevent="login()" v-if="isLogin"
      key="1" v-slot="{ invalid }">
      <ValidationProvider name="User Name" tag="div" class="form-group" v-slot="{ errors }" :rules="{ required: true }">
        <input type="text" v-model="user.username" class="form-control" placeholder="Enter Username">
        <span v-if="errors[0]" class="error">
          {{ errors[0] }}
        </span>
      </ValidationProvider>

      <ValidationProvider name="Password" tag="div" class="form-group" v-slot="{ errors }" :rules="{ required: true }">
        <input type="password" v-model="user.password" class="form-control" placeholder="Enter Password">
        <span v-if="errors[0]" class="error">
          {{ errors[0] }}
        </span>
      </ValidationProvider>

      <div class="form-group">
        <button class="btn btn-primary btn-block" type="submit" :disabled="invalid">
          Login
        </button>
      </div>
      <small class="recaptchaTerms">This site is protected by reCAPTCHA and the Google
          <a href="https://policies.google.com/privacy">Privacy Policy</a> and
          <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </small>
    </ValidationObserver>

    <ValidationObserver tag="form" class="login-form" @submit.prevent="updatePassword()" v-if="!isLogin" key="2"
      v-slot="{ invalid }">
      <ValidationProvider name="Old Password" tag="div" class="form-group" v-slot="{ errors }"
        :rules="{ required: true }">
        <input type="password" v-model="changePassword.password" class="form-control" placeholder="Old Password">
        <span v-if="errors[0]" class="error">
          {{ errors[0] }}
        </span>
      </ValidationProvider>

      <ValidationProvider name="New Password" tag="div" class="form-group" v-slot="{ errors }"
        rules="required|verify_password|min:8|max:20" vid="NewPassword">
        <input type="password" v-model="changePassword.newPassword" class="form-control" placeholder="New Password">
        <span v-if="errors[0]" class="error">
          {{ errors[0] }}
        </span>
      </ValidationProvider>

      <ValidationProvider name="Confirm Password" tag="div" class="form-group" v-slot="{ errors }"
        rules="required|confirmed:NewPassword|verify_password|min:8|max:20">
        <input type="password" v-model="changePassword.newPasswordConfirm" class="form-control"
          placeholder="Confirm Password" />
        <span v-if="errors[0]" class="error">
          {{ errors[0] }}
        </span>
      </ValidationProvider>

      <div class="form-group">
        <button class="btn btn-primary btn-block" type="submit" :disabled="invalid">
          Change Password
        </button>
      </div>
    </ValidationObserver>
  </div>

  <div class="wrapper home-new" v-else>
    <!-- <div class="animated-header" v-if="$store.state.showAnimation">
      <template v-if="timer">
        <span class="d-none-desktop mob">{{ timer }}</span>

        <span class="d-none-mobile web">{{ timer }}</span>
      </template>

      <div id="iplAnimation3" style="height: 34px;">
      </div>
      <span class="fas fa-times" @click="$store.commit('toggleAnimation')"></span>
    </div> -->

    <div id="floater" v-if="footerData.wp_link">
      <a :href="footerData.wp_link" target="_blank">
        <img :src="`${imgPath}front/img/icons/images.png`"/>
      </a>
    </div>

    <!-- <div id="floater">
      <a :href="footerData.wp_link" target="_blank">
        <img :src="`${imgPath}front/img/icons/images.png`"/>
      </a>
    </div> -->

    <div class="animated-header" v-if="$store.state.showAnimation">
      <section class="header-animated-banner" id="animationLogin">
        <div>
          <img :src="`${imgPath}front/img/animation/anim-banner-bg.png`" alt="" class="bg">
          <img :src="`${imgPath}front/img/animation/anim-banner-10.png`" alt="">
          <div class="item">
            <img :src="`${imgPath}front/img/animation/anim-banner-1.png`" alt="">
            <img :src="`${imgPath}front/img/animation/anim-banner-2.png`" alt="">
          </div>
          <div class="item">
            <img :src="`${imgPath}front/img/animation/anim-banner-3.png`" alt="">
            <img :src="`${imgPath}front/img/animation/anim-banner-4.png`" alt="">
          </div>
          <div class="text">
            <!-- <img :src="`${imgPath}front/img/animation/anim-banner-9.png`" alt=""> -->
            <span></span>
            <!-- <img :src="`${imgPath}front/img/animation/anim-banner-9.png`" alt=""> -->
          </div>
          <div class="item">
            <img :src="`${imgPath}front/img/animation/anim-banner-5.png`" alt="">
            <img :src="`${imgPath}front/img/animation/anim-banner-6.png`" alt="">
          </div>
          <div class="item">
            <img :src="`${imgPath}front/img/animation/anim-banner-7.png`" alt="">
            <img :src="`${imgPath}front/img/animation/anim-banner-8.png`" alt="">
          </div>
          <img :src="`${imgPath}front/img/animation/anim-banner-10.png`" alt="">
        </div>
      </section>
      <span class="fas fa-times" @click="$store.commit('toggleAnimation')"></span>
    </div>

    <!--  <div class="login-mobile-menu d-none-desktop">
      <div class="d-inline-block d-none-desktop close-mobile-menu"><i class="fas fa-arrow-right"></i></div>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link :to="{name: 'aboutUs'}" target='_blank'>About Us</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'gameRules'}" target='_blank'>Game Rules</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'termsAndConditions'}" target='_blank'>Terms and Conditions</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'responsibleGaming'}" target='_blank'>Responsible Gaming</router-link>
        </li>
      </ul>
    </div> -->
    <div class="home-new-header container-fluid container-fluid-5">
      <div class="row row5">
        <div class="col-5 col-md-2">
          <!-- <div class="menu-button-mobile d-none-desktop">
            <span class="menu-button-bar"></span>
            <span class="menu-button-bar"></span>
            <span class="menu-button-bar"></span>
          </div> -->
          <div class="home-new-logo">
            <img :src="logoPath" />
          </div>
        </div>
        <div class="col-7 col-md-10">
          <div class="home-new-header-bottom">
            <nav class="navbar navbar-expand-sm justify-content-center">
              <!--  <ul class="navbar-nav">
                <li class="nav-item">
                  <router-link :to="{ name: 'aboutUs' }" target="_blank">About Us</router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'gameRules' }" target="_blank">Game Rules</router-link>
                </li>
               
                <template v-if="$store.getters.domain == 'wolf777.com'">
                  <li class="nav-item">
                    <router-link :to="{ name: 'termsAndConditions' }" target="_blank">Terms and Conditions</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link :to="{ name: 'responsibleGaming' }" target="_blank">Responsible Gaming</router-link>
                  </li>
                </template>
              </ul>
 -->
            </nav>
            <div>
              <!-- <div class="d-inline-block" id="llink"></div> -->

              <!-- <a :href="apk_url" target="_blank" class="download-apk"><i class="fab fa-android mr-2"></i>Download
                APK</a> -->
              <template v-if="adminSettins">
                <template v-if="adminSettins.button1 && adminSettins.button1.show">
                  <a :href="adminSettins.button1.link" class="btn" target="_blank"
                    :style="{ backgroundColor : adminSettins.button1.color, borderColor : adminSettins.button1.color, color : adminSettins.button1.fontcolor }">{{ adminSettins.button1.title }}</a>
                </template>
              </template>
              <button class="btn btn-primary ml-2" v-b-modal.login>Login</button>
              <!-- <button class="btn btn-primary ml-2" v-b-modal.login id="llink"></button> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Login Modal Start -->
    <b-modal id="login" modal-class="modal-login-new" @hide="closeLoginModal()" hide-footer no-close-on-esc
      no-close-on-backdrop>
      <template #modal-header="{ close }">
        <div @click="close()" class="close-login-modal" aria-label="Close">
          <img :src="imgPath + 'front/img/close.svg'" />
        </div>
      </template>

      <transition name="fade" mode="out-in">
        <ValidationObserver tag="form" class="login-form mt-0" autocomplete="off" @submit.prevent="login()"
          v-if="isLogin" key="1" v-slot="{ invalid }">
          <h5>Login</h5>
          <ValidationProvider name="User Name" tag="div" class="form-group" v-slot="{ errors }"
            :rules="{ required: true }">
            <label class="user-email-text">Username</label>
            <input type="text" v-model="user.username" class="form-control" placeholder="Enter Username" />
            <span v-if="errors[0]" class="error">
              {{ errors[0] }}
            </span>
          </ValidationProvider>

          <ValidationProvider name="Password" tag="div" class="form-group" v-slot="{ errors }"
            :rules="{ required: true }">
            <label class="user-email-text">Password</label>
            <input type="password" v-model="user.password" class="form-control" placeholder="Enter Password" />
            <span v-if="errors[0]" class="error">
              {{ errors[0] }}
            </span>
          </ValidationProvider>

          <div class="form-group">
            <div class="custom-control custom-checkbox d-inline-block">
              <input type="checkbox" v-model="agreeTerms" class="custom-control-input" id="customCheck"
                name="example1" />
              <label class="custom-control-label" for="customCheck">I am at least
                <a href="javascript:void(0)" v-b-modal.eighteenPlus class="text-danger">18 years</a>
                of age and I have read, accept and agree to the
                <router-link :to="{ name: 'gameRules' }" target="_blank">Game Rules</router-link>,
                <!-- <template v-if="$store.getters.domain == 'world777.com' || $store.getters.domain == 'wolf777.com'"> -->
                <template v-if="$store.getters.domain == 'wolf777.com'">
                  <router-link :to="{ name: 'termsAndConditions' }" target="_blank">Terms and Conditions</router-link>,
                  <router-link :to="{ name: 'responsibleGaming' }" target="_blank">Responsible Gaming</router-link>,
                </template>
                <a href="https://www.gamcare.org.uk/" target="_blank">GamCare</a>,
                <a href="https://www.gamblingtherapy.org/en" target="_blank">Gambling Therapy</a>
              </label>
            </div>
          </div>
          <div class="form-group mb-1">
            <button class="btn btn-primary btn-block" type="submit" :disabled="invalid">
              Login
            </button>
          </div>
          <small class="recaptchaTerms">This site is protected by reCAPTCHA and the Google
              <a href="https://policies.google.com/privacy">Privacy Policy</a> and
              <a href="https://policies.google.com/terms">Terms of Service</a> apply.
          </small>
        </ValidationObserver>

        <ValidationObserver tag="form" class="change-form" @submit.prevent="updatePassword()" v-if="!isLogin" key="2"
          v-slot="{ invalid }">
          <h5>Change Password</h5>
          <ValidationProvider name="Old Password" tag="div" class="form-group" v-slot="{ errors }"
            :rules="{ required: true }">
            <label class="user-email-text">Old Password</label>
            <input type="password" v-model="changePassword.password" class="form-control" />
            <span v-if="errors[0]" class="error">
              {{ errors[0] }}
            </span>
          </ValidationProvider>

          <ValidationProvider name="New Password" tag="div" class="form-group" v-slot="{ errors }"
            rules="required|verify_password|min:8|max:20" vid="NewPassword">
            <label class="user-email-text">New Password</label>
            <input type="password" v-model="changePassword.newPassword" class="form-control" />
            <span v-if="errors[0]" class="error">
              {{ errors[0] }}
            </span>
          </ValidationProvider>

          <ValidationProvider name="Confirm Password" tag="div" class="form-group" v-slot="{ errors }"
            rules="required|confirmed:NewPassword|verify_password|min:8|max:20">
            <label class="user-email-text">Confirm Password</label>
            <input type="password" v-model="changePassword.newPasswordConfirm" class="form-control" />
            <span v-if="errors[0]" class="error">
              {{ errors[0] }}
            </span>
          </ValidationProvider>

          <div class="form-group">
            <button class="btn btn-primary btn-block" type="submit" :disabled="invalid">
              Change Password
            </button>
          </div>
        </ValidationObserver>
      </transition>
    </b-modal>
    <!--Login Modal End -->

    <!--Register Modal Start -->
    <b-modal id="register" ref="register" modal-class="modal-login-new" @hide="closeRegisterModal()" hide-footer
      no-close-on-esc no-close-on-backdrop>
      <template #modal-header="{ close }">
        <div @click="close()" class="close-login-modal" aria-label="Close">
          <img :src="imgPath + 'front/img/close.svg'" />
        </div>
      </template>

      <ValidationObserver tag="form" class="login-form mt-0" autocomplete="off" @submit.prevent="register()"
        v-slot="{ invalid }">
        <h5>Register</h5>
        <ValidationProvider name="Full Name" tag="div" class="form-group" v-slot="{ errors }"
          :rules="{ required: true }">
          <label class="user-email-text">Full Name</label>
          <input type="text" v-model="regUser.fname" class="form-control" placeholder="Enter Username" />
          <span v-if="errors[0]" class="error">
            {{ errors[0] }}
          </span>
        </ValidationProvider>

        <ValidationProvider name="User Name" tag="div" class="form-group" v-slot="{ errors }"
          :rules="{ required: true, alpha_num: true, min:4, max:15}">
          <label class="user-email-text">Username</label>
          <input type="text" v-model="regUser.username" class="form-control" placeholder="Enter Username" />
          <span v-if="errors[0]" class="error">
            {{ errors[0] }}
          </span>
        </ValidationProvider>

        <ValidationProvider name="New Password" tag="div" class="form-group" v-slot="{ errors }"
          rules="required|verify_password|min:8|max:20" vid="NewPassword">
          <label class="user-email-text">New Password</label>
          <input type="password" v-model="regUser.password" class="form-control" placeholder="New Password" />
          <span v-if="errors[0]" class="error">
            {{ errors[0] }}
          </span>
        </ValidationProvider>

        <ValidationProvider name="Confirm Password" tag="div" class="form-group" v-slot="{ errors }"
          rules="required|confirmed:NewPassword|verify_password|min:8|max:20">
          <label class="user-email-text">Confirm Password</label>
          <input type="password" v-model="regUser.passwordConfirm" class="form-control"
            placeholder="Confirm Password" />
          <span v-if="errors[0]" class="error">
            {{ errors[0] }}
          </span>
        </ValidationProvider>

        <ValidationProvider name="City" tag="div" class="form-group" v-slot="{ errors }" :rules="{ required: true }">
          <label class="user-email-text">City</label>
          <input type="text" v-model="regUser.city" class="form-control" placeholder="Enter City" />
          <span v-if="errors[0]" class="error">
            {{ errors[0] }}
          </span>
        </ValidationProvider>

        <ValidationProvider name="Mobile Number" tag="div" class="form-group" v-slot="{ errors }"
          :rules="{ required: true }">
          <label class="user-email-text">Mobile Number</label>
          <input type="text" v-model="regUser.moNo" class="form-control" placeholder="Enter Mobile Number" />
          <span v-if="errors[0]" class="error">
            {{ errors[0] }}
          </span>
        </ValidationProvider>

        <div class="form-group">
          <button class="btn btn-primary btn-block" type="submit" :disabled="invalid">
            Register
          </button>
        </div>
      </ValidationObserver>
    </b-modal>
    <!--Register Modal End -->

    <div class="upcoming-fixure" v-if="fixtureData && fixtureData.length">
      <div class="fixure-title">Upcoming Fixtures</div>
      <div class="fixure-box-container" style="width: calc(100% - 95px)">
        <!-- <VueSlickCarousel v-bind="sliderSetting"> -->
        <CustomMarquee>
          <div class="login-fixture">
            <template v-for="(data, key) in fixtureData">
              <div class="fixure-box" :key="key">
                <div>
                  <i class="d-icon mr-2" :class="`icon-${data.sportid}`"></i>
                  {{ data.ename }}
                </div>
                <div>{{ changeDateFormat(data.dt) }}</div>
              </div>
            </template>
          </div>
        </CustomMarquee>
        <!-- </VueSlickCarousel> -->
      </div>
    </div>

    <template v-if="themeBanners && themeBanners.length">
      <b-carousel controls :interval="10000">
        <template v-for="(data, key) in themeBanners">
          <b-carousel-slide class="carousal-23" :key="`wp${key}`" :background="`url(${themeBannerPath}${data})`">
          </b-carousel-slide>
        </template>
      </b-carousel>
    </template>

    <div class="w-100">
      <h4 class="sport-list-title">Our Live Casinos</h4>
      <div class="casino-banners-list mt-2">
        <template v-for="(table, key) in filteredTableList">
          <div class="casino-banner-item login-hover" :key="key">
            <a href="javascript:void(0);">
              <img :src="casinoBannersPath + '/lc/' + table.imgpath" class="img-fluid" />
              <div v-b-modal.login>Login</div>
            </a>
          </div>
        </template>
      </div>

      <div class="container-fluid container-fluid-5">
        <div class="row row5">
          <div class="col-12 col-md-3">
            <h4 class="sport-list-title">Live Casinos</h4>
            <div class="casino-banners-list live-casinos mt-2">
              <div class="casino-banner-item login-hover">
                <a href="javascript:void(0);">
                  <img :src="`${imgPath}front/img/home-banners/live-casino/ezugi.jpg`" class="img-fluid" />
                  <div v-b-modal.login>Login</div>
                </a>
              </div>
              <div class="casino-banner-item login-hover">
                <a href="javascript:void(0);">
                  <img :src="`${imgPath}front/img/home-banners/live-casino/superspade.jpg`" class="img-fluid" />
                  <div v-b-modal.login>Login</div>
                </a>
              </div>
              <div class="casino-banner-item login-hover">
                <a href="javascript:void(0);">
                  <img :src="`${imgPath}front/img/home-banners/live-casino/qt.jpg`" class="img-fluid" />
                  <div v-b-modal.login>Login</div>
                </a>
              </div>
              <div class="casino-banner-item login-hover">
                <a href="javascript:void(0);">
                  <img :src="`${imgPath}front/img/home-banners/live-casino/evolution.jpg`" class="img-fluid" />
                  <div v-b-modal.login>Login</div>
                </a>
              </div>
              <div class="casino-banner-item login-hover">
                <a href="javascript:void(0);">
                  <img :src="`${imgPath}front/img/home-banners/live-casino/cockfight.jpg`" class="img-fluid" />
                  <div v-b-modal.login>Login</div>
                </a>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-3">
            <h4 class="sport-list-title">Virtual Casinos</h4>
            <div class="casino-banners-list live-casinos mt-2">
              <div class="casino-banner-item login-hover">
                <a href="javascript:void(0);">
                  <img :src="`${imgPath}front/img/home-banners/v-live-casino/vteen.jpg`" class="img-fluid" />
                  <div v-b-modal.login>Login</div>
                </a>
              </div>
              <div class="casino-banner-item login-hover">
                <a href="javascript:void(0);">
                  <img :src="`${imgPath}front/img/home-banners/v-live-casino/vteen20.jpg`" class="img-fluid" />
                  <div v-b-modal.login>Login</div>
                </a>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-3">
            <h4 class="sport-list-title">Fantasy Games</h4>
            <div class="casino-banners-list fantasy-games mt-2">
              <template v-for="(table, key) in fantacyList">
                <div class="casino-banner-item login-hover" :key="key">
                  <a href="javascript:void(0);">
                    <img :src="casinoBannersPath + '/other/' + table.imgpath" class="img-fluid" />
                    <div v-b-modal.login>Login</div>
                  </a>
                </div>
              </template>
            </div>
          </div>

          <div class="col-12 col-md-3">
            <h4 class="sport-list-title">Others</h4>
            <div class="casino-banners-list fantasy-games mt-2">
              <template v-for="(table, key) in othersList">
                <div class="casino-banner-item login-hover" :key="key">
                  <a href="javascript:void(0);">
                    <img :src="casinoBannersPath + '/other/' + table.imgpath" class="img-fluid" />
                    <div v-b-modal.login>Login</div>
                  </a>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <h4 class="sport-list-title">Sports</h4>
      <div class="all-sports-list mt-2">
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/4-color.svg`" />
          <div class="mt-1 text-center">Cricket</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/2-color.svg`" />
          <div class="mt-1 text-center">Tennis</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/1-color.svg`" />
          <div class="mt-1 text-center">Football</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/8-color.svg`" />
          <div class="mt-1 text-center">Table Tennis</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/19-color.svg`" />
          <div class="mt-1 text-center">Ice Hockey</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/11-color.svg`" />
          <div class="mt-1 text-center">E Games</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/55-color.svg`" />
          <div class="mt-1 text-center">Rugby League</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/3-color.svg`" />
          <div class="mt-1 text-center">Boxing</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/7-color.svg`" />
          <div class="mt-1 text-center">Beach Volleyball</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/3-color.svg`" />
          <div class="mt-1 text-center">Mixed Martial Arts</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/9-color.svg`" />
          <div class="mt-1 text-center">Futsal</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/10-color.svg`" />
          <div class="mt-1 text-center">Horse Racing</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/12-color.svg`" />
          <div class="mt-1 text-center">Greyhounds</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/15-color.svg`" />
          <div class="mt-1 text-center">Basketball</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/16-color.svg`" />
          <div class="mt-1 text-center">MotoGP</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/17-color.svg`" />
          <div class="mt-1 text-center">Chess</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/18-color.svg`" />
          <div class="mt-1 text-center">Volleyball</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/22-color.svg`" />
          <div class="mt-1 text-center">Badminton</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/25-color.svg`" />
          <div class="mt-1 text-center">Hockey</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/29-color.svg`" />
          <div class="mt-1 text-center">Cycling</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/32-color.svg`" />
          <div class="mt-1 text-center">Motorbikes</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/33-color.svg`" />
          <div class="mt-1 text-center">Athletics</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/35-color.svg`" />
          <div class="mt-1 text-center">Basketball 3*3</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/37-color.svg`" />
          <div class="mt-1 text-center">Sumo</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/38-color.svg`" />
          <div class="mt-1 text-center">Virtual Sport</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/52-color.svg`" />
          <div class="mt-1 text-center">Motor Sports</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/53-color.svg`" />
          <div class="mt-1 text-center">Baseball</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/54-color.svg`" />
          <div class="mt-1 text-center">Rugby Union</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/57-color.svg`" />
          <div class="mt-1 text-center">Darts</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/58-color.svg`" />
          <div class="mt-1 text-center">American Football</div>
        </div>
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/59-color.svg`" />
          <div class="mt-1 text-center">Snooker</div>
        </div>
        <!-- <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/62-color.svg`" />
          <div class="mt-1 text-center">Soccer</div>
        </div> -->
        <div class="sport-list-item">
          <img v-b-modal.login :src="`${imgPath}front/img/events/11-color.svg`" />
          <div class="mt-1 text-center">Esports</div>
        </div>
      </div>

      <template v-if="winnerData && winnerData.length">
        <h4 class="sport-list-title">Top Winners</h4>
        <div class="top-winners-list-container mt-2">
          <div class="top-winner-list-box-container1">
            <VueSlickCarousel v-bind="sliderSetting">
              <!-- <CustomMarquee> -->
              <!-- <div class="login-winners"> -->
              <template v-for="(data, key) in winnerData">
                <div class="top-winner-list-box" :key="key">
                  <div class="w-100 text-center">
                    <img :src="`${imgPath}front/img/user-icon.png`" />
                  </div>
                  <div class="w-100">
                    <div class="player-detail">
                      <div><b>Player</b></div>
                      <div>{{ data.username.substring(0, 2) }}****</div>
                    </div>
                    <div class="player-detail">
                      <div><b>Time</b></div>
                      <div>{{ data.time }}</div>
                    </div>
                    <div class="player-detail">
                      <div><b>Win Amount</b></div>
                      <div v-currency="data.winamount"></div>
                    </div>
                  </div>
                </div>
              </template>
              <!-- </div> -->
              <!-- </CustomMarquee> -->
            </VueSlickCarousel>
          </div>
        </div>
      </template>
    </div>

    <footer class="footer">
      <div class="container-fluid container-fluid-5">
        <div class="row row5">
          <div class="col-12 col-md-3 text-center">
            <img :src="logoPath" class="img-logo" />
          </div>
          <div class="col-12 col-md-3 payments" v-if="$store.getters.domain == 'wolf777.com'">
            <h4>Payment Method</h4>
            <ul>
              <li>
                <a href="javascript:void(0)">
                  <img :src="`${imgPath}front/img/bhim.png`" class="img-fluid" alt="effect" />
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <img :src="`${imgPath}front/img/upi.png`" class="img-fluid" alt="effect" />
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <img :src="`${imgPath}front/img/imps.png`" class="img-fluid" alt="effect" />
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <img :src="`${imgPath}front/img/paytm.png`" class="img-fluid" alt="effect" />
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <img :src="`${imgPath}front/img/airtel.png`" class="img-fluid" alt="effect" />
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <img :src="`${imgPath}front/img/freecharge.png`" class="img-fluid" alt="effect" />
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <img :src="`${imgPath}front/img/phonepe.png`" class="img-fluid" alt="effect" />
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <img :src="`${imgPath}front/img/oxigen.png`" class="img-fluid" alt="effect" />
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <img :src="`${imgPath}front/img/bank.png`" class="img-fluid" alt="effect" />
                </a>
              </li>
            </ul>
          </div>
          <div class="col-12 col-sm footer-link">
            <h4>Menu</h4>
            <div>
              <router-link :to="{ name: 'aboutUs' }" target="_blank">About Us</router-link>
            </div>
            <div>
              <router-link :to="{ name: 'gameRules' }" target="_blank">Game Rules</router-link>
            </div>
            <!-- <template v-if="$store.getters.domain == 'world777.com' || $store.getters.domain == 'wolf777.com'"> -->
            <template v-if="$store.getters.domain == 'world777.com'">
              <div>
                <router-link :to="{ name: 'termsAndConditions' }" target="_blank">Terms and Conditions</router-link>
              </div>
              <div>
                <router-link :to="{ name: 'responsibleGaming' }" target="_blank">Responsible Gaming</router-link>
              </div>
            </template>
          </div>
          <div class="col-12 col-sm gt">
            <h4>Game Therapy</h4>
            <div>
              <a href="javascript:void(0)" class="vm">
                <div class="d-inline-block vm" id="apg-750c6d2a-0352-4b88-aaa7-72085659af51"
                  data-apg-seal-id="750c6d2a-0352-4b88-aaa7-72085659af51" data-apg-image-size="50"
                  data-apg-image-type="basic-small" v-if="$store.getters.domain == 'wolf777.com'"></div>
                <!-- <div class="d-inline-block vm" id="apg-88d68be7-5ff9-4b1f-9dde-51c50279f0d4"
                  data-apg-seal-id="88d68be7-5ff9-4b1f-9dde-51c50279f0d4" data-apg-image-size="50"
                  data-apg-image-type="basic-small" v-if="$store.getters.domain == 'world777.com'"></div> -->
                <div class="d-inline-block vm" id="apg-88d68be7-5ff9-4b1f-9dde-51c50279f0d4"
                  data-apg-seal-id="88d68be7-5ff9-4b1f-9dde-51c50279f0d4" data-apg-image-size="50"
                  data-apg-image-type="basic-small" v-if="$store.getters.domain == 'world777.com'"></div>
              </a>
              <a href="javascript:void(0)" v-b-modal.eighteenPlus>
                <img :src="imgPath + 'front/img/18plus.png'" />
              </a>
              <a href="https://www.gamcare.org.uk/" target="_blank">
                <img :src="imgPath + 'front/img/gamecare.png'" />
              </a>
              <a href="https://www.gamblingtherapy.org/en" target="_blank">
                <img :src="imgPath + 'front/img/gt.png'" />
              </a>
            </div>

            <b-modal id="eighteenPlus" hide-footer :title="$store.getters.domain" modal-class="modal-18plus">
              <EighteenPlus />
            </b-modal>
          </div>
          <div class="col-12 col-sm footer-social"
            v-if="footerData.fb_link || footerData.insta_link || footerData.tele_link || footerData.tw_link || footerData.youtube_link || footerData.support_no">
            <h4>Follow Us</h4>
            <div>
              <!-- <a :href="footerData.wp_link" target="_blank" v-if="footerData.wp_link">
                <img :src="imgPath + 'front/img/home-banners/social/whatsapp.png'" />
              </a> -->
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
            <div class="mt-1">
              <span class="support" v-if="footerData.support_no">Support: {{ footerData.support_no }}</span>
            </div>
          </div>
          <div class="col-12 mt-4">
            <div class="footer-bottom text-center">
              <span v-if="footerData.msg">{{ footerData.msg }}</span>
              <div class="text-center mt-2">© Copyright 2021. All Rights Reserved.</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
  import ServiceApi from "@/services/ServiceApi";
  import EighteenPlus from "@/pages/extra/EighteenPlus";
  import CustomMarquee from "@/components/CustomMarquee";
  import VueSlickCarousel from "vue-slick-carousel";
  import "vue-slick-carousel/dist/vue-slick-carousel.css";
  import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
  import moment from 'moment-timezone'
  moment.tz.setDefault(DEFAULT_TIMEZONE);

  export default {
    beforeMount() {
      // if(DOMAIN == "world777.com"){
      if (THEME != 'custom') {
        document.documentElement.dataset.theme = "dark";
      }
      // }
    },
    mounted() {
      // var _domains = [
      //   "https://theworld777.com/",
      //   "https://theworld777.com/app-page/"
      // ];

      // var a = document.createElement('a');
      // // a.classList.add("btn");
      // a.classList.add("malicious-site-checker");
      // a.innerHTML="You have visited or redirected from malicious website !";
      // // a.innerHTML="Login";
      // a.onclick = function(event){
      //   window.event.preventDefault();
      //   console.log(a);
      //   // goto login
      // };
      // var domains = _domains.concat([]);
      // var domains_i = 0
      // setInterval( () => {
      //   a.href = domains[domains_i];
      //   domains_i++;
      //   if (domains_i >= domains.length) {
      //     domains_i = 0; 
      //   }
      // }, 500);

      // var login_btn = document.getElementById('llink');
      // login_btn.id = "";
      // login_btn.appendChild(a);


      if (COUNTRY == 'US' || COUNTRY == 'CA') {
        this.agreeTerms = true
      } else {
        if(this.$store.state.showAnimation){
          setTimeout(() => {
            new Typed('#animationLogin .text span', {
              strings: ANIMATION_MSG,
              typeSpeed: 60,
              backSpeed: 60,
              loop: true,
              showCursor: false,
            })
          }, 1000);
        }
        setTimeout(function () {
          if (DOMAIN == "wolf777.com") {
            apg_750c6d2a_0352_4b88_aaa7_72085659af51.init();
          }
          if (DOMAIN == "world777.com") {
            apg_88d68be7_5ff9_4b1f_9dde_51c50279f0d4.init();
          }
        }, 1000);
      }
      // const countDownDate = moment(EVENT_DT, "MM-DD-YYYY hh:mm:ss A");
      // const self = this
      // var x = setInterval(function () {
      //   var now = moment()
      //   var distance = countDownDate - now;

      //   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      //   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      //   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      //   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      //   self.timer = days + "d " + hours + "h " +
      //     minutes + "m " + seconds + "s ";

      //   if (distance < 0) {
      //     clearInterval(x);
      //     self.timer = "";
      //   }
      // }, 1000);

      // if(this.$store.state.showAnimation){
      //   let svgContainer = document.getElementById('iplAnimation3');
      //   let path = !this.$store.getters.isTablet ? IMG_PATH + "front/js/Banner_3.json" : IMG_PATH + "front/js/Banner_2.json"
      //   let animItem = bodymovin.loadAnimation({
      //     wrapper: svgContainer,
      //     animType: 'svg',
      //     loop: true,
      //     path: path
      //   });
      // }  

      this.getWinners();
      this.getFixture();
      if (this.$auth.check()) {
        this.$router.push({
          name: "home",
        });
      }

      this.themeBanners = HOME_THEME_BANNERS ? HOME_THEME_BANNERS.split(",") : [];
    },
    components: {
      EighteenPlus,
      VueSlickCarousel,
      CustomMarquee
    },
    data() {
      return {
        country: COUNTRY,
        adminSettins: ADMIN_SETTING,
        timer: "",
        sliderSetting: {
          arrows: false,
          dots: false,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "20px",
          autoplay: true,
          speed: 3000,
          autoplaySpeed: 3000,
          cssEase: "linear",
          variableWidth: true,
          pauseOnHover: false,
        },
        apk_url: `${APK_URL}${DOMAIN.split(".")[0]}-${APK_VERSION}.apk`,
        winnerData: [],
        fixtureData: [],
        themeBanners: [],
        themeBannerPath: HOME_THEME_BANNERS_FROM + 'banners/',
        comBannerPath: BUCKET_PATH + "common/home-banners/",
        casinoBannersPath: BUCKET_PATH + "casino_icons",
        domain: DOMAIN,
        imgPath: IMG_PATH,
        // logoPath: BUCKET_PATH + 'sitethemes/' + DOMAIN + '/front/logo.png',
        logoPath: LOGO_PATH_LOGIN,
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
        tableList: [
          {
            "gid": "teen1",
            "gname": "teen1",
            "gtid": 0,
            "imgpath": "teen1.jpg",
            "srno": 0,
            "tabno": 6
          },
          {
            "gid": "teen120",
            "gname": "teen120",
            "gtid": 0,
            "imgpath": "teen120.jpg",
            "srno": 0,
            "tabno": 6
          },
          {
            "gid": "kbc",
            "gname": "kbc",
            "gtid": 0,
            "imgpath": "kbc.jpg",
            "srno": 0,
            "tabno": 6
          },
          {
            "gid": "teen2024",
            "gname": "teen2024",
            "gtid": 0,
            "imgpath": "teen2024.jpg",
            "srno": 0,
            "tabno": 6
          },
          {
            "gid": "notenum",
            "gname": "Notenum",
            "gtid": 0,
            "imgpath": "notenum.jpg",
            "srno": 0,
            "tabno": 6
          },
          {
            "gid": "trio",
            "gname": "Trio",
            "gtid": 0,
            "imgpath": "trio.jpg",
            "srno": 0,
            "tabno": 6
          },
          {
            "gid": "teen20b",
            "gname": "Teen20b",
            "gtid": 0,
            "imgpath": "teen20b.jpg",
            "srno": 0,
            "tabno": 6
          },
          {
            "gid": "race17",
            "gname": "Raceto17",
            "gtid": 0,
            "imgpath": "race17.jpg",
            "srno": 0,
            "tabno": 6
          },
          {
            "gid": "teenmuf",
            "gname": "TeenMuflis",
            "gtid": 0,
            "imgpath": "teenmuf.jpg",
            "srno": 0,
            "tabno": 6
          },
          {
            "gid": "teensin",
            "gname": "TeenSin",
            "gtid": 0,
            "imgpath": "teensin.jpg",
            "srno": 0,
            "tabno": 6
          },
          {
            "gid": "patti2",
            "gname": "Patti2",
            "gtid": 0,
            "imgpath": "patti2.jpg",
            "srno": 0,
            "tabno": 6
          },
          {
            "gid": "trap",
            "gname": "Trap",
            "gtid": 0,
            "imgpath": "trap.jpg",
            "srno": 0,
            "tabno": 6
          },
          {
            "gid": "superover",
            "gname": "Super Over",
            "gtid": 0,
            "imgpath": "superover.jpg",
            "srno": 0,
            "tabno": 6
          },
          {
            "gid": "lucky7eu2",
            "gname": "Lucky 7 - C",
            "gtid": 0,
            "imgpath": "lucky7eu2.jpg",
            "srno": 0,
            "tabno": 6
          },
          {
            gid: "teen",
            gname: "One Day Teenpatti",
            gtid: 0,
            imgpath: "teen.jpg",
            srno: 1,
            tabno: 6,
          },
          {
            gid: "teen20",
            gname: "20-20 Teenpatti",
            gtid: 0,
            imgpath: "teen20.jpg",
            srno: 2,
            tabno: 6,
          },
          {
            gid: "teen9",
            gname: "Test Teenpatti",
            gtid: 0,
            imgpath: "teen9.jpg",
            srno: 3,
            tabno: 6,
          },
          {
            gid: "teen8",
            gname: "Open Teenpatti",
            gtid: 0,
            imgpath: "teen8.jpg",
            srno: 4,
            tabno: 6,
          },
          {
            gid: "poker",
            gname: "One Day Poker",
            gtid: 0,
            imgpath: "poker.jpg",
            srno: 5,
            tabno: 6,
          },
          {
            gid: "poker20",
            gname: "20-20 Poker",
            gtid: 0,
            imgpath: "poker20.jpg",
            srno: 6,
            tabno: 6,
          },
          {
            gid: "poker6",
            gname: "6 Player Poker",
            gtid: 0,
            imgpath: "poker6.jpg",
            srno: 7,
            tabno: 6,
          },
          {
            gid: "baccarat",
            gname: "Baccarat",
            gtid: 0,
            imgpath: "baccarat.jpg",
            srno: 8,
            tabno: 6,
          },
          {
            gid: "baccarat2",
            gname: "Baccarat2",
            gtid: 0,
            imgpath: "baccarat2.jpg",
            srno: 9,
            tabno: 6,
          },
          {
            gid: "dt20",
            gname: "20-20 Dragon Tiger",
            gtid: 0,
            imgpath: "dt20.jpg",
            srno: 10,
            tabno: 6,
          },
          {
            gid: "dt6",
            gname: "One Day Dragon Tiger",
            gtid: 0,
            imgpath: "dt6.jpg",
            srno: 11,
            tabno: 6,
          },
          {
            gid: "dtl20",
            gname: "20-20 Dragon Tiger Lion",
            gtid: 0,
            imgpath: "dtl20.jpg",
            srno: 12,
            tabno: 6,
          },
          {
            gid: "dt202",
            gname: "20-20 Dragon Tiger 2",
            gtid: 0,
            imgpath: "dt202.jpg",
            srno: 13,
            tabno: 6,
          },
          {
            gid: "card32",
            gname: "32 Cards - A",
            gtid: 0,
            imgpath: "card32.jpg",
            srno: 14,
            tabno: 6,
          },
          {
            gid: "card32eu",
            gname: "32 Cards - B",
            gtid: 0,
            imgpath: "card32eu.jpg",
            srno: 15,
            tabno: 6,
          },
          {
            gid: "ab20",
            gname: "Andar Bahar",
            gtid: 0,
            imgpath: "ab20.jpg",
            srno: 16,
            tabno: 6,
          },
          {
            gid: "abj",
            gname: "Andar Bahar 2",
            gtid: 0,
            imgpath: "abj.jpg",
            srno: 17,
            tabno: 6,
          },
          {
            gid: "lucky7",
            gname: "Lucky 7 - A",
            gtid: 0,
            imgpath: "lucky7.jpg",
            srno: 18,
            tabno: 6,
          },
          {
            gid: "lucky7eu",
            gname: "Lucky 7 - B",
            gtid: 0,
            imgpath: "lucky7eu.jpg",
            srno: 19,
            tabno: 6,
          },
          {
            gid: "3cardj",
            gname: "3 Cards Judgement",
            gtid: 0,
            imgpath: "3cardj.jpg",
            srno: 20,
            tabno: 6,
          },
          {
            gid: "war",
            gname: "Casino War",
            gtid: 0,
            imgpath: "war.jpg",
            srno: 21,
            tabno: 6,
          },
          {
            gid: "worli",
            gname: "Worli Matka",
            gtid: 0,
            imgpath: "worli.jpg",
            srno: 22,
            tabno: 6,
          },
          {
            gid: "worli2",
            gname: "Instant Worli",
            gtid: 0,
            imgpath: "worli2.jpg",
            srno: 23,
            tabno: 6,
          },
          {
            gid: "aaa",
            gname: "Amar Akbar Anthony",
            gtid: 0,
            imgpath: "aaa.jpg",
            srno: 24,
            tabno: 6,
          },
          {
            gid: "btable",
            gname: "Bollywood Table",
            gtid: 0,
            imgpath: "btable.jpg",
            srno: 25,
            tabno: 6,
          },
          {
            gid: "lottcard",
            gname: "Lottery",
            gtid: 0,
            imgpath: "lottcard.jpg",
            srno: 26,
            tabno: 6,
          },
          {
            gid: "cricketv3",
            gname: "5Five Cricket",
            gtid: 0,
            imgpath: "cricketv3.jpg",
            srno: 27,
            tabno: 6,
          },
          {
            gid: "cmatch20",
            gname: "20-20 Cricket Match",
            gtid: 0,
            imgpath: "cmatch20.jpg",
            srno: 28,
            tabno: 6,
          },
          {
            gid: "cmeter",
            gname: "Casino Meter",
            gtid: 0,
            imgpath: "cmeter.jpg",
            srno: 29,
            tabno: 6,
          },
          {
            gid: "teen6",
            gname: "Teenpatti 2.0",
            gtid: 0,
            imgpath: "teen6.jpg",
            srno: 30,
            tabno: 6,
          },
          {
            gid: "queen",
            gname: "Queen",
            gtid: 0,
            imgpath: "queen.jpg",
            srno: 31,
            tabno: 6,
          },
          {
            gid: "race20",
            gname: "Race 20",
            gtid: 0,
            imgpath: "race20.jpg",
            srno: 32,
            tabno: 6,
          }
        ],
        fantacyList: [{
            gmid: "dream",
            gname: "Diam11",
            imgpath: "diam11.jpg",
            sno: 1,
            tabno: 7,
          },
          {
            gmid: "daba",
            gname: "Player Battle",
            imgpath: "playerbattle.jpg",
            sno: 2,
            tabno: 7,
          },
          // {
          //   "gmid": "sports-runner",
          //   "gname": "Runner",
          //   "imgpath": "runner.jpeg",
          //   "sno": 3,
          //   "tabno": 7
          // },
          {
            gmid: "pop-the-ball",
            gname: "Pop The Ball",
            imgpath: "poptheball.jpg",
            sno: 4,
            tabno: 7,
          },
          {
            gmid: "ludo",
            gname: "Ludo Club",
            imgpath: "ludoclub.jpg",
            sno: 5,
            tabno: 7,
          },
          {
            gmid: "rummy",
            gname: "Rummy",
            imgpath: "rummy.jpg",
            sno: 6,
            tabno: 7,
          },
          {
            gmid: "ludo-lands",
            gname: "Ludo Lands",
            imgpath: "ludo-lands.jpg",
            sno: 5,
            tabno: 7,
          },
        ],
        othersList: [{
          gmid: "binary",
          gname: "Binary",
          imgpath: "binary.jpg",
          sno: 5,
          tabno: 7,
        }, ],
        user: {
          username: "",
          password: "",
          recaptcha: ""
        },
        changePassword: {
          uname: "",
          password: "",
          newPassword: "",
          newPasswordConfirm: "",
        },
        regUser: {
          username: "",
          fname: "",
          password: "",
          city: "",
          moNo: "",
        },
        loading: false,
        isLogin: true,
        submitted: false,
        agreeTerms: false,
        has_error: false,
        errors: {},
        error: "",
        theme: localStorage.getItem("theme"),
      };
    },
    computed: {
      filteredTableList() {
        return _.orderBy(this.tableList, "srno");
      },
    },
    methods: {
      changeDateFormat(date) {
        return moment(String(date), 'MM-DD-YYYY hh:mm:ss A').format('DD/MM/YYYY HH:mm:ss')
      },
      getWinners() {
        ServiceApi.callApi("api/front/winners", {
            d: DOMAIN,
          })
          .then((response) => {
            if (response.status == 200) {
              // console.log(response.data.t1)
              this.winnerData = response.data.t1;
            } else {
              this.winnerData = [];
            }
          })
          .catch((e) => {
            this.winnerData = [];
          });
      },
      getFixture() {
        ServiceApi.callApi("api/front/fixture")
          .then((response) => {
            if (response.status == 200) {
              // console.log(response.data)
              this.fixtureData = response.data;
            } else {
              this.fixtureData = [];
            }
          })
          .catch((e) => {
            this.fixtureData = [];
          });
      },
      getLoginBG() {
        if (LOGIN_BG_IMG && LOGIN_BG_IMG != "") {
          return `background-image : url("${BUCKET_PATH}sitethemes/${DOMAIN}/front/${LOGIN_BG_IMG}")`;
        }
      },
      updatePassword(scope) {
        if (this.loading) return;
        this.loading = true;
        ServiceApi.callApi("api/front/passwordupdate", this.changePassword)
          .then((response) => {
            if (response.status == 200) {
              this.changePassword.uname = "";
              this.resetUserValue();
              this.$bvToast.toast(response.msg, {
                variant: "success",
                toaster: "b-toaster-top-full",
                autoHideDelay: 3000,
              });
              this.isLogin = true;
              this.loading = false;
            } else {
              this.resetUserValue();
              this.$bvToast.toast(response.msg, {
                variant: "danger",
                toaster: "b-toaster-top-full",
                autoHideDelay: 3000,
              });
              this.loading = false;
            }
          })
          .catch((e) => {
            if (e.response) {
              if (e.response.status == 405) {
                this.$bvToast.toast(e.response.data.msg, {
                  variant: "danger",
                  toaster: "b-toaster-top-full",
                  autoHideDelay: 3000,
                });
              }
            }
            this.resetUserValue();
            this.loading = false;
          });
      },
      login(scope) {
        if (this.submitted) {
          return;
        }

        this.has_error = false;
        this.errors = {};
        this.error = "";

        this.submitted = true;
        localStorage.removeItem("user");
        // if (IS_MOBILE) {
        if (!this.agreeTerms) {
          this.$bvToast.toast("Please agree Terms and Conditions", {
            variant: "danger",
            toaster: "b-toaster-top-full",
            autoHideDelay: 3000,
          });
          this.submitted = false;
          return;
        }
        // }
        this.$recaptcha("login").then(token => {
          this.user.recaptcha = token;
          var params =
            ENC_RESPONSE == true ? {
              data: _0x895125e(this.user, require("crypto-js")),
            } :
            this.user;
          // let params = ENC_RESPONSE == true? {data: crypto.encrypt_token(JSON.stringify(this.user))} : this.user
          this.$auth.login({
            data: params,
            success: function (res) {
              this.submitted = false;
              // let response = res.data;
              let response =
                ENC_RESPONSE == true ?
                _0x895125d(res.data.data, require("crypto-js")) :
                res.data;

              if (response.status == 200) {
                if (response.data.login) {
                  this.$store.state.rdisplay = response.data.rdisplay;
                  this.$store.state.ipop = response.data.ipop;
                  localStorage.setItem("user", JSON.stringify(response.data));

                  this.$auth.token(null, response.data.token, false);
                  // this.$auth.user(response.data);
                  // this.$store.state.WMSG = response.msg;
                  if (response.data.auth == 1 || response.data.auth == 2) {
                    this.$router.push({
                      name: "loginAuth",
                      params: {
                        authId: response.data.auth,
                      },
                    });
                  } else {
                    this.$router.push({
                      name: "home",
                    });
                  }
                } else {
                  this.isLogin = response.data.login;
                  this.changePassword.uname = this.user.username;
                  this.resetUserValue();
                }
              } else if(response.status == 402){
                this.$bvToast.toast(response.msg, {
                  variant: "danger",
                  toaster: "b-toaster-top-full",
                  autoHideDelay: 3000,
                });

                window.location.reload();

              } else {
                this.$bvToast.toast(response.msg, {
                  variant: "danger",
                  toaster: "b-toaster-top-full",
                  autoHideDelay: 3000,
                });
              }
            },
            error: function (res) {
              this.submitted = false;
              this.has_error = true;
              // console.log(res.response.status);
              if (res.response.status == 405) {
                this.errors = res.response.data.errors || {};
              } else {
                this.error = res.response.data.msg;
              }
              this.resetUserValue();
            },
            rememberMe: true,
            fetchUser: true,
          });
        });
      },
      register(scope) {
        if (this.submitted) {
          return;
        }

        this.submitted = true;
        localStorage.removeItem("user");

        var params =
          ENC_RESPONSE == true ? {
            data: _0x895125e(this.regUser, require("crypto-js")),
          } :
          this.regUser;

        // console.log(params);
        ServiceApi.callApi("api/front/register", this.regUser)
          .then((response) => {
            // console.log(response.data);
            if (response.status == 200) {
              this.$bvToast.toast(response.msg, {
                variant: "success",
                toaster: "b-toaster-top-full",
                autoHideDelay: 3000,
              });
              this.isLogin = true;
              this.loading = false;
              this.submitted = false;
              this.closeRegisterModal();
            } else {
              this.$bvToast.toast(response.msg, {
                variant: "danger",
                toaster: "b-toaster-top-full",
                autoHideDelay: 3000,
              });
              this.loading = false;
              this.submitted = false;
            }
          })
          .catch((e) => {
            if (e.response) {
              if (e.response.status == 405) {
                this.$bvToast.toast(e.response.data.msg, {
                  variant: "danger",
                  toaster: "b-toaster-top-full",
                  autoHideDelay: 3000,
                });
              }
            }
            this.resetUserValue();
            this.loading = false;
            this.submitted = false;
          });
      },
      resetUserValue() {
        this.user.password = "";
        this.user.username = "";
        this.changePassword.password = "";
        this.changePassword.newPassword = "";
        this.changePassword.newPasswordConfirm = "";
        this.submitted = false;
      },
      closeLoginModal() {
        this.resetUserValue();
        this.isLogin = true;
      },
      closeRegisterModal() {
        this.regUser.username = "";
        this.regUser.fname = "";
        this.regUser.password = "";
        this.regUser.passwordConfirm = "";
        this.regUser.city = "";
        this.regUser.moNo = "";
        this.$refs["register"].hide();
      },
    },
    beforeDestroy() {
      // if(DOMAIN == "world777.com"){
      // let theme = localStorage.getItem('theme')
      if (THEME != 'custom') {
        document.documentElement.dataset.theme = THEME;
      }
      // }
    },
  };
</script>
