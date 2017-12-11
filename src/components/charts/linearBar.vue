<template>
  <div ref="linearBar" class="chart">

  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'linearBar',
  data() {
    return {
      barData: [],
      axis: [],
      myChart: null,
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.linearBar)
    this.initData()
    this.drawChart()
  },
  methods: {
    initData() {
      this.axis = []
      this.barData = []
      for (let index = 0; index < 18; index++) {
        this.axis.push(`项目${index}`)
        this.barData.push(~~(Math.random() * 30))
      }
    },
    drawChart() {
      let maxData = 0, length = this.axis.length
      this.barData.forEach(item => item > maxData ? maxData = item : 0)
      maxData = maxData * 1.1

      let option = {
        backgroundColor: '#999999',
        title: {
          text: '特性示例：渐变色 阴影 点击缩放',
        },
        xAxis: {
          data: this.axis,
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          { // For shadow
            type: 'bar',
            itemStyle: {
              normal: { color: 'rgba(0,0,0,0.05)' }
            },
            barGap: '-100%',
            barCategoryGap: '80%',
            data: new Array(length).fill(maxData),
            animation: false
          },
          {
            type: 'bar',
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0, y: 0, x2: 0, y2: 1,
                  colorStops: [
                    { offset: 0, color: '#01a2d8' },
                    { offset: 1, color: '#024465' },
                  ]
                }
              },
            },
            data: this.barData
          }
        ]
      }

      this.myChart.setOption(option)
    }
  }
}
</script>