<template>
  <div ref="targetPerson" id="targetPerson_wrap" class="chart">
    <div class="tooltip" v-text="tooltip" :style="tooltipStyle"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'piecewiseBar',
  data() {
    return {
      dataConfig: {
        max: 30,
        min: 0,
        nodes: [
          {
            name: 'a',
            isCenter: true,
            value: 0
          }, {
            name: 'b',
            value: 12
          }, {
            name: 'c',
            value: 6
          }, {
            name: 'd',
            value: 20
          }, {
            name: 'e',
            value: 29
          }, {
            name: 'f',
            value: 17
          }, {
            name: 'g',
            value: 6
          }, {
            name: 'h',
            value: 4
          }, {
            name: 'i',
            value: 0
          }, {
            name: 'j',
            value: 22
          }, {
            name: 'k',
            value: 6
          }, {
            name: 'l',
            value: 18
          }, {
            name: 'm',
            value: 4
          }, {
            name: 'n',
            value: 9
          }, {
            name: 'n',
            value: 9
          }, {
            name: 'n',
            value: 9
          }, {
            name: 'n',
            value: 9
          }, {
            name: 'n',
            value: 9
          }, {
            name: 'n',
            value: 9
          }, {
            name: 'n',
            value: 9
          },
        ],
        links: [
          {
            source: 0,
            target: 1
          }, {
            source: 0,
            target: 2
          }, {
            source: 0,
            target: 3
          }, {
            source: 0,
            target: 4
          }, {
            source: 0,
            target: 5
          }, {
            source: 0,
            target: 6
          }, {
            source: 0,
            target: 7
          }, {
            source: 0,
            target: 8
          }, {
            source: 0,
            target: 9
          }, {
            source: 0,
            target: 10
          }, {
            source: 0,
            target: 11
          }, {
            source: 0,
            target: 12
          }, {
            source: 0,
            target: 13
          }, {
            source: 0,
            target: 14
          }, {
            source: 0,
            target: 15
          }, {
            source: 0,
            target: 16
          }, {
            source: 0,
            target: 17
          }, {
            source: 0,
            target: 18
          }, {
            source: 0,
            target: 19
          },
        ]
      },
      styleConfig: {
        width: 1200,
        height: 800,
      },
      tooltip: '',
      tooltipStyle: {
        top: '0px',
        left: '0px',
        visibility: 'hidden'
      },
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      var _this = this
      var temp = Math.floor((this.dataConfig.max - this.dataConfig.min) / 3);
      var scoreData = ['一级关系', '二级关系', '三级关系'];
      var hScale = this.styleConfig.height / 400;
      var wScale = this.styleConfig.width / 400;
      var h = 400 * hScale;
      var w = 400 * wScale;

      var myScale = 0;
      myScale = hScale > wScale ? wScale : hScale;

      d3.select(this.$refs.targetPerson).selectAll("svg").remove();

      var svg = d3.select(this.$refs.targetPerson).append("svg")
        // .attr("width", w)
        //          .attr("height", h);
        .attr("style", 'position:absolute;width:100%;height:100%;left:0;')
        .attr("preserveAsPectRaTio", "xMaxYMid slice")
        .attr("viewBox", "0 0 " + w + " " + h);

      // var tooltip = d3.select(_this.$el).append("");

      var force = d3.layout.force()
        .nodes(this.dataConfig.nodes)
        .links(this.dataConfig.links)
        .size([w - 25, h + 20])
        .linkDistance(d => {
          var lineLong = 150 * myScale;
          if (d.target.value > (this.dataConfig.min + 2 * temp)) {
            lineLong = 50 * myScale;
          } else if (d.target.value <= (this.dataConfig.min + 2 * temp) && d.target.value > (this.dataConfig.min + temp)) {
            lineLong = 100 * myScale;
          } else if (d.target.value <= (this.dataConfig.min + temp)) {
            lineLong = 150 * myScale;
          }
          return lineLong;
        })
        .friction(0.5)
        .charge(-300 * myScale);

      force.start();
      // console.log(dataset);

      svg.append("circle")
        .attr("class", "bg")
        .attr("fill", "none")
        .attr("stroke", "rgba(38, 46, 146, 0.8)")
        //.attr("opacity", 0)
        .attr("cx", w / 2 - 50)
        .attr("cy", h / 2 + 20)
        .attr("r", 150 * myScale);

      svg.append("circle")
        .attr("class", "bg")
        .attr("fill", "none")
        .attr("stroke", "rgba(38, 46, 146, 0.8)")
        //.attr("opacity", 0)
        .attr("cx", w / 2 - 50)
        .attr("cy", h / 2 + 20)
        .attr("r", 100 * myScale);

      svg.append("circle")
        .attr("class", "bg")
        .attr("fill", "none")
        .attr("stroke", "rgba(38, 46, 146, 0.8)")
        //.attr("opacity", 0)
        .attr("cx", w / 2 - 50)
        .attr("cy", h / 2 + 20)
        .attr("r", 50 * myScale);

      svg.append("circle")
        .attr("class", "bg")
        .attr("fill", "none")
        .attr("stroke", "rgba(38, 46, 146, 0.8)")
        //.attr("opacity", 0)
        .attr("cx", w / 2 - 50)
        .attr("cy", h / 2 + 20)
        .attr("r", 10 * myScale);

      var edges = svg.selectAll(".svg-line")
        .data(this.dataConfig.links)
        .enter()
        .append("line")
        .attr("class", "svg-line")
        .style("stroke", "rgba(38, 46, 146, 0.8)")
        .style("opacity", 0.3)
        .style("stroke-width", 1 * myScale);

      var nodes = svg.selectAll(".svg-node")
        .data(this.dataConfig.nodes)
        .enter()
        .append("circle")
        .attr("class", "svg-node")
        .attr("r", function (d) {
          if (d.isCenter) {
            return 10 * myScale;
          }
          return 5 * myScale;
        })
        .style("fill", d => {
          if (d.value > (this.dataConfig.min + 2 * temp)) {
            return "#e67f00";
          } else if (d.value <= (this.dataConfig.min + 2 * temp) && d.value > (this.dataConfig.min + temp)) {
            return "#339192";
          } else if (d.value <= (this.dataConfig.min + temp)) {
            return "#008aea";
          }
          if (d.isCenter) {
            return "#e00";
          }
        })
        // .on("click", function (d) {
        //   // draw.openOneDlgDiv(d.nodes[0].nodeId, d.nodes[0].nodeType);
        // })
        .call(force.drag);

      // 图例图形
      svg.selectAll(".svg-legend")
        .data(scoreData)
        .enter()
        .append("circle")
        .attr("class", "svg-legend")
        .attr("fill", function (d) {
          if (d == "一级关系") {
            return "#008aea";
          }
          if (d == "二级关系") {
            return "#339192";
          }
          if (d == "三级关系") {
            return "#e67f00";
          }
        })
        .attr("cx", (w - 150 * myScale))
        .attr("cy", d => {
          if (d == "一级关系") {
            return 200 * 0.4 * myScale;
          }
          if (d == "二级关系") {
            return (200 * 0.4 + 25) * myScale;
          }
          if (d == "三级关系") {
            return (200 * 0.4 + 25 * 2) * myScale;
          }
        })
        .attr("r", 5 * myScale);

      // 图例文字
      svg.selectAll(".svg-legend-text")
        .data(scoreData)
        .enter()
        .append("text")
        .attr("class", "svg-legend-text")
        .attr("fill", d => {
          if (d == "一级关系") {
            return "#008aea";
          }
          if (d == "二级关系") {
            return "#339192";
          }
          if (d == "三级关系") {
            return "#e67f00";
          }
        })
        .attr("font-size", 14 * myScale + 'px')
        //.attr("text-anchor", "middle")
        .attr("x", w)
        .attr("y", d => {
          if (d == "一级关系") {
            return 200 * 0.4 * myScale;
          }
          if (d == "二级关系") {
            return (200 * 0.4 + 25) * myScale;
          }
          if (d == "三级关系") {
            return (200 * 0.4 + 25 * 2) * myScale;
          }
        })
        .attr("dy", "0.3em")
        .attr("dx", "-8.5em")
        .text(d => {
          if (d == "一级关系") {
            return "亲密度:[0," + (this.dataConfig.min + temp) + "]";
          }
          if (d == "二级关系") {
            return "亲密度:(" + (this.dataConfig.min + temp) + "," + (this.dataConfig.min + 2 * temp) + "]";
          }
          if (d == "三级关系") {
            return "亲密度:(" + (this.dataConfig.min + 2 * temp) + ", *)";
          }
        });

      force.on("tick", function () {
        _this.dataConfig.nodes.forEach(function (item) {
          if (item.isCenter) {
            item.x = w / 2 - 50;
            item.y = h / 2 + 20;
          }
        });

        edges.attr("x1", function (d) {
          return d.source.x;
        })
          .attr("y1", function (d) {
            return d.source.y;
          })
          .attr("x2", function (d) {
            return d.target.x;
          })
          .attr("y2", function (d) {
            return d.target.y;
          });

        nodes.attr("cx", function (d) {
          return d.x;
        })
          .attr("cy", function (d) {
            return d.y;
          });
      });
      force.on("start", function () {
        console.log("start");
      });
      force.on("end", function () {
        console.log("end");
      });

      nodes.on("mouseover", function (d) {
        // console.log(d);
        // console.log(d3.event);
        _this.tooltip = '关系人:' + d.name + "   亲密度:" + d.value;
        _this.tooltipStyle = {
          top: d3.event.offsetY + 10 + 'px',
          left: d3.event.offsetX + 10 + 'px',
          visibility: 'visible'
        };
      });
      nodes.on("mousemove", function () {
        _this.tooltipStyle = {
          top: d3.event.offsetY + 10 + 'px',
          left: d3.event.offsetX + 10 + 'px',
          visibility: 'visible'
        };
      });
      nodes.on("mouseout", function () {
        _this.tooltipStyle = {
          visibility: 'hidden'
        }
      });
    },
  }
}
</script>

<style scoped>
#targetPerson_wrap {
  position: relative;
}
.tooltip {
  position: absolute;
  padding: 3px 5px;
  width: 100px;
  height: auto;
  border: solid 1px #00adfe;
  border-radius: 5px;
  color: #fff;
  background-color: #666;
  z-index: 99;
}
</style>
