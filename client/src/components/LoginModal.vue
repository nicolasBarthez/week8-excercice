<template>
     <section id="modalAuth" class="hero is-fullheight">
                <div class="hero-heading">
                    <div class="section has-text-centered">
                        <img src="/static/images/landing/logo-landing.svg" alt="Insiders logo" width="350px">
                    </div>
                </div>
                <div class="hero-body">
                            <div class="column is-8 is-offset-2">
                                
                                <b-notification  v-if="username && langSelected==='FR'" type="is-success" has-icon>
                                    Votre mot de passe a bien été mis à jour
                                </b-notification>
                                <b-notification  v-else-if="username && langSelected==='EN'" type="is-success" has-icon>
                                    Your password has been updated
                                </b-notification>
                                <b-notification  v-else-if="error" type="is-danger" has-icon>
                                    {{error}}
                                </b-notification>
                                    <b-field label="Email">
                                        <b-input v-model="email" v-validate="{required: true}" placeholder="wbuffet@insiders.finance" type="email" icon-pack="fa" icon="envelope">
                                        </b-input>
                                    </b-field>
                                    <b-field v-if="langSelected==='EN'" label="Password">
                                        <b-input type="password" v-model="password" v-validate="{required: true}" password-reveal value="iwantmytreasure" placeholder="●●●●●●●">
                                        </b-input>
                                    </b-field>
                                    <b-field v-else label="Mot de passe">
                                        <b-input type="password" v-model="password" v-validate="{required: true}" password-reveal value="iwantmytreasure" placeholder="●●●●●●●">
                                        </b-input>
                                    </b-field>

                                    <p class="control login">
                                        <button @click="login()" v-if="langSelected==='EN'" class="button is-success is-outlined is-large is-fullwidth">Login</button>
                                        <button @click="login()" v-else class="button is-success is-outlined is-large is-fullwidth">Connexion</button>
                                    </p>
                                    <div v-if="!username">
                                    <p @click="forgot" class="forget" v-if="langSelected==='EN'">Forgot Password</p>
                                    <p @click="forgot" class="forget" v-else> Mot de passe oublié</p>
                                    </div>
                   </div>
                </div>
            </section>
</template>


<script>
import { login } from "@/api/auth";


export default {
  data() {
    return {
      email: this.autenticate ? this.autenticate.mail : "",
      password: this.autenticate ? this.autenticate.pass : "",
      error: null,
    };
  },
  props: {
    autenticate: {
      type: Object,
      default: null
    },
    langSelected: String,
    username:null
  },
  methods: {
    login() {
        this.error = null;
        if(this.email && this.password){
      login(this.email, this.password, this.$root)
        .then(data => {
          this.$router.push("/trending");
          document.documentElement.className = document.documentElement.className.replace(
            "is-clipped",
            ""
          );
          this.$router.push("/stream");
        })
        .catch(err => {
          this.error =
            this.langSelected === "EN"
              ? "Password or email is incorrect"
              : "Mot de passe ou email incorrect";
        });
        }else{
        this.error =
          this.langSelected === "EN"
            ? "You have to complete correctly all fields before login"
            : "Vous devez compléter correctement tous les champs pour vous connecter";
        }
      }, 

    forgot(){
        this.$emit("forgetModal");
          this.$parent.close();
    }
  }
};
</script>

<style scoped>
.forget{
    cursor:pointer;
    color: #192b41;
}
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
