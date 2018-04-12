<template>
  <div>
    <div class="bg-size"></div>
    <p>background-clip设置</p>
    <el-radio-group v-model="bgClip">
      <el-radio-button label="border-box"></el-radio-button>
      <el-radio-button label="padding-box"></el-radio-button>
      <el-radio-button label="content-box"></el-radio-button>
      <el-radio-button label="text"></el-radio-button>
    </el-radio-group>
    <div class="bg-clip" :style="{backgroundClip:bgClip}">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos delectus, incidunt magni doloribus deleniti quibusdam velit obcaecati minima! Deserunt quo accusamus cupiditate debitis porro nobis voluptas dicta, unde maxime rem.</div>
    <ul class="test-list">
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'aboutBg',
  data() {
    return {
      bgClip: 'border-box'
    }
  }
}
</script>

<style scoped>
.bg-size {
  width: 300px;
  height: 200px;
  border: 1px solid rgb(68, 94, 238);
  background-image: url(../../assets/20180123173538.png);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}
.bg-clip {
  background: #66f;
  width: 300px;
  height: 200px;
  margin: 10px;
  padding: 10px;
  color: #000;
  background-origin: border-box;
  border: 10px #000 dotted;
}
.test-list li:nth-child(2) {
  color: red;
}
</style>
