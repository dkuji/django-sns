<template>
  <v-app>
    <div id="app">
      <!--<img :src="image_src"/>-->
      <img src="./assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js App hoge ge ge ge ge" />
    </div>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  data() {
    return {
      image_src: require("./assets/logo.png")
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
