<template>
  <div class="detail-page-container cricket-detail" :class="{ 'loader-section-parent' : gameData.new && !gameData.new.length }">
    <Loader :isVisible="gameData.new && !gameData.new.length"></Loader>
    <!-- SCOREBOARD START -->
    <div class="banner scorecard-banner"
      :style="gameDetail.etid ? `background-image : url(${imgPath}front/img/events-banner/${gameDetail.etid}.png);` : ''"
      v-if="gameDetail && gameDetail.scard != 2">
      <!-- <template v-if="gameDetail.etid">
        <img :src="`${imgPath}front/img/events-banner/${gameDetail.etid}.png`" class="img-fluid">
      </template> -->
      <template v-if="gameDetail && gameDetail.scard != 2">
        <div class="scorecard"
          v-if="gameDetail.scard == 0 && scoreboardData.statistics && !checkIsTest(scoreboardData.home)">
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
                <div class="col-5">{{scoreboardData.home}}</div>
                <div class="col-2 text-center">{{scoreboardData.statistics[0].scores[0].value}}</div>
                <div class="col-1 text-center">{{scoreboardData.statistics[0].scores[1].value}}</div>
                <div class="col-1 text-center">{{scoreboardData.statistics[0].scores[2].value}}</div>
                <div class="col-1 text-center">{{scoreboardData.statistics[0].scores[3].value}}</div>
                <div class="col-1 text-center">{{scoreboardData.statistics[0].scores[4].value}}</div>
                <div class="col-1 text-center">{{scoreboardData.statistics[0].scores[5].value}}</div>
              </div>
            </div>
            <div class="scorecard-row">
              <div class="row row1">
                <div class="col-5">{{scoreboardData.away}}</div>
                <div class="col-2 text-center">{{scoreboardData.statistics[1].scores[0].value}}</div>
                <div class="col-1 text-center">{{scoreboardData.statistics[1].scores[1].value}}</div>
                <div class="col-1 text-center">{{scoreboardData.statistics[1].scores[2].value}}</div>
                <div class="col-1 text-center">{{scoreboardData.statistics[1].scores[3].value}}</div>
                <div class="col-1 text-center">{{scoreboardData.statistics[1].scores[4].value}}</div>
                <div class="col-1 text-center">{{scoreboardData.statistics[1].scores[5].value}}</div>
              </div>
            </div>
            <div class="scorecard-row">
              <div class="row row5 mt-2">
                <div class="col-12 text-center">
                  <span>{{scoreboardData.status}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="scorecard"
          v-if="gameDetail.scard == 0 && scoreboardData.statistics && checkIsTest(scoreboardData.home)">
          <div class="row row5">
            <div class="col-6">Nation Name</div>
            <div class="col-3 text-center">1st INNINGS</div>
            <div class="col-3 text-center">2nd INNINGS</div>
          </div>
          <div class="row row5 mt-2">
            <div class="col-6">{{scoreboardData.home.replace('T-','')}} -
              {{scoreboardData.statistics[0].scores[3].value}}</div>
            <div class="col-3 text-center">{{scoreboardData.statistics[0].scores[0].value}}</div>
            <div class="col-3 text-center">{{scoreboardData.statistics[0].scores[1].value}}</div>
          </div>
          <div class="row row5 mt-2">
            <div class="col-6">{{scoreboardData.away}} - {{scoreboardData.statistics[1].scores[3].value}}</div>
            <div class="col-3 text-center">{{scoreboardData.statistics[1].scores[0].value}}</div>
            <div class="col-3 text-center">{{scoreboardData.statistics[1].scores[1].value}}</div>
          </div>
          <div class="row row5 mt-2">
            <div class="col-12 text-center">
              <span>{{scoreboardData.status}}</span>
            </div>
          </div>
        </div>
        <div class="scorecard" v-if="gameDetail.scard == 1 && scoreboardData.isfinished == '0'">
          <div class="scorecard-row">
            <div class="row row5">
              <div class="col-6 text-lg-left">
                <div><b>{{ scoreboardData.spnnation1 }}</b> {{ scoreboardData.score1 }}</div>
                <div>
                  <span v-if="scoreboardData.spnrunrate1 !== ''">
                    CRR
                    {{ scoreboardData.spnrunrate1 }}
                  </span>
                  <span v-if="scoreboardData.spnreqrate1 !== ''">
                    RR
                    {{ scoreboardData.spnreqrate1 }}
                  </span>
                </div>
              </div>
              <div class="col-6 text-lg-right">
                <div><b>{{ scoreboardData.spnnation2 }}</b> {{ scoreboardData.score2 }}</div>
                <div>
                  <span v-if="scoreboardData.spnrunrate2 !== ''">
                    CRR
                    {{ scoreboardData.spnrunrate2 }}
                  </span>
                  <span v-if="scoreboardData.spnreqrate2 !== ''">
                    RR
                    {{ scoreboardData.spnreqrate2 }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="scorecard-row">
            <div class="row row5">
              <div class="col-lg-8 col-6 text-left">
                <template v-if="scoreboardData.spnmessage != ''">
                  <span v-if="scoreboardData.dayno !== ''">
                    Day
                    {{ scoreboardData.dayno }} |
                  </span>
                  {{ scoreboardData.spnmessage }}
                </template>
              </div>
              <div class="col-lg-4 col-6 text-lg-right text-right">
                <template v-for="(ball, key) in scoreboardData.balls">
                  <span :key="key" v-if="ball !== '' " class="ball-runs mr-1"
                    :class="[{'four' : ball == 4}, {'six' : ball == 6}, {'wicket' : ball.toLowerCase() == 'ww'}]">{{ ball }}</span>
                </template>
              </div>
            </div>
          </div>

        </div>
      </template>
    </div>
    <!-- SCOREBOARD END -->

    <!-- ANIMATION WEB START -->
    <template v-if="!$store.getters.isMobile">
      <div class="banner scorestats tab" v-if="gameDetail && gameDetail.gtv != 0 && animationUrl"
        :style="gameDetail.etid ? `background-image : url(${imgPath}front/img/events-banner/${gameDetail.etid}.png);` : ''">
        <!-- <template v-if="gameDetail.etid">
          <img :src="`${imgPath}front/img/events-banner/${gameDetail.etid}.png`" class="img-fluid">
        </template> -->
        <iframe :src="`${animationUrl}`" frameborder="0"></iframe>
      </div>
    </template>
    <!-- ANIMATION WEB END -->

    <!-- ANIMATION AND TV TOGGLE START -->
    <template v-if="$store.getters.isMobile && gameDetail.tv == true && gameDetail.gtv != 0">
      <template v-if="slideTo == 'animation'">
        <div class="banner scorestats mobtog" v-if="gameDetail && gameDetail.gtv != 0 && animationUrl"
          :style="gameDetail.etid ? `background-image : url(${imgPath}front/img/events-banner/${gameDetail.etid}.png);` : ''">
          <!-- <template v-if="gameDetail.etid">
            <img :src="`${imgPath}front/img/events-banner/${gameDetail.etid}.png`" class="img-fluid">
          </template> -->
          <iframe :src="`${animationUrl}`" frameborder="0"></iframe>
        </div>
      </template>
      <template v-if="slideTo == 'tv'">
        <div class="video-tv mt-1 d-none-desktop">
          <!-- <iframe :src="`/mediaplayer/game/${$store.state.gameId}/${$store.getters.ipAddress}`"></iframe> -->
          <iframe v-if="$store.state.tvUrl" :src="$store.state.tvUrl"></iframe>
        </div>
      </template>
    </template>
    <!-- ANIMATION AND TV TOGGLE END -->

    <!-- ONLY TV MOBILE START -->
    <template v-else-if="$store.getters.isMobile && gameDetail.tv == true && gameDetail.gtv == 0">
      <div class="video-tv mt-1 d-none-desktop" v-if="$store.state.showTv">
        <!-- <iframe :src="`/mediaplayer/game/${$store.state.gameId}/${$store.getters.ipAddress}`"></iframe> -->
        <iframe v-if="$store.state.tvUrl" :src="$store.state.tvUrl"></iframe>
      </div>
    </template>
    <!-- ONLY TV MOBILE END -->

    <!-- ONLY ANIMATION MOBILE START -->
    <template v-else-if="$store.getters.isMobile && gameDetail.tv == false && gameDetail.gtv != 0">
      <div class="banner scorestats mob" v-if="animationUrl"
        :style="gameDetail.etid ? `background-image : url(${imgPath}front/img/events-banner/${gameDetail.etid}.png);` : ''">
        <!-- <template v-if="gameDetail.etid">
          <img :src="`${imgPath}front/img/events-banner/${gameDetail.etid}.png`" class="img-fluid">
        </template> -->
        <iframe :src="`${animationUrl}`" frameborder="0"></iframe>
      </div>
    </template>
    <!-- ONLY ANIMATION MOBILE END -->

    <!-- HEADER WEB START -->
    <div class="game-header d-none-mobile" :class="[{ 'mt-2': gameDetail.scard != 2 },`sport${gameDetail.etid}`]">
      <span class="game-header-name">{{ gameDetail.cname }} &gt; {{ gameDetail.ename }}</span>
      <span class="game-header-date">
        {{ changeDateFormat(gameDetail.stime) }}
      </span>
    </div>
    <!-- HEADER WEB END -->

    <!-- HEADER MOBILE START -->
    <div class="game-header d-none-desktop" :class="[{ 'mt-2': gameDetail.scard != 2 },`sport${gameDetail.etid}`]">
      <span class="game-header-name">
        {{ gameDetail.cname }} &gt; {{ gameDetail.ename }}
        <div>
          <small>{{ changeDateFormat(gameDetail.stime) }}</small>
        </div>
      </span>
      <span>
        <template v-if="gameDetail.tv == true && gameDetail.gtv != 0">
          <i class="fas fa-eye" style="font-size:21px" :class="{'active-tab': slideTo == 'animation'}"
            @click="toggleTvAndAnimation('animation')"></i>
          <i class="fas fa-tv ml-1" style="font-size:18px" :class="{'active-tab': slideTo == 'tv'}"
            @click="toggleTvAndAnimation('tv')"></i>
        </template>
        <template v-else-if="gameDetail.tv == true && gameDetail.gtv == 0">
          <i class="fas fa-tv" @click="showOnlyTv()"></i>
        </template>
      </span>
    </div>
    <!-- HEADER MOBILE END -->

    <!-- DRAGABLE TV WEB START -->
    <!-- <template v-if="$store.getters.isTablet && $store.state.showTvTo == 'dragable'">
      <div :class="{'d-block':$store.state.showTv, 'd-none':!$store.state.showTv}">
        <VueDragResize :isActive="$store.state.showTv" :preventActiveBehavior="true" :w="350" :h="200" :x="100" :y="50"
          :isResizable="false" contentClass="dragable-tv">
          <button class="btn btn-danger tvButton" v-if="$store.state.showTv" @click="$store.state.showTv = false">
            <i class="fa fa-times"></i>
          </button>
          <iframe v-if="$store.state.showTv"
            :src="`/mediaplayer/game/${$store.state.gameId}/${$store.getters.ipAddress}`"></iframe>
        </VueDragResize>
      </div>
    </template> -->
    <!-- DRAGABLE TV WEB END -->


    <div class="search-box d-none-big w-100">
      <div class="form-group mb-0">
        <input type="text" v-model="$store.state.searchMarktetText" placeholder="Search Market" class="form-control"
          style="text-transform: lowercase; text-transform:">
        <img :src="imgPath + 'front/img/search.svg'" class="search-icon">
      </div>
    </div>
    <div class="all-markets d-none-small">
      <div>
        <template v-for="(data, key) in orderBy(newMarket, 'sno')">
          <a href="javascript:void(0)" @click="scrollToId(`goto-${key}`)" :key="key">
            <small>#{{ data.mname }}</small>
          </a>
        </template>
      </div>
      <div class="search-box">
        <div class="form-group mb-2">
          <input type="text" v-model="$store.state.searchMarktetText" placeholder="Search Market" class="form-control"
            style="text-transform: lowercase;">
          <img :src="imgPath + 'front/img/search.svg'" class="search-icon">
        </div>
      </div>
    </div>

    <template v-for="(data, key) in orderBy(newMarket, 'sno')">
      <template v-if="data.dtype == 1">
        <Market1 :id="`goto-${key}`" :key="key" :index="key" :marketDataNew="data"
          :marketDataOld="orderBy(oldMarket, 'sno')[key]" />
      </template>

      <template v-if="data.dtype == 2">
        <!-- <Market2 :id="`goto-${key}`" :key="key" :index="key" :marketDataNew="data"
          :marketDataOld="orderBy(oldMarket, 'sno')[key]" /> -->
        <Market2 :id="`goto-${key}`" :key="key" :index="key" :marketDataNew="data"
          :marketDataOld="orderBy(oldMarket, 'sno')[key]" :hasBM1="(key-1 >= 0) ? newMarket[key].gtype == 'match1' && newMarket[key-1].gtype == 'match1' : false"/>
      </template>

      <template v-if="data.dtype == 3">
        <Market3 :id="`goto-${key}`" :key="key" :index="key" :marketDataNew="data"
          :marketDataOld="orderBy(oldMarket, 'sno')[key]" />
      </template>

      <template v-if="data.dtype == 4">
        <!-- <Market4 :id="`goto-${key}`" :key="key" :index="key" :marketDataNew="data"
          :marketDataOld="orderBy(oldMarket, 'sno')[key]" /> -->
        <Market4 :id="`goto-${key}`" :key="key" :index="key" :marketDataNew="data"
          :marketDataOld="orderBy(oldMarket, 'sno')[key]" :hasBM2="(key+1 < newMarket.length) ? newMarket[key].gtype == 'match1' && newMarket[key+1].gtype == 'match1' : false"/>
      </template>

      <template v-if="data.dtype == 5">
        <Market5 :id="`goto-${key}`" :key="key" :index="key" :marketDataNew="data"
          :marketDataOld="orderBy(oldMarket, 'sno')[key]" />
      </template>

      <template v-if="data.dtype == 6">
        <Market6 :id="`goto-${key}`" :key="key" :index="key" :marketDataNew="data"
          :marketDataOld="orderBy(oldMarket, 'sno')[key]" />
      </template>

      <template v-if="data.dtype == 7">
        <Market7 :id="`goto-${key}`" :key="key" :index="key" :marketDataNew="data"
          :marketDataOld="orderBy(oldMarket, 'sno')[key]" />
      </template>

      <template v-if="data.dtype == 8">
        <Market8 :id="`goto-${key}`" :key="key" :index="key" :marketDataNew="data"
          :marketDataOld="orderBy(oldMarket, 'sno')[key]" />
      </template>

      <template v-if="data.dtype == 9">
        <Market9 :id="`goto-${key}`" :key="key" :index="key" :marketDataNew="data"
          :marketDataOld="orderBy(oldMarket, 'sno')[key]" />
      </template>

      <template v-if="data.dtype == 10">
        <Market10 :id="`goto-${key}`" :key="key" :index="key" :marketDataNew="data"
          :marketDataOld="orderBy(oldMarket, 'sno')[key]" />
      </template>

      <template v-if="data.dtype == 11">
        <Market11 :id="`goto-${key}`" :key="key" :index="key" :marketDataNew="data"
          :marketDataOld="orderBy(oldMarket, 'sno')[key]" />
      </template>

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
                  <span v-sportbook="{mid: $store.state.bet.marketId, sid: section.sid}">0</span>
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

    <!-- Trader Modal Start -->
    <b-modal ref="trader-modal" sm :class="{ 'loader-section-parent' : traderloadingPlacebet}" title="Please Confirm"
      @ok="traderPlacebet()" @cancel="clearTraderData()" @close="clearTraderData()" hide-footer
      modal-class="modal-place-bet">
      <!-- <div class="loader-section" v-if="traderloadingPlacebet">
        <div class="loader-section-icon"></div>
      </div> -->
      <Loader :isVisible="traderloadingPlacebet"></Loader>

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

    <b-modal id="betSodaModal" hide-footer title="MY BETS" class="marketModal">

      <template v-if="$route.name == 'gameDetailCricket' && $store.state.betSoda != null">
        <div class="my-market-container">
          <div class="market-tabs">
            <a href="javascript:void(0)" class="arrow-tabs arrow-left" @click="scroll_left">
              <img :src="imgPath + 'front/img/arrow-down.svg'">
            </a>
            <ul class="nav nav-tabs">
              <template v-for="(market, key) in $store.state.betSoda">
                <li class="nav-item" :key="key">
                  <a :href="`#sodatab${key}`" class="nav-link" :class="{'active':key==0}"
                    data-toggle="tab">{{ market.sdata[0].mname }} ({{ market.sdata.length }})</a>
                </li>
              </template>
            </ul>
            <a href="javascript:void(0)" class="arrow-tabs arrow-right" @click="scroll_right">
              <img :src="imgPath + 'front/img/arrow-down.svg'">
            </a>
          </div>

          <div class="bet-slip-box tab-content">
            <template v-for="(market, key) in $store.state.betSoda">
              <div class="tab-pane" :class="[{'active':key==0}]" :id="`sodatab${key}`" :key="key">
                <template v-for="(section, key1) in market.sdata">
                  <div class="bet-slip" :key="key1"
                    :class="[{'back-border': section.gtype == 'oddeven' ? true : section.btype.toLowerCase() == 'back'},{'lay-border': section.gtype == 'oddeven' ? false : section.btype.toLowerCase() == 'lay'}]">
                    <!-- <div class="bet-nation">
                          <span>{{ section.mname }}</span>
                        </div> -->
                    <div class="row row2 market-desc">
                      <div class="col-6 text-left">
                        <div class="my-market-nation">
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
                        <div>{{ section.amt }}</div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </div>
      </template>
    </b-modal>

    <div class="market-show-icon d-none-desktop" v-if="$store.getters.betSodaTotal" v-b-modal.betSodaModal>
      <span>{{ $store.getters.betSodaTotal }}</span>
    </div>
  </div>
</template>
<script>
  import ServiceApi from "@/services/ServiceApi";
  // import VueDragResize from 'vue-drag-resize';
  import base64 from "@/base64";
  import moment from 'moment'

  import Market1 from '@/components/markets/Market1'
  import Market2 from '@/components/markets/Market2'
  import Market3 from '@/components/markets/Market3'
  import Market4 from '@/components/markets/Market4'
  import Market5 from '@/components/markets/Market5'
  import Market6 from '@/components/cricketMarkets/Market6'
  import Market7 from '@/components/cricketMarkets/Market7'
  import Market8 from '@/components/cricketMarkets/Market8'
  import Market9 from '@/components/markets/Market9'
  import Market10 from '@/components/cricketMarkets/Market10'
  import Market11 from '@/components/markets/Market11'
  import Loader from '@/components/loader'

  import io from "socket.io-client";

  var socketScoreBoard;
  var gamedataInterval;

  import {
    getCryptoPollingSingleton,
    STANDART_POLLING_INTERVAL
  } from '@/components/securePolling/CryptoPollingSingleton';


  export default {
    name: "GameDetailCricket",
    components: {
      // VueDragResize,
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
      Loader
    },
    computed: {
      newMarket() {
        var self = this
        var results = _.filter(this.gameData.new, function (item) {
          return _.some(item, v => _.includes(v.toString().toLowerCase(), self.$store.state.searchMarktetText
            .toLowerCase()))
        });
        return results
      },
      oldMarket() {
        var self = this
        var results = _.filter(this.gameData.old, function (item) {
          return _.some(item, v => _.includes(v.toString().toLowerCase(), self.$store.state.searchMarktetText
            .toLowerCase()))
        });
        return results
      }
    },
    mounted() {
      this.$store.state.searchMarktetText = ""
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      this.gameId = base64.dec(this.$route.params.gameId)
      this.etid = base64.dec(this.$route.params.etid)
      this.$store.state.gameId = this.gameId
      this.getGameDetail(this.gameId)
      this.getButtonList()
      this.$store.state.showTv = false
    },
    data() {
      return {
        slideTo: 'none',
        searchText: '',
        imgPath: IMG_PATH,
        autocon: false,
        gameId: null,
        etid: null,
        m: null,
        gameDetail: {},
        gameData: {
          old: {},
          new: {}
        },
        scoreboardData: {},
        firstCall: true,
        callGameDataApi: true,
        // callUserBookApi: true,
        loadingPlacebet: false,
        traderloadingPlacebet: false,
        hasNoGameData: 0,
        tokens: {
          tv: '',
          sb: ''
        },
        exp: '',
        animationUrl: ''
      }
    },
    methods: {
      showOnlyTv() {
        this.$store.state.showTv = !this.$store.state.showTv
        if (this.$store.state.showTv) {
          this.$store.state.tvUrl = ''
          ServiceApi.callApi("api/front/gettv", {
              'gmid': parseInt(this.gameId),
              'ip': this.$store.getters.ipAddress,
            })
            .then(response => {
              if (response.status == 200) {
                // console.log(response.data.url)
                this.$store.state.tvUrl = response.data.url
              } else {
                this.$store.state.tvUrl = ''
                this.$store.state.showTv = false
              }
            })
            .catch(e => {
              this.$store.state.tvUrl = ''
              this.$store.state.showTv = false
            });
        }
      },
      toggleTvAndAnimation(slide) {
        if (slide == 'animation') {
          this.animationUrl = ''
          if (this.gameDetail.gtv != 0) {
            ServiceApi.callApi("api/front/casino/launchother", {
                'id': 'graphic'
              })
              .then(response => {
                if (response.status == 200) {
                  // console.log(`${response.data.url}/${this.gameDetail.gtv}`)
                  this.animationUrl = `${response.data.url}/${this.gameDetail.gtv}/1`
                } else {
                  this.animationUrl = ''
                }
              })
              .catch(e => {
                this.animationUrl = ''
              });
          }
        } else if (slide == 'tv') {
          this.$store.state.tvUrl = ''
          ServiceApi.callApi("api/front/gettv", {
              'gmid': parseInt(this.gameId),
              'ip': this.$store.getters.ipAddress,
            })
            .then(response => {
              if (response.status == 200) {
                // console.log(response.data.url)
                this.$store.state.tvUrl = response.data.url
              } else {
                this.$store.state.tvUrl = ''
                this.$store.state.showTv = false
              }
            })
            .catch(e => {
              this.$store.state.tvUrl = ''
              this.$store.state.showTv = false
            });
        }
        this.slideTo = slide
      },
      scrollToId(id) {
        var elmnt = document.getElementById(id);
        // console.log(elmnt.offsetTop)
        window.scrollTo({
          top: elmnt.offsetTop,
          behavior: 'smooth'
        });
      },
      checkIsTest(string) {
        return string.includes('T-')
      },
      changeDateFormat(date) {
        return moment(String(date), 'MM-DD-YYYY hh:mm:ss A').format('DD/MM/YYYY HH:mm:ss')
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
      getUserBook(forcecall = false) {
        if (this.exp != _.get(this.$store.state.user, 'exp', 0) || forcecall) {
          ServiceApi.callApi("api/front/userbook", {
              gmid: parseInt(this.gameId)
            })
            .then(response => {
              if (response.status == 200) {
                this.$store.state.betSoda = response.data.bet
                this.$store.state.sportbetBook = response.data.sportbet
                this.$store.state.fancybetBook = response.data.fancy

              } else {
                this.$store.state.betSoda = null
                this.$store.state.sportbetBook = null
                this.$store.state.fancybetBook = null

              }
            })
            .catch(e => {
              // this.$store.state.betSoda = null
              // this.$store.state.sportbetBook = null
              // this.$store.state.fancybetBook = null

            });

          this.exp = _.get(this.$store.state.user, 'exp', 0)
        }
      },
      getGameDetail(gameId) {
        ServiceApi.callApi("api/front/gamedetail", {
            gmid: parseInt(gameId),
            etid: parseInt(this.etid)
          })
          .then(response => {

            // console.log("getGameDetail done");

            if (response.status == 200) {
              this.gameDetail = _.first(response.data)
              if (this.gameDetail.iplay) {
                gamedataInterval = 300
              } else {
                gamedataInterval = 1000
              }
              if (this.gameDetail.gtv != 0) {
                ServiceApi.callApi("api/front/casino/launchother", {
                    'id': 'graphic'
                  })
                  .then(response => {
                    if (response.status == 200) {
                      // console.log(`${response.data.url}/${this.gameDetail.gtv}`)
                      this.animationUrl = `${response.data.url}/${this.gameDetail.gtv}/1`
                    } else {
                      this.animationUrl = ''
                    }
                  })
                  .catch(e => {
                    this.animationUrl = ''
                  });
              }
              // this.gameDetail.scard = 1
              if (this.gameDetail.scard != 2) {
                // console.log("scoreboard")
                this.connectScoreBoard();
              }
              this.$store.state.isTv = this.gameDetail.tv

              if (this.gameDetail.tv == true && this.gameDetail.gtv != 0) {
                // console.log('both')
                this.slideTo = 'animation'
              } else if (this.gameDetail.tv == false && this.gameDetail.gtv != 0) {
                // console.log('animation')
                this.slideTo = 'animation'
              } else if (this.gameDetail.tv == true && this.gameDetail.gtv == 0) {
                // console.log('tv')
              } else {
                // console.log('none')
                this.slideTo = 'none'
              }

              this.m = _.get(this.gameDetail, 'm')
              this.getGameData()
              this.$store.state.etid = _.get(this.gameDetail, 'etid')
              this.$store.state.cid = _.get(this.gameDetail, 'cid')
            } else {
              this.gameDetail = []
              this.$router.push({
                name: 'home'
              })
            }
          })
          .catch(e => {
            this.gameDetail = []
            this.$router.push({
              name: 'home'
            })
          });
      },
      connectScoreBoard() {
        let self = this;
        //NEW SCOREBOARD
        var url = self.gameDetail.scard == 0 ? SCOREBOARD_URL + '?format=binary' : SCOREBOARD_URL
        socketScoreBoard = io.connect(url, {
          transports: ["websocket"]
        });
        socketScoreBoard.on("connect", function () {
          socketScoreBoard.emit("subscribe", {
            type: self.gameDetail.scard == 0 ? 2 : self.gameDetail.scard,
            rooms: [parseInt(self.gameDetail.oldgmid)]
          });
        });
        socketScoreBoard.on("error", function () {
          // console.log("error");
        });
        socketScoreBoard.on("update", function (response) {
          if (self.gameDetail.scard == 0) {
            const SocketMsg = protobuf.roots.default.EventPublish;
            var msg = SocketMsg.decode(new Uint8Array(response.data));
            // console.log(JSON.stringify(msg));
          } else {
            var msg = response.data;
          }

          if (msg != undefined && msg != null && msg.isfinished == 1) {
            socketScoreBoard.emit("unsubscribe", {
              type: self.gameDetail.scard,
              rooms: []
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
      getGameData() {
        if (SECURE_POLLING == 0) {
          ServiceApi.callApi("api/front/gamedata", {
              gmid: parseInt(this.gameId),
              m: parseInt(this.m),
              vir: false,
              etid: this.etid
            }, 3000)
            .then(response => {
              if (response.status == 200) {
                if (!response.data.length) {
                  this.hasNoGameData++

                  if (this.hasNoGameData == 5) {
                    // this.callUserBookApi = false
                    this.callGameDataApi = false
                    this.$store.state.gameId = null
                    this.$store.state.isTv = false
                    this.$store.state.showTv = false
                    this.$store.commit('resetBetData')

                    // console.log("return from home")
                    localStorage.setItem("return", "detail");

                    this.$router.push({
                      name: 'home'
                    })
                  }
                } else {
                  this.hasNoGameData = 0
                }

                if (this.firstCall) {
                  this.gameData.old = response.data
                  this.getUserBook(true)
                  this.firstCall = false
                } else {
                  this.gameData.old = this.gameData.new
                }

                this.gameData.new = response.data
                this.getUserBook()

                if (this.callGameDataApi == true) {
                 setTimeout(res => {
                   this.getGameData();
                 }, gamedataInterval);
                }
              } else {
                // console.log('err', response)
                // this.gameData.new = []
                // this.gameData.old = []

                this.hasNoGameData++
                if (this.hasNoGameData == 5) {
                  // this.callUserBookApi = false
                  this.callGameDataApi = false
                  this.$store.state.gameId = null
                  this.$store.state.isTv = false
                  this.$store.state.showTv = false
                  this.$store.commit('resetBetData')

                  localStorage.setItem("return", "detail");

                  this.$router.push({
                    name: 'home'
                  })
                }

                if (this.callGameDataApi == true) {
                  setTimeout(res => {
                   this.getGameData();
                 }, gamedataInterval);
                }
              }
            })
            .catch(e => {
              // console.log('e', e)
              // this.gameData.new = []
              // this.gameData.old = []

              if (this.callGameDataApi == true) {
                setTimeout(res => {
                  this.getGameData();
                }, gamedataInterval);
              }
            });
        } else if (SECURE_POLLING == 1) {
          const self = this;

          // console.log("getGameData called");

          self.__mounted = true;

          getCryptoPollingSingleton().getConnection().then(() => {

            if (!self.__mounted) {
              return;
            }

            const polling = getCryptoPollingSingleton();

            polling.setPollTimeout(300); // if you need your results fast

            // --> ask for them

            self._call_interval = true;

            // console.log("_interval created");

            const _interval = () => {

              if (!self.__mounted) {
                return;
              }

              // console.log("_interval called");

              const json = JSON.stringify({
                gmid: parseInt(this.gameId),
                m: parseInt(this.m),
                vir: false,
                etid: this.etid
              });

              polling.ask(
                "get_results_test",
                json,
                (data) => {

                  if (!self.__mounted) {
                    return;
                  }

                  const response = JSON.parse(data);

                  if (response.status == 200) {
                    // console.log(response.data)
                    if (!response.data.length) {
                      this.hasNoGameData++

                      if (this.hasNoGameData == 5) {
                        // this.callUserBookApi = false
                        this.callGameDataApi = false
                        this.$store.state.gameId = null
                        this.$store.state.isTv = false
                        this.$store.state.showTv = false
                        this.$store.commit('resetBetData')

                        // console.log("return from home")
                        localStorage.setItem("return", "detail");

                        this.$router.push({
                          name: 'home'
                        })
                      }
                    } else {
                      this.hasNoGameData = 0
                    }

                    if (this.firstCall) {
                      this.gameData.old = response.data
                      this.getUserBook(true)
                      this.firstCall = false
                    } else {
                      this.gameData.old = this.gameData.new
                    }

                    this.gameData.new = response.data
                    this.getUserBook()
                  } else {
                    // console.log('err', response)
                    // this.gameData.new = []
                    // this.gameData.old = []

                    this.hasNoGameData++
                    if (this.hasNoGameData == 5) {
                      // this.callUserBookApi = false
                      this.callGameDataApi = false
                      this.$store.state.gameId = null
                      this.$store.state.isTv = false
                      this.$store.state.showTv = false
                      this.$store.commit('resetBetData')

                      localStorage.setItem("return", "detail");

                      this.$router.push({
                        name: 'home'
                      })
                    }
                  }
                  // console.log(res)

                  if (self._call_interval) {
                    _interval();
                  }
                }
              )
            };

            _interval();

            // console.log('ready to use');
          });
        }
      },
      setBetData(odds, btype, sid, mid, marketName, sectionName, gType, size = 0, khado = 0, marketData = []) {
        if (odds) {
          // console.log(odds, btype, sid, mid, this.gameId, this.gameDetail.ename, marketName, sectionName, gType)
          var ele = document.getElementById('right-sidebar-id')
          // console.log(ele)
          ele.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          let betdata = {
            etid: _.get(this.gameDetail, 'etid'),
            cid: _.get(this.gameDetail, 'cid'),
            gameId: parseInt(this.gameId),
            marketId: mid,
            sectionId: sid,
            uRate: odds,
            oRate: odds,
            amount: '',
            betType: btype,
            eventName: this.gameDetail.ename,
            marketName: marketName,
            sectionName: sectionName,
            gType: gType,
            profit: 0,
            size: size,
            khado: khado,
            market: []
          }

          if (gType == 'khado') {
            betdata.profit = khado + odds - 1
          }

          if (IS_MOBILE) {
            if (gType == 'match' || gType == 'match1' || gType == 'cricketcasino') {
              betdata.market = _.map(marketData, function (object) {
                return _.pick(object, ['nat', 'sid']);
              });
            }
          }

          this.$store.commit('setBetData', betdata)

          // console.log(this.$store.state.bet)

          if (IS_MOBILE) {
            this.$refs['placebet-modal'].show()
          }
        }
      },
      hidePlacebetModal() {
        this.$refs['placebet-modal'].hide()
      },
      placebet() {
        if (this.loadingPlacebet)
          return
        this.loadingPlacebet = true
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
                  btId: _.get(response.data, 'btid'),
                  time: _.get(response.data, 'bdelay'),
                  etid: _.get(response.data, 'etid'),
                  cid: _.get(response.data, 'cid')
                }

                this.$refs['trader-modal'].show()
                this.$store.commit('setTraderData', traderBet)
                this.$store.commit('resetBetData')
                this.$refs['placebet-modal'].hide()
                this.loadingPlacebet = false

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
                this.$store.commit('resetBetData')
                this.$refs['placebet-modal'].hide()
                this.loadingPlacebet = false
              }
            } else {
              this.$bvToast.toast(response.msg, {
                variant: 'danger',
                toaster: 'b-toaster-top-full',
                autoHideDelay: 3000,
              })
              // console.log('fail', response.msg)
              this.$store.commit('resetBetData')
              this.$refs['placebet-modal'].hide()
              this.loadingPlacebet = false
            }
          })
          .catch(e => {
            // console.log('error', e)
            this.$store.commit('resetBetData')
            this.$refs['placebet-modal'].hide()
            this.loadingPlacebet = false
          });
      },
      traderPlacebet() {
        if (this.traderloadingPlacebet)
          return
        this.traderloadingPlacebet = true
        ServiceApi.callApi("api/front/placebettdr", this.$store.state.traderBet)
          .then(response => {
            if (response.success) {
              this.$bvToast.toast(response.msg, {
                variant: 'success',
                toaster: 'b-toaster-top-full',
                autoHideDelay: 3000,
              })
              this.$refs['trader-modal'].hide()
              // console.log('success', response.msg)
              this.$store.commit('resetTraderBetData')
              this.traderloadingPlacebet = false
            } else {
              this.$bvToast.toast(response.msg, {
                variant: 'danger',
                toaster: 'b-toaster-top-full',
                autoHideDelay: 3000,
              })
              this.$refs['trader-modal'].hide()
              // console.log('fail', response.msg)
              this.$store.commit('resetTraderBetData')
              this.traderloadingPlacebet = false
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
            this.$refs['trader-modal'].hide()
            this.$store.commit('resetTraderBetData')
            this.traderloadingPlacebet = false
          });
      },
      resetPlacebet() {
        this.$store.commit('resetBetData')
      }
    },
    beforeDestroy() {
      this.$store.state.searchMarktetText = ""
      // this.callUserBookApi = false
      this.callGameDataApi = false
      // this.$store.state.etid = null
      // this.$store.state.cid = null
      this.$store.state.gameId = null
      this.$store.state.isTv = false
      this.$store.state.showTv = false

      this.$store.state.betSoda = null
      this.$store.state.sportbetBook = null
      this.$store.state.fancybetBook = null

      if (SECURE_POLLING == 1) {
        const self = this;

        self.__mounted = false;
        self._call_interval = false;

        if (self.interval) {
          clearInterval(self.interval);
        }

        getCryptoPollingSingleton().getConnection().then(() => {

          const polling = getCryptoPollingSingleton();

          polling.setPollTimeout(STANDART_POLLING_INTERVAL);

          console.log('setting value back');
        });
      }

      this.$store.commit('resetBetData')
      if (this.gameDetail.scard && this.gameDetail.scard != 2) {
        socketScoreBoard.emit("unsubscribe", {
          type: this.gameDetail.scard,
          rooms: []
        });
        socketScoreBoard.close();
      }

    }
  };
</script>