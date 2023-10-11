<template>
  <div class="detail-page-container">
    <div class="center-main-container">
      <div class="center-content">
        <div class="casino-container">
          <div class="casino-table teenpattiopen">
            <div class="casino-video">
              <div class="casino-video-title">
                <span class="casino-name">{{ gameTitle }}</span>
                <div class="casino-video-rid">Round ID: {{ casinoData.mid }}</div>
              </div>
              <div class="video-box-container">
                <div class="video-box" v-if="tvUrl != ''">
                  <iframe :src="tvUrl"> </iframe>
                </div>
              </div>
              <template v-if="cards && cards.length">
                <div
                  class="casino-video-cards"
                  :class="{ 'hide-cards': !showCards || cards[0] == '1' }"
                >
                  <div class="casino-cards-shuffle" @click="toggleCards(cards[0])">
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
              <div class="casino-timer">
                <Timer
                  v-if="time.total != 0"
                  :totalTime="time.total"
                  :currentTime="time.current"
                />
              </div>
              <div class="casino-video-right-icons">
                <div class="casino-video-home-icon" title="Home">
                  <router-link
                    :to="{ name: 'casinolist' }"
                    style="color: var(--text-highlight)"
                  >
                    <i class="fas fa-home"></i>
                  </router-link>
                </div>
                <div class="casino-video-rules-icon"  title="Rules" @click="$refs.casinorules.show()">
                    <i class="fas fa-info-circle"></i>
                </div>
                <div
                  class="casino-video-lr-icon"
                  @click="showResults = !showResults"
                  title="Last Results"
                >
                  <i class="fas fa-chevron-circle-down"></i>
                </div>
              </div>
              <CasinoRules ref="casinorules" :gtype="gameType"></CasinoRules>
              <LastResultsSection v-if="$store.getters.isTablet" :gtype="gameType" :lastResults="lastResults" :showResults="showResults" />
             
            </div>
            <div class="casino-detail" v-if="casinoData && casinoData.mid">
              <div class="casino-box mb-2 d-none-small" v-if="$store.getters.isTablet">
                <div class="casino-open-card-box">
                  <template v-for="(element, index) in player">
                    <div :key="index">
                      <div>
                        <b>{{ index + 1 }}</b>
                      </div>
                      <div>
                        <Card :card="cards[index]" :showCloseCard="true" />
                        <Card :card="cards[index + 9]" :showCloseCard="true" />
                        <Card :card="cards[index + 18]" :showCloseCard="true" />
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
                  <div class="casino-box-row mb-4">
                    <div class="casino-nation-name">
                      <b>Odds</b>
                      <i
                        class="fas fa-info-circle float-right"
                        data-target="#range1"
                        data-toggle="collapse"
                      ></i>
                      <div id="range1" class="collapse icon-range">
                        R:<span v-kval="{ size: player[0].min }">0</span>-<span
                          v-kval="{ size: player[0].max }"
                          >0</span
                        >
                      </div>
                    </div>
                    <div class="casino-bl-box">
                      <div
                        class="back casino-bl-box-item"
                        v-for="(element, index) in player"
                        :class="{ suspended: element.gstatus != 'OPEN' }"
                      >
                        <span class="casino-box-odd">{{ element.b }}</span>
                        <span
                          class="casino-book"
                          v-casinofancybook="{
                            sid: element.sid,
                            subid: 0,
                          }"
                          >0</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="casino-box-row mb-4">
                    <div class="casino-nation-name">
                      <b>Pair Plus</b>
                      <i
                        class="fas fa-info-circle float-right"
                        data-target="#range3"
                        data-toggle="collapse"
                      ></i>
                      <div id="range3" class="collapse icon-range">
                        R:<span v-kval="{ size: pair[0].min }">0</span>-<span
                          v-kval="{ size: pair[0].max }"
                          >0</span
                        >
                      </div>
                    </div>
                    <div class="casino-bl-box">
                      <div
                        class="back casino-bl-box-item"
                        v-for="(element, index) in pair"
                        :class="{ suspended: element.gstatus != 'OPEN' }"
                      >
                        <span class="casino-box-odd open-pair">{{ element.nat }}</span>
                        <span
                          class="casino-book"
                          v-casinofancybook="{ sid: element.sid, subid: 0 }"
                          >0</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="casino-box-row mb-4">
                    <div class="casino-nation-name">
                      <b>Total</b>
                      <i
                        class="fas fa-info-circle float-right"
                        data-target="#range2"
                        data-toggle="collapse"
                      ></i>
                      <div id="range2" class="collapse icon-range">
                        R:<span v-kval="{ size: total[0].min }">0</span>-<span
                          v-kval="{ size: total[0].max }"
                          >0</span
                        >
                      </div>
                    </div>
                    <div class="casino-bl-box">
                      <div
                        class="back casino-bl-box-item"
                        v-for="(element, index) in total"
                        :class="{ suspended: element.gstatus != 'OPEN' }"
                      >
                        <span class="casino-box-odd">{{ element.b }}</span>
                        <span
                          class="casino-book"
                          v-casinofancybook="{ sid: element.sid, subid: 0 }"
                          >0</span
                        >
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
                      <span>Odds</span
                      ><i
                        class="fas fa-info-circle float-right"
                        data-target="#range4"
                        data-toggle="collapse"
                      ></i>
                      <div id="range4" class="collapse icon-range">
                        R:<span v-kval="{ size: player[0].min }">0</span>-<span
                          v-kval="{ size: player[0].max }"
                          >0</span
                        >
                      </div>
                    </div>
                    <div class="casino-bl-box-item">
                      <span>Pair Plus</span>
                      <i
                        class="fas fa-info-circle float-right"
                        data-target="#range3"
                        data-toggle="collapse"
                      ></i>
                      <div id="range3" class="collapse icon-range">
                        R:<span v-kval="{ size: pair[0].min }">0</span>-<span
                          v-kval="{ size: pair[0].max }"
                          >0</span
                        >
                      </div>
                    </div>
                    <div class="casino-bl-box-item">
                      <span>Total</span>
                      <i
                        class="fas fa-info-circle float-right"
                        data-target="#range6"
                        data-toggle="collapse"
                      ></i>
                      <div id="range6" class="collapse icon-range">
                        R:<span v-kval="{ size: total[0].min }">0</span>-<span
                          v-kval="{ size: total[0].max }"
                          >0</span
                        >
                      </div>
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
                      <div
                        class="back casino-bl-box-item"
                        :class="{ suspended: element.gstatus != 'OPEN' }"
                      >
                        <span class="casino-box-odd">{{ element.b }}</span>
                        <span v-casinobookcalc="{ sid: element.sid, urate: element.b }"
                          >0</span
                        >
                      </div>
                      <div
                        class="back casino-bl-box-item"
                        :class="{ suspended: pair[index].gstatus != 'OPEN' }"
                      >
                        <span class="casino-box-odd">{{ pair[index].nat }}</span>

                        <span
                          v-casinobookcalc="{
                            sid: pair[index].sid,
                            urate: pair[index].b,
                          }"
                          >0</span
                        >
                      </div>
                      <div
                        class="back casino-bl-box-item"
                        :class="{ suspended: total[index].gstatus != 'OPEN' }"
                      >
                        <span class="casino-box-odd">{{ total[index].b }}</span>
                        <span
                          v-casinobookcalc="{
                            sid: total[index].sid,
                            urate: total[index].b,
                          }"
                          >0</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <template v-if="casinoData.remark && casinoData.remark != ''">
                <div class="casino-remark mt-1">
                  <div class="remark-icon">
                    <img :src="`${imgPath}front/img/icons/remark.png`" />
                  </div>
                  <marquee>{{ casinoData.remark }}</marquee>
                </div>
              </template>
              <LastResultsSection v-if="!$store.getters.isTablet" :gtype="gameType" :lastResults="lastResults" :showResults="showResults" />
              
            </div>
          </div>
        </div>
      </div>
      <RightSideBar :mid="mId" :gtype="gameType"></RightSideBar>
    </div>
  </div>
</template>
<script>
import ServiceApi from "@/services/ServiceApi";
import Timer from "@/components/casino/BaseTimer";
import RightSideBar from "@/components/casino/RightSideBar";
import Card from "@/components/casino/Card";
import CasinoRules from '@/components/casino/CasinoRules'
import LastResultsSection from '@/components/casino/LastResultsSection'

export default {
  mounted() {
    this.getTvUrl();
    this.getCasinoData();
    this.getUserBook();
    this.getLastResults();
  },
  components: {
    Timer,
    RightSideBar,
    Card,
    CasinoRules,
    LastResultsSection
  },
  computed: {
    player() {
      var player = _.filter(_.get(this.casinoData, "sub"), {
        subtype: "Player",
      });
      return this.orderBy(player, "sr");
    },
    pair() {
      var pairs = _.filter(_.get(this.casinoData, "sub"), {
        subtype: "Pair",
      });
      return this.orderBy(pairs, "sr");
    },
    total() {
      var totals = _.filter(_.get(this.casinoData, "sub"), {
        subtype: "Total",
      });
      return this.orderBy(totals, "sr");
    },
    anycolor() {
      var anycolors = _.filter(_.get(this.casinoData, "sub"), {
        sid: 25,
      });
      return this.orderBy(anycolors, "sr");
    },
    anyStraight() {
      var anyStraights = _.filter(_.get(this.casinoData, "sub"), {
        sid: 26,
      });
      return this.orderBy(anyStraights, "sr");
    },
    anyTrio() {
      var anyTrios = _.filter(_.get(this.casinoData, "sub"), {
        sid: 27,
      });
      return this.orderBy(anyTrios, "sr");
    },
    anyStaritFlush() {
      var anyStraightFlushs = _.filter(_.get(this.casinoData, "sub"), {
        sid: 28,
      });
      return this.orderBy(anyStraightFlushs, "sr");
    },
  },
  data() {
    return {
      showCards: true,
      showResults: true,
      imgPath: IMG_PATH,
      gameTitle: "Teenpatti Open",
      gameType: "teen8",
      casinoData: [],
      mId: 0,
      cards: [],
      lastResults: [],
      time: {
        total: 0,
        current: 0,
      },
      callDataApi: true,
      callBookApi: true,
      loadingPlacebet: false,
      tvUrl: "",
      userExp: 0,
    };
  },
  methods: {
    getTvUrl() {
      ServiceApi.callApi("casino/gettoken", { id: "tv" })
        .then((response) => {
          if (response.status == 200) {
            this.tvUrl =
              "/admin/pages/mediaplayercasino/" +
              this.gameType +
              "/" +
              response.data.token +
              "?ip=" +
              IP_ADDRESS;
          } else {
            this.tvUrl = "";
          }
        })
        .catch((e) => {
          this.tvUrl = "";
        });
    },
    toggleCards(card) {
      if (card != "1") {
        this.showCards = !this.showCards;
      }
    },
    getKey(data, key) {
      return _.get(data, "key");
    },
    getCasinoData() {
      ServiceApi.callApi("casino/data", {
        type: this.gameType,
      })
        .then((response) => {
          if (response.status == 200) {
            this.casinoData = response.data;
            if (_.get(this.casinoData, "mid") != this.mId) {
              this.getLastResults();
            }
            this.mId = _.get(this.casinoData, "mid");
            this.cards = _.get(this.casinoData, "card").split(",");
            this.time.total = _.get(this.casinoData, "ft");
            this.time.current = _.get(this.casinoData, "lt");
            if (this.callDataApi == true) {
              setTimeout((res) => {
                this.getCasinoData();
              }, 800);
            }
          } else {
           // this.casinoData = [];
            if (this.callDataApi == true) {
              setTimeout((res) => {
                this.getCasinoData();
              }, 800);
            }
          }
          // this.getUserBook();
        })
        .catch((e) => {
          //this.casinoData = [];
          if (this.callDataApi == true) {
            setTimeout((res) => {
              this.getCasinoData();
            }, 800);
          }
        });
    },
    getUserBook() {
      ServiceApi.callApi("casino/book", {
        mid: parseInt(this.mId),
        gType: this.gameType,
      })
        .then((response) => {
          if (response.status == 200) {
            this.$store.state.casinoBetSoda = response.data.bet;
            this.$store.state.casinoFancybetBook = response.data.fancy;
            this.$store.state.casinobetBook = response.data.sportbet;
          } else {
            this.$store.state.casinoBetSoda = null;
            this.$store.state.casinobetBook = null;
            this.$store.state.casinoFancybetBook = null;
          }
          if (this.callBookApi == true) {
            setTimeout((res) => {
              this.getUserBook();
            }, 800);
          }
        })
        .catch((e) => {
          /*this.$store.state.casinoBetSoda = null;
          this.$store.state.casinobetBook = null;
          this.$store.state.casinoFancybetBook = null;*/
          if (this.callBookApi == true) {
            setTimeout((res) => {
              this.getUserBook();
            }, 800);
          }
        });
    },
    getLastResults() {
      ServiceApi.callApi("casino/lastresults", {
        gType: this.gameType,
      })
        .then((response) => {
          if (response.status == 200) {
            this.lastResults = response.data.res;
            this.gameTitle = response.data.res1 ? response.data.res1.cname : "";
          } else {
            this.lastResults = [];
          }
        })
        .catch((e) => {
          this.lastResults = [];
        });
    },
  },
  beforeDestroy() {
    this.callBookApi = false;
    this.callDataApi = false;
  },
};
</script>
