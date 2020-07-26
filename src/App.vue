<template>
  <div id="app">
    <Header />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Home from "./views/Home"
import Header from "./components/Header/Header"
export default {
  components:{
    Home,
    Header
  }
};
</script>

<style scpoed>
</style>
   