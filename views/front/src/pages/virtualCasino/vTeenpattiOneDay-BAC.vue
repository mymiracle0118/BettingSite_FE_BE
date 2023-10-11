<template>
    <div class="virtual-casino-container">
        <VirtualTimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current"
            :width="getSvgWidth()" />
        <template v-if="time.total > 3 && (time.current <= 3 && time.current > 0)">
            <transition name="component-fade" mode="out-in">
                <div :key="time.current" class="casino-time-digit">{{ time.current }}</div>
            </transition>
        </template>
        <!-- WEB START -->
        <template v-if="!$store.getters.isMobile">
            <div class="w-100 vteen">
                <!-- WEB BG START -->
                <div class="virtual-casino-bg d-none-mobile">
                    <svg id="id_main_bg" viewBox="0 0 2560 1440" fill="none" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="main_bg">
                            <rect id="main-bg" width="2560" height="1440" fill="url(#mainBg)"></rect>
                            <rect id="table-bg" width="2560" height="1440" fill="url(#tableBg)"></rect>
                            <rect id="girl-img" width="2560" height="1440" fill="url(#girlImg)"></rect>

                            <!-- CASINO NAME & ROUND ID START -->
                            <g id="casino_name">
                                <rect id="casino_name_box" x="17.5" y="11.5" width="467" height="96" rx="22.5"
                                    fill="#2C153C" fill-opacity="0.5" stroke="#573673" stroke-width="3"></rect>
                                <text id="TEENPATTI 1-DAY" fill="white" style="text-transform: uppercase;" xml:space="preserve" font-family="droidsans"
                                    font-size="40" letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(467, 17.5)" :y="getRectCenterCordinates(96, 11.5)">
                                        {{ gameTitle }}</tspan>
                                </text>
                                <text id="1234567890" fill="#FDCF13" xml:space="preserve" font-family="droidsans"
                                    font-size="26" letter-spacing="0em" dominant-baseline="text-before-edge"
                                    text-anchor="middle">
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
                                        font-family="droidsans-bold" font-size="50" font-weight="bold" letter-spacing="0em"
                                        dominant-baseline="middle" text-anchor="middle">
                                        <!-- <tspan x="55" y="180">{{ $store.getters.betCasinoSodaTotal }}</tspan> -->
                                        <tspan x="56" y="178">{{ $store.getters.betCasinoSodaTotal }}</tspan>
                                    </text>
                                </g>
                                <text id="MY BETS" fill="white" xml:space="preserve" style="white-space: pre"
                                    font-family="droidsans" font-size="44" letter-spacing="0em">
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
                                            font-family="droidsans-bold" font-size="50" font-weight="bold" letter-spacing="0em">
                                            <tspan x="2155.74" y="152.397">{{ getResultLable(0) }}</tspan>
                                        </text>
                                    </g>

                                    <g id="last_result_2" style="cursor: pointer;" @click="showResult(1)">
                                        <rect id="last_result2-box" x="2213.5" y="103.5" width="59" height="59" rx="3.5"
                                            stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                        <text id="B" :fill="getResultColor(1)" xml:space="preserve" style="white-space: pre"
                                            font-family="droidsans-bold" font-size="50" font-weight="bold" letter-spacing="0em">
                                            <tspan x="2226.2" y="152.397">{{ getResultLable(1) }}</tspan>
                                        </text>
                                    </g>

                                    <g id="last_result_3" style="cursor: pointer;" @click="showResult(2)">
                                        <rect id="last_result3-box" x="2283.5" y="103.5" width="59" height="59" rx="3.5"
                                            stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                        <text id="A_2" :fill="getResultColor(2)" xml:space="preserve"
                                            style="white-space: pre" font-family="droidsans-bold" font-size="50"
                                            font-weight="bold" letter-spacing="0em">
                                            <tspan x="2295.74" y="152.397">{{ getResultLable(2) }}</tspan>
                                        </text>
                                    </g>

                                    <g id="last_result_4" style="cursor: pointer;" @click="showResult(3)">
                                        <rect id="last_result4-box" x="2353.5" y="103.5" width="59" height="59" rx="3.5"
                                            stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                        <text id="B_2" :fill="getResultColor(3)" xml:space="preserve"
                                            style="white-space: pre" font-family="droidsans-bold" font-size="50"
                                            font-weight="bold" letter-spacing="0em">
                                            <tspan x="2366.2" y="152.397">{{ getResultLable(3) }}</tspan>
                                        </text>
                                    </g>

                                    <g id="last_result_5" style="cursor: pointer;" @click="showResult(4)">
                                        <rect id="last_result5-box" x="2423.5" y="103.5" width="59" height="59" rx="3.5"
                                            stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                        <text id="A_3" :fill="getResultColor(4)" xml:space="preserve"
                                            style="white-space: pre" font-family="droidsans-bold" font-size="50"
                                            font-weight="bold" letter-spacing="0em">
                                            <tspan x="2435.74" y="152.397">{{ getResultLable(4) }}</tspan>
                                        </text>
                                    </g>

                                    <g id="last_result_6" style="cursor: pointer;" @click="showResult(5)">
                                        <rect id="last_result6-box" x="2143.5" y="171.5" width="59" height="59" rx="3.5"
                                            stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                        <text id="B_3" :fill="getResultColor(5)" xml:space="preserve"
                                            style="white-space: pre" font-family="droidsans-bold" font-size="50"
                                            font-weight="bold" letter-spacing="0em">
                                            <tspan x="2156.2" y="220.397">{{ getResultLable(5) }}</tspan>
                                        </text>
                                    </g>

                                    <g id="last_result_7" style="cursor: pointer;" @click="showResult(6)">
                                        <rect id="last_result7-box" x="2213.5" y="171.5" width="59" height="59" rx="3.5"
                                            stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                        <text id="A_4" :fill="getResultColor(6)" xml:space="preserve"
                                            style="white-space: pre" font-family="droidsans-bold" font-size="50"
                                            font-weight="bold" letter-spacing="0em">
                                            <tspan x="2225.74" y="220.397">{{ getResultLable(6) }}</tspan>
                                        </text>
                                    </g>

                                    <g id="last_result_8" style="cursor: pointer;" @click="showResult(7)">
                                        <rect id="last_result8-box" x="2283.5" y="171.5" width="59" height="59" rx="3.5"
                                            stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                        <text id="B_4" :fill="getResultColor(7)" xml:space="preserve"
                                            style="white-space: pre" font-family="droidsans-bold" font-size="50"
                                            font-weight="bold" letter-spacing="0em">
                                            <tspan x="2296.2" y="220.397">{{ getResultLable(7) }}</tspan>
                                        </text>
                                    </g>

                                    <g id="last_result_9" style="cursor: pointer;" @click="showResult(8)">
                                        <rect id="last_result9-box" x="2353.5" y="171.5" width="59" height="59" rx="3.5"
                                            stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                        <text id="A_5" :fill="getResultColor(8)" xml:space="preserve"
                                            style="white-space: pre" font-family="droidsans-bold" font-size="50"
                                            font-weight="bold" letter-spacing="0em">
                                            <tspan x="2365.74" y="220.397">{{ getResultLable(8) }}</tspan>
                                        </text>
                                    </g>

                                    <g id="last_result_10" style="cursor: pointer;" @click="showResult(9)">
                                        <rect id="last_result10-box" x="2423.5" y="171.5" width="59" height="59" rx="3.5"
                                            stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                        <text id="B_5" :fill="getResultColor(9)" xml:space="preserve"
                                            style="white-space: pre" font-family="droidsans-bold" font-size="50"
                                            font-weight="bold" letter-spacing="0em">
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

                            <!-- OTHER SOUND ON ICON START -->
                            <template v-if="sound.otherSound">
                                <g id="sound_icon_box" style="cursor: pointer;" @click="muteOtherSound()">
                                    <rect id="sound_icon_bg" x="2259" y="11" width="58" height="58" rx="29"
                                        fill="url(#otherSoundOn)" stroke="#FDC834" stroke-width="2"></rect>
                                    <path id="sound_icon"
                                        d="M2286.47 24.5688L2279.24 31.7497H2270.95C2269.87 31.7497 2269 32.6168 2269 33.6873V45.3124C2269 46.382 2269.87 47.2499 2270.95 47.2499H2279.24L2286.47 54.4308C2287.69 55.6442 2289.8 54.7917 2289.8 53.0608V25.9388C2289.8 24.2063 2287.69 23.3571 2286.47 24.5688ZM2308 39.4998C2308 34.371 2305.4 29.6556 2301.03 26.8866C2300.12 26.3102 2298.92 26.5782 2298.34 27.4888C2297.76 28.3994 2298.03 29.6047 2298.94 30.182C2302.17 32.2317 2304.1 35.7144 2304.1 39.4998C2304.1 43.2852 2302.17 46.7679 2298.94 48.8177C2298.03 49.3941 2297.76 50.5994 2298.34 51.5108C2298.87 52.3472 2300.06 52.7331 2301.03 52.1131C2305.4 49.344 2308 44.6286 2308 39.4998ZM2296.48 33.2941C2295.54 32.7831 2294.35 33.1197 2293.83 34.057C2293.31 34.9943 2293.66 36.1721 2294.6 36.6896C2295.65 37.262 2296.3 38.3397 2296.3 39.4998C2296.3 40.6607 2295.65 41.7376 2294.6 42.31C2293.66 42.8275 2293.31 44.0054 2293.83 44.9426C2294.35 45.8839 2295.54 46.2182 2296.48 45.7055C2298.78 44.4502 2300.2 42.0727 2300.2 39.499C2300.2 36.9253 2298.78 34.5486 2296.48 33.2941Z"
                                        fill="white"></path>
                                </g>
                            </template>
                            <!-- OTHER SOUND ON ICON END -->
                            <!-- OTHER SOUND OFF ICON START -->
                            <template v-else>
                                <g id="sound_off_icon_box" style="cursor: pointer;" @click="muteOtherSound()">
                                    <rect id="sound_off_icon_bg" x="2259" y="11" width="58" height="58" rx="29"
                                        fill="url(#otherSoundOff)" stroke="#FDC834" stroke-width="2"></rect>
                                    <path id="sound_off_icon"
                                        d="M2284.64 24.5688L2277.34 31.7497H2268.97C2267.88 31.7497 2267 32.6168 2267 33.6873V45.3124C2267 46.382 2267.88 47.2499 2268.97 47.2499H2277.34L2284.64 54.4308C2285.87 55.6442 2288 54.7917 2288 53.0608V25.9388C2288 24.2063 2285.87 23.3571 2284.64 24.5688ZM2304.87 39.4998L2308.61 35.8153C2309.13 35.3067 2309.13 34.4816 2308.61 33.973L2306.74 32.1308C2306.22 31.6222 2305.39 31.6222 2304.87 32.1308L2301.12 35.8153L2297.38 32.1308C2296.86 31.6222 2296.03 31.6222 2295.51 32.1308L2293.64 33.973C2293.12 34.4816 2293.12 35.3067 2293.64 35.8153L2297.38 39.4998L2293.64 43.1835C2293.12 43.6921 2293.12 44.5172 2293.64 45.0258L2295.51 46.868C2296.03 47.3766 2296.86 47.3766 2297.38 46.868L2301.12 43.1843L2304.87 46.8688C2305.39 47.3774 2306.22 47.3774 2306.74 46.8688L2308.61 45.0266C2309.13 44.518 2309.13 43.6929 2308.61 43.1843L2304.87 39.4998Z"
                                        fill="white"></path>
                                </g>
                            </template>
                            <!-- OTHER SOUND OFF ICON END -->

                            <!-- MUSIC ON ICON START -->
                            <template v-if="sound.bgMusic">
                                <g id="music_icon_box" style="cursor: pointer;" @click="muteBackgroundSound()">
                                    <rect id="music_icon_bg" x="2333" y="11" width="58" height="58" rx="29"
                                        fill="url(#bgMusicOn)" stroke="#FDC834" stroke-width="2"></rect>
                                    <path id="music_icon"
                                        d="M2375.48 24.0896L2356.11 29.811C2355.71 29.9346 2355.37 30.1803 2355.13 30.5126C2354.88 30.8448 2354.75 31.2462 2354.75 31.6584V47.4869C2354.12 47.3329 2353.47 47.2532 2352.81 47.2496C2349.6 47.2496 2347 48.9849 2347 51.1248C2347 53.2646 2349.6 55 2352.81 55C2356.02 55 2358.62 53.2646 2358.62 51.1248V36.9754L2374.12 32.4341V43.6123C2373.49 43.4578 2372.84 43.3779 2372.19 43.3743C2368.98 43.3743 2366.38 45.1097 2366.38 47.2496C2366.38 49.3894 2368.98 51.1248 2372.19 51.1248C2375.4 51.1248 2378 49.39 2378 47.2496V25.9358C2378 25.6316 2377.93 25.3318 2377.79 25.0606C2377.65 24.7893 2377.45 24.5543 2377.21 24.3746C2376.96 24.1948 2376.68 24.0753 2376.38 24.0258C2376.08 23.9763 2375.77 23.9982 2375.48 24.0896V24.0896Z"
                                        fill="white"></path>
                                </g>
                            </template>
                            <!-- MUSIC ON ICON END -->
                            <!-- MUSIC OFF ICON START -->
                            <template v-else>
                                <g id="music_off_icon_box" style="cursor: pointer;" @click="muteBackgroundSound()">
                                    <rect id="music_off_icon_bg" x="2333" y="11" width="58" height="58" rx="29"
                                        fill="url(#bgMusicOff)" stroke="#FDC834" stroke-width="2"></rect>
                                    <path id="music_off_icon"
                                        d="M2354.7 47.4868C2354.06 47.3328 2353.41 47.2532 2352.75 47.2495C2349.52 47.2495 2346.9 48.9848 2346.9 51.1245C2346.9 53.2643 2349.52 54.9995 2352.75 54.9995C2355.98 54.9995 2358.6 53.2643 2358.6 51.1245V43.8515L2354.7 40.8569V47.4868ZM2381.62 51.736L2377.66 48.6917C2377.93 48.2455 2378.1 47.7623 2378.1 47.2495V25.9368C2378.1 25.6326 2378.03 25.3328 2377.89 25.0615C2377.75 24.7903 2377.55 24.5553 2377.3 24.3756C2377.06 24.1958 2376.77 24.0764 2376.47 24.0269C2376.17 23.9774 2375.86 23.9992 2375.56 24.0907L2356.07 29.8118C2355.76 29.9087 2355.48 30.0796 2355.26 30.3092C2355.04 30.5389 2354.87 30.8201 2354.79 31.1275L2345.77 24.2045C2345.67 24.1262 2345.55 24.0686 2345.43 24.0348C2345.31 24.001 2345.18 23.9917 2345.05 24.0075C2344.92 24.0233 2344.8 24.0639 2344.69 24.1268C2344.58 24.1898 2344.48 24.274 2344.4 24.3746L2343.21 25.9047C2343.05 26.1075 2342.98 26.3646 2343.01 26.6195C2343.04 26.8745 2343.17 27.1063 2343.38 27.264L2379.23 54.7955C2379.33 54.8738 2379.45 54.9314 2379.57 54.9652C2379.69 54.999 2379.82 55.0083 2379.95 54.9925C2380.08 54.9767 2380.2 54.9361 2380.31 54.8731C2380.42 54.8102 2380.52 54.726 2380.6 54.6254L2381.79 53.0953C2381.95 52.8925 2382.02 52.6354 2381.99 52.3805C2381.96 52.1255 2381.83 51.8937 2381.62 51.736V51.736ZM2374.2 43.6118C2373.56 43.4578 2372.91 43.3781 2372.25 43.3744C2371.8 43.3806 2371.35 43.4233 2370.9 43.5022L2361.36 36.1759L2374.2 32.4335V43.6118Z"
                                        fill="white"></path>
                                </g>
                            </template>
                            <!-- MUSIC OFF ICON END -->

                            <!-- HOME ICON START -->
                            <router-link :to="{name: 'owncasinolist'}">
                                <g id="home_icon_box" style="cursor: pointer;">
                                    <rect id="home_icon_bg" x="2407" y="11" width="58" height="58" rx="29"
                                        fill="url(#homeIcon)" stroke="#FDC834" stroke-width="2"></rect>
                                    <path id="home_icon"
                                        d="M2434.9 31.0799L2420.5 42.9445V55.7499C2420.5 56.0814 2420.63 56.3994 2420.87 56.6338C2421.1 56.8683 2421.42 57 2421.75 57L2430.5 56.9773C2430.83 56.9757 2431.15 56.8432 2431.38 56.609C2431.62 56.3747 2431.75 56.0577 2431.75 55.7272V48.249C2431.75 47.9175 2431.88 47.5995 2432.11 47.365C2432.35 47.1306 2432.67 46.9989 2433 46.9989H2438C2438.33 46.9989 2438.65 47.1306 2438.88 47.365C2439.12 47.5995 2439.25 47.9175 2439.25 48.249V55.7217C2439.25 55.8862 2439.28 56.0492 2439.34 56.2013C2439.4 56.3535 2439.5 56.4917 2439.61 56.6082C2439.73 56.7247 2439.87 56.8172 2440.02 56.8802C2440.17 56.9433 2440.33 56.9758 2440.5 56.9758L2449.25 57C2449.58 57 2449.9 56.8683 2450.13 56.6338C2450.37 56.3994 2450.5 56.0814 2450.5 55.7499V42.9359L2436.1 31.0799C2435.93 30.9434 2435.72 30.869 2435.5 30.869C2435.28 30.869 2435.07 30.9434 2434.9 31.0799ZM2457.65 39.1441L2451.12 33.7599V22.9376C2451.12 22.6889 2451.02 22.4505 2450.85 22.2746C2450.67 22.0988 2450.43 22 2450.19 22H2445.81C2445.56 22 2445.32 22.0988 2445.15 22.2746C2444.97 22.4505 2444.87 22.6889 2444.87 22.9376V28.6109L2437.88 22.8556C2437.21 22.3031 2436.37 22.0011 2435.5 22.0011C2434.63 22.0011 2433.79 22.3031 2433.11 22.8556L2413.34 39.1441C2413.25 39.2226 2413.17 39.319 2413.11 39.4278C2413.05 39.5367 2413.02 39.6558 2413 39.7784C2412.99 39.9011 2413.01 40.0248 2413.04 40.1425C2413.08 40.2602 2413.14 40.3697 2413.22 40.4646L2415.21 42.8867C2415.29 42.9819 2415.38 43.0608 2415.49 43.1187C2415.6 43.1767 2415.72 43.2126 2415.84 43.2244C2415.96 43.2363 2416.09 43.2238 2416.21 43.1877C2416.32 43.1516 2416.43 43.0926 2416.53 43.0141L2434.9 27.8764C2435.07 27.74 2435.28 27.6655 2435.5 27.6655C2435.72 27.6655 2435.93 27.74 2436.1 27.8764L2454.47 43.0141C2454.57 43.0926 2454.68 43.1517 2454.8 43.1879C2454.91 43.2241 2455.04 43.2368 2455.16 43.2251C2455.28 43.2135 2455.4 43.1779 2455.51 43.1202C2455.62 43.0625 2455.72 42.984 2455.79 42.889L2457.79 40.4669C2457.87 40.3715 2457.92 40.2615 2457.96 40.1432C2458 40.025 2458.01 39.9008 2458 39.7779C2457.98 39.655 2457.95 39.5357 2457.89 39.4269C2457.83 39.3182 2457.75 39.222 2457.65 39.1441Z"
                                        fill="white"></path>
                                </g>
                            </router-link>
                            <!-- HOME ICON END -->

                            <!-- RULES ICON START -->
                            <g id="rule_icon_box" @click="getCasinoRulesHtml()" style="cursor: pointer;">
                                <rect id="home_icon_bg_2" x="2481" y="11" width="58" height="58" rx="29"
                                    fill="url(#rulesIcon)" stroke="#FDC834" stroke-width="2"></rect>
                                <path id="rule_icon"
                                    d="M2504.56 53.1429H2506.12V41.8571H2504.56C2503.7 41.8571 2503 41.1576 2503 40.2946V36.5625C2503 35.6995 2503.7 35 2504.56 35H2513.31C2514.18 35 2514.88 35.6995 2514.88 36.5625V53.1429H2516.44C2517.3 53.1429 2518 53.8424 2518 54.7054V58.4375C2518 59.3005 2517.3 60 2516.44 60H2504.56C2503.7 60 2503 59.3005 2503 58.4375V54.7054C2503 53.8424 2503.7 53.1429 2504.56 53.1429ZM2510.5 20C2507.39 20 2504.88 22.5184 2504.88 25.625C2504.88 28.7316 2507.39 31.25 2510.5 31.25C2513.61 31.25 2516.12 28.7316 2516.12 25.625C2516.12 22.5184 2513.61 20 2510.5 20Z"
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

                            <pattern id="tableBg" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use xlink:href="#tableBgImg" transform="scale(0.000390625 0.000694444)"></use>
                            </pattern>

                            <pattern id="girlImg" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use xlink:href="#girlBgImg" transform="scale(0.000390625 0.000694444)"></use>
                            </pattern>

                            <pattern id="lastResultPlusIcon" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use xlink:href="#plusIcon" transform="translate(-0.00478122) scale(0.0050227)"></use>
                            </pattern>

                            <linearGradient id="otherSoundOn" x1="2288" y1="10" x2="2288" y2="70"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#F29603"></stop>
                                <stop offset="1" stop-color="#B4701B"></stop>
                            </linearGradient>
                            <linearGradient id="otherSoundOff" x1="2288" y1="10" x2="2288" y2="70"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#F29603"></stop>
                                <stop offset="1" stop-color="#B4701B"></stop>
                            </linearGradient>

                            <linearGradient id="bgMusicOn" x1="2362" y1="10" x2="2362" y2="70"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#F29603"></stop>
                                <stop offset="1" stop-color="#B4701B"></stop>
                            </linearGradient>
                            <linearGradient id="bgMusicOff" x1="2362" y1="10" x2="2362" y2="70"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#F29603"></stop>
                                <stop offset="1" stop-color="#B4701B"></stop>
                            </linearGradient>

                            <linearGradient id="homeIcon" x1="2436" y1="10" x2="2436" y2="70"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#F29603"></stop>
                                <stop offset="1" stop-color="#B4701B"></stop>
                            </linearGradient>
                            <linearGradient id="rulesIcon" x1="2510" y1="10" x2="2510" y2="70"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#F29603"></stop>
                                <stop offset="1" stop-color="#B4701B"></stop>
                            </linearGradient>

                            <image id="winnerTrophyLeftImg" data-name="winner.png" width="256" height="256"
                                :href="`${imgPath}front/img/svg_casino/icons/winner-left.png`">
                            </image>

                            <image id="winnerTrophyRightImg" data-name="winner.png" width="256" height="256"
                                :href="`${imgPath}front/img/svg_casino/icons/winner-right.png`">
                            </image>

                            <image id="mainBgImg" data-name="main-bg.jpg" width="2560" height="1440"
                                :href="`${boardPath}/bg.png`">
                            </image>

                            <image id="tableBgImg" data-name="table.png" y="276" width="2560" height="1440"
                                v-bind:href="`${boardPath}/table.png`"></image>

                            <image id="girlBgImg" data-name="dealer_0.png" x="640" y="10" width="1280" height="720"
                                v-bind:href="`${boardPath}/dealer_${dealer}.png`"></image>

                            <image id="plusIcon" data-name="more.png" width="201" height="203"
                                xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAADLCAYAAADEDrcOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDZGMTEwRkJGNUUzMTFFQjlFNkNBM0M5REZERDRDREIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDZGMTEwRkNGNUUzMTFFQjlFNkNBM0M5REZERDRDREIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNkYxMTBGOUY1RTMxMUVCOUU2Q0EzQzlERkRENENEQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNkYxMTBGQUY1RTMxMUVCOUU2Q0EzQzlERkRENENEQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvplFlQAAAZqSURBVHja7N1PiJR1GMDxd2MDKwmJPQSJrJEStYGIloF10Uw2DfLiGhiBkEhCBy8FQQiFdJCQCikIAg9WB42SSG+hkChF5BZioosIdRCRMBNamJ63nbF3Z2dmZ9zdmfed+XzgqTX/8ON9+/p735nZmb5SqZSQC/Nj5mV+fDPmusPSeX0iabv+mLUxT8a8VPVzg5mvxzJf34g5EHOiPIikKw3H7IgZqoqhFZVwTsW8F3PSYRVJN9gUs7fGTjFTY+UdZrvdRSRFNRBzeg7iqBXLuZhnHXKRFMn6mP1zHEety7A1MRccfpHk3csxb7UxkOpYtrhXEUmejcTs6VAg2VA2xow6HSLJm2UxhzscSDaUlTFXnBaR5MnFnASSDWWx0zJzdzgEs+LrnK5rn1NjJ8mDVTEHc7aLZHcTj3iJpON+iXkkx+s7lngOxeVWB62OuTvna1yaTLwUBjtJx+5FNhRgnV/EbHa6RNJu6Uvbz+T0XqTWvcmSmHGnzeVWO20oSCBJeZ3PO2V2knb7LubpAq33SDLxTDwiaZu8PXnYzCWXJxddbrXNgHXbSWgsfQLx+wKuO/2WYa8QtpO0xcPWLRIau9+6RUJjd1m3SGhsgXWLhMbmWbdIAJGASEAkIBIQCYgERAIiAZEAIgGRgEhAJCASEAmIBEQCiAREAiIBkYBIQCQgEhAJIBIQCYgERAIiAZGASEAkIBJAJCASEAmIBEQCIgGRgEgAkYBIQCQgEhAJiAREAiIBRDJD49bdO/pKpdJs/Vn9MYtilsY8FLMg5p6Ye8s/102BrIpZXsC1/xhzsgvPx58xf8Vcizkfcy7mQl4iGYrZELO9/ONBf++QA2OZrz+KORIz2u5IdsbsEgYFi2Z3zKdzHYk46LlYmo1kWcxhcdBlsaxp5t6lmUgqu4c46MZYXo35ZiaRfBgzLBC6PJS9MR/cTiSfxzwuEHoklE9i3m4lkteTiYd1BUIvhZLeVhxqJpL0ibKDAqFHQ3kq5vJ0kVwUCD0eyuLsf6h+7dZOxwiSkUY7iV0EqnaT7E6yybGBW4Zr7SRHY9Y5NvCfL2NeyEaSvnT6N5daMPWSq3K5tUogMMXqbCTPOR4wSbppPJONZMgxgSmWZ+9JPPQLde5LvBEETEMk0EQk/Q4D1NWf3pOkkfzjWEBNd1Yi8UQi1L5xX5JebnlXP6hv3I07NHHjnrrkUMAUN7KRnHU8YIpz2UiOOh4wxQ/pPyovSxmIOZ14hAsqxmK2xpzIftOV12/B5EgmfT9Jancy+S3roZf9VPnCG0FA7V3k1nsEV0eyJ5l4OxWh4FKrzk5iN0EgVZ9fUiuSkfKOIhR6fhepF0nKO8rTq4FsTKo+X7HRRy+47KLXAqn5OSWNIvEEI70UyKmYzbV+crpPuloYc1wodHkgx5L/P2a95UhS82POlL8WC90WSN1PuGolkor0Q+PXCYUuiSO1I+bb6X5xq5/j7qOq6YZAvop5rdnf0GokFetj3om5TywUaOdIX2aSPgd4uZXffLuRVDwY82LMNrsLOQ0j/a7bfUmNDwxtVyTVN/jpewqviHmgHND9MYu69CQMFvh/nG5ztRxDOr/H/Fyey7Pxh89mJL0kfRDjlQKu++OkwUOd1ObdUkAkIBIQCYgERAIiAZGASACRgEhAJCASEAmIBEQCIgFEAiIBkYBIQCQgEhAJiAQQCYgERAIiAZGASEAkIBIQCSASEAmIBEQCIgGRgEhAJIBIQCQgEhAJiAREAiIBkQAiAZGASDrjpnWLhMauWbdIaOxv6xYJjf1h3SKhsfMFXfdZp651faVSyVFo3cKY4zGDBVrzWMzKmCtOn0ja5WIBI1nstLncor5LDoFI2m13wda73ylzudVuAzGnC3LJlV5qPRZz3Wmzk7TTlQJdwowKRCSdsq/8t3Ted5F3nSqXW52U90e5fo151Gmyk3TSrhzvJum6tjlFdhK7Sf1A0nuRjU6PSPIgj490pZF48lAkubIpZm9OQhkr7yCjTotI8ubN8j3AYIcDSe+TDjkdIhFK7UDeiPnMaRBJ3o3E7GlzKGkgW2JOOvwiKYrKy+mTOY4ljeNqzBMx4w67SIq8q8x2LGPlf2+NOeEwi6QbDMfsiBmaQSyVME7FvC8OkXSr/pi1MSuSqc+GD9YIInUj5kA5CmGIpGfNj5mX+XH6HlleuZsD/wowAOLzssMWwDVoAAAAAElFTkSuQmCC">
                            </image>
                        </defs>
                        <!-- MAIN SVG DEFINATIONS END -->
                    </svg>
                </div>
                <!-- WEB BG END -->

                <!-- WEB ODDS START -->
                <div class="virtual-casino-odds d-none-mobile">
                    <div class="decks-block" :style="{'z-index': leftDecks.length > 20 ? 7 : 1}">
                        <!-- left card deck -->
                        <img class="left-card-deck" :src="`${boardPath}/cardDeckLeft.svg`" />

                        <!-- right card deck -->
                        <img class="right-card-box-back" :src="`${boardPath}/cardDeckRightBox.svg`" />
                        <img class="right-card-box-middle" :src="`${boardPath}/cardHolder.svg`" :style="{
                                right: (-6.7 - rightDecks.length * 0.095) + '%',
                                top: (30.5 - rightDecks.length * 0.215) + '%',
                                transform: `translate(${5 - (rightDecks.length * 5 / deckLength)}%, ${2 - (rightDecks.length * 2 / deckLength)}%)`
                                }" />

                        <div class="decks empty-card-in-deck-right " :class="{'finish-deck': finishedRightDeck}" :style="{
                                right: (-1.7 - rightDecks.length * 0.078) + '%',
                                top: (35 - rightDecks.length * 0.215) + '%',
                                transform: `perspective(900px) rotateX(23deg) rotateZ(-66deg) rotateY(-30deg) skewX(3deg) scale(1) translateY(${19 - (rightDecks.length * 19 / deckLength)}%)`
                                }">
                            <template v-for="i in rightDecks">
                                <div :key="i+'right'" class="card-item"
                                    :style="{'z-index': rightDecks.length - i, backgroundImage: `url(${cardPath}1.png)`, transform: `translate(-${(rightDecks.length - i) * 2.2}%, ${i * 0.48}%)`}">
                                </div>
                            </template>
                        </div>

                        <img class="right-card-box-front" :src="`${boardPath}/cardDeckWall.svg`" />
                    </div>

                    <div class="table-actions">
                        <div class="cards-showing-block">
                            <!-- PLAYER A CARDS START -->
                            <div class="flip-card"
                                :class="{show: cards[0] != 1, end: isGameFinished, 'disable-animation': disabledAnimation[0]}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[0]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flip-card"
                                :class="{show: cards[2] != 1, end: isGameFinished, 'disable-animation': disabledAnimation[2]}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[2]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flip-card"
                                :class="{show: cards[4] != 1, end: isGameFinished, 'disable-animation': disabledAnimation[4]}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[4]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- PLAYER A CARDS END -->

                            <!-- PLAYER B CARDS START -->
                            <div class="flip-card"
                                :class="{show: cards[5] != 1, end: isGameFinished, 'disable-animation': disabledAnimation[5]}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[5]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flip-card"
                                :class="{show: cards[3] != 1, end: isGameFinished, 'disable-animation': disabledAnimation[3]}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[3]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flip-card"
                                :class="{show: cards[1] != 1, end: isGameFinished, 'disable-animation': disabledAnimation[1]}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[1]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- PLAYER B CARDS END -->
                        </div>

                        <div class="cards-block">
                            <!-- PLAYER A CARDS START -->
                            <div class="flip-card " :class="{show: cards[0] != 1, end: isGameFinished}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[0]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flip-card" :class="{show: cards[2] != 1, end: isGameFinished}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[2]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flip-card" :class="{show: cards[4] != 1, end: isGameFinished}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[4]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- PLAYER A CARDS END -->

                            <!-- PLAYER B CARDS START -->
                            <div class="flip-card" :class="{show: cards[5] != 1, end: isGameFinished}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[5]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flip-card" :class="{show: cards[3] != 1, end: isGameFinished}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[3]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flip-card" :class="{show: cards[1] != 1, end: isGameFinished}">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="card-item"
                                            :style="{backgroundImage: `url(${cardPath}${cards[1]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- PLAYER B CARDS END -->
                        </div>

                        <!-- ODDS SVG START -->
                        <svg viewBox="0 0 1399 717" fill="none" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g id="odds">
                                <!-- PLAYER TITLE START -->
                                <g id="player_title">
                                    <text id="PLAYER A" fill="#EF0518" xml:space="preserve" style="white-space: pre"
                                        font-family="droidsans-bold" font-size="70" font-weight="bold" letter-spacing="0em">
                                        <tspan x="249.271" y="105">PLAYER A</tspan>
                                    </text>
                                    <text id="PLAYER B" fill="#00A200" xml:space="preserve" style="white-space: pre"
                                        font-family="droidsans-bold" font-size="70" font-weight="bold" letter-spacing="0em">
                                        <tspan x="854" y="105">PLAYER B</tspan>
                                    </text>
                                </g>
                                <!-- PLAYER TITLE END -->

                                <template v-if="casinoData && casinoData.mid">
                                    <!-- MAIN SECTIONS ODDS START -->
                                    <g id="main_odds">
                                        <g id="player_a">
                                            <g id="main_1">
                                                <g id="main_1_pa_back" style="cursor: pointer;"
                                                    @click="setBetData(main[0].nat + ' Main', main[0].b, mId, main[0].sid, main[0].subtype, 0, 'back', gameType, main[0].gstatus, main[0].min, main[0].max)">
                                                    <rect id="a_m_back" x="207" y="292" width="187" height="63" rx="6"
                                                        stroke="#4F9CD2" fill="#4F9CD2" fill-opacity="0.01"
                                                        stroke-width="4">
                                                    </rect>
                                                    <text id="1.99_19" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans-bold" font-size="40"
                                                        font-weight="bold" letter-spacing="0em" dominant-baseline="middle"
                                                        text-anchor="middle">
                                                        <!-- <tspan x="270.109" y="340.895">{{ main[0].b }}</tspan> -->
                                                        <tspan :x="getRectCenterCordinates(187, 207)"
                                                            :y="getRectCenterCordinates(63, 292)">{{ main[0].b }}</tspan>
                                                    </text>
                                                    <g id="a_m_back_sus_box" v-if="main[0].gstatus != 'OPEN'">
                                                        <rect id="a_m_b_sus" x="205" y="290" width="191" height="67" rx="8"
                                                            fill="black" fill-opacity="0.3"></rect>
                                                        <path id="a_m_b_lock"
                                                            d="M312.679 320.75H311.018V315.688C311.018 309.795 306.299 305 300.5 305C294.701 305 289.982 309.795 289.982 315.688V320.75H288.321C286.488 320.75 285 322.262 285 324.125V337.625C285 339.488 286.488 341 288.321 341H312.679C314.512 341 316 339.488 316 337.625V324.125C316 322.262 314.512 320.75 312.679 320.75ZM305.482 320.75H295.518V315.688C295.518 312.896 297.753 310.625 300.5 310.625C303.247 310.625 305.482 312.896 305.482 315.688V320.75Z"
                                                            fill="white"></path>
                                                    </g>
                                                </g>

                                                <g id="main_1_pa_lay" style="cursor: pointer;"
                                                    @click="setBetData(main[0].nat + ' Main', main[0].l, mId, main[0].sid, main[0].subtype, 0, 'lay', gameType, main[0].gstatus, main[0].min, main[0].max)">
                                                    <rect id="a_m_lay" x="420" y="292" width="187" height="63" rx="6"
                                                        stroke="#CD4E7E" fill="#CD4E7E" fill-opacity="0.01"
                                                        stroke-width="4">
                                                    </rect>
                                                    <text id="1.99_20" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans-bold" font-size="40"
                                                        font-weight="bold" letter-spacing="0em" dominant-baseline="middle"
                                                        text-anchor="middle">
                                                        <tspan :x="getRectCenterCordinates(187, 420)"
                                                            :y="getRectCenterCordinates(63, 292)">{{ main[0].l }}</tspan>
                                                    </text>
                                                    <g id="a_m_lay_sus_box" v-if="main[0].gstatus != 'OPEN'">
                                                        <rect id="a_m_l_sus" x="418" y="290" width="191" height="67" rx="8"
                                                            fill="black" fill-opacity="0.3"></rect>
                                                        <path id="a_m_l_lock"
                                                            d="M525.679 320.75H524.018V315.688C524.018 309.795 519.299 305 513.5 305C507.701 305 502.982 309.795 502.982 315.688V320.75H501.321C499.488 320.75 498 322.262 498 324.125V337.625C498 339.488 499.488 341 501.321 341H525.679C527.512 341 529 339.488 529 337.625V324.125C529 322.262 527.512 320.75 525.679 320.75ZM518.482 320.75H508.518V315.688C508.518 312.896 510.753 310.625 513.5 310.625C516.247 310.625 518.482 312.896 518.482 315.688V320.75Z"
                                                            fill="white"></path>
                                                    </g>
                                                </g>
                                                <text id="0_16" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans" font-size="30" letter-spacing="0em"
                                                    dominant-baseline="middle" text-anchor="middle">
                                                    <tspan x="405" y="389.138" v-vcasinobook="{sid: main[0].sid}">0
                                                    </tspan>
                                                </text>
                                            </g>

                                            <g id="consecutive_1">
                                                <g id="consecutive_1_pa_back" style="cursor: pointer;"
                                                    @click="setBetData(consicutive[0].nat + ' Consicutive', consicutive[0].b, mId, consicutive[0].sid, consicutive[0].subtype, 0, 'back', gameType, consicutive[0].gstatus, consicutive[0].min, consicutive[0].max)">
                                                    <rect id="a_c_back" x="207" y="414" width="187" height="63" rx="6"
                                                        stroke="#4F9CD2" fill="#4F9CD2" fill-opacity="0.01"
                                                        stroke-width="4">
                                                    </rect>
                                                    <text id="1.99_17" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans-bold" font-size="40"
                                                        font-weight="bold" letter-spacing="0em" dominant-baseline="middle"
                                                        text-anchor="middle">
                                                        <tspan :x="getRectCenterCordinates(187, 207)" :y="getRectCenterCordinates(63, 414)">{{ consicutive[0].b }}</tspan>
                                                    </text>
                                                    <g id="a_c_b_sus_box" v-if="consicutive[0].gstatus != 'OPEN'">
                                                        <rect id="a_c_b_sus" x="205" y="412" width="191" height="67" rx="8"
                                                            fill="black" fill-opacity="0.3"></rect>
                                                        <path id="a_c_b_lock"
                                                            d="M312.679 442.75H311.018V437.688C311.018 431.795 306.299 427 300.5 427C294.701 427 289.982 431.795 289.982 437.688V442.75H288.321C286.488 442.75 285 444.262 285 446.125V459.625C285 461.488 286.488 463 288.321 463H312.679C314.512 463 316 461.488 316 459.625V446.125C316 444.262 314.512 442.75 312.679 442.75ZM305.482 442.75H295.518V437.688C295.518 434.896 297.753 432.625 300.5 432.625C303.247 432.625 305.482 434.896 305.482 437.688V442.75Z"
                                                            fill="white"></path>
                                                    </g>
                                                </g>

                                                <g id="consecutive_1_pa_lay" style="cursor: pointer;"
                                                    @click="setBetData(consicutive[0].nat + ' Consicutive', consicutive[0].l, mId, consicutive[0].sid, consicutive[0].subtype, 0, 'lay', gameType, consicutive[0].gstatus, consicutive[0].min, consicutive[0].max)">
                                                    <rect id="a_c_lay" x="420" y="414" width="187" height="63" rx="6"
                                                        stroke="#CD4E7E" fill="#CD4E7E" fill-opacity="0.01"
                                                        stroke-width="4">
                                                    </rect>
                                                    <text id="1.99_18" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans-bold" font-size="40"
                                                        font-weight="bold" letter-spacing="0em" dominant-baseline="middle"
                                                        text-anchor="middle">
                                                        <tspan :x="getRectCenterCordinates(187, 420)" :y="getRectCenterCordinates(63, 414)">{{ consicutive[0].l }}</tspan>
                                                    </text>
                                                    <g id="a_c_l_sus_box" v-if="consicutive[0].gstatus != 'OPEN'">
                                                        <rect id="a_c_l_sus" x="418" y="412" width="191" height="67" rx="8"
                                                            fill="black" fill-opacity="0.3"></rect>
                                                        <path id="a_c_l_lock"
                                                            d="M525.679 442.75H524.018V437.688C524.018 431.795 519.299 427 513.5 427C507.701 427 502.982 431.795 502.982 437.688V442.75H501.321C499.488 442.75 498 444.262 498 446.125V459.625C498 461.488 499.488 463 501.321 463H525.679C527.512 463 529 461.488 529 459.625V446.125C529 444.262 527.512 442.75 525.679 442.75ZM518.482 442.75H508.518V437.688C508.518 434.896 510.753 432.625 513.5 432.625C516.247 432.625 518.482 434.896 518.482 437.688V442.75Z"
                                                            fill="white"></path>
                                                    </g>
                                                </g>
                                                <text id="0_15" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans" font-size="30" letter-spacing="0em"
                                                    dominant-baseline="middle" text-anchor="middle">
                                                    <tspan x="405" y="504.245"
                                                        v-vcasinofancybook="{sid: consicutive[0].sid, subid: 0}">0</tspan>
                                                </text>
                                            </g>
                                        </g>

                                        <g id="title">
                                            <text id="MAIN" fill="black" xml:space="preserve" style="white-space: pre"
                                                font-family="droidsans-bold" font-size="32" font-weight="bold"
                                                letter-spacing="0em">
                                                <tspan x="670" y="340.205">MAIN</tspan>
                                            </text>
                                            <text id="CONSECUTIVE" fill="black" xml:space="preserve"
                                                style="white-space: pre" font-family="droidsans-bold" font-size="28"
                                                font-weight="bold" letter-spacing="0em">
                                                <tspan x="618" y="461.205">CONSECUTIVE</tspan>
                                            </text>
                                        </g>

                                        <g id="player_b">
                                            <g id="main_2">
                                                <g id="main_2_pb_back" style="cursor: pointer;"
                                                    @click="setBetData(main[1].nat + ' Main', main[1].b, mId, main[1].sid, main[1].subtype, 0, 'back', gameType, main[1].gstatus, main[1].min, main[1].max)">
                                                    <rect id="b_m_back" x="817" y="292" width="187" height="63" rx="6"
                                                        stroke="#4F9CD2" fill="#4F9CD2" fill-opacity="0.01"
                                                        stroke-width="4">
                                                    </rect>
                                                    <text id="1.99_15" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans-bold" font-size="40"
                                                        font-weight="bold" letter-spacing="0em" dominant-baseline="middle"
                                                        text-anchor="middle">
                                                        <tspan :x="getRectCenterCordinates(187, 817)"
                                                            :y="getRectCenterCordinates(63, 292)">{{ main[1].b }}</tspan>
                                                    </text>
                                                    <g id="b_m_back_sus_box" v-if="main[1].gstatus != 'OPEN'">
                                                        <rect id="b_m_b_sus" x="815" y="290" width="191" height="67" rx="8"
                                                            fill="black" fill-opacity="0.3"></rect>
                                                        <path id="b_m_b_lock"
                                                            d="M922.679 320.75H921.018V315.688C921.018 309.795 916.299 305 910.5 305C904.701 305 899.982 309.795 899.982 315.688V320.75H898.321C896.488 320.75 895 322.262 895 324.125V337.625C895 339.488 896.488 341 898.321 341H922.679C924.512 341 926 339.488 926 337.625V324.125C926 322.262 924.512 320.75 922.679 320.75ZM915.482 320.75H905.518V315.688C905.518 312.896 907.753 310.625 910.5 310.625C913.247 310.625 915.482 312.896 915.482 315.688V320.75Z"
                                                            fill="white"></path>
                                                    </g>
                                                </g>

                                                <g id="main_2_pb_lay" style="cursor: pointer;"
                                                    @click="setBetData(main[1].nat + ' Main', main[1].l, mId, main[1].sid, main[1].subtype, 0, 'lay', gameType, main[1].gstatus, main[1].min, main[1].max)">
                                                    <rect id="b_m_lay" x="1030" y="292" width="187" height="63" rx="6"
                                                        stroke="#CD4E7E" fill="#CD4E7E" fill-opacity="0.01"
                                                        stroke-width="4">
                                                    </rect>
                                                    <text id="1.99_16" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans-bold" font-size="40"
                                                        font-weight="bold" letter-spacing="0em" dominant-baseline="middle"
                                                        text-anchor="middle">
                                                        <tspan :x="getRectCenterCordinates(187, 1030)"
                                                            :y="getRectCenterCordinates(63, 292)">{{ main[1].l }}</tspan>
                                                    </text>
                                                    <g id="b_m_lay_sus_box" v-if="main[1].gstatus != 'OPEN'">
                                                        <rect id="b_m_l_sus" x="1028" y="290" width="191" height="67" rx="8"
                                                            fill="black" fill-opacity="0.3"></rect>
                                                        <path id="b_m_l_lock"
                                                            d="M1135.68 320.75H1134.02V315.688C1134.02 309.795 1129.3 305 1123.5 305C1117.7 305 1112.98 309.795 1112.98 315.688V320.75H1111.32C1109.49 320.75 1108 322.262 1108 324.125V337.625C1108 339.488 1109.49 341 1111.32 341H1135.68C1137.51 341 1139 339.488 1139 337.625V324.125C1139 322.262 1137.51 320.75 1135.68 320.75ZM1128.48 320.75H1118.52V315.688C1118.52 312.896 1120.75 310.625 1123.5 310.625C1126.25 310.625 1128.48 312.896 1128.48 315.688V320.75Z"
                                                            fill="white"></path>
                                                    </g>
                                                </g>
                                                <text id="0_13" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans" font-size="30" letter-spacing="0em"
                                                    dominant-baseline="middle" text-anchor="middle">
                                                    <tspan x="1018" y="389.138" v-vcasinobook="{sid: main[1].sid}">0
                                                    </tspan>
                                                </text>
                                            </g>

                                            <g id="consecutive_2">
                                                <g id="consecutive_2_pb_back" style="cursor: pointer;"
                                                    @click="setBetData(consicutive[1].nat + ' Consicutive', consicutive[1].b, mId, consicutive[1].sid, consicutive[1].subtype, 0, 'back', gameType, consicutive[1].gstatus, consicutive[1].min, consicutive[1].max)">
                                                    <rect id="b_c_back" x="817" y="414" width="187" height="63" rx="6"
                                                        stroke="#4F9CD2" fill="#4F9CD2" fill-opacity="0.01"
                                                        stroke-width="4">
                                                    </rect>
                                                    <text id="1.99_13" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans-bold" font-size="40"
                                                        font-weight="bold" letter-spacing="0em" dominant-baseline="middle"
                                                        text-anchor="middle">
                                                        <tspan :x="getRectCenterCordinates(187, 817)" :y="getRectCenterCordinates(63, 414)">{{ consicutive[1].b }}</tspan>
                                                    </text>
                                                    <g id="b_c_b_sus_box" v-if="consicutive[1].gstatus != 'OPEN'">
                                                        <rect id="b_c_b_sus" x="815" y="412" width="191" height="67" rx="8"
                                                            fill="black" fill-opacity="0.3"></rect>
                                                        <path id="b_c_b_lock"
                                                            d="M922.679 442.75H921.018V437.688C921.018 431.795 916.299 427 910.5 427C904.701 427 899.982 431.795 899.982 437.688V442.75H898.321C896.488 442.75 895 444.262 895 446.125V459.625C895 461.488 896.488 463 898.321 463H922.679C924.512 463 926 461.488 926 459.625V446.125C926 444.262 924.512 442.75 922.679 442.75ZM915.482 442.75H905.518V437.688C905.518 434.896 907.753 432.625 910.5 432.625C913.247 432.625 915.482 434.896 915.482 437.688V442.75Z"
                                                            fill="white"></path>
                                                    </g>
                                                </g>

                                                <g id="consecutive_2_pb_lay" style="cursor: pointer;"
                                                    @click="setBetData(consicutive[1].nat + ' Consicutive', consicutive[1].l, mId, consicutive[1].sid, consicutive[1].subtype, 0, 'lay', gameType, consicutive[1].gstatus, consicutive[1].min, consicutive[1].max)">
                                                    <rect id="b_c_lay" x="1030" y="414" width="187" height="63" rx="6"
                                                        stroke="#CD4E7E" fill="#CD4E7E" fill-opacity="0.01"
                                                        stroke-width="4">
                                                    </rect>
                                                    <text id="1.99_14" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans-bold" font-size="40"
                                                        font-weight="bold" letter-spacing="0em" dominant-baseline="middle"
                                                        text-anchor="middle">
                                                        <tspan :x="getRectCenterCordinates(187, 1030)" :y="getRectCenterCordinates(63, 414)">{{ consicutive[1].l }}</tspan>
                                                    </text>
                                                    <g id="b_c_l_sus_box" v-if="consicutive[1].gstatus != 'OPEN'">
                                                        <rect id="b_c_l_sus" x="1028" y="412" width="191" height="67" rx="8"
                                                            fill="black" fill-opacity="0.3"></rect>
                                                        <path id="b_c_l_lock"
                                                            d="M1135.68 442.75H1134.02V437.688C1134.02 431.795 1129.3 427 1123.5 427C1117.7 427 1112.98 431.795 1112.98 437.688V442.75H1111.32C1109.49 442.75 1108 444.262 1108 446.125V459.625C1108 461.488 1109.49 463 1111.32 463H1135.68C1137.51 463 1139 461.488 1139 459.625V446.125C1139 444.262 1137.51 442.75 1135.68 442.75ZM1128.48 442.75H1118.52V437.688C1118.52 434.896 1120.75 432.625 1123.5 432.625C1126.25 432.625 1128.48 434.896 1128.48 437.688V442.75Z"
                                                            fill="white"></path>
                                                    </g>
                                                </g>
                                                <text id="0_14" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans" font-size="30" letter-spacing="0em"
                                                    dominant-baseline="middle" text-anchor="middle">
                                                    <tspan x="1018" y="504.245"
                                                        v-vcasinofancybook="{sid: consicutive[1].sid, subid: 0}">0</tspan>
                                                </text>
                                            </g>
                                        </g>
                                    </g>
                                    <!-- MAIN SECTIONS ODDS END -->

                                    <!-- ODD EVEN SECTIONS START -->
                                    <g id="odd_even">
                                        <g id="odd">
                                            <text id="ODD" fill="black" xml:space="preserve" style="white-space: pre"
                                                font-family="droidsans-bold" font-size="36" font-weight="bold"
                                                letter-spacing="0em">
                                                <tspan x="6.09875" y="595.205">ODD</tspan>
                                            </text>

                                            <g id="odd_card1" style="cursor: pointer;"
                                                @click="setBetData(oddEven[0].nat + ' ' + oddEven[0].odds[0].nat, oddEven[0].odds[0].b, mId, oddEven[0].sid, oddEven[0].subtype, oddEven[0].odds[0].sid, 'back', gameType, oddEven[0].gstatus, oddEven[0].min, oddEven[0].max)">
                                                <rect id="odd_card1_box" x="101" y="547" width="196" height="72" rx="6"
                                                    stroke="#376D93" fill="#376D93" fill-opacity="0.01" stroke-width="4">
                                                </rect>
                                                <text id="1.99" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans-bold" font-size="30" font-weight="bold"
                                                    letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 101)" :y="getRectCenterCordinates(72, 547)">{{ oddEven[0].odds[0].b }}</tspan>
                                                </text>
                                                <g id="odd_card1_sus_box" v-if="oddEven[0].gstatus != 'OPEN'">
                                                    <rect id="odd_card1_sus" x="99" y="545" width="200" height="76" rx="8"
                                                        fill="black" fill-opacity="0.3"></rect>
                                                    <path id="odd_card1_lock"
                                                        d="M209.893 566.875H208.339V562.094C208.339 556.529 203.925 552 198.5 552C193.075 552 188.661 556.529 188.661 562.094V566.875H187.107C185.392 566.875 184 568.303 184 570.062V582.812C184 584.572 185.392 586 187.107 586H209.893C211.608 586 213 584.572 213 582.812V570.062C213 568.303 211.608 566.875 209.893 566.875ZM203.161 566.875H193.839V562.094C193.839 559.457 195.93 557.312 198.5 557.312C201.07 557.312 203.161 559.457 203.161 562.094V566.875Z"
                                                        fill="white"></path>
                                                </g>
                                                <text id="0" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans" font-size="26" letter-spacing="0em"
                                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 101)"
                                                        :y="getRectCenterCordinates(72, 551)"
                                                        :class="{'suspended-book' : oddEven[0].gstatus != 'OPEN'}"
                                                        v-vcasinofancybook="{sid: oddEven[0].sid, subid: oddEven[0].odds[0].sid}">
                                                        0</tspan>
                                                </text>
                                            </g>

                                            <g id="odd_card2" style="cursor: pointer;"
                                                @click="setBetData(oddEven[1].nat + ' ' + oddEven[1].odds[0].nat, oddEven[1].odds[0].b, mId, oddEven[1].sid, oddEven[1].subtype, oddEven[1].odds[0].sid, 'back', gameType, oddEven[1].gstatus, oddEven[1].min, oddEven[1].max)">
                                                <rect id="odd_card2_box" x="321" y="547" width="196" height="72" rx="6"
                                                    stroke="#376D93" fill="#376D93" fill-opacity="0.01" stroke-width="4">
                                                </rect>
                                                <text id="1.99_2" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans-bold" font-size="30" font-weight="bold"
                                                    letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 321)" :y="getRectCenterCordinates(72, 547)">{{ oddEven[1].odds[0].b }}</tspan>
                                                </text>
                                                <g id="odd_card2_sus_box" v-if="oddEven[1].gstatus != 'OPEN'">
                                                    <rect id="odd_card2_sus" x="319" y="545" width="200" height="76" rx="8"
                                                        fill="black" fill-opacity="0.3"></rect>
                                                    <path id="odd_card2_lock"
                                                        d="M429.893 566.875H428.339V562.094C428.339 556.529 423.925 552 418.5 552C413.075 552 408.661 556.529 408.661 562.094V566.875H407.107C405.392 566.875 404 568.303 404 570.062V582.812C404 584.572 405.392 586 407.107 586H429.893C431.608 586 433 584.572 433 582.812V570.062C433 568.303 431.608 566.875 429.893 566.875ZM423.161 566.875H413.839V562.094C413.839 559.457 415.93 557.312 418.5 557.312C421.07 557.312 423.161 559.457 423.161 562.094V566.875Z"
                                                        fill="white"></path>
                                                </g>
                                                <text id="0_2" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans" font-size="26" letter-spacing="0em"
                                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 321)"
                                                        :y="getRectCenterCordinates(72, 551)"
                                                        :class="{'suspended-book' : oddEven[1].gstatus != 'OPEN'}"
                                                        v-vcasinofancybook="{sid: oddEven[1].sid, subid: oddEven[1].odds[0].sid}">
                                                        0</tspan>
                                                </text>
                                            </g>

                                            <g id="odd_card3" style="cursor: pointer;"
                                                @click="setBetData(oddEven[2].nat + ' ' + oddEven[2].odds[0].nat, oddEven[2].odds[0].b, mId, oddEven[2].sid, oddEven[2].subtype, oddEven[2].odds[0].sid, 'back', gameType, oddEven[2].gstatus, oddEven[2].min, oddEven[2].max)">
                                                <rect id="odd_card3_box" x="541" y="547" width="196" height="72" rx="6"
                                                    stroke="#376D93" fill="#376D93" fill-opacity="0.01" stroke-width="4">
                                                </rect>
                                                <text id="1.99_3" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans-bold" font-size="30" font-weight="bold"
                                                    letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 541)" :y="getRectCenterCordinates(72, 547)">{{ oddEven[2].odds[0].b }}</tspan>
                                                </text>
                                                <g id="odd_card3_sus_box" v-if="oddEven[2].gstatus != 'OPEN'">
                                                    <rect id="odd_card3_sus" x="539" y="545" width="200" height="76" rx="8"
                                                        fill="black" fill-opacity="0.3"></rect>
                                                    <path id="odd_card3_lock"
                                                        d="M649.893 566.875H648.339V562.094C648.339 556.529 643.925 552 638.5 552C633.075 552 628.661 556.529 628.661 562.094V566.875H627.107C625.392 566.875 624 568.303 624 570.062V582.812C624 584.572 625.392 586 627.107 586H649.893C651.608 586 653 584.572 653 582.812V570.062C653 568.303 651.608 566.875 649.893 566.875ZM643.161 566.875H633.839V562.094C633.839 559.457 635.93 557.312 638.5 557.312C641.07 557.312 643.161 559.457 643.161 562.094V566.875Z"
                                                        fill="white"></path>
                                                </g>
                                                <text id="0_3" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans" font-size="26" letter-spacing="0em"
                                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 541)"
                                                        :y="getRectCenterCordinates(72, 551)"
                                                        :class="{'suspended-book' : oddEven[2].gstatus != 'OPEN'}"
                                                        v-vcasinofancybook="{sid: oddEven[2].sid, subid: oddEven[2].odds[0].sid}">
                                                        0</tspan>
                                                </text>
                                            </g>

                                            <g id="odd_card4" style="cursor: pointer;"
                                                @click="setBetData(oddEven[3].nat + ' ' + oddEven[3].odds[0].nat, oddEven[3].odds[0].b, mId, oddEven[3].sid, oddEven[3].subtype, oddEven[3].odds[0].sid, 'back', gameType, oddEven[3].gstatus, oddEven[3].min, oddEven[3].max)">
                                                <rect id="odd_card4_box" x="761" y="547" width="196" height="72" rx="6"
                                                    stroke="#376D93" fill="#376D93" fill-opacity="0.01" stroke-width="4">
                                                </rect>
                                                <text id="1.99_4" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans-bold" font-size="30" font-weight="bold"
                                                    letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 761)" :y="getRectCenterCordinates(72, 547)">{{ oddEven[3].odds[0].b }}</tspan>
                                                </text>
                                                <g id="odd_card4_sus_box" v-if="oddEven[3].gstatus != 'OPEN'">
                                                    <rect id="odd_card4_sus" x="759" y="545" width="200" height="76" rx="8"
                                                        fill="black" fill-opacity="0.3"></rect>
                                                    <path id="odd_card4_lock"
                                                        d="M869.893 566.875H868.339V562.094C868.339 556.529 863.925 552 858.5 552C853.075 552 848.661 556.529 848.661 562.094V566.875H847.107C845.392 566.875 844 568.303 844 570.062V582.812C844 584.572 845.392 586 847.107 586H869.893C871.608 586 873 584.572 873 582.812V570.062C873 568.303 871.608 566.875 869.893 566.875ZM863.161 566.875H853.839V562.094C853.839 559.457 855.93 557.312 858.5 557.312C861.07 557.312 863.161 559.457 863.161 562.094V566.875Z"
                                                        fill="white"></path>
                                                </g>
                                                <text id="0_4" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans" font-size="26" letter-spacing="0em"
                                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 761)"
                                                        :y="getRectCenterCordinates(72, 551)"
                                                        :class="{'suspended-book' : oddEven[3].gstatus != 'OPEN'}"
                                                        v-vcasinofancybook="{sid: oddEven[3].sid, subid: oddEven[3].odds[0].sid}">
                                                        0</tspan>
                                                </text>
                                            </g>

                                            <g id="odd_card5" style="cursor: pointer;"
                                                @click="setBetData(oddEven[4].nat + ' ' + oddEven[4].odds[0].nat, oddEven[4].odds[0].b, mId, oddEven[4].sid, oddEven[4].subtype, oddEven[4].odds[0].sid, 'back', gameType, oddEven[4].gstatus, oddEven[4].min, oddEven[4].max)">
                                                <rect id="odd_card5_box" x="981" y="547" width="196" height="72" rx="6"
                                                    stroke="#376D93" fill="#376D93" fill-opacity="0.01" stroke-width="4">
                                                </rect>
                                                <text id="1.99_5" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans-bold" font-size="30" font-weight="bold"
                                                    letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 981)" :y="getRectCenterCordinates(72, 547)">{{ oddEven[4].odds[0].b }}</tspan>
                                                </text>
                                                <g id="odd_card5_sus_box" v-if="oddEven[4].gstatus != 'OPEN'">
                                                    <rect id="odd_card5_sus" x="979" y="545" width="200" height="76" rx="8"
                                                        fill="black" fill-opacity="0.3"></rect>
                                                    <path id="odd_card5_lock"
                                                        d="M1089.89 566.875H1088.34V562.094C1088.34 556.529 1083.92 552 1078.5 552C1073.08 552 1068.66 556.529 1068.66 562.094V566.875H1067.11C1065.39 566.875 1064 568.303 1064 570.062V582.812C1064 584.572 1065.39 586 1067.11 586H1089.89C1091.61 586 1093 584.572 1093 582.812V570.062C1093 568.303 1091.61 566.875 1089.89 566.875ZM1083.16 566.875H1073.84V562.094C1073.84 559.457 1075.93 557.312 1078.5 557.312C1081.07 557.312 1083.16 559.457 1083.16 562.094V566.875Z"
                                                        fill="white"></path>
                                                </g>
                                                <text id="0_5" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans" font-size="26" letter-spacing="0em"
                                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 981)"
                                                        :y="getRectCenterCordinates(72, 551)"
                                                        :class="{'suspended-book' : oddEven[4].gstatus != 'OPEN'}"
                                                        v-vcasinofancybook="{sid: oddEven[4].sid, subid: oddEven[4].odds[0].sid}">
                                                        0</tspan>
                                                </text>
                                            </g>

                                            <g id="odd_card6" style="cursor: pointer;"
                                                @click="setBetData(oddEven[5].nat + ' ' + oddEven[5].odds[0].nat, oddEven[5].odds[0].b, mId, oddEven[5].sid, oddEven[5].subtype, oddEven[5].odds[0].sid, 'back', gameType, oddEven[5].gstatus, oddEven[5].min, oddEven[5].max)">
                                                <rect id="odd_card6_box" x="1201" y="547" width="196" height="72" rx="6"
                                                    stroke="#376D93" fill="#376D93" fill-opacity="0.01" stroke-width="4">
                                                </rect>
                                                <text id="1.99_6" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans-bold" font-size="30" font-weight="bold"
                                                    letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 1201)" :y="getRectCenterCordinates(72, 547)">{{ oddEven[5].odds[0].b }}</tspan>
                                                </text>
                                                <g id="odd_card6_sus_box" v-if="oddEven[5].gstatus != 'OPEN'">
                                                    <rect id="odd_card6_sus" x="1199" y="545" width="200" height="76" rx="8"
                                                        fill="black" fill-opacity="0.3"></rect>
                                                    <path id="odd_card6_lock"
                                                        d="M1309.89 566.875H1308.34V562.094C1308.34 556.529 1303.92 552 1298.5 552C1293.08 552 1288.66 556.529 1288.66 562.094V566.875H1287.11C1285.39 566.875 1284 568.303 1284 570.062V582.812C1284 584.572 1285.39 586 1287.11 586H1309.89C1311.61 586 1313 584.572 1313 582.812V570.062C1313 568.303 1311.61 566.875 1309.89 566.875ZM1303.16 566.875H1293.84V562.094C1293.84 559.457 1295.93 557.312 1298.5 557.312C1301.07 557.312 1303.16 559.457 1303.16 562.094V566.875Z"
                                                        fill="white"></path>
                                                </g>
                                                <text id="0_6" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans" font-size="26" letter-spacing="0em"
                                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 1201)"
                                                        :y="getRectCenterCordinates(72, 551)"
                                                        :class="{'suspended-book' : oddEven[5].gstatus != 'OPEN'}"
                                                        v-vcasinofancybook="{sid: oddEven[5].sid, subid: oddEven[5].odds[0].sid}">
                                                        0</tspan>
                                                </text>
                                            </g>
                                        </g>

                                        <g id="even">
                                            <text id="EVEN" fill="black" xml:space="preserve" style="white-space: pre"
                                                font-family="droidsans-bold" font-size="36" font-weight="bold"
                                                letter-spacing="0em">
                                                <tspan x="0.33313" y="691.205">EVEN</tspan>
                                            </text>

                                            <g id="even_card1" style="cursor: pointer;"
                                                @click="setBetData(oddEven[0].nat + ' ' + oddEven[0].odds[1].nat, oddEven[0].odds[1].b, mId, oddEven[0].sid, oddEven[0].subtype, oddEven[0].odds[1].sid, 'back', gameType, oddEven[0].gstatus, oddEven[0].min, oddEven[0].max)">
                                                <rect id="even_card1_box" x="101" y="643" width="196" height="72" rx="6"
                                                    stroke="#376D93" fill="#376D93" fill-opacity="0.01" stroke-width="4">
                                                </rect>
                                                <text id="1.99_7" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans-bold" font-size="30" font-weight="bold"
                                                    letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 101)" :y="getRectCenterCordinates(72, 643)">{{ oddEven[0].odds[1].b }}</tspan>
                                                </text>
                                                <g id="even_card1_sus_box" v-if="oddEven[0].gstatus != 'OPEN'">
                                                    <rect id="even_card1_sus" x="99" y="641" width="200" height="76" rx="8"
                                                        fill="black" fill-opacity="0.3"></rect>
                                                    <path id="even_card1_lock"
                                                        d="M209.893 662.875H208.339V658.094C208.339 652.529 203.925 648 198.5 648C193.075 648 188.661 652.529 188.661 658.094V662.875H187.107C185.392 662.875 184 664.303 184 666.062V678.812C184 680.572 185.392 682 187.107 682H209.893C211.608 682 213 680.572 213 678.812V666.062C213 664.303 211.608 662.875 209.893 662.875ZM203.161 662.875H193.839V658.094C193.839 655.457 195.93 653.312 198.5 653.312C201.07 653.312 203.161 655.457 203.161 658.094V662.875Z"
                                                        fill="white"></path>
                                                </g>
                                                <text id="0_7" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans" font-size="26" letter-spacing="0em"
                                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 101)"
                                                        :y="getRectCenterCordinates(72, 648)"
                                                        :class="{'suspended-book' : oddEven[0].gstatus != 'OPEN'}"
                                                        v-vcasinofancybook="{sid: oddEven[0].sid, subid: oddEven[0].odds[1].sid}">
                                                        0</tspan>
                                                </text>
                                            </g>

                                            <g id="even_card2" style="cursor: pointer;"
                                                @click="setBetData(oddEven[1].nat + ' ' + oddEven[1].odds[1].nat, oddEven[1].odds[1].b, mId, oddEven[1].sid, oddEven[1].subtype, oddEven[1].odds[1].sid, 'back', gameType, oddEven[1].gstatus, oddEven[1].min, oddEven[1].max)">
                                                <rect id="even_card2_box" x="321" y="643" width="196" height="72" rx="6"
                                                    stroke="#376D93" fill="#376D93" fill-opacity="0.01" stroke-width="4">
                                                </rect>
                                                <text id="1.99_8" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans-bold" font-size="30" font-weight="bold"
                                                    letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 321)" :y="getRectCenterCordinates(72, 643)">{{ oddEven[1].odds[1].b }}</tspan>
                                                </text>
                                                <g id="even_card2_sus_box" v-if="oddEven[1].gstatus != 'OPEN'">
                                                    <rect id="even_card2_sus" x="319" y="641" width="200" height="76" rx="8"
                                                        fill="black" fill-opacity="0.3"></rect>
                                                    <path id="even_card2_lock"
                                                        d="M429.893 662.875H428.339V658.094C428.339 652.529 423.925 648 418.5 648C413.075 648 408.661 652.529 408.661 658.094V662.875H407.107C405.392 662.875 404 664.303 404 666.062V678.812C404 680.572 405.392 682 407.107 682H429.893C431.608 682 433 680.572 433 678.812V666.062C433 664.303 431.608 662.875 429.893 662.875ZM423.161 662.875H413.839V658.094C413.839 655.457 415.93 653.312 418.5 653.312C421.07 653.312 423.161 655.457 423.161 658.094V662.875Z"
                                                        fill="white"></path>
                                                </g>
                                                <text id="0_8" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans" font-size="26" letter-spacing="0em"
                                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 321)"
                                                        :y="getRectCenterCordinates(72, 648)"
                                                        :class="{'suspended-book' : oddEven[1].gstatus != 'OPEN'}"
                                                        v-vcasinofancybook="{sid: oddEven[1].sid, subid: oddEven[1].odds[1].sid}">
                                                        0</tspan>
                                                </text>
                                            </g>

                                            <g id="even_card3" style="cursor: pointer;"
                                                @click="setBetData(oddEven[2].nat + ' ' + oddEven[2].odds[1].nat, oddEven[2].odds[1].b, mId, oddEven[2].sid, oddEven[2].subtype, oddEven[2].odds[1].sid, 'back', gameType, oddEven[2].gstatus, oddEven[2].min, oddEven[2].max)">
                                                <rect id="even_card3_box" x="541" y="643" width="196" height="72" rx="6"
                                                    stroke="#376D93" fill="#376D93" fill-opacity="0.01" stroke-width="4">
                                                </rect>
                                                <text id="1.99_9" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans-bold" font-size="30" font-weight="bold"
                                                    letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 541)" :y="getRectCenterCordinates(72, 643)">{{ oddEven[2].odds[1].b }}</tspan>
                                                </text>
                                                <g id="even_card3_sus_box" v-if="oddEven[2].gstatus != 'OPEN'">
                                                    <rect id="even_card3_sus" x="539" y="641" width="200" height="76" rx="8"
                                                        fill="black" fill-opacity="0.3"></rect>
                                                    <path id="even_card3_lock"
                                                        d="M649.893 662.875H648.339V658.094C648.339 652.529 643.925 648 638.5 648C633.075 648 628.661 652.529 628.661 658.094V662.875H627.107C625.392 662.875 624 664.303 624 666.062V678.812C624 680.572 625.392 682 627.107 682H649.893C651.608 682 653 680.572 653 678.812V666.062C653 664.303 651.608 662.875 649.893 662.875ZM643.161 662.875H633.839V658.094C633.839 655.457 635.93 653.312 638.5 653.312C641.07 653.312 643.161 655.457 643.161 658.094V662.875Z"
                                                        fill="white"></path>
                                                </g>
                                                <text id="0_9" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans" font-size="26" letter-spacing="0em"
                                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 541)"
                                                        :y="getRectCenterCordinates(72, 648)"
                                                        :class="{'suspended-book' : oddEven[2].gstatus != 'OPEN'}"
                                                        v-vcasinofancybook="{sid: oddEven[2].sid, subid: oddEven[2].odds[1].sid}">
                                                        0</tspan>
                                                </text>
                                            </g>

                                            <g id="even_card4" style="cursor: pointer;"
                                                @click="setBetData(oddEven[3].nat + ' ' + oddEven[3].odds[1].nat, oddEven[3].odds[1].b, mId, oddEven[3].sid, oddEven[3].subtype, oddEven[3].odds[1].sid, 'back', gameType, oddEven[3].gstatus, oddEven[3].min, oddEven[3].max)">
                                                <rect id="even_card4_box" x="761" y="643" width="196" height="72" rx="6"
                                                    stroke="#376D93" fill="#376D93" fill-opacity="0.01" stroke-width="4">
                                                </rect>
                                                <text id="1.99_10" fill="black" xml:space="preserve"
                                                    style="white-space: pre" font-family="droidsans-bold" font-size="30"
                                                    font-weight="bold" letter-spacing="0em" dominant-baseline="text-top"
                                                    text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 761)" :y="getRectCenterCordinates(72, 643)">{{ oddEven[3].odds[1].b }}</tspan>
                                                </text>
                                                <g id="even_card4_sus_box" v-if="oddEven[3].gstatus != 'OPEN'">
                                                    <rect id="even_card4_sus" x="759" y="641" width="200" height="76" rx="8"
                                                        fill="black" fill-opacity="0.3"></rect>
                                                    <path id="even_card4_lock"
                                                        d="M869.893 662.875H868.339V658.094C868.339 652.529 863.925 648 858.5 648C853.075 648 848.661 652.529 848.661 658.094V662.875H847.107C845.392 662.875 844 664.303 844 666.062V678.812C844 680.572 845.392 682 847.107 682H869.893C871.608 682 873 680.572 873 678.812V666.062C873 664.303 871.608 662.875 869.893 662.875ZM863.161 662.875H853.839V658.094C853.839 655.457 855.93 653.312 858.5 653.312C861.07 653.312 863.161 655.457 863.161 658.094V662.875Z"
                                                        fill="white"></path>
                                                </g>
                                                <text id="0_10" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans" font-size="26" letter-spacing="0em"
                                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 761)"
                                                        :y="getRectCenterCordinates(72, 648)"
                                                        :class="{'suspended-book' : oddEven[3].gstatus != 'OPEN'}"
                                                        v-vcasinofancybook="{sid: oddEven[3].sid, subid: oddEven[3].odds[1].sid}">
                                                        0</tspan>
                                                </text>
                                            </g>

                                            <g id="even_card5" style="cursor: pointer;"
                                                @click="setBetData(oddEven[4].nat + ' ' + oddEven[4].odds[1].nat, oddEven[4].odds[1].b, mId, oddEven[4].sid, oddEven[4].subtype, oddEven[4].odds[1].sid, 'back', gameType, oddEven[4].gstatus, oddEven[4].min, oddEven[4].max)">
                                                <rect id="even_card5_box" x="981" y="643" width="196" height="72" rx="6"
                                                    stroke="#376D93" fill="#376D93" fill-opacity="0.01" stroke-width="4">
                                                </rect>
                                                <text id="1.99_11" fill="black" xml:space="preserve"
                                                    style="white-space: pre" font-family="droidsans-bold" font-size="30"
                                                    font-weight="bold" letter-spacing="0em" dominant-baseline="text-top"
                                                    text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 981)" :y="getRectCenterCordinates(72, 643)">{{ oddEven[4].odds[1].b }}</tspan>
                                                </text>
                                                <g id="even_card5_sus_box" v-if="oddEven[4].gstatus != 'OPEN'">
                                                    <rect id="even_card5_sus" x="979" y="641" width="200" height="76" rx="8"
                                                        fill="black" fill-opacity="0.3"></rect>
                                                    <path id="even_card5_lock"
                                                        d="M1089.89 662.875H1088.34V658.094C1088.34 652.529 1083.92 648 1078.5 648C1073.08 648 1068.66 652.529 1068.66 658.094V662.875H1067.11C1065.39 662.875 1064 664.303 1064 666.062V678.812C1064 680.572 1065.39 682 1067.11 682H1089.89C1091.61 682 1093 680.572 1093 678.812V666.062C1093 664.303 1091.61 662.875 1089.89 662.875ZM1083.16 662.875H1073.84V658.094C1073.84 655.457 1075.93 653.312 1078.5 653.312C1081.07 653.312 1083.16 655.457 1083.16 658.094V662.875Z"
                                                        fill="white"></path>
                                                </g>
                                                <text id="0_11" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans" font-size="26" letter-spacing="0em"
                                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 981)"
                                                        :y="getRectCenterCordinates(72, 648)"
                                                        :class="{'suspended-book' : oddEven[4].gstatus != 'OPEN'}"
                                                        v-vcasinofancybook="{sid: oddEven[4].sid, subid: oddEven[4].odds[1].sid}">
                                                        0</tspan>
                                                </text>
                                            </g>

                                            <g id="even_card6" style="cursor: pointer;"
                                                @click="setBetData(oddEven[5].nat + ' ' + oddEven[5].odds[1].nat, oddEven[5].odds[1].b, mId, oddEven[5].sid, oddEven[5].subtype, oddEven[5].odds[1].sid, 'back', gameType, oddEven[5].gstatus, oddEven[5].min, oddEven[5].max)">
                                                <rect id="even_card6_box" x="1201" y="643" width="196" height="72" rx="6"
                                                    stroke="#376D93" fill="#376D93" fill-opacity="0.01" stroke-width="4">
                                                </rect>
                                                <text id="1.99_12" fill="black" xml:space="preserve"
                                                    style="white-space: pre" font-family="droidsans-bold" font-size="30"
                                                    font-weight="bold" letter-spacing="0em" dominant-baseline="text-top"
                                                    text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 1201)" :y="getRectCenterCordinates(72, 643)">{{ oddEven[5].odds[1].b }}</tspan>
                                                </text>
                                                <g id="even_card6_sus_box" v-if="oddEven[5].gstatus != 'OPEN'">
                                                    <rect id="even_card6_sus" x="1199" y="641" width="200" height="76"
                                                        rx="8" fill="black" fill-opacity="0.3"></rect>
                                                    <path id="even_card6_lock"
                                                        d="M1309.89 662.875H1308.34V658.094C1308.34 652.529 1303.92 648 1298.5 648C1293.08 648 1288.66 652.529 1288.66 658.094V662.875H1287.11C1285.39 662.875 1284 664.303 1284 666.062V678.812C1284 680.572 1285.39 682 1287.11 682H1309.89C1311.61 682 1313 680.572 1313 678.812V666.062C1313 664.303 1311.61 662.875 1309.89 662.875ZM1303.16 662.875H1293.84V658.094C1293.84 655.457 1295.93 653.312 1298.5 653.312C1301.07 653.312 1303.16 655.457 1303.16 658.094V662.875Z"
                                                        fill="white"></path>
                                                </g>
                                                <text id="0_12" fill="black" xml:space="preserve" style="white-space: pre"
                                                    font-family="droidsans" font-size="26" letter-spacing="0em"
                                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                                    <tspan :x="getRectCenterCordinates(196, 1201)"
                                                        :y="getRectCenterCordinates(72, 648)"
                                                        :class="{'suspended-book' : oddEven[5].gstatus != 'OPEN'}"
                                                        v-vcasinofancybook="{sid: oddEven[5].sid, subid: oddEven[5].odds[1].sid}">
                                                        0</tspan>
                                                </text>
                                            </g>
                                        </g>
                                    </g>
                                    <!-- ODD EVEN SECTIONS END -->
                                </template>
                            </g>

                            <!-- ODDS SVG IMAGE AND ICON DEFINATIONS START -->
                            <defs>
                                <!-- P-A-CARD-1 -->
                                <pattern id="p_pa_card1_img" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#card1" transform="scale(0.02 0.0142857)"></use>
                                </pattern>
                                <!-- P-A-CARD-2 -->
                                <pattern id="p_pa_card2_img" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#card3" transform="scale(0.02 0.0142857)"></use>
                                </pattern>
                                <!-- P-A-CARD-3 -->
                                <pattern id="p_pa_card3_img" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#card5" transform="scale(0.02 0.0142857)"></use>
                                </pattern>

                                <!-- P-B-CARD-1 -->
                                <pattern id="p_pb_card1_img" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#card2" transform="scale(0.02 0.0142857)"></use>
                                </pattern>
                                <!-- P-B-CARD-2 -->
                                <pattern id="p_pb_card2_img" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#card4" transform="scale(0.02 0.0142857)"></use>
                                </pattern>
                                <!-- P-B-CARD-3 -->
                                <pattern id="p_pb_card3_img" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#card6" transform="scale(0.02 0.0142857)"></use>
                                </pattern>


                                <!-- CARD 1 -->
                                <image id="card1" data-name="2CC.png" width="50" height="70"
                                    :href="`${cardPath}${cards[0]}.png`">
                                </image>
                                <!-- CARD 2 -->
                                <image id="card2" data-name="2CC.png" width="50" height="70"
                                    :href="`${cardPath}${cards[1]}.png`">
                                </image>
                                <!-- CARD 3 -->
                                <image id="card3" data-name="2CC.png" width="50" height="70"
                                    :href="`${cardPath}${cards[2]}.png`">
                                </image>
                                <!-- CARD 4 -->
                                <image id="card4" data-name="2CC.png" width="50" height="70"
                                    :href="`${cardPath}${cards[3]}.png`">
                                </image>
                                <!-- CARD 5 -->
                                <image id="card5" data-name="2CC.png" width="50" height="70"
                                    :href="`${cardPath}${cards[4]}.png`">
                                </image>
                                <!-- CARD 6 -->
                                <image id="card6" data-name="2CC.png" width="50" height="70"
                                    :href="`${cardPath}${cards[5]}.png`">
                                </image>
                            </defs>
                            <!-- ODDS SVG IMAGE AND ICON DEFINATIONS END -->

                        </svg>
                        <!-- ODDS SVG END -->
                    </div>
                </div>
                <!-- WEB ODDS END -->
            </div>
        </template>
        <!-- WEB END -->

        <!-- MOBILE START -->
        <template v-if="$store.getters.isMobile">
            <div class="w-100 vteen-mobile">
                <!-- MOBILE BG START -->
                <div class="virtual-casino-bg d-none-desktop">
                    <svg id="id_main_bg" viewBox="0 0 1440 801" fill="none" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="main-bg">
                            <rect id="main-bg_2" width="1440" height="801" fill="url(#mobileBg)"></rect>
                            <rect id="dealer" x="535" y="94" width="370" height="707" fill="url(#mobileGirl)"></rect>

                            <!-- CASINO NAME & ROUND ID START -->
                            <g id="casino_name">
                                <rect id="casino_name_box" x="11.5" y="11.5" width="467" height="96" rx="22.5"
                                    fill="#2C153C" fill-opacity="0.5" stroke="#573673" stroke-width="3"></rect>
                                <text id="TEENPATTI 1-DAY" fill="white" xml:space="preserve" 
                                    font-family="Noto Sans" font-size="40" letter-spacing="0em" dominant-baseline="text-top"
                                    text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(467, 11.5)" :y="getRectCenterCordinates(96, 11.5)">
                                        {{ gameTitle }}</tspan>
                                </text>
                                <text id="1234567890" fill="#FDCF13" xml:space="preserve" 
                                    font-family="Noto Sans" font-size="26" letter-spacing="0em"
                                    dominant-baseline="text-before-edge" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(467, 11.5)" :y="getRectCenterCordinates(96, 22.5)">
                                        {{ casinoData.mid }}</tspan>
                                </text>
                            </g>
                            <!-- CASINO NAME & ROUND ID END -->

                            <!-- MY BETS START -->
                            <g id="my_bet" @click="showMyBetsModal()" style="cursor: pointer;">
                                <rect id="my_bet_box" x="37.5" y="133.5" width="329" height="69" rx="22.5" fill="#2C153C"
                                    fill-opacity="0.5" stroke="#573673" stroke-width="3"></rect>
                                <g id="bets_count">
                                    <circle id="bet_count_bg" cx="56" cy="168" r="44" fill="black" stroke="#FDCF13"
                                        stroke-width="4"></circle>
                                    <text id="99" fill="white" xml:space="preserve" style="white-space: pre"
                                        font-family="Antonio" font-size="50" font-weight="bold" letter-spacing="0em"
                                        dominant-baseline="middle" text-anchor="middle">
                                        <tspan x="56" y="168">{{ $store.getters.betCasinoSodaTotal }}</tspan>
                                    </text>
                                </g>
                                <text id="MY BETS" fill="white" xml:space="preserve" style="white-space: pre"
                                    font-family="Noto Sans" font-size="44" letter-spacing="0em">
                                    <tspan x="126" y="185.069">MY BETS</tspan>
                                </text>
                            </g>
                            <!-- MY BETS END -->

                            <!-- OTHER SOUND ON ICON START -->
                            <template v-if="sound.otherSound">
                                <g id="sound_icon_box" style="cursor: pointer;" @click="muteOtherSound()">
                                    <rect id="sound_icon_bg" x="146" y="375" width="98" height="98" rx="23" fill="url(#paint2_linear)" stroke="#FDC834" stroke-width="2"></rect>
                                    <path id="sound_icon" d="M192.452 398.281L180.404 410.249H166.583C164.788 410.249 163.333 411.694 163.333 413.478V432.854C163.333 434.636 164.788 436.083 166.583 436.083H180.404L192.452 448.051C194.487 450.073 198 448.652 198 445.768V400.564C198 397.677 194.485 396.261 192.452 398.281ZM228.333 423.166C228.333 414.618 223.992 406.759 216.719 402.144C215.203 401.183 213.194 401.63 212.234 403.148C211.274 404.665 211.722 406.674 213.237 407.636C218.62 411.053 221.833 416.857 221.833 423.166C221.833 429.475 218.62 435.28 213.237 438.696C211.722 439.656 211.274 441.665 212.234 443.184C213.115 444.578 215.094 445.221 216.719 444.188C223.992 439.573 228.333 431.714 228.333 423.166ZM209.135 412.823C207.567 411.971 205.589 412.533 204.719 414.095C203.854 415.657 204.427 417.62 205.999 418.482C207.747 419.436 208.833 421.233 208.833 423.166C208.833 425.101 207.747 426.896 206 427.85C204.428 428.712 203.855 430.675 204.721 432.237C205.591 433.806 207.571 434.363 209.137 433.509C212.96 431.417 215.335 427.454 215.335 423.165C215.335 418.875 212.96 414.914 209.135 412.823Z" fill="white"></path>
                                </g>
                            </template>
                            <!-- OTHER SOUND ON ICON END -->
                            <!-- OTHER SOUND OFF ICON START -->
                            <template v-else>
                                <g id="sound_off_icon_box" style="cursor: pointer;" @click="muteOtherSound()">
                                    <rect id="sound_off_icon_bg" x="146" y="375" width="98" height="98" rx="23" fill="url(#paint2_linear)" stroke="#FDC834" stroke-width="2"></rect>
                                    <path id="sound_off_icon" d="M189.398 398.281L177.235 410.249H163.281C161.468 410.249 160 411.694 160 413.478V432.854C160 434.636 161.468 436.083 163.281 436.083H177.235L189.398 448.051C191.453 450.073 195 448.652 195 445.768V400.564C195 397.677 191.45 396.261 189.398 398.281ZM223.114 423.166L229.354 417.025C230.215 416.178 230.215 414.802 229.354 413.955L226.234 410.884C225.373 410.037 223.976 410.037 223.114 410.884L216.874 417.025L210.635 410.884C209.773 410.037 208.376 410.037 207.515 410.884L204.395 413.955C203.534 414.802 203.534 416.178 204.395 417.025L210.635 423.166L204.396 429.306C203.535 430.153 203.535 431.528 204.396 432.376L207.516 435.446C208.377 436.294 209.775 436.294 210.636 435.446L216.874 429.307L223.114 435.448C223.976 436.295 225.373 436.295 226.234 435.448L229.354 432.377C230.215 431.53 230.215 430.155 229.354 429.307L223.114 423.166Z" fill="white"></path>
                                </g>
                            </template>
                            <!-- OTHER SOUND OFF ICON END -->

                            <!-- MUSIC ON ICON START -->
                            <template v-if="sound.bgMusic">
                                <g id="music_icon_box" style="cursor: pointer;" @click="muteBackgroundSound()">
                                    <rect id="music_icon_bg" x="11" y="375" width="98" height="98" rx="23" fill="url(#paint1_linear)" stroke="#FDC834" stroke-width="2"></rect>
                                    <path id="music_icon" d="M82.4667 397.482L50.1781 407.018C49.5227 407.224 48.95 407.634 48.5433 408.187C48.1366 408.741 47.9171 409.41 47.9167 410.097V436.478C46.8593 436.221 45.7756 436.088 44.6875 436.082C39.3392 436.082 35 438.975 35 442.541C35 446.107 39.3392 449 44.6875 449C50.0358 449 54.375 446.107 54.375 442.541V418.959L80.2083 411.39V430.02C79.1511 429.763 78.0673 429.629 76.9792 429.624C71.6309 429.624 67.2917 432.516 67.2917 436.082C67.2917 439.649 71.6309 442.541 76.9792 442.541C82.3275 442.541 86.6667 439.65 86.6667 436.082V400.559C86.6662 400.052 86.5464 399.553 86.3169 399.101C86.0874 398.649 85.7548 398.257 85.3458 397.957C84.9369 397.658 84.4632 397.459 83.963 397.376C83.4628 397.294 82.9502 397.33 82.4667 397.482Z" fill="white"></path>
                                </g>
                            </template>
                            <!-- MUSIC ON ICON END -->
                            <!-- MUSIC OFF ICON START -->
                            <template v-else>
                                <g id="music_off_icon_box" style="cursor: pointer;" @click="muteBackgroundSound()">
                                    <rect id="music_off_icon_bg" x="11" y="375" width="98" height="98" rx="23" fill="url(#paint1_linear)" stroke="#FDC834" stroke-width="2"></rect>
                                    <path id="music_off_icon" d="M47.8333 436.478C46.7691 436.221 45.6784 436.088 44.5833 436.082C39.2004 436.082 34.8332 438.974 34.8332 442.541C34.8332 446.107 39.2004 448.999 44.5833 448.999C49.9661 448.999 54.3333 446.107 54.3333 442.541V430.419L47.8333 425.428V436.478ZM92.7059 443.56L86.0982 438.486C86.5563 437.742 86.8336 436.937 86.8336 436.082V400.561C86.8331 400.054 86.7125 399.554 86.4815 399.102C86.2506 398.65 85.9158 398.259 85.5042 397.959C85.0926 397.659 84.6158 397.46 84.1124 397.378C83.609 397.295 83.0931 397.332 82.6065 397.484L50.1093 407.019C49.5989 407.181 49.1368 407.466 48.7645 407.848C48.3922 408.231 48.1215 408.7 47.9765 409.212L32.9512 397.674C32.7827 397.543 32.59 397.447 32.384 397.391C32.1781 397.335 31.963 397.319 31.751 397.345C31.539 397.372 31.3344 397.439 31.1487 397.544C30.9631 397.649 30.8001 397.79 30.6691 397.957L28.6754 400.507C28.411 400.845 28.2924 401.274 28.346 401.699C28.3995 402.124 28.6206 402.51 28.9608 402.773L88.7155 448.659C88.884 448.789 89.0768 448.885 89.2827 448.942C89.4887 448.998 89.7038 449.014 89.9157 448.987C90.1277 448.961 90.3324 448.893 90.518 448.788C90.7037 448.683 90.8666 448.543 90.9976 448.375L92.9913 445.825C93.2558 445.487 93.3743 445.059 93.3208 444.634C93.2673 444.209 93.0461 443.823 92.7059 443.56ZM80.3335 430.019C79.2693 429.763 78.1786 429.63 77.0835 429.624C76.329 429.634 75.5767 429.705 74.8339 429.837L58.928 417.626L80.3335 411.389V430.019Z" fill="white"></path>
                                </g>
                            </template>
                            <!-- MUSIC OFF ICON END -->

                            <!-- HOME ICON START -->
                            <router-link :to="{name: 'owncasinolist'}">
                                <g id="home_icon_box">
                                    <rect id="home_icon_bg" x="146" y="245" width="98" height="98" rx="23" fill="url(#paint0_linear)" stroke="#FDC834" stroke-width="2"></rect>
                                    <path id="home_icon" d="M193.172 279.132L169.168 298.907V320.249C169.168 320.801 169.387 321.331 169.778 321.722C170.168 322.113 170.698 322.332 171.251 322.332L185.841 322.295C186.392 322.292 186.919 322.071 187.307 321.681C187.696 321.29 187.914 320.762 187.914 320.211V307.747C187.914 307.195 188.133 306.665 188.524 306.274C188.914 305.883 189.444 305.664 189.997 305.664H198.329C198.882 305.664 199.412 305.883 199.803 306.274C200.193 306.665 200.413 307.195 200.413 307.747V320.202C200.412 320.476 200.465 320.748 200.569 321.001C200.674 321.255 200.827 321.485 201.021 321.679C201.214 321.874 201.444 322.028 201.697 322.133C201.95 322.238 202.222 322.292 202.496 322.292L217.081 322.332C217.633 322.332 218.163 322.113 218.554 321.722C218.944 321.331 219.164 320.801 219.164 320.249V298.892L195.164 279.132C194.882 278.905 194.531 278.781 194.168 278.781C193.806 278.781 193.454 278.905 193.172 279.132ZM231.09 292.573L220.205 283.599V265.562C220.205 265.147 220.041 264.75 219.748 264.457C219.455 264.164 219.057 263.999 218.643 263.999H211.352C210.938 263.999 210.54 264.164 210.247 264.457C209.954 264.75 209.79 265.147 209.79 265.562V275.017L198.133 265.425C197.014 264.504 195.611 264.001 194.162 264.001C192.713 264.001 191.309 264.504 190.191 265.425L157.234 292.573C157.075 292.703 156.945 292.864 156.849 293.045C156.752 293.227 156.693 293.425 156.674 293.63C156.654 293.834 156.675 294.04 156.736 294.237C156.796 294.433 156.895 294.615 157.025 294.773L160.345 298.81C160.476 298.969 160.636 299.1 160.818 299.197C160.999 299.293 161.198 299.353 161.402 299.373C161.607 299.393 161.813 299.372 162.01 299.312C162.206 299.252 162.389 299.153 162.547 299.022L193.172 273.793C193.454 273.566 193.806 273.442 194.168 273.442C194.531 273.442 194.882 273.566 195.164 273.793L225.791 299.022C225.949 299.153 226.131 299.252 226.328 299.312C226.524 299.373 226.73 299.394 226.934 299.374C227.139 299.355 227.337 299.295 227.518 299.199C227.7 299.103 227.861 298.972 227.991 298.814L231.311 294.777C231.442 294.618 231.54 294.435 231.6 294.238C231.659 294.041 231.679 293.834 231.659 293.629C231.638 293.424 231.577 293.225 231.48 293.044C231.382 292.863 231.25 292.702 231.09 292.573Z" fill="white"></path>
                                </g>
                            </router-link>
                            <!-- HOME ICON END -->

                            <!-- RULES ICON START -->
                            <g id="rule_icon_box" @click="getCasinoRulesHtml()" style="cursor: pointer;">
                                <rect id="home_icon_bg_2" x="11" y="245" width="98" height="98" rx="23" fill="url(#paint3_linear)" stroke="#FDC834" stroke-width="2"></rect>
                                <path id="rule_icon" d="M50.9375 315.905H53.5416V297.096H50.9375C49.4992 297.096 48.3333 295.93 48.3333 294.491V288.271C48.3333 286.833 49.4992 285.667 50.9375 285.667H65.5208C66.9591 285.667 68.125 286.833 68.125 288.271V315.905H70.7291C72.1674 315.905 73.3333 317.071 73.3333 318.509V324.729C73.3333 326.168 72.1674 327.334 70.7291 327.334H50.9375C49.4992 327.334 48.3333 326.168 48.3333 324.729V318.509C48.3333 317.071 49.4992 315.905 50.9375 315.905ZM60.8333 260.667C55.6556 260.667 51.4583 264.864 51.4583 270.042C51.4583 275.22 55.6556 279.417 60.8333 279.417C66.011 279.417 70.2083 275.22 70.2083 270.042C70.2083 264.864 66.0109 260.667 60.8333 260.667Z" fill="white"></path>
                            </g>
                            <!-- RULES ICON END -->


                            <!-- LAST RESULTS START -->
                            <template v-if="$store.state.lastResults">
                                <g id="last_results">
                                    <rect id="last_result_bg" x="1233.5" y="11.5" width="195" height="548" rx="6.5" fill="#2C153C" fill-opacity="0.5" stroke="#573673" stroke-width="3"></rect>
                                    
                                    <g id="last_result_1" style="cursor: pointer;" @click="showResult(0)">
                                        <rect id="last_result1-box" x="1245.5" y="30.9082" width="80.1268" height="80.1268" rx="3.5" stroke="white"></rect>
                                        <text id="A" :fill="getResultColor(0)" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1260.65" y="99.6367">{{ getResultLable(0) }}</tspan>
                                        </text>
                                    </g>
                                    
                                    <g id="last_result_2" style="cursor: pointer;" @click="showResult(1)">
                                        <rect id="last_result2-box" x="1336.15" y="30.9082" width="80.1268" height="80.1268" rx="3.5" stroke="white"></rect>
                                        <text id="B" :fill="getResultColor(1)" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1354.11" y="99.6367">{{ getResultLable(1) }}</tspan>
                                        </text>
                                    </g>
                                    
                                    <g id="last_result_1_2" style="cursor: pointer;" @click="showResult(2)">
                                        <rect id="last_result1-box_2" x="1245.5" y="121.908" width="80.1268" height="80.1268" rx="3.5" stroke="white"></rect>
                                        <text id="A_2" :fill="getResultColor(2)" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1260.65" y="189.637">{{ getResultLable(2) }}</tspan>
                                        </text>
                                    </g>
                                    
                                    <g id="last_result_2_2" style="cursor: pointer;" @click="showResult(3)">
                                        <rect id="last_result2-box_2" x="1336.15" y="121.908" width="80.1268" height="80.1268" rx="3.5" stroke="white"></rect>
                                        <text id="B_2" :fill="getResultColor(3)" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1354.11" y="189.637">{{ getResultLable(3) }}</tspan>
                                        </text>
                                    </g>
                                    
                                    <g id="last_result_1_3" style="cursor: pointer;" @click="showResult(4)">
                                        <rect id="last_result1-box_3" x="1245.5" y="212.908" width="80.1268" height="80.1268" rx="3.5" stroke="white"></rect>
                                        <text id="A_3" :fill="getResultColor(4)" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1260.65" y="280.637">{{ getResultLable(4) }}</tspan>
                                        </text>
                                    </g>
                                    
                                    <g id="last_result_2_3" style="cursor: pointer;" @click="showResult(5)">
                                        <rect id="last_result2-box_3" x="1336.15" y="212.908" width="80.1268" height="80.1268" rx="3.5" stroke="white"></rect>
                                        <text id="B_3" :fill="getResultColor(5)" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1354.11" y="280.637">{{ getResultLable(5) }}</tspan>
                                        </text>
                                    </g>
                                    
                                    <g id="last_result_1_4" style="cursor: pointer;" @click="showResult(6)">
                                        <rect id="last_result1-box_4" x="1245.5" y="303.908" width="80.1268" height="80.1268" rx="3.5" stroke="white"></rect>
                                        <text id="A_4" :fill="getResultColor(6)" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1260.65" y="371.637">{{ getResultLable(6) }}</tspan>
                                        </text>
                                    </g>
                                    
                                    <g id="last_result_2_4" style="cursor: pointer;" @click="showResult(7)">
                                        <rect id="last_result2-box_4" x="1336.15" y="303.908" width="80.1268" height="80.1268" rx="3.5" stroke="white"></rect>
                                        <text id="B_4" :fill="getResultColor(7)" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1354.11" y="371.637">{{ getResultLable(7) }}</tspan>
                                        </text>
                                    </g>
                                    
                                    <g id="last_result_1_5" style="cursor: pointer;" @click="showResult(8)">
                                        <rect id="last_result1-box_5" x="1245.5" y="395.908" width="80.1268" height="80.1268" rx="3.5" stroke="white"></rect>
                                        <text id="A_5" :fill="getResultColor(8)" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1260.65" y="463.637">{{ getResultLable(8) }}</tspan>
                                        </text>
                                    </g>
                                    
                                    <g id="last_result_2_5" style="cursor: pointer;" @click="showResult(9)">
                                        <rect id="last_result2-box_5" x="1336.15" y="395.908" width="80.1268" height="80.1268" rx="3.5" stroke="white"></rect>
                                        <text id="B_5" :fill="getResultColor(9)" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1354.11" y="463.637">{{ getResultLable(9) }}</tspan>
                                        </text>
                                    </g>
                                    
                                    <router-link class="result-more"
                                        :to="{name: 'casinoResult', params: {gameType: $store.state.casinoGameType}}">
                                        <g id="last_result_all">
                                            <rect id="more_result" x="1299" y="484" width="68.9577" height="70.3099" fill="url(#plusMobileIcon)"></rect>
                                        </g>
                                    </router-link>

                                </g>

                            </template>
                            <!-- LAST RESULTS END -->

                            <!-- PLAYER A WINNER START -->
                            <rect v-if="casinoData.rdesc == '1'" id="winner a" x="210" y="495" width="295" height="312" fill="url(#winnerTrophyLeft)"></rect>
                            <!-- PLAYER A WINNER END -->

                            <!-- PLAYER B WINNER START -->
                            <rect v-if="casinoData.rdesc == '2'" id="winner b" x="1019" y="495" width="295" height="312" fill="url(#winnerTrophyLeft)"></rect>
                            <!-- PLAYER B WINNER END -->

                        </g>

                        <defs>
                            <pattern id="winnerTrophyLeft" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use xlink:href="#winnerTrophyLeftImg"
                                    transform="translate(-0.0285714) scale(0.00412946 0.00390625)"></use>
                            </pattern>

                            <image id="winnerTrophyLeftImg" data-name="winner.png" width="256" height="256"
                                :href="`${imgPath}front/img/svg_casino/icons/winner-left.png`">
                            </image>

                            <pattern id="mobileBg" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use xlink:href="#mobileBgImg" transform="scale(0.000694444 0.00124844)"></use>
                            </pattern>
                            <pattern id="mobileGirl" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use xlink:href="#mobileGirlImg" transform="scale(0.0027027 0.00141443)"></use>
                            </pattern>

                            <pattern id="plusMobileIcon" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use xlink:href="#plusIconMobileImg" transform="translate(-0.00478122) scale(0.0050227)">
                                </use>
                            </pattern>

                            <linearGradient id="paint0_linear" x1="2436" y1="10" x2="2436" y2="70" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#F29603"></stop>
                                <stop offset="1" stop-color="#B4701B"></stop>
                            </linearGradient>
                            <linearGradient id="paint1_linear" x1="2362" y1="10" x2="2362" y2="70" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#F29603"></stop>
                                <stop offset="1" stop-color="#B4701B"></stop>
                            </linearGradient>
                            <linearGradient id="paint2_linear" x1="2288" y1="10" x2="2288" y2="70" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#F29603"></stop>
                                <stop offset="1" stop-color="#B4701B"></stop>
                            </linearGradient>
                            <linearGradient id="paint3_linear" x1="2510" y1="10" x2="2510" y2="70" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#F29603"></stop>
                                <stop offset="1" stop-color="#B4701B"></stop>
                            </linearGradient>

                            <image id="mobileBgImg" data-name="bg.png" width="1440" height="801"
                                :href="`${boardPath}/bgMobile.png`">
                            </image>
                            <image id="mobileGirlImg" data-name="girl.png" width="370" height="707"
                                :href="`${boardPath}/dealer_${dealer}.png`">
                            </image>

                            <image id="plusIconMobileImg" data-name="more.png" width="201" height="203"
                                xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAADLCAYAAADEDrcOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDZGMTEwRkJGNUUzMTFFQjlFNkNBM0M5REZERDRDREIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDZGMTEwRkNGNUUzMTFFQjlFNkNBM0M5REZERDRDREIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNkYxMTBGOUY1RTMxMUVCOUU2Q0EzQzlERkRENENEQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNkYxMTBGQUY1RTMxMUVCOUU2Q0EzQzlERkRENENEQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvplFlQAAAZqSURBVHja7N1PiJR1GMDxd2MDKwmJPQSJrJEStYGIloF10Uw2DfLiGhiBkEhCBy8FQQiFdJCQCikIAg9WB42SSG+hkChF5BZioosIdRCRMBNamJ63nbF3Z2dmZ9zdmfed+XzgqTX/8ON9+/p735nZmb5SqZSQC/Nj5mV+fDPmusPSeX0iabv+mLUxT8a8VPVzg5mvxzJf34g5EHOiPIikKw3H7IgZqoqhFZVwTsW8F3PSYRVJN9gUs7fGTjFTY+UdZrvdRSRFNRBzeg7iqBXLuZhnHXKRFMn6mP1zHEety7A1MRccfpHk3csxb7UxkOpYtrhXEUmejcTs6VAg2VA2xow6HSLJm2UxhzscSDaUlTFXnBaR5MnFnASSDWWx0zJzdzgEs+LrnK5rn1NjJ8mDVTEHc7aLZHcTj3iJpON+iXkkx+s7lngOxeVWB62OuTvna1yaTLwUBjtJx+5FNhRgnV/EbHa6RNJu6Uvbz+T0XqTWvcmSmHGnzeVWO20oSCBJeZ3PO2V2knb7LubpAq33SDLxTDwiaZu8PXnYzCWXJxddbrXNgHXbSWgsfQLx+wKuO/2WYa8QtpO0xcPWLRIau9+6RUJjd1m3SGhsgXWLhMbmWbdIAJGASEAkIBIQCYgERAIiAZEAIgGRgEhAJCASEAmIBEQCiAREAiIBkYBIQCQgEhAJIBIQCYgERAIiAZGASEAkIBJAJCASEAmIBEQCIgGRgEgAkYBIQCQgEhAJiAREAiIBRDJD49bdO/pKpdJs/Vn9MYtilsY8FLMg5p6Ye8s/102BrIpZXsC1/xhzsgvPx58xf8Vcizkfcy7mQl4iGYrZELO9/ONBf++QA2OZrz+KORIz2u5IdsbsEgYFi2Z3zKdzHYk46LlYmo1kWcxhcdBlsaxp5t6lmUgqu4c46MZYXo35ZiaRfBgzLBC6PJS9MR/cTiSfxzwuEHoklE9i3m4lkteTiYd1BUIvhZLeVhxqJpL0ibKDAqFHQ3kq5vJ0kVwUCD0eyuLsf6h+7dZOxwiSkUY7iV0EqnaT7E6yybGBW4Zr7SRHY9Y5NvCfL2NeyEaSvnT6N5daMPWSq3K5tUogMMXqbCTPOR4wSbppPJONZMgxgSmWZ+9JPPQLde5LvBEETEMk0EQk/Q4D1NWf3pOkkfzjWEBNd1Yi8UQi1L5xX5JebnlXP6hv3I07NHHjnrrkUMAUN7KRnHU8YIpz2UiOOh4wxQ/pPyovSxmIOZ14hAsqxmK2xpzIftOV12/B5EgmfT9Jancy+S3roZf9VPnCG0FA7V3k1nsEV0eyJ5l4OxWh4FKrzk5iN0EgVZ9fUiuSkfKOIhR6fhepF0nKO8rTq4FsTKo+X7HRRy+47KLXAqn5OSWNIvEEI70UyKmYzbV+crpPuloYc1wodHkgx5L/P2a95UhS82POlL8WC90WSN1PuGolkor0Q+PXCYUuiSO1I+bb6X5xq5/j7qOq6YZAvop5rdnf0GokFetj3om5TywUaOdIX2aSPgd4uZXffLuRVDwY82LMNrsLOQ0j/a7bfUmNDwxtVyTVN/jpewqviHmgHND9MYu69CQMFvh/nG5ztRxDOr/H/Fyey7Pxh89mJL0kfRDjlQKu++OkwUOd1ObdUkAkIBIQCYgERAIiAZGASACRgEhAJCASEAmIBEQCIgFEAiIBkYBIQCQgEhAJiAQQCYgERAIiAZGASEAkIBIQCSASEAmIBEQCIgGRgEhAJIBIQCQgEhAJiAREAiIBkQAiAZGASDrjpnWLhMauWbdIaOxv6xYJjf1h3SKhsfMFXfdZp651faVSyVFo3cKY4zGDBVrzWMzKmCtOn0ja5WIBI1nstLncor5LDoFI2m13wda73ylzudVuAzGnC3LJlV5qPRZz3Wmzk7TTlQJdwowKRCSdsq/8t3Ted5F3nSqXW52U90e5fo151Gmyk3TSrhzvJum6tjlFdhK7Sf1A0nuRjU6PSPIgj490pZF48lAkubIpZm9OQhkr7yCjTotI8ubN8j3AYIcDSe+TDjkdIhFK7UDeiPnMaRBJ3o3E7GlzKGkgW2JOOvwiKYrKy+mTOY4ljeNqzBMx4w67SIq8q8x2LGPlf2+NOeEwi6QbDMfsiBmaQSyVME7FvC8OkXSr/pi1MSuSqc+GD9YIInUj5kA5CmGIpGfNj5mX+XH6HlleuZsD/wowAOLzssMWwDVoAAAAAElFTkSuQmCC">
                            </image>
                        </defs>
                    </svg>


                    <!-- MOBILE ODDS START -->
                    <div class="virtual-casino-odds d-none-desktop">
                        <div class="decks-block" :style="{'z-index': leftDecks.length > 20 ? 7 : 1}">
                            <!-- left card deck -->
                            <img class="left-card-deck" :src="`${boardPath}/cardDeckLeft.svg`" />

                            <!-- right card deck -->
                            <img class="right-card-box-back" :src="`${boardPath}/cardDeckRightBox.svg`" />
                            <img class="right-card-box-middle" :src="`${boardPath}/cardHolder.svg`" :style="{
                                    right: (-4 - rightDecks.length * 0.095) + '%',
                                    top: (13 - rightDecks.length * 0.215) + '%',
                                    transform: `translate(${5 - (rightDecks.length * 5 / deckLength)}%, ${2 - (rightDecks.length * 2 / deckLength)}%)`
                                    }" />

                            <div class="decks empty-card-in-deck-right " :class="{'finish-deck': finishedRightDeck}" :style="{
                                    right: (0.5 - rightDecks.length * 0.078) + '%',
                                    top: (16 - rightDecks.length * 0.215) + '%',
                                    transform: `perspective(900px) rotateX(23deg) rotateZ(-66deg) rotateY(-30deg) skewX(3deg) scale(1) translateY(${19 - (rightDecks.length * 19 / deckLength)}%)`
                                    }">
                                <template v-for="i in rightDecks">
                                    <div :key="i+'right'" class="card-item"
                                        :style="{'z-index': rightDecks.length - i, backgroundImage: `url(${cardPath}1.png)`, transform: `translate(-${(rightDecks.length - i) * 2.2}%, ${i * 0.48}%)`}">
                                    </div>
                                </template>
                            </div>

                            <img class="right-card-box-front" :src="`${boardPath}/cardDeckWall.svg`" />
                        </div>

                        <div class="table-actions">
                            <div class="cards-showing-block">
                                <!-- PLAYER A CARDS START -->
                                <div class="flip-card"
                                    :class="{show: cards[0] != 1, end: isGameFinished, 'disable-animation': disabledAnimation[0]}">
                                    <div class="flip-card-inner">
                                        <div class="flip-card-front">
                                            <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                        </div>
                                        <div class="flip-card-back">
                                            <div class="card-item"
                                                :style="{backgroundImage: `url(${cardPath}${cards[0]}.png)`}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flip-card"
                                    :class="{show: cards[2] != 1, end: isGameFinished, 'disable-animation': disabledAnimation[2]}">
                                    <div class="flip-card-inner">
                                        <div class="flip-card-front">
                                            <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                        </div>
                                        <div class="flip-card-back">
                                            <div class="card-item"
                                                :style="{backgroundImage: `url(${cardPath}${cards[2]}.png)`}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flip-card"
                                    :class="{show: cards[4] != 1, end: isGameFinished, 'disable-animation': disabledAnimation[4]}">
                                    <div class="flip-card-inner">
                                        <div class="flip-card-front">
                                            <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                        </div>
                                        <div class="flip-card-back">
                                            <div class="card-item"
                                                :style="{backgroundImage: `url(${cardPath}${cards[4]}.png)`}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- PLAYER A CARDS END -->

                                <!-- PLAYER B CARDS START -->
                                <div class="flip-card"
                                    :class="{show: cards[5] != 1, end: isGameFinished, 'disable-animation': disabledAnimation[5]}">
                                    <div class="flip-card-inner">
                                        <div class="flip-card-front">
                                            <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                        </div>
                                        <div class="flip-card-back">
                                            <div class="card-item"
                                                :style="{backgroundImage: `url(${cardPath}${cards[5]}.png)`}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flip-card"
                                    :class="{show: cards[3] != 1, end: isGameFinished, 'disable-animation': disabledAnimation[3]}">
                                    <div class="flip-card-inner">
                                        <div class="flip-card-front">
                                            <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                        </div>
                                        <div class="flip-card-back">
                                            <div class="card-item"
                                                :style="{backgroundImage: `url(${cardPath}${cards[3]}.png)`}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flip-card"
                                    :class="{show: cards[1] != 1, end: isGameFinished, 'disable-animation': disabledAnimation[1]}">
                                    <div class="flip-card-inner">
                                        <div class="flip-card-front">
                                            <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                        </div>
                                        <div class="flip-card-back">
                                            <div class="card-item"
                                                :style="{backgroundImage: `url(${cardPath}${cards[1]}.png)`}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- PLAYER B CARDS END -->
                            </div>

                            <div class="cards-block">
                                <!-- PLAYER A CARDS START -->
                                <div class="flip-card " :class="{show: cards[0] != 1, end: isGameFinished}">
                                    <div class="flip-card-inner">
                                        <div class="flip-card-front">
                                            <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                        </div>
                                        <div class="flip-card-back">
                                            <div class="card-item"
                                                :style="{backgroundImage: `url(${cardPath}${cards[0]}.png)`}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flip-card" :class="{show: cards[2] != 1, end: isGameFinished}">
                                    <div class="flip-card-inner">
                                        <div class="flip-card-front">
                                            <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                        </div>
                                        <div class="flip-card-back">
                                            <div class="card-item"
                                                :style="{backgroundImage: `url(${cardPath}${cards[2]}.png)`}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flip-card" :class="{show: cards[4] != 1, end: isGameFinished}">
                                    <div class="flip-card-inner">
                                        <div class="flip-card-front">
                                            <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                        </div>
                                        <div class="flip-card-back">
                                            <div class="card-item"
                                                :style="{backgroundImage: `url(${cardPath}${cards[4]}.png)`}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- PLAYER A CARDS END -->

                                <!-- PLAYER B CARDS START -->
                                <div class="flip-card" :class="{show: cards[5] != 1, end: isGameFinished}">
                                    <div class="flip-card-inner">
                                        <div class="flip-card-front">
                                            <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                        </div>
                                        <div class="flip-card-back">
                                            <div class="card-item"
                                                :style="{backgroundImage: `url(${cardPath}${cards[5]}.png)`}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flip-card" :class="{show: cards[3] != 1, end: isGameFinished}">
                                    <div class="flip-card-inner">
                                        <div class="flip-card-front">
                                            <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                        </div>
                                        <div class="flip-card-back">
                                            <div class="card-item"
                                                :style="{backgroundImage: `url(${cardPath}${cards[3]}.png)`}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flip-card" :class="{show: cards[1] != 1, end: isGameFinished}">
                                    <div class="flip-card-inner">
                                        <div class="flip-card-front">
                                            <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}"></div>
                                        </div>
                                        <div class="flip-card-back">
                                            <div class="card-item"
                                                :style="{backgroundImage: `url(${cardPath}${cards[1]}.png)`}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- PLAYER B CARDS END -->
                            </div>

                            <!-- ODDS SVG START -->
                            <svg viewBox="0 0 1354 1743" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="odds">
                                    <g id="player_title">
                                        <text id="PLAYER A" fill="#EF0518" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="90.2422" y="94.6367">PLAYER A</tspan>
                                        </text>
                                        <text id="PLAYER B" fill="#00A200" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="894" y="94.6367">PLAYER B</tspan>
                                        </text>
                                    </g>
                                    
                                    <template v-if="casinoData && casinoData.mid">
                                        <g id="main_odds">
                                            <g id="player_a">
                                                <g id="main">

                                                    <g id="back" style="cursor: pointer;"
                                                        @click="setBetData(main[0].nat + ' Main', main[0].b, mId, main[0].sid, main[0].subtype, 0, 'back', gameType, main[0].gstatus, main[0].min, main[0].max)">
                                                        <rect id="a_m_back" x="2" y="459" width="248" height="176" rx="6" stroke="#4F9CD2" stroke-width="4"></rect>
                                                        <text id="1.99" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em"
                                                            dominant-baseline="middle" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(248, 2)"
                                                                :y="getRectCenterCordinates(176, 459)">{{ main[0].b }}</tspan>
                                                        </text>
                                                        <g id="a_m_back_sus_box" v-if="main[0].gstatus != 'OPEN'">
                                                            <rect id="a_m_b_sus" y="457" width="252" height="180" rx="8" fill="black" fill-opacity="0.3"></rect>
                                                            <path id="a_m_b_lock" d="M142.514 543.778H140.324V537.099C140.324 529.326 134.098 523 126.448 523C118.798 523 112.573 529.326 112.573 537.099V543.778H110.382C107.963 543.778 106 545.772 106 548.23V566.04C106 568.498 107.963 570.492 110.382 570.492H142.514C144.934 570.492 146.896 568.498 146.896 566.04V548.23C146.896 545.772 144.934 543.778 142.514 543.778ZM133.021 543.778H119.875V537.099C119.875 533.417 122.824 530.421 126.448 530.421C130.072 530.421 133.021 533.417 133.021 537.099V543.778Z" fill="white"></path>
                                                        </g>
                                                    </g>

                                                    <g id="lay" style="cursor: pointer;"
                                                        @click="setBetData(main[0].nat + ' Main', main[0].l, mId, main[0].sid, main[0].subtype, 0, 'lay', gameType, main[0].gstatus, main[0].min, main[0].max)">
                                                        <rect id="a_m_lay" x="283" y="459" width="248" height="176" rx="6" stroke="#CD4E7E" stroke-width="4"></rect>
                                                        <text id="1.99_2" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em" 
                                                            dominant-baseline="middle" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(248, 283)"
                                                                :y="getRectCenterCordinates(176, 459)">{{ main[0].l }}</tspan>
                                                        </text>
                                                        <g id="a_m_lay_sus_box" v-if="main[0].gstatus != 'OPEN'">
                                                            <rect id="a_m_l_sus" x="281" y="457" width="252" height="180" rx="8" fill="black" fill-opacity="0.3"></rect>
                                                            <path id="a_m_l_lock" d="M423.514 543.778H421.324V537.099C421.324 529.326 415.098 523 407.448 523C399.798 523 393.573 529.326 393.573 537.099V543.778H391.382C388.963 543.778 387 545.772 387 548.23V566.04C387 568.498 388.963 570.492 391.382 570.492H423.514C425.934 570.492 427.896 568.498 427.896 566.04V548.23C427.896 545.772 425.934 543.778 423.514 543.778ZM414.021 543.778H400.875V537.099C400.875 533.417 403.824 530.421 407.448 530.421C411.072 530.421 414.021 533.417 414.021 537.099V543.778Z" fill="white"></path>
                                                        </g>
                                                    </g>

                                                    <text id="10000" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="50" font-weight="bold" letter-spacing="0em" dominant-baseline="middle" text-anchor="middle">
                                                        <tspan x="268" y="691.773" v-vcasinobook="{sid: main[0].sid}">0</tspan>
                                                    </text>
                                                </g>


                                                <g id="main_2">

                                                    <g id="back_2" style="cursor: pointer;"
                                                        @click="setBetData(consicutive[0].nat + ' Consicutive', consicutive[0].b, mId, consicutive[0].sid, consicutive[0].subtype, 0, 'back', gameType, consicutive[0].gstatus, consicutive[0].min, consicutive[0].max)">
                                                        <rect id="a_m_back_2" x="2" y="806" width="248" height="176" rx="6" stroke="#4F9CD2" stroke-width="4"></rect>
                                                        <text id="1.99_3" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em" dominant-baseline="middle" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(248, 2)"
                                                                :y="getRectCenterCordinates(176, 806)">{{ consicutive[0].b }}</tspan>
                                                        </text>
                                                        <g id="a_m_back_sus_box_2" v-if="consicutive[0].gstatus != 'OPEN'">
                                                            <rect id="a_m_b_sus_2" y="804" width="252" height="180" rx="8" fill="black" fill-opacity="0.3"></rect>
                                                            <path id="a_m_b_lock_2" d="M142.514 890.778H140.324V884.099C140.324 876.326 134.098 870 126.448 870C118.798 870 112.573 876.326 112.573 884.099V890.778H110.382C107.963 890.778 106 892.772 106 895.23V913.04C106 915.498 107.963 917.492 110.382 917.492H142.514C144.934 917.492 146.896 915.498 146.896 913.04V895.23C146.896 892.772 144.934 890.778 142.514 890.778ZM133.021 890.778H119.875V884.099C119.875 880.417 122.824 877.421 126.448 877.421C130.072 877.421 133.021 880.417 133.021 884.099V890.778Z" fill="white"></path>
                                                        </g>
                                                    </g>

                                                    <g id="lay_2" style="cursor: pointer;"
                                                        @click="setBetData(consicutive[0].nat + ' Consicutive', consicutive[0].l, mId, consicutive[0].sid, consicutive[0].subtype, 0, 'lay', gameType, consicutive[0].gstatus, consicutive[0].min, consicutive[0].max)">
                                                        <rect id="a_m_lay_2" x="283" y="806" width="248" height="176" rx="6" stroke="#CD4E7E" stroke-width="4"></rect>
                                                        <text id="1.99_4" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em" dominant-baseline="middle" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(248, 283)" :y="getRectCenterCordinates(176, 806)">{{ consicutive[0].l }}</tspan>
                                                        </text>
                                                        <g id="a_m_lay_sus_box_2" v-if="consicutive[0].gstatus != 'OPEN'">
                                                            <rect id="a_m_l_sus_2" x="281" y="804" width="252" height="180" rx="8" fill="black" fill-opacity="0.3"></rect>
                                                            <path id="a_m_l_lock_2" d="M423.514 890.778H421.324V884.099C421.324 876.326 415.098 870 407.448 870C399.798 870 393.573 876.326 393.573 884.099V890.778H391.382C388.963 890.778 387 892.772 387 895.23V913.04C387 915.498 388.963 917.492 391.382 917.492H423.514C425.934 917.492 427.896 915.498 427.896 913.04V895.23C427.896 892.772 425.934 890.778 423.514 890.778ZM414.021 890.778H400.875V884.099C400.875 880.417 403.824 877.421 407.448 877.421C411.072 877.421 414.021 880.417 414.021 884.099V890.778Z" fill="white"></path>
                                                        </g>
                                                    </g>

                                                    <text id="10000_2" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="50" font-weight="bold" letter-spacing="0em" dominant-baseline="middle" text-anchor="middle">
                                                        <tspan x="268" y="1038.77" v-vcasinofancybook="{sid: consicutive[0].sid, subid: 0}">0</tspan>
                                                    </text>
                                                </g>
                                            </g>

                                            <g id="player_a_2">
                                                <g id="main_3">

                                                    <g id="back_3" style="cursor: pointer;"
                                                        @click="setBetData(main[1].nat + ' Main', main[1].b, mId, main[1].sid, main[1].subtype, 0, 'back', gameType, main[1].gstatus, main[1].min, main[1].max)">
                                                        <rect id="a_m_back_3" x="806" y="459" width="248" height="176" rx="6" stroke="#4F9CD2" stroke-width="4"></rect>
                                                        <text id="1.99_5" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em" dominant-baseline="middle" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(248, 806)"
                                                                :y="getRectCenterCordinates(176, 459)">{{ main[1].b }}</tspan>
                                                        </text>
                                                        <g id="a_m_back_sus_box_3" v-if="main[1].gstatus != 'OPEN'">
                                                            <rect id="a_m_b_sus_3" x="804" y="457" width="252" height="180" rx="8" fill="black" fill-opacity="0.3"></rect>
                                                            <path id="a_m_b_lock_3" d="M946.514 543.778H944.324V537.099C944.324 529.326 938.098 523 930.448 523C922.798 523 916.573 529.326 916.573 537.099V543.778H914.382C911.963 543.778 910 545.772 910 548.23V566.04C910 568.498 911.963 570.492 914.382 570.492H946.514C948.933 570.492 950.896 568.498 950.896 566.04V548.23C950.896 545.772 948.933 543.778 946.514 543.778ZM937.021 543.778H923.875V537.099C923.875 533.417 926.824 530.421 930.448 530.421C934.072 530.421 937.021 533.417 937.021 537.099V543.778Z" fill="white"></path>
                                                        </g>
                                                    </g>

                                                    <g id="lay_3" style="cursor: pointer;"
                                                        @click="setBetData(main[1].nat + ' Main', main[1].l, mId, main[1].sid, main[1].subtype, 0, 'lay', gameType, main[1].gstatus, main[1].min, main[1].max)">
                                                        <rect id="a_m_lay_3" x="1087" y="459" width="248" height="176" rx="6" stroke="#CD4E7E" stroke-width="4"></rect>
                                                        <text id="1.99_6" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em" dominant-baseline="middle" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(248, 1087)"
                                                                :y="getRectCenterCordinates(176, 459)">{{ main[1].l }}</tspan>
                                                        </text>
                                                        <g id="a_m_lay_sus_box_3" v-if="main[1].gstatus != 'OPEN'">
                                                            <rect id="a_m_l_sus_3" x="1085" y="457" width="252" height="180" rx="8" fill="black" fill-opacity="0.3"></rect>
                                                            <path id="a_m_l_lock_3" d="M1227.51 543.778H1225.32V537.099C1225.32 529.326 1219.1 523 1211.45 523C1203.8 523 1197.57 529.326 1197.57 537.099V543.778H1195.38C1192.96 543.778 1191 545.772 1191 548.23V566.04C1191 568.498 1192.96 570.492 1195.38 570.492H1227.51C1229.93 570.492 1231.9 568.498 1231.9 566.04V548.23C1231.9 545.772 1229.93 543.778 1227.51 543.778ZM1218.02 543.778H1204.88V537.099C1204.88 533.417 1207.82 530.421 1211.45 530.421C1215.07 530.421 1218.02 533.417 1218.02 537.099V543.778Z" fill="white"></path>
                                                        </g>
                                                    </g>

                                                    <text id="10000_3" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="50" font-weight="bold" letter-spacing="0em" dominant-baseline="middle" text-anchor="middle">
                                                        <tspan x="1070" y="691.773" v-vcasinobook="{sid: main[1].sid}">0</tspan>
                                                    </text>
                                                </g>

                                                <g id="main_4">

                                                    <g id="back_4" style="cursor: pointer;"
                                                        @click="setBetData(consicutive[1].nat + ' Consicutive', consicutive[1].b, mId, consicutive[1].sid, consicutive[1].subtype, 0, 'back', gameType, consicutive[1].gstatus, consicutive[1].min, consicutive[1].max)">
                                                        <rect id="a_m_back_4" x="806" y="806" width="248" height="176" rx="6" stroke="#4F9CD2" stroke-width="4"></rect>
                                                        <text id="1.99_7" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em" dominant-baseline="middle" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(248, 806)" :y="getRectCenterCordinates(176, 806)">{{ consicutive[1].b }}</tspan>
                                                        </text>
                                                        <g id="a_m_back_sus_box_4" v-if="consicutive[1].gstatus != 'OPEN'">
                                                            <rect id="a_m_b_sus_4" x="804" y="804" width="252" height="180" rx="8" fill="black" fill-opacity="0.3"></rect>
                                                            <path id="a_m_b_lock_4" d="M946.514 890.778H944.324V884.099C944.324 876.326 938.098 870 930.448 870C922.798 870 916.573 876.326 916.573 884.099V890.778H914.382C911.963 890.778 910 892.772 910 895.23V913.04C910 915.498 911.963 917.492 914.382 917.492H946.514C948.933 917.492 950.896 915.498 950.896 913.04V895.23C950.896 892.772 948.933 890.778 946.514 890.778ZM937.021 890.778H923.875V884.099C923.875 880.417 926.824 877.421 930.448 877.421C934.072 877.421 937.021 880.417 937.021 884.099V890.778Z" fill="white"></path>
                                                        </g>
                                                    </g>

                                                    <g id="lay_4" style="cursor: pointer;"
                                                        @click="setBetData(consicutive[1].nat + ' Consicutive', consicutive[1].l, mId, consicutive[1].sid, consicutive[1].subtype, 0, 'lay', gameType, consicutive[1].gstatus, consicutive[1].min, consicutive[1].max)">
                                                        <rect id="a_m_lay_4" x="1087" y="806" width="248" height="176" rx="6" stroke="#CD4E7E" stroke-width="4"></rect>
                                                        <text id="1.99_8" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em" dominant-baseline="middle" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(248, 1087)" :y="getRectCenterCordinates(176, 806)">{{ consicutive[1].l }}</tspan>
                                                        </text>
                                                        <g id="a_m_lay_sus_box_4" v-if="consicutive[1].gstatus != 'OPEN'">
                                                            <rect id="a_m_l_sus_4" x="1085" y="804" width="252" height="180" rx="8" fill="black" fill-opacity="0.3"></rect>
                                                            <path id="a_m_l_lock_4" d="M1227.51 890.778H1225.32V884.099C1225.32 876.326 1219.1 870 1211.45 870C1203.8 870 1197.57 876.326 1197.57 884.099V890.778H1195.38C1192.96 890.778 1191 892.772 1191 895.23V913.04C1191 915.498 1192.96 917.492 1195.38 917.492H1227.51C1229.93 917.492 1231.9 915.498 1231.9 913.04V895.23C1231.9 892.772 1229.93 890.778 1227.51 890.778ZM1218.02 890.778H1204.88V884.099C1204.88 880.417 1207.82 877.421 1211.45 877.421C1215.07 877.421 1218.02 880.417 1218.02 884.099V890.778Z" fill="white"></path>
                                                        </g>
                                                    </g>

                                                    <text id="10000_4" fill="black" x0ml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="50" font-weight="bold" letter-spacing="0em" dominant-baseline="middle" text-anchor="middle">
                                                        <tspan x="1070" y="1038.77" v-vcasinofancybook="{sid: consicutive[1].sid, subid: 0}">0</tspan>
                                                    </text>
                                                </g>
                                            </g>
                                        </g>

                                        <text id="MAIN" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="70" font-weight="bold" letter-spacing="0em">
                                            <tspan x="572.229" y="430.733">MAIN</tspan>
                                        </text>
                                        <text id="CONSECUTIVE" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="70" font-weight="bold" letter-spacing="0em">
                                            <tspan x="433.356" y="777.733">CONSECUTIVE</tspan>
                                        </text>

                                        <rect id="divider" x="0.150024" y="1100.45" width="1337.7" height="10.5538" fill="#6E4407"></rect>
                                        
                                        <g id="odd_even">
                                            <g id="odd">
                                                <text id="ODD" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="70" font-weight="bold" letter-spacing="0em">
                                                    <tspan x="593.031" y="1217.18">ODD</tspan>
                                                </text>
                                                <g id="odd_card_group">
                                                    <g id="odd_card1" style="cursor: pointer;"
                                                        @click="setBetData(oddEven[0].nat + ' ' + oddEven[0].odds[0].nat, oddEven[0].odds[0].b, mId, oddEven[0].sid, oddEven[0].subtype, oddEven[0].odds[0].sid, 'back', gameType, oddEven[0].gstatus, oddEven[0].min, oddEven[0].max)">
                                                        <rect id="odd_card1_box" x="2" y="1247" width="205" height="176" rx="6" stroke="#376D93" stroke-width="4"></rect>
                                                        <text id="1.99_9" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 2)" :y="getRectCenterCordinates(176, 1247)">{{ oddEven[0].odds[0].b }}</tspan>
                                                        </text>
                                                        <g id="odd_card1_sus_box" v-if="oddEven[0].gstatus != 'OPEN'">
                                                            <rect id="odd_card1_sus" y="1245" width="209" height="180" rx="8" fill="black" fill-opacity="0.3"></rect>
                                                            <path id="odd_card1_lock" d="M122.179 1292.19H119.768V1284.73C119.768 1276.06 112.917 1269 104.5 1269C96.0826 1269 89.2321 1276.06 89.2321 1284.73V1292.19H86.8214C84.1596 1292.19 82 1294.41 82 1297.16V1317.03C82 1319.77 84.1596 1322 86.8214 1322H122.179C124.84 1322 127 1319.77 127 1317.03V1297.16C127 1294.41 124.84 1292.19 122.179 1292.19ZM111.732 1292.19H97.2679V1284.73C97.2679 1280.62 100.512 1277.28 104.5 1277.28C108.488 1277.28 111.732 1280.62 111.732 1284.73V1292.19Z" fill="white"></path>
                                                        </g>
                                                        <text id="10000_5" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="50" font-weight="bold" letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 2)"
                                                                :y="getRectCenterCordinates(176, 1277)"
                                                                :class="{'suspended-book' : oddEven[0].gstatus != 'OPEN'}"
                                                                v-vcasinofancybook="{sid: oddEven[0].sid, subid: oddEven[0].odds[0].sid}">0</tspan>
                                                        </text>
                                                    </g>

                                                    <g id="odd_card1_2" style="cursor: pointer;"
                                                        @click="setBetData(oddEven[1].nat + ' ' + oddEven[1].odds[0].nat, oddEven[1].odds[0].b, mId, oddEven[1].sid, oddEven[1].subtype, oddEven[1].odds[0].sid, 'back', gameType, oddEven[1].gstatus, oddEven[1].min, oddEven[1].max)">
                                                        <rect id="odd_card1_box_2" x="231" y="1247" width="205" height="176" rx="6" stroke="#376D93" stroke-width="4"></rect>
                                                        <text id="1.99_10" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em"  dominant-baseline="text-top" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 231)" :y="getRectCenterCordinates(176, 1247)">{{ oddEven[1].odds[0].b }}</tspan>
                                                        </text>
                                                        <g id="odd_card1_sus_box_2" v-if="oddEven[1].gstatus != 'OPEN'">
                                                            <rect id="odd_card1_sus_2" x="229" y="1245" width="209" height="180" rx="8" fill="black" fill-opacity="0.3"></rect>
                                                            <path id="odd_card1_lock_2" d="M351.179 1292.19H348.768V1284.73C348.768 1276.06 341.917 1269 333.5 1269C325.083 1269 318.232 1276.06 318.232 1284.73V1292.19H315.821C313.16 1292.19 311 1294.41 311 1297.16V1317.03C311 1319.77 313.16 1322 315.821 1322H351.179C353.84 1322 356 1319.77 356 1317.03V1297.16C356 1294.41 353.84 1292.19 351.179 1292.19ZM340.732 1292.19H326.268V1284.73C326.268 1280.62 329.512 1277.28 333.5 1277.28C337.488 1277.28 340.732 1280.62 340.732 1284.73V1292.19Z" fill="white"></path>
                                                        </g>
                                                        <text id="10000_6" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="50" font-weight="bold" letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 231)"
                                                                :y="getRectCenterCordinates(176, 1277)"
                                                                :class="{'suspended-book' : oddEven[1].gstatus != 'OPEN'}"
                                                                v-vcasinofancybook="{sid: oddEven[1].sid, subid: oddEven[1].odds[0].sid}">0</tspan>
                                                        </text>
                                                    </g>

                                                    <g id="odd_card1_3" style="cursor: pointer;"
                                                        @click="setBetData(oddEven[2].nat + ' ' + oddEven[2].odds[0].nat, oddEven[2].odds[0].b, mId, oddEven[2].sid, oddEven[2].subtype, oddEven[2].odds[0].sid, 'back', gameType, oddEven[2].gstatus, oddEven[2].min, oddEven[2].max)">
                                                        <rect id="odd_card1_box_3" x="460" y="1247" width="205" height="176" rx="6" stroke="#376D93" stroke-width="4"></rect>
                                                        <text id="1.99_11" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 460)" :y="getRectCenterCordinates(176, 1247)">{{ oddEven[2].odds[0].b }}</tspan>
                                                        </text>
                                                        <g id="odd_card1_sus_box_3" v-if="oddEven[2].gstatus != 'OPEN'">
                                                            <rect id="odd_card1_sus_3" x="458" y="1245" width="209" height="180" rx="8" fill="black" fill-opacity="0.3"></rect>
                                                            <path id="odd_card1_lock_3" d="M580.179 1292.19H577.768V1284.73C577.768 1276.06 570.917 1269 562.5 1269C554.083 1269 547.232 1276.06 547.232 1284.73V1292.19H544.821C542.16 1292.19 540 1294.41 540 1297.16V1317.03C540 1319.77 542.16 1322 544.821 1322H580.179C582.84 1322 585 1319.77 585 1317.03V1297.16C585 1294.41 582.84 1292.19 580.179 1292.19ZM569.732 1292.19H555.268V1284.73C555.268 1280.62 558.512 1277.28 562.5 1277.28C566.488 1277.28 569.732 1280.62 569.732 1284.73V1292.19Z" fill="white"></path>
                                                        </g>
                                                        <text id="10000_7" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="50" font-weight="bold" letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 460)"
                                                                :y="getRectCenterCordinates(176, 1277)"
                                                                :class="{'suspended-book' : oddEven[2].gstatus != 'OPEN'}"
                                                                v-vcasinofancybook="{sid: oddEven[2].sid, subid: oddEven[2].odds[0].sid}">0</tspan>
                                                        </text>
                                                    </g>

                                                    <g id="odd_card1_4" style="cursor: pointer;"
                                                        @click="setBetData(oddEven[3].nat + ' ' + oddEven[3].odds[0].nat, oddEven[3].odds[0].b, mId, oddEven[3].sid, oddEven[3].subtype, oddEven[3].odds[0].sid, 'back', gameType, oddEven[3].gstatus, oddEven[3].min, oddEven[3].max)">
                                                        <rect id="odd_card1_box_4" x="689" y="1247" width="205" height="176" rx="6" stroke="#376D93" stroke-width="4"></rect>
                                                        <text id="1.99_12" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 689)" :y="getRectCenterCordinates(176, 1247)">{{ oddEven[3].odds[0].b }}</tspan>
                                                        </text>
                                                        <g id="odd_card1_sus_box_4" v-if="oddEven[3].gstatus != 'OPEN'">
                                                            <rect id="odd_card1_sus_4" x="687" y="1245" width="209" height="180" rx="8" fill="black" fill-opacity="0.3"></rect>
                                                            <path id="odd_card1_lock_4" d="M809.179 1292.19H806.768V1284.73C806.768 1276.06 799.917 1269 791.5 1269C783.083 1269 776.232 1276.06 776.232 1284.73V1292.19H773.821C771.16 1292.19 769 1294.41 769 1297.16V1317.03C769 1319.77 771.16 1322 773.821 1322H809.179C811.84 1322 814 1319.77 814 1317.03V1297.16C814 1294.41 811.84 1292.19 809.179 1292.19ZM798.732 1292.19H784.268V1284.73C784.268 1280.62 787.512 1277.28 791.5 1277.28C795.488 1277.28 798.732 1280.62 798.732 1284.73V1292.19Z" fill="white"></path>
                                                        </g>
                                                        <text id="10000_8" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="50" font-weight="bold" letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle"> 
                                                            <tspan :x="getRectCenterCordinates(205, 689)"
                                                                :y="getRectCenterCordinates(176, 1277)"
                                                                :class="{'suspended-book' : oddEven[3].gstatus != 'OPEN'}"
                                                                v-vcasinofancybook="{sid: oddEven[3].sid, subid: oddEven[3].odds[0].sid}">0</tspan>
                                                        </text>
                                                    </g>

                                                    <g id="odd_card1_5" style="cursor: pointer;"
                                                        @click="setBetData(oddEven[4].nat + ' ' + oddEven[4].odds[0].nat, oddEven[4].odds[0].b, mId, oddEven[4].sid, oddEven[4].subtype, oddEven[4].odds[0].sid, 'back', gameType, oddEven[4].gstatus, oddEven[4].min, oddEven[4].max)">
                                                        <rect id="odd_card1_box_5" x="918" y="1247" width="205" height="176" rx="6" stroke="#376D93" stroke-width="4"></rect>
                                                        <text id="1.99_13" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 918)" :y="getRectCenterCordinates(176, 1247)">{{ oddEven[4].odds[0].b }}</tspan>
                                                        </text>
                                                        <g id="odd_card1_sus_box_5" v-if="oddEven[4].gstatus != 'OPEN'">
                                                            <rect id="odd_card1_sus_5" x="916" y="1245" width="209" height="180" rx="8" fill="black" fill-opacity="0.3"></rect>
                                                            <path id="odd_card1_lock_5" d="M1038.18 1292.19H1035.77V1284.73C1035.77 1276.06 1028.92 1269 1020.5 1269C1012.08 1269 1005.23 1276.06 1005.23 1284.73V1292.19H1002.82C1000.16 1292.19 998 1294.41 998 1297.16V1317.03C998 1319.77 1000.16 1322 1002.82 1322H1038.18C1040.84 1322 1043 1319.77 1043 1317.03V1297.16C1043 1294.41 1040.84 1292.19 1038.18 1292.19ZM1027.73 1292.19H1013.27V1284.73C1013.27 1280.62 1016.51 1277.28 1020.5 1277.28C1024.49 1277.28 1027.73 1280.62 1027.73 1284.73V1292.19Z" fill="white"></path>
                                                        </g>
                                                        <text id="10000_9" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="50" font-weight="bold" letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 918)"
                                                                :y="getRectCenterCordinates(176, 1277)"
                                                                :class="{'suspended-book' : oddEven[4].gstatus != 'OPEN'}"
                                                                v-vcasinofancybook="{sid: oddEven[4].sid, subid: oddEven[4].odds[0].sid}">0</tspan>
                                                        </text>
                                                    </g>

                                                    <g id="odd_card1_6" style="cursor: pointer;"
                                                        @click="setBetData(oddEven[5].nat + ' ' + oddEven[5].odds[0].nat, oddEven[5].odds[0].b, mId, oddEven[5].sid, oddEven[5].subtype, oddEven[5].odds[0].sid, 'back', gameType, oddEven[5].gstatus, oddEven[5].min, oddEven[5].max)">
                                                        <rect id="odd_card1_box_6" x="1147" y="1247" width="205" height="176" rx="6" stroke="#376D93" stroke-width="4"></rect>
                                                        <text id="1.99_14" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 1147)" :y="getRectCenterCordinates(176, 1247)">{{ oddEven[5].odds[0].b }}</tspan>
                                                        </text>
                                                        <g id="odd_card1_sus_box_6" v-if="oddEven[5].gstatus != 'OPEN'">
                                                            <rect id="odd_card1_sus_6" x="1145" y="1245" width="209" height="180" rx="8" fill="black" fill-opacity="0.3"></rect>
                                                            <path id="odd_card1_lock_6" d="M1267.18 1292.19H1264.77V1284.73C1264.77 1276.06 1257.92 1269 1249.5 1269C1241.08 1269 1234.23 1276.06 1234.23 1284.73V1292.19H1231.82C1229.16 1292.19 1227 1294.41 1227 1297.16V1317.03C1227 1319.77 1229.16 1322 1231.82 1322H1267.18C1269.84 1322 1272 1319.77 1272 1317.03V1297.16C1272 1294.41 1269.84 1292.19 1267.18 1292.19ZM1256.73 1292.19H1242.27V1284.73C1242.27 1280.62 1245.51 1277.28 1249.5 1277.28C1253.49 1277.28 1256.73 1280.62 1256.73 1284.73V1292.19Z" fill="white"></path>
                                                        </g>
                                                        <text id="10000_10" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="50" font-weight="bold" letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 1147)"
                                                                :y="getRectCenterCordinates(205, 1257)"
                                                                :class="{'suspended-book' : oddEven[5].gstatus != 'OPEN'}"
                                                                v-vcasinofancybook="{sid: oddEven[5].sid, subid: oddEven[5].odds[0].sid}">0</tspan>
                                                        </text>
                                                    </g>
                                                </g>
                                            </g>


                                            <g id="odd_2">
                                                <text id="EVEN" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="70" font-weight="bold" letter-spacing="0em">
                                                    <tspan x="580.487" y="1535.18">EVEN</tspan>
                                                </text>

                                                <g id="odd_card_group_2">
                                                    <g id="odd_card1_7" style="cursor: pointer;"
                                                        @click="setBetData(oddEven[0].nat + ' ' + oddEven[0].odds[1].nat, oddEven[0].odds[1].b, mId, oddEven[0].sid, oddEven[0].subtype, oddEven[0].odds[1].sid, 'back', gameType, oddEven[0].gstatus, oddEven[0].min, oddEven[0].max)">
                                                        <rect id="odd_card1_box_7" x="2" y="1565" width="205" height="176" rx="6" stroke="#376D93" stroke-width="4"></rect>
                                                        <text id="1.99_15" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em"  dominant-baseline="text-top" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 2)" :y="getRectCenterCordinates(176, 1565)">{{ oddEven[0].odds[1].b }}</tspan>
                                                        </text>
                                                        <g id="odd_card1_sus_box_7" v-if="oddEven[0].gstatus != 'OPEN'">
                                                            <rect id="odd_card1_sus_7" y="1563" width="209" height="180" rx="8" fill="black" fill-opacity="0.3"></rect>
                                                            <path id="odd_card1_lock_7" d="M122.179 1610.19H119.768V1602.73C119.768 1594.06 112.917 1587 104.5 1587C96.0826 1587 89.2321 1594.06 89.2321 1602.73V1610.19H86.8214C84.1596 1610.19 82 1612.41 82 1615.16V1635.03C82 1637.77 84.1596 1640 86.8214 1640H122.179C124.84 1640 127 1637.77 127 1635.03V1615.16C127 1612.41 124.84 1610.19 122.179 1610.19ZM111.732 1610.19H97.2679V1602.73C97.2679 1598.62 100.512 1595.28 104.5 1595.28C108.488 1595.28 111.732 1598.62 111.732 1602.73V1610.19Z" fill="white"></path>
                                                        </g>
                                                        <text id="10000_11" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="50" font-weight="bold" letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 2)"
                                                                :y="getRectCenterCordinates(176, 1585)"
                                                                :class="{'suspended-book' : oddEven[0].gstatus != 'OPEN'}"
                                                                v-vcasinofancybook="{sid: oddEven[0].sid, subid: oddEven[0].odds[1].sid}">0</tspan>
                                                        </text>
                                                    </g>

                                                    <g id="odd_card1_8" style="cursor: pointer;"
                                                        @click="setBetData(oddEven[1].nat + ' ' + oddEven[1].odds[1].nat, oddEven[1].odds[1].b, mId, oddEven[1].sid, oddEven[1].subtype, oddEven[1].odds[1].sid, 'back', gameType, oddEven[1].gstatus, oddEven[1].min, oddEven[1].max)">
                                                        <rect id="odd_card1_box_8" x="231" y="1565" width="205" height="176" rx="6" stroke="#376D93" stroke-width="4"></rect>
                                                        <text id="1.99_16" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em"  dominant-baseline="text-top" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 231)" :y="getRectCenterCordinates(176, 1565)">{{ oddEven[1].odds[1].b }}</tspan>
                                                        </text>
                                                        <g id="odd_card1_sus_box_8" v-if="oddEven[1].gstatus != 'OPEN'">
                                                            <rect id="odd_card1_sus_8" x="229" y="1563" width="209" height="180" rx="8" fill="black" fill-opacity="0.3"></rect>
                                                            <path id="odd_card1_lock_8" d="M351.179 1610.19H348.768V1602.73C348.768 1594.06 341.917 1587 333.5 1587C325.083 1587 318.232 1594.06 318.232 1602.73V1610.19H315.821C313.16 1610.19 311 1612.41 311 1615.16V1635.03C311 1637.77 313.16 1640 315.821 1640H351.179C353.84 1640 356 1637.77 356 1635.03V1615.16C356 1612.41 353.84 1610.19 351.179 1610.19ZM340.732 1610.19H326.268V1602.73C326.268 1598.62 329.512 1595.28 333.5 1595.28C337.488 1595.28 340.732 1598.62 340.732 1602.73V1610.19Z" fill="white"></path>
                                                        </g>
                                                        <text id="10000_12" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="50" font-weight="bold" letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 231)"
                                                                :y="getRectCenterCordinates(176, 1585)"
                                                                :class="{'suspended-book' : oddEven[1].gstatus != 'OPEN'}"
                                                                v-vcasinofancybook="{sid: oddEven[1].sid, subid: oddEven[1].odds[1].sid}">0</tspan>
                                                        </text>
                                                    </g>

                                                    <g id="odd_card1_9" style="cursor: pointer;"
                                                        @click="setBetData(oddEven[2].nat + ' ' + oddEven[2].odds[1].nat, oddEven[2].odds[1].b, mId, oddEven[2].sid, oddEven[2].subtype, oddEven[2].odds[1].sid, 'back', gameType, oddEven[2].gstatus, oddEven[2].min, oddEven[2].max)">
                                                        <rect id="odd_card1_box_9" x="460" y="1565" width="205" height="176" rx="6" stroke="#376D93" stroke-width="4"></rect>
                                                        <text id="1.99_17" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 460)" :y="getRectCenterCordinates(176, 1565)">{{ oddEven[2].odds[1].b }}</tspan>
                                                        </text>
                                                        <g id="odd_card1_sus_box_9" v-if="oddEven[2].gstatus != 'OPEN'">
                                                            <rect id="odd_card1_sus_9" x="458" y="1563" width="209" height="180" rx="8" fill="black" fill-opacity="0.3"></rect>
                                                            <path id="odd_card1_lock_9" d="M580.179 1610.19H577.768V1602.73C577.768 1594.06 570.917 1587 562.5 1587C554.083 1587 547.232 1594.06 547.232 1602.73V1610.19H544.821C542.16 1610.19 540 1612.41 540 1615.16V1635.03C540 1637.77 542.16 1640 544.821 1640H580.179C582.84 1640 585 1637.77 585 1635.03V1615.16C585 1612.41 582.84 1610.19 580.179 1610.19ZM569.732 1610.19H555.268V1602.73C555.268 1598.62 558.512 1595.28 562.5 1595.28C566.488 1595.28 569.732 1598.62 569.732 1602.73V1610.19Z" fill="white"></path>
                                                        </g>
                                                        <text id="10000_13" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="50" font-weight="bold" letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 460)"
                                                                :y="getRectCenterCordinates(176, 1585)"
                                                                :class="{'suspended-book' : oddEven[2].gstatus != 'OPEN'}"
                                                                v-vcasinofancybook="{sid: oddEven[2].sid, subid: oddEven[2].odds[1].sid}">0</tspan>
                                                        </text>
                                                    </g>

                                                    <g id="odd_card1_10" style="cursor: pointer;"
                                                        @click="setBetData(oddEven[3].nat + ' ' + oddEven[3].odds[1].nat, oddEven[3].odds[1].b, mId, oddEven[3].sid, oddEven[3].subtype, oddEven[3].odds[1].sid, 'back', gameType, oddEven[3].gstatus, oddEven[3].min, oddEven[3].max)">
                                                        <rect id="odd_card1_box_10" x="689" y="1565" width="205" height="176" rx="6" stroke="#376D93" stroke-width="4"></rect>
                                                        <text id="1.99_18" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em"  dominant-baseline="text-top" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 689)" :y="getRectCenterCordinates(176, 1565)">{{ oddEven[3].odds[1].b }}</tspan>
                                                        </text>
                                                        <g id="odd_card1_sus_box_10" v-if="oddEven[3].gstatus != 'OPEN'">
                                                            <rect id="odd_card1_sus_10" x="687" y="1563" width="209" height="180" rx="8" fill="black" fill-opacity="0.3"></rect>
                                                            <path id="odd_card1_lock_10" d="M809.179 1610.19H806.768V1602.73C806.768 1594.06 799.917 1587 791.5 1587C783.083 1587 776.232 1594.06 776.232 1602.73V1610.19H773.821C771.16 1610.19 769 1612.41 769 1615.16V1635.03C769 1637.77 771.16 1640 773.821 1640H809.179C811.84 1640 814 1637.77 814 1635.03V1615.16C814 1612.41 811.84 1610.19 809.179 1610.19ZM798.732 1610.19H784.268V1602.73C784.268 1598.62 787.512 1595.28 791.5 1595.28C795.488 1595.28 798.732 1598.62 798.732 1602.73V1610.19Z" fill="white"></path>
                                                        </g>
                                                        <text id="10000_14" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="50" font-weight="bold" letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle"> 
                                                            <tspan :x="getRectCenterCordinates(205, 689)"
                                                                :y="getRectCenterCordinates(176, 1585)"
                                                                :class="{'suspended-book' : oddEven[3].gstatus != 'OPEN'}"
                                                                v-vcasinofancybook="{sid: oddEven[3].sid, subid: oddEven[3].odds[1].sid}">0</tspan>
                                                        </text>
                                                    </g>

                                                    <g id="odd_card1_11" style="cursor: pointer;"
                                                        @click="setBetData(oddEven[4].nat + ' ' + oddEven[4].odds[1].nat, oddEven[4].odds[1].b, mId, oddEven[4].sid, oddEven[4].subtype, oddEven[4].odds[1].sid, 'back', gameType, oddEven[4].gstatus, oddEven[4].min, oddEven[4].max)">
                                                        <rect id="odd_card1_box_11" x="918" y="1565" width="205" height="176" rx="6" stroke="#376D93" stroke-width="4"></rect>
                                                        <text id="1.99_19" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em"  dominant-baseline="text-top" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 918)" :y="getRectCenterCordinates(176, 1565)">{{ oddEven[4].odds[1].b }}</tspan>
                                                        </text>
                                                        <g id="odd_card1_sus_box_11" v-if="oddEven[4].gstatus != 'OPEN'">
                                                            <rect id="odd_card1_sus_11" x="916" y="1563" width="209" height="180" rx="8" fill="black" fill-opacity="0.3"></rect>
                                                            <path id="odd_card1_lock_11" d="M1038.18 1610.19H1035.77V1602.73C1035.77 1594.06 1028.92 1587 1020.5 1587C1012.08 1587 1005.23 1594.06 1005.23 1602.73V1610.19H1002.82C1000.16 1610.19 998 1612.41 998 1615.16V1635.03C998 1637.77 1000.16 1640 1002.82 1640H1038.18C1040.84 1640 1043 1637.77 1043 1635.03V1615.16C1043 1612.41 1040.84 1610.19 1038.18 1610.19ZM1027.73 1610.19H1013.27V1602.73C1013.27 1598.62 1016.51 1595.28 1020.5 1595.28C1024.49 1595.28 1027.73 1598.62 1027.73 1602.73V1610.19Z" fill="white"></path>
                                                        </g>
                                                        <text id="10000_15" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="50" font-weight="bold" letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 918)"
                                                                :y="getRectCenterCordinates(176, 1585)"
                                                                :class="{'suspended-book' : oddEven[4].gstatus != 'OPEN'}"
                                                                v-vcasinofancybook="{sid: oddEven[4].sid, subid: oddEven[4].odds[1].sid}">0</tspan>
                                                        </text>
                                                    </g>

                                                    <g id="odd_card1_12" style="cursor: pointer;"
                                                        @click="setBetData(oddEven[5].nat + ' ' + oddEven[5].odds[1].nat, oddEven[5].odds[1].b, mId, oddEven[5].sid, oddEven[5].subtype, oddEven[5].odds[1].sid, 'back', gameType, oddEven[5].gstatus, oddEven[5].min, oddEven[5].max)">
                                                        <rect id="odd_card1_box_12" x="1147" y="1565" width="205" height="176" rx="6" stroke="#376D93" stroke-width="4"></rect>
                                                        <text id="1.99_20" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="80" font-weight="bold" letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 1147)" :y="getRectCenterCordinates(176, 1565)">{{ oddEven[5].odds[1].b }}</tspan>
                                                        </text>
                                                        <g id="odd_card1_sus_box_12" v-if="oddEven[5].gstatus != 'OPEN'">
                                                            <rect id="odd_card1_sus_12" x="1145" y="1563" width="209" height="180" rx="8" fill="black" fill-opacity="0.3"></rect>
                                                            <path id="odd_card1_lock_12" d="M1267.18 1610.19H1264.77V1602.73C1264.77 1594.06 1257.92 1587 1249.5 1587C1241.08 1587 1234.23 1594.06 1234.23 1602.73V1610.19H1231.82C1229.16 1610.19 1227 1612.41 1227 1615.16V1635.03C1227 1637.77 1229.16 1640 1231.82 1640H1267.18C1269.84 1640 1272 1637.77 1272 1635.03V1615.16C1272 1612.41 1269.84 1610.19 1267.18 1610.19ZM1256.73 1610.19H1242.27V1602.73C1242.27 1598.62 1245.51 1595.28 1249.5 1595.28C1253.49 1595.28 1256.73 1598.62 1256.73 1602.73V1610.19Z" fill="white"></path>
                                                        </g>
                                                        <text id="10000_16" fill="black" xml:space="preserve" style="white-space: pre" font-family="Droid Sans" font-size="50" font-weight="bold" letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle">
                                                            <tspan :x="getRectCenterCordinates(205, 1147)"
                                                                :y="getRectCenterCordinates(176, 1585)"
                                                                :class="{'suspended-book' : oddEven[5].gstatus != 'OPEN'}"
                                                                v-vcasinofancybook="{sid: oddEven[5].sid, subid: oddEven[5].odds[1].sid}">0</tspan>
                                                        </text>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </template>

                                </g>
                                <defs>
                                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                        <use xlink:href="#image0" transform="scale(0.02 0.0142857)"></use>
                                    </pattern>
                                    <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
                                        <use xlink:href="#image0" transform="scale(0.02 0.0142857)"></use>
                                    </pattern>
                                    <pattern id="pattern2" patternContentUnits="objectBoundingBox" width="1" height="1">
                                        <use xlink:href="#image0" transform="scale(0.02 0.0142857)"></use>
                                    </pattern>
                                    <pattern id="pattern3" patternContentUnits="objectBoundingBox" width="1" height="1">
                                        <use xlink:href="#image0" transform="scale(0.02 0.0142857)"></use>
                                    </pattern>
                                    <pattern id="pattern4" patternContentUnits="objectBoundingBox" width="1" height="1">
                                        <use xlink:href="#image0" transform="scale(0.02 0.0142857)"></use>
                                    </pattern>
                                    <pattern id="pattern5" patternContentUnits="objectBoundingBox" width="1" height="1">
                                        <use xlink:href="#image0" transform="scale(0.02 0.0142857)"></use>
                                    </pattern>
                                    <image id="image0" data-name="2CC.png" width="50" height="70" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABGCAIAAAAB7lAxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTAzRDhCQ0Y4N0NDMTFFQkFERTFCNDQ1QTM0RjExRUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTAzRDhCQ0U4N0NDMTFFQkFERTFCNDQ1QTM0RjExRUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4QzAxMUVGODEyQTkxMUVCQjk5MkNERjYyQ0I3MTlCQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QzAxMUVGOTEyQTkxMUVCQjk5MkNERjYyQ0I3MTlCQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmCMvh0AAAovSURBVHjaxJpZSFVfG8b1ZP/KNG1Qy+ZQiqLABqQsohsbpMFKgwYQpYsiSoMKiuimwUoIiUAIiS4aKDPIiqabRmi2FKOBBrLJBm2e6//T5+v9Nkfz7HM8fN+62Oyz99prPet93/W8wzqhX79+/fjx448fP1q3bh0SEvLz58/Q0NCQv7ffv397PB6udKMz9zzk/ndD07168jYsLOzXr1/ND6hGN09D475t27aeT58+aXQG5Z3P7zWHvtdAPNGHnj9NoLUGkDG+y2EZh85fvnzxfP/+PbShhbhuwiHZSCrct2rViuvPhibhIX69+ueff1zC+q+Y+VgT6Kq1Nq9EWmRkJDhM8r8amiTHW5aLEnhCH8yDq/s1a9gwA2SzNglF83GNiIho06ZNXV1dVVVVRUXFkydPHj58WF5eHhMTk5KSEhcXl5SUNGzYsC5durx588YMzqUGpLd6eb969UovJCczCy/xyn6jo6Nramp27ty5a9euGzdu/G2O9PT0vLy8MWPGfPjw4du3b3zrU2Batm4QcOjr1699LkX2wWq2b9++bds2xOM1lteqtFvpnJ2djcyc3VxKzuNG2ZqVRR85ckSYeCgc2pKGrH7EP3szJyentLS0U6dOrD7En1Y/rM9ODKp9ywQTJkywzSJSME6R1QsQoNE4D9esWfPy5csOHTqE+Nk8rjp5PLAuVjJr1qz4+HieYPWZmZlY2Llz5yorK8+cObN58+YePXqIOAAtCfEKgdHZLwKihblkFCb7/Plzr169UlNTb926VVhYmJycLCGBAMvDwHmVlpZWXV0tS0Jm4Lt+/bq2CwQZTFiSFvTGuOystWvXtm/fni2JLUtrvOU53YYMGbJgwYJVq1bJxqVfUL5//x7cfsFypUSRNdOjx86dO+OzRCvIwzyP2tChQ70om52OAfjFqG6lZdOADPo2nyg6kD1pYnNtRgrIVQ47+CbvM6Aw3A8ePDA+08O+fftGRUX5yxEthWUSwnpQVllZmRGYpDVo0CCk9b+AZRqRvUsw7API9ujRo+ogTFDG+PHjweQXywcCy0trimRgWmhzxYoVwiq43M+YMSMhIeHdu3f+zhIWgMpobEmL+Dp27AilLVy48N69e4YYrImJiQDllb8+MUAlKuZUoBceHs790qVLS0pKbIcqHM3Pz+/WrRsG5y+mAKUl68GlAKtdu3bLli0rKiriocJRWd66deumT59eW1srO3N69OBIy2utom/AQVTCVFBQIDnJW3PPw+XLlytLoKfcdpClZXtN+JgDwyIogBFyc3NxjoZJ/bOysjZu3AggrMqCsODDclI20xCnY+P8ZHrCVJG7AnmuixYtAhOMgB80xVneFkwlGjmJfmJjY7HiuXPngskoSpolutq6dSseU7tPoqX5i8kPJcqikdOLFy8yMjLOnj0ro1GQSEJRXFw8ZcoU9XfGfbxlGdiZfzmfz1j+P6lIaCiYiJjnzZt34cIFZ+zAdfTo0dOmTSM7hzn1ijCGZSga49WIESMQYZBtC6kggCtXrjDBs2fPLLXXVuDt+fPnCVP/NgLemiAxyLAscbh58yaYbNNZ0tt4r5k5qifWFnzbQgsiHsMhKzFbaZxaWl7ZJOjgwGJ0zYrlNpN2N7ke3ejD4PMWVgxdkcXDnzC7zwqMyiQKWeFecn8+98/FOXdik65ejpmdFRkZiR8MwLWDDHb1iyDCLB4njpMkmmQ/IUYv2gGW23jVtyQkr7IPqyIga56DECfpk00dps/gmPLy8oqKCpD9LU+0LaYwwZIZ7U0DZL7IWRxsxup5hSoGDBgwePDgX39aCOke2RXviJlC/n8tJycHDIS4gMGu6r2HFgQRw5YxMTE+y24W7kmVCA9h84ShrGbknhSUr48bN075rUw5FGlpD2PRmJdLmrHQuUlP7G9WyFAgw7ZUrqrnPJm8Akv2i5vCsJWQWAYSOnHiBJ6HQB6HTb4/derUuLg4pgG0y91ndR453/pthCLNx7mp7Zo4yfqvXbu2ePFiPLdTwGBavXo1GQfIcN6KY11q01CGOauDbmxCNoRgKisr09LSnj9/7sV5RD4Eg1gFewhY2qd+kVa9Kvx1WPSHVLGD9evXg0lhTONZCQmvXr2qDRSATwwkIcMw7969e+jQIWcR2umwVVo6duyYHvpbrgkwq0ZaxF4oqHGl3yo5XLE5okKr+wcflpf90Zz5u1NOTgTgxqp0lGSqdKlTj/s9ImPXz4SEBC97cuZeklnv3r1xZdCE1/mUl4CDkL5qPnY+/qtnz55GOTw3A7K6CIEycSncLU7SQ+xSLr95ZK4SMhOS8Xu/fv3mzJljhK5Uwur1QOnfv//kyZOlRBoyk64VgyhwbWnmo+VGRERoOAXEuIRRo0bBXs7k1vS4f//+mTNnKhzQVzposVSgeWn5hqVxo6Ojnz59evr06Tt37vAJyRnCYKb09PS6ujrTr6aE5bOzsw8fPnz//n3WQ+aTnJxMjCrHp0StRXmi6ADLLSwsLCgoIPNxvp09ezbX3bt3WxzGT6YfOXLkgQMHnJ2BwgIYoXv37oQussVm9OgDFh9HRUVt2LBh5cqVdv5jsTyjd+3ataamxo6SlWF/amgiUhXP1Z/YCREiaWTWvG35MPnw8PDLly/jZ5xRqFJWBMANmnVyPX0QhorkzghH62GooqIiMVmLCIIhWJ8OKSR5m0mVEjpot9u5sIqXSi3Nuk2cpaWleFKfqYpvgrh9+7YNbed1ogNnwG4PJTyjTTty182jR4+cqUTgsJzlbmdIJIEp524cGv3N2yg2bDIR9w8W4Z5N5uRMKw7ykNCP3Yq3IfL28tlWj5B5qYzo86De49PzpKSkmNlKMGY6pqP58+fzMCsrKzEx0TmfVzrJE1IJtrbz/wqBwCKrTE1NHThwoNM/4lukC9Wx8I/QPRaDwCZNmhTi+AuH8/RaPhv2QmA+q3A+YMHLsbGxmzZtQlQg0KZTRGp1ovz8fHiEG7KMvLy8pKQky0JNleqJOMn5VJprkbRo+BZi9j179sTHx2sCK7736tVr7969SIhAlJ+4JmyrrKxs7NixXtsFfEuWLMFVsDDEJofdIp+ofBKDePz48b59+4hL3759y0+kkpmZiZkjuYkTJ4KMmS5evDh8+HDyC9ju+PHj+B++7dOnT0ZGBoq2QoPP4xZX/4NQI3iSsqzJ71ZXV2PIgObJli1bcnNzSYlx7c7NqANl51+Cgna48qWh6a8adhZHtHPq1ClhoiEzYDF3bW2tEm75RMPhMq4PJPMRJtWeyAp37Nhhr06ePHnw4EGcsbYI2vTJBcGBZbVaZIY8SkpKLl26hKnxEzQ8Ly4uRlRo3Kqb/v4Jwj/bajJkraqqUrCKPUFI+GCiVkgViBKq8zjIj/EVlHn5vuY3plUDaegRKFbYUF4PMqf3dKlEp9cPhZacR35u8jivmZxAAy67OfOAep+Lx7CjQJd/D2x8OOBXna3JZhSt0/h/BRgAtixg0JQEx/gAAAAASUVORK5CYII="></image>
                                </defs>
                            </svg>
                            <!-- ODDS SVG END -->
                        </div>
                    </div>
                    <!-- MOBILE ODDS END -->
                </div>
                <!-- MOBILE BG END -->

            </div>
        </template>
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

    import {
        Howl,
        Howler
    } from 'howler';

    var backgroundMusic;
    var cardSuffle = new Howl({
        src: [`${IMG_PATH}front/sounds/cards_mix.mp3`]
    });
    var cardFlip = new Howl({
        src: [`${IMG_PATH}front/sounds/card_flip.mp3`]
    });
    var winnerMusic = new Howl({
        src: [`${IMG_PATH}front/sounds/winner.mp3`],
        volume: 0.08,
    });

    var PlacebetTimer, deckLength = 20;

    export default {
        mounted() {
            backgroundMusic = new Howl({
                src: [`${IMG_PATH}front/sounds/music.mp3`],
                autoplay: true,
                loop: true,
                volume: 0.1,
            });

            if (localStorage.getItem("sound")) {
                this.sound = JSON.parse(localStorage.getItem("sound"))
                if (!this.sound.otherSound) {
                    cardSuffle.mute(true)
                    cardFlip.mute(true)
                    winnerMusic.mute(true)
                }
                if (!this.sound.bgMusic) {
                    backgroundMusic.mute(true)
                }
            } else {
                localStorage.setItem("sound", JSON.stringify(this.sound));
            }

            this.$store.state.casinoGameType = this.gameType
            this.getButtonListCs()
            this.getCasinoRules()
            this.getCasinoData()
            this.getLastResults()

            setTimeout(() => {
                const endAnimationCenterLeft = document.querySelectorAll('.cards-block .flip-card');
                endAnimationCenterLeft[3].addEventListener('animationstart', (e) => {
                    if (e.animationName == 'flip-card4') {
                        this.rightDecks.pop();
                    }
                });
            }, 5000)

            setTimeout(() => {
                const endAnimationCenterLeft = document.querySelector('.empty-card-in-deck-right');
                endAnimationCenterLeft.addEventListener('animationend', (e) => {
                    if (e.animationName == 'add-new-deck-animation') {
                        this.finishedRightDeck = false
                    }
                });
                endAnimationCenterLeft.addEventListener('animationstart', (e) => {
                    if (e.animationName == 'add-new-deck-animation') {
                        console.log('suffle start')
                        cardSuffle.play();
                    }
                });
            }, 5000)

            setTimeout(() => {
                const endAnimationCenterLeft = document.querySelectorAll('.cards-block .flip-card');
                endAnimationCenterLeft[endAnimationCenterLeft.length - 1].addEventListener('animationend', (
                    e) => {
                    if (e.animationName == 'close-opacity-anumation-2') {
                        // this.leftDecks.push(this.leftDecks.length);
                        // if (this.rightDecks.length == 0) {
                        this.finishedRightDeck = true
                        // }
                    }
                });
            }, 5000)

            setTimeout(() => {
                const endAnimationCenterLeft = document.querySelectorAll('.flip-card-inner');
                endAnimationCenterLeft.forEach(element => {
                    element.addEventListener('animationstart', (e) => {
                        if (e.animationName == 'flip-card') {
                            console.log('flip start')
                            cardFlip.play();
                        }
                    });
                });
            }, 5000)
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
                var main = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'vteen'
                })
                return this.orderBy(main, 'sr')
            },
            oddEven() {
                var oddEven = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'voddeven'
                })
                var oddEvenSorted = this.orderBy(oddEven, 'sr')
                oddEvenSorted.forEach(data => {
                    data.odds = _.orderBy(data.odds, 'sno')
                });
                return oddEvenSorted
            },
            suit() {
                var suit = _.filter(_.get(this.casinoData, 'sub'), (o) => {
                    return (o.subtype == 'vsuita' || o.subtype == 'vsuitb')
                })
                return this.orderBy(suit, 'sr')
            },
            consicutive() {
                var consicutive = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'vcon'
                })
                return this.orderBy(consicutive, 'sr')
            }
        },
        data() {
            return {
                dealer: 0,
                playWinner: true,
                sound: {
                    bgMusic: true,
                    otherSound: true,
                },
                cardPath: IMG_PATH + 'front/img/cards/',
                boardPath: IMG_PATH + 'front/img/board',
                deckLength: 20,
                isFirstCall: true,
                disabledAnimation: [],
                showCards: true,
                imgPath: IMG_PATH,
                gameTitle: '',
                gameType: 'vteen',
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
                loading: false,
                isGameFinished: false,
                leftDecks: [...Array(1).keys()],
                rightDecks: [...Array(deckLength).keys()],
                finishedRightDeck: false
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
            fullScreen(){
                let de = document.querySelector(".fullwidthcasino-container");
                console.log(de)
                if (de.requestFullscreen) { de.requestFullscreen(); }
                else if (de.mozRequestFullScreen) { de.mozRequestFullScreen(); }
                else if (de.webkitRequestFullscreen) { de.webkitRequestFullscreen(); }
                else if (de.msRequestFullscreen) { de.msRequestFullscreen(); }
            },
            muteOtherSound() {
                // this.fullScreen()
                if (this.sound.otherSound) {
                    // console.log('cardSuffle', cardSuffle)
                    cardSuffle.mute(true)

                    // console.log('cardFlip', cardFlip)
                    cardFlip.mute(true)

                    // console.log('winnerMusic', winnerMusic)
                    winnerMusic.mute(true)

                    this.sound.otherSound = false
                    localStorage.setItem("sound", JSON.stringify(this.sound));
                } else {
                    cardSuffle.mute(false)
                    cardFlip.mute(false)
                    winnerMusic.mute(false)

                    this.sound.otherSound = true
                    localStorage.setItem("sound", JSON.stringify(this.sound));
                }
                console.log('other sound', this.sound.otherSound)
            },
            muteBackgroundSound() {
                if (this.sound.bgMusic) {
                    // console.log('backgroundMusic', backgroundMusic)
                    backgroundMusic.mute(true)

                    this.sound.bgMusic = false
                    localStorage.setItem("sound", JSON.stringify(this.sound));
                } else {
                    backgroundMusic.mute(false)

                    this.sound.bgMusic = true
                    localStorage.setItem("sound", JSON.stringify(this.sound));
                }
                console.log('bg music', this.sound.bgMusic)
            },
            getSvgWidth() {
                var element = document.querySelector('#id_main_bg');
                var width = element.clientWidth
                return width ? width + 'px' : '0px'
            },
            getRectCenterCordinates(size, cordinate) {
                return cordinate + (size / 2)
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
                            return "A"
                            break;
                        case "2":
                            return "B"
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

                            if (this.isFirstCall) {
                                this.isFirstCall = false
                                this.disabledAnimation = response.data.card.split(',').map(card => card != 1)
                            }

                            if (_.get(this.casinoData, 'mid') != this.mId) {
                                if (this.mId != 0) {
                                    this.isGameFinished = true
                                    this.disabledAnimation = []
                                }
                                if (!this.firstCall) {
                                    this.$store.state.placebetInterval++
                                }
                                this.firstCall = false
                                this.getLastResults()
                                this.getUserBook(true, _.get(this.casinoData, 'mid'))
                                this.$store.commit('resetBetData')
                            } else if (this.isGameFinished) {
                                setTimeout(() => {
                                    this.isGameFinished = false;
                                }, 1500)
                            }
                            this.mId = _.get(this.casinoData, 'mid')
                            this.getUserBook()
                            // this.exp = _.get(this.$store.state.user, 'exp', 0)
                            this.cards = _.get(this.casinoData, 'card').split(',')
                            if (this.casinoData.rdesc != "") {
                                if (this.playWinner) {
                                    winnerMusic.play()
                                    console.log('winner Play')
                                    this.playWinner = false
                                }
                            } else {
                                this.playWinner = true
                            }
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
            backgroundMusic.stop()
            cardSuffle.stop()
            cardFlip.stop()
            winnerMusic.stop()
        }
    }
</script>