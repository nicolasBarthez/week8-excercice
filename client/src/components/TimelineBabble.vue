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
                                <router-link to="/" class="level-item has-text-grey-light">
                                    <span class="icon is-small"><i class="fa fa-reply modal-button" data-target="#modal"></i></span>
                                    <small class="favicon"> {{babble.reply.length}}</small>
                                </router-link>
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
    </div>
 </template>

<script>

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
    }
  },
    props: {
        babbles:Array,
        stock: Object,
    },  
    methods: {
        moment: function () {
            return moment();
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
        }
           

        
    },      
}
            
</script>

<style>
    .level-item{
        cursor: pointer;
    }
</style>
