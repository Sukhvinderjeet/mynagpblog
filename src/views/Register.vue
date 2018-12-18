<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
          </ul>
          <form v-on:submit.prevent="onSubmit">
            <fieldset class="form-group">
              <mdb-input type="text" v-model="username" placeholder="Username" size="sm"/>

              <mdb-input type="text" v-model="email" placeholder="Email" size="sm"/>

              <mdb-input type="password" v-model="password" placeholder="Password" size="sm"/>
            </fieldset>
            <router-link :to="{ name: 'login' }" class="btn btn-sm btn-primary">Have an account?</router-link>
            <btn size="sm" color="primary" class="pull-right">Sign up</btn>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { REGISTER } from "../common/constants";
import { Btn, mdbInput } from "mdbvue";
export default {
  name: "RwvRegister",
  components: { Btn, mdbInput },
  data() {
    return {
      username: "",
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(REGISTER, {
          email: this.email,
          password: this.password,
          username: this.username
        })
        .then(() => this.$router.push({ name: "home" }));
    }
  }
};
</script>
