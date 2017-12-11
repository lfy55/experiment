<template>
  <div class="chart" ref="ringPie" id="relation-div">
    <div class="tooltip" v-html="tooltip" :style="tooltipStyle">
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'piecewiseBar',
  data() {
    return {
      tooltip: '',
      tooltipStyle: {
        width: '200px',
        top: '0px',
        left: '0px',
        visibility: 'hidden'
      },
      dataConfig: null,
      styleConfig: {
        width: 800,
        height: 800
      }
    }
  },
  mounted() {
    this.dataConfig = this.getD()

    this.upDate()
  },
  methods: {
    getD() {
      var myData = [
        {
          name: '4月1号',
          data: []
        }, {
          name: '4月2号',
          data: []
        }, {
          name: '4月3号',
          data: []
        }, {
          name: '4月4号',
          data: []
        }, {
          name: '4月5号',
          data: []
        }, {
          name: '4月6号',
          data: []
        }, {
          name: '4月7号',
          data: []
        },
      ];
      myData.forEach((item, index) => {
        for (let i = 0; i < 12; i++) {
          item.data.push({
            name: i * 2 + 'H - ' + (i * 2 + 2) + 'H',
            value: 1,
            data: [{
              name: index + 'a',
              value: 1,
              num: Math.floor(Math.random() * 5)
            }, {
              name: index + 'b',
              value: 1,
              num: Math.floor(Math.random() * 5)
            }, {
              name: index + 'c',
              value: 1,
              num: Math.floor(Math.random() * 5)
            }, {
              name: index + 'd',
              value: 1,
              num: Math.floor(Math.random() * 5)
            }]
          });
        }
      });

      return myData;
    },
    upDate() {
      var hScale = this.styleConfig.height / 600;
      var wScale = this.styleConfig.width / 800;
      var height = 600 * hScale;
      var width = 800 * wScale;

      d3.select(this.$refs.ringPie).selectAll("svg").remove();
      var svg = d3.select(this.$refs.ringPie).append("svg")
        .attr("style", 'position:absolute;width:100%;height:100%;left:0;')
        .attr("preserveAsPectRaTio", "xMaxYMid slice")
        .attr("viewBox", "0 0 " + width + " " + height);

      var baseouter = (height - 60) / 2;
      var baseinner = 0;
      var baseNum = (baseouter - baseinner) / 10;


      for (let x = 0; x < this.dataConfig.length; x++) {
        let index = x;
        let inner = 0;
        let outer = 0;
        inner = baseinner + (index + 3) * baseNum;
        outer = baseinner + (index + 4) * baseNum;

        let pie = d3.layout.pie()
          .sort(null)
          .value(function (d) {
            return d.value;
          });

        let piedata = pie(this.dataConfig[index].data);

        for (let i = 0; i < piedata.length; i++) {
          let subpie = d3.layout.pie()
            .sort(null)
            .startAngle(piedata[i].startAngle)
            .endAngle(piedata[i].endAngle)
            .value(function (d) {
              return d.value;
            });
          piedata[i].subData = subpie(piedata[i].data.data);
        }
        let arc = d3.svg.arc()
          .innerRadius(inner)
          .outerRadius(outer);

        let arcs = svg.selectAll('.g' + index)
          .data(piedata)
          .enter()
          .append('g')
          .attr('class', 'g' + index)
          .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

        let path = arcs.append("path")
          .attr("fill", "rgba(0,0,0,0)")
          .attr("stroke", function (d, i) {
            return '#ff0000'; // 边框颜色
          })
          .attr("stroke-width", '1px')
          .attr("d", function (d) {
            // console.log(d);
            return arc(d);
          });

        // 添加刻度和标识


        if (index === 0) {
          let markArc = svg.selectAll('.g-mark')
            .data(piedata)
            .enter()
            .append('g')
            .attr('class', 'g-mark')
            .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
          markArc.append("line")
            .attr("stroke", "#f00")
            .attr("stroke-width", "1px")
            .attr("x1", function (d) {
              return baseouter * (Math.sin(d.startAngle));
            })
            .attr("y1", function (d) {
              return baseouter * (Math.cos(d.startAngle));
            })
            .attr("x2", function (d) {
              return (baseouter + 10) * (Math.sin(d.startAngle));
            })
            .attr("y2", function (d) {
              return (baseouter + 10) * (Math.cos(d.startAngle));
            });

          markArc.append("text")
            .attr("x", function (d) {
              return (baseouter + 20) * (Math.sin(d.startAngle));
            })
            .attr("y", function (d) {
              return -(baseouter + 20) * (Math.cos(d.startAngle));
            })
            //.attr("text-anchor","middle")
            .attr("dx", "-4")
            .attr("dy", "5")
            .text(function (d, i) {
              return i * 2;
            });
        }

        let path1 = arcs.append("path")
          .attr("fill", function (d, i) {
            return '#2d80fe'; // 第一个小格
          })
          .attr("opacity", function (d) {
            return d.subData[0].data.num * 0.2;
          })
          .attr("d", function (d) {
            // console.log(d);
            return arc(d.subData[0]);
          });
        let path2 = arcs.append("path")
          .attr("fill", function (d, i) {
            return '#d442f8'; // 第二个小格
          })
          .attr("opacity", function (d) {
            return d.subData[1].data.num * 0.2;
          })
          .attr("d", function (d) {
            // console.log(d);
            return arc(d.subData[1]);
          });

        let path3 = arcs.append("path")
          .attr("fill", function (d, i) {
            return '#f89406';// 第三个小格
          })
          .attr("opacity", function (d) {
            return d.subData[2].data.num * 0.2;
          })
          .attr("d", function (d) {
            // console.log(d);
            return arc(d.subData[2]);
          });
        let path4 = arcs.append("path")
          .attr("fill", function (d, i) {
            return '#29e926';// 第四个小格
          })
          .attr("opacity", function (d) {
            return d.subData[3].data.num * 0.2;
          })
          .attr("d", function (d) {
            // console.log(d);
            return arc(d.subData[3]);
          });

        arcs.on("mouseover", d => {
          console.log(d);
          // console.log(d3.event);
          this.tooltip = this.dataConfig[index].name + ' ' + d.data.name + ': <br>'
            + d.subData[0].data.name + ':' + d.subData[0].data.num + '<br>'
            + d.subData[1].data.name + ':' + d.subData[1].data.num + '<br>'
            + d.subData[2].data.name + ':' + d.subData[2].data.num + '<br>'
            + d.subData[3].data.name + ':' + d.subData[3].data.num;
          this.tooltipStyle.top = d3.event.offsetY + 10 + 'px';
          this.tooltipStyle.left = d3.event.offsetX + 10 + 'px';
          this.tooltipStyle.visibility = 'visible';
        })
          .on("mousemove", d => {
            this.tooltipStyle.top = d3.event.offsetY + 10 + 'px';
            this.tooltipStyle.left = d3.event.offsetX + 10 + 'px';
          })
          .on("mouseout", _ => {
            this.tooltipStyle.visibility = 'hidden';
          });
      }
    }
  },
}
</script>

<style scoped>
#relation-div {
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
