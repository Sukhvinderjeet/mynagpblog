<template>
  <div>
    <card>
      <card-body>
        <card-text>
          <div v-if="!updateComment">{{ comment.body }}</div>
          <div>
            <input
              v-if="updateComment"
              type="text"
              :disabled="!isCurrentUser"
              class="form-control"
              v-model="comment.body"
              placeholder="What's this article about?"
            >
          </div>
        </card-text>
        <div v-if="isCurrentUser">
          <btn
            size="sm"
            outline="warning"
            class="pull-right"
            color="primary"
            v-on:click="destroy(slug, comment.id);"
          >Delete Comment</btn>
          <btn
            v-if="!updateComment"
            size="sm"
            outline="info"
            class="pull-right"
            color="primary"
            v-on:click="edit();"
          >Edit Comment</btn>
          <btn
            v-if="updateComment"
            size="sm"
            outline="info"
            class="pull-right"
            color="primary"
            v-on:click="Update(slug, comment);"
          >Update Comment</btn>
        </div>
      </card-body>
    </card>
    <div class="mrg10"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { COMMENT_DESTROY, COMMENT_CREATE } from "../common/constants";
import {
  Card,   
  CardBody, 
  CardText,
  Btn
} from "mdbvue";

export default {
  name: "Comment",
  components: {
    Card,  
    CardBody, 
    CardText,
    Btn
  },
  props: {
    slug: { type: String, required: true },
    comment: { type: Object, required: true }
  },
  data() {
    return {
      updateComment: false
    };
  },
  computed: {
    isCurrentUser() {
      if (this.currentUser.username && this.comment.author.username) {
        return this.comment.author.username === this.currentUser.username;
      }
      return false;
    },
    ...mapGetters(["currentUser"])
  },
  methods: {
    destroy(slug, commentId) {
      this.$store.dispatch(COMMENT_DESTROY, { slug, commentId });
    },
    edit() {
      this.updateComment = true;
    },
    Update(slug, comment) { 
      var payload = { slug: slug, comment: comment.body };
      let action = COMMENT_CREATE;
      let commentId = comment.id;
      this.$store.dispatch(COMMENT_DESTROY, { slug, commentId });
      this.inProgress = true;
      this.$store
        .dispatch(action, payload)
        .then(() => {          
          this.updateComment = false;
          this.inProgress = false;
        })
        .catch(({ response }) => {
          this.inProgress = false;
          this.errors = response.data.errors;
        });
    }
  }
};
</script>

<style scoped>
.mrg10 {
  margin: 10px, 0px;
  clear: both;
}
</style>
