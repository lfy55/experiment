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

/**
  快速排序函数
  第二个参数为判定元素大小的函数
  函数包含两个参数
    如果第一个参数小于第二个参数则返回 -1
    如果第一个参数大于第二个参数则返回 1
    如果第一个参数等于第二个参数则返回 0
  如果不传默认为：
    cb = (a, b) => {
      return a < b ? -1 : a > b ? 1 : 0
    }
  函数会直接修改原数组并返回原数组
 */
function quickSort(arr, cb) {
  if (!cb || typeof cb !== 'function') {
    cb = (a, b) => {
      return a < b ? -1 : a > b ? 1 : 0
    }
  }

  function partition(arr, left, right) {
    let mid = arr[Math.floor((left + right) / 2)]
    // console.log(mid)
    while (left <= right) {
      while (cb(arr[left], mid) === -1) {
        left++
      }
      while (cb(arr[right], mid) === 1) {
        right--
      }
      if (left <= right) {
        [arr[left], arr[right]] = [arr[right], arr[left]]
        left++
        right--
      }
    }
    return left
  }

  if (arr.length < 2) {
    return arr
  }

  function quick(arr, left, right) {
    let index = partition(arr, left, right)
    if (left < index - 1) {
      quick(arr, left, index - 1)
    }
    if (right > index) {
      quick(arr, index, right)
    }
  }
  quick(arr, 0, arr.length - 1)
  return arr
}

function disposeData(data) {
  let xAxis = [],
    result = []

  quickSort(data, (a, b) => {
    return a.value < b.value ? -1 : a.value > b.value ? 1 : 0
  })

  data.forEach(element => {
    xAxis.push(element.name)
    result.push(element.value)
  })

  return { xAxis, data: result }
}

export default {
  name: 'testMap',
  components: {
    zhBar
  },
  data() {
    return {
      mapData: disposeData(mapData),
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
      this.$refs.barConponents.cancelSelect(this.selectedBar)
    },
    upData() {
      this.mapData = disposeData([
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
      ])
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
