<template>
  <Footer :color="theme" class="font-small pt-4 mt-4" position="bottom">
    <div class="footer-copyright text-center py-3">
      <container fluid>&copy; 2018 Copyright: My-Blog</container>
    </div>
  </Footer>
</template>

<script>
import { Footer, Container } from "mdbvue";
import { Theme } from "../common/constants";
var data = { theme: Theme };
export default {
  name: "AppFooter",
  components: {
    Footer,
    Container
  },
  data: function() {
    return data;
  }
};
</script>
 