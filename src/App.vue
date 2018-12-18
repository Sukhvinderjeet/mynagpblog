<template>
  <div id="app">
    <AppHeader/>
    <router-view class="router"></router-view>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter
  }
};
</script>
 
<style>
.router {
  min-height: 570px;
  overflow: hidden;
}
</style>
