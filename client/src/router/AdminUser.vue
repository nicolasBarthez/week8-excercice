<template>
  <section v-if="connectedUser.role==='admin'" class="main">
    <h1 class= "title">
      Page admin : Suivi des utilisateurs enregistrés
    </h1>
    <p class="page" ref="top">Il y a actuellement {{userList.length}} utilisateurs enregistrés</p>
    <br>
    <button type="button" @click="exportToExcel()"name="button">Export</button>
    <br>
    <hr>
    <br>
    <button @click="goto('bottom')">Go to bottom</button>
    <table >
      <tr>
        <th>IMAGE</th>
        <th>NAME</th>
        <th>EMAIL</th>
        <th>LOCATION</th>
        <th>LANGUAGE</th>
        <th>FOLLOWING</th>
        <th>POSITION TAKEN</th>
        <th>CREATED AT</th>
        <th>UPDATED AT</th>
      </tr>
    <tr v-for="(user, index) in userList" :key="index" >

            <td><figure class="image is-64x64 is-circle"><img class ="imgProfile" :src="user.picProfile" alt="Image"></figure></td>
            <td><strong>{{user.username}}</strong></td>
            <td>{{user.email}}</td>
            <td>{{user.location}}</td>
            <td>{{user.lang}}</td>
            <td>{{user.following.length}}</td>
            <td>{{user.watchList.length}}</td>
            <td><span class="has-text-green">{{moment(user.created_at).format('DD-MM-YYYY HH:mm')}}</span></td>
            <td><span class="has-text-red">Updated at :{{moment(user.updated_at).format('DD-MM-YYYY HH:mm')}}</span></td>
            <td><button type="button" @click="editUser(user)" name="button">Edit</button></td>
            <td><button type="button" @click="confirmDeleteUser(user)"name="button">Delete</button></td>

            <hr>

    </tr>
  </table>
  <button class="page" ref="bottom" @click="goto('top')">Go to top</button>

    <div v-if= "userModal">

    <b-modal :active.sync="isUserEditingActive">
        <div class="mediaModal">
                <h1 class="modalTitle">
                    Editing {{userModal.username}} !
                </h1>

                  <div class="card profile-card">
                    <div class="card-content column is-6 is-center"id="ActionCard">
                      <div >
                        <div class="media-left">
                                  <figure class="image is-64x64 is-circle"><img class ="imgProfile" :src="userModal.picProfile" alt="Image"></figure>
                              </div>
                        <div >
                          <p >
                            Created at :{{moment(userModal.created_at).format('DD-MM-YYYY HH:mm')}}
                          </p>
                        </div>
                          <p >
                            Updated at :{{moment(userModal.updated_at).format('DD-MM-YYYY HH:mm')}}
                          </p>
                          <br><hr>

                              <span>Nom:</span><br>
                            <input class="location" type="text" v-model="userModal.username"/>
                              <br><hr>
                              <span>location:</span><br>
                              <input class="location" type="text" v-model="userModal.location"/>
                              <br><hr>
                              <span>lang:</span><br>
                                <input class="location" type="text" v-model="userModal.lang"/>
                              <br><hr>
                              <span>Role:</span><br>
                                <input class="location" type="text" v-model="userModal.role"/>
                              <br><hr>


                            <label><span>Update user photo:</span><br>
                              <croppa v-model="image"
                                :prevent-white-space="false"
                                :reverse-scroll-to-zoom="true"
                                :show-loading="true"
                                :loading-size="50"
                                :accept="'image/*'"
                                initial-image=""
                                :width="150"
                                :height="150"
                                :quality="1"
                                :placeholder-font-size="18"
                                >
                              </croppa>
                            </label>
                            <br><hr>
                            <div class ="centerButton"><button id="adWL" class="button is-small is-outlined is-primary" @click="saveUpdate">Save modifications</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

    </b-modal>
    </div>

    <div v-if= "deleteModale">

      <b-modal :active.sync="isUserDeletingActive">
        <div class="mediaModal">
          <div class="card profile-card">
        <p>T'es sûr de vouloir effacer ce user  ????</p>

        <button type="button" @click="deleteUser(deleteModale)" name="button">YES - ERASE IT!</button>
        <button type="button" @click="noDelete()" name="button">NO ... My mistake</button>
      </div>
      </div>
      </b-modal>
    </div>

</section>

</template>

<script>
import { getUsersList, userUpdate, userDelete } from "@/api/apiAdmin";
import moment from "moment";

export default {
  data() {
    return {
      userList: "",
      isUserEditingActive: false,
      isUserDeletingActive: false,
      userModal: {},
      image: null,
      deleteModale: ""
    };
  },
  created() {
    getUsersList().then(userList => {
      if (userList === "unauthorized") {
        this.$router.push("/404");
      } else {
        this.userList = userList;
      }
    });
  },
  props: {
    connectedUser: Object
  },
  methods: {
    goto(refName) {
      var element = this.$refs[refName];
      console.log(element);
      var top = element.offsetTop;

      window.scrollTo(0, top);
    },
    moment: function(time) {
      return moment(time);
    },
    editUser(user) {
      this.userModal = user;
      this.isUserEditingActive = true;
      this.url = this.userModal.userImg;
    },
    saveUpdate() {
      const userId = this.userModal._id;
      this.image.imageSet === true ? this.generateImage() : "";
      userUpdate(
        this.userModal._id,
        this.userModal.username,
        this.userModal.location,
        this.userModal.lang,
        this.userModal.role,
        this.userModal.picProfile
      )
        .then(data => {
          this.isUserEditingActive = false;
          getUsersList().then(userList => {
            if (userList === "unauthorized") {
              this.$router.push("/404");
            } else {
              this.userList = userList;
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    generateImage: function() {
      let url = this.image.generateDataUrl();
      if (!url) {
        alert("no image");
        return;
      }
      this.userModal.picProfile = url;
    },
    confirmDeleteUser(user) {
      this.deleteModale = user;
      this.isUserDeletingActive = true;
    },
    deleteUser(user) {
      userDelete(user._id)
        .then(data => {
          getUsersList().then(userList => {
            if (userList === "unauthorized") {
              this.$router.push("/404");
            } else {
              this.userList = userList;
              this.isUserDeletingActive = false;
              alert("success");
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    noDelete() {
      this.isUserDeletingActive = false;
    }
  }
};
</script>

<style scoped>
tr {
  margin: 25px;
  padding: 10px 30px;
}

th {
  margin: 25px 10px 25px 60px;
  padding: 10px;
  background-color: #BDBDBD;
}
.title{
  font-size: 100%;
  font-weight: bold;
  FONT-STYLE: ITALIC
}
.insider{
  display:flex;
  align-items:center;
  justify-content:start;
}
a{
  color:#192b41
}
#no{
    TEXT-ALIGN: CENTER;
    MARGIN-TOP: 5%;
    font-weight: bold;
    color:#192b41
}
.main {
    background-color: #f9f9f9!important;
    padding: 7rem 1.5rem;
}
.container{
  display: flex;
}

.navbar.is-dark {
    background-color: #192b41!important;
    color: #f9f9f9!important;
}

.navbar-item.is-tab.is-active {
    background-color: transparent;
    border-bottom-color: #f9f9f9!important;
    border-bottom-style: solid!important;
    border-bottom-width: 3px!important;
    color: #f9f9f9!important;
    padding-bottom: calc(0.5rem - 3px)!important;
}
.babblesMenu {
    display: flex;
    overflow:auto;
}

.image{
  margin-right: 20px !important;
}

@media (max-width: 768px) {
  .main {
    padding-top:0.5rem  !important;
  }
    .icon {
    height: 1.5em!important;
    width: 1.5em!important;
  }
  .control{
        height: 30px!important;
    }
    .navbar.is-dark{
        margin-bottom:3%!important
    }
}
</style>
