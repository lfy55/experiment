<template>
  <div>
    选中区域：{{selectedArea}}
    <div ref="map" class="chart">

    </div>
  </div>
</template>

<script>
import echarts from "echarts"
import chinaMap from '@/assets/china.json'

echarts.registerMap('china', chinaMap)

const litteAreaName = {
  '北京': '京',
  '天津': '津',
  '上海': '沪',
  '香港': '港',
  '澳门': '澳',
}
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
  { name: '澳门', value: randomData() }
]

export default {
  name: 'froLitteArea',
  data() {
    return {
      litteArea: [{ name: '北京', coord: [116.46, 39.92] },
      { name: '上海', coord: [121.48, 31.22] },
      { name: '天津', coord: [117.190182, 39.125596] },
      { name: '香港', coord: [114.173355, 22.320048], symbolOffset: ['45%', '45%'] },
      { name: '澳门', coord: [113.54909, 22.198951], symbolOffset: ['-30%', '80%'] }],
      selectedArea: '',
      myChart: null,
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.map)
    this.drawChart()

    this.myChart.on('geoselectchanged', this.mapSelectedChange)
    this.myChart.on('click', this.mapClick)
  },
  methods: {
    drawChart() {
      let option = {
        title: {
          show: false,
        },
        tooltip: {
          trigger: 'item',
          formatter(param) {
            // console.log(param) 
            return `${param.seriesName}<br />${param.name}:${param.value}`
          },
        },
        visualMap: {
          min: 0,
          max: 1000,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          inRange: {
            color: ['#e0ffff', '#006edd']
          },
          calculable: true
        },
        geo: {
          show: true,
          zoom: 1.3,
          map: 'china',
          label: {
            show: false
          },
          selectedMode: 'single',
          itemStyle: {
            borderColor: 'rgba(0, 0, 0, 0.2)'
          },
          emphasis: {
            itemStyle: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
        },
        series: [
          {
            name: '测试数据',
            type: 'map',
            geoIndex: 0,
            data: mapData,
            markPoint: {
              symbol: 'circle',
              symbolSize: 30,
              data: this.litteArea.map(item => {
                item.value = mapData.find(it => it.name === item.name).value
                return item
              }),
              itemStyle: {
                color: '#aaa',
                opacity: 0.6,
              },
              label: {
                show: true,
                color: '#ff0000',
                formatter(params) {
                  return litteAreaName[params.name]
                },
                fontSize: 14,
                position: 'inside',
              },
            },
          },
        ],
      }
      this.myChart.setOption(option)
    },
    mapSelectedChange(param) {
      console.log('地图选中事件触发：', param)
      if (!!param.batch && param.batch[0]) {
        let clickName = param.batch[0].name
        this.selectedArea = param.batch[0].selected[clickName] ? clickName : ''
      }
      if (!param.batch) {
        let clickName = param.name
        this.selectedArea = param.selected[clickName] ? clickName : ''
      }

      this.$emit('changeSelected', { area: this.selectedArea })
    },
    mapClick(param) {
      console.log('地图点击事件触发：', param)
      if (param.componentType === 'markPoint') {
        this.myChart.dispatchAction({
          type: 'geoToggleSelect',
          // seriesIndex: 1,
          name: param.name
        })
      }
    },
    cancelSelect(name) {
      this.myChart.dispatchAction({
          type: 'geoToggleSelect',
          name: name
        })
    }
  },
}
</script>

<style scoped>
</style>
