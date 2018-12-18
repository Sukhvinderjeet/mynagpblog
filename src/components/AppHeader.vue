<template>
  <!--Navbar-->
  <navbar dark color="primary">
    <!-- Navbar brand -->
    <mdb-navbar-brand>
      <router-link class="nav-link" active-class="active" exact :to="{ name: 'home' }">
        <img src="../assert/blog.jpg" height="45" alt>
      </router-link>
    </mdb-navbar-brand>
    <navbar-collapse>
      <navbar-nav></navbar-nav>

      <router-link
       v-if="!isAuthenticated" 
        class="btn btn-primary btn-sm btn-rounded ripple-parent"
        style="color: white;"
        exact
        :to="{ name: 'login' }"
      >Sign in</router-link>
      <router-link v-if="!isAuthenticated" 
        class="btn btn-primary btn-sm btn-rounded ripple-parent"
        style="color: white;"
        exact
        :to="{ name: 'register' }"
      >Sign up</router-link>

      <btn size="sm" v-if="isAuthenticated" color="primary" rounded @click="logout">Logout</btn>
    </navbar-collapse>
  </navbar>
</template>

<script>
import { Theme, LOGOUT } from "../common/constants";
var data = { theme: Theme };
import { mapGetters } from "vuex";
import { Navbar, NavbarNav, NavbarCollapse, mdbNavbarBrand, Btn } from "mdbvue";

export default {
  name: "NavbarPage",
  data: function() {
    return data;
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  },
  components: {
    Navbar,
    NavbarNav,
    NavbarCollapse,
    mdbNavbarBrand,
    Btn
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: "home" });
      });
    }
  }
};
</script>