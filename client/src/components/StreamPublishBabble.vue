<template>
    <div class="card">
        <div class="card-content bg-light">
            <div class="media">
                <div class="media-left">
                    <figure v-if="connectedUser" class="image is-64x64 is-circle"><img class ="imgProfile" :src="connectedUser.picProfile" alt="Image"></figure>
                </div>
                <div v-if="connectedUser" class="media-content">
                    <div>
                        <div class="field1">
                            <div class="control">
                                <textarea v-model="babble" id="babble-text"  name="babble" maxlength="1618" rows="3" :placeholder="connectedUser.lang==='EN'?'Share an interresting news...':'Partager une info intéressante...'" class="textarea">
                                    </textarea></div>
                        </div>
                        <div class="level">
                            <div class="level-left">
                                <a class="options-img-video">
                                    <span @click="shareChart()" class="chartIcon">
                                         <i class="fa fa-picture-o"></i>&nbsp
                                         <p class="text-img-options">{{connectedUser.lang==="EN"?'Share image':'Partager image'}}</p>
                                    </span>
                                </a>
                                <a class="has-text-grey-light">
                                    <span @click="shareVideo()" class="chartIcon">
                                         <i class="fa fa-youtube "></i>&nbsp
                                         <p class="text-img-options"> {{connectedUser.lang==="EN"?'Share video':'Partager vidéo'}}</p>
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
        <b-modal :active.sync="isShareChartActive">
            <div class="mediaModal">
            <div v-if="connectedUser">
                 <label> <span class="chartIcon titleVideo">
                    <i class="fa fa-picture-o"></i>&nbsp {{connectedUser.lang==="EN"?'Share your image':'Partager votre image'}}</span>

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
                                <textarea v-model="babble" id="babble-text"  name="babble" maxlength="1618" rows="3" :placeholder="connectedUser.lang==='EN'?'Share an interresting news, and use # to link to a stock...':'Partager une info intéressante et utiliser le # pour lier votre message à une action...'" class="textarea">
                                    </textarea></div>
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
        <b-modal :active.sync="isShareVideoActive">
          <div class="mediaModal">
          <div v-if="connectedUser">
               <label> <span class="chartIcon titleVideo">
                  <i class="fa fa-youtube"></i>&nbsp {{connectedUser.lang==="EN"?'Share your video (youtube)':'Partager votre vidéo (youtube)'}}</span>
                  <div class="containerYoutube1">
                      <div class="control containerYoutube2">
                          <input autofocus class="youtubeField"v-model="babbleVideo" id="babble-video"  name="babble-video" :placeholder="connectedUser.lang==='EN'?'https://www.youtube.com/watch?v=rlZRtQkfK04':'https://www.youtube.com/watch?v=rlZRtQkfK04'"/>
                      </div>
                  </div>
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
                              <textarea v-model="babble" id="babble-text"  name="babble" maxlength="1618" rows="3" :placeholder="connectedUser.lang==='EN'?'Share an interresting news, and use # to link to a stock...':'Partager une info intéressante et utiliser le # pour lier votre message à une action...'" class="textarea">
                                  </textarea></div>
                      </div>
                      <div class="level">
                          <div class="level-left">
                          </div>
                          <div class="level-right">
                              <div class="level-item has-text-grey">{{charactersLeft}}</div>
                              <div class="level-item"><button id="babble-submit"  @click="postVideoBabble()" class="button is-outlined is-primary btn">Babble</button></div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
          </div>
          </div>
        </b-modal>
    </div>
</template>

<script>
import { sendBabble } from "@/api/api";
import emojify from "emojify.js";

export default {
  data() {
    return {
      babble: "",
      isShareChartActive: false,
      isShareVideoActive: false,
      babbleImage: null,
      babbleUrl: "",
      noSticker: false,
      width: 0,
      height: 0,
      quality: 0,
      babbleVideo: ""
    };
  },
  props: {
    connectedUser: Object,
    stock: {
      type: Object,
      default: function() {
        return { shortName: "" };
      }
    }
  },

  components: {},
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
    shareVideo() {
      this.isShareVideoActive = true;
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
      ctx.drawImage(document.querySelector(".sticker"), 305, 188, 50, 20);
    },
    postChartBabble() {
      this.generateImage(),
        this.postBabble(),
        (this.isShareChartActive = false);
    },
    postBabble() {
      this.babble = emojify.replace(this.babble);
      sendBabble(
        this.babble,
        null,
        this.babbleUrl,
        this.babbleVideo
      ).then(() => {
        this.babble = "";
        this.babbleUrl = "";
        this.babbleVideo = "";
        this.$emit("changeBabbles");
      });
    },
    postVideoBabble() {
      this.babble = emojify.replace(this.babble);
      sendBabble(
        this.babble,
        null,
        this.babbleUrl,
        this.babbleVideo
      ).then(() => {
        this.babble = "";
        this.babbleUrl = "";
        this.babbleVideo = "";
        this.$emit("changeBabbles");
        this.isShareVideoActive = false;
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
        limit = 1618;
      return limit - char;
    }
  },
  created() {
    emojify.setConfig({ img_dir: "/static/images/basic" });
  }
};
</script>

<style scoped>

.fa-picture-o {
  color: #F68818 !important;
    font-size: 30px;

}
.options-img-video{
  padding-right: 20px
}

.titleVideo{
  font-size: 1.2REM !important;
  font-weight: bold
}

.fa-youtube {
  color: #FF0000 !important;
  font-size: 30px;
}
.containerYoutube1 {
  width: 100%;
  margin-top: 20px
}

.containerYoutube2 {
  width: 100%;
}

.youtubeField {
  width: 100%;
  height: 70%;
  padding: 5px;
  font-size: 1.2REM;
  font-style: italic;
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
.sticker{
      height: 0;
      width: 0;
      line-height: 1;
      font-size: 0;
      visibility: 0;
      border: 0;
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
    margin:0px!important;
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

.field1 {
        margin-bottom: 0.75rem!important;
    }
@media screen and (max-width: 768px) {
    .text-img-options {
      display: none;
    }
    .level-left{
      display: flex;
    }
    .field1 {
        margin-bottom: 0.75rem;
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
        justify-content:baseline !important;
    }
    .media-content{
        margin-bottom: 3% !important
    }
}

</style>
