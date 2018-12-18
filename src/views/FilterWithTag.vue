<template>
 <ArticleList :tag="tag"></ArticleList>
</template>

<script>
import ArticleList from "../components/ArticleList";

export default {
  name: "FilterWithTag",
  components: {
    ArticleList
  },
  computed: {
    tag() {
      return this.$route.params.tag;
    }
  }
};
</script>
