<template>
  <div>
    <p>测试各种D3的接口</p>
    <p>颜色插值</p>
    <span>颜色1：</span>
    <el-color-picker v-model="color1"></el-color-picker>
    <span>颜色2：</span>
    <el-color-picker v-model="color2"></el-color-picker>
    <div class="slider-margin">
      <span>选择条:</span>
      <el-slider v-model="scaleValue" :format-tooltip="formatTooltip"></el-slider>
    </div>
    <div>
      结果颜色：
      <div class="resultColor" :style="{background: interpolateColor}"></div>
    </div>
    <p>过渡效果</p>
    延迟时间：
    <el-input-number v-model="tranDelay" :step="100"></el-input-number>ms
    <br>持续时间：
    <el-input-number v-model="tranDuration" :step="100"></el-input-number>ms
    <br>过渡样式：
    <el-select v-model="tranEase" placeholder="请选择过渡样式">
      <el-option v-for="ease in eases" :key="ease.value" :label="ease.label" :value="ease.value">
      </el-option>
    </el-select>
    <br>
    <el-button type="primary" @click="startTransition">开始过渡</el-button>
    <div id="transitionTarget" ref="transitionTarget"></div>
  </div>
</template>

<script>
import d3 from 'd3'

export default {
  name: 'testD3',
  data() {
    return {
      color1: '#ff0000',
      color2: '#ffffff',
      scaleValue: 0,
      tranDelay: 0,
      tranDuration: 2000,
      eases: [{ value: 'linear', label: '线性变化' },
      { value: 'cubic', label: '速度逐渐变快（默认）' },
      { value: 'elastic', label: '弹簧效果' },
      { value: 'back', label: '先往回缩' },
      { value: 'bounce', label: '在终点弹跳' },
      { value: 'in', label: '正方向' },
      { value: 'out', label: '反方向' },
      { value: 'in-out', label: '一半正一半反' },
      { value: 'out-in', label: '一半反一半正' }],
      tranEase: 'cubic',
      tranTarget: null,
    }
  },
  mounted() {
    this.tranTarget = d3.select(this.$refs.transitionTarget)
  },
  computed: {
    interpolateColor() {
      return d3.interpolateRgb(d3.rgb(this.color1), d3.rgb(this.color2))(this.scaleValue / 100)
    },
  },
  methods: {
    formatTooltip(val) {
      return val / 100;
    },
    startTransition() {
      console.log(this.$refs.transitionTarget)
      d3.select(this.$refs.transitionTarget).style('width', '100px')
        .transition()
        .delay(this.tranDelay)
        .duration(this.tranDuration)
        .ease(this.tranEase)
        .style('width', '300px')
    },
  },
}
</script>

<style scoped>
.slider-margin {
  max-width: 200px;
}
.resultColor {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 1px solid #999;
  box-shadow: 0px 10px 10px -5px #999;
}
#transitionTarget {
  margin: 10px 0;
  width: 100px;
  height: 50px;
  border: 1px solid #999;
  box-shadow: 0px 10px 10px -5px #999;
}
</style>
