<template>
    <div>
        <div class="casino-tabs">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a href="#info" data-toggle="tab" class="nav-link active">Description</a>
                </li>
                <li class="nav-item">
                    <a href="#howtoplay" data-toggle="tab" class="nav-link">How to play</a>
                </li>
                <li class="nav-item">
                    <a href="#scoring" data-toggle="tab" class="nav-link">Scoring</a>
                </li>
            </ul>
        </div>

        <div class="tab-content">
            <div class="tab-pane active" id="info">
                <ul class="pl-4 pr-4 list-style">
                    <li>To begin the session, each player picks a card at random from the shuffled deck. Seating is as
                        per card value: whoever draws the highest card chooses his seat, to his right the next highest
                        and so on. The lowest, thus, sits to the left of the highest. The lowest deals first and
                        shuffles the cards.</li>
                    <li>The player to the left of the dealer draws a card unseen from the shuffled deck and places it on
                        the table face up, visible to all. This card is known as the 'joker': all cards of the same rank
                        as this turned up card as well as the printed jokers are used as wild cards, and all these cards
                        are referred to as 'jokers'. If the card turned up is a printed joker then will also count ACE as a joker.</li>
                    <li>The player to the dealer's left then cuts the remaining cards and the dealer distributes them
                        anti-clockwise one at a time, the player to the dealer's right getting the first card. 13 cards
                        are dealt to each player. One card is dealt face up to begin the discard pile and the remaining
                        stack is placed face down in the centre crosswise on top of the turned up joker, so that the
                        rank of the joker remains visible.</li>
                    <li>For the next hand the turn to deal passes to the right, and this continues until everyone has
                        dealt once, completing a "round". After playing one or two rounds, the seating is changed again
                        following the same start procedure. Normally a player should quit the play only at the end of a
                        round.</li>
                </ul>
            </div>
            <div class="tab-pane fade" id="howtoplay">
                <ul class="pl-4 pr-4 list-style">
                    <li>The player to the dealer's right plays first, and play continues counter-clockwise. Each
                        player's turn consists of picking up either the top card of the face up discard pile or the top
                        card of the face down stack. Having taken this card into hand the player must discard one card
                        from hand face up on top of the discard pile.</li>
                    <li>If the player chooses to take the top card of the discard pile, that card cannot be discarded in
                        the same turn - the player must discard a different card.</li>
                    <li>It sometimes happens that the card turned up by the dealer to start the discard pile is a joker,
                        which can then be picked up by the first player in the normal way. Since this clearly gives the
                        first player an advantage, it may encourage several other players to drop (see below).</li>
                    <li>The play continues until a player, after picking up a card, has 13 cards that form valid
                        combinations (including at least one pure sequence and at least one other sequence as explained
                        below). In this case the player discards the 14th card and declares 'Rummy', placing the 13
                        cards face up to show that they form the required sequences and sets, and winning the game.</li>
                    <li>Note that no sequences or sets are laid out during the play. In this form of Rummy players keep
                        all their cards concealed from the other players until a player is able to win.</li>
                </ul>
                <h6>Sequences and sets</h6>
                <ul class="pl-4 pr-4 list-style">
                    <li>The objective is to form one's 13 cards into sequences (runs) and sets (also known as trails or
                        trios).</li>
                    <li>A <b>sequence</b> consists of three or more consecutive cards of the same suit, the order being
                        A-2-3-4-5-6-7-8-9-10-J-Q-K-A. The ace can be next to the two (in A-2-3) or next to the king (in
                        Q-K-A), but not both at once, so K-A-2 is not a legal sequence.</li>
                    <li>A set consists of three cards of the same rank in different suits: 5- 5- 5 is a valid set but 7-
                        7- 7 is not.</li>
                    <li>A set consists of three cards of the same rank in different suits:
                        <div class="cards-box">
                            <span class="card-character black-card ml-1">5}</span>
                            <span class="card-character red-card ml-1">5{</span>
                            <span class="card-character red-card ml-1">5[</span>
                        </div>
                        is a valid set but
                        <div class="cards-box">
                            <span class="card-character black-card ml-1">7]</span>
                            <span class="card-character black-card ml-1">7]</span>
                            <span class="card-character red-card ml-1">7{</span>
                        </div>
                        is not.
                    </li>
                    <li>Combinations must not overlap - for example
                        <div class="cards-box">
                            <span class="card-character red-card ml-1">7[</span>
                            <span class="card-character red-card ml-1">8[</span>
                            <span class="card-character red-card ml-1">9[</span>
                            <span class="card-character red-card ml-1">9{</span>
                            <span class="card-character black-card ml-1">9}</span>
                        </div>
                        is either a sequence of diamonds with two spare 9's or a set of 9's with two spare diamonds. If
                        a second
                        <div class="cards-box">
                            <span class="card-character red-card ml-1">9[</span>
                        </div>
                        or a
                        <div class="cards-box">
                            <span class="card-character black-card ml-1">9]</span>
                        </div>
                        or a
                        <div class="cards-box">
                            <span class="card-character red-card ml-1">6[</span>
                        </div>
                        is added, the six cards form a sequence and a set.
                    </li>
                    <li>Wild cards can be used to substitute for any desired card in a set or sequence. For example if
                        the turned up card is a
                        <div class="cards-box">
                            <span class="card-character black-card ml-1">8]</span>
                        </div>
                        then
                        <div class="cards-box">
                            <span class="card-character red-card ml-1">3{</span>
                            <span class="card-character black-card ml-1">8}</span>
                            <span class="card-character red-card ml-1">5{</span>
                        </div>
                        5 is a valid sequence, and
                        <div class="cards-box">
                            <span class="card-character black-card ml-1">J}</span>
                            <span class="card-character red-card ml-1">J[</span>
                            <span class="card-character red-card ml-1">8[</span>
                        </div>
                        is a valid set since all 8's are wild.
                    </li>
                    <li>
                        A <b>pure sequence</b> is a sequence formed without the use of wild cards as substitutes for
                        other cards. At least one pure sequence is required in one's hand in order for any combinations
                        to become valid. Note that if 8's are wild,
                        <div class="cards-box">
                            <span class="card-character red-card ml-1">7{</span>
                            <span class="card-character red-card ml-1">8{</span>
                            <span class="card-character red-card ml-1">9{</span>
                        </div>
                        counts as a pure sequence, since the
                        <div class="cards-box">
                            <span class="card-character red-card ml-1">8{</span>
                        </div>
                        is used as itself, not as a wild card, but
                        <div class="cards-box">
                            <span class="card-character red-card ml-1">J{</span>
                            <span class="card-character red-card ml-1">Q{</span>
                            <span class="card-character red-card ml-1">8{</span>
                        </div>
                        is not a pure sequence - just an ordinary sequence.
                    </li>
                </ul>
                <h6>Dropping</h6>
                <ul class="pl-4 pr-4 list-style">
                    <li>A player whose hand is unpromising may prefer to withdraw from the game to limit the amount
                        lost. This is called dropping or packing.</li>
                    <li>A player who drops at the start of his first turn, before drawing any card from the stack or
                        discard pile, pays 20 points to the eventual winner.</li>
                    <li>A player who drops at a later turn must pay 40 points to the eventual winner, if any. This
                        player's cards are not added to the stack - they are set aside face down out of the game.</li>
                    <li>If all players except one have dropped, the last remaining player automatically wins, and
                        immediately collects the appropriate amounts from the players who dropped.</li>
                </ul>
            </div>
            <div class="tab-pane fade" id="scoring">
                <ul class="pl-4 pr-4 list-style">
                    <li>After the winner declares rummy, all other players who have not dropped count their hands for
                        pay-off. The values of the cards are as follows:
                        <div class="pl-2 pr-2">A, K, Q, J, 10 count 10 points each</div>
                        <div class="pl-2 pr-2">9, 8, 7, 6, 5, 4, 3, 2 count face value</div>
                        <div class="pl-2 pr-2">all jokers - both the printed jokers and the cards of the same rank as
                            the turned up joker - have a value of zero</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>