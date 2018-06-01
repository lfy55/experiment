<template>
  <div>
    <el-card class="box-card">
      当前选中区域：{{selectedArea}}
      <el-button type="primary" @click="cancelSelect">取消选中</el-button>
      <el-button type="primary" @click="upData">更新数据</el-button>
    </el-card>
    <div class="chart__wrap">
      <zhMap :dataconfig="mapData" :styleconfig="mapStyle" ref="mapConponents" @changeSelected="changeArea"></zhMap>
    </div>
  </div>
</template>

<script>
import zhMap from '../components/charts/zhMap.vue'

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
  { name: '广西', value: randomData() },
  { name: '甘肃', value: randomData() },
  { name: '山西', value: randomData() },
  { name: '内蒙古', value: randomData() },
  { name: '陕西', value: randomData() },
  { name: '吉林', value: randomData() },
  { name: '福建', value: randomData() },
  { name: '贵州', value: randomData() },
  { name: '广东', value: randomData() },
  { name: '青海', value: randomData() },
  { name: '西藏', value: randomData() },
  { name: '四川', value: randomData() },
  { name: '宁夏', value: randomData() },
  { name: '海南', value: randomData() },
  { name: '台湾', value: randomData() },
  { name: '香港', value: randomData() },
  { name: '澳门', value: randomData() },
  { name: '南美洲', value: randomData() },
  { name: '北美洲', value: randomData() },
  { name: '大洋洲', value: randomData() },
  { name: '亚洲', value: randomData() },
  { name: '非洲', value: randomData() },
  { name: '欧洲', value: randomData() },
]

export default {
  name: 'testMap',
  components: {
    zhMap
  },
  data() {
    return {
      mapData,
      selectedArea: null,
      mapStyle: {
        mapName: 'custom_world',
        mapJSONUrl: ''
      },
    }
  },
  mounted() {
  },
  methods: {
    changeArea(params) {
      this.selectedArea = params.area
      setTimeout(() => {
        this.mapData = [
          { name: '南京市', value: randomData() },
          { name: '无锡市', value: randomData() },
          { name: '苏州市', value: randomData() },
          { name: '常州市', value: randomData() },
        ]
      }, 1000)
    },
    cancelSelect() {
      this.$refs.mapConponents.cancelSelect(this.selectedArea)
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
        { name: '广西', value: randomData() },
        { name: '甘肃', value: randomData() },
        { name: '山西', value: randomData() },
        { name: '内蒙古', value: randomData() },
        { name: '陕西', value: randomData() },
        { name: '吉林', value: randomData() },
        { name: '福建', value: randomData() },
        { name: '贵州', value: randomData() },
        { name: '广东', value: randomData() },
        { name: '青海', value: randomData() },
        { name: '西藏', value: randomData() },
        { name: '四川', value: randomData() },
        { name: '宁夏', value: randomData() },
        { name: '海南', value: randomData() },
        { name: '台湾', value: randomData() },
        { name: '香港', value: randomData() },
        { name: '澳门', value: randomData() },
        { name: '南美洲', value: randomData() },
        { name: '北美洲', value: randomData() },
        { name: '大洋洲', value: randomData() },
        { name: '亚洲', value: randomData() },
        { name: '非洲', value: randomData() },
        { name: '欧洲', value: randomData() },
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
