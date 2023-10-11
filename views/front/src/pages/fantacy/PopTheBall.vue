<template>
    <div>
        <div class="casino-tabs">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a href="#description" data-toggle="tab" class="nav-link active">Description</a>
                </li>
                <li class="nav-item">
                    <a href="#howtoplay" data-toggle="tab" class="nav-link">How to play</a>
                </li>
            </ul>
        </div>
        <div class="tab-content">
            <div class="tab-pane active" id="description">
                <ol class="list-outside">
                    <li>Before the round starts the player needs to place his/her bet.</li>
                    <li>The player can use "auto bet" and "auto cash out" features.</li>
                    <li>Minimum bet amount is 500 Pts.</li>
                    <li>Maximum bet amount is 5,000 Pts.</li>
                    <li>Maximum win amount is 250,000 Pts.</li>
                    <li>The player can place 2 bets simultaneously during a single round.</li>
                    <li>The winning amount is calculated by multiplying the coefficient by the bet's amount. </li>
                </ol>
            </div>
            <div class="tab-pane fade" id="howtoplay">
                <ol class="list-outside">
                    <li><b>Quick explanation:</b> 
                        <ol class="list-outside">
                            <li>The player needs to place a bet and then wait till the cannon strikes.</li>
                            <li>The player needs to click on "cash out" button before the coefficient explodes.</li>
                            <li>The player wins if he or she cashes out before the coefficient explodes.</li>
                            <li>The player loses if he or she hasn't cashed out before the coefficient explodes.</li>
                        </ol>
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>