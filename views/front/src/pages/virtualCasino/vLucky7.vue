<template>
    <div class="virtual-casino-container vl-7">
        <VirtualTimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current"
            :width="getSvgWidth()" />
        <template v-if="time.total > 3 && (time.current <= 3 && time.current > 0)">
            <transition name="component-fade" mode="out-in">
                <div :key="time.current" class="casino-time-digit">{{ time.current }}</div>
            </transition>
        </template>
        <div class="virtual-casino-bg">
            <svg id="id_main_bg" viewBox="0 0 2560 1440" fill="none" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="main_bg">
                    <rect id="main-bg" width="2560" height="1440" fill="url(#mainBg)" />
                    <!-- CASINO NAME & ROUND ID START -->
                    <g id="casino_name">
                        <rect id="casino_name_box" x="17.5" y="11.5" width="467" height="96" rx="22.5" fill="#2C153C"
                            fill-opacity="0.5" stroke="#573673" stroke-width="3"></rect>
                        <text id="TEENPATTI 1-DAY" fill="white" xml:space="preserve" font-family="Noto Sans"
                            font-size="40" letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                            <tspan :x="getRectCenterCordinates(467, 17.5)" :y="getRectCenterCordinates(96, 11.5)">
                                {{ gameTitle }}</tspan>
                        </text>
                        <text id="1234567890" fill="#FDCF13" xml:space="preserve" font-family="Noto Sans" font-size="26"
                            letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle">
                            <tspan :x="getRectCenterCordinates(467, 17.5)" :y="getRectCenterCordinates(96, 22)">
                                {{ casinoData.mid }}</tspan>
                        </text>
                    </g>
                    <!-- CASINO NAME & ROUND ID END -->
                    <!-- LAST RESULTS START -->
                    <template v-if="$store.state.lastResults">
                        <g id="last_results">
                            <rect id="last_result_bg" x="2138.5" y="97.5" width="410" height="139" rx="6.5"
                                fill="#2C153C" fill-opacity="0.5" stroke="#573673" stroke-width="3"></rect>

                            <g id="last_result_1" style="cursor: pointer;" @click="showResult(0)">
                                <rect id="last_result1-box" x="2143.5" y="103.5" width="59" height="59" rx="3.5"
                                    stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                <text id="A" :fill="getResultColor(0)" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="50" font-weight="bold" letter-spacing="0em">
                                    <tspan x="2155.74" y="152.397">{{ getResultLable(0) }}</tspan>
                                </text>
                            </g>

                            <g id="last_result_2" style="cursor: pointer;" @click="showResult(1)">
                                <rect id="last_result2-box" x="2213.5" y="103.5" width="59" height="59" rx="3.5"
                                    stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                <text id="B" :fill="getResultColor(1)" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="50" font-weight="bold" letter-spacing="0em">
                                    <tspan x="2226.2" y="152.397">{{ getResultLable(1) }}</tspan>
                                </text>
                            </g>

                            <g id="last_result_3" style="cursor: pointer;" @click="showResult(2)">
                                <rect id="last_result3-box" x="2283.5" y="103.5" width="59" height="59" rx="3.5"
                                    stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                <text id="A_2" :fill="getResultColor(2)" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="50" font-weight="bold" letter-spacing="0em">
                                    <tspan x="2295.74" y="152.397">{{ getResultLable(2) }}</tspan>
                                </text>
                            </g>

                            <g id="last_result_4" style="cursor: pointer;" @click="showResult(3)">
                                <rect id="last_result4-box" x="2353.5" y="103.5" width="59" height="59" rx="3.5"
                                    stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                <text id="B_2" :fill="getResultColor(3)" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="50" font-weight="bold" letter-spacing="0em">
                                    <tspan x="2366.2" y="152.397">{{ getResultLable(3) }}</tspan>
                                </text>
                            </g>

                            <g id="last_result_5" style="cursor: pointer;" @click="showResult(4)">
                                <rect id="last_result5-box" x="2423.5" y="103.5" width="59" height="59" rx="3.5"
                                    stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                <text id="A_3" :fill="getResultColor(4)" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="50" font-weight="bold" letter-spacing="0em">
                                    <tspan x="2435.74" y="152.397">{{ getResultLable(4) }}</tspan>
                                </text>
                            </g>

                            <g id="last_result_6" style="cursor: pointer;" @click="showResult(5)">
                                <rect id="last_result6-box" x="2143.5" y="171.5" width="59" height="59" rx="3.5"
                                    stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                <text id="B_3" :fill="getResultColor(5)" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="50" font-weight="bold" letter-spacing="0em">
                                    <tspan x="2156.2" y="220.397">{{ getResultLable(5) }}</tspan>
                                </text>
                            </g>

                            <g id="last_result_7" style="cursor: pointer;" @click="showResult(6)">
                                <rect id="last_result7-box" x="2213.5" y="171.5" width="59" height="59" rx="3.5"
                                    stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                <text id="A_4" :fill="getResultColor(6)" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="50" font-weight="bold" letter-spacing="0em">
                                    <tspan x="2225.74" y="220.397">{{ getResultLable(6) }}</tspan>
                                </text>
                            </g>

                            <g id="last_result_8" style="cursor: pointer;" @click="showResult(7)">
                                <rect id="last_result8-box" x="2283.5" y="171.5" width="59" height="59" rx="3.5"
                                    stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                <text id="B_4" :fill="getResultColor(7)" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="50" font-weight="bold" letter-spacing="0em">
                                    <tspan x="2296.2" y="220.397">{{ getResultLable(7) }}</tspan>
                                </text>
                            </g>

                            <g id="last_result_9" style="cursor: pointer;" @click="showResult(8)">
                                <rect id="last_result9-box" x="2353.5" y="171.5" width="59" height="59" rx="3.5"
                                    stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                <text id="A_5" :fill="getResultColor(8)" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="50" font-weight="bold" letter-spacing="0em">
                                    <tspan x="2365.74" y="220.397">{{ getResultLable(8) }}</tspan>
                                </text>
                            </g>

                            <g id="last_result_10" style="cursor: pointer;" @click="showResult(9)">
                                <rect id="last_result10-box" x="2423.5" y="171.5" width="59" height="59" rx="3.5"
                                    stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                <text id="B_5" :fill="getResultColor(9)" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="50" font-weight="bold" letter-spacing="0em">
                                    <tspan x="2436.2" y="220.397">{{ getResultLable(9) }}</tspan>
                                </text>
                            </g>


                            <router-link class="result-more"
                                :to="{name: 'casinoResult', params: {gameType: $store.state.casinoGameType}}">
                                <g id="last_result_all" style="cursor: pointer;">
                                    <rect id="more_result" x="2491" y="141" width="51" height="52"
                                        fill="url(#lastResultPlusIcon)"></rect>
                                </g>
                            </router-link>
                        </g>
                    </template>
                    <!-- LAST RESULTS END -->
                    <!-- MY BETS START -->
                    <g id="my_bet" @click="showMyBetsModal()" style="cursor: pointer;">
                        <rect id="my_bet_box" x="37.5" y="143.5" width="329" height="69" rx="22.5" fill="#2C153C"
                            fill-opacity="0.5" stroke="#573673" stroke-width="3"></rect>
                        <g id="bets_count">
                            <circle id="bet_count_bg" cx="56" cy="178" r="44" fill="black" stroke="#FDCF13"
                                stroke-width="4"></circle>
                            <text id="99" fill="white" xml:space="preserve" style="white-space: pre"
                                font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                dominant-baseline="middle" text-anchor="middle">
                                <!-- <tspan x="55" y="180">{{ $store.getters.betCasinoSodaTotal }}</tspan> -->
                                <tspan x="56" y="178">{{ $store.getters.betCasinoSodaTotal }}</tspan>
                            </text>
                        </g>
                        <text id="MY BETS" fill="white" xml:space="preserve" style="white-space: pre"
                            font-family="Noto Sans" font-size="44" letter-spacing="0em">
                            <tspan x="126" y="195.069">MY BETS</tspan>
                        </text>
                    </g>
                    <!-- MY BETS END -->
                    <!-- HOME ICON START -->
                    <router-link :to="{name: 'owncasinolist'}">
                        <g id="home_icon_box" style="cursur:pointer;">
                            <circle id="home_icon_bg" cx="2449" cy="40" r="29" fill="url(#homeIcon)" fill-opacity="0.5"
                                stroke="#FFCE38" stroke-width="2"></circle>
                            <path id="home_icon"
                                d="M2449.9 31.0799L2435.5 42.9445V55.7499C2435.5 56.0814 2435.63 56.3994 2435.87 56.6338C2436.1 56.8683 2436.42 57 2436.75 57L2445.5 56.9773C2445.83 56.9757 2446.15 56.8432 2446.38 56.609C2446.62 56.3747 2446.75 56.0577 2446.75 55.7272V48.249C2446.75 47.9175 2446.88 47.5995 2447.11 47.365C2447.35 47.1306 2447.67 46.9989 2448 46.9989H2453C2453.33 46.9989 2453.65 47.1306 2453.88 47.365C2454.12 47.5995 2454.25 47.9175 2454.25 48.249V55.7217C2454.25 55.8862 2454.28 56.0492 2454.34 56.2013C2454.4 56.3535 2454.5 56.4917 2454.61 56.6082C2454.73 56.7247 2454.87 56.8172 2455.02 56.8802C2455.17 56.9433 2455.33 56.9758 2455.5 56.9758L2464.25 57C2464.58 57 2464.9 56.8683 2465.13 56.6338C2465.37 56.3994 2465.5 56.0814 2465.5 55.7499V42.9359L2451.1 31.0799C2450.93 30.9434 2450.72 30.869 2450.5 30.869C2450.28 30.869 2450.07 30.9434 2449.9 31.0799ZM2472.65 39.1441L2466.12 33.7599V22.9376C2466.12 22.6889 2466.02 22.4505 2465.85 22.2746C2465.67 22.0988 2465.43 22 2465.19 22H2460.81C2460.56 22 2460.32 22.0988 2460.15 22.2746C2459.97 22.4505 2459.87 22.6889 2459.87 22.9376V28.6109L2452.88 22.8556C2452.21 22.3031 2451.37 22.0011 2450.5 22.0011C2449.63 22.0011 2448.79 22.3031 2448.11 22.8556L2428.34 39.1441C2428.25 39.2226 2428.17 39.319 2428.11 39.4278C2428.05 39.5367 2428.02 39.6558 2428 39.7784C2427.99 39.9011 2428.01 40.0248 2428.04 40.1425C2428.08 40.2602 2428.14 40.3697 2428.22 40.4646L2430.21 42.8867C2430.29 42.9819 2430.38 43.0608 2430.49 43.1187C2430.6 43.1767 2430.72 43.2126 2430.84 43.2244C2430.96 43.2363 2431.09 43.2238 2431.21 43.1877C2431.32 43.1516 2431.43 43.0926 2431.53 43.0141L2449.9 27.8764C2450.07 27.74 2450.28 27.6655 2450.5 27.6655C2450.72 27.6655 2450.93 27.74 2451.1 27.8764L2469.47 43.0141C2469.57 43.0926 2469.68 43.1517 2469.8 43.1879C2469.91 43.2241 2470.04 43.2368 2470.16 43.2251C2470.28 43.2135 2470.4 43.1779 2470.51 43.1202C2470.62 43.0625 2470.72 42.984 2470.79 42.889L2472.79 40.4669C2472.87 40.3715 2472.92 40.2615 2472.96 40.1432C2473 40.025 2473.01 39.9008 2473 39.7779C2472.98 39.655 2472.95 39.5357 2472.89 39.4269C2472.83 39.3182 2472.75 39.222 2472.65 39.1441Z"
                                fill="white"></path>
                        </g>
                    </router-link>
                    <!-- HOME ICON END -->
                    <!-- RULES ICON START -->
                    <g id="rule_icon_box" @click="getCasinoRulesHtml()" style="cursur:pointer;">
                        <circle id="rule_icon_bg" cx="2520" cy="40" r="29" fill="url(#rulesIcon)" fill-opacity="0.5"
                            stroke="#FFCE38" stroke-width="2"></circle>
                        <path id="rule_icon"
                            d="M2514.56 53.1429H2516.12V41.8571H2514.56C2513.7 41.8571 2513 41.1576 2513 40.2946V36.5625C2513 35.6995 2513.7 35 2514.56 35H2523.31C2524.18 35 2524.88 35.6995 2524.88 36.5625V53.1429H2526.44C2527.3 53.1429 2528 53.8424 2528 54.7054V58.4375C2528 59.3005 2527.3 60 2526.44 60H2514.56C2513.7 60 2513 59.3005 2513 58.4375V54.7054C2513 53.8424 2513.7 53.1429 2514.56 53.1429ZM2520.5 20C2517.39 20 2514.88 22.5184 2514.88 25.625C2514.88 28.7316 2517.39 31.25 2520.5 31.25C2523.61 31.25 2526.12 28.7316 2526.12 25.625C2526.12 22.5184 2523.61 20 2520.5 20Z"
                            fill="white"></path>
                    </g>
                    <!-- RULES ICON END -->

                    <!-- <rect id="logo" x="15" y="1177" width="323" height="227" fill="url(#pattern2)" /> -->
                    <rect id="winnera" v-if="casinoData.rdesc == '1'" x="486" y="418" width="420" height="444"
                        fill="url(#winnerIcon)" />
                    <rect id="winnerb" v-if="casinoData.rdesc == '2'" x="1802" y="418" width="420" height="444"
                        fill="url(#winnerIcon)" />
                </g>
                <defs>
                    <pattern id="lastResultPlusIcon" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#plusIcon" transform="translate(-0.00478122) scale(0.0050227)"></use>
                    </pattern>
                    <pattern id="mainBg" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#mainBgImg" transform="scale(0.000390625 0.000694444)" />
                    </pattern>
                    <pattern id="winnerIcon" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#winnerTrophyImg"
                            transform="translate(-0.0285714) scale(0.00412946 0.00390625)" />
                    </pattern>
                    <linearGradient id="paint0_linear" x1="2449" y1="10" x2="2449" y2="70"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F29603" />
                        <stop offset="1" stop-color="#B56100" />
                    </linearGradient>
                    <linearGradient id="paint1_linear" x1="2520" y1="10" x2="2520" y2="70"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F29603" />
                        <stop offset="1" stop-color="#B56100" />
                    </linearGradient>
                    <image id="winnerTrophyImg" data-name="winner.png" width="256" height="256"
                        :href="`${imgPath}front/img/svg_casino/icons/winner-left.png`">
                    </image>

                    <image id="mainBgImg" data-name="main-bg.jpg" width="2560" height="1440"
                        :href="`${imgPath}front/img/svg_casino/casino_bg/lucky7bg.jpg`">
                    </image>
                    <image id="plusIcon" data-name="more.png" width="201" height="203"
                        xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAADLCAYAAADEDrcOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDZGMTEwRkJGNUUzMTFFQjlFNkNBM0M5REZERDRDREIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDZGMTEwRkNGNUUzMTFFQjlFNkNBM0M5REZERDRDREIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNkYxMTBGOUY1RTMxMUVCOUU2Q0EzQzlERkRENENEQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNkYxMTBGQUY1RTMxMUVCOUU2Q0EzQzlERkRENENEQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvplFlQAAAZqSURBVHja7N1PiJR1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">
                    </image>
                </defs>
            </svg>

        </div>
        <div class="virtual-casino-odds d-none-small" v-if="mainData && mainData.length > 0">
            <div>
                <svg viewBox="0 0 2487 794" fill="none" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="odds">
                        <g id="player_b_cards">
                            <g id="pb_card1">
                                <rect id="pb_card1_box" x="1577.5" y="106.5" width="89.6429" height="123.214" rx="3.5"
                                    stroke="black"></rect>
                                <rect id="pb_card1_img" x="1580.36" y="109.357" width="83.9286" height="117.5"
                                    fill="url(#card1Icon)" v-if="checkLowCards(cards[0])"></rect>
                            </g>
                        </g>
                        <g id="player_a_cards">
                            <g id="pa_card1">
                                <rect id="pa_card1_box" x="832.5" y="106.286" width="89.6429" height="123.214" rx="3.5"
                                    stroke="black"></rect>
                                <rect id="pa_card1_img" x="835.357" y="109.143" width="83.9286" height="117.5"
                                    fill="url(#card1Icon)" v-if="checkHighCards(cards[0])"></rect>
                            </g>
                        </g>
                        <g id="player_title">
                            <text id="A TO 6" fill="#EF0518" xml:space="preserve" style="white-space: pre"
                                font-family="Noto Sans" font-size="70" font-weight="bold" letter-spacing="0em">
                                <tspan x="768.091" y="82.6558">A TO 6</tspan>
                            </text>
                            <text id="8 TO K" fill="#00A200" xml:space="preserve" style="white-space: pre"
                                font-family="Noto Sans" font-size="70" font-weight="bold" letter-spacing="0em">
                                <tspan x="1514.01" y="74.6558">8 TO K</tspan>
                            </text>
                        </g>
                        <g id="main_odds">
                            <g id="low" style="cursor: pointer;" @click="setBetData(0, 'back')">
                                <rect id="low_box" x="700" y="254" width="355" height="123" rx="6" fill="#EF0518"
                                    fill-opacity="0.1" stroke="#F46A59" stroke-width="4"></rect>
                                <text id="LOW" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="60" font-weight="bold" letter-spacing="0em">
                                    <tspan x="720.207" y="318.469">{{ mainData[0].nat }}</tspan>
                                </text>
                                <text id="1.99" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                    text-anchor="end" dominant-baseline="text-top">
                                    <tspan :x="getRectRightCordinates(355, 700, 20)"
                                        :y="getRectCenterCordinates(123, 254)">{{ mainData[0].b }}</tspan>
                                </text>
                                <g id="low_suspended" v-if="mainData[0].gstatus != 'OPEN'">
                                    <g id="low_suspended_box">
                                        <rect x="698" y="251" width="359" height="127" rx="8" fill="black"
                                            fill-opacity="0.3"></rect>
                                        <rect x="698" y="251" width="359" height="127" rx="8" stroke="#F46A59"></rect>
                                    </g>
                                    <path id="low_lock"
                                        d="M903.821 294.688H900.232V283.859C900.232 271.257 890.033 261 877.5 261C864.967 261 854.768 271.257 854.768 283.859V294.688H851.179C847.215 294.688 844 297.921 844 301.906V330.781C844 334.767 847.215 338 851.179 338H903.821C907.785 338 911 334.767 911 330.781V301.906C911 297.921 907.785 294.688 903.821 294.688ZM888.268 294.688H866.732V283.859C866.732 277.889 871.563 273.031 877.5 273.031C883.437 273.031 888.268 277.889 888.268 283.859V294.688Z"
                                        fill="white"></path>
                                </g>
                                <text id="10000" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(355, 700)"
                                        :y="getRectCenterCordinates(123, 254, 18)"
                                        :class="{'suspended-book': mainData[0].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[0].sid}"></tspan>
                                </text>
                            </g>

                            <g id="high" style="cursor: pointer;" @click="setBetData(1, 'back')">
                                <rect id="tiger_box" x="1445" y="254" width="355" height="123" rx="6" fill="#00A200"
                                    fill-opacity="0.1" stroke="#00A200" stroke-width="4"></rect>
                                <text id="HIGH" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="60" font-weight="bold" letter-spacing="0em">
                                    <tspan x="1463.41" y="320.469">{{ mainData[1].nat }}</tspan>
                                </text>
                                <text id="1.99_2" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                    text-anchor="end" dominant-baseline="text-top">
                                    <tspan :x="getRectRightCordinates(355, 1445, 20)"
                                        :y="getRectCenterCordinates(123, 254)">{{ mainData[1].b }}</tspan>
                                </text>
                                <g id="high_suspended" v-if="mainData[1].gstatus != 'OPEN'">
                                    <g id="high_suspended_box">
                                        <rect x="1443" y="251" width="359" height="127" rx="8" fill="black"
                                            fill-opacity="0.3"></rect>
                                        <rect x="1443" y="251" width="359" height="127" rx="8" stroke="#F46A59"></rect>
                                    </g>
                                    <path id="high_lock"
                                        d="M1648.82 294.688H1645.23V283.859C1645.23 271.257 1635.03 261 1622.5 261C1609.97 261 1599.77 271.257 1599.77 283.859V294.688H1596.18C1592.22 294.688 1589 297.921 1589 301.906V330.781C1589 334.767 1592.22 338 1596.18 338H1648.82C1652.78 338 1656 334.767 1656 330.781V301.906C1656 297.921 1652.78 294.688 1648.82 294.688ZM1633.27 294.688H1611.73V283.859C1611.73 277.889 1616.56 273.031 1622.5 273.031C1628.44 273.031 1633.27 277.889 1633.27 283.859V294.688Z"
                                        fill="white"></path>
                                </g>
                                <text id="10000_2" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(355, 1445)"
                                        :y="getRectCenterCordinates(123, 254, 18)"
                                        :class="{'suspended-book': mainData[1].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[1].sid}"></tspan>
                                </text>
                            </g>
                        </g>

                        <g id="other_odds">
                            <g id="dragon_even" style="cursor: pointer;" @click="setBetData(2, 'back')">
                                <rect id="dragon_even_box" x="2" y="431" width="285" height="123" rx="6" fill="black"
                                    fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                <text id="EVEN" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="60" font-weight="bold" letter-spacing="0em">
                                    <tspan x="21.2656" y="497.469">{{ mainData[2].nat }}</tspan>
                                </text>
                                <text id="1.99_3" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                    text-anchor="end" dominant-baseline="text-top">
                                    <tspan :x="getRectRightCordinates(285, 1, 20)"
                                        :y="getRectCenterCordinates(123, 431)">{{ mainData[2].b }}</tspan>
                                </text>
                                <g id="dragon_even_suspended" v-if="mainData[2].gstatus != 'OPEN'">
                                    <g id="dragon_even_suspended_box">
                                        <rect x="1" y="428" width="288" height="127" rx="8" fill="black"
                                            fill-opacity="0.3"></rect>
                                        <rect x="1" y="428" width="288" height="127" rx="8" stroke="#F46A59"></rect>
                                    </g>
                                    <path id="dragon_even_lock"
                                        d="M170.821 471.688H167.232V460.859C167.232 448.257 157.033 438 144.5 438C131.967 438 121.768 448.257 121.768 460.859V471.688H118.179C114.215 471.688 111 474.921 111 478.906V507.781C111 511.767 114.215 515 118.179 515H170.821C174.785 515 178 511.767 178 507.781V478.906C178 474.921 174.785 471.688 170.821 471.688ZM155.268 471.688H133.732V460.859C133.732 454.889 138.563 450.031 144.5 450.031C150.437 450.031 155.268 454.889 155.268 460.859V471.688Z"
                                        fill="white"></path>
                                </g>
                                <text id="10000_3" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(285, 2)"
                                        :y="getRectCenterCordinates(123, 431, 18)"
                                        :class="{'suspended-book': mainData[2].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[2].sid}"></tspan>
                                </text>
                            </g>

                            <g id="dragon_odd" style="cursor: pointer;" @click="setBetData(3, 'back')">
                                <rect id="dragon_odd_box" x="316" y="431" width="285" height="123" rx="6" fill="black"
                                    fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                <text id="ODD" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="60" font-weight="bold" letter-spacing="0em">
                                    <tspan x="335.32" y="497.469">{{ mainData[3].nat }}</tspan>
                                </text>
                                <text id="1.99_4" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                    text-anchor="end" dominant-baseline="text-top">
                                    <tspan :x="getRectRightCordinates(285, 316, 20)"
                                        :y="getRectCenterCordinates(123, 431)">{{ mainData[3].b }}</tspan>
                                </text>
                                <g id="dragon_odd_suspended" v-if="mainData[3].gstatus != 'OPEN'">
                                    <g id="dragon_odd_suspended_box">
                                        <rect x="315" y="428" width="288" height="127" rx="8" fill="black"
                                            fill-opacity="0.3"></rect>
                                        <rect x="315" y="428" width="288" height="127" rx="8" stroke="#F46A59"></rect>
                                    </g>
                                    <path id="dragon_odd_lock"
                                        d="M484.821 471.688H481.232V460.859C481.232 448.257 471.033 438 458.5 438C445.967 438 435.768 448.257 435.768 460.859V471.688H432.179C428.215 471.688 425 474.921 425 478.906V507.781C425 511.767 428.215 515 432.179 515H484.821C488.785 515 492 511.767 492 507.781V478.906C492 474.921 488.785 471.688 484.821 471.688ZM469.268 471.688H447.732V460.859C447.732 454.889 452.563 450.031 458.5 450.031C464.437 450.031 469.268 454.889 469.268 460.859V471.688Z"
                                        fill="white"></path>
                                </g>
                                <text id="10000_4" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(285, 316)"
                                        :y="getRectCenterCordinates(123, 431, 18)"
                                        :class="{'suspended-book': mainData[3].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[3].sid}"></tspan>
                                </text>
                            </g>

                            <g id="dragon_black" style="cursor: pointer;" @click="setBetData(5, 'back')">
                                <rect id="dragon_black_box" x="630" y="431" width="285" height="123" rx="6" fill="black"
                                    fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                <text id="1.99_5" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                    text-anchor="end" dominant-baseline="text-top">
                                    <tspan :x="getRectRightCordinates(285, 630, 20)"
                                        :y="getRectCenterCordinates(123, 431)">{{ mainData[5].b }}</tspan>
                                </text>
                                <rect id="spade" x="646" y="441" width="60" height="60" fill="url(#pattern2)"></rect>
                                <rect id="club" x="696" y="441" width="60" height="60" fill="url(#pattern3)"></rect>
                                <g id="dragon_black_suspended" v-if="mainData[5].gstatus != 'OPEN'">
                                    <g id="dragon_black_suspended_box">
                                        <rect x="629" y="428" width="288" height="127" rx="8" fill="black"
                                            fill-opacity="0.3"></rect>
                                        <rect x="629" y="428" width="288" height="127" rx="8" stroke="#F46A59"></rect>
                                    </g>
                                    <path id="dragon_black_lock"
                                        d="M798.821 471.688H795.232V460.859C795.232 448.257 785.033 438 772.5 438C759.967 438 749.768 448.257 749.768 460.859V471.688H746.179C742.215 471.688 739 474.921 739 478.906V507.781C739 511.767 742.215 515 746.179 515H798.821C802.785 515 806 511.767 806 507.781V478.906C806 474.921 802.785 471.688 798.821 471.688ZM783.268 471.688H761.732V460.859C761.732 454.889 766.563 450.031 772.5 450.031C778.437 450.031 783.268 454.889 783.268 460.859V471.688Z"
                                        fill="white"></path>
                                </g>
                                <text id="10000_5" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(285, 630)"
                                        :y="getRectCenterCordinates(123, 431, 18)"
                                        :class="{'suspended-book': mainData[5].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[5].sid}"></tspan>
                                </text>
                            </g>

                            <g id="dragon_red" style="cursor: pointer;" @click="setBetData(4, 'back')">
                                <rect id="dragon_red_box" x="944" y="431" width="285" height="123" rx="6" fill="black"
                                    fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                <text id="1.99_6" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                    text-anchor="end" dominant-baseline="text-top">
                                    <tspan :x="getRectRightCordinates(285, 944, 20)"
                                        :y="getRectCenterCordinates(123, 431)">{{ mainData[4].b }}</tspan>
                                </text>
                                <rect id="heart" x="963" y="441" width="60" height="60" fill="url(#pattern4)"></rect>
                                <rect id="diamond" x="1018" y="441" width="60" height="60" fill="url(#pattern5)"></rect>
                                <g id="dragon_red_suspended" v-if="mainData[4].gstatus != 'OPEN'">
                                    <g id="dragon_red_suspended_box">
                                        <rect x="943" y="428" width="288" height="127" rx="8" fill="black"
                                            fill-opacity="0.3"></rect>
                                        <rect x="943" y="428" width="288" height="127" rx="8" stroke="#F46A59"></rect>
                                    </g>
                                    <path id="dragon_red_lock"
                                        d="M1112.82 471.688H1109.23V460.859C1109.23 448.257 1099.03 438 1086.5 438C1073.97 438 1063.77 448.257 1063.77 460.859V471.688H1060.18C1056.22 471.688 1053 474.921 1053 478.906V507.781C1053 511.767 1056.22 515 1060.18 515H1112.82C1116.78 515 1120 511.767 1120 507.781V478.906C1120 474.921 1116.78 471.688 1112.82 471.688ZM1097.27 471.688H1075.73V460.859C1075.73 454.889 1080.56 450.031 1086.5 450.031C1092.44 450.031 1097.27 454.889 1097.27 460.859V471.688Z"
                                        fill="white"></path>
                                </g>
                                <text id="10000_6" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(285, 944)"
                                        :y="getRectCenterCordinates(123, 431, 18)"
                                        :class="{'suspended-book': mainData[4].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[4].sid}"></tspan>
                                </text>
                            </g>

                            <g id="card_123" style="cursor: pointer;" @click="setBetData(19, 'back')">
                                <rect id="card123_box" x="1258" y="431" width="285" height="123" rx="6" fill="#0041A2"
                                    fill-opacity="0.1" stroke="#0041A2" stroke-width="4"></rect>
                                <text id="1.99_7" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                    text-anchor="end" dominant-baseline="text-top">
                                    <tspan :x="getRectRightCordinates(285, 1258, 20)"
                                        :y="getRectCenterCordinates(123, 431)">{{ mainData[19].b }}</tspan>
                                </text>
                                <rect id="card_a" x="1282" y="437" width="50" height="69" fill="url(#cardall1)"></rect>
                                <rect id="card_a_2" x="1335" y="437" width="50" height="69" fill="url(#cardall2)">
                                </rect>
                                <rect id="card_a_3" x="1389" y="437" width="50" height="69" fill="url(#cardall3)">
                                </rect>
                                <g id="card123_suspended" v-if="mainData[19].gstatus != 'OPEN'">
                                    <g id="card123_suspended_box">
                                        <rect x="1256" y="428" width="289" height="125" rx="8" fill="black"
                                            fill-opacity="0.3"></rect>
                                        <rect x="1256" y="428" width="289" height="125" rx="8" stroke="#F46A59"></rect>
                                    </g>
                                    <path id="card123_lock"
                                        d="M1427.46 468.188H1424.2V458.484C1424.2 447.191 1414.91 438 1403.5 438C1392.09 438 1382.8 447.191 1382.8 458.484V468.188H1379.54C1375.93 468.188 1373 471.085 1373 474.656V500.531C1373 504.103 1375.93 507 1379.54 507H1427.46C1431.07 507 1434 504.103 1434 500.531V474.656C1434 471.085 1431.07 468.188 1427.46 468.188ZM1413.3 468.188H1393.7V458.484C1393.7 453.134 1398.09 448.781 1403.5 448.781C1408.91 448.781 1413.3 453.134 1413.3 458.484V468.188Z"
                                        fill="white"></path>
                                </g>
                                <text id="10000_7" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(285, 1258)"
                                        :y="getRectCenterCordinates(123, 431, 18)"
                                        :class="{'suspended-book': mainData[19].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[19].sid}"></tspan>
                                </text>
                            </g>

                            <g id="card_456" style="cursor: pointer;" @click="setBetData(20, 'back')">
                                <rect id="card456_box" x="1572" y="431" width="285" height="123" rx="6" fill="#0041A2"
                                    fill-opacity="0.1" stroke="#0041A2" stroke-width="4"></rect>
                                <text id="1.99_8" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                    text-anchor="end" dominant-baseline="text-top">
                                    <tspan :x="getRectRightCordinates(285, 1572, 20)"
                                        :y="getRectCenterCordinates(123, 431)">{{ mainData[20].b }}</tspan>
                                </text>
                                <rect id="card_a_4" x="1596" y="437" width="50" height="69" fill="url(#cardall4)">
                                </rect>
                                <rect id="card_a_5" x="1649" y="437" width="50" height="69" fill="url(#cardall5)">
                                </rect>
                                <rect id="card_a_6" x="1703" y="437" width="50" height="69" fill="url(#cardall6)">
                                </rect>
                                <g id="card456_suspended" v-if="mainData[20].gstatus != 'OPEN'">
                                    <g id="card456_suspended_box">
                                        <rect x="1570" y="428" width="289" height="125" rx="8" fill="black"
                                            fill-opacity="0.3"></rect>
                                        <rect x="1570" y="428" width="289" height="125" rx="8" stroke="#F46A59"></rect>
                                    </g>
                                    <path id="card456_lock"
                                        d="M1741.46 468.188H1738.2V458.484C1738.2 447.191 1728.91 438 1717.5 438C1706.09 438 1696.8 447.191 1696.8 458.484V468.188H1693.54C1689.93 468.188 1687 471.085 1687 474.656V500.531C1687 504.103 1689.93 507 1693.54 507H1741.46C1745.07 507 1748 504.103 1748 500.531V474.656C1748 471.085 1745.07 468.188 1741.46 468.188ZM1727.3 468.188H1707.7V458.484C1707.7 453.134 1712.09 448.781 1717.5 448.781C1722.91 448.781 1727.3 453.134 1727.3 458.484V468.188Z"
                                        fill="white"></path>
                                </g>
                                <text id="10000_8" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(285, 1572)"
                                        :y="getRectCenterCordinates(123, 431, 18)"
                                        :class="{'suspended-book': mainData[20].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[20].sid}">0</tspan>
                                </text>
                            </g>

                            <g id="card_8910" style="cursor: pointer;" @click="setBetData(21, 'back')">
                                <rect id="card8910_box" x="1886" y="431" width="285" height="123" rx="6" fill="#0041A2"
                                    fill-opacity="0.1" stroke="#0041A2" stroke-width="4"></rect>
                                <text id="1.99_9" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                    text-anchor="end" dominant-baseline="text-top">
                                    <tspan :x="getRectRightCordinates(285, 1886, 20)"
                                        :y="getRectCenterCordinates(123, 431)">{{ mainData[21].b }}</tspan>
                                </text>
                                <rect id="card_a_7" x="1910" y="437" width="50" height="69" fill="url(#cardall8)">
                                </rect>
                                <rect id="card_a_8" x="1963" y="437" width="50" height="69" fill="url(#cardall9)">
                                </rect>
                                <rect id="card_a_9" x="2017" y="437" width="50" height="69" fill="url(#cardall10)">
                                </rect>
                                <g id="card8910_suspended" v-if="mainData[21].gstatus != 'OPEN'">
                                    <g id="card8910_suspended_box">
                                        <rect x="1884" y="428" width="289" height="125" rx="8" fill="black"
                                            fill-opacity="0.3"></rect>
                                        <rect x="1884" y="428" width="289" height="125" rx="8" stroke="#F46A59"></rect>
                                    </g>
                                    <path id="card8910_lock"
                                        d="M2055.46 468.188H2052.2V458.484C2052.2 447.191 2042.91 438 2031.5 438C2020.09 438 2010.8 447.191 2010.8 458.484V468.188H2007.54C2003.93 468.188 2001 471.085 2001 474.656V500.531C2001 504.103 2003.93 507 2007.54 507H2055.46C2059.07 507 2062 504.103 2062 500.531V474.656C2062 471.085 2059.07 468.188 2055.46 468.188ZM2041.3 468.188H2021.7V458.484C2021.7 453.134 2026.09 448.781 2031.5 448.781C2036.91 448.781 2041.3 453.134 2041.3 458.484V468.188Z"
                                        fill="white"></path>
                                </g>
                                <text id="10000_9" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(285, 1886)"
                                        :y="getRectCenterCordinates(123, 431, 18)"
                                        :class="{'suspended-book': mainData[21].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[21].sid}"></tspan>
                                </text>
                            </g>

                            <g id="card_jqk" style="cursor: pointer;" @click="setBetData(22, 'back')">
                                <rect id="cardjqk_box" x="2200" y="431" width="285" height="123" rx="6" fill="#0041A2"
                                    fill-opacity="0.1" stroke="#0041A2" stroke-width="4"></rect>
                                <text id="1.99_10" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                    text-anchor="end" dominant-baseline="text-top">
                                    <tspan :x="getRectRightCordinates(285, 2200, 20)"
                                        :y="getRectCenterCordinates(123, 431)">{{ mainData[22].b }}</tspan>
                                </text>
                                <rect id="card_a_10" x="2224" y="437" width="50" height="69" fill="url(#cardall11)">
                                </rect>
                                <rect id="card_a_11" x="2277" y="437" width="50" height="69" fill="url(#cardall12)">
                                </rect>
                                <rect id="card_a_12" x="2331" y="437" width="50" height="69" fill="url(#cardall13)">
                                </rect>
                                <g id="cardjqk_suspended" v-if="mainData[22].gstatus != 'OPEN'">
                                    <g id="cardjqk_suspended_box">
                                        <rect x="2198" y="428" width="289" height="125" rx="8" fill="black"
                                            fill-opacity="0.3"></rect>
                                        <rect x="2198" y="428" width="289" height="125" rx="8" stroke="#F46A59"></rect>
                                    </g>
                                    <path id="cardjqk_lock"
                                        d="M2369.46 468.188H2366.2V458.484C2366.2 447.191 2356.91 438 2345.5 438C2334.09 438 2324.8 447.191 2324.8 458.484V468.188H2321.54C2317.93 468.188 2315 471.085 2315 474.656V500.531C2315 504.103 2317.93 507 2321.54 507H2369.46C2373.07 507 2376 504.103 2376 500.531V474.656C2376 471.085 2373.07 468.188 2369.46 468.188ZM2355.3 468.188H2335.7V458.484C2335.7 453.134 2340.09 448.781 2345.5 448.781C2350.91 448.781 2355.3 453.134 2355.3 458.484V468.188Z"
                                        fill="white"></path>
                                </g>
                                <text id="10000_10" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(285, 2200)"
                                        :y="getRectCenterCordinates(123, 431, 18)"
                                        :class="{'suspended-book': mainData[22].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[22].sid}"></tspan>
                                </text>
                            </g>
                        </g>

                        <g id="cards">
                            <g id="card1" style="cursor: pointer;" @click="setBetData(6, 'back')">
                                <rect id="card1_box" x="242" y="628" width="126" height="147" fill="black"
                                    fill-opacity="0.01"></rect>
                                <rect id="card_a_13" x="261" y="628" width="87" height="120" fill="url(#cardall1)">
                                </rect>
                                <text id="100000" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 242)"
                                        :y="getRectCenterCordinates(147, 628, 45)"
                                        v-vcasinofancybook="{sid: mainData[6].sid}">100000</tspan>
                                </text>
                                <g id="card1_suspended" v-if="mainData[6].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box" x="261" y="628" width="87" height="120" fill="black"
                                        fill-opacity="0.3"></rect>
                                    <path id="card1_lock"
                                        d="M321.837 685.473H319.473V678.368C319.473 670.098 312.755 663.368 304.5 663.368C296.245 663.368 289.527 670.098 289.527 678.368V685.473H287.163C284.553 685.473 282.435 687.595 282.435 690.21V709.158C282.435 711.773 284.553 713.894 287.163 713.894H321.837C324.447 713.894 326.565 711.773 326.565 709.158V690.21C326.565 687.595 324.447 685.473 321.837 685.473ZM311.592 685.473H297.408V678.368C297.408 674.45 300.589 671.263 304.5 671.263C308.411 671.263 311.592 674.45 311.592 678.368V685.473Z"
                                        fill="white"></path>
                                </g>
                            </g>

                            <g id="card1_2" style="cursor: pointer;" @click="setBetData(7, 'back')">
                                <rect id="card1_box_2" x="398" y="628" width="126" height="147" fill="black"
                                    fill-opacity="0.01"></rect>
                                <rect id="card_a_14" x="417" y="628" width="87" height="120" fill="url(#cardall2)">
                                </rect>
                                <text id="100000_2" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 398)"
                                        :y="getRectCenterCordinates(147, 628, 45)" 
                                        v-vcasinofancybook="{sid: mainData[7].sid}"></tspan>
                                </text>
                                <g id="card1_suspended_2" v-if="mainData[7].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_2" x="417" y="628" width="87" height="120"
                                        fill="black" fill-opacity="0.3"></rect>
                                    <path id="card1_lock_2"
                                        d="M477.837 685.473H475.473V678.368C475.473 670.098 468.755 663.368 460.5 663.368C452.245 663.368 445.527 670.098 445.527 678.368V685.473H443.163C440.553 685.473 438.435 687.595 438.435 690.21V709.158C438.435 711.773 440.553 713.894 443.163 713.894H477.837C480.447 713.894 482.565 711.773 482.565 709.158V690.21C482.565 687.595 480.447 685.473 477.837 685.473ZM467.592 685.473H453.408V678.368C453.408 674.45 456.589 671.263 460.5 671.263C464.411 671.263 467.592 674.45 467.592 678.368V685.473Z"
                                        fill="white"></path>
                                </g>
                            </g>

                            <g id="card1_3" style="cursor: pointer;" @click="setBetData(8, 'back')">
                                <rect id="card1_box_3" x="554" y="628" width="126" height="147" fill="black"
                                    fill-opacity="0.01"></rect>
                                <rect id="card_a_15" x="573" y="628" width="87" height="120" fill="url(#cardall3)">
                                </rect>
                                <text id="100000_3" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 554)"
                                        :y="getRectCenterCordinates(147, 628, 45)" 
                                        v-vcasinofancybook="{sid: mainData[8].sid}"></tspan>
                                </text>
                                <g id="card1_suspended_3" v-if="mainData[8].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_3" x="573" y="628" width="87" height="120"
                                        fill="black" fill-opacity="0.3"></rect>
                                    <path id="card1_lock_3"
                                        d="M633.837 685.473H631.473V678.368C631.473 670.098 624.755 663.368 616.5 663.368C608.245 663.368 601.527 670.098 601.527 678.368V685.473H599.163C596.553 685.473 594.435 687.595 594.435 690.21V709.158C594.435 711.773 596.553 713.894 599.163 713.894H633.837C636.447 713.894 638.565 711.773 638.565 709.158V690.21C638.565 687.595 636.447 685.473 633.837 685.473ZM623.592 685.473H609.408V678.368C609.408 674.45 612.589 671.263 616.5 671.263C620.411 671.263 623.592 674.45 623.592 678.368V685.473Z"
                                        fill="white"></path>
                                </g>
                            </g>

                            <g id="card1_4" style="cursor: pointer;" @click="setBetData(9, 'back')">
                                <rect id="card1_box_4" x="710" y="628" width="126" height="147" fill="black"
                                    fill-opacity="0.01"></rect>
                                <rect id="card_a_16" x="729" y="628" width="87" height="120" fill="url(#cardall4)">
                                </rect>
                                <text id="100000_4" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 710)"
                                        :y="getRectCenterCordinates(147, 628, 45)"
                                        v-vcasinofancybook="{sid: mainData[9].sid}"></tspan>
                                </text>
                                <g id="card1_suspended_4" v-if="mainData[9].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_4" x="729" y="628" width="87" height="120"
                                        fill="black" fill-opacity="0.3"></rect>
                                    <path id="card1_lock_4"
                                        d="M789.837 685.473H787.473V678.368C787.473 670.098 780.755 663.368 772.5 663.368C764.245 663.368 757.527 670.098 757.527 678.368V685.473H755.163C752.553 685.473 750.435 687.595 750.435 690.21V709.158C750.435 711.773 752.553 713.894 755.163 713.894H789.837C792.447 713.894 794.565 711.773 794.565 709.158V690.21C794.565 687.595 792.447 685.473 789.837 685.473ZM779.592 685.473H765.408V678.368C765.408 674.45 768.589 671.263 772.5 671.263C776.411 671.263 779.592 674.45 779.592 678.368V685.473Z"
                                        fill="white"></path>
                                </g>
                            </g>

                            <g id="card1_5" style="cursor: pointer;" @click="setBetData(10, 'back')">
                                <rect id="card1_box_5" x="866" y="628" width="126" height="147" fill="black"
                                    fill-opacity="0.01"></rect>
                                <rect id="card_a_17" x="885" y="628" width="87" height="120" fill="url(#cardall5)">
                                </rect>
                                <text id="100000_5" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 866)"
                                        :y="getRectCenterCordinates(147, 628, 45)"
                                        v-vcasinofancybook="{sid: mainData[10].sid}"></tspan>
                                </text>
                                <g id="card1_suspended_5" v-if="mainData[10].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_5" x="885" y="628" width="87" height="120"
                                        fill="black" fill-opacity="0.3"></rect>
                                    <path id="card1_lock_5"
                                        d="M945.837 685.473H943.473V678.368C943.473 670.098 936.755 663.368 928.5 663.368C920.245 663.368 913.527 670.098 913.527 678.368V685.473H911.163C908.553 685.473 906.435 687.595 906.435 690.21V709.158C906.435 711.773 908.553 713.894 911.163 713.894H945.837C948.447 713.894 950.565 711.773 950.565 709.158V690.21C950.565 687.595 948.447 685.473 945.837 685.473ZM935.592 685.473H921.408V678.368C921.408 674.45 924.589 671.263 928.5 671.263C932.411 671.263 935.592 674.45 935.592 678.368V685.473Z"
                                        fill="white"></path>
                                </g>
                            </g>

                            <g id="card1_6" style="cursor: pointer;" @click="setBetData(11, 'back')">
                                <rect id="card1_box_6" x="1022" y="628" width="126" height="147" fill="black"
                                    fill-opacity="0.01"></rect>
                                <rect id="card_a_18" x="1041" y="628" width="87" height="120" fill="url(#cardall6)">
                                </rect>
                                <text id="100000_6" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 1022)"
                                        :y="getRectCenterCordinates(147, 628, 45)"
                                        v-vcasinofancybook="{sid: mainData[11].sid}">0</tspan>
                                </text>
                                <g id="card1_suspended_6" v-if="mainData[11].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_6" x="1041" y="628" width="87" height="120"
                                        fill="black" fill-opacity="0.3"></rect>
                                    <path id="card1_lock_6"
                                        d="M1101.84 685.473H1099.47V678.368C1099.47 670.098 1092.75 663.368 1084.5 663.368C1076.25 663.368 1069.53 670.098 1069.53 678.368V685.473H1067.16C1064.55 685.473 1062.43 687.595 1062.43 690.21V709.158C1062.43 711.773 1064.55 713.894 1067.16 713.894H1101.84C1104.45 713.894 1106.57 711.773 1106.57 709.158V690.21C1106.57 687.595 1104.45 685.473 1101.84 685.473ZM1091.59 685.473H1077.41V678.368C1077.41 674.45 1080.59 671.263 1084.5 671.263C1088.41 671.263 1091.59 674.45 1091.59 678.368V685.473Z"
                                        fill="white"></path>
                                </g>
                            </g>

                            <g id="card1_7" style="cursor: pointer;" @click="setBetData(12, 'back')">
                                <rect id="card1_box_7" x="1178" y="628" width="126" height="147" fill="black"
                                    fill-opacity="0.01"></rect>
                                <rect id="card_a_19" x="1197" y="628" width="87" height="120" fill="url(#cardall7)">
                                </rect>
                                <text id="100000_7" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 1178)"
                                        :y="getRectCenterCordinates(147, 628, 45)"
                                        v-vcasinofancybook="{sid: mainData[12].sid}">0</tspan>
                                </text>
                                <g id="card1_suspended_7" v-if="mainData[12].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_7" x="1197" y="628" width="87" height="120"
                                        fill="black" fill-opacity="0.3"></rect>
                                    <path id="card1_lock_7"
                                        d="M1257.84 685.473H1255.47V678.368C1255.47 670.098 1248.75 663.368 1240.5 663.368C1232.25 663.368 1225.53 670.098 1225.53 678.368V685.473H1223.16C1220.55 685.473 1218.43 687.595 1218.43 690.21V709.158C1218.43 711.773 1220.55 713.894 1223.16 713.894H1257.84C1260.45 713.894 1262.57 711.773 1262.57 709.158V690.21C1262.57 687.595 1260.45 685.473 1257.84 685.473ZM1247.59 685.473H1233.41V678.368C1233.41 674.45 1236.59 671.263 1240.5 671.263C1244.41 671.263 1247.59 674.45 1247.59 678.368V685.473Z"
                                        fill="white"></path>
                                </g>
                            </g>

                            <g id="card1_8" style="cursor: pointer;" @click="setBetData(13, 'back')">
                                <rect id="card1_box_8" x="1334" y="628" width="126" height="147" fill="black"
                                    fill-opacity="0.01"></rect>
                                <rect id="card_a_20" x="1353" y="628" width="87" height="120" fill="url(#cardall8)">
                                </rect>
                                <text id="100000_8" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 1334)"
                                        :y="getRectCenterCordinates(147, 628, 45)"
                                        v-vcasinofancybook="{sid: mainData[13].sid}"></tspan>
                                </text>
                                <g id="card1_suspended_8" v-if="mainData[13].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_8" x="1353" y="628" width="87" height="120"
                                        fill="black" fill-opacity="0.3"></rect>
                                    <path id="card1_lock_8"
                                        d="M1413.84 685.473H1411.47V678.368C1411.47 670.098 1404.75 663.368 1396.5 663.368C1388.25 663.368 1381.53 670.098 1381.53 678.368V685.473H1379.16C1376.55 685.473 1374.43 687.595 1374.43 690.21V709.158C1374.43 711.773 1376.55 713.894 1379.16 713.894H1413.84C1416.45 713.894 1418.57 711.773 1418.57 709.158V690.21C1418.57 687.595 1416.45 685.473 1413.84 685.473ZM1403.59 685.473H1389.41V678.368C1389.41 674.45 1392.59 671.263 1396.5 671.263C1400.41 671.263 1403.59 674.45 1403.59 678.368V685.473Z"
                                        fill="white"></path>
                                </g>
                            </g>

                            <g id="card1_9" style="cursor: pointer;" @click="setBetData(14, 'back')">
                                <rect id="card1_box_9" x="1490" y="628" width="126" height="147" fill="black"
                                    fill-opacity="0.01"></rect>
                                <rect id="card_a_21" x="1509" y="628" width="87" height="120" fill="url(#cardall9)">
                                </rect>
                                <text id="100000_9" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 1490)"
                                        :y="getRectCenterCordinates(147, 628, 45)"
                                        v-vcasinofancybook="{sid: mainData[14].sid}"></tspan>
                                </text>
                                <g id="card1_suspended_9" v-if="mainData[14].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_9" x="1509" y="628" width="87" height="120"
                                        fill="black" fill-opacity="0.3"></rect>
                                    <path id="card1_lock_9"
                                        d="M1569.84 685.473H1567.47V678.368C1567.47 670.098 1560.75 663.368 1552.5 663.368C1544.25 663.368 1537.53 670.098 1537.53 678.368V685.473H1535.16C1532.55 685.473 1530.43 687.595 1530.43 690.21V709.158C1530.43 711.773 1532.55 713.894 1535.16 713.894H1569.84C1572.45 713.894 1574.57 711.773 1574.57 709.158V690.21C1574.57 687.595 1572.45 685.473 1569.84 685.473ZM1559.59 685.473H1545.41V678.368C1545.41 674.45 1548.59 671.263 1552.5 671.263C1556.41 671.263 1559.59 674.45 1559.59 678.368V685.473Z"
                                        fill="white"></path>
                                </g>
                            </g>

                            <g id="card1_10" style="cursor: pointer;" @click="setBetData(15, 'back')">
                                <rect id="card1_box_10" x="1646" y="628" width="126" height="147" fill="black"
                                    fill-opacity="0.01"></rect>
                                <rect id="card_a_22" x="1665" y="628" width="87" height="120" fill="url(#cardall10)">
                                </rect>
                                <text id="100000_10" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 1646)"
                                        :y="getRectCenterCordinates(147, 628, 45)"
                                        v-vcasinofancybook="{sid: mainData[15].sid}"></tspan>
                                </text>
                                <g id="card1_suspended_10" v-if="mainData[15].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_10" x="1665" y="628" width="87" height="120"
                                        fill="black" fill-opacity="0.3"></rect>
                                    <path id="card1_lock_10"
                                        d="M1725.84 685.473H1723.47V678.368C1723.47 670.098 1716.75 663.368 1708.5 663.368C1700.25 663.368 1693.53 670.098 1693.53 678.368V685.473H1691.16C1688.55 685.473 1686.43 687.595 1686.43 690.21V709.158C1686.43 711.773 1688.55 713.894 1691.16 713.894H1725.84C1728.45 713.894 1730.57 711.773 1730.57 709.158V690.21C1730.57 687.595 1728.45 685.473 1725.84 685.473ZM1715.59 685.473H1701.41V678.368C1701.41 674.45 1704.59 671.263 1708.5 671.263C1712.41 671.263 1715.59 674.45 1715.59 678.368V685.473Z"
                                        fill="white"></path>
                                </g>
                            </g>

                            <g id="card1_11" style="cursor: pointer;" @click="setBetData(16, 'back')">
                                <rect id="card1_box_11" x="1802" y="628" width="126" height="147" fill="black"
                                    fill-opacity="0.01"></rect>
                                <rect id="card_a_23" x="1821" y="628" width="87" height="120" fill="url(#cardall11)">
                                </rect>
                                <text id="100000_11" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 1802)"
                                        :y="getRectCenterCordinates(147, 628, 45)"
                                        v-vcasinofancybook="{sid: mainData[16].sid}"></tspan>
                                </text>
                                <g id="card1_suspended_11" v-if="mainData[16].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_11" x="1821" y="628" width="87" height="120"
                                        fill="black" fill-opacity="0.3"></rect>
                                    <path id="card1_lock_11"
                                        d="M1881.84 685.473H1879.47V678.368C1879.47 670.098 1872.75 663.368 1864.5 663.368C1856.25 663.368 1849.53 670.098 1849.53 678.368V685.473H1847.16C1844.55 685.473 1842.43 687.595 1842.43 690.21V709.158C1842.43 711.773 1844.55 713.894 1847.16 713.894H1881.84C1884.45 713.894 1886.57 711.773 1886.57 709.158V690.21C1886.57 687.595 1884.45 685.473 1881.84 685.473ZM1871.59 685.473H1857.41V678.368C1857.41 674.45 1860.59 671.263 1864.5 671.263C1868.41 671.263 1871.59 674.45 1871.59 678.368V685.473Z"
                                        fill="white"></path>
                                </g>
                            </g>

                            <g id="card1_12" style="cursor: pointer;" @click="setBetData(17, 'back')">
                                <rect id="card1_box_12" x="1958" y="628" width="126" height="147" fill="black"
                                    fill-opacity="0.01"></rect>
                                <rect id="card_a_24" x="1977" y="628" width="87" height="120" fill="url(#cardall12)">
                                </rect>
                                <text id="100000_12" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 1958)"
                                        :y="getRectCenterCordinates(147, 628, 45)"
                                        v-vcasinofancybook="{sid: mainData[17].sid}"></tspan>
                                </text>
                                <g id="card1_suspended_12" v-if="mainData[17].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_12" x="1977" y="628" width="87" height="120"
                                        fill="black" fill-opacity="0.3"></rect>
                                    <path id="card1_lock_12"
                                        d="M2037.84 685.473H2035.47V678.368C2035.47 670.098 2028.75 663.368 2020.5 663.368C2012.25 663.368 2005.53 670.098 2005.53 678.368V685.473H2003.16C2000.55 685.473 1998.43 687.595 1998.43 690.21V709.158C1998.43 711.773 2000.55 713.894 2003.16 713.894H2037.84C2040.45 713.894 2042.57 711.773 2042.57 709.158V690.21C2042.57 687.595 2040.45 685.473 2037.84 685.473ZM2027.59 685.473H2013.41V678.368C2013.41 674.45 2016.59 671.263 2020.5 671.263C2024.41 671.263 2027.59 674.45 2027.59 678.368V685.473Z"
                                        fill="white"></path>
                                </g>
                            </g>

                            <g id="card1_13" style="cursor: pointer;" @click="setBetData(18, 'back')">
                                <rect id="card1_box_13" x="2114" y="628" width="126" height="147" fill="black"
                                    fill-opacity="0.01"></rect>
                                <rect id="card_a_25" x="2133" y="628" width="87" height="120" fill="url(#cardall13)">
                                </rect>
                                <text id="100000_13" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 2114)"
                                        :y="getRectCenterCordinates(147, 628, 45)"
                                        v-vcasinofancybook="{sid: mainData[18].sid}"></tspan>
                                </text>
                                <g id="card1_suspended_13" v-if="mainData[18].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_13" x="2133" y="628" width="87" height="120"
                                        fill="black" fill-opacity="0.3"></rect>
                                    <path id="card1_lock_13"
                                        d="M2193.84 685.473H2191.47V678.368C2191.47 670.098 2184.75 663.368 2176.5 663.368C2168.25 663.368 2161.53 670.098 2161.53 678.368V685.473H2159.16C2156.55 685.473 2154.43 687.595 2154.43 690.21V709.158C2154.43 711.773 2156.55 713.894 2159.16 713.894H2193.84C2196.45 713.894 2198.57 711.773 2198.57 709.158V690.21C2198.57 687.595 2196.45 685.473 2193.84 685.473ZM2183.59 685.473H2169.41V678.368C2169.41 674.45 2172.59 671.263 2176.5 671.263C2180.41 671.263 2183.59 674.45 2183.59 678.368V685.473Z"
                                        fill="white"></path>
                                </g>
                            </g>
                        </g>
                        <g id="card_rate">
                            <rect id="card_rate_box" x="1192" y="573" width="97" height="46" rx="5" fill="black"
                                fill-opacity="0.01" stroke="black" stroke-width="4"></rect>
                            <text id="12.0" fill="black" xml:space="preserve" style="white-space: pre"
                                font-family="Antonio" font-size="40" font-weight="bold" letter-spacing="0em"
                                dominant-baseline="middle" text-anchor="middle">
                                <tspan :x="getRectCenterCordinates(97, 1192)"
                                        :y="getRectCenterCordinates(46, 573)">{{mainData[6].b}}</tspan>
                            </text>
                        </g>
                    </g>
                    <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image0" transform="scale(0.02 0.0142857)"></use>
                        </pattern>
                        <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image0" transform="scale(0.02 0.0142857)"></use>
                        </pattern>
                        <pattern id="pattern2" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image1" transform="scale(0.02)"></use>
                        </pattern>
                        <pattern id="pattern3" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image2" transform="scale(0.02)"></use>
                        </pattern>
                        <pattern id="pattern4" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image3" transform="scale(0.02)"></use>
                        </pattern>
                        <pattern id="pattern5" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image4" transform="scale(0.02)"></use>
                        </pattern>
                        <pattern id="pattern6" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)"></use>
                        </pattern>
                        <pattern id="pattern7" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)"></use>
                        </pattern>
                        <pattern id="pattern8" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)"></use>
                        </pattern>
                        <pattern id="pattern9" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)"></use>
                        </pattern>
                        <pattern id="pattern10" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)"></use>
                        </pattern>
                        <pattern id="pattern11" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)"></use>
                        </pattern>
                        <pattern id="pattern12" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)"></use>
                        </pattern>
                        <pattern id="pattern13" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)"></use>
                        </pattern>
                        <pattern id="pattern14" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)"></use>
                        </pattern>
                        <pattern id="pattern15" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)"></use>
                        </pattern>
                        <pattern id="pattern16" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)"></use>
                        </pattern>
                        <pattern id="pattern17" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)"></use>
                        </pattern>
                        <pattern id="pattern18" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.0075) scale(0.02 0.0145)"></use>
                        </pattern>
                        <pattern id="pattern19" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.0075) scale(0.02 0.0145)"></use>
                        </pattern>
                        <pattern id="pattern20" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.0075) scale(0.02 0.0145)"></use>
                        </pattern>
                        <pattern id="pattern21" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.0075) scale(0.02 0.0145)"></use>
                        </pattern>
                        <pattern id="pattern22" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.0075) scale(0.02 0.0145)"></use>
                        </pattern>
                        <pattern id="pattern23" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.0075) scale(0.02 0.0145)"></use>
                        </pattern>
                        <pattern id="pattern24" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.0075) scale(0.02 0.0145)"></use>
                        </pattern>
                        <pattern id="pattern25" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.0075) scale(0.02 0.0145)"></use>
                        </pattern>
                        <pattern id="pattern26" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.0075) scale(0.02 0.0145)"></use>
                        </pattern>
                        <pattern id="pattern27" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.0075) scale(0.02 0.0145)"></use>
                        </pattern>
                        <pattern id="pattern28" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.0075) scale(0.02 0.0145)"></use>
                        </pattern>
                        <pattern id="pattern29" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.0075) scale(0.02 0.0145)"></use>
                        </pattern>
                        <pattern id="pattern30" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.0075) scale(0.02 0.0145)"></use>
                        </pattern>
                        <image id="card1Img" data-name="2CC.png" width="50" height="70"
                            :href="`${cardPath}${cards[0]}.png`" />

                        <template v-for="n in 13">
                            <pattern :id="'cardall'+n" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use :xlink:href="'#cardall'+n+'img'"
                                    transform="translate(0 -0.00724638) scale(0.02 0.0144928)" />
                            </pattern>
                            <image v-if="n == 1" id="cardall1img" data-name="A.png" width="50" height="70"
                                :href="`${cardPath}A.png`" />
                            <image v-else-if="n == 11" id="cardall11img" data-name="A.png" width="50" height="70"
                                :href="`${cardPath}J.png`" />
                            <image v-else-if="n == 12" id="cardall12img" data-name="A.png" width="50" height="70"
                                :href="`${cardPath}Q.png`" />
                            <image v-else-if="n == 13" id="cardall13img" data-name="A.png" width="50" height="70"
                                :href="`${cardPath}K.png`" />
                            <image v-else :id="'cardall'+n+'img'" data-name="A.png" width="50" height="70"
                                :href="`${cardPath}${n}.png`" />
                        </template>




                        <image id="image1" data-name="spade.png" width="50" height="50"
                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTEwNEIzQUI4MThCMTFFQkE4NkRERDk4NzBBOUNEQ0YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTEwNEIzQUM4MThCMTFFQkE4NkRERDk4NzBBOUNEQ0YiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MTA0QjNBOTgxOEIxMUVCQTg2REREOTg3MEE5Q0RDRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5MTA0QjNBQTgxOEIxMUVCQTg2REREOTg3MEE5Q0RDRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Prstm1gAAA36SURBVHja7FoJdFRl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" />
                        <image id="image2" data-name="club.png" width="50" height="50"
                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTg1OTU1OUE4MThCMTFFQkEzQUFCQkEzMTY1QUFCOUMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTg1OTU1OUI4MThCMTFFQkEzQUFCQkEzMTY1QUFCOUMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5ODU5NTU5ODgxOEIxMUVCQTNBQUJCQTMxNjVBQUI5QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5ODU5NTU5OTgxOEIxMUVCQTNBQUJCQTMxNjVBQUI5QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PojDhkIAAA6sSURBVHja7FoLkFTl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" />
                        <image id="image3" data-name="heart.png" width="50" height="50"
                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUI4OUU5REM4MThCMTFFQjhCRUU4N0FBRTYxQUJBNDciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUI4OUU5REQ4MThCMTFFQjhCRUU4N0FBRTYxQUJBNDciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQjg5RTlEQTgxOEIxMUVCOEJFRTg3QUFFNjFBQkE0NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQjg5RTlEQjgxOEIxMUVCOEJFRTg3QUFFNjFBQkE0NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrOTuaEAAA6pSURBVHja7FlplBzV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" />
                        <image id="image4" data-name="diamond.png" width="50" height="50"
                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUZGOEM4OEY4MThCMTFFQkIzOUVGNThFMjNBREZDQjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUZGOEM4OTA4MThCMTFFQkIzOUVGNThFMjNBREZDQjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5RkY4Qzg4RDgxOEIxMUVCQjM5RUY1OEUyM0FERkNCOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5RkY4Qzg4RTgxOEIxMUVCQjM5RUY1OEUyM0FERkNCOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvU5fn4AAA3NSURBVHja3FkJcBTnlf76mO45NLdugYQEGIMxYC4BNglmNz7WVoid+AiLC8dOTCDeOMVSWYfEEIIXx3ackC0f2ezhOFWx7BS+kviiFuJUMOa2YwQICXQgCY1Gc2h6jp7pc1+3sON41yBpZCq7M3o1PTN/a9733vu+9/5uxjRN/H94MBcCEvv994v/FVOfC4ZNgWFOf/CRoWTgCDYguGDduABhR+BFEWa9aFBZ4SGd4b7MmAYYK3r0NJUshODkccvIBYGYhj5mg67A0DKNnprPXcOVXHqXriQJgUnfacM/7nBdPCBFVC10VYLDP/27biqhkrLL6zXGd6+ciUDJDcEUgxCr5188IHY5jMGgyWA41zWeiVc3ZeOnoOsyxNJ590vRzlC87xiGIqdssBevtBhmTKbrOXgmXLnJ4S/F0X97GpH9+xGefmV1Vua+03fqIFJSEh8RGuavkuymlgPnKl3tmXHtlT17dyF64Awi+44Dah41c29dz3nKLuM95eS+7T93zop68BcsLWaUNKIoUxn5glNv36JIEtqe34FQ7STketPoeO1VNHz+RjbV3/4g42RvYjmHdYZAVrgIGeFGYTwMNQcxOH2zOKGx7tizP0ehIwVv2A+h1Iee/3ofub4eTLh8+RfcofrrwNpxtNAYnz5HRmGGoVqvi4NzblkfO7EPXc2/gy9cDZn4IIocJcuBtt/uhjNQDp9/6nYlN+Cj06S/uoZoKCmU1H7mYbjCOPLYNniSDrhIrRxpan79AyhhdCRPRhF5rxUOFzdNOrVzs5brvkiqpWsjMJ3UNgneGd7gmdG0tKX5SSR3HoWbSopJJglIBoxugFMK8PBOAtMD1uOFINasT3e8fFVhcC8+dbIX5MwIkkad2shfUblk7SPJyEm0PvIEKtkgdDmNLMOBU1WoZF5RhOBkURKeAjmhwCF6IHWc+rHom7jwUwei5nPn7d4mgaDRA+Uzm55kglOZQ3ffDO5kBkadF874EFhRgO73QfS4KSoFmNkc8qdbcaajDaElpfBULV8g9fY87q5V7h0WMLtKjHEvLYZlzmu6Qo0vPGl74Io7Fh1++lEkntmFcDgAVyEPlTHh0jQE5Dy88SSYRAJidBDZ0+1IdfWg77UWaJZAGMY3el/5SpOR6cSfp81xHuPbm+/4pHYBrZAFxxu3T1v1L829J9qwe/ltmFAogdcvQuI4sGSTcnlolLkkZaXc54PJs5CrqyBVlCPVE0NofiUuXXUDMh1742b+5ILw7Hs6TRpxPhgsP/pwTVxWBEfyGXvs/tB765ClRBrU+Aqx2VOv3fJMTuWxZ/VaBOIsmHovDJmUitY6VQ3dAo8QFQpL63tpInazDnBEfJGyVBL2InlkAKdDb6Dh+s+Fc51mc/zQjxaJJRNg6Or/mFyKAqIWch8CMe39BPGC5YjI/cEpy+7d4aheIrz+938H/lAEvimTIFBJBUjFBCqpIYcDXgIQ0ijCqoJWCkDOwSNMQJzEF4744wj4EdndRVw5jAnz/7ZRalN+YbLxO3lX9fBWYPw4wn1oLBkYHmr2LKpnNb0SmLN6yu5Na5HfcRhV9Q3gDGsTxSHN8dSuGVRpuj1AShwLg0adWsqQn5LqskrHyi6tFf0CfOX16HjhEAbb3kNw2o2rVc21WSMBYVnHcFYY5oJz5SgGKbumkE/3omzy4ubq5Q8s3f+vW3D233ei4tJZ4BwmVFqj8JQtsk6XE6edIvJ0WkpwIEHv3QTGY70nYA5LxeizSDSGzPGDkP9AHPvmVsQHTqJyzurva3J+jaYOT8j2Rs00xgMIYw+PstSHcM2Mx+tXPHz7n3Y8jvbtz2HKpFlwelhoohNeWsealuyw8FFJmfRepGOT+keBQGkE0O8Q4AoGwQ3GkfnDH5H8414k2k7TqjTMDga7121GJtuPirlf/ZmSy37R0CQafYzigdj8oD9Z6oW/vP6hqSuf+EbbWy+h5eGnUV+/AAgIdqRZiq7p8cDNE5l5HlX0u7UmAXO5wYgusG4XuNIw4qEgOdwJY8/byPRH6DsBdVYQiE8V1V7I7+bw29XrIBsyKmd9ZYehqn9D6nFBV0e0scpnonB5w9+bvvqp+zvefhPvbPwxGuZdD3dtiJx3Yyjgo/2HC1UUbd3nhUYyK/v86C4vRaW3BLX0mdvpRDSTwcDRFsROtCJC62UiukhBEqyIU7RyJM3hujKk3x7Cy6tWQRFYlE2/7XX6epFp5IsDohekykDF5Kdm3frTre2vvYnfNd0NZ6eKdNdxpOMJuCwh8PqoXPxQS0MI+P3UR3y2lZLzVtM0U0Po7u1F5lQ7mKEkXJSdJGWiQlFxSUFFikouR7zhKYsCTQpl9dXI7ZHx4i1fQiqZd/iql+4iV28tckTJBHXdnA43aX5PO3JJikxQRrblmE3iPJVNmMoiRo7FaL3lXIScSpH8luQVCLks2giMSmtmmiS/dPwWnVdDiuYnHvVRGSapcZZQ2KsUBUMEquA04fWVouetY+g5+AJmffEBdy52bA39+1+PGQjLe070te1dxry0+cWFax69yRQd2LPmh6jjJ5DyOJChvuGhnWCOHPKSwvRRKbYTqAApzSICEiUnBTKRJDnLGjhLjpKfKCMgGpWV1XNEOs+6YCFTnylQeak0UA6mO/HZn34Vs27ZhGRL8290LbGiqIywFEFB9CMe7b85/u6rbzbeec81SiqKIxv+E9ViA4ERbNkVyAkvNTovnVNX0NDipCzRDFggYDELJEW8lYJwKTVCy/k0gRuyZrVz7Vag7Ej0vZzWkYp1Y8EjX8bCb/4I0qHmnYrcuYLjfcVxpJAeRF6K2J1Zks0blP6+/Uvv24xZm1bi7NkuFBTqH9bIQnS1ekaWtWZYHfPkAjVBSyyASoo+iTBkZtjpXurubgJjZSVPYGQ6J+4UIOd0DA1GMHPzCiz61lakDj63L5c4eAPLuz+4UDH2jFTPuxmqIoN3h+ELlWtyIX09zrz3ztUPbJmWG0ig62e74a+dCJ4aSMRykCIfoQyEyUkfHfdYskqEjlHJWL64zeFyilNGrLXWTJalY2eOSD8Qw5R1i7Fk/WZI7+5qlROHr+Nd5Zq9tzeLnH4Lg4ft8cTQC7QLHG5OSvr4JH+w4QBbMafslZWrEH+xBRMbalCgyDpJeZxU7/0EagYBKKUdpGw3RiBK/LBmWpHKqIMIb3FDo2zmyQXpTBQTbp2O5dt/AqX31EBmYFejw13ebcmyPawSktKrflBkaaUiUDJJAmMNjTw4IdCV6NrZxKXO4pqfPwXH3ACiZ2JgKLIqlUofgaiguSpIWZGpWZ6hCThJDluOD1K2hmhdlbVPocw4SRRy3VGEl9XhMz/cBi0aNQhEk2CBsP03RrRFuXBnd3j+0gTrlTq1ENgf/dOzq0u8Hlz3yydRKCMORbMwCEgNSbA17rUS4Q+4ndAJzBBJstX4XOR4LwFLW7yitcl+CeLUUix+ZAMYS367XloluIMHTZMd1R7rgkC0+PGP2DGosaMwUn1gdNYi4C8T+595rHLGZ7F4+0akaUbi0wqN+Yx9xc0qoaBKESdyWFJrOW99ZsU45eDQnTcg8Qpmf+8L8JVVIXn8xYecJb5m61IXwxg2pz5qRZHdAvDxy0MMQ/HmaBx0eKHIkQ3p95+fN/OW+5ZFDx1E96OvI9RQRxMwqRWVl9fUbY5Yu8Q8eWM1vjIqqyxJmjQYw7wH70Bl41xE9z27M1AR2GiS5pmmPuoLwheefvmSj5kXJue0ZyOrhjlHENnIwbv0yOHk0i0/geeqiUj1x6mx8UhQORUoO9bGirflmcEAqRhLr5meAdTetAiX3bkSejQx4AkId5mMeO4yLfe/WpFjPHN+o+wwnNgZP/7cWofDjSsf3QbFTXKdyNnXRETdJLUa5kSMysk6KxnPgK0vxYKNX4cSj0GJ7btH8ISpXjl7s/WJVhQQK83nNZV+gwitZZ4fOvKL5prGFbjsvpWIRc6AMVgolBHJGjsoC7T3QpaUTEqnbBDhS66AdPr1/3AHQr8xdPPc/zM+2YrLiD4Co9JxhCEn3v+W2rcvMv/bW1C6pB79/TFEXSI8JLMhIj1DpTbUO4iJKxZj8k3XIf7em50ut7Ge5f3nnDXPb0XJ7yfU618aazdNnvdHh9pe2OAQ3Fj44CaadNPgh2RwlA2Zyiobl8BWBjD/n76OQqIPaurwet5VKum6OtJbq8VcjR/pkyLKi9Z9w1+l33/pjbqrb8cld90Iqa8Xado1pogjckzCjDU3IDzzcmqCh18RXM6XNVWFoSkjsiI5MjpjSdlyA/u+i0wfGjf+AOzUIBE6DZwZQKhxMmbfuw6ZrnYVev/9JuMcdsEi+UisOCDmqMzuMaZ6JNHy3GOeyksw+x/XIhXtRZam5ys2fI3G/hByfXu2sazZOvzzo7xvP3ayG6M03dqMoZA68VChZ+/Z2Xf/A9xTaxBaOA31N9+GxNHdpxkz8jBHzZSl7s0y5ojt4t5DtE8i4nOueKrztX8uL5/5xFVbv02DJklwPEokP7BVdIZkw5bT8bs9zY+sIY4BC2XFKESflE688bWGa5vm6FoeUvvv9/Js/hnDdI31onsRpfXxyW3ExoIj4ueHDjxYkNLIJ1PQci3bLDFg7AEHo7biMjLm7Jv2YMno2Rey0Xc6TUORWVZ/1WT4cc/Gp1paH6acK4GeOf4dOtA5zmd3nPHkxoi3uv9XHv8twADL0WxgrmE0fAAAAABJRU5ErkJggg==" />
                        <image id="image5" data-name="A.png" width="50" height="70"
                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABGCAIAAAAB7lAxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGNkUyNzEyRjg4NTVFQjExOTM0RTlDRjZDRjBGODNDRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDNjYwMjUzQjg3Q0YxMUVCQTA3N0ZCREE3RTY5RkY0OCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDNjYwMjUzQTg3Q0YxMUVCQTA3N0ZCREE3RTY5RkY0OCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyMTI5OEZGNTU4OTExRUI5NkQ2QUE0MEM3QTU4QTY2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAyMTI5OTAwNTU4OTExRUI5NkQ2QUE0MEM3QTU4QTY2Ii8+IDwvcmRmOkRlc2NyaXB0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" />
                    </defs>
                </svg>

                <!-- <svg viewBox="0 0 2487 772" fill="none" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="odds">
                        <g id="player_a_cards">
                            <g id="pa_card1">
                                <rect id="pa_card1_box" x="832.5" y="106.286" width="89.6429" height="123.214" rx="3.5"
                                    stroke="black" />
                                <rect id="pa_card1_img" x="835.357" y="109.143" width="83.9286" height="117.5"
                                    fill="url(#card1Icon)" v-if="checkLowCards(cards[0])" />
                            </g>
                        </g>
                        <g id="player_b_cards">
                            <g id="pb_card1">
                                <rect id="pb_card1_box" x="1577.5" y="106.5" width="89.6429" height="123.214" rx="3.5"
                                    stroke="black" />
                                <rect id="pb_card1_img" x="1580.36" y="109.357" width="83.9286" height="117.5"
                                    fill="url(#card1Icon)" v-if="checkHighCards(cards[0])" />
                            </g>
                        </g>

                        <g id="player_title">
                            <text id="A TO 6" fill="#EF0518" xml:space="preserve" style="white-space: pre"
                                font-family="Noto Sans" font-size="70" font-weight="bold" letter-spacing="0em">
                                <tspan x="768.091" y="82.6558">A TO 6</tspan>
                            </text>
                            <text id="8 TO K" fill="#00A200" xml:space="preserve" style="white-space: pre"
                                font-family="Noto Sans" font-size="70" font-weight="bold" letter-spacing="0em">
                                <tspan x="1514.01" y="74.6558">8 TO K</tspan>
                            </text>
                        </g>
                        <g id="main_odds">
                            <g id="low" style="cursor: pointer;" @click="setBetData(0, 'back')">
                                <rect id="low_box" x="700" y="254" width="355" height="123" rx="6" fill="#EF0518"
                                    fill-opacity="0.1" stroke="#F46A59" stroke-width="4" />
                                <text id="LOW" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="60" font-weight="bold" letter-spacing="0em">
                                    <tspan x="720.207" y="320.469">{{ mainData[0].nat }}</tspan>
                                </text>
                                <text id="1.99" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                    text-anchor="end" dominant-baseline="middle">
                                    <tspan :x="getRectRightCordinates(355, 700, 20)"
                                        :y="getRectCenterCordinates(123, 254)">{{ mainData[0].b }}</tspan>
                                </text>
                                <g id="low_suspended" v-if="mainData[0].gstatus != 'OPEN'">
                                    <g id="low_suspended_box">
                                        <rect x="698" y="251" width="359" height="127" rx="8" fill="black"
                                            fill-opacity="0.3" />
                                        <rect x="698" y="251" width="359" height="127" rx="8" stroke="#F46A59" />
                                    </g>
                                    <path id="low_lock"
                                        d="M903.821 309.688H900.232V298.859C900.232 286.257 890.033 276 877.5 276C864.967 276 854.768 286.257 854.768 298.859V309.688H851.179C847.215 309.688 844 312.921 844 316.906V345.781C844 349.767 847.215 353 851.179 353H903.821C907.785 353 911 349.767 911 345.781V316.906C911 312.921 907.785 309.688 903.821 309.688ZM888.268 309.688H866.732V298.859C866.732 292.889 871.563 288.031 877.5 288.031C883.437 288.031 888.268 292.889 888.268 298.859V309.688Z"
                                        fill="white" />
                                </g>
                                <text id="10000" fill="#92000C" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                    <tspan x="718.184" y="359.19"
                                        :class="{'suspended-book': mainData[0].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[0].sid}"></tspan>
                                </text>
                            </g>
                            <g id="high" style="cursor: pointer;" @click="setBetData(1, 'back')">
                                <rect id="tiger_box" x="1445" y="254" width="355" height="123" rx="6" fill="#00A200"
                                    fill-opacity="0.1" stroke="#00A200" stroke-width="4" />
                                <text id="HIGH" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="60" font-weight="bold" letter-spacing="0em">
                                    <tspan x="1463.41" y="320.469">{{ mainData[1].nat }}</tspan>
                                </text>
                                <text id="1.99_2" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                    text-anchor="end" dominant-baseline="middle">
                                    <tspan :x="getRectRightCordinates(355, 1455, 20)"
                                        :y="getRectCenterCordinates(123, 254)">{{ mainData[1].b }}</tspan>
                                </text>
                                <g id="high_suspended" v-if="mainData[1].gstatus != 'OPEN'">
                                    <g id="high_suspended_box">
                                        <rect x="1443" y="251" width="359" height="127" rx="8" fill="black"
                                            fill-opacity="0.3" />
                                        <rect x="1443" y="251" width="359" height="127" rx="8" stroke="#F46A59" />
                                    </g>
                                    <path id="high_lock"
                                        d="M1648.82 309.688H1645.23V298.859C1645.23 286.257 1635.03 276 1622.5 276C1609.97 276 1599.77 286.257 1599.77 298.859V309.688H1596.18C1592.22 309.688 1589 312.921 1589 316.906V345.781C1589 349.767 1592.22 353 1596.18 353H1648.82C1652.78 353 1656 349.767 1656 345.781V316.906C1656 312.921 1652.78 309.688 1648.82 309.688ZM1633.27 309.688H1611.73V298.859C1611.73 292.889 1616.56 288.031 1622.5 288.031C1628.44 288.031 1633.27 292.889 1633.27 298.859V309.688Z"
                                        fill="white" />
                                </g>
                                <text id="10000_2" fill="#92000C" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                    <tspan x="1463.18" y="359.19"
                                        :class="{'suspended-book': mainData[1].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[1].sid}"></tspan>
                                </text>
                            </g>
                        </g>
                        <g id="other_odds">
                            <g id="dragon_even" style="cursor: pointer;" @click="setBetData(2, 'back')">
                                <rect id="dragon_even_box" x="2" y="431" width="285" height="123" rx="6" fill="black"
                                    fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4" />
                                <text id="EVEN" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="60" font-weight="bold" letter-spacing="0em">
                                    <tspan x="21.2656" y="497.469">{{ mainData[2].nat }}</tspan>
                                </text>
                                <text id="1.99_3" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                    text-anchor="end" dominant-baseline="middle">
                                    <tspan :x="getRectRightCordinates(285, 2, 20)"
                                        :y="getRectCenterCordinates(123, 431)">{{ mainData[2].b }}</tspan>
                                </text>
                                <g id="dragon_even_suspended" v-if="mainData[2].gstatus != 'OPEN'">
                                    <g id="dragon_even_suspended_box">
                                        <rect x="1" y="428" width="288" height="127" rx="8" fill="black"
                                            fill-opacity="0.3" />
                                        <rect x="1" y="428" width="288" height="127" rx="8" stroke="#F46A59" />
                                    </g>
                                    <path id="dragon_even_lock"
                                        d="M170.821 470.688H167.232V459.859C167.232 447.257 157.033 437 144.5 437C131.967 437 121.768 447.257 121.768 459.859V470.688H118.179C114.215 470.688 111 473.921 111 477.906V506.781C111 510.767 114.215 514 118.179 514H170.821C174.785 514 178 510.767 178 506.781V477.906C178 473.921 174.785 470.688 170.821 470.688ZM155.268 470.688H133.732V459.859C133.732 453.889 138.563 449.031 144.5 449.031C150.437 449.031 155.268 453.889 155.268 459.859V470.688Z"
                                        fill="white" />
                                </g>
                                <text id="10000_3" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" letter-spacing="0em">
                                    <tspan x="21.1836" y="549.19"
                                        :class="{'suspended-book': mainData[2].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[2].sid}"></tspan>
                                </text>
                            </g>
                            <g id="dragon_odd" style="cursor: pointer;" @click="setBetData(3, 'back')">
                                <rect id="dragon_odd_box" x="316" y="431" width="285" height="123" rx="6" fill="black"
                                    fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4" />
                                <text id="ODD" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="60" font-weight="bold" letter-spacing="0em">
                                    <tspan x="335.32" y="497.469">{{ mainData[3].nat }}</tspan>
                                </text>
                                <text id="1.99_4" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                    text-anchor="end" dominant-baseline="middle">
                                    <tspan :x="getRectRightCordinates(285, 316, 20)"
                                        :y="getRectCenterCordinates(123, 431)">{{ mainData[3].b }}</tspan>
                                </text>
                                <g id="dragon_odd_suspended" v-if="mainData[3].gstatus != 'OPEN'">
                                    <g id="dragon_odd_suspended_box">
                                        <rect x="315" y="428" width="288" height="127" rx="8" fill="black"
                                            fill-opacity="0.3" />
                                        <rect x="315" y="428" width="288" height="127" rx="8" stroke="#F46A59" />
                                    </g>
                                    <path id="dragon_odd_lock"
                                        d="M484.821 470.688H481.232V459.859C481.232 447.257 471.033 437 458.5 437C445.967 437 435.768 447.257 435.768 459.859V470.688H432.179C428.215 470.688 425 473.921 425 477.906V506.781C425 510.767 428.215 514 432.179 514H484.821C488.785 514 492 510.767 492 506.781V477.906C492 473.921 488.785 470.688 484.821 470.688ZM469.268 470.688H447.732V459.859C447.732 453.889 452.563 449.031 458.5 449.031C464.437 449.031 469.268 453.889 469.268 459.859V470.688Z"
                                        fill="white" />
                                </g>
                                <text id="10000_4" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" letter-spacing="0em">
                                    <tspan x="335.184" y="550.19"
                                        :class="{'suspended-book': mainData[3].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[3].sid}"></tspan>
                                </text>
                            </g>
                            <g id="dragon_black" style="cursor: pointer;" @click="setBetData(5, 'back')">
                                <rect id="dragon_black_box" x="630" y="431" width="285" height="123" rx="6" fill="black"
                                    fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4" />
                                <text id="1.99_5" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                    text-anchor="end">
                                    <tspan :x="getRectRightCordinates(285, 630, 20)"
                                        :y="getRectCenterCordinates(123, 431)">{{ mainData[5].b }}</tspan>
                                </text>
                                <rect id="spade" x="646" y="441" width="60" height="60" fill="url(#pattern2)" />
                                <rect id="club" x="696" y="441" width="60" height="60" fill="url(#pattern3)" />
                                <g id="dragon_black_suspended" v-if="mainData[5].gstatus != 'OPEN'">
                                    <g id="dragon_black_suspended_box">
                                        <rect x="629" y="428" width="288" height="127" rx="8" fill="black"
                                            fill-opacity="0.3" />
                                        <rect x="629" y="428" width="288" height="127" rx="8" stroke="#F46A59" />
                                    </g>
                                    <path id="dragon_black_lock"
                                        d="M798.821 470.688H795.232V459.859C795.232 447.257 785.033 437 772.5 437C759.967 437 749.768 447.257 749.768 459.859V470.688H746.179C742.215 470.688 739 473.921 739 477.906V506.781C739 510.767 742.215 514 746.179 514H798.821C802.785 514 806 510.767 806 506.781V477.906C806 473.921 802.785 470.688 798.821 470.688ZM783.268 470.688H761.732V459.859C761.732 453.889 766.563 449.031 772.5 449.031C778.437 449.031 783.268 453.889 783.268 459.859V470.688Z"
                                        fill="white" />
                                </g>
                                <text id="10000_5" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" letter-spacing="0em">
                                    <tspan x="649.184" y="550.19"
                                        :class="{'suspended-book': mainData[5].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[5].sid}"></tspan>
                                </text>
                            </g>
                            <g id="dragon_red" @click="setBetData(4, 'back')">
                                <rect id="dragon_red_box" x="944" y="431" width="285" height="123" rx="6" fill="black"
                                    fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4" />
                                <text id="1.99_6" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                    text-anchor="end" dominant-baseline="middle">
                                    <tspan :x="getRectRightCordinates(285, 944, 20)"
                                        :y="getRectCenterCordinates(123, 410)">{{ mainData[4].b }}</tspan>
                                </text>
                                <rect id="heart" x="963" y="441" width="60" height="60" fill="url(#pattern4)" />
                                <rect id="diamond" x="1018" y="441" width="60" height="60" fill="url(#pattern5)" />
                                <g id="dragon_red_suspended" v-if="mainData[4].gstatus != 'OPEN'">
                                    <g id="dragon_red_suspended_box">
                                        <rect x="943" y="428" width="288" height="127" rx="8" fill="black"
                                            fill-opacity="0.3" />
                                        <rect x="943" y="428" width="288" height="127" rx="8" stroke="#F46A59" />
                                    </g>
                                    <path id="dragon_red_lock"
                                        d="M1112.82 470.688H1109.23V459.859C1109.23 447.257 1099.03 437 1086.5 437C1073.97 437 1063.77 447.257 1063.77 459.859V470.688H1060.18C1056.22 470.688 1053 473.921 1053 477.906V506.781C1053 510.767 1056.22 514 1060.18 514H1112.82C1116.78 514 1120 510.767 1120 506.781V477.906C1120 473.921 1116.78 470.688 1112.82 470.688ZM1097.27 470.688H1075.73V459.859C1075.73 453.889 1080.56 449.031 1086.5 449.031C1092.44 449.031 1097.27 453.889 1097.27 459.859V470.688Z"
                                        fill="white" />
                                </g>
                                <text id="10000_6" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" letter-spacing="0em">
                                    <tspan x="963.184" y="550.19"
                                        :class="{'suspended-book': mainData[4].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[4].sid}"></tspan>
                                </text>
                            </g>
                            <g id="card_123" style="cursor: pointer;" @click="setBetData(19, 'back')">
                                <rect id="card123_box" x="1258" y="431" width="285" height="121" rx="6" fill="#0041A2"
                                    fill-opacity="0.1" stroke="#0041A2" stroke-width="4" />
                                <text id="1.99_7" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                    text-anchor="end" dominant-baseline="middle">
                                    <tspan :x="getRectRightCordinates(285, 1258, 20)"
                                        :y="getRectCenterCordinates(121, 431)">{{ mainData[19].b }}</tspan>
                                </text>
                                <rect id="card_a" x="1282" y="437" width="50" height="69" fill="url(#cardall1)" />
                                <rect id="card_a_2" x="1335" y="437" width="50" height="69" fill="url(#cardall2)" />
                                <rect id="card_a_3" x="1389" y="437" width="50" height="69" fill="url(#cardall3)" />
                                <g id="card123_suspended" v-if="mainData[19].gstatus != 'OPEN'">
                                    <g id="card123_suspended_box">
                                        <rect x="1256" y="428" width="289" height="125" rx="8" fill="black"
                                            fill-opacity="0.3" />
                                        <rect x="1256" y="428" width="289" height="125" rx="8" stroke="#F46A59" />
                                    </g>
                                    <path id="card123_lock"
                                        d="M1427.46 467.188H1424.2V457.484C1424.2 446.191 1414.91 437 1403.5 437C1392.09 437 1382.8 446.191 1382.8 457.484V467.188H1379.54C1375.93 467.188 1373 470.085 1373 473.656V499.531C1373 503.103 1375.93 506 1379.54 506H1427.46C1431.07 506 1434 503.103 1434 499.531V473.656C1434 470.085 1431.07 467.188 1427.46 467.188ZM1413.3 467.188H1393.7V457.484C1393.7 452.134 1398.09 447.781 1403.5 447.781C1408.91 447.781 1413.3 452.134 1413.3 457.484V467.188Z"
                                        fill="white" />
                                </g>
                                <text id="10000_7" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" letter-spacing="0em">
                                    <tspan x="1282.18" y="547.065"
                                        :class="{'suspended-book': mainData[19].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[19].sid}"></tspan>
                                </text>
                            </g>
                            <g id="card_456" style="cursor: pointer;" @click="setBetData(20, 'back')">
                                <rect id="card456_box" x="1572" y="431" width="285" height="121" rx="6" fill="#0041A2"
                                    fill-opacity="0.1" stroke="#0041A2" stroke-width="4" />
                                <text id="1.99_8" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                    text-anchor="end" dominant-baseline="middle">
                                    <tspan :x="getRectRightCordinates(285, 1572, 20)"
                                        :y="getRectCenterCordinates(121, 431)">{{ mainData[20].b }}</tspan>
                                </text>
                                <rect id="card_a_4" x="1596" y="437" width="50" height="69" fill="url(#cardall4)" />
                                <rect id="card_a_5" x="1649" y="437" width="50" height="69" fill="url(#cardall5)" />
                                <rect id="card_a_6" x="1703" y="437" width="50" height="69" fill="url(#cardall6)" />
                                <g id="card456_suspended" v-if="mainData[20].gstatus != 'OPEN'">
                                    <g id="card456_suspended_box">
                                        <rect x="1570" y="428" width="289" height="125" rx="8" fill="black"
                                            fill-opacity="0.3" />
                                        <rect x="1570" y="428" width="289" height="125" rx="8" stroke="#F46A59" />
                                    </g>
                                    <path id="card456_lock"
                                        d="M1741.46 467.188H1738.2V457.484C1738.2 446.191 1728.91 437 1717.5 437C1706.09 437 1696.8 446.191 1696.8 457.484V467.188H1693.54C1689.93 467.188 1687 470.085 1687 473.656V499.531C1687 503.103 1689.93 506 1693.54 506H1741.46C1745.07 506 1748 503.103 1748 499.531V473.656C1748 470.085 1745.07 467.188 1741.46 467.188ZM1727.3 467.188H1707.7V457.484C1707.7 452.134 1712.09 447.781 1717.5 447.781C1722.91 447.781 1727.3 452.134 1727.3 457.484V467.188Z"
                                        fill="white" />
                                </g>
                                <text id="10000_8" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" letter-spacing="0em">
                                    <tspan x="1596.18" y="547.065"
                                        :class="{'suspended-book': mainData[20].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[20].sid}"></tspan>
                                </text>
                            </g>
                            <g id="card_8910" style="cursor: pointer;" @click="setBetData(21, 'back')">
                                <rect id="card8910_box" x="1886" y="431" width="285" height="121" rx="6" fill="#0041A2"
                                    fill-opacity="0.1" stroke="#0041A2" stroke-width="4" />
                                <text id="1.99_9" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                    text-anchor="end" dominant-baseline="middle">
                                    <tspan :x="getRectRightCordinates(285, 1886, 20)"
                                        :y="getRectCenterCordinates(121, 431)">{{ mainData[21].b }}</tspan>
                                </text>
                                <rect id="card_a_7" x="1910" y="437" width="50" height="69" fill="url(#cardall8)" />
                                <rect id="card_a_8" x="1963" y="437" width="50" height="69" fill="url(#cardall9)" />
                                <rect id="card_a_9" x="2017" y="437" width="50" height="69" fill="url(#cardall10)" />
                                <g id="card8910_suspended" v-if="mainData[21].gstatus != 'OPEN'">
                                    <g id="card8910_suspended_box">
                                        <rect x="1884" y="428" width="289" height="125" rx="8" fill="black"
                                            fill-opacity="0.3" />
                                        <rect x="1884" y="428" width="289" height="125" rx="8" stroke="#F46A59" />
                                    </g>
                                    <path id="card8910_lock"
                                        d="M2055.46 467.188H2052.2V457.484C2052.2 446.191 2042.91 437 2031.5 437C2020.09 437 2010.8 446.191 2010.8 457.484V467.188H2007.54C2003.93 467.188 2001 470.085 2001 473.656V499.531C2001 503.103 2003.93 506 2007.54 506H2055.46C2059.07 506 2062 503.103 2062 499.531V473.656C2062 470.085 2059.07 467.188 2055.46 467.188ZM2041.3 467.188H2021.7V457.484C2021.7 452.134 2026.09 447.781 2031.5 447.781C2036.91 447.781 2041.3 452.134 2041.3 457.484V467.188Z"
                                        fill="white" />
                                </g>
                                <text id="10000_9" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" letter-spacing="0em">
                                    <tspan x="1910.18" y="547.065"
                                        :class="{'suspended-book': mainData[21].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[21].sid}"></tspan>
                                </text>
                            </g>
                            <g id="card_jqk" style="cursor: pointer;" @click="setBetData(22, 'back')">
                                <rect id="cardjqk_box" x="2200" y="431" width="285" height="121" rx="6" fill="#0041A2"
                                    fill-opacity="0.1" stroke="#0041A2" stroke-width="4" />
                                <text id="1.99_10" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                    text-anchor="end" dominant-baseline="middle">
                                    <tspan :x="getRectRightCordinates(285, 2200, 20)"
                                        :y="getRectCenterCordinates(121, 431)">{{ mainData[22].b }}</tspan>
                                </text>
                                <rect id="card_a_10" x="2224" y="437" width="50" height="69" fill="url(#cardall11)" />
                                <rect id="card_a_11" x="2277" y="437" width="50" height="69" fill="url(#cardall12)" />
                                <rect id="card_a_12" x="2331" y="437" width="50" height="69" fill="url(#cardall13)" />
                                <g id="cardjqk_suspended" v-if="mainData[22].gstatus != 'OPEN'">
                                    <g id="cardjqk_suspended_box">
                                        <rect x="2198" y="428" width="289" height="125" rx="8" fill="black"
                                            fill-opacity="0.3" />
                                        <rect x="2198" y="428" width="289" height="125" rx="8" stroke="#F46A59" />
                                    </g>
                                    <path id="cardjqk_lock"
                                        d="M2369.46 467.188H2366.2V457.484C2366.2 446.191 2356.91 437 2345.5 437C2334.09 437 2324.8 446.191 2324.8 457.484V467.188H2321.54C2317.93 467.188 2315 470.085 2315 473.656V499.531C2315 503.103 2317.93 506 2321.54 506H2369.46C2373.07 506 2376 503.103 2376 499.531V473.656C2376 470.085 2373.07 467.188 2369.46 467.188ZM2355.3 467.188H2335.7V457.484C2335.7 452.134 2340.09 447.781 2345.5 447.781C2350.91 447.781 2355.3 452.134 2355.3 457.484V467.188Z"
                                        fill="white" />
                                </g>
                                <text id="10000_10" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" letter-spacing="0em">
                                    <tspan x="2224.18" y="547.065"
                                        :class="{'suspended-book': mainData[22].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[22].sid}"></tspan>
                                </text>
                            </g>
                        </g>
                        <g id="card_rate">
                            <rect id="card_rate_box" x="47" y="645" width="129" height="71" rx="5" fill="black"
                                fill-opacity="0.01" stroke="black" stroke-width="4"></rect>
                            <text id="12.0" fill="black" xml:space="preserve" style="white-space: pre"
                                font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                text-anchor="middle">
                                <tspan :x="getRectCenterCordinates(129, 47)" y="699.891">{{mainData[6].b}}</tspan>
                            </text>
                        </g>
                        <g id="cards">
                            <g id="card1" style="cursor: pointer;" @click="setBetData(6, 'back')">
                                <rect id="card1_box" x="242" y="606" width="126" height="147" fill="black"
                                    fill-opacity="0.01" />
                                <rect id="card_a_13" x="261" y="606" width="87" height="120" fill="url(#cardall1)" />
                                <text id="100000" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 242)" y="762.19"
                                        :class="{'suspended-book': mainData[6].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[6].sid}"></tspan>
                                </text>
                                <g id="card1_suspended" v-if="mainData[6].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box" x="261" y="606" width="87" height="120" fill="black"
                                        fill-opacity="0.3" />
                                    <path id="card1_lock"
                                        d="M321.837 663.473H319.473V656.368C319.473 648.098 312.755 641.368 304.5 641.368C296.245 641.368 289.527 648.098 289.527 656.368V663.473H287.163C284.553 663.473 282.435 665.595 282.435 668.21V687.158C282.435 689.773 284.553 691.894 287.163 691.894H321.837C324.447 691.894 326.565 689.773 326.565 687.158V668.21C326.565 665.595 324.447 663.473 321.837 663.473ZM311.592 663.473H297.408V656.368C297.408 652.45 300.589 649.263 304.5 649.263C308.411 649.263 311.592 652.45 311.592 656.368V663.473Z"
                                        fill="white" />
                                </g>
                            </g>
                            <g id="card2" @click="setBetData(7, 'back')">
                                <rect id="card2_box" x="398" y="606" width="126" height="147" fill="black"
                                    fill-opacity="0.01" />
                                <rect id="card_2" x="417" y="606" width="87" height="120" fill="url(#cardall2)" />
                                <text id="100000_2" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 398)" y="762.19"
                                        :class="{'suspended-book': mainData[7].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[7].sid}"></tspan>
                                </text>
                                <g id="card2_suspended" v-if="mainData[7].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_2" x="417" y="606" width="87" height="120"
                                        fill="black" fill-opacity="0.3" />
                                    <path id="card1_lock_2"
                                        d="M477.837 663.473H475.473V656.368C475.473 648.098 468.755 641.368 460.5 641.368C452.245 641.368 445.527 648.098 445.527 656.368V663.473H443.163C440.553 663.473 438.435 665.595 438.435 668.21V687.158C438.435 689.773 440.553 691.894 443.163 691.894H477.837C480.447 691.894 482.565 689.773 482.565 687.158V668.21C482.565 665.595 480.447 663.473 477.837 663.473ZM467.592 663.473H453.408V656.368C453.408 652.45 456.589 649.263 460.5 649.263C464.411 649.263 467.592 652.45 467.592 656.368V663.473Z"
                                        fill="white" />
                                </g>
                            </g>
                            <g id="card3" @click="setBetData(8, 'back')">
                                <rect id="card3_box" x="554" y="606" width="126" height="147" fill="black"
                                    fill-opacity="0.01" />
                                <rect id="card_3" x="573" y="606" width="87" height="120" fill="url(#cardall3)" />
                                <text id="100000_3" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 554)" y="762.19"
                                        :class="{'suspended-book': mainData[8].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[8].sid}"></tspan>
                                </text>
                                <g id="card3_suspended" v-if="mainData[8].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_3" x="573" y="606" width="87" height="120"
                                        fill="black" fill-opacity="0.3" />
                                    <path id="card1_lock_3"
                                        d="M633.837 663.473H631.473V656.368C631.473 648.098 624.755 641.368 616.5 641.368C608.245 641.368 601.527 648.098 601.527 656.368V663.473H599.163C596.553 663.473 594.435 665.595 594.435 668.21V687.158C594.435 689.773 596.553 691.894 599.163 691.894H633.837C636.447 691.894 638.565 689.773 638.565 687.158V668.21C638.565 665.595 636.447 663.473 633.837 663.473ZM623.592 663.473H609.408V656.368C609.408 652.45 612.589 649.263 616.5 649.263C620.411 649.263 623.592 652.45 623.592 656.368V663.473Z"
                                        fill="white" />
                                </g>
                            </g>
                            <g id="card2_2" @click="setBetData(9, 'back')">
                                <rect id="card4_box" x="710" y="606" width="126" height="147" fill="black"
                                    fill-opacity="0.01" />
                                <rect id="card_4" x="729" y="606" width="87" height="120" fill="url(#cardall4)" />
                                <text id="100000_4" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 710)" y="762.19"
                                        :class="{'suspended-book': mainData[9].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[9].sid}"></tspan>
                                </text>
                                <g id="card4_suspended" v-if="mainData[9].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_4" x="729" y="606" width="87" height="120"
                                        fill="black" fill-opacity="0.3" />
                                    <path id="card1_lock_4"
                                        d="M789.837 663.473H787.473V656.368C787.473 648.098 780.755 641.368 772.5 641.368C764.245 641.368 757.527 648.098 757.527 656.368V663.473H755.163C752.553 663.473 750.435 665.595 750.435 668.21V687.158C750.435 689.773 752.553 691.894 755.163 691.894H789.837C792.447 691.894 794.565 689.773 794.565 687.158V668.21C794.565 665.595 792.447 663.473 789.837 663.473ZM779.592 663.473H765.408V656.368C765.408 652.45 768.589 649.263 772.5 649.263C776.411 649.263 779.592 652.45 779.592 656.368V663.473Z"
                                        fill="white" />
                                </g>
                            </g>
                            <g id="card5" @click="setBetData(10, 'back')">
                                <rect id="card5_box" x="866" y="606" width="126" height="147" fill="black"
                                    fill-opacity="0.01" />
                                <rect id="card_5" x="885" y="606" width="87" height="120" fill="url(#cardall5)" />
                                <text id="100000_5" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 866)" y="762.19"
                                        :class="{'suspended-book': mainData[10].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[10].sid}"></tspan>
                                </text>
                                <g id="card5_suspended" v-if="mainData[10].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_5" x="885" y="606" width="87" height="120"
                                        fill="black" fill-opacity="0.3" />
                                    <path id="card1_lock_5"
                                        d="M945.837 663.473H943.473V656.368C943.473 648.098 936.755 641.368 928.5 641.368C920.245 641.368 913.527 648.098 913.527 656.368V663.473H911.163C908.553 663.473 906.435 665.595 906.435 668.21V687.158C906.435 689.773 908.553 691.894 911.163 691.894H945.837C948.447 691.894 950.565 689.773 950.565 687.158V668.21C950.565 665.595 948.447 663.473 945.837 663.473ZM935.592 663.473H921.408V656.368C921.408 652.45 924.589 649.263 928.5 649.263C932.411 649.263 935.592 652.45 935.592 656.368V663.473Z"
                                        fill="white" />
                                </g>
                            </g>
                            <g id="card6" @click="setBetData(11, 'back')">
                                <rect id="card6_box" x="1022" y="606" width="126" height="147" fill="black"
                                    fill-opacity="0.01" />
                                <rect id="card_6" x="1041" y="606" width="87" height="120" fill="url(#cardall6)" />
                                <text id="100000_6" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 1022)" y="762.19"
                                        :class="{'suspended-book': mainData[11].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[11].sid}"></tspan>
                                </text>
                                <g id="card6_suspended" v-if="mainData[11].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_6" x="1041" y="606" width="87" height="120"
                                        fill="black" fill-opacity="0.3" />
                                    <path id="card1_lock_6"
                                        d="M1101.84 663.473H1099.47V656.368C1099.47 648.098 1092.75 641.368 1084.5 641.368C1076.25 641.368 1069.53 648.098 1069.53 656.368V663.473H1067.16C1064.55 663.473 1062.43 665.595 1062.43 668.21V687.158C1062.43 689.773 1064.55 691.894 1067.16 691.894H1101.84C1104.45 691.894 1106.57 689.773 1106.57 687.158V668.21C1106.57 665.595 1104.45 663.473 1101.84 663.473ZM1091.59 663.473H1077.41V656.368C1077.41 652.45 1080.59 649.263 1084.5 649.263C1088.41 649.263 1091.59 652.45 1091.59 656.368V663.473Z"
                                        fill="white" />
                                </g>
                            </g>
                            <g id="card7" @click="setBetData(12, 'back')">
                                <rect id="card7_box" x="1178" y="606" width="126" height="147" fill="black"
                                    fill-opacity="0.01" />
                                <rect id="card_7" x="1197" y="606" width="87" height="120" fill="url(#cardall7)" />
                                <text id="100000_7" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 1178)" y="762.19"
                                        :class="{'suspended-book': mainData[12].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[12].sid}"></tspan>
                                </text>
                                <g id="card7_suspended" v-if="mainData[12].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_7" x="1197" y="606" width="87" height="120"
                                        fill="black" fill-opacity="0.3" />
                                    <path id="card1_lock_7"
                                        d="M1257.84 663.473H1255.47V656.368C1255.47 648.098 1248.75 641.368 1240.5 641.368C1232.25 641.368 1225.53 648.098 1225.53 656.368V663.473H1223.16C1220.55 663.473 1218.43 665.595 1218.43 668.21V687.158C1218.43 689.773 1220.55 691.894 1223.16 691.894H1257.84C1260.45 691.894 1262.57 689.773 1262.57 687.158V668.21C1262.57 665.595 1260.45 663.473 1257.84 663.473ZM1247.59 663.473H1233.41V656.368C1233.41 652.45 1236.59 649.263 1240.5 649.263C1244.41 649.263 1247.59 652.45 1247.59 656.368V663.473Z"
                                        fill="white" />
                                </g>
                            </g>
                            <g id="card8" @click="setBetData(13, 'back')">
                                <rect id="card8_box" x="1334" y="606" width="126" height="147" fill="black"
                                    fill-opacity="0.01" />
                                <rect id="card_8" x="1353" y="606" width="87" height="120" fill="url(#cardall8)" />
                                <text id="100000_8" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    text-anchor="middle" :x="getRectCenterCordinates(126, 1334)" y="762.19">
                                    <tspan :class="{'suspended-book': mainData[13].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[13].sid}"></tspan>
                                </text>
                                <g id="card8_suspended" v-if="mainData[13].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_8" x="1353" y="606" width="87" height="120"
                                        fill="black" fill-opacity="0.3" />
                                    <path id="card1_lock_8"
                                        d="M1413.84 663.473H1411.47V656.368C1411.47 648.098 1404.75 641.368 1396.5 641.368C1388.25 641.368 1381.53 648.098 1381.53 656.368V663.473H1379.16C1376.55 663.473 1374.43 665.595 1374.43 668.21V687.158C1374.43 689.773 1376.55 691.894 1379.16 691.894H1413.84C1416.45 691.894 1418.57 689.773 1418.57 687.158V668.21C1418.57 665.595 1416.45 663.473 1413.84 663.473ZM1403.59 663.473H1389.41V656.368C1389.41 652.45 1392.59 649.263 1396.5 649.263C1400.41 649.263 1403.59 652.45 1403.59 656.368V663.473Z"
                                        fill="white" />
                                </g>
                            </g>
                            <g id="card9" @click="setBetData(14, 'back')">
                                <rect id="card9_box" x="1490" y="606" width="126" height="147" fill="black"
                                    fill-opacity="0.01" />
                                <rect id="card_9" x="1509" y="606" width="87" height="120" fill="url(#cardall9)" />
                                <text id="100000_9" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 1490)" y="762.19"
                                        :class="{'suspended-book': mainData[14].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[14].sid}"></tspan>
                                </text>
                                <g id="card9_suspended" v-if="mainData[14].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_9" x="1509" y="606" width="87" height="120"
                                        fill="black" fill-opacity="0.3" />
                                    <path id="card1_lock_9"
                                        d="M1569.84 663.473H1567.47V656.368C1567.47 648.098 1560.75 641.368 1552.5 641.368C1544.25 641.368 1537.53 648.098 1537.53 656.368V663.473H1535.16C1532.55 663.473 1530.43 665.595 1530.43 668.21V687.158C1530.43 689.773 1532.55 691.894 1535.16 691.894H1569.84C1572.45 691.894 1574.57 689.773 1574.57 687.158V668.21C1574.57 665.595 1572.45 663.473 1569.84 663.473ZM1559.59 663.473H1545.41V656.368C1545.41 652.45 1548.59 649.263 1552.5 649.263C1556.41 649.263 1559.59 652.45 1559.59 656.368V663.473Z"
                                        fill="white" />
                                </g>
                            </g>
                            <g id="card10" @click="setBetData(15, 'back')">
                                <rect id="card10_box" x="1646" y="606" width="126" height="147" fill="black"
                                    fill-opacity="0.01" />
                                <rect id="card_10" x="1665" y="606" width="87" height="120" fill="url(#cardall10)" />
                                <text id="100000_10" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 1676)" y="762.19"
                                        :class="{'suspended-book': mainData[15].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[15].sid}"></tspan>
                                </text>
                                <g id="card10_suspended" v-if="mainData[15].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_10" x="1665" y="606" width="87" height="120"
                                        fill="black" fill-opacity="0.3" />
                                    <path id="card1_lock_10"
                                        d="M1725.84 663.473H1723.47V656.368C1723.47 648.098 1716.75 641.368 1708.5 641.368C1700.25 641.368 1693.53 648.098 1693.53 656.368V663.473H1691.16C1688.55 663.473 1686.43 665.595 1686.43 668.21V687.158C1686.43 689.773 1688.55 691.894 1691.16 691.894H1725.84C1728.45 691.894 1730.57 689.773 1730.57 687.158V668.21C1730.57 665.595 1728.45 663.473 1725.84 663.473ZM1715.59 663.473H1701.41V656.368C1701.41 652.45 1704.59 649.263 1708.5 649.263C1712.41 649.263 1715.59 652.45 1715.59 656.368V663.473Z"
                                        fill="white" />
                                </g>
                            </g>
                            <g id="card11" @click="setBetData(16, 'back')">
                                <rect id="card11_box" x="1802" y="606" width="126" height="147" fill="black"
                                    fill-opacity="0.01" />
                                <rect id="card_j" x="1821" y="606" width="87" height="120" fill="url(#cardall11)" />
                                <text id="100000_11" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 1802)" y="762.19"
                                        :class="{'suspended-book': mainData[16].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[16].sid}"></tspan>
                                </text>
                                <g id="card11_suspended" v-if="mainData[16].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_11" x="1821" y="606" width="87" height="120"
                                        fill="black" fill-opacity="0.3" />
                                    <path id="card1_lock_11"
                                        d="M1881.84 663.473H1879.47V656.368C1879.47 648.098 1872.75 641.368 1864.5 641.368C1856.25 641.368 1849.53 648.098 1849.53 656.368V663.473H1847.16C1844.55 663.473 1842.43 665.595 1842.43 668.21V687.158C1842.43 689.773 1844.55 691.894 1847.16 691.894H1881.84C1884.45 691.894 1886.57 689.773 1886.57 687.158V668.21C1886.57 665.595 1884.45 663.473 1881.84 663.473ZM1871.59 663.473H1857.41V656.368C1857.41 652.45 1860.59 649.263 1864.5 649.263C1868.41 649.263 1871.59 652.45 1871.59 656.368V663.473Z"
                                        fill="white" />
                                </g>
                            </g>
                            <g id="card12" @click="setBetData(17, 'back')">
                                <rect id="card12_box" x="1958" y="606" width="126" height="147" fill="black"
                                    fill-opacity="0.01" />
                                <rect id="card_q" x="1977" y="606" width="87" height="120" fill="url(#cardall12)" />
                                <text id="100000_12" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 1958)" y="762.19"
                                        :class="{'suspended-book': mainData[17].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[17].sid}"></tspan>
                                </text>
                                <g id="card12_suspended" v-if="mainData[17].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_12" x="1977" y="606" width="87" height="120"
                                        fill="black" fill-opacity="0.3" />
                                    <path id="card1_lock_12"
                                        d="M2037.84 663.473H2035.47V656.368C2035.47 648.098 2028.75 641.368 2020.5 641.368C2012.25 641.368 2005.53 648.098 2005.53 656.368V663.473H2003.16C2000.55 663.473 1998.43 665.595 1998.43 668.21V687.158C1998.43 689.773 2000.55 691.894 2003.16 691.894H2037.84C2040.45 691.894 2042.57 689.773 2042.57 687.158V668.21C2042.57 665.595 2040.45 663.473 2037.84 663.473ZM2027.59 663.473H2013.41V656.368C2013.41 652.45 2016.59 649.263 2020.5 649.263C2024.41 649.263 2027.59 652.45 2027.59 656.368V663.473Z"
                                        fill="white" />
                                </g>
                            </g>
                            <g id="card13" @click="setBetData(18, 'back')">
                                <rect id="card13_box" x="2114" y="606" width="126" height="147" fill="black"
                                    fill-opacity="0.01" />
                                <rect id="card_k" x="2133" y="606" width="87" height="120" fill="url(#cardall13)" />
                                <text id="100000_13" fill="black" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em"
                                    text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(126, 2114)" y="762.19"
                                        :class="{'suspended-book': mainData[18].gstatus != 'OPEN'}"
                                        v-vcasinofancybook="{sid: mainData[18].sid}"></tspan>
                                </text>
                                <g id="card13_suspended" v-if="mainData[18].gstatus != 'OPEN'">
                                    <rect id="card1_suspended_box_13" x="2133" y="606" width="87" height="120"
                                        fill="black" fill-opacity="0.3" />
                                    <path id="card1_lock_13"
                                        d="M2193.84 663.473H2191.47V656.368C2191.47 648.098 2184.75 641.368 2176.5 641.368C2168.25 641.368 2161.53 648.098 2161.53 656.368V663.473H2159.16C2156.55 663.473 2154.43 665.595 2154.43 668.21V687.158C2154.43 689.773 2156.55 691.894 2159.16 691.894H2193.84C2196.45 691.894 2198.57 689.773 2198.57 687.158V668.21C2198.57 665.595 2196.45 663.473 2193.84 663.473ZM2183.59 663.473H2169.41V656.368C2169.41 652.45 2172.59 649.263 2176.5 649.263C2180.41 649.263 2183.59 652.45 2183.59 656.368V663.473Z"
                                        fill="white" />
                                </g>
                            </g>
                        </g>
                    </g>
                    <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image0" transform="scale(0.02 0.0142857)" />
                        </pattern>
                        <pattern id="card1Icon" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#card1Img" transform="scale(0.02 0.0142857)" />
                        </pattern>
                        <pattern id="pattern2" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image1" transform="scale(0.02)" />
                        </pattern>
                        <pattern id="pattern3" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image2" transform="scale(0.02)" />
                        </pattern>
                        <pattern id="pattern4" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image3" transform="scale(0.02)" />
                        </pattern>
                        <pattern id="pattern5" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image4" transform="scale(0.02)" />
                        </pattern>

                        <pattern id="pattern7" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)" />
                        </pattern>
                        <pattern id="pattern8" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)" />
                        </pattern>
                        <pattern id="pattern9" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)" />
                        </pattern>
                        <pattern id="pattern10" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)" />
                        </pattern>
                        <pattern id="pattern11" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)" />
                        </pattern>
                        <pattern id="pattern12" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)" />
                        </pattern>
                        <pattern id="pattern13" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)" />
                        </pattern>
                        <pattern id="pattern14" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)" />
                        </pattern>
                        <pattern id="pattern15" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)" />
                        </pattern>
                        <pattern id="pattern16" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)" />
                        </pattern>
                        <pattern id="pattern17" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00724638) scale(0.02 0.0144928)" />
                        </pattern>
                        <pattern id="pattern18" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00842105) scale(0.02 0.0145263)" />
                        </pattern>
                        <pattern id="pattern19" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00842105) scale(0.02 0.0145263)" />
                        </pattern>
                        <pattern id="pattern20" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00842105) scale(0.02 0.0145263)" />
                        </pattern>
                        <pattern id="pattern21" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00842105) scale(0.02 0.0145263)" />
                        </pattern>
                        <pattern id="pattern22" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00842105) scale(0.02 0.0145263)" />
                        </pattern>
                        <pattern id="pattern23" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00842105) scale(0.02 0.0145263)" />
                        </pattern>
                        <pattern id="pattern24" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00842105) scale(0.02 0.0145263)" />
                        </pattern>
                        <pattern id="pattern25" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00842105) scale(0.02 0.0145263)" />
                        </pattern>
                        <pattern id="pattern26" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00842105) scale(0.02 0.0145263)" />
                        </pattern>
                        <pattern id="pattern27" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00842105) scale(0.02 0.0145263)" />
                        </pattern>
                        <pattern id="pattern28" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00842105) scale(0.02 0.0145263)" />
                        </pattern>
                        <pattern id="pattern29" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00842105) scale(0.02 0.0145263)" />
                        </pattern>
                        <pattern id="pattern30" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image5" transform="translate(0 -0.00842105) scale(0.02 0.0145263)" />
                        </pattern>
                        <image id="card1Img" data-name="2CC.png" width="50" height="70"
                            :href="`${cardPath}${cards[0]}.png`" />

                        <template v-for="n in 13">
                            <pattern :id="'cardall'+n" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use :xlink:href="'#cardall'+n+'img'"
                                    transform="translate(0 -0.00724638) scale(0.02 0.0144928)" />
                            </pattern>
                            <image v-if="n == 1" id="cardall1img" data-name="A.png" width="50" height="70"
                                :href="`${cardPath}A.png`" />
                            <image v-else-if="n == 11" id="cardall11img" data-name="A.png" width="50" height="70"
                                :href="`${cardPath}J.png`" />
                            <image v-else-if="n == 12" id="cardall12img" data-name="A.png" width="50" height="70"
                                :href="`${cardPath}Q.png`" />
                            <image v-else-if="n == 13" id="cardall13img" data-name="A.png" width="50" height="70"
                                :href="`${cardPath}K.png`" />
                            <image v-else :id="'cardall'+n+'img'" data-name="A.png" width="50" height="70"
                                :href="`${cardPath}${n}.png`" />
                        </template>




                        <image id="image1" data-name="spade.png" width="50" height="50"
                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTEwNEIzQUI4MThCMTFFQkE4NkRERDk4NzBBOUNEQ0YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTEwNEIzQUM4MThCMTFFQkE4NkRERDk4NzBBOUNEQ0YiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MTA0QjNBOTgxOEIxMUVCQTg2REREOTg3MEE5Q0RDRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5MTA0QjNBQTgxOEIxMUVCQTg2REREOTg3MEE5Q0RDRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Prstm1gAAA36SURBVHja7FoJdFRl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" />
                        <image id="image2" data-name="club.png" width="50" height="50"
                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTg1OTU1OUE4MThCMTFFQkEzQUFCQkEzMTY1QUFCOUMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTg1OTU1OUI4MThCMTFFQkEzQUFCQkEzMTY1QUFCOUMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5ODU5NTU5ODgxOEIxMUVCQTNBQUJCQTMxNjVBQUI5QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5ODU5NTU5OTgxOEIxMUVCQTNBQUJCQTMxNjVBQUI5QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PojDhkIAAA6sSURBVHja7FoLkFTl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" />
                        <image id="image3" data-name="heart.png" width="50" height="50"
                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUI4OUU5REM4MThCMTFFQjhCRUU4N0FBRTYxQUJBNDciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUI4OUU5REQ4MThCMTFFQjhCRUU4N0FBRTYxQUJBNDciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQjg5RTlEQTgxOEIxMUVCOEJFRTg3QUFFNjFBQkE0NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQjg5RTlEQjgxOEIxMUVCOEJFRTg3QUFFNjFBQkE0NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrOTuaEAAA6pSURBVHja7FlplBzV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" />
                        <image id="image4" data-name="diamond.png" width="50" height="50"
                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUZGOEM4OEY4MThCMTFFQkIzOUVGNThFMjNBREZDQjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUZGOEM4OTA4MThCMTFFQkIzOUVGNThFMjNBREZDQjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5RkY4Qzg4RDgxOEIxMUVCQjM5RUY1OEUyM0FERkNCOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5RkY4Qzg4RTgxOEIxMUVCQjM5RUY1OEUyM0FERkNCOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvU5fn4AAA3NSURBVHja3FkJcBTnlf76mO45NLdugYQEGIMxYC4BNglmNz7WVoid+AiLC8dOTCDeOMVSWYfEEIIXx3ackC0f2ezhOFWx7BS+kviiFuJUMOa2YwQICXQgCY1Gc2h6jp7pc1+3sON41yBpZCq7M3o1PTN/a9733vu+9/5uxjRN/H94MBcCEvv994v/FVOfC4ZNgWFOf/CRoWTgCDYguGDduABhR+BFEWa9aFBZ4SGd4b7MmAYYK3r0NJUshODkccvIBYGYhj5mg67A0DKNnprPXcOVXHqXriQJgUnfacM/7nBdPCBFVC10VYLDP/27biqhkrLL6zXGd6+ciUDJDcEUgxCr5188IHY5jMGgyWA41zWeiVc3ZeOnoOsyxNJ590vRzlC87xiGIqdssBevtBhmTKbrOXgmXLnJ4S/F0X97GpH9+xGefmV1Vua+03fqIFJSEh8RGuavkuymlgPnKl3tmXHtlT17dyF64Awi+44Dah41c29dz3nKLuM95eS+7T93zop68BcsLWaUNKIoUxn5glNv36JIEtqe34FQ7STketPoeO1VNHz+RjbV3/4g42RvYjmHdYZAVrgIGeFGYTwMNQcxOH2zOKGx7tizP0ehIwVv2A+h1Iee/3ofub4eTLh8+RfcofrrwNpxtNAYnz5HRmGGoVqvi4NzblkfO7EPXc2/gy9cDZn4IIocJcuBtt/uhjNQDp9/6nYlN+Cj06S/uoZoKCmU1H7mYbjCOPLYNniSDrhIrRxpan79AyhhdCRPRhF5rxUOFzdNOrVzs5brvkiqpWsjMJ3UNgneGd7gmdG0tKX5SSR3HoWbSopJJglIBoxugFMK8PBOAtMD1uOFINasT3e8fFVhcC8+dbIX5MwIkkad2shfUblk7SPJyEm0PvIEKtkgdDmNLMOBU1WoZF5RhOBkURKeAjmhwCF6IHWc+rHom7jwUwei5nPn7d4mgaDRA+Uzm55kglOZQ3ffDO5kBkadF874EFhRgO73QfS4KSoFmNkc8qdbcaajDaElpfBULV8g9fY87q5V7h0WMLtKjHEvLYZlzmu6Qo0vPGl74Io7Fh1++lEkntmFcDgAVyEPlTHh0jQE5Dy88SSYRAJidBDZ0+1IdfWg77UWaJZAGMY3el/5SpOR6cSfp81xHuPbm+/4pHYBrZAFxxu3T1v1L829J9qwe/ltmFAogdcvQuI4sGSTcnlolLkkZaXc54PJs5CrqyBVlCPVE0NofiUuXXUDMh1742b+5ILw7Hs6TRpxPhgsP/pwTVxWBEfyGXvs/tB765ClRBrU+Aqx2VOv3fJMTuWxZ/VaBOIsmHovDJmUitY6VQ3dAo8QFQpL63tpInazDnBEfJGyVBL2InlkAKdDb6Dh+s+Fc51mc/zQjxaJJRNg6Or/mFyKAqIWch8CMe39BPGC5YjI/cEpy+7d4aheIrz+938H/lAEvimTIFBJBUjFBCqpIYcDXgIQ0ijCqoJWCkDOwSNMQJzEF4744wj4EdndRVw5jAnz/7ZRalN+YbLxO3lX9fBWYPw4wn1oLBkYHmr2LKpnNb0SmLN6yu5Na5HfcRhV9Q3gDGsTxSHN8dSuGVRpuj1AShwLg0adWsqQn5LqskrHyi6tFf0CfOX16HjhEAbb3kNw2o2rVc21WSMBYVnHcFYY5oJz5SgGKbumkE/3omzy4ubq5Q8s3f+vW3D233ei4tJZ4BwmVFqj8JQtsk6XE6edIvJ0WkpwIEHv3QTGY70nYA5LxeizSDSGzPGDkP9AHPvmVsQHTqJyzurva3J+jaYOT8j2Rs00xgMIYw+PstSHcM2Mx+tXPHz7n3Y8jvbtz2HKpFlwelhoohNeWsealuyw8FFJmfRepGOT+keBQGkE0O8Q4AoGwQ3GkfnDH5H8414k2k7TqjTMDga7121GJtuPirlf/ZmSy37R0CQafYzigdj8oD9Z6oW/vP6hqSuf+EbbWy+h5eGnUV+/AAgIdqRZiq7p8cDNE5l5HlX0u7UmAXO5wYgusG4XuNIw4qEgOdwJY8/byPRH6DsBdVYQiE8V1V7I7+bw29XrIBsyKmd9ZYehqn9D6nFBV0e0scpnonB5w9+bvvqp+zvefhPvbPwxGuZdD3dtiJx3Yyjgo/2HC1UUbd3nhUYyK/v86C4vRaW3BLX0mdvpRDSTwcDRFsROtCJC62UiukhBEqyIU7RyJM3hujKk3x7Cy6tWQRFYlE2/7XX6epFp5IsDohekykDF5Kdm3frTre2vvYnfNd0NZ6eKdNdxpOMJuCwh8PqoXPxQS0MI+P3UR3y2lZLzVtM0U0Po7u1F5lQ7mKEkXJSdJGWiQlFxSUFFikouR7zhKYsCTQpl9dXI7ZHx4i1fQiqZd/iql+4iV28tckTJBHXdnA43aX5PO3JJikxQRrblmE3iPJVNmMoiRo7FaL3lXIScSpH8luQVCLks2giMSmtmmiS/dPwWnVdDiuYnHvVRGSapcZZQ2KsUBUMEquA04fWVouetY+g5+AJmffEBdy52bA39+1+PGQjLe070te1dxry0+cWFax69yRQd2LPmh6jjJ5DyOJChvuGhnWCOHPKSwvRRKbYTqAApzSICEiUnBTKRJDnLGjhLjpKfKCMgGpWV1XNEOs+6YCFTnylQeak0UA6mO/HZn34Vs27ZhGRL8290LbGiqIywFEFB9CMe7b85/u6rbzbeec81SiqKIxv+E9ViA4ERbNkVyAkvNTovnVNX0NDipCzRDFggYDELJEW8lYJwKTVCy/k0gRuyZrVz7Vag7Ej0vZzWkYp1Y8EjX8bCb/4I0qHmnYrcuYLjfcVxpJAeRF6K2J1Zks0blP6+/Uvv24xZm1bi7NkuFBTqH9bIQnS1ekaWtWZYHfPkAjVBSyyASoo+iTBkZtjpXurubgJjZSVPYGQ6J+4UIOd0DA1GMHPzCiz61lakDj63L5c4eAPLuz+4UDH2jFTPuxmqIoN3h+ELlWtyIX09zrz3ztUPbJmWG0ig62e74a+dCJ4aSMRykCIfoQyEyUkfHfdYskqEjlHJWL64zeFyilNGrLXWTJalY2eOSD8Qw5R1i7Fk/WZI7+5qlROHr+Nd5Zq9tzeLnH4Lg4ft8cTQC7QLHG5OSvr4JH+w4QBbMafslZWrEH+xBRMbalCgyDpJeZxU7/0EagYBKKUdpGw3RiBK/LBmWpHKqIMIb3FDo2zmyQXpTBQTbp2O5dt/AqX31EBmYFejw13ebcmyPawSktKrflBkaaUiUDJJAmMNjTw4IdCV6NrZxKXO4pqfPwXH3ACiZ2JgKLIqlUofgaiguSpIWZGpWZ6hCThJDluOD1K2hmhdlbVPocw4SRRy3VGEl9XhMz/cBi0aNQhEk2CBsP03RrRFuXBnd3j+0gTrlTq1ENgf/dOzq0u8Hlz3yydRKCMORbMwCEgNSbA17rUS4Q+4ndAJzBBJstX4XOR4LwFLW7yitcl+CeLUUix+ZAMYS367XloluIMHTZMd1R7rgkC0+PGP2DGosaMwUn1gdNYi4C8T+595rHLGZ7F4+0akaUbi0wqN+Yx9xc0qoaBKESdyWFJrOW99ZsU45eDQnTcg8Qpmf+8L8JVVIXn8xYecJb5m61IXwxg2pz5qRZHdAvDxy0MMQ/HmaBx0eKHIkQ3p95+fN/OW+5ZFDx1E96OvI9RQRxMwqRWVl9fUbY5Yu8Q8eWM1vjIqqyxJmjQYw7wH70Bl41xE9z27M1AR2GiS5pmmPuoLwheefvmSj5kXJue0ZyOrhjlHENnIwbv0yOHk0i0/geeqiUj1x6mx8UhQORUoO9bGirflmcEAqRhLr5meAdTetAiX3bkSejQx4AkId5mMeO4yLfe/WpFjPHN+o+wwnNgZP/7cWofDjSsf3QbFTXKdyNnXRETdJLUa5kSMysk6KxnPgK0vxYKNX4cSj0GJ7btH8ISpXjl7s/WJVhQQK83nNZV+gwitZZ4fOvKL5prGFbjsvpWIRc6AMVgolBHJGjsoC7T3QpaUTEqnbBDhS66AdPr1/3AHQr8xdPPc/zM+2YrLiD4Co9JxhCEn3v+W2rcvMv/bW1C6pB79/TFEXSI8JLMhIj1DpTbUO4iJKxZj8k3XIf7em50ut7Ge5f3nnDXPb0XJ7yfU618aazdNnvdHh9pe2OAQ3Fj44CaadNPgh2RwlA2Zyiobl8BWBjD/n76OQqIPaurwet5VKum6OtJbq8VcjR/pkyLKi9Z9w1+l33/pjbqrb8cld90Iqa8Xado1pogjckzCjDU3IDzzcmqCh18RXM6XNVWFoSkjsiI5MjpjSdlyA/u+i0wfGjf+AOzUIBE6DZwZQKhxMmbfuw6ZrnYVev/9JuMcdsEi+UisOCDmqMzuMaZ6JNHy3GOeyksw+x/XIhXtRZam5ys2fI3G/hByfXu2sazZOvzzo7xvP3ayG6M03dqMoZA68VChZ+/Z2Xf/A9xTaxBaOA31N9+GxNHdpxkz8jBHzZSl7s0y5ojt4t5DtE8i4nOueKrztX8uL5/5xFVbv02DJklwPEokP7BVdIZkw5bT8bs9zY+sIY4BC2XFKESflE688bWGa5vm6FoeUvvv9/Js/hnDdI31onsRpfXxyW3ExoIj4ueHDjxYkNLIJ1PQci3bLDFg7AEHo7biMjLm7Jv2YMno2Rey0Xc6TUORWVZ/1WT4cc/Gp1paH6acK4GeOf4dOtA5zmd3nPHkxoi3uv9XHv8twADL0WxgrmE0fAAAAABJRU5ErkJggg==" />
                        <image id="image5" data-name="A.png" width="50" height="70"
                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABGCAIAAAAB7lAxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGNkUyNzEyRjg4NTVFQjExOTM0RTlDRjZDRjBGODNDRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDNjYwMjUzQjg3Q0YxMUVCQTA3N0ZCREE3RTY5RkY0OCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDNjYwMjUzQTg3Q0YxMUVCQTA3N0ZCREE3RTY5RkY0OCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyMTI5OEZGNTU4OTExRUI5NkQ2QUE0MEM3QTU4QTY2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAyMTI5OTAwNTU4OTExRUI5NkQ2QUE0MEM3QTU4QTY2Ii8+IDwvcmRmOkRlc2NyaXB0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" />
                    </defs>
                </svg> -->
            </div>
        </div>

        <!-- BET SLIP START -->
        <div class="virtual-casino-place-bet" v-if="$store.state.casinoBet">
            <ValidationObserver tag="div" class="place-bet-box-container" v-slot="{ invalid }">
                <div class="place-bet-nation">
                    <div>{{ $store.state.casinoBet.nation }}
                    </div>
                    <div>Min: <span v-kval="{size: $store.state.casinoBet.min}"></span>,
                        Max: <span v-kval="{size: $store.state.casinoBet.max}"></span></div>
                </div>
                <div class="place-bet-value">
                    <div>{{ $store.state.casinoBet.uRate }}</div>
                    <ValidationProvider name="Amount" tag="div" class=""
                        :class="[{'back-border': $store.state.casinoBet.betType == 'back'}, {'lay-border': $store.state.casinoBet.betType == 'lay'}]"
                        :rules="{required: true, min_value : 1, max_value : 999999999, regex: /^[0-9]+$/}">
                        <input type="number" id="placebetAmountMobile" v-model.number="$store.state.casinoBet.amount"
                            class="form-control input-stake"
                            onkeypress='return event.charCode >= 48 && event.charCode <= 57' placeholder="Amount">
                    </ValidationProvider>

                    <button class="btn btn-primary" :disabled="invalid" @click="placebetCasino()">Submit</button>
                    <button class="btn btn-reset" @click="$store.commit('resetCasinoBetData')">Reset</button>
                </div>
                <div class="place-bet-buttons">
                    <template v-for="(btn, key) in $store.state.buttonList">
                        <button class="btn btn-bet" @click="$store.commit('updateCasinoBetAmount', btn.bval)"
                            :key="key">
                            <span>{{ btn.btxt }}</span>
                        </button>
                    </template>
                </div>
            </ValidationObserver>
        </div>
        <!-- BET SLIP END -->


        <b-modal ref="my-bets" hide-footer title="MY BETS" modal-class="my-bets">
            <template v-if="$store.state.casinoBetSoda && $store.state.casinoBetSoda != null">
                <template v-for="(data, key) in $store.state.casinoBetSoda">
                    <div class="my-bet-box" :key="key"
                        :class="[{'back': data.btype == 'back'}, {'lay': data.btype == 'lay'}]">
                        <div>{{ data.nat }}</div>
                        <div>{{ data.urate }}</div>
                        <div>{{ data.amt }}</div>
                    </div>
                </template>
            </template>
        </b-modal>

        <b-modal ref="detail-modal" modal-class="casino-result" hide-footer size="xl">
            <template #modal-title>
                {{ gameDetail.ename }} Result
            </template>
            <!-- CASINO -->
            <CasinoResult :resultData="gameDetail" />
            <AccountStatementSoda :gameSoda="gameSoda" />
        </b-modal>

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
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    import VirtualTimerProgress from "@/components/casino/VirtualTimerProgress"
    // import LastResultIcon from '@/components/casino/results/LastResultIcon'
    // import Card from '@/components/casino/Card'
    import CasinoResult from '@/components/casino/results/CasinoResults'
    import AccountStatementSoda from '@/components/AccountStatementSoda'
    import Loader from '@/components/loader'
    import InactivityModal from '@/components/casino/InactivityModal'
    var PlacebetTimer;

    export default {
        mounted() {
            this.$store.state.casinoGameType = this.gameType
            this.getButtonListCs()
            this.getCasinoRules()
            this.getCasinoData()
            this.getLastResults()
        },
        components: {
            VirtualTimerProgress,
            // LastResultIcon,
            // Card,
            Loader,
            InactivityModal,
            CasinoResult,
            AccountStatementSoda,
        },
        computed: {
            mainData() {
                return _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': this.gameType
                })
            }
        },
        data() {
            return {
                cardPath: IMG_PATH + 'front/img/cards/',
                showCards: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'vlucky7',
                casinoData: [],
                mId: 0,
                cards: [],
                time: {
                    total: 0,
                    current: 0
                },
                callDataApi: true,
                callBookApi: true,
                exp: '',
                tvUrl: '',
                firstCall: true,
                showRules: false,
                rulesHtml: [],
                gameDetail: [],
                gameSoda: [],
                loading: false
            }
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
            getSvgWidth() {
                var element = document.querySelector('#id_main_bg');
                var width = element.clientWidth
                return width ? width + 'px' : '0px'
            },
            getRectCenterCordinates(size, cordinate, padding = 0) {
                return (cordinate + (size / 2) + padding)
            },
            getRectRightCordinates(size, cordinate, padding) {
                return (size + cordinate) - padding
            },
            showMyBetsModal() {
                if (this.$store.state.casinoBetSoda && this.$store.state.casinoBetSoda.length) {
                    this.$refs['my-bets'].show()
                }
            },
            showResult(index) {
                if (this.loading)
                    return
                if (this.$store.state.lastResults[index] && this.$store.state.lastResults[index].mid) {
                    var mid = this.$store.state.lastResults[index].mid

                    this.loading = true
                    // console.log(gmid, mid, gtype, dtype, popup)
                    ServiceApi.callApi("api/front/accstatepopup", {
                            'gmid': 0,
                            'mid': mid,
                            'gtype': this.$store.state.casinoGameType,
                            'dtype': 'cs'
                        })
                        .then(response => {
                            if (response.status == 200) {
                                this.gameDetail = _.get(response.data, 't1') ? _.get(response.data, 't1') : {}
                                Vue.set(this.gameDetail, 'gType', this.$store.state.casinoGameType)
                                Vue.set(this.gameDetail, 'dType', 'cs')
                                this.gameSoda = _.get(response.data, 't2')

                                this.$refs['detail-modal'].show()
                                this.loading = false
                            } else {
                                this.gameDetail = {}
                                this.gameSoda = []
                                this.loading = false
                            }
                        })
                        .catch(e => {
                            this.gameDetail = {}
                            this.gameSoda = []
                            this.loading = false
                        });
                }
            },
            getResultLable(index) {
                if (this.$store.state.lastResults[index] && this.$store.state.lastResults[index].win) {
                    switch (this.$store.state.lastResults[index].win) {
                        case "1":
                            return "L"
                            break;
                        case "2":
                            return "H"
                            break;
                        case "0":
                            return "T"
                            break;

                        default:
                            return " "
                            break;
                    }
                }
            },
            getResultColor(index) {
                if (this.$store.state.lastResults[index] && this.$store.state.lastResults[index].win) {
                    switch (this.$store.state.lastResults[index].win) {
                        case "1":
                            return "#FC4242"
                            break;
                        case "2":
                            return "#FDCF13"
                            break;
                        case "0":
                            return "white"
                            break;

                        default:
                            return " "
                            break;
                    }
                }
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
                            this.$refs['rules-modal'].show()
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

            toggleCards(card) {
                if (card != '1') {
                    this.showCards = !this.showCards
                }
            },
            getKey(data, key) {
                return _.get(data, 'key')
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
                ServiceApi.callApi("api/front/vcasino/data", {
                        'type': this.gameType,
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.casinoData = response.data
                            //this.casinoData.rdesc = 2
                            if (_.get(this.casinoData, 'mid') != this.mId) {
                                if (!this.firstCall) {
                                    this.$store.state.placebetInterval++
                                }
                                this.firstCall = false
                                this.getLastResults()
                                this.getUserBook(true, _.get(this.casinoData, 'mid'))
                            }
                            this.mId = _.get(this.casinoData, 'mid')
                            this.getUserBook()
                            // this.exp = _.get(this.$store.state.user, 'exp', 0)
                            this.cards = _.get(this.casinoData, 'card').split(',')
                            this.time.total = _.get(this.casinoData, 'ft')
                            this.time.current = _.get(this.casinoData, 'lt')

                            if (this.callDataApi == true) {
                                setTimeout(res => {
                                    this.getCasinoData();
                                }, 500);
                            }
                        } else {
                            // this.casinoData = []
                            if (this.callDataApi == true) {
                                setTimeout(res => {
                                    this.getCasinoData();
                                }, 500);
                            }
                        }
                    })
                    .catch(e => {
                        // this.casinoData = []
                        if (this.callDataApi == true) {
                            setTimeout(res => {
                                this.getCasinoData();
                            }, 500);
                        }
                    });
            },
            getUserBook(forcecall = false, mid = this.mId) {
                if (this.exp != _.get(this.$store.state.user, 'exp', 0) || forcecall) {
                    ServiceApi.callApi("api/front/vcasino/book", {
                            'mid': parseInt(mid),
                            'gType': this.gameType
                        })
                        .then(response => {
                            if (response.status == 200) {
                                this.$store.state.casinoBetSoda = response.data.bet
                                this.$store.state.casinoFancybetBook = response.data.fancy
                                this.$store.state.casinobetBook = response.data.sportbet
                                // if (this.callBookApi == true) {
                                //     setTimeout(res => {
                                //         this.getUserBook();
                                //     }, 800);
                                // }
                            } else {
                                this.$store.state.casinoBetSoda = null
                                this.$store.state.casinobetBook = null
                                this.$store.state.casinoFancybetBook = null
                                // if (this.callBookApi == true) {
                                //     setTimeout(res => {
                                //         this.getUserBook();
                                //     }, 800);
                                // }
                            }
                        })
                        .catch(e => {
                            this.$store.state.casinoBetSoda = null
                            this.$store.state.casinobetBook = null
                            this.$store.state.casinoFancybetBook = null
                            // if (this.callBookApi == true) {
                            //     setTimeout(res => {
                            //         this.getUserBook();
                            //     }, 800);
                            // }
                        });

                    this.exp = _.get(this.$store.state.user, 'exp', 0)
                }
            },
            getLastResults() {
                ServiceApi.callApi("api/front/vcasino/lastresults", {
                        'gType': this.gameType
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.$store.state.lastResults = response.data.res
                            this.gameTitle = response.data.res1.cname
                        } else {
                            this.$store.state.lastResults = []
                        }
                    })
                    .catch(e => {
                        this.$store.state.lastResults = []
                    });

            },
            setBetData(index, btype) {
                if (this.mainData[index].b <= 0 && this.mainData[index].gstatus != 'OPEN') {
                    return;
                }
                let betdata = {
                    subType: this.mainData[index].subtype,
                    marketId: this.mId,
                    sectionId: this.mainData[index].sid,
                    subId: 0,
                    uRate: this.mainData[index].b,
                    amount: '',
                    betType: btype,
                    gameType: this.gameType,
                    nation: this.mainData[index].nat,
                    min: this.mainData[index].min,
                    max: this.mainData[index].max,
                }
                this.$store.commit('setCasinoBetData', betdata)
            },
            placebetCasino() {
                if (this.$store.state.loadingCasinoPlacebet)
                    return
                this.$store.state.loadingCasinoPlacebet = true
                ServiceApi.callApi("api/front/placebetcasino", this.$store.state.casinoBet)
                    .then(response => {
                        if (response.success) {
                            this.$bvToast.toast(response.msg, {
                                variant: 'success',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                            // console.log('success', response.msg)
                        } else {
                            this.$bvToast.toast(response.msg, {
                                variant: 'danger',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                            // console.log('fail', response.msg)
                        }
                    })
                    .catch(e => {
                        // console.log('error', e)
                    })
                    .finally(data => {
                        this.$store.commit('resetCasinoBetData')
                        // this.$refs['placebet-modal'].hide()
                        this.getUserBook()
                        // if (INACTIVITY_MODAL) {
                        //     this.resetPlacebetInterval()
                        // }
                        this.$store.state.loadingCasinoPlacebet = false
                        // console.log(data)
                    });
            },
            hidePlacebetModal() {
                // this.$refs['placebet-modal'].hide()
            },
            checkLowCards(card) {
                if (card == 1) {
                    return false
                }
                if (card.length == 3) {
                    var value = card.slice(0, 1)
                    if (value.toLowerCase() == 'a' || value <= 6) {
                        return true
                    }
                }
                return false;
            },
            checkHighCards(card) {
                if (card == 1) {
                    return false
                }
                if (card.length == 3) {
                    var value = card.slice(0, 1)
                    if (value > 7 || value.toLowerCase() == 'j' || value.toLowerCase() == 'k' || value.toLowerCase() ==
                        'q') {
                        return true
                    }
                }
                if (card.length == 4) {
                    var value = card.slice(0, 2)
                    if (value == '10') {
                        return true
                    }
                }
                return false;
            }
        },
        beforeDestroy() {
            this.callBookApi = false
            this.callDataApi = false
            this.$store.commit('resetCasinoBetData')
            this.$store.state.casinoRules = null
            this.$store.state.casinoBetSoda = null
            this.$store.state.casinobetBook = null
            this.$store.state.casinoFancybetBook = null
            this.$store.state.lastResults = []
            this.$store.state.placebetInterval = 0
            clearInterval(PlacebetTimer);
        }
    }
</script>