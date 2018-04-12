<template>
  <div>
    <!-- 阅读学习 《CSS世界》 -->
    <div class="father">
      <div class="son"></div>
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
</style>
