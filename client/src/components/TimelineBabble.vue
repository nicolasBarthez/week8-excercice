<template>
    <div>
    <div v-if="!stock">.....loading</div>
     <div>
     <nav class="navbar is-dark">
        <div>
            <div class="babblesMenu">
                 <div v-for="(link, index) in navbarLinks" :key="index" @click="sortBabbles(link.query)"
                    :class="{'is-active': link.text, 'nav-item': true, 'is-tab': true }"> {{ link.text }}
                </div>
                <p id="vide"></p>
                <router-link to="/" id="reload1" class="babMenu"><i href="/stream" id="reload" class="navbar-item fa fa-refresh"></i></router-link>
            </div>
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
                                <a class="level-item has-text-grey-light">
                                    <span class="icon is-small"><i class="fa fa-reply modal-button" @click="showModal(babble)"></i></span>
                                    <small class="favicon"> {{babble.reply.length}}</small>
                                </a>
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

    <b-modal v-if="isCardModalActive=true" :width="640">
        <div id="modal" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="card">
        <div class="babbles-box" id="babble-container">
           <div class="tweets card-content p-x-1">    
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
                                   <strong>{{modalBabble.user}}</strong></router-link>
                                   <small class="media-right has-text-grey-light">{{moment(modalBabble.created_at).format('llll')}}</small>
                            </p>
                            <p class="tweet-body has-text-grey babble-body">
                                {{modalBabble.babble}}
                           </p>
                        </div>
                        <nav class="media-right">
                            <div class="level-right">
                                <a class="level-item has-text-grey-light">
                                    <span class="icon is-small"><i class="fa fa-reply modal-button"></i></span>
                                    <small class="favicon"> {{modalBabble.reply}}</small>
                                </a>
                                <a class="level-item has-text-grey-light">
                                    <form id="like-form"> <span class="icon is-small"><i
                                     @click="iLike(modalBabble)" class="fa fa-thumbs-o-up like-btn"></i></span>
                                        <small>{{modalBabble.like}}</small>
                                   </form>
                                </a>
                            </div>
                        </nav>
                    </div>
                </article>
            </div>
            
        </div>
      </div>
      </div>
        <div id="babbleModal" class="card">
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
                            <div class="level-item"><button id="babble-submit"  @click="postBabble()" class="button is-outlined is-primary">Babble</button></div>
                        </div>
                        </div>      
                    </div>
                </div>
            </div>
        </div>
        </div>
        <button class="modal-close"></button>
    </div>
    </b-modal>
</div>
</template>

<script>
import { sendBabble } from "@/api/api";
import { postLike } from "@/api/api";
import moment from 'moment';

export default {
     data () {
        return {
            navbarLinks: [
                {  text: 'All', query: 'all'},
                {  text: 'Insiders Mates',  query: 'insider-mates' },
                {  text: 'My posts', query: 'me'},
            ],
            isCardModalActive: false,
            babbleText:'',
            modalBabble:'',

    }
  },
    props: {
        babbles:Array,
        stock: Object,
        connectedUser:Object
    },  
    methods: {
        moment: function () {
            return moment();
        },
        showModal(babble){
            console.log("***************************************something is wrong", babble);
            this.modalBabble=babble;
            console.log("***************************************modalBabbleufjhgjhgfhjgfhfhgf", this.modalBabble, this.modalBabble.like, this.modalBabble.like.length )
            this.isCardModalActive=true;
            console.log("***************************************modalBabble", this.isCardModalActive)
        },
        iLike(babble) {
            postLike(babble._id)
                .then(() => {
                this.$emit("changeBabbles");
                })
                .catch(err => {
                console.log("something is wrong");
                });
        },
        sortBabbles(link){
            console.log('linnnnnnnnk', link)
            this.$emit("sort",link)
        },
        postBabble(){
        sendBabble(this.babbleText,this.stock._id).then(() => {
        this.babble='';
        this.$emit("changeBabbles");
        });
      },        
    },      
}
            
</script>

<style>
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
