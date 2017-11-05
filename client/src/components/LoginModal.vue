<template>
     <section id="modalAuth" class="hero is-fullheight">
                <div class="hero-heading">
                    <div class="section has-text-centered">
                        <img src="/static/images/logo.png" alt="Insiders logo" width="150px">
                    </div>
                </div>
                <div class="hero-body">
                   
                       
                            <div class="column is-8 is-offset-2">
                            <b-notification v-if="error" type="is-danger" has-icon>
                                {{ error }}
                            </b-notification>
                                <form @submit.prevent="login">
                                    <b-field label="Email">
                                        <b-input v-model="email" placeholder="wbuffet@insiders.finance" type="email" icon-pack="fa" icon="envelope">
                                        </b-input>
                                    </b-field>
                                    <b-field label="Password">
                                        <b-input type="password" v-model="password" password-reveal value="iwantmytreasure" placeholder="●●●●●●●">
                                        </b-input>
                                    </b-field>
                                    <p class="control login">
                                        <button class="button is-success is-outlined is-large is-fullwidth">Login</button>
                                    </p>
                                </form>
                            
                   </div>
                </div>
            </section>
</template>


<script>
import { login } from "@/api/auth";

export default {
  data() {
    return {
      email: this.autenticate ? this.autenticate.mail : '',
      password: this.autenticate ? this.autenticate.pass : '',
      error: null,
    };
  },
    props: {
    autenticate: {type: Object,
          default: null}
  },
  methods: {
    login() {
      login(this.email, this.password, this.$root)
        .then(data => {
          this.$router.push("/trending");
        })
        .catch(err => {
          this.error = "error";
        });
    }
  },
  created() {
    this.$root.hideNav();
  },
  destroyed() {
    this.$root.showNav = true;
  }
};
</script>

<style scoped>
#modalAuth{
    border-radius:5px;
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


.fa {
    color: #192b41 !important;
}
a{
    color: #192b41;
}
@media (max-width: 768px) {
  .section.main {
    background-color: #f9f9f9;
    padding-top:3.5rem  !important;
  }
}
</style>