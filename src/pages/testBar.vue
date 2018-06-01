<template>
  <div>
    <el-card class="box-card">
      当前选中柱状图：{{selectedBar}}
      <el-button type="primary" @click="cancelSelect">取消选中</el-button>
      <el-button type="primary" @click="upData">更新数据</el-button>
    </el-card>
    <div class="chart__wrap">
      <zhBar :dataconfig="mapData" ref="barConponents" @changeSelected="changeArea"></zhBar>
    </div>
  </div>
</template>

<script>
import zhBar from '../components/charts/zhBar.vue'

function randomData() {
  return Math.round(Math.random() * 1000)
}
const mapData = [
  { name: '北京', value: randomData() },
  { name: '天津', value: randomData() },
  { name: '上海', value: randomData() },
  { name: '重庆', value: randomData() },
  { name: '河北', value: randomData() },
  { name: '河南', value: randomData() },
  { name: '云南', value: randomData() },
  { name: '辽宁', value: randomData() },
  { name: '黑龙江', value: randomData() },
  { name: '湖南', value: randomData() },
  { name: '安徽', value: randomData() },
  { name: '山东', value: randomData() },
  { name: '新疆', value: randomData() },
  { name: '江苏', value: randomData() },
  { name: '浙江', value: randomData() },
  { name: '江西', value: randomData() },
  { name: '湖北', value: randomData() },
]

function disposeData(data) {
  let xAxis = [],
    result = []

  data.forEach(element => {
    xAxis.push(element.name)
    result.push(element.value)
  })
}

export default {
  name: 'testMap',
  components: {
    zhBar
  },
  data() {
    return {
      mapData,
      selectedBar: null,
    }
  },
  mounted() {
  },
  methods: {
    changeArea(params) {
      this.selectedBar = params.bar
    },
    cancelSelect() {
      // this.$refs.barConponents.cancelSelect(this.selectedArea)
    },
    upData() {
      this.mapData = [
        { name: '北京', value: randomData() },
        { name: '天津', value: randomData() },
        { name: '上海', value: randomData() },
        { name: '重庆', value: randomData() },
        { name: '河北', value: randomData() },
        { name: '河南', value: randomData() },
        { name: '云南', value: randomData() },
        { name: '辽宁', value: randomData() },
        { name: '黑龙江', value: randomData() },
        { name: '湖南', value: randomData() },
        { name: '安徽', value: randomData() },
        { name: '山东', value: randomData() },
        { name: '新疆', value: randomData() },
        { name: '江苏', value: randomData() },
        { name: '浙江', value: randomData() },
        { name: '江西', value: randomData() },
        { name: '湖北', value: randomData() },
      ]
    },
  },
}
</script>

<style scoped>
.chart__wrap {
  width: 800px;
  height: 600px;
}
</style>
