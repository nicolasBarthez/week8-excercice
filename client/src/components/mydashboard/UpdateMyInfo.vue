<template>
<section v-if="profileInfo" class="section main">
  <div class="column is-6" id="ActionCard">
    <div class="card profile-card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-64x64 is-circle">
              <img :src="profileInfo.picProfile" alt="my picture">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-5">
              @{{profileInfo.username}}
            </p>
            <div>
              <p v-if="okMessage">Your profile has been updated successfully!</p>
              <h2>Could you talk about yourself, your followers would like to know you a little better.</h2>
              <br>
              <form @submit.prevent="userProfileUpdate();">

                <br/>
                <span>Your magic skills</span>
                <v-select multiple :closeOnSelect='false' v-model="skills" :options="options"></v-select>
                <br>
                <label>Location
                  <input type="text" v-model="location" >
                </label>
                <br>

                <label><span>Update your photo</span>
                <croppa v-model="image"
                  initial-image=""
                  :width="150"
                  :height="150"
                  :quality="1"
                  :placeholder-font-size="18"
                  :prevent-white-space="true">
 </croppa>


    </label><br/>
                                  <!-- <b-upload v-model="files" @change="image = $event.target.files[0]">
                    <a class="button is-primary">
                    <b-icon icon="file_upload"></b-icon>
                    <span>Update your picture</span>
                </a>
                  </b-upload @change="image = $event.target.files[0]; saveImage()"> -->
                  <!-- <div v-if="files && files.length">
                    <span class="file-name"  >
                    {{ files[0].name }}
        </span>
                  </div> -->

                <button @click="saveMyProfile">Save modifications</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
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
      profileInfo: Object,
      bio: "",
      skills: "",
      image: "",
      url: "",
      files: [],
      okMessage: false,
      location: ""
    };
  },

  methods: {
    userProfileUpdate() {
      const userId = this.$root.user._id;
      if (this.url === "") this.url = profileInfo.url;
      userUpdate(this.location, this.bio, this.skills, this.url)
        .then(data => {
          setTimeout(() => (this.okMessage = false), 5000);
        })
        .catch(err => {
          console.log(err);
        });
    },

    displayPicturePreview() {
      getUserProfileInfo().then(profileInfo => {
        this.profileInfo = profileInfo;
      });
    },
    saveImage() {
      uploadPicture(this.image)
        .then(response => {
          // change the image when the user uploads a new image
          this.profileInfo.picProfile = response.secure_url;
          // prepare image to be saved
          this.url = response.secure_url;
        })
        .catch(err => {
          console.log(err);
        });
    },

    saveMyProfile() {
      this.image.imageSet === true ? this.generateImage() : "";
      this.userProfileUpdate();
      this.$emit("saveprofile");
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
.section.main {
  background-color: #f9f9f9;
  padding: 7rem 1.5rem;
}

.container {
  display: flex;
}
</style>
