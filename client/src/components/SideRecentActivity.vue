<template>
  <div class="column is-3">
    <div class="box">
        <p><span class="title is-5">Recent position</span></p>
        <hr>
        <div v-for="(recentPosition, index) in recentPositions" :key="index" class="columns">
            <div class="column is-3 is-marginless">
                <div class="media-left">
                    <figure class="image is-32x32 is-circle">
                        <router-link :to="'/dashboard/'+recentPosition.userId._id" class=""><img class="imgProfile" :src="recentPosition.userId.picProfile">
                        </router-link>
                    </figure>
                </div>
            </div>
            <div class="column is-9">
                <p>
                    <router-link :to="'/dashboard/'+recentPosition.userId._id" >
                        <strong>&commat;{{recentPosition.userId.username}}</strong>
                    </router-link>
                    <span>is {{recentPosition.position}} on  <router-link :to="'/stocks/'+recentPosition.stockId.longName">#{{recentPosition.stockId.longName.length<7 ? recentPosition.stockId.longName : recentPosition.stockId.shortName }}</router-link>
                    </span>
                    <span>Followed by {{recentPosition.userId.nbFollower}} peoples</span><br>
                    <router-link :to="'/dashboard/'+recentPosition.userId._id" class = "seeDash">See Dashboard</router-link>
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
}
</script>

<style scoped>
a {
        color: #192b41 !important;
    }

.seeDash{
        color: #b5b5b5 !important;
}
@media screen and (min-width: 769px){
.column.is-9, .column.is-9-tablet {
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
    width: 80%;
}
}

</style>
