<template>
  <div>
    <div ref="g2Chart" id="c1" class="g2Chart">

    </div>
    <el-button type="primary" @click="order">逆序</el-button>
  </div>
</template>

<script>
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'

G2.track(false)

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 }
]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
// step1 创建 dataset 指定状态量
const ds = new DataSet({
  state: {
    order: 1
  }
});

// step2 创建 DataView
const dv = ds.createView().source(data);

dv.transform({
  type: 'sort',
  callback(a, b) {
    return (a.sold - b.sold) * ds.state.order
  },
});

// // step3 引用 DataView
// chart.source(dv);

// // step4 更新状态量
// ds.setState('year', '2012');
export default {
  name: 'g2',
  data() {
    return {
      chart: null,
    }
  },
  mounted() {
    // Step 1: 创建 Chart 对象
    this.chart = new G2.Chart({
      container: this.$refs.g2Chart, // 指定图表容器 ID
      width: 600, // 指定图表宽度
      height: 300 // 指定图表高度
    });
    // Step 2: 载入数据源
    this.chart.source(dv);
    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    this.chart.interval().position('genre*sold').color('genre')
    // Step 4: 渲染图表
    this.chart.render();

    console.log(dv)
  },
  methods: {
    order() {
      ds.setState('order', ds.state.order * -1);
    }
  },
}
</script>

<style scoped>
.g2Chart {
  width: 100%;
  height: 100%;
  text-align: left;
}
</style>
