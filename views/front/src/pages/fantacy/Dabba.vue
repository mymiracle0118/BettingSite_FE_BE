<template>
    <div>
        <div class="casino-tabs">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a href="#description" data-toggle="tab" class="nav-link active">Description</a>
                </li>
            </ul>
        </div>

        <div class="tab-content">
            <div class="tab-pane active" id="description">
                <ol class="list-decimal">
                    <li>Player battle is a skill game where any user can select real players and play against computer.
                    </li>
                    <li>User can select his set of players based on the event type. For example, 2vs2 or 4vs4 based on
                        the game category.</li>
                    <li>Computer will get default point (points will be based on game category (2vs2/ 4vs4)) if the
                        player selects the first player, vice versa player will get default points if he allows computer
                        to select the first player.</li>
                    <li>If any player who has been selected is not included in playing 11 or didn’t get opportunity to
                        play (bat): - Default runs which was announced in advance will be given to them respectively.
                    </li>
                    <li>User are allowed to make any changes in the team before placing the bet, Once the bet is
                        confirmed user will not be allowed to make any change in the current team. However, user is
                        allowed to create new team and participate.</li>
                    <li>Results will be announced post the match.</li>
                    <li>If the match got interrupted due to any situation such as rain/bad light and the same gets
                        stopped. Default run/run scored whichever is the highest will be awarded for the players who
                        haven’t finished their quota. For example, In a IND vs ENG T20 match England has completed
                        playing 20 over and India got to play 10 over post that the match got stopped due to rain, Then
                        Indian players will get points based on the above mentioned rule. (Note: This is not applicable
                        to the player who has already got out before the match got stopped)</li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>