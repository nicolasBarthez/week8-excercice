<template>
  <div class="column is-6">
    <div class="box">
        <p><span class="title is-5">Recent activities of insiders</span>
        <hr>
        <div v-for="(recentPosition, index) in recentPositions" :key="index" class="columns">
            <div class="column is-3 is-marginless">
                <div class="image is-circle">
                   <router-link :to="'/dashboard/'+recentPosition.userId._id" ><img :src="recentPosition.userId.picProfile"></router-link>
                </div>
            </div>
                <div class="column is-9">
        <p>
            <router-link :to="'/dashboard/'+recentPosition.userId._id" >
                <strong>&commat;{{recentPosition.userId.username}}</strong></router-link>
                <span>is {{recentPosition.position}} on  <a @click="reDirect(recentPosition.stockId.longName)" >#{{recentPosition.stockId.longName.length<7 ? recentPosition.stockId.longName : recentPosition.stockId.shortName }}
            </a></span>
            <span>Followed by {{recentPosition.userId.nbFollower}} peoples</span>
            <router-link :to="'/dashboard/'+recentPosition.userId._id">See Dashboard</router-link>
        </p>
        
    </div>
    </div>
    </div>
 </div>
</template>

<script>
export default {
    props: {
     recentPositions:null, 
    },
    methods: {
        reDirect (t) {
        this.$router.push('/stocks/'+t)
        },
    }
}
</script>

<style>

</style>
