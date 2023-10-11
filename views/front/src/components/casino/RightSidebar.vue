<template>
    <!-- Right Sidebar Start-->
    <div class="right-sidebar casino-right-sidebar">
        <!-- Bet Slip Container-->
        <div class="casino-place-bet">
            <div class="casino-place-bet-title">Place Bet</div>
            <div class="casino-place-bet-header">
                <div>(Bet for)</div>
                <div>Odds</div>
                <div>Stake</div>
                <div>Profit</div>
            </div>
            <div class="casino-place-bet-box">
                <div class="casino-place-bet-info">
                    <div class="bet-player">
                        <img :src="imgPath + 'front/img/close.svg'">
                        <span>Player</span>
                    </div>
                    <div class="odds-box">
                        <input type="text" class="form-control" placeholder="1.0">
                        <img :src="imgPath + 'front/img/arrow-down.svg'" class="arrow-up">
                        <img :src="imgPath + 'front/img/arrow-down.svg'" class="arrow-down">
                    </div>
                    <div>
                        <input type="text" name="" class="form-control input-stake" placeholder="1200">
                    </div>
                    <div>0</div>
                </div>
                <div class="casino-place-bet-button-container">
                    <button class="btn btn-bet">10</button>
                    <button class="btn btn-bet">20</button>
                    <button class="btn btn-bet">30</button>
                    <button class="btn btn-bet">100</button>
                    <button class="btn btn-bet">500</button>
                    <button class="btn btn-bet">1K</button>
                    <button class="btn btn-bet">10K</button>
                    <button class="btn btn-bet">500K</button>
                    <button class="btn btn-bet">1000K</button>
                    <button class="btn btn-bet">2500K</button>
                </div>
                <div class="casino-place-bet-action-buttons">
                    <button class="btn btn-reset">Reset</button>
                    <button class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
        <div class="casino-my-bet">
            <div class="casino-place-bet-title">My Bets</div>
            <div class="casino-place-bet-header">
                <div>Matched Bet</div>
                <div>Odds</div>
                <div>Stake</div>
            </div>
        </div>
        <!-- Bet Slip Container-->
    </div>
    <!-- Right Sidebar End-->
</template>

<script>
    export default {
        data(){
            return {
                imgPath: IMG_PATH,
            }
        }
    }
</script>