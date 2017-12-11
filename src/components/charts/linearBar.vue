<template>
  <div ref="linearBar" class="chart">

  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "linearBar",
  data() {
    return {
      barData: [],
      axis: [],
      myChart: null
    };
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.linearBar);
    this.initData();
    this.drawChart();
  },
  methods: {
    initData() {
      this.axis = [];
      this.barData = [];
      for (let index = 0; index < 18; index++) {
        this.axis.push(`项目${index}`);
        this.barData.push(~~(Math.random() * 30));
      }
    },
    drawChart() {
      let maxData = 0,
        length = this.axis.length;
      this.barData.forEach(item => (item > maxData ? (maxData = item) : 0));
      maxData = maxData * 1.1;

      let option = {
        backgroundColor: "#999999",
        title: {
          show: false
        },
        tooltip: {
          show: true
        },
        xAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          data: this.axis,
          inverse: true,
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            // For shadow
            type: "bar",
            itemStyle: {
              normal: { color: "rgba(0,0,0,0.05)" }
            },
            barGap: "-100%",
            barCategoryGap: "80%",
            data: this.barData.map((item, index) => {
              return {
                value: maxData,
                real: item,
                label: {
                  normal: {
                    color: index > 5 ? '#fff' : '#000'
                  },
                },
              };
            }),
            label: {
              normal: {
                show: true,
                position: "insideRight",
                formatter: function (params) {
                  return params.data.real;
                }
              }
            },
            tooltip: {
              show: false
            },
            animation: false
          },
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: "#01a2d8" },
                    { offset: 1, color: "#024465" }
                  ]
                }
              }
            },
            data: this.barData
          }
        ]
      };

      this.myChart.setOption(option);
    }
  }
}
</script>