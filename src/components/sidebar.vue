<template>
  <div>
    <!-- <i :class="[isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left']" @click="isCollapse = !isCollapse"></i> -->
    <el-menu class="el-menu-vertical-demo" @select="changeSelect" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-date"></i>
          <span slot="title">表格相关</span>
        </template>
        <el-menu-item index="sfTab1">SF-1</el-menu-item>
        <el-menu-item index="sfTab2">SF-2</el-menu-item>
        <el-menu-item index="fxqTab">FXQ</el-menu-item>
        <el-menu-item index="countryData">国家数据提取</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">图表效果</span>
        </template>
        <el-menu-item index="linearChart">渐变柱状图</el-menu-item>
        <el-menu-item index="piecewiseBar">分段渐变柱状图</el-menu-item>
        <el-menu-item index="targetPerson">单人靶向关系图</el-menu-item>
        <el-menu-item index="customMap">数据流向图</el-menu-item>
        <el-menu-item index="ringPie1">年轮饼图不均分</el-menu-item>
        <el-menu-item index="ringPie2">年轮饼图均分</el-menu-item>
        <el-menu-item index="echartsDataSet">Echarts Dataset</el-menu-item>
        <el-menu-item index="g2chart">g2测试图表</el-menu-item>
        <el-menu-item index="testD3">测试各种D3接口</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">页面效果</span>
        </template>
        <el-menu-item index="jianchu">dom渐出</el-menu-item>
        <el-menu-item index="BFCTest">BFC学习测试</el-menu-item>
        <el-menu-item index="pauseAnimate">CSS 动画暂停</el-menu-item>
        <el-menu-item index="floatLay1">FLoat 布局1</el-menu-item>
        <el-menu-item index="aboutBg">关于背景</el-menu-item>
        <el-menu-item index="menu">菜单nav</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    changeSelect(index) {
      this.$router.push({ name: index })
    }
  }
}
</script>
