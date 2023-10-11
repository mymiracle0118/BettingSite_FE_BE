<template>
  <div class="casino-container">
    <template v-if="!$store.getters.isTablet">
      <TimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current" />
    </template>
    <div class="casino-table teenpattiopen">
      <div class="casino-video">
        <InactivityModal ref="tvModal" />
        <div class="casino-video-title">
          <span class="casino-name">{{ gameTitle }}</span>
          <div class="casino-video-rid">Round ID: {{ casinoData.mid }}</div>
        </div>
        <div class="video-box-container">
          <div class="video-box">
            <iframe :src="tvUrl" v-if="tvUrl != ''"></iframe>
          </div>
        </div>
        <template v-if="cards && cards.length">
          <div class="casino-video-cards" :class="{ 'hide-cards': !showCards || cards[8] == '1' }">
            <div class="casino-cards-shuffle" @click="toggleCards()">
              <i class="fas fa-grip-lines-vertical"></i>
            </div>
            <div class="casino-video-cards-container">
              <div class="dealer-name">Dealer</div>
              <div>
                <Card :card="cards[8]" />
                <Card :card="cards[17]" />
                <Card :card="cards[26]" />
              </div>
            </div>
          </div>
        </template>
        <div class="casino-timer d-none-mobile">
          <Timer v-if="time.total != 0" :totalTime="time.total" :currentTime="time.current" />
        </div>
        <template v-if="time.total > 3 && (time.current <= 3 && time.current > 0)">
          <transition name="component-fade" mode="out-in">
            <div :key="time.current" class="casino-time-digit d-none-desktop">{{ time.current }}</div>
          </transition>
        </template>
        <div class="casino-video-right-icons">
          <div class="casino-video-home-icon" title="Home">
            <router-link :to="{ name: 'owncasinolist' }" style="color: var(--text-highlight)">
              <i class="fas fa-home"></i>
            </router-link>
          </div>
          <div class="casino-video-rules-icon" @click="getCasinoRulesHtml()" title="Rules">
            <i class="fas fa-info-circle"></i>
          </div>
          <b-modal ref="rules-modal" modal-class="casino-rules teenpatti2-rule-modal" title="Rules" hide-footer>
            <div class="casino-vieo-rules show-rules show">
              <div class="rules-body">
                <template v-if="rulesHtml && rulesHtml.length">
                  <template v-for="(rule, key) in rulesHtml">
                    <div :key="`body-${key}`" v-html="rule.rules"></div>
                  </template>
                </template>
              </div>
            </div>
          </b-modal>
        </div>
        <div id="casino-vieo-rules" class="casino-vieo-rules show d-none-small" :class="{'show-rules': showRules}"
          v-if="showRules" aria-modal="true" style="display: block;">
          <div class="rules-header">
            <div>Rules</div>
            <i class="fas fa-times" @click="showRules = false"></i>
          </div>
          <div class="rules-body">
            <template v-if="rulesHtml && rulesHtml.length">
              <template v-for="(rule, key) in rulesHtml">
                <div :key="`body-${key}`" v-html="rule.rules"></div>
              </template>
            </template>
          </div>
        </div>
      </div>

      <div class="casino-detail" v-if="casinoData && casinoData.mid">
        <div class="casino-box mb-2 d-none-small" v-if="$store.getters.isTablet">
          <div class="casino-open-card-box">
            <template v-for="(element, index) in player">
              <div :key="index">
                <div><b>{{ index+1 }}</b></div>
                <div>
                  <Card :card="cards[index]" />
                  <Card :card="cards[index + 9]" />
                  <Card :card="cards[index + 18]" />
                </div>
              </div>
            </template>
          </div>

          <div class="casino-box-header">
            <div class="casino-nation-name no-border"></div>

            <div class="casino-bl-box text-right">
              <div class="casino-bl-box-item" v-for="(element, index) in player">
                <!-- <div :class="{ 'hide-cards': cards[index] == '1' }">
                  <Card :card="cards[index]" />
                  <Card :card="cards[index + 9]" />
                  <Card :card="cards[index + 18]" />
                </div> -->
                <span>{{ element.nat }}</span>
              </div>
            </div>
          </div>
          <div class="casino-box-content">
            <div class="casino-box-row">
              <div class="casino-nation-name">
                <b>Odds</b>
                <!-- <i class="fas fa-info-circle float-right" data-target="#range1" data-toggle="collapse"></i>
                <div id="range1" class="collapse icon-range">
                  R:<span v-kval="{ size: player[0].min }">0</span>-<span v-kval="{ size: player[0].max }">0</span>
                </div> -->
              </div>
              <div class="casino-bl-box">
                <div class="back casino-bl-box-item" v-for="(element, index) in player"
                  :class="{ suspended: element.gstatus != 'OPEN' }" @click="
                    setBetData(
                      element.nat,
                      element.b,
                      mId,
                      element.sid,
                      element.subtype,
                      0,
                      'back',
                      gameType,
                      element.gstatus, 
                      element.min, 
                      element.max
                    )
                  ">
                  <span class="casino-box-odd">{{ element.b }}</span>
                  <span v-casinobookcalc="{
                      sid: element.sid,
                      urate: element.b,
                    }">0</span>
                </div>
              </div>
            </div>
            <div class="casino-box-row">
              <div class="casino-nation-name">
                <b>Pair Plus</b>
                <!-- <i class="fas fa-info-circle float-right" data-target="#range3" data-toggle="collapse"></i>
                <div id="range3" class="collapse icon-range">
                  R:<span v-kval="{ size: pair[0].min }">0</span>-<span v-kval="{ size: pair[0].max }">0</span>
                </div> -->
              </div>
              <div class="casino-bl-box">
                <div class="back casino-bl-box-item" v-for="(element, index) in pair"
                  :class="{ suspended: element.gstatus != 'OPEN' }" @click="
                    setBetData(
                      element.nat,
                      element.b,
                      mId,
                      element.sid,
                      element.subtype,
                      0,
                      'back',
                      gameType,
                      element.gstatus, 
                      element.min, 
                      element.max
                    )
                  ">
                  <span class="casino-box-odd open-pair">{{ element.nat }}</span>
                  <span v-casinobookcalc="{ sid: element.sid, urate: element.b }">0</span>
                </div>
              </div>
            </div>
            <div class="casino-box-row">
              <div class="casino-nation-name">
                <b>Total</b>
                <!-- <i class="fas fa-info-circle float-right" data-target="#range2" data-toggle="collapse"></i>
                <div id="range2" class="collapse icon-range">
                  R:<span v-kval="{ size: total[0].min }">0</span>-<span v-kval="{ size: total[0].max }">0</span>
                </div> -->
              </div>
              <div class="casino-bl-box">
                <div class="back casino-bl-box-item" v-for="(element, index) in total"
                  :class="{ suspended: element.gstatus != 'OPEN' }" @click="
                    setBetData(
                      element.nat,
                      element.b,
                      mId,
                      element.sid,
                      element.subtype,
                      0,
                      'back',
                      gameType,
                      element.gstatus, 
                      element.min, 
                      element.max
                    )
                  ">
                  <span class="casino-box-odd">{{ element.b }}</span>
                  <span v-casinobookcalc="{ sid: element.sid, urate: element.b }">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="casino-box mb-2 d-none-big" v-if="!$store.getters.isTablet">
          <div class="casino-box-header">
            <div class="casino-nation-name no-border"></div>
            <div class="casino-bl-box text-right">
              <div class="casino-bl-box-item">
                <span>Odds</span>
                <!-- <i class="fas fa-info-circle float-right" data-target="#range4"
                  data-toggle="collapse"></i>
                <div id="range4" class="collapse icon-range">
                  R:<span v-kval="{ size: player[0].min }">0</span>-<span v-kval="{ size: player[0].max }">0</span>
                </div> -->
              </div>
              <div class="casino-bl-box-item">
                <span>Pair Plus</span>
                <!-- <i class="fas fa-info-circle float-right" data-target="#range3" data-toggle="collapse"></i>
                <div id="range3" class="collapse icon-range">
                  R:<span v-kval="{ size: pair[0].min }">0</span>-<span v-kval="{ size: pair[0].max }">0</span>
                </div> -->
              </div>
              <div class="casino-bl-box-item">
                <span>Total</span>
                <!-- <i class="fas fa-info-circle float-right" data-target="#range6" data-toggle="collapse"></i>
                <div id="range6" class="collapse icon-range">
                  R:<span v-kval="{ size: total[0].min }">0</span>-<span v-kval="{ size: total[0].max }">0</span>
                </div> -->
              </div>
            </div>
          </div>
          <div class="casino-box-content">
            <div class="casino-box-row" v-for="(element, index) in player">
              <div class="casino-nation-name">
                <b>{{ element.nat }}</b>
                <div :class="{ 'hide-cards': cards[index] == '1' }">
                  <Card :card="cards[index]" />
                  <Card :card="cards[index + 9]" />
                  <Card :card="cards[index + 18]" />
                </div>
              </div>
              <div class="casino-bl-box">
                <div class="back casino-bl-box-item" @click="
                    setBetData(
                      element.nat,
                      element.b,
                      mId,
                      element.sid,
                      element.subtype,
                      0,
                      'back',
                      gameType,
                      element.gstatus, 
                      element.min, 
                      element.max
                    )
                  " :class="{ suspended: element.gstatus != 'OPEN' }">
                  <span class="casino-box-odd">{{ element.b }}</span>
                  <span v-casinobookcalc="{ sid: element.sid, urate: element.b }">0</span>
                </div>
                <div class="back casino-bl-box-item" :class="{ suspended: pair[index].gstatus != 'OPEN' }" @click="
                    setBetData(
                      pair[index].nat,
                      pair[index].b,
                      mId,
                      pair[index].sid,
                      pair[index].subtype,
                      0,
                      'back',
                      gameType,
                      pair[index].gstatus, 
                      pair[index].min, 
                      pair[index].max
                    )
                  ">
                  <span class="casino-box-odd">{{ pair[index].nat }}</span>

                  <span v-casinobookcalc="{ sid: pair[index].sid, urate: pair[index].b }">0</span>
                </div>
                <div class="back casino-bl-box-item" :class="{ suspended: total[index].gstatus != 'OPEN' }" @click="
                    setBetData(
                      total[index].nat,
                      total[index].b,
                      mId,
                      total[index].sid,
                      total[index].subtype,
                      0,
                      'back',
                      gameType,
                      total[index].gstatus, 
                      total[index].min, 
                      total[index].max
                    )
                  ">
                  <span class="casino-box-odd">{{ total[index].b }}</span>
                  <span v-casinobookcalc="{ sid: total[index].sid, urate: total[index].b }">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="casino-box mb-2 teenopenother">
          <div class="casino-bl-box">
            <div class="back casino-bl-box-item" :class="{ suspended: anycolor[0].gstatus != 'OPEN' }" @click="
                setBetData(
                  anycolor[0].nat,
                  anycolor[0].b,
                  mId,
                  anycolor[0].sid,
                  anycolor[0].subtype,
                  0,
                  'back',
                  gameType,
                  anycolor[0].gstatus
                )
              ">
              <span class="casino-box-odd">{{ anycolor[0].nat }}</span>
              <span v-casinobookcalc="{ sid: anycolor[0].sid, urate: anycolor[0].b }">0</span>
            </div>
            <div class="back casino-bl-box-item" :class="{ suspended: anyStraight[0].gstatus != 'OPEN' }" @click="
                setBetData(
                  anyStraight[0].nat,
                  anyStraight[0].b,
                  mId,
                  anyStraight[0].sid,
                  anyStraight[0].subtype,
                  0,
                  'back',
                  gameType,
                  anyStraight[0].gstatus
                )
              ">
              <span class="casino-box-odd">{{ anyStraight[0].nat }}</span>
              <span v-casinobookcalc="{ sid: anyStraight[0].sid, urate: anyStraight[0].b }">0</span>
            </div>
            <div class="back casino-bl-box-item" :class="{ suspended: anyTrio[0].gstatus != 'OPEN' }" @click="
                setBetData(
                  anyTrio[0].nat,
                  anyTrio[0].b,
                  mId,
                  anyTrio[0].sid,
                  anyTrio[0].subtype,
                  0,
                  'back',
                  gameType,
                  anyTrio[0].gstatus
                )
              ">
              <span class="casino-box-odd">{{ anyTrio[0].nat }}</span>
              <span v-casinobookcalc="{ sid: anyTrio[0].sid, urate: anyTrio[0].b }">0</span>
            </div>
            <div class="back casino-bl-box-item" :class="{ suspended: anyStaritFlush[0].gstatus != 'OPEN' }" @click="
                setBetData(
                  anyStaritFlush[0].nat,
                  anyStaritFlush[0].b,
                  mId,
                  anyStaritFlush[0].sid,
                  anyStaritFlush[0].subtype,
                  0,
                  'back',
                  gameType,
                  anyStaritFlush[0].gstatus
                )
              ">
              <span class="casino-box-odd">{{ anyStaritFlush[0].nat }}</span>
              <span v-casinobookcalc="{ sid: anyStaritFlush[0].sid, urate: anyStaritFlush[0].b }">0</span>
            </div>
          </div>
          <div class="casino-bl-box">
            <div class="odds-min-max">
              <span class="float-right casino-min-max">R:<span v-kval="{ size: anycolor[0].min }">0</span>-<span
                  v-kval="{ size: anycolor[0].max }">0</span></span>
            </div>
            <div class="odds-min-max">
              <span class="float-right casino-min-max">R:<span v-kval="{ size: anyStraight[0].min }">0</span>-<span
                  v-kval="{ size: anyStraight[0].max }">0</span></span>
            </div>
            <div class="odds-min-max">
              <span class="float-right casino-min-max">R:<span v-kval="{ size: anyTrio[0].min }">0</span>-<span
                  v-kval="{ size: anyTrio[0].max }">0</span></span>
            </div>
            <div class="odds-min-max">
              <span class="float-right casino-min-max">R:<span v-kval="{ size: anyStaritFlush[0].min }">0</span>-<span
                  v-kval="{ size: anyStaritFlush[0].max }">0</span></span>
            </div>
          </div>
        </div> -->

        <template v-if="casinoData.remark && casinoData.remark != ''">
          <div class="casino-remark mt-1">
            <div class="remark-icon">
              <img :src="`${imgPath}front/img/icons/remark.png`">
            </div>
            <marquee>{{ casinoData.remark }}</marquee>
          </div>
        </template>

        <template v-if="!$store.getters.isTablet">
          <LastResultIcon />
        </template>
      </div>
      <!-- CASINO Rules Start -->
      <template v-if="!$store.getters.isTablet">
        <div class="mt-2 casino-rules-table d-none-big" v-if="$store.state.casinoRules">
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
      </template>
      <!-- CASINO Rules End -->
    </div>

    <b-modal ref="placebet-modal" hide-footer title="BET SLIP" @hide="$store.commit('resetCasinoBetData')"
      :class="{ 'loader-section-parent': $store.state.loadingCasinoPlacebet }">
      <Loader :isVisible="$store.state.loadingCasinoPlacebet"></Loader>
      <template #modal-title>
        <h5 class="modal-title">Place Bet
          <template v-if="$pages.is('casino', $route.name) && $store.state.casinoBet && $store.state.casinoBet != null">
            <span class="casino-min-max ml-2">
              Range:<span v-kval="{size: $store.state.casinoBet.min}"></span>-<span
                v-kval="{size: $store.state.casinoBet.max}"></span>
            </span>
          </template>
        </h5>
      </template>

      <ValidationObserver tag="div" class="casino-place-bet-box" v-slot="{ invalid }">
        <template v-if="$pages.is('casino', $route.name) && $store.state.casinoBet && $store.state.casinoBet != null">
          <div class="bet-slip pl-0 pr-0">
            <div class="bet-team mt-0">
              <span class="bet-team-name">{{ $store.state.casinoBet.nation }}</span>
              <span class="float-right"
                v-if="!$store.state.casinoBet.nation.includes('Pair Plus')">{{ $store.state.casinoBet.uRate }}</span>
            </div>
          </div>

          <div class="casino-place-bet-info">
            <ValidationProvider name="Amount" tag="div" class="bet-input ml-0"
              :class="[{'back-border': $store.state.casinoBet.betType == 'back'}, {'lay-border': $store.state.casinoBet.betType == 'lay'}]"
              :rules="{required: true, min_value : 1, max_value : 999999999, regex: /^[0-9]+$/}">
              <input type="number" id="placebetAmountMobile" v-model.number="$store.state.casinoBet.amount"
                class="form-control input-stake" onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                placeholder="Amount">
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
            <button class="btn btn-primary" :disabled="invalid" @click="$parent.placebetCasino()">Submit</button>
          </div>
        </template>
      </ValidationObserver>
    </b-modal>

    <b-modal id="betCasinoSodaModal" hide-footer title="MY BETS" modal-class="mybetsmodal">
      <template v-if="
          $pages.is('casino', $route.name) && $store.state.casinoBetSoda != null
        ">
        <div class="casino-place-bet-header">
          <div>Matched Bet</div>
          <div>Odds</div>
          <div>Stake</div>
        </div>
        <div class="casino-place-bet-body">
          <template v-for="(data, key) in $store.state.casinoBetSoda">
            <div class="casino-place-bet-row" :key="key" :class="[
                { 'back-border': data.btype == 'back' },
                { 'lay-border': data.btype == 'lay' },
              ]">
              <div>{{ data.nat }}</div>
              <div>{{ data.urate }}</div>
              <div>{{ data.amt }}</div>
            </div>
          </template>
        </div>
      </template>
    </b-modal>

    <div class="market-show-icon d-none-desktop" v-if="$store.getters.betCasinoSodaTotal" v-b-modal.betCasinoSodaModal>
      <span>{{ $store.getters.betCasinoSodaTotal }}</span>
    </div>
  </div>
</template>

<script>
  import ServiceApi from "@/services/ServiceApi";
  import Timer from "@/components/casino/BaseTimer";
  import TimerProgress from "@/components/casino/TimerProgress"
  import LastResultIcon from '@/components/casino/results/LastResultIcon'
  import Card from "@/components/casino/Card";
  import Loader from "@/components/loader";
  import InactivityModal from '@/components/casino/InactivityModal'
  var PlacebetTimer;

  export default {
    mounted() {
      this.$store.state.casinoGameType = this.gameType
      this.getButtonListCs()
      this.reconnectTv()
      this.getCasinoRules()
      this.getCasinoData();
      this.getLastResults();
      // console.log(this.player)
    },
    components: {
      Timer,
      TimerProgress,
      LastResultIcon,
      Card,
      Loader,
      InactivityModal
    },
    computed: {
      player() {
        var player = _.filter(_.get(this.casinoData, "sub"), {
          subtype: "Player",
        });
        return this.orderBy(player, 'sr')
      },
      pair() {
        var pairs = _.filter(_.get(this.casinoData, "sub"), {
          subtype: "Pair",
        });
        return this.orderBy(pairs, 'sr')
      },
      total() {
        var totals = _.filter(_.get(this.casinoData, "sub"), {
          subtype: "Total",
        });
        return this.orderBy(totals, 'sr')
      },
      anycolor() {

        var anycolors = _.filter(_.get(this.casinoData, "sub"), {
          sid: 25,
        });
        return this.orderBy(anycolors, 'sr')
      },
      anyStraight() {
        var anyStraights = _.filter(_.get(this.casinoData, "sub"), {
          sid: 26,
        });
        return this.orderBy(anyStraights, 'sr')
      },
      anyTrio() {
        var anyTrios = _.filter(_.get(this.casinoData, "sub"), {
          sid: 27,
        });
        return this.orderBy(anyTrios, 'sr')
      },
      anyStaritFlush() {
        var anyStraightFlushs = _.filter(_.get(this.casinoData, "sub"), {
          sid: 28,
        });
        return this.orderBy(anyStraightFlushs, 'sr')
      },
    },
    data() {
      return {
        showCards: true,
        imgPath: IMG_PATH,
        gameTitle: "",
        gameType: "teen8",
        casinoData: [],
        mId: 0,
        cards: [],
        time: {
          total: 0,
          current: 0,
        },
        callDataApi: true,
        callBookApi: true,
        exp: '',
        tvUrl: '',
        firstCall: true,
        showRules: false,
        rulesHtml: [],
      };
    },
    methods: {
      getButtonListCs() {
        ServiceApi.callApi("api/front/buttonlistcs")
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
      getCasinoRulesHtml() {
        ServiceApi.callApi("api/front/casinorules", {
            'type': this.gameType,
          })
          .then(response => {
            console.log(response)
            if (response.status == 200) {
              this.showRules = true
              this.rulesHtml = response.data
              if (IS_MOBILE) {
                this.$refs['rules-modal'].show()
              }
            } else {
              this.showRules = false
              this.rulesHtml = []
            }
          })
          .catch(e => {
            this.showRules = false
            this.rulesHtml = []
          });
      },
      getTvUrl() {
        ServiceApi.callApi("api/front/casino/launchother", {
            'id': 'tv'
          })
          .then(response => {
            if (response.status == 200) {
              // console.log(response.data.token)
              this.tvUrl = '/mediaplayer/' + this.gameType + '/' + response.data.token + '?ip=' +
                IP_ADDRESS;
            } else {
              this.tvUrl = ''
            }
          })
          .catch(e => {
            this.tvUrl = ''
          });
      },
      resetInterval() {
        if (INACTIVITY_MODAL) {
          clearInterval(PlacebetTimer);
          this.$store.state.placebetInterval = 0
          var self = this;

          PlacebetTimer = setInterval(function () {
            console.log('round', self.$store.state.placebetInterval)
            if (self.$store.state.placebetInterval >= ROUNDS) {
              console.log('round reseted', self.$store.state.placebetInterval)
              clearInterval(PlacebetTimer);
              self.$refs["tvModal"].show();
              self.tvUrl = ''
            }
          }, 1000);
        }
      },
      reconnectTv() {
        console.log("reconnectTv")
        this.getTvUrl()
        this.resetInterval()
        this.$refs["tvModal"].hide();
      },
      resetPlacebetInterval() {
        console.log("resetPlacebetInterval")
        if (INACTIVITY_MODAL) {
          if (this.$store.state.placebetInterval >= ROUNDS) {
            this.getTvUrl()
          }
          this.resetInterval()
          this.$refs["tvModal"].hide();
        }
      },

      toggleCards() {
        if (this.casinoData.card != '') {
          this.showCards = !this.showCards;
        }
      },
      getKey(data, key) {
        return _.get(data, "key");
      },
      getCasinoRules() {
        this.$store.state.casinoRules = null
        ServiceApi.callApi("api/front/casino/rules", {
            'type': this.gameType,
          })
          .then(response => {
            if (response.status == 200) {
              this.$store.state.casinoRules = response.data
            } else {
              this.$store.state.casinoRules = null
            }
          })
          .catch(e => {
            this.$store.state.casinoRules = null
          });
      },
      getCasinoData() {
        ServiceApi.callApi("api/front/casino/data", {
            type: this.gameType,
          })
          .then((response) => {
            if (response.status == 200) {
              this.casinoData = response.data;
              if (_.get(this.casinoData, "mid") != this.mId) {
                if (!this.firstCall) {
                  this.$store.state.placebetInterval++
                }
                this.firstCall = false
                this.getLastResults();
                this.getUserBook(true, _.get(this.casinoData, "mid"))
              }
              this.mId = _.get(this.casinoData, "mid");
              this.getUserBook()
              // this.exp = _.get(this.$store.state.user, 'exp', 0)
              this.cards = _.get(this.casinoData, "card").split(",");
              this.time.total = _.get(this.casinoData, "ft");
              this.time.current = _.get(this.casinoData, "lt");
              if (this.callDataApi == true) {
                setTimeout((res) => {
                  this.getCasinoData();
                }, 500);
              }
            } else {
              // this.casinoData = [];
              if (this.callDataApi == true) {
                setTimeout((res) => {
                  this.getCasinoData();
                }, 500);
              }
            }
          })
          .catch((e) => {
            // this.casinoData = [];
            if (this.callDataApi == true) {
              setTimeout((res) => {
                this.getCasinoData();
              }, 500);
            }
          });
      },
      getUserBook(forcecall = false, mid = this.mId) {
        if (this.exp != _.get(this.$store.state.user, 'exp', 0) || forcecall) {
          ServiceApi.callApi("api/front/casino/book", {
              mid: parseInt(mid),
              gType: this.gameType,
            })
            .then((response) => {
              if (response.status == 200) {
                this.$store.state.casinoBetSoda = response.data.bet;
                this.$store.state.casinoFancybetBook = response.data.fancy;
                this.$store.state.casinobetBook = response.data.sportbet;
                // if (this.callBookApi == true) {
                //   setTimeout((res) => {
                //     this.getUserBook();
                //   }, 800);
                // }
              } else {
                this.$store.state.casinoBetSoda = null;
                this.$store.state.casinobetBook = null;
                this.$store.state.casinoFancybetBook = null;
                // if (this.callBookApi == true) {
                //   setTimeout((res) => {
                //     this.getUserBook();
                //   }, 800);
                // }
              }
            })
            .catch((e) => {
              this.$store.state.casinoBetSoda = null;
              this.$store.state.casinobetBook = null;
              this.$store.state.casinoFancybetBook = null;
              // if (this.callBookApi == true) {
              //   setTimeout((res) => {
              //     this.getUserBook();
              //   }, 800);
              // }
            });

          this.exp = _.get(this.$store.state.user, 'exp', 0)
        }
      },
      getLastResults() {
        ServiceApi.callApi("api/front/casino/lastresults", {
            gType: this.gameType,
          })
          .then((response) => {
            if (response.status == 200) {
              this.$store.state.lastResults = response.data.res;
              this.gameTitle = response.data.res1.cname
            } else {
              this.$store.state.lastResults = [];
            }
          })
          .catch((e) => {
            this.$store.state.lastResults = [];
          });
      },
      setBetData(nat, rate, mid, sid, subType, subId, bType, gType, gstatus, min, max) {
        // console.log(min, max)
        if (rate && gstatus == "OPEN") {
          let betdata = {
            subType: subType,
            marketId: mid,
            sectionId: sid,
            subId: subId,
            uRate: rate,
            amount: '',
            betType: bType,
            gameType: gType,
            nation: nat,
            min: min,
            max: max
          };
          this.$store.commit("setCasinoBetData", betdata);
          // console.log(this.$store.state.casinoBet);

          if (IS_MOBILE) {
            setTimeout(() => {
              document.getElementById("placebetAmountMobile").focus();
            }, 500);
            this.$refs["placebet-modal"].show();
          }
          setTimeout(() => {
            document.getElementById("placebetAmountWeb").focus();
          }, 500);
        }
      },
      placebetCasino() {
        if (this.$store.state.loadingCasinoPlacebet) return;
        this.$store.state.loadingCasinoPlacebet = true;
        ServiceApi.callApi(
            "api/front/placebetcasino",
            this.$store.state.casinoBet
          )
          .then((response) => {
            if (response.success) {
              this.$bvToast.toast(response.msg, {
                variant: "success",
                toaster: "b-toaster-top-full",
                autoHideDelay: 3000,
              });
              // console.log("success", response.msg);
            } else {
              this.$bvToast.toast(response.msg, {
                variant: "danger",
                toaster: "b-toaster-top-full",
                autoHideDelay: 3000,
              });
              // console.log("fail", response.msg);
            }
          })
          .catch((e) => {
            // console.log("error", e);
          })
          .finally(data => {
            this.$store.commit('resetCasinoBetData')
            this.$refs['placebet-modal'].hide()
            this.resetPlacebetInterval()
            this.$store.state.loadingCasinoPlacebet = false
            // console.log(data)
          });
      },
      hidePlacebetModal() {
        this.$refs['placebet-modal'].hide()
      }
    },
    beforeDestroy() {
      this.callBookApi = false;
      this.callDataApi = false;
      this.$store.commit("resetCasinoBetData");
      this.$store.state.casinoRules = null
      this.$store.state.casinoBetSoda = null
      this.$store.state.casinobetBook = null
      this.$store.state.casinoFancybetBook = null
      this.$store.state.lastResults = []
      this.$store.state.placebetInterval = 0
      this.$store.state.casinoGameType = ""
      clearInterval(PlacebetTimer);
    },
  };
</script>