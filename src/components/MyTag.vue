<template>
  <badge pill color="primary-color" class="pad10">
    <router-link :to="{ name: 'home-tag', params: { tag: name } }">{{ name }}</router-link>
  </badge>
</template>

<script>
import { Badge } from "mdbvue";
export default {
  name: "MyTag",
  components: {
    Badge  
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>
<style scoped>
a {
  color: white;
  font-size: 12px;
}
.pad10 {
  padding: 10px;
  margin: 2px;
}
</style>
