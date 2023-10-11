<template>
    <div class="virtual-casino-container vdt6">
        <VirtualTimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current"
            :width="getSvgWidth()" />
        <template v-if="time.total > 3 && (time.current <= 3 && time.current > 0)">
            <transition name="component-fade" mode="out-in">
                <div :key="time.current" class="casino-time-digit">{{ time.current }}</div>
            </transition>
        </template>
        <!-- WEB START -->
        <div class="virtual-casino-bg">
            <svg id="id_main_bg" viewBox="0 0 2560 1440" fill="none" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="main_bg">
                    <rect id="main-bg" width="2560" height="1440" fill="url(#mainBg)"></rect>

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
                    <g id="rule_icon_box" @click="getCasinoRulesHtml()">
                        <circle id="rule_icon_bg" cx="2520" cy="40" r="29" fill="url(#rulesIcon)" fill-opacity="0.5"
                            stroke="#FFCE38" stroke-width="2" style="cursur:pointer;"></circle>
                        <path id="rule_icon"
                            d="M2514.56 53.1429H2516.12V41.8571H2514.56C2513.7 41.8571 2513 41.1576 2513 40.2946V36.5625C2513 35.6995 2513.7 35 2514.56 35H2523.31C2524.18 35 2524.88 35.6995 2524.88 36.5625V53.1429H2526.44C2527.3 53.1429 2528 53.8424 2528 54.7054V58.4375C2528 59.3005 2527.3 60 2526.44 60H2514.56C2513.7 60 2513 59.3005 2513 58.4375V54.7054C2513 53.8424 2513.7 53.1429 2514.56 53.1429ZM2520.5 20C2517.39 20 2514.88 22.5184 2514.88 25.625C2514.88 28.7316 2517.39 31.25 2520.5 31.25C2523.61 31.25 2526.12 28.7316 2526.12 25.625C2526.12 22.5184 2523.61 20 2520.5 20Z"
                            fill="white"></path>
                    </g>
                    <!-- RULES ICON END -->

                    <!-- PLAYER A WINNER START -->
                    <rect v-if="casinoData.rdesc == '1'" id="winner a" x="486" y="418" width="420" height="444"
                        fill="url(#winnerTrophyLeft)"></rect>
                    <!-- PLAYER A WINNER END -->

                    <!-- PLAYER B WINNER START -->
                    <rect v-if="casinoData.rdesc == '2'" id="winner b" x="1802" y="418" width="420" height="444"
                        fill="url(#winnerTrophyLeft)"></rect>
                    <!-- PLAYER B WINNER END -->
                </g>

                <!-- MAIN SVG DEFINATIONS START -->
                <defs>
                    <pattern id="winnerTrophyLeft" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#winnerTrophyLeftImg"
                            transform="translate(-0.0285714) scale(0.00412946 0.00390625)"></use>
                    </pattern>

                    <pattern id="winnerTrophyRight" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#winnerTrophyRightImg"
                            transform="translate(-0.0285714) scale(0.00412946 0.00390625)"></use>
                    </pattern>

                    <pattern id="mainBg" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#mainBgImg" transform="scale(0.000390625 0.000694444)"></use>
                    </pattern>

                    <pattern id="lastResultPlusIcon" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#plusIcon" transform="translate(-0.00478122) scale(0.0050227)"></use>
                    </pattern>

                    <linearGradient id="homeIcon" x1="2449" y1="10" x2="2449" y2="70" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F29603"></stop>
                        <stop offset="1" stop-color="#B56100"></stop>
                    </linearGradient>

                    <linearGradient id="rulesIcon" x1="2520" y1="10" x2="2520" y2="70" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F29603"></stop>
                        <stop offset="1" stop-color="#B56100"></stop>
                    </linearGradient>

                    <image id="winnerTrophyLeftImg" data-name="winner.png" width="256" height="256"
                        :href="`${imgPath}front/img/svg_casino/icons/winner-left.png`">
                    </image>

                    <image id="winnerTrophyRightImg" data-name="winner.png" width="256" height="256"
                        :href="`${imgPath}front/img/svg_casino/icons/winner-right.png`">
                    </image>

                    <image id="mainBgImg" data-name="main-bg.jpg" width="2560" height="1440"
                        :href="`${imgPath}front/img/svg_casino/casino_bg/dt6bg.jpg`">
                    </image>

                    <image id="plusIcon" data-name="more.png" width="201" height="203"
                        xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAADLCAYAAADEDrcOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDZGMTEwRkJGNUUzMTFFQjlFNkNBM0M5REZERDRDREIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDZGMTEwRkNGNUUzMTFFQjlFNkNBM0M5REZERDRDREIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNkYxMTBGOUY1RTMxMUVCOUU2Q0EzQzlERkRENENEQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNkYxMTBGQUY1RTMxMUVCOUU2Q0EzQzlERkRENENEQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvplFlQAAAZqSURBVHja7N1PiJR1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">
                    </image>
                </defs>
                <!-- MAIN SVG DEFINATIONS END -->
            </svg>
        </div>

        <div class="virtual-casino-odds">
            <div>
                <svg viewBox="0 0 2489 805" fill="none" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="odds">
                        <template v-if="cards && cards.length">
                            <!-- PLAYER A CARDS START -->
                            <g id="player_a_cards">
                                <g id="pa_card1">
                                    <rect id="pa_card1_box" x="774.5" y="106.286" width="89.6429" height="123.214"
                                        rx="3.5" stroke="black"></rect>
                                    <rect id="pa_card1_img" x="777.357" y="109.143" width="83.9286" height="117.5"
                                        fill="url(#p_pa_card1_img)"></rect>
                                </g>
                            </g>
                            <!-- PLAYER A CARDS END -->

                            <!-- PLAYER B CARDS START -->
                            <g id="player_b_cards">
                                <g id="pb_card1">
                                    <rect id="pb_card1_box" x="1617.5" y="106.5" width="89.6429" height="123.214"
                                        rx="3.5" stroke="black"></rect>
                                    <rect id="pb_card1_img" x="1620.36" y="109.357" width="83.9286" height="117.5"
                                        fill="url(#p_pb_card1_img)"></rect>
                                </g>
                            </g>
                            <!-- PLAYER B CARDS END -->
                        </template>
                        <g id="player_title">
                            <text id="DRAGON" fill="#EF0518" xml:space="preserve" style="white-space: pre"
                                font-family="Noto Sans" font-size="70" font-weight="bold" letter-spacing="0em">
                                <tspan x="672.474" y="74.6558">DRAGON</tspan>
                            </text>
                            <text id="TIGER" fill="#00A200" xml:space="preserve" style="white-space: pre"
                                font-family="Noto Sans" font-size="70" font-weight="bold" letter-spacing="0em">
                                <tspan x="1559.01" y="74.6558">TIGER</tspan>
                            </text>
                        </g>
                        <template v-if="casinoData && casinoData.mid">
                            <!-- MAIN SECTIONS ODDS START -->
                            <g id="main_odds">

                                <g id="dragon" style="cursor: pointer;"
                                    @click="setBetData(main[0].nat, main[0].b, mId, main[0].sid, main[0].subtype, 0, 'back', gameType, main[0].gstatus, main[0].min, main[0].max)">
                                    <rect id="dragon_box" x="642" y="254" width="355" height="123" rx="6" fill="#EF0518"
                                        fill-opacity="0.1" stroke="#F46A59" stroke-width="4"></rect>
                                    <text id="DRAGON_2" fill="black" xml:space="preserve" style="white-space: pre"
                                        font-family="Antonio" font-size="60" font-weight="bold" letter-spacing="0em">
                                        <tspan x="660.139" y="320.469">DRAGON</tspan>
                                    </text>
                                    <text id="1.99" fill="black" xml:space="preserve" style="white-space: pre"
                                        font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                        dominant-baseline="middle" text-anchor="end">
                                        <tspan :x="getRectRightCordinates(355, 642, 20)"
                                            :y="getRectCenterCordinates(123, 254)">{{ main[0].b }}</tspan>
                                    </text>
                                    <g id="dragon_suspended" v-if="main[0].gstatus != 'OPEN'">
                                        <g id="dragon_suspended_box">
                                            <rect x="640" y="251" width="359" height="127" rx="8" fill="black"
                                                fill-opacity="0.3"></rect>
                                            <rect x="640" y="251" width="359" height="127" rx="8" stroke="#F46A59">
                                            </rect>
                                        </g>
                                        <path id="dragon_lock"
                                            d="M845.821 309.688H842.232V298.859C842.232 286.257 832.033 276 819.5 276C806.967 276 796.768 286.257 796.768 298.859V309.688H793.179C789.215 309.688 786 312.921 786 316.906V345.781C786 349.767 789.215 353 793.179 353H845.821C849.785 353 853 349.767 853 345.781V316.906C853 312.921 849.785 309.688 845.821 309.688ZM830.268 309.688H808.732V298.859C808.732 292.889 813.563 288.031 819.5 288.031C825.437 288.031 830.268 292.889 830.268 298.859V309.688Z"
                                            fill="white"></path>
                                    </g>
                                    <text id="10000" fill="black" xml:space="preserve" style="white-space: pre"
                                        font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                        <tspan x="660.184" y="359.19"
                                            :class="{'suspended-book' : main[0].gstatus != 'OPEN'}"
                                            v-vcasinofancybook="{sid: main[0].sid, subid: 0 }">0</tspan>
                                    </text>
                                </g>

                                <g id="tie" style="cursor: pointer;"
                                    @click="setBetData(main[2].nat, main[2].b, mId, main[2].sid, main[2].subtype, 0, 'back', gameType, main[2].gstatus, main[2].min, main[2].max)">
                                    <rect id="tie_box" x="1067" y="107" width="355" height="123" rx="6" fill="#0041A2"
                                        fill-opacity="0.1" stroke="#0041A2" stroke-width="4"></rect>
                                    <text id="TIE" fill="black" xml:space="preserve" style="white-space: pre"
                                        font-family="Antonio" font-size="60" font-weight="bold" letter-spacing="0em">
                                        <tspan x="1085.44" y="173.469">TIE</tspan>
                                    </text>
                                    <text id="1.99_2" fill="black" xml:space="preserve" style="white-space: pre"
                                        font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                        dominant-baseline="middle" text-anchor="end">
                                        <tspan :x="getRectRightCordinates(355, 1067, 20)"
                                            :y="getRectCenterCordinates(123, 107)">{{ main[2].b }}</tspan>
                                    </text>
                                    <g id="tie_suspended" v-if="main[2].gstatus != 'OPEN'">
                                        <g id="tie_suspended_box">
                                            <rect x="1065" y="104" width="359" height="127" rx="8" fill="black"
                                                fill-opacity="0.3"></rect>
                                            <rect x="1065" y="104" width="359" height="127" rx="8" stroke="#F46A59">
                                            </rect>
                                        </g>
                                        <path id="tie_lock"
                                            d="M1270.82 162.688H1267.23V151.859C1267.23 139.257 1257.03 129 1244.5 129C1231.97 129 1221.77 139.257 1221.77 151.859V162.688H1218.18C1214.22 162.688 1211 165.921 1211 169.906V198.781C1211 202.767 1214.22 206 1218.18 206H1270.82C1274.78 206 1278 202.767 1278 198.781V169.906C1278 165.921 1274.78 162.688 1270.82 162.688ZM1255.27 162.688H1233.73V151.859C1233.73 145.889 1238.56 141.031 1244.5 141.031C1250.44 141.031 1255.27 145.889 1255.27 151.859V162.688Z"
                                            fill="white"></path>
                                    </g>
                                    <text id="10000_2" fill="black" xml:space="preserve" style="white-space: pre"
                                        font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                        <tspan x="1085.18" y="212.19"
                                            :class="{'suspended-book' : main[2].gstatus != 'OPEN'}"
                                            v-vcasinofancybook="{sid: main[2].sid, subid: 0 }">0</tspan>
                                    </text>
                                </g>

                                <g id="pair" style="cursor: pointer;"
                                    @click="setBetData(main[3].nat, main[3].b, mId, main[3].sid, main[3].subtype, 0, 'back', gameType, main[3].gstatus, main[3].min, main[3].max)">
                                    <rect id="pair_box" x="1067" y="254" width="355" height="123" rx="6" fill="#0041A2"
                                        fill-opacity="0.1" stroke="#0041A2" stroke-width="4"></rect>
                                    <text id="PAIR" fill="black" xml:space="preserve" style="white-space: pre"
                                        font-family="Antonio" font-size="60" font-weight="bold" letter-spacing="0em">
                                        <tspan x="1085.46" y="320.469">PAIR</tspan>
                                    </text>
                                    <text id="1.99_2" fill="black" xml:space="preserve" style="white-space: pre"
                                        font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                        dominant-baseline="middle" text-anchor="end">
                                        <tspan :x="getRectRightCordinates(355, 1067, 20)"
                                            :y="getRectCenterCordinates(123, 254)">{{ main[3].b }}</tspan>
                                    </text>
                                    <g id="pair_suspended" v-if="main[3].gstatus != 'OPEN'">
                                        <g id="pair_suspended_box">
                                            <rect x="1065" y="251" width="359" height="127" rx="8" fill="black"
                                                fill-opacity="0.3"></rect>
                                            <rect x="1065" y="251" width="359" height="127" rx="8" stroke="#F46A59">
                                            </rect>
                                        </g>
                                        <path id="pair_lock"
                                            d="M1270.82 309.688H1267.23V298.859C1267.23 286.257 1257.03 276 1244.5 276C1231.97 276 1221.77 286.257 1221.77 298.859V309.688H1218.18C1214.22 309.688 1211 312.921 1211 316.906V345.781C1211 349.767 1214.22 353 1218.18 353H1270.82C1274.78 353 1278 349.767 1278 345.781V316.906C1278 312.921 1274.78 309.688 1270.82 309.688ZM1255.27 309.688H1233.73V298.859C1233.73 292.889 1238.56 288.031 1244.5 288.031C1250.44 288.031 1255.27 292.889 1255.27 298.859V309.688Z"
                                            fill="white"></path>
                                    </g>
                                    <text id="10000_2" fill="black" xml:space="preserve" style="white-space: pre"
                                        font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                        <tspan x="1085.18" y="359.19"
                                            :class="{'suspended-book' : main[3].gstatus != 'OPEN'}"
                                            v-vcasinofancybook="{sid: main[3].sid, subid: 0 }">0</tspan>
                                    </text>
                                </g>

                                <g id="tiger" style="cursor: pointer;"
                                    @click="setBetData(main[1].nat, main[1].b, mId, main[1].sid, main[1].subtype, 0, 'back', gameType, main[1].gstatus, main[1].min, main[1].max)">
                                    <rect id="tiger_box" x="1485" y="254" width="355" height="123" rx="6" fill="#00A200"
                                        fill-opacity="0.1" stroke="#00A200" stroke-width="4"></rect>
                                    <text id="TIGER_2" fill="black" xml:space="preserve" style="white-space: pre"
                                        font-family="Antonio" font-size="60" font-weight="bold" letter-spacing="0em">
                                        <tspan x="1503.26" y="320.469">TIGER</tspan>
                                    </text>
                                    <text id="1.99_3" fill="black" xml:space="preserve" style="white-space: pre"
                                        font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                        dominant-baseline="middle" text-anchor="end">
                                        <tspan :x="getRectRightCordinates(355, 1485, 20)"
                                            :y="getRectCenterCordinates(123, 254)">{{ main[1].b }}</tspan>
                                    </text>
                                    <g id="tiger_suspended" v-if="main[1].gstatus != 'OPEN'">
                                        <g id="tiger_suspended_box">
                                            <rect x="1483" y="250" width="359" height="127" rx="8" fill="black"
                                                fill-opacity="0.3"></rect>
                                            <rect x="1483" y="250" width="359" height="127" rx="8" stroke="#F46A59">
                                            </rect>
                                        </g>
                                        <path id="tiger_lock"
                                            d="M1688.82 308.688H1685.23V297.859C1685.23 285.257 1675.03 275 1662.5 275C1649.97 275 1639.77 285.257 1639.77 297.859V308.688H1636.18C1632.22 308.688 1629 311.921 1629 315.906V344.781C1629 348.767 1632.22 352 1636.18 352H1688.82C1692.78 352 1696 348.767 1696 344.781V315.906C1696 311.921 1692.78 308.688 1688.82 308.688ZM1673.27 308.688H1651.73V297.859C1651.73 291.889 1656.56 287.031 1662.5 287.031C1668.44 287.031 1673.27 291.889 1673.27 297.859V308.688Z"
                                            fill="white"></path>
                                    </g>
                                    <text id="10000_3" fill="black" xml:space="preserve" style="white-space: pre"
                                        font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                        <tspan x="1503.18" y="358.19"
                                            :class="{'suspended-book' : main[1].gstatus != 'OPEN'}"
                                            v-vcasinofancybook="{sid: main[1].sid, subid: 0 }">0</tspan>
                                    </text>
                                </g>
                            </g>
                            <!-- MAIN SECTIONS ODDS END -->

                            <!-- OTHER SECTIONS ODDS START -->
                            <g id="other_odds">
                                <g id="dragon_other">

                                    <g id="dragon_even" style="cursor: pointer;"
                                        @click="setBetData(main[4].nat, main[4].b, mId, main[4].sid, main[4].subtype, 0, 'back', gameType, main[4].gstatus, main[4].min, main[4].max)">
                                        <rect id="dragon_even_box" x="2" y="398" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="EVEN" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="60" font-weight="bold"
                                            letter-spacing="0em">
                                            <tspan x="21.2656" y="464.469">EVEN</tspan>
                                        </text>
                                        <text id="1.99_4" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 2, 20)"
                                                :y="getRectCenterCordinates(123, 398)">{{ main[4].b }}</tspan>
                                        </text>
                                        <g id="dragon_even_suspended" v-if="main[4].gstatus != 'OPEN'">
                                            <g id="dragon_even_suspended_box">
                                                <rect x="1" y="395" width="288" height="127" rx="8" fill="black"
                                                    fill-opacity="0.3"></rect>
                                                <rect x="1" y="395" width="288" height="127" rx="8" stroke="#F46A59">
                                                </rect>
                                            </g>
                                            <path id="dragon_even_lock"
                                                d="M170.821 437.688H167.232V426.859C167.232 414.257 157.033 404 144.5 404C131.967 404 121.768 414.257 121.768 426.859V437.688H118.179C114.215 437.688 111 440.921 111 444.906V473.781C111 477.767 114.215 481 118.179 481H170.821C174.785 481 178 477.767 178 473.781V444.906C178 440.921 174.785 437.688 170.821 437.688ZM155.268 437.688H133.732V426.859C133.732 420.889 138.563 416.031 144.5 416.031C150.437 416.031 155.268 420.889 155.268 426.859V437.688Z"
                                                fill="white"></path>
                                        </g>
                                        <text id="10000_4" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold"
                                            letter-spacing="0em">
                                            <tspan x="21.1836" y="503.19"
                                                :class="{'suspended-book' : main[4].gstatus != 'OPEN'}"
                                                v-vcasinofancybook="{sid: main[4].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>

                                    <g id="dragon_odd" style="cursor: pointer;"
                                        @click="setBetData(main[5].nat, main[5].b, mId, main[5].sid, main[5].subtype, 0, 'back', gameType, main[5].gstatus, main[5].min, main[5].max)">
                                        <rect id="dragon_odd_box" x="311" y="398" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="ODD" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="60" font-weight="bold"
                                            letter-spacing="0em">
                                            <tspan x="330.32" y="464.469">ODD</tspan>
                                        </text>
                                        <text id="1.99_5" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 311, 20)"
                                                :y="getRectCenterCordinates(123, 398)">{{ main[5].b }}</tspan>
                                        </text>
                                        <g id="dragon_odd_suspended" v-if="main[5].gstatus != 'OPEN'">
                                            <g id="dragon_odd_suspended_box">
                                                <rect x="310" y="395" width="288" height="127" rx="8" fill="black"
                                                    fill-opacity="0.3"></rect>
                                                <rect x="310" y="395" width="288" height="127" rx="8" stroke="#F46A59">
                                                </rect>
                                            </g>
                                            <path id="dragon_odd_lock"
                                                d="M479.821 437.688H476.232V426.859C476.232 414.257 466.033 404 453.5 404C440.967 404 430.768 414.257 430.768 426.859V437.688H427.179C423.215 437.688 420 440.921 420 444.906V473.781C420 477.767 423.215 481 427.179 481H479.821C483.785 481 487 477.767 487 473.781V444.906C487 440.921 483.785 437.688 479.821 437.688ZM464.268 437.688H442.732V426.859C442.732 420.889 447.563 416.031 453.5 416.031C459.437 416.031 464.268 420.889 464.268 426.859V437.688Z"
                                                fill="white"></path>
                                        </g>
                                        <text id="10000_5" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold"
                                            letter-spacing="0em">
                                            <tspan x="330.184" y="503.19"
                                                :class="{'suspended-book' : main[5].gstatus != 'OPEN'}"
                                                v-vcasinofancybook="{sid: main[5].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>

                                    <g id="dragon_black" style="cursor: pointer;"
                                        @click="setBetData(main[7].nat, main[7].b, mId, main[7].sid, main[7].subtype, 0, 'back', gameType, main[7].gstatus, main[7].min, main[7].max)">
                                        <rect id="dragon_black_box" x="620" y="398" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="1.99_6" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 620, 20)"
                                                :y="getRectCenterCordinates(123, 398)">{{ main[7].b }}</tspan>
                                        </text>
                                        <rect id="spade" x="636" y="408" width="60" height="60" fill="url(#pattern2)">
                                        </rect>
                                        <rect id="club" x="686" y="408" width="60" height="60" fill="url(#pattern3)">
                                        </rect>
                                        <g id="dragon_black_suspended" v-if="main[7].gstatus != 'OPEN'">
                                            <g id="dragon_black_suspended_box">
                                                <rect x="619" y="395" width="288" height="127" rx="8" fill="black"
                                                    fill-opacity="0.3"></rect>
                                                <rect x="619" y="395" width="288" height="127" rx="8" stroke="#F46A59">
                                                </rect>
                                            </g>
                                            <path id="dragon_black_lock"
                                                d="M788.821 437.688H785.232V426.859C785.232 414.257 775.033 404 762.5 404C749.967 404 739.768 414.257 739.768 426.859V437.688H736.179C732.215 437.688 729 440.921 729 444.906V473.781C729 477.767 732.215 481 736.179 481H788.821C792.785 481 796 477.767 796 473.781V444.906C796 440.921 792.785 437.688 788.821 437.688ZM773.268 437.688H751.732V426.859C751.732 420.889 756.563 416.031 762.5 416.031C768.437 416.031 773.268 420.889 773.268 426.859V437.688Z"
                                                fill="white"></path>
                                        </g>
                                        <text id="10000_6" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold"
                                            letter-spacing="0em">
                                            <tspan x="639.184" y="503.19"
                                                :class="{'suspended-book' : main[7].gstatus != 'OPEN'}"
                                                v-vcasinofancybook="{sid: main[7].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>

                                    <g id="dragon_red" style="cursor: pointer;"
                                        @click="setBetData(main[6].nat, main[6].b, mId, main[6].sid, main[6].subtype, 0, 'back', gameType, main[6].gstatus, main[6].min, main[6].max)">
                                        <rect id="dragon_red_box" x="929" y="398" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="1.99_7" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 929, 20)"
                                                :y="getRectCenterCordinates(123, 398)">{{ main[6].b }}</tspan>
                                        </text>
                                        <rect id="heart" x="948" y="408" width="60" height="60" fill="url(#pattern4)">
                                        </rect>
                                        <rect id="diamond" x="1003" y="408" width="60" height="60"
                                            fill="url(#pattern5)">
                                        </rect>
                                        <g id="dragon_red_suspended" v-if="main[6].gstatus != 'OPEN'">
                                            <g id="dragon_red_suspended_box">
                                                <rect x="928" y="395" width="288" height="127" rx="8" fill="black"
                                                    fill-opacity="0.3"></rect>
                                                <rect x="928" y="395" width="288" height="127" rx="8" stroke="#F46A59">
                                                </rect>
                                            </g>
                                            <path id="dragon_red_lock"
                                                d="M1097.82 437.688H1094.23V426.859C1094.23 414.257 1084.03 404 1071.5 404C1058.97 404 1048.77 414.257 1048.77 426.859V437.688H1045.18C1041.22 437.688 1038 440.921 1038 444.906V473.781C1038 477.767 1041.22 481 1045.18 481H1097.82C1101.78 481 1105 477.767 1105 473.781V444.906C1105 440.921 1101.78 437.688 1097.82 437.688ZM1082.27 437.688H1060.73V426.859C1060.73 420.889 1065.56 416.031 1071.5 416.031C1077.44 416.031 1082.27 420.889 1082.27 426.859V437.688Z"
                                                fill="white"></path>
                                        </g>
                                        <text id="10000_7" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold"
                                            letter-spacing="0em">
                                            <tspan x="948.184" y="503.19"
                                                :class="{'suspended-book' : main[6].gstatus != 'OPEN'}"
                                                v-vcasinofancybook="{sid: main[6].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>

                                </g>

                                <g id="tiger_other">
                                    <g id="tiger_even" style="cursor: pointer;"
                                        @click="setBetData(main[21].nat, main[21].b, mId, main[21].sid, main[21].subtype, 0, 'back', gameType, main[21].gstatus, main[21].min, main[21].max)">
                                        <rect id="tiger_even_box" x="1268" y="399" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="EVEN_2" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="60" font-weight="bold"
                                            letter-spacing="0em">
                                            <tspan x="1287.27" y="465.469">EVEN</tspan>
                                        </text>
                                        <text id="1.99_12" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 1268, 20)"
                                                :y="getRectCenterCordinates(123, 399)">{{ main[21].b }}</tspan>
                                        </text>
                                        <g id="tiger_even_suspended" v-if="main[21].gstatus != 'OPEN'">
                                            <g id="tiger_even_suspended_box">
                                                <rect x="1267" y="396" width="288" height="127" rx="8" fill="black"
                                                    fill-opacity="0.3"></rect>
                                                <rect x="1267" y="396" width="288" height="127" rx="8" stroke="#F46A59">
                                                </rect>
                                            </g>
                                            <path id="tiger_even_lock"
                                                d="M1436.82 438.688H1433.23V427.859C1433.23 415.257 1423.03 405 1410.5 405C1397.97 405 1387.77 415.257 1387.77 427.859V438.688H1384.18C1380.22 438.688 1377 441.921 1377 445.906V474.781C1377 478.767 1380.22 482 1384.18 482H1436.82C1440.78 482 1444 478.767 1444 474.781V445.906C1444 441.921 1440.78 438.688 1436.82 438.688ZM1421.27 438.688H1399.73V427.859C1399.73 421.889 1404.56 417.031 1410.5 417.031C1416.44 417.031 1421.27 421.889 1421.27 427.859V438.688Z"
                                                fill="white"></path>
                                        </g>
                                        <text id="10000_12" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold"
                                            letter-spacing="0em">
                                            <tspan x="1287.18" y="504.19"
                                                :class="{'suspended-book' : main[21].gstatus != 'OPEN'}"
                                                v-vcasinofancybook="{sid: main[21].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>

                                    <g id="tiger_odd" style="cursor: pointer;"
                                        @click="setBetData(main[22].nat, main[22].b, mId, main[22].sid, main[22].subtype, 0, 'back', gameType, main[22].gstatus, main[22].min, main[22].max)">
                                        <rect id="tiger_odd_box" x="1577" y="399" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="ODD_2" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="60" font-weight="bold"
                                            letter-spacing="0em">
                                            <tspan x="1596.32" y="465.469">ODD</tspan>
                                        </text>
                                        <text id="1.99_13" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 1577, 20)"
                                                :y="getRectCenterCordinates(123, 399)">{{ main[22].b }}</tspan>
                                        </text>
                                        <g id="tiger_odd_suspended" v-if="main[22].gstatus != 'OPEN'">
                                            <g id="tiger_odd_suspended_box">
                                                <rect x="1576" y="396" width="288" height="127" rx="8" fill="black"
                                                    fill-opacity="0.3"></rect>
                                                <rect x="1576" y="396" width="288" height="127" rx="8" stroke="#F46A59">
                                                </rect>
                                            </g>
                                            <path id="tiger_odd_lock"
                                                d="M1745.82 438.688H1742.23V427.859C1742.23 415.257 1732.03 405 1719.5 405C1706.97 405 1696.77 415.257 1696.77 427.859V438.688H1693.18C1689.22 438.688 1686 441.921 1686 445.906V474.781C1686 478.767 1689.22 482 1693.18 482H1745.82C1749.78 482 1753 478.767 1753 474.781V445.906C1753 441.921 1749.78 438.688 1745.82 438.688ZM1730.27 438.688H1708.73V427.859C1708.73 421.889 1713.56 417.031 1719.5 417.031C1725.44 417.031 1730.27 421.889 1730.27 427.859V438.688Z"
                                                fill="white"></path>
                                        </g>
                                        <text id="10000_13" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold"
                                            letter-spacing="0em">
                                            <tspan x="1596.18" y="504.19"
                                                :class="{'suspended-book' : main[22].gstatus != 'OPEN'}"
                                                v-vcasinofancybook="{sid: main[22].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>

                                    <g id="tiger_black" style="cursor: pointer;"
                                        @click="setBetData(main[24].nat, main[24].b, mId, main[24].sid, main[24].subtype, 0, 'back', gameType, main[24].gstatus, main[24].min, main[24].max)">
                                        <rect id="tiger_black_box" x="1886" y="399" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="1.99_14" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 1886, 20)"
                                                :y="getRectCenterCordinates(123, 399)">{{ main[24].b }}</tspan>
                                        </text>
                                        <rect id="spade_3" x="1902" y="409" width="60" height="60"
                                            fill="url(#pattern10)">
                                        </rect>
                                        <rect id="club_3" x="1952" y="409" width="60" height="60"
                                            fill="url(#pattern11)">
                                        </rect>
                                        <g id="tiger_black_suspended" v-if="main[24].gstatus != 'OPEN'">
                                            <g id="tiger_black_suspended_box">
                                                <rect x="1885" y="396" width="288" height="127" rx="8" fill="black"
                                                    fill-opacity="0.3"></rect>
                                                <rect x="1885" y="396" width="288" height="127" rx="8" stroke="#F46A59">
                                                </rect>
                                            </g>
                                            <path id="tiger_black_lock"
                                                d="M2054.82 438.688H2051.23V427.859C2051.23 415.257 2041.03 405 2028.5 405C2015.97 405 2005.77 415.257 2005.77 427.859V438.688H2002.18C1998.22 438.688 1995 441.921 1995 445.906V474.781C1995 478.767 1998.22 482 2002.18 482H2054.82C2058.78 482 2062 478.767 2062 474.781V445.906C2062 441.921 2058.78 438.688 2054.82 438.688ZM2039.27 438.688H2017.73V427.859C2017.73 421.889 2022.56 417.031 2028.5 417.031C2034.44 417.031 2039.27 421.889 2039.27 427.859V438.688Z"
                                                fill="white"></path>
                                        </g>
                                        <text id="10000_14" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold"
                                            letter-spacing="0em">
                                            <tspan x="1905.18" y="504.19"
                                                :class="{'suspended-book' : main[24].gstatus != 'OPEN'}"
                                                v-vcasinofancybook="{sid: main[24].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>

                                    <g id="tiger_red" style="cursor: pointer;"
                                        @click="setBetData(main[23].nat, main[23].b, mId, main[23].sid, main[23].subtype, 0, 'back', gameType, main[23].gstatus, main[23].min, main[23].max)">
                                        <rect id="tiger_red_box" x="2195" y="399" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="1.99_15" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 2195, 20)"
                                                :y="getRectCenterCordinates(123, 399)">{{ main[23].b }}</tspan>
                                        </text>
                                        <rect id="heart_3" x="2214" y="409" width="60" height="60"
                                            fill="url(#pattern12)">
                                        </rect>
                                        <rect id="diamond_3" x="2269" y="409" width="60" height="60"
                                            fill="url(#pattern13)">
                                        </rect>
                                        <g id="tiger_red_suspended" v-if="main[23].gstatus != 'OPEN'">
                                            <g id="tiger_red_suspended_box">
                                                <rect x="2194" y="396" width="288" height="127" rx="8" fill="black"
                                                    fill-opacity="0.3"></rect>
                                                <rect x="2194" y="396" width="288" height="127" rx="8" stroke="#F46A59">
                                                </rect>
                                            </g>
                                            <path id="tiger_red_lock"
                                                d="M2363.82 438.688H2360.23V427.859C2360.23 415.257 2350.03 405 2337.5 405C2324.97 405 2314.77 415.257 2314.77 427.859V438.688H2311.18C2307.22 438.688 2304 441.921 2304 445.906V474.781C2304 478.767 2307.22 482 2311.18 482H2363.82C2367.78 482 2371 478.767 2371 474.781V445.906C2371 441.921 2367.78 438.688 2363.82 438.688ZM2348.27 438.688H2326.73V427.859C2326.73 421.889 2331.56 417.031 2337.5 417.031C2343.44 417.031 2348.27 421.889 2348.27 427.859V438.688Z"
                                                fill="white"></path>
                                        </g>
                                        <text id="10000_15" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold"
                                            letter-spacing="0em">
                                            <tspan x="2214.18" y="504.19"
                                                :class="{'suspended-book' : main[23].gstatus != 'OPEN'}"
                                                v-vcasinofancybook="{sid: main[23].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>


                                </g>
                            </g>
                            <!-- OTHER SECTIONS ODDS END -->

                            <!-- CARDS START -->
                            <g id="card_rate">
                            <rect id="card_rate_box" x="2" y="639" width="129" height="71" rx="5" fill="black" fill-opacity="0.01" stroke="black" stroke-width="4"></rect>
                            <text id="12.0" fill="black" xml:space="preserve" style="white-space: pre" font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em" text-anchor="middle"><tspan :x="getRectCenterCordinates(129, 2)" y="693.891">{{main[8].b}}</tspan></text>
                            </g>
                            <g id="card_rate_2">
                            <rect id="card_rate_box_2" x="2358" y="639" width="129" height="71" rx="5" fill="black" fill-opacity="0.01" stroke="black" stroke-width="4"></rect>
                            <text id="12.0_2" fill="black" xml:space="preserve" style="white-space: pre" font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em" text-anchor="middle"><tspan  :x="getRectCenterCordinates(129, 2358)" y="693.891">{{main[25].b}}</tspan></text>
                            </g>
                            <g id="cards">
                                <g id="dragon_cards">
                                    <g id="dragon_cards_A" style="cursor: pointer;"
                                        @click="setBetData(main[8].nat, main[8].b, mId, main[8].sid, main[8].subtype, 0, 'back', gameType, main[8].gstatus, main[8].min, main[8].max)">
                                        <rect id="Rectangle 2" x="153.689" y="554" width="111.473" height="111.459"
                                            fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a" x="176.913" y="554" width="65.0261" height="80.3157"
                                            fill="url(#cardA)"></rect>
                                        <rect id="Rectangle 1" v-if="main[8].gstatus != 'OPEN'" x="176.913" y="554" width="65.0261" height="80.3157"
                                            fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 153.689)" :y="getRectCenterCordinates(111.459, 554, 25)"
                                                v-vcasinofancybook="{sid: main[8].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="dragon_cards_2" style="cursor: pointer;"
                                        @click="setBetData(main[9].nat, main[9].b, mId, main[9].sid, main[9].subtype, 0, 'back', gameType, main[9].gstatus, main[9].min, main[9].max)">
                                        <rect id="Rectangle 2_2" x="293.031" y="554" width="111.473" height="111.459"
                                            fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_2" x="316.255" y="554" width="65.0261" height="80.3157"
                                            fill="url(#card2)"></rect>
                                        <rect id="Rectangle 1_2" v-if="main[9].gstatus != 'OPEN'" x="316.255" y="554" width="65.0261" height="80.3157"
                                            fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_2" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 293.031)" :y="getRectCenterCordinates(111.459, 554, 25)"
                                                v-vcasinofancybook="{sid: main[9].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="dragon_cards_3" style="cursor: pointer;"
                                        @click="setBetData(main[10].nat, main[10].b, mId, main[10].sid, main[10].subtype, 0, 'back', gameType, main[10].gstatus, main[10].min, main[10].max)">
                                        <rect id="Rectangle 2_3" x="432.373" y="554" width="111.473" height="111.459"
                                            fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_3" x="455.596" y="554" width="65.0261" height="80.3157"
                                            fill="url(#card3)"></rect>
                                        <rect id="Rectangle 1_3" v-if="main[10].gstatus != 'OPEN'" x="455.596" y="554" width="65.0261" height="80.3157"
                                            fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_3" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 432.373)" :y="getRectCenterCordinates(111.459, 554, 25)"
                                                v-vcasinofancybook="{sid: main[10].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="dragon_cards_4" style="cursor: pointer;"
                                        @click="setBetData(main[11].nat, main[11].b, mId, main[11].sid, main[11].subtype, 0, 'back', gameType, main[11].gstatus, main[11].min, main[11].max)">
                                        <rect id="Rectangle 2_4" x="571.715" y="554" width="111.473" height="111.459"
                                            fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_4" x="594.938" y="554" width="65.0261" height="80.3157"
                                            fill="url(#card4)"></rect>
                                        <rect id="Rectangle 1_4" v-if="main[11].gstatus != 'OPEN'" x="594.938" y="554" width="65.0261" height="80.3157"
                                            fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_4" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 571.715)" :y="getRectCenterCordinates(111.459, 554, 25)"
                                                v-vcasinofancybook="{sid: main[11].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="dragon_cards_5" style="cursor: pointer;"
                                        @click="setBetData(main[12].nat, main[12].b, mId, main[12].sid, main[12].subtype, 0, 'back', gameType, main[12].gstatus, main[12].min, main[13].max)">
                                        <rect id="Rectangle 2_5" x="713.843" y="554" width="111.473" height="111.459"
                                            fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_5" x="737.067" y="554" width="65.0261" height="80.3157"
                                            fill="url(#card5)"></rect>
                                        <rect id="Rectangle 1_5" v-if="main[12].gstatus != 'OPEN'" x="737.067" y="554" width="65.0261" height="80.3157"
                                            fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_5" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 713.843)" :y="getRectCenterCordinates(111.459, 554, 25)"
                                                v-vcasinofancybook="{sid: main[12].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="dragon_cards_6" style="cursor: pointer;"
                                        @click="setBetData(main[13].nat, main[13].b, mId, main[13].sid, main[13].subtype, 0, 'back', gameType, main[13].gstatus, main[13].min, main[13].max)">
                                        <rect id="Rectangle 2_6" x="853.185" y="554" width="111.473" height="111.459"
                                            fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_6" x="876.409" y="554" width="65.0261" height="80.3157"
                                            fill="url(#card6)"></rect>
                                        <rect id="Rectangle 1_6" v-if="main[13].gstatus != 'OPEN'" x="876.409" y="554" width="65.0261" height="80.3157"
                                            fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_6" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 853.185)" :y="getRectCenterCordinates(111.459, 554, 25)"
                                                v-vcasinofancybook="{sid: main[13].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="dragon_cards_7" style="cursor: pointer;"
                                        @click="setBetData(main[14].nat, main[14].b, mId, main[14].sid, main[14].subtype, 0, 'back', gameType, main[14].gstatus, main[14].min, main[14].max)">
                                        <rect id="Rectangle 2_7" x="992.527" y="554" width="111.473" height="111.459"
                                            fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_7" x="1015.75" y="554" width="65.0261" height="80.3157"
                                            fill="url(#card7)"></rect>
                                        <rect id="Rectangle 1_7" v-if="main[14].gstatus != 'OPEN'" x="1015.75" y="554" width="65.0261" height="80.3157"
                                            fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_7" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 992.527)" :y="getRectCenterCordinates(111.459, 554, 25)"
                                                v-vcasinofancybook="{sid: main[14].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="dragon_cards_8" style="cursor: pointer;"
                                        @click="setBetData(main[15].nat, main[15].b, mId, main[15].sid, main[15].subtype, 0, 'back', gameType, main[15].gstatus, main[15].min, main[15].max)">
                                        <rect id="Rectangle 2_8" x="219.644" y="683.542" width="111.473"
                                            height="111.459" fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_8" x="242.868" y="683.542" width="65.0261"
                                            height="80.3157" fill="url(#card8)"></rect>
                                        <rect id="Rectangle 1_8" v-if="main[15].gstatus != 'OPEN'" x="242.868" y="683.542" width="65.0261"
                                            height="80.3157" fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_8" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 219.644)" :y="getRectCenterCordinates(111.459, 683.542, 25)"
                                                v-vcasinofancybook="{sid: main[15].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="dragon_cards_9" style="cursor: pointer;"
                                        @click="setBetData(main[16].nat, main[16].b, mId, main[16].sid, main[16].subtype, 0, 'back', gameType, main[16].gstatus, main[16].min, main[16].max)">
                                        <rect id="Rectangle 2_9" x="358.986" y="683.542" width="111.473"
                                            height="111.459" fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_9" x="382.21" y="683.542" width="65.0261"
                                            height="80.3157" fill="url(#card9)"></rect>
                                        <rect id="Rectangle 1_9" v-if="main[16].gstatus != 'OPEN'" x="382.21" y="683.542" width="65.0261" height="80.3157"
                                            fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_9" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 358.986)" :y="getRectCenterCordinates(111.459, 683.542, 25)"
                                                v-vcasinofancybook="{sid: main[16].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="dragon_cards_10" style="cursor: pointer;"
                                        @click="setBetData(main[17].nat, main[17].b, mId, main[17].sid, main[17].subtype, 0, 'back', gameType, main[17].gstatus, main[17].min, main[17].max)">
                                        <rect id="Rectangle 2_10" x="498.328" y="683.542" width="111.473"
                                            height="111.459" fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_10" x="521.552" y="683.542" width="65.0261"
                                            height="80.3157" fill="url(#card10)"></rect>
                                        <rect id="Rectangle 1_10" v-if="main[17].gstatus != 'OPEN'" x="521.552" y="683.542" width="65.0261"
                                            height="80.3157" fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_10" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 498.328)" :y="getRectCenterCordinates(111.459, 683.542, 25)"
                                                v-vcasinofancybook="{sid: main[17].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="dragon_cards_J" style="cursor: pointer;"
                                        @click="setBetData(main[18].nat, main[18].b, mId, main[18].sid, main[18].subtype, 0, 'back', gameType, main[18].gstatus, main[18].min, main[18].max)">
                                        <rect id="Rectangle 2_11" x="640.457" y="683.542" width="111.473"
                                            height="111.459" fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_11" x="663.68" y="683.542" width="65.0261"
                                            height="80.3157" fill="url(#cardJ)"></rect>
                                        <rect id="Rectangle 1_11" v-if="main[18].gstatus != 'OPEN'" x="663.68" y="683.542" width="65.0261"
                                            height="80.3157" fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_11" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 640.457)" :y="getRectCenterCordinates(111.459, 683.542, 25)"
                                                v-vcasinofancybook="{sid: main[18].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="dragon_cards_Q" style="cursor: pointer;"
                                        @click="setBetData(main[19].nat, main[19].b, mId, main[19].sid, main[19].subtype, 0, 'back', gameType, main[19].gstatus, main[19].min, main[19].max)">
                                        <rect id="Rectangle 2_12" x="779.798" y="683.542" width="111.473"
                                            height="111.459" fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_12" x="803.022" y="683.542" width="65.0261"
                                            height="80.3157" fill="url(#cardQ)"></rect>
                                        <rect id="Rectangle 1_12" v-if="main[19].gstatus != 'OPEN'" x="803.022" y="683.542" width="65.0261"
                                            height="80.3157" fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_12" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 779.798)" :y="getRectCenterCordinates(111.459, 683.542, 25)"
                                                v-vcasinofancybook="{sid: main[19].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="dragon_cards_K" style="cursor: pointer;"
                                        @click="setBetData(main[20].nat, main[20].b, mId, main[20].sid, main[20].subtype, 0, 'back', gameType, main[20].gstatus, main[20].min, main[20].max)">
                                        <rect id="Rectangle 2_13" x="919.14" y="683.542" width="111.473"
                                            height="111.459" fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_13" x="942.364" y="683.542" width="65.0261"
                                            height="80.3157" fill="url(#cardK)"></rect>
                                        <rect id="Rectangle 1_13" v-if="main[20].gstatus != 'OPEN'" x="942.364" y="683.542" width="65.0261"
                                            height="80.3157" fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_13" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 919.14)" :y="getRectCenterCordinates(111.459, 683.542, 25)"
                                                v-vcasinofancybook="{sid: main[20].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                </g>

                                <g id="tiger_cards">
                                    <g id="tiger_cards_A"  style="cursor: pointer;"
                                        @click="setBetData(main[25].nat, main[25].b, mId, main[25].sid, main[25].subtype, 0, 'back', gameType, main[25].gstatus, main[25].min, main[25].max)">
                                        <rect id="Rectangle 2_14" x="1389" y="554" width="111.473" height="111.459"
                                            fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_14" x="1412.22" y="554" width="65.0261" height="80.3157"
                                            fill="url(#cardA)"></rect>
                                        <rect id="Rectangle 1_14" v-if="main[25].gstatus != 'OPEN'" x="1412.22" y="554" width="65.0261" height="80.3157"
                                            fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_14" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 1389)" :y="getRectCenterCordinates(111.459, 554, 25)"
                                                v-vcasinofancybook="{sid: main[25].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="tiger_cards_2" style="cursor: pointer;"
                                        @click="setBetData(main[26].nat, main[26].b, mId, main[26].sid, main[26].subtype, 0, 'back', gameType, main[26].gstatus, main[26].min, main[26].max)">
                                        <rect id="Rectangle 2_15" x="1528.34" y="554" width="111.473" height="111.459"
                                            fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_15" x="1551.57" y="554" width="65.0261" height="80.3157"
                                            fill="url(#card2)"></rect>
                                        <rect id="Rectangle 1_15" v-if="main[26].gstatus != 'OPEN'" x="1551.57" y="554" width="65.0261" height="80.3157"
                                            fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_15" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 1528.34)" :y="getRectCenterCordinates(111.459, 554, 25)"
                                                v-vcasinofancybook="{sid: main[26].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="tiger_cards_3" style="cursor: pointer;"
                                        @click="setBetData(main[27].nat, main[27].b, mId, main[27].sid, main[27].subtype, 0, 'back', gameType, main[27].gstatus, main[27].min, main[27].max)">
                                        <rect id="Rectangle 2_16" x="1667.68" y="554" width="111.473" height="111.459"
                                            fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_16" x="1690.91" y="554" width="65.0261" height="80.3157"
                                            fill="url(#card3)"></rect>
                                        <rect id="Rectangle 1_16" v-if="main[27].gstatus != 'OPEN'" x="1690.91" y="554" width="65.0261" height="80.3157"
                                            fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_16" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 1667.68)" :y="getRectCenterCordinates(111.459, 554, 25)"
                                                v-vcasinofancybook="{sid: main[27].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="tiger_cards_4" style="cursor: pointer;"
                                        @click="setBetData(main[28].nat, main[28].b, mId, main[28].sid, main[28].subtype, 0, 'back', gameType, main[28].gstatus, main[28].min, main[28].max)">
                                        <rect id="Rectangle 2_17" x="1807.03" y="554" width="111.473" height="111.459"
                                            fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_17" x="1830.25" y="554" width="65.0261" height="80.3157"
                                            fill="url(#card4)"></rect>
                                        <rect id="Rectangle 1_17" v-if="main[28].gstatus != 'OPEN'" x="1830.25" y="554" width="65.0261" height="80.3157"
                                            fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_17" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 1807.03)" :y="getRectCenterCordinates(111.459, 554, 25)"
                                                v-vcasinofancybook="{sid: main[28].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="tiger_cards_5" style="cursor: pointer;"
                                        @click="setBetData(main[29].nat, main[29].b, mId, main[29].sid, main[29].subtype, 0, 'back', gameType, main[29].gstatus, main[29].min, main[29].max)">
                                        <rect id="Rectangle 2_18" x="1949.15" y="554" width="111.473" height="111.459"
                                            fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_18" x="1972.38" y="554" width="65.0261" height="80.3157"
                                            fill="url(#card5)"></rect>
                                        <rect id="Rectangle 1_18" v-if="main[29].gstatus != 'OPEN'" x="1972.38" y="554" width="65.0261" height="80.3157"
                                            fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_18" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 1949.15)" :y="getRectCenterCordinates(111.459, 554, 25)"
                                                v-vcasinofancybook="{sid: main[29].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="tiger_cards_6" style="cursor: pointer;"
                                        @click="setBetData(main[30].nat, main[30].b, mId, main[30].sid, main[30].subtype, 0, 'back', gameType, main[30].gstatus, main[30].min, main[30].max)">
                                        <rect id="Rectangle 2_19" x="2088.5" y="554" width="111.473" height="111.459"
                                            fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_19" x="2111.72" y="554" width="65.0261" height="80.3157"
                                            fill="url(#card6)"></rect>
                                        <rect id="Rectangle 1_19" v-if="main[30].gstatus != 'OPEN'" x="2111.72" y="554" width="65.0261" height="80.3157"
                                            fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_19" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 2088.5)" :y="getRectCenterCordinates(111.459, 554, 25)"
                                                v-vcasinofancybook="{sid: main[30].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="tiger_cards_7" style="cursor: pointer;"
                                        @click="setBetData(main[31].nat, main[31].b, mId, main[31].sid, main[31].subtype, 0, 'back', gameType, main[31].gstatus, main[31].min, main[31].max)">
                                        <rect id="Rectangle 2_20" x="2227.84" y="554" width="111.473" height="111.459"
                                            fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_20" x="2251.06" y="554" width="65.0261" height="80.3157"
                                            fill="url(#card7)"></rect>
                                        <rect id="Rectangle 1_20" v-if="main[31].gstatus != 'OPEN'" x="2251.06" y="554" width="65.0261" height="80.3157"
                                            fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_20" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 2227.84)" :y="getRectCenterCordinates(111.459, 554, 25)"
                                                v-vcasinofancybook="{sid: main[31].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="tiger_cards_8" style="cursor: pointer;"
                                        @click="setBetData(main[32].nat, main[32].b, mId, main[32].sid, main[32].subtype, 0, 'back', gameType, main[32].gstatus, main[32].min, main[32].max)">
                                        <rect id="Rectangle 2_21" x="1454.95" y="683.542" width="111.473"
                                            height="111.459" fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_21" x="1478.18" y="683.542" width="65.0261"
                                            height="80.3157" fill="url(#card8)"></rect>
                                        <rect id="Rectangle 1_21" v-if="main[32].gstatus != 'OPEN'" x="1478.18" y="683.542" width="65.0261"
                                            height="80.3157" fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_21" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 1454.95)" :y="getRectCenterCordinates(111.459, 683.542, 25)"
                                                v-vcasinofancybook="{sid: main[32].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="tiger_cards_9" style="cursor: pointer;"
                                        @click="setBetData(main[33].nat, main[33].b, mId, main[33].sid, main[33].subtype, 0, 'back', gameType, main[33].gstatus, main[33].min, main[33].max)">
                                        <rect id="Rectangle 2_22" x="1594.3" y="683.542" width="111.473"
                                            height="111.459" fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_22" x="1617.52" y="683.542" width="65.0261"
                                            height="80.3157" fill="url(#card9)"></rect>
                                        <rect id="Rectangle 1_22" v-if="main[33].gstatus != 'OPEN'" x="1617.52" y="683.542" width="65.0261"
                                            height="80.3157" fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_22" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 1594.3)" :y="getRectCenterCordinates(111.459, 683.542, 25)"
                                                v-vcasinofancybook="{sid: main[33].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="tiger_cards_10" style="cursor: pointer;"
                                        @click="setBetData(main[34].nat, main[34].b, mId, main[34].sid, main[34].subtype, 0, 'back', gameType, main[34].gstatus, main[34].min, main[34].max)">
                                        <rect id="Rectangle 2_23" x="1733.64" y="683.542" width="111.473"
                                            height="111.459" fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_23" x="1756.86" y="683.542" width="65.0261"
                                            height="80.3157" fill="url(#card10)"></rect>
                                        <rect id="Rectangle 1_23" v-if="main[34].gstatus != 'OPEN'" x="1756.86" y="683.542" width="65.0261"
                                            height="80.3157" fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_23" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 1733.64)" :y="getRectCenterCordinates(111.459, 683.542, 25)"
                                                v-vcasinofancybook="{sid: main[34].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="tiger_cards_J" style="cursor: pointer;"
                                        @click="setBetData(main[35].nat, main[35].b, mId, main[35].sid, main[35].subtype, 0, 'back', gameType, main[35].gstatus, main[35].min, main[35].max)">
                                        <rect id="Rectangle 2_24" x="1875.77" y="683.542" width="111.473"
                                            height="111.459" fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_24" x="1898.99" y="683.542" width="65.0261"
                                            height="80.3157" fill="url(#cardJ)"></rect>
                                        <rect id="Rectangle 1_24" v-if="main[35].gstatus != 'OPEN'" x="1898.99" y="683.542" width="65.0261"
                                            height="80.3157" fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_24" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 1875.77)" :y="getRectCenterCordinates(111.459, 683.542, 25)"
                                                v-vcasinofancybook="{sid: main[35].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="tiger_cards_Q" style="cursor: pointer;"
                                        @click="setBetData(main[36].nat, main[36].b, mId, main[36].sid, main[36].subtype, 0, 'back', gameType, main[36].gstatus, main[36].min, main[36].max)">
                                        <rect id="Rectangle 2_25" x="2015.11" y="683.542" width="111.473"
                                            height="111.459" fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_25" x="2038.33" y="683.542" width="65.0261"
                                            height="80.3157" fill="url(#cardQ)"></rect>
                                        <rect id="Rectangle 1_25" v-if="main[36].gstatus != 'OPEN'" x="2038.33" y="683.542" width="65.0261"
                                            height="80.3157" fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_25" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 2015.11)" :y="getRectCenterCordinates(111.459, 683.542, 25)"
                                                v-vcasinofancybook="{sid: main[36].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    <g id="tiger_cards_K" style="cursor: pointer;"
                                        @click="setBetData(main[37].nat, main[37].b, mId, main[37].sid, main[37].subtype, 0, 'back', gameType, main[37].gstatus, main[37].min, main[37].max)">
                                        <rect id="Rectangle 2_26" x="2154.45" y="683.542" width="111.473"
                                            height="111.459" fill="black" fill-opacity="0.01"></rect>
                                        <rect id="dragon_card_a_26" x="2177.67" y="683.542" width="65.0261"
                                            height="80.3157" fill="url(#cardK)"></rect>
                                        <rect id="Rectangle 1_26" v-if="main[37].gstatus != 'OPEN'" x="2177.67" y="683.542" width="65.0261"
                                            height="80.3157" fill="black" fill-opacity="0.3"></rect>
                                        <text id="1000_26" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Roboto" font-size="24" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="text-before-edge" text-anchor="middle">
                                            <tspan :x="getRectCenterCordinates(111.473, 2154.45)" :y="getRectCenterCordinates(111.459, 683.542, 25)"
                                                v-vcasinofancybook="{sid: main[37].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                </g>
                            </g>
                            <!-- CARDS END -->

                            <rect id="divider" x="1236" y="390" width="10" height="415" fill="#6E4407"></rect>
                        </template>
                    </g>
                    <defs>
                        <!-- P-A-CARD-1 -->
                        <pattern id="p_pa_card1_img" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#paCard1" transform="scale(0.02 0.0142857)"></use>
                        </pattern>

                        <!-- P-B-CARD-1 -->
                        <pattern id="p_pb_card1_img" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#pbCard2" transform="scale(0.02 0.0142857)"></use>
                        </pattern>


                        <!-- CARD-A -->
                        <pattern id="cardA" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#cardAImg" transform="scale(0.02 0.0142857)"></use>
                        </pattern>
                        <!-- CARD-2 -->
                        <pattern id="card2" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#card2Img" transform="scale(0.02 0.0142857)"></use>
                        </pattern>
                        <!-- CARD-3 -->
                        <pattern id="card3" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#card3Img" transform="scale(0.02 0.0142857)"></use>
                        </pattern>
                        <!-- CARD-4 -->
                        <pattern id="card4" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#card4Img" transform="scale(0.02 0.0142857)"></use>
                        </pattern>
                        <!-- CARD-5 -->
                        <pattern id="card5" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#card5Img" transform="scale(0.02 0.0142857)"></use>
                        </pattern>
                        <!-- CARD-6 -->
                        <pattern id="card6" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#card6Img" transform="scale(0.02 0.0142857)"></use>
                        </pattern>
                        <!-- CARD-7 -->
                        <pattern id="card7" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#card7Img" transform="scale(0.02 0.0142857)"></use>
                        </pattern>
                        <!-- CARD-8 -->
                        <pattern id="card8" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#card8Img" transform="scale(0.02 0.0142857)"></use>
                        </pattern>
                        <!-- CARD-9 -->
                        <pattern id="card9" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#card9Img" transform="scale(0.02 0.0142857)"></use>
                        </pattern>
                        <!-- CARD-10 -->
                        <pattern id="card10" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#card10Img" transform="scale(0.02 0.0142857)"></use>
                        </pattern>
                        <!-- CARD-J -->
                        <pattern id="cardJ" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#cardJImg" transform="scale(0.02 0.0142857)"></use>
                        </pattern>
                        <!-- CARD-Q -->
                        <pattern id="cardQ" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#cardQImg" transform="scale(0.02 0.0142857)"></use>
                        </pattern>
                        <!-- CARD-K -->
                        <pattern id="cardK" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#cardKImg" transform="scale(0.02 0.0142857)"></use>
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
                        <pattern id="pattern10" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image1" transform="scale(0.02)"></use>
                        </pattern>
                        <pattern id="pattern11" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image2" transform="scale(0.02)"></use>
                        </pattern>
                        <pattern id="pattern12" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image3" transform="scale(0.02)"></use>
                        </pattern>
                        <pattern id="pattern13" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image4" transform="scale(0.02)"></use>
                        </pattern>

                        <!-- CARD 1 -->
                        <image id="paCard1" data-name="2CC.png" width="50" height="70"
                            :href="`${cardPath}${cards[0]}.png`">
                        </image>
                        <!-- CARD 2 -->
                        <image id="pbCard2" data-name="2CC.png" width="50" height="70"
                            :href="`${cardPath}${cards[1]}.png`">
                        </image>


                        <!-- CARD A -->
                        <image id="cardAImg" data-name="A.png" width="50" height="70" :href="`${imgPath}front/img/cards/A.png`"></image>
                        <!-- CARD 2 -->
                        <image id="card2Img" data-name="2.png" width="50" height="70" :href="`${imgPath}front/img/cards/2.png`"></image>
                        <!-- CARD 3 -->
                        <image id="card3Img" data-name="3.png" width="50" height="70" :href="`${imgPath}front/img/cards/3.png`"></image>
                        <!-- CARD 4 -->
                        <image id="card4Img" data-name="4.png" width="50" height="70" :href="`${imgPath}front/img/cards/4.png`"></image>
                        <!-- CARD 5 -->
                        <image id="card5Img" data-name="5.png" width="50" height="70" :href="`${imgPath}front/img/cards/5.png`"></image>
                        <!-- CARD 6 -->
                        <image id="card6Img" data-name="6.png" width="50" height="70" :href="`${imgPath}front/img/cards/6.png`"></image>
                        <!-- CARD 7 -->
                        <image id="card7Img" data-name="7.png" width="50" height="70" :href="`${imgPath}front/img/cards/7.png`"></image>
                        <!-- CARD 8 -->
                        <image id="card8Img" data-name="8.png" width="50" height="70" :href="`${imgPath}front/img/cards/8.png`"></image>
                        <!-- CARD 9 -->
                        <image id="card9Img" data-name="9.png" width="50" height="70" :href="`${imgPath}front/img/cards/9.png`"></image>
                        <!-- CARD 10 -->
                        <image id="card10Img" data-name="10.png" width="50" height="70" :href="`${imgPath}front/img/cards/10.png`"></image>
                        <!-- CARD J -->
                        <image id="cardJImg" data-name="J.png" width="50" height="70" :href="`${imgPath}front/img/cards/J.png`"></image>
                        <!-- CARD Q -->
                        <image id="cardQImg" data-name="Q.png" width="50" height="70" :href="`${imgPath}front/img/cards/Q.png`"></image>
                        <!-- CARD K -->
                        <image id="cardKImg" data-name="K.png" width="50" height="70" :href="`${imgPath}front/img/cards/K.png`"></image>

                        <image id="image1" data-name="spade.png" width="50" height="50"
                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTEwNEIzQUI4MThCMTFFQkE4NkRERDk4NzBBOUNEQ0YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTEwNEIzQUM4MThCMTFFQkE4NkRERDk4NzBBOUNEQ0YiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MTA0QjNBOTgxOEIxMUVCQTg2REREOTg3MEE5Q0RDRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5MTA0QjNBQTgxOEIxMUVCQTg2REREOTg3MEE5Q0RDRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Prstm1gAAA36SURBVHja7FoJdFRl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">
                        </image>
                        <image id="image2" data-name="club.png" width="50" height="50"
                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTg1OTU1OUE4MThCMTFFQkEzQUFCQkEzMTY1QUFCOUMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTg1OTU1OUI4MThCMTFFQkEzQUFCQkEzMTY1QUFCOUMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5ODU5NTU5ODgxOEIxMUVCQTNBQUJCQTMxNjVBQUI5QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5ODU5NTU5OTgxOEIxMUVCQTNBQUJCQTMxNjVBQUI5QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PojDhkIAAA6sSURBVHja7FoLkFTl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">
                        </image>
                        <image id="image3" data-name="heart.png" width="50" height="50"
                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUI4OUU5REM4MThCMTFFQjhCRUU4N0FBRTYxQUJBNDciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUI4OUU5REQ4MThCMTFFQjhCRUU4N0FBRTYxQUJBNDciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQjg5RTlEQTgxOEIxMUVCOEJFRTg3QUFFNjFBQkE0NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQjg5RTlEQjgxOEIxMUVCOEJFRTg3QUFFNjFBQkE0NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrOTuaEAAA6pSURBVHja7FlplBzV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">
                        </image>
                        <image id="image4" data-name="diamond.png" width="50" height="50"
                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUZGOEM4OEY4MThCMTFFQkIzOUVGNThFMjNBREZDQjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUZGOEM4OTA4MThCMTFFQkIzOUVGNThFMjNBREZDQjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5RkY4Qzg4RDgxOEIxMUVCQjM5RUY1OEUyM0FERkNCOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5RkY4Qzg4RTgxOEIxMUVCQjM5RUY1OEUyM0FERkNCOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvU5fn4AAA3NSURBVHja3FkJcBTnlf76mO45NLdugYQEGIMxYC4BNglmNz7WVoid+AiLC8dOTCDeOMVSWYfEEIIXx3ackC0f2ezhOFWx7BS+kviiFuJUMOa2YwQICXQgCY1Gc2h6jp7pc1+3sON41yBpZCq7M3o1PTN/a9733vu+9/5uxjRN/H94MBcCEvv994v/FVOfC4ZNgWFOf/CRoWTgCDYguGDduABhR+BFEWa9aFBZ4SGd4b7MmAYYK3r0NJUshODkccvIBYGYhj5mg67A0DKNnprPXcOVXHqXriQJgUnfacM/7nBdPCBFVC10VYLDP/27biqhkrLL6zXGd6+ciUDJDcEUgxCr5188IHY5jMGgyWA41zWeiVc3ZeOnoOsyxNJ590vRzlC87xiGIqdssBevtBhmTKbrOXgmXLnJ4S/F0X97GpH9+xGefmV1Vua+03fqIFJSEh8RGuavkuymlgPnKl3tmXHtlT17dyF64Awi+44Dah41c29dz3nKLuM95eS+7T93zop68BcsLWaUNKIoUxn5glNv36JIEtqe34FQ7STketPoeO1VNHz+RjbV3/4g42RvYjmHdYZAVrgIGeFGYTwMNQcxOH2zOKGx7tizP0ehIwVv2A+h1Iee/3ofub4eTLh8+RfcofrrwNpxtNAYnz5HRmGGoVqvi4NzblkfO7EPXc2/gy9cDZn4IIocJcuBtt/uhjNQDp9/6nYlN+Cj06S/uoZoKCmU1H7mYbjCOPLYNniSDrhIrRxpan79AyhhdCRPRhF5rxUOFzdNOrVzs5brvkiqpWsjMJ3UNgneGd7gmdG0tKX5SSR3HoWbSopJJglIBoxugFMK8PBOAtMD1uOFINasT3e8fFVhcC8+dbIX5MwIkkad2shfUblk7SPJyEm0PvIEKtkgdDmNLMOBU1WoZF5RhOBkURKeAjmhwCF6IHWc+rHom7jwUwei5nPn7d4mgaDRA+Uzm55kglOZQ3ffDO5kBkadF874EFhRgO73QfS4KSoFmNkc8qdbcaajDaElpfBULV8g9fY87q5V7h0WMLtKjHEvLYZlzmu6Qo0vPGl74Io7Fh1++lEkntmFcDgAVyEPlTHh0jQE5Dy88SSYRAJidBDZ0+1IdfWg77UWaJZAGMY3el/5SpOR6cSfp81xHuPbm+/4pHYBrZAFxxu3T1v1L829J9qwe/ltmFAogdcvQuI4sGSTcnlolLkkZaXc54PJs5CrqyBVlCPVE0NofiUuXXUDMh1742b+5ILw7Hs6TRpxPhgsP/pwTVxWBEfyGXvs/tB765ClRBrU+Aqx2VOv3fJMTuWxZ/VaBOIsmHovDJmUitY6VQ3dAo8QFQpL63tpInazDnBEfJGyVBL2InlkAKdDb6Dh+s+Fc51mc/zQjxaJJRNg6Or/mFyKAqIWch8CMe39BPGC5YjI/cEpy+7d4aheIrz+938H/lAEvimTIFBJBUjFBCqpIYcDXgIQ0ijCqoJWCkDOwSNMQJzEF4744wj4EdndRVw5jAnz/7ZRalN+YbLxO3lX9fBWYPw4wn1oLBkYHmr2LKpnNb0SmLN6yu5Na5HfcRhV9Q3gDGsTxSHN8dSuGVRpuj1AShwLg0adWsqQn5LqskrHyi6tFf0CfOX16HjhEAbb3kNw2o2rVc21WSMBYVnHcFYY5oJz5SgGKbumkE/3omzy4ubq5Q8s3f+vW3D233ei4tJZ4BwmVFqj8JQtsk6XE6edIvJ0WkpwIEHv3QTGY70nYA5LxeizSDSGzPGDkP9AHPvmVsQHTqJyzurva3J+jaYOT8j2Rs00xgMIYw+PstSHcM2Mx+tXPHz7n3Y8jvbtz2HKpFlwelhoohNeWsealuyw8FFJmfRepGOT+keBQGkE0O8Q4AoGwQ3GkfnDH5H8414k2k7TqjTMDga7121GJtuPirlf/ZmSy37R0CQafYzigdj8oD9Z6oW/vP6hqSuf+EbbWy+h5eGnUV+/AAgIdqRZiq7p8cDNE5l5HlX0u7UmAXO5wYgusG4XuNIw4qEgOdwJY8/byPRH6DsBdVYQiE8V1V7I7+bw29XrIBsyKmd9ZYehqn9D6nFBV0e0scpnonB5w9+bvvqp+zvefhPvbPwxGuZdD3dtiJx3Yyjgo/2HC1UUbd3nhUYyK/v86C4vRaW3BLX0mdvpRDSTwcDRFsROtCJC62UiukhBEqyIU7RyJM3hujKk3x7Cy6tWQRFYlE2/7XX6epFp5IsDohekykDF5Kdm3frTre2vvYnfNd0NZ6eKdNdxpOMJuCwh8PqoXPxQS0MI+P3UR3y2lZLzVtM0U0Po7u1F5lQ7mKEkXJSdJGWiQlFxSUFFikouR7zhKYsCTQpl9dXI7ZHx4i1fQiqZd/iql+4iV28tckTJBHXdnA43aX5PO3JJikxQRrblmE3iPJVNmMoiRo7FaL3lXIScSpH8luQVCLks2giMSmtmmiS/dPwWnVdDiuYnHvVRGSapcZZQ2KsUBUMEquA04fWVouetY+g5+AJmffEBdy52bA39+1+PGQjLe070te1dxry0+cWFax69yRQd2LPmh6jjJ5DyOJChvuGhnWCOHPKSwvRRKbYTqAApzSICEiUnBTKRJDnLGjhLjpKfKCMgGpWV1XNEOs+6YCFTnylQeak0UA6mO/HZn34Vs27ZhGRL8290LbGiqIywFEFB9CMe7b85/u6rbzbeec81SiqKIxv+E9ViA4ERbNkVyAkvNTovnVNX0NDipCzRDFggYDELJEW8lYJwKTVCy/k0gRuyZrVz7Vag7Ej0vZzWkYp1Y8EjX8bCb/4I0qHmnYrcuYLjfcVxpJAeRF6K2J1Zks0blP6+/Uvv24xZm1bi7NkuFBTqH9bIQnS1ekaWtWZYHfPkAjVBSyyASoo+iTBkZtjpXurubgJjZSVPYGQ6J+4UIOd0DA1GMHPzCiz61lakDj63L5c4eAPLuz+4UDH2jFTPuxmqIoN3h+ELlWtyIX09zrz3ztUPbJmWG0ig62e74a+dCJ4aSMRykCIfoQyEyUkfHfdYskqEjlHJWL64zeFyilNGrLXWTJalY2eOSD8Qw5R1i7Fk/WZI7+5qlROHr+Nd5Zq9tzeLnH4Lg4ft8cTQC7QLHG5OSvr4JH+w4QBbMafslZWrEH+xBRMbalCgyDpJeZxU7/0EagYBKKUdpGw3RiBK/LBmWpHKqIMIb3FDo2zmyQXpTBQTbp2O5dt/AqX31EBmYFejw13ebcmyPawSktKrflBkaaUiUDJJAmMNjTw4IdCV6NrZxKXO4pqfPwXH3ACiZ2JgKLIqlUofgaiguSpIWZGpWZ6hCThJDluOD1K2hmhdlbVPocw4SRRy3VGEl9XhMz/cBi0aNQhEk2CBsP03RrRFuXBnd3j+0gTrlTq1ENgf/dOzq0u8Hlz3yydRKCMORbMwCEgNSbA17rUS4Q+4ndAJzBBJstX4XOR4LwFLW7yitcl+CeLUUix+ZAMYS367XloluIMHTZMd1R7rgkC0+PGP2DGosaMwUn1gdNYi4C8T+595rHLGZ7F4+0akaUbi0wqN+Yx9xc0qoaBKESdyWFJrOW99ZsU45eDQnTcg8Qpmf+8L8JVVIXn8xYecJb5m61IXwxg2pz5qRZHdAvDxy0MMQ/HmaBx0eKHIkQ3p95+fN/OW+5ZFDx1E96OvI9RQRxMwqRWVl9fUbY5Yu8Q8eWM1vjIqqyxJmjQYw7wH70Bl41xE9z27M1AR2GiS5pmmPuoLwheefvmSj5kXJue0ZyOrhjlHENnIwbv0yOHk0i0/geeqiUj1x6mx8UhQORUoO9bGirflmcEAqRhLr5meAdTetAiX3bkSejQx4AkId5mMeO4yLfe/WpFjPHN+o+wwnNgZP/7cWofDjSsf3QbFTXKdyNnXRETdJLUa5kSMysk6KxnPgK0vxYKNX4cSj0GJ7btH8ISpXjl7s/WJVhQQK83nNZV+gwitZZ4fOvKL5prGFbjsvpWIRc6AMVgolBHJGjsoC7T3QpaUTEqnbBDhS66AdPr1/3AHQr8xdPPc/zM+2YrLiD4Co9JxhCEn3v+W2rcvMv/bW1C6pB79/TFEXSI8JLMhIj1DpTbUO4iJKxZj8k3XIf7em50ut7Ge5f3nnDXPb0XJ7yfU618aazdNnvdHh9pe2OAQ3Fj44CaadNPgh2RwlA2Zyiobl8BWBjD/n76OQqIPaurwet5VKum6OtJbq8VcjR/pkyLKi9Z9w1+l33/pjbqrb8cld90Iqa8Xado1pogjckzCjDU3IDzzcmqCh18RXM6XNVWFoSkjsiI5MjpjSdlyA/u+i0wfGjf+AOzUIBE6DZwZQKhxMmbfuw6ZrnYVev/9JuMcdsEi+UisOCDmqMzuMaZ6JNHy3GOeyksw+x/XIhXtRZam5ys2fI3G/hByfXu2sazZOvzzo7xvP3ayG6M03dqMoZA68VChZ+/Z2Xf/A9xTaxBaOA31N9+GxNHdpxkz8jBHzZSl7s0y5ojt4t5DtE8i4nOueKrztX8uL5/5xFVbv02DJklwPEokP7BVdIZkw5bT8bs9zY+sIY4BC2XFKESflE688bWGa5vm6FoeUvvv9/Js/hnDdI31onsRpfXxyW3ExoIj4ueHDjxYkNLIJ1PQci3bLDFg7AEHo7biMjLm7Jv2YMno2Rey0Xc6TUORWVZ/1WT4cc/Gp1paH6acK4GeOf4dOtA5zmd3nPHkxoi3uv9XHv8twADL0WxgrmE0fAAAAABJRU5ErkJggg==">
                        </image>
                    </defs>
                </svg>

            </div>
        </div>
        <!-- WEB END -->

        <!-- MOBILE START -->

        <!-- MOBILE END -->

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

        <!-- TIMER START -->
        <!-- <div class="virtual-casino-time-box">
            <div class="casino-timer">
                <Timer v-if="time.total != 0" :totalTime="time.total" :currentTime="time.current" />
            </div>
        </div> -->
        <!-- TIMER END -->


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
    import Timer from "@/components/casino/BaseTimer"
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
            Timer,
            VirtualTimerProgress,
            // LastResultIcon,
            // Card,
            Loader,
            InactivityModal,
            CasinoResult,
            AccountStatementSoda,
        },
        computed: {
            main() {
                var player = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'vdt20'
                })
                return this.orderBy(player, 'sr')
            },
        },
        data() {
            return {
                cardPath: IMG_PATH + 'front/img/cards/',
                showCards: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'vdt20',
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
            getRectCenterCordinates(size, cordinate, padding=0) {
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
                            return "D"
                            break;
                        case "2":
                            return "T"
                            break;
                        case "3":
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
                        case "3":
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
                            // this.casinoData.rdesc = '1'
                            if (_.get(this.casinoData, 'mid') != this.mId) {
                                if (!this.firstCall) {
                                    this.$store.state.placebetInterval++
                                }
                                this.firstCall = false
                                this.getLastResults()
                                this.getUserBook(true, _.get(this.casinoData, 'mid'))
                                this.$store.commit('resetBetData')
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
            setBetData(nat, rate, mid, sid, subType, subId, bType, gType, gstatus, min, max) {
                // console.log(nat, rate, mid, sid, subType, subId, bType, gType, gstatus)
                // console.log(min, max)
                if (rate && gstatus == 'OPEN') {
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
                    }
                    this.$store.commit('setCasinoBetData', betdata)
                    // console.log(this.$store.state.casinoBet)

                    // if (IS_MOBILE) {
                    // setTimeout(() => {
                    //     document.getElementById("placebetAmountMobile").focus();
                    // }, 500);
                    // this.$refs['placebet-modal'].show()
                    // }
                    // setTimeout(() => {
                    //     document.getElementById("placebetAmountWeb").focus();
                    // }, 500);
                }
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