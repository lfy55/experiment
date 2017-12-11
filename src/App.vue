<template>
  <div id="app">
    <div class="sidebar">
      <sidebar></sidebar>
    </div>
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import sidebar from "./components/sidebar"

export default {
  name: "app",
  components: {
    sidebar
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
  display: flex;
}
.sidebar {
  width: 280px;
  flex-shrink: 0;
}
.content-wrapper {
  flex-grow: 1;
  margin-left: 30px;
}
.chart {
  width: 1200px;
  height: 800px;
  text-align: left;
}
</style>
