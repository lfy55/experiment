<template>
  <div class="styleEffect" id="jianchu">
    <div id="myAnimate"></div>
  </div>
</template>
<script>
import $ from 'jquery'

export default {
  name: 'jianchu',
  mounted() {
    let dom = $("#myAnimate")
    console.log(dom)
    dom.animate({
      scaleIndex: 1,
    }, {
        step: function (now) {
          console.log(now)
          $(this).css('transform', 'scale(' + now + ')');
          $(this).css('left', + (1 - now) * 40 + 5 + '%');
          $(this).css('top', + (1 - now) * 45 + '%');
        },
        duration: 'slow'
      })
  },
}
</script>

<style scoped>
#jianchu {
  width: 1200px;
  height: 600px;
  position: relative;
}
#myAnimate {
  width: 359px;
  height: 272px;
  position: absolute;
  left: 45%;
  top: 45%;
  scaleindex: 0;
  transform: scale(0);
  /* box-shadow: 0 0 15px rgba(0, 0, 0, 0.5); */
  background: url("./mapBorder.png") center no-repeat;
}
</style>
