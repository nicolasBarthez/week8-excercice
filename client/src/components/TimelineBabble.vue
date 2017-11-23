<template>
 <div>
     <div>
    <nav class="navbar is-dark">
      <div class="babblesMenu">
            <a  @click="sortBabbles('all')":class="{'is-active':activeItem ==='all' }" class="babMenu navbar-item is-tab ">All</a>
            <a  @click="sortBabbles('insidermates')" :class="{'is-active':activeItem ==='insidermates'}" class="babMenu navbar-item is-tab">Insider Mates</a>
            <a  @click="sortBabbles('me')" :class="{'is-active':activeItem ==='me'}" class="babMenu navbar-item is-tab ">My Posts</a>
      </div>
  </nav>
    <div class="card">
        <div class="babbles-box" id="babble-container">
           <div v-if="babbles" v-for="(babble, index) in babbles" :key="index" class="tweets card-content p-x-1">

  <div v-if = "babbles.babble_img" class="card-image">
    <figure class="image is-4by3">
      <img src="babbles.babble_img" alt="Placeholder image">
    </figure>
  </div>

                <article class="media tweet">
                    <figure class="media-left">
                        <p class="image is-64x64 is-circle">
                          <router-link :to="'/dashboard/'+babble.user._id" class=""><img class="imgProfile" :src="babble.user.picProfile"></router-link>
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p class="tweet-meta">
                                <router-link :to="'/dashboard/'+babble.user._id" class="">
                                   <strong>{{babble.user.username}}</strong></router-link>
                                   <small class="media-right has-text-grey-light">{{moment(babble.created_at).format('DD-MM-YYYY HH:mm')}}</small>
                            </p>
                            <p class="tweet-body has-text-grey babble-body">
                                {{babble.babble}}
                           </p>
                        </div>
                        <nav class="media-right">
                            <div class="level-right">
                                <a class="level-item has-text-grey-light" @click="showModal(babble)">
                                    <span class="icon is-medium"><img class="reply" src="/static/images/comments.png"></span>
                                    <small class="favicon"> {{babble.reply.length}}</small>
                                </a>
                                <a class="level-item has-text-grey-light">
                                    <span class="icon is-medium"><i @click="iLike(babble)" class="like-btn">🚀</i></span>
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
 <div v-if="modalBabble">
                <b-modal :active.sync="isCardModalActive" :width="640">
        <div class="card">
           <div class="tweets card-content p-x-1">
                <article class="media tweet">
                    <figure class="media-left">
                        <p class="image is-64x64 is-circle">
                          <router-link :to="'/dashboard/'+modalBabble.user._id" class="">
                        <img class="imgProfile" :src="modalBabble.user.picProfile" alt="Image"></router-link>
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p class="tweet-meta">
                                  <router-link :to="'/dashboard/'+modalBabble.user._id" class="">
                                   <strong>{{modalBabble.user.username}}</strong></router-link>
                                   <small class="media-right has-text-grey-light">{{moment(modalBabble.created_at.toString()).format('DD-MM-YYYY HH:mm')}}</small>

                            </p>
                            <p class="tweet-body has-text-grey babble-body">
                                {{modalBabble.babble}}
                           </p>
                        </div>
                        <nav class="media-right">
                            <div class="level-right">
                                <a class="likeModal level-item has-text-grey-light">
                                    <span class="icon is-medium"><img class="reply" src="/static/images/comments.png"></span>
                                    <small class="favicon"> {{modalBabble.reply.length}}</small>
                                </a>
                                <a class="likeModal level-item has-text-grey-light">
                                  <span class="icon is-medium"><i
                                     @click="iLike(babble)" class="like-btn">🚀</i></span>
                                        <small>{{modalBabble.like.length}}</small>
                                </a>
                            </div>
                        </nav>
                    </div>
                </article>
            </div>
            <div v-if="modalBabble.reply" v-for="(reply, index) in modalBabble.reply" :key="index" class="tweets card-content p-x-1">
                <article class="media tweet">
                    <figure class="media-left">
                        <p class="image is-64x64 is-circle">
                          <router-link :to="'/dashboard/'+reply.user._id" class=""><img class="imgProfile" :src="reply.picProfile"></router-link>
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p class="tweet-meta">
                               <router-link :to="'/dashboard/'+reply.user._id" class="">
                                   <strong>{{reply.username}}</strong></router-link>
                                   <small class="media-right has-text-grey-light">{{moment(reply.created_at).format('DD-MM-YYYY HH:mm')}}</small>
                            </p>
                            <p class="tweet-body has-text-grey babble-body">
                                {{reply.babble}}
                           </p>
                        </div>
                    </div>
                </article>
            </div>
      </div>




        <div class="card-content bg-light">
            <div class="media">
                <div class="media-left">
                <figure v-if="connectedUser" class="image imageModal is-64x64 is-circle"><img class="imgProfile" :src="connectedUser.picProfile" alt="Image"></figure>
                </div>
                <div class="media-content">
                    <div>
                        <div class="field">
                            <div class="control">
                                <textarea v-model="babbleText" id="babble-text" name="babble" maxlength="500" rows="3" placeholder="Whats happening?" class="textarea">
                                </textarea>
                            </div>
                        </div>
                        <div class="level levelchartIcon">
                            <div class="level-left leftchartIcon">
                                <a class="has-text-grey-light">
                                    <span class="icon chartIcon">
                                         <i class="fa fa-line-chart"></i>
                                         &nbsp Share a chart
                                    </span>
                                </a>
                            </div>
                        <div class="level-right rightchartIcon">
                            <div class="level-item has-text-grey">{{charactersLeft}}</div>
                            <div class="level-item"><button id="babble-submit"  @click="postBabble(modalBabble)" class="button is-outlined is-primary">Babble</button></div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </b-modal>
    </div>
 </div>
</template>

<script>
import { sendBabbleReply } from "@/api/api";
import { postLike } from "@/api/api";
import moment from "moment";

export default {
  data() {
    return {
      isCardModalActive: false,
      babbleText: "",
      modalBabble: "",
      userReply: "",
      activeItem: "all"
    };
  },
  props: {
    babbles: Array,
    stock: Object,
    connectedUser: Object,
  },
   computed: {
    charactersLeft() {
      var char = this.babbleText.length,
        limit = 500;
      return limit - char;
    }
  },
  methods: {
    moment: function(time) {
      return moment(time);
    },
    showModal(babble) {
      this.modalBabble = babble;
      this.isCardModalActive = true;
    },

    iLike(babble) {
      postLike(babble._id)
        .then(() => {
          this.$emit("changeBabbles");
          this.isCardModalActive = false;
        })
        .catch(err => {
          console.log("something is wrong");
        });
    },
     sortBabbles(activeItem) {
      this.$emit("sort", activeItem);
      this.activeItem=activeItem
    },

    postBabble(modalBabble) {
      sendBabbleReply(this.babbleText, modalBabble._id).then(() => {
        this.babbleText = "";
        this.isCardModalActive = false;
        this.$emit("changeBabbles");
      });
    },
  },
};
</script>

<style scoped>
body {
    color: lightslategray;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
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
    width:100%
}
.level-right .rightchartIcon{
    width:50%;
    margin:0px;
}
.level-left .leftchartIcon{
    width:50%;
    margin:0px;
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
.button.is-primary.is-outlined {
    background-color: transparent;
    border-color: #192b41;
    color: #192b41;
}

.button.is-primary.is-outlined:focus,
.button.is-primary.is-outlined:hover {
    background-color: #192b41;
    border-color: #192b41;
    color: #fff;
}

.button.is-primary.is-hovered,
.button.is-primary:hover,
.button.is-primary.is-active,
.button.is-primary:active {
    background-color: #21ce99;
    border-color: transparent;
    color: #fff;
}
.button.is-primary:focus:not(:active), .button.is-primary.is-focused:not(:active) {
    -webkit-box-shadow: 0 0 0 0.125em #192b41;
    box-shadow: 0 0 0 0.125em #192b41;
}
.button.is-primary {
    background-color: #21ce99;
    border-color: transparent;
    color: #fff;
}

.x {
    padding-top: 1%;
    font-size: 21px;
}

.button.is-primary {
    background-color: #192b41;
}
 .level-item{
        cursor: pointer;
}


@media screen and (max-width: 768px) {
    .modal{
        position: absolute;
        
    }
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
        font-size:15px;
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
