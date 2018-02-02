<template>
     <section class="hero is-fullheight is-dark is-bold">
         <div class="hero-heading">
                    <div class="section has-text-centered">
                        <img src="/static/images/landing/logo-landing.svg" alt="Insiders logo" width="350px">
                    </div>
                </div>
        <div class="hero-body headForget">
            <div class="columns is-centered">
                <div>
                    <div v-if="langSelected==='FR'" class="section">
                        <h1 class="title">Réinitialiser le mot de passe </h1>
                        <p>Saisissez votre nouveau mot de passe.</p>
                    </div>
                    <div v-else class="section">
                        <h1 class="title">Reset Password </h1>
                        <p>Enter your new password.</p>
                    </div>
                    <div class="section mailField">
                        <b-notification v-if="error" type="is-danger" has-icon>
                            {{error}}
                        </b-notification>
                               <b-field v-if="langSelected==='EN'" label="Password">
                             <b-input v-model="password" v-validate="'required'" data-vv-name="password" name="password" type="password" password-reveal placeholder="●●●●●●●"> </b-input>
                             </b-field>
                             <b-field v-else label="Mot de passe">
                             <b-input v-model="password" v-validate="'required'" data-vv-name="password"  name="password" type="password" password-reveal placeholder="●●●●●●●"></b-input>
                             </b-field>
                            <span v-show="errors.has('password')" class="help is-danger"><i v-show="errors.has('password')" class="fa fa-warning"></i> {{ errors.first('password') }}</span>
                        
                             <b-field v-if="langSelected==='EN'" label="Confirm Password">
                             <b-input  v-model="passwordConfirmation" v-validate="'required|confirmed:password'" data-vv-name="passwordConfirmation" name="passwordConfirmation" type="password" password-reveal  placeholder="●●●●●●●" data-vv-as="password"></b-input>
                             </b-field>
                             <b-field v-else label="Confirmez votre mot de passe">
                             <b-input  v-model="passwordConfirmation" v-validate="'required|confirmed:password'" data-vv-name="passwordConfirmation" name="passwordConfirmation" type="password" password-reveal  placeholder="●●●●●●●" data-vv-as="password"></b-input>
                             </b-field>
                             <span v-show="errors.has('passwordConfirmation')" class="help is-danger"><i v-show="errors.has('passwordConfirmation')" class="fa fa-warning"></i> {{ errors.first('passwordConfirmation') }}</span>

                                    
                                    <p class="control login">
                                        <button @click="send()" v-if="langSelected==='FR'" class="button is-success is-outlined is-large is-fullwidth">Réinitialiser mon mot de passe</button>
                                        <button @click="send()" v-else class="button is-success is-outlined is-large is-fullwidth">Reset my password</button>
                                    </p>
                                    </div>
                </div>                    
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
      passwordConfirmation:"",
      error: "",
      userId: "",
      username:""
    };
  },
  props: {
    langSelected: String
  },
  methods: {
    send() {
      this.$validator.validateAll().then((result) => {
          console.log("result", result)
      if (result) {
          
      resetMyPassword(this.userId, this.password)
      
        .then(username => {
            this.error = "";
          this.username = username;
        })
        .catch(err => {
          this.error = err;
        });
        }
        this.error = 
         this.langSelected === "EN"
              ? "You have to complete correctly all fields before submit"
              : "Vous devez compléter correctement tous les champs pour réinitialiser votre mot de passe";
      });
    }
  },
  created() {
    this.userId = this.$route.params.id;
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

.hero-body{
    padding: 1rem 1.5rem!important;
    width:35%;
    ALIGN-ITEMS: center;
    display: flex;
}
  .hero.is-dark.is-bold {
    background-image: linear-gradient( 141deg, #f9f9f9 0, #f9f9f9 71%, #f9f9f9 100%) !important;
    background-color: #f9f9f9 !important;
    colOr: #f9f9f9 !important;
    ALIGN-ITEMS: center;
    display: flex;
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
