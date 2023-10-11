<template>
  <div class="wrapper home-new">
    <div class="container">
      <div class="home-new-header">
        <div class="home-new-logo">
          <img v-lazy="logoPath" />
        </div>
        <div class="home-new-header-bottom">
              <div class="header-sport-list d-none-mobile">
                <marquee>
                  <div class="all-sports-list">
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/4-color.svg`" />
                      <div class="mt-1 text-center">Cricket</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/2-color.svg`" />
                      <div class="mt-1 text-center">Tennis</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/1-color.svg`" />
                      <div class="mt-1 text-center">Football</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/8-color.svg`" />
                      <div class="mt-1 text-center">Table Tennis</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/19-color.svg`" />
                      <div class="mt-1 text-center">Ice Hockey</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/11-color.svg`" />
                      <div class="mt-1 text-center">E Games</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/55-color.svg`" />
                      <div class="mt-1 text-center">Rugby League</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/3-color.svg`" />
                      <div class="mt-1 text-center">Boxing</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/7-color.svg`" />
                      <div class="mt-1 text-center">Beach Volleyball</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/3-color.svg`" />
                      <div class="mt-1 text-center">Mixed Martial Arts</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/9-color.svg`" />
                      <div class="mt-1 text-center">Futsal</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/10-color.svg`" />
                      <div class="mt-1 text-center">Horse Racing</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/12-color.svg`" />
                      <div class="mt-1 text-center">Greyhounds</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/15-color.svg`" />
                      <div class="mt-1 text-center">Basketball</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/16-color.svg`" />
                      <div class="mt-1 text-center">MotoGP</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/17-color.svg`" />
                      <div class="mt-1 text-center">Chess</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/18-color.svg`" />
                      <div class="mt-1 text-center">Volleyball</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/22-color.svg`" />
                      <div class="mt-1 text-center">Badminton</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/25-color.svg`" />
                      <div class="mt-1 text-center">Hockey</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/29-color.svg`" />
                      <div class="mt-1 text-center">Cyclling</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/32-color.svg`" />
                      <div class="mt-1 text-center">Motorbikes</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/33-color.svg`" />
                      <div class="mt-1 text-center">Athletics</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/35-color.svg`" />
                      <div class="mt-1 text-center">Basketball 3*3</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/37-color.svg`" />
                      <div class="mt-1 text-center">Sumo</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/38-color.svg`" />
                      <div class="mt-1 text-center">Virtual Sport</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/52-color.svg`" />
                      <div class="mt-1 text-center">Motor Sports</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/53-color.svg`" />
                      <div class="mt-1 text-center">Baseball</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/54-color.svg`" />
                      <div class="mt-1 text-center">Rugby Union</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/57-color.svg`" />
                      <div class="mt-1 text-center">Darts</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/58-color.svg`" />
                      <div class="mt-1 text-center">American Football</div>
                    </div>
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/59-color.svg`" />
                      <div class="mt-1 text-center">Snooker</div>
                    </div>
                    <!-- <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/62-color.svg`" />
                      <div class="mt-1 text-center">Soccer</div>
                    </div> -->
                    <div class="sport-list-item">
                      <img v-lazy="`${imgPath}front/img/events/11-color.svg`" />
                      <div class="mt-1 text-center">Esports</div>
                    </div>
                  </div>
                </marquee>
              </div>
              
        </div>
        <div class="header-right">
          <button class="btn btn-primary login-btn" @click="showLoginModal()">
            Login
          </button>
        </div>
       <!--  <div class="row row5 w-100 align-items-center">
          <div class="col-6 col-lg-2">
            
          </div>
          <div class="col-6 col-lg-10">
            
          </div>
        </div> -->
      </div>
      <div class="upcoming-fixure">
        <div class="fixure-title">Upcoming Fixtures</div>
        <marquee>
          <div class="fixure-box-container">
            <template v-for="(data, key) in fixtureData">
              <div class="fixure-box" :key="key">
                <div>
                  <i class="d-icon mr-2" :class="`icon-${data.sportid}`"></i>
                  {{ data.ename }}
                </div>
                <div v-format-datetime="{date: data.dt}"></div>
              </div>
            </template>
          </div>
        </marquee>
      </div>
      <!-- <h4 class="sport-list-title d-none-desktop">Sports</h4> -->
      <div class="w-100 d-none-desktop">
        <marquee>
          <div class="all-sports-list">
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/4-color.svg`" />
              <div class="mt-1 text-center">Cricket</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/2-color.svg`" />
              <div class="mt-1 text-center">Tennis</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/1-color.svg`" />
              <div class="mt-1 text-center">Football</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/8-color.svg`" />
              <div class="mt-1 text-center">Table Tennis</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/19-color.svg`" />
              <div class="mt-1 text-center">Ice Hockey</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/11-color.svg`" />
              <div class="mt-1 text-center">E Games</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/55-color.svg`" />
              <div class="mt-1 text-center">Rugby League</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/3-color.svg`" />
              <div class="mt-1 text-center">Boxing</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/7-color.svg`" />
              <div class="mt-1 text-center">Beach Volleyball</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/3-color.svg`" />
              <div class="mt-1 text-center">Mixed Martial Arts</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/9-color.svg`" />
              <div class="mt-1 text-center">Futsal</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/10-color.svg`" />
              <div class="mt-1 text-center">Horse Racing</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/12-color.svg`" />
              <div class="mt-1 text-center">Greyhounds</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/15-color.svg`" />
              <div class="mt-1 text-center">Basketball</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/16-color.svg`" />
              <div class="mt-1 text-center">MotoGP</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/17-color.svg`" />
              <div class="mt-1 text-center">Chess</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/18-color.svg`" />
              <div class="mt-1 text-center">Volleyball</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/22-color.svg`" />
              <div class="mt-1 text-center">Badminton</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/25-color.svg`" />
              <div class="mt-1 text-center">Hockey</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/29-color.svg`" />
              <div class="mt-1 text-center">Cyclling</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/32-color.svg`" />
              <div class="mt-1 text-center">Motorbikes</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/33-color.svg`" />
              <div class="mt-1 text-center">Athletics</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/35-color.svg`" />
              <div class="mt-1 text-center">Basketball 3*3</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/37-color.svg`" />
              <div class="mt-1 text-center">Sumo</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/38-color.svg`" />
              <div class="mt-1 text-center">Virtual Sport</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/52-color.svg`" />
              <div class="mt-1 text-center">Motor Sports</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/53-color.svg`" />
              <div class="mt-1 text-center">Baseball</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/54-color.svg`" />
              <div class="mt-1 text-center">Rugby Union</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/57-color.svg`" />
              <div class="mt-1 text-center">Darts</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/58-color.svg`" />
              <div class="mt-1 text-center">American Football</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/59-color.svg`" />
              <div class="mt-1 text-center">Snooker</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/62-color.svg`" />
              <div class="mt-1 text-center">Soccer</div>
            </div>
            <div class="sport-list-item">
              <img v-lazy="`${imgPath}front/img/events/11-color.svg`" />
              <div class="mt-1 text-center">Esports</div>
            </div>
          </div>
        </marquee>
      </div>
      <div
        v-if="themeBanners && themeBanners.length"
      >
        <b-carousel indicators :interval="10000" class="carousal-23">
          <template v-for="(data, key) in themeBanners">
            <b-carousel-slide
              :key="`wp${key}`"
              :background="'url('+themeBannerPath+data+')'"
            ></b-carousel-slide>
          </template>
        </b-carousel>
      </div>

      

      <div class="">
        <h4 class="sport-list-title">Our Live Casino</h4>
        <div class="casino-banners-list mt-2">
          <template v-for="(table, key) in tableList">
            <div
              class="casino-banner-item login-hover"
              :key="key"
              v-if="
                table.gid && table.gid != 'cricketv' && table.gid != 'cricketv2'
              "
              @click="showLoginModal"
            >
              <img
                v-lazy="casinoBannersPath + '/lc/' + table.gid + '.jpg'"
                class="img-fluid"
              />
              <div>Login</div>
            </div>
          </template>
        </div>
        <div class="container-fluid container-fluid-5">
          <div class="row row5">
            <div class="col-12 col-md-3">
              <h4 class="sport-list-title">Live Casino</h4>
              <div class="casino-banners-list live-casinos mt-2">
                <div class="casino-banner-item login-hover">
                  <a href="javascript:void(0);" @click="showLoginModal">
                    <img
                    v-lazy="`${imgPath}front/img/home-banners/live-casino/ezugi.jpg`"
                    class="img-fluid"
                    />
                    <div v-b-modal.login>Login</div>
                  </a>
                </div>
                <div class="casino-banner-item login-hover">
                  <a href="javascript:void(0);" @click="showLoginModal">
                    <img
                    v-lazy="`${imgPath}front/img/home-banners/live-casino/superspade.jpg`"
                    class="img-fluid"
                    />
                    <div v-b-modal.login>Login</div>
                  </a>
                </div>
                <div class="casino-banner-item login-hover">
                  <a href="javascript:void(0);" @click="showLoginModal">
                    <img
                    v-lazy="`${imgPath}front/img/home-banners/live-casino/qt.jpg`"
                    class="img-fluid"
                    />
                    <div v-b-modal.login>Login</div>
                  </a>
                </div>
                <div class="casino-banner-item login-hover">
                  <a href="javascript:void(0);" @click="showLoginModal">
                    <img
                    v-lazy="`${imgPath}front/img/home-banners/live-casino/evolution.jpg`"
                    class="img-fluid"
                    />
                    <div v-b-modal.login>Login</div>
                  </a>
                </div>
                <div class="casino-banner-item login-hover">
                  <a href="javascript:void(0);" @click="showLoginModal">
                    <img
                    v-lazy="`${imgPath}front/img/home-banners/live-casino/cockfight.jpg`"
                    class="img-fluid"
                    />
                    <div v-b-modal.login>Login</div>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3">
              <h4 class="sport-list-title">Virtual Casino</h4>
              <div class="casino-banners-list fantasy-games mt-2">
                <template v-for="(table, key) in vCasinoList">
                <div class="casino-banner-item login-hover" :key="key">
                  <a href="javascript:void(0);" @click="showLoginModal">
                    <img :src="casinoBannersPath + '/vc/' + table.gtype + '.jpg'" class="img-fluid" />
                    <div v-b-modal.login>Login</div>
                  </a>
                </div>
                </template>
              </div>
            </div>
            <div class="col-12 col-md-3">
              <h4 class="sport-list-title">Fantasy Games</h4>
              <div class="casino-banners-list fantasy-games mt-2">
                <template v-for="(table, key) in fantacyList">
                <div class="casino-banner-item login-hover" :key="key">
                  <a href="javascript:void(0);" @click="showLoginModal">
                    <img
                    v-lazy="casinoBannersPath + '/other/' + table.imgpath"
                    class="img-fluid"
                    />
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
                  <a href="javascript:void(0);" @click="showLoginModal">
                    <img :src="casinoBannersPath + '/other/' + table.imgpath" class="img-fluid" />
                    <div v-b-modal.login>Login</div>
                  </a>
                </div>
                </template>
              </div>
            </div>
            
          </div>
        </div>

        <h4 class="sport-list-title">Top Winners</h4>
        <div class="top-winners-list-container mt-2" v-if="winnerData.length > 0">
         
            <div class="top-winner-list-box-container1">
              <VueSlickCarousel  v-bind="sliderSetting">
               
              <div v-for="(data, key) in winnerData">
                <div class="top-winner-list-box" :key="key">
                  <div class="w-100 text-center">
                    <img v-lazy="`${imgPath}front/img/user-icon.png`" />
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
              </div>
            </VueSlickCarousel>
            </div>
        </div>
      </div>
      <footer class="footer">
        <div class="container-fluid container-fluid-5">
          <div class="row row5">
          <!--   <div class="col-lg-3">
              <img v-lazy="logoPath" class="img-logo" />
              
            </div> -->
            <div class="col-lg-12 text-center">
              <div class="footer-bottom" v-if="footerData.msg != ''">
                <span>{{ footerData.msg }}</span>
              </div>
              <div class="mt-2 gt">
                <a href="javascript:void(0)" v-b-modal.eighteenPlus>
                  <img v-lazy="imgPath + 'front/img/18plus.png'" />
                </a>
                <a href="https://www.gamcare.org.uk/" target="_blank">
                  <img v-lazy="imgPath + 'front/img/gamecare.png'" />
                </a>
                <a href="https://www.gamblingtherapy.org/en" target="_blank">
                  <img v-lazy="imgPath + 'front/img/gt.png'" />
                </a>
              </div>
              <div class="mt-3">© Copyright 2021. All Rights Reserved.</div>
            </div>
          </div>
        </div>
      </footer>
      <div>
        <div class="right-bar">
          <div>
            <div class="rightbar-title px-3 py-4">
              <a
                href="javascript:void(0);"
                class="closebtn float-right"
                @click="hideLoginModal"
              >
              </a>
              <h3 class="m-0 text-light">ADMIN LOGIN</h3>
            </div>
            <!-- Settings -->
            <hr class="mt-0" />
            <div class="p-4 mt-5">
              <div class="overflow-hidden">
                <div>
                  <template v-if="isLogin">
                    <h3 class="text-center mt-2 mb-0 text-secondary">
                      Welcome to Admin Panel
                    </h3>
                    <p class="text-center text-secondary">
                      Enter your Username and Password
                    </p>
                  </template>
                  <template v-else>
                    <h3 class="text-center mt-2 text-uppercase">Change Password</h3>
                  </template>
                  <b-alert
                    v-model="isAuthError"
                    variant="danger"
                    class="mt-3"
                    dismissible
                    >{{ authError }}</b-alert
                  >
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
                      <b-button
                        type="submit"
                        class="btn-block btn-theme1 btn-lg btn-submit"
                        >Sign In</b-button
                      >
                    </div>
                    <small class="recaptchaTerms">This site is protected by reCAPTCHA and the Google
                        <a href="https://policies.google.com/privacy">Privacy Policy</a> and
                        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                    </small>
                  </b-form>
                  <form
                    class="change-form p-2"
                    @submit.prevent="updatePassword('form-changepassword')"
                    data-vv-scope="form-changepassword"
                    v-if="!isLogin"
                    key="2"
                  >
                    <div class="form-group">
                      <label class="user-email-text">Old Password</label>
                      <input
                        type="password"
                        v-model="changePassword.password"
                        v-validate="'required'"
                        name="OldPassword"
                        class="form-control"
                      />
                      <span
                        v-if="verrors.has('form-changepassword.OldPassword')"
                        class="error"
                      >
                        {{ verrors.first("form-changepassword.OldPassword") }}
                      </span>
                    </div>
                    <div class="form-group">
                      <label class="user-email-text">New Password</label>
                      <input
                        type="password"
                        v-model="changePassword.newPassword"
                        v-validate="'required|verify_password|min:8|max:20'"
                        name="NewPassword"
                        ref="NewPassword"
                        class="form-control"
                      />
                      <span
                        v-if="verrors.has('form-changepassword.NewPassword')"
                        class="error"
                      >
                        {{ verrors.first("form-changepassword.NewPassword") }}
                      </span>
                    </div>
                    <div class="form-group">
                      <label class="user-email-text">Confirm Password</label>
                      <input
                        type="password"
                        v-model="changePassword.newPasswordConfirm"
                        v-validate="
                          'required|confirmed:NewPassword|verify_password|min:8|max:20'
                        "
                        name="ConfirmNewPassword"
                        data-vv-as="NewPassword"
                        class="form-control"
                      />
                      <span
                        v-if="verrors.has('form-changepassword.ConfirmNewPassword')"
                        class="error"
                      >
                        {{ verrors.first("form-changepassword.ConfirmNewPassword") }}
                      </span>
                    </div>
                    <div class="form-group mb-0">
                      <button
                        class="btn-block btn-theme1 btn-lg btn-submit"
                        type="submit"
                      >
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>
                <div class="text-center text-secondary mt-2">
                  <div class="mb-2">© Copyright 2021. All Rights Reserved.</div>
                  {{ footerData.msg }}
                </div>
                <!-- end card-body -->
              </div>
            </div>
          </div>
        </div>
        <!-- Right bar overlay-->
        <div class="rightbar-overlay"></div>
      </div>
    </div>
  </div>
</template>
<script>
import ServiceApi from "@/services/ServiceApi";
import crypto from "@/crypto";
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import VueSlickCarousel from 'vue-slick-carousel'

export default {
  components: { VueSlickCarousel },
  beforeMount() {
    if (this.$auth.check()) {
      this.$router.push({
        name: "home",
      });
    }
    $("body").addClass("login");
  },
  beforeDestroy() {
    $("body").removeClass("login");
    this.hideLoginModal();
  },
  mounted() {
    this.themeBanners = HOME_THEME_BANNERS ? HOME_THEME_BANNERS.split(",") : [];
    this.getWinners();
    this.getFixture();
  },
  data() {
    return {
      logoPath: LOGO_PATH,
      user: {
        username: "",
        password: "",
        recaptcha: ""
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
        password: "",
        newPassword: "",
        newPasswordConfirm: "",
        uname: "",
      },
      isMobileDevice: IS_MOBILE_DEVICE,
      themeBanners: [],
      domain: DOMAIN,
      themeBannerPath: THEME_DETAILS.banners_url + 'banners/',
      comBannerPath: BUCKET_PATH + "common/home-banners/",
      casinoBannersPath: BUCKET_PATH + "casino_icons",
      tableList: [
        {
          "gid": "teen1",
          "gname": "teen1",
          "gtid": 0,
          "imgpath": "teen1.jpg",
          "srno": 0,
          "tabno": 6
        },{
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
          "gname": "notenum",
          "gtid": 0,
          "imgpath": "notenum.jpg",
          "srno": 0,
          "tabno": 6
        },
        {
          "gid": "trio",
          "gname": "trio",
          "gtid": 0,
          "imgpath": "trio.jpg",
          "srno": 0,
          "tabno": 6
        },
        {
          "gid": "teen20b",
          "gname": "teen20b",
          "gtid": 0,
          "imgpath": "teen20b.jpg",
          "srno": 0,
          "tabno": 6
        },
        {
          "gid": "race17",
          "gname": "race17",
          "gtid": 0,
          "imgpath": "race17.jpg",
          "srno": 0,
          "tabno": 6
        },
        {
          "gid": "teenmuf",
          "gname": "teenmuf",
          "gtid": 0,
          "imgpath": "teenmuf.jpg",
          "srno": 0,
          "tabno": 6
        },
        {
          "gid": "teensin",
          "gname": "teensin",
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
          "gname": "The Trap",
          "gtid": 0,
          "imgpath": "superover.jpg",
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
        },{
          "gid": "lucky7eu2",
          "gname": "Lucky 7 - C",
          "gtid": 0,
          "imgpath": "lucky7eu2.jpg",
          "srno": 0,
          "tabno": 6
        },{
          "gid": "teen",
          "gname": "One Day Teenpatti",
          "gtid": 0,
          "imgpath": "teen.jpg",
          "srno": 1,
          "tabno": 6
        },
        {
          "gid": "teen20",
          "gname": "20-20 Teenpatti",
          "gtid": 0,
          "imgpath": "teen20.jpg",
          "srno": 2,
          "tabno": 6
        },
        {
          "gid": "teen9",
          "gname": "Test Teenpatti",
          "gtid": 0,
          "imgpath": "teen9.jpg",
          "srno": 3,
          "tabno": 6
        },
        {
          "gid": "teen8",
          "gname": "Open Teenpatti",
          "gtid": 0,
          "imgpath": "teen8.jpg",
          "srno": 4,
          "tabno": 6
        },
        {
          "gid": "poker",
          "gname": "One Day Poker",
          "gtid": 0,
          "imgpath": "poker.jpg",
          "srno": 5,
          "tabno": 6
        },
        {
          "gid": "poker20",
          "gname": "20-20 Poker",
          "gtid": 0,
          "imgpath": "poker20.jpg",
          "srno": 6,
          "tabno": 6
        },
        {
          "gid": "poker6",
          "gname": "6 Player Poker",
          "gtid": 0,
          "imgpath": "poker6.jpg",
          "srno": 7,
          "tabno": 6
        },
        {
          "gid": "baccarat",
          "gname": "Baccarat",
          "gtid": 0,
          "imgpath": "baccarat.jpg",
          "srno": 8,
          "tabno": 6
        },
        {
          "gid": "baccarat2",
          "gname": "Baccarat2",
          "gtid": 0,
          "imgpath": "baccarat2.jpg",
          "srno": 9,
          "tabno": 6
        },
        {
          "gid": "dt20",
          "gname": "20-20 Dragon Tiger",
          "gtid": 0,
          "imgpath": "dt20.jpg",
          "srno": 10,
          "tabno": 6
        },
        {
          "gid": "dt6",
          "gname": "One Day Dragon Tiger",
          "gtid": 0,
          "imgpath": "dt6.jpg",
          "srno": 11,
          "tabno": 6
        },
        {
          "gid": "dtl20",
          "gname": "20-20 Dragon Tiger Lion",
          "gtid": 0,
          "imgpath": "dtl20.jpg",
          "srno": 12,
          "tabno": 6
        },
        {
          "gid": "dt202",
          "gname": "20-20 Dragon Tiger 2",
          "gtid": 0,
          "imgpath": "dt202.jpg",
          "srno": 13,
          "tabno": 6
        },
        {
          "gid": "card32",
          "gname": "32 Cards - A",
          "gtid": 0,
          "imgpath": "card32.jpg",
          "srno": 14,
          "tabno": 6
        },
        {
          "gid": "card32eu",
          "gname": "32 Cards - B",
          "gtid": 0,
          "imgpath": "card32eu.jpg",
          "srno": 15,
          "tabno": 6
        },
        {
          "gid": "ab20",
          "gname": "Andar Bahar",
          "gtid": 0,
          "imgpath": "ab20.jpg",
          "srno": 16,
          "tabno": 6
        },
        {
          "gid": "abj",
          "gname": "Andar Bahar 2",
          "gtid": 0,
          "imgpath": "abj.jpg",
          "srno": 17,
          "tabno": 6
        },
        {
          "gid": "lucky7",
          "gname": "Lucky 7 - A",
          "gtid": 0,
          "imgpath": "lucky7.jpg",
          "srno": 18,
          "tabno": 6
        },
        {
          "gid": "lucky7eu",
          "gname": "Lucky 7 - B",
          "gtid": 0,
          "imgpath": "lucky7eu.jpg",
          "srno": 19,
          "tabno": 6
        },
        {
          "gid": "3cardj",
          "gname": "3 Cards Judgement",
          "gtid": 0,
          "imgpath": "3cardj.jpg",
          "srno": 20,
          "tabno": 6
        },
        {
          "gid": "war",
          "gname": "Casino War",
          "gtid": 0,
          "imgpath": "war.jpg",
          "srno": 21,
          "tabno": 6
        },
        {
          "gid": "worli",
          "gname": "Worli Matka",
          "gtid": 0,
          "imgpath": "worli.jpg",
          "srno": 22,
          "tabno": 6
        },
        {
          "gid": "worli2",
          "gname": "Instant Worli",
          "gtid": 0,
          "imgpath": "worli2.jpg",
          "srno": 23,
          "tabno": 6
        },
        {
          "gid": "aaa",
          "gname": "Amar Akbar Anthony",
          "gtid": 0,
          "imgpath": "aaa.jpg",
          "srno": 24,
          "tabno": 6
        },
        {
          "gid": "btable",
          "gname": "Bollywood Table",
          "gtid": 0,
          "imgpath": "btable.jpg",
          "srno": 25,
          "tabno": 6
        },
        {
          "gid": "lottcard",
          "gname": "Lottery",
          "gtid": 0,
          "imgpath": "lottcard.jpg",
          "srno": 26,
          "tabno": 6
        },
        {
          "gid": "cricketv3",
          "gname": "5Five Cricket",
          "gtid": 0,
          "imgpath": "cricketv3.jpg",
          "srno": 27,
          "tabno": 6
        },
        {
          "gid": "cmatch20",
          "gname": "20-20 Cricket Match",
          "gtid": 0,
          "imgpath": "cmatch20.jpg",
          "srno": 28,
          "tabno": 6
        },
        {
          "gid": "cmeter",
          "gname": "Casino Meter",
          "gtid": 0,
          "imgpath": "cmeter.jpg",
          "srno": 29,
          "tabno": 6
        },
        {
          "gid": "teen6",
          "gname": "Teenpatti 2.0",
          "gtid": 0,
          "imgpath": "teen6.jpg",
          "srno": 30,
          "tabno": 6
        },
        {
          "gid": "queen",
          "gname": "Queen",
          "gtid": 0,
          "imgpath": "queen.jpg",
          "srno": 31,
          "tabno": 6
        },
        {
          "gid": "race20",
          "gname": "Race 20",
          "gtid": 0,
          "imgpath": "race20.jpg",
          "srno": 32,
          "tabno": 6
        },
        // {
        //   "gid": "lucky7eu2",
        //   "gname": "Lucky 7 - C",
        //   "gtid": 0,
        //   "imgpath": "lucky7eu2.jpg",
        //   "srno": 33,
        //   "tabno": 6
        // }
      ],
      fantacyList: [
        {
          gmid: "dream",
          gname: "Diam11",
          imgpath: "diam11.png",
          sno: 1,
          tabno: 7,
        },
        {
          gmid: "daba",
          gname: "Player Battle",
          imgpath: "playerbattle.jpeg",
          sno: 2,
          tabno: 7,
        },
        /*{
        "gmid": "sports-runner",
        "gname": "Runner",
        "imgpath": "runner.jpeg",
        "sno": 3,
        "tabno": 7
      },*/
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
        }
      ],
      othersList: [{
        gmid: "binary",
        gname: "Binary",
        imgpath: "binary.jpg",
        sno: 5,
        tabno: 7,
      }, ],
      footerData: {
        /*support_no: SUPPORT_NO,
        fb_link: FACEBOOK_LINK,
        tw_link: TWITTER_LINK,
        insta_link: INSTAGRAM_LINK,
        tele_link: TELEGRAM_LINK,
        youtube_link: YOUTUBE_LINK,*/
        msg: THEME_DETAILS.footer_msg,
      },
      fixtureData: [],
      winnerData: [],
      sliderSetting: {
        "arrows": false,
        "dots": false,
        "infinite": true,
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "centerPadding": "20px",
        "autoplay": true,
        "speed": 2000,
        "autoplaySpeed": 2000,
        "cssEase": "linear",
        "variableWidth": true,
        "pauseOnHover": false
      },
      vCasinoList: [
          {
              gtype: 'vteen',
              route: 'vTeen'
          },
          {
              gtype: 'vteen20',
              route: 'vTeen20'
          }
      ]
    };
  },
  methods: {
    updatePassword(scope) {
      if (this.loading) return;
      this.$validator.validateAll(scope).then((valid) => {
        if (valid) {
          this.loading = true;
          this.changePassword.uname = this.user.username;
          ServiceApi.callApi("changepass-login", this.changePassword)
            .then((response) => {
              if (response.status == 200) {
                this.$swal({
                  icon: "success",
                  text: response.data.msg,
                });
                this.isLogin = true;
                this.loading = false;

                this.$router.push({
                  name: "ChangePasswordSuccess",
                  params: { token: response.data.tran },
                });
              } else {
                this.$swal({
                  icon: "error",
                  text: response.msg,
                });
                this.loading = false;
              }
            })
            .catch((e) => {
              if (e.response) {
                if (e.response.status == 405) {
                  this.$swal({
                    icon: "success",
                    text: e.response.data.msg,
                  });
                }
              }
              this.loading = false;
            });
        }
      });
    },

    login() {
      /* this.$router.push({
                  name: "ChangePasswordSuccess",
                  params: { token: '323432' }
                });*/

      if (this.submitted) {
        return;
      }
      this.has_error = false;
      this.errors = {};
      this.error = "";

      this.submitted = true;

      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$recaptcha("login").then(token => {
            this.user.recaptcha = token;
            let params = 
              ENC_RESPONSE == true
              ? {
                  data: _0x895125e(this.user, require("crypto-js")),
                }
              : this.user;

              this.$auth.login({
                data: params,
                success: function (res) {
                  this.submitted = false;
                  // let response = res.data;
                  let response =
                    ENC_RESPONSE == true
                      ? _0x895125d(res.data.data, require("crypto-js"))
                      : res.data;

                  if (response.status == 200) {
                    this.$store.state.rdisplay = response.data.rdisplay;

                    this.$store.commit("updatePermission", response.data.pcode);

                    if (response.data.login) {
                      this.$ls.set("admin_user", JSON.stringify(response.data));
                      this.$auth.token(null, response.data.token, false);

                      this.$store.state.WMSG = response.msg;

                      // this.$router.push({
                      //   name: "home"
                      // });
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
                      this.user.password = "";
                      this.$swal({
                        icon: "success",
                        text:
                          "Welcome, You are logged in first time. Please change your password to continue.",
                      });
                      //console.log(response.data.login)
                    }
                  }  else if(response.status == 402){
                    this.$swal({ icon: "error", text: response.msg});
                    window.location.reload();
                  }else {
                    this.$swal({
                      icon: "error",
                      text: response.msg,
                    });
                    //  this.flash("Login failed! Please try again!", 'error',{timeout: 5000});
                  }
                },
                error: function (res) {
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
                fetchUser: false,
              });
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
    },
    showLoginModal() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideLoginModal() {
      document.body.classList.remove("right-bar-enabled");
    },
    getFixture() {
      ServiceApi.callApi("fixturedata")
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
    getWinners() {
      ServiceApi.callApi("winners")
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
  },
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
