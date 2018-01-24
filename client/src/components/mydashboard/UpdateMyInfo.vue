<template>
  <div v-if="profileInfo">
    <div class="card profile-card">
      <div class="card-content column is-6 is-center"id="ActionCard">
        <div class="media">
          <div class="media-left">
                    <figure v-if="connectedUser" class="image is-64x64 is-circle"><img class ="imgProfile" :src="profileInfo.picProfile" alt="Image"></figure>
                </div>
          <div class="media-content">
            <p class="title is-5">
              @{{profileInfo.username}}
            </p>
            <div>
              <p v-if="okMessage">Your profile has been updated successfully!</p>
              <h2>Could you talk about yourself, your followers would like to know you a little better.</h2>
              <br>

                <span>Your magic skills:</span><br>
                <v-select multiple :closeOnSelect='false' v-model="skills" :options="options"></v-select>
                <br><hr>
                <span>Location:</span><br>
                  <input class="location" type="text" v-model="location"/>
                <br><hr>

              <label><span>Update your photo:</span><br>
                <croppa v-model="image"
                  initial-image=""
                  :width="150"
                  :height="150"
                  :quality="1"
                  :placeholder-font-size="18"
                  :prevent-white-space="true">
                </croppa>
              </label>
              <br><hr>
              <div class ="centerButton"><button id="adWL" class="button is-small is-outlined is-primary" @click="saveMyProfile">Save modifications</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// mutli select

import vSelect from "vue-select";
import {
  userUpdate,
  getUserProfileInfo,
  uploadPicture
} from "@/api/apiDashboard";
export default {
  // multi select component
  components: {
    vSelect
  },
  data() {
    return {
      // start multi select
      options: [
        "Technical analysis",
        "Equity trading",
        "Long term investing",
        "Crypto currency",
        "Small caps",
        "Bio tech",
        "Funds",
        "Global macro",
        "Fixed income",
        "ETF trading",
        "Intra day trading",
        "Tech"
      ],
      //end multi select
      profileInfo: null,
      bio: "",
      skills: "",
      image: null,
      url: "",
      files: [],
      okMessage: false,
      location: ""
    };
  },
  props: {
    connectedUser: Object
  },
  methods: {
    userProfileUpdate() {
      const userId = this.$root.user._id;
      if (this.url === "") this.url = profileInfo.url;
      userUpdate(this.location, this.bio, this.skills, this.url)
        .then(data => {
          this.$emit("saveprofile");
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveMyProfile() {
      this.image.imageSet === true ? this.generateImage() : "";
      this.userProfileUpdate();
    },
    generateImage: function() {
      let url = this.image.generateDataUrl();
      if (!url) {
        alert("no image");
        return;
      }
      this.url = url;
    }
  },
  created() {
    getUserProfileInfo().then(profileInfo => {
      this.profileInfo = profileInfo;
      this.location = profileInfo.location;
      this.skills = profileInfo.skills;
      this.url = profileInfo.picProfile;
    });
  }
};
</script>

<style scoped>
.card{
  margin-left: 15%;
  margin-right:15%
}
.centerButton{
  DISPLAY: FLEX;
  JUSTIFY-CONTENT: center;
  TEXT-ALIGN: center;
}
#ActionCard {
  width: 100%;
}
hr {
    background-color: #192b41;
    border: none;
    display: block;
    height: 1px;
    margin: 1.5rem 0;
    font-weight:400;
}
.location{
    line-height: 1.42857143;
    font-size: 1em;
    height: 34px;
    display: inline-block;
    margin: 0;
    padding: 0 .5em;
    max-width: 100%;
    background: none;
    position: relative;
    box-shadow: none;
    float: left;
    clear: none;
}

#adWL {
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    font-weight: bolder;
    color: #fff;
    background-color: #192b41;
    box-shadow: 0 0 0 0.125em #192b41;
    border-color: #192b41;
    font-size:1.2rem !important
}
#adWL.is-outlined:focus,
#adWL.is-outlined:hover {
    background-color: #fff!important;
    border-color: #192b41!important;
    color: #192b41!important;
}
@media (max-width: 768px) {
  .card{
    max-width:90%;
    margin: 5%;
  }
}
</style>
