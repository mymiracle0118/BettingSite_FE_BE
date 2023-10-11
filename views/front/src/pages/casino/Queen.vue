<template>
  <div class="casino-container">
    <!-- Casino Content -->
    <template v-if="!$store.getters.isTablet">
      <TimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current" />
    </template>
    <div class="casino-table casino-queen">
      <div class="casino-video">
        <InactivityModal ref="tvModal" />
        <div class="casino-video-title">
          <span class="casino-name">{{ gameTitle }}</span>
          <div class="casino-video-rid">Round ID: {{ casinoData.mid }}</div>
        </div>
        <div class="video-box-container">
          <div class="video-box">
            <iframe :src="tvUrl" v-if="tvUrl != ''"> </iframe>
          </div>
        </div>
        <template v-if="cards && cards.length">
          <div class="casino-video-cards" :class="{ 'hide-cards': !showCards || cards[0] == '1' }">
            <div class="casino-cards-shuffle" @click="toggleCards(cards[0])">
              <i class="fas fa-grip-lines-vertical"></i>
            </div>
            <div class="casino-video-cards-container">
              <div>
                <div class="dealer-name w-100 mb-1">
                  <span :class="{
                      'text-success':
                        playersCards.p1Total >= playersCards.p2Total &&
                        playersCards.p1Total >= playersCards.p3Total &&
                        playersCards.p1Total >= playersCards.p4Total,
                    }">{{ main[0].nat }}:
                  </span>
                  <span class="text-warning ml-1">{{ playersCards.p1Total }}</span>
                </div>
                <div>
                  <template v-for="(card, key) in playersCards.p1">
                    <Card :card="card" />
                  </template>
                </div>
              </div>
              <div>
                <div class="dealer-name w-100 mb-1">
                  <span :class="{
                      'text-success':
                        playersCards.p2Total >= playersCards.p1Total &&
                        playersCards.p2Total >= playersCards.p3Total &&
                        playersCards.p2Total >= playersCards.p4Total,
                    }">{{ main[1].nat }}:
                  </span>
                  <span class="text-warning ml-1">{{ playersCards.p2Total }}</span>
                </div>
                <div>
                  <template v-for="(card, key) in playersCards.p2">
                    <Card :card="card" />
                  </template>
                </div>
              </div>
              <div>
                <div class="dealer-name w-100 mb-1">
                  <span :class="{
                      'text-success':
                        playersCards.p3Total >= playersCards.p1Total &&
                        playersCards.p3Total >= playersCards.p2Total &&
                        playersCards.p3Total >= playersCards.p4Total,
                    }">{{ main[2].nat }}:
                  </span>
                  <span class="text-warning ml-1">{{ playersCards.p3Total }}</span>
                </div>
                <div>
                  <template v-for="(card, key) in playersCards.p3">
                    <Card :card="card" />
                  </template>
                </div>
              </div>
              <div>
                <div class="dealer-name w-100 mb-1">
                  <span :class="{
                      'text-success':
                        playersCards.p4Total >= playersCards.p1Total &&
                        playersCards.p4Total >= playersCards.p2Total &&
                        playersCards.p4Total >= playersCards.p3Total,
                    }">{{ main[3].nat }}:
                  </span>
                  <span class="text-warning ml-1">{{ playersCards.p4Total }}</span>
                </div>
                <div>
                  <template v-for="(card, key) in playersCards.p4">
                    <Card :card="card" />
                  </template>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="casino-timer d-none-small">
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
        </div>
      </div>

      <div class="casino-detail" v-if="casinoData && casinoData.mid">
        <div class="container-fluid container-fluid-5">
          <template v-if="$store.getters.isTablet">
            <div class="row d-none-small">
              <template v-for="(odds, key) in main">
                <div class="col-3" :key="key">
                  <div class="casino-box-row">
                    <div class="casino-nation-name">
                      <b>{{ odds.nat }}</b>
                    </div>
                    <div class="casino-bl-box">
                      <div class="back casino-bl-box-item" :class="{ suspended: odds.gstatus != 'OPEN' }" @click="
                          setBetData(
                            odds.nat,
                            odds.b,
                            mId,
                            odds.sid,
                            odds.subtype,
                            0,
                            'back',
                            gameType,
                            odds.gstatus,
                            odds.min,
                            odds.max
                          )
                        ">
                        <span class="casino-box-odd">{{ odds.b }}</span>
                        <!-- <span>{{ odds.bs }}</span> -->
                      </div>
                      <div class="lay casino-bl-box-item" :class="{ suspended: odds.gstatus != 'OPEN' }" @click="
                          setBetData(
                            odds.nat,
                            odds.l,
                            mId,
                            odds.sid,
                            odds.subtype,
                            0,
                            'lay',
                            gameType,
                            odds.gstatus,
                            odds.min,
                            odds.max
                          )
                        ">
                        <span class="casino-box-odd">{{ odds.l }}</span>
                        <!-- <span>{{ odds.ls }}</span> -->
                      </div>
                    </div>
                    <div class="casino-nation-name" v-casinobook="{ sid: odds.sid }">0</div>
                  </div>
                </div>
              </template>
            </div>
          </template>

          <template v-if="!$store.getters.isTablet">
            <div class="row row5 d-none-big">
              <template v-for="(data, key) in main">
                <div class="casino-bl-box" :key="key">
                  <div class="casino-bl-box-item casino-odds-name">
                    <b>{{ data.nat }}</b>
                    <span class="float-right text-success" v-casinobook="{ sid: data.sid }">0</span>
                  </div>
                  <div class="back casino-bl-box-item" :class="{ suspended: data.gstatus != 'OPEN' }" @click="
                      setBetData(
                        data.nat,
                        data.b,
                        mId,
                        data.sid,
                        data.subtype,
                        0,
                        'back',
                        gameType,
                        data.gstatus,
                        data.min,
                        data.max
                      )
                    ">
                    <span class="casino-box-odd">{{ data.b }}</span>
                    <!-- <span>{{ data.bs }}</span> -->
                  </div>
                  <div class="lay casino-bl-box-item" :class="{ suspended: data.gstatus != 'OPEN' }" @click="
                      setBetData(
                        data.nat,
                        data.l,
                        mId,
                        data.sid,
                        data.subtype,
                        0,
                        'lay',
                        gameType,
                        data.gstatus,
                        data.min,
                        data.max
                      )
                    ">
                    <span class="casino-box-odd">{{ data.l }}</span>
                    <!-- <span>{{ data.ls }}</span> -->
                  </div>
                </div>
              </template>
            </div>
          </template>
        </div>

        <template v-if="casinoData.remark && casinoData.remark != ''">
          <div class="casino-remark mt-1">
            <div class="remark-icon">
              <img :src="`${imgPath}front/img/icons/remark.png`" />
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
        <template v-if="
            $pages.is('casino', $route.name) &&
            $store.state.casinoBet &&
            $store.state.casinoBet != null
          ">
          <div class="bet-slip pl-0 pr-0">
            <div class="bet-team mt-0">
              <span class="bet-team-name">{{ $store.state.casinoBet.nation }}</span>
              <span class="float-right"
                v-if="!$store.state.casinoBet.nation.includes('Pair Plus')">{{ $store.state.casinoBet.uRate }}</span>
            </div>
          </div>

          <div class="casino-place-bet-info">
            <ValidationProvider name="Amount" tag="div" class="bet-input ml-0" :class="[
                { 'back-border': $store.state.casinoBet.betType == 'back' },
                { 'lay-border': $store.state.casinoBet.betType == 'lay' },
              ]" :rules="{
                required: true,
                min_value: 1,
                max_value: 999999999,
                regex: /^[0-9]+$/,
              }">
              <input type="number" id="placebetAmountMobile" v-model.number="$store.state.casinoBet.amount"
                class="form-control input-stake" onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                placeholder="Amount" />
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
            <button class="btn btn-primary" :disabled="invalid" @click="$parent.placebetCasino()">
              Submit
            </button>
          </div>
        </template>
      </ValidationObserver>
    </b-modal>

    <b-modal id="betCasinoSodaModal" hide-footer title="MY BETS" modal-class="mybetsmodal">
      <template v-if="$pages.is('casino', $route.name) && $store.state.casinoBetSoda != null">
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
      this.getCasinoRules();
      this.getCasinoData();
      this.getLastResults();
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
      main() {
        var player = _.filter(_.get(this.casinoData, "sub"), {
          subtype: this.gameType,
        });
        return this.orderBy(player, "sr");
      },
    },
    data() {
      return {
        showCards: true,
        imgPath: IMG_PATH,
        gameTitle: "",
        gameType: "queen",
        casinoData: [],
        mId: 0,
        cards: {},
        time: {
          total: 0,
          current: 0,
        },
        callDataApi: true,
        callBookApi: true,
        exp: '',
        tvUrl: "",
        userExp: 0,
        playersCards: {
          p1: null,
          p2: null,
          p3: null,
          p4: null,
        },
        firstCall: true
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

      toggleCards(card) {
        if (card != "1") {
          this.showCards = !this.showCards;
        }
      },
      getKey(data, key) {
        return _.get(data, "key");
      },
      getCasinoRules() {
        this.$store.state.casinoRules = null;
        ServiceApi.callApi("api/front/casino/rules", {
            type: this.gameType,
          })
          .then((response) => {
            if (response.status == 200) {
              this.$store.state.casinoRules = response.data;
            } else {
              this.$store.state.casinoRules = null;
            }
          })
          .catch((e) => {
            this.$store.state.casinoRules = null;
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
                this.getUserBook(true, _.get(this.casinoData, "mid"));
              }
              this.mId = _.get(this.casinoData, "mid");
              this.getUserBook();
              this.cards = _.get(this.casinoData, "card").split(",");
              this.time.total = _.get(this.casinoData, "ft");
              this.time.current = _.get(this.casinoData, "lt");

              if (this.casinoData != null) {
                var p1 = [];
                var p2 = [];
                var p3 = [];
                var p4 = [];
                let playerNo = 1;
                let p1Total = 0;
                let p2Total = 0;
                let p3Total = 0;
                let p4Total = 0;

                for (const card of this.cards) {
                  if (playerNo > 4) playerNo = 1;

                  if (card != "1") {
                    if (playerNo == 1) {
                      p1.push(card);
                      if (card.charAt(0) == "Q") {
                        p1Total += 12;
                      } else if (parseInt(card.charAt(0)) != 1) {
                        p1Total += parseInt(card.charAt(0));
                      }
                    }
                    if (playerNo == 2) {
                      p2.push(card);
                      if (card.charAt(0) == "Q") {
                        p2Total += 12;
                      } else if (parseInt(card.charAt(0)) != 1) {
                        p2Total += parseInt(card.charAt(0));
                      }
                    }

                    if (playerNo == 3) {
                      p3.push(card);
                      if (card.charAt(0) == "Q") {
                        p3Total += 12;
                      } else if (parseInt(card.charAt(0)) != 1) {
                        p3Total += parseInt(card.charAt(0));
                      }
                    }

                    if (playerNo == 4) {
                      p4.push(card);
                      if (card.charAt(0) == "Q") {
                        p4Total += 12;
                      } else if (parseInt(card.charAt(0)) != 1) {
                        p4Total += parseInt(card.charAt(0));
                      }
                    }
                  }
                  playerNo++;
                }
                //this.playersCards.p1 = p1;
                Vue.set(this.playersCards, "p1", p1);
                Vue.set(this.playersCards, "p2", p2);
                Vue.set(this.playersCards, "p3", p3);
                Vue.set(this.playersCards, "p4", p4);

                p2Total = p2Total > 0 ? p2Total + 1 : p2Total;
                p3Total = p3Total > 0 ? p3Total + 2 : p3Total;
                p4Total = p4Total > 0 ? p4Total + 3 : p4Total;

                Vue.set(this.playersCards, "p1Total", p1Total);
                Vue.set(this.playersCards, "p2Total", p2Total);
                Vue.set(this.playersCards, "p3Total", p3Total);
                Vue.set(this.playersCards, "p4Total", p4Total);
              }
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
        // console.log(nat, rate, mid, sid, subType, subId, bType, gType, gstatus)
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
          // console.log(this.$store.state.casinoBet)

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
        ServiceApi.callApi("api/front/placebetcasino", this.$store.state.casinoBet)
          .then((response) => {
            if (response.success) {
              this.$bvToast.toast(response.msg, {
                variant: "success",
                toaster: "b-toaster-top-full",
                autoHideDelay: 3000,
              });
              // console.log('success', response.msg)
            } else {
              this.$bvToast.toast(response.msg, {
                variant: "danger",
                toaster: "b-toaster-top-full",
                autoHideDelay: 3000,
              });
              // console.log('fail', response.msg)
            }
          })
          .catch((e) => {
            // console.log('error', e)
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
      },
    },
    beforeDestroy() {
      this.callBookApi = false;
      this.callDataApi = false;
      this.$store.commit("resetCasinoBetData");
      this.$store.state.casinoRules = null;
      this.$store.state.casinoBetSoda = null;
      this.$store.state.casinobetBook = null;
      this.$store.state.casinoFancybetBook = null;
      this.$store.state.lastResults = []
      this.$store.state.placebetInterval = 0
      this.$store.state.casinoGameType = ""
      clearInterval(PlacebetTimer);
    },
  };
</script>