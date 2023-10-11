<template>
  <div class="detail-page-container">
    <div class="center-main-container">
      <div class="center-content">
        <div class="casino-container">
          <div class="casino-table kbc">
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
                      <div>
                          <Card :card="cards[0]" />
                      </div>
                      <div>
                          <Card :card="cards[1]" />
                      </div>
                      <div>
                          <Card :card="cards[2]" />
                      </div>
                      <div>
                          <Card :card="cards[3]" />
                      </div>
                      <div>
                          <Card :card="cards[4]" />
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
                  <i
                    class="fas"
                    :class="[
                      { 'fa-chevron-circle-down': !showResults },
                      { 'fa-chevron-circle-up': showResults },
                    ]"
                  ></i>
                </div>
              </div>
              <CasinoRules ref="casinorules" :gtype="gameType"></CasinoRules>
              <LastResultsSection v-if="$store.getters.isTablet" :gtype="gameType" :lastResults="lastResults" :showResults="showResults" />
            </div>
            <div class="casino-detail" v-if="casinoData && casinoData.mid">
              <div class="row row5 kbc-btns">
                  <div class="col-12 col-md-4">
                      <div class="casino-box-row">
                          <div class="casino-nation-name">
                              <b>[Q1] {{ redBlack[0].nat }}</b>
                          </div>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn" :class="[{'suspended': redBlack[0].gstatus != 'OPEN' }]">
                                  <input type="radio" name="options" id="option1" autocomplete="off" checked="">
                                  <img :src="`${imgPath}front/img/cards/heart.png`">
                                  <img :src="`${imgPath}front/img/cards/diamond.png`">
                              </label>
                              <label class="btn" :class="[{'suspended': redBlack[0].gstatus != 'OPEN' }]">
                                  <input type="radio" name="options" id="option2" autocomplete="off">
                                  <img :src="`${imgPath}front/img/cards/spade.png`">
                                  <img :src="`${imgPath}front/img/cards/club.png`">
                              </label>
                          </div>
                      </div>
                  </div>
                  <div class="col-12 col-md-4">
                      <div class="casino-box-row">
                          <div class="casino-nation-name">
                              <b>[Q2] {{ oddEven[0].nat }}</b>
                          </div>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn" :class="[{'suspended': oddEven[0].gstatus != 'OPEN' }]">
                                  <input type="radio" name="options" id="option1" autocomplete="off" checked=""> ODD
                              </label>
                              <label class="btn" :class="[{'suspended': oddEven[0].gstatus != 'OPEN' }]">
                                  <input type="radio" name="options" id="option2" autocomplete="off"> EVEN
                              </label>
                          </div>
                      </div>
                  </div>
                  <div class="col-12 col-md-4">
                      <div class="casino-box-row">
                          <div class="casino-nation-name">
                              <b>[Q3] {{ upDown[0].nat }}</b>
                          </div>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn" :class="[{'suspended': upDown[0].gstatus != 'OPEN' }]">
                                  <input type="radio" name="options" id="option1" autocomplete="off" checked=""> UP
                              </label>
                              <label class="btn" :class="[{'suspended': upDown[0].gstatus != 'OPEN' }]">
                                  <input type="radio" name="options" id="option2" autocomplete="off"> DOWN
                              </label>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="row row5 kbc-btns kbcothers mt-2">
                  <div class="col-12 col-md-6">
                      <div class="casino-box-row">
                          <div class="casino-nation-name">
                              <b>[Q4] {{ cardj[0].nat }}</b>
                          </div>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn" :class="[{'suspended': cardj[0].gstatus != 'OPEN' }]">
                                  <input type="radio" name="options" id="option1" autocomplete="off" checked=""> 1 2 3
                              </label>
                              <label class="btn" :class="[{'suspended': cardj[0].gstatus != 'OPEN' }]">
                                  <input type="radio" name="options" id="option2" autocomplete="off"> 4 5 6
                              </label>
                              <label class="btn" :class="[{'suspended': cardj[0].gstatus != 'OPEN' }]">
                                  <input type="radio" name="options" id="option2" autocomplete="off"> 8 9 10
                              </label>
                              <label class="btn" :class="[{'suspended': cardj[0].gstatus != 'OPEN' }]">
                                  <input type="radio" name="options" id="option2" autocomplete="off"> J Q K
                              </label>
                          </div>
                      </div>
                  </div>
                  <div class="col-12 col-md-6">
                      <div class="casino-box-row">
                          <div class="casino-nation-name">
                              <b>[Q5] {{ color[0].nat }}</b>
                          </div>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn" :class="[{'suspended': color[0].gstatus != 'OPEN' }]">
                                  <input type="radio" name="options" id="option1" autocomplete="off" checked="">
                                  <img :src="`${imgPath}front/img/cards/spade.png`">
                              </label>
                              <label class="btn" :class="[{'suspended': color[0].gstatus != 'OPEN' }]">
                                  <input type="radio" name="options" id="option2" autocomplete="off">
                                  <img :src="`${imgPath}front/img/cards/heart.png`">
                              </label>
                              <label class="btn" :class="[{'suspended': color[0].gstatus != 'OPEN' }]">
                                  <input type="radio" name="options" id="option2" autocomplete="off">
                                   <img :src="`${imgPath}front/img/cards/club.png`">
                              </label>
                              <label class="btn" :class="[{'suspended': color[0].gstatus != 'OPEN' }]">
                                  <input type="radio" name="options" id="option2" autocomplete="off">
                                  <img :src="`${imgPath}front/img/cards/diamond.png`">
                              </label>
                          </div>
                      </div>
                  </div>
              </div>
              <template v-if="casinoData.remark && casinoData.remark != ''">
                <div class="casino-remark mt-1 w-100">
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
      <div class="right-sidebar">
        <RightSideBar :mid="mId" :gtype="gameType"></RightSideBar>
      </div>
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
    redBlack() {
        var redBlack = _.filter(_.get(this.casinoData, 'sub'), {
            'subtype': 'redblack'
        })
        return this.orderBy(redBlack, 'sr')
    },
    oddEven() {
        var oddEven = _.filter(_.get(this.casinoData, 'sub'), {
            'subtype': 'oddeven'
        })
        return this.orderBy(oddEven, 'sr')
    },
    upDown() {
        var upDown = _.filter(_.get(this.casinoData, 'sub'), {
            'subtype': 'updown'
        })
        return this.orderBy(upDown, 'sr')
    },
    cardj() {
        var cardj = _.filter(_.get(this.casinoData, 'sub'), {
            'subtype': 'Cardj'
        })
        return this.orderBy(cardj, 'sr')
    },
    color() {
        var color = _.filter(_.get(this.casinoData, 'sub'), {
            'subtype': 'color'
        })
        return this.orderBy(color, 'sr')
    },
  },
  data() {
    return {
      showCards: true,
      showResults: true,
      imgPath: IMG_PATH,
      gameTitle: "KBC",
      gameType: "kbc",
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
            //this.casinoData = [];
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
              this.$store.state.casinoBetSoda = response.data.t1
          } else {
              this.$store.state.casinoBetSoda = null
          }
          /*if (response.status == 200) {
            this.$store.state.casinoBetSoda = response.data.bet;
            this.$store.state.casinoFancybetBook = response.data.fancy;
            this.$store.state.casinobetBook = response.data.sportbet;
          } else {
            this.$store.state.casinoBetSoda = null;
            this.$store.state.casinobetBook = null;
            this.$store.state.casinoFancybetBook = null;
          }*/
          if (this.callBookApi == true) {
            setTimeout((res) => {
              this.getUserBook();
            }, 800);
          }
        })
        .catch((e) => {
           this.$store.state.casinoBetSoda = null
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
