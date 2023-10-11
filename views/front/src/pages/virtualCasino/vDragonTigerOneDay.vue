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
                <svg viewBox="0 0 2482 705" fill="none" xmlns="http://www.w3.org/2000/svg"
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
                                        <tspan :x="getRectRightCordinates(355, 642, 20)" :y="getRectCenterCordinates(123, 254)">{{ main[0].b }}</tspan>
                                    </text>
                                    <g id="dragon_suspended" v-if="main[0].gstatus != 'OPEN'">
                                        <g id="dragon_suspended_box">
                                            <rect x="640" y="251" width="359" height="127" rx="8" fill="black"
                                                fill-opacity="0.3"></rect>
                                            <rect x="640" y="251" width="359" height="127" rx="8" stroke="#F46A59"></rect>
                                        </g>
                                        <path id="dragon_lock"
                                            d="M845.821 309.688H842.232V298.859C842.232 286.257 832.033 276 819.5 276C806.967 276 796.768 286.257 796.768 298.859V309.688H793.179C789.215 309.688 786 312.921 786 316.906V345.781C786 349.767 789.215 353 793.179 353H845.821C849.785 353 853 349.767 853 345.781V316.906C853 312.921 849.785 309.688 845.821 309.688ZM830.268 309.688H808.732V298.859C808.732 292.889 813.563 288.031 819.5 288.031C825.437 288.031 830.268 292.889 830.268 298.859V309.688Z"
                                            fill="white"></path>
                                    </g>
                                    <text id="10000" fill="black" xml:space="preserve" style="white-space: pre"
                                        font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                        <tspan x="660.184" y="359.19" :class="{'suspended-book' : main[0].gstatus != 'OPEN'}" v-vcasinobook="{sid: main[0].sid}">0</tspan>
                                    </text>
                                </g>

                                <g id="pair" style="cursor: pointer;"
                                    @click="setBetData(fancy[0].nat, fancy[0].b, mId, fancy[0].sid, fancy[0].subtype, 0, 'back', gameType, fancy[0].gstatus, fancy[0].min, fancy[0].max)">
                                    <rect id="pair_box" x="1067" y="254" width="355" height="123" rx="6" fill="#0041A2"
                                        fill-opacity="0.1" stroke="#0041A2" stroke-width="4"></rect>
                                    <text id="PAIR" fill="black" xml:space="preserve" style="white-space: pre"
                                        font-family="Antonio" font-size="60" font-weight="bold" letter-spacing="0em">
                                        <tspan x="1085.46" y="320.469">PAIR</tspan>
                                    </text>
                                    <text id="1.99_2" fill="black" xml:space="preserve" style="white-space: pre"
                                        font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                        dominant-baseline="middle" text-anchor="end">
                                        <tspan :x="getRectRightCordinates(355, 1067, 20)" :y="getRectCenterCordinates(123, 254)">{{ fancy[0].b }}</tspan>
                                    </text>
                                    <g id="pair_suspended" v-if="fancy[0].gstatus != 'OPEN'">
                                        <g id="pair_suspended_box">
                                            <rect x="1065" y="251" width="359" height="127" rx="8" fill="black"
                                                fill-opacity="0.3"></rect>
                                            <rect x="1065" y="251" width="359" height="127" rx="8" stroke="#F46A59"></rect>
                                        </g>
                                        <path id="pair_lock"
                                            d="M1270.82 309.688H1267.23V298.859C1267.23 286.257 1257.03 276 1244.5 276C1231.97 276 1221.77 286.257 1221.77 298.859V309.688H1218.18C1214.22 309.688 1211 312.921 1211 316.906V345.781C1211 349.767 1214.22 353 1218.18 353H1270.82C1274.78 353 1278 349.767 1278 345.781V316.906C1278 312.921 1274.78 309.688 1270.82 309.688ZM1255.27 309.688H1233.73V298.859C1233.73 292.889 1238.56 288.031 1244.5 288.031C1250.44 288.031 1255.27 292.889 1255.27 298.859V309.688Z"
                                            fill="white"></path>
                                    </g>
                                    <text id="10000_2" fill="black" xml:space="preserve" style="white-space: pre"
                                        font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                        <tspan x="1085.18" y="359.19" :class="{'suspended-book' : fancy[0].gstatus != 'OPEN'}" v-vcasinofancybook="{sid: fancy[0].sid, subid: 0}">0</tspan>
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
                                        <tspan :x="getRectRightCordinates(355, 1485, 20)" :y="getRectCenterCordinates(123, 254)">{{ main[1].b }}</tspan>
                                    </text>
                                    <g id="tiger_suspended" v-if="main[1].gstatus != 'OPEN'">
                                        <g id="tiger_suspended_box">
                                            <rect x="1483" y="250" width="359" height="127" rx="8" fill="black"
                                                fill-opacity="0.3"></rect>
                                            <rect x="1483" y="250" width="359" height="127" rx="8" stroke="#F46A59"></rect>
                                        </g>
                                        <path id="tiger_lock"
                                            d="M1688.82 308.688H1685.23V297.859C1685.23 285.257 1675.03 275 1662.5 275C1649.97 275 1639.77 285.257 1639.77 297.859V308.688H1636.18C1632.22 308.688 1629 311.921 1629 315.906V344.781C1629 348.767 1632.22 352 1636.18 352H1688.82C1692.78 352 1696 348.767 1696 344.781V315.906C1696 311.921 1692.78 308.688 1688.82 308.688ZM1673.27 308.688H1651.73V297.859C1651.73 291.889 1656.56 287.031 1662.5 287.031C1668.44 287.031 1673.27 291.889 1673.27 297.859V308.688Z"
                                            fill="white"></path>
                                    </g>
                                    <text id="10000_3" fill="black" xml:space="preserve" style="white-space: pre"
                                        font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                        <tspan x="1503.18" y="358.19" :class="{'suspended-book' : main[1].gstatus != 'OPEN'}" v-vcasinobook="{sid: main[1].sid}">0</tspan>
                                    </text>
                                </g>
                            </g>
                            <!-- MAIN SECTIONS ODDS END -->

                            <!-- OTHER SECTIONS ODDS START -->
                            <g id="other_odds">
                                <g id="dragon_other">
                                    
                                    <g id="dragon_even" style="cursor: pointer;"
                                        @click="setBetData(fancy[1].nat, fancy[1].b, mId, fancy[1].sid, fancy[1].subtype, 0, 'back', gameType, fancy[1].gstatus, fancy[1].min, fancy[1].max)">
                                        <rect id="dragon_even_box" x="2" y="426" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="EVEN" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="60" font-weight="bold" letter-spacing="0em">
                                            <tspan x="21.2656" y="492.469">EVEN</tspan>
                                        </text>
                                        <text id="1.99_4" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 2, 20)" :y="getRectCenterCordinates(123, 426)">{{ fancy[1].b }}</tspan>
                                        </text>
                                        <g id="dragon_even_suspended" v-if="fancy[1].gstatus != 'OPEN'">
                                            <g id="dragon_even_suspended_box">
                                                <rect x="1" y="423" width="288" height="127" rx="8" fill="black" fill-opacity="0.3"/>
                                                <rect x="1" y="423" width="288" height="127" rx="8" stroke="#F46A59"/>
                                            </g>
                                            <path id="dragon_even_lock" d="M170.821 465.688H167.232V454.859C167.232 442.257 157.033 432 144.5 432C131.967 432 121.768 442.257 121.768 454.859V465.688H118.179C114.215 465.688 111 468.921 111 472.906V501.781C111 505.767 114.215 509 118.179 509H170.821C174.785 509 178 505.767 178 501.781V472.906C178 468.921 174.785 465.688 170.821 465.688ZM155.268 465.688H133.732V454.859C133.732 448.889 138.563 444.031 144.5 444.031C150.437 444.031 155.268 448.889 155.268 454.859V465.688Z" fill="white"/>
                                        </g>
                                        <text id="10000_4" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                            <tspan x="21.1836" y="531.19" :class="{'suspended-book' : fancy[1].gstatus != 'OPEN'}" v-vcasinofancybook="{sid: fancy[1].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>

                                    <g id="dragon_odd" style="cursor: pointer;"
                                        @click="setBetData(fancy[2].nat, fancy[2].b, mId, fancy[2].sid, fancy[2].subtype, 0, 'back', gameType, fancy[2].gstatus, fancy[2].min, fancy[2].max)">
                                        <rect id="dragon_odd_box" x="311" y="426" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="ODD" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="60" font-weight="bold" letter-spacing="0em">
                                            <tspan x="330.32" y="492.469">ODD</tspan>
                                        </text>
                                        <text id="1.99_5" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 311, 20)" :y="getRectCenterCordinates(123, 426)">{{ fancy[2].b }}</tspan>
                                        </text>
                                        <g id="dragon_odd_suspended" v-if="fancy[2].gstatus != 'OPEN'">
                                            <g id="dragon_odd_suspended_box">
                                                <rect x="310" y="423" width="288" height="127" rx="8" fill="black" fill-opacity="0.3"/>
                                                <rect x="310" y="423" width="288" height="127" rx="8" stroke="#F46A59"/>
                                            </g>
                                            <path id="dragon_odd_lock" d="M479.821 465.688H476.232V454.859C476.232 442.257 466.033 432 453.5 432C440.967 432 430.768 442.257 430.768 454.859V465.688H427.179C423.215 465.688 420 468.921 420 472.906V501.781C420 505.767 423.215 509 427.179 509H479.821C483.785 509 487 505.767 487 501.781V472.906C487 468.921 483.785 465.688 479.821 465.688ZM464.268 465.688H442.732V454.859C442.732 448.889 447.563 444.031 453.5 444.031C459.437 444.031 464.268 448.889 464.268 454.859V465.688Z" fill="white"/>
                                        </g>
                                        <text id="10000_5" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                            <tspan x="330.184" y="531.19" :class="{'suspended-book' : fancy[2].gstatus != 'OPEN'}" v-vcasinofancybook="{sid: fancy[2].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>

                                    <g id="dragon_black" style="cursor: pointer;"
                                        @click="setBetData(fancy[4].nat, fancy[4].b, mId, fancy[4].sid, fancy[4].subtype, 0, 'back', gameType, fancy[4].gstatus, fancy[4].min, fancy[4].max)">
                                        <rect id="dragon_black_box" x="620" y="426" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="1.99_6" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 620, 20)" :y="getRectCenterCordinates(123, 426)">{{ fancy[4].b }}</tspan>
                                        </text>
                                        <rect id="spade" x="636" y="436" width="60" height="60" fill="url(#pattern2)">
                                        </rect>
                                        <rect id="club" x="686" y="436" width="60" height="60" fill="url(#pattern3)"></rect>
                                        <g id="dragon_black_suspended" v-if="fancy[4].gstatus != 'OPEN'">
                                            <g id="dragon_black_suspended_box">
                                                <rect x="619" y="423" width="288" height="127" rx="8" fill="black" fill-opacity="0.3"/>
                                                <rect x="619" y="423" width="288" height="127" rx="8" stroke="#F46A59"/>
                                            </g>
                                            <path id="dragon_black_lock" d="M788.821 465.688H785.232V454.859C785.232 442.257 775.033 432 762.5 432C749.967 432 739.768 442.257 739.768 454.859V465.688H736.179C732.215 465.688 729 468.921 729 472.906V501.781C729 505.767 732.215 509 736.179 509H788.821C792.785 509 796 505.767 796 501.781V472.906C796 468.921 792.785 465.688 788.821 465.688ZM773.268 465.688H751.732V454.859C751.732 448.889 756.563 444.031 762.5 444.031C768.437 444.031 773.268 448.889 773.268 454.859V465.688Z" fill="white"/>
                                        </g>
                                        <text id="10000_6" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                            <tspan x="639.184" y="531.19" :class="{'suspended-book' : fancy[4].gstatus != 'OPEN'}" v-vcasinofancybook="{sid: fancy[4].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>

                                    <g id="dragon_red" style="cursor: pointer;"
                                        @click="setBetData(fancy[3].nat, fancy[3].b, mId, fancy[3].sid, fancy[3].subtype, 0, 'back', gameType, fancy[3].gstatus, fancy[3].min, fancy[3].max)">
                                        <rect id="dragon_red_box" x="929" y="426" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="1.99_7" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 929, 20)" :y="getRectCenterCordinates(123, 426)">{{ fancy[3].b }}</tspan>
                                        </text>
                                        <rect id="heart" x="948" y="436" width="60" height="60" fill="url(#pattern4)">
                                        </rect>
                                        <rect id="diamond" x="1003" y="436" width="60" height="60" fill="url(#pattern5)">
                                        </rect>
                                        <g id="dragon_red_suspended" v-if="fancy[3].gstatus != 'OPEN'">
                                            <g id="dragon_red_suspended_box">
                                                <rect x="928" y="423" width="288" height="127" rx="8" fill="black" fill-opacity="0.3"/>
                                                <rect x="928" y="423" width="288" height="127" rx="8" stroke="#F46A59"/>
                                            </g>
                                            <path id="dragon_red_lock" d="M1097.82 465.688H1094.23V454.859C1094.23 442.257 1084.03 432 1071.5 432C1058.97 432 1048.77 442.257 1048.77 454.859V465.688H1045.18C1041.22 465.688 1038 468.921 1038 472.906V501.781C1038 505.767 1041.22 509 1045.18 509H1097.82C1101.78 509 1105 505.767 1105 501.781V472.906C1105 468.921 1101.78 465.688 1097.82 465.688ZM1082.27 465.688H1060.73V454.859C1060.73 448.889 1065.56 444.031 1071.5 444.031C1077.44 444.031 1082.27 448.889 1082.27 454.859V465.688Z" fill="white"/>
                                        </g>
                                        <text id="10000_7" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                            <tspan x="948.184" y="531.19" :class="{'suspended-book' : fancy[3].gstatus != 'OPEN'}" v-vcasinofancybook="{sid: fancy[3].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>

                                    <g id="dragon_spade" style="cursor: pointer;"
                                        @click="setBetData(fancy[5].nat, fancy[5].b, mId, fancy[5].sid, fancy[5].subtype, 0, 'back', gameType, fancy[5].gstatus, fancy[5].min, fancy[5].max)">
                                        <rect id="dragon_spade_box" x="2" y="574" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="1.99_8" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 2, 20)" :y="getRectCenterCordinates(123, 574)">{{ fancy[5].b }}</tspan>
                                        </text>
                                        <rect id="spade_2" x="18" y="584" width="60" height="60" fill="url(#pattern6)">
                                        </rect>
                                        <g id="dragon_spade_suspended" v-if="fancy[5].gstatus != 'OPEN'">
                                            <g id="dragon_spade_suspended_box">
                                                                <rect x="1" y="571" width="288" height="127" rx="8" fill="black" fill-opacity="0.3"/>
                                                                <rect x="1" y="571" width="288" height="127" rx="8" stroke="#F46A59"/>
                                                            </g>
                                                            <path id="dragon_spade_lock" d="M170.821 613.688H167.232V602.859C167.232 590.257 157.033 580 144.5 580C131.967 580 121.768 590.257 121.768 602.859V613.688H118.179C114.215 613.688 111 616.921 111 620.906V649.781C111 653.767 114.215 657 118.179 657H170.821C174.785 657 178 653.767 178 649.781V620.906C178 616.921 174.785 613.688 170.821 613.688ZM155.268 613.688H133.732V602.859C133.732 596.889 138.563 592.031 144.5 592.031C150.437 592.031 155.268 596.889 155.268 602.859V613.688Z" fill="white"/>
                                        </g>
                                        <text id="10000_8" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                            <tspan x="21.1836" y="679.19" :class="{'suspended-book' : fancy[5].gstatus != 'OPEN'}" v-vcasinofancybook="{sid: fancy[5].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>

                                    <g id="dragon_heart" style="cursor: pointer;"
                                        @click="setBetData(fancy[6].nat, fancy[6].b, mId, fancy[6].sid, fancy[6].subtype, 0, 'back', gameType, fancy[6].gstatus, fancy[6].min, fancy[6].max)">
                                        <rect id="dragon_heart_box" x="311" y="574" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="1.99_10" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 311, 20)" :y="getRectCenterCordinates(123, 574)">{{ fancy[6].b }}</tspan>
                                        </text>
                                        <rect id="heart_2" x="330" y="584" width="60" height="60" fill="url(#pattern8)">
                                        </rect>
                                        <g id="dragon_heart_suspended" v-if="fancy[6].gstatus != 'OPEN'">
                                            <g id="dragon_heart_suspended_box">
                                                                <rect x="310" y="572" width="288" height="127" rx="8" fill="black" fill-opacity="0.3"/>
                                                                <rect x="310" y="572" width="288" height="127" rx="8" stroke="#F46A59"/>
                                                            </g>
                                                            <path id="dragon_heart_lock" d="M479.821 614.688H476.232V603.859C476.232 591.257 466.033 581 453.5 581C440.967 581 430.768 591.257 430.768 603.859V614.688H427.179C423.215 614.688 420 617.921 420 621.906V650.781C420 654.767 423.215 658 427.179 658H479.821C483.785 658 487 654.767 487 650.781V621.906C487 617.921 483.785 614.688 479.821 614.688ZM464.268 614.688H442.732V603.859C442.732 597.889 447.563 593.031 453.5 593.031C459.437 593.031 464.268 597.889 464.268 603.859V614.688Z" fill="white"/>
                                        </g>
                                        <text id="10000_10" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                            <tspan x="330.184" y="679.19" :class="{'suspended-book' : fancy[6].gstatus != 'OPEN'}" v-vcasinofancybook="{sid: fancy[6].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>

                                    <g id="dragon_club" style="cursor: pointer;"
                                        @click="setBetData(fancy[8].nat, fancy[8].b, mId, fancy[8].sid, fancy[8].subtype, 0, 'back', gameType, fancy[8].gstatus, fancy[8].min, fancy[8].max)">
                                        <rect id="dragon_club_box" x="620" y="574" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="1.99_9" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 620, 20)" :y="getRectCenterCordinates(123, 574)">{{ fancy[8].b }}</tspan>
                                        </text>
                                        <rect id="club_2" x="636" y="584" width="60" height="60" fill="url(#pattern7)">
                                        </rect>
                                        <g id="dragon_club_suspended" v-if="fancy[8].gstatus != 'OPEN'">
                                            <g id="dragon_club_suspended_box">
                                                                <rect x="619" y="571" width="288" height="127" rx="8" fill="black" fill-opacity="0.3"/>
                                                                <rect x="619" y="571" width="288" height="127" rx="8" stroke="#F46A59"/>
                                                            </g>
                                                            <path id="dragon_club_lock" d="M788.821 613.688H785.232V602.859C785.232 590.257 775.033 580 762.5 580C749.967 580 739.768 590.257 739.768 602.859V613.688H736.179C732.215 613.688 729 616.921 729 620.906V649.781C729 653.767 732.215 657 736.179 657H788.821C792.785 657 796 653.767 796 649.781V620.906C796 616.921 792.785 613.688 788.821 613.688ZM773.268 613.688H751.732V602.859C751.732 596.889 756.563 592.031 762.5 592.031C768.437 592.031 773.268 596.889 773.268 602.859V613.688Z" fill="white"/>
                                        </g>
                                        <text id="10000_9" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                            <tspan x="639.184" y="679.19" :class="{'suspended-book' : fancy[8].gstatus != 'OPEN'}" v-vcasinofancybook="{sid: fancy[8].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>

                                    <g id="dragon_diamond" style="cursor: pointer;"
                                        @click="setBetData(fancy[7].nat, fancy[7].b, mId, fancy[7].sid, fancy[7].subtype, 0, 'back', gameType, fancy[7].gstatus, fancy[7].min, fancy[7].max)">
                                        <rect id="dragon_diamond_box" x="929" y="574" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="1.99_11" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 929, 20)" :y="getRectCenterCordinates(123, 574)">{{ fancy[7].b }}</tspan>
                                        </text>
                                        <rect id="diamond_2" x="936" y="584" width="60" height="60" fill="url(#pattern9)">
                                        </rect>
                                        <g id="dragon_diamond_suspended" v-if="fancy[7].gstatus != 'OPEN'">
                                            <g id="dragon_diamond_suspended_box">
                                                                <rect x="928" y="571" width="288" height="127" rx="8" fill="black" fill-opacity="0.3"/>
                                                                <rect x="928" y="571" width="288" height="127" rx="8" stroke="#F46A59"/>
                                                            </g>
                                                            <path id="dragon_diamond_lock" d="M1097.82 613.688H1094.23V602.859C1094.23 590.257 1084.03 580 1071.5 580C1058.97 580 1048.77 590.257 1048.77 602.859V613.688H1045.18C1041.22 613.688 1038 616.921 1038 620.906V649.781C1038 653.767 1041.22 657 1045.18 657H1097.82C1101.78 657 1105 653.767 1105 649.781V620.906C1105 616.921 1101.78 613.688 1097.82 613.688ZM1082.27 613.688H1060.73V602.859C1060.73 596.889 1065.56 592.031 1071.5 592.031C1077.44 592.031 1082.27 596.889 1082.27 602.859V613.688Z" fill="white"/>
                                        </g>
                                        <text id="10000_11" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                            <tspan x="948.184" y="679.19" :class="{'suspended-book' : fancy[7].gstatus != 'OPEN'}" v-vcasinofancybook="{sid: fancy[7].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                </g>

                                <g id="tiger_other">
                                    <g id="tiger_even" style="cursor: pointer;"
                                        @click="setBetData(fancy[9].nat, fancy[9].b, mId, fancy[9].sid, fancy[9].subtype, 0, 'back', gameType, fancy[9].gstatus, fancy[9].min, fancy[9].max)">
                                        <rect id="tiger_even_box" x="1268" y="427" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="EVEN_2" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="60" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1287.27" y="493.469">EVEN</tspan>
                                        </text>
                                        <text id="1.99_12" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 1268, 20)" :y="getRectCenterCordinates(123, 427)">{{ fancy[9].b }}</tspan>
                                        </text>
                                        <g id="tiger_even_suspended" v-if="fancy[9].gstatus != 'OPEN'">
                                            <g id="tiger_even_suspended_box">
                                                                <rect x="1267" y="424" width="288" height="127" rx="8" fill="black" fill-opacity="0.3"/>
                                                                <rect x="1267" y="424" width="288" height="127" rx="8" stroke="#F46A59"/>
                                                            </g>
                                                            <path id="tiger_even_lock" d="M1436.82 466.688H1433.23V455.859C1433.23 443.257 1423.03 433 1410.5 433C1397.97 433 1387.77 443.257 1387.77 455.859V466.688H1384.18C1380.22 466.688 1377 469.921 1377 473.906V502.781C1377 506.767 1380.22 510 1384.18 510H1436.82C1440.78 510 1444 506.767 1444 502.781V473.906C1444 469.921 1440.78 466.688 1436.82 466.688ZM1421.27 466.688H1399.73V455.859C1399.73 449.889 1404.56 445.031 1410.5 445.031C1416.44 445.031 1421.27 449.889 1421.27 455.859V466.688Z" fill="white"/>
                                        </g>
                                        <text id="10000_12" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1287.18" y="532.19" :class="{'suspended-book' : fancy[9].gstatus != 'OPEN'}" v-vcasinofancybook="{sid: fancy[9].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>

                                    <g id="tiger_odd" style="cursor: pointer;"
                                        @click="setBetData(fancy[10].nat, fancy[10].b, mId, fancy[10].sid, fancy[10].subtype, 0, 'back', gameType, fancy[10].gstatus, fancy[10].min, fancy[10].max)">
                                        <rect id="tiger_odd_box" x="1577" y="427" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="ODD_2" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="60" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1596.32" y="493.469">ODD</tspan>
                                        </text>
                                        <text id="1.99_13" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 1577, 20)" :y="getRectCenterCordinates(123, 427)">{{ fancy[10].b }}</tspan>
                                        </text>
                                        <g id="tiger_odd_suspended" v-if="fancy[10].gstatus != 'OPEN'">
                                            <g id="tiger_odd_suspended_box">
                                                                <rect x="1576" y="424" width="288" height="127" rx="8" fill="black" fill-opacity="0.3"/>
                                                                <rect x="1576" y="424" width="288" height="127" rx="8" stroke="#F46A59"/>
                                                            </g>
                                                            <path id="tiger_odd_lock" d="M1745.82 466.688H1742.23V455.859C1742.23 443.257 1732.03 433 1719.5 433C1706.97 433 1696.77 443.257 1696.77 455.859V466.688H1693.18C1689.22 466.688 1686 469.921 1686 473.906V502.781C1686 506.767 1689.22 510 1693.18 510H1745.82C1749.78 510 1753 506.767 1753 502.781V473.906C1753 469.921 1749.78 466.688 1745.82 466.688ZM1730.27 466.688H1708.73V455.859C1708.73 449.889 1713.56 445.031 1719.5 445.031C1725.44 445.031 1730.27 449.889 1730.27 455.859V466.688Z" fill="white"/>
                                        </g>
                                        <text id="10000_13" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1596.18" y="532.19" :class="{'suspended-book' : fancy[10].gstatus != 'OPEN'}" v-vcasinofancybook="{sid: fancy[10].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                    
                                    <g id="tiger_black" style="cursor: pointer;"
                                        @click="setBetData(fancy[12].nat, fancy[12].b, mId, fancy[12].sid, fancy[12].subtype, 0, 'back', gameType, fancy[12].gstatus, fancy[12].min, fancy[12].max)">
                                        <rect id="tiger_black_box" x="1886" y="427" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="1.99_14" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 1886, 20)" :y="getRectCenterCordinates(123, 427)">{{ fancy[12].b }}</tspan>
                                        </text>
                                        <rect id="spade_3" x="1902" y="437" width="60" height="60" fill="url(#pattern10)">
                                        </rect>
                                        <rect id="club_3" x="1952" y="437" width="60" height="60" fill="url(#pattern11)">
                                        </rect>
                                        <g id="tiger_black_suspended" v-if="fancy[12].gstatus != 'OPEN'">
                                            <g id="tiger_black_suspended_box">
                                                                <rect x="1885" y="424" width="288" height="127" rx="8" fill="black" fill-opacity="0.3"/>
                                                                <rect x="1885" y="424" width="288" height="127" rx="8" stroke="#F46A59"/>
                                                            </g>
                                                            <path id="tiger_black_lock" d="M2054.82 466.688H2051.23V455.859C2051.23 443.257 2041.03 433 2028.5 433C2015.97 433 2005.77 443.257 2005.77 455.859V466.688H2002.18C1998.22 466.688 1995 469.921 1995 473.906V502.781C1995 506.767 1998.22 510 2002.18 510H2054.82C2058.78 510 2062 506.767 2062 502.781V473.906C2062 469.921 2058.78 466.688 2054.82 466.688ZM2039.27 466.688H2017.73V455.859C2017.73 449.889 2022.56 445.031 2028.5 445.031C2034.44 445.031 2039.27 449.889 2039.27 455.859V466.688Z" fill="white"/>
                                        </g>
                                        <text id="10000_14" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1905.18" y="532.19" :class="{'suspended-book' : fancy[12].gstatus != 'OPEN'}" v-vcasinofancybook="{sid: fancy[12].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>

                                    <g id="tiger_red" style="cursor: pointer;"
                                        @click="setBetData(fancy[11].nat, fancy[11].b, mId, fancy[11].sid, fancy[11].subtype, 0, 'back', gameType, fancy[11].gstatus, fancy[11].min, fancy[11].max)">
                                        <rect id="tiger_red_box" x="2195" y="427" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="1.99_15" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 2195, 20)" :y="getRectCenterCordinates(123, 427)">{{ fancy[11].b }}</tspan>
                                        </text>
                                        <rect id="heart_3" x="2214" y="437" width="60" height="60" fill="url(#pattern12)">
                                        </rect>
                                        <rect id="diamond_3" x="2269" y="437" width="60" height="60" fill="url(#pattern13)">
                                        </rect>
                                        <g id="tiger_red_suspended" v-if="fancy[11].gstatus != 'OPEN'">
                                            <g id="tiger_red_suspended_box">
                                                                <rect x="2194" y="424" width="288" height="127" rx="8" fill="black" fill-opacity="0.3"/>
                                                                <rect x="2194" y="424" width="288" height="127" rx="8" stroke="#F46A59"/>
                                                            </g>
                                                            <path id="tiger_red_lock" d="M2363.82 466.688H2360.23V455.859C2360.23 443.257 2350.03 433 2337.5 433C2324.97 433 2314.77 443.257 2314.77 455.859V466.688H2311.18C2307.22 466.688 2304 469.921 2304 473.906V502.781C2304 506.767 2307.22 510 2311.18 510H2363.82C2367.78 510 2371 506.767 2371 502.781V473.906C2371 469.921 2367.78 466.688 2363.82 466.688ZM2348.27 466.688H2326.73V455.859C2326.73 449.889 2331.56 445.031 2337.5 445.031C2343.44 445.031 2348.27 449.889 2348.27 455.859V466.688Z" fill="white"/>
                                        </g>
                                        <text id="10000_15" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                            <tspan x="2214.18" y="532.19" :class="{'suspended-book' : fancy[11].gstatus != 'OPEN'}" v-vcasinofancybook="{sid: fancy[11].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>

                                    <g id="tiger_spade" style="cursor: pointer;"
                                        @click="setBetData(fancy[13].nat, fancy[13].b, mId, fancy[13].sid, fancy[13].subtype, 0, 'back', gameType, fancy[13].gstatus, fancy[13].min, fancy[13].max)">
                                        <rect id="tiger_spade_box" x="1268" y="574" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="1.99_16" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 1268, 20)" :y="getRectCenterCordinates(123, 574)">{{ fancy[13].b }}</tspan>
                                        </text>
                                        <rect id="spade_4" x="1284" y="584" width="60" height="60" fill="url(#pattern14)">
                                        </rect>
                                        <g id="tiger_spade_suspended" v-if="fancy[13].gstatus != 'OPEN'">
                                            <g id="tiger_spade_suspended_box">
                                                                <rect x="1267" y="571" width="288" height="127" rx="8" fill="black" fill-opacity="0.3"/>
                                                                <rect x="1267" y="571" width="288" height="127" rx="8" stroke="#F46A59"/>
                                                            </g>
                                                            <path id="tiger_spade_lock" d="M1436.82 613.688H1433.23V602.859C1433.23 590.257 1423.03 580 1410.5 580C1397.97 580 1387.77 590.257 1387.77 602.859V613.688H1384.18C1380.22 613.688 1377 616.921 1377 620.906V649.781C1377 653.767 1380.22 657 1384.18 657H1436.82C1440.78 657 1444 653.767 1444 649.781V620.906C1444 616.921 1440.78 613.688 1436.82 613.688ZM1421.27 613.688H1399.73V602.859C1399.73 596.889 1404.56 592.031 1410.5 592.031C1416.44 592.031 1421.27 596.889 1421.27 602.859V613.688Z" fill="white"/>
                                        </g>
                                        <text id="10000_16" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1287.18" y="679.19" :class="{'suspended-book' : fancy[13].gstatus != 'OPEN'}" v-vcasinofancybook="{sid: fancy[13].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>

                                    <g id="tiger_heart" style="cursor: pointer;"
                                        @click="setBetData(fancy[14].nat, fancy[14].b, mId, fancy[14].sid, fancy[14].subtype, 0, 'back', gameType, fancy[14].gstatus, fancy[14].min, fancy[14].max)">
                                        <rect id="tiger_heart_box" x="1577" y="575" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="1.99_18" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 1577, 20)" :y="getRectCenterCordinates(123, 575)">{{ fancy[14].b }}</tspan>
                                        </text>
                                        <rect id="heart_4" x="1596" y="585" width="60" height="60" fill="url(#pattern16)">
                                        </rect>
                                        <g id="tiger_heart_suspended" v-if="fancy[14].gstatus != 'OPEN'">
                                            <g id="tiger_heart_suspended_box">
                                                                <rect x="1576" y="572" width="288" height="127" rx="8" fill="black" fill-opacity="0.3"/>
                                                                <rect x="1576" y="572" width="288" height="127" rx="8" stroke="#F46A59"/>
                                                            </g>
                                                            <path id="tiger_heart_lock" d="M1745.82 614.688H1742.23V603.859C1742.23 591.257 1732.03 581 1719.5 581C1706.97 581 1696.77 591.257 1696.77 603.859V614.688H1693.18C1689.22 614.688 1686 617.921 1686 621.906V650.781C1686 654.767 1689.22 658 1693.18 658H1745.82C1749.78 658 1753 654.767 1753 650.781V621.906C1753 617.921 1749.78 614.688 1745.82 614.688ZM1730.27 614.688H1708.73V603.859C1708.73 597.889 1713.56 593.031 1719.5 593.031C1725.44 593.031 1730.27 597.889 1730.27 603.859V614.688Z" fill="white"/>
                                        </g>
                                        <text id="10000_18" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1596.18" y="680.19" :class="{'suspended-book' : fancy[14].gstatus != 'OPEN'}" v-vcasinofancybook="{sid: fancy[14].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>

                                    <g id="tiger_club" style="cursor: pointer;"
                                        @click="setBetData(fancy[16].nat, fancy[16].b, mId, fancy[16].sid, fancy[16].subtype, 0, 'back', gameType, fancy[16].gstatus, fancy[16].min, fancy[16].max)">
                                        <rect id="tiger_club_box" x="1886" y="574" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="1.99_17" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 1886, 20)" :y="getRectCenterCordinates(123, 574)">{{ fancy[16].b }}</tspan>
                                        </text>
                                        <rect id="club_4" x="1902" y="584" width="60" height="60" fill="url(#pattern15)">
                                        </rect>
                                        <g id="tiger_club_suspended" v-if="fancy[16].gstatus != 'OPEN'">
                                            <g id="tiger_club_suspended_box">
                                                <rect x="1885" y="571" width="288" height="127" rx="8" fill="black" fill-opacity="0.3"/>
                                                <rect x="1885" y="571" width="288" height="127" rx="8" stroke="#F46A59"/>
                                            </g>
                                            <path id="tiger_club_lock" d="M2054.82 613.688H2051.23V602.859C2051.23 590.257 2041.03 580 2028.5 580C2015.97 580 2005.77 590.257 2005.77 602.859V613.688H2002.18C1998.22 613.688 1995 616.921 1995 620.906V649.781C1995 653.767 1998.22 657 2002.18 657H2054.82C2058.78 657 2062 653.767 2062 649.781V620.906C2062 616.921 2058.78 613.688 2054.82 613.688ZM2039.27 613.688H2017.73V602.859C2017.73 596.889 2022.56 592.031 2028.5 592.031C2034.44 592.031 2039.27 596.889 2039.27 602.859V613.688Z" fill="white"/>
                                        </g>
                                        <text id="10000_17" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1905.18" y="679.19" :class="{'suspended-book' : fancy[16].gstatus != 'OPEN'}" v-vcasinofancybook="{sid: fancy[16].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>

                                    <g id="tiger_diamond" style="cursor: pointer;"
                                        @click="setBetData(fancy[15].nat, fancy[15].b, mId, fancy[15].sid, fancy[15].subtype, 0, 'back', gameType, fancy[15].gstatus, fancy[15].min, fancy[15].max)">
                                        <rect id="tiger_diamond_box" x="2195" y="574" width="285" height="123" rx="6"
                                            fill="black" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4"></rect>
                                        <text id="1.99_19" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                            dominant-baseline="middle" text-anchor="end">
                                            <tspan :x="getRectRightCordinates(285, 2195, 20)" :y="getRectCenterCordinates(123, 574)">{{ fancy[15].b }}</tspan>
                                        </text>
                                        <rect id="diamond_4" x="2202" y="584" width="60" height="60" fill="url(#pattern17)">
                                        </rect>
                                        <g id="tiger_diamond_suspended" v-if="fancy[15].gstatus != 'OPEN'">
                                            <g id="tiger_diamond_suspended_box">
                                                                <rect x="2193" y="571" width="288" height="127" rx="8" fill="black" fill-opacity="0.3"/>
                                                                <rect x="2193" y="571" width="288" height="127" rx="8" stroke="#F46A59"/>
                                                            </g>
                                                            <path id="tiger_diamond_lock" d="M2363.82 613.688H2360.23V602.859C2360.23 590.257 2350.03 580 2337.5 580C2324.97 580 2314.77 590.257 2314.77 602.859V613.688H2311.18C2307.22 613.688 2304 616.921 2304 620.906V649.781C2304 653.767 2307.22 657 2311.18 657H2363.82C2367.78 657 2371 653.767 2371 649.781V620.906C2371 616.921 2367.78 613.688 2363.82 613.688ZM2348.27 613.688H2326.73V602.859C2326.73 596.889 2331.56 592.031 2337.5 592.031C2343.44 592.031 2348.27 596.889 2348.27 602.859V613.688Z" fill="white"/>
                                        </g>
                                        <text id="10000_19" fill="black" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="34" font-weight="bold" letter-spacing="0em">
                                            <tspan x="2214.18" y="679.19" :class="{'suspended-book' : fancy[15].gstatus != 'OPEN'}" v-vcasinofancybook="{sid: fancy[15].sid, subid: 0}">0</tspan>
                                        </text>
                                    </g>
                                </g>
                            </g>
                            <rect id="divider" x="1236" y="390" width="10" height="315" fill="#6E4407"></rect>
                        </template>
                    </g>
                    <defs>
                        <!-- P-A-CARD-1 -->
                        <pattern id="p_pa_card1_img" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#card1" transform="scale(0.02 0.0142857)"></use>
                        </pattern>

                        <!-- P-B-CARD-1 -->
                        <pattern id="p_pb_card1_img" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#card2" transform="scale(0.02 0.0142857)"></use>
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
                            <use xlink:href="#image1" transform="scale(0.02)"></use>
                        </pattern>
                        <pattern id="pattern7" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image2" transform="scale(0.02)"></use>
                        </pattern>
                        <pattern id="pattern8" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image3" transform="scale(0.02)"></use>
                        </pattern>
                        <pattern id="pattern9" patternContentUnits="objectBoundingBox" width="1" height="1">
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
                        <pattern id="pattern14" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image1" transform="scale(0.02)"></use>
                        </pattern>
                        <pattern id="pattern15" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image2" transform="scale(0.02)"></use>
                        </pattern>
                        <pattern id="pattern16" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image3" transform="scale(0.02)"></use>
                        </pattern>
                        <pattern id="pattern17" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image4" transform="scale(0.02)"></use>
                        </pattern>


                        <!-- CARD 1 -->
                        <image id="card1" data-name="2CC.png" width="50" height="70"
                            :href="`${cardPath}${cards[0]}.png`">
                        </image>
                        <!-- CARD 2 -->
                        <image id="card2" data-name="2CC.png" width="50" height="70"
                            :href="`${cardPath}${cards[1]}.png`">
                        </image>

                        <image id="image1" data-name="spade.png" width="50" height="50"
                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTEwNEIzQUI4MThCMTFFQkE4NkRERDk4NzBBOUNEQ0YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTEwNEIzQUM4MThCMTFFQkE4NkRERDk4NzBBOUNEQ0YiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MTA0QjNBOTgxOEIxMUVCQTg2REREOTg3MEE5Q0RDRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5MTA0QjNBQTgxOEIxMUVCQTg2REREOTg3MEE5Q0RDRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Prstm1gAAA36SURBVHja7FoJdFRl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">
                        </image>
                        <image id="image2" data-name="club.png" width="50" height="50"
                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTg1OTU1OUE4MThCMTFFQkEzQUFCQkEzMTY1QUFCOUMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTg1OTU1OUI4MThCMTFFQkEzQUFCQkEzMTY1QUFCOUMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5ODU5NTU5ODgxOEIxMUVCQTNBQUJCQTMxNjVBQUI5QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5ODU5NTU5OTgxOEIxMUVCQTNBQUJCQTMxNjVBQUI5QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PojDhkIAAA6sSURBVHja7FoLkFTl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">
                        </image>
                        <image id="image3" data-name="heart.png" width="50" height="50"
                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUI4OUU5REM4MThCMTFFQjhCRUU4N0FBRTYxQUJBNDciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUI4OUU5REQ4MThCMTFFQjhCRUU4N0FBRTYxQUJBNDciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQjg5RTlEQTgxOEIxMUVCOEJFRTg3QUFFNjFBQkE0NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQjg5RTlEQjgxOEIxMUVCOEJFRTg3QUFFNjFBQkE0NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrOTuaEAAA6pSURBVHja7FlplBzVdf5qr95nevYZLaNBG1pARggwEuggjEFWgixvcRZ84mDsBExyMDY+DoTYjo7tJE6sBAIxJiKAEUuiI5bjQLBMLIRjJGNZi5FmRtIsGs1Mz9L73rXle92NYzuQpCX5T6I+5/br6nr16n53+e59VZLnefi/8JHOAzkP5DyQ80AwvXcrvy3IssOZMqDIkFQJsupBUhTYrg+KFgBUCgL8P8DzfkA2OD0Iu5SEVcjALufglPMoZSZglTKw8jOoFJJw7TyK8TEoRoj/J+DkUwi2zIUZigCVMtpW3Iieq+/kvXShjkqx30lXtRHUArLnVPhdDOp69wazaeEVmtk6x5V02bHKMatSesNxit+XFDMmScrbW44G8VwHVjHFA/uKUHvvWn/L3KWqboTsfDLlWJVj5dzEHkmSDs4eehLh+asR7nuvVr89zhKIDJc3h5MN+KIdnwv1bboZvjlzrEIR+WwWkqvBTyuaAQ1usZwuJtK7bLfwdfrtTXHtf4JQ6YkUjVH+ne5l6z/dtmjN5cLTpVIZmhyBZiqQNIdAFWRGD++eOfjEX2bH9r1MIJa4/CxDiwt7WSiStrZ1yaWPoH3pouE3+nHqlddRGRqDnK0gyJAzw374+jrRdMXFiK5aBa/i2OnY2L2WbX+VMcgwyyITO7RY19SHupZftt72ghj74TGkjp6EE88jRzC+SAhdC1oQWdiLtrWXgcGL+LHXtmuhnptlRSNmBW4lj6aVv9EgkNe+AodxrCF7XeuaDS/nrQD2/sW3kNlzGoZlossfQqskwaG3EhXmUqEAx7Shr5uP+Z/6MJp7VyI+cOzpYiHxUbuQvDgQlPcE5y+P9O8+gOR3XoeXlKAHowgZGkqKBKtswdRNGq0AqbmCzg9sQM9VGxH/wUMvZUf2b1Rl5qHmR/eHtjcGZGrPVro5M69z1YqBVDli7rr5Hiwc78acBV1wUYJeKqJo25h2PcaoB5EV/jKQnE4j1+ngoi/dhI4rN2DywA++FwwHVmmdfS37v7Ed9r44mju7EGw2wIyHxetNXu8wzDKSB18gzPQxYM0eR8tHLsa8Tbcgc/Dph/JD+z+lhbrQet2XG8sR186ipbPjEcfsMJ/95OfROXkBmpc3I5tKIkDrxQii4NiQbRF+Hgoim2QJc7sCyMZtDPzBA7C3uZj33k3XZqan8frWhxD6SRrzV/RimGGTIjM106NG/X7Cs00a/S/GNUvQ2fweHNnxd3CMHViwYfMny/GT35b10N63z+L/5qNJk2v1hfM37H/0OzAOa1h2YRsKiThmymXEKW65hDLFKZUQLZYwp1BCkQQwnSsw3j1UpCjG734CmbETOL7rZUh7RrCgtw0Vp4wWeqFEECXeJ+e6VN6FoioIEYguqJ1rlYrTaAr1Yub576OUPIXIko1fiKz+vcaTvXjoi0+r3T0fee62b2PRdAfUJiCRZ2IShEmPtNKifo5xhodYp4lL5cgtFSblHCqU8xlIFsldc4Noh4604kc8ZMBn+tCm67SixxAV82U4qgq/piJF7/oMAwXPhe6JkNUwc+wQ+m7biN51ayqVstGnt64cb8gjvta+tRPHbSiTpMyIiUyxCNey0MTEDlhlJMk0EsGEGV6SSHjPQUWEhVWBRC91FMpoNyUEx0kYuQqiEpW0HCicz+SDSo/4CcLkWGGYxjNZeqIIKZfj+jYqPh+SrFv+1m6Uh6fhKRE917/zssbriF4MZ6YGaDI/glSw7AglbbRVGN+lCnPIwkkmZ5AUP4fWK1EmqFRMeIWgsgSpM2cyfpNWRzWvFpBGJ2h1m6HkEYQIqQKvC1AkelH1+6seV+l5O55EeXYGZpydQUcZnmmwk4i0Ng5E1jyVqSiSOOMxqR0XRYIZo0XDBDSXoSR87KPSQxxND9VwoT/gUslpWl3ivIBdu07mvAgNEuA6WZ7r4DV5AsgQfDgYRIDnisPDiI2Msl0popsgxwp5nD4dx8I+tkY0hmSG5MaBOH7LbGpDULWRozISFQlwcZtKJSQXOU4JMWm7KFEqdIKeCBGEIxiPxxdxnOT8FJW2KQp/ZzgKz0UdekFxMctcafP7IE1OIXPkp5iYmgIZHGF/gPfVMDfAwqlnUO6IClPBLRULDQNx0+OnIx1mix7V0Zx2YFDRJK2eptWl+sUhHh8S9YPKmRSjajap2hglhcUpnQQqrhOZzZ9VUCK0cqEQQ4vX/PggggMDmKGnTCqui06B8ya4XsiTKGU09S2otUpObrhh+i2ki3ubutsR7GVHW7DISKy+ROCThOKoUuc4V4jweEo0xzzfLlhIqrWp1Z6Vv4Utxf9Zns8QjUGGUqPNmEyloe9+Bd6RI0jQM9ORMBLMKZfgprh+lnNnKy4qAQU9q5dz4ZlpKz99oGEg5XzyadkIoPOSJUg4KViyXk3QAJu/Ll4qqrFQThfJLvogRcVJnl9IK/qrPpPQxuMi68IkR0OVMScYQtg0caJ/AIWXvwuNyZxvbsIphlEnPTKfAIq8VCeJhLjCbJrtypIWdLxrNSoTQ3s91y40DMSyrNfcmXh/+9pL4bZa8DkGPHK9xMIFWrWTilZvxlAIsb2wBChadIZyksqMUHmXIGTO9ZFK/WQkH71w6McHMHnoMObxnBJm1+uiGpa1XQ0QJBixWbBpHF9yCt3vWw/ZPxe58Z/+s+waaBiIp7AdmRj8h8jiPmgXtWF4aAjBgB9WwIdZQZO6AYfKcrvFUGKrQSABAgrznx7SrM0kVjh/wtBRYAcwOjqKo8eOoieZwkrmxwSvF/SrEXQLasofl2obD9oGcqqMaLeOxR/9MNzMSMxKje8ibTUOROFOsJiPfxPJVHrZ724hYwxhsn8c41SqRNfPUsGKwW5V06GxBmiqaC807vgMLGbMNxOkaGUyInxOjyObZF3gvBC9k68ShYc8FZ8QxMBxTEKV8WY5smJAnYwh9FvXoGnxGmT6X7mPvFeG4jUOBFKRXjGzmeM/+Vp05aVov+VqpGlVN51BLJvhJqmAiCVIgLkiQpEKDAiFWHOGKyVEuOmyOS9LMCJXVAIPchTtTJn6iG65w6vtmCr1sGrhcRdDMxcrIDkPuPCOW+GmhjOF6YG/kWgkz7PPBAitq/pQyM/+tRc7Mb7qrtshrTBhTpKvNOaEqAssYikWSJsiWo+8GNmGFHjuIBVSGecLKDrDbhGVFADc+nZvRKpZn3aohpNQcUp4hRZx2ST23nMTQt1rMPPG81/wLDkvuNu1nMaBUA3uyrgzUwKV1Ml9twealmH1125DJjsKH2Mjq0rVDraLLOVxVETyVylawilKUNSQuqVF22IIhTmeEvRNaRb1h9Iq1YAlRG0iAWRPxtD66xfiklvuRfbYvx4szJ54QFJNOCzEruueCRA2GyxGCjOvYmV3lY6+8C+LN30CnZ/egOTIcYTpMbPOMIITJ6WaxQscu3ksuuFBjgek2pw4x7DoqsXuk+fCXm2OWa85Yd5HnczCY1910d9+hRPjmDr4zMc9GrPCvRF1qErjoaUYddEgGx1Ix49+zEsdy1657T7IqztQGJyAX1erYSEcPiNqD5UVNVgoKRQWHpDrYVOqP4pRq8URVYo+LX4LUIK6cxbG0lNYdv+diPauw/BLf/WlSj5z0GF9sYo57vvzVTkD+jV/JsxU5kVbPNH/7G8bShA3PP5N0k4OkxNpmKwrAoyv/swmV1c0I9VamFavdiLviadkTGavVu3fAic6gSwtUTk1htWf3YgLPvg5xF6974epsQNflBXxfIwgysWfyRmElv1zYlVDzPb0F7JHHv9G64XvwaWPfBmTiTFW3xIsnhPNXmu1G655IybiXqp5JVoHWqxTbaTeq9ERKIhW/8Q4mjZfjDV/vg2pY7tSYz96ZotqdDIvbDhsWH9eGg8teL8kLmQlgEJh4jOl0Se+O3/zHVi17VZMjQ9zW2qTyCRonJaph9nceqKLRE5Ltd2jACZ7tcQWyd4qqvvQNIKre3D1o/cjH3sT/S9s3axqTVNylW7/d4905f/59C+KRGUV7nmz8Te32NN7By//o21YducWZEeGELVqjWNJqrEV62m1uXTrjOR4tVUq9TZE7NFHR2cQ6A5g3Y6vsktwcOSpu26htV41AhGeF/Sv/xdpuI2X9dA7Bh2bt3x6/NVrov72w+u+/nALpuMYf/zfWYUXVZ8VB6m9AHSqHk6tdcPm6gRgEURxNA6P+6QVT97NNn0J9t1/058Vk4mHfWESSXa2+mTSw6/IIzWRqjdh1E8kR1+6FpVEae1j/4jA5mU4PXgSOe4rRaKLB7ZKHYS4qljvo2yCKI0loXA/v2HH59Fz+bXY/8AnHkydHrxX0yNkqALy2Thy6RjyZLFflnOQI78okiwsZhxKjuy+QXIU9/qdT6LlhgWYHThJGlarlDzHQ7UpFDUmxWPRyhv0hE6UK3b8IXqu+SAObv/sU7HBPbcawebqU36JbYyivH1YvVNoyWf9XoLtBzvSPemTe39N84J433NPoOv6+Uj1H8cs/ZFkTuXrBW8ema0wkkCBW82lj30cc6/bhCM77n5+cvB7v2kE2wiCXj7D9zVnDeQtMJ6qvZge3rdFJwFvfP4xdN64FAl6ZtYW7QhbfIKIjcxAaTZwyVO3off6D6D/mQefmz7xb5t1fxP3ONoZgzhnQGoLcSnd/2x67PCNshXGNc/8Pfo+tga5E6PIlxw4I7NQe6K4fOcfo+vdV2Fg58M742NvvF/3R6shirN8c3bOgNQfW0Iywi+kpoauk/K+yvqHt2H5ZzZgltSMvias/6e70Lp0OQae/dajmcTgh1QzVAsnnP3rPxXn+CN5FlR/++5sJrnOLKkvrfrTe6JGewhdV16FyAXvQv+LD26z7OIduhmuvpbDOXqHKeOcf0hPLjtmf9uPstnku0ux5Illv387/L2LcOq1F//EU7Q7VD14TrzwKwbyFpgKVLNlMJsbe38xVkgkRt7c7iqVrZoWFC8iz7+ePg/kPJDzQP6fA/kPAQYA+TgSUceyTrgAAAAASUVORK5CYII=">
                        </image>
                        <image id="image4" data-name="diamond.png" width="50" height="50"
                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUZGOEM4OEY4MThCMTFFQkIzOUVGNThFMjNBREZDQjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUZGOEM4OTA4MThCMTFFQkIzOUVGNThFMjNBREZDQjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5RkY4Qzg4RDgxOEIxMUVCQjM5RUY1OEUyM0FERkNCOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5RkY4Qzg4RTgxOEIxMUVCQjM5RUY1OEUyM0FERkNCOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvU5fn4AAA3NSURBVHja3FkJcBTn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">
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
                    'subtype': 'vdt6'
                })
                return this.orderBy(player, 'sr')
            },
            fancy() {
                var pair = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'vdt6fancy'
                })
                return this.orderBy(pair, 'sr')
            }
        },
        data() {
            return {
                cardPath: IMG_PATH + 'front/img/cards/',
                showCards: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'vdt6',
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
            getRectCenterCordinates(size, cordinate) {
                return cordinate + (size / 2)
            },
            getRectRightCordinates(size, cordinate, padding){
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