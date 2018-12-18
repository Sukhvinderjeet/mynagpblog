<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
          </ul>
          <form v-on:submit.prevent="onSubmit(email, password);">
            <mdb-input type="text" v-model="email" placeholder="Email" size="sm"/>
            <mdb-input type="password" v-model="password" placeholder="Password" size="sm"/>

           <router-link :to="{ name: 'register' }" class="btn btn-sm   btn-primary">Need an account?</router-link>
            
            <btn size="sm" color="primary" class="pull-right" type="submit">Sign in</btn>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Btn, mdbInput } from "mdbvue";
import { mapState } from "vuex";
import { LOGIN } from "../common/constants";

export default {
  name: "RwvLogin",
  components: { Btn, mdbInput },
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    onSubmit(email, password) {
      this.$store
        .dispatch(LOGIN, { email, password })
        .then(() => this.$router.push({ name: "home" }));
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
};
</script>
