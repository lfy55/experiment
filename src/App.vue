<template>
  <div id="app">
    <canvas class="fireworks" ref="canvas"></canvas>
    <div class="scroll sidebar">
      <sidebar></sidebar>
    </div>
    <div class="scroll content-wrapper">
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
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 10px;
  display: flex;
  height: calc(100% - 20px);
}
.sidebar {
  width: 280px;
  overflow: auto;
  flex-shrink: 0;
}
.content-wrapper {
  flex-grow: 1;
  margin-left: 30px;
  overflow: auto;
  margin-right: 5px;
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

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
.scroll::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
.scroll::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #fff;
}

/*定义滑块 内阴影+圆角*/
.scroll::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #aaa;
}
</style>
