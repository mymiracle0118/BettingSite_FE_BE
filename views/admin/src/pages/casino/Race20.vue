<template>
  <div class="detail-page-container">
    <div class="center-main-container">
      <div class="center-content">
        <div class="casino-container">
          <div class="casino-table race20">
            <div class="casino-video">
              <div class="casino-video-title">
                <span class="casino-name">{{ gameTitle }}</span>
                <div class="casino-video-rid">Round ID: {{ casinoData.mid }}</div>
                <div class="total-points" v-if="!$store.getters.isMobile">
                  <div>
                    <div>Total Card:</div>
                    <div>{{ totalCards }}</div>
                  </div>
                  <div>
                    <div>Total Point:</div>
                    <div>{{ totalPoints }}</div>
                  </div>
                </div>
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
                      <span>
                        <img :src="imgPath + 'front/img/cards/spade.png'" />
                      </span>
                      <template v-for="(card, key) in spadeCard">
                        <span :key="key">
                          <img :src="imgPath + `front/img/cards/${card}.png`" />
                        </span>
                      </template>

                      <span
                        v-if="spadeCard && spadeCard.length"
                        :class="{ 'k-margin': spadeCard.length != 5 }"
                      >
                        <img :src="imgPath + 'front/img/cards/KSS.png'" />
                      </span>
                    </div>
                    <div>
                      <span>
                        <img :src="imgPath + 'front/img/cards/heart.png'" />
                      </span>
                      <template v-for="(card, key) in heartCard">
                        <span :key="key">
                          <img :src="imgPath + `front/img/cards/${card}.png`" />
                        </span>
                      </template>

                      <span
                        v-if="heartCard && heartCard.length"
                        :class="{ 'k-margin': heartCard.length != 5 }"
                      >
                        <img :src="imgPath + 'front/img/cards/KHH.png'" />
                      </span>
                    </div>
                    <div>
                      <span>
                        <img :src="imgPath + 'front/img/cards/club.png'" />
                      </span>
                      <template v-for="(card, key) in clubCard">
                        <span :key="key">
                          <img :src="imgPath + `front/img/cards/${card}.png`" />
                        </span>
                      </template>

                      <span
                        v-if="clubCard && clubCard.length"
                        :class="{ 'k-margin': clubCard.length != 5 }"
                      >
                        <img :src="imgPath + 'front/img/cards/KCC.png'" />
                      </span>
                    </div>
                    <div>
                      <span>
                        <img :src="imgPath + 'front/img/cards/diamond.png'" />
                      </span>
                      <template v-for="(card, key) in diamondCard">
                        <span :key="key">
                          <img :src="imgPath + `front/img/cards/${card}.png`" />
                        </span>
                      </template>

                      <span
                        v-if="diamondCard && diamondCard.length"
                        :class="{ 'k-margin': diamondCard.length != 5 }"
                      >
                        <img :src="imgPath + 'front/img/cards/KDD.png'" />
                      </span>
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
              <template v-if="$store.getters.isTablet">
                <div class="text-right" v-if="$store.getters.isMobile">
                  Total Cards: {{ totalCards }} | Total Points: {{ totalPoints }}
                </div>
                <div class="row row5">
                  <template v-for="(odds, key) in main">
                    <div class="col-6 col-md-3" :key="key">
                      <div class="casino-box-row">
                        <div class="casino-nation-name">
                          <img
                            v-if="key == 0"
                            :src="`${imgPath}front/img/cards/KSS.png`"
                          />
                          <img
                            v-if="key == 1"
                            :src="`${imgPath}front/img/cards/KHH.png`"
                          />
                          <img
                            v-if="key == 2"
                            :src="`${imgPath}front/img/cards/KCC.png`"
                          />
                          <img
                            v-if="key == 3"
                            :src="`${imgPath}front/img/cards/KDD.png`"
                          />
                          <div class="range-icon d-inline-block ml-2">
                            <i
                              class="fas fa-info-circle float-right"
                              data-toggle="collapse"
                              :data-target="'#demo' + key"
                            ></i>
                            <div :id="'demo' + key" class="collapse icon-range">
                              R:<span v-kval="{ size: odds.min }"></span>-<span
                                v-kval="{ size: odds.max }"
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div class="casino-bl-box">
                          <div
                            class="back casino-bl-box-item"
                            :class="{ suspended: odds.gstatus != 'OPEN' }"
                          >
                            <span class="casino-box-odd">{{ odds.b }}</span>
                            <!-- <span>{{ odds.bs }}</span> -->
                          </div>
                          <div
                            class="lay casino-bl-box-item"
                            :class="{ suspended: odds.gstatus != 'OPEN' }"
                          >
                            <span class="casino-box-odd">{{ odds.l }}</span>
                            <!-- <span>{{ odds.ls }}</span> -->
                          </div>
                        </div>
                        <div class="casino-nation-name" v-casinobook="{ sid: odds.sid }">
                          0
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
                <div class="row mt-2">
                  <div class="col-12 col-md-4">
                    <div v-for="(i, key) in 2">
                      <div class="casino-yn">
                        <div></div>
                        <div class="casino-bl-box">
                          <div class="casino-bl-box-item yn-header">
                            <b>No</b>
                          </div>
                          <div class="casino-bl-box-item yn-header">
                            <b>Yes</b>
                          </div>
                        </div>
                      </div>
                      <div class="casino-odds-box casino-yn">
                        <div class="casino-odds-box-bhav">
                          <b>{{ fancy[key].nat }}</b>
                          <div class="range-icon d-inline-block">
                            <i
                              class="fas fa-info-circle float-right"
                              data-toggle="collapse"
                              :data-target="'#tp'+key"
                            ></i>
                            <div :id="'tp'+key" class="collapse icon-range">
                              R:<span v-kval="{ size: fancy[key].min }"></span>-<span
                                v-kval="{ size: fancy[key].max }"
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div class="casino-bl-box">
                          <div
                            class="lay casino-bl-box-item"
                            :class="{ suspended: fancy[key].gstatus != 'OPEN' }"
                          >
                            <span class="casino-box-odd">{{ fancy[key].l }}</span>
                            <span v-if="key == 0 && fancy[key].gstatus == 'OPEN'"
                              >100</span
                            >
                            <span v-else-if="key == 1 && fancy[key].gstatus == 'OPEN'"
                              >95</span
                            >
                            <span v-else>0</span>
                          </div>
                          <div
                            class="back casino-bl-box-item"
                            :class="{ suspended: fancy[key].gstatus != 'OPEN' }"
                          >
                            <span class="casino-box-odd">{{ fancy[key].b }}</span>
                            <span v-if="key == 0 && fancy[key].gstatus == 'OPEN'"
                              >100</span
                            >
                            <span v-else-if="key == 1 && fancy[key].gstatus == 'OPEN'"
                              >80</span
                            >
                            <span v-else>0</span>
                          </div>
                        </div>
                      </div>
                      <div class="casino-yn">
                        <div></div>
                        <div class="casino-bl-box">
                          <div
                            class="casino-nation-name"
                            v-casinofancybook="{ sid: fancy[key].sid, subid: 0 }"
                          >
                            0
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-8 win-with">
                    <div class="row row5">
                      <div class="col-4">
                        <div class="casino-box-row">
                          <div class="casino-nation-name">
                            <b>{{ fancy[2].nat }}</b>
                            <div class="range-icon d-inline-block ml-2">
                              <i
                                class="fas fa-info-circle float-right"
                                data-toggle="collapse"
                                data-target="#fancy2"
                              ></i>
                              <div id="fancy2" class="collapse icon-range">
                                R:<span v-kval="{ size: fancy[2].min }"></span>-<span
                                  v-kval="{ size: fancy[2].max }"
                                ></span>
                              </div>
                            </div>
                          </div>
                          <div class="casino-bl-box">
                            <div
                              class="back casino-bl-box-item"
                              :class="{ suspended: fancy[2].gstatus != 'OPEN' }"
                            >
                              <span class="casino-box-odd">{{ fancy[2].b }}</span>
                            </div>
                          </div>
                          <div
                            class="casino-nation-name rf-minheight"
                            v-casinofancybook="{ sid: fancy[2].sid, subid: 0 }"
                          >
                            0
                          </div>
                        </div>
                        <div class="casino-box-row">
                          <div class="casino-nation-name">
                            <b>{{ fancy[5].nat }}</b>
                            <div class="range-icon d-inline-block ml-2">
                              <i
                                class="fas fa-info-circle float-right"
                                data-toggle="collapse"
                                data-target="#fancy5"
                              ></i>
                              <div id="fancy5" class="collapse icon-range">
                                R:<span v-kval="{ size: fancy[5].min }"></span>-<span
                                  v-kval="{ size: fancy[5].max }"
                                ></span>
                              </div>
                            </div>
                          </div>
                          <div class="casino-bl-box">
                            <div
                              class="back casino-bl-box-item"
                              :class="{ suspended: fancy[5].gstatus != 'OPEN' }"
                            >
                              <span class="casino-box-odd">{{ fancy[5].b }}</span>
                            </div>
                          </div>
                          <div
                            class="casino-nation-name rf-minheight"
                            v-casinofancybook="{ sid: fancy[5].sid, subid: 0 }"
                          >
                            0
                          </div>
                        </div>
                      </div>
                      <div class="col-4">
                        <div class="casino-box-row">
                          <div class="casino-nation-name">
                            <b>{{ fancy[3].nat }}</b>
                            <div class="range-icon d-inline-block ml-2">
                              <i
                                class="fas fa-info-circle float-right"
                                data-toggle="collapse"
                                data-target="#fancy3"
                              ></i>
                              <div id="fancy3" class="collapse icon-range">
                                R:<span v-kval="{ size: fancy[3].min }"></span>-<span
                                  v-kval="{ size: fancy[3].max }"
                                ></span>
                              </div>
                            </div>
                          </div>
                          <div class="casino-bl-box">
                            <div
                              class="back casino-bl-box-item"
                              :class="{ suspended: fancy[3].gstatus != 'OPEN' }"
                            >
                              <span class="casino-box-odd">{{ fancy[3].b }}</span>
                            </div>
                          </div>
                          <div
                            class="casino-nation-name rf-minheight"
                            v-casinofancybook="{ sid: fancy[3].sid, subid: 0 }"
                          >
                            0
                          </div>
                        </div>
                        <div class="casino-box-row">
                          <div class="casino-nation-name">
                            <b>{{ fancy[6].nat }}</b>
                            <div class="range-icon d-inline-block ml-2">
                              <i
                                class="fas fa-info-circle float-right"
                                data-toggle="collapse"
                                data-target="#fancy6"
                              ></i>
                              <div id="fancy6" class="collapse icon-range">
                                R:<span v-kval="{ size: fancy[6].min }"></span>-<span
                                  v-kval="{ size: fancy[6].max }"
                                ></span>
                              </div>
                            </div>
                          </div>
                          <div class="casino-bl-box">
                            <div
                              class="back casino-bl-box-item"
                              :class="{ suspended: fancy[6].gstatus != 'OPEN' }"
                            >
                              <span class="casino-box-odd">{{ fancy[6].b }}</span>
                            </div>
                          </div>
                          <div
                            class="casino-nation-name rf-minheight"
                            v-casinofancybook="{ sid: fancy[6].sid, subid: 0 }"
                          >
                            0
                          </div>
                        </div>
                      </div>
                      <div class="col-4">
                        <div class="casino-box-row">
                          <div class="casino-nation-name">
                            <b>{{ fancy[4].nat }}</b>
                            <div class="range-icon d-inline-block ml-2">
                              <i
                                class="fas fa-info-circle float-right"
                                data-toggle="collapse"
                                data-target="#fancy4"
                              ></i>
                              <div id="fancy4" class="collapse icon-range">
                                R:<span v-kval="{ size: fancy[4].min }"></span>-<span
                                  v-kval="{ size: fancy[4].max }"
                                ></span>
                              </div>
                            </div>
                          </div>
                          <div class="casino-bl-box">
                            <div
                              class="back casino-bl-box-item"
                              :class="{ suspended: fancy[4].gstatus != 'OPEN' }"
                            >
                              <span class="casino-box-odd">{{ fancy[4].b }}</span>
                            </div>
                          </div>
                          <div
                            class="casino-nation-name rf-minheight"
                            v-casinofancybook="{ sid: fancy[4].sid, subid: 0 }"
                          >
                            0
                          </div>
                        </div>
                        <div class="casino-box-row">
                          <div class="casino-nation-name">
                            <b>{{ fancy[7].nat }}</b>
                            <div class="range-icon d-inline-block ml-2">
                              <i
                                class="fas fa-info-circle float-right"
                                data-toggle="collapse"
                                data-target="#fancy7"
                              ></i>
                              <div id="fancy7" class="collapse icon-range">
                                R:<span v-kval="{ size: fancy[7].min }"></span>-<span
                                  v-kval="{ size: fancy[7].max }"
                                ></span>
                              </div>
                            </div>
                          </div>
                          <div class="casino-bl-box">
                            <div
                              class="back casino-bl-box-item"
                              :class="{ suspended: fancy[7].gstatus != 'OPEN' }"
                            >
                              <span class="casino-box-odd">{{ fancy[7].b }}</span>
                            </div>
                          </div>
                          <div
                            class="casino-nation-name rf-minheight"
                            v-casinofancybook="{ sid: fancy[7].sid, subid: 0 }"
                          >
                            0
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-if="!$store.getters.isTablet">
                <div class="d-none-big">
                  <div class="total-points">
                    <div>
                      <span>Total Cards:</span>
                      <span class="text-playerb">{{ totalCards }}</span>
                    </div>
                    <div>
                      <span>Total Points:</span>
                      <span class="text-playerb">{{ totalPoints }}</span>
                    </div>
                  </div>
                  <div>
                    <div class="casino-bl-box casino-bl-box-title">
                      <div class="casino-bl-box-item casino-odds-name"></div>
                      <div class="casino-bl-box-item">Back</div>
                      <div class="casino-bl-box-item">Lay</div>
                    </div>
                    <template v-for="(odds, key) in main">
                      <div class="casino-bl-box" :key="key">
                        <div
                          class="casino-bl-box-item casino-odds-name"
                          data-toggle="modal"
                        >
                          <img
                            v-if="key == 0"
                            :src="`${imgPath}front/img/cards/KSS.png`"
                          />
                          <img
                            v-if="key == 1"
                            :src="`${imgPath}front/img/cards/KHH.png`"
                          />
                          <img
                            v-if="key == 2"
                            :src="`${imgPath}front/img/cards/KCC.png`"
                          />
                          <img
                            v-if="key == 3"
                            :src="`${imgPath}front/img/cards/KDD.png`"
                          />
                          <span v-casinobook="{ sid: odds.sid }"
                            >0</span
                          >
                          <i
                            class="fas fa-info-circle float-right collapsed"
                            data-toggle="collapse"
                            :data-target="'#demo' + key"
                            aria-expanded="false"
                          ></i>
                          <div :id="'demo' + key" class="icon-range collapse" style="">
                            R:<span v-kval="{ size: odds.min }"></span>-<span
                              v-kval="{ size: odds.max }"
                            ></span>
                          </div>
                        </div>
                        <div
                          class="back casino-bl-box-item"
                          :class="{ suspended: odds.gstatus != 'OPEN' }"
                        >
                          <span class="casino-box-odd">{{ odds.b }}</span>
                          <!-- <span>{{ odds.bs }}</span> -->
                        </div>
                        <div
                          class="lay casino-bl-box-item"
                          :class="{ suspended: odds.gstatus != 'OPEN' }"
                        >
                          <span class="casino-box-odd">{{ odds.l }}</span>
                          <!-- <span>{{ odds.ls }}</span> -->
                        </div>
                      </div>
                    </template>
                    <div class="casino-bl-box casino-bl-box-title">
                      <div class="casino-bl-box-item casino-odds-name"></div>
                      <div class="casino-bl-box-item">No</div>
                      <div class="casino-bl-box-item">Yes</div>
                    </div>
                    <template v-for="(i, key) in 2">
                      <div class="casino-bl-box" :key="'yesno' + key">
                        <div
                          class="casino-bl-box-item casino-odds-name"
                          data-toggle="modal"
                        >
                          <div>
                            <span class="d-block">{{ fancy[key].nat }}</span>
                            <div v-casinofancybook="{ sid: fancy[key].sid, subid: 0 }"></div>
                          </div>
                          <i
                            class="fas fa-info-circle float-right collapsed"
                            data-toggle="collapse"
                            :data-target="'#noyes' + i"
                            aria-expanded="false"
                          ></i>
                          <div :id="'noyes' + i" class="icon-range collapse" style="">
                            R:<span v-kval="{ size: fancy[key].min }"></span>-<span
                              v-kval="{ size: fancy[key].max }"
                            ></span>
                          </div>
                        </div>
                        <div
                          class="lay casino-bl-box-item"
                          :class="{ suspended: fancy[key].gstatus != 'OPEN' }"
                        >
                          <span class="casino-box-odd">{{ fancy[key].l }}</span>
                          <span v-if="key == 0 && fancy[key].gstatus == 'OPEN'">100</span>
                          <span v-else-if="key == 1 && fancy[key].gstatus == 'OPEN'"
                            >105</span
                          >
                          <span v-else>0</span>
                        </div>
                        <div
                          class="back casino-bl-box-item"
                          :class="{ suspended: fancy[key].gstatus != 'OPEN' }"
                        >
                          <span class="casino-box-odd">{{ fancy[key].b }}</span>
                          <span v-if="key == 0 && fancy[key].gstatus == 'OPEN'">100</span>
                          <span v-else-if="key == 1 && fancy[key].gstatus == 'OPEN'"
                            >90</span
                          >
                          <span v-else>0</span>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="row row5 win-with">
                    <div class="col-4">
                      <div class="casino-box-row">
                        <div class="casino-nation-name">
                          <b>{{ fancy[2].nat }}</b>
                          <div class="range-icon d-inline-block ml-2">
                            <i
                              class="fas fa-info-circle float-right"
                              data-toggle="collapse"
                              data-target="#fancy2"
                            ></i>
                            <div id="fancy2" class="collapse icon-range">
                              R:<span v-kval="{ size: fancy[2].min }"></span>-<span
                                v-kval="{ size: fancy[2].max }"
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div class="casino-bl-box">
                          <div
                            class="back casino-bl-box-item"
                            :class="{ suspended: fancy[2].gstatus != 'OPEN' }"
                          >
                            <span class="casino-box-odd">{{ fancy[2].b }}</span>
                            <span v-casinofancybook="{ sid: fancy[2].sid, subid: 0 }">{{
                              fancy[2].b
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="casino-box-row">
                        <div class="casino-nation-name">
                          <b>{{ fancy[5].nat }}</b>
                          <div class="range-icon d-inline-block ml-2">
                            <i
                              class="fas fa-info-circle float-right"
                              data-toggle="collapse"
                              data-target="#fancy5"
                            ></i>
                            <div id="fancy5" class="collapse icon-range">
                              R:<span v-kval="{ size: fancy[5].min }"></span>-<span
                                v-kval="{ size: fancy[5].max }"
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div class="casino-bl-box">
                          <div
                            class="back casino-bl-box-item"
                            :class="{ suspended: fancy[5].gstatus != 'OPEN' }"
                          >
                            <span class="casino-box-odd">{{ fancy[5].b }}</span>
                            <span v-casinofancybook="{ sid: fancy[5].sid, subid: 0 }">{{
                              fancy[5].b
                            }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="casino-box-row">
                        <div class="casino-nation-name">
                          <b>{{ fancy[3].nat }}</b>
                          <div class="range-icon d-inline-block ml-2">
                            <i
                              class="fas fa-info-circle float-right"
                              data-toggle="collapse"
                              data-target="#fancy3"
                            ></i>
                            <div id="fancy3" class="collapse icon-range">
                              R:<span v-kval="{ size: fancy[3].min }"></span>-<span
                                v-kval="{ size: fancy[3].max }"
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div class="casino-bl-box">
                          <div
                            class="back casino-bl-box-item"
                            :class="{ suspended: fancy[3].gstatus != 'OPEN' }"
                          >
                            <span class="casino-box-odd">{{ fancy[3].b }}</span>
                            <span v-casinofancybook="{ sid: fancy[3].sid, subid: 0 }">{{
                              fancy[3].b
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="casino-box-row">
                        <div class="casino-nation-name">
                          <b>{{ fancy[6].nat }}</b>
                          <div class="range-icon d-inline-block ml-2">
                            <i
                              class="fas fa-info-circle float-right"
                              data-toggle="collapse"
                              data-target="#fancy6"
                            ></i>
                            <div id="fancy6" class="collapse icon-range">
                              R:<span v-kval="{ size: fancy[6].min }"></span>-<span
                                v-kval="{ size: fancy[6].max }"
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div class="casino-bl-box">
                          <div
                            class="back casino-bl-box-item"
                            :class="{ suspended: fancy[6].gstatus != 'OPEN' }"
                          >
                            <span class="casino-box-odd">{{ fancy[6].b }}</span>
                            <span
                              v-casinofancybook="{ sid: fancy[6].sid, subid: 0 }"
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="casino-box-row">
                        <div class="casino-nation-name">
                          <b>{{ fancy[4].nat }}</b>
                          <div class="range-icon d-inline-block ml-2">
                            <i
                              class="fas fa-info-circle float-right"
                              data-toggle="collapse"
                              data-target="#fancy4"
                            ></i>
                            <div id="fancy4" class="collapse icon-range">
                              R:<span v-kval="{ size: fancy[4].min }"></span>-<span
                                v-kval="{ size: fancy[4].max }"
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div class="casino-bl-box">
                          <div
                            class="back casino-bl-box-item"
                            :class="{ suspended: fancy[4].gstatus != 'OPEN' }"
                          >
                            <span class="casino-box-odd">{{ fancy[4].b }}</span>
                            <span
                              v-casinofancybook="{ sid: fancy[4].sid, subid: 0 }"
                            ></span>
                          </div>
                        </div>
                      </div>
                      <div class="casino-box-row">
                        <div class="casino-nation-name">
                          <b>{{ fancy[7].nat }}</b>
                          <div class="range-icon d-inline-block ml-2">
                            <i
                              class="fas fa-info-circle float-right"
                              data-toggle="collapse"
                              data-target="#fancy7"
                            ></i>
                            <div id="fancy7" class="collapse icon-range">
                              R:<span v-kval="{ size: fancy[7].min }"></span>-<span
                                v-kval="{ size: fancy[7].max }"
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div class="casino-bl-box">
                          <div
                            class="back casino-bl-box-item"
                            :class="{ suspended: fancy[7].gstatus != 'OPEN' }"
                          >
                            <span class="casino-box-odd">{{ fancy[7].b }}</span>
                            <span
                              v-casinofancybook="{ sid: fancy[7].sid, subid: 0 }"
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
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
    main() {
      var player = _.filter(_.get(this.casinoData, "sub"), {
        subtype: this.gameType,
      });
      return this.orderBy(player, "sr");
    },
    fancy() {
      var player = _.filter(_.get(this.casinoData, "sub"), {
        subtype: "race20fancy",
      });
      return this.orderBy(player, "sr");
    },
  },
  data() {
    return {
      showCards: true,
      showResults: true,
      imgPath: IMG_PATH,
      gameTitle: "Race20",
      gameType: "race20",
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
      playersCards: {
        p1: null,
        p2: null,
        p3: null,
        p4: null,
      },
      spadeCard: [],
      heartCard: [],
      clubCard: [],
      diamondCard: [],
      totalCards: 0,
      totalPoints: 0,
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

            this.spadeCard = [];
            this.heartCard = [];
            this.clubCard = [];
            this.diamondCard = [];
            let totalPoints = 0;
            let totalCards = 0;

            for (const card of this.cards) {
              let type = "";
              let cardno = "0";
              if (card != 1) {
                if (card.length == 4) {
                  type = card.slice(2);
                  cardno = card.slice(0, 2);
                } else {
                  type = card.slice(1);
                  cardno = card.slice(0, 1);
                }
                totalCards += 1;
              }

              if (type == "SS") {
                this.spadeCard.push(card);
              } else if (type == "HH") {
                this.heartCard.push(card);
              } else if (type == "CC") {
                this.clubCard.push(card);
              } else if (type == "DD") {
                this.diamondCard.push(card);
              }

              if (cardno == "Q") {
                cardno = 12;
              }
              if (cardno == "J") {
                cardno = 11;
              }
              if (cardno == "A") {
                cardno = 1;
              }
              totalPoints += parseInt(cardno);
            }
            this.totalPoints = totalPoints;
            this.totalCards = totalCards;
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
