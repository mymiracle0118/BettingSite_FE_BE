<template>
  <div class="detail-page-container">
    <!-- <div class="detail-top-row">
          <div class="row">
              <div class="col-md-7"> 
                  <form>
                      <ul class="d-inline-block">
                          <li class="form-group active-button">
                              <a href="#" class="btn btn-back active">Active</a>
                          </li>
                      </ul>
                      <div class="form-group d-inline-block maximum-bet m-l-20">
                          <label for="max_bet">Maximum Bet:</label>
                          <input type="number" class="form-control" id="max_bet" placeholder="0">
                      </div>
                      <div class="form-group d-inline-block m-l-20">
                          <button class="btn btn-back">Submit</button>
                      </div>
                      <div class="form-group d-inline-block m-l-20">
                          <div class="form-check form-check-inline ">
                              <label class="form-check-label">
                                  Unmatched
                                  <input type="checkbox" class="form-check-input" value="">
                                  <span class="checkmark"></span>
                              </label>
                          </div>
                      </div>
                      <div class="form-group d-inline-block m-l-20">
                          <button class="btn btn-back">Submit</button>
                      </div>
                  </form>
              </div>
              <div class="col-md-5 float-right text-right">
                  <form>
                      <ul class="d-inline-block">
                          <li class="form-group active-button d-inline-block">
                              <a href="#" class="btn btn-back active" @click="getLockUserList(true)">Bet Lock</a>
                          </li>
                          <template v-if="gameDetail.etid == '4'">
                            <li class="form-group active-button m-l-20 d-inline-block">
                                <a href="#" class="btn btn-back active">Fancy Lock</a>
                            </li>
                            <li class="form-group active-button m-l-20 d-inline-block">
                                <a href="#" class="btn btn-back active">Fancy1 Lock</a>
                            </li>
                          </template>
                          <li class="form-group active-button m-l-20 d-inline-block">
                              <a data-toggle="modal" data-target="#user-book" href="#" class="btn btn-back active" data-backdrop="static">User Book</a>
                          </li>
                          <li class="form-group active-button m-l-20 d-inline-block">
                              <a data-toggle="modal" data-target="#user-book" href="#" class="btn btn-back active" data-backdrop="static">Bookmarkers Book</a>
                          </li>
                      </ul>
                  </form>
              </div>
          </div>
      </div> -->

    <div class="center-main-container">
      <div class="center-content">
        <div class="game-header" :class="`sport${gameDetail.etid}`">
          <span class="game-header-name"
            >{{ gameDetail.cname }} &gt; {{ gameDetail.ename }}</span
          >
          <span
            class="float-right game-header-date"
            v-format-datetime="{ date: gameDetail.stime }"
          ></span>
        </div>
        <div
          class="banner scorestats mb-1"
          v-if="gameDetail && gameDetail.gtv != 0 && animationUrl"
          :style="{'background-image': 'url('+imgPath+'front/img/events-banner/'+gameDetail.etid+'.png)'}"
        >
         <!--  <template v-if="gameDetail.etid">
            <img
              :src="`${imgPath}front/img/events-banner/${gameDetail.etid}.png`"
              class="img-fluid"
            />
          </template> -->
          <iframe :src="animationUrl" frameborder="0"></iframe>
        </div>
        <div
          class="more-market text-right"
          v-if="gameDetail != null && gameDetail.etid != '4'"
        >
          <button class="btn btn-back" @click="getMarketList()">More Market</button>
        </div>

        <div class="market-container">
          <template v-for="(data, key) in orderBy(gameData.new, 'sno')">
            <template v-if="data.dtype == 1">
              <Market1
                :key="key"
                :index="key"
                :marketDataNew="data"
                :marketDataOld="orderBy(gameData.old, 'sno')[key]"
              />
            </template>

            <template v-if="data.dtype == 2">
              <Market2
                :key="key"
                :index="key"
                :marketDataNew="data"
                :marketDataOld="orderBy(gameData.old, 'sno')[key]"
              />
            </template>

            <template v-if="data.dtype == 3">
              <Market3
                :key="key"
                :index="key"
                :marketDataNew="data"
                :marketDataOld="orderBy(gameData.old, 'sno')[key]"
              />
            </template>

            <template v-if="data.dtype == 4">
              <Market4
                :key="key"
                :index="key"
                :marketDataNew="data"
                :marketDataOld="orderBy(gameData.old, 'sno')[key]"
              />
            </template>

            <template v-if="data.dtype == 5">
              <Market5
                :key="key"
                :index="key"
                :marketDataNew="data"
                :marketDataOld="orderBy(gameData.old, 'sno')[key]"
              />
            </template>

            <template v-if="data.dtype == 6">
              <Market6
                :key="key"
                :index="key"
                :marketDataNew="data"
                :marketDataOld="orderBy(gameData.old, 'sno')[key]"
              />
            </template>

            <template v-if="data.dtype == 7">
              <Market7
                :key="key"
                :index="key"
                :marketDataNew="data"
                :marketDataOld="orderBy(gameData.old, 'sno')[key]"
              />
            </template>

            <template v-if="data.dtype == 8">
              <Market8
                :key="key"
                :index="key"
                :marketDataNew="data"
                :marketDataOld="orderBy(gameData.old, 'sno')[key]"
              />
            </template>

            <template v-if="data.dtype == 9">
              <Market9
                :key="key"
                :index="key"
                :marketDataNew="data"
                :marketDataOld="orderBy(gameData.old, 'sno')[key]"
              />
            </template>

            <template v-if="data.dtype == 10">
              <Market10
                :key="key"
                :index="key"
                :marketDataNew="data"
                :marketDataOld="orderBy(gameData.old, 'sno')[key]"
              />
            </template>

            <template v-if="data.dtype == 11">
              <Market11
                :key="key"
                :index="key"
                :marketDataNew="data"
                :marketDataOld="orderBy(gameData.old, 'sno')[key]"
              />
            </template>
          </template>
        </div>
      </div>
      <div class="right-sidebar" :data-simplebar="!$store.getters.isMobile">
        <div class="card m-b-10">
          <template v-if="gameDetail.tv">
            <div
              class="card-header pointer"
              data-toggle="collapse"
              data-target=".video-tv"
              aria-expanded="true"
              @click="getTvUrl()"
            >
              <h6 class="card-title">
                <a href="javascript:void(0)" title=""
                  ><img src="/static/admin/img/arrow-down.svg" class="mr-1"
                /></a>
                Live Match
              </h6>
            </div>
            <div class="video-tv collapse">
              <iframe v-if="showTv" :src="`${tvUrl}`"> </iframe>
            </div>
          </template>
        </div>
        <div v-if="gameDetail && gameDetail.scard != 2">
          <div
            class="scorecard"
            v-if="
              gameDetail.scard == 0 &&
              scoreboardData.statistics &&
              !checkIsTest(scoreboardData.home)
            "
          >
            <div class="scorecard-header">
              <div class="row row1">
                <div class="col-5">Nation</div>
                <div class="col-2 text-center">SC</div>
                <div class="col-1 text-center">OV</div>
                <div class="col-1 text-center">RR</div>
                <div class="col-1 text-center">4s</div>
                <div class="col-1 text-center">6s</div>
                <div class="col-1 text-center">EX</div>
              </div>
            </div>
            <div class="scorecard-box">
              <div class="scorecard-row">
                <div class="row row1">
                  <div class="col-5">{{ scoreboardData.home }}</div>
                  <div class="col-2 text-center">
                    {{ scoreboardData.statistics[0].scores[0].value }}
                  </div>
                  <div class="col-1 text-center">
                    {{ scoreboardData.statistics[0].scores[1].value }}
                  </div>
                  <div class="col-1 text-center">
                    {{ scoreboardData.statistics[0].scores[2].value }}
                  </div>
                  <div class="col-1 text-center">
                    {{ scoreboardData.statistics[0].scores[3].value }}
                  </div>
                  <div class="col-1 text-center">
                    {{ scoreboardData.statistics[0].scores[4].value }}
                  </div>
                  <div class="col-1 text-center">
                    {{ scoreboardData.statistics[0].scores[5].value }}
                  </div>
                </div>
              </div>
              <div class="scorecard-row">
                <div class="row row1">
                  <div class="col-5">{{ scoreboardData.away }}</div>
                  <div class="col-2 text-center">
                    {{ scoreboardData.statistics[1].scores[0].value }}
                  </div>
                  <div class="col-1 text-center">
                    {{ scoreboardData.statistics[1].scores[1].value }}
                  </div>
                  <div class="col-1 text-center">
                    {{ scoreboardData.statistics[1].scores[2].value }}
                  </div>
                  <div class="col-1 text-center">
                    {{ scoreboardData.statistics[1].scores[3].value }}
                  </div>
                  <div class="col-1 text-center">
                    {{ scoreboardData.statistics[1].scores[4].value }}
                  </div>
                  <div class="col-1 text-center">
                    {{ scoreboardData.statistics[1].scores[5].value }}
                  </div>
                </div>
              </div>
              <div class="scorecard-row">
                <div class="row row5 mt-2">
                  <div class="col-12 text-center">
                    <span>{{ scoreboardData.status }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="scorecard"
            v-if="
              gameDetail.scard == 0 &&
              scoreboardData.statistics &&
              checkIsTest(scoreboardData.home)
            "
          >
            <div class="row row5">
              <div class="col-6">Nation Name</div>
              <div class="col-3 text-center">1st INNINGS</div>
              <div class="col-3 text-center">2nd INNINGS</div>
            </div>
            <div class="row row5 mt-2">
              <div class="col-6">
                {{ scoreboardData.home.replace("T-", "") }} -
                {{ scoreboardData.statistics[0].scores[3].value }}
              </div>
              <div class="col-3 text-center">
                {{ scoreboardData.statistics[0].scores[0].value }}
              </div>
              <div class="col-3 text-center">
                {{ scoreboardData.statistics[0].scores[1].value }}
              </div>
            </div>
            <div class="row row5 mt-2">
              <div class="col-6">
                {{ scoreboardData.away }} -
                {{ scoreboardData.statistics[1].scores[3].value }}
              </div>
              <div class="col-3 text-center">
                {{ scoreboardData.statistics[1].scores[0].value }}
              </div>
              <div class="col-3 text-center">
                {{ scoreboardData.statistics[1].scores[1].value }}
              </div>
            </div>
            <div class="row row5 mt-2">
              <div class="col-12 text-center">
                <span>{{ scoreboardData.status }}</span>
              </div>
            </div>
          </div>
          <div
            class="scorecard"
            v-if="gameDetail.scard == 1 && scoreboardData.isfinished == '0'"
          >
            <div class="scorecard-row">
              <div class="score-top-row">
                <div class="score-team">
                  <b>{{ scoreboardData.spnnation1 }}</b> {{ scoreboardData.score1 }}
                </div>
                <div class="score-rr">
                  <span v-if="scoreboardData.spnrunrate1 !== ''">
                    CRR
                    {{ scoreboardData.spnrunrate1 }}
                  </span>
                  <span v-if="scoreboardData.spnreqrate1 !== ''">
                    RR
                    {{ scoreboardData.spnreqrate1 }}
                  </span>
                </div>
                <div
                  class="score-message"
                  v-if="scoreboardData.spnballrunningstatus != ''"
                >
                  <span v-if="scoreboardData.dayno !== ''">
                    Day
                    {{ scoreboardData.dayno }} |
                  </span>
                  {{ scoreboardData.spnballrunningstatus }}
                </div>
                <div class="score-message" v-if="scoreboardData.spnmessage != ''">
                  <span v-if="scoreboardData.dayno !== ''">
                    Day
                    {{ scoreboardData.dayno }} |
                  </span>
                  {{ scoreboardData.spnmessage }}
                </div>
              </div>
            </div>
            <div class="scorecard-row">
              <div class="score-top-row">
                <div class="score-team">
                  <b>{{ scoreboardData.spnnation2 }}</b> {{ scoreboardData.score2 }}
                </div>
                <div class="score-rr">
                  <span v-if="scoreboardData.spnrunrate2 !== ''">
                    CRR
                    {{ scoreboardData.spnrunrate2 }}
                  </span>
                  <span v-if="scoreboardData.spnreqrate2 !== ''">
                    RR
                    {{ scoreboardData.spnreqrate2 }}
                  </span>
                </div>
                <div class="score-message">
                  <span
                    v-for="ball in scoreboardData.balls"
                    v-if="ball !== ''"
                    class="ball-runs mr-1"
                    :class="[
                      { four: ball == 4 },
                      { six: ball == 6 },
                      { wicket: ball.toLowerCase() == 'ww' },
                    ]"
                    >{{ ball }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card m-b-10 my-bet" id="my-game-bets">
          <div class="card-header">
            <h6 class="card-title float-left">My Bets</h6>
            <a
              href="javascript:void(0)"
              class="btn btn-back float-right"
              @click="getViewMoreBets()"
              >View More</a
            >
          </div>
          <div class="card-body1">
            <div class="tab-content">
              <div id="matched-bet" class="tab-pane active">
                <div class="table-responsive">
                  <table class="table coupon-table mb-0">
                    <thead>
                      <tr>
                        <th style="min-width: 90px">UserName</th>
                        <th style="min-width: 90px">Nation</th>
                        <th class="text-right" style="min-width: 50px">Rate</th>
                        <th class="text-right" style="min-width: 70px">Amount</th>
                      </tr>
                    </thead>
                    <tbody v-if="userBook != null">
                      <template v-for="bet in userBook.t2">
                        <tr
                          :class="{
                            'back-border': bet.btype.toLowerCase() == 'back',
                            'lay-border': bet.btype.toLowerCase() == 'lay',
                          }"
                        >
                          <td colspan="4">
                            <b>{{ bet.mname }}</b>
                            <span
                              class="float-right"
                              v-format-datetime="{ date: bet.pdt }"
                            ></span>
                          </td>
                        </tr>
                        <tr
                          :class="{
                            'back-border': bet.btype.toLowerCase() == 'back',
                            'lay-border': bet.btype.toLowerCase() == 'lay',
                          }"
                        >
                          <td class="bt0">{{ bet.uname }}</td>
                          <td class="bt0">{{ bet.sname }} 
                              <template v-if="bet.gtype.toLowerCase() == 'fancy'">
                              / {{ bet.bhav }}
                            </template>
                          </td>
                          <td class="text-right bt0">{{ bet.urate }}</td>
                          <td class="text-right bt0" v-currency="bet.amt">
                            {{ bet.amt }}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="4" style="height: 3px; padding: 0"></td>
                        </tr>
                      </template>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="4" class="text-center">No records found</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal ref="marketListModal" hide-footer title="MORE MARKET" class="market-list">
      <div class="table-responsive more-market">
        <table class="table">
          <thead>
            <tr>
              <th>Market Name</th>
              <th class="text-right">Market Book</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="marketList != null && marketList.length > 0">
              <template v-for="(market, index) in marketList">
                <tr>
                  <td>
                    <a href="javascript:void(0)" @click="setMarketId(market.mid)">{{
                      market.mname
                    }}</a>
                  </td>
                  <td class="text-right">{{ market.scnt }}</td>
                </tr>
              </template>
            </template>
            <template v-else>
              <tr>
                <td colspan="2">No record found</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </b-modal>
    <b-modal ref="viewMoreBetsModal" hide-footer title="View More" size="big" class="">
      <template
        v-if="viewMoreBets.marketList != null && viewMoreBets.marketList.length > 0"
      >
        <ul class="nav nav-tabs d-inline-block text-uppercase" role="tablist ">
          <li
            class="nav-item d-inline-block"
            v-for="(marketTab, index) in viewMoreBets.marketList"
          >
            <a
              class="nav-link"
              data-toggle="tab"
              href="javascript:void(0)"
              @click="getMarketBets(marketTab.mid)"
              :class="{ active: viewMoreBets.selectedMarket == marketTab.mid }"
              >{{ marketTab.mname }}</a
            >
          </li>
        </ul>
      </template>
      <div class="tab-content m-t-20">
        <div id="matched-bet2" class="tab-pane active">
          <template
            v-if="viewMoreBets.betList != null && viewMoreBets.betList.length > 0"
          >
            <GameBetList :gameSoda="viewMoreBets.betList" />
          </template>
          <div v-else class="text-center">No records found</div>
        </div>
      </div>
    </b-modal>
    <b-modal ref="userLockModal" hide-footer title="Bet Lock" class="">
      <div class="row">
        <div class="col-6"></div>
        <div class="col-6">
          <div class="form-group">
            <input
              type="password"
              name="ulockmpass"
              v-model="userLock.mpass"
              value=""
              class="form-control"
              placeholder="Transaction Code"
            />
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>
                <b-form-checkbox
                  v-model="userLock.lockAll"
                  value="1"
                  @change="lockUserAll($event)"
                ></b-form-checkbox>
              </th>
              <th>All Account</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="userLock.userList != null && userLock.userList.length > 0">
              <template v-for="(user, index) in userLock.userList">
                <tr>
                  <td>
                    <b-form-checkbox
                      name="locku"
                      v-model="userLock.selected"
                      :value="user.uguid"
                      @change="lockUser(user, $event)"
                      :ref="'user' + user.uguid"
                    ></b-form-checkbox>
                  </td>
                  <td>{{ user.uname }}</td>
                </tr>
              </template>
            </template>
            <template v-else>
              <tr>
                <td colspan="2" class="text-center">No record found</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </b-modal>
    <b-modal ref="allbookModal" hide-footer title="User Book" size="xl" class="user-book">
      <div class="user-book" v-if="allBookTreeData != null && allBookTreeData.length > 0">
        <ul class="mtree transit bubba mtree-header">
          <li class="mtree-node">
            <a href="#">
              <table class="table m-b-0 table-striped" style="border-bottom: 0">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <template v-for="(val, key) in allBookTreeData[0]">
                      <th
                        class="text-right"
                        v-if="
                          key != 'children' &&
                          key != 'levelno' &&
                          key != 'userid' &&
                          key != 'subid' &&
                          key != 'Username'
                        "
                      >
                        {{ key }}
                      </th>
                    </template>
                  </tr>
                </thead>
              </table>
            </a>
          </li>
        </ul>
        <ul class="mtree transit bubba user-table">
          <template v-for="(treedata, key) in allBookTreeData">
            <GameAllBookTree class="item" :model="treedata"></GameAllBookTree>
          </template>
        </ul>
      </div>
      <div class="text-center" v-else>No Record Found</div>
    </b-modal>
    <div
      v-if="$store.getters.isMobile"
      class="market-show-icon d-none-desktop"
      @click="$helpers.scrollToId('my-game-bets')"
    >
      <div class="bet-cnt">{{ userBook && userBook.t2 ? userBook.t2.length : 0 }}</div>
      <div class="bet-title">Bets</div>
    </div>
  </div>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";
import base64 from "@/base64";
import Market1 from "@/components/markets/Market1";
import Market2 from "@/components/markets/Market2";
import Market3 from "@/components/markets/Market3";
import Market4 from "@/components/markets/Market4";
import Market5 from "@/components/markets/Market5";
import Market6 from "@/components/markets/Market6";
import Market7 from "@/components/markets/Market7";
import Market8 from "@/components/markets/Market8";
import Market9 from "@/components/markets/Market9";
import Market10 from "@/components/markets/Market10";
import Market11 from "@/components/markets/Market11";
import GameAllBookTree from "@/components/GameAllBookTree";
import GameBetList from "@/components/game/GameBetList";
import simplebar from "simplebar-vue";
var socketScoreBoard;
var hiddenPoller;
var gameDataPolling;
import io from "socket.io-client";

if (SECURE_POLLING == 1) {
  gameDataPolling = new _0x314057(require("crypto-js"));
} else if (SECURE_POLLING == 2) {
  hiddenPoller = new _0x314057(require("crypto-js"));
  hiddenPoller.setSToken();
}

export default {
  mounted() {
    this.gameId = base64.decode(this.$route.params.gameId);
    this.etid = base64.decode(this.$route.params.etid);
    this.$store.state.gameId = this.gameId;
    this.getGameDetail();
    this.getUserBook();
  },
  components: {
    Market1,
    Market2,
    Market3,
    Market4,
    Market5,
    Market6,
    Market7,
    Market8,
    Market9,
    Market10,
    Market11,
    GameAllBookTree,
    GameBetList,
    simplebar,
  },
  data() {
    return {
      imgPath: IMG_PATH,
      isLoading: false,
      gameId: null,
      etid: 0,
      mid: 0,
      m: 0,
      gameDetail: [],
      gameData: {
        old: {},
        new: {},
      },
      marketList: [],
      firstCall: true,
      callGameDataApi: true,
      callUserBookApi: true,
      loadingPlacebet: false,
      userBook: null,
      viewMoreBets: {
        marketList: null,
        selectedMarket: null,
        betList: null,
      },
      userLock: {
        mid: 0,
        mpass: "",
        userList: null,
        t1: null,
        lockAll: false,
        selected: [],
      },
      allBookTreeData: [],
      scoreboardData: {},
      hasNoGameData: 0,
      //isTv: false,
      showTv: false,
      animationUrl: "",
      tvUrl: "",
      //viewMoreBets.marketList: null,
      //betMarketSelected:null,
      //viewMoreBets.betList: null
    };
  },
  methods: {
    getTvUrl() {
      this.showTv = !this.showTv;
      this.tvUrl = '';
      if (this.showTv) {
        ServiceApi.callApi("game/tv", {
          gmid: parseInt(this.gameId),
          ip: this.$store.getters.ipAddress,
        })
          .then((response) => {
            if (response.status == 200) {
              this.tvUrl = response.data.url;
            }
            this.$store.state.isLoading = false;
          })
          .catch((e) => {
            this.$store.state.isLoading = false;
          });
      }
    },
    setMarketId(mid) {
      this.$store.state.isLoading = true;
      ServiceApi.callApi("game/getmarketid", {
        gmid: parseInt(this.gameId),
        etid: parseInt(this.etid),
        mid: mid.toString(),
      })
        .then((response) => {
          if (response.status == 200) {
            this.mid = response.data;
          }
          this.$store.state.isLoading = false;
          this.$refs["marketListModal"].hide();
        })
        .catch((e) => {
          this.$store.state.isLoading = false;
          this.$refs["marketListModal"].hide();
        });
    },
    checkIsTest(string) {
      return string.includes("T-");
    },
    getUserBook() {
      ServiceApi.callApi("game/userbook", {
        gid: parseInt(this.gameId),
        mid: parseInt(this.mid),
        etid: parseInt(this.gameDetail.etid),
      })
        .then((response) => {
          if (response.status == 200) {
            this.userBook = response.data;
            this.$store.state.betSoda = response.data.t2;
            this.$store.state.sportbetBook = response.data.t1;
            this.$store.state.fancybetBook = response.data.t3;
            if (this.callUserBookApi == true) {
              setTimeout((res) => {
                this.getUserBook();
              }, 300);
            }
          } else {
            if (this.callUserBookApi == true) {
              this.userBook = null;
              this.$store.state.betSoda = null;
              this.$store.state.sportbetBook = null;
              this.$store.state.fancybetBook = null;
              setTimeout((res) => {
                this.getUserBook();
              }, 300);
            }
          }
        })
        .catch((e) => {
          if (this.callUserBookApi == true) {
           /* this.userBook = null;
            this.$store.state.betSoda = null;
            this.$store.state.sportbetBook = null;
            this.$store.state.fancybetBook = null;*/
            setTimeout((res) => {
              this.getUserBook();
            }, 300);
          }
        });
    },
    getGameDetail() {
      ServiceApi.callApi("game/detail", {
        gid: parseInt(this.gameId),
        etid: parseInt(this.etid),
        s_token:
          SECURE_POLLING == 2
            ? hiddenPoller.decrypt(window.sessionStorage.getItem("s_token") || "")
            : "",
      })
        .then((response) => {
          if (response.status == 200) {
            this.gameDetail = _.first(response.data);

            this.$store.state.etid = _.get(this.gameDetail, "etid");
            this.$store.state.cid = _.get(this.gameDetail, "cid");
            this.m = _.get(this.gameDetail, "m");

            this.mid = this.gameDetail.mid;
            if (this.gameDetail.gtv != 0) {
              ServiceApi.callApi("casino/gettoken", {
                id: "graphic",
              })
                .then((response) => {
                  if (response.status == 200) {
                    this.animationUrl = `${response.data.url}/${this.gameDetail.gtv}/2`;
                  } else {
                    this.animationUrl = "";
                  }
                })
                .catch((e) => {
                  this.animationUrl = "";
                });
            }

            if (this.gameDetail.scard != 2 && this.$store.state.etid == 4) {
              this.connectScoreBoard();
            }
          } else {
            this.gameDetail = [];
          }
          this.getGameData();
        })
        .catch((e) => {
          this.gameDetail = [];
        });
    },
    getMarketList() {
      this.$store.state.isLoading = true;
      ServiceApi.callApi("game/marketlist", {
        gid: parseInt(this.gameId),
      })
        .then((response) => {
          if (response.status == 200) {
            this.marketList = response.data.t1;
          } else {
            this.marketList = [];
          }
          this.$store.state.isLoading = false;
          this.$refs["marketListModal"].show();
        })
        .catch((e) => {
          this.marketList = [];
          this.$store.state.isLoading = false;
        });
    },
    getGameData() {
      if (SECURE_POLLING == 0) {
        ServiceApi.callApi("game/data", {
          gid: parseInt(this.gameId),
          m: parseInt(this.m),
          mid: this.mid.toString(),
          etid: parseInt(this.gameDetail.etid),
        })
          .then((response) => {
            if (response.status == 200) {
              if (!response.data || !response.data.length) {
                this.hasNoGameData++;
                if (this.hasNoGameData == 5) {
                  this.callUserBookApi = false;
                  this.callGameDataApi = false;
                  this.$store.state.gameId = null;

                  this.$router.push({
                    name: "home",
                  });
                }
              } else {
                this.hasNoGameData = 0;
              }

              if (this.firstCall) {
                this.gameData.old = response.data;
                this.firstCall = false;
              } else {
                this.gameData.old = this.gameData.new;
              }

              this.gameData.new = response.data;

              if (this.callGameDataApi == true) {
                setTimeout((res) => {
                  this.getGameData();
                }, 300);
              }
            } else {
              /*this.gameData.new = [];
              this.gameData.old = [];*/

              this.hasNoGameData++;
              if (this.hasNoGameData == 5) {
                this.callUserBookApi = false;
                this.callGameDataApi = false;
                this.$store.state.gameId = null;

                this.$router.push({
                  name: "home",
                });
              }

              if (this.callGameDataApi == true) {
                setTimeout((res) => {
                  this.getGameData();
                }, 300);
              }
            }
          })
          .catch((e) => {
            /*this.gameData.new = [];
            this.gameData.old = [];
*/
            if (this.callGameDataApi == true) {
              setTimeout((res) => {
                this.getGameData();
              }, 300);
            }
          });
      } else if (SECURE_POLLING == 1) {
        gameDataPolling.poll(
          "/api/admin/game/data",
          "POST",
          (res) => {
            // console.log(res)
            if (res.status == 200) {
              if (!res.data.length) {
                this.hasNoGameData++;
                if (this.hasNoGameData == 5) {
                  this.callUserBookApi = false;
                  this.callGameDataApi = false;
                  gameDataPolling.deallocate();
                  this.$store.state.gameId = null;

                  this.$router.push({
                    name: "home",
                  });
                }
              } else {
                this.hasNoGameData = 0;
              }

              if (this.firstCall) {
                this.gameData.old = res.data;
                this.firstCall = false;
              } else {
                this.gameData.old = this.gameData.new;
              }

              this.gameData.new = res.data;
            } else {
              /*this.gameData.new = [];
              this.gameData.old = [];*/
            }
          },
          (error) => {
            console.error(error);
            /*this.gameData.new = [];
            this.gameData.old = [];*/
          },
          () => {
            return JSON.stringify({
              gid: parseInt(this.gameId),
              m: parseInt(this.m),
              mid: this.mid.toString(),
              etid: parseInt(this.gameDetail.etid),
            });
          },
          (xhrrequest) => {
            xhrrequest.setRequestHeader("Content-Type", "application/json");
          },
          300
        );
      } else if (SECURE_POLLING == 2) {
        const self = this;

        function setWsData(response) {
          if (response.status == 200) {
            if (!response.data.length) {
              self.hasNoGameData++;
              if (self.hasNoGameData == 5) {
                self.callUserBookApi = false;
                self.callGameDataApi = false;
                self.$store.state.gameId = null;

                self.$router.push({
                  name: "home",
                });
              }
            } else {
              self.hasNoGameData = 0;
            }

            if (self.firstCall) {
              self.gameData.old = response.data;
              self.firstCall = false;
            } else {
              self.gameData.old = self.gameData.new;
            }

            self.gameData.new = response.data;
          } else {
            self.gameData.new = [];
            self.gameData.old = [];
          }
        }

        self.polling = {
          ws: null,
        };

        try {
          let params = {
            gid: parseInt(this.gameId),
            m: parseInt(this.m),
            mid: this.mid.toString(),
            etid: parseInt(this.gameDetail.etid),
          };
          const ws = (self.polling.ws = getSocketIO(hiddenPoller, params));

          ws.on("game_data", (data) => {
            const response = hiddenPoller.decrypt(data);
            setTimeout(setWsData, 1, JSON.parse(response)); // hiding data setting know-how
          });

          ws.on("inited", () => {});
        } catch (e) {
          console.error(e);
        }
      }
    },
    getViewMoreBets() {
      this.$store.state.isLoading = true;
      ServiceApi.callApi("game/getbetmarketlist", {
        gid: parseInt(this.gameId),
      })
        .then((response) => {
          if (response.status == 200) {
            this.viewMoreBets.marketList = response.data.t1;
            if (
              this.viewMoreBets.marketList != null &&
              this.viewMoreBets.marketList.length > 0
            ) {
              this.viewMoreBets.selectedMarket = this.viewMoreBets.marketList[0].mid;
              this.getMarketBets(this.viewMoreBets.selectedMarket);
            }
          } else {
            this.viewMoreBets.marketList = [];
          }
          this.$store.state.isLoading = false;
          this.$refs["viewMoreBetsModal"].show();
        })
        .catch((e) => {
          this.viewMoreBets.marketList = [];
          this.$store.state.isLoading = false;
        });
    },
    getMarketBets(mid) {
      this.$store.state.isLoading = true;
      this.viewMoreBets.selectedMarket = mid;
      ServiceApi.callApi("game/getmarketbets", {
        gid: parseInt(this.gameId),
        mid: parseInt(mid),
      })
        .then((response) => {
          if (response.status == 200) {
            this.viewMoreBets.betList = response.data.t1;
          } else {
            this.viewMoreBets.betList = [];
          }
          this.$store.state.isLoading = false;
          //this.$refs['viewMoreBetsModal'].show()
        })
        .catch((e) => {
          this.viewMoreBets.betList = [];
          this.$store.state.isLoading = false;
        });
    },
    getLockUserList(mid, showmodal) {
      let self = this;
      if (showmodal == true) {
        this.userLock = {
          mid: mid,
          t1: null,
          mpass: "",
          userList: null,
          lockAll: false,
          selected: [],
        };
      }
      this.$store.state.isLoading = true;
      ServiceApi.callApi("game/lockuserlist", {
        gid: parseInt(this.gameId),
        mid: parseInt(mid),
      })
        .then((response) => {
          if (response.status == 200) {
            this.userLock.userList = null;

            this.userLock.userList = response.data.t2;
            this.userLock.t1 = response.data.t1[0];
            this.resetBetlockList();
          } else {
            this.userLock.userList = null;
          }
          this.$store.state.isLoading = false;
          if (showmodal == true) {
            this.$refs["userLockModal"].show();
          }
        })
        .catch((e) => {
          this.userLock.userList = [];
          this.$store.state.isLoading = false;
        });
    },
    resetBetlockList() {
      this.userLock.lockAll = this.userLock.t1.sstatus == "0" ? 1 : 0;
      this.userLock.selected = [];
      this.userLock.userList.forEach((data, index) => {
        if (data.isact == "0") {
          this.userLock.selected.push(data.uguid);
        }
      });
    },
    lockUser(user, checked) {
      if (this.userLock.mpass == "") {
        this.$swal("", "Transaction Code is required", "error");
        setTimeout((res) => {
          this.resetBetlockList();
        }, 300);

        return false;
      }
      this.$store.state.isLoading = true;
      ServiceApi.callApi("game/lockusergame", {
        gid: parseInt(this.gameId),
        mid: parseInt(this.userLock.mid),
        guid: user.uguid,
        isact: user.isact,
        mpass: this.userLock.mpass,
      })
        .then((response) => {
          if (response.status == 200) {
            this.$swal("", response.msg, "success");
            /*this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            //type: "success",
            icon: "success",
            text: response.msg,
          });*/
          } else {
            this.$swal("", response.msg, "error");
            /*this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            //type: "error",
            icon: "error",
            text: response.msg,
          });*/
          }
          this.getLockUserList(this.userLock.mid, false);
          this.$store.state.isLoading = false;
        })
        .catch((e) => {
          this.$store.state.isLoading = false;
        });
    },
    lockUserAll(checked) {
      if (this.userLock.mpass == "") {
        this.$swal({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          // type: "error",
          icon: "error",
          text: "Transaction Code is required",
        });
        setTimeout((res) => {
          this.resetBetlockList();
        }, 300);
        return false;
      }
      this.$store.state.isLoading = true;
      ServiceApi.callApi("game/lockallusergame", {
        gid: parseInt(this.gameId),
        mid: parseInt(this.userLock.mid),
        mpass: this.userLock.mpass,
        islock: this.userLock.lockAll,
      })
        .then((response) => {
          if (response.status == 200) {
            this.$swal({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              // type: "success",
              icon: "success",
              text: response.msg,
            });
          } else {
            this.$swal({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              //type: "error",
              icon: "error",
              text: response.msg,
            });
          }
          this.getLockUserList(this.userLock.mid, false);
          this.$store.state.isLoading = false;
        })
        .catch((e) => {
          this.$store.state.isLoading = false;
        });
    },
    getBookData(mid, gtype) {
      this.$store.state.isLoading = true;
      ServiceApi.callApi("game/allbook", {
        gid: parseInt(this.gameId),
        mid: parseInt(mid),
        gtype: gtype,
      })
        .then((response) => {
          if (response.status == 200) {
            this.allbook = response.data.t1;
            this.allBookTreeData = this.buildAllBookTree(
              this.allbook,
              this.allbook[0].subid
            );
          } else {
            this.allbook = [];
            this.allBookTreeData = [];
          }
          this.$store.state.isLoading = false;

          this.$refs.allbookModal.show();
          this.$refs["allbookModal"].show();
        })
        .catch((e) => {
          this.allbook = [];
          this.allBookTreeData = [];
          this.$store.state.isLoading = false;
        });
    },
    buildAllBookTree(elements, parentId) {
      let branch = [];
      let children = false;
      elements.forEach((data, index) => {
        if (data.subid == parentId) {
          children = this.buildAllBookTree(elements, data.userid);
          if (children) {
            data["children"] = children;
          }
          branch.push(data);
        } else {
          /*if(parentId == 0){
            branch.push(data)
          }*/
        }
      });
      return branch;
    },
    connectScoreBoard() {
      if (this.gameDetail.oldgmid == null) {
        return;
      }
      let self = this;
      //NEW SCOREBOARD
      var url =
        self.gameDetail.scard == 0 ? SCOREBOARD_URL + "?format=binary" : SCOREBOARD_URL;
      socketScoreBoard = io.connect(url, {
        transports: ["websocket"],
      });
      socketScoreBoard.on("connect", function () {
        socketScoreBoard.emit("subscribe", {
          type: self.gameDetail.scard == 0 ? 2 : self.gameDetail.scard,
          rooms: [parseInt(self.gameDetail.oldgmid)],
        });
      });
      socketScoreBoard.on("error", function () {
        console.log("error");
      });
      socketScoreBoard.on("update", function (response) {
        if (self.gameDetail.scard == 0) {
          const SocketMsg = protobuf.roots.default.EventPublish;
          var msg = SocketMsg.decode(new Uint8Array(response.data));
        } else {
          var msg = response.data;
        }

        if (msg != undefined && msg != null && msg.isfinished == 1) {
          socketScoreBoard.emit("unsubscribe", {
            type: self.gameDetail.scard,
            rooms: [],
          });
        } else {
          if (msg != undefined && msg != null) {
            self.scoreboardData = msg;
          } else {
            $("#scoreboard-box").html("");
          }
        }
      });
      socketScoreBoard.on("disconnect", function () {
        //console.log("disconnect");
      });
    },
  },
  beforeDestroy() {
    this.callUserBookApi = false;
    this.callGameDataApi = false;
    // this.$store.state.etid = null
    // this.$store.state.cid = null
    this.$store.state.gameId = null;
    if (SECURE_POLLING == 1) {
      gameDataPolling.deallocate();
    }
    if (this.gameDetail.scard != 2 && this.gameDetail.oldgmid != null) {
      socketScoreBoard.emit("unsubscribe", { type: this.gameDetail.scard, rooms: [] });
      socketScoreBoard.close();
    }
    if (SECURE_POLLING == 2) {
      if (this.polling.ws) {
        this.polling.ws.disconnect();
        this.polling.ws = null;
      }

      this.polling = null;
    }
  },
};

export function getBaseURL() {
  let baseURL = "";
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    baseURL = "http://" + window.location.hostname + ":3000";
  }
  return baseURL;
}

export function isDevelopmentMode() {
  return process.env.NODE_ENV === "development";
}

export function getSocketIO(hiddenPoller, params) {
  const ws = io(getBaseURL(), {
    path: "/ws/front/gamedata",
    query: params,
    reconnection: true,
    reconnectionDelay: 2000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 1,
    transports: ["websocket"],
  });

  ws.on("connect", () => {
    ws.emit(
      "init",
      hiddenPoller.encrypt(
        hiddenPoller.decrypt(window.sessionStorage.getItem("s_token") || "") +
          "||" +
          window.sessionStorage.getItem("s_token"),
        ws.id
      )
    );
  });

  ws.on("reconnect_attempt", () => {
    if (isDevelopmentMode()) {
      console.log("reconnect_attempt");
    }
    // document.location.reload();
  });

  ws.on("disconnect", (reason) => {
    if (isDevelopmentMode()) console.log(reason);
  });

  return ws;
}
</script>

<style></style>
