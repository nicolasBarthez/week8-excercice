<template>
    <div>
     <div>
     <nav class="navbar is-dark">
        <div class="babblesMenu">
            <div v-for="(link, index) in navbarLinks" :key="index" @click="sortBabbles(link.query)"
                :class="{'is-active': link.text[index], 'nav-item': true, 'is-tab': true }"> {{ link.text }}
            </div>
            <p id="vide"></p>
            <router-link to="/" id="reload1" class="babMenu"><i href="/stream" id="reload" class="navbar-item fa fa-refresh"></i></router-link>
        </div>
    </nav>
    <div class="card">
        <div class="babbles-box" id="babble-container">
           <div v-if="babbles" v-for="(babble, index) in babbles" :key="index" class="tweets card-content p-x-1">
                <article class="media tweet">
                    <figure class="media-left">
                        <p class="image is-64x64 is-circle">
                          <router-link to="/" class=""><img src=""></router-link>
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
                                <div class="level-item has-text-grey-light" @click="showModal(babble)">
                                    <span class="icon is-small"><i class="fa fa-reply"></i></span>
                                    <small class="favicon"> {{babble.reply.length}}</small>
                                </div>
                                <a class="level-item has-text-grey-light">
                                    <form id="like-form"> <span class="icon is-small"><i
                                     @click="iLike(babble)" class="fa fa-thumbs-o-up like-btn"></i></span>
                                        <small>{{babble.like.length}}</small>
                                   </form>
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
                          <router-link to="/" class=""><img :src="modalBabble.user.picProfile" alt="Image"></router-link>
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
                                <a class="level-item has-text-grey-light">
                                    <span class="icon is-small"><i class="fa fa-reply modal-button"></i></span>
                                    <small class="favicon"> {{modalBabble.reply.length}}</small>
                                </a>
                                <a class="level-item has-text-grey-light">
                                    <form id="like-form"> <span class="icon is-small"><i
                                     @click="iLike(modalBabble)" class="fa fa-thumbs-o-up like-btn"></i></span>
                                        <small>{{modalBabble.like.length}}</small>
                                   </form>
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
                          <router-link to="/" class=""><img src="reply.picProfile"></router-link>
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
                <figure v-if="connectedUser" class="image is-32x32 is-circle"><img :src="connectedUser.picProfile" alt="Image"></figure>
                </div>
                <div class="media-content">
                    <div>
                        <div class="field">
                            <div class="control">
                                <textarea v-model="babbleText" id="babble-text" name="babble" maxlength="200" rows="3" placeholder="Whats happening?" class="textarea">
                                </textarea>
                            </div>
                        </div>
                        <div class="level">
                            <div class="level-left">
                                <a class="has-text-grey-light">
                                    <span class="icon">
                                        <i class="fa fa-image"></i>
                                    </span>
                                </a>
                            </div>
                        <div class="level-right">
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
        { text: "Watch List", query: "watchlist" },
        { text: "My posts", query: "me" }
      ],
      babbleText: "",
      modalBabble: "",
      userReply: ""
    };
  },
  props: {
    babbles: Array,
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
      console.log("linnnnnnnnk", link);
      this.$emit("sort", link);
    },
    postBabble(modalBabble) {
      console.log(
        "***************************************modalBabbleID",
        this.modalBabble._id
      );
      sendBabbleReply(this.babbleText, modalBabble._id).then(() => {
        console.log(
          "ùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùùmodalBabbleIDAfterSend",
          this.modalBabble._id
        );
        this.babbleText = "";
        this.isCardModalActive = false;
        this.$emit("changeBabbles");
      });
    },
    getLinkOnStocks() {
      $(document).ready(function() {
        $(".babble-body").each((i, babble) => {
          let link = $(babble)
            .html()
            .replace(/#(\w+)(\W|$)/g, '<a href="/stock/$1">#$1$2</a>');
          $(babble).html(link);
        });
      });
    }
  },
  created() {
    getLinkOnStocks();
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

.tweet-body{
word-break: break-word;
}

.tweets {
    border-bottom: 1px solid;
    border-bottom-color: darkgray;
}
.babblesMenu{
    display:flex;
    padding-left:20px;
}
.card-content {
    padding: 1.5rem;
}
.navbar-item, .navbar-link {
    display: block;
    line-height: 1.5;
    padding: .5rem 1rem;
    position: relative;
    cursor: pointer;
}
.navbar-item.is-tab.is-active {
    background-color: transparent;
    border-bottom-color: #f9f9f9;
    border-bottom-style: solid;
    border-bottom-width: 3px;
    color: #f9f9f9;
    padding-bottom: calc(0.5rem - 3px);
}
.navbar-item.is-tab {
    border-bottom: 1px solid transparent;
    min-height: 3.25rem;
}
.navbar-item, .navbar-link {
    display: block;
    line-height: 1.5;
    padding: .5rem 1rem;
    position: relative;
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
.navbar, .navbar-end, .navbar-menu, .navbar-start {
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
.button.is-primary:focus:not(:active), .button.is-primary.is-focused:not(:active) {
    -webkit-box-shadow: 0 0 0 0.125em #192b41;
    box-shadow: 0 0 0 0.125em #192b41;
}
.button.is-primary.is-hovered,
.button.is-primary:hover,
.button.is-primary.is-active,
.button.is-primary:active {
    background-color: #21ce99;
    border-color: transparent;
    color: #fff;
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
</style>
