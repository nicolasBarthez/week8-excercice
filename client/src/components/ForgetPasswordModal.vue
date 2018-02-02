<template>
     <section id="modalAuth" class="hero is-fullheight is-dark is-bold">
         <div class="hero-heading">
                    <div class="section has-text-centered">
                        <img src="/static/images/landing/logo-landing.svg" alt="Insiders logo" width="350px">
                    </div>
                </div>
        <div class="hero-body headForget">
            <div class="columns is-vcentered">
                <div>
                    <div v-if="langSelected==='FR'" class="section">
                        <h1 class="title">Réinitialiser le mot de passe </h1>
                        <p>Saisissez l’adresse e-mail associée à votre compte. Nous vous enverrons un lien par e-mail pour réinitialiser votre mot de passe.</p>
                    </div>
                    <div v-else class="section">
                        <h1 class="title">Reset Password </h1>
                        <p>Enter the email address associated with your account, and we’ll email you a link to reset your password.</p>
                    </div>
                    <div class="section mailField">
                                <b-notification  v-if="username==='no user'&& langSelected==='EN'" type="is-danger" has-icon>
                                    There is no Insider with this Email !
                                </b-notification>
                                <b-notification  v-else-if="username==='no user'&& langSelected==='FR'" type="is-danger" has-icon>
                                    Aucun Insider n'est inscrit avec cet email !
                                </b-notification>
                                <b-notification  v-else-if="username && langSelected==='EN'" type="is-success" has-icon>
                                 Check your mail box, we just sent you a reset link !
                                </b-notification>
                                <b-notification  v-else-if="username && langSelected==='FR'" type="is-success" has-icon>
                                 Verifiez votre boite mail, un lien de réinitialisation vient de vous etre envoyé !
                                </b-notification>
                                <b-notification  v-if="error && !email" type="is-danger" has-icon>
                                    {{error}}
                                </b-notification>
                                    <b-field :label="langSelected==='EN'? 'Your email':'Votre email'">
                                        <b-input v-model="email" v-validate="'required'" name="email" type="email" icon-pack="fa" placeholder="wbuffet@insiders.finance" icon="envelope" ></b-input>
                                    </b-field>
                                    
                                    <p class="control login">
                                        <button @click="send()" v-if="langSelected==='FR'" class="button is-success is-outlined is-large is-fullwidth">Envoyez le lien de réinitialisation</button>
                                        <button @click="send()" v-else class="button is-success is-outlined is-large is-fullwidth">Send reset link</button>
                                    </p>
                                    </div>
                </div>                    
            </div>
        </div>
    </section>
</template>


<script>
import { sendForgetPassword } from "@/api/auth";

export default {
  data() {
    return {
      email: "",
      error: null,
      username: ""
    };
  },
  props: {
    langSelected: String
  },
  methods: {
    send() {
      this.$validator.validateAll().then((result) => {
       if (result) {
           this.error = null;
      sendForgetPassword(this.email)
        .then(username => {
          this.username = username;
        })
        .catch(err => {
          this.error = err;
        });
        } else{
        this.username = null;
        this.error = 
         this.langSelected === "EN"
              ? "You have to complete the email field"
              : "Vous devez renseigner votre email";
        }
      });
    }
  }
};
</script>

<style scoped>
img{
    margin-top: 1REM;
}
.section{
    padding-top: 0rem!important;
    }
.error-message {
     color: #ff3860;
    }
.columns {
    margin-left: 0rem;
    margin-right: 0rem;
    margin-top: 0rem;
}
#modalAuth{
    border-radius:5px;
}
.headForget{
    align-items: baseline !important
}
.hero.is-fullheight {
    min-height: 70vh!important;
    align-items: baseline !important
}
.hero-body{
    padding: 1rem 1.5rem!important;
    align-items: baseline !important
}
  .hero.is-dark.is-bold {
    background-image: linear-gradient( 141deg, #f9f9f9 0, #f9f9f9 71%, #f9f9f9 100%) !important;
    background-color: #f9f9f9 !important;
    colOr: #f9f9f9 !important;
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

.input.is-active,
.input.is-focused,
.input:active,
.input:focus,
.textarea.is-active,
.textarea.is-focused,
.textarea:active,
.textarea:focus {
    border-color: #192b41;
    box-shadow: 0 0 0 0.125em #192b41;
}
.title{
    margin-bottom: 0.5rem;
}
.mailField{
margin-top: -1REM;
}
h1 {
    color: #192b41 !important;
}

.fa {
    color: #192b41 !important;
}

p {
    color: #192b41 !important;
}


@media (max-width: 768px) {
    .column.is-8{
        width:90% !important
    }
    .column.is-offset-2, .column.is-offset-2-tablet {
        margin-left: 0% !important;
    }
    .section {
    padding: 1rem 1.5rem !important;
    }
    h1{
        font-size:1rem!important
    }
    .button.is-large {
    font-size: 0.95rem!important;
    }
}
</style>
