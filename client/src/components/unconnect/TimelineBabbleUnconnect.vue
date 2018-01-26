<template>
 <div>
     <div>
    <nav class="navbar is-dark">
      <div class="babblesMenu">
            <a  @click="SignupModal" :class="{'is-active':activeItem ==='all' }" class="babMenu navbar-item is-tab "> {{langSelected==="EN"?"All":"Tous"}}</a>
            <a  @click="SignupModal" :class="{'is-active':activeItem ==='insidermates'}" class="babMenu navbar-item is-tab">{{langSelected==="EN"?"Insider Mates":"Amis insiders"}}</a>
            <a  @click="SignupModal" :class="{'is-active':activeItem ==='me'}" class="babMenu navbar-item is-tab ">{{langSelected==="EN"?"My Babbles":"Mes babbles"}}</a>
      </div>
  </nav>
    <div class="card">
        <div class="babbles-box" id="babble-container">
           <div v-if="babbles" v-for="(babble, index) in babbles" :key="index" class="tweets card-content p-x-1">

  <div v-if = "babble.babbleImg" class="card-image imageChart">
    <figure class="image is-2by1">
      <img :src="babble.babbleImg" alt="Placeholder image">
    </figure>
  </div>

                <article class="media tweet">
                    <figure class="media-left">
                        <p class="image is-64x64 is-circle">
                          <router-link to="'/leaderboard'" class=""><img class="imgProfile" :src="babble.user.picProfile"></router-link>
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p class="tweet-meta">
                                <router-link to="'/leaderboard'" class="">
                                   <strong>{{babble.user.username}}</strong></router-link>
                                   <small class="media-right has-text-grey-light">{{moment(babble.created_at).format('DD-MM-YYYY HH:mm')}}</small>
                            </p>
                            <p class="tweet-body has-text-grey babble-body" v-html=" addLinksToHttp(babble.babble) ">
                                <!-- {{babble.babble}} -->
                           </p>
                        </div>
                        <nav class="media-right">
                            <div class="level-right">
                                <a class="level-item has-text-grey-light" @click="SignupModal">
                                    <span class="icon is-medium"><img class="reply" src="/static/images/comments.png"></span>
                                    <small class="favicon"> {{babble.reply.length}}</small>
                                </a>
                                <a class="level-item has-text-grey-light">
                                    <span class="icon is-medium"><i @click="SignupModal" class="like-btn">🚀</i></span>
                                    <small>{{babble.like.length}}</small>
                                </a>
                            </div>
                        </nav>
                    </div>
                </article>

            </div>
            <div v-else class="babble-container no-babble">
                <p>The timeline is empty</p>
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
import moment from "moment";
import emojify from "emojify.js";

export default {
  data() {
    return {
      isSignupModalActive: false,
      isLoginModalActive: false,
      autenticate: "",
      activeItem: "all"
    };
  },
  props: {
    babbles: Array,
    stock: Object,
    langSelected: ""
  },
  components: {
    SignupModal,
    LoginModal
  },
  computed: {
    charactersLeft() {
      var char = this.babbleText.length,
        limit = 1618;
      return limit - char;
    }
  },
  methods: {
    moment: function(time) {
      return moment(time);
    },
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
    },
    addLinksToHttp(inputText) {
      var replacedText, replacePattern1, replacePattern2, replacePattern3;
      // Take into parameter a string and return the same string with HTML links
      // Ex: "Hello #axa" => "Hello <a href='/stock/axa'>#axa</a>"
      inputText = inputText.replace(
        /#(([a-zA-Z0-9\.])+@[a-zA-Z\_]+)(\W|$)/g,
        // /#(\w+)(\W|$)/g,
        // '<a href="/stocks/$1">#$1$2</a>'
        '<a href="/stocks/$1">#$1 -</a>'
      );

      //URLs starting with http://, https://, or ftp://
      replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      replacedText = inputText.replace(
        replacePattern1,
        '<a href="$1" target="_blank">$1</a>'
      );

      //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
      replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      replacedText = replacedText.replace(
        replacePattern2,
        '$1<a href="http://$2" target="_blank">$2</a>'
      );

      //Change email addresses to mailto:: links.
      replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
      replacedText = replacedText.replace(
        replacePattern3,
        '<a href="mailto:$1">$1</a>'
      );

      return replacedText;
    },
    created() {
      emojify.setConfig({ img_dir: "/static/images/basic" });
    }
  }
};
</script>

<style scoped>
body {
    color: lightslategray;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
}
.imageChart{
    margin-bottom: 1rem;
}
.reply{
    height: 1.4rem;
}
.tweet-meta{
    display: flex;
    justify-content: space-between
}
.fa-line-chart{
    font-size: 15px;
}
.chartIcon{
    width:100%;
    display: flex;
    align-items: baseline;
    font-size: 0.85REM;
}
.level-right .rightchartIcon{
    width:50%;
    margin:0px!important;
}
.level-left .leftchartIcon{
    width:50%;
    margin:0px!important;
}
.level .levelchartIcon{
    display:flex;
}
.tweet-body{
word-break: break-word;
}

.likeModal{
    cursor:initial !important;
}
.tweets {
    border-bottom: 1px solid;
    border-bottom-color: darkgray;
}
.babblesMenu{
    display:flex;
}
.card-content {
    padding: 1.5rem;
}

.navbar.is-dark {
    background-color: #192b41;
    color: #f9f9f9;
}

.navbar {
    background-color: #fff;
    min-height: 3.25rem;
    position: relative;
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
.x {
    padding-top: 1%;
    font-size: 21px;
}
.level-item{
    cursor: pointer;
}

@media screen and (max-width: 768px) {
    .field:not(:last-child) {
        margin-bottom: 0.75rem;
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
     .imageModal{
        display:none
    }
    .media-left{
        margin:0px;
        margin-right:5px;
    }
    .card-content{
        padding: 10px
    }
   .icon{
        font-size:0.8rem;
    }
    .level-left + .level-right{
        margin-top: 0px !important;
    }
    .levelchartIcon{
        display: flex !important;
        align-items: center !important;
    }
}

@media screen and (min-width: 1024px){
.navbar .navbar-end, .navbar-menu, .navbar-start {
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    }
    .navbar {
    min-height: 3.25rem;
    }
}

</style>
