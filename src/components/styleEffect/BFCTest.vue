<template>
  <div id="bfc">
    <p>1.BFC 会阻止外边距折叠 两个相连的 div 在垂直上的外边距会发生叠加</p>
    <div id="test1">
      <div class="margin-10">我有10px的margin</div>
      <div class="margin-10">我有10px的margin</div>
    </div>
    <p>2.两列布局的方法</p>
    <p>float方式</p>
    <p>问题是左侧宽度不够灵活，不同的左侧宽度需要修改布局代码</p>
    <div class="lay-float">
      <div class="lay-l">我是一个左侧固定宽度的元素，我向左浮动</div>
      <div class="lay-r">我是右侧宽度不定的元素，我跟左侧元素产生了一个流动的两列布局</div>
    </div>
    <p>BFC方式</p>
    <div class="lay-bfc">
      <div class="lay-l">我是一个左侧固定宽度的元素，我向左浮动</div>
      <div class="lay-r">我是右侧宽度不定的元素，我跟左侧元素产生了一个流动的两列布局，为此元素生成 BFC 以后lay-l的浮动将不能影响到当前元素，所以当前元素不会产生环绕</div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>
#bfc {
  width: 1200px;
  height: 800px;
  overflow: auto;
  text-align: left;
}
#test1 {
  width: 500px;
  border: 1px #ffbb00 solid;
  overflow: hidden;
}
.margin-10 {
  width: 300px;
  background: #999;
  height: 20px;
  margin: 10px;
  overflow: hidden;
  float: left;
}
.lay-float,
.lay-bfc {
  width: 600px;
  background-color: #eee;
  overflow: auto;
  resize: both;
}
.lay-float > .lay-l {
  /* 保证元素在左侧即可，float 与 position 属性都可以 */
  float: left;
  width: 150px;
  background: #eee;
  box-sizing: border-box;
  border: #ffbb00 1px solid;
}
.lay-float > .lay-r {
  /* margin-left 的值需要跟随左侧元素的宽度变化而变化才能生成两列布局 */
  margin-left: 180px;
}
.lay-bfc > .lay-l {
  width: 200px;
  background: #eee;
  box-sizing: border-box;
  border: #ffbb00 1px solid;
  margin-right: 30px;
  /* 只能使用浮动，不能使用绝对定位来让左侧列固定 */
  float: left;
}
.lay-bfc > .lay-r {
  /* overflow来生成BFC不够合适，探寻其他能够生成BFC的方法 */
  /* 为此元素生成 BFC 以后lay-l的浮动将不能影响到当前元素，所以当前元素不会产生环绕 */
  /* http://www.zhangxinxu.com/wordpress/2015/02/css-deep-understand-flow-bfc-column-two-auto-layout/ */
  /* overflow: auto; */

  display: table-cell;
  width: 9999px;
  *display: inline-block;
  *width: auto;
}
</style>
