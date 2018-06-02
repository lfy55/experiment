<template>
  <div ref="bar" class="chart">
  </div>
</template>

<script>
import echarts from "echarts"

export default {
  name: 'zhBar',
  props: {
    dataconfig: {
      type: Object,
      default: {
        xAxis: [],
        data: [],
      },
    },
  },
  data() {
    return {
      selectedBar: null,
      max: 0,
      myChart: null,
    }
  },
  mounted() {
    if (!this.myChart) {
      this.myChart = echarts.init(this.$refs.bar)
      this.initChart()
    } else {
      this.myChart.resize()
    }

    this.myChart.on('click', this.clickBar)
  },
  methods: {
    initChart() {
      let len = this.dataconfig.xAxis.length
      this.dataconfig.data.forEach(it => {
        this.max = it > this.max ? it : this.max
      })

      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (data) {
            return data[1].seriesName + '<br>' + data[1].name + ':' + data[1].value;
          }
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
          show: false,
          gridIndex: 0,
          type: 'value',
          name: '数据值',
          axisLabel: {
            show: false,
            textStyle: {
              color: '#5BD75B'
            }
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
            color: '#ff9d00',
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
        series: [{
          type: 'bar',
          //barMaxWidth: 20,
          itemStyle: {
            normal: {
              color: 'rgb(49, 49, 49)'
            },
          },
          xAxisIndex: 0,
          yAxisIndex: 0,
          zlevel: 1,
          barGap: '-100%',
          barCategoryGap: '65%',
          data: new Array(len).fill(this.max * 1.1),
          abimation: false
        }, {
          name: this.dataconfig.name || '',
          type: 'bar',
          xAxisIndex: 0,
          yAxisIndex: 0,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1, [{
                  offset: 0,
                  color: '#77c0fe'
                }, {
                  offset: 1,
                  color: '#0083c6'
                }]
              )
            }
          },
          zlevel: 5,
          z: 3,
          data: this.dataconfig.data || []
        }]
      }

      this.myChart.setOption(option)
    },
    clickBar(event) {
      if (event.seriesIndex === 0 || event.seriesIndex === 1) {
        this.selectedBar = this.selectedBar === event.name ? null : event.name
        this.upSelect()
        this.$emit('changeSelected', { bar: this.selectedBar })
      }
    },
    cancelSelect() {
      if (!this.selectedBar) { return }
      this.selectedBar = null
      this.upSelect()
      this.$emit('changeSelected', { bar: this.selectedBar })
    },
    upSelect() {
      let selectedBar = this.selectedBar
      this.myChart.setOption({
        xAxis: [{
          axisLabel: {
            color: (param) => {
              return selectedBar === param ? '#90EE90' : '#ff9d00'
            },
          }
        }],
        series: [{}, {
          itemStyle: {
            normal: {
              color: (param) => {
                let normalColor = new echarts.graphic.LinearGradient(
                  0, 0, 0, 1, [{
                    offset: 0,
                    color: '#77c0fe'
                  }, {
                    offset: 1,
                    color: '#0083c6'
                  }]
                ), selectedColor = new echarts.graphic.LinearGradient(
                  0, 0, 0, 1, [{
                    offset: 0,
                    color: '#77c0fe'
                  }, {
                    offset: 1,
                    color: '#90EE90'
                  }]
                )
                return param.name === selectedBar ? selectedColor : normalColor
              }
            }
          },
        }]
      })
    },
  },
  watch: {
    dataconfig: {
      handler() {
        let len = this.dataconfig.xAxis.length
        this.max = 0
        this.dataconfig.data.forEach(it => {
          this.max = it > this.max ? it : this.max;
        })
        this.myChart.setOption({
          xAxis: [{
            data: this.dataconfig.xAxis || []
          }],
          series: [{
            data: new Array(len).fill(this.max * 1.1)
          }, {
            name: this.dataconfig.name || '',
            data: this.dataconfig.data || [],
          }]
        })
        if (this.selectedBar) {
          this.upSelect()
        }
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
