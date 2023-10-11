<template>
    <div class="virtual-casino-container">
        <VirtualTimerProgress v-if="time.total > 3" :totalTime="time.total" :currentTime="time.current" :width="getSvgWidth()" />
        <template v-if="time.total > 3 && (time.current <= 3 && time.current > 0)">
            <transition name="component-fade" mode="out-in">
                <div :key="time.current" class="casino-time-digit">{{ time.current }}</div>
            </transition>
        </template>
        <!-- WEB START -->
        <template v-if="$store.getters.isTablet">
            <div class="w-100 vteen vteen20">
                <!-- WEB BG START -->
                <div class="virtual-casino-bg d-none-small">
                    <svg id="id_main_bg" viewBox="0 0 2560 1440" fill="none" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="main_bg">
                            <rect id="main-bg" width="2560" height="1440" fill="url(#mainBg)"></rect>
                            <rect id="table-bg" width="2560" height="1440" fill="url(#tableBg)"></rect>
                            <rect id="girl-img" width="2560" height="1440" fill="url(#girlImg)"></rect>


                            <!-- CASINO NAME & ROUND ID START -->
                            <g id="casino_name">
                                <rect id="casino_name_box" x="17.5" y="11.5" width="467" height="96" rx="22.5" fill="#2C153C"
                                    fill-opacity="0.5" stroke="#573673" stroke-width="3"></rect>
                                <text id="TEENPATTI 1-DAY" fill="white" style="text-transform: uppercase;" xml:space="preserve" font-family="droidsans"
                                    font-size="40" letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                    <tspan :x="getRectCenterCordinates(467, 17.5)" :y="getRectCenterCordinates(96, 11.5)">
                                        {{ gameTitle }}</tspan>
                                </text>
                                <text id="1234567890" fill="#FDCF13" xml:space="preserve" font-family="droidsans" font-size="26"
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
                                        <text id="A_2" :fill="getResultColor(2)" xml:space="preserve" style="white-space: pre"
                                            font-family="droidsans-bold" font-size="50" font-weight="bold" letter-spacing="0em">
                                            <tspan x="2295.74" y="152.397">{{ getResultLable(2) }}</tspan>
                                        </text>
                                    </g>

                                    <g id="last_result_4" style="cursor: pointer;" @click="showResult(3)">
                                        <rect id="last_result4-box" x="2353.5" y="103.5" width="59" height="59" rx="3.5"
                                            stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                        <text id="B_2" :fill="getResultColor(3)" xml:space="preserve" style="white-space: pre"
                                            font-family="droidsans-bold" font-size="50" font-weight="bold" letter-spacing="0em">
                                            <tspan x="2366.2" y="152.397">{{ getResultLable(3) }}</tspan>
                                        </text>
                                    </g>

                                    <g id="last_result_5" style="cursor: pointer;" @click="showResult(4)">
                                        <rect id="last_result5-box" x="2423.5" y="103.5" width="59" height="59" rx="3.5"
                                            stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                        <text id="A_3" :fill="getResultColor(4)" xml:space="preserve" style="white-space: pre"
                                            font-family="droidsans-bold" font-size="50" font-weight="bold" letter-spacing="0em">
                                            <tspan x="2435.74" y="152.397">{{ getResultLable(4) }}</tspan>
                                        </text>
                                    </g>

                                    <g id="last_result_6" style="cursor: pointer;" @click="showResult(5)">
                                        <rect id="last_result6-box" x="2143.5" y="171.5" width="59" height="59" rx="3.5"
                                            stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                        <text id="B_3" :fill="getResultColor(5)" xml:space="preserve" style="white-space: pre"
                                            font-family="droidsans-bold" font-size="50" font-weight="bold" letter-spacing="0em">
                                            <tspan x="2156.2" y="220.397">{{ getResultLable(5) }}</tspan>
                                        </text>
                                    </g>

                                    <g id="last_result_7" style="cursor: pointer;" @click="showResult(6)">
                                        <rect id="last_result7-box" x="2213.5" y="171.5" width="59" height="59" rx="3.5"
                                            stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                        <text id="A_4" :fill="getResultColor(6)" xml:space="preserve" style="white-space: pre"
                                            font-family="droidsans-bold" font-size="50" font-weight="bold" letter-spacing="0em">
                                            <tspan x="2225.74" y="220.397">{{ getResultLable(6) }}</tspan>
                                        </text>
                                    </g>

                                    <g id="last_result_8" style="cursor: pointer;" @click="showResult(7)">
                                        <rect id="last_result8-box" x="2283.5" y="171.5" width="59" height="59" rx="3.5"
                                            stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                        <text id="B_4" :fill="getResultColor(7)" xml:space="preserve" style="white-space: pre"
                                            font-family="droidsans-bold" font-size="50" font-weight="bold" letter-spacing="0em">
                                            <tspan x="2296.2" y="220.397">{{ getResultLable(7) }}</tspan>
                                        </text>
                                    </g>

                                    <g id="last_result_9" style="cursor: pointer;" @click="showResult(8)">
                                        <rect id="last_result9-box" x="2353.5" y="171.5" width="59" height="59" rx="3.5"
                                            stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                        <text id="A_5" :fill="getResultColor(8)" xml:space="preserve" style="white-space: pre"
                                            font-family="droidsans-bold" font-size="50" font-weight="bold" letter-spacing="0em">
                                            <tspan x="2365.74" y="220.397">{{ getResultLable(8) }}</tspan>
                                        </text>
                                    </g>

                                    <g id="last_result_10" style="cursor: pointer;" @click="showResult(9)">
                                        <rect id="last_result10-box" x="2423.5" y="171.5" width="59" height="59" rx="3.5"
                                            stroke="white" fill="#2C153C" fill-opacity="0.01"></rect>
                                        <text id="B_5" :fill="getResultColor(9)" xml:space="preserve" style="white-space: pre"
                                            font-family="droidsans-bold" font-size="50" font-weight="bold" letter-spacing="0em">
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

                            <!-- OTHER SOUND ON ICON START -->
                            <template v-if="sound.otherSound">
                                <g id="sound_icon_box" style="cursor: pointer;" @click="muteOtherSound()">
                                    <rect id="sound_icon_bg" x="2259" y="11" width="58" height="58" rx="29" fill="url(#otherSoundOn)" stroke="#FDC834" stroke-width="2"></rect>
                                    <path id="sound_icon" d="M2286.47 24.5688L2279.24 31.7497H2270.95C2269.87 31.7497 2269 32.6168 2269 33.6873V45.3124C2269 46.382 2269.87 47.2499 2270.95 47.2499H2279.24L2286.47 54.4308C2287.69 55.6442 2289.8 54.7917 2289.8 53.0608V25.9388C2289.8 24.2063 2287.69 23.3571 2286.47 24.5688ZM2308 39.4998C2308 34.371 2305.4 29.6556 2301.03 26.8866C2300.12 26.3102 2298.92 26.5782 2298.34 27.4888C2297.76 28.3994 2298.03 29.6047 2298.94 30.182C2302.17 32.2317 2304.1 35.7144 2304.1 39.4998C2304.1 43.2852 2302.17 46.7679 2298.94 48.8177C2298.03 49.3941 2297.76 50.5994 2298.34 51.5108C2298.87 52.3472 2300.06 52.7331 2301.03 52.1131C2305.4 49.344 2308 44.6286 2308 39.4998ZM2296.48 33.2941C2295.54 32.7831 2294.35 33.1197 2293.83 34.057C2293.31 34.9943 2293.66 36.1721 2294.6 36.6896C2295.65 37.262 2296.3 38.3397 2296.3 39.4998C2296.3 40.6607 2295.65 41.7376 2294.6 42.31C2293.66 42.8275 2293.31 44.0054 2293.83 44.9426C2294.35 45.8839 2295.54 46.2182 2296.48 45.7055C2298.78 44.4502 2300.2 42.0727 2300.2 39.499C2300.2 36.9253 2298.78 34.5486 2296.48 33.2941Z" fill="white"></path>
                                </g>
                            </template>
                            <!-- OTHER SOUND ON ICON END -->
                            <!-- OTHER SOUND OFF ICON START -->
                            <template v-else>
                                <g id="sound_off_icon_box" style="cursor: pointer;" @click="muteOtherSound()">
                                    <rect id="sound_off_icon_bg" x="2259" y="11" width="58" height="58" rx="29" fill="url(#otherSoundOff)" stroke="#FDC834" stroke-width="2"></rect>
                                    <path id="sound_off_icon" d="M2284.64 24.5688L2277.34 31.7497H2268.97C2267.88 31.7497 2267 32.6168 2267 33.6873V45.3124C2267 46.382 2267.88 47.2499 2268.97 47.2499H2277.34L2284.64 54.4308C2285.87 55.6442 2288 54.7917 2288 53.0608V25.9388C2288 24.2063 2285.87 23.3571 2284.64 24.5688ZM2304.87 39.4998L2308.61 35.8153C2309.13 35.3067 2309.13 34.4816 2308.61 33.973L2306.74 32.1308C2306.22 31.6222 2305.39 31.6222 2304.87 32.1308L2301.12 35.8153L2297.38 32.1308C2296.86 31.6222 2296.03 31.6222 2295.51 32.1308L2293.64 33.973C2293.12 34.4816 2293.12 35.3067 2293.64 35.8153L2297.38 39.4998L2293.64 43.1835C2293.12 43.6921 2293.12 44.5172 2293.64 45.0258L2295.51 46.868C2296.03 47.3766 2296.86 47.3766 2297.38 46.868L2301.12 43.1843L2304.87 46.8688C2305.39 47.3774 2306.22 47.3774 2306.74 46.8688L2308.61 45.0266C2309.13 44.518 2309.13 43.6929 2308.61 43.1843L2304.87 39.4998Z" fill="white"></path>
                                </g>
                            </template>
                            <!-- OTHER SOUND OFF ICON END -->

                            <!-- MUSIC ON ICON START -->
                            <template v-if="sound.bgMusic">
                                <g id="music_icon_box" style="cursor: pointer;" @click="muteBackgroundSound()">
                                    <rect id="music_icon_bg" x="2333" y="11" width="58" height="58" rx="29" fill="url(#bgMusicOn)" stroke="#FDC834" stroke-width="2"></rect>
                                    <path id="music_icon" d="M2375.48 24.0896L2356.11 29.811C2355.71 29.9346 2355.37 30.1803 2355.13 30.5126C2354.88 30.8448 2354.75 31.2462 2354.75 31.6584V47.4869C2354.12 47.3329 2353.47 47.2532 2352.81 47.2496C2349.6 47.2496 2347 48.9849 2347 51.1248C2347 53.2646 2349.6 55 2352.81 55C2356.02 55 2358.62 53.2646 2358.62 51.1248V36.9754L2374.12 32.4341V43.6123C2373.49 43.4578 2372.84 43.3779 2372.19 43.3743C2368.98 43.3743 2366.38 45.1097 2366.38 47.2496C2366.38 49.3894 2368.98 51.1248 2372.19 51.1248C2375.4 51.1248 2378 49.39 2378 47.2496V25.9358C2378 25.6316 2377.93 25.3318 2377.79 25.0606C2377.65 24.7893 2377.45 24.5543 2377.21 24.3746C2376.96 24.1948 2376.68 24.0753 2376.38 24.0258C2376.08 23.9763 2375.77 23.9982 2375.48 24.0896V24.0896Z" fill="white"></path>
                                </g>
                            </template>
                            <!-- MUSIC ON ICON END -->
                            <!-- MUSIC OFF ICON START -->
                            <template v-else>
                                <g id="music_off_icon_box" style="cursor: pointer;" @click="muteBackgroundSound()">
                                    <rect id="music_off_icon_bg" x="2333" y="11" width="58" height="58" rx="29" fill="url(#bgMusicOff)" stroke="#FDC834" stroke-width="2"></rect>
                                    <path id="music_off_icon" d="M2354.7 47.4868C2354.06 47.3328 2353.41 47.2532 2352.75 47.2495C2349.52 47.2495 2346.9 48.9848 2346.9 51.1245C2346.9 53.2643 2349.52 54.9995 2352.75 54.9995C2355.98 54.9995 2358.6 53.2643 2358.6 51.1245V43.8515L2354.7 40.8569V47.4868ZM2381.62 51.736L2377.66 48.6917C2377.93 48.2455 2378.1 47.7623 2378.1 47.2495V25.9368C2378.1 25.6326 2378.03 25.3328 2377.89 25.0615C2377.75 24.7903 2377.55 24.5553 2377.3 24.3756C2377.06 24.1958 2376.77 24.0764 2376.47 24.0269C2376.17 23.9774 2375.86 23.9992 2375.56 24.0907L2356.07 29.8118C2355.76 29.9087 2355.48 30.0796 2355.26 30.3092C2355.04 30.5389 2354.87 30.8201 2354.79 31.1275L2345.77 24.2045C2345.67 24.1262 2345.55 24.0686 2345.43 24.0348C2345.31 24.001 2345.18 23.9917 2345.05 24.0075C2344.92 24.0233 2344.8 24.0639 2344.69 24.1268C2344.58 24.1898 2344.48 24.274 2344.4 24.3746L2343.21 25.9047C2343.05 26.1075 2342.98 26.3646 2343.01 26.6195C2343.04 26.8745 2343.17 27.1063 2343.38 27.264L2379.23 54.7955C2379.33 54.8738 2379.45 54.9314 2379.57 54.9652C2379.69 54.999 2379.82 55.0083 2379.95 54.9925C2380.08 54.9767 2380.2 54.9361 2380.31 54.8731C2380.42 54.8102 2380.52 54.726 2380.6 54.6254L2381.79 53.0953C2381.95 52.8925 2382.02 52.6354 2381.99 52.3805C2381.96 52.1255 2381.83 51.8937 2381.62 51.736V51.736ZM2374.2 43.6118C2373.56 43.4578 2372.91 43.3781 2372.25 43.3744C2371.8 43.3806 2371.35 43.4233 2370.9 43.5022L2361.36 36.1759L2374.2 32.4335V43.6118Z" fill="white"></path>
                                </g>
                            </template>
                            <!-- MUSIC OFF ICON END -->

                            <!-- HOME ICON START -->
                            <router-link :to="{name: 'owncasinolist'}">
                                <g id="home_icon_box" style="cursor: pointer;">
                                    <rect id="home_icon_bg" x="2407" y="11" width="58" height="58" rx="29" fill="url(#homeIcon)" stroke="#FDC834" stroke-width="2"></rect>
                                    <path id="home_icon" d="M2434.9 31.0799L2420.5 42.9445V55.7499C2420.5 56.0814 2420.63 56.3994 2420.87 56.6338C2421.1 56.8683 2421.42 57 2421.75 57L2430.5 56.9773C2430.83 56.9757 2431.15 56.8432 2431.38 56.609C2431.62 56.3747 2431.75 56.0577 2431.75 55.7272V48.249C2431.75 47.9175 2431.88 47.5995 2432.11 47.365C2432.35 47.1306 2432.67 46.9989 2433 46.9989H2438C2438.33 46.9989 2438.65 47.1306 2438.88 47.365C2439.12 47.5995 2439.25 47.9175 2439.25 48.249V55.7217C2439.25 55.8862 2439.28 56.0492 2439.34 56.2013C2439.4 56.3535 2439.5 56.4917 2439.61 56.6082C2439.73 56.7247 2439.87 56.8172 2440.02 56.8802C2440.17 56.9433 2440.33 56.9758 2440.5 56.9758L2449.25 57C2449.58 57 2449.9 56.8683 2450.13 56.6338C2450.37 56.3994 2450.5 56.0814 2450.5 55.7499V42.9359L2436.1 31.0799C2435.93 30.9434 2435.72 30.869 2435.5 30.869C2435.28 30.869 2435.07 30.9434 2434.9 31.0799ZM2457.65 39.1441L2451.12 33.7599V22.9376C2451.12 22.6889 2451.02 22.4505 2450.85 22.2746C2450.67 22.0988 2450.43 22 2450.19 22H2445.81C2445.56 22 2445.32 22.0988 2445.15 22.2746C2444.97 22.4505 2444.87 22.6889 2444.87 22.9376V28.6109L2437.88 22.8556C2437.21 22.3031 2436.37 22.0011 2435.5 22.0011C2434.63 22.0011 2433.79 22.3031 2433.11 22.8556L2413.34 39.1441C2413.25 39.2226 2413.17 39.319 2413.11 39.4278C2413.05 39.5367 2413.02 39.6558 2413 39.7784C2412.99 39.9011 2413.01 40.0248 2413.04 40.1425C2413.08 40.2602 2413.14 40.3697 2413.22 40.4646L2415.21 42.8867C2415.29 42.9819 2415.38 43.0608 2415.49 43.1187C2415.6 43.1767 2415.72 43.2126 2415.84 43.2244C2415.96 43.2363 2416.09 43.2238 2416.21 43.1877C2416.32 43.1516 2416.43 43.0926 2416.53 43.0141L2434.9 27.8764C2435.07 27.74 2435.28 27.6655 2435.5 27.6655C2435.72 27.6655 2435.93 27.74 2436.1 27.8764L2454.47 43.0141C2454.57 43.0926 2454.68 43.1517 2454.8 43.1879C2454.91 43.2241 2455.04 43.2368 2455.16 43.2251C2455.28 43.2135 2455.4 43.1779 2455.51 43.1202C2455.62 43.0625 2455.72 42.984 2455.79 42.889L2457.79 40.4669C2457.87 40.3715 2457.92 40.2615 2457.96 40.1432C2458 40.025 2458.01 39.9008 2458 39.7779C2457.98 39.655 2457.95 39.5357 2457.89 39.4269C2457.83 39.3182 2457.75 39.222 2457.65 39.1441Z" fill="white"></path>
                                </g>
                            </router-link>
                            <!-- HOME ICON END -->

                            <!-- RULES ICON START -->
                            <g id="rule_icon_box" @click="getCasinoRulesHtml()" style="cursor: pointer;">
                                <rect id="home_icon_bg_2" x="2481" y="11" width="58" height="58" rx="29" fill="url(#rulesIcon)" stroke="#FDC834" stroke-width="2"></rect>
                                <path id="rule_icon" d="M2504.56 53.1429H2506.12V41.8571H2504.56C2503.7 41.8571 2503 41.1576 2503 40.2946V36.5625C2503 35.6995 2503.7 35 2504.56 35H2513.31C2514.18 35 2514.88 35.6995 2514.88 36.5625V53.1429H2516.44C2517.3 53.1429 2518 53.8424 2518 54.7054V58.4375C2518 59.3005 2517.3 60 2516.44 60H2504.56C2503.7 60 2503 59.3005 2503 58.4375V54.7054C2503 53.8424 2503.7 53.1429 2504.56 53.1429ZM2510.5 20C2507.39 20 2504.88 22.5184 2504.88 25.625C2504.88 28.7316 2507.39 31.25 2510.5 31.25C2513.61 31.25 2516.12 28.7316 2516.12 25.625C2516.12 22.5184 2513.61 20 2510.5 20Z" fill="white"></path>
                            </g>
                            <!-- RULES ICON END -->

                            <rect id="logo" x="15" y="1177" width="323" height="227" fill="url(#pattern2)" />
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
                                <use xlink:href="#mainBgImg" transform="scale(0.000390625 0.000694444)"></use>
                            </pattern>

                            <pattern id="tableBg" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use xlink:href="#tableBgImg" transform="scale(0.000390625 0.000694444)"></use>
                            </pattern>

                            <pattern id="girlImg" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use xlink:href="#girlBgImg" transform="scale(0.000390625 0.000694444)"></use>
                            </pattern>
                            
                            <pattern id="winnerIcon" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use xlink:href="#winnerTrophyImg"
                                    transform="translate(-0.0285714) scale(0.00412946 0.00390625)" />
                            </pattern>

                            <linearGradient id="otherSoundOn" x1="2288" y1="10" x2="2288" y2="70" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#F29603"></stop>
                                <stop offset="1" stop-color="#B4701B"></stop>
                            </linearGradient>
                            <linearGradient id="otherSoundOff" x1="2288" y1="10" x2="2288" y2="70" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#F29603"></stop>
                                <stop offset="1" stop-color="#B4701B"></stop>
                            </linearGradient>

                            <linearGradient id="bgMusicOn" x1="2362" y1="10" x2="2362" y2="70" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#F29603"></stop>
                                <stop offset="1" stop-color="#B4701B"></stop>
                            </linearGradient>
                            <linearGradient id="bgMusicOff" x1="2362" y1="10" x2="2362" y2="70" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#F29603"></stop>
                                <stop offset="1" stop-color="#B4701B"></stop>
                            </linearGradient>

                            <linearGradient id="homeIcon" x1="2436" y1="10" x2="2436" y2="70" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#F29603"></stop>
                                <stop offset="1" stop-color="#B4701B"></stop>
                            </linearGradient>
                            <linearGradient id="rulesIcon" x1="2510" y1="10" x2="2510" y2="70" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#F29603"></stop>
                                <stop offset="1" stop-color="#B4701B"></stop>
                            </linearGradient>

                            <image id="winnerTrophyImg" data-name="winner.png" width="256" height="256"
                                :href="`${imgPath}front/img/svg_casino/icons/winner-left.png`">
                            </image>

                            <image id="mainBgImg" data-name="main-bg.jpg" width="2560" height="1440"
                                :href="`${boardPath}/bg.png`">
                            </image>

                            <image id="tableBgImg" data-name="table.png" y="276" width="2560" height="1440"
                                v-bind:href="`${boardPath}/table.png`"></image>

                            <image id="girlBgImg" data-name="dealer_0.png" x="640" y="10" width="1280" height="720"
                                v-bind:href="`${boardPath}/dealer_${dealer}.png`"></image>

                            <image id="plusIcon" data-name="more.png" width="201" height="203"
                                xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAADLCAYAAADEDrcOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDZGMTEwRkJGNUUzMTFFQjlFNkNBM0M5REZERDRDREIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDZGMTEwRkNGNUUzMTFFQjlFNkNBM0M5REZERDRDREIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNkYxMTBGOUY1RTMxMUVCOUU2Q0EzQzlERkRENENEQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNkYxMTBGQUY1RTMxMUVCOUU2Q0EzQzlERkRENENEQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvplFlQAAAZqSURBVHja7N1PiJR1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">
                            </image>
                        </defs>
                    </svg>

                </div>
                <!-- WEB BG END -->

                <!-- WEB ODDS START -->
                <div class="virtual-casino-odds d-none-small">
                    <div class="decks-block" :style="{'z-index': leftDecks.length > 20 ? 7 : 1}">
                        <!-- left card deck -->
                        <img class="left-card-deck" :src="`${boardPath}/cardDeckLeft.svg`" />

                        <!-- <div class="decks empty-card-in-deck-left">
                            <div class="card-item" :style="{backgroundImage: `url(${cardPath}1.png)`}" ></div>
                        </div> -->

                        <!-- <div class="decks empty-card-in-deck-left"
                            :class="{'finish-deck': finishedRightDeck}" >
                            <template  v-for="i in leftDecks">
                                <div :key="i+'left'"
                                    class="card-item"
                                    :style="{
                                        backgroundImage: `url(${cardPath}1.png)`,
                                        transform: `translate(-${(i) * 0.38}%, -${i * 2.2}%)`
                                        }"></div>
                            </template>
                        </div> -->

                        <!-- right card deck -->
                        <!-- <img class="right-card-deck" :src="`${boardPath}/cardDeckRight.svg`" /> -->

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

                        <!-- <img class="empty-card-in-deck-left" :src="`${cardPath}1.png`"/> -->
                        <!-- <img class="empty-card-in-deck-right next" :src="`${cardPath}1.png`"/> -->
                        <!-- <img class="empty-card-in-deck-right" :src="`${cardPath}1.png`"/> -->
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
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}${cards[0]}.png)`}">
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
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}${cards[2]}.png)`}">
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
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}${cards[4]}.png)`}">
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
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}${cards[5]}.png)`}">
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
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}${cards[3]}.png)`}">
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
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}${cards[1]}.png)`}">
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
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}${cards[0]}.png)`}">
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
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}${cards[2]}.png)`}">
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
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}${cards[4]}.png)`}">
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
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}${cards[5]}.png)`}">
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
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}${cards[3]}.png)`}">
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
                                        <div class="card-item" :style="{backgroundImage: `url(${cardPath}${cards[1]}.png)`}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- PLAYER B CARDS END -->
                        </div>

                        <!-- ODDS SVG START -->
                        <svg viewBox="0 0 1014 771" fill="none" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g id="odds">
                                <g id="player_title">
                                    <text id="PLAYER A" fill="#EF0518" xml:space="preserve" style="white-space: pre"
                                        font-family="droidsans-bold" font-size="70" font-weight="bold" letter-spacing="0em">
                                        <tspan x="44.2705" y="74.6558">PLAYER A</tspan>
                                    </text>
                                    <text id="PLAYER B" fill="#00A200" xml:space="preserve" style="white-space: pre"
                                        font-family="droidsans-bold" font-size="70" font-weight="bold" letter-spacing="0em">
                                        <tspan x="649" y="74.6558">PLAYER B</tspan>
                                    </text>
                                </g>
                                <template v-if="casinoData && casinoData.mid">
                                    <g id="main_odds">
                                        <g id="player_a">
                                            <g id="main">
                                                <g id="back" style="cursor: pointer;" @click="setBetData(player[0].nat, player[0].b, mId, player[0].sid, player[0].subtype, 0, 'back', gameType, player[0].gstatus, player[0].min, player[0].max)">
                                                    <rect id="a_m_back" x="2" y="252" width="277" height="81" rx="6"
                                                        fill="#C4C4C4" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4" />
                                                    <text id="1.99" fill="black" xml:space="preserve" style="white-space: pre"
                                                        font-family="droidsans-bold" font-size="40" font-weight="bold"
                                                        letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                        <tspan :x="getRectCenterCordinates(277, 2)" :y="getRectCenterCordinates(81, 252)">{{ player[0].b }}</tspan>
                                                    </text>
                                                    <g id="a_m_back_sus_box" v-if="player[0].gstatus != 'OPEN'">
                                                        <rect id="a_m_b_sus" y="250" width="281" height="85" rx="8" fill="black"
                                                            fill-opacity="0.3" />
                                                        <path id="a_m_b_lock"
                                                            d="M152.679 271.75H151.018V266.688C151.018 260.795 146.299 256 140.5 256C134.701 256 129.982 260.795 129.982 266.688V271.75H128.321C126.488 271.75 125 273.262 125 275.125V288.625C125 290.488 126.488 292 128.321 292H152.679C154.512 292 156 290.488 156 288.625V275.125C156 273.262 154.512 271.75 152.679 271.75ZM145.482 271.75H135.518V266.688C135.518 263.896 137.753 261.625 140.5 261.625C143.247 261.625 145.482 263.896 145.482 266.688V271.75Z"
                                                            fill="white" />
                                                    </g>
                                                    <text id="10000" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans" font-size="34"
                                                        letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle">
                                                        <tspan :class="{'suspended-book': player[0].gstatus != 'OPEN'}" :x="getRectCenterCordinates(277, 2)" :y="getRectCenterCordinates(81, 252)" v-vcasinofancybook="{sid: player[0].sid, subid: 0}">0</tspan>
                                                    </text>
                                                </g>
                                            </g>
                                            <g id="3_baccarat">
                                                <g id="back_2" style="cursor: pointer;" @click="setBetData(khal[0].nat, khal[0].b, mId, khal[0].sid, khal[0].subtype, 0, 'back', gameType, khal[0].gstatus, khal[0].min, khal[0].max)">
                                                    <rect id="a_k_back" x="2" y="357" width="277" height="81" rx="6"
                                                        fill="#C4C4C4" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4" />
                                                    <text id="1.99_2" fill="black" xml:space="preserve" style="white-space: pre"
                                                        font-family="droidsans-bold" font-size="40" font-weight="bold"
                                                        letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                        <tspan :x="getRectCenterCordinates(277, 2)" :y="getRectCenterCordinates(81, 357)">{{ khal[0].b }}</tspan>
                                                    </text>
                                                    <g id="a_k_back_sus_box" v-if="khal[0].gstatus != 'OPEN'">
                                                        <rect id="a_k_b_sus" y="355" width="281" height="85" rx="8" fill="black"
                                                            fill-opacity="0.3" />
                                                        <path id="a_k_b_lock"
                                                            d="M152.679 376.75H151.018V371.688C151.018 365.795 146.299 361 140.5 361C134.701 361 129.982 365.795 129.982 371.688V376.75H128.321C126.488 376.75 125 378.262 125 380.125V393.625C125 395.488 126.488 397 128.321 397H152.679C154.512 397 156 395.488 156 393.625V380.125C156 378.262 154.512 376.75 152.679 376.75ZM145.482 376.75H135.518V371.688C135.518 368.896 137.753 366.625 140.5 366.625C143.247 366.625 145.482 368.896 145.482 371.688V376.75Z"
                                                            fill="white" />
                                                    </g>
                                                    <text id="10000_2" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans" font-size="34"
                                                        letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle">
                                                        <tspan :class="{'suspended-book': khal[0].gstatus != 'OPEN'}" :x="getRectCenterCordinates(277, 2)" 
                :y="getRectCenterCordinates(81, 357)" v-vcasinofancybook="{sid: khal[0].sid, subid: 0}">0</tspan>
                                                    </text>
                                                </g>
                                            </g>
                                            <g id="total">
                                                <g id="back_3" style="cursor: pointer;" @click="setBetData(total[0].nat, total[0].b, mId, total[0].sid, total[0].subtype, 0, 'back', gameType, total[0].gstatus, total[0].min, total[0].max)">
                                                    <rect id="a_t_back" x="2" y="462" width="277" height="81" rx="6"
                                                        fill="#C4C4C4" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4" />
                                                    <text id="1.99_2" fill="black" xml:space="preserve" style="white-space: pre"
                                                        font-family="droidsans-bold" font-size="40" font-weight="bold"
                                                        letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                        <tspan :x="getRectCenterCordinates(277, 2)" :y="getRectCenterCordinates(81, 462)">{{ total[0].b }}</tspan>
                                                    </text>
                                                    <g id="a_t_back_sus_box" v-if="total[0].gstatus != 'OPEN'">
                                                        <rect id="a_t_b_sus" y="460" width="281" height="85" rx="8" fill="black"
                                                            fill-opacity="0.3" />
                                                        <path id="a_t_b_lock"
                                                            d="M152.679 481.75H151.018V476.688C151.018 470.795 146.299 466 140.5 466C134.701 466 129.982 470.795 129.982 476.688V481.75H128.321C126.488 481.75 125 483.262 125 485.125V498.625C125 500.488 126.488 502 128.321 502H152.679C154.512 502 156 500.488 156 498.625V485.125C156 483.262 154.512 481.75 152.679 481.75ZM145.482 481.75H135.518V476.688C135.518 473.896 137.753 471.625 140.5 471.625C143.247 471.625 145.482 473.896 145.482 476.688V481.75Z"
                                                            fill="white" />
                                                    </g>
                                                    <text id="10000_2" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans" font-size="34"
                                                        letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle">
                                                        <tspan :class="{'suspended-book': total[0].gstatus != 'OPEN'}" :x="getRectCenterCordinates(277, 2)" 
                                            :y="getRectCenterCordinates(81, 462)" v-vcasinofancybook="{sid: total[0].sid, subid: 0}">0</tspan>
                                                    </text>
                                                </g>
                                            </g>
                                            <g id="pair_plus">
                                                <g id="back_4" style="cursor: pointer;" @click="setBetData(pair[0].nat, pair[0].b, mId, pair[0].sid, pair[0].subtype, 0, 'back', gameType, pair[0].gstatus, pair[0].min, pair[0].max)">
                                                    <rect id="a_p_back" x="2" y="567" width="277" height="81" rx="6"
                                                        fill="#C4C4C4" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4" />
                                                    <text id="1.99_4" fill="black" xml:space="preserve" style="white-space: pre"
                                                        font-family="droidsans-bold" font-size="40" font-weight="bold"
                                                        letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                        <tspan :x="getRectCenterCordinates(277, 2)" :y="getRectCenterCordinates(81, 567)">A</tspan>
                                                    </text>
                                                    <g id="a_p_back_sus_box" v-if="pair[0].gstatus != 'OPEN'">
                                                        <rect id="a_p_b_sus" y="565" width="281" height="85" rx="8" fill="black"
                                                            fill-opacity="0.3" />
                                                        <path id="a_p_b_lock"
                                                            d="M152.679 586.75H151.018V581.688C151.018 575.795 146.299 571 140.5 571C134.701 571 129.982 575.795 129.982 581.688V586.75H128.321C126.488 586.75 125 588.262 125 590.125V603.625C125 605.488 126.488 607 128.321 607H152.679C154.512 607 156 605.488 156 603.625V590.125C156 588.262 154.512 586.75 152.679 586.75ZM145.482 586.75H135.518V581.688C135.518 578.896 137.753 576.625 140.5 576.625C143.247 576.625 145.482 578.896 145.482 581.688V586.75Z"
                                                            fill="white" />
                                                    </g>
                                                    <text id="10000_4" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans" font-size="34"
                                                        letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle">
                                                        <tspan :class="{'suspended-book': pair[0].gstatus != 'OPEN'}" :x="getRectCenterCordinates(277, 2)" 
        :y="getRectCenterCordinates(81, 567)" v-vcasinofancybook="{sid: pair[0].sid, subid: 0}">0</tspan>
                                                    </text>
                                                </g>
                                            </g>
                                        </g>
                                        <g id="player_b">
                                            <g id="main_2">
                                                <g id="back_5" style="cursor: pointer;" @click="setBetData(player[1].nat, player[1].b, mId, player[1].sid, player[1].subtype, 0, 'back', gameType, player[1].gstatus, player[1].min, player[1].max)">
                                                    <rect id="a_m_back_2" x="735" y="253" width="277" height="81" rx="6"
                                                        fill="#C4C4C4" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4" />
                                                    <text id="1.99_5" fill="black" xml:space="preserve" style="white-space: pre"
                                                        font-family="droidsans-bold" font-size="40" font-weight="bold"
                                                        letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                        <tspan :x="getRectCenterCordinates(277, 735)" :y="getRectCenterCordinates(81, 253)">{{ player[1].b }}</tspan>
                                                    </text>
                                                    <g id="a_m_back_sus_box_2" v-if="player[1].gstatus != 'OPEN'">
                                                        <rect id="a_m_b_sus_2" x="733" y="251" width="281" height="85" rx="8"
                                                            fill="black" fill-opacity="0.3" />
                                                        <path id="a_m_b_lock_2"
                                                            d="M885.679 272.75H884.018V267.688C884.018 261.795 879.299 257 873.5 257C867.701 257 862.982 261.795 862.982 267.688V272.75H861.321C859.488 272.75 858 274.262 858 276.125V289.625C858 291.488 859.488 293 861.321 293H885.679C887.512 293 889 291.488 889 289.625V276.125C889 274.262 887.512 272.75 885.679 272.75ZM878.482 272.75H868.518V267.688C868.518 264.896 870.753 262.625 873.5 262.625C876.247 262.625 878.482 264.896 878.482 267.688V272.75Z"
                                                            fill="white" />
                                                    </g>
                                                    <text id="10000_5" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans" font-size="34"
                                                        letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle">
                                                        <tspan :class="{'suspended-book': player[1].gstatus != 'OPEN'}" :x="getRectCenterCordinates(277, 735)" 
        :y="getRectCenterCordinates(81, 253)" v-vcasinofancybook="{sid: player[1].sid, subid: 0}">0</tspan>
                                                    </text>
                                                </g>
                                            </g>
                                            <g id="3_baccarat_2">
                                                <g id="back_6" style="cursor: pointer;" @click="setBetData(khal[1].nat, khal[1].b, mId, khal[1].sid, khal[1].subtype, 0, 'back', gameType, khal[1].gstatus, khal[1].min, khal[1].max)">
                                                    <rect id="a_k_back_2" x="735" y="358" width="277" height="81" rx="6"
                                                        fill="#C4C4C4" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4" />
                                                    <text id="1.99_6" fill="black" xml:space="preserve" style="white-space: pre"
                                                        font-family="droidsans-bold" font-size="40" font-weight="bold"
                                                        letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                        <tspan :x="getRectCenterCordinates(277, 735)" :y="getRectCenterCordinates(81, 358)">{{ khal[1].b }}</tspan>
                                                    </text>
                                                    <g id="a_k_back_sus_box_2" v-if="khal[1].gstatus != 'OPEN'">
                                                        <rect id="a_k_b_sus_2" x="733" y="356" width="281" height="85" rx="8"
                                                            fill="black" fill-opacity="0.3" />
                                                        <path id="a_k_b_lock_2"
                                                            d="M885.679 377.75H884.018V372.688C884.018 366.795 879.299 362 873.5 362C867.701 362 862.982 366.795 862.982 372.688V377.75H861.321C859.488 377.75 858 379.262 858 381.125V394.625C858 396.488 859.488 398 861.321 398H885.679C887.512 398 889 396.488 889 394.625V381.125C889 379.262 887.512 377.75 885.679 377.75ZM878.482 377.75H868.518V372.688C868.518 369.896 870.753 367.625 873.5 367.625C876.247 367.625 878.482 369.896 878.482 372.688V377.75Z"
                                                            fill="white" />
                                                    </g>
                                                    <text id="10000_6" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans" font-size="34"
                                                        letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle">
                                                        <tspan :class="{'suspended-book': khal[1].gstatus != 'OPEN'}" :x="getRectCenterCordinates(277, 735)" 
        :y="getRectCenterCordinates(81, 358)" v-vcasinofancybook="{sid: khal[1].sid, subid: 0}">0</tspan>
                                                    </text>
                                                </g>
                                            </g>
                                            <g id="total_2">
                                                <g id="back_7" style="cursor: pointer;" @click="setBetData(total[1].nat, total[1].b, mId, total[1].sid, total[1].subtype, 0, 'back', gameType, total[1].gstatus, total[1].min, total[1].max)">
                                                    <rect id="a_t_back_2" x="735" y="463" width="277" height="81" rx="6"
                                                        fill="#C4C4C4" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4" />
                                                    <text id="1.99_7" fill="black" xml:space="preserve" style="white-space: pre"
                                                        font-family="droidsans-bold" font-size="40" font-weight="bold"
                                                        letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                        <tspan :x="getRectCenterCordinates(277, 735)" :y="getRectCenterCordinates(81, 463)">{{ total[1].b }}</tspan>
                                                    </text>
                                                    <g id="a_t_back_sus_box_2" v-if="total[1].gstatus != 'OPEN'">
                                                        <rect id="a_t_b_sus_2" x="733" y="461" width="281" height="85" rx="8"
                                                            fill="black" fill-opacity="0.3" />
                                                        <path id="a_t_b_lock_2"
                                                            d="M885.679 482.75H884.018V477.688C884.018 471.795 879.299 467 873.5 467C867.701 467 862.982 471.795 862.982 477.688V482.75H861.321C859.488 482.75 858 484.262 858 486.125V499.625C858 501.488 859.488 503 861.321 503H885.679C887.512 503 889 501.488 889 499.625V486.125C889 484.262 887.512 482.75 885.679 482.75ZM878.482 482.75H868.518V477.688C868.518 474.896 870.753 472.625 873.5 472.625C876.247 472.625 878.482 474.896 878.482 477.688V482.75Z"
                                                            fill="white" />
                                                    </g>
                                                    <text id="10000_7" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans" font-size="34"
                                                        letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle">
                                                        <tspan :class="{'suspended-book': total[1].gstatus != 'OPEN'}" :x="getRectCenterCordinates(277, 735)" 
        :y="getRectCenterCordinates(81, 463)" v-vcasinofancybook="{sid: total[1].sid, subid: 0}">0</tspan>
                                                    </text>
                                                </g>
                                            </g>
                                            <g id="pair_plus_2">
                                                <g id="back_8" style="cursor: pointer;" @click="setBetData(pair[1].nat, pair[1].b, mId, pair[1].sid, pair[1].subtype, 0, 'back', gameType, pair[1].gstatus, pair[1].min, pair[1].max)">
                                                    <rect id="a_p_back_2" x="735" y="568" width="277" height="81" rx="6"
                                                        fill="#C4C4C4" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4" />
                                                    <text id="1.99_8" fill="black" xml:space="preserve" style="white-space: pre"
                                                        font-family="droidsans-bold" font-size="40" font-weight="bold"
                                                        letter-spacing="0em" dominant-baseline="text-top" text-anchor="middle">
                                                        <tspan :x="getRectCenterCordinates(277, 735)" :y="getRectCenterCordinates(81, 568)">B</tspan>
                                                    </text>
                                                    <g id="a_p_back_sus_box_2" v-if="pair[1].gstatus != 'OPEN'">
                                                        <rect id="a_p_b_sus_2" x="733" y="566" width="281" height="85" rx="8"
                                                            fill="black" fill-opacity="0.3" />
                                                        <path id="a_p_b_lock_2"
                                                            d="M885.679 587.75H884.018V582.688C884.018 576.795 879.299 572 873.5 572C867.701 572 862.982 576.795 862.982 582.688V587.75H861.321C859.488 587.75 858 589.262 858 591.125V604.625C858 606.488 859.488 608 861.321 608H885.679C887.512 608 889 606.488 889 604.625V591.125C889 589.262 887.512 587.75 885.679 587.75ZM878.482 587.75H868.518V582.688C868.518 579.896 870.753 577.625 873.5 577.625C876.247 577.625 878.482 579.896 878.482 582.688V587.75Z"
                                                            fill="white" />
                                                    </g>
                                                    <text id="10000_8" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans" font-size="34"
                                                        letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="middle">
                                                        <tspan :class="{'suspended-book': pair[1].gstatus != 'OPEN'}" :x="getRectCenterCordinates(277, 735)" 
        :y="getRectCenterCordinates(81, 568)" v-vcasinofancybook="{sid: pair[1].sid, subid: 0}">0</tspan>
                                                    </text>
                                                </g>
                                            </g>
                                        </g>
                                        <g id="title">
                                            <text id="PLAYER" fill="black" xml:space="preserve" style="white-space: pre"
                                                font-family="droidsans-bold" font-size="50" font-weight="bold" letter-spacing="0em">
                                                <tspan x="430" y="318.891">PLAYER</tspan>
                                            </text>
                                            <text id="3 BACCARAT" fill="black" xml:space="preserve" style="white-space: pre"
                                                font-family="droidsans-bold" font-size="50" font-weight="bold" letter-spacing="0em">
                                                <tspan x="369" y="421.891">3 BACCARAT</tspan>
                                            </text>
                                            <text id="TOTAL" fill="black" xml:space="preserve" style="white-space: pre"
                                                font-family="droidsans-bold" font-size="50" font-weight="bold" letter-spacing="0em">
                                                <tspan x="436" y="526.891">TOTAL</tspan>
                                            </text>
                                            <text id="PAIR PLUS" fill="black" xml:space="preserve" style="white-space: pre"
                                                font-family="droidsans-bold" font-size="50" font-weight="bold" letter-spacing="0em">
                                                <tspan x="397" y="631.891">PAIR PLUS</tspan>
                                            </text>
                                        </g>
                                    </g>
                                    <rect id="divider" width="5" height="85" transform="matrix(1 0 0 -1 504 771)"
                                        fill="#6E4407" />
                                    <g id="other_odds">
                                        <g id="player_a_2">
                                            <g id="red">
                                                <g id="back_9" style="cursor: pointer;" @click="setBetData(redBlack[0].nat, redBlack[0].b, mId, redBlack[0].sid, redBlack[0].subtype, 0, 'back', gameType, redBlack[0].gstatus, redBlack[0].min, redBlack[0].max)">
                                                    <rect id="a_r_back" x="2" y="688" width="219" height="81" rx="6"
                                                        fill="#C4C4C4" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4" />
                                                    <text id="1.99_9" fill="black" xml:space="preserve" style="white-space: pre"
                                                        font-family="droidsans-bold" font-size="40" font-weight="bold"
                                                        letter-spacing="0em" dominant-baseline="text-top" text-anchor="end">
                                                        <tspan x="216" :y="getRectCenterCordinates(81, 688)">{{ redBlack[0].b }}</tspan>
                                                    </text>
                                                    <rect id="spadeIcon" x="4.76154" y="705" width="39.6797" height="50"
                                                        fill="url(#spade)" />
                                                    <rect id="clubIcon" x="44.4413" y="705" width="39.6797" height="50"
                                                        fill="url(#club)" />
                                                    <g id="a_r_back_sus_box" v-if="redBlack[0].gstatus != 'OPEN'">
                                                        <rect id="a_r_b_sus" y="686" width="223" height="85" rx="8" fill="black"
                                                            fill-opacity="0.3" />
                                                        <path id="a_r_b_lock"
                                                            d="M51.9656 726.75H50.6476V721.688C50.6476 715.795 46.9025 711 42.3007 711C37.6989 711 33.9538 715.795 33.9538 721.688V726.75H32.6359C31.1806 726.75 30 728.262 30 730.125V743.625C30 745.488 31.1806 747 32.6359 747H51.9656C53.4208 747 54.6014 745.488 54.6014 743.625V730.125C54.6014 728.262 53.4208 726.75 51.9656 726.75ZM46.2545 726.75H38.3469V721.688C38.3469 718.896 40.1206 716.625 42.3007 716.625C44.4808 716.625 46.2545 718.896 46.2545 721.688V726.75Z"
                                                            fill="white" />
                                                    </g>
                                                    <text id="10000_9" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans" font-size="34"
                                                        letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="end">
                                                        <tspan :class="{'suspended-book': redBlack[0].gstatus != 'OPEN'}" x="216" 
        :y="getRectCenterCordinates(81, 688)" v-vcasinofancybook="{sid: redBlack[0].sid, subid: 0}">0</tspan>
                                                    </text>
                                                </g>
                                            </g>
                                            <g id="black">
                                                <g id="back_10" style="cursor: pointer;" @click="setBetData(redBlack[1].nat, redBlack[1].b, mId, redBlack[1].sid, redBlack[1].subtype, 0, 'back', gameType, redBlack[1].gstatus, redBlack[1].min, redBlack[1].max)">
                                                    <rect id="a_b_back" x="246" y="688" width="219" height="81" rx="6"
                                                        fill="#C4C4C4" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4" />
                                                    <text id="1.99_10" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans-bold" font-size="40"
                                                        font-weight="bold" letter-spacing="0em" dominant-baseline="text-top" text-anchor="end">
                                                        <tspan :x="219+241" :y="getRectCenterCordinates(81, 688)">{{ redBlack[1].b }}</tspan>
                                                    </text>
                                                    <rect id="heartIcon" x="250" y="704" width="50" height="50"
                                                        fill="url(#heart)" />
                                                    <rect id="diamondIcon" x="300" y="705" width="50" height="50"
                                                        fill="url(#diamond)" />
                                                    <g id="a_b_back_sus_box"  v-if="redBlack[1].gstatus != 'OPEN'">
                                                        <rect id="a_b_b_sus" x="244" y="686" width="223" height="85" rx="8"
                                                            fill="black" fill-opacity="0.3" />
                                                        <path id="a_b_b_lock"
                                                            d="M295.966 726.75H294.648V721.688C294.648 715.795 290.902 711 286.301 711C281.699 711 277.954 715.795 277.954 721.688V726.75H276.636C275.181 726.75 274 728.262 274 730.125V743.625C274 745.488 275.181 747 276.636 747H295.966C297.421 747 298.601 745.488 298.601 743.625V730.125C298.601 728.262 297.421 726.75 295.966 726.75ZM290.255 726.75H282.347V721.688C282.347 718.896 284.121 716.625 286.301 716.625C288.481 716.625 290.255 718.896 290.255 721.688V726.75Z"
                                                            fill="white" />
                                                    </g>
                                                    <text id="10000_10" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans" font-size="34"
                                                        letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="end">
                                                        <tspan :class="{'suspended-book': redBlack[1].gstatus != 'OPEN'}" :x="219+241" 
        :y="getRectCenterCordinates(81, 688)" v-vcasinofancybook="{sid: redBlack[1].sid, subid: 0}">0</tspan>
                                                    </text>
                                                </g>
                                            </g>
                                        </g>
                                        <g id="player_b_2">
                                            <g id="red_2">
                                                <g id="back_11" style="cursor: pointer;" @click="setBetData(redBlack[2].nat, redBlack[2].b, mId, redBlack[2].sid, redBlack[2].subtype, 0, 'back', gameType, redBlack[2].gstatus, redBlack[2].min, redBlack[2].max)">
                                                    <rect id="b_r_back" x="549" y="688" width="219" height="81" rx="6"
                                                        fill="#C4C4C4" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4" />
                                                    <text id="1.99_11" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans-bold" font-size="40"
                                                        font-weight="bold" letter-spacing="0em" dominant-baseline="text-top" text-anchor="end">
                                                        <tspan :x="219+544" :y="getRectCenterCordinates(81, 688)">{{ redBlack[2].b }}</tspan>
                                                    </text>
                                                    <rect id="spadeIcon1" x="551.762" y="705" width="39.6797" height="50"
                                                        fill="url(#spade)" />
                                                    <rect id="clubIcon1" x="591.441" y="705" width="39.6797" height="50"
                                                        fill="url(#club)" />
                                                    <g id="b_r_back_sus_box" v-if="redBlack[2].gstatus != 'OPEN'">
                                                        <rect id="b_r_b_sus" x="547" y="686" width="223" height="85" rx="8"
                                                            fill="black" fill-opacity="0.3" />
                                                        <path id="b_r_b_lock"
                                                            d="M598.966 726.75H597.648V721.688C597.648 715.795 593.902 711 589.301 711C584.699 711 580.954 715.795 580.954 721.688V726.75H579.636C578.181 726.75 577 728.262 577 730.125V743.625C577 745.488 578.181 747 579.636 747H598.966C600.421 747 601.601 745.488 601.601 743.625V730.125C601.601 728.262 600.421 726.75 598.966 726.75ZM593.255 726.75H585.347V721.688C585.347 718.896 587.121 716.625 589.301 716.625C591.481 716.625 593.255 718.896 593.255 721.688V726.75Z"
                                                            fill="white" />
                                                    </g>
                                                    <text id="10000_11" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans" font-size="34"
                                                        letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="end">
                                                        <tspan :class="{'suspended-book': redBlack[2].gstatus != 'OPEN'}" :x="219+544" 
        :y="getRectCenterCordinates(81, 688)" v-vcasinofancybook="{sid: redBlack[2].sid, subid: 0}">0</tspan>
                                                    </text>
                                                </g>
                                            </g>
                                            <g id="black_2">
                                                <g id="back_12" style="cursor: pointer;" @click="setBetData(redBlack[3].nat, redBlack[3].b, mId, redBlack[3].sid, redBlack[3].subtype, 0, 'back', gameType, redBlack[3].gstatus, redBlack[3].min, redBlack[3].max)">
                                                    <rect id="b_b_back" x="793" y="688" width="219" height="81" rx="6"
                                                        fill="#C4C4C4" fill-opacity="0.01" stroke="#4F9CD2" stroke-width="4" />
                                                    <text id="1.99_12" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans-bold" font-size="40"
                                                        font-weight="bold" letter-spacing="0em" dominant-baseline="text-top" text-anchor="end">
                                                        <tspan :x="219+788" :y="getRectCenterCordinates(81, 688)">{{ redBlack[3].b }}</tspan>
                                                    </text>
                                                    <rect id="heartIcon1" x="797" y="704" width="50" height="50"
                                                        fill="url(#heart)" />
                                                    <rect id="diamondIcon1" x="847" y="705" width="50" height="50"
                                                        fill="url(#diamond)" />
                                                    <g id="b_b_back_sus_box" v-if="redBlack[3].gstatus != 'OPEN'">
                                                        <rect id="b_b_b_sus" x="791" y="686" width="223" height="85" rx="8"
                                                            fill="black" fill-opacity="0.3" />
                                                        <path id="b_b_b_lock"
                                                            d="M842.966 726.75H841.648V721.688C841.648 715.795 837.902 711 833.301 711C828.699 711 824.954 715.795 824.954 721.688V726.75H823.636C822.181 726.75 821 728.262 821 730.125V743.625C821 745.488 822.181 747 823.636 747H842.966C844.421 747 845.601 745.488 845.601 743.625V730.125C845.601 728.262 844.421 726.75 842.966 726.75ZM837.255 726.75H829.347V721.688C829.347 718.896 831.121 716.625 833.301 716.625C835.481 716.625 837.255 718.896 837.255 721.688V726.75Z"
                                                            fill="white" />
                                                    </g>
                                                    <text id="10000_12" fill="black" xml:space="preserve"
                                                        style="white-space: pre" font-family="droidsans" font-size="34"
                                                        letter-spacing="0em" dominant-baseline="text-before-edge" text-anchor="end">
                                                        <tspan :class="{'suspended-book': redBlack[3].gstatus != 'OPEN'}" :x="219+788" 
        :y="getRectCenterCordinates(81, 688)" v-vcasinofancybook="{sid: redBlack[3].sid, subid: 0}">0</tspan>
                                                    </text>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </template>
                            </g>
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


                                <pattern id="spade" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#spade_img" transform="translate(-0.130045) scale(0.0252018 0.02)" />
                                </pattern>
                                <pattern id="club" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#club_img" transform="translate(-0.130045) scale(0.0252018 0.02)" />
                                </pattern>
                                <pattern id="heart" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#heart_img" transform="translate(-0.130045) scale(0.0252018 0.02)" />
                                </pattern>
                                <pattern id="diamond" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#diamond_img" transform="translate(-0.130045) scale(0.0252018 0.02)" />
                                </pattern>
                                <!-- <pattern id="pattern7" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image2" transform="translate(-0.130045) scale(0.0252018 0.02)" />
                                </pattern>
                                <pattern id="pattern8" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image3" transform="scale(0.02)" />
                                </pattern>
                                <pattern id="pattern9" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image4" transform="scale(0.02)" />
                                </pattern> -->
                                <pattern id="pattern10" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image1" transform="translate(-0.130045) scale(0.0252018 0.02)" />
                                </pattern>
                                <pattern id="pattern11" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image2" transform="translate(-0.130045) scale(0.0252018 0.02)" />
                                </pattern>
                                <pattern id="pattern12" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image3" transform="scale(0.02)" />
                                </pattern>
                                <pattern id="pattern13" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image4" transform="scale(0.02)" />
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

                                <image id="spade_img" data-name="spade.png" width="50" height="50"
                                    :href="`${imgPath}front/img/cards/spade.png`">
                                </image>
                                <image id="club_img" data-name="club.png" width="50" height="50"
                                    :href="`${imgPath}front/img/cards/club.png`">
                                </image>
                                <image id="heart_img" data-name="heart.png" width="50" height="50"
                                    :href="`${imgPath}front/img/cards/heart.png`">
                                </image>
                                <image id="diamond_img" data-name="diamond.png" width="50" height="50"
                                    :href="`${imgPath}front/img/cards/diamond.png`">
                                </image>`
                            </defs>
                        </svg>
                        <!-- ODDS SVG END -->

                    </div>
                </div>
                <!-- WEB ODDS ENd -->
            </div>
        </template>
        <!-- WEB END -->

        <!-- MOBILE START -->
        <template v-if="!$store.getters.isTablet">
            <div class="w-100 vteen-mobile">
                <!-- MOBILE BG START -->
                <div class="virtual-casino-bg d-none-big">
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
                                    <rect id="sound_icon_bg" x="1087.9" y="11" width="71" height="71" rx="23" fill="url(#paint2_linear)" stroke="#FDC834" stroke-width="2"></rect>
                                    <path id="sound_icon" d="M1121.54 27.7253L1112.74 36.4621H1102.66C1101.35 36.4621 1100.28 37.5169 1100.28 38.8194V52.9633C1100.28 54.2647 1101.35 55.3206 1102.66 55.3206H1112.74L1121.54 64.0574C1123.03 65.5336 1125.59 64.4964 1125.59 62.3905V29.3921C1125.59 27.2842 1123.02 26.251 1121.54 27.7253ZM1147.73 45.8913C1147.73 39.6513 1144.56 33.9142 1139.25 30.5452C1138.15 29.8439 1136.68 30.17 1135.98 31.2779C1135.28 32.3859 1135.61 33.8523 1136.71 34.5546C1140.64 37.0484 1142.99 41.2857 1142.99 45.8913C1142.99 50.4969 1140.64 54.7342 1136.71 57.228C1135.61 57.9293 1135.28 59.3958 1135.98 60.5047C1136.62 61.5223 1138.07 61.9918 1139.25 61.2374C1144.56 57.8684 1147.73 52.1313 1147.73 45.8913ZM1133.72 38.341C1132.57 37.7193 1131.13 38.1289 1130.5 39.2692C1129.86 40.4096 1130.28 41.8426 1131.43 42.4722C1132.71 43.1686 1133.5 44.4799 1133.5 45.8913C1133.5 47.3037 1132.71 48.614 1131.43 49.3104C1130.28 49.94 1129.86 51.373 1130.5 52.5134C1131.13 53.6587 1132.58 54.0653 1133.72 53.4416C1136.51 51.9142 1138.24 49.0216 1138.24 45.8903C1138.24 42.759 1136.51 39.8674 1133.72 38.341Z" fill="white"></path>
                                </g>
                            </template>
                            <!-- OTHER SOUND ON ICON END -->
                            <!-- OTHER SOUND OFF ICON START -->
                            <template v-else>
                                <g id="sound_off_icon_box" style="cursor: pointer;" @click="muteOtherSound()">
                                    <rect id="sound_off_icon_bg" x="1087.9" y="11" width="71" height="71" rx="23" fill="url(#paint2_linear)" stroke="#FDC834" stroke-width="2"></rect>
                                    <path id="sound_off_icon" d="M1119.31 27.7253L1110.43 36.4621H1100.25C1098.92 36.4621 1097.85 37.5169 1097.85 38.8194V52.9633C1097.85 54.2647 1098.92 55.3206 1100.25 55.3206H1110.43L1119.31 64.0574C1120.81 65.5336 1123.4 64.4964 1123.4 62.3905V29.3921C1123.4 27.2842 1120.81 26.251 1119.31 27.7253ZM1143.92 45.8913L1148.48 41.4085C1149.11 40.7897 1149.11 39.7859 1148.48 39.1671L1146.2 36.9257C1145.57 36.3069 1144.55 36.3069 1143.92 36.9257L1139.37 41.4085L1134.81 36.9257C1134.18 36.3069 1133.16 36.3069 1132.54 36.9257L1130.26 39.1671C1129.63 39.7859 1129.63 40.7897 1130.26 41.4085L1134.81 45.8913L1130.26 50.3732C1129.63 50.9919 1129.63 51.9958 1130.26 52.6146L1132.54 54.856C1133.17 55.4748 1134.19 55.4748 1134.81 54.856L1139.37 50.3741L1143.92 54.857C1144.55 55.4758 1145.57 55.4758 1146.2 54.857L1148.48 52.6155C1149.11 51.9968 1149.11 50.9929 1148.48 50.3741L1143.92 45.8913Z" fill="white"></path>
                                </g>
                            </template>
                            <!-- OTHER SOUND OFF ICON END -->

                            <!-- MUSIC ON ICON START -->
                            <template v-if="sound.bgMusic">
                                <g id="music_icon_box" style="cursor: pointer;" @click="muteBackgroundSound()">
                                    <rect id="music_icon_bg" x="1177.93" y="11" width="71" height="71" rx="23" fill="url(#paint1_linear)" stroke="#FDC834" stroke-width="2"></rect>
                                    <path id="music_icon" d="M1229.83 27.1423L1206.26 34.1033C1205.78 34.2536 1205.37 34.5526 1205.07 34.9568C1204.77 35.361 1204.61 35.8494 1204.61 36.351V55.6089C1203.84 55.4216 1203.05 55.3247 1202.26 55.3202C1198.35 55.3202 1195.18 57.4315 1195.18 60.035C1195.18 62.6385 1198.35 64.7499 1202.26 64.7499C1206.16 64.7499 1209.33 62.6385 1209.33 60.035V42.8199L1228.19 37.2947V50.8948C1227.41 50.7068 1226.62 50.6096 1225.83 50.6053C1221.92 50.6053 1218.76 52.7167 1218.76 55.3202C1218.76 57.9236 1221.92 60.035 1225.83 60.035C1229.73 60.035 1232.9 57.9244 1232.9 55.3202V29.3884C1232.9 29.0184 1232.81 28.6535 1232.64 28.3235C1232.48 27.9935 1232.23 27.7076 1231.94 27.4889C1231.64 27.2702 1231.29 27.1248 1230.93 27.0646C1230.56 27.0044 1230.19 27.031 1229.83 27.1423Z" fill="white"></path>
                                </g>
                            </template>
                            <!-- MUSIC ON ICON END -->
                            <!-- MUSIC OFF ICON START -->
                            <template v-else>
                                <g id="music_off_icon_box" style="cursor: pointer;" @click="muteBackgroundSound()">
                                    <rect id="music_off_icon_bg" x="1177.93" y="11" width="71" height="71" rx="23" fill="url(#paint1_linear)" stroke="#FDC834" stroke-width="2"></rect>
                                    <path id="music_off_icon" d="M1204.55 55.6088C1203.77 55.4215 1202.98 55.3246 1202.18 55.3201C1198.25 55.3201 1195.06 57.4313 1195.06 60.0347C1195.06 62.6381 1198.25 64.7493 1202.18 64.7493C1206.11 64.7493 1209.3 62.6381 1209.3 60.0347V51.1859L1204.55 47.5424V55.6088ZM1237.31 60.7787L1232.49 57.0748C1232.82 56.5319 1233.02 55.944 1233.02 55.3201V29.3896C1233.02 29.0195 1232.93 28.6547 1232.76 28.3248C1232.6 27.9948 1232.35 27.7089 1232.05 27.4902C1231.75 27.2715 1231.4 27.1261 1231.04 27.0659C1230.67 27.0057 1230.29 27.0323 1229.94 27.1435L1206.21 34.1042C1205.84 34.2221 1205.5 34.4301 1205.23 34.7095C1204.96 34.9889 1204.76 35.3309 1204.66 35.705L1193.69 27.282C1193.56 27.1868 1193.42 27.1166 1193.27 27.0755C1193.12 27.0344 1192.97 27.0231 1192.81 27.0423C1192.66 27.0615 1192.51 27.1109 1192.37 27.1875C1192.24 27.2642 1192.12 27.3666 1192.02 27.489L1190.57 29.3506C1190.37 29.5973 1190.29 29.9102 1190.33 30.2203C1190.36 30.5305 1190.53 30.8125 1190.77 31.0044L1234.4 64.5011C1234.52 64.5963 1234.66 64.6665 1234.81 64.7076C1234.96 64.7487 1235.12 64.76 1235.27 64.7408C1235.43 64.7215 1235.58 64.6722 1235.71 64.5955C1235.85 64.5189 1235.97 64.4164 1236.06 64.2941L1237.52 62.4325C1237.71 62.1857 1237.8 61.8729 1237.76 61.5628C1237.72 61.2526 1237.56 60.9706 1237.31 60.7787ZM1228.28 50.8942C1227.5 50.7068 1226.7 50.6099 1225.9 50.6054C1225.35 50.6129 1224.8 50.6649 1224.26 50.7609L1212.65 41.8473L1228.28 37.294V50.8942Z" fill="white"></path>
                                </g>
                            </template>
                            <!-- MUSIC OFF ICON END -->

                            <!-- HOME ICON START -->
                            <router-link :to="{name: 'owncasinolist'}">
                                <g id="home_icon_box">
                                    <rect id="home_icon_bg" x="1267.97" y="11" width="71" height="71" rx="23"
                                        fill="url(#paint0_linear)" stroke="#FDC834" stroke-width="2"></rect>
                                    <path id="home_icon"
                                        d="M1302.13 35.6468L1284.61 50.0821V65.6619C1284.61 66.0653 1284.77 66.4522 1285.05 66.7374C1285.34 67.0227 1285.73 67.1829 1286.13 67.1829L1296.78 67.1554C1297.18 67.1534 1297.57 66.9922 1297.85 66.7072C1298.13 66.4222 1298.29 66.0364 1298.29 65.6344V56.5359C1298.29 56.1325 1298.45 55.7457 1298.74 55.4604C1299.02 55.1752 1299.41 55.0149 1299.81 55.0149H1305.9C1306.3 55.0149 1306.69 55.1752 1306.97 55.4604C1307.26 55.7457 1307.42 56.1325 1307.42 56.5359V65.6277C1307.42 65.8279 1307.46 66.0262 1307.53 66.2112C1307.61 66.3963 1307.72 66.5646 1307.86 66.7063C1308 66.848 1308.17 66.9605 1308.36 67.0372C1308.54 67.114 1308.74 67.1535 1308.94 67.1535L1319.59 67.1829C1319.99 67.1829 1320.38 67.0227 1320.66 66.7374C1320.95 66.4522 1321.11 66.0653 1321.11 65.6619V50.0717L1303.59 35.6468C1303.38 35.4808 1303.12 35.3902 1302.86 35.3902C1302.6 35.3902 1302.34 35.4808 1302.13 35.6468ZM1329.81 45.4583L1321.87 38.9075V25.7404C1321.87 25.4378 1321.75 25.1477 1321.53 24.9337C1321.32 24.7198 1321.03 24.5996 1320.73 24.5996H1315.4C1315.1 24.5996 1314.81 24.7198 1314.6 24.9337C1314.38 25.1477 1314.26 25.4378 1314.26 25.7404V32.6429L1305.75 25.6405C1304.94 24.9684 1303.91 24.601 1302.85 24.601C1301.8 24.601 1300.77 24.9684 1299.96 25.6405L1275.9 45.4583C1275.78 45.5537 1275.69 45.671 1275.62 45.8035C1275.55 45.9359 1275.5 46.0808 1275.49 46.23C1275.47 46.3792 1275.49 46.5297 1275.53 46.673C1275.58 46.8162 1275.65 46.9494 1275.75 47.0648L1278.17 50.0118C1278.26 50.1276 1278.38 50.2236 1278.51 50.2941C1278.65 50.3646 1278.79 50.4083 1278.94 50.4227C1279.09 50.4371 1279.24 50.4219 1279.38 50.3779C1279.53 50.334 1279.66 50.2622 1279.78 50.1667L1302.13 31.7493C1302.34 31.5832 1302.6 31.4927 1302.86 31.4927C1303.12 31.4927 1303.38 31.5832 1303.59 31.7493L1325.94 50.1667C1326.06 50.2623 1326.19 50.3341 1326.34 50.3782C1326.48 50.4223 1326.63 50.4377 1326.78 50.4235C1326.93 50.4094 1327.07 50.366 1327.21 50.2959C1327.34 50.2257 1327.45 50.1301 1327.55 50.0146L1329.97 47.0677C1330.07 46.9516 1330.14 46.8177 1330.18 46.6738C1330.23 46.53 1330.24 46.3789 1330.23 46.2294C1330.21 46.0798 1330.17 45.9347 1330.1 45.8024C1330.03 45.67 1329.93 45.5531 1329.81 45.4583Z"
                                        fill="white"></path>
                                </g>
                            </router-link>
                            <!-- HOME ICON END -->

                            <!-- RULES ICON START -->
                            <g id="rule_icon_box" @click="getCasinoRulesHtml()" style="cursor: pointer;">
                                <rect id="home_icon_bg_2" x="1358" y="11" width="71" height="71" rx="23" fill="url(#paint3_linear)" stroke="#FDC834" stroke-width="2"></rect>
                                <path id="rule_icon" d="M1386.88 62.4908H1388.79V48.7598H1386.88C1385.83 48.7598 1384.98 47.9087 1384.98 46.8588V42.318C1384.98 41.2681 1385.83 40.417 1386.88 40.417H1397.53C1398.58 40.417 1399.43 41.2681 1399.43 42.318V62.4908H1401.33C1402.38 62.4908 1403.23 63.3419 1403.23 64.3919V68.9326C1403.23 69.9826 1402.38 70.8337 1401.33 70.8337H1386.88C1385.83 70.8337 1384.98 69.9826 1384.98 68.9326V64.3919C1384.98 63.3419 1385.83 62.4908 1386.88 62.4908ZM1394.11 22.167C1390.33 22.167 1387.26 25.231 1387.26 29.0107C1387.26 32.7905 1390.33 35.8545 1394.11 35.8545C1397.89 35.8545 1400.95 32.7905 1400.95 29.0107C1400.95 25.231 1397.89 22.167 1394.11 22.167Z" fill="white"></path>
                            </g>
                            <!-- RULES ICON END -->


                            <!-- LAST RESULTS START -->
                            <template v-if="$store.state.lastResults">
                                <g id="last_results">
                                    <rect id="last_result_bg" x="1233.5" y="102.5" width="195" height="548" rx="6.5"
                                        fill="#2C153C" fill-opacity="0.5" stroke="#573673" stroke-width="3"></rect>
                                    
                                    <g id="last_result_1" style="cursor: pointer;" @click="showResult(0)">
                                        <rect id="last_result1-box" x="1245.5" y="121.908" width="80.1268" height="80.1268"
                                            rx="3.5" stroke="white"></rect>
                                        <text id="A" :fill="getResultColor(0)" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1258.55" y="190.535">{{ getResultLable(0) }}</tspan>
                                        </text>
                                    </g>
                                    
                                    <g id="last_result_2" style="cursor: pointer;" @click="showResult(1)">
                                        <rect id="last_result2-box" x="1336.15" y="121.908" width="80.1268" height="80.1268"
                                            rx="3.5" stroke="white"></rect>
                                        <text id="B" :fill="getResultColor(1)" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1352.94" y="190.535">{{ getResultLable(1) }}</tspan>
                                        </text>
                                    </g>
                                    
                                    <g id="last_result_1_2" style="cursor: pointer;" @click="showResult(2)">
                                        <rect id="last_result1-box_2" x="1245.5" y="212.908" width="80.1268" height="80.1268"
                                            rx="3.5" stroke="white"></rect>
                                        <text id="A_2" :fill="getResultColor(2)" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1258.55" y="281.535">{{ getResultLable(2) }}</tspan>
                                        </text>
                                    </g>
                                    
                                    <g id="last_result_2_2" style="cursor: pointer;" @click="showResult(3)">
                                        <rect id="last_result2-box_2" x="1336.15" y="212.908" width="80.1268" height="80.1268"
                                            rx="3.5" stroke="white"></rect>
                                        <text id="B_2" :fill="getResultColor(3)" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1352.94" y="281.535">{{ getResultLable(3) }}</tspan>
                                        </text>
                                    </g>
                                    
                                    <g id="last_result_1_3" style="cursor: pointer;" @click="showResult(4)">
                                        <rect id="last_result1-box_3" x="1245.5" y="303.908" width="80.1268" height="80.1268"
                                            rx="3.5" stroke="white"></rect>
                                        <text id="A_3" :fill="getResultColor(4)" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1258.55" y="372.535">{{ getResultLable(4) }}</tspan>
                                        </text>
                                    </g>

                                    <g id="last_result_2_3" style="cursor: pointer;" @click="showResult(5)">
                                        <rect id="last_result2-box_3" x="1336.15" y="303.908" width="80.1268" height="80.1268"
                                            rx="3.5" stroke="white"></rect>
                                        <text id="B_3" :fill="getResultColor(5)" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1352.94" y="372.535">{{ getResultLable(5) }}</tspan>
                                        </text>
                                    </g>
                                    
                                    <g id="last_result_1_4" style="cursor: pointer;" @click="showResult(6)">
                                        <rect id="last_result1-box_4" x="1245.5" y="394.908" width="80.1268" height="80.1268"
                                            rx="3.5" stroke="white"></rect>
                                        <text id="A_4" :fill="getResultColor(6)" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1258.55" y="463.535">{{ getResultLable(6) }}</tspan>
                                        </text>
                                    </g>
                                    
                                    <g id="last_result_2_4" style="cursor: pointer;" @click="showResult(7)">
                                        <rect id="last_result2-box_4" x="1336.15" y="394.908" width="80.1268" height="80.1268"
                                            rx="3.5" stroke="white"></rect>
                                        <text id="B_4" :fill="getResultColor(7)" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1352.94" y="463.535">{{ getResultLable(7) }}</tspan>
                                        </text>
                                    </g>
                                    
                                    <g id="last_result_1_5" style="cursor: pointer;" @click="showResult(8)">
                                        <rect id="last_result1-box_5" x="1245.5" y="486.908" width="80.1268" height="80.1268"
                                            rx="3.5" stroke="white"></rect>
                                        <text id="A_5" :fill="getResultColor(8)" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1258.55" y="555.535">{{ getResultLable(8) }}</tspan>
                                        </text>
                                    </g>
                                    
                                    <g id="last_result_2_5" style="cursor: pointer;" @click="showResult(9)">
                                        <rect id="last_result2-box_5" x="1336.15" y="486.908" width="80.1268" height="80.1268"
                                            rx="3.5" stroke="white"></rect>
                                        <text id="B_5" :fill="getResultColor(9)" xml:space="preserve" style="white-space: pre"
                                            font-family="Noto Sans" font-size="80" font-weight="bold" letter-spacing="0em">
                                            <tspan x="1352.94" y="555.535">{{ getResultLable(9) }}</tspan>
                                        </text>
                                    </g>
                                    
                                    <router-link class="result-more"
                                        :to="{name: 'casinoResult', params: {gameType: $store.state.casinoGameType}}">
                                        <g id="last_result_all">
                                            <rect id="more_result" x="1299" y="575" width="68.9577" height="70.3099"
                                                fill="url(#plusMobileIcon)"></rect>
                                        </g>
                                    </router-link>

                                </g>
                            </template>
                            <!-- LAST RESULTS END -->

                        </g>

                        <defs>
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
                                xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAADLCAYAAADEDrcOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDZGMTEwRkJGNUUzMTFFQjlFNkNBM0M5REZERDRDREIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDZGMTEwRkNGNUUzMTFFQjlFNkNBM0M5REZERDRDREIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNkYxMTBGOUY1RTMxMUVCOUU2Q0EzQzlERkRENENEQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNkYxMTBGQUY1RTMxMUVCOUU2Q0EzQzlERkRENENEQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvplFlQAAAZqSURBVHja7N1PiJR1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">
                            </image>
                        </defs>
                    </svg>
                </div>
                <!-- MOBILE BG END -->

                <!-- MOBILE ODDS START -->
                <div class="virtual-casino-odds d-none-big">
                    <div class="decks-block" :style="{'z-index': leftDecks.length > 20 ? 7 : 1}">
                        <!-- left card deck -->
                        <img class="left-card-deck" :src="`${boardPath}/cardDeckLeft.svg`" />

                        <!-- right card deck -->
                        <img class="right-card-box-back" :src="`${boardPath}/cardDeckRightBox.svg`" />
                        <img class="right-card-box-middle" :src="`${boardPath}/cardHolder.svg`" :style="{
                                right: (-4 - rightDecks.length * 0.095) + '%',
                                top: (22 - rightDecks.length * 0.215) + '%',
                                transform: `translate(${5 - (rightDecks.length * 5 / deckLength)}%, ${2 - (rightDecks.length * 2 / deckLength)}%)`
                                }" />

                        <div class="decks empty-card-in-deck-right " :class="{'finish-deck': finishedRightDeck}" :style="{
                                right: (0.4 - rightDecks.length * 0.078) + '%',
                                top: (25 - rightDecks.length * 0.215) + '%',
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
                        <svg viewBox="0 0 1354 1411" fill="none" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink">
                            
                            <rect v-if="casinoData.rdesc == '1'" id="winner a" y="0" width="227" height="240.065" fill="url(#mobileWinner)"></rect>

                            <rect v-if="casinoData.rdesc == '2'" id="winner a_2" x="1150" y="0" width="227" height="240.065" fill="url(#mobileWinner)"></rect>

                            <g id="odds">
                                <g id="player_title">
                                    <text id="PLAYER A" fill="#EF0518" xml:space="preserve" style="white-space: pre"
                                        font-family="Noto Sans" font-size="70" font-weight="bold" letter-spacing="0em">
                                        <tspan x="207.271" y="74.6558">PLAYER A</tspan>
                                    </text>
                                    <text id="PLAYER B" fill="#00A200" xml:space="preserve" style="white-space: pre"
                                        font-family="Noto Sans" font-size="70" font-weight="bold" letter-spacing="0em">
                                        <tspan x="803" y="74.6558">PLAYER B</tspan>
                                    </text>
                                </g>

                                <template v-if="casinoData && casinoData.mid">
                                    
                                </template>
                            </g>

                            <defs>
                                <pattern id="mobileWinner" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#mobileWinnerImg" transform="translate(-0.028777) scale(0.00413107 0.00390625)"></use>
                                </pattern>

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

                                <image id="image0" data-name="2CC.png" width="50" height="70"
                                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABGCAIAAAAB7lAxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTAzRDhCQ0Y4N0NDMTFFQkFERTFCNDQ1QTM0RjExRUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTAzRDhCQ0U4N0NDMTFFQkFERTFCNDQ1QTM0RjExRUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4QzAxMUVGODEyQTkxMUVCQjk5MkNERjYyQ0I3MTlCQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QzAxMUVGOTEyQTkxMUVCQjk5MkNERjYyQ0I3MTlCQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmCMvh0AAAovSURBVHjaxJpZSFVf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">
                                </image>

                                <image id="mobileWinnerImg" data-name="winner.png" width="256" height="256" :href="`${imgPath}front/img/svg_casino/icons/winner-left.png`"></image>
                            </defs>
                        </svg>
                        <!-- ODDS SVG END -->
                    </div>
                </div>
                <!-- MOBILE ODDS END -->
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
                    <div v-if="$store.state.casinoBet.subType != 'vpair'">{{ $store.state.casinoBet.uRate }}</div>
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
                mute: !this.sound.bgMusic
            });
            
            if( localStorage.getItem("sound") ){
                this.sound = JSON.parse(localStorage.getItem("sound"))
                if(!this.sound.otherSound){
                    cardSuffle.mute(true)
                    cardFlip.mute(true)
                    winnerMusic.mute(true)
                }
                if(!this.sound.bgMusic){
                    backgroundMusic.mute(true)
                }
            }else{
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
            VirtualTimerProgress,
            // LastResultIcon,
            // Card,
            Loader,
            InactivityModal,
            CasinoResult,
            AccountStatementSoda,
        },
        computed: {
            player() {
                var player = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'vplayer'
                })
                return this.orderBy(player, 'sr')
            },
            pair() {
                var pair = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'vpair'
                })
                return this.orderBy(pair, 'sr')
            },
            khal() {
                var khal = _.filter(_.get(this.casinoData, 'sub'), (o) => {
                    return (o.subtype == 'vkhal')
                })
                return this.orderBy(khal, 'sr')
            },
            redBlack() {
                var redBlack = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'vredblack'
                })
                return this.orderBy(redBlack, 'sr')
            },
            total() {
                var total = _.filter(_.get(this.casinoData, 'sub'), {
                    'subtype': 'vtotal'
                })
                return this.orderBy(total, 'sr')
            }
        },
        data() {
            return {
                dealer: 1,
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
                gameType: 'vteen20',
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
                // cardFlipAudio: null,
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
            muteOtherSound(){
                if(this.sound.otherSound){
                    // console.log('cardSuffle', cardSuffle)
                    cardSuffle.mute(true)

                    // console.log('cardFlip', cardFlip)
                    cardFlip.mute(true)

                    // console.log('winnerMusic', winnerMusic)
                    winnerMusic.mute(true)

                    this.sound.otherSound = false
                    localStorage.setItem("sound", JSON.stringify(this.sound));
                }else{
                    cardSuffle.mute(false)
                    cardFlip.mute(false)
                    winnerMusic.mute(false)

                    this.sound.otherSound = true
                    localStorage.setItem("sound", JSON.stringify(this.sound));
                }
                console.log('other sound', this.sound.otherSound)
            },
            muteBackgroundSound(){
                if(this.sound.bgMusic){
                    // console.log('backgroundMusic', backgroundMusic)
                    backgroundMusic.mute(true)

                    this.sound.bgMusic = false
                    localStorage.setItem("sound", JSON.stringify(this.sound));
                }else{
                    backgroundMusic.mute(false)

                    this.sound.bgMusic = true
                    localStorage.setItem("sound", JSON.stringify(this.sound));
                }
                console.log('bg music', this.sound.bgMusic)
            },
            getSvgWidth(){
                var element = document.querySelector('#id_main_bg'); 
                var width = element.clientWidth
                return width ? width+'px': '0px'
            },
            getRectCenterCordinates(size, cordinate, padding = 0) {
                return (cordinate + (size / 2) - padding)
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
                            /*let newCards = _.get(this.casinoData, 'card').split(',');
                            if(newCards.length > 0){
                                let playSound = false;
                                if(this.cards[0] == 1 && newCards[0] != 1){
                                    playSound = true;
                                }else if(this.cards[1] == 1 && newCards[1] != 1){
                                    playSound = true;
                                }else if(this.cards[2] == 1 && newCards[2] != 1){
                                    playSound = true;
                                }else if(this.cards[3] == 1 && newCards[3] != 1){
                                    playSound = true;
                                }else if(this.cards[4] == 1 && newCards[4] != 1){
                                    playSound = true;
                                }else if(this.cards[5] == 1 && newCards[5] != 1){
                                    playSound = true;
                                }
                                this.cards = newCards;
                                if(playSound == true){
                                    this.cardFlipAudio.play() 
                                    setTimeout(res => {
                                        this.cardFlipAudio.muted = false; 
                                    }, 500);
                                }
                            } */
                            this.cards = _.get(this.casinoData, 'card').split(',')

                            if(this.casinoData.rdesc != ""){
                                if(this.playWinner){
                                    winnerMusic.play()
                                    console.log('winner Play')
                                    this.playWinner = false
                                }
                            }else{
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