<template>
  <div>
    <div class="chart__wrap">
      <zhLine :dataconfig="mapData" ref="lineConponent"></zhLine>
    </div>
  </div>
</template>

<script>
import zhLine from '../components/charts/zhLine.vue'

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

export default {
  name: 'testLine',
  data() {
    return {
      mapData: {
        name: '测试',
        xAxis: mapData.map(item => item.name),
        data: mapData.map(item => item.value),
      }
    }
  },
  components: {
    zhLine
  },
}
</script>

<style scoped>
.chart__wrap {
  width: 800px;
  height: 600px;
}
</style>
