<template>
    <div class="rules-body">
        <div class="mt-2">
            <h6 class="rules-highlight">Color Plus:</h6>
        </div>
        <div>
            <p>It contains seven circumstances to bet on simultaneously, however you can only win prize money on the
                item which has the higher rate.</p>
            <p>The seven outcomes on which you can bet are listed below:</p>
        </div>
        <ul class="pl-4 pr-4 list-style">
            <li>
                <div>3 card sequence</div>
                <div class="cards-box">
                    <span>E.g</span>
                    <span class="card-character red-card ml-1">2{</span>
                    <span class="card-character black-card ml-1">3]</span>
                    <span class="card-character red-card ml-1">4[</span>
                </div>
            </li>
            <li>
                <div>3 of a Kind</div>
                <div class="cards-box">
                    <span>E.g</span>
                    <span class="card-character red-card ml-1">3{</span>
                    <span class="card-character red-card ml-1">3[</span>
                    <span class="card-character black-card ml-1">3}</span>
                </div>
            </li>
            <li>
                <div>3 card pure sequence</div>
                <div class="cards-box">
                    <span>E.g</span>
                    <span class="card-character red-card ml-1">2{</span>
                    <span class="card-character red-card ml-1">3{</span>
                    <span class="card-character red-card ml-1">4{</span>
                </div>
            </li>
            <li>
                <div>4 card colour</div>
                <div class="cards-box">
                    <span>E.g</span>
                    <span class="card-character black-card ml-1">2]</span>
                    <span class="card-character black-card ml-1">6]</span>
                    <span class="card-character black-card ml-1">7]</span>
                    <span class="card-character black-card ml-1">9]</span>
                </div>
            </li>
            <li>
                <div>4 card sequence</div>
                <div class="cards-box">
                    <span>E.g</span>
                    <span class="card-character black-card ml-1">2}</span>
                    <span class="card-character red-card ml-1">3[</span>
                    <span class="card-character black-card ml-1">4]</span>
                    <span class="card-character red-card ml-1">5[</span>
                </div>
            </li>
            <li>
                <div>4 card pure sequence</div>
                <div class="cards-box">
                    <span>E.g</span>
                    <span class="card-character black-card ml-1">2}</span>
                    <span class="card-character black-card ml-1">3}</span>
                    <span class="card-character black-card ml-1">4}</span>
                    <span class="card-character black-card ml-1">5}</span>
                </div>
            </li>
            <li>
                <div>4 of a kind</div>
                <div class="cards-box">
                    <span>E.g</span>
                    <span class="card-character red-card ml-1">3{</span>
                    <span class="card-character black-card ml-1">3]</span>
                    <span class="card-character red-card ml-1">3[</span>
                    <span class="card-character black-card ml-1">3}</span>
                </div>
            </li>
        </ul>
        <div class="mt-2">
            <div>if your card is</div>
            <div class="cards-box">
                <span>E.g</span>
                <span class="card-character red-card ml-1">6[</span>
                <span class="card-character red-card ml-1">7[</span>
                <span class="card-character red-card ml-1">8[</span>
                <span class="card-character red-card ml-1">9[</span>
            </div>
        </div>
        <div class="mt-2">
            <p>Here you will win prize in case there is a 4 card pure sequence only…! Hence they wil not receive the
                prize of:</p>
        </div>
        <ul class="pl-4 pr-4 list-style">
            <li>3 card sequence</li>
            <li>4 card sequence</li>
            <li>4 card color</li>
            <li>3 card pure sequence</li>
        </ul>
        <div class="mt-2">
            <p>Next example.</p>
            <p>If the cards are:</p>
        </div>
        <ul class="pl-4 pr-4 list-style">
            <li>King of Spades</li>
            <li>King of Clubs</li>
            <li>King of Diamonds</li>
            <li>King of Hearts</li>
        </ul>
        <div class="mt-2">
            <p>In this instance you will only receive the prize of 4 of a kind, therefore you will not win prize of 3 of
                a kind.</p>
            <p>You will only be able to win one prize, the one which is the most beneficial to them.</p>
        </div>
        <div class="mt-2">
            <h6 class="rules-highlight">Main:</h6>
            <p>In case of consecutive cards, the third card is to be considered in ascending order only. For example,
            </p>
            <p>if the first two cards are king &amp; ace then the third card is 2, so it becomes: k, A &amp; 2 (which is
                not sequence).</p>
            <p>If the first two cards are 2 &amp; 3, then third card is 4, so it becomes 2,3,4 (it will not be 1,2,3).
            </p>
            <p>The sequence in order from 1st to last is listed below:</p>
        </div>
        <div class="row row5 pl-2 pr-2">
            <div class="col-6">
                <table class="table">
                    <tbody>
                        <tr>
                            <td>Queen &amp; King</td>
                            <td class="text-right">1st</td>
                        </tr>
                        <tr>
                            <td>Ace &amp; 2</td>
                            <td class="text-right">2nd</td>
                        </tr>
                        <tr>
                            <td>Jack &amp; Queen</td>
                            <td class="text-right">3rd</td>
                        </tr>
                        <tr>
                            <td>10 &amp; Jack</td>
                            <td class="text-right">4th</td>
                        </tr>
                        <tr>
                            <td>9 &amp; 10</td>
                            <td class="text-right">5th</td>
                        </tr>
                        <tr>
                            <td>8 &amp; 9</td>
                            <td class="text-right">6th</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-6">
                <table class="table">
                    <tbody>
                        <tr>
                            <td>7 &amp; 8</td>
                            <td class="text-right">7th</td>
                        </tr>
                        <tr>
                            <td>6 &amp; 7</td>
                            <td class="text-right">8th</td>
                        </tr>
                        <tr>
                            <td>5 &amp; 6</td>
                            <td class="text-right">9th</td>
                        </tr>
                        <tr>
                            <td>4 &amp; 5</td>
                            <td class="text-right">10th</td>
                        </tr>
                        <tr>
                            <td>3 &amp; 4</td>
                            <td class="text-right">11th</td>
                        </tr>
                        <tr>
                            <td>2 &amp; 3</td>
                            <td class="text-right">12th</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="mt-2">
            <p>If it is alternative cards eg. 6 &amp; 8. Or 2 &amp; 4 Or Q &amp; A</p>
            <p>This type of alternative game will not be considered as a sequence..!</p>
            <p>If it comes 4 &amp; 4 this will be considered as a trio of 4</p>
            <p>Another example is Ace &amp; Ace, which will be considered as trio of Ace.</p>
        </div>
        <div class="mt-2">
            <p>Best combination of games in order of 1st to last:</p>
        </div>
        <ul class="pl-4 pr-4 list-style">
            <li>Pure sequence: 1st best combination</li>
            <li>Trio (3 of a kind): 2nd best combination</li>
            <li>Sequence (straight): 3rd best combination</li>
            <li>colour (suits): 4th best combination</li>
        </ul>
        <div>
            <p>After that, all the games will be valued of higher card.</p>
        </div>
        <div class="mt-2">
            <h6 class="rules-highlight">Mini Baccarat:</h6>
        </div>
        <div>
            <p>It is a comparison between the last digit of Total of both the sides Value of cards for baccarat is:</p>
        </div>
        <ul class="pl-4 pr-4 list-style">
            <li>Ace = one point</li>
            <li>2 = 2 point</li>
            <li>3 = 3 point</li>
            <li>4 = 4 point</li>
            <li>5 = 5 point</li>
            <li>6 = 6 point</li>
            <li>7 = 7 point</li>
            <li>8 = 8 point</li>
            <li>9 = 9 point</li>
            <li>10 = 0 point</li>
            <li>Jack = 0 point</li>
            <li>Queen = 0 point</li>
            <li>King = 0 point</li>
        </ul>
        <div class="mt-2">
            <p>Total of two card can be ranged between 0 to 18</p>
            <p>If total is in single digit ,then the same will be considered as baccarat value</p>
            <p>If the total is of double digit, then the last digit wil be considered as baccarat value Higher value
                baccarat will win.</p>
            <p>If baccarat value of both the sides are equal, then both side’s will lose their bets..</p>
        </div>
        <div class="mt-2">
            <h6 class="rules-highlight">Total:</h6>
            <p>Session is total of 2 cards value</p>
        </div>
        <div class="mt-2">
            <p>value of each cards</p>
        </div>
        <ul class="pl-4 pr-4 list-style">
            <li>Ace = 1 point</li>
            <li>2 = 2 point</li>
            <li>3 = 3 point</li>
            <li>4 = 4 point</li>
            <li>5 = 5 point</li>
            <li>6 = 6 point</li>
            <li>7 = 7 point</li>
            <li>8 = 8 point</li>
            <li>9 = 9 point</li>
            <li>10 = 10 point</li>
            <li>Jack = 11 point</li>
            <li>Queen = 12 point</li>
            <li>King = 13 point</li>
        </ul>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>

</style>