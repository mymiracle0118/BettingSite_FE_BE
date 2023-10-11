<template>
  <div class="wrapper">
    <div class="about-us-container">
      <div class="container">
        <div class="text-center logo">
          <img :src="logoPath">
        </div>
        <template v-if="$store.getters.domain == 'wolf777.com'">
            <center>
              <h3 class="customlabel2" style="position:relative;display:block;"><b>Ga<span>me </span>Rules</b></h3>
            </center>
            <h3 class="textdesc">Cricket</h3>
            <h5 class="textdesc2">
              In this 5 Cricket game 2 events Bookmaker (Odds) and Fancy (Session) it is Based on Cricket <br><br>
              <ol>
                <li>It is a 5 Over each Match.<br></li>
                <li>Team Scoring more run will be the winner.<br></li>
                <li>Difference of the wickets doesn't matter in result. If any teams 10 wickets fall before five overs
                  that team is all out.<br>
                </li>
                <li>If it is a tie (Difference of the wicket doesn't matter) bets will be cancelled.<br></li>
                <li>1st batting team is given name AUS<br></li>
                <li>2nd batting team is given name IND<br></li>
                <li>It is a 70 cards deck<br>
                  <ul>
                    <li>A * 10 = 1 Run<br></li>
                    <li>3 * 10 = 3 Run<br></li>
                    <li>2 * 10 = 2 Run<br></li>
                    <li>4 * 10 = 4 Run<br></li>
                    <li>6 * 10 = 6 Run<br></li>
                    <li>10 * 10 = 0 Run<br></li>
                    <li>K * 10 = Wicket<br></li>
                  </ul>
                </li>
                <li>After the First inning is finished deck will be reshuffled. In first inning the rates will be given
                  after end of each over.<br>
                  In 2nd inning for the first 3 - overs rates will be given after end of each over, In 4th &amp; 5th
                  overs rates will be Given after end of each ball...</li>
              </ol>
            </h5>
            <h3 class="textdesc">32 cards A</h3>
            <h5 class="textdesc2">
              <ol>
                <li>The deck of 32 cards there is 6,7,8,9,10,J,Q,K<br></li>
                <li>This is a value card game and Winning result will count on Highest Cards total.<br></li>
                <li>There are total 4 players, every player have default prefix points. Default points will be consider
                  as following table.<br>
                  <ul>
                    <li>Player 8: 8 points<br></li>
                    <li>Player 9: 9 points<br></li>
                    <li>Player 10: 10 points<br></li>
                    <li>Player 11: 11 points<br></li>
                  </ul>
                </li>
                <li>In game, every player has to count sum of default point and their own opened card's point.<br></li>
                <li>If in first level, the sum is same with more than one player, then that will be tie and winner tied
                  players go for next level.<br></li>
                <li>This sum will go and go upto Single Player Highest Sum of Point.<br></li>
                <li>At last highest point card's player declare as a Winner.<br></li>
              </ol>
            </h5>
            <h3 class="textdesc">32 cards B</h3>
            <h5 class="textdesc2">
              In 32 cards B there is similar as 32 cards A , but in 32 cards B we had given many other events like
              <ol>
                <li>Odd &amp; Even Rates<br></li>
                <li>8 &amp; 9 total and 10 &amp; 11 total rates<br></li>
                <li>In this we had given (Back and Lay rates ) events ( Any 3 black / Any 3 red / Any 2 black and 2 red
                  )</li>
                <li>Last one Cards Rates in that you get ( Bet Amt*8 = winnings )</li>
              </ol>
            </h5>
            <h3 class="textdesc">Lucky 7</h3>
            <h5 class="textdesc2">
              <ol>
                <li>Lucky 7 is a 8 deck playing cardsgame, total 8*52 = 416 cards.<br></li>
                <li>If the card id from ACE to 6, LOW Wins.<br></li>
                <li>If the card is from 8 to KING, HIGH Wins.</li>
                <li>If the card is 7, bets on high and low will lose 50% of the bet amount.</li>
                <li>We had given rates of many Events</li>
                <li>HIGH and LOW rates</li>
                <li>Even &amp; Odd rates</li>
                <li>Black &amp; Red rates</li>
                <li>We had given Cards Rate in this u can earn ( Bet Amt *11 )</li>
              </ol>
            </h5>
            <h3 class="textdesc">Open Teenpatti</h3>
            <h5 class="textdesc2">
              <ol>
                <li>In Open Teenpatti there are Eight Players and One Dealer.<br></li>
                <li>For Example you bet on Player 4 and Player 4 has high card compare to dealer than you win and get
                  money in your account.<br></li>
                <li>Here you can bet on more than one player if you bet more than one player</li>
                <li>than that all player compare with dealer if dealer have low card and your</li>
                <li>all player have hig card compare to dealer than you win and get money</li>
                <li>in your account</li>
              </ol>
            </h5>
            <h3 class="textdesc">1 Day Teenpatti</h3>
            <h5 class="textdesc2">
              <ol>
                <li>Pure Sequence ( AKQ, A23, KQJ -- 432 Same suit same colour)<br></li>
                <li>Trail or set ( AAA, KKK --- 222 three of same rank )<br></li>
                <li>sequence (run) ( AKQ, A23, KQJ -- 432 different suit different colour )</li>
                <li>colour ( AKJ, AK10 --- 532 )</li>
                <li>Pair ( AAK, AAQ --- 223 two cards of same rank )</li>
                <li>High card ( AKJ, AK10 ---- 532 )</li>
              </ol><br>
              We had given rates of Player A and Player B BACK and LAY rates so you can bet and win ...
            </h5>
            <h3 class="textdesc">20-20 Teenpatti</h3>
            <h5 class="textdesc2">
              <ol>
                <li>Pure Sequence ( AKQ, A23, KQJ -- 432 Same suit same colour)<br></li>
                <li>Trail or set ( AAA, KKK --- 222 three of same rank )<br></li>
                <li>sequence (run) ( AKQ, A23, KQJ -- 432 different suit different colour )</li>
                <li>colour ( AKJ, AK10 --- 532 )</li>
              </ol>
            </h5>
        </template>

        <template v-else>
          <h2 class="page-title">Game Rules</h2>
          <h4>Cricket</h4>
          <h5 class="textdesc2">
            In this 5 Cricket game 2 events Bookmaker (Odds) and Fancy (Session) it is Based on Cricket <br><br>
            <ol>
              <li>It is a 5 Over each Match.<br></li>
              <li>Team Scoring more run will be the winner.<br></li>
              <li>Difference of the wickets doesn't matter in result. If any teams 10 wickets fall before five overs
                that
                team is all out.<br>
              </li>
              <li>If it is a tie (Difference of the wicket doesn't matter) bets will be cancelled.<br></li>
              <li>1st batting team is given name AUS<br></li>
              <li>2nd batting team is given name IND<br></li>
              <li>It is a 70 cards deck<br>
                <ul>
                  <li>A * 10 = 1 Run<br></li>
                  <li>3 * 10 = 3 Run<br></li>
                  <li>2 * 10 = 2 Run<br></li>
                  <li>4 * 10 = 4 Run<br></li>
                  <li>6 * 10 = 6 Run<br></li>
                  <li>10 * 10 = 0 Run<br></li>
                  <li>K * 10 = Wicket<br></li>
                </ul>
              </li>
              <li>After the First inning is finished deck will be reshuffled. In first inning the rates will be given
                after end of each over.<br>
                In 2nd inning for the first 3 - overs rates will be given after end of each over, In 4th &amp; 5th overs
                rates will be Given after end of each ball...</li>
            </ol>
          </h5>
          <h4>32 cards A</h4>
          <h5>
            <ol>
              <li>The deck of 32 cards there is 6,7,8,9,10,J,Q,K<br></li>
              <li>This is a value card game and Winning result will count on Highest Cards total.<br></li>
              <li>There are total 4 players, every player have default prefix points. Default points will be consider as
                following table.<br>
                <ul>
                  <li>Player 8: 8 points<br></li>
                  <li>Player 9: 9 points<br></li>
                  <li>Player 10: 10 points<br></li>
                  <li>Player 11: 11 points<br></li>
                </ul>
              </li>
              <li>In game, every player has to count sum of default point and their own opened card's point.<br></li>
              <li>If in first level, the sum is same with more than one player, then that will be tie and winner tied
                players go for next level.<br></li>
              <li>This sum will go and go upto Single Player Highest Sum of Point.<br></li>
              <li>At last highest point card's player declare as a Winner.<br></li>
            </ol>
          </h5>
          <h4>32 cards B</h4>
          <h5>
            In 32 cards B there is similar as 32 cards A , but in 32 cards B we had given many other events like
            <ol>
              <li>Odd &amp; Even Rates<br></li>
              <li>8 &amp; 9 total and 10 &amp; 11 total rates<br></li>
              <li>In this we had given (Back and Lay rates ) events ( Any 3 black / Any 3 red / Any 2 black and 2 red )
              </li>
              <li>Last one Cards Rates in that you get ( Bet Amt*8 = winnings )</li>
            </ol>
          </h5>
          <h4>Lucky 7</h4>
          <h5>
            <ol>
              <li>Lucky 7 is a 8 deck playing cardsgame, total 8*52 = 416 cards.<br></li>
              <li>If the card id from ACE to 6, LOW Wins.<br></li>
              <li>If the card is from 8 to KING, HIGH Wins.</li>
              <li>If the card is 7, bets on high and low will lose 50% of the bet amount.</li>
              <li>We had given rates of many Events</li>
              <li>HIGH and LOW rates</li>
              <li>Even &amp; Odd rates</li>
              <li>Black &amp; Red rates</li>
              <li>We had given Cards Rate in this u can earn ( Bet Amt *11 )</li>
            </ol>
          </h5>
          <h4>Open Teenpatti</h4>
          <h5>
            <ol>
              <li>In Open Teenpatti there are Eight Players and One Dealer.<br></li>
              <li>For Example you bet on Player 4 and Player 4 has high card compare to dealer than you win and get
                money
                in your account.<br></li>
              <li>Here you can bet on more than one player if you bet more than one player</li>
              <li>than that all player compare with dealer if dealer have low card and your</li>
              <li>all player have hig card compare to dealer than you win and get money</li>
              <li>in your account</li>
            </ol>
          </h5>
          <h4>1 Day Teenpatti</h4>
          <h5>
            <ol>
              <li>Pure Sequence ( AKQ, A23, KQJ -- 432 Same suit same colour)<br></li>
              <li>Trail or set ( AAA, KKK --- 222 three of same rank )<br></li>
              <li>sequence (run) ( AKQ, A23, KQJ -- 432 different suit different colour )</li>
              <li>colour ( AKJ, AK10 --- 532 )</li>
              <li>Pair ( AAK, AAQ --- 223 two cards of same rank )</li>
              <li>High card ( AKJ, AK10 ---- 532 )</li>
            </ol><br>
            We had given rates of Player A and Player B BACK and LAY rates so you can bet and win ...
          </h5>
          <h4>20-20 Teenpatti</h4>
          <h5>
            <ol>
              <li>Pure Sequence ( AKQ, A23, KQJ -- 432 Same suit same colour)<br></li>
              <li>Trail or set ( AAA, KKK --- 222 three of same rank )<br></li>
              <li>sequence (run) ( AKQ, A23, KQJ -- 432 different suit different colour )</li>
              <li>colour ( AKJ, AK10 --- 532 )</li>
            </ol>
          </h5>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    mounted() {

    },
    data() {
      return {
        logoPath: LOGO_PATH
      };
    },
    methods: {

    }
  };
</script>