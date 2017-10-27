<template>
    <div>
    <div v-if="!stock">.....loading</div>
     <div>
     <nav class="navbar is-dark">
        <div>
            <div class="babblesMenu">
                <router-link to="/" class="babMenu navbar-item is-tab is-active">All</router-link>
                <router-link to="/" class="babMenu navbar-item">Insiders Mates</router-link>
                <router-link to="/" class="babMenu navbar-item">Watch List</router-link>
                <router-link to="/" class="babMenu navbar-item">My Posts</router-link>
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
                                   <strong>{{babble.user_id.username}}</strong></router-link>
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
                                <router-link to="/" class="level-item has-text-grey-light">
                                    <div id="like-form"> <span class="icon is-small"><i class="fa fa-thumbs-o-up like-btn"></i></span>
                                        <small>{{babble.like.length}}</small>
                                        <input class="like-input" name="likeInput" val="">
                                    </div>
                                </router-link>
                            </div>
                        </nav>
                    </div>
                </article>
                <button class="button m-t-1 m-b-1 is-fullwidth">Load more...</button>
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
import { getStockBabbles } from "@/api/api";
   
export default {
    data() {
        return {
        }
    },
    props: {
        babbles: Object,
        stock: Object,
        },        
}
            
</script>

<style>
    
</style>
