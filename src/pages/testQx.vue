<template>
  <div>
    <el-card class="box-card">
      当前选中线条：{{selectedLine}}
      <el-button type="primary" @click="cancel">取消选中</el-button>
      <el-button type="primary" @click="upData">更新数据</el-button>
      <el-checkbox-group v-model="selectedLengend" :min="1">
        <el-checkbox label="import">收件方向</el-checkbox>
        <el-checkbox label="export">发件方向</el-checkbox>
      </el-checkbox-group>
    </el-card>
    <div class="chart__wrap">
      <zhQx :dataconfig="mapData" :styleconfig="mapStyle" :selectedLengend="selectedLengend" @changeSelectedLine="changeSelectedLine" ref="qxConponents"></zhQx>
    </div>
  </div>

</template>

<script>
import zhQx from '../components/charts/zhQx.vue'

function randomData() {
  return Math.round(Math.random() * 1000)
}
function getData() {
  let importData = [
    { name: '上海', value: randomData() },
    { name: '广州', value: randomData() },
    { name: '大连', value: randomData() },
    { name: '南宁', value: randomData() },
    { name: '南昌', value: randomData() },
    { name: '拉萨', value: randomData() },
    { name: '长春', value: randomData() },
    { name: '包头', value: randomData() },
    { name: '重庆', value: randomData() },
    { name: '亚洲', value: randomData() },
    { name: '欧洲', value: randomData() },
    { name: '常州', value: randomData() }
  ]

  let exportData = [
    { name: '上海', value: randomData() },
    { name: '广州', value: randomData() },
    { name: '大连', value: randomData() },
    { name: '南宁', value: randomData() },
    { name: '南昌', value: randomData() },
    { name: '拉萨', value: randomData() },
    { name: '长春', value: randomData() },
    { name: '包头', value: randomData() },
    { name: '重庆', value: randomData() },
    { name: '亚洲', value: randomData() },
    { name: '欧洲', value: randomData() },
    { name: '常州', value: randomData() }
  ]

  return {
    importData,
    exportData
  }
}
let firstData = getData()
export default {
  name: 'testQx',
  components: {
    zhQx,
  },
  data() {
    return {
      selectedLine: '',
      selectedLengend: ['import'],
      mapStyle: {
        mapName: 'custom_world',
        mapJSONUrl: ''
      },
      mapData: {
        target: '北京',
        import: firstData.importData,
        export: firstData.exportData,
      },
    }
  },
  methods: {
    upData() {
      this.mapData = {
        target: this.mapData.target === '南京' ? '北京' : '南京',
        import: getData().importData,
        export: getData().exportData,
      }
    },
    changeSelectedLine(param) {
      this.selectedLine = param
    },
    cancel() {
      this.$refs.qxConponents.cancelSelected()
    }
  },
}
</script>

<style scoped>
.chart__wrap {
  width: 1200px;
  height: 800px;
}
</style>
