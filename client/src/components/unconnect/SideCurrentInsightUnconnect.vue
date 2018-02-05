<template>
  <div class="column is-3 sideRecent mainSCI">
   <div class="is-sticky">
        <nav class="navbar is-dark">
               <p v-if="langSelected==='EN'" id="currentInsight" class="babMenu navbar-item whiteci">Open Positions</p>
               <p v-else id="currentInsight" class="babMenu navbar-item whiteci">Positions ouvertes</p>
        </nav>
        <div class="card profile-card">
            <p class="cardText" v-if="langSelected==='EN'">Become an Insider to take position on a stock and share your insights !!!</p>
            <p class="cardText" v-else >Devenez un Insider pour prendre position et partager vos intuitions sur le marché !!!</p>
            <div class="login">
                <p v-if="langSelected==='EN'" class="button buttonLogin" type="button" @click="SignupModal">Join</p>
                <p v-else class="button buttonLogin" type="button" @click="SignupModal">Rejoindre</p>
            </div>
        </div>
   </div>
      <!-- SIGN UP MODAL -->
        <b-modal :active.sync="isSignupModalActive" :width="640">
          <signup-modal :langSelected="langSelected" @loginModal="LoginModal" @loginModal.capture="LoginModal($event)"></signup-modal>
        </b-modal>

        <!-- LOG IN MODAL -->
        <b-modal :active.sync="isLoginModalActive" :width="640">
          <login-modal :langSelected="langSelected" :autenticate="autenticate" @forgetModal="forgetModal()" @closeLoginModal="closeLoginModal()"></login-modal>
        </b-modal>
         <b-modal :active.sync="isForgetModalActive" :width="640">
          <forget-password-modal :langSelected="langSelected"></forget-password-modal>
        </b-modal>
    </div>
</template>

<script>
import SignupModal from "@/components/SignupModal";
import LoginModal from "@/components/LoginModal";
import ForgetPasswordModal from "@/components/ForgetPasswordModal";

export default {
  components: {
    SignupModal,
    LoginModal,
    ForgetPasswordModal,
  },
  data() {
    return {
      isSignupModalActive: false,
      isLoginModalActive: false,
      isForgetModalActive: false,
      autenticate: "",
    };
  },
  props: {
    langSelected:"",
    stock: {
      type: Object,
      default: function() {
        return { shortName: "" };
      }
    },
    
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
      this.$emit("signup");
    },
    closeLoginModal() {
      this.isLoginModalActive = false;
    },
    forgetModal(){
      this.isForgetModalActive=true;
    }
  }
};
</script>
<style scoped>
.cardText{
    padding: 0.5rem;
}
.login{
    padding-bottom: 0.5rem;
    display: flex;
    justify-content: center;
}
.button{
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    background-color:#21ce99!important;;
    color: #fff!important;
    box-shadow: 0 0 0 0.125em #21ce99!important;
    border-color: #21ce99!important;
    font-weight: bolder;
    FONT-SIZE: 1.2REM;
    margin: 0.5rem
}
.button:focus,
.button:hover {
    background-color: #fff!important;
    border-color: #21ce99!important;
    color: #21ce99!important;
}
</style>