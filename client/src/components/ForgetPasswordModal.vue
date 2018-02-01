<template>
     <section id="modalAuth" class="hero is-fullheight">
                <div class="hero-heading">
                    <div v-if="langSelected==='FR'" class="section has-text-centered">
                        <h1>Réinitialiser le mot de passe </h1>
<p>Saisissez l’adresse e-mail associée à votre compte. Nous vous enverrons un lien par e-mail pour réinitialiser votre mot de passe.</p>
                    </div>
                    <div v-else class="section has-text-centered">
                        <h1>Reset Password </h1>
<p>Enter the email address associated with your account, and we’ll email you a link to reset your password.</p>
                    </div>
                </div>
                <div class="hero-body">
                            <div class="column is-8 is-offset-2">
                                <b-notification  v-if="username==='no user'&& langSelected==='EN'" type="is-danger" has-icon>
                                    There is no Insider with this Email !
                                </b-notification>
                                <b-notification  v-else-if="username==='no user'&& langSelected==='FR'" type="is-danger" has-icon>
                                    Aucun Insider n'est inscrit avec cet email !
                                </b-notification>
                                <b-notification  v-else-if="username && langSelected==='EN'" type="is-danger" has-icon>
                                 Check your mail box, we just sent you a reset link !
                                </b-notification>
                                <b-notification  v-else-if="username && langSelected==='FR'" type="is-danger" has-icon>
                                 Verifiez votre boite mail, un lien de réinitialisation vient de vous etre envoyé !
                                </b-notification>
                                    <b-field label="Your Email">
                                        <b-input v-model="email" placeholder="wbuffet@insiders.finance" type="email" icon-pack="fa" icon="envelope">
                                        </b-input>
                                    </b-field>
                                    <p class="control login">
                                        <button @click="send()" v-if="langSelected==='EN'" class="button is-success is-outlined is-large is-fullwidth">Envoyez le lien de réinitialisation</button>
                                        <button @click="send()" v-else class="button is-success is-outlined is-large is-fullwidth">Send reset link</button>
                                    </p>
                   </div>
                </div>
            </section>
</template>


<script>
import { sendForgetPassword } from "@/api/auth";

export default {
  data() {
    return {
      email:"",
      error: null,
      username:""
    };
  },
  props: {
    langSelected: String
  },
  methods: {
    send() {
      this.error = null;
     sendForgetPassword(this.email)
        .then(username => {this.username = username;          
        })
        .catch(err => {
          this.error = err
        });
    }
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
