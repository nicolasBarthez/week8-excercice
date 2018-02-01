<template>
     <section id="modalAuth" class="hero is-fullheight">
                <div class="hero-heading">
                    <div v-if="langSelected==='FR'" class="section has-text-centered">
                        <h1>Réinitialiser le mot de passe </h1>
<p>Saisissez votre nouveau mot de passe </p>
                    </div>
                </div>
                <div class="hero-body">
                            <div class="column is-8 is-offset-2">
                              <b-field v-if="langSelected==='EN'" label="Password">
                              <b-input v-model="password"  v-validate="'required'" name="password" type="password" placeholder="Password"></b-input>
                              </b-field>
                              <b-field v-else label="Mot de passe">
                              <b-input v-model="password"  v-validate="'required'" name="password" type="password" placeholder="Password"></b-input>
                              </b-field>
                              <b-field v-if="langSelected==='EN'" label="Confirm Password">
                              <b-input  v-validate="'confirmed:password'" name="password_confirmation" type="password" placeholder="Password" data-vv-as="password"></b-input>
                              </b-field>
                              <b-field v-else label="Confirmez votre mot de passe">
                              <b-input  v-validate="'confirmed:password'" name="password_confirmation" type="password" placeholder="Password" data-vv-as="password"></b-input>
                              </b-field>
                                    <p class="control login">
                                        <button @click="send()" v-if="langSelected==='FR'" class="button is-success is-outlined is-large is-fullwidth">Réinitialiser mon mot de passe</button>
                                        <button @click="send()" v-else class="button is-success is-outlined is-large is-fullwidth">Reset my password</button>
                                    </p>
                   </div>
                </div>
            </section>
</template>


<script>
import { resetMyPassword } from "@/api/auth";

export default {
  data() {
    return {
      password: "",
      error: null,
      userId: ""
    };
  },
  props: {
    langSelected: String
  },
  methods: {
    send() {
      this.error = null;
      resetMyPassword(this.userId, this.password)
        .then(username => {
          this.username = username;
        })
        .catch(err => {
          this.error = err;
        });
    }
  },
  created() {
    this.userId = this.$route.params.id;
  }
};
</script>

<style scoped>
#modalAuth{
    border-radius:5px;
    BACKGROUND-COLOR: #F9F9F9;
}
span{
  width:2em!important;
  height:2em!important
}
.section {
    padding:0px!important;
    padding-top: 4rem!important;
}
.hero.is-fullheight {
    min-height: 75vh !important;
}

.field:not(:last-child) {
    margin-bottom: 2.75rem!important;
}
.hero-body{
    padding:0px !important;
}
form {
    max-width: 400px;
    margin: auto;
  }

.login-wrapper {
    margin: -0.75rem;
    overflow-y: hidden;
}

.hero-banner .hero {
    background: url("/static/images/hoodInsider.jpg");
    background-position: center;
    background-size: cover;
    background-blend-mode: screen;
}

.hero-banner .title {
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 5px;
}

.button.is-success.is-outlined:focus,
.button.is-success.is-outlined:hover {
    background-color: #192b41;
    border-color: #192b41;
    color: #fff;
        box-shadow: 0 0 0 0.125em #f9f9f9;;
}

.button.is-success.is-outlined {
    background-color: transparent;
    border-color: #192b41;
    color: #192b41;
}
.button:focus, .button.is-focused {
    border-color: #192b41;
    color: #192b41;
}

.fa {
    color: #192b41 !important;
}
a{
    color: #192b41;
}
@media (max-width: 768px) {
    section {
        background-color: #f9f9f9;
        padding-top:0rem  !important;
    }
    span{
        width:2.75em!important;
        height:2.75em!important
    }
    .section {
    padding:5px!important;
    padding-top: 1.5rem!important;
    }
}
</style>
