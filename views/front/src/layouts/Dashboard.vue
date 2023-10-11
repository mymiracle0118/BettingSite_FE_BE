<template>
  <div class="wrapper">
    <!-- <let-it-snow v-bind="snowConf" :show="show"></let-it-snow> -->
    <!-- <div class="animated-header" v-if="$store.state.showAnimation">
      <template v-if="timer">
        <span class="d-none-desktop mob">{{ timer }}</span>

        <span class="d-none-mobile web">{{ timer }}</span>
      </template>

      <div id="iplAnimation" style="height: 34px;">
      </div>
      <span class="fas fa-times" @click="$store.commit('toggleAnimation')"></span>
    </div> -->

    <div class="animated-header" v-if="$store.state.showAnimation">
      <section class="header-animated-banner" id="animationDashboard">
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

    <div class="header-top">
      <!-- <template v-if="showHoli">
        <template v-for="(i, key) in holiObject.left">
          <holi :key="`left-${key}`" name="left"/>
        </template>
      </template> -->

      <ul class="">
        <li>
          <router-link :to="{name: 'home'}">Exchange</router-link>
        </li>
        <li>
          <router-link :to="{name: 'owncasinolist'}">Live Casino</router-link>
        </li>
        <li>
          <router-link :to="{name: 'slotcasinolist'}">Slot</router-link>
        </li>
        <li>
          <router-link :to="{name: 'fantacy'}">Fantasy Games</router-link>
        </li>
        <li>
          <router-link :to="{name: 'others'}">Others</router-link>
        </li>
      </ul>

      <!-- <template v-if="$store.getters.domain == 'world777.com'"> -->
      <div class="color-box-container">
        <div class="color-box dark-box" @click="switchTheme('dark')"></div>
        <div class="color-box light-box" @click="switchTheme('light')"></div>
        <div class="color-box" v-if="themeType == '1'" :style="{ 'background-color' : bgBody }"
          @click="switchTheme('custom')"></div>
        <div class="color-box blue-box" v-else @click="switchTheme('blue')"></div>

        <template v-if="adminSettins">
          <template
            v-if="(adminSettins.button2 && adminSettins.button2.show) || (adminSettins.button3 && adminSettins.button3.show)">
            <div class="depo-withdraw-btn">
              <template v-if="adminSettins.button2 && adminSettins.button2.show">
                <a :href="adminSettins.button2.link" class="btn btn-sm mr-2" target="_blank"
                  :style="{ backgroundColor : adminSettins.button2.color, borderColor : adminSettins.button2.color, color : adminSettins.button2.fontcolor }">{{ adminSettins.button2.title }}</a>
              </template>
              <template v-if="adminSettins.button3 && adminSettins.button3.show">
                <a :href="adminSettins.button3.link" class="btn btn-sm" target="_blank"
                  :style="{ backgroundColor : adminSettins.button3.color, borderColor : adminSettins.button3.color, color : adminSettins.button3.fontcolor }">{{ adminSettins.button3.title }}</a>
              </template>
            </div>
          </template>
        </template>
      </div>
      <!-- </template> -->

      <!-- <template v-if="showHoli">
        <template v-for="(i, key) in holiObject.right">
          <holi :key="`right-${key}`" name="right"/>
        </template>
      </template> -->


      <b-modal ref="depositeModal" size="md" modal-class="deposit-modal" hide-footer>
        <Loader :isVisible="loading"></Loader>
        <!-- <div class="report-form"> -->
        <ValidationObserver tag="div" class="report-form" v-slot="{ invalid }">
          <ValidationProvider name="Amount" tag="div" class="form-group" v-slot="{ errors }"
            :rules="{required: true, numeric: true, min_value:1, regex: /^[0-9]+$/}">
            <label>Amount</label>
            <input type="text" v-model.number="depositeAmt" placeholder="Amount" class="form-control"
              onkeypress='return event.charCode >= 48 && event.charCode <= 57' />
            <span v-if="errors[0]" class="error">
              {{ errors[0] }}
            </span>
          </ValidationProvider>

          <div class="form-group">
            <button class="btn btn-primary" @click="getPaymentLink()" :disabled="invalid">Deposit</button>
          </div>

          <!-- <div class="form-group">
          <label>Amount</label>
          <input type="text" name="" v-model="depositeAmt" class="form-control" />
        </div> 
        <button class="btn btn-primary" @click="getPaymentLink()" :disabled="invalid">Deposit</button> -->
        </ValidationObserver>
        <!-- </div> -->
        <div class="mt-3">
          <p>
            After you deposit the amount please send the screenshot of
            your transaction to our support whatsapp number
          </p>
          <p><i class="fab fa-whatsapp mr-2"></i>+447575757572 / +447377773777</p>
          <p>For more transaction security we accept only indian cards and wallets</p>
        </div>
      </b-modal>
    </div>
    <template v-if="$store.getters.searchedData && $store.getters.searchedData.length">
      <div class="search-list d-none-mobile" v-click-outside="clearSearch">
        <div class="search-title">Search Result</div>
        <div class="search-content">
          <template v-for="(data, key) in $store.getters.searchedData">
            <div class="search-event-title" :key="`header${key}`">{{ data.etype }}</div>
            <template v-for="(event, key2) in data.events">
              <router-link :key="`body${key}-${key2}`" @click.native="clearSearch"
                :to="{ name: event.etid == 4 ? 'gameDetailCricket' : 'gameDetail', params: {etid: $base64.enc(event.etid), gameId: $base64.enc(event.gmid)}}">
                <div class="search-game">
                  <div class="search-game-name">{{ event.ename }}</div>
                  <div class="search-game-time">{{ changeDateFormat(event.stime) }}</div>
                </div>
              </router-link>
            </template>
          </template>
        </div>
      </div>
    </template>

    <SideBar />

    <div class="main-container">
      <NavBar />

      <div class="center-main-content">
        <template v-if="$pages.isNot('fullwidthcasino',$route.name)">
          <div class="news-bar d-none-desktop" v-if="$store.state.newsMsg">
            <marquee>{{ $store.state.newsMsg }}</marquee>
            <div class="news-title">
              <template v-if="theme == 'light'">
                <img :src="`${imgPath}front/img/icons/speaker-light.svg`">
              </template>
              <template v-else>
                <img :src="`${imgPath}front/img/icons/speaker.svg`">
              </template>
            </div>
          </div>

          <div class="upcoming-fixure d-none-desktop">
            <div class="fixure-title">Upcoming Fixtures</div>
            <div class="fixure-box-container">
              <div id="carousel3" class="carousel vert slide" data-ride="carousel" data-interval="3000">
                <div class="carousel-inner" v-if="fixtureData && fixtureData.length">
                  <template v-for="(data, key) in fixtureData">
                    <div class="carousel-item" :class="{'active': key == 0}" :key="key">
                      <div class="fixure-box">
                        <router-link
                          :to="{ name: data.sportid == 4 ? 'gameDetailCricket' : 'gameDetail', params: { etid: $base64.enc(data.sportid), gameId: $base64.enc(data.eid) }}">
                          <div>
                            <i class="d-icon mr-2" :class="`icon-${data.sportid}`"></i>
                            {{ data.ename }}
                          </div>
                          <div>{{ changeDateFormat(data.dt) }}</div>
                        </router-link>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Center Content -->
        <div :class="[{'center-container' : $pages.is('game', $route.name)}, 
          {'report-container' : $pages.is('report',$route.name)},
          {'fullwidthcasino-container' : $pages.is('fullwidthcasino',$route.name)},
          {'casino-center' : $pages.is('casino',$route.name)},
          {'lottery' : $route.name == 'lottery' }]">

          <router-view :key="$route.fullPath" ref="routerPage"></router-view>

          <!-- <template v-if="$store.getters.isTablet"> -->
          <Footer v-if="$pages.isNot('fullwidthcasino',$route.name)" />
          <!-- </template> -->
        </div>
        <!-- /Center Content -->

        <!-- Right Sidebar-->

        <div id="right-sidebar-id" class="right-sidebar" :class="[{'casino-right-sidebar teen2sidebar': $pages.is('casino',$route.name)}, 
            { 'five-sidebar': $route.name == 'cricketV3' || $route.name == 'superOver' }, 
            
            { 'home-right-sidebar' : $route.name == 'home' }]"
          v-if="$pages.isNot('report', $route.name) && $pages.isNot('fullwidthcasino', $route.name)">

          <!-- Tv Container Start -->
          <template
            v-if="$store.state.isTv && !(this.$store.state.showTv == true && this.$store.state.showTvTo == 'dragable')">
            <div class="tv-container">
              <div class="tv-title" @click="toggleTV('sidebar')">
                <h4 class="mb-0 bet-slip-title">TV</h4>
                <i class="float-right fas"
                  :class="[{'fa-angle-down':!$store.state.showTv},{'fa-angle-up':$store.state.showTv}]"></i>
              </div>
              <div class="video-tv mt-1" :class="{'hide-tv' : $store.state.showTv == false}">
                <i class="fas fa-expand tv-expand" @click="toggleTV('dragable')" v-if="$store.state.showTv"></i>
                <!-- <iframe v-if="$store.state.showTv && $store.state.showTvTo == 'sidebar' && $store.getters.isTablet"
                  :src="`/mediaplayer/game/${$store.state.gameId}/${$store.getters.ipAddress}`"></iframe> -->

                <iframe
                  v-if="$store.state.showTv && $store.state.showTvTo == 'sidebar' && $store.getters.isTablet && $store.state.tvUrl"
                  :src="$store.state.tvUrl"></iframe>
              </div>
            </div>
          </template>
          <!-- Tv Container End -->

          <!-- DRAGABLE TV WEB START -->
          <template v-if="$store.getters.isTablet && $store.state.showTvTo == 'dragable'">
            <div :class="{'d-block':$store.state.showTv, 'd-none':!$store.state.showTv}">
              <VueDragResize :isActive="$store.state.showTv" :preventActiveBehavior="true" :w="350" :h="220" :x="100"
                :y="50" :isResizable="false" contentClass="dragable-tv">
                <button class="btn btn-danger tvButton" v-if="$store.state.showTv" @click="$store.state.showTv = false">
                  <i class="fa fa-times"></i>
                </button>
                <!-- <iframe v-if="$store.state.showTv"
                  :src="`/mediaplayer/game/${$store.state.gameId}/${$store.getters.ipAddress}`"></iframe> -->
                <iframe v-if="$store.state.showTv && $store.state.tvUrl" :src="$store.state.tvUrl"></iframe>
              </VueDragResize>
            </div>
          </template>
          <!-- DRAGABLE TV WEB END -->

          <!-- Trader Modal Start -->
          <b-modal ref="trader-modal" sm :class="{ 'loader-section-parent' : $store.state.traderloadingPlacebet}"
            title="Please Confirm" @ok="traderPlacebet()" @cancel="clearTraderData()" @close="clearTraderData()"
            hide-footer modal-class="modal-place-bet">
            <Loader :isVisible="$store.state.traderloadingPlacebet"></Loader>

            <div class="row row5 confirm-bet mb-4" v-if="$store.state.traderBet">
              <div class="col-3 text-center">
                <div class="mb-2">Your Bet</div>
                <div>
                  <button class="btn btn-sm btn-outline-danger">
                    <h5>{{ $store.state.traderBet.uamount }}</h5>
                  </button>
                </div>
              </div>
              <div class="col-3 text-center">
                <div class="mb-2">Accepted</div>
                <div>
                  <button class="btn btn-sm btn-outline-success">
                    <h5>{{ $store.state.traderBet.amount }}</h5>
                  </button>
                </div>
              </div>
              <div class="col-3 text-center">
                <div class="mb-2">Rate</div>
                <div>
                  <button class="btn btn-sm btn-outline-default">
                    <h5>{{ $store.state.traderBet.uRate }}</h5>
                  </button>
                </div>
              </div>
              <div class="col-3 text-center">
                <div class="mb-2">Time Left</div>
                <div>
                  <button class="btn btn-sm btn-outline-default">
                    <h5>{{ $store.state.traderBet.time }}</h5>
                  </button>
                </div>
              </div>
            </div>

            <div class="modal-footer confirm-bet">
              <div>Are you Confirm</div>
              <button type="button" class="btn btn-danger" @click="clearTraderData()">No</button>
              <button type="button" class="btn btn-primary" @click="traderPlacebet()">Yes</button>
            </div>
          </b-modal>
          <!-- Trader Modal End -->

          <!-- GAME Bet Slip Container Start-->
          <ValidationObserver v-slot="{ invalid }">
            <div class="bet-slip-container"
              v-if="($route.name == 'gameDetail' || $route.name == 'gameDetailCricket' || $route.name == 'virtualCricket' || $route.name == 'virtualGame' || $route.name == 'cricketV3' || $route.name == 'superOver') && $store.state.bet && $store.state.bet != null">
              <div>
                <h4 class="mb-0 bet-slip-title">Bet Slip</h4>
              </div>

              <div class="bet-slip-box" :class="{ 'loader-section-parent' : $store.state.loadingPlacebet}">
                <Loader :isVisible="$store.state.loadingPlacebet"></Loader>

                <div class="bet-slip">
                  <div class="bet-nation">
                    <span>{{ $store.state.bet.eventName }}</span>
                    <a href="javascript:void(0)" class="close-bet float-right" @click="$store.commit('resetBetData')">
                      <img :src="imgPath + 'front/img/close.svg'">
                    </a>
                  </div>
                  <div class="match-result">
                    {{ $store.state.bet.marketName }}
                  </div>
                  <div class="bet-team">
                    <span class="bet-team-name" v-b-tooltip.hover
                      :title="`${$store.state.bet.sectionName} ${$store.state.bet.gType == 'fancy' ? $store.state.bet.size : ''} ${$store.state.bet.gType == 'khado' ? $store.state.bet.khado : ''}`">
                      {{ $store.state.bet.sectionName }}
                      <template v-if="$store.state.bet.gType == 'fancy'"> - {{ $store.state.bet.size }}</template>
                      <template v-if="$store.state.bet.gType == 'khado'"> - {{ $store.state.bet.khado }}</template>
                    </span>
                    <template v-if="$store.state.bet.gType == 'khado' || $store.state.bet.gType == 'match'">
                      <div class="odds-box float-right">
                        <input type="text" class="form-control" readonly="readonly"
                          v-model.number="$store.state.bet.uRate">
                        <a href="javascript:void(0)" @click="$store.commit('incrementStep')">
                          <img :src="imgPath + 'front/img/arrow-down.svg'" class="arrow-up">
                        </a>
                        <a href="javascript:void(0)" @click="$store.commit('decrementStep')">
                          <img :src="imgPath + 'front/img/arrow-down.svg'" class="arrow-down">
                        </a>
                      </div>
                    </template>
                    <template v-else>
                      <span class="float-right">{{ $store.state.bet.uRate }}</span>
                    </template>
                  </div>
                </div>

                <ValidationProvider name="Amount" tag="div" class="bet-input"
                  :class="[{'back-border' : $store.state.bet.gType == 'oddeven' ? true : $store.state.bet.betType.toLowerCase() == 'back'}, {'lay-border' : $store.state.bet.gType == 'oddeven' ? false : $store.state.bet.betType.toLowerCase() == 'lay'}]"
                  :rules="{required: true, min_value : 1, max_value : 999999999, regex: /^[0-9]+$/}">
                  <input type="text" id="placebetAmountWeb1" v-model.number="$store.state.bet.amount"
                    @input="$store.commit('updateBetAmount', $store.state.bet.amount)" class="form-control"
                    onkeypress='return event.charCode >= 48 && event.charCode <= 57' placeholder="Amount">
                </ValidationProvider>

                <div class="possible-win" v-if="$store.state.bet.profit">
                  <span>Profit: </span>
                  <h1 class="mb-0">{{ parseFloat($store.state.bet.profit) }}</h1>
                </div>
                <div class="bet-buttons">
                  <template v-for="(btn, key) in $store.state.buttonList">
                    <button class="btn btn-primary" @click="$store.commit('updateBetAmount', btn.bval)" :key="key">
                      <span>{{ btn.btxt }}</span>
                    </button>
                  </template>
                </div>
                <div class="confirm-bets">
                  <b-form-checkbox id="autocon-1" :checked="$store.state.autocon" @change="changeAutoCon($event)"
                    name="autocon-1" switch>
                    Auto Confirm Bet
                  </b-form-checkbox>
                </div>
              </div>

              <div class="place-bet-btn">
                <button class="btn btn-primary btn-block" :disabled="invalid" @click="placebet()">
                  <span>Place bet</span>
                </button>
              </div>

            </div>
          </ValidationObserver>
          <!-- GAME Bet Slip Container End-->

          <!-- GAME My Market Start -->
          <div class="my-market-container"
            v-if="($route.name == 'gameDetail' || $route.name == 'gameDetailCricket' || $route.name == 'virtualCricket' || $route.name == 'virtualGame' || $route.name == 'cricketV3' || $route.name == 'superOver') && $store.state.betSoda != null">
            <div>
              <h4 class="mb-0 d-none-mobile bet-slip-title">My Bets</h4>
            </div>

            <template v-for="(market, key) in $store.state.betSoda">
              <div class="my-market-title" data-toggle="collapse" :data-target="`#collapse${key}`"
                :aria-controls="`collapse${key}`" :aria-expanded="key==0" :key="`header${key}`"
                :class="{'collapsed' : key != 0}">
                {{ market.sdata[0].mname }} ({{ market.sdata.length }})
                <img :src="imgPath + 'front/img/arrow-down.svg'" class="float-right">
              </div>
              <div class="bet-slip-box collapse" :class="{'show':key==0}" :id="`collapse${key}`"
                data-parent=".my-market-container" :key="`collapse${key}`">
                <template v-for="(section, key1) in market.sdata">
                  <div class="bet-slip" :key="key1"
                    :class="[{'back-border': section.gtype == 'oddeven' ? true : section.btype.toLowerCase() == 'back'},{'lay-border': section.gtype == 'oddeven' ? false : section.btype.toLowerCase() == 'lay'}]">
                    <div class="row row2 market-desc">
                      <div class="col-6 text-left">
                        <div class="my-market-nation" v-b-tooltip.hover
                          :title="section.gtype == 'fancy' ? `${section.nat} / ${section.bhav}` : section.nat">
                          {{ section.nat }}
                          <template v-if="section.gtype == 'fancy'">
                            / {{ section.bhav }}
                          </template>
                        </div>
                      </div>
                      <div class="col-2 text-center">
                        <div>{{ section.urate }}</div>
                      </div>
                      <div class="col-4 text-right">
                        <div v-currency="section.amt">{{ section.amt }}</div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </template>

          </div>
          <!-- GAME My Market End -->


          <!-- Trap Images Start -->
          <div class="teen1daycasino-container trap-number d-none-mobile" v-if="$route.name == 'trap'">
            <img :src="`${imgPath}front/img/trap13.png`" class="img-fluid">
            <img :src="`${imgPath}front/img/trap14.png`" class="img-fluid">
            <img :src="`${imgPath}front/img/trap15.png`" class="img-fluid">
          </div>
          <!-- Trap Images End -->

          <!-- TEEN VIRTUAL LINK START -->
          <template v-if="$store.state.casinoGameType == 'teen'">
            <router-link :to="{name: 'vTeen'}">
              <div class="blink-message">
                  <i class="fas fa-info-circle"></i>
                  <div>Play Extremely Different Virtual Version of TEENPATTI 1-DAY</div>
              </div>
            </router-link>
          </template>
          <!-- TEEN VIRTUAL LINK END -->

          <!-- TEEN20 VIRTUAL LINK START -->
          <template v-if="$store.state.casinoGameType == 'teen20'">
            <router-link :to="{name: 'vTeen20'}">
              <div class="blink-message">
                  <i class="fas fa-info-circle"></i>
                  <div>Play Extremely Different Virtual Version of 20-20 Teenpatti</div>
              </div>
            </router-link>
          </template>
          <!-- TEEN20 VIRTUAL LINK END -->

          <!-- Casino Lastresults Start -->
          <div class="casino-place-bet" v-if="$pages.is('casino',$route.name)">
            <div class="casino-place-bet-title">
              <span>Last Results</span>
            </div>
            <LastResultIcon />
          </div>
          <!-- Casino Lastresults End -->

          <!-- CASINO Bet Slip Container Start-->
          <ValidationObserver v-slot="{ invalid }">
            <div class="casino-place-bet" v-if="$pages.is('casino', $route.name) && $store.state.casinoBet != null">
              <div class="casino-place-bet-title">
                <span>Place Bet</span>
                <span class="float-right casino-min-max">
                  Range:<span v-kval="{size: $store.state.casinoBet.min}"></span>-<span
                    v-kval="{size: $store.state.casinoBet.max}"></span>
                </span>
              </div>

              <!-- KBC BET SLIP START -->
              <template v-if="$store.state.casinoBet.gameType == 'kbc'">
                <div class="casino-place-bet-box">
                  <div class="kbcbtesbox">
                    <div class="bet-box">
                      <template v-if="$store.state.kbc.betSelect.redBlack.nat">
                        <span>{{ $store.state.kbc.betSelect.redBlack.nat }}</span>
                        <i class="float-right fas fa-times"
                          @click="$store.commit('removeKbcSelection', {key:'redBlack'})"></i>
                      </template>
                    </div>
                    <div class="bet-box">
                      <template v-if="$store.state.kbc.betSelect.oddEven.nat">
                        <span>{{ $store.state.kbc.betSelect.oddEven.nat }}</span>
                        <i class="float-right fas fa-times"
                          @click="$store.commit('removeKbcSelection', {key:'oddEven'})"></i>
                      </template>
                    </div>
                    <div class="bet-box">
                      <template v-if="$store.state.kbc.betSelect.upDown.nat">
                        <span>{{ $store.state.kbc.betSelect.upDown.nat }}</span>
                        <i class="float-right fas fa-times"
                          @click="$store.commit('removeKbcSelection', {key:'upDown'})"></i>
                      </template>
                    </div>
                    <div class="bet-box">
                      <template v-if="$store.state.kbc.betSelect.cardj.nat">
                        <span>{{ $store.state.kbc.betSelect.cardj.nat }}</span>
                        <i class="float-right fas fa-times"
                          @click="$store.commit('removeKbcSelection', {key:'cardj'})"></i>
                      </template>
                    </div>
                    <div class="bet-box">
                      <template v-if="$store.state.kbc.betSelect.color.nat">
                        <span>{{ $store.state.kbc.betSelect.color.nat }}</span>
                        <i class="float-right fas fa-times"
                          @click="$store.commit('removeKbcSelection', {key:'color'})"></i>
                      </template>
                    </div>
                    <ValidationProvider name="Amount" tag="div" class="bet-input"
                      :class="[{'back-border': $store.state.casinoBet.betType.toLowerCase() == 'back'}, {'lay-border': $store.state.casinoBet.betType.toLowerCase() == 'lay'}, {'andar-border': $store.state.casinoBet.betType.toLowerCase() == 'andar'}, {'bahar-border': $store.state.casinoBet.betType.toLowerCase() == 'bahar'}]"
                      :rules="{required: true, min_value : 1, max_value : 999999999, regex: /^[0-9]+$/}">
                      <input type="text" id="placebetAmountWeb" v-model.number="$store.state.casinoBet.amount"
                        class="form-control input-stake"
                        onkeypress='return event.charCode >= 48 && event.charCode <= 57'>
                    </ValidationProvider>
                  </div>
                  <div class="casino-place-bet-button-container">
                    <template v-for="(btn, key) in $store.state.buttonList">
                      <button class="btn btn-bet" @click="$store.commit('updateCasinoBetAmount', btn.bval)" :key="key">
                        <span>{{ btn.btxt }}</span>
                      </button>
                    </template>
                  </div>
                  <div class="casino-place-bet-action-buttons">
                    <button class="btn btn-reset" @click="$store.commit('resetCasinoBetData')">Reset</button>
                    <button class="btn btn-primary" @click="placebetCasino()"
                      :disabled="invalid || !$store.state.casinoBet.betStatus">Submit</button>
                  </div>
                </div>
              </template>
              <!-- KBC BET SLIP END -->

              <!-- OTHER BETS SLIP START -->
              <template v-else>
                <div class="casino-place-bet-header">
                  <div>(Bet for)</div>

                  <template v-if="$store.state.casinoBet.gameType == 'teensin'">
                    <template v-if="$store.state.casinoBet.subType != 'colorplus'">
                      <div>Odds</div>
                    </template>
                  </template>

                  <template v-else-if="$store.state.casinoBet.gameType == 'teenmuf'">
                    <template v-if="$store.state.casinoBet.subType != 'top9'">
                      <div>Odds</div>
                    </template>
                  </template>

                  <template v-else-if="$store.state.casinoBet.gameType == 'teen20b'">
                    <template v-if="$store.state.casinoBet.subType != 'Pair1'">
                      <div>Odds</div>
                    </template>
                  </template>

                  <template v-else-if="$store.state.casinoBet.gameType == 'teen20'">
                    <template v-if="$store.state.casinoBet.subType != 'Pair'">
                      <div>Odds</div>
                    </template>
                  </template>

                  <template v-else>
                    <div>Odds</div>
                  </template>

                  <div>Stake</div>
                  <div>Profit</div>
                </div>
                <div class="casino-place-bet-box"
                  :class="{ 'loader-section-parent' : $store.state.loadingCasinoPlacebet}">
                  <Loader :isVisible="$store.state.loadingCasinoPlacebet"></Loader>
                  <div class="casino-place-bet-info">
                    <div class="bet-player">
                      <span>{{ $store.state.casinoBet.nation }}</span>
                    </div>

                    <template v-if="$store.state.casinoBet.gameType == 'teensin'">
                      <template v-if="$store.state.casinoBet.subType != 'colorplus'">
                        <div class="odds-box">
                          <input type="text" disabled v-model.number="$store.state.casinoBet.uRate"
                            class="form-control">
                          <img :src="imgPath + 'front/img/arrow-down.svg'" class="arrow-up">
                          <img :src="imgPath + 'front/img/arrow-down.svg'" class="arrow-down">
                        </div>
                      </template>
                    </template>

                    <template v-else-if="$store.state.casinoBet.gameType == 'teenmuf'">
                      <template v-if="$store.state.casinoBet.subType != 'top9'">
                        <div class="odds-box">
                          <input type="text" disabled v-model.number="$store.state.casinoBet.uRate"
                            class="form-control">
                          <img :src="imgPath + 'front/img/arrow-down.svg'" class="arrow-up">
                          <img :src="imgPath + 'front/img/arrow-down.svg'" class="arrow-down">
                        </div>
                      </template>
                    </template>

                    <template v-else-if="$store.state.casinoBet.gameType == 'teen20b'">
                      <template v-if="$store.state.casinoBet.subType != 'Pair1'">
                        <div class="odds-box">
                          <input type="text" disabled v-model.number="$store.state.casinoBet.uRate"
                            class="form-control">
                          <img :src="imgPath + 'front/img/arrow-down.svg'" class="arrow-up">
                          <img :src="imgPath + 'front/img/arrow-down.svg'" class="arrow-down">
                        </div>
                      </template>
                    </template>

                    <template v-else-if="$store.state.casinoBet.gameType == 'teen20'">
                      <template v-if="$store.state.casinoBet.subType != 'Pair'">
                        <div class="odds-box">
                          <input type="text" disabled v-model.number="$store.state.casinoBet.uRate"
                            class="form-control">
                          <img :src="imgPath + 'front/img/arrow-down.svg'" class="arrow-up">
                          <img :src="imgPath + 'front/img/arrow-down.svg'" class="arrow-down">
                        </div>
                      </template>
                    </template>

                    <template v-else>
                      <div class="odds-box">
                        <input type="text" disabled v-model.number="$store.state.casinoBet.uRate" class="form-control">
                        <img :src="imgPath + 'front/img/arrow-down.svg'" class="arrow-up">
                        <img :src="imgPath + 'front/img/arrow-down.svg'" class="arrow-down">
                      </div>
                    </template>

                    <ValidationProvider name="Amount" tag="div" class="bet-input"
                      :class="[{'back-border': $store.state.casinoBet.betType.toLowerCase() == 'back'}, {'lay-border': $store.state.casinoBet.betType.toLowerCase() == 'lay'}, {'andar-border': $store.state.casinoBet.betType.toLowerCase() == 'andar'}, {'bahar-border': $store.state.casinoBet.betType.toLowerCase() == 'bahar'}]"
                      :rules="{required: true, min_value : 1, max_value : 999999999, regex: /^[0-9]+$/}">
                      <input type="text" id="placebetAmountWeb" v-model.number="$store.state.casinoBet.amount"
                        class="form-control input-stake"
                        onkeypress='return event.charCode >= 48 && event.charCode <= 57'>
                    </ValidationProvider>

                    <div>0</div>
                  </div>
                  <div class="casino-place-bet-button-container">
                    <template v-for="(btn, key) in $store.state.buttonList">
                      <button class="btn btn-bet" @click="$store.commit('updateCasinoBetAmount', btn.bval)" :key="key">
                        <span>{{ btn.btxt }}</span>
                      </button>
                    </template>
                  </div>
                  <div class="casino-place-bet-action-buttons">
                    <button class="btn btn-reset" @click="$store.commit('resetCasinoBetData')">Reset</button>
                    <template v-if="$route.name == 'worli' || $route.name == '3cardsJudgement'">
                      <button class="btn btn-primary" @click="placebetCasino()"
                        :disabled="invalid || !$store.state.casinoBet.betStatus">Submit</button>
                    </template>
                    <template v-else>
                      <button class="btn btn-primary" @click="placebetCasino()" :disabled="invalid">Submit</button>
                    </template>
                  </div>
                </div>
              </template>
              <!-- OTHER BETS SLIP END -->
            </div>
          </ValidationObserver>
          <!-- CASINO Bet Slip Container END-->

          <!-- CASINO My Market Start -->
          <div class="casino-my-bet"
            v-if="$pages.is('casino', $route.name) && $store.state.casinoBetSoda != null && ($route.name != 'cricketV3' || $route.name != 'superOver')">
            <div class="casino-place-bet-title">My Bets</div>

            <!-- KBC SODA Start -->
            <template v-if="$route.name == 'kbc'">
              <template v-for="(data, key) in $store.state.casinoBetSoda">
                <div :key="key" class="kbcbtesbox casino-place-bet-row back-border"
                  :class="[{'back-border': data.btype.toLowerCase() == 'back'}, {'lay-border': data.btype.toLowerCase() == 'lay'}]">
                  <template v-for="(nat, key) in data.natjson">
                    <div class="bet-box" :key="key">
                      <span>{{`[Q${key+1}] ${nat.c[0].s}`}}</span>
                    </div>
                  </template>
                  <div class="text-center">
                    <div :class="[{'hbtn': data.bhav == 1}, {'fbtn': data.bhav == 2}, {'fivebtn': data.bhav == 3}]">
                      <span v-if="data.bhav == 1">4 Cards Quit</span>
                      <span v-else-if="data.bhav == 2">50-50 Quit</span>
                      <span v-else-if="data.bhav == 3">5 Cards</span>
                    </div>
                  </div>
                  <div class="w-100 text-center text-yellow"><b v-currency="data.amt">0</b></div>
                </div>
              </template>
            </template>
            <!-- KBC SODA End -->

            <!-- OTHER SODA Start -->
            <template v-else>
              <div class="casino-place-bet-header">
                <div class="casino-place-bet-nation">Matched Bet(s)</div>
                <div class="casino-place-bet-odds">Odds</div>
                <div class="casino-place-bet-stake">Stake</div>
              </div>
              <div class="casino-place-bet-body">
                <template v-for="(data, key) in $store.state.casinoBetSoda">
                  <div class="casino-place-bet-row" :key="key"
                    :class="[{'back-border': data.btype.toLowerCase() == 'back' && $route.name != 'andarBahar'}, 
                      {'lay-border': data.btype.toLowerCase() == 'lay' && $route.name != 'andarBahar'}, 
                      {'andar-border': data.nat.split(' ')[0].toLowerCase() == 'andar' && $route.name == 'andarBahar'}, 
                      {'bahar-border': data.nat.split(' ')[0].toLowerCase() == 'bahar' && $route.name == 'andarBahar'}]">
                    <div class="casino-place-bet-nation">{{ data.nat }}</div>
                    <div class="casino-place-bet-odds">{{ data.urate }}</div>
                    <div v-currency="data.amt" class="casino-place-bet-stake">{{ data.amt }}</div>
                  </div>
                </template>
              </div>
            </template>
            <!-- OTHER SODA End -->
          </div>
          <!-- CASINO My Market End -->

          <!-- CASINO Rules Start -->
          <div class="mt-2 casino-rules-table" v-if="$store.state.casinoRules">
            <div class="casino-place-bet-title">Rules</div>
            <div class="table-responsive">
              <template v-for="(rules, key) in $store.state.casinoRules">
                <table class="table" :key="key">
                  <thead>
                    <tr>
                      <th colspan="2" class="text-center">{{ rules.hed }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(rule, key1) in rules.child">
                      <tr :key="key1">
                        <td>{{ rule.nat }}</td>
                        <td>{{ rule.resval }}</td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </template>
            </div>
          </div>
          <!-- CASINO Rules End -->

          <!-- SuperOver CASINO Rules Start -->
          <div class="mt-2 cricket-rule casino-place-bet" v-if="$route.name == 'superOver'">
            <div class="casino-place-bet-title text-center">ENG vs RSA<br>Inning's Card Rules</div>
            <div class="card">
              <div class="card-header">
                <div class="row row5 mt-1">
                  <div class="col-4">Cards</div>
                  <div class="col-3 text-center">Count</div>
                  <div class="col-5 text-right">Value</div>
                </div>
              </div>
              <div class="card-body">
                <div class="row row5 mt-1">
                  <div class="col-4">
                    <img :src="`${imgPath}front/img/superOver/cards/cardA.png`">
                    <span class="ml-2">X</span>
                  </div>
                  <div class="col-3 text-center">5</div>
                  <div class="col-5 text-right value">
                    <img :src="`${imgPath}front/img/superOver/balls/ball1.png`">
                  </div>
                </div>
                <div class="row row5 mt-1">
                  <div class="col-4">
                    <img :src="`${imgPath}front/img/superOver/cards/card2.png`">
                    <span class="ml-2">X</span>
                  </div>
                  <div class="col-3 text-center">5</div>
                  <div class="col-5 text-right value">
                    <img :src="`${imgPath}front/img/superOver/balls/ball2.png`">
                  </div>
                </div>
                <div class="row row5 mt-1">
                  <div class="col-4">
                    <img :src="`${imgPath}front/img/superOver/cards/card3.png`">
                    <span class="ml-2">X</span>
                  </div>
                  <div class="col-3 text-center">5</div>
                  <div class="col-5 text-right value">
                    <img :src="`${imgPath}front/img/superOver/balls/ball3.png`">
                  </div>
                </div>
                <div class="row row5 mt-1">
                  <div class="col-4">
                    <img :src="`${imgPath}front/img/superOver/cards/card4.png`">
                    <span class="ml-2">X</span>
                  </div>
                  <div class="col-3 text-center">5</div>
                  <div class="col-5 text-right value">
                    <img :src="`${imgPath}front/img/superOver/balls/ball4.png`">
                  </div>
                </div>
                <div class="row row5 mt-1">
                  <div class="col-4">
                    <img :src="`${imgPath}front/img/superOver/cards/card6.png`">
                    <span class="ml-2">X</span>
                  </div>
                  <div class="col-3 text-center">5</div>
                  <div class="col-5 text-right value">
                    <img :src="`${imgPath}front/img/superOver/balls/ball6.png`">
                  </div>
                </div>
                <div class="row row5 mt-1">
                  <div class="col-4">
                    <img :src="`${imgPath}front/img/superOver/cards/card10.png`">
                    <span class="ml-2">X</span>
                  </div>
                  <div class="col-3 text-center">5</div>
                  <div class="col-5 text-right value">
                    <img :src="`${imgPath}front/img/superOver/balls/ball0.png`">
                  </div>
                </div>
                <div class="row row5 mt-1">
                  <div class="col-4">
                    <img :src="`${imgPath}front/img/superOver/cards/cardK.png`">
                    <span class="ml-2">X</span>
                  </div>
                  <div class="col-3 text-center">5</div>
                  <div class="col-5 text-right value">
                    WICKET
                    <img :src="`${imgPath}front/img/superOver/balls/wicket.png`">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- SuperOver CASINO Rules End -->

          <template
            v-if="$route.name == 'home' && $store.getters.sortedEventListHome && $store.getters.sortedEventListHome.length">
            <div class="home-casiono-icons d-none-mobile">
              <VueSlickCarousel v-bind="sliderSetting1">
                <template v-for="(event, key) in $store.getters.sortedEventListHome">
                  <div class="home-casino-icon-item" :key="key">
                    <template v-if="event.gtype.toLowerCase() == 'casino'">
                      <router-link :to="{ name: $pages.getCasinoRoute(event.pid) }">
                        <div :style="{ 'background-image' : `url(${eventPath}${event.gmname})`}" class="carousal-53">
                        </div>
                        <div class="new-laucnh-icon" v-if="event.nlunched">
                          <img :src="imgPath + 'front/img/new-launch.png'">
                        </div>
                      </router-link>
                    </template>
                    <template v-if="event.gtype.toLowerCase() == 'vcasino'">
                      <router-link :to="{ name: $pages.getVcCasinoRoute(event.pid) }">
                        <div :style="{ 'background-image' : `url(${eventPath}${event.gmname})`}" class="carousal-53">
                        </div>
                        <div class="new-laucnh-icon" v-if="event.nlunched">
                          <img :src="imgPath + 'front/img/new-launch.png'">
                        </div>
                      </router-link>
                    </template>
                    <template v-else-if="event.gtype.toLowerCase() == 'game'">
                      <router-link
                        :to="{ name: event.m == 4 ? 'gameDetailCricket' : 'gameDetail', params: { etid: $base64.enc(event.m), gameId: $base64.enc(event.pid) }}">
                        <div :style="{ 'background-image' : `url(${eventPath}${event.gmname})`}" class="carousal-53">
                        </div>
                        <div class="new-laucnh-icon" v-if="event.nlunched">
                          <img :src="imgPath + 'front/img/new-launch.png'">
                        </div>
                      </router-link>
                    </template>
                    <template v-else-if="event.gtype.toLowerCase() == 'fantasy'">
                      <router-link :to="{ name: 'fantacy', params: { gmid: event.pid }}">

                        <div :style="{ 'background-image' : `url(${eventPath}${event.gmname})`}" class="carousal-63">
                        </div>
                        <div class="new-laucnh-icon" v-if="event.nlunched">
                          <img :src="imgPath + 'front/img/new-launch.png'">
                        </div>
                      </router-link>
                    </template>
                    <template v-else-if="event.gtype.toLowerCase() == 'others'">
                      <router-link :to="{ name: 'others', params: { gmid: event.pid }}">

                        <div :style="{ 'background-image' : `url(${eventPath}${event.gmname})`}" class="carousal-63">
                        </div>
                        <div class="new-laucnh-icon" v-if="event.nlunched">
                          <img :src="imgPath + 'front/img/new-launch.png'">
                        </div>
                      </router-link>
                    </template>
                  </div>
                </template>
              </VueSlickCarousel>
            </div>
          </template>

        </div>
        <!-- /Right Sidebar-->

      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "../components/nav-bar";
  import SideBar from "../components/side-bar";
  import Footer from "../components/footer";
  import Loader from '@/components/loader'
  import ServiceApi from "@/services/ServiceApi";
  // import LetItSnow from 'vue-let-it-snow';
  import VueDragResize from 'vue-drag-resize';
  import VueSlickCarousel from 'vue-slick-carousel'
  import moment from 'moment-timezone'
  moment.tz.setDefault(DEFAULT_TIMEZONE);
  // import Holi from '@/components/Holi.vue';

  import LastResultIcon from '@/components/casino/results/LastResultIcon'

  var snowInterval

  export default {
    components: {
      LastResultIcon,
      VueDragResize,
      NavBar,
      SideBar,
      Footer,
      Loader,
      // LetItSnow,
      // Holi,
      VueSlickCarousel
    },
    data() {
      return {
        // showHoli: false,
        // holiObject: {
        //   left: this.getRndInteger(4,6),
        //   right: this.getRndInteger(4,6)
        // },
        adminSettins: ADMIN_SETTING,
        loading: false,
        depositeAmt: "",
        sliderSetting1: {
          "swipeToSlide": true,
          "arrows": true,
          "dots": false,
          "infinite": true,
          "slidesToShow": 5,
          "slidesToScroll": 1,
          "centerPadding": "0px",
          "autoplay": true,
          "speed": 1000,
          "autoplaySpeed": 3000,
          "pauseOnHover": false,
          "vertical": true,
          "verticalSwiping": true
        },
        fixtureData: [],
        rulesData: [],
        snowConf: {
          windPower: 1,
          speed: 1,
          count: 12,
          size: 5,
          opacity: 3,
          images: [
            'https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/snow.png',
            // 'https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/sock.png',
            // 'https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/tree.png'
          ]
        },
        show: false,
        imgPath: IMG_PATH,
        eventPath: BUCKET_PATH + 'common/sliders/',
        autocon: false,
        callUserDataApi: true,
        callApi: true,
        // callTreeApi: true,
        loadingPlacebet: false,
        theme: THEME,
        timer: "",
        themeType: THEME_TYPE,
        bgBody: BG_BODY
      };
    },

    created: () => {},
    mounted() {
      $('#carousel3').carousel({
        interval: 3000
      })
      this.show = true
      if (this.$store.state.showAnimation) {
        setTimeout(() => {
          new Typed('#animationDashboard .text span', {
            strings: ANIMATION_MSG,
            typeSpeed: 60,
            backSpeed: 60,
            loop: true,
            showCursor: false,
          })
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
      //   let svgContainer = document.getElementById('iplAnimation');
      //   let path = !this.$store.getters.isTablet ? IMG_PATH + "front/js/Banner_3.json" : IMG_PATH + "front/js/Banner_2.json"
      //   let animItem = bodymovin.loadAnimation({
      //     wrapper: svgContainer,
      //     animType: 'svg',
      //     loop: true,
      //     path: path
      //   });
      // }

      // setTimeout(() => {
      //   this.showHoli = true
      // }, 1000);

      // snowInterval = setInterval(() => {
      //   this.snowConf.size = _.random(2, 4, false)
      //   this.snowConf.count = _.random(3, 6, false)
      //   this.snowConf.windPower = _.random(-1, 4, true)
      // }, 10000);

      // const self = this
      // var myElement = document.querySelector("#app")
      // var hammertime = new Hammer(myElement);
      // hammertime.on('swiperight', function (ev) {
      //   // console.log('right', ev)
      //   if (IS_MOBILE) {
      //     self.$store.state.collapsSidebar = true
      //   }
      // });

      this.getCasinoList()
      if (this.$store.getters.isMobile) {
        this.getFixture();
      }
      // this.getButtonList()
      this.getUserData()
      this.getData()
      // this.getTreeData();
    },
    methods: {
      switchTheme(themeColor) {
        ServiceApi.callApi("api/front/changetheme", {
            theme: themeColor,
          })
          .then((response) => {
            // console.log(response)
            if (response.status == 200) {
              // localStorage.setItem("theme", themeColor);
              window.location.reload();
            } else {

            }
          })
          .catch((e) => {

          });
      },
      getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      changeDateFormat(date) {
        return moment(String(date), 'MM-DD-YYYY hh:mm:ss A').format('DD/MM/YYYY HH:mm:ss')
      },
      showDePositeMdl() {
        this.$refs["depositeModal"].show();
      },
      hideDepositeModal() {
        this.$refs["depositeModal"].hide();
      },
      getPaymentLink() {
        this.loading = true;
        ServiceApi.callApi("api/front/deposite", {
            amt: this.depositeAmt,
          })
          .then((response) => {
            if (response.status == 200) {
              window.open(response.data.url, "_blank");
              setTimeout((res) => {
                this.depositeAmt = "";
                this.hideDepositeModal();
              }, 1000);
            } else {
              this.$bvToast.toast(response.msg, {
                variant: "danger",
                toaster: "b-toaster-top-full",
                autoHideDelay: 3000,
              });
            }
          })
          .catch((e) => {
            this.$bvToast.toast(e, {
              variant: "danger",
              toaster: "b-toaster-top-full",
              autoHideDelay: 3000,
            });
          })
          .finally((res) => {
            this.loading = false;
          });
      },
      getCasinoList() {
        ServiceApi.callApi("api/front/casino/alllist", {})
          .then(response => {
            if (response.status == 200) {
              this.$store.state.casino.casinoList = response.data

              // this.$store.state.casino.casinoList.push({ctype: 16, sno: 7, cname: "TGS Casino", type: "CS"})

              this.$store.state.casino.casinoType = _.get(_.head(this.$store.state.casino.casinoList), 'ctype')
              this.$store.state.casino.type = _.get(_.head(this.$store.state.casino.casinoList), 'type')
              this.getTabList(this.$store.state.casino.casinoType)
            } else {
              this.$store.state.casino.casinoList = []
              this.$store.state.casino.casinoType = null
              this.$store.state.casino.type = null
            }
          })
          .catch(e => {
            this.$store.state.casino.casinoList = []
            this.$store.state.casino.casinoType = null
            this.$store.state.casino.type = null
          });
      },
      getTabList(ctype) {
        this.$store.state.casino.searchText = ''
        this.$store.state.casino.tabList = []
        this.$store.state.casino.tabId = null

        ServiceApi.callApi("api/front/casino/tablist", {
            'type': ctype
          })
          .then(response => {
            if (response.status == 200) {
              this.$store.state.casino.tabList = response.data.t1
              this.$store.state.casino.tabId = _.get(_.head(this.$store.state.casino.tabList), 'gmid')
              this.$store.state.casino.gameName = _.get(_.head(this.$store.state.casino.tabList), 'gname')
              this.getGameList(this.$store.state.casino.tabId)
            } else {
              this.$store.state.casino.tabList = []
              this.$store.state.casino.tabId = null
            }
          })
          .catch(e => {
            this.$store.state.casino.tabList = []
            this.$store.state.casino.tabId = null
          });
      },
      getGameList(gmid) {
        this.$store.state.casino.tableList = []
        ServiceApi.callApi("api/front/casino/tablelist", {
            'gmid': gmid,
            'ismob': IS_MOBILE ? 0 : 1
          })
          .then(response => {
            if (response.status == 200) {
              this.$store.state.casino.tableList = response.data.t1
            } else {
              this.$store.state.casino.tableList = []
            }
          })
          .catch(e => {
            this.$store.state.casino.tableList = []
          });
      },
      getFixture() {
        ServiceApi.callApi("api/front/fixture2")
          .then(response => {
            if (response.status == 200) {
              // console.log(response.data)
              this.fixtureData = response.data
            } else {
              this.fixtureData = []
            }
          })
          .catch(e => {
            this.fixtureData = []
          });
      },
      toggleTV(position) {
        if (this.$store.state.showTv == true && position == 'dragable') {
          this.$store.state.tvUrl = ''
          ServiceApi.callApi("api/front/gettv", {
              'gmid': parseInt(this.$store.state.gameId),
              'ip': this.$store.getters.ipAddress,
            })
            .then(response => {
              if (response.status == 200) {
                // console.log(response.data.url)
                this.$store.state.tvUrl = response.data.url
                this.$store.state.showTv = true
              } else {
                this.$store.state.tvUrl = ''
                this.$store.state.showTv = false
              }
            })
            .catch(e => {
              this.$store.state.tvUrl = ''
              this.$store.state.showTv = false
            });

          // this.$store.state.showTv = true
        } else {
          if (this.$store.state.showTv == false) {
            this.$store.state.tvUrl = ''
            ServiceApi.callApi("api/front/gettv", {
                'gmid': parseInt(this.$store.state.gameId),
                'ip': this.$store.getters.ipAddress,
              })
              .then(response => {
                if (response.status == 200) {
                  // console.log(response.data.url)
                  this.$store.state.tvUrl = response.data.url
                  this.$store.state.showTv = true
                } else {
                  this.$store.state.tvUrl = ''
                  this.$store.state.showTv = false
                }
              })
              .catch(e => {
                this.$store.state.tvUrl = ''
                this.$store.state.showTv = false
              });
          } else {
            this.$store.state.showTv = false
          }

          // this.$store.state.showTv = !this.$store.state.showTv
        }
        this.$store.state.showTvTo = position
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
      hideRules() {
        this.$refs['rulesModal'].hide()
        // localStorage.clear();
        // this.$auth.logout();
      },
      getRules() {
        this.rulesData = []
        ServiceApi.callApi("api/front/rules")
          .then(response => {
            if (response.status == 200) {
              this.rulesData = response.data
              this.$refs['rulesModal'].show()
            } else {
              this.rulesData = []
            }
          })
          .catch(e => {
            this.rulesData = []
          });
      },
      clearSearch(event) {
        if (this.$store.state.searchText && !IS_MOBILE) {
          this.$store.commit('resetSearch')
          this.$store.commit('toggleSidebar', true)
        }
      },
      changeAutoCon(event) {
        ServiceApi.callApi("api/front/changeautocon", {
            value: event
          })
          .then(response => {
            if (response.status == 200) {
              this.$store.state.autocon = event
              this.autocon = event
            }
          })
          .catch(e => {

          });
      },
      scroll_left() {
        let content = document.querySelector(".nav-tabs");
        content.scrollLeft -= 200;
      },
      scroll_right() {
        let content = document.querySelector(".nav-tabs");
        content.scrollLeft += 200;
      },
      // getButtonList() {
      //   ServiceApi.callApi("api/front/buttonlist")
      //     .then(response => {
      //       if (response.status == 200) {
      //         this.$store.state.buttonList = response.data.t1
      //         this.$store.state.autocon = response.data.autocon
      //         this.autocon = this.$store.state.autocon
      //       }
      //     })
      //     .catch(e => {
      //       this.$store.state.buttonList = []
      //     });
      // },
      getUserData() {
        ServiceApi.callApi("api/front/userdata", {}, 5000)
          .then(response => {
            if (response.status == 200) {
              // console.log(_.get(this.$store.state.user, 'exp', 0), response.data.exp)
              this.$store.state.user = response.data
              this.$store.state.is_mobile = IS_MOBILE
              this.$store.state.is_tablet = IS_TABLET
              if (this.callUserDataApi == true) {
                setTimeout(res => {
                  this.getUserData();
                }, 1000);
              }
            } else if (response.status == 402) {
              this.$auth.logout();
              localStorage.clear();
              window.location.reload();
            } else {

              if (this.callUserDataApi == true) {
                setTimeout(res => {
                  this.getUserData();
                }, 1000);
              }
            }
          })
          .catch(e => {
            if (this.callUserDataApi == true) {
              setTimeout(res => {
                this.getUserData();
              }, 1000);
            }
          });
      },
      // getTreeData() {
      //   ServiceApi.callApi("api/front/treedata", {}).then(response => {
      //       if (response.status == 200) {
      //         this.$store.state.tree = response.data.t1
      //       }
      //       if (this.callTreeApi == true) {
      //         setTimeout(res => {
      //           this.getTreeData();
      //         }, 300000);
      //       }

      //     })
      //     .catch(e => {
      //       if (this.callTreeApi == true) {
      //         setTimeout(res => {
      //           this.getTreeData();
      //         }, 300000);
      //       }
      //       // this.$store.state.tree = []
      //     });
      // },
      getData() {
        ServiceApi.callApi("api/front/getdata", {})
          .then(response => {
            if (response.status == 200) {
              if (this.callApi == true) {
                // this.$store.state.newsMsg = response.msg
                this.$store.state.newsMsg = NEWS
                setTimeout(res => {
                  this.getData();
                }, 300000);
              }
            } else {
              if (this.callApi == true) {
                setTimeout(res => {
                  this.getData();
                }, 300000);
              }
            }
          })
          .catch(e => {
            if (this.callApi == true) {
              setTimeout(res => {
                this.getData();
              }, 300000);
            }
          });
      },
      placebet() {
        // console.log('placebet form dashboard')
        if (this.$store.state.loadingPlacebet)
          return
        this.$store.state.loadingPlacebet = true
        ServiceApi.callApi("api/front/placebet", this.$store.state.bet)
          .then(response => {
            if (response.success) {
              if (_.get(response.data, 'bdelay')) {
                let delay = _.get(response.data, 'bdelay')
                let traderBet = {
                  gameId: _.get(response.data, 'gmid'),
                  marketId: _.get(response.data, 'mid'),
                  sectionId: _.get(response.data, 'sid'),
                  uRate: _.get(response.data, 'urate'),
                  amount: _.get(response.data, 'tamt'),
                  uamount: _.get(response.data, 'uamt'),
                  betType: _.get(response.data, 'btype'),
                  gType: _.get(response.data, 'gtype'),
                  btId: _.get(response.data, 'btid'),
                  time: _.get(response.data, 'bdelay'),
                  etid: _.get(response.data, 'etid'),
                  cid: _.get(response.data, 'cid')
                }

                this.$refs['trader-modal'].show()
                this.$store.commit('setTraderData', traderBet)
                this.$store.commit('resetBetData')

                // console.log('trader', this.$store.state.traderBet)
                const self = this
                var traderInterval = setInterval(() => {
                  // console.log(self.$store.state.traderBet.time)
                  if (self.$store.state.traderBet.time != 0)
                    self.$store.state.traderBet.time--
                }, 1000);
                setTimeout(() => {
                  self.$refs['trader-modal'].hide()
                  clearInterval(traderInterval)
                }, delay * 1000);

              } else {
                this.$bvToast.toast(response.msg, {
                  variant: 'success',
                  toaster: 'b-toaster-top-full',
                  autoHideDelay: 3000,
                })
                // console.log('success', response.msg)
              }
            } else {
              this.$bvToast.toast(response.msg, {
                variant: 'danger',
                toaster: 'b-toaster-top-full',
                autoHideDelay: 3000,
              })
              // console.log('fail', response.msg)
            }
          })
          .catch(e => {
            if (e.response) {
              this.$bvToast.toast(e.response.data.msg, {
                variant: 'danger',
                toaster: 'b-toaster-top-full',
                autoHideDelay: 3000,
              })
            }
            // console.log('error', e)
          })
          .finally(data => {
            this.$store.commit('resetBetData')
            this.$store.state.loadingPlacebet = false
            this.$refs.routerPage.getUserBook(true)
            if (this.$route.name == 'superOver' || this.$route.name == 'cricketV3') {
              if (INACTIVITY_MODAL) {
                this.$refs.routerPage.resetPlacebetInterval()
              }
            }
            this.$refs.routerPage.hidePlacebetModal()
          })
      },
      traderPlacebet() {
        if (this.$store.state.traderloadingPlacebet)
          return
        this.$store.state.traderloadingPlacebet = true
        ServiceApi.callApi("api/front/placebettdr", this.$store.state.traderBet)
          .then(response => {
            if (response.success) {
              this.$bvToast.toast(response.msg, {
                variant: 'success',
                toaster: 'b-toaster-top-full',
                autoHideDelay: 3000,
              })
              // console.log('success', response.msg)
              // this.$refs['trader-modal'].hide()
              // this.$store.commit('resetTraderBetData')
              // this.$store.state.traderloadingPlacebet = false
            } else {
              this.$bvToast.toast(response.msg, {
                variant: 'danger',
                toaster: 'b-toaster-top-full',
                autoHideDelay: 3000,
              })
              // console.log('fail', response.msg)
              // this.$refs['trader-modal'].hide()
              // this.$store.commit('resetTraderBetData')
              // this.$store.state.traderloadingPlacebet = false
            }
          })
          .catch(e => {
            // console.log('error', e)
            if (e.response) {
              this.$bvToast.toast(e.response.data.msg, {
                variant: 'danger',
                toaster: 'b-toaster-top-full',
                autoHideDelay: 3000,
              })
            }
            // this.$refs['trader-modal'].hide()
            // this.$store.commit('resetTraderBetData')
            // this.$store.state.traderloadingPlacebet = false
          })
          .finally(data => {
            this.$refs['trader-modal'].hide()
            this.$store.commit('resetTraderBetData')
            this.$store.state.traderloadingPlacebet = false
            this.$refs.routerPage.getUserBook(true)
          })
      },
      clearTraderData() {
        this.$refs['trader-modal'].hide()
        this.$store.commit('resetTraderBetData')
      },
      placebetCasino() {
        // this.$refs.routerPage.placebetCasino()

        if (this.$store.state.loadingCasinoPlacebet)
          return
        this.$store.state.loadingCasinoPlacebet = true
        ServiceApi.callApi("api/front/placebetcasino", this.$store.state.casinoBet)
          .then(response => {
            if (response.success) {
              this.$bvToast.toast(response.msg, {
                variant: 'success',
                toaster: 'b-toaster-top-full',
                autoHideDelay: 3000,
              })
              if (this.$store.state.casinoBet.gameType == 'cmatch20') {
                var sid = this.$store.state.casinoBet.sectionId
                var self = this
                setTimeout(() => {
                  // console.log(sid)
                  self.$store.state.runNo = parseInt(sid) + 1
                }, 500)
                setTimeout(() => {
                  self.$store.state.runNo = null
                }, 3000)
              }
              // console.log('success', response.msg)
            } else {
              this.$bvToast.toast(response.msg, {
                variant: 'danger',
                toaster: 'b-toaster-top-full',
                autoHideDelay: 3000,
              })
              // console.log('fail', response.msg)
            }
          })
          .catch(e => {
            // console.log('error', e)
          })
          .finally(data => {
            this.$store.commit('resetCasinoBetData')
            this.$refs.routerPage.getUserBook()
            // this.$refs['placebet-modal'].hide()
            this.$refs.routerPage.hidePlacebetModal()
            if (INACTIVITY_MODAL) {
              this.$refs.routerPage.resetPlacebetInterval()
            }
            this.$store.state.loadingCasinoPlacebet = false
            // console.log(data, 'from dashboard')
          });

        // if (this.loadingPlacebet)
        //   return
        // this.loadingPlacebet = true
        // ServiceApi.callApi("api/front/placebetcasino", this.$store.state.casinoBet)
        //   .then(response => {
        //     if (response.success) {
        //       this.$bvToast.toast(response.msg, {
        //         variant: 'success',
        //         toaster: 'b-toaster-top-full',
        //         autoHideDelay: 3000,
        //       })

        //       if (this.$store.state.casinoBet.gameType == 'cmatch20') {
        //         var sid = this.$store.state.casinoBet.sectionId
        //         var self = this
        //         setTimeout(() => {
        //           console.log(sid)
        //           self.$store.state.runNo = parseInt(sid) + 1
        //         }, 500)
        //         setTimeout(() => {
        //           self.$store.state.runNo = null
        //         }, 3000)
        //       }

        //       // console.log('success', response.msg)
        //       this.$store.commit('resetCasinoBetData')
        //       this.loadingPlacebet = false
        //     } else {
        //       this.$bvToast.toast(response.msg, {
        //         variant: 'danger',
        //         toaster: 'b-toaster-top-full',
        //         autoHideDelay: 3000,
        //       })
        //       // console.log('fail', response.msg)
        //       this.$store.commit('resetCasinoBetData')
        //       this.loadingPlacebet = false
        //     }
        //   })
        //   .catch(e => {
        //     // console.log('error', e)
        //     if (e.response) {
        //       this.$bvToast.toast(e.response.data.msg, {
        //         variant: 'danger',
        //         toaster: 'b-toaster-top-full',
        //         autoHideDelay: 3000,
        //       })
        //     }
        //     this.$store.commit('resetCasinoBetData')
        //     this.loadingPlacebet = false
        //   });
      }

    },
    beforeDestroy() {
      this.show = false
      clearInterval(snowInterval)
      this.callUserDataApi = false
      this.callApi = false
      // this.callTreeApi = false
    }
  };
</script>