<template>
  <div ref="piecewiseBar" class="chart">

  </div>
</template>

<script>
import echarts from 'echarts'
import { createColorL } from '@/lib/jslib'

export default {
  name: 'piecewiseBar',
  data() {
    return {
      dataconfig: [
        { name: '上海', value: 32 },
        { name: '广州', value: 22 },
        { name: '北京', value: 18 },
        { name: '杭州', value: 17 },
        { name: '深圳', value: 13 }
      ],
      yAxisData: [],
      seriesData: [],
      myChart: null,
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.piecewiseBar)
    this.initData()
    this.drawChart()
  },
  methods: {
    initData() {
      let newList = [], max = 0
      let cScale = createColorL('#115ae4', '#92f696')
      this.dataconfig.forEach(item => {
        max = max > item.value ? max : item.value
        newList.unshift({ name: item.name, value: item.value, totalValue: item.value })
      })
      this.yAxisData = newList.map(item => item.name)
      let itemNum = parseInt(max / 4)
      let seriess = [], finish = false, index = 0
      do {
        let seriesItem = {
          name: '出差人员数',
          type: 'bar',
          stack: 'sum',
          barWidth: '30%',
          data: newList.map(item => {
            if (item.value > itemNum) {
              let itemStyle = {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [
                      { offset: 0, color: cScale.getColor(index * itemNum / item.totalValue) },
                      { offset: 1, color: cScale.getColor((index + 1) * itemNum / item.totalValue) }
                    ],
                    globalCoord: false,
                  }
                },
              }
              item.value -= itemNum

              return { name: item.name, value: itemNum, itemStyle, totalValue: item.totalValue }
            } else if (item.value <= 0) {
              let itemStyle = {
                normal: {
                  color: 'rgba(0,0,0,0)'
                },
              }

              return { name: item.name, value: '-', itemStyle, totalValue: item.totalValue }
            } else {
              let itemStyle = {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [
                      { offset: 0, color: cScale.getColor(index * itemNum / item.totalValue) },
                      { offset: 1, color: cScale.getColor(1) }
                    ],
                    globalCoord: false,
                  }
                },
              }
              let o = { name: item.name, value: item.value, itemStyle, totalValue: item.totalValue }
              item.value -= itemNum

              return o
            }
          }),
        }
        finish = newList.every(item => item.value <= 0)
        seriess.push(seriesItem)
        if (!finish) {
          seriess.push({
            name: 'notShow',
            type: 'bar',
            stack: 'sum',
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0)',
              },
            },
            barWidth: '30%',
            data: newList.map(item => {
              return { name: item.name, value: itemNum / 5 }
            }),
          })
        }
        index++
      } while (!finish);

      this.seriesData = seriess
    },
    drawChart() {
      let option = {
        backgroundColor: '#999999',
        title: {
          show: false,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (event) {
            return `${event[0].seriesName}<br>${event[0].data.name}: ${event[0].data.totalValue}`
          }
        },
        legend: {
          show: false,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          splitLine: { show: false },
        },
        yAxis: {
          type: 'category',
          data: this.yAxisData,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            color: '#fff',
            fontSize: 20,
            margin: 20,
          }
        },
        series: this.seriesData
      }

      this.myChart.setOption(option)
    }
  }
}
</script>