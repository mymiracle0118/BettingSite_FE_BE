<template>
    <div class="rules-body">
        <div>
            <p>Here we use total of 29 cards ;</p>
            <div class="mt-1">
                <div class="cards-box">
                    <span class="card-character black-card ml-1">2}</span>
                    <span class="card-character red-card ml-1">2{</span>
                    <span class="card-character black-card ml-1">2]</span>
                    <span class="card-character red-card ml-1">2[</span>
                    <b class="ml-2">= 4</b>
                </div>
            </div>
            <div class="mt-1">
                <div class="cards-box">
                    <span class="card-character black-card ml-1">3}</span>
                    <span class="card-character red-card ml-1">3{</span>
                    <span class="card-character black-card ml-1">3]</span>
                    <span class="card-character red-card ml-1">3[</span>
                    <b class="ml-2">= 4</b>
                </div>
            </div>
            <div class="mt-1">
                <div class="cards-box">
                    <span class="card-character black-card ml-1">4}</span>
                    <span class="card-character red-card ml-1">4{</span>
                    <span class="card-character black-card ml-1">4]</span>
                    <span class="card-character red-card ml-1">4[</span>
                    <b class="ml-2">= 4</b>
                </div>
            </div>
            <div class="mt-1">
                <div class="cards-box">
                    <span class="card-character black-card ml-1">5}</span>
                    <span class="card-character red-card ml-1">5{</span>
                    <span class="card-character black-card ml-1">5]</span>
                    <span class="card-character red-card ml-1">5[</span>
                    <b class="ml-2">= 4</b>
                </div>
            </div>
            <div class="mt-1">
                <div class="cards-box">
                    <span class="card-character black-card ml-1">6}</span>
                    <span class="card-character red-card ml-1">6{</span>
                    <span class="card-character black-card ml-1">6]</span>
                    <span class="card-character red-card ml-1">6[</span>
                    <b class="ml-2">= 4</b>
                </div>
            </div>
            <div class="mt-1">
                <div class="cards-box">
                    <span class="card-character black-card ml-1">7}</span>
                    <span class="card-character red-card ml-1">7{</span>
                    <span class="card-character black-card ml-1">7]</span>
                    <span class="card-character red-card ml-1">7[</span>
                    <b class="ml-2">= 4</b>
                </div>
            </div>
            <div class="mt-1">
                <div class="cards-box">
                    <span class="card-character black-card ml-1">8}</span>
                    <span class="card-character red-card ml-1">8{</span>
                    <span class="card-character black-card ml-1">8]</span>
                    <span class="card-character red-card ml-1">8[</span>
                    <b class="ml-2">= 4</b>
                </div>
            </div>
            <div class="mt-1">
                <div class="cards-box">
                    <span class="card-character black-card ml-1">9}</span>
                    <b class="ml-2">= 1</b>
                </div>
            </div>
            <ul class="pl-2 pr-2 mt-2 list-style">
                <li>Each player will get 3 cards.</li>
                <li>All cards are assigned to their pip values
                    <div class="pl-3">(For example, eight is worth 8 points, two is worth 2 points and so on)</div>
                </li>
                <li>All cards are dealt face-up in this game.</li>
                <li>After adding the total of a hand, only the last digit will be applicable.
                    <div>For Example.</div>
                    <div>If you have three cards as 7,5,9, then your point will be 1.</div>
                    <div>7+5+9=21, the same will not be considered as 21.</div>
                </li>
                <li>The maximum possible sum is 9 and the minimum is 0.</li>
            </ul>
        </div>
        <div class="mt-2">
            <p>Three of a kind (Trio) is FIRST WINNER</p>
            <div class="row row5">
                <div class="col-6">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Priority</th>
                                    <th>Cards Sequence</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1st</td>
                                    <td>
                                        <img :src="`${imgPath}front/img/cards/8.png`">
                                        <img :src="`${imgPath}front/img/cards/8.png`">
                                        <img :src="`${imgPath}front/img/cards/8.png`">
                                    </td>
                                </tr>
                                <tr>
                                    <td>2nd</td>
                                    <td>
                                        <img :src="`${imgPath}front/img/cards/7.png`">
                                        <img :src="`${imgPath}front/img/cards/7.png`">
                                        <img :src="`${imgPath}front/img/cards/7.png`">
                                    </td>
                                </tr>
                                <tr>
                                    <td>3rd</td>
                                    <td>
                                        <img :src="`${imgPath}front/img/cards/6.png`">
                                        <img :src="`${imgPath}front/img/cards/6.png`">
                                        <img :src="`${imgPath}front/img/cards/6.png`">
                                    </td>
                                </tr>
                                <tr>
                                    <td>4th</td>
                                    <td>
                                        <img :src="`${imgPath}front/img/cards/5.png`">
                                        <img :src="`${imgPath}front/img/cards/5.png`">
                                        <img :src="`${imgPath}front/img/cards/5.png`">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-6">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Priority</th>
                                    <th>Cards Sequence</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>5th</td>
                                    <td>
                                        <img :src="`${imgPath}front/img/cards/4.png`">
                                        <img :src="`${imgPath}front/img/cards/4.png`">
                                        <img :src="`${imgPath}front/img/cards/4.png`">
                                    </td>
                                </tr>
                                <tr>
                                    <td>6th</td>
                                    <td>
                                        <img :src="`${imgPath}front/img/cards/3.png`">
                                        <img :src="`${imgPath}front/img/cards/3.png`">
                                        <img :src="`${imgPath}front/img/cards/3.png`">
                                    </td>
                                </tr>
                                <tr>
                                    <td>7th</td>
                                    <td>
                                        <img :src="`${imgPath}front/img/cards/2.png`">
                                        <img :src="`${imgPath}front/img/cards/2.png`">
                                        <img :src="`${imgPath}front/img/cards/2.png`">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-2">
            <p>SECOND WINNER:</p>
            <ul class="pl-2 pr-2 mt-2 list-style">
                <li>The player A or B whoever has the higher total will win.</li>
                <li>In certain cases, player A and B will have same total points.</li>
                <li>In such cases, the winner will be chosen based on the first higher card, in case the first high card of
                    both players are found to be same then the same will move on to the comparison of second high card and so
                    on.</li>
                <li>Some examples are below:
                    <div>player A has 7,5,3=15</div>
                    <div>Player B has 6,5,4=15</div>
                    <div>Player A will win</div>
                </li>
                <li>(Since the first card of the player A is higher than the first card of the player B)
                    <div>Player A has 8,8,3=19 (9)</div>
                    <div>Player B has 8,7,4=19 (9)</div>
                    <div>Player A will win</div>
                </li>
                <li>(Since first higher card of both the player is same the winner is chosen based on comparison of second
                    higher card. The second higher card of player A is higher than player B)</li>
            </ul>
        </div>
        <div class="mt-2">
            <h6 class="rules-highlight">High Card Rule:</h6>
            <ul class="pl-2 pr-2 mt-2 list-style">
                <li>WINNER:
                    <div>Player A and B whoever has the higher card will win the game
                    </div>
                </li>
                <li>High card:
                    <div>Comparison of higher card of both the games, the higher value card game will win</div>
                </li>
            </ul>
            <div>
                <div>Player A</div>
                <div class="cards-box">
                    <span>E.g</span>
                    <span class="card-character red-card ml-1">7{</span>
                    <span class="card-character black-card ml-1">4]</span>
                    <span class="card-character black-card ml-1">3}</span>
                    <span> = 4 </span>
                </div>
            </div>
            <div>
                <div>Player B</div>
                <div class="cards-box">
                    <span>E.g</span>
                    <span class="card-character red-card ml-1">2{</span>
                    <span class="card-character black-card ml-1">6]</span>
                    <span class="card-character black-card ml-1">6}</span>
                    <span> = 4 </span>
                </div>
                <div>Player A will win</div>
            </div>
            <ul class="pl-2 pr-2 list-style mt-2">
                <li>If high card is equal for player A and B, then second highest is compared.</li>
                <li>If the second card is also equal, then third high card will be compared.</li>
                <li>If the third card is also equal, and both players have the exact same game. Then the same will be
                    considered as Tie and the bets will be voided. (Money will be returned in such case)</li>
            </ul>
        </div>
        <div class="mt-2">
            <h6 class="rules-highlight">Pair:</h6>
            <ul class="pl-2 pr-2 list-style">
                <li>Player A and Player B whoever has a PAIR of 2 Cards will win</li>
                <li>Example</li>
            </ul>
            <div>
                <div>Player A has</div>
                <div class="cards-box">
                    <span>E.g</span>
                    <span class="card-character red-card ml-1">3{</span>
                    <span class="card-character black-card ml-1">6}</span>
                    <span class="card-character black-card ml-1">7]</span>
                </div>
            </div>
            <div>
                <div>Player B has</div>
                <div class="cards-box">
                    <span>E.g</span>
                    <span class="card-character red-card ml-1">5{</span>
                    <span class="card-character red-card ml-1">6{</span>
                    <span class="card-character black-card ml-1">6]</span>
                </div>
            </div>
            <div>Player B will win</div>
        </div>
        <div class="mt-2">
            <h6 class="rules-highlight">Lucky 9 rules:</h6>
            <ul class="pl-2 pr-2 list-style">
                <li>Player A and B will draw a total of 6 card, player who will guess any one of the below cases will be
                    considered as the winner</li>
            </ul>
            <div>Lucky
                <div class="cards-box">
                    <span class="card-character black-card ml-1">9}</span>
                </div>
            </div>
            <p>Will be drawn (BACK)</p>
            <p>OR</p>
            <div>Lucky
                <div class="cards-box">
                    <span class="card-character black-card ml-1">9}</span>
                </div>
            </div>
            <p>Will not be drawn (LAY)</p>
        </div>
        <div class="mt-2">
            <h6 class="rules-highlight">Color Plus:</h6>
            <ul class="pl-2 pr-2 list-style">
                <li>It is a multiple option. You can only win with the below options</li>
            </ul>
            <div>
                <div>Sequence:</div>
                <div class="cards-box">
                    <span>E.g</span>
                    <span class="card-character black-card ml-1">3}</span>
                    <span class="card-character red-card ml-1">4{</span>
                    <span class="card-character red-card ml-1">5{</span>
                </div>
                <div>Price will be paid 1 to 2</div>
            </div>
            <div>
                <div>Pure Color:</div>
                <div class="cards-box">
                    <span>E.g</span>
                    <span class="card-character black-card ml-1">3}</span>
                    <span class="card-character black-card ml-1">5}</span>
                    <span class="card-character black-card ml-1">7}</span>
                </div>
                <div>Price will be paid 1 to 5</div>
            </div>
            <div>
                <div>Three of kind *(Trio):</div>
                <div class="cards-box">
                    <span>E.g</span>
                    <span class="card-character red-card ml-1">3{</span>
                    <span class="card-character black-card ml-1">3}</span>
                    <span class="card-character red-card ml-1">3[</span>
                </div>
                <div>Price Will be paid 1 to 20</div>
            </div>
            <div>
                <div>Pure Sequence</div>
                <div class="cards-box">
                    <span>E.g</span>
                    <span class="card-character red-card ml-1">3{</span>
                    <span class="card-character red-card ml-1">4{</span>
                    <span class="card-character red-card ml-1">5{</span>
                </div>
                <div>Price will be paid 1 to 30</div>
            </div>
            <ul class="pl-2 pr-2 list-style mt-2">
                <li>Note: In case of pure sequence, you will be paid only for “pure sequence” not for any other sequence
                    and pure color.</li>
                <li>In such case the payout will be done only for the higher price.</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                imgPath: IMG_PATH,
            }
        }
    }
</script>

<style>

</style>