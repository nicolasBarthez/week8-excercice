<template>
    <div class="card">
        <div class="card-content bg-light">
            <div class="media">
                <div class="media-left">
                    <figure @click="SignupModal" class="image is-64x64 is-circle"><img class ="imgProfile" src="/static/images/Georges.jpg" alt="Image"></figure>
                </div>
                <div class="media-content">
                    <div>
                        <div @click="SignupModal" class="field1">
                            <div class="control">
                                <textarea id="babble-text"  name="babble" maxlength="1618" rows="3" :placeholder="langSelected==='EN'?'Share an interresting news...':'Partager une info intéressante...'" class="textarea">
                                    </textarea>
                            </div>
                        </div>
                        <div class="level">
                            <div class="level-left">
                              <a class="options-img-video">
                                  <span @click="SignupModal()" class="chartIcon">
                                       <i class="fa fa-picture-o"></i>&nbsp
                                       <p class="text-img-options">{{langSelected==="EN"?'Share image':'Partager image'}}</p>
                                  </span>
                              </a>
                              <a class="has-text-grey-light">
                                  <span @click="SignupModal()" class="chartIcon">
                                       <i class="fa fa-youtube "></i>&nbsp
                                       <p class="text-img-options"> {{langSelected==="EN"?'Share video':'Partager vidéo'}}</p>
                                  </span>
                              </a>
                            </div>
                            <div class="level-right">
                                <div class="level-item has-text-grey">1618</div>
                                <div class="level-item"><button id="babble-submit"  @click="SignupModal" class="button is-outlined is-primary">Babble</button></div>
                            </div>
                        </div>
                    </div>
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
    langSelected: "",
    stock: {
      type: Object,
      default: function() {
        return { shortName: "" };
      }
    }
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
.fa-picture-o {
  color: #F68818 !important;
    font-size: 30px;

}
.options-img-video{
  padding-right: 20px
}

.titleVideo{
  font-size: 1.2REM !important;
  font-weight: bold
}

.fa-youtube {
  color: #FF0000 !important;
  font-size: 30px;
}
.containerYoutube1 {
  width: 100%;
  margin-top: 20px
}

.containerYoutube2 {
  width: 100%;
}

.youtubeField {
  width: 100%;
  height: 70%;
  padding: 5px;
  font-size: 1.2REM;
  font-style: italic;
}
.bullsAndBearsPic2{
    width:40%;
    padding: 1REM
}
.bullbearPos {
    display: flex;
    align-items: center;
    border-radius: 3%;
    justify-content: space-evenly;
    background-color: #f9f9f9;
    padding: 1rem;
}
.has-text-blue{
    font-weight:bold
}
a{
    color: #192b41 !important;
}
.sticker{
      height: 0;
      width: 0;
      line-height: 1;
      font-size: 0;
      visibility: 0;
      border: 0;
}
.fa-line-chart{
    font-size: 21px;
}
.center {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: auto
}
.chartIcon{
    width:100%;
    display: flex;
    align-items: baseline;
    font-size: 0.85REM;
}
.level-right{
    width:50%;
    margin:0px!important
}
.level-left{
    width:50%;
    margin:0px!important;
}
.level{
    display:flex;
     height:2em;
     align-items: center;
    justify-content: space-between;
}
#bandB{
    background-color:#fff;
    display: flex;
    flex-direction: column;
    height: fit-content;
    padding: 2REM;
    border-radius: 3%;
}
#bullsAndBears2{
    display: flex;
    margin: 1.5REM;
}
.modalTitle{
    margin-top: -2%;
    margin-top: -2%;
    font-weight: bolder;
    margin-bottom: 3%;
    color:#192b41;
}

.mediaModal{
    background-color:#fff;
    padding: 5%;
    margin: 5%;
    border-radius: 3%;
    border: solid,#192b41;
}

.card-content {
    padding: 1.5rem;
}
.bg-light {
    background-color: #f9f9f9;
}
.card .media:not(:last-child) {
    margin-bottom: 0.75rem;
}
.media+.media {
    border-top: 1px solid hsla(0, 0%, 86%, 0.5);
    margin-top: 1rem;
    padding-top: 1rem;
}
.profile-card .image.is-circle {
    margin-top: -2rem;
    border: 2px solid #fff;
    width: 64px;
    height: 64px;
    background-color: #f9f9f9;
}
.fa {
    text-align: center;
    vertical-align: top;
    color: #192b41;
}
.x {
    padding-top: 1%;
    font-size: 21px;
}
.trend-b-b{
    cursor:pointer;
}
.button {
    background-color:#192b41!important;
    color: #fff!important;
    box-shadow: 0 0 0 0.125em #192b41!important;
    border-color: #192b41!important;
}
.button:hover, .button:focus {
    background-color: #fff!important;
    border-color: #192b41!important;
    color: #192b41!important;
}
#Bbull {
    margin-left: -15%;
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    font-weight: bolder;
    background-color: #21ce99!important;
    border-color: #21ce99!important;
    color: #fff!important;
    box-shadow: 0 0 0 0.125em #21ce99!important;
    font-size:1.2rem
}
#Bbull.is-outlined:focus,
#Bbull.is-outlined:hover {
    background-color: #fff!important;
    border-color: #21ce99!important;
    color: #21ce99!important;
}
#Bbear {
    margin-left: 15%;
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    font-weight: bolder;
    color: #fff!important;
    background-color:#ff6026!important;
    box-shadow: 0 0 0 0.125em #ff6026!important;
    border-color: #ff6026!important;
    font-size:1.2rem
}
#Bbear.is-outlined:focus,
#Bbear.is-outlined:hover {
    background-color: #fff!important;
    border-color: #ff6026!important;
    color: #ff6026!important;
}
#NotNow {
    margin-left: 15%;
    MARGIN-TOP: -35%;
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    font-weight: bolder;
    color: #fff;
    background-color:#192b41;
    box-shadow: 0 0 0 0.125em #192b41;
    border-color: #192b41;
}
#NotNow.is-outlined:focus,
#NotNow.is-outlined:hover {
    background-color: #fff!important;
    border-color: #192b41!important;
    color: #192b41!important;
}
.field1 {
    margin-bottom: 0.75rem!important;
}

@media screen and (max-width: 768px) {
  .text-img-options {
    display: none;
  }
  .level-left{
    display: flex;
  }
    .croppa-container{
        max-width:-webkit-fill-available!important
    }
    .field1 {
        margin-bottom: 0.75rem!important;
        margin-top: 0.75rem !important;
        padding-right: 5px;
    }
    .level-item {
        margin-right: 10px;
    }
    .nav-toggle {
        padding-top: 75px;
    }
    .level-right {
        display: flex;
    }
    .level-item:not(:last-child) {
        margin-bottom: 0px;
    }
    .babMenu {
        padding-top: 12px;
        color: #c9c9c9;
    }
    .image{
        display:none
    }
     .media-left{
        margin:0px;
        margin-right:5px;
    }
    .card-content{
        padding: 5px
    }
    .icon{
        font-size:0.8rem;
    }
    .chartIcon{
        justify-content: baseline !important;
    }
    .media-content{
        margin-bottom: 3% !important
    }
    #Bbear {
        margin-left: 10%;
        PADDING-LEFT: 10PX;
        PADDING-RIGHT: 10PX;
        font-weight: bolder;
        color: #ff6026;
        box-shadow: 0 0 0 0.125em #ff6026;
        border-color: #ff6026;
    }

    #NotNow {
        margin-left: 10%;
        MARGIN-TOP: -25%;
        PADDING-LEFT: 1PX;
        PADDING-RIGHT: 1PX;
        font-weight: bolder;
        color: #192b41;
        box-shadow: 0 0 0 0.125em #192b41;
        border-color: #192b41;
    }

    #Bbull {
        margin-left: -10%;
        PADDING-LEFT: 10PX;
        PADDING-RIGHT: 10PX;
        font-weight: bolder;
        color: #21ce99;
        box-shadow: 0 0 0 0.125em #21ce99;
        border-color: #21ce99;
    }
    #bullsAndBears2{
        margin: 1REM;
    }
    .bullsAndBearsPic2{
    width: 100%;
    padding-left:0;
    }
}

</style>
