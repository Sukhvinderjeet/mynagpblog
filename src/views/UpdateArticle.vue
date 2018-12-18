<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <RwvListErrors :errors="errors"/>
        <form v-on:submit.prevent="onPublish(article.slug);">
          <fieldset :disabled="inProgress">
            <fieldset class="form-group">
              <fieldset class="form-group">
                <input
                  type="text"
                  :disabled="!isCurrentUser()"
                  class="form-control form-control-lg"
                  v-model="article.title"
                  placeholder="Article Title"
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  :disabled="!isCurrentUser()"
                  class="form-control"
                  v-model="article.description"
                  placeholder="What's this article about?"
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  :disabled="!isCurrentUser()"
                  v-model="article.body"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  v-if="isCurrentUser()"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tagInput"
                  v-on:keypress.enter.prevent="addTag(tagInput);"
                >
              </fieldset>
              <div class="tag-list">
                <span
                  class="tag-default tag-pill"
                  v-for="(tag, index) of article.tagList"
                  :key="tag + index"
                >
                  <i class="ion-close-round" v-on:click="removeTag(tag);"></i>
                  <badge
                    pill
                    color="primary-color"
                    :disabled="!isCurrentUser()"
                    class="pad10"
                  >{{ tag }}</badge>
                </span>
              </div>
            </fieldset>
          </fieldset>
          <btn v-if="isCurrentUser()" size="sm" color="primary" type="submit">Update This Article</btn>
          <btn
            v-if="isCurrentUser()"
            size="sm"
            outline="warning"
            class="pull-right"
            v-on:click="deleteArticle(article.slug)"
            color="primary"
          >Delete Article</btn>
        </form>
      </div>
      <div class="col-md-6" v-if="isAuthenticated">
        <RwvListErrors :errors="errors"/>
        <form v-on:submit.prevent="onPublishComment(article.slug,comment);">
          <fieldset :disabled="inProgress">
            <fieldset class="form-group">
              <input
                class="form-control"
                type="text"
                v-model="comment"
                placeholder="Comment"
                size="sm"
              >
            </fieldset>
          </fieldset>
        </form>
        <btn size="sm" color="primary" class="pull-right" type="submit">Post Comment</btn>
        <div class="clear"></div>
        <Comment
          v-for="(comment) in comments"
          :comment="comment"
          :slug="article.slug"
          :key="comment.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../store";
import RwvListErrors from "../components/ListErrors";
import Comment from "./Comment";
import {
  ARTICLE_PUBLISH,
  ARTICLE_EDIT,
  FETCH_ARTICLE,
  ARTICLE_EDIT_ADD_TAG,
  ARTICLE_EDIT_REMOVE_TAG,
  ARTICLE_RESET_STATE,
  COMMENT_CREATE,
  FETCH_COMMENTS,
  ARTICLE_DELETE
} from "../common/constants";
import { Btn, mdbInput, MdTextarea, Badge } from "mdbvue";
export default {
  name: "UpdateArticle",
  components: { RwvListErrors, Btn, mdbInput, MdTextarea, Badge, Comment },
  props: {
    previousArticle: {
      type: Object,
      required: false
    }
  },
  async beforeRouteUpdate(to, from, next) {
    await store.dispatch(ARTICLE_RESET_STATE);
    return next();
  },
  async beforeRouteEnter(to, from, next) {
    // SO: https://github.com/vuejs/vue-router/issues/1034
    // If we arrive directly to this url, we need to fetch the article
    await store.dispatch(ARTICLE_RESET_STATE);
    if (to.params.slug !== undefined) {
      await store.dispatch(
        FETCH_ARTICLE,
        to.params.slug,
        to.params.previousArticle
      );
      Promise.all([store.dispatch(FETCH_COMMENTS, to.params.slug)]).then(() => {
        next();
      });
    }
    return next();
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch(ARTICLE_RESET_STATE);
    next();
  },
  data() {
    return {
      tagInput: null,
      inProgress: false,
      comment: "",
      errors: {}
    };
  },
  computed: {
    ...mapGetters(["article", "currentUser", "isAuthenticated", "comments"])
  },
  methods: {
    isCurrentUser() {
      if (this.currentUser.username && this.article.author.username) {
        return this.currentUser.username === this.article.author.username;
      }
      return false;
    },
    onPublish(slug) {
      let action = slug ? ARTICLE_EDIT : ARTICLE_PUBLISH;
      this.inProgress = true;
      this.$store
        .dispatch(action)
        .then(({ data }) => {
          this.inProgress = false;
          this.$router.push({
            name: "home",
            params: { slug: data.article.slug }
          });
        })
        .catch(({ response }) => {
          this.inProgress = false;
          this.errors = response.data.errors;
        });
    },
    deleteArticle(slug) {
      this.$store
        .dispatch(ARTICLE_DELETE, slug)
        .then(() => {
          this.inProgress = false;
          this.$router.push({
            name: "home"
          });
        })
        .catch(({ response }) => {
          this.inProgress = false;
          this.errors = response.data.errors;
        });
    },
    onPublishComment(slug, comment) {
      var payload = { slug: slug, comment: comment };
      let action = COMMENT_CREATE;
      this.inProgress = true;
      let self = this;
      this.$store
        .dispatch(action, payload)
        .then(() => {
          self.comment = "";
          self.inProgress = false;
        })
        .catch(({ response }) => {
          self.inProgress = false;
          self.comment = "";
        });
    },
    removeTag(tag) {
      this.$store.dispatch(ARTICLE_EDIT_REMOVE_TAG, tag);
    },
    addTag(tag) {
      this.$store.dispatch(ARTICLE_EDIT_ADD_TAG, tag);
      this.tagInput = null;
    }
  }
};
</script>
<style scoped>
.pad10 {
  padding: 10px;
  margin: 2px;
}
.clear {
  clear: both;
}
</style>
