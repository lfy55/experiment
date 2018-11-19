<template>
  <div class="card_wrapper">
    <canvas ref="myCanvas"></canvas>
    <div class="container" ref="card_container"></div>
  </div>
</template>


<script>
import initPoint from '@/lib/card/point.js'
import card from '@/lib/card/card.js'

export default {
  name: 'card_3d',
  data() {
    return {
      data: ''
    }
  },
  mounted() {
    initPoint(this.$refs.myCanvas)

    this.$nextTick(() => {
      card.initCard(this.$refs.card_container)
      card.animate()
    })
  },
}
</script>

<style>
.card_wrapper {
  width: 100%;
  height: calc(100% - 20px);
  position: relative;
}
canvas {
  width: 100%;
  height: 100%;
}
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.element {
  width: 120px;
  height: 160px;
  box-shadow: 0px 0px 20px rgba(0, 255, 255, 0.95);
  border: 1px solid rgba(127, 255, 255, 0.25);
  text-align: center;
  border-radius: 6px;
  cursor: default;
  user-select: none;
}

.element.show {
  z-index: 1000000;
}

.element .board {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  background: rgba(0, 10, 10, 0.99);
  box-shadow: 0px 0px 4px rgba(0, 255, 255, 0.95);
  transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
}

.element.show .board {
  opacity: 1;
  transform: scaleX(4.2) scaleY(1.52);
  -webkit-transform: scaleX(4.2) scaleY(1.52);
  transition: opacity 0.2s ease-in-out 0.4s, transform 0.6s ease-in-out 0.4s;
  -webkit-transition: opacity 0.2s ease-in-out 0.4s,
    transform 0.6s ease-in-out 0.4s;
}

.element .video {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
}

.element.show .video {
  left: -190px;
  top: -45px;
  width: 500px;
  height: 250px;
  opacity: 1;
  transition: all 0.3s ease-in-out 0.5s;
  -webkit-transition: all 0.3s ease-in-out 0.5s;
}

.element .card {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.6s ease-in-out;
  -webkit-transition: all 0.6s ease-in-out;
}

.element.show .card {
  opacity: 0;
}

.element:hover {
  box-shadow: 0px 0px 24px rgba(0, 255, 255, 0.95);
  border: 2px solid rgba(127, 255, 255, 0.75);
}

.element:hover .geosymbol {
  opacity: 0.75;
}

.element .number {
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 12px;
  color: rgba(127, 255, 255, 0.5);
}

.element .symbol {
  position: absolute;
  top: 40px;
  left: 0px;
  right: 0px;
  font-size: 60px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.75);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
}

.element .geosymbol {
  position: absolute;
  top: 15px;
  left: 15px;
  opacity: 0.5;
}

.element .flag {
  position: absolute;
  top: 95px;
  left: 12px;
}

.element .cname1 {
  position: absolute;
  top: 95px;
  left: 40px;
  right: 10px;
  text-align: center;
  font-size: 14px;
  font-family: "黑体";
  letter-spacing: 4px;
  word-break: keep-all;
  white-space: nowrap;
  color: rgba(64, 255, 255, 0.95);
  text-shadow: 0 0 12px rgba(0, 255, 255, 0.95);
}

.element .cname2 {
  position: absolute;
  top: 95px;
  left: 36px;
  right: 0px;
  text-align: center;
  font-size: 13px;
  font-family: "黑体";
  word-break: keep-all;
  white-space: nowrap;
  color: rgba(64, 255, 255, 0.95);
  text-shadow: 0 0 12px rgba(0, 255, 255, 0.95);
}

.element .cname3 {
  position: absolute;
  top: 95px;
  left: 36px;
  right: 0px;
  text-align: center;
  font-size: 12px;
  font-family: "黑体";
  word-break: keep-all;
  white-space: nowrap;
  color: rgba(64, 255, 255, 0.95);
  text-shadow: 0 0 12px rgba(0, 255, 255, 0.95);
}

.element .ename {
  position: absolute;
  top: 111px;
  left: 36px;
  right: 10px;
  text-align: center;
  font-size: 9px;
  color: rgba(64, 255, 255, 0.75);
}

.element .ename2 {
  position: absolute;
  top: 111px;
  left: 2px;
  right: 2px;
  line-height: 8px;
  text-align: center;
  font-size: 9px;
  color: rgba(64, 255, 255, 0.75);
}

.element .attr-title1,
.attr-title2 {
  position: absolute;
  top: 128px;
  left: 12px;
  font-family: "黑体";
  font-size: 8px;
  color: rgba(64, 255, 255, 0.75);
}

.element .attr-title2 {
  top: 144px;
}

.element .attr-value1,
.attr-value2 {
  position: absolute;
  top: 128px;
  left: 50px;
  right: 15px;
  text-align: left;
  font-family: "黑体";
  font-size: 8px;
  color: rgba(255, 255, 255, 0.75);
}

.element .attr-value2 {
  top: 144px;
}

.element .search-icon,
.star-icon {
  position: absolute;
  top: 128px;
  right: 10px;
  cursor: pointer;
}

.element .star-icon {
  top: 144px;
}

.element .details {
  position: absolute;
  bottom: 15px;
  left: 0px;
  right: 0px;
  font-size: 12px;
  color: rgba(127, 255, 255, 0.75);
}
</style>
