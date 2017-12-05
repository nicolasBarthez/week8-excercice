<template>
<trending-page v-if="this.$root.user"></trending-page>

<section v-else class="hero is-fullheight">
  <div class="flag">
    <img class="flag-img" @click="changeLang('EN')" src="/static/images/landing/usaFlag.png">
    <img class="flag-img" @click="changeLang('FR')" src="/static/images/landing/franceFlag.png">
  </div>
  <div>
    <div class="logo">
      <img src="/static/images/landing/logo-landing.svg">
    </div>
  </div>
    <div class="accroche">
        <h1 class="accrocheH1" v-if="langSelected==='EN'">Join the best community of investors you can trust.</h1>
        <h1 class="accrocheH1" v-else>Rejoignez la communauté des investisseurs de confiance.</h1>
        <p class="accrocheP" v-if="langSelected==='EN'">Share your insights about the pulse of the market, learn from others and have fun.</p>
        <p class="accrocheP" v-else>Partager vos sentiments de marchés, apprenez des investisseurs confirmés et amusez-vous.</p>
    </div>
    <div class="loggiin">
        <p v-if="langSelected==='EN'" class="button is-large buttonLogin" type="button" @click="LoginModal">Login</p>
        <p v-else class="button is-large buttonLogin" type="button" @click="LoginModal">Connexion</p>
        <p v-if="langSelected==='EN'" class="button is-large buttonSignin" type="button" @click="SignupModal">Join</p>
        <p v-else class="button is-large buttonSignin" type="button" @click="SignupModal">Rejoindre</p>
    </div>




  <div class="sentimentLand">
  <div class="sentimentLandImage" >
    <img src="/static/images/landing/sentiment.png">
  </div>
  <div class="sentimentLandText">
    <div class="sentimentLandBull">
      <img src="/static/images/landing/roundBullArrow.png">
    </div>
    <h1 class="accrocheH1" v-if="langSelected==='EN'">Gauge the real time sentiment of the market.</h1>
    <h1 class="accrocheH1" v-else>Évaluer le sentiment en temps réel du marché.</h1>
    <p class="accrocheP" v-if="langSelected==='EN'">Check the level of bullishness and bearishness around a stock before you make your next investment.</p>
    <p class="accrocheP" v-else>Vérifiez le niveau de tendance haussière et baissière d'une action avant de faire votre prochain investissement.</p>
    <div class="sentimentLandBear">
      <img src="/static/images/landing/roundBearArrow.png">
    </div>
  </div>
  </div>



  <div class="sentimentLand">
    <div class="sentimentLandText2">
      <h1 class="accrocheH1" v-if="langSelected==='EN'">Real time insights.</h1>
      <h1 class="accrocheH1" v-else>Des infos en temps réel</h1>
      <p class="accrocheP" v-if="langSelected==='EN'">Quickly catch up on what is happening with the stocks you own and which companies everyone is talking about today.</p>
      <p class="accrocheP" v-else>Retrouver rapidement ce qui se passe avec les actions que vous possédez et dont tout le monde parle aujourd'hui.</p>
    </div>
    <div class="sentimentLandImage2" >
      <img src="/static/images/landing/give-insight.gif">
    </div>
</div>


 <div class="sentimentLand3">
   <div class="sentimentLandImage3" >
    <img src="/static/images/landing/Financial-tips.png">
   </div>
  <div class="sentimentLandText2">
    <h1 class="accrocheH1" v-if="langSelected==='EN'">Get great financial tips. For free.</h1>
    <h1 class="accrocheH1" v-else>Obtenez les meilleurs conseils financiers. Gratuitement.</h1>
    <p class="accrocheP" v-if="langSelected==='EN'">We believe that the financial system should help the rest of us, not just the wealthy.
The future of investing is social. Connect with other active investors before making your next trade. Find and follow the pros.</p>
    <p class="accrocheP" v-else>Nous croyons que le système financier se doivent de profiter à tous, pas seulement aux riches.
L'avenir de l'investissement est social. Connectez-vous avec d'autres investisseurs actifs avant de faire votre prochain trade. Trouvez et suivez les meilleurs.</p>
  </div>
 </div>



  <section class="hero separator">
    <div class="hero-body testimonials-section">
      <div class="container">
        <h1 v-if="langSelected==='EN'" class="title testimonials">What Our Community is Saying...</h1>
        <h1 v-else class="title testimonials">Ce que notre communauté en pense...</h1>

        <div class="columns separator2">
          <div class="column is-one-third testi">
                <img class="img" src="/static/images/landing/stuart.png">
              <h4 class="separator nametesti subtitle"> @stuart</h4>
              <p class="testiP" v-if="langSelected==='EN'">”I doubled my stocks income since I joined Insiders. Thx so much!”</p>
              <p class="testiP" v-else>” J’ai doublé mes revenus en bourse depuis que j'ai rejoint Insiders. Merci beaucoup !"</p>
          </div>
          <div class="column is-one-third testi">
                <img class="img" src="/static/images/landing/emmanuel.png">
              <h4 class="separator nametesti subtitle"> @emmanuel</h4>
              <p class="testiP" v-if="langSelected==='EN'">” We need young Frenchmen who want to become billionaires.” (Taking about Insiders)</p>
              <p class="testiP" v-else>” Il faut des jeunes Français qui aient envie de devenir milliardaires.” (en parlant des Insiders)</p>
          </div>
          <div class="column is-one-third testi">
                <img class="img" src="/static/images/landing/daniel.png">
              <h4 class="separator nametesti subtitle"> @daniel</h4>
              <p class="testiP" v-if="langSelected==='EN'">"Anybody who plays the stock market not as an Insider is like a man buying cows in the moonlight."</p>
              <p class="testiP" v-else>" Quiconque joue à la Bourse sans être un Insider, est comme un homme qui achète des vaches au clair de lune."</p>

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
.control.has-icons-left .icon, .control.has-icons-right .icon{
  width:2em!important;
  height:2em!important
}
.sentimentLand{
  display: flex;
  justify-content: space-evenly;
  padding: 2rem;
  padding-top:7rem;
  padding-bottom: 4rem;
}
.sentimentLandImage{
  width:100%;
  DISPLAY: flex;
  align-items: center;
  margin-right: 1.5rem
}
.sentimentLandText{
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.sentimentLandBull{
  width:100%;
  padding-bottom: 1.5rem;
  display: flex;
  justify-content: flex-end;
}
.sentimentLandBear{
  padding-top: 1.5rem;
  width:80%;
  display: flex;
  justify-content: flex-start;
}
.sentimentLandImage2{
  width:25%;
  DISPLAY: flex;
  align-items: center;
  margin-right: 1.5rem
}
.sentimentLandText2{
  width:50%;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.sentimentLand3{
  display: flex;
  justify-content: space-evenly;
  padding: 2rem;
  background-color: #fff
}
.sentimentLandImage3{
  width:50%;
  DISPLAY: flex;
  align-items: center;
  margin-right: 1.5rem
}
.accroche{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5REM;
  PADDING-TOP: 5REM;
}
.accrocheH1{
  font-size: 2rem;
  color:#192b41;
  text-align: center
}
.accrocheP{
  font-size:1.5rem;
  color:#192b41;
  text-align: center;
  font-style: italic
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
  cursor: pointer;
}

.buttonSignin{
  margin-left:2.5%;
  min-width:20%;
  border-color: #192b41 !important;
  background-color:#f9f9f9 !important;
  color:#192b41 !important;
}
.buttonLogin{
  margin-right:2.5%;
  min-width:20%;
   border-color: #192b41 !important;
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
.testiP{
 text-align:center
}
.logo{
  margin: auto;
  width: 60%;
}
.loggiin{
  display: flex;
  justify-content: center;
  padding-bottom: 2.5rem
}

footer {
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
  height:150px
}
.testimonials {
  text-align: center !important;
}
@media screen and (max-width: 768px) {
  .control.has-icons-left .icon, .control.has-icons-right .icon{
  width:2.75em!important;
  height:2.75em!important
}
  .accrocheH1{
    font-size: 1.5rem;
  }
  .accrocheP{
    font-size:1rem;
  }
  .accroche{
    PADDING-TOP: 2.5REM;
  }
  .sentimentLand{
    flex-direction: column;
    padding: 0rem !important;
    padding-top: 2.5rem !important;
  }
  .sentimentLandImage{
    margin-right: 0rem;
    padding-bottom: 1.5REM;
  }
  .sentimentLandBear{
    width:100%
  }
  .sentimentLandText2 {
    width: 100%;
  }
  .sentimentLandImage2{
    width: 100%;
    margin-right: 0rem;
    justify-content: center;
    padding-top:2.5rem
  }
  .sentimentLandImage2 > img{
    width:50%
  }
  .sentimentLand3{
    flex-direction: column-reverse;
    padding: 0rem !important;
    padding-top: 2.5rem !important;
  }
  .sentimentLandImage3 {
    width: 100%;
    margin-right: 0rem;
  }
  .hero-body {
    padding: 2rem 1rem!important
  }
  .nametesti{
    margin-top: 5%;
    margin-bottom:5%!important
  }

}
</style>
