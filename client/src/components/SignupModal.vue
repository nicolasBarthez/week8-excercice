<template>
    <section id="modalAuth" class="hero is-fullheight is-dark is-bold">
        <div class="hero-body">

                <div class="columns is-vcentered">
                    <div class="column is-8 is-offset-2">
                    <form @submit.prevent="signup">
                        <h1 v-if="langSelected==='EN'" class="title">Become an insider</h1>
                        <h1 v-else class="title">Devenir un insider</h1>
                        <b-notification v-if="error" type="is-danger" has-icon>
                            {{error}}
                        </b-notification>
                         
                          
                            <b-field v-if="langSelected==='EN'" label="Username" maxlength="10">
                             <b-input v-model="username" v-validate="{required: true}" name="username" type="username" placeholder="Warren" ></b-input>
                            </b-field>
                            <b-field v-else label="Nom d'utilisateur" maxlength="10">
                             <b-input v-model="username" v-validate="{required: true}" name="username" type="username" placeholder="Warren"></b-input>
                            </b-field>
                           <span v-show="errors.has('username')" class="help is-danger"><i v-show="errors.has('username')" class="fa fa-warning"></i> {{ errors.first('username') }}</span>
                        
                            <b-field label="Email">
                             <b-input v-model="email" v-validate="{required: true}" name="email" type="email" icon-pack="fa" placeholder="wbuffet@insiders.finance" icon="envelope" ></b-input>
                            </b-field>
                             <span v-show="errors.has('email')" class="help is-danger"><i v-show="errors.has('email')" class="fa fa-warning"></i> {{ errors.first('email') }}</span>
                            <hr>

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

                            <hr>
                            <p class="control">
                             <button v-if="langSelected==='EN'" class="button is-primary">Register</button>
                             <button v-else class="button is-primary" >Inscription</button>
                             <button v-if="langSelected==='EN'" class="button is-default"@click="$parent.close()">Cancel</button>
                             <button v-else class="button is-default" @click="$parent.close()">Annuler</button>
                            
                             </p>
                            
                            <hr>
                            <p class="control">
                                <p class="has-text-blue" v-if="langSelected==='EN'" >Already an Insider ?</p>
                                <p class="has-text-blue" v-else >Dejà Insider ?</p>
                             <button v-if="langSelected==='EN'" class="button is-default" @click="loggin()">Login</button>
                             <button v-else class="button is-default" @click="loggin()">Se connecter</button>
                            </p>
                        
                   </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { signup } from "@/api/auth";

export default {
  data() {
    return {
      username: "",
      password: "",
      passwordConfirmation:"",
      email: "",
      error: null
    };
  },
  props: {
    langSelected: String
  },
  methods: {
    signup() {
      this.error = null;
      this.$validator.validateAll().then((result) => {
      if (result) {
      signup({
        email: this.email,
        username: this.username,
        password: this.password,
        lang: this.langSelected
      })
        .then(r => {
          let mail = this.email;
          let pass = this.password;
          let authenticate = { mail, pass };
          this.$emit("loginModal", authenticate);
          this.$parent.close();
        })
        .then(() => {
        document.getElementsById("html").removeAttribute("is-clipped")
        })
        .catch(err => {
            {{langSelected==="EN"?'Share an image':'Partager une image'}}
          this.error = 
          this.langSelected === "EN"
              ? "Username or email is already registered. Please connect to access to your account."
              : "Cette adresse e-mail ou ce nom est deja enregistré(e). Veuillez vous connecter pour acceder à votre compte.";
        });
      } else{
        this.error = 
         this.langSelected === "EN"
              ? "You have to complete correctly all fields before submit"
              : "Vous devez compléter tous les champs correctement avant de vous inscrire";
      } 
     });
    }
    ,
    loggin(){
        this.$emit("loginModal");
          this.$parent.close();
    }
  }
};
</script>

<style scoped>
.error-message {
     color: #ff3860;
    }
  form {
    max-width: 400px;
    margin: auto;
  }
#modalAuth{
    border-radius:5px;
}
.hero.is-fullheight {
    min-height: 70vh!important;
}
.hero-body{
    padding: 1rem 1.5rem!important;
}
  .hero.is-dark.is-bold {
    background-image: linear-gradient( 141deg, #f9f9f9 0, #f9f9f9 71%, #f9f9f9 100%) !important;
    background-color: #f9f9f9 !important;
    colOr: #f9f9f9 !important;
}

.button.is-primary.is-active,
.button.is-primary:active {
    background-color: #192b41;
    border-color: transparent;
    color: #fff;
}
.button:focus, .button.is-focused {
    border-color: #192b41;
    color: #192b41;
}
.button.is-success.is-outlined {
    background-color: transparent;
    border-color: #192b41;
    color: #192b41;
}

.button.is-primary.is-hovered,
.button.is-primary:hover {
    background-color: #192b41;
    border-color: transparent;
    color: #fff;
}

.button.is-primary {
    background-color: #192b41;
    border-color: transparent;
    color: #fff;
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

h1 {
    color: #192b41 !important;
}

.fa {
    color: #192b41 !important;
}

p {
    color: #192b41 !important;
}
.column.is-8{
    width:85% !important
}
.column.is-offset-2, .column.is-offset-2-tablet {
    margin-left: 10% !important;
}
@media (max-width: 768px) {
    .column.is-8{
        width:110% !important
    }
    .column.is-offset-2, .column.is-offset-2-tablet {
        margin-left: 0% !important;
    }
}
</style>
