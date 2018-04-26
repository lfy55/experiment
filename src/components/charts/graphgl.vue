<template>
  <div ref="graphgl" class="chart">

  </div>
</template>

<script>
import echarts from "echarts"
import 'echarts-gl'

export default {
  name: "graphgl",
  data() {
    return {
      nodes: [],
      links: [],
      categories: [{ name: 'HTMLElement' }, { name: 'WebGL' }, { name: 'SVG' }, { name: 'CSS' }, { name: 'Other' }],
      myChart: null
    };
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.graphgl);
    this.initData();
    this.drawChart();
  },
  methods: {
    initData() {
      this.nodes = [];
      this.links = [];
      for (let index = 0; index < 1500; index++) {
        this.nodes.push({
          name: `name-${index}`,
          id: index,
          value: Math.floor(Math.random() * 5),
          category: Math.floor(Math.random() * 4),
        })
      }
      for (let index = 0; index < 4500; index++) {
        this.links.push({
          source: Math.floor(Math.random() * 1500),
          target: Math.floor(Math.random() * 1500),
        })
      }
    },
    drawChart() {
      let option = {
        legend: {
          data: ['HTMLElement', 'WebGL', 'SVG', 'CSS', 'Other']
        },
        series: [{
          type: 'graphGL',
          layout: 'forceAtlas2',
          forceAtlas2: {
            GPU: false,
            stopThreshold: 5,
            barnesHutOptimize: true,
            linLogMode: true
          },
          focusNodeAdjacency: false,
          symbolSize: 12,
          draggable: false,
          focusNodeAdjacency: true,
          legendHoverLink: false,
          data: this.nodes,
          categories: this.categories,
          edges: this.links
        }]
      }

      this.myChart.setOption(option)
    }
  }
}
</script>