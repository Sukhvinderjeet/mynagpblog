<template>
  <ArticleList :favorited="this.currentUser.username"></ArticleList>
</template>

<script>
import ArticleList from "../components/ArticleList";
import { mapGetters } from "vuex";
export default {
  name: "FilterWithFavorited",
  components: {
    ArticleList
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  }
};
</script>
