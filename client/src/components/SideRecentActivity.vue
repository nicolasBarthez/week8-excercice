<template>
  <div class="column is-3">
    <div class="box">
        <p><span class="title is-5">Recent position</span></p>
        <hr>
        <div v-for="(recentPosition, index) in recentPositions" :key="index" class="columns">
            <div class="picss column is-12 is-marginless">
                <div class="media-left">
                    <figure class="image is-48x48 is-circle">
                        <router-link :to="'/dashboard/'+recentPosition.userId._id" class=""><img class="imgProfile" :src="recentPosition.userId.picProfile">
                        </router-link>
                    </figure>
                </div>

                <p>
                    <router-link :to="'/dashboard/'+recentPosition.userId._id" >
                        <strong>&commat;{{recentPosition.userId.username}}</strong>
                    </router-link>
                    <span>is <strong :class="{'has-text-green' : recentPosition.position==='bull', 'has-text-red' :recentPosition.position==='bear'}">{{recentPosition.position}}</strong> on <br> <router-link :to="'/stocks/'+recentPosition.stockId.shortName" >#{{recentPosition.stockId.longName}}</router-link>
                    </span><br>
                    <span class = "seeDash">Followed by {{recentPosition.userId.nbFollower}} Insiders</span><br>
                    </p>
            </div>
        </div>
    </div>
 </div>
</template>

<script>
export default {
  props: {
    recentPositions: null
  }
};
</script>

<style scoped>
.is-9{
    margin-left: 5%
}
.picss{
    display:flex
}
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
