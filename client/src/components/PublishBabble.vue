<template>
    <div class="card">
        <div class="card-content bg-light">
            <div class="media">
                <div class="media-left">
                    <figure v-if="connectedUser" class="image is-64x64 is-circle"><img class ="imgProfile" :src="connectedUser.picProfile" alt="Image"></figure>
                </div>
                <div class="media-content">
                    <div>
                        <div class="field1">
                            <div class="control">
                                <textarea v-model="babble" @input="putHashtag($event)" :placeholder="connectedUser.lang==='EN'?'Write here your info about #'+stock.shortName:'Ecrivez une info sur #'+stock.shortName" id="babble-text" name="babble" maxlength="500" rows="3"  class="textarea">
                                </textarea>
                            </div>

                        </div>
                        <div class="level">
                            <div class="level-left">
                                <a class="has-text-grey-light">
                                    <span @click="shareChart()" class="chartIcon">
                                         <i class="fa fa-line-chart"></i>&nbsp {{connectedUser.lang==="EN"?'Share an image':'Partager une image'}}
                                    </span>
                                </a>
                            </div>
                            <div class="level-right">
                                <div class="level-item has-text-grey">{{charactersLeft}}</div>
                                <div class="level-item"><button id="babble-submit"  @click="postBabble()" class="button is-outlined is-primary">Babble</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal :active.sync="isCardModalActive">
            <div id="bandB" class="level media">
                <h1 class="modalTitle">
                    Take position on {{stock.longName}} !
                </h1>
                <div id="bullsAndBearsPic">
                    <img src="/static/images/roundBullBearArrow.png" alt="bull and bear">
                </div>
                <div id="bullsAndBears2">
                    <button id="Bbull" @click="imBull()" class="button is-small is-outlined is-primary">Be Bull</button>
                    <button id="NotNow" @click="isCardModalActive = false" class="button is-small is-outlined is-primary">Not Now</button>
                    <button id="Bbear" @click="imBear()"  class="button is-small is-outlined is-primary">Be Bear</button>
                </div>
            </div>
        </b-modal>

        <b-modal :active.sync="isShareChartActive">
            <div class="mediaModal">
            <div>
                 <label> <span class="chartIcon">
                    <i class="fa fa-line-chart"></i>&nbsp {{connectedUser.lang==="EN"?'Share an image':'Partager une image'}}</span>
                    <img src="/static/images/stickerPicture2.svg" class ="sticker">
                    <croppa v-model="babbleImage"
                        :width="width"
                        :height="height"
                        :quality="quality"
                        :placeholder-font-size="18"
                        :prevent-white-space="false"
                        :reverse-scroll-to-zoom="true"
                        :show-loading="true"
                        :loading-size="50"
                        :accept="'image/*'"
                        @draw="onDraw"
                        class="column">
                    </croppa>
                </label><br>
                <div class="card-content bg-light">
                <div class="media">
                <div class="media-left">
                    <figure v-if="connectedUser" class="image is-64x64 is-circle"><img class ="imgProfile" :src="connectedUser.picProfile" alt="Image"></figure>
                </div>
                <div class="media-content">
                    <div>
                        <div class="field1">
                            <div class="control">
                                <textarea v-model="babble" @input="putHashtag($event)" :placeholder="connectedUser.lang==='EN'?'Write here your info about #'+stock.shortName:'Ecrivez une info sur #'+stock.shortName" id="babble-text" name="babble" maxlength="500" rows="3"  class="textarea">
                                </textarea>
                            </div>

                        </div>
                        <div class="level">
                            <div class="level-left">

                            </div>
                            <div class="level-right">
                                <div class="level-item has-text-grey">{{charactersLeft}}</div>
                                <div class="level-item"><button id="babble-submit"  @click="postChartBabble()" class="button is-outlined is-primary btn">Babble</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </div>
            </div>
        </b-modal>
        <b-modal :active.sync='imBullModal' :width="640">
                <div class="bullbearPos">     
                    <div class="bullsAndBearsPic2">
                        <img src="/static/images/roundBullArrow.png" alt="bull and bear">
                    </div>
                    <div>
                        Vous venez de prendre une position <strong class="has-text-green">Bull @ {{stock.price}} {{stock.currency}}</strong> sur <strong class="has-text-green">{{stock.longName}}</strong>.<br>
                        Cette position a une durée de <strong class="has-text-blue">30 jours</strong>.<br>
                        Vous pouvez la clôturer à tout moment.<br>
                        Retouvez vos positions en cours en cliquant <strong class="has-text-blue"><router-link to="/mydashboard">ici</router-link></strong>.
                    </div>
                </div>
            </b-modal>
            <b-modal :active.sync='imBearModal' :width="640">
                <div class="bullbearPos">     
                    <div class="bullsAndBearsPic2">
                        <img src="/static/images/roundBearArrow.png" alt="bull and bear">
                    </div>
                    <div>
                        Vous venez de prendre une position <strong class="has-text-red">Bear @ {{stock.price}} {{stock.currency}}</strong> sur <strong class="has-text-red">{{stock.longName}}</strong>.<br>
                        Cette position a une durée de <strong class="has-text-blue">30 jours</strong>.<br>
                        Vous pouvez la clôturer à tout moment.<br>
                        Retouvez vos positions en cours en cliquant <strong class="has-text-blue"><router-link to="/mydashboard">ici</router-link></strong>.
                    </div>
                </div>
            </b-modal>
    </div>
</template>

<script>
import { sendBabble } from "@/api/api";
import { beBear } from "@/api/api";
import { beBull } from "@/api/api";
import emojify from "emojify.js";

export default {
  data() {
    return {
      babble: "",
      prefix: "",
      isCardModalActive: false,
      isShareChartActive: false,
      imBullModal:false,
      imBearModal: false,
      babbleImage: null,
      babbleUrl: "",
      noSticker: false,
      width: 0,
      height: 0,
      quality: 0
    };
  },
  props: {
    stock: {
      type: Object,
      default: function() {
        return { shortName: "" };
      }
    },
    connectedUser: Object,
    watchItem: Object
  },

  methods: {
    shareChart() {
      this.width =
        window.visualViewport.width >= 640
          ? 640 * 0.75
          : window.visualViewport.width * 0.6;
      this.height =
        window.visualViewport.width >= 640
          ? 640 * 0.75 * 0.5
          : window.visualViewport.width * 0.6 * 0.5;
      this.quality =
        window.visualViewport.width >= 640 ? 0.7 : 640 * 0.7 / this.width;
      this.isShareChartActive = true;
    },
    generateImage: function() {
      let babbleUrl = this.babbleImage.generateDataUrl("image/jpeg", 0.8);
      if (!babbleUrl) {
        alert("no image");
        return;
      }
      this.babbleUrl = babbleUrl;
    },
    onDraw(ctx) {
      if (this.noSticker) return;
      ctx.drawImage(document.querySelector(".sticker"), 150, 100, 50, 20);
    },
    postChartBabble() {
      this.generateImage(),
        this.postBabble(),
        (this.isShareChartActive = false);
    },

    postBabble() {
      if (!this.watchItem || this.watchItem.position === "none") {
        this.isCardModalActive = true;
      }
      this.babble = emojify.replace(this.babble);
      sendBabble(this.babble, this.stock._id, this.babbleUrl).then(() => {
        this.babble = "";
        this.babbleUrl = "";
        this.$emit("changeBabbles");
      });
    },
    imBull() {
      const inWatchList = this.watchItem ? this.watchItem._id : undefined;
      beBull(this.stock.shortName, inWatchList).then(item => {
        this.$emit("changeWatchlist", item);
        this.isCardModalActive = false;
        this.imBullModal = true
      });
    },
    imBear() {
      const inWatchList = this.watchItem ? this.watchItem._id : undefined;
      beBear(this.stock.shortName, inWatchList).then(item => {
        this.$emit("changeWatchlist", item);
        this.isCardModalActive = false;
        this.imBearModal = true
      });
    },

    putHashtag(e) {
      if (
        e.data === "#" &&
        e.target.value[e.target.value.lastIndexOf("#") - 1] === " "
      ) {
        console.log("Autocomplete launched");
      }
      return this.babble.length !== 1
        ? e.target.value.split("-")[0] === `#${this.stock.shortName}-`
          ? this.babble
          : "#" + this.stock.shortName + "- " + this.babble
        : (this.babble = `#${this.stock.shortName}-` + this.babble);
    }
  },
  computed: {
    charactersLeft() {
      var char = this.babble.length,
        limit = 500;
      return limit - char;
    }
  },
  created() {
    emojify.setConfig({ img_dir: "/static/images/basic" });
  }
};
</script>

<style scoped>
.bullsAndBearsPic2{
    width:40%;
    padding: 1REM
}
.bullbearPos {
    display: flex;
    align-items: center;
    border-radius: 3%;
    justify-content: space-evenly;
    background-color: #f9f9f9;
    padding: 1rem;
}
.has-text-blue{
    font-weight:bold
}
a{
    color: #192b41 !important; 
}
.sticker{
      height: 0;
      width: 0;
      line-height: 1;
      font-size: 0;
      visibility: 0;
      border: 0;
}
.fa-line-chart{
    font-size: 21px;
}
.center {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: auto
}
.chartIcon{
    width:100%;
    display: flex;
    align-items: baseline;
    font-size: 0.85REM;
}
.level-right{
    width:50%;
    margin:0px!important
}
.level-left{
    width:50%;
    margin:0px!important;
}
.level{
    display:flex;
     height:2em;
     align-items: center;
    justify-content: space-between;
}
#bandB{
    background-color:#fff;
    display: flex;
    flex-direction: column;
    height: fit-content;
    padding: 2REM;
    border-radius: 3%;
}
#bullsAndBears2{
    display: flex;
    margin: 1.5REM;
}
.modalTitle{
    margin-top: -2%;
    margin-top: -2%;
    font-weight: bolder;
    margin-bottom: 3%;
    color:#192b41;
}

.mediaModal{
    background-color:#fff;
    padding: 5%;
    margin: 5%;
    border-radius: 3%;
    border: solid,#192b41;
}

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
.x {
    padding-top: 1%;
    font-size: 21px;
}
.trend-b-b{
    cursor:pointer;
}
.button {
    background-color:#192b41!important;
    color: #fff!important;
    box-shadow: 0 0 0 0.125em #192b41!important;
    border-color: #192b41!important;
}
.button:hover, .button:focus {
    background-color: #fff!important;
    border-color: #192b41!important;
    color: #192b41!important;
}
#Bbull {
    margin-left: -15%;
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    font-weight: bolder;
    background-color: #21ce99!important;
    border-color: #21ce99!important;
    color: #fff!important;
    box-shadow: 0 0 0 0.125em #21ce99!important;
    font-size:1.2rem
}
#Bbull.is-outlined:focus,
#Bbull.is-outlined:hover {
    background-color: #fff!important;
    border-color: #21ce99!important;
    color: #21ce99!important;
}
#Bbear {
    margin-left: 15%;
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    font-weight: bolder;
    color: #fff!important;
    background-color:#ff6026!important;
    box-shadow: 0 0 0 0.125em #ff6026!important;
    border-color: #ff6026!important;
    font-size:1.2rem
}
#Bbear.is-outlined:focus,
#Bbear.is-outlined:hover {
    background-color: #fff!important;
    border-color: #ff6026!important;
    color: #ff6026!important;
}
#NotNow {
    margin-left: 15%;
    MARGIN-TOP: -35%;
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    font-weight: bolder;
    color: #fff;
    background-color:#192b41;
    box-shadow: 0 0 0 0.125em #192b41;
    border-color: #192b41;
}
#NotNow.is-outlined:focus,
#NotNow.is-outlined:hover {
    background-color: #fff!important;
    border-color: #192b41!important;
    color: #192b41!important;
}
.field1 {
    margin-bottom: 0.75rem!important;
}

@media screen and (max-width: 768px) {
    .croppa-container{
        max-width:-webkit-fill-available!important
    }
    .field1 {
        margin-bottom: 0.75rem!important;
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
    .image{
        display:none
    }
     .media-left{
        margin:0px;
        margin-right:5px;
    }
    .card-content{
        padding: 5px
    }
    .icon{
        font-size:0.8rem;
    }
    .chartIcon{
        justify-content: baseline !important;
    }
    .media-content{
        margin-bottom: 3% !important
    }
    #Bbear {
        margin-left: 10%;
        PADDING-LEFT: 10PX;
        PADDING-RIGHT: 10PX;
        font-weight: bolder;
        color: #ff6026;
        box-shadow: 0 0 0 0.125em #ff6026;
        border-color: #ff6026;
    }

    #NotNow {
        margin-left: 10%;
        MARGIN-TOP: -25%;
        PADDING-LEFT: 1PX;
        PADDING-RIGHT: 1PX;
        font-weight: bolder;
        color: #192b41;
        box-shadow: 0 0 0 0.125em #192b41;
        border-color: #192b41;
    }

    #Bbull {
        margin-left: -10%;
        PADDING-LEFT: 10PX;
        PADDING-RIGHT: 10PX;
        font-weight: bolder;
        color: #21ce99;
        box-shadow: 0 0 0 0.125em #21ce99;
        border-color: #21ce99;
    }
    #bullsAndBears2{
        margin: 1REM;
    }
    .bullsAndBearsPic2{
    width: 100%;
    padding-left:0;
    }
}

</style>
