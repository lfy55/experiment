<template>
  <div ref="targetPerson" id="targetPerson_wrap" class="chart">
    <div id="tooltip" :style="styleObj">
      <img src="./close2.png" alt="" @click="hideTooltip">
      <div id="content" v-html="tooltipHTML"></div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import custom_world from './custom_world.json'
import mark1 from './mark1.png'
import mark2 from './mark2.png'

export default {
  name: 'piecewiseBar',
  data() {
    return {
      styleObj: {},
      tooltipHTML: '',
    }
  },
  mounted() {
    var myScale = 1;
    var width = 800 * myScale;
    var height = 500 * myScale;

    var svg = d3.select(this.$refs.targetPerson)
      .append('svg')
      .attr('style', 'position:absolute;left:0;')
      .attr('width', width)
      .attr('height', height);

    var defs = svg.append('defs');
    // 添加渐变色
    var colorLinear1 = defs.append(`linearGradient`)
      .attr('id', 'myLineGradient1')
      .attr('x1', "0%")
      .attr('y1', "0%")
      .attr('x2', "100%")
      .attr('y2', "0%");

    colorLinear1.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#00FFFF');
    colorLinear1.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#C26C4E');

    var colorLinear2 = defs.append(`linearGradient`)
      .attr('id', 'myLineGradient2')
      .attr('x1', "0%")
      .attr('y1', "0%")
      .attr('x2', "100%")
      .attr('y2', "0%");

    colorLinear2.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#C26C4E');
    colorLinear2.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#00FFFF');
    // 添加标记
    var markSimpol = defs.append('marker')
      .attr('id', 'arrow')
      .attr('markerUnits', 'strokeWidth')
      .attr('markerWidth', '24')
      .attr('markerHeight', '24')
      .attr('viewBox', '0 0 12 12')
      .attr('refX', '6')
      .attr('refY', '6')
      .attr('orient', 'auto');

    markSimpol.append('path')
      .attr('d', 'M2,2 L10,6 L2,10 L6,6 L2,2')
      .style('fill', '#C26C4E');

    var projection = d3.geo.mercator()
      .center([101, 43])
      .scale(400 * myScale)
      .translate([width / 2, height / 2]);

    var fujian = projection([118.3008, 25.9277]);
    var yazhou = projection([70.21430218667948, 22.300373303363735]);
    var feizhou = projection([65.41307517569618, 39.43317479357172]);
    var ouzhou = projection([74.09327556432663, 54.155897172169]);
    var dayang = projection([135.19916505553044, 20.173776162360458]);
    var nanmei = projection([138.14780827018942, 38.3449760676111]);
    var beimei = projection([136.2156857060272, 54.97180241027518]);
    var pointList = [
      {
        name: 'fujian',
        cord: fujian,
        mark: mark2,
        value: 0
      },
      {
        name: 'yazhou',
        mark: mark1,
        cord: yazhou,
        value: 10,
        detail: [{
          name: '亚一',
          value: 10
        }]
      },
      {
        name: 'feizhou',
        mark: mark1,
        cord: feizhou,
        value: 90,
        detail: [
          {
            name: '非1',
            value: 10
          }, {
            name: '非2',
            value: 10
          }, {
            name: '非3',
            value: 10
          }, {
            name: '非4',
            value: 10
          }, {
            name: '非5',
            value: 10
          }, {
            name: '非6',
            value: 10
          }, {
            name: '非7',
            value: 10
          }, {
            name: '非8',
            value: 10
          }, {
            name: '非9',
            value: 10
          }
        ]
      },
      {
        name: 'ouzhou',
        mark: mark1,
        cord: ouzhou,
        value: 1000
      },
      {
        name: 'dayang',
        mark: mark1,
        cord: dayang,
        value: 10000
      },
      {
        name: 'nanmei',
        mark: mark1,
        cord: nanmei,
        value: 100000
      },
      {
        name: 'beimei',
        mark: mark1,
        cord: beimei,
        value: 1000000
      }
    ];
    var lineList = [yazhou, feizhou, ouzhou, dayang, nanmei, beimei];

    var path = d3.geo.path()
      .projection(projection);

    var diagonal = d3.svg.diagonal()
      .source(function (d) {
        return {
          x: d.cord[0],
          y: d.cord[1]
        };
      })
      .target({
        x: fujian[0],
        y: fujian[1]
      });

    var color = d3.scale.category20();

    var groups = svg.append('g');

    groups.selectAll('path')
      .data(custom_world.features)
      .enter()
      .append('path')
      .attr('class', 'province')
      .style('fill', '#1C7684')
      .attr('d', path)
      .on('click', function (d) {
        console.log(d);
        var area = path.area(d);
        var centroid = path.centroid(d);
        var bounds = path.bounds(d);

        console.log(area, centroid, bounds);
      });

    svg.selectAll('.myLine')
      .data(pointList.slice(1))
      .enter()
      .append('path')
      .attr('class', 'myLine')
      .attr('d', diagonal)
      .style('stroke', function (d) { // 使用渐变色
        if (d.name == 'yazhou' || d.name == 'ouzhou' || d.name == 'feizhou')
          return 'url(#myLineGradient1)';
        return 'url(#myLineGradient2)';
      })
      .style('stroke-dasharray', '5,5') // 使用虚线
      .style('stroke-width', 2)
      .style('fill', 'transparent')
      .on('mouseover', function (d) {
        // console.log(d);
        showTooltip(d);
      });

    svg.selectAll('.markLine')
      .data(pointList.slice(1))
      .enter()
      .append('line')
      .attr('x1', function (d) {
        return d.cord[0];
      })
      .attr('y1', function (d) {
        return d.cord[1];
      })
      .attr('x2', function (d) {
        return (d.cord[0] + fujian[0]) / 2;
      })
      .attr('y2', function (d) {
        return (d.cord[1] + fujian[1]) / 2;
      })
      .attr('marker-end', 'url(#arrow)'); // 使用标记

    svg.selectAll('.myMark')
      .data(pointList)
      .enter()
      .append('image')
      .attr('xlink:href', function (d, i) {
        return d.mark;
      })
      .attr('width', function (d) {
        if (d.name === 'fujian')
          return 112 * myScale;
        return 65 * myScale;
      })
      .attr('height', function (d) {
        if (d.name === 'fujian')
          return 123 * myScale;
        return 110 * myScale;
      })
      .attr('x', function (d) {
        if (d.name === 'fujian')
          return d.cord[0] - 56 * myScale;
        return d.cord[0] - 65 / 2 * myScale;
      })
      .attr('y', function (d) {
        if (d.name === 'fujian')
          return d.cord[1] - 73 * myScale;
        return d.cord[1] - 110 * myScale;
      })
      .on('mouseover', function (d) {
        showTooltip(d, d3.event);
      });

    svg.selectAll('.myNum')
      .data(pointList)
      .enter()
      .append('text')
      .attr('class', 'myNum')
      .attr('x', function (d) {
        return d.cord[0];
      })
      .attr('y', function (d) {
        return d.cord[1] - 64 * myScale;
      })
      .attr('dx', function (d) {
        return d.value.toString().length * (-5.3 * myScale);
      })
      .attr('dy', 0)
      .attr('font-size', 22 * myScale + 'px')
      .text(function (d) {
        if (d.name === 'fujian')
          return '';
        return d.value;
      });

    var _this = this
    function showTooltip(data) {
      if (data.name === 'fujian')
        return;

      var styleObj = {
        'visibility': 'visible'
      };

      switch (data.name) {
        case 'yazhou':
          styleObj.top = data.cord[1] - 90 * myScale + 'px';
          styleObj.left = data.cord[0] + 32.5 * myScale + 'px';
          break;
        case 'feizhou':
          styleObj.top = data.cord[1] - 90 * myScale + 'px';
          styleObj.left = data.cord[0] + 32.5 * myScale + 'px';
          break;
        case 'ouzhou':
          styleObj.top = data.cord[1] - 90 * myScale + 'px';
          styleObj.left = data.cord[0] + 32.5 * myScale + 'px';
          break;
        case 'beimei':
          styleObj.top = data.cord[1] - 90 * myScale + 'px';
          styleObj.left = data.cord[0] - 150 - 32.5 * myScale + 'px';
          break;
        case 'nanmei':
          styleObj.top = data.cord[1] - 90 * myScale + 'px';
          styleObj.left = data.cord[0] - 150 - 32.5 * myScale + 'px';
          break;
        case 'dayang':
          styleObj.top = data.cord[1] - 90 * myScale + 'px';
          styleObj.left = data.cord[0] - 150 - 32.5 * myScale + 'px';
          break;
        default:
          styleObj.visibility = 'hidden';
      }

      var code = '';
      if (data.detail) {
        data.detail.forEach(item => {
          code += `<div class="item">
                <span class="name">${item.name}</span>
                <span class="value">${item.value}</span>
            </div>`;
        });
      }

      _this.tooltipHTML = code
      _this.styleObj = styleObj
    }
  },
  methods: {
    hideTooltip() {
      this.styleObj = {
        'visibility': 'hidden'
      }
    },
  },
}
</script>

<style scoped>
#targetPerson_wrap {
  position: relative;
}

.province {
  stroke: black;
  stroke-width: 1px;
}

.myNum {
  fill: #ffffff;
}

#tooltip {
  position: absolute;
  width: 150px;
  max-height: 100px;
  z-index: 99;
  box-sizing: border-box;
  border: solid 1px #006d6d;
  box-shadow: 0px 0px 3px #006d6d;
  background: rgba(106, 181, 129, 0.4);
  padding: 0px 5px;
  visibility: hidden;
  overflow-y: auto;
}

#tooltip::-webkit-scrollbar-track {
  width: 5px;
  background-color: transparent;
}

#tooltip::-webkit-scrollbar {
  width: 5px;
  background-color: transparent;
}

#tooltip::-webkit-scrollbar-thumb {
  background-color: #00b7a9;
  border-radius: 3px;
}

#tooltip #content {
  min-height: 20px;
}

#tooltip img {
  position: absolute;
  width: 15px;
  height: 15px;
  top: -1px;
  right: 0px;
  cursor: pointer;
}

#tooltip .item {
  margin: 5px 0px;
  color: #6be1e2;
  text-align: center;
}

#tooltip .item .value {
  margin-left: 30px;
}
</style>
