<template>
  <div>
    <!-- 阅读学习 《CSS世界》 -->
    <div class="father">
      <div class="son"></div>
    </div>
    <p>两列等高布局</p>
    <div class="container">
      <div class="left">我是left</div>
      <div class="right">我是right<br><br><br>现在我的高度比left高，但left用它的padding-bottom补偿了这部分高度</div>
      <div style="clear:both"></div>
    </div>
    <p>line-height让单行多行文字水平垂直居中</p>
    <div class="one-line">单行居中</div>
    <div class="more-lines">
      <div class="line-content">多行<br>文字</div>
    </div>
    <h2>浮动学习</h2>
    <div class="father_1">
      <div class="float_1">
        <img src="./mapBorder.png" alt="">自适应
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>

<style scoped>
.father {
  width: 300px;
  height: 150px;
  position: relative;
  background: antiquewhite;
}
.son {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  height: 100px;
  background: sandybrown;
  margin: auto;
}
.container {
  margin: 0 auto;
  width: 600px;
  border: 3px solid #00c;
  overflow: hidden; /*这个超出隐藏的声明在IE6里不写也是可以的*/
}
.left {
  float: left;
  width: 150px;
  background: #b0b0b0;
  padding-bottom: 2000px;
  margin-bottom: -2000px;
}
.right {
  float: left;
  width: 450px;
  background: #6cc;
  padding-bottom: 2000px;
  margin-bottom: -2000px;
}
.one-line,
.more-lines {
  line-height: 36px;
  background: aqua;
  text-align: center;
  border: #00c solid;
}
.more-lines {
  line-height: 120px;
}
.more-lines > .line-content {
  display: inline-block;
  line-height: 20px;
  vertical-align: middle;
}
.father_1 {
  width: 200px;
}
.float_1 {
  float: left;
}
.float_1 img {
  width: 128px;
}
</style>
