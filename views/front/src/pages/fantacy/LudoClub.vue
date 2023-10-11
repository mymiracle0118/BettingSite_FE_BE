<template>
    <div>
        <div class="casino-tabs">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a href="#description" data-toggle="tab" class="nav-link active">Description</a>
                </li>
                <li class="nav-item">
                    <a href="#howtoplay" data-toggle="tab" class="nav-link">Rules</a>
                </li>
            </ul>
        </div>

        <div class="tab-content">
            <div class="tab-pane active" id="description">
                 <ol class="list-decimal">
                    <li class="mb-1">
                        <b>How To Play?</b>
                        For those who haven’t played the game before, Ludo is an easy to play a strategy board game which is largely automatic, with a player’s only choice is to roll a dice and select a token to move forward. And once there is a token that you can move, the computer automatically does it for you. And while the centre piece of the digital version of the game is Ludo, the app also comes with a Snakes & Ladders game that can be played the same you did as a kid.
                    </li>
                    <li class="mb-1">
                        <b>Game Modes</b>
                        You can play Ludo against your friends and play online against players from all around the world. 
                    </li>
                </ol>
            </div>

            <div class="tab-pane fade" id="howtoplay">
               <ol class="list-decimal">
                    <li>It is played between 2 or 4 Players, with every player having 4 tokens. The player who manages to get all of his four tokens home (reaches the centre of the board) first is declared the winner.</li>
                    <li>A token can only move out from the base and start to move after a six is rolled by that player.</li>
                    <li>Once a six is rolled out, that player gets one more turn to roll the dice.</li>
                    <li>When player rolls six three times in a row, it skips their turn.</li>
                    <li>If a token crosses the finish line, the player gets to roll another dice.</li>
                    <li>If a token captures another token, the capturing player gets to roll another dice.</li>
                    <li>The board has a total of eight safe squares which are coloured squares and starred squares.</li>
                    <li>The tokens need to exit every player’s base and move around the board to win.</li>
                    <li>Each user have 5 automoves. In case of player inactivity  automove being used.</li>
                    <li>Player lose game if all automoves  being used.</li>
                    <li>We deduct 5% on winning.</li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>