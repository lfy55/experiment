<template>
  <div ref="map" class="chart">
  </div>
</template>

<script>
import echarts from "echarts"
import axios from 'axios'

const litteAreaName = {
  '北京': '京',
  '天津': '津',
  '上海': '沪',
  '香港': '港',
  '澳门': '澳',
}
const litterAreas = [
  { name: '北京', coord: [116.46, 39.92] },
  { name: '上海', coord: [121.48, 31.22] },
  { name: '天津', coord: [117.190182, 39.125596] },
  { name: '香港', coord: [114.173355, 22.320048], symbolOffset: ['45%', '45%'] },
  { name: '澳门', coord: [113.54909, 22.198951], symbolOffset: ['-30%', '80%'] }
]

const canDrill = {
  "安徽": 'anhui',
  // "澳门": 'aomen',
  // "北京": 'beijing',
  // "重庆": 'chongqing',
  "福建": 'fujian',
  "甘肃": 'gansu',
  "广东": 'guangdong',
  "广西": 'guangxi',
  "贵州": 'guizhou',
  "海南": 'hainan',
  "河北": 'hebei',
  "黑龙江": 'heilongjiang',
  "河南": 'henan',
  "湖北": 'hubei',
  "湖南": 'hunan',
  "江苏": 'jiangsu',
  "江西": 'jiangxi',
  "吉林": 'jilin',
  "辽宁": 'liaoning',
  "内蒙古": 'neimenggu',
  "宁夏": 'ningxia',
  "青海": 'qinghai',
  "山东": 'shandong',
  // "上海": 'shanghai',
  "山西": 'shanxi',
  "陕西": 'shanxi1',
  "四川": 'sichuan',
  // "台湾": 'taiwan',
  // "天津": 'tianjin',
  // "香港": 'xianggang',
  "新疆": 'xinjiang',
  "西藏": 'xizang',
  "云南": 'yunnan',
  "浙江": 'zhejiang',
}

export default {
  name: 'zhMap',
  props: {
    dataconfig: {
      type: Array,
      default: [],
    },
    styleconfig: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      litteArea: litterAreas,
      selectedArea: '',
      isDirll: false,
      myChart: null,
    }
  },
  mounted() {
    if (!this.myChart) {
      this.myChart = echarts.init(this.$refs.map)
      this.initChart()
    } else {
      this.myChart.resize()
    }

    this.myChart.on('geoselectchanged', this.mapSelectedChange)
    this.myChart.on('click', this.mapClick)
  },
  methods: {
    async initChart() {
      let option = {
        title: {
          show: false,
        },
        tooltip: {
          trigger: 'item',
          formatter(param) {
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
          zoom: 1,
          map: this.styleconfig.mapName,
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
            data: this.dataconfig,
            markPoint: {
              symbol: 'circle',
              symbolSize: 30,
              data: this.isDirll ? [] : this.litteArea.map(item => {
                let newItem = Object.assign({}, item)
                let target = this.dataconfig.find(it => it.name === item.name)
                if (target) { newItem.value = target.value }
                return newItem
              }),
              itemStyle: {
                color: '#aaa',
                opacity: 0.6,
              },
              label: {
                show: true,
                color: '#ff0000',
                formatter(params) {
                  return litteAreaName[params.name] || ''
                },
                fontSize: 14,
                position: 'inside',
              },
            },
          },
        ],
      }
      if (!echarts.getMap(this.styleconfig.mapName)) {
        let mapJSON = await axios.get(`./static/mapData/${this.styleconfig.mapName}.json`)
        echarts.registerMap(this.styleconfig.mapName, mapJSON.data)
      }
      this.myChart.setOption(option)
    },
    mapSelectedChange(param) {
      if (this.isDirll) {
        return
      }
      if (!!param.batch && param.batch[0]) {
        let clickName = param.batch[0].name
        this.selectedArea = param.batch[0].selected[clickName] ? clickName : ''
      }
      if (!param.batch) {
        let clickName = param.name
        this.selectedArea = param.selected[clickName] ? clickName : ''
      }
      if (canDrill[this.selectedArea]) {
        console.log('xiazuan')
        this.isDirll = true
        this.changeMap(canDrill[this.selectedArea])
      }
      this.$emit('changeSelected', { area: this.selectedArea })
    },
    async changeMap(mapName) {
      if (!echarts.getMap(mapName)) {
        let mapJSON = await axios.get(`./static/mapData/${mapName}.json`)
        echarts.registerMap(mapName, mapJSON.data)
      }
      this.myChart.setOption({
        geo: {
          map: mapName,
          selectedMode: this.isDirll ? false : 'single'
        },
        series: [{
          markPoint: {
            symbolSize: this.isDirll ? 0 : 30
          }
        }]
      })
    },
    mapClick(param) {
      if (this.isDirll) {
        return
      }
      if (param.componentType === 'markPoint') {
        this.myChart.dispatchAction({
          type: 'geoToggleSelect',
          name: param.name
        })
      }
    },
    cancelSelect(name) {
      if (!name) { return }
      if (canDrill[name]) {
        this.isDirll = false
        this.changeMap(this.styleconfig.mapName)
      }
      this.myChart.dispatchAction({
        type: 'geoToggleSelect',
        name: name
      })
    },
  },
  watch: {
    dataconfig: {
      handler() {
        let markData = this.isDirll ? [] : this.litteArea.map(item => {
          let newItem = Object.assign({}, item)
          let target = this.dataconfig.find(it => it.name === item.name)
          if (target) { newItem.value = target.value }
          return newItem
        })
        this.myChart.setOption({
          series: [{
            data: this.dataconfig,
            markPoint: {
              data: markData,
            }
          }]
        })
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
