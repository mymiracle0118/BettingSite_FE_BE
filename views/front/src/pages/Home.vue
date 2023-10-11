<template>
  <div class="home-container">
    <div class="new-event">
      <div class="container-fluid container-fluid-5">
        <div class="row row5">
          <template v-for="(event, key) in newEvents">
            <div class="col" :class="`sport${event.sportId}`" :key="key">
              <router-link
                :to="{ name: event.sportId == 4 ? 'gameDetailCricket' : 'gameDetail', params: { etid: $base64.enc(event.sportId), gameId: $base64.enc(event.id) }}">
                <span style="color: #f8f9fa;">{{ event.name }}</span>
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="banner" v-if="themeBanners && themeBanners.length">
      <b-carousel indicators :interval="10000">
        <template v-for="(data, key) in themeBanners">
          <b-carousel-slide class="carousal-23" :key="`wp${key}`" :background="`url(${themeBannerPath}${data})`">
          </b-carousel-slide>
        </template>
      </b-carousel>
    </div>

    <div class="sport-tabs">
      <a href="javascript:void(0)" @click="scroll_left()" class="arrow-tabs arrow-left">
        <img :src="imgPath + 'front/img/arrow-down.svg'">
      </a>
      <ul class="nav nav-tabs">
        <template v-for="(tab, key) in tabListData">
          <li class="nav-item" :key="key" @click="changeEventTab(tab.eid, tab.m)">
            <a href="javascript:void(0)" class="nav-link" :id="tab.eid == tabEventId ? 'activeTabHome' : ''"
              :class="[{'active' : tab.eid == tabEventId}, `sport${tabEventId}`]">
              <!-- <img :src="`${imgPath}front/img/events/${tab.eid}.svg`"> -->
              <template v-if="tab.eid == 999">
                <i class="icon-998 d-icon"></i>
                <div class="ml-2">+</div>
                <i class="icon-suits d-icon ml-2"></i>
              </template>
              <i v-else class="d-icon" :class="`icon-${tab.eid}`"></i>
              <span>{{ tab.ename }}</span>
            </a>
          </li>
        </template>
      </ul>
      <a href="javascript:void(0)" @click="scroll_right()" class="arrow-tabs arrow-right">
        <img :src="imgPath + 'front/img/arrow-down.svg'">
      </a>
    </div>

    <div class="bet-table" :class="{ 'loader-section-parent' : changeTabLoader}">

      <!-- <div class="loader-section" v-if="changeTabLoader">
        <div class="loader-section-icon"></div>
      </div> -->
      <Loader :isVisible="changeTabLoader"></Loader>

      <template v-if="highlightData.new && highlightData.new.length > 0">

        <div class="bet-table-header" :class="`sport${tabEventId}`">
          <div class="game-title">
            <template v-if="tabEventId == 999">
              <i class="icon-998 d-icon"></i>
              <div class="ml-2">+</div>
              <i class="icon-suits d-icon ml-2"></i>
            </template>
            <i v-else class="d-icon" :class="`icon-${tabEventId}`"></i>
            <template v-for="(event, key) in tabListData">
              <span :key="key" v-if="event.eid == tabEventId">{{ event.ename }}</span>
            </template>
          </div>

          <div class="point-title d-none-mobile">1</div>
          <div class="point-title d-none-mobile">X</div>
          <div class="point-title d-none-mobile">2</div>

        </div>

        <div class="bet-table-body">
          <template v-for="(data, key) in highlightData.new">
            <div class="bet-table-box" :key="key">
              <div class="bet-table-row-header-mobile d-none-desktop">
                <div class="game-title">
                  <div class="game-date" :class="{'inplay':data.iplay}">
                    <template v-if="data.iplay">
                      <span>Live</span>
                    </template>
                    <template v-else>
                      <p class="day text-left" v-highlightDate="{dateTime: data.stime}"></p>
                      <p class="mb-0 day text-left" v-highlightTime="{time: data.stime}"></p>
                    </template>
                  </div>
                  <div class="game-name d-inline-block">
                    <!-- <router-link :to="{ name: data.iscc == 0 ? tabEventId == 4 ? 'gameDetailCricket' : 'gameDetail' : 'virtualCricket', params: {etid: $base64.enc(tabEventId), gameId: $base64.enc(data.gmid)}}"> -->
                    <router-link
                      :to="{ name: $pages.getDetailRoute(data.iscc, tabEventId), params: {etid: $base64.enc(tabEventId), gameId: $base64.enc(data.gmid)}}">
                      <p class="team-name text-left">{{ data.ename }}</p>
                      <p class="team-name text-left team-event">({{ data.cname }})</p>
                    </router-link>
                    <div class="game-icons">
                      <div class="game-icon" v-if="data.iscc == 2">
                        <i class="icon-998 d-icon"></i>
                      </div>
                      <div class="game-icon">
                        <template v-if="data.f1">
                          <span class="f-bm-icon">F</span>
                        </template>
                      </div>
                      <div class="game-icon">
                        <template v-if="data.f">
                          <span class="f-bm-icon">F1</span>
                        </template>
                      </div>
                      <div class="game-icon">
                        <template v-if="data.bm">
                          <span class="f-bm-icon">BM</span>
                        </template>
                      </div>
                      <div class="game-icon">
                        <template v-if="data.tv">
                          <i class="icon-tv d-icon"></i>
                        </template>
                      </div>
                      <!-- <div class="game-icon">
                        <template v-if="data.iscc != 0">
                          <img :src="imgPath + 'front/img/suits.svg'">
                        </template>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="bet-table-row" :class="{'suspendedtext': data.gscode != 1 }" -->
              <div class="bet-table-row">
                <div class="game-title d-none-mobile">
                  <div class="game-date" :class="{'inplay':data.iplay}">
                    <template v-if="data.iplay">
                      <span>Live</span>
                    </template>
                    <template v-else>
                      <p class="day text-left" v-highlightDate="{dateTime: data.stime}"></p>
                      <p class="mb-0 day text-left" v-highlightTime="{time: data.stime}"></p>
                    </template>
                  </div>
                  <div class="game-name d-inline-block">
                    <!-- <router-link :to="{ name: data.iscc == 0 ? tabEventId == 4 ? 'gameDetailCricket' : 'gameDetail' : 'virtualCricket', params: { etid: $base64.enc(tabEventId), gameId: $base64.enc(data.gmid) }}"> -->
                    <router-link
                      :to="{ name: $pages.getDetailRoute(data.iscc, tabEventId), params: { etid: $base64.enc(tabEventId), gameId: $base64.enc(data.gmid) }}">

                      <p class="team-name text-left">{{ data.ename }}</p>
                      <p class="team-name text-left team-event">({{ data.cname }})</p>
                    </router-link>
                  </div>
                  <div class="game-icons">
                    <div class="game-icon" v-if="data.iscc == 2">
                      <i class="icon-998 d-icon"></i>
                    </div>
                    <div class="game-icon">
                      <template v-if="data.f1">
                        <span class="f-bm-icon">F1</span>
                      </template>
                    </div>
                    <div class="game-icon">
                      <template v-if="data.f">
                        <span class="f-bm-icon">F</span>
                      </template>
                    </div>
                    <div class="game-icon">
                      <template v-if="data.bm">
                        <span class="f-bm-icon">BM</span>
                      </template>
                    </div>
                    <div class="game-icon">
                      <template v-if="data.tv">
                        <i class="icon-tv d-icon"></i>
                      </template>
                    </div>
                    <!-- <div class="game-icon">
                      <template v-if="data.iscc != 0">
                        <img :src="imgPath + 'front/img/suits.svg'">
                      </template>
                    </div> -->
                  </div>
                </div>

                <template v-if="data.rc == 3">
                  <template v-for="(section, key1) in orderBy(data.section, 'sno')">
                    <div class="point-title" :key="key1"
                      :class="{'suspended': data.gscode != 1 || section.gscode != 1}">
                      <div class="text-center d-none-desktop point-title-header" v-if="section.sno == 1">1</div>
                      <div class="text-center d-none-desktop point-title-header" v-if="section.sno == 2">X</div>
                      <div class="text-center d-none-desktop point-title-header" v-if="section.sno == 3">2</div>

                      <template v-for="(odds, key2) in section.odds">
                        <div class="back bl-box"
                          :class="[{'no-odds' : odds.odds == 0}, getClass(odds.odds, odds.otype, section.sno, key )]"
                          :key="key2" v-if="odds.otype.toLowerCase() == 'back'"
                          @click="setBetData(odds.odds, odds.otype, data.etid, data.cid, section.sid, data.mid, data.gmid, data.ename, data.mname, section.nat, data.gtype, odds.size, data.section)">
                          <span class="d-block odds" v-odds="{odds: odds.odds}">
                            {{ odds.odds }}
                          </span>
                        </div>
                      </template>
                      <template v-for="(odds, key2) in section.odds">
                        <div class="lay bl-box"
                          :class="[{'no-odds' : odds.odds == 0}, getClass(odds.odds, odds.otype, section.sno, key )]"
                          :key="key2" v-if="odds.otype.toLowerCase() == 'lay'"
                          @click="setBetData(odds.odds, odds.otype, data.etid, data.cid, section.sid, data.mid, data.gmid, data.ename, data.mname, section.nat, data.gtype, odds.size, data.section)">
                          <span class="d-block odds" v-odds="{odds: odds.odds}">
                            {{ odds.odds }}
                          </span>
                        </div>
                      </template>
                    </div>
                  </template>
                </template>

                <template v-if="data.rc == 2">

                  <template v-for="(section, key1) in orderBy(data.section, 'sno')">
                    <div class="point-title" :key="key1" v-if="section.sno == 1"
                      :class="{'suspended': data.gscode != 1 || section.gscode != 1}">
                      <div class="text-center d-none-desktop point-title-header">1</div>

                      <template v-for="(odds, key2) in section.odds">
                        <div class="back bl-box"
                          :class="[{'no-odds' : odds.odds == 0}, getClass(odds.odds, odds.otype, section.sno, key )]"
                          :key="key2" v-if="odds.otype.toLowerCase() == 'back'"
                          @click="setBetData(odds.odds, odds.otype, data.etid, data.cid, section.sid, data.mid, data.gmid, data.ename, data.mname, section.nat, data.gtype, odds.size, data.section)">
                          <span class="d-block odds" v-odds="{odds: odds.odds}">
                            {{ odds.odds }}
                          </span>
                        </div>
                      </template>
                      <template v-for="(odds, key2) in section.odds">
                        <div class="lay bl-box"
                          :class="[{'no-odds' : odds.odds == 0}, getClass(odds.odds, odds.otype, section.sno, key )]"
                          :key="key2" v-if="odds.otype.toLowerCase() == 'lay'"
                          @click="setBetData(odds.odds, odds.otype, data.etid, data.cid, section.sid, data.mid, data.gmid, data.ename, data.mname, section.nat, data.gtype, odds.size, data.section)">
                          <span class="d-block odds" v-odds="{odds: odds.odds}">
                            {{ odds.odds }}
                          </span>
                        </div>
                      </template>
                    </div>
                  </template>

                  <div class="point-title">
                    <div class="text-center d-none-desktop point-title-header">X</div>
                    <div class="no-val bl-box">
                      <span class="d-block odds">—</span>
                    </div>
                    <div class="no-val bl-box">
                      <span class="d-block odds">—</span>
                    </div>
                  </div>

                  <template v-for="(section, key1) in orderBy(data.section, 'sno')">
                    <div class="point-title" :key="key1" v-if="section.sno == 3"
                      :class="{'suspended': data.gscode != 1 || section.gscode != 1}">
                      <div class="text-center d-none-desktop point-title-header">2</div>

                      <template v-for="(odds, key2) in section.odds">
                        <div class="back bl-box"
                          :class="[{'no-odds' : odds.odds == 0}, getClass(odds.odds, odds.otype, section.sno, key )]"
                          :key="key2" v-if="odds.otype.toLowerCase() == 'back'"
                          @click="setBetData(odds.odds, odds.otype, data.etid, data.cid, section.sid, data.mid, data.gmid, data.ename, data.mname, section.nat, data.gtype, odds.size, data.section)">
                          <span class="d-block odds" v-odds="{odds: odds.odds}">
                            {{ odds.odds }}
                          </span>
                        </div>
                      </template>
                      <template v-for="(odds, key2) in section.odds">
                        <div class="lay bl-box"
                          :class="[{'no-odds' : odds.odds == 0}, getClass(odds.odds, odds.otype, section.sno, key )]"
                          :key="key2" v-if="odds.otype.toLowerCase() == 'lay'"
                          @click="setBetData(odds.odds, odds.otype, data.etid, data.cid, section.sid, data.mid, data.gmid, data.ename, data.mname, section.nat, data.gtype, odds.size, data.section)">
                          <span class="d-block odds" v-odds="{odds: odds.odds}">
                            {{ odds.odds }}
                          </span>
                        </div>
                      </template>
                    </div>
                  </template>

                </template>

              </div>
            </div>
          </template>
        </div>

      </template>
      <template v-else>
        <div class="bet-table-header nodata" v-if="!changeTabLoader">
          No Data Found...
        </div>
      </template>
    </div>

    <template v-if="$store.getters.sortedEventListHome && $store.getters.sortedEventListHome.length">
      <div class="home-casiono-icons d-none-desktop container-fluid">
        <h4 class="">Latest Launches</h4>
        <div class="w-100">
          <VueSlickCarousel v-bind="sliderSetting1">
            <template v-for="(event, key) in $store.getters.sortedEventListHome">
              <div class="home-casino-icon-item" :key="key">
                <template v-if="event.gtype.toLowerCase() == 'casino'">
                  <router-link :to="{ name: $pages.getCasinoRoute(event.pid) }">
                    <div :style="{ 'background-image' : `url(${eventPath}${event.gmname})`}" class="carousal-63"></div>
                    <div class="new-laucnh-icon" v-if="event.nlunched">
                      <img :src="imgPath + 'front/img/new-launch.png'">
                    </div>
                  </router-link>
                </template>
                <template v-if="event.gtype.toLowerCase() == 'vcasino'">
                  <router-link :to="{ name: $pages.getVcCasinoRoute(event.pid) }">
                    <div :style="{ 'background-image' : `url(${eventPath}${event.gmname})`}" class="carousal-63"></div>
                    <div class="new-laucnh-icon" v-if="event.nlunched">
                      <img :src="imgPath + 'front/img/new-launch.png'">
                    </div>
                  </router-link>
                </template>
                <template v-else-if="event.gtype.toLowerCase() == 'game'">
                  <router-link
                    :to="{ name: event.m == 4 ? 'gameDetailCricket' : 'gameDetail', params: { etid: $base64.enc(event.m), gameId: $base64.enc(event.pid) }}">

                    <div :style="{ 'background-image' : `url(${eventPath}${event.gmname})`}" class="carousal-63"></div>
                    <div class="new-laucnh-icon" v-if="event.nlunched">
                      <img :src="imgPath + 'front/img/new-launch.png'">
                    </div>
                  </router-link>
                </template>
                <template v-else-if="event.gtype.toLowerCase() == 'fantasy'">
                  <router-link :to="{ name: 'fantacy', params: { gmid: event.pid }}">

                    <div :style="{ 'background-image' : `url(${eventPath}${event.gmname})`}" class="carousal-63"></div>
                    <div class="new-laucnh-icon" v-if="event.nlunched">
                      <img :src="imgPath + 'front/img/new-launch.png'">
                    </div>
                  </router-link>
                </template>
                <template v-else-if="event.gtype.toLowerCase() == 'others'">
                  <router-link :to="{ name: 'others', params: { gmid: event.pid }}">

                    <div :style="{ 'background-image' : `url(${eventPath}${event.gmname})`}" class="carousal-63"></div>
                    <div class="new-laucnh-icon" v-if="event.nlunched">
                      <img :src="imgPath + 'front/img/new-launch.png'">
                    </div>
                  </router-link>
                </template>
              </div>
            </template>
          </VueSlickCarousel>
        </div>
      </div>
    </template>

    <b-modal ref="placebet-modal" hide-footer title="BET SLIP" @hide="$store.commit('resetBetData')"
      :class="{'loader-section-parent':$store.state.loadingPlacebet}">
      <Loader :isVisible="$store.state.loadingPlacebet"></Loader>

      <ValidationObserver tag="div" v-slot="{ invalid }">
        <template v-if="$store.state.bet && $store.state.bet != null">
          <div class="bet-slip-box">
            <div class="bet-slip">
              <div class="bet-nation">
                <span>{{ $store.state.bet.eventName }}</span>
              </div>
              <div class="match-result">
                {{ $store.state.bet.marketName }}
              </div>
              <div class="bet-team">
                <span class="bet-team-name">{{ $store.state.bet.sectionName }}
                  <template v-if="$store.state.bet.gType == 'fancy'"> - {{ $store.state.bet.size }}</template>
                  <template v-if="$store.state.bet.gType == 'khado'"> - {{ $store.state.bet.khado }}</template>
                </span>
                <template v-if="$store.state.bet.gType == 'khado' || $store.state.bet.gType == 'match'">
                  <div class="bet-input-box">
                    <button class="btn-minus" @click="$store.commit('decrementStep')"><i
                        class="fas fa-minus"></i></button>
                    <div class="bet-input">
                      <input type="text" class="form-control" readonly="readonly"
                        v-model.number="$store.state.bet.uRate">
                    </div>
                    <button class="btn-plus" @click="$store.commit('incrementStep')"><i
                        class="fas fa-plus"></i></button>
                  </div>
                  <!-- <div class="odds-box float-right">
                    <input type="text" class="form-control" readonly="readonly" v-model="$store.state.bet.uRate">
                    <a href="javascript:void(0)" @click="$store.commit('incrementStep')">
                      <img :src="imgPath + 'front/img/arrow-down.svg'" class="arrow-up">
                    </a>
                    <a href="javascript:void(0)" @click="$store.commit('decrementStep')">
                      <img :src="imgPath + 'front/img/arrow-down.svg'" class="arrow-down">
                    </a>
                  </div> -->
                </template>
                <template v-else>
                  <span class="float-right">{{ $store.state.bet.uRate }}</span>
                </template>
              </div>
            </div>

            <ValidationProvider name="Amount" tag="div" class="bet-input"
              :class="[{'back-border' : $store.state.bet.gType == 'oddeven' ? true : $store.state.bet.betType.toLowerCase() == 'back'}, {'lay-border' : $store.state.bet.gType == 'oddeven' ? false : $store.state.bet.betType.toLowerCase() == 'lay'}]"
              :rules="{required: true, min_value : 1, max_value : 999999999, regex: /^[0-9]+$/}">
              <input type="number" v-model.number="$store.state.bet.amount"
                @input="$store.commit('updateBetAmount', $store.state.bet.amount)" class="form-control"
                onkeypress='return event.charCode >= 48 && event.charCode <= 57' placeholder="Amount">
            </ValidationProvider>

            <div class="possible-win" v-if="$store.state.bet.profit">
              <span>Profit:</span>
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
              <b-form-checkbox id="autocon-2" :checked="$store.state.autocon" @change="changeAutoCon($event)"
                name="autocon-2" switch>
                Auto Confirm Bet
              </b-form-checkbox>
            </div>
          </div>

          <div class="place-bet-btn">
            <button class="btn btn-primary btn-block" :disabled="invalid" @click="$parent.placebet()">
              <span>Place bet</span>
            </button>
          </div>

          <div class="container-fluid">
            <template v-for="(section, key) in $store.state.bet.market">
              <div class="row row5 mt-2" :key="key">
                <div class="col-4">
                  <span>{{ section.nat }}</span>
                </div>
                <div class="col-4 text-center text-success">
                  <!-- <span v-sportbook="{mid: $store.state.bet.marketId, sid: section.sid}">0</span> -->
                  <span>&nbsp;</span>
                </div>
                <div class="col-4 text-right text-danger">
                  <span v-livebook="{mid: $store.state.bet.marketId, sid: section.sid}">0</span>
                </div>
              </div>
            </template>
          </div>
        </template>
      </ValidationObserver>
    </b-modal>
  </div>
</template>
<script>
  import ServiceApi from "@/services/ServiceApi";
  import store from "@/store";
  import Loader from '@/components/loader'
  import VueSlickCarousel from 'vue-slick-carousel'

  export default {
    components: {
      Loader,
      VueSlickCarousel
    },
    mounted() {
      if (localStorage.getItem("return") == 'detail') {
        this.$bvToast.toast('There are no markets available in this game!', {
          variant: 'danger',
          toaster: 'b-toaster-top-full',
          autoHideDelay: 3000,
        })
        setTimeout(() => {
          localStorage.removeItem("return")
        }, 2000);
      }
      this.themeBanners = HOME_THEME_BANNERS ? HOME_THEME_BANNERS.split(',') : []

      this.getButtonList()
      this.getEventList()
      this.getTabList()
    },
    data() {
      return {
        sliderSetting1: {
          "swipeToSlide": true,
          "arrows": false,
          "dots": false,
          "infinite": true,
          "slidesToShow": 2,
          "slidesToScroll": 1,
          "autoplay": true,
          "speed": 1000,
          "autoplaySpeed": 3000,
          "cssEase": "linear"
        },
        newEvents: NEW_EVENTS,
        imgPath: IMG_PATH,
        themeBanners: [],
        eventPath: BUCKET_PATH + 'common/sliders/',
        themeBannerPath: HOME_THEME_BANNERS_FROM + 'banners/',
        comBannerPath: BUCKET_PATH + 'common/home-banners/',
        highlightData: {
          old: [],
          new: []
        },
        tabEventId: 0,
        m: null,
        tabListData: [],
        changeTabLoader: false,
        firstCall: true,
        callApi: true,
      }
    },
    methods: {
      getButtonList() {
        ServiceApi.callApi("api/front/buttonlist")
          .then(response => {
            if (response.status == 200) {
              this.$store.state.buttonList = response.data.t1
              this.$store.state.autocon = response.data.autocon
              this.autocon = this.$store.state.autocon
            }
          })
          .catch(e => {
            this.$store.state.buttonList = []
          });
      },
      setBetData(odds, btype, etid, cid, sid, mid, gameId, eventName, marketName, sectionName, gType, size = 0,
        marketData = []) {
        if (odds) {
          // console.log(odds, btype, sid, mid, gameId, eventName, marketName, sectionName, gType, size, marketData)
          let betdata = {
            etid: etid,
            cid: cid,
            gameId: parseInt(gameId),
            marketId: mid,
            sectionId: sid,
            uRate: odds,
            oRate: odds,
            amount: '',
            betType: btype,
            eventName: eventName,
            marketName: marketName,
            sectionName: sectionName,
            gType: gType,
            profit: 0,
            size: size,
            market: []
          }

          // if (IS_MOBILE) {
          if (gType == 'match' || gType == 'match1' || gType == 'cricketcasino') {
            betdata.market = _.map(marketData, function (object) {
              return _.pick(object, ['nat', 'sid']);
            });
          }
          // }

          this.$store.commit('setBetData', betdata)

          // console.log(this.$store.state.bet)

          // if (IS_MOBILE) {
          this.$refs['placebet-modal'].show()
          // }
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
      hidePlacebetModal() {
        this.$refs['placebet-modal'].hide()
      },
      getUserBook(forcecall = false) {
        // console.log('book call from homepage')
      },
      getEventList() {
        ServiceApi.callApi("api/front/eventlist", {
            picon: 1
          })
          .then(response => {
            if (response.status == 200) {
              this.$store.state.eventListHome = response.data.t1
            } else {
              this.$store.state.eventListHome = []
            }
          })
          .catch(e => {
            this.$store.state.eventListHome = []
          });
      },
      getClass(oddsNew, otype, sectionNo, sectionKey) {
        // console.log(oddsNew, otype, sectionNo, sectionKey)
        let sectionArray = _.get(this.highlightData.old[sectionKey], 'section')
        let sectionObj = _.get(_.first(this.filterBy(sectionArray, sectionNo, 'sno')), 'odds')
        let oddsObj = _.first(this.find(sectionObj, otype, 'otype'))
        // let oddsOld = _.get(oddsObj, 'odds')
        let oddsOld = _.get(oddsObj, 'odds', oddsNew)
        // console.log(oddsOld, oddsNew)
        // console.log('+++++')

        if (oddsOld < oddsNew)
          return 'odds-up'
        else if (oddsOld > oddsNew)
          return 'odds-down'
        else
          return ''
      },
      scroll_left() {
        let content = document.querySelector(".nav-tabs");
        content.scrollLeft -= 300;
      },
      scroll_right() {
        let content = document.querySelector(".nav-tabs");
        content.scrollLeft += 300;
      },
      getTabList() {
        ServiceApi.callApi("api/front/tablist")
          .then(response => {
            if (response.status == 200) {
              this.tabListData = response.data.t1

              var cricketMVal = ''

              this.tabListData.forEach(tab => {
                if (tab.isdefault) {
                  this.tabEventId = tab.eid
                  this.m = tab.m
                  setTimeout(() => {
                    let element = document.getElementById('activeTabHome')
                    let content = document.querySelector(".nav-tabs");
                    content.scrollLeft += (element.offsetLeft - ((content.offsetWidth / 2) - (element
                      .offsetWidth / 2)));
                  }, 500);
                  this.getHighlightHome(this.tabEventId)
                }
                if (tab.eid == 4) {
                  cricketMVal = tab.m
                }
              });

              var cricketIndex = _.findIndex(this.tabListData, function (o) {
                return o.eid == 4;
              });
              this.tabListData.splice(cricketIndex + 1, 0, {
                eid: 999,
                ename: "Cricket",
                isdefault: false,
                m: cricketMVal
              })

            } else {
              this.tabListData = []
            }
          })
          .catch(e => {
            this.tabListData = []
          });
      },
      getHighlightHome(etid) {
        if (this.firstCall) {
          this.changeTabLoader = true
        }

        ServiceApi.callApi("api/front/highlighthome", {
            etid: etid,
            m: this.m
          })
          .then(response => {
            if (response.status == 200) {
              let t1 = _.get(response.data, 't1') ? _.get(response.data, 't1') : []
              let t2 = _.get(response.data, 't2') ? _.get(response.data, 't2') : []
              let data = _.concat(t1, t2)
              let ordereddata = data.sort(function (a, b) {

                return new Date(a.stime) - new Date(b.stime);
              })
              if (this.firstCall) {
                this.highlightData.old = ordereddata
                this.changeTabLoader = false
                this.firstCall = false
              } else {
                this.highlightData.old = this.highlightData.new
              }

              this.highlightData.new = ordereddata

            } else {
              this.highlightData.new = []
              this.highlightData.old = []
              if (this.firstCall) {
                this.changeTabLoader = false
                this.firstCall = false
              }
            }
            if (this.callApi == true) {
              setTimeout(res => {
                this.getHighlightHome(this.tabEventId);
              }, 2000);
            }
          })
          .catch(e => {
            this.highlightData.new = []
            this.highlightData.old = []
            if (this.firstCall) {
              this.changeTabLoader = false
              this.firstCall = false
            }
            if (this.callApi == true) {
              setTimeout(res => {
                this.getHighlightHome(this.tabEventId);
              }, 2000);
            }
          });
      },
      changeEventTab(eid, m) {
        if (this.changeTabLoader)
          return
        this.changeTabLoader = true
        this.tabEventId = eid
        this.m = m
        this.highlightData.old = []
        this.highlightData.new = []
        ServiceApi.callApi("api/front/highlighthome", {
            etid: this.tabEventId,
            m: this.m
          })
          .then(response => {
            if (response.status == 200) {
              let t1 = _.get(response.data, 't1') ? _.get(response.data, 't1') : []
              let t2 = _.get(response.data, 't2') ? _.get(response.data, 't2') : []
              let data = _.concat(t1, t2)
              let ordereddata = data.sort(function (a, b) {

                return new Date(a.stime) - new Date(b.stime);
              })
              this.highlightData.old = ordereddata
              this.highlightData.new = ordereddata
              this.changeTabLoader = false
            } else {
              this.highlightData.old = []
              this.highlightData.new = []
              this.changeTabLoader = false
            }
          })
          .catch(e => {
            this.highlightData.old = []
            this.highlightData.new = []
            this.changeTabLoader = false
          });
      }
    },
    beforeDestroy() {
      this.callApi = false
    }
  };
</script>