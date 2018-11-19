<template>
  <div class="c-left">
    <p>基于CSS的动画暂停继续方式</p>
    <p>
      移动鼠标到图片上
    </p>
    <img src="../../assets/20180123173538.png" alt="" id="animatePanel">
    <div>
      正在加载中
      <span id="dot">...</span>
    </div>
    <div>
      当前时间：{{time}}
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/lib/jslib'

export default {
  data() {
    return {
      time: '',
      timeAnimate: null,
    }
  },
  mounted() {
    this.timeAnimate = requestAnimationFrame(this.upTime)
  },
  methods: {
    upTime() {
      this.time = formatTime(Date.now(), 'yyyy-MM-dd hh:mm:ss-S')
      this.timeAnimate = requestAnimationFrame(this.upTime)
    }
  }
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

#dot {
  display: inline-block;
  height: 1em;
  line-height: 1;
  text-align: left;
  vertical-align: -0.25em;
  overflow: hidden;
}
#dot::before {
  display: block;
  content: "...\A..\A.";
  white-space: pre-wrap;
  /* steps(1, start) 其中 1 代表在每一个动画阶段又分为几个步骤去展示 start 表示跳过 0% 帧 */
  animation: dot 3s infinite steps(1, start) both;
}
@keyframes dot {
  33% {
    transform: translateY(-2em);
  }
  66% {
    transform: translateY(-1em);
  }
}
</style>
