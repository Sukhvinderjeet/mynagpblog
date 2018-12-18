<template>
  <container class="mrg10">
    <card-group deck>
      <card class="pad10">
        <card-body>
          <card-title>{{article.title}}</card-title>

          <card-text>{{article.body | truncate(300, '...')}}</card-text>

          <div class="clear"></div>
          <div class="pull-left">
            <router-link
              class="btn btn-outline-info btn-sm ripple-parent"
              exact
              :to="{ name: 'article-update' ,params: {
          slug: this.article.slug
        } }"
            >Read more</router-link>
          </div>

          <div class="pull-right">
            <img class="imglogo" :src="article.author.image">
            {{article.author.username}}
          </div>
          <div class="clear"></div>
          <btn v-if="!article.favorited" outline="info" size="sm" @click="toggleFavorite">
            Add to Favourites
            <i class="fa fa-heart pull-right colorred" aria-hidden="true"></i>
          </btn>
          <btn v-if="article.favorited" outline="warning" size="sm" @click="toggleFavorite">
            Remove From Favourites
            <i class="fa fa-heart pull-right colorblack" aria-hidden="true"></i>
          </btn>
        </card-body>
      </card>
    </card-group>
  </container>
</template>

<script>
import { mapGetters } from "vuex";
import {
  ARTICLE_DELETE,
  FAVORITE_REMOVE,
  FAVORITE_ADD
} from "../common/constants";

import {
  Container,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Btn,
  ViewWrapper,
  MdMask,
  CardGroup
} from "mdbvue";

export default {
  name: "CardPage",
  components: {
    Container,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    Btn,
    ViewWrapper,
    MdMask,
    CardGroup
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
  methods: {
    isCurrentUser() {
      if (this.currentUser.username && this.article.author.username) {
        return this.currentUser.username === this.article.author.username;
      }
      return false;
    },
    toggleFavorite() {
      const action = this.article.favorited ? FAVORITE_REMOVE : FAVORITE_ADD;
      this.$store.dispatch(action, this.article.slug);      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4 {
  margin: 0;
}
.mrg10 {
  margin-bottom: 10px;
}
.crdimg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.pad10 {
  padding: 2px;
}
.imglogo {
  width: 30px;
}
.clear {
  clear: both;
}

.colorred {
  color: red;
}
.colorblack {
  color: black;
}
</style>
