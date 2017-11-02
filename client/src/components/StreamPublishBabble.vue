<template>
    <div class="card">
        <div class="card-content bg-light">
            <div class="media">
                <div class="media-left">
                    <figure v-if="connectedUser" class="image is-32x32 is-circle"><img class ="imgProfile" :src="connectedUser.picProfile" alt="Image"></figure>
                </div>
                <div class="media-content">
                    <div>
                        <div class="field">
                            <div class="control">
                                <textarea v-model="babble" id="babble-text" name="babble" maxlength="200" rows="3" placeholder="Write here the interresting news you want to share, and use # to link to a stock..." class="textarea">
                                    </textarea></div>
                        </div>
                        <div class="level">
                            <div class="level-left">
                                <a class="has-text-grey-light">
                                    <span class="icon chartIcon">
                                         <i class="fa fa-line-chart">&nbsp Share a chart</i>
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
    </div>
</template>

<script>
import { sendBabble } from "@/api/api";

export default {
  data() {
    return {
      babble: ""
    };
  },
  props: {
    stock: Object,
    connectedUser: Object
  },

  components: {},
  methods: {
    postBabble() {
      sendBabble(this.babble, null).then(() => {
        this.babble = "";
        this.$emit("changeBabbles");
      });
    }
  },
  computed: {
    charactersLeft() {
      var char = this.babble.length,
        limit = 200;
      return limit - char;
    }
  }
};
</script>

<style scoped>
.fa-line-chart{
    font-size: 15px;
}

.chartIcon{
    width:100%
}
.level-right{
    width:50%;
    margin:0px;
}
.level-left{
    width:50%;
    margin:0px;
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

</style>
