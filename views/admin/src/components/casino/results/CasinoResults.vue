<template>
    <div>
        <div class="casino-result-round">
            <div class="">Round-ID: {{ resultData.rid }}</div>
            <div class="">Match Time: <span v-format-datetime="{date: resultData.mtime}"></span></div>
        </div>
        <template v-if="type == 'teen' || type == 'vteen' || type == 'teen6'">
          <div class="row row5">
            <div class="col-12 col-lg-7" v-if="cards && cards.length">
              <div class="casino-result-content">
                <div class="casino-result-content-item text-center">
                  <h4 class="">Player A</h4>
                  <div class="casino-result-cards">
                    <div class="casino-result-cards-item" v-if="resultData.win == 1">
                      <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                    </div>
                    <div class="casino-result-cards-item">
                      <img :src="`${imgPath}front/img/cards/${cards[0]}.png`" />
                    </div>
                    <div class="casino-result-cards-item">
                      <img :src="`${imgPath}front/img/cards/${cards[2]}.png`" />
                    </div>
                    <div class="casino-result-cards-item">
                      <img :src="`${imgPath}front/img/cards/${cards[4]}.png`" />
                    </div>
                  </div>
                </div>
                <div class="casino-result-content-diveder"></div>
                <div class="casino-result-content-item text-center">
                  <h4 class="">Player B</h4>
                  <div class="casino-result-cards">
                    <div class="casino-result-cards-item" v-if="resultData.win == 2">
                      <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                    </div>
                    <div class="casino-result-cards-item">
                      <img :src="`${imgPath}front/img/cards/${cards[1]}.png`" />
                    </div>
                    <div class="casino-result-cards-item">
                      <img :src="`${imgPath}front/img/cards/${cards[3]}.png`" />
                    </div>
                    <div class="casino-result-cards-item">
                      <img :src="`${imgPath}front/img/cards/${cards[5]}.png`" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-lg-5">
              <div class="casino-result-desc" v-if="desc && desc.length">
                <div class="casino-result-desc-item">
                  <div>Winner</div>
                  <div>{{ desc[0] }}</div>
                </div>
                <div class="casino-result-desc-item" v-if="type != 'teen' && type != 'vteen'">
                  <div>Suit</div>
                  <div>{{ desc[1] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Odd/Even</div>
                  <div>{{ desc[2] }}</div>
                </div>
                <div class="casino-result-desc-item" v-if="type == 'teen' || type == 'vteen'">
                  <div>Consecutive</div>
                  <div>{{ desc[3] }}</div>
                </div>
                <div class="casino-result-desc-item" v-if="type == 'teen6'">
                  <div>Cards</div>
                  <div>{{ desc[3] }}</div>
                </div>
                <div class="casino-result-desc-item" v-if="type == 'teen6'">
                  <div>Under/Over</div>
                  <div>{{ desc[4] }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-if="type == 'teen9'">
          <div class="row row5 dtl20-result text-center">
            <div class="col-12 col-lg-3">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="resultData.win == 1">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
                <div class="d-inline-block">
                  <h4 class="text-center">Tiger</h4>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[0]}.png`">
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[3]}.png`">
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[6]}.png`">
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-3">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="resultData.win == 2">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
                <div class="d-inline-block">
                  <h4 class="text-center">Lion</h4>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[1]}.png`">
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[4]}.png`">
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[7]}.png`">
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-3">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="resultData.win == 3">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
                <div class="d-inline-block">
                  <h4 class="text-center">Dragon</h4>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[2]}.png`">
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[5]}.png`">
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[8]}.png`">
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-3">
              <div class="casino-result-desc" v-if="desc && desc.length">
                <div class="casino-result-desc-item">
                  <div>Winner</div>
                  <div>{{ desc[0] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Others</div>
                  <div>{{ desc[1] }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
    
        <template v-if="type == 'teen20' || type == 'vteen20'">
          <div class="row row5">
            <div class="col-12 col-lg-8">
              <div class="casino-result-content">
                <div class="casino-result-content-item text-center">
                  <div class="casino-result-cards">
                    <div class="casino-result-cards-item" v-if="resultData.win == 1">
                      <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                    </div>
                    <div class="d-inline-block">
                        <h4 class="">Player A</h4>
                        <div class="casino-result-cards-item">
                          <img :src="`${imgPath}front/img/cards/${cards[0]}.png`" />
                        </div>
                        <div class="casino-result-cards-item">
                          <img :src="`${imgPath}front/img/cards/${cards[2]}.png`" />
                        </div>
                        <div class="casino-result-cards-item">
                          <img :src="`${imgPath}front/img/cards/${cards[4]}.png`" />
                        </div>
                    </div>
                  </div>
                </div>
                <div class="casino-result-content-diveder"></div>
                <div class="casino-result-content-item text-center">
                  
                  <div class="casino-result-cards">
                    <div class="casino-result-cards-item" v-if="resultData.win == 2">
                      <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                    </div>
                    <div class="d-inline-block">
                      <h4 class="">Player B</h4>
                      
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${cards[1]}.png`" />
                      </div>
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${cards[3]}.png`" />
                      </div>
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${cards[5]}.png`" />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-4">
              <div class="casino-result-desc" v-if="desc && desc.length">
                <div class="casino-result-desc-item">
                  <div>Winner</div>
                  <div>{{ desc[0] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>3 Baccarat</div>
                  <div>{{ desc[1].split('~')[0] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div></div>
                  <div>{{ desc[1].split('~')[1] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Total</div>
                  <div>{{ desc[2] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Pair Plus</div>
                  <div>{{ desc[3] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Red Black</div>
                  <div>{{ desc[4] }}</div>
                </div>
              </div>
             
            </div>
          </div>
        </template>

        <template v-if="type == 'baccarat' || type == 'baccarat2'">
          <div class="row row5">
            <div class="col-12 col-lg-7">
              <div class="casino-result-content">
                <div class="casino-result-content-item text-center">
                  
                  <div class="casino-result-cards">
                    <div class="casino-result-cards-item" v-if="resultData.win == 1">
                      <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                    </div>
                    <div class="d-inline-block">
                      <h4 class="">Player</h4>
                      <div class="casino-result-cards-item l-rotate" v-if="cards[4] != '1'">
                        <img :src="`${imgPath}front/img/cards/${cards[4]}.png`"  />
                      </div>
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${cards[2]}.png`" />
                      </div>
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${cards[0]}.png`" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="casino-result-content-diveder"></div>
                <div class="casino-result-content-item text-center">
                  
                  <div class="casino-result-cards">
                    <div class="casino-result-cards-item" v-if="resultData.win == 2">
                      <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                    </div>
                    <div class="d-inline-block">
                      <h4 class="">Banker</h4>
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${cards[1]}.png`" />
                      </div>
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${cards[3]}.png`" />
                      </div>
                      <div class="casino-result-cards-item r-rotate" v-if="cards[5] != '1'">
                        <img :src="`${imgPath}front/img/cards/${cards[5]}.png`" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-5">
              <div class="casino-result-desc" v-if="desc && desc.length">
                <div class="casino-result-desc-item">
                  <div>Winner</div>
                  <div>{{ desc[0] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Winner Pair</div>
                  <div>{{ desc[1] }}</div>
                </div>
                <template v-if="type == 'baccarat'">
                  <div class="casino-result-desc-item">
                    <div>Perfect</div>
                    <div>{{ desc[2] }}</div>
                  </div>
                  <div class="casino-result-desc-item" v>
                    <div>Either</div>
                    <div>{{ desc[3] }}</div>
                  </div>
                  <div class="casino-result-desc-item" v>
                    <div>Big/Small</div>
                    <div>{{ desc[4] }}</div>
                  </div>
                </template>
                <template v-else>
                  <div class="casino-result-desc-item" v>
                    <div>Score</div>
                    <div>{{ desc[2] }}</div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </template>

        <template v-if="type == 'teen8'">
          <div class="row row5 casino-open">
            <div class="col-12 col-lg-7">
              <div class="casino-open-result">
                <template v-for="index in 8">
                  <div v-bind:key="index" class="casino-open-result-item">
                    <h4 class="">{{ index }}</h4>
                    <div class="casino-result-cards">
                      <div class="casino-result-cards-item-container">
                        <div class="casino-result-cards-item">
                          <img :src="`${imgPath}front/img/cards/${
                              cards[index - 1]
                            }.png`" />
                        </div>
                        <div class="casino-result-cards-item">
                          <img :src="`${imgPath}front/img/cards/${
                              cards[index + 8]
                            }.png`" />
                        </div>
                        <div class="casino-result-cards-item">
                          <img :src="`${imgPath}front/img/cards/${
                              cards[index + 17]
                            }.png`" />
                        </div>
                        <div class="casino-result-cards-item" v-if="winners.indexOf(index.toString()) != -1">
                          <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <div class="casino-open-result-item">
                  <h4 class="text-warning">D</h4>
                  <div class="casino-result-cards">
                    <div class="casino-result-cards-item-container">
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${cards[8]}.png`" />
                      </div>
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${cards[17]}.png`" />
                      </div>
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${cards[26]}.png`" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-5">
              <div class="casino-result-desc" v-if="desc && desc.length">
                <div class="casino-result-desc-item">
                  <div>Winner</div>
                  <div>{{ desc[0] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Pair Plus</div>
                  <div>{{ desc[1] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Total</div>
                  <div>{{ desc[2].split('~')[0] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div></div>
                  <div>{{ desc[2].split('~')[1] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div></div>
                  <div>{{ desc[2].split('~')[2] }}</div>
                </div>
                <!-- <div class="casino-result-desc-item">
                  <div>Others</div>
                  <div>{{ desc[3] }}</div>
                </div> -->
              </div>
            </div>
          </div>
        </template>

        <template v-if="type == 'lucky7' || type == 'lucky7eu' || type == 'lucky7eu2'">
          <div class="row row5 align-items-center">
            <div class="col-12 col-lg-7 " v-if="cards && cards.length">
              <div class="casino-result-content">
                <div class="casino-result-content-item text-center" style="align-items:flex-end">
                  
                  <div class="casino-result-cards">
                    <div class="casino-result-cards-item" v-if="cards[0] != '1'">
                      <img :src="`${imgPath}front/img/cards/${cards[0]}.png`"  />
                    </div>
                    
                  </div>
                </div>
                
              </div>
            </div>
            <div class="col-12 col-lg-5">
              <div class="casino-result-desc" v-if="desc && desc.length">
                <div class="casino-result-desc-item">
                  <div>Winner</div>
                  <div>{{ desc[0] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Odd/Even</div>
                  <div>{{ desc[1] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Color</div>
                  <div>{{ desc[2] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Card</div>
                  <div>{{ desc[3] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Line</div>
                  <div>{{ desc[4] }}</div>
                </div>
              </div>
            </div>
            
          </div>
        </template>
        
        <template v-if="type == 'poker' || type == 'poker20'">
          <div class="row row5">
            <div class="col-12 col-lg-5">
              <div class="casino-result-content mt-0">
                <div class="casino-result-content-item text-center">
                  <div class="casino-result-cards">
                    <div class="casino-result-cards-item" v-if="resultData.win == 1">
                      <img :src="`${imgPath}front/img/winner.png`" class="winner-icon">
                    </div>
                    <div class="d-inline-block">
                      <h4 class="">Player A</h4>
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${cards[0]}.png`">
                      </div>
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${cards[1]}.png`">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="casino-result-content-diveder"></div>
                <div class="casino-result-content-item text-center">
                  <div class="casino-result-cards">
                    <div class="casino-result-cards-item" v-if="resultData.win == 2">
                      <img :src="`${imgPath}front/img/winner.png`" class="winner-icon">
                    </div>
                    <div class="d-inline-block">
                      <h4 class="">Player B</h4>
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${cards[2]}.png`">
                      </div>
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${cards[3]}.png`">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-4 d-flex align-items-center">
              <div class="casino-result-cards d-block w-100">
                <div class="text-center">
                  <h4 class="text-center">Board</h4>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[4]}.png`">
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[5]}.png`">
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[6]}.png`">
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[7]}.png`">
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[8]}.png`">
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-3">
              <div class="casino-result-desc" v-if="type == 'poker20'">
                <div class="casino-result-desc-item">
                  <div>Main:</div>
                  <div>{{ desc[0] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Other:</div>
                  <div>{{ desc[1] }}</div>
                </div>
              </div>
              <div class="casino-result-desc" v-else-if="type == 'poker'">
                <div class="casino-result-desc-item">
                  <div>Main:</div>
                  <div>{{ desc[0] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>2 Card:</div>
                  <div>{{ desc[1] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>7 Card:</div>
                  <div>{{ desc[2] }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-if="type == 'poker6'">
          <div class="row row5 poker6result">
            <div class="col-12 col-lg-8">
              <div class="casino-result-content">
                <div class="casino-result-content-item text-center">
                  <div class="casino-result-cards casino-open-result">
                    <template v-for="index in 6">
                      <div v-bind:key="index" class="casino-open-result-item">
                        <h4 class="">{{ index }}</h4>
                        <div class="casino-result-cards">
                          <div class="casino-result-cards-item-container">
                            <div class="casino-result-cards-item">
                              <img :src="`${imgPath}front/img/cards/${
                                cards[index - 1]
                              }.png`" />
                            </div>
                            <div class="casino-result-cards-item">
                              <img :src="`${imgPath}front/img/cards/${
                                cards[index + 5]
                              }.png`" />
                            </div>
                            <div class="casino-result-cards-item" v-if="winners.indexOf('1'+index.toString()) != -1">
                              <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" /> 
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="casino-result-content-diveder"></div>
                <div class="casino-result-content-item text-center">
                  <div class="casino-result-cards">
                    <div class="d-inline-block">
                      <h4 class="">Board Card</h4>
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${
                                cards[12]
                              }.png`">
                      </div>
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${
                                cards[13]
                              }.png`">
                      </div>
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${
                                cards[14]
                              }.png`">
                      </div>
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${
                                cards[15]
                              }.png`">
                      </div>
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${
                                cards[16]
                              }.png`">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-4">
              <div class="casino-result-desc" v-if="desc && desc.length">
                <div class="casino-result-desc-item">
                  <div>Player <span class="float-right">:</span></div>
                  <div>{{ desc[0] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Pattern<span class="float-right">:</span></div>
                  <div>{{ desc[1] }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-if="type == 'dt6' || type == 'dt20' || type == 'dt202'">
          <div class="row row5">
            <div class="col-12 col-lg-7" v-if="cards && cards.length">
              <div class="casino-result-content">
                <div class="casino-result-content-item text-center">
                  <div class="casino-result-cards">
                    <div class="casino-result-cards-item" v-if="resultData.win == 1">
                      <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                    </div>
                    <div class="d-inline-block">
                      <h4 class="">Dragon</h4>
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${cards[0]}.png`" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="casino-result-content-diveder"></div>
                <div class="casino-result-content-item text-center">
                  <div class="casino-result-cards">
                    <div class="casino-result-cards-item" v-if="resultData.win == 2">
                      <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                    </div>
                    <div class="d-inline-block">
                      <h4 class="">Tiger</h4>
                      <div class="casino-result-cards-item">
                        <img :src="`${imgPath}front/img/cards/${cards[1]}.png`" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-lg-5">
              <div class="casino-result-desc" v-if="desc && desc.length">
                <div class="casino-result-desc-item">
                  <div>Winner</div>
                  <div>{{ desc[0] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Pair</div>
                  <div>{{ desc[1] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Odd/Even</div>
                  <div>{{ desc[2] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Color</div>
                  <div>{{ desc[3] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div v-if="type == 'dt6'">Suit</div>
                  <div v-else-if="type == 'dt20' || type == 'dt202'">Card</div>
                  <div>{{ desc[4] }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-if="type == 'dtl20'">
          <div class="row row5 dtl20-result text-center">
            <div class="col-12 col-lg-2">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="resultData.win == 1">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
                <div class="d-inline-block">
                  <h4 class="">Dragon</h4>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[0]}.png`" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-2">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="resultData.win == 21">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
                <div class="d-inline-block">
                  <h4 class="">Tiger</h4>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[1]}.png`" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-2">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="resultData.win == 41">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
                <div class="d-inline-block">
                  <h4 class="">Lion</h4>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[2]}.png`" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6">
              <div class="casino-result-desc" v-if="desc && desc.length">
                <div class="casino-result-desc-item">
                  <div>Winner</div>
                  <div>{{ desc[0] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Red/Black</div>
                  <div>{{ desc[1] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Odd/Even</div>
                  <div>{{ desc[2] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Card</div>
                  <div>{{ desc[3] }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-if="type == 'aaa' || type == 'btable'">
          <div class="row row5">
            <div class="col-12 col-lg-7 " v-if="cards && cards.length">
              <div class="casino-result-content">
                <div class="casino-result-content-item text-center" style="align-items:flex-end">

                  <div class="casino-result-cards">
                    <div class="casino-result-cards-item" v-if="cards[0] != '1'">
                      <img :src="`${imgPath}front/img/cards/${cards[0]}.png`" />
                    </div>

                  </div>
                </div>

              </div>
            </div>

            <div class="col-12 col-lg-5">
              <div class="casino-result-desc" v-if="desc && desc.length">
                <template v-if="type == 'aaa'">
                  <div class="casino-result-desc-item">
                    <div>Winner</div>
                    <div>{{ desc[0] }}</div>
                  </div>
                  <div class="casino-result-desc-item">
                    <div>Odd/Even</div>
                    <div>{{ desc[1] }}</div>
                  </div>
                  <div class="casino-result-desc-item">
                    <div>Color</div>
                    <div>{{ desc[2] }}</div>
                  </div>
                  <div class="casino-result-desc-item">
                    <div>Under/Over</div>
                    <div>{{ desc[3] }}</div>
                  </div>
                  <div class="casino-result-desc-item">
                    <div>Card</div>
                    <div>{{ desc[4] }}</div>
                  </div>
                </template>

                <template v-if="type == 'btable'">
                  <div class="casino-result-desc-item">
                    <div>Winner</div>
                    <div>{{ desc[0] }}</div>
                  </div>
                  <div class="casino-result-desc-item">
                    <div>Odd</div>
                    <div>{{ desc[1] }}</div>
                  </div>
                  <div class="casino-result-desc-item">
                    <div>Dulha Dulhan/Barati</div>
                    <div>{{ desc[2] }}</div>
                  </div>
                  <div class="casino-result-desc-item">
                    <div>Color</div>
                    <div>{{ desc[3] }}</div>
                  </div>
                  <div class="casino-result-desc-item">
                    <div>Card</div>
                    <div>{{ desc[4] }}</div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </template>

        <template v-if="type == 'worli' || type == 'worli2'">
          <div class="row row5 worli-result">
            <div class="col-12 col-lg-7 " v-if="cards && cards.length">
              <div class="casino-result-content">
                <div class="casino-result-content-item text-center w-100">

                  <div class="casino-result-cards">
                    <div class="casino-result-cards-item">
                      <img :src="`${imgPath}front/img/cards/${cards[0]}.png`" />
                    </div>
                    <div class="casino-result-cards-item">
                      <img :src="`${imgPath}front/img/cards/${cards[1]}.png`" />
                    </div>
                    <div class="casino-result-cards-item">
                      <img :src="`${imgPath}front/img/cards/${cards[2]}.png`" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="col-12 col-lg-5">
              <div class="casino-result-desc" v-if="desc && desc.length">
                <div class="casino-result-desc-item">
                  <div>Pana:</div>
                  <div>{{ desc[0] }}</div>
                </div>
                <div class="casino-result-desc-item">
                  <div>Ocada:</div>
                  <div>{{ desc[1] }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>

    <template v-if="type == 'card32' || type == 'card32eu'">
      <div class="row row5 card32result">
        <div class="col-12 col-lg-8">
          <div class="row row5">
            <div class="col-12 col-lg-12" v-if="card32.players.p1.cards && card32.players.p1.cards.length">
              <div class="casino-result-cards">
                <h4 class="text-center d-inline-block">Player 8 - <span class="badge badge-success font14">{{ card32.players.p1.count }}</span></h4>
                <template v-for="(card, key) in card32.players.p1.cards">
                  <div class="casino-result-cards-item" :key="key">
                    <img :src="`${imgPath}front/img/cards/${card}.png`" />
                  </div>
                </template>
                <div class="casino-result-cards-item" v-if="resultData.win == 1">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-12" v-if="card32.players.p2.cards && card32.players.p2.cards.length">
              <div class="casino-result-cards">
                <h4 class="text-center d-inline-block">Player 9 - <span class="badge badge-success font14">{{ card32.players.p2.count }}</span></h4>
                <template v-for="(card, key) in card32.players.p2.cards">
                  <div class="casino-result-cards-item" :key="key">
                    <img :src="`${imgPath}front/img/cards/${card}.png`" />
                  </div>
                </template>
                <div class="casino-result-cards-item" v-if="resultData.win == 2">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-12" v-if="card32.players.p3.cards && card32.players.p3.cards.length">
              <div class="casino-result-cards">
                <h4 class="text-center d-inline-block">Player 10 - <span class="badge badge-success font14">{{ card32.players.p3.count }}</span></h4>
                <template v-for="(card, key) in card32.players.p3.cards">
                  <div class="casino-result-cards-item" :key="key">
                    <img :src="`${imgPath}front/img/cards/${card}.png`" />
                  </div>
                </template>
                <div class="casino-result-cards-item" v-if="resultData.win == 3">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-12" v-if="card32.players.p4.cards && card32.players.p4.cards.length">
              <div class="casino-result-cards">
                <h4 class="text-center d-inline-block">Player 11 - <span class="badge badge-success font14">{{ card32.players.p4.count }}</span></h4>
                <template v-for="(card, key) in card32.players.p4.cards">
                  <div class="casino-result-cards-item" :key="key">
                    <img :src="`${imgPath}front/img/cards/${card}.png`" />
                  </div>
                </template>
                <div class="casino-result-cards-item" v-if="resultData.win == 4">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-4">
          <div class="casino-result-desc" v-if="desc && desc.length">
            <div class="casino-result-desc-item">
              <div>Winner</div>
              <div>{{ desc[0] }}</div>
            </div>
            <template v-if="type == 'card32eu'">
              <div class="casino-result-desc-item">
                <div>Odd/Even</div>
                <div>{{ desc[1].split('~')[0] }}</div>
              </div>
              <div class="casino-result-desc-item">
                <div></div>
                <div>{{ desc[1].split('~')[1] }}</div>
              </div>
              <div class="casino-result-desc-item">
                <div>Black/Red</div>
                <div>{{ desc[2] }}</div>
              </div>
              <div class="casino-result-desc-item">
                <div>Total</div>
                <div>{{ desc[3] }}</div>
              </div>
              <div class="casino-result-desc-item">
                <div>Single</div>
                <div>{{ desc[4] }}</div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>

    <template v-if="type == 'war'">
      <div class="row row5 war-result">
        <div class="col-12 col-lg-6">
          <div class="casino-open-result">
            <div class="casino-open-result-item">
              <h4 class="">1</h4>
              <div class="casino-result-cards">
                <div class="casino-result-cards-item-container">
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[0]}.png`" />
                  </div>
                  <div class="casino-result-cards-item" v-if="winners.includes('1')">
                    <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                  </div>
                </div>
              </div>
            </div>
            <div class="casino-open-result-item">
              <h4 class="">2</h4>
              <div class="casino-result-cards">
                <div class="casino-result-cards-item-container">
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[1]}.png`" />
                  </div>
                  <div class="casino-result-cards-item" v-if="winners.includes('2')">
                    <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                  </div>
                </div>
              </div>
            </div>
            <div class="casino-open-result-item">
              <h4 class="">3</h4>
              <div class="casino-result-cards">
                <div class="casino-result-cards-item-container">
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[2]}.png`" />
                  </div>
                  <div class="casino-result-cards-item" v-if="winners.includes('3')">
                    <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                  </div>
                </div>
              </div>
            </div>
            <div class="casino-open-result-item">
              <h4 class="">4</h4>
              <div class="casino-result-cards">
                <div class="casino-result-cards-item-container">
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[3]}.png`" />
                  </div>
                  <div class="casino-result-cards-item" v-if="winners.includes('4')">
                    <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                  </div>
                </div>
              </div>
            </div>
            <div class="casino-open-result-item">
              <h4 class="">5</h4>
              <div class="casino-result-cards">
                <div class="casino-result-cards-item-container">
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[4]}.png`" />
                  </div>
                  <div class="casino-result-cards-item" v-if="winners.includes('5')">
                    <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                  </div>
                </div>
              </div>
            </div>
            <div class="casino-open-result-item">
              <h4 class="">6</h4>
              <div class="casino-result-cards">
                <div class="casino-result-cards-item-container">
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[5]}.png`" />
                  </div>
                  <div class="casino-result-cards-item" v-if="winners.includes('6')">
                    <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                  </div>
                </div>
              </div>
            </div>
            <div class="casino-open-result-item">
              <h4 class="text-warning">D</h4>
              <div class="casino-result-cards">
                <div class="casino-result-cards-item-container">
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[6]}.png`" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="casino-result-desc" v-if="desc && desc.length">
            <div class="casino-result-desc-item">
              <div>Winner</div>
              <div>{{ desc[0] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Color</div>
              <div>{{ desc[1].split('~')[0] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div></div>
              <div>{{ desc[1].split('~')[1] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Odd/Even</div>
              <div>{{ desc[2].split('~')[0] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div></div>
              <div>{{ desc[2].split('~')[1] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Suit</div>
              <div>{{ desc[3].split('~')[0] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div></div>
              <div>{{ desc[3].split('~')[1] }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="type == '3cardj' || type == 'lottcard' || type == 'paasa'">
      <div class="row row5 worli-result">
        <div class="col-12 col-lg-7 " v-if="cards && cards.length">
          <div class="casino-result-content">
            <div class="casino-result-content-item text-center w-100">

              <div class="casino-result-cards">
                <div class="casino-result-cards-item">
                  <img :src="`${imgPath}front/img/cards/${cards[0]}.png`" />
                </div>
                <div class="casino-result-cards-item">
                  <img :src="`${imgPath}front/img/cards/${cards[1]}.png`" />
                </div>
                <div class="casino-result-cards-item">
                  <img :src="`${imgPath}front/img/cards/${cards[2]}.png`" />
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="col-12 col-lg-5">
          <div class="casino-result-desc" v-if="desc && desc.length">
            <div class="casino-result-desc-item">
              <div>Result</div>
              <div>{{ desc[0] }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="type == 'queen'">
      <div class="row row5 card32result">
        <div class="col-12 col-lg-8">
          <div class="row row5">
            <div class="col-12 col-lg-12" v-if="queen.players.p1.cards && queen.players.p1.cards.length">
              <div class="casino-result-cards">
                <h4 class="text-center d-inline-block">Total 0 - <span class="badge badge-success font14">{{ queen.players.p1.count }}</span></h4>
                <template v-for="(card, key) in queen.players.p1.cards">
                  <div class="casino-result-cards-item" :key="key">
                    <img :src="`${imgPath}front/img/cards/${card}.png`" />
                  </div>
                </template>
                <div class="casino-result-cards-item" v-if="resultData.win == 1">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-12" v-if="queen.players.p2.cards && queen.players.p2.cards.length">
              <div class="casino-result-cards">
                <h4 class="text-center d-inline-block">Total 1 - <span class="badge badge-success font14">{{ queen.players.p2.count }}</span></h4>
                <template v-for="(card, key) in queen.players.p2.cards">
                  <div class="casino-result-cards-item" :key="key">
                    <img :src="`${imgPath}front/img/cards/${card}.png`" />
                  </div>
                </template>
                <div class="casino-result-cards-item" v-if="resultData.win == 2">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-12" v-if="queen.players.p3.cards && queen.players.p3.cards.length">
              <div class="casino-result-cards">
                <h4 class="text-center d-inline-block">Total 2 - <span class="badge badge-success font14">{{ queen.players.p3.count }}</span></h4>
                <template v-for="(card, key) in queen.players.p3.cards">
                  <div class="casino-result-cards-item" :key="key">
                    <img :src="`${imgPath}front/img/cards/${card}.png`" />
                  </div>
                </template>
                <div class="casino-result-cards-item" v-if="resultData.win == 3">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-12" v-if="queen.players.p4.cards && queen.players.p4.cards.length">
              <div class="casino-result-cards">
                <h4 class="text-center d-inline-block">Total 3 - <span class="badge badge-success font14">{{ queen.players.p4.count }}</span></h4>
                <template v-for="(card, key) in queen.players.p4.cards">
                  <div class="casino-result-cards-item" :key="key">
                    <img :src="`${imgPath}front/img/cards/${card}.png`" />
                  </div>
                </template>
                <div class="casino-result-cards-item" v-if="resultData.win == 4">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-4">
          <div class="casino-result-desc" v-if="desc && desc.length">
            <div class="casino-result-desc-item">
              <div>Winner</div>
              <div>{{ desc[0] }}</div>
            </div>
           
          </div>
        </div>
      </div>
    </template>

    <template v-if="type == 'ab20'">
      <div class="row row5 ab20-result">
        <div class="col-12">
          <h5 class="text-center">Andar</h5>
          <div class="text-center">
            <template v-for="(andar, key) in ab.andar">
              <div class="casino-result-cards-item item" :key="key">
                <img :src="`${imgPath}front/img/cards/${andar}.png`">
              </div>
            </template>
          </div>
        </div>

        <div class="col-12 mt-2">
          <h5 class="text-center">Bahar</h5>
          <div class="text-center">
            <template v-for="(bahar, key) in ab.bahar">
              <div class="casino-result-cards-item item" :key="key">
                <img :src="`${imgPath}front/img/cards/${bahar}.png`">
              </div>
            </template>
          </div>
        </div>

      </div>
    </template>

    <template v-if="type == 'cmeter'">
      <div class="row row5">
        <div class="col-12 col-lg-9">
          <div class="row align-items-center">
              <div class="col-10">
                  <div class="row align-items-center">
                      <div class="col-2">
                          <b>Low Cards</b>
                      </div>
                      <div class="col-10">
                        <template v-for="(card, key) in cards">
                          <div class="casino-result-cards-item" v-if="checkLowCards(card)">
                            <img :key="key" :src="imgPath + 'front/img/cards/'+ card +'.png'" class="mr-2">
                          </div>
                        </template>
                      </div>
                  </div>
                  <div class="row align-items-center mt-3">
                      <div class="col-2">
                          <b>High Cards</b>
                      </div>
                      <div class="col-10">
                        <template v-for="(card, key) in cards">
                          <div class="casino-result-cards-item" v-if="checkHighCards(card)">
                            <img :key="key" :src="imgPath + 'front/img/cards/'+ card +'.png'" class="mr-2">
                          </div>
                        </template>
                      </div>
                  </div>
              </div>
              <div class="col-2 text-center">
                  <div class="casino-result-cards-item">
                      <template v-for="(card, key) in cards">
                          <img v-if="card == '9SS' || card == '10SS'" :key="key" :src="imgPath + 'front/img/cards/'+ card +'.png'" class="mr-2">
                      </template>
                  </div>
              </div>
          </div>
        </div>

        <div class="col-12 col-lg-3">
          <div class="casino-result-desc" v-if="desc && desc.length">
            <div class="casino-result-desc-item">
              <div>Winner</div>
              <div>{{ desc[0] }}</div>
            </div>
            
          </div>
        </div>
      </div>
    </template>

    <template v-if="type == 'race20'">
      <div class="row row5">
        <div class="col-12 col-lg-8">
          <div class="race-result-box">
              <div class="pr mb-1">
                  <span class="result-image icons">
                      <img :src="imgPath+'front/img/cards/spade.png'">
                  </span>
                  <template v-for="(card, key) in race20.spadeCard">
                      <span :key="key" class="result-image">
                          <img :src="`${imgPath}front/img/cards/${card}.png`">
                      </span>
                  </template>
                  <span class="result-image" :class="{'k-image':race20.spadeCard.length == 5}" v-if="race20.spadeCard && race20.spadeCard.length">
                      <img :src="`${imgPath}front/img/cards/KSS.png`">
                  </span>
                  <div class="casino-result-cards-item" v-if="resultData.win == 1">
                      <img :src="imgPath+'front/img/winner.png'" class="winner-icon">
                  </div>
              </div>
              <div class="pr mb-1">
                <span class="result-image icons">
                      <img :src="imgPath+'front/img/cards/heart.png'">
                  </span>
                  <template v-for="(card, key) in race20.heartCard">
                      <span :key="key" class="result-image">
                          <img :src="`${imgPath}front/img/cards/${card}.png`">
                      </span>
                  </template>
                  <span class="result-image" :class="{'k-image':race20.heartCard.length == 5}" v-if="race20.heartCard && race20.heartCard.length">
                      <img :src="`${imgPath}front/img/cards/KHH.png`">
                  </span>
                  <div class="casino-result-cards-item" v-if="resultData.win == 2">
                      <img :src="imgPath+'front/img/winner.png'" class="winner-icon">
                  </div>
              </div>
              <div class="pr mb-1">
                  <span class="result-image icons">
                      <img :src="imgPath+'front/img/cards/club.png'">
                  </span>
                  <template v-for="(card, key) in race20.clubCard">
                      <span :key="key" class="result-image">
                          <img :src="`${imgPath}front/img/cards/${card}.png`">
                      </span>
                  </template>
                  <span class="result-image" :class="{'k-image':race20.clubCard.length == 5}" v-if="race20.clubCard && race20.clubCard.length">
                      <img :src="`${imgPath}front/img/cards/KCC.png`">
                  </span>
                  <div class="casino-result-cards-item" v-if="resultData.win == 3">
                      <img :src="imgPath+'front/img/winner.png'" class="winner-icon">
                  </div>
              </div>
              <div class="pr mb-1">
                  <span class="result-image icons">
                      <img :src="imgPath+'front/img/cards/diamond.png'">
                  </span>
                  <template v-for="(card, key) in race20.diamondCard">
                      <span :key="key" class="result-image">
                          <img :src="`${imgPath}front/img/cards/${card}.png`">
                      </span>
                  </template>
                  <span class="result-image" :class="{'k-image':race20.diamondCard.length == 5}" v-if="race20.diamondCard && race20.diamondCard.length">
                      <img :src="`${imgPath}front/img/cards/KDD.png`">
                  </span>
                  <div class="casino-result-cards-item" v-if="resultData.win == 4">
                      <img :src="imgPath+'front/img/winner.png'" class="winner-icon">
                  </div>
              </div>
              <div class="video-winner-text">
                  <div>W</div>
                  <div>I</div>
                  <div>N</div>
                  <div>N</div>
                  <div>E</div>
                  <div>R</div>
              </div>
          </div>
        </div>

        <div class="col-12 col-lg-4">
          <div class="casino-result-desc" v-if="desc && desc.length">
            <div class="casino-result-desc-item">
              <div>Winner</div>
              <div>{{ desc[0] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Points</div>
              <div>{{ desc[1] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Cards</div>
              <div>{{ desc[2] }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="type == 'abj'">
      <div class="row row5 ab2-result">
        <div class="col-12 col-lg-8">
          <div class="d-flex align-items-center">
            <div class="mr-3">
              <div class="row row5">
                <div class="col-12">
                  <b>A</b>
                </div>
              </div>
              <div class="row row5">
                <div class="col-12">
                  <b>B</b>
                </div>
              </div>
            </div>
            <div class="">
              <div class="casino-result-cards-item">
                <img :src="imgPath+ 'front/img/cards/'+ cards[0]+ '.png'">
              </div>
            </div>
            <div class="col-9">
              <div class="card-inner">
                <div class="row row5">
                  <div class="col-2">
                    <div class="casino-result-cards-item">
                      <img :src="imgPath+ 'front/img/cards/'+ cards[2]+ '.png'">
                    </div>
                  </div>
                  <div class="col-8">
                    <div class="ab-slider owl-carousel owl-theme" id="andarSlider">
                      <template v-for="(andar, key) in abj.andar">
                        <div class="casino-result-cards-item item" :key="key">
                          <img :src="`${imgPath}front/img/cards/${andar}.png`">
                        </div>
                      </template>
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="casino-result-cards-item" v-if="resultData.win == 1">
                      <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-inner">
                <div class="row row5">
                  <div class="col-2">
                    <div class="casino-result-cards-item">
                      <img :src="imgPath+ 'front/img/cards/'+ cards[1]+ '.png'">
                    </div>
                  </div>
                  <div class="col-8">
                    <div class="ab-slider owl-carousel owl-theme" id="baharSlider">
                      <template v-for="(bahar, key) in abj.bahar">
                        <div class="casino-result-cards-item item" :key="key">
                          <img :src="`${imgPath}front/img/cards/${bahar}.png`">
                        </div>
                      </template>
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="casino-result-cards-item" v-if="resultData.win == 2">
                      <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="casino-result-desc" v-if="desc && desc.length">
            <div class="casino-result-desc-item">
              <div>Winner <span class="float-right">:</span></div>
              <div>{{ desc[0] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Suit<span class="float-right">:</span></div>
              <div>{{ desc[1] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Odd/Even<span class="float-right">:</span></div>
              <div>{{ desc[2] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Joker<span class="float-right">:</span></div>
              <div>{{ desc[3] }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="type == 'cmatch20'">
      <div class="row row5 align-items-center">
        <div class="col-12 col-lg-7 " v-if="cards && cards.length">
          <div class="casino-result-content">
            <div class="casino-result-content-item text-center" style="align-items:flex-end">
              
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="cards[0] != '1'">
                  <img :src="`${imgPath}front/img/cards/${cards[0]}.png`"  />
                </div>
                
              </div>
            </div>
            
          </div>
        </div>

        <div class="col-12 col-lg-5">
          <div class="casino-result-desc" v-if="desc && desc.length">
            <div class="casino-result-desc-item">
              <div>Runs:</div>
              <div>{{ desc[0] }}</div>
            </div>
            
          </div>
        </div>
      </div>
    </template>

    <template v-if="type == 'cricketv' || type == 'cricketv2' || type == 'cricketv3' || type == 'superover'">
      <div class="row row5 align-items-center five-cricket-result">
        <div class="col-12" v-if="cricketv3 && cricketv3.team1Data.length">
          <div class="text-right mt-3 score-head">
              Winner:
              <span class="text-success">{{ resultData.winnat}}</span>
              | {{ resultData.rdesc }}
          </div>
          <h4 class="mb-0">First Inning</h4>
          <div class="table-responsive mb-0">
              
                <table class="table" v-if="cricketv3.team1Data && cricketv3.team1Data.length > 0">
                  <thead>
                  <tr>
                    <th class="text-center"><b><span
                          class="text-success">{{cricketv3.team1Data[0].nat}}</span></b>
                      </th>
                      <th class="text-center"><b>1</b></th>
                      <th class="text-center"><b>2</b></th>
                      <th class="text-center"><b>3</b></th>
                      <th class="text-center"><b>4</b></th>
                      <th class="text-center"><b>5</b></th>
                      <th class="text-center"><b>6</b></th>
                      <th class="text-center"><b>Run/Over</b></th>
                      <th class="text-center"><b>Score</b></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(over,index) in cricketv3.team1Data">
                      <td class="text-center"><b>Over {{index+1}}</b></td>
                      <td class="text-center" v-for="n in 6">
                          <span :class="over.runData[n-1].runclass"
                          v-if="over.runData[n-1]">{{ over.runData[n-1].runText }}</span>
                      </td>
                      <td class="text-center nationcard">{{ over.run }}</td>
                      <td class="text-center nationcard">{{ over.score+"/"+over.wkt }}</td>
                  </tr>
                </tbody>
              </table>
          </div>
          <h4 class="mb-0">Second Inning</h4>
          <div class="table-responsive">
              
              <table class="table" v-if="cricketv3.team2Data && cricketv3.team2Data.length > 0">
                  <thead>
                  <tr>
                      <th class="text-center"><b><span
                      class="text-success">{{cricketv3.team2Data[0].nat}}</span></b>
                      </th>
                      <th class="text-center"><b>1</b></th>
                      <th class="text-center"><b>2</b></th>
                      <th class="text-center"><b>3</b></th>
                      <th class="text-center"><b>4</b></th>
                      <th class="text-center"><b>5</b></th>
                      <th class="text-center"><b>6</b></th>
                      <th class="text-center"><b>Run/Over</b></th>
                      <th class="text-center"><b>Score</b></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(over,index) in cricketv3.team2Data">
                      <td class="text-center"><b>Over {{index+1}}</b></td>
                      <td class="text-center" v-for="n in 6">
                          <span :class="over.runData[n-1].runclass"
                          v-if="over.runData[n-1]">{{ over.runData[n-1].runText }}</span>
                      </td>
                      <td class="text-center nationcard">{{ over.run }}</td>
                      <td class="text-center nationcard">{{ over.score+"/"+over.wkt }}</td>
                  </tr>
                  </tbody>
              </table>
          </div>

        </div>

       <!--  <div class="col-12 col-lg-5">
          <div class="casino-result-desc" v-if="desc && desc.length">
            <div class="casino-result-desc-item">
              <div>Runs:</div>
              <div>{{ desc[0] }}</div>
            </div>
            
          </div>
        </div> -->
      </div>
    </template>
    <template v-if="type == 'trap'">
      <div class="row row5">
        <div class="col-12 col-lg-7" v-if="cards && cards.length">
          <div class="casino-result-content">
            <div class="casino-result-content-item text-center">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="resultData.win == 1">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
                <div class="d-inline-block w-100">
                  <h4 class="">Player A ({{ trap.count.playerA }})</h4>
                  <div class="casino-result-cards-item" v-if="cards[0] != '1'">
                    <img :src="`${imgPath}front/img/cards/${cards[0]}.png`" />
                  </div>
                  <div class="casino-result-cards-item" v-if="cards[2] != '1'">
                    <img :src="`${imgPath}front/img/cards/${cards[2]}.png`" />
                  </div>
                  <div class="casino-result-cards-item" v-if="cards[4] != '1'">
                    <img :src="`${imgPath}front/img/cards/${cards[4]}.png`" />
                  </div>
                  <div class="casino-result-cards-item" v-if="cards[6] != '1'">
                    <img :src="`${imgPath}front/img/cards/${cards[6]}.png`" />
                  </div>
                  <div class="casino-result-cards-item" v-if="cards[8] != '1'">
                    <img :src="`${imgPath}front/img/cards/${cards[8]}.png`" />
                  </div>
                  <div class="casino-result-cards-item" v-if="cards[10] != '1'">
                    <img :src="`${imgPath}front/img/cards/${cards[10]}.png`" />
                  </div>
                  <div class="casino-result-cards-item" v-if="cards[12] != '1'">
                    <img :src="`${imgPath}front/img/cards/${cards[12]}.png`" />
                  </div>
                </div>
              </div>
            </div>
            <div class="casino-result-content-diveder"></div>
            <div class="casino-result-content-item text-center">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="resultData.win == 2">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
                <div class="d-inline-block w-100">
                  <h4 class="">Player B ({{ trap.count.playerB }})</h4>
                  <div class="casino-result-cards-item" v-if="cards[1] != '1'">
                    <img :src="`${imgPath}front/img/cards/${cards[1]}.png`" />
                  </div>
                  <div class="casino-result-cards-item" v-if="cards[3] != '1'">
                    <img :src="`${imgPath}front/img/cards/${cards[3]}.png`" />
                  </div>
                  <div class="casino-result-cards-item" v-if="cards[5] != '1'">
                    <img :src="`${imgPath}front/img/cards/${cards[5]}.png`" />
                  </div>
                  <div class="casino-result-cards-item" v-if="cards[7] != '1'">
                    <img :src="`${imgPath}front/img/cards/${cards[7]}.png`" />
                  </div>
                  <div class="casino-result-cards-item" v-if="cards[9] != '1'">
                    <img :src="`${imgPath}front/img/cards/${cards[9]}.png`" />
                  </div>
                  <div class="casino-result-cards-item" v-if="cards[11] != '1'">
                    <img :src="`${imgPath}front/img/cards/${cards[11]}.png`" />
                  </div>
                  <div class="casino-result-cards-item" v-if="cards[13] != '1'">
                    <img :src="`${imgPath}front/img/cards/${cards[13]}.png`" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-5">
          <div class="casino-result-desc" v-if="desc && desc.length">
            <div class="casino-result-desc-item">
              <div>Main</div>
              <div>{{ desc[0] }}</div>
            </div>
            <div class="casino-result-desc-item" v-if="type != 'teen'">
              <div>Seven</div>
              <div>{{ desc[1] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Picture Card</div>
              <div>{{ desc[2] }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="type == 'patti2'">
      <div class="row row5">
        <div class="col-12 col-lg-8">
          <div class="casino-result-content">
            <div class="casino-result-content-item text-center">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="resultData.win == 1">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
                <div class="d-inline-block">
                  <h4 class="">Player A</h4>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[0]}.png`" />
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[2]}.png`" />
                  </div>
                </div>
              </div>
            </div>
            <div class="casino-result-content-diveder"></div>
            <div class="casino-result-content-item text-center">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="resultData.win == 2">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
                <div class="d-inline-block">
                  <h4 class="">Player B</h4>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[1]}.png`" />
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[3]}.png`" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="casino-result-desc" v-if="desc && desc.length">
            <div class="casino-result-desc-item">
              <div>Winner</div>
              <div>{{ desc[0] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Mini Baccarat</div>
              <div>{{ desc[1] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Total</div>
              <div>{{ desc[2] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Color Plus</div>
              <div>{{ desc[3] }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="type == 'teensin'">
      <div class="row row5">
        <div class="col-12 col-lg-8">
          <div class="casino-result-content">
            <div class="casino-result-content-item text-center">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="resultData.win == 1">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
                <div class="d-inline-block">
                  <h4 class="">Player A</h4>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[0]}.png`" />
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[2]}.png`" />
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[4]}.png`" />
                  </div>
                </div>
              </div>
            </div>
            <div class="casino-result-content-diveder"></div>
            <div class="casino-result-content-item text-center">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="resultData.win == 2">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
                <div class="d-inline-block">
                  <h4 class="">Player B</h4>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[1]}.png`" />
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[3]}.png`" />
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[5]}.png`" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="casino-result-desc" v-if="desc && desc.length">
            <div class="casino-result-desc-item">
              <div>Winner</div>
              <div>{{ desc[0] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>High Card</div>
              <div>{{ desc[1] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Pair</div>
              <div>{{ desc[2] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Color Plus</div>
              <div>{{ desc[3] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Lucky 9</div>
              <div>{{ desc[4] }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="type == 'teenmuf'">
      <div class="row row5">
        <div class="col-12 col-lg-8">
          <div class="casino-result-content">
            <div class="casino-result-content-item text-center">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="resultData.win == 1">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
                <div class="d-inline-block">
                  <h4 class="">Player A</h4>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[0]}.png`" />
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[2]}.png`" />
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[4]}.png`" />
                  </div>
                </div>
              </div>
            </div>
            <div class="casino-result-content-diveder"></div>
            <div class="casino-result-content-item text-center">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="resultData.win == 2">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
                <div class="d-inline-block">
                  <h4 class="">Player B</h4>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[1]}.png`" />
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[3]}.png`" />
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[5]}.png`" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="casino-result-desc" v-if="desc && desc.length">
            <div class="casino-result-desc-item">
              <div>Winner</div>
              <div>{{ desc[0] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Top 9</div>
              <div>{{ desc[1] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>M Baccarat</div>
              <div>{{ desc[2] }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="type == 'race17'">
      <div class="row row5 worli-result">
        <div class="col-12 col-lg-7" v-if="cards && cards.length">
          <div class="casino-result-content">
            <div class="casino-result-content-item text-center w-100">
              <div class="casino-result-cards">
                <template v-for="(card, key) in cards">
                  <template v-if="card != '1'">
                    <div class="casino-result-cards-item mr-1" :key="key">
                      <img :src="`${imgPath}front/img/cards/${card}.png`" />
                    </div>
                  </template>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-5">
          <div class="casino-result-desc" v-if="desc && desc.length">
            <div class="casino-result-desc-item">
              <div>Race to 17</div>
              <div>{{ desc[0] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Big Card</div>
              <div>{{ desc[1] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Zero Card</div>
              <div>{{ desc[2] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>One Zero Card</div>
              <div>{{ desc[3] }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="type == 'teen20b'">
      <div class="row row5">
        <div class="col-12 col-lg-8">
          <div class="casino-result-content">
            <div class="casino-result-content-item text-center">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="resultData.win == 1">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
                <div class="d-inline-block">
                  <h4 class="">Player A</h4>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[0]}.png`" />
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[2]}.png`" />
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[4]}.png`" />
                  </div>
                </div>
              </div>
            </div>
            <div class="casino-result-content-diveder"></div>
            <div class="casino-result-content-item text-center">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="resultData.win == 2">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
                <div class="d-inline-block">
                  <h4 class="">Player B</h4>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[1]}.png`" />
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[3]}.png`" />
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[5]}.png`" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="casino-result-desc" v-if="desc && desc.length">
            <div class="casino-result-desc-item">
              <div>Winner</div>
              <div>{{ desc[0] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>3 Baccarat</div>
              <div>{{ desc[1].split('~')[0] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div></div>
              <div>{{ desc[1].split('~')[1] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Total</div>
              <div>{{ desc[2] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Pair Plus</div>
              <div>{{ desc[3] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Color</div>
              <div>{{ desc[4] }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="type == 'trio'">
      <div class="row row5 worli-result">
        <div class="col-12 col-lg-7" v-if="cards && cards.length">
          <div class="casino-result-content">
            <div class="casino-result-content-item text-center w-100">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item">
                  <img :src="`${imgPath}front/img/cards/${cards[0]}.png`" />
                </div>
                <div class="casino-result-cards-item">
                  <img :src="`${imgPath}front/img/cards/${cards[1]}.png`" />
                </div>
                <div class="casino-result-cards-item">
                  <img :src="`${imgPath}front/img/cards/${cards[2]}.png`" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-5">
          <div class="casino-result-desc" v-if="desc && desc.length">
            <div class="casino-result-desc-item">
              <div>Session (21)</div>
              <div>{{ desc[0] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>1 2 4 / J Q K</div>
              <div>{{ desc[1] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Red/Black</div>
              <div>{{ desc[2] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Odd/Even</div>
              <div>{{ desc[3] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Pattern</div>
              <div>{{ desc[4] }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="type == 'notenum'">
      <div class="row row5 worli-result">
        <div class="col-12 col-lg-7" v-if="cards && cards.length">
          <div class="casino-result-content">
            <div class="casino-result-content-item text-center w-100">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item">
                  <img :src="`${imgPath}front/img/cards/${cards[0]}.png`" />
                </div>
                <div class="casino-result-cards-item">
                  <img :src="`${imgPath}front/img/cards/${cards[1]}.png`" />
                </div>
                <div class="casino-result-cards-item">
                  <img :src="`${imgPath}front/img/cards/${cards[2]}.png`" />
                </div>
                <div class="casino-result-cards-item">
                  <img :src="`${imgPath}front/img/cards/${cards[3]}.png`" />
                </div>
                <div class="casino-result-cards-item">
                  <img :src="`${imgPath}front/img/cards/${cards[4]}.png`" />
                </div>
                <div class="casino-result-cards-item">
                  <img :src="`${imgPath}front/img/cards/${cards[5]}.png`" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-5">
          <div class="casino-result-desc" v-if="desc && desc.length">
            <div class="casino-result-desc-item">
              <div>Odd/Even</div>
              <div>{{ desc[0] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Red/Black</div>
              <div>{{ desc[1] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Low/High</div>
              <div>{{ desc[2] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Cards</div>
              <div>{{ desc[3] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Baccarat</div>
              <div>{{ desc[4] }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="type == 'teen2024'">
      <div class="row row5">
        <div class="col-12 col-lg-7" v-if="cards && cards.length">
          <div class="casino-result-content">
            <div class="casino-result-content-item text-center">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="resultData.win == 1">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
                <div class="d-inline-block">
                  <h4 class="">Player 20</h4>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[0]}.png`" />
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[2]}.png`" />
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[4]}.png`" />
                  </div>
                </div>
              </div>
            </div>
            <div class="casino-result-content-diveder"></div>
            <div class="casino-result-content-item text-center">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="resultData.win == 2">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
                <div class="d-inline-block">
                  <h4 class="">Player 24</h4>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[1]}.png`" />
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[3]}.png`" />
                  </div>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[5]}.png`" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-5">
          <div class="casino-result-desc" v-if="desc && desc.length">
            <div class="casino-result-desc-item">
              <div>Main</div>
              <div>{{ desc[0] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Consecutive</div>
              <div>{{ desc[1] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Pair</div>
              <div>{{ desc[2] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Straight</div>
              <div>{{ desc[3] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>Session</div>
              <div>{{ desc[4] }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="type == 'kbc'">
      <div class="row row5 worli-result">
        <div class="col-12 col-lg-6" v-if="cards && cards.length">
          <div class="casino-result-content">
            <div class="casino-result-content-item text-center w-100">
              <div class="casino-result-cards">
                <template v-for="(card, key) in cards">
                  <template v-if="card != '1'">
                    <div class="casino-result-cards-item" :key="key">
                      <img :src="`${imgPath}front/img/cards/${card}.png`" />
                    </div>
                  </template>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="casino-result-desc" v-if="desc && desc.length">
            <div class="casino-result-desc-item">
              <div>[Q1] Red-Black</div>
              <div>{{ desc[0] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>[Q2] Odd-Even</div>
              <div>{{ desc[1] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>[Q3] 7 Up-7 Down</div>
              <div>{{ desc[2] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>[Q4] 3 Card Judgement</div>
              <div>{{ desc[3] }}</div>
            </div>
            <div class="casino-result-desc-item">
              <div>[Q5] Suits</div>
              <div>{{ desc[4] }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="type == 'teen1' || type == 'teen120'">
      <div class="row row5">
        <div class="col-12 col-lg-7" v-if="cards && cards.length">
          <div class="casino-result-content">
            <div class="casino-result-content-item text-center">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="resultData.win == 1">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
                <div class="d-inline-block">
                  <h4 class="">Player</h4>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[0]}.png`" />
                  </div>
                </div>
              </div>
            </div>
            <div class="casino-result-content-diveder"></div>
            <div class="casino-result-content-item text-center">
              <div class="casino-result-cards">
                <div class="casino-result-cards-item" v-if="resultData.win == 2">
                  <img :src="imgPath + 'front/img/winner.png'" class="winner-icon" />
                </div>
                <div class="d-inline-block">
                  <h4 class="">Dealer</h4>
                  <div class="casino-result-cards-item">
                    <img :src="`${imgPath}front/img/cards/${cards[1]}.png`" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-5">
          <div class="casino-result-desc" v-if="desc && desc.length">
            <div class="casino-result-desc-item">
              <div>Winner</div>
              <div>{{ desc[0] }}</div>
            </div>
            <div class="casino-result-desc-item" v-if="type != 'teen' && type != 'vteen'">
              <div>
                <template v-if="type=='teen120'">Pair</template>
                <template v-else-if="type=='teen1'">7 Up - 7 Down</template>
              </div>
              <div>{{ desc[1] }}</div>
            </div>
            
          </div>
        </div>
      </div>
    </template>
    
    </div>
</template>

<script>
    export default {
        mounted(){
            this.type = _.get(this.resultData,'gType')
           
            this.cards = _.get(this.resultData,'card') ? _.get(this.resultData,'card').split(',') : []
            this.desc = _.get(this.resultData,'rdesc').split('#')
            this.winners = _.get(this.resultData, "win") ? _.get(this.resultData, "win").split(",") : [];

            if (this.type == "card32" || this.type == "card32eu") {
              var playerNo = 1;

              for (const card of this.cards) {
                if (playerNo > 4) playerNo = 1;

                if (card != "1") {
                  if (playerNo == 1) {
                    this.card32.players.p1.cards.push(card);
                    this.card32.players.p1.count += this.getCardValue(card);
                  }

                  if (playerNo == 2) {
                    this.card32.players.p2.cards.push(card);
                    this.card32.players.p2.count += this.getCardValue(card);
                  }

                  if (playerNo == 3) {
                    this.card32.players.p3.cards.push(card);
                    this.card32.players.p3.count += this.getCardValue(card);
                  }

                  if (playerNo == 4) {
                    this.card32.players.p4.cards.push(card);
                    this.card32.players.p4.count += this.getCardValue(card);
                  }
                }
                playerNo++;
              }
            }

            if (this.type == "queen") {
              var playerNo = 1;

              for (const card of this.cards) {
                if (playerNo > 4) playerNo = 1;

                if (card != "1") {
                  if (playerNo == 1) {
                    this.queen.players.p1.cards.push(card);
                    this.queen.players.p1.count += this.getCardValue(card);
                  }

                  if (playerNo == 2) {
                    this.queen.players.p2.cards.push(card);
                    this.queen.players.p2.count += this.getCardValue(card);
                  }

                  if (playerNo == 3) {
                    this.queen.players.p3.cards.push(card);
                    this.queen.players.p3.count += this.getCardValue(card);
                  }

                  if (playerNo == 4) {
                    this.queen.players.p4.cards.push(card);
                    this.queen.players.p4.count += this.getCardValue(card);
                  }
                }
                playerNo++;
              }
            }

            if (this.type == 'ab20') {
              let type = 'b'
              this.cards.forEach(card => {
                if (type == 'b') {
                  this.ab.bahar.push(card)
                  type = 'a'
                } else if (type == 'a') {
                  this.ab.andar.push(card)
                  type = 'b'
                }
              });
            }

            if (this.type == 'race20') {
              var spadeCard = []
              var heartCard = []
              var clubCard = []
              var diamondCard = []
             
              for (const card of this.cards) {
                  let type = ""
                  if (card != 1) {
                      if (card.length == 4) {
                          type = card.slice(2)
                      } else {
                          type = card.slice(1)
                      }
                  }
                  if (type == "SS") {
                      spadeCard.push(card)
                  } else if (type == "HH") {
                      heartCard.push(card)
                  } else if (type == "CC") {
                      clubCard.push(card)
                  } else if (type == "DD") {
                      diamondCard.push(card)
                  }
              }

              Vue.set(this.race20, 'spadeCard', spadeCard)
              Vue.set(this.race20, 'heartCard', heartCard)
              Vue.set(this.race20, 'clubCard', clubCard)
              Vue.set(this.race20, 'diamondCard', diamondCard)
            }

            if (this.type == 'abj') {
              this.cards.forEach((card, index) => {
                if (card == 1) {
                  return
                }
                if (index > 2) {
                  if (index % 2 != 0) {
                    this.abj.bahar.push(card)
                  } else {
                    this.abj.andar.push(card)
                  }
                }
              })

              setTimeout(() => {
                $('#andarSlider, #baharSlider').owlCarousel({
                  loop: false,
                  margin: 0,
                  responsiveClass: true,
                  slideBy: 5,
                  dots: false,
                  responsive: {
                    0: {
                      items: 4,
                      nav: true
                    },
                    320: {
                      items: 4,
                      nav: true
                    },
                    411: {
                      items: 5,
                      nav: true
                    },
                    500: {
                      items: 6,
                      nav: true
                    },
                    600: {
                      items: 8,
                      nav: true
                    },
                    768: {
                      items: 8,
                      nav: true
                    }
                  }
                });
              }, 800);
            }
            if (this.type == "trap") {
              var playerACards = []
              var playerBCards = []
              this.cards.forEach(function (card, index) {
                if (index % 2 === 0) {
                  if (card != 1)
                    playerACards.push(card)
                } else {
                  if (card != 1)
                    playerBCards.push(card)
                }
              });

              // console.log(playerACards, playerBCards)

              let playerACount = 0;
              for (const card of playerACards) {
                let cardno = "0";
                if (card != 1) {
                  if (card.length == 4) {
                    cardno = card.slice(0, 2);
                  } else {
                    cardno = card.slice(0, 1);
                  }
                }

                if (cardno == "K") {
                  cardno = 13;
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
                playerACount += parseInt(cardno);
              }
              this.trap.count.playerA = playerACount;

              let playerBCount = 0;
              for (const card of playerBCards) {
                let cardno = "0";
                if (card != 1) {
                  if (card.length == 4) {
                    cardno = card.slice(0, 2);
                  } else {
                    cardno = card.slice(0, 1);
                  }
                }

                if (cardno == "K") {
                  cardno = 13;
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
                playerBCount += parseInt(cardno);
              }
              this.trap.count.playerB = playerBCount;
            }
            if (this.type == 'cricketv' || this.type == 'cricketv2' || this.type == 'cricketv3' || this.type == 'superover') {
              let team1Data = [];
              let team1Score = 0;
              let team1Wkt = 0;

              let team2Data = [];
              let team2Score = 0;
              let team2Wkt = 0;
              this.resultData.score.forEach(function (value, k) {
                  let wide = 0;
                  let score = value.card.split(",");
                  let run = [];
                  let runClass = "";
                  score.forEach(function (v, key) {
                      if (
                          v == "JCC" ||
                          v == "JSS" ||
                          v == "JHH" ||
                          v == "JDD"
                      ) {
                          wide += 1;
                          run.push("w");
                      }
                  });
                  if (value.wkt == true) {
                      run.push("ww");
                  } else {
                      run.push(value.run - wide);
                  }
                  if ((value.wkt == true || wide > 0)) {
                      runClass = "text-playerb"
                  }

                  if (value.ing == 1) {

                      if (!team1Data[parseInt(value.oc) - 1]) {
                          team1Data[parseInt(value.oc) - 1] = {
                              "run": 0,
                              "score": 0,
                              "wkt": 0,
                              "nat": "",
                              "runData": []
                          };
                      }
                      team1Score += parseInt(value.run);
                      team1Wkt += value.wkt == true ? 1 : 0;
                      team1Data[parseInt(value.oc) - 1].run += parseInt(value.run);
                      team1Data[parseInt(value.oc) - 1].score = team1Score;
                      team1Data[parseInt(value.oc) - 1].wkt = team1Wkt;
                      team1Data[parseInt(value.oc) - 1].nat = value.nat;

                      team1Data[parseInt(value.oc) - 1].runData.push({
                          //ball: value.ball,
                         // nat: value.nat,
                          runText: run.join("+"),
                          run: value.run,
                          runclass: runClass
                      });
                  } else {
                      if (!team2Data[parseInt(value.oc) - 1]) {
                          team2Data[parseInt(value.oc) - 1] = {
                              "run": 0,
                              "score": 0,
                              "wkt": 0,
                              "nat": "",
                              "runData": []
                          };
                      }
                      team2Score += parseInt(value.run);
                      team2Wkt += value.wkt == true ? 1 : 0;
                      team2Data[parseInt(value.oc) - 1].run += parseInt(value.run);
                      team2Data[parseInt(value.oc) - 1].score = team2Score;
                      team2Data[parseInt(value.oc) - 1].wkt = team2Wkt;
                      team2Data[parseInt(value.oc) - 1].nat = value.nat;

                      team2Data[parseInt(value.oc) - 1].runData.push({
                          //ball: value.ball,
                          //nat: value.nat,
                          runText: run.join("+"),
                          run: value.run,
                          runclass: runClass
                      });
                  }


              });
              this.cricketv3.team1Data = team1Data;
              this.cricketv3.team2Data = team2Data;
            }
        },
        props: ['resultData'],
        data(){
            return{
                imgPath: IMG_PATH,
                type: '',
                cards: [],
                desc: [],
                winners: [],
                card32: {
                  players: {
                    p1: {
                      count: 8,
                      cards: [],
                    },
                    p2: {
                      count: 9,
                      cards: [],
                    },
                    p3: {
                      count: 10,
                      cards: [],
                    },
                    p4: {
                      count: 11,
                      cards: [],
                    },
                  },
                },
                queen: {
                  players: {
                    p1: {
                      count: 0,
                      cards: [],
                    },
                    p2: {
                      count: 1,
                      cards: [],
                    },
                    p3: {
                      count: 2,
                      cards: [],
                    },
                    p4: {
                      count: 3,
                      cards: [],
                    },
                  },
                },
                ab: {
                  andar: [],
                  bahar: []
                },
                race20: {
                  spadeCard: [],
                  heartCard: [],
                  clubCard: [],
                  diamondCard: [] 
                },
                trap:{
                  count: {
                    playerA: 0,
                    playerB: 0
                  },
                },
                abj: {
                  andar: [],
                  bahar: []
                },
                cricketv3: {
                  
                }
            }
        },
        methods: {
          getCardValue(card) {
            var cardno = 0;
            if (card.length == 4) {
              cardno = card.slice(0, 2);
            } else {
              cardno = card.slice(0, 1);
            }
            if (cardno == "K") {
              cardno = 13;
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

            return parseInt(cardno);
          },
          changeDateTimeFormat(date) {
            return moment(String(date), "MM-DD-YYYY hh:mm:ss A").format("DD/MM/YYYY HH:mm:ss");
          },
          checkLowCards(card) {
              if (card == 1 || card == "9SS" || card == "10SS") {
                  return false
              }
              if (card.length == 3) {
                  var value = card.slice(0, 1)

                  if (value.toLowerCase() == 'a' || value <= 9) {
                      return true
                  }

              }

          },
          checkHighCards(card) {
              if (card == 1 || card == "9SS" || card == "10SS") {
                  return false
              }
              if (card.length == 3) {
                  var value = card.slice(0, 1)
                  if (value.toLowerCase() == 'j' || value.toLowerCase() == 'k' || value.toLowerCase() == 'q') {
                      return true
                  }
              }
              if (card.length == 4) {
                  var value = card.slice(0, 2)
                  if (value == '10') {
                      return true
                  }
              }
          },
        }
    }
</script>

<style>

</style>