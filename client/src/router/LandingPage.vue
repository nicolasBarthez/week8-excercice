<template>
<trending-page v-if="this.$root.user"></trending-page>

<section v-else class="hero is-fullheight">
  <div class="flag">
    <img class="flag-img" @click="changeLang('EN')" src="/static/images/landing/usaFlag.png">
    <img class="flag-img" @click="changeLang('FR')" src="/static/images/landing/franceFlag.png">
  </div>
  <div>
    <div class="container-logo">
      <img src="/static/images/landing/logo-landing.svg">
    </div>
  </div>
  <div class="hero-body mainLanding">
      <div class="container">
        <h2 v-if="langSelected==='EN'">Join the best community of investors you can trust.</h2>
        <h2 v-else>Rejoignez la communauté des investisseurs de confiance.</h2>
      </div>
      <div class="container">
        <p v-if="langSelected==='EN'">Share your insights about the pulse of the market, learn from others and have fun.</p>
        <p v-else>Partager vos sentiments de marchés, apprenez des investisseurs confirmés et amusez-vous.</p>
      </div>
    </div>
    <div class="container loggiin">
      <div >
<p v-if="langSelected==='EN'" class="button is-large buttonLogin" type="button" @click="LoginModal">Login</p>
<p v-else class="button is-large buttonLogin" type="button" @click="LoginModal">Connexion</p>
<p v-if="langSelected==='EN'" class="button is-large buttonSignin" type="button" @click="SignupModal">Join</p>
<p v-else class="button is-large buttonSignin" type="button" @click="SignupModal">Rejoindre</p>
 </div>
    </div>
  </div>
  <div class="hero-body">
    <img src="/static/images/landing/roundBullArrow.png">
    <img src="/static/images/landing/roundBearArrow.png">
  </div>
<section class="hero separator">
  <img src="/static/images/landing/sentiment.png">
  <div class="container">
    <h2 v-if="langSelected==='EN'">Gauge the real time sentiment of the market.</h2>
    <h2 v-else>Évaluer le sentiment en temps réel du marché.</h2>
  </div>
  <div class="container">
    <p v-if="langSelected==='EN'">Check the level of bullishness and bearishness around a stock before you make your next investment.</p>
    <p v-else>Vérifiez le niveau de tendance haussière et baissière d'une action avant de faire votre prochain investissement.</p>
  </div>
</section>
<section class="hero separator">
  <div class="container">
    <h2 v-if="langSelected==='EN'">Real time insights.</h2>
    <h2 v-else>Des infos en temps réel</h2>
  </div>
  <div class="container">
    <p v-if="langSelected==='EN'">Quickly catch up on what is happening with the stocks you own and which companies everyone is talking about today.</p>
    <p v-else>Retrouver rapidement ce qui se passe avec les actions que vous possédez et dont tout le monde parle aujourd'hui.</p>
  </div>
  <img src="/static/images/landing/give-insight.gif">

</section>
<section class="hero separator">
  <img src="/static/images/landing/Financial-tips.png">
  <div class="container">
    <h2 v-if="langSelected==='EN'">Get great financial tips. For free.</h2>
    <h2 v-else>Obtenez les meilleurs conseils financiers. Gratuitement.</h2>
  </div>
  <div class="container">
    <p v-if="langSelected==='EN'">We believe that the financial system should help the rest of us, not just the wealthy.
The future of investing is social. Connect with other active investors before making your next trade. Find and follow the pros.</p>
    <p v-else>Nous croyons que le système financier se doivent de profiter à tous, pas seulement aux riches.
L'avenir de l'investissement est social. Connectez-vous avec d'autres investisseurs actifs avant de faire votre prochain trade. Trouvez et suivez les meilleurs.</p>
  </div>


</section>

  <section class="hero separator">
    <div class="hero-body testimonials-section">
      <div class="container">
        <h1 v-if="langSelected==='EN'" class="title testimonials">What Our Community is Saying...</h1>
        <h1 v-else class="title testimonials">Ce que notre communauté en pense...</h1>

        <div class="columns separator2">
          <div class="column is-one-third testi">
                <img class="img" src="/static/images/landing/stuart.png">
              <h4 class="separator nametesti subtitle"> @stuart</h4>
              <p v-if="langSelected==='EN'">”I doubled my stocks income since I joined Insiders. Thx so much!”</p>
              <p v-else>” J’ai doublé mes revenus en bourse depuis que j'ai rejoint Insiders. Merci beaucoup !"</p>
          </div>
          <div class="column is-one-third testi">
                <img class="img" src="/static/images/landing/emmanuel.png">
              <h4 class="separator nametesti subtitle"> @emmanuel</h4>
              <p v-if="langSelected==='EN'">” We need young Frenchmen who want to become billionaires.” (Taking about Insiders)</p>
              <p v-else>” Il faut des jeunes Français qui aient envie de devenir milliardaires.” (en parlant des Insiders)</p>
          </div>
          <div class="column is-one-third testi">
                <img class="img" src="/static/images/landing/daniel.png">
              <h4 class="separator nametesti subtitle"> @daniel</h4>
              <p v-if="langSelected==='EN'">"Anybody who plays the stock market not as an Insider is like a man buying cows in the moonlight."</p>
              <p v-else>" Quiconque joue à la Bourse sans être un Insider, est comme un homme qui achète des vaches au clair de lune."</p>

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
          <signup-modal :langSelected="langSelected" @loginModal.capture="LoginModal($event)"></signup-modal>
        </b-modal>

        <!-- LOG IN MODAL -->
        <b-modal :active.sync="isLoginModalActive" :width="640">
          <login-modal :langSelected="langSelected" :autenticate="autenticate"></login-modal>
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
      autenticate: "",
      langSelected: "FR"
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
    },
    changeLang(lang) {
      console.log("HELLO", lang);
      this.langSelected = lang;
      console.log("this.langSelected=>", this.langSelected);
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
  justify-content:flex-end;
  height: 3vm;
}
.flag-img{
  width:10vh;
  height: 10vh;
  padding: 5px;
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
  margin-left:  auto;
  margin-right: auto;
  margin-top: 3%;
  width: 70%;
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
