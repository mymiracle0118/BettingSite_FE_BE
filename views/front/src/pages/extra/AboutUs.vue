<template>
  <div class="wrapper">
    <div class="about-us-container">
      <div class="container">
        <div class="text-center logo">
          <img :src="logoPath">
        </div>
        <template v-if="$store.getters.domain == 'wolf777.com'">
          <h3 class="textdesc">How do I register an account?</h3>
          <h5 class="textdesc2">Click ‘Sign Up’ on the <a href="/">Wolf777</a>, and complete the
            online form. It’s really important that you enter your correct details, especially your mobile number and
            referral code, as your bonus will only apply with correct referral code.<a
              href="/">Register</a> your account now.
          </h5>
          <h3 class="textdesc">How do I deposit?</h3>
          <h5 class="textdesc2">Once you have registered, choose any payment method including UPI, Indian Debit Cards,
            Paytm, PhonePay. Once, you have made a deposit, send a screenshot to our <a
              href="https://wa.me/+447393060005">customer care</a> </h5>
          <h3 class="textdesc">Which are the games I can play on Wolf 777?</h3>
          <h5 class="textdesc2">You can bet on any live sports. There in one single wallet. Once you deposit amount,
            you can choose from any live casino, sports betting or slots games. We have curated selection of Indian
            Casino Games like Andar Bahar, 20-20 Cricket, Bollywood Casino, Teen Patti, and much more</h5>
          <h3 class="textdesc">How to withdraw?</h3>
          <h5 class="textdesc2">Withdrawal on Wolf777 is very easy. Just click on Withdraw and fill in the details,
            your withdrawal will be processed immediately. You can also use our Whatsapp Customer Support to generate
            Withdrawal request. Withdrawal is as easy as playing on Wolf777.</h5>
          <h3 class="textdesc">Navigating the WOLF777 Website</h3>
          <h5 class="textdesc2">Finding your way around at WOLF777 is easy. Whether on a mobile device or desktop, you
            can navigate to any part of the website via the menu bar at the top of your screen. On WOLF777, all sports
            are listed in the top navigation bar of the screen, with key events highlighted in the ‘Quick Links’
            section, or ‘Highlights’ area on the home page. All ‘Live’ or ‘In Play’ events are indicated by the ‘Live’
            symbol, meaning you can bet on the action as it unfolds. Use any of our side navigation links or top
            navigation links to choose your favourite sports for betting or your favourite live casino games</h5>
          <h3 class="textdesc">How to contact customer support</h3>
          <h5 class="textdesc2">We at Wolf777 Casino are proud for our live customer support. If you need any help
            understanding on how to play on Wolf777 or have any query regarding our services kindly contact us on our
            <a href="https://wa.me/+447393060005">Whatsapp Customer Care</a></h5>
        </template>

        <template v-else>
          <h2 class="page-title">New to {{$store.getters.domainName}}</h2>
          <h4>Which are the games I can play on {{$store.getters.domainName}}?</h4>
          <h5>You can bet on any live sports. There in one single wallet. Once you deposit amount, you can choose from
            any
            live casino, sports betting or slots games. We have curated selection of Indian Casino Games like Andar
            Bahar,
            20-20 Cricket, Bollywood Casino, Teen Patti, and much more</h5>
          <h4>Navigating the {{$store.getters.domainName}} Website</h4>
          <h5>Finding your way around at {{$store.getters.domainName}} is easy. Whether on a mobile device or desktop, you can navigate to
            any
            part of the website via the menu bar at the top of your screen. On {{$store.getters.domainName}}, all sports are listed in the
            top
            navigation bar of the screen, with key events highlighted in the ‘Quick Links’ section, or ‘Highlights’ area
            on the home page. All ‘Live’ or ‘In Play’ events are indicated by the ‘Live’ symbol, meaning you can bet on
            the action as it unfolds. Use any of our side navigation links or top navigation links to choose your
            favourite sports for betting or your favourite live casino games</h5>
          <h4>How to contact customer support</h4>
          <h5>We at {{$store.getters.domainName}} Casino are proud for our live customer support. If you need any help understanding on how
            to
            play on {{$store.getters.domainName}} or have any query regarding our services kindly contact us on our <a :href="`https://wa.me/${support_no}`">Whatsapp
              Customer Care</a></h5>
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
        logoPath: LOGO_PATH,
        support_no: SUPPORT_NO
      };
    },
    methods: {

    }
  };
</script>