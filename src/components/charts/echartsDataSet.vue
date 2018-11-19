<template>
  <div>
    <div ref="datasetChart" class="min-chart">

    </div>

    <el-button type="primary" @click="change">切换为{{isBar?'折线图':'柱状图'}}</el-button>
    <el-button type="primary" @click="mySort(1)">从小到大</el-button>
    <el-button type="primary" @click="mySort(-1)">从大到小</el-button>
    <el-checkbox v-model="chooseed">框选区域</el-checkbox>
    <p> 双击图表修改数据：{{selectedItem}}：
      <el-input-number v-show="!!selectedItem" :value="selectedValue" @input="upnumber"></el-input-number>
      <el-button type="primary" v-show="!!selectedItem" @click="upData">刷新图表</el-button>
    </p>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'echartsDataset',
  data() {
    return {
      myChart: null,
      myData: [{ genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }],
      isBar: true,
      selected: -1,
      selectedSeries: -1,
      chooseed: false
    }
  },
  computed: {
    selectedItem() {
      if (this.selected < 0) {
        return ''
      } else {
        return this.myData[this.selected].genre
      }
    },
    selectedValue() {
      if (this.selected < 0) {
        return 0
      } else {
        return this.myData[this.selected].sold
      }
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.datasetChart)

    this.drawChart()
  },
  methods: {
    upData() {
      this.myChart.setOption({
        dataset: {
          source: this.myData
        }
      })
    },
    upnumber(value) {
      if (this.selected < 0) {
        return
      }
      this.myData[this.selected].sold = value
    },
    drawChart() {
      this.myChart.setOption({
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              name: 'img'
            },
            dataZoom: {
              show: true,
            },
            magicType: {
              show: true,
              type: ['line', 'bar', 'stack']
            },
          },
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
        },
        dataset: {
          dimensions: [
            { name: 'genre', type: 'ordinal' },
            { name: 'sold', type: 'number' },
          ],
          source: this.myData
        },
        series: [{
          id: 1,
          type: 'bar',
          emphasis: {
            label: {
              show: true,
              position: 'top'
            },
            itemStyle: {
              color: '#aaaaaa',
              shadowColor: '#333333',
              shadowBlur: 5,
            }
          }
          // seriesLayoutBy: 'row'
        }]
      })

      this.myChart.on('dblclick', e => {
        console.log(e)
        this.myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: this.selectedSeries,
          dataIndex: this.selected,
        })
        this.selected = e.dataIndex
        this.selectedSeries = e.seriesIndex
        this.myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: e.seriesIndex,
          dataIndex: e.dataIndex,
        })
      })
    },
    change() {
      let option = this.myChart.getOption()
      if (this.isBar) {
        option.series[0].type = 'line'
      } else {
        option.series[0].type = 'bar'
      }
      this.myChart.setOption({ series: option.series })
      this.isBar = !this.isBar
    },
    mySort(param) {
      this.myData.sort((a, b) => {
        if (a.sold - b.sold > 0) {
          return param
        } else if (a.sold - b.sold < 0) {
          return -1 * param
        } else {
          return 0
        }
      })
      this.upData()
    },
    reset() {
      this.myChart.dispatchAction({ type: 'restore' })
    }
  },
  watch: {
    chooseed() {
      if (this.chooseed) {

      } else {
        this.reset()
      }
    }
  },
}
</script>

