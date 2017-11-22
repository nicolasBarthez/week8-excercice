<template>
    <section id="modalAuth" class="hero is-fullheight is-dark is-bold">
        <div class="hero-body">
            
                <div class="columns is-vcentered">
                    <div class="column is-8 is-offset-2">
                        <h1 class="title">
                            Register an Account
                        </h1>
                        <b-notification v-if="error" type="is-danger" has-icon>
                        {{ error.message }}
                        </b-notification>
                        <form @submit.prevent="signup">
                          <div class="box">
                            <b-field label="Username" maxlength="10">
                             <b-input v-model="username" ></b-input>
                            </b-field>
                            <b-field label="Email">
                             <b-input v-model="email" type="email"></b-input>
                            </b-field>
                            <hr>
                        
                             <b-field label="Password">
                             <b-input v-model="password"  v-validate="'required'" name="password" type="password" placeholder="Password"></b-input>
                             </b-field>
                             <b-field label="Confirm Password">
                             <b-input  v-validate="'required|confirmed:password'" name="password_confirmation" type="password" placeholder="Password, Again" data-vv-as="password"></b-input>
                             </b-field>
                        
                        <div class="alert alert-danger" v-show="errors.any()">
                            <div v-if="errors.has('password')">
                             {{ errors.first('password') }}
                            </div>
                            <div v-if="errors.has('password_confirmation')">
                             {{ errors.first('password_confirmation') }}
                            </div>
                        </div>

                            <hr>
                            <p class="control">
                             <button class="button is-primary"@click="$parent.close()">Register</button>
                             <button class="button is-default"@click="$parent.close()"><a href="/">Cancel</a></button>
                            </p>
                          </div>
                        </form>
                    </div>
                </div>
            
        </div>
    </section>
</template>

<script>
import { signup } from '@/api/auth'

export default {
  data () {
    return {
      username: '',
      password: '',
      email: '',
      error: null
    }
  },
  methods: {
    signup () {
      this.error = null
      signup({
        email: this.email,
        username: this.username,
        password: this.password
      }).then(r => {
        let mail = this.email;
        let pass = this.password;
        let authenticate = {mail, pass};
        this.$emit('loginModal', authenticate);
        console.log('emiting the username...', authenticate);
      })
      .catch(err => {
          this.error = "error";
        }); 
    }
  }
}
</script>

<style scoped>
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
</style>
