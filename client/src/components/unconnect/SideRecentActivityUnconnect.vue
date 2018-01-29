<template>
  <div class="column is-3">
    <div class="box">
        <p v-if="langSelected==='EN'"><span class="title is-5">Recent position</span></p>
        <p v-else><span class="title is-5">Dernières positions prises</span></p>
        <hr>
        <div v-for="(recentPosition, index) in recentPositions" :key="index" class="columns">
            <div class="picss column is-12 is-marginless">
                <div class="media-left">
                    <figure @click="SignupModal" class="image is-48x48 is-circle">
                        <img class="imgProfile" :src="recentPosition._doc.userId.picProfile">

                    </figure>
                </div>

                <p>

                        <strong @click="SignupModal">&commat;{{recentPosition._doc.userId.username}}</strong>
                    <br>
                    <span v-if="langSelected==='EN'" class = "seeDash">({{recentPosition.nbOfInsightsWon}} <span v-if = "recentPosition.nbOfInsightsWon>1"> won trades)</span><span v-else> won trade)</span></span>
                    <span v-else class = "seeDash">({{recentPosition.nbOfInsightsWon}}<span v-if = "recentPosition.nbOfInsightsWon>1"> trades gagnants)</span><span v-else> trade gagnant)</span>  </span><br>
                    <span>{{langSelected==='EN'?"is":"est"}} <strong :class="{'has-text-green' : recentPosition._doc.position==='bull', 'has-text-red' :recentPosition._doc.position==='bear'}">{{recentPosition._doc.position}}</strong> {{langSelected==='EN'?"on":"sur"}}  <router-link :to="'/stocks/'+recentPosition._doc.stockId.shortName" >#{{recentPosition._doc.stockId.longName}}</router-link>
                    </span><br>

                    </p>
            </div>
        </div>
    </div>
    <!-- SIGN UP MODAL -->
    <b-modal :active.sync="isSignupModalActive" :width="640">
      <signup-modal @loginModal.capture="LoginModal($event)"></signup-modal>
    </b-modal>

    <!-- LOG IN MODAL -->
    <b-modal :active.sync="isLoginModalActive" :width="640">
      <login-modal :autenticate="autenticate" @closeLoginModal="closeLoginModal()"></login-modal>
    </b-modal>
 </div>
</template>

<script>
import SignupModal from "@/components/SignupModal";
import LoginModal from "@/components/LoginModal";

export default {
  components: {
    SignupModal,
    LoginModal
  },

  data() {
    return {
      isSignupModalActive: false,
      isLoginModalActive: false,
      autenticate: ""
    };
  },
  props: {
    recentPositions: null,
    langSelected: ""
  },
  methods: {
    SignupModal() {
      this.isLoginModalActive = false;
      this.isSignupModalActive = true;
      this.$emit("signup");
    },
    LoginModal(autenticate) {
      this.isSignupModalActive = false;
      this.autenticate = autenticate;
      this.isLoginModalActive = true;
    },
    closeLoginModal() {
      this.isLoginModalActive = false;
    }
  }
};
</script>

<style scoped>
.image {
  cursor: pointer
}
strong  {
  cursor: pointer
}
.is-9{
    margin-left: 5%
}
.picss{
    display:flex
}
a {
        color: #192b41 !important;
    }

.seeDash{
        color: #b5b5b5 !important;
}
@media screen and (min-width: 769px){
.column.is-9, .column.is-9-tablet {
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
    width: 80%;
}
}

</style>
