<template>
  <div ref="line" class="chart">
  </div>
</template>

<script>
import echarts from "echarts"

export default {
  name: 'zhLine',
  props: {
    dataconfig: {
      type: Object,
      default: {
        xAxis: [],
        data: [],
        name: '',
      },
    },
  },
  data() {
    return {
      myChart: null,
    }
  },
  mounted() {
    if (!this.myChart) {
      this.myChart = echarts.init(this.$refs.line)
      this.initChart()
    } else {
      this.myChart.resize()
    }
  },
  methods: {
    initChart() {
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          },
          // formatter: function (data) {
          //   return data[0].seriesName + '<br>' + data[0].name + ':' + data[0].value;
          // }
        },
        grid: [{
          left: 40,
          top: 5,
          bottom: 30,
          right: 40,
          borderWidth: 0,
          containLabel: false
        }],
        calculable: false,
        yAxis: [{
          show: true,
          gridIndex: 0,
          type: 'value',
          name: '数据值',
          axisLabel: {
            show: true,
            color: '#000',
          },
          axisLine: {
            show: false,
          },
          splitArea: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
        }],
        xAxis: [{
          show: true,
          boundaryGap: true,
          gridIndex: 0,
          axisLabel: {
            interval: 0,
            //rotate: 30,
            fontSize: 12,
            color: '#000000',
          },
          axisLine: {
            show: false,
          },
          splitArea: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          type: 'category',
          data: this.dataconfig.xAxis || []
        }],
        series: [
          {
            name: this.dataconfig.name || '',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 4,
            },
            itemStyle: {
              color: '#559ee8',
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#308be4'
              }, {
                offset: 0.25,
                color: '#519de8'
              }, {
                offset: 0.5,
                color: '#abd0f4'
              }, {
                offset: 1,
                color: '#f2f8fd'
              }])
            },
            data: this.dataconfig.data || []
          }
        ]
      }

      this.myChart.setOption(option)
    },
  },
  watch: {
    dataconfig: {
      handler() {
        this.myChart.setOption({
          xAxis: [{
            data: this.dataconfig.xAxis || []
          }],
          series: [
            {
              name: this.dataconfig.name || '',
              data: this.dataconfig.data || [],
            }
          ]
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
