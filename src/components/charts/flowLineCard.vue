<template>
  <div id="linecard">

  </div>
</template>

<script>
import THREE from '../../lib/card/TrackballControls'
let TWEEN = require('@tweenjs/tween.js')

let objects = [],
  targets = [],
  movies = [],
  totalNum = 20

let camera, scene = new THREE.Scene(),
  renderer = new THREE.CSS3DRenderer(),
  container

let tweenCount

let currentTarget

for (let index = 0; index < totalNum; index++) {
  movies.push({
    id: index,
    text: '元素\n' + index
  })
}

export default {
  name: 'flowLineCard',
  data() {
    return {}
  },
  mounted() {
    container = document.getElementById('linecard')
    this.initScene()

    this.setData()
    this.initLayout();

    // Start the gallery
    container.appendChild(renderer.domElement)
    this.transform(2500)
  },
  methods: {
    updateSize() {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    },
    initScene() {
      camera = new THREE.PerspectiveCamera(40, container.offsetWidth / container.offsetHeight, 1, 10000);
      camera.position.z = 2200;

      this.updateSize()
      window.addEventListener('resize', this.updateSize, false)

      this.animate()
    },
    animate() {
      window.requestAnimationFrame(this.animate)
      TWEEN.update()
      renderer.render(scene, camera)
    },
    setData() {
      for (var i = 0; i < movies.length; i++) {
        var element = document.createElement('div')
        element.className = 'element'
        element.id = 'id' + movies[i].id
        element.innerText = movies[i].text

        var mask = document.createElement('div')
        mask.className = 'mask'
        element.appendChild(mask)
        element.addEventListener('click', (event) => {
          if (tweenCount !== 0)
            return

          event.preventDefault()
          event.stopPropagation()

          this.sortMovies(event.currentTarget)
          this.transform(1500)
        })

        var cssObject = new THREE.CSS3DObject(element)
        cssObject.position.x = Math.random() * 1000 - 500
        cssObject.position.y = Math.random() * 1000 - 500
        cssObject.position.z = Math.random() * 1000 - 1000

        scene.add(cssObject)
        objects.push(cssObject)
      }
    },
    sortMovies(target) {
      if (currentTarget !== undefined) {
        currentTarget.className = 'element unselected';
      }
      currentTarget = target
      console.log(currentTarget)
      var index = parseInt(currentTarget.id.substring(2))

      var l = objects.length;
      objects.sort(function (a, b) {
        var aIndex = parseInt(a.element.id.substring(2));
        var bIndex = parseInt(b.element.id.substring(2));

        var aValue = (aIndex < index) ? (aIndex + l - index) : (aIndex - index);
        var bValue = (bIndex < index) ? (bIndex + l - index) : (bIndex - index);

        return aValue - bValue;
      })
      console.log('change view to ', index)
    },
    transform(duration) {
      TWEEN.removeAll();
      tweenCount = 0;

      currentTarget.className = 'element selected';

      for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        var target = targets[i];

        new TWEEN.Tween(object.position)
          .to({
            x: target.position.x,
            y: target.position.y,
            z: target.position.z
          }, duration)
          .onComplete(function () {
            tweenCount--;
          })
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();

        new TWEEN.Tween(object.rotation)
          .to({
            x: target.rotation.x,
            y: target.rotation.y,
            z: target.rotation.z
          }, Math.random() * duration)
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();

        tweenCount++;
      }
    },
    initLayout() {
      var vector = new THREE.Vector3();
      for (var i = 0, l = objects.length; i < l; i++) {

        var phi = i === 0 ? 0 : (2 * (i + 0) * Math.PI) / (l + 0);

        var object = new THREE.Object3D();
        object.position.x = 850 * Math.sin(phi);
        object.position.y = i === 0 ? -15 : -30;
        object.position.z = 1200 * Math.cos(phi);

        vector.x = object.position.x * 1.1;
        vector.y = object.position.y;
        vector.z = object.position.z * 1.1;

        object.lookAt(vector);

        targets.push(object);
      }

      this.sortMovies(objects[0].element);
    },
  },
}
</script>

<style lang="css">
#linecard {
  width: 100%;
  height: 100%;
  background: #000;
}

#linecard .element {
  width: 150px;
  height: 200px;
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.5);
  border: 1px solid rgba(127, 255, 255, 0.25);
  background-color: rgba(127, 255, 255, 0.05);
  cursor: default;
}

#linecard .selected {
  animation-name: "scaleup";
  -webkit-animation-name: "scaleup";
  animation-duration: 1s;
  -webkit-animation-duration: 1s;
  animation-iteration-count: 1;
  -webkit-animation-iteration-count: 1;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  -webkit-animation-timing-function: ease-in-out;
}

#linecard .unselected {
  animation-name: "scaledown";
  -webkit-animation-name: "scaledown";
  animation-duration: 1s;
  -webkit-animation-duration: 1s;
  animation-iteration-count: 1;
  -webkit-animation-iteration-count: 1;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  -webkit-animation-timing-function: ease-in-out;
}

@keyframes scaleup {
  from {
    width: 150px;
    height: 200px;
  }
  to {
    width: 180px;
    height: 240px;
  }
}

@keyframes scaledown {
  from {
    width: 180px;
    height: 240px;
  }
  to {
    width: 150px;
    height: 200px;
  }
}

#linecard .element:hover {
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.75);
  border: 2px solid rgba(127, 255, 255, 0.75);
  background-color: rgba(127, 255, 255, 0.45);
}
</style>