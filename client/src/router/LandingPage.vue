<template>
<trending-page v-if="this.$root.user"></trending-page>

<section v-else class="hero is-fullheight">
  <div class="flag">
    <img src="/static/images/landing/ukFlag.png">
    <img src="/static/images/landing/France-Flag.png">
  </div>
  <div>
    <div class="container-logo">
      <img src="/static/images/landing/logo-landing.svg">
    </div>
  </div>
  <div class="hero-body mainLanding">
    <div class="container loggiin">
      <div >
<p class="button is-large buttonLogin" type="button" @click="LoginModal">Login</p>
<p class="button is-large buttonSignin" type="button" @click="SignupModal">Join</p>
 </div>
    </div>
  </div>
  <div class="hero-body">
    <div class="container">
      <h2>Join the best community of investors you can trust.</h2>
    </div>
    <div class="container">
      <p>Share your insights about the pulse of the market, learn from others and have fun.</p>
    </div>
  </div>
  <div class="hero-body">
    <img src="/static/images/landing/roundBullArrow.png">
    <img src="/static/images/landing/roundBearArrow.png">
  </div>
<section class="hero separator">
  <img src="/static/images/landing/sentiment.png">
  <div class="container">
    <h2>Gauge the real time sentiment of the market.</h2>
  </div>
  <div class="container">
    <p>Check the level of bullishness and bearishness around a stock before you make your next investment.</p>
  </div>
</section>
<section class="hero separator">
  <div class="container">
    <h2>Real time insights.</h2>
  </div>
  <div class="container">
    <p>Quickly catch up on what is happening with the stocks you own and which companies everyone is talking about today.</p>
  </div>
  <img src="/static/images/landing/give-insight.gif">

</section>
<section class="hero separator">
  <img src="/static/images/landing/Financial-tips.png">
  <div class="container">
    <h2>Get great financial tips. For free.</h2>
  </div>
  <div class="container">
    <p>We believe that the financial system should help the rest of us, not just the wealthy.
The future of investing is social. Connect with other active investors before making your next trade. Find and follow the pros.</p>
  </div>


</section>

  <section class="hero separator">
    <div class="hero-body testimonials-section">
      <div class="container">
        <h1 class="title testimonials">
          Let's our community talks!
        </h1>
        <h3 class="subtitle testimonials">
          Everybody win !
        </h3>
        <div class="columns separator2">
          <div class="column is-one-third testi">
                <img class="img" src="/static/images/landing/stuart.png">
              <h4 class="separator nametesti subtitle"> @stuart</h4>
              <p>”I doubled my stocks income since I joined Insiders. Thx so much!”</p>
          </div>
          <div class="column is-one-third testi">
                <img class="img" src="/static/images/landing/emmanuel.png">
              <h4 class="separator nametesti subtitle"> @emmanuel</h4>
              <p>” We need young Frenchmen who want to become billionaires.” (Taking about Insiders)</p>
          </div>
          <div class="column is-one-third testi">
                <img class="img" src="/static/images/landing/daniel.png">
              <h4 class="separator nametesti subtitle"> @daniel</h4>
              <p>"Anybody who plays the stock market not as an Insider is like a man buying cows in the moonlight."</p>

          </div>
        </div>
      </div>
</div>
<footer>
  <ul class="footer-list">
      <li class="list">About Us</li>
      <li class="list">Support</li>
      <li class="list">Press</li>
      <li class="list">API</li>
      <li class="list">FAQ</li>
      <li class="list">Privacy</li>
      <li class="list">Terms</li>
  </ul>
  <span>&copy; 2017 Insiders</span>
</footer>
  </section>



        <!-- SIGN UP MODAL -->
        <b-modal :active.sync="isSignupModalActive" :width="640">
          <signup-modal @loginModal.capture="LoginModal($event)"></signup-modal>
        </b-modal>

        <!-- LOG IN MODAL -->
        <b-modal :active.sync="isLoginModalActive" :width="640">
          <login-modal :autenticate="autenticate"></login-modal>
        </b-modal>
      </div>
    </div>

    </section>
</template>

<script>
import SignupModal from "@/components/SignupModal";
import LoginModal from "@/components/LoginModal";
import TrendingPage from "@/router/TrendingPage";

export default {
  data() {
    return {
      isSignupModalActive: false,
      isLoginModalActive: false,
      autenticate: ""
    };
  },
  components: {
    SignupModal,
    LoginModal,
    TrendingPage
  },

  methods: {
    SignupModal() {
      this.isLoginModalActive = false;
      this.isSignupModalActive = true;
    },
    LoginModal(autenticate) {
      this.isSignupModalActive = false;
      this.autenticate = autenticate;
      this.isLoginModalActive = true;
    }
  }
};
</script>

<style scoped>

body{
  font-family:roboto
}
.flag{
  display: flex;
  justify-content:flex-start;
  width: 10%;
  height:60px;

}

.buttonSignin{
  margin-left:2.5%;
  min-width:20%;
   border-color: #f9f9f9 !important;
    background-color:#f9f9f9 !important;
 color:#192b41 !important;
}
.buttonLogin{
  margin-right:2.5%;
  min-width:20%;
   border-color: #f9f9f9 !important;
    background-color:#f9f9f9 !important;
 color:#192b41 !important;
}

.buttonLogin:focus,
.buttonLogin:hover {
    font-weight: bolder#f9f9f9 !important;;
    color: #f9f9f9 !important;;
    box-shadow: 0 0 0 0.125em #192b41!important;
    border-color: #f9f9f9!important;
    background-color:#192b41!important;
}
.buttonSignin:focus,
.buttonSignin:hover {
    font-weight: bolder#f9f9f9 !important;;
    color: #f9f9f9 !important;;
    box-shadow: 0 0 0 0.125em #192b41!important;
    border-color: #f9f9f9!important;
    background-color:#192b41!important;
}

.container-logo {
  margin-left:  3%;
  margin-right: 3%;
  margin-top: 3%;
}

.loggiin{
      margin-left: 35%;
    margin-bottom: 85%;
}

.mainLanding{
  background-size:cover;
  height:0;
  padding-top:50%;
  /*background-image: url('/static/images/Landing-photo.jpg')*/

}
footer {
  margin-top: 400px;
  text-align: center;
  background-color: #F9F9F9;
}

.footer-list {
  display: inline-block;
}
.list {
  display: inline-block;
  font-weight: bold;
  margin: 0 10px;
  color: #1c5380;
}
span{
  color: grey;
  font-weight: 400;
}
.nametesti{
  margin-top:5%;
}
.testi{
  display:flex;
  flex-direction: column;
  align-items:center
}
#imglanding{
  width:100% !important;
  border-radius:none!important
}

.is-fullheight{
  background-color:#f9f9f9 !important;
}
.separator{
  background-color:#192b41 !important;
  color:#f9f9f9 !important;
}
.separator2{
  background-color:#192b41 !important;
  color:#f9f9f9 !important;
  margin-top:2.25rem
}
.testimonials{
  color:#f9f9f9 !important
}

.img {
  width: 150px;
  border: 0px solid;
  border-radius: 50%;
}
.testimonials {
  text-align: center !important;
}
@media screen and (max-width: 768px) {
    .buttonSignin{
  margin-left:2.5%;
  min-width:40% !important;
}
.buttonLogin{
  margin-right:2.5%;
  min-width:40% !important;
}
.loggiin{
    margin-left: 15%!important;;
    margin-bottom: 20%;
}
}
</style>
