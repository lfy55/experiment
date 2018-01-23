<template>
  <div class="c-left">
    <p>基于CSS的动画暂停继续方式</p>
    <p>
      移动鼠标到图片上
    </p>
    <img src="../../assets/20180123173538.png" alt="" id="animatePanel">
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
@keyframes re-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

#animatePanel {
  margin: 100px;
  animation: re-rotate 3s linear 0s infinite;
  animation-play-state: paused;
}

#animatePanel:hover {
  animation-play-state: running;
}
</style>
