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
                                <textarea v-model="babble" id="babble-text"  name="babble" maxlength="500" rows="3" placeholder="Write here the interresting news you want to share, and use # to link to a stock..." class="textarea">
                                    </textarea></div>
                        </div>
                        <div class="level">
                            <div class="level-left">
                                <a class="has-text-grey-light">
                                    <span @click="shareChart()" class="icon chartIcon">
                                         <i class="fa fa-line-chart"></i>&nbsp Share a chart
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
            <div>
                 <label> <span class="icon chartIcon">
                    <i class="fa fa-line-chart"></i>&nbsp Share your chart</span>
                <img src="/static/images/stickerPicture2.svg" class ="sticker">
                <croppa v-model="babbleImage"
                  :width="510"
                  :height="300"
                  :quality="0.7"
                  :placeholder-font-size="18"
                  :prevent-white-space="false"
                  :reverse-scroll-to-zoom="true"
                  @draw="onDraw"
                  >
                </croppa>


    </label><br/>
               <div class="card-content bg-light">
            <div class="media">
                <div class="media-left">
                    <figure v-if="connectedUser" class="image is-64x64 is-circle"><img class ="imgProfile" :src="connectedUser.picProfile" alt="Image"></figure>
                </div>
                <div class="media-content">
                    <div>
                        <div class="field1">
                            <div class="control">
                                <textarea v-model="babble" id="babble-text"  name="babble" maxlength="500" rows="3" placeholder="Write here the interresting news you want to share, and use # to link to a stock..." class="textarea">
                                    </textarea></div>
                        </div>
                        <div class="level">
                            <div class="level-left">
                            </div>
                            <div class="level-right">
                                <div class="level-item has-text-grey">{{charactersLeft}}</div>
                                <div class="level-item"><button id="babble-submit"  @click="postChartBabble()" class="button is-outlined is-primary">Babble</button></div>
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

export default {
  data() {
    return {
      babble: "",
      isShareChartActive: false,
      babbleImage: null,
      babbleUrl: "",
      noSticker: false
    };
  },
  props: {
    stock: Object,
    connectedUser: Object
  },

  components: {},
  methods: {
    shareChart() {
      this.isShareChartActive = true;
    },
    generateImage: function() {
      let babbleUrl = this.babbleImage.generateDataUrl();
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
      sendBabble(this.babble, null, this.babbleUrl).then(() => {
        this.babble = "";
        this.babbleUrl = "";
        this.$emit("changeBabbles");
      });
    }
  },
  computed: {
    charactersLeft() {
      var char = this.babble.length,
        limit = 500;
      return limit - char;
    }
  }
};
</script>

<style scoped>
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
    font-size: 15px;
}

.chartIcon{
    width:100%
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
.field1 {
        margin-bottom: 0.75rem!important;
    }
@media screen and (max-width: 768px) {
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
