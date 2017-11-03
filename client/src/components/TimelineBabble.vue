<template>
 <div>
     <div>
     <nav class="navbar is-dark">
        <div class="babblesMenu">
            <a v-for="(link, index) in navbarLinks" :key="index" @click="sortBabbles(link.query)"
                 :class="{ active: 'white' }" class="nav-item is-tab poi"> {{ link.text }}
            </a>
            <router-link to="/" id="reload1" class="babMenu"><i href="/stream" id="reload" class="navbar-item fa fa-refresh"></i></router-link>
        </div>
    </nav>
    <div class="card">
        <div class="babbles-box" id="babble-container">
           <div v-if="babbles" v-for="(babble, index) in babbles" :key="index" class="tweets card-content p-x-1">
                <article class="media tweet">
                    <figure class="media-left">
                        <p class="image is-64x64 is-circle">
                          <router-link to="/" class=""><img class="imgProfile" :src="babble.user.picProfile"></router-link>
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p class="tweet-meta">
                                <router-link to="/" class="has-text-dark">
                                   <strong>{{babble.user.username}}</strong></router-link>
                                   <small class="media-right has-text-grey-light">{{moment(babble.created_at).format('llll')}}</small>
                            </p>
                            <p class="tweet-body has-text-grey babble-body">
                                {{babble.babble}}
                           </p>
                        </div>
                        <nav class="media-right">
                            <div class="level-right">
                                <a class="level-item has-text-grey-light" @click="showModal(babble)">
                                    <span class="icon is-small"><i class="fa fa-reply"></i></span>
                                    <small class="favicon"> {{babble.reply.length}}</small>
                                </a>
                                <a class="level-item has-text-grey-light">
                                    <span class="icon is-small"><i
                                     @click="iLike(babble)" class="fa fa-thumbs-o-up like-btn"></i></span>
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
                          <router-link to="/" class=""><img class="imgProfile" :src="modalBabble.user.picProfile" alt="Image"></router-link>
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p class="tweet-meta">
                                <router-link to="/" class="has-text-dark">
                                   <strong>{{modalBabble.user.username}}</strong></router-link>
                                   <small class="media-right has-text-grey-light">{{moment(modalBabble.created_at.toString()).format('llll')}}</small>

                            </p>
                            <p class="tweet-body has-text-grey babble-body">
                                {{modalBabble.babble}}
                           </p>
                        </div>
                        <nav class="media-right">
                            <div class="level-right">
                                <a class="likeModal level-item has-text-grey-light">
                                    <span class="icon is-small"><i class=" likeModal fa fa-reply modal-button"></i></span>
                                    <small class="favicon"> {{modalBabble.reply.length}}</small>
                                </a>
                                <a class="likeModal level-item has-text-grey-light">
                                   <span class="icon is-small"><i class="likeModal fa fa-thumbs-o-up like-btn"></i></span>
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
                          <router-link to="/" class=""><img class="imgProfile" :src="reply.picProfile"></router-link>
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p class="tweet-meta">
                                <router-link to="/" class="has-text-dark">
                                   <strong>{{reply.username}}</strong></router-link>
                                   <small class="media-right has-text-grey-light">{{moment(reply.created_at).format('llll')}}</small>
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
                <figure v-if="connectedUser" class="image is-32x32 is-circle"><img class="imgProfile" :src="connectedUser.picProfile" alt="Image"></figure>
                </div>
                <div class="media-content">
                    <div>
                        <div class="field">
                            <div class="control">
                                <textarea v-model="babbleText" id="babble-text" name="babble" maxlength="200" rows="3" placeholder="Whats happening?" class="textarea">
                                </textarea>
                            </div>
                        </div>
                        <div class="level levelchartIcon">
                            <div class="level-left leftchartIcon">
                                <a class="has-text-grey-light">
                                    <span class="icon chartIcon">
                                         <i class="fa fa-line-chart">&nbsp Share a chart</i>
                                    </span>
                                </a>
                            </div>
                        <div class="level-right rightchartIcon">
                            <div class="level-item has-text-grey">200</div>
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
      navbarLinks: [
        { text: "All", query: "all" },
        { text: "Insiders Mates", query: "insider-mates" },
        { text: "My posts", query: "me" }
      ],
      babbleText: "",
      modalBabble: "",
      userReply: "",
      link: "all",
      active: false
    };
  },
  props: {
    babbles: Array,
    stock: Object,
    connectedUser: Object
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
    sortBabbles(link) {
      this.$emit("sort", link);
      this.link = link;
      this.active = !this.active;
    },
    postBabble(modalBabble) {
      sendBabbleReply(this.babbleText, modalBabble._id).then(() => {
        this.babbleText = "";
        this.isCardModalActive = false;
        this.$emit("changeBabbles");
      });
    }
  }
};
</script>

<style scoped>
body {
    color: #4a4a4a;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
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

@media screen and (min-width: 1024px){
.navbar {
    min-height: 3.25rem;
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

@media screen and (max-width: 768px) {
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
}
 .level-item{
        cursor: pointer;
    }

    .poi{

    }
</style>
