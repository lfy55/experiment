<template>
  <div>
    <div class="float-lay1">
      <div class="block h-2"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="c-r"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
    </div>
    <div class="float-lay2">
      <div class="block"></div>
      <div class="block n-float"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.float-lay1,.float-lay2 {
  resize: horizontal;
  border: 1px solid palegreen;
  overflow: hidden;
  width: 600px;
}
.float-lay2 {
  margin-top: 30px;
}
.block {
  width: 100px;
  height: 200px;
  background: #ccc;
  margin: 10px;
  box-shadow: 2px 2px 5px #aaa;
  float: left;
}
.n-float {
  float: none;
  margin-left: 30px;
  background: #f66;
}
.block.h-2 {
  height: 420px;
}
.c-r {
  width: 100px;
  height: 420px;
  background: salmon;
  margin: 10px;
  box-shadow: 2px 2px 5px #aaa;
  float: right;
  /* clear: right; */
}
</style>
