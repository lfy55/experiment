<template>
  <div id="app">
    <canvas class="fireworks" ref="canvas"></canvas>
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
import { initWork } from './lib/firework.js'

export default {
  name: "app",
  components: {
    sidebar
  },
  mounted() {
    let fireWork = initWork(this.$refs.canvas)
    fireWork.setCanvasSize()
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
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
.min-chart {
  width: 800px;
  height: 600px;
  text-align: left;
}
.code {
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  font-family: "Roboto Mono", Monaco, courier, monospace;
  background-color: #f7f7f7;
}

.fireworks {
  position: fixed;
  z-index: -1;
  left: 0;
  top: 0;
  right: 0;
  height: 0;
}
</style>
