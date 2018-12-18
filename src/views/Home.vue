<template>
  <container>
    <row class="mt-5 mycnt align-items-center justify-content-start">
      <div class="col-sm-8">
        <h4 class="grey-text pull-left">
          <strong>Wellcome {{userName  | truncate(8, '..')}} to my blogs</strong>
        </h4>
        <a
          href="#"
          waves-fixed
          class="border grey-text px-2 border-light rounded ml-2"
          target="_blank"
        >
          <fa icon="graduation-cap" class="mr-2"/>A place to share your knowledge
        </a>
      </div>

      <div class="col-sm-4">
        <btn size="sm" v-if="this.$route.params.tag" outline="info">{{tag}}</btn>
          <router-link
          class="btn btn-outline-info btn-sm ripple-parent"
          exact
          :to="{ name: 'home' }"
        >Show All Articles</router-link>

        <router-link
          class="btn btn-outline-info btn-sm ripple-parent"
          exact
          :to="{ name: 'home-favorite' }"
        >Show My Favourites</router-link>
        <router-link v-if="isAuthenticated" 
          class="btn btn-outline-info btn-sm ripple-parent"
          exact
          :to="{ name: 'article-edit' }"
        >Create New Article</router-link>
        
      </div>
    </row>
    <hr class="my-5">
    <div class="row">
      <div class="col-md-6">
        <router-view></router-view>
      </div>
      <div class="col-md-6">
        <div class="sidebar">
          <p>Popular Tags</p>
          <div class="tag-list">
            <MyTag v-for="(tag, index) in tags" :name="tag" :key="index"></MyTag>
          </div>
        </div>
      </div>
    </div>
  </container>
</template>

<script>
import { mapGetters } from "vuex";
import MyTag from "../components/MyTag";
import { FETCH_TAGS } from "../common/constants";
import { Container, Row, Fa, Btn } from "mdbvue";

export default {
  name: "home",
  mounted() {
    this.$store.dispatch(FETCH_TAGS);
  },
  computed: {
    ...mapGetters(["isAuthenticated", "tags", "currentUser"]),
    tag() {
      return this.$route.params.tag;
    },
    userName() {
      return this.currentUser.username;
    }
  },
  components: {
    MyTag,
    Container,
    Row,
    Fa,
    Btn
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidebar {
  background: #f3f3f3;
  padding: 12px;
}
h4 {
  margin: 0;
}
</style>
