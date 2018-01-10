<template>
  <div class="column is-3">
    <div v-if="connectedUser"class="box">
        <p v-if="connectedUser.lang==='EN'"><span class="title is-5">Recent position</span></p>
        <p v-else><span class="title is-5">Dernières positions prises</span></p>
        <hr>
        <div v-for="(recentPosition, index) in recentPositions" :key="index" class="columns">
            <div class="picss column is-12 is-marginless">
                <div class="media-left">
                    <figure class="image is-48x48 is-circle">
                        <router-link :to="'/dashboard/'+recentPosition._doc.userId._id" class=""><img class="imgProfile" :src="recentPosition._doc.userId.picProfile">
                        </router-link>
                    </figure>
                </div>

                <p>
                    <router-link :to="'/dashboard/'+recentPosition._doc.userId._id" >
                        <strong>&commat;{{recentPosition._doc.userId.username}}</strong>
                    </router-link><br>
                    <span v-if="connectedUser.lang==='EN'" class = "seeDash">({{recentPosition.nbOfInsightsWon}} <span v-if = "recentPosition.nbOfInsightsWon>1"> won trades)</span><span v-else> won trade)</span></span>
                    <span v-else class = "seeDash">({{recentPosition.nbOfInsightsWon}}<span v-if = "recentPosition.nbOfInsightsWon>1"> trades gagnants)</span><span v-else></span> trade gagnant) </span><br>
                    <span>{{connectedUser.lang==='EN'?"is":"est"}} <strong :class="{'has-text-green' : recentPosition._doc.position==='bull', 'has-text-red' :recentPosition._doc.position==='bear'}">{{recentPosition._doc.position}}</strong> {{connectedUser.lang==='EN'?"on":"sur"}}  <router-link :to="'/stocks/'+recentPosition._doc.stockId.shortName" >#{{recentPosition._doc.stockId.longName}}</router-link>
                    </span><br>

                    </p>
            </div>
        </div>
    </div>
 </div>
</template>

<script>
export default {
  props: {
    recentPositions: null,
    connectedUser: Object
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
