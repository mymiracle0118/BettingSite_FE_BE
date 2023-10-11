<template>
  <div class="detail-page-container">
    <div class="center-main-container">
      <div class="center-content">
        <div class="casino-container">
          <div class="casino-table cards32b">
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
              <div
                v-if="cards.p1"
                class="casino-video-cards"
                :class="{ 'hide-cards': !showCards || !cards.p1.cards.length }"
              >
                <div class="casino-cards-shuffle" @click="toggleCards(cards[0])">
                  <i class="fas fa-grip-lines-vertical"></i>
                </div>
                <div class="casino-video-cards-container">
                  <div v-if="cards.p1.cards && cards.p1.cards.length">
                    <div class="dealer-name w-100 mb-1">
                      <span
                        :class="{
                          'text-success':
                            cards.p1.count >= cards.p2.count &&
                            cards.p1.count >= cards.p3.count &&
                            cards.p1.count >= cards.p4.count,
                        }"
                        >Player 8:
                      </span>
                      <span class="text-warning">{{ cards.p1.count }}</span>
                    </div>
                    <div>
                      <template v-for="(card, key) in cards.p1.cards">
                        <Card :card="card" :key="key" />
                      </template>
                    </div>
                  </div>
                  <div v-if="cards.p2.cards && cards.p2.cards.length">
                    <div class="dealer-name w-100 mb-1">
                      <span
                        :class="{
                          'text-success':
                            cards.p2.count >= cards.p1.count &&
                            cards.p2.count >= cards.p3.count &&
                            cards.p2.count >= cards.p4.count,
                        }"
                        >Player 9:
                      </span>
                      <span class="text-warning">{{ cards.p2.count }}</span>
                    </div>
                    <div>
                      <template v-for="(card, key) in cards.p2.cards">
                        <Card :card="card" :key="key" />
                      </template>
                    </div>
                  </div>
                  <div v-if="cards.p3.cards && cards.p3.cards.length">
                    <div class="dealer-name w-100 mb-1">
                      <span
                        :class="{
                          'text-success':
                            cards.p3.count >= cards.p1.count &&
                            cards.p3.count >= cards.p2.count &&
                            cards.p3.count >= cards.p4.count,
                        }"
                        >Player 10:
                      </span>
                      <span class="text-warning">{{ cards.p3.count }}</span>
                    </div>
                    <div>
                      <template v-for="(card, key) in cards.p3.cards">
                        <Card :card="card" :key="key" />
                      </template>
                    </div>
                  </div>
                  <div v-if="cards.p4.cards && cards.p4.cards.length">
                    <div class="dealer-name w-100 mb-1">
                      <span
                        :class="{
                          'text-success':
                            cards.p4.count >= cards.p1.count &&
                            cards.p4.count >= cards.p2.count &&
                            cards.p4.count >= cards.p3.count,
                        }"
                        >Player 11:
                      </span>
                      <span class="text-warning">{{ cards.p4.count }}</span>
                    </div>
                    <div>
                      <template v-for="(card, key) in cards.p4.cards">
                        <Card :card="card" :key="key" />
                      </template>
                    </div>
                  </div>
                </div>
              </div>
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
                <div class="teen1daycasino-container d-none-small">
                  <div class="teen1dayleft">
                    <div class="casino-box-row mb-0">
                      <div class="casino-nation-name no-border casino-bl-box-title">
                        <div class="playerb"></div>
                      </div>
                      <div class="casino-bl-box casino-bl-box-title">
                        <div class="casino-bl-box-item">
                          <b>Back</b>
                        </div>
                        <div class="casino-bl-box-item">
                          <b>Lay</b>
                        </div>
                      </div>
                    </div>
                    <template v-for="(data, key) in main">
                      <div class="casino-box-row" :key="key">
                        <div class="casino-nation-name">
                          <b>{{ data.nat }}</b>
                          <div class="float-right">
                            <span
                              class="mr-2 casino-book"
                              v-casinobook="{ sid: data.sid }"
                              >0</span
                            >
                            <i
                              class="fas fa-info-circle"
                              data-toggle="collapse"
                              :data-target="`#demo-winner-${key}`"
                            ></i>
                            <div :id="`demo-winner-${key}`" class="collapse icon-range">
                              R:<span v-kval="{ size: data.min }"></span>-<span
                                v-kval="{ size: data.max }"
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div class="casino-bl-box">
                          <div
                            class="back casino-bl-box-item"
                            :class="{ suspended: data.gstatus != 'OPEN' }"
                          >
                            <span class="casino-box-odd">{{ data.b }}</span>
                            <!-- <span>0</span> -->
                          </div>
                          <div
                            class="lay casino-bl-box-item"
                            :class="{ suspended: data.gstatus != 'OPEN' }"
                          >
                            <span class="casino-box-odd">{{ data.l }}</span>
                            <!-- <span>0</span> -->
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="teen1daycenter"></div>
                  <div class="teen1dayright">
                    <div class="casino-box-row mb-0">
                      <div class="casino-nation-name no-border casino-bl-box-title">
                        <div class="playerb"></div>
                      </div>
                      <div class="casino-bl-box casino-bl-box-title">
                        <div class="casino-bl-box-item">
                          <b>Odd</b>
                        </div>
                        <div class="casino-bl-box-item">
                          <b>Even</b>
                        </div>
                      </div>
                    </div>
                    <div class="casino-box-row">
                      <div class="casino-nation-name">
                        <b>Player 8</b>
                        <div class="float-right">
                          <!-- <span class="mr-2">0</span> -->
                          <i
                            class="fas fa-info-circle"
                            data-toggle="collapse"
                            data-target="#demo-odd-evan-1"
                          ></i>
                          <div id="demo-odd-evan-1" class="collapse icon-range">
                            R:<span v-kval="{ size: fancy[0].min }"></span>-<span
                              v-kval="{ size: fancy[0].max }"
                            ></span>
                          </div>
                        </div>
                      </div>
                      <div class="casino-bl-box">
                        <div
                          class="back casino-bl-box-item"
                          :class="{ suspended: fancy[0].gstatus != 'OPEN' }"
                        >
                          <span class="casino-box-odd">{{ fancy[0].b }}</span>
                          <span
                            class="casino-book"
                            v-casinofancybook="{ sid: fancy[0].sid, subid: 0 }"
                            >0</span
                          >
                        </div>
                        <div
                          class="back casino-bl-box-item"
                          :class="{ suspended: fancy[1].gstatus != 'OPEN' }"
                        >
                          <span class="casino-box-odd">{{ fancy[1].b }}</span>
                          <span
                            class="casino-book"
                            v-casinofancybook="{ sid: fancy[1].sid, subid: 0 }"
                            >0</span
                          >
                        </div>
                      </div>
                    </div>
                    <div class="casino-box-row">
                      <div class="casino-nation-name">
                        <b>Player 9</b>
                        <div class="float-right">
                          <!-- <span class="mr-2">0</span> -->
                          <i
                            class="fas fa-info-circle"
                            data-toggle="collapse"
                            data-target="#demo-odd-evan-2"
                          ></i>
                          <div id="demo-odd-evan-2" class="collapse icon-range">
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
                          <span
                            class="casino-book"
                            v-casinofancybook="{ sid: fancy[2].sid, subid: 0 }"
                            >0</span
                          >
                        </div>
                        <div
                          class="back casino-bl-box-item"
                          :class="{ suspended: fancy[3].gstatus != 'OPEN' }"
                        >
                          <span class="casino-box-odd">{{ fancy[3].b }}</span>
                          <span
                            class="casino-book"
                            v-casinofancybook="{ sid: fancy[3].sid, subid: 0 }"
                            >0</span
                          >
                        </div>
                      </div>
                    </div>
                    <div class="casino-box-row">
                      <div class="casino-nation-name">
                        <b>Player 10</b>
                        <div class="float-right">
                          <!-- <span class="mr-2">0</span> -->
                          <i
                            class="fas fa-info-circle"
                            data-toggle="collapse"
                            data-target="#demo-odd-evan-3"
                          ></i>
                          <div id="demo-odd-evan-3" class="collapse icon-range">
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
                            class="casino-book"
                            v-casinofancybook="{ sid: fancy[4].sid, subid: 0 }"
                            >0</span
                          >
                        </div>
                        <div
                          class="back casino-bl-box-item"
                          :class="{ suspended: fancy[5].gstatus != 'OPEN' }"
                        >
                          <span class="casino-box-odd">{{ fancy[5].b }}</span>
                          <span
                            class="casino-book"
                            v-casinofancybook="{ sid: fancy[5].sid, subid: 0 }"
                            >0</span
                          >
                        </div>
                      </div>
                    </div>
                    <div class="casino-box-row">
                      <div class="casino-nation-name">
                        <b>Player 11</b>
                        <div class="float-right">
                          <!-- <span class="mr-2">0</span> -->
                          <i
                            class="fas fa-info-circle"
                            data-toggle="collapse"
                            data-target="#demo-odd-evan-4"
                          ></i>
                          <div id="demo-odd-evan-4" class="collapse icon-range">
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
                            class="casino-book"
                            v-casinofancybook="{ sid: fancy[6].sid, subid: 0 }"
                            >0</span
                          >
                        </div>
                        <div
                          class="back casino-bl-box-item"
                          :class="{ suspended: fancy[7].gstatus != 'OPEN' }"
                        >
                          <span class="casino-box-odd">{{ fancy[7].b }}</span>
                          <span
                            class="casino-book"
                            v-casinofancybook="{ sid: fancy[7].sid, subid: 0 }"
                            >0</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="teen1daycasino-container mt-4 d-none-small">
                  <div class="teen1dayleft">
                    <div class="casino-box-row mb-0">
                      <div class="casino-nation-name no-border casino-bl-box-title">
                        <div class="playerb"></div>
                      </div>
                      <div class="casino-bl-box casino-bl-box-title">
                        <div class="casino-bl-box-item">
                          <b>Back</b>
                        </div>
                        <div class="casino-bl-box-item">
                          <b>Lay</b>
                        </div>
                      </div>
                    </div>
                    <template v-for="(data, key) in fancy1">
                      <div class="casino-box-row" :key="key">
                        <div class="casino-nation-name">
                          <b>{{ data.nat.replace("Three", "3") }}</b>
                          <div class="float-right">
                            <span
                              class="mr-2 casino-book"
                              v-casinofancybook="{ sid: data.sid, subid: 0 }"
                              >0</span
                            >
                            <i
                              class="fas fa-info-circle"
                              data-toggle="collapse"
                              :data-target="`#demo-fancy1-${key}`"
                            ></i>
                            <div :id="`demo-fancy1-${key}`" class="collapse icon-range">
                              R:<span v-kval="{ size: data.min }"></span>-<span
                                v-kval="{ size: data.max }"
                              ></span>
                            </div>
                          </div>
                        </div>
                        <div class="casino-bl-box">
                          <div
                            class="back casino-bl-box-item"
                            :class="{ suspended: data.gstatus != 'OPEN' }"
                          >
                            <span class="casino-box-odd">{{ data.b }}</span>
                            <!-- <span>0</span> -->
                          </div>
                          <div
                            class="lay casino-bl-box-item"
                            :class="{ suspended: data.gstatus != 'OPEN' }"
                          >
                            <span class="casino-box-odd">{{ data.l }}</span>
                            <!-- <span>0</span> -->
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="teen1daycenter"></div>
                  <div class="teen1dayright right1">
                    <div class="casino-box-row mb-0">
                      <div class="casino-nation-name no-border casino-bl-box-title">
                        <div class="playerb"></div>
                      </div>
                      <div class="casino-bl-box casino-bl-box-title">
                        <div class="casino-bl-box-item">
                          <b>Back</b>
                        </div>
                      </div>
                    </div>
                    <div class="casino-box-row">
                      <div class="casino-nation-name">
                        <b>{{ fancy[18].nat }}</b>
                        <div class="float-right">
                          <span
                            class="mr-2 casino-book"
                            v-casinofancybook="{ sid: fancy[18].sid, subid: 0 }"
                            >0</span
                          >
                          <i
                            class="fas fa-info-circle"
                            data-toggle="collapse"
                            data-target="#demo-fancy-18"
                          ></i>
                          <div id="demo-fancy-18" class="collapse icon-range">
                            R:<span v-kval="{ size: fancy[18].min }"></span>-<span
                              v-kval="{ size: fancy[18].max }"
                            ></span>
                          </div>
                        </div>
                      </div>
                      <div class="casino-bl-box">
                        <div
                          class="back casino-bl-box-item"
                          :class="{ suspended: fancy[18].gstatus != 'OPEN' }"
                        >
                          <span class="casino-box-odd">{{ fancy[18].b }}</span>
                          <!-- <span>0</span> -->
                        </div>
                      </div>
                    </div>
                    <div class="casino-box-row">
                      <div class="casino-nation-name">
                        <b>{{ fancy[19].nat }}</b>
                        <div class="float-right">
                          <span
                            class="mr-2 casino-book"
                            v-casinofancybook="{ sid: fancy[19].sid, subid: 0 }"
                            >0</span
                          >
                          <i
                            class="fas fa-info-circle"
                            data-toggle="collapse"
                            data-target="#demo-fancy-19"
                          ></i>
                          <div id="demo-fancy-19" class="collapse icon-range">
                            R:<span v-kval="{ size: fancy[19].min }"></span>-<span
                              v-kval="{ size: fancy[19].max }"
                            ></span>
                          </div>
                        </div>
                      </div>
                      <div class="casino-bl-box">
                        <div
                          class="back casino-bl-box-item"
                          :class="{ suspended: fancy[19].gstatus != 'OPEN' }"
                        >
                          <span class="casino-box-odd">{{ fancy[19].b }}</span>
                          <!-- <span>0</span> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="text-center mt-4 d-none-small pr casino-cards-odds-title">
                  <b>{{ fancy[8].b }}</b>
                  <div class="d-inline-block ml-1 float-right">
                    <i
                      class="fas fa-info-circle"
                      data-toggle="collapse"
                      data-target="#demo-single"
                    ></i>
                    <div id="demo-single" class="collapse icon-range">
                      R:<span v-kval="{ size: fancy[8].min }"></span>-<span
                        v-kval="{ size: fancy[8].max }"
                      ></span>
                    </div>
                  </div>
                </div>

                <div class="d-none-small cards32bextra mt-1">
                  <div class="casino-bl-box">
                    <template v-for="(i, key) in 10">
                      <div
                        class="casino-bl-box-item back"
                        :key="key"
                        :class="{ suspended: fancy[key + 8].gstatus != 'OPEN' }"
                      >
                        <span class="casino-box-odd" v-if="i == 10">0</span>
                        <span class="casino-box-odd" v-else>{{ i }}</span>
                        <div
                          class="casino-book"
                          v-casinofancybook="{ sid: fancy[key + 8].sid, subid: 0 }"
                        >
                          0
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </template>

              <template v-if="!$store.getters.isTablet">
                <div class="teen1daycasino-container d-none-big">
                  <div class="casino-box-row">
                    <div class="casino-nation-name no-border casino-bl-box-title">
                      <div class="playerb"></div>
                    </div>
                    <div class="casino-bl-box casino-bl-box-title">
                      <div class="casino-bl-box-item">
                        <b>Back</b>
                      </div>
                      <div class="casino-bl-box-item">
                        <b>Lay</b>
                      </div>
                    </div>
                  </div>
                  <template v-for="(data, key) in main">
                    <div class="casino-box-row" :key="key">
                      <div class="casino-nation-name">
                        <div>
                          <b>{{ data.nat }}</b>
                          <span class="d-block w-100" v-casinobook="{ sid: data.sid }"
                            >0</span
                          >
                        </div>
                        <div class="float-right">
                          <i
                            class="fas fa-info-circle"
                            data-toggle="collapse"
                            :data-target="`#demo-winner-${key}`"
                          ></i>
                          <div :id="`demo-winner-${key}`" class="collapse icon-range">
                            R:<span v-kval="{ size: data.min }"></span>-<span
                              v-kval="{ size: data.max }"
                            ></span>
                          </div>
                        </div>
                      </div>
                      <div class="casino-bl-box">
                        <div
                          class="back casino-bl-box-item"
                          :class="{ suspended: data.gstatus != 'OPEN' }"
                        >
                          <span class="casino-box-odd">{{ data.b }}</span>
                          <!-- <span>0</span> -->
                        </div>
                        <div
                          class="lay casino-bl-box-item"
                          :class="{ suspended: data.gstatus != 'OPEN' }"
                        >
                          <span class="casino-box-odd">{{ data.l }}</span>
                          <!-- <span>0</span> -->
                        </div>
                      </div>
                    </div>
                  </template>

                  <div class="casino-box-row">
                    <div class="casino-nation-name no-border casino-bl-box-title">
                      <div class="playerb"></div>
                    </div>
                    <div class="casino-bl-box casino-bl-box-title">
                      <div class="casino-bl-box-item">
                        <b>Odd</b>
                      </div>
                      <div class="casino-bl-box-item">
                        <b>Even</b>
                      </div>
                    </div>
                  </div>
                  <div class="casino-box-row">
                    <div class="casino-nation-name">
                      <b>Player 8</b>
                      <div class="float-right">
                        <!-- <span class="mr-2">0</span> -->
                        <i
                          class="fas fa-info-circle"
                          data-toggle="collapse"
                          data-target="#demo-odd-evan-1"
                        ></i>
                        <div id="demo-odd-evan-1" class="collapse icon-range">
                          R:<span v-kval="{ size: fancy[0].min }"></span>-<span
                            v-kval="{ size: fancy[0].max }"
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div class="casino-bl-box">
                      <div
                        class="back casino-bl-box-item"
                        :class="{ suspended: fancy[0].gstatus != 'OPEN' }"
                      >
                        <span class="casino-box-odd">{{ fancy[0].b }}</span>
                        <span v-casinofancybook="{ sid: fancy[0].sid, subid: 0 }">0</span>
                      </div>
                      <div
                        class="back casino-bl-box-item"
                        :class="{ suspended: fancy[1].gstatus != 'OPEN' }"
                      >
                        <span class="casino-box-odd">{{ fancy[1].b }}</span>
                        <span v-casinofancybook="{ sid: fancy[1].sid, subid: 0 }">0</span>
                      </div>
                    </div>
                  </div>
                  <div class="casino-box-row">
                    <div class="casino-nation-name">
                      <b>Player 9</b>
                      <div class="float-right">
                        <!-- <span class="mr-2">0</span> -->
                        <i
                          class="fas fa-info-circle"
                          data-toggle="collapse"
                          data-target="#demo-odd-evan-2"
                        ></i>
                        <div id="demo-odd-evan-2" class="collapse icon-range">
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
                        <span v-casinofancybook="{ sid: fancy[2].sid, subid: 0 }">0</span>
                      </div>
                      <div
                        class="back casino-bl-box-item"
                        :class="{ suspended: fancy[3].gstatus != 'OPEN' }"
                      >
                        <span class="casino-box-odd">{{ fancy[3].b }}</span>
                        <span v-casinofancybook="{ sid: fancy[3].sid, subid: 0 }">0</span>
                      </div>
                    </div>
                  </div>
                  <div class="casino-box-row">
                    <div class="casino-nation-name">
                      <b>Player 10</b>
                      <div class="float-right">
                        <!-- <span class="mr-2">0</span> -->
                        <i
                          class="fas fa-info-circle"
                          data-toggle="collapse"
                          data-target="#demo-odd-evan-3"
                        ></i>
                        <div id="demo-odd-evan-3" class="collapse icon-range">
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
                        <span v-casinofancybook="{ sid: fancy[4].sid, subid: 0 }">0</span>
                      </div>
                      <div
                        class="back casino-bl-box-item"
                        :class="{ suspended: fancy[5].gstatus != 'OPEN' }"
                      >
                        <span class="casino-box-odd">{{ fancy[5].b }}</span>
                        <span v-casinofancybook="{ sid: fancy[5].sid, subid: 0 }">0</span>
                      </div>
                    </div>
                  </div>
                  <div class="casino-box-row">
                    <div class="casino-nation-name">
                      <b>Player 11</b>
                      <div class="float-right">
                        <!-- <span class="mr-2">0</span> -->
                        <i
                          class="fas fa-info-circle"
                          data-toggle="collapse"
                          data-target="#demo-odd-evan-4"
                        ></i>
                        <div id="demo-odd-evan-4" class="collapse icon-range">
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
                        <span v-casinofancybook="{ sid: fancy[6].sid, subid: 0 }">0</span>
                      </div>
                      <div
                        class="back casino-bl-box-item"
                        :class="{ suspended: fancy[7].gstatus != 'OPEN' }"
                      >
                        <span class="casino-box-odd">{{ fancy[7].b }}</span>
                        <span v-casinofancybook="{ sid: fancy[7].sid, subid: 0 }">0</span>
                      </div>
                    </div>
                  </div>

                  <div class="casino-box-row">
                    <div class="casino-nation-name no-border casino-bl-box-title">
                      <div class="playerb"></div>
                    </div>
                    <div class="casino-bl-box casino-bl-box-title">
                      <div class="casino-bl-box-item">
                        <b>Back</b>
                      </div>
                      <div class="casino-bl-box-item">
                        <b>Lay</b>
                      </div>
                    </div>
                  </div>
                  <template v-for="(data, key) in fancy1">
                    <div class="casino-box-row" :key="`fancy1-${key}`">
                      <div class="casino-nation-name">
                        <div>
                          <b>{{ data.nat.replace("Three", "3") }}</b>
                          <span class="d-block w-100" v-casinofancybook="{ sid: data.sid }"
                            >0</span
                          >
                        </div>
                        <div class="float-right">
                          <i
                            class="fas fa-info-circle"
                            data-toggle="collapse"
                            :data-target="`#demo-fancy1-${key}`"
                          ></i>
                          <div :id="`demo-fancy1-${key}`" class="collapse icon-range">
                            R:<span v-kval="{ size: data.min }"></span>-<span
                              v-kval="{ size: data.max }"
                            ></span>
                          </div>
                        </div>
                      </div>
                      <div class="casino-bl-box">
                        <div
                          class="back casino-bl-box-item"
                          :class="{ suspended: data.gstatus != 'OPEN' }"
                        >
                          <span class="casino-box-odd">{{ data.b }}</span>
                        </div>
                        <div
                          class="lay casino-bl-box-item"
                          :class="{ suspended: data.gstatus != 'OPEN' }"
                        >
                          <span class="casino-box-odd">{{ data.l }}</span>
                        </div>
                      </div>
                    </div>
                  </template>

                  <div class="casino-box-row">
                    <div class="casino-nation-name no-border casino-bl-box-title">
                      <div class="playerb"></div>
                    </div>
                    <div class="casino-bl-box casino-bl-box-title">
                      <div class="casino-bl-box-item">
                        <b>Back</b>
                      </div>
                      <div class="casino-bl-box-item">
                        <b>Back</b>
                      </div>
                    </div>
                  </div>
                  <div class="casino-box-row">
                    <div class="casino-nation-name">
                      <div>
                          <b>{{ fancy[18].nat }}</b>
                          <span class="d-block w-100" v-casinofancybook="{ sid: fancy[18].sid, subid: 0 }"
                            >0</span
                          >
                        </div>
                      <div class="float-right">
                        
                        <i
                          class="fas fa-info-circle"
                          data-toggle="collapse"
                          data-target="#demo-fancy-18"
                        ></i>
                        <div id="demo-fancy-18" class="collapse icon-range">
                          R:<span v-kval="{ size: fancy[18].min }"></span>-<span
                            v-kval="{ size: fancy[18].max }"
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div class="casino-bl-box">
                      <div
                        class="back casino-bl-box-item"
                        :class="{ suspended: fancy[18].gstatus != 'OPEN' }"
                      >
                        <span class="casino-box-odd">{{ fancy[18].b }}</span>
                      </div>
                      <div
                        class="back casino-bl-box-item"
                        :class="{ suspended: fancy[18].gstatus != 'OPEN' }"
                      >
                        <span class="casino-box-odd">{{ fancy[18].l }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="casino-box-row">
                    <div class="casino-nation-name">
                      <div>
                          <b>{{ fancy[19].nat }}</b>
                          <span class="d-block w-100" v-casinofancybook="{ sid: fancy[19].sid, subid: 0 }"
                            >0</span
                          >
                        </div>
                      <div class="float-right">
                        <i
                          class="fas fa-info-circle"
                          data-toggle="collapse"
                          data-target="#demo-fancy-19"
                        ></i>
                        <div id="demo-fancy-19" class="collapse icon-range">
                          R:<span v-kval="{ size: fancy[19].min }"></span>-<span
                            v-kval="{ size: fancy[19].max }"
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div class="casino-bl-box">
                      <div
                        class="back casino-bl-box-item"
                        :class="{ suspended: fancy[19].gstatus != 'OPEN' }"
                      >
                        <span class="casino-box-odd">{{ fancy[19].b }}</span>
                      </div>
                      <div
                        class="back casino-bl-box-item"
                        :class="{ suspended: fancy[19].gstatus != 'OPEN' }"
                      >
                        <span class="casino-box-odd">{{ fancy[19].l }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="text-center w-100 pr casino-cards-odds-title">
                    <b>{{ fancy[8].b }}</b>
                    <div class="d-inline-block ml-1 float-right">
                      <i
                        class="fas fa-info-circle"
                        data-toggle="collapse"
                        data-target="#demo-single"
                      ></i>
                      <div id="demo-single" class="collapse icon-range">
                        R:<span v-kval="{ size: fancy[8].min }"></span>-<span
                          v-kval="{ size: fancy[8].max }"
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div class="cards32bextra">
                    <div class="casino-bl-box">
                      <template v-for="(i, key) in 10">
                        <div
                          class="casino-bl-box-item back"
                          :key="`single-${key}`"
                          :class="{ suspended: fancy[key + 8].gstatus != 'OPEN' }"
                        >
                          <span class="casino-box-odd" v-if="i == 10">0</span>
                          <span class="casino-box-odd" v-else>{{ i }}</span>
                          <span v-casinofancybook="{ sid: fancy[key + 8].sid, subid: 0 }"
                            >0</span
                          >
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </template>

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
        subtype: "card32eufancy",
      });
      return this.orderBy(player, "sr");
    },
    fancy1() {
      var player = _.filter(_.get(this.casinoData, "sub"), {
        subtype: "card32eufancy1",
      });
      return this.orderBy(player, "sr");
    },
  },
  data() {
    return {
      showCards: true,
      showResults: true,
      imgPath: IMG_PATH,
      gameTitle: "32 Cards B",
      gameType: "card32eu",
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
            var p1 = {
              count: 8,
              cards: [],
            };
            var p2 = {
              count: 9,
              cards: [],
            };
            var p3 = {
              count: 10,
              cards: [],
            };
            var p4 = {
              count: 11,
              cards: [],
            };

            this.casinoData = response.data;
            if (_.get(this.casinoData, "mid") != this.mId) {
              this.getLastResults();
            }
            this.mId = _.get(this.casinoData, "mid");
            this.time.total = _.get(this.casinoData, "ft");
            this.time.current = _.get(this.casinoData, "lt");

            var playerNo = 1;
            var cards = response.data.card.split(",");

            for (const card of cards) {
              if (playerNo > 4) playerNo = 1;

              if (card != "1") {
                if (playerNo == 1) {
                  p1.cards.push(card);
                  if (card.charAt(0) == "A") {
                    p1.count += 1;
                  } else if (card.charAt(0) == "J") {
                    p1.count += 11;
                  } else if (card.charAt(0) == "Q") {
                    p1.count += 12;
                  } else if (card.charAt(0) == "K") {
                    p1.count += 13;
                  } else {
                    p1.count += parseInt(card.charAt(0));
                  }
                }

                if (playerNo == 2) {
                  p2.cards.push(card);
                  if (card.charAt(0) == "A") {
                    p2.count += 1;
                  } else if (card.charAt(0) == "J") {
                    p2.count += 11;
                  } else if (card.charAt(0) == "Q") {
                    p2.count += 12;
                  } else if (card.charAt(0) == "K") {
                    p2.count += 13;
                  } else {
                    p2.count += parseInt(card.charAt(0));
                  }
                }

                if (playerNo == 3) {
                  p3.cards.push(card);
                  if (card.charAt(0) == "A") {
                    p3.count += 1;
                  } else if (card.charAt(0) == "J") {
                    p3.count += 11;
                  } else if (card.charAt(0) == "Q") {
                    p3.count += 12;
                  } else if (card.charAt(0) == "K") {
                    p3.count += 13;
                  } else {
                    p3.count += parseInt(card.charAt(0));
                  }
                }

                if (playerNo == 4) {
                  p4.cards.push(card);
                  if (card.charAt(0) == "A") {
                    p4.count += 1;
                  } else if (card.charAt(0) == "J") {
                    p4.count += 11;
                  } else if (card.charAt(0) == "Q") {
                    p4.count += 12;
                  } else if (card.charAt(0) == "K") {
                    p4.count += 13;
                  } else {
                    p4.count += parseInt(card.charAt(0));
                  }
                }
              }
              playerNo++;
            }
            Vue.set(this.cards, "p1", p1);
            Vue.set(this.cards, "p2", p2);
            Vue.set(this.cards, "p3", p3);
            Vue.set(this.cards, "p4", p4);

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
          //this.getUserBook();
        })
        .catch((e) => {
         // this.casinoData = [];
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
