import THREE from './TrackballControls'
import countries from './cartData'

let TWEEN = require('@tweenjs/tween.js')
let camera, scene, renderer
let controls, inControll = true
let lastHotpot = {}
let currentObject

let position3ds = {}
let objects = []
let targets = {
  table: [],
  sphere: [],
  helix: [],
  grid: [],
  tile: [],
  helix2: [],
  sphere3: []
}

let customState = {}
let clock = new THREE.Clock()


function initCard(dom) {

  camera = new THREE.PerspectiveCamera(40, dom.clientWidth / dom.clientHeight, 1, 10000);
  camera.position.x = 0;
  camera.position.y = 330;
  camera.position.z = 4500;

  scene = new THREE.Scene();

  window.cardCameraChange = function(position) {
    if (!camera) {
      return
    }
    new TWEEN.Tween(camera.position)
      .to({
        x: position.x,
        y: position.y,
        z: position.z
      }, 300)
      .easing(TWEEN.Easing.Exponential.Out)
      .start();
    // camera.position.x = position.x
    // camera.position.y = position.y
    // camera.position.z = position.z
  }

  // table
  // 渲染卡片dom
  for (var i = 0; i < countries.length; i += 1) {

    var element = document.createElement('div');
    element.id = 'card_' + i;
    element.className = 'element';
    element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';

    var board = document.createElement('div');
    board.className = 'board';
    element.appendChild(board);

    // var video = document.createElement('video');
    // video.className = 'video';
    // element.appendChild(video);
    // element.video = video;

    var card = document.createElement('div');
    card.className = 'card';
    element.appendChild(card);

    var number = document.createElement('div');
    number.className = 'number';
    number.textContent = i + 1;
    card.appendChild(number);

    // var symbol = document.createElement('div');
    // symbol.className = 'symbol';
    // symbol.textContent = table[i];
    // 照片元素
    // var geosymbol = document.createElement('img');
    // geosymbol.className = 'geosymbol';
    // geosymbol.src = './assets/geos/' + (i % 8 + 1) + '.png';
    // geosymbol.width = "90";
    // card.appendChild(geosymbol);
    // var flag = document.createElement('img');
    // flag.className = 'flag';
    // flag.src = './assets/flags/' + countries[i]["flag"];
    // flag.width = "24";
    // card.appendChild(flag);
    var cname = document.createElement('div');
    var _cname = countries[i]["cnName"].trim();
    cname.className = 'cname1';
    if (_cname.length > 6)
      cname.className = 'cname3';
    else if (_cname.length > 4)
      cname.className = 'cname2';
    cname.innerHTML = _cname;
    card.appendChild(cname);
    var ename = document.createElement('div');
    var _ename = countries[i]["eName"];
    ename.className = 'ename';
    // if (_ename.length > 30)
    //     ename.className = 'ename3';
    if (_ename.length > 15)
      ename.className = 'ename2';
    ename.innerHTML = _ename;
    card.appendChild(ename);
    var attr1 = document.createElement('div');
    attr1.className = 'attr-title1';
    attr1.innerHTML = '人口数量：';
    card.appendChild(attr1);
    var attr2 = document.createElement('div');
    attr2.className = 'attr-title2';
    attr2.innerHTML = '官方语言：';
    card.appendChild(attr2);
    var val1 = document.createElement('div');
    val1.className = 'attr-value1';
    var _pop = countries[i]["population"];
    if (_pop > 100000000) {
      val1.innerHTML = Math.floor(_pop / 100000000) + '亿' + Math.floor(_pop % 100000000 / 10000000) + '千万';
      if (Math.floor(_pop % 100000000 / 10000000) < 0.1)
        val1.innerHTML = Math.floor(_pop / 100000000) + '亿';
    } else if (_pop > 10000000) {
      val1.innerHTML = parseFloat((_pop / 10000000).toFixed(1)) + '千万';
    } else if (_pop > 10000) {
      val1.innerHTML = Math.floor(_pop / 10000) + '万';
    } else {
      val1.innerHTML = countries[i]["population"];
    }

    card.appendChild(val1);
    var val2 = document.createElement('div');
    val2.className = 'attr-value2';
    var _lan = countries[i]["language"];
    if (_lan.indexOf('，') > -1)
      _lan = _lan.split('，')[0];
    if (_lan.indexOf('、') > -1)
      _lan = _lan.split('、')[0];
    val2.innerHTML = _lan;
    card.appendChild(val2);
    var search = document.createElement('img');
    search.className = 'search-icon';
    search.src = './assets/search.png';
    search.width = "10";
    card.appendChild(search);
    var star = document.createElement('img');
    star.className = 'star-icon';
    star.src = './assets/star.png';
    star.width = "10";
    card.appendChild(star);
    var _self = this;
    element.addEventListener("click", (event) => {
      if (currentObject && currentObject.id !== event.currentTarget.id) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (!currentObject && !inControll)
        return;

      if (lastHotpot.element) {
        lastHotpot.element.className = 'element';
        // lastHotpot.element.video.src = undefined;
      }

      event.currentTarget.className = 'element show';
      // event.currentTarget.video.src = './assets/video/video.mp4';
      // event.currentTarget.video.play();
      lastHotpot.element = event.currentTarget;
      if (inControll) {
        lastHotpot.position = camera.position.clone();
        lastHotpot.rotation = camera.rotation.clone();
      }
      inControll = false;
      var position3d = position3ds[event.currentTarget.id];
      var verctorR = new THREE.Vector3(0, 0, 1);
      verctorR.applyAxisAngle(new THREE.Vector3(1, 0, 0), position3d.rotation.x);
      verctorR.applyAxisAngle(new THREE.Vector3(0, 1, 0), position3d.rotation.y);
      verctorR.applyAxisAngle(new THREE.Vector3(0, 0, 1), position3d.rotation.z);
      new TWEEN.Tween(camera.position)
        .to({
          x: position3d.position.x + 500 * verctorR.x,
          y: position3d.position.y + 500 * verctorR.y,
          z: position3d.position.z + 500 * verctorR.z,
        }, 800)
        .start();
      new TWEEN.Tween(camera.rotation)
        .to({
          x: position3d.rotation.x,
          y: position3d.rotation.y,
          z: position3d.rotation.z
        }, 800)
        .onComplete(() => {
          currentObject = lastHotpot.element;
        })
        .start();
      new TWEEN.Tween(_self)
        .to({}, 900)
        .onUpdate(render)
        .start();
    });

    // var details = document.createElement('div');
    // details.className = 'details';
    // details.innerHTML = table[i + 1] + '<br>' + table[i + 2];
    // element.appendChild(details);

    var object = new THREE.CSS3DObject(element);
    object.position.x = Math.random() * 4000 - 2000;
    object.position.y = Math.random() * 4000 - 2000;
    object.position.z = Math.random() * 4000 - 2000;
    scene.add(object);

    objects.push(object);

    //

    // var object = new THREE.Object3D();
    // object.position.x = (table[i + 3] * 140) - 1330;
    // object.position.y = -(table[i + 4] * 180) + 990;

    // targets.table.push(object);

  }

  // grid
  // 布局方法
  for (var i = 0; i < objects.length; i++) {

    var object = new THREE.Object3D();

    object.position.x = ((i % 8) * 400) - 1300;
    object.position.y = (-(Math.floor(i / 8) % 3) * 400) + 600;
    object.position.z = 2000 - (Math.floor(i / 24)) * 800;

    targets.grid.push(object);

  }

  renderer = new THREE.CSS3DRenderer();
  renderer.setSize(dom.clientWidth, dom.clientHeight);
  renderer.domElement.style.position = 'absolute';
  dom.appendChild(renderer.domElement); // 添加卡片的方法

  renderer.domElement.addEventListener('click', () => {
    if (customState.autoplay || (TWEEN.getAll() && TWEEN.getAll().count > 0)) return;
    if (!inControll && lastHotpot.position) {
      currentObject = undefined;
      if (lastHotpot.element) {
        lastHotpot.element.className = 'element';
        lastHotpot.element = undefined;
      }
      resetCustomState();

      new TWEEN.Tween(camera.position)
        .to({
          x: lastHotpot.position.x,
          y: lastHotpot.position.y,
          z: lastHotpot.position.z
        }, 1200)
        .easing(TWEEN.Easing.Exponential.Out)
        .start();

      new TWEEN.Tween(camera.rotation)
        .to({
          x: lastHotpot.rotation.x,
          y: lastHotpot.rotation.y,
          z: lastHotpot.rotation.z
        }, 1200)
        .onComplete(() => inControll = true)
        .easing(TWEEN.Easing.Exponential.Out)
        .start();
      new TWEEN.Tween(this)
        .to({}, 1200)
        .onUpdate(render)
        .start();
    }
  });

  controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.rotateSpeed = 0.5;
  controls.minDistance = 500;
  controls.maxDistance = 6000;
  let changeTimeout = null,
    lastPostion = null
  controls.addEventListener('change', () => {
    // console.log('>', camera.position)

    function isSmall(a, b) {
      let x = a.x - b.x
      let y = a.y - b.y
      let z = a.z - b.z
      let x_b = x < 0 ? x > -1 : x < 1
      let y_b = y < 0 ? y > -1 : y < 1
      let z_b = z < 0 ? z > -1 : z < 1
      return x_b && y_b && z_b
    }
    if (lastPostion) {
      if (!isSmall(lastPostion, camera.position)) {
        clearTimeout(changeTimeout)
        changeTimeout = setTimeout(() => {
          console.log('======================>', camera.position)
        }, 200)
      }
    }
    lastPostion = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z
    }
    render()
  });
  // controls.addEventListener('change', debounce(() => {
  //   console.log('======================>', camera.position)
  // }, 200))

  // 按钮事件触发
  // 恢复默认布局
  // var button = document.getElementById('grid');
  // button.addEventListener('click', function (event) {
  //   inControll = true;
  //   transform(targets.grid, 2000);
  // }, false);
  // // 块状分类布局
  // var button = document.getElementById('tile');
  // button.addEventListener('click', function (event) {
  //   inControll = true;
  //   transform(targets.tile, 2000, 'tile');
  //   new TWEEN.Tween(camera.position)
  //     .to({
  //       x: 770,
  //       y: 130,
  //       z: 3000,
  //     }, 1200)
  //     .start();
  // }, false);

  // tileLayout();
  transform(targets.grid, 2000);

  //

  window.addEventListener('resize', () => {
    onWindowResize(dom)
  }, false);

}

// 变化布局形式的方法
function transform(targets, duration, type) {

  TWEEN.removeAll();

  customState.currentType = type;
  if (type === 'tile') {
    setTimeout(() => {
      resetCustomState();
    }, duration);
  } else {
    resetCustomState();
  }

  for (var i = 0; i < objects.length; i++) {

    var object = objects[i];
    var target = targets[i];
    object.custom = target.custom;
    position3ds[object.element.id] = target;

    new TWEEN.Tween(object.position)
      .to({
        x: target.position.x,
        y: target.position.y,
        z: target.position.z
      }, Math.random() * duration + duration)
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();

    new TWEEN.Tween(object.rotation)
      .to({
        x: target.rotation.x,
        y: target.rotation.y,
        z: target.rotation.z
      }, Math.random() * duration + duration)
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();
  }

  new TWEEN.Tween(this)
    .to({}, duration * 2)
    .onUpdate(render)
    .start();
}

function onWindowResize(dom) {

  camera.aspect = dom.clientWidth / dom.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(dom.clientWidth, dom.clientHeight);

  render();

}

function animate() {

  requestAnimationFrame(animate);

  TWEEN.update();

  if (inControll)
    controls.update();

}

function render() {
  if (currentObject && customState.currentType !== 'tile') {
    objects.forEach(object => {
      if (object.element.id !== currentObject.id) {
        object.element.style.opacity = 0.2;
      } else {
        var distance = object.position.distanceTo(camera.position);
        object.element.style.opacity = 3000 / distance;
      }
    });
  } else {
    objects.forEach(object => {
      var distance = object.position.distanceTo(camera.position);
      object.element.style.opacity = 3000 / distance;
    });
  }

  if (customState.autoplay && customState.currentType === 'helix2') {
    var delta = clock.getDelta();
    // helix2
    var vector = new THREE.Vector3();
    var cylindrical = new THREE.Cylindrical();
    for (var i = 0, l = objects.length; i < l; i++) {

      var object = objects[i];

      object.w_speed = object.w_speed || 0.012;
      object.w_theta = object.w_theta || (i * 0.175 + Math.PI * 0.2);
      object.w_y = object.w_y || (-(i * 24) + 850);

      object.w_theta -= object.w_speed * delta;
      object.w_y += object.w_speed * delta * 100;
      object.w_speed *= 1.006;

      cylindrical.set(900, object.w_theta, object.w_y);

      object.position.setFromCylindrical(cylindrical);

      vector.x = object.position.x * 2;
      vector.y = object.position.y;
      vector.z = object.position.z * 2;

      object.lookAt(vector);
    }
  } else {
    for (var i = 0, l = objects.length; i < l; i++) {
      var object = objects[i];
      object.w_theta = undefined;
      object.w_y = undefined;
      object.w_speed = undefined;
    }
  }

  if (customState.autoplay && customState.currentType === 'sphere3') {
    var delta = clock.getDelta();
    var speed = 0.3;
    var rotate = delta * speed;
    // sphere3
    var vector = new THREE.Vector3();
    var spherical = new THREE.Spherical();

    for (var i = 0, l = objects.length; i < l; i++) {
      var object = objects[i];
      spherical.set(object.custom.s_radius, object.custom.s_phi, object.custom.s_theta + object.custom.s_rotate);

      object.position.setFromSpherical(spherical);
      vector.copy(object.position).multiplyScalar(2);

      object.lookAt(vector);
      object.position.x += object.custom.s_offsetx;

      object.custom.s_rotate += rotate;
    }
  }

  renderer.render(scene, camera);
}

function resetCustomState() {
  customState.autoplay = false;
  if (customState.currentType === 'tile') {
    customState.tiles.forEach(tile => {
      tile.element.style.display = 'block';
    });
  } else {
    // customState.tiles.forEach(tile => {
    //   tile.element.style.display = 'none';
    // });
  }
}

function tileLayout() {
  var index1 = 0,
    index2 = 0,
    index3 = 0,
    index4 = 0;
  for (var i = 0; i < countries.length; i++) {
    var object = new THREE.Object3D();
    var area = countries[i]['continents'];

    switch (area) {
      case '非洲':
        if (countries[i]['population'] < 4000000 || index1 > 35) {
          object.position.x = 100000;
          object.position.y = 100000;
          break;
        }
        object.position.x = (Math.floor(index1 % 9) * 140) - 1400;
        object.position.y = -(Math.floor(index1 / 9) * 180) - 200;
        index1++;
        break;
      case '北美洲':
      case '南美洲':
        if (countries[i]['population'] < 70000 || index2 > 35) {
          object.position.x = 100000;
          object.position.y = 100000;
          break;
        }
        object.position.x = (Math.floor(index2 % 9) * 140) + 200;
        object.position.y = -(Math.floor(index2 / 9) * 180) - 200;
        index2++;
        break;
      case '亚洲':
        if (countries[i]['population'] < 3000000 || index3 > 35) {
          object.position.x = 100000;
          object.position.y = 100000;
          break;
        }
        object.position.x = (Math.floor(index3 % 9) * 140) - 1400;
        object.position.y = -(Math.floor(index3 / 9) * 180) + 700;
        index3++;
        break;
      case '欧洲':
        if (countries[i]['population'] < 1000000 || index4 > 35) {
          object.position.x = 100000;
          object.position.y = 100000;
          break;
        }
        object.position.x = (Math.floor(index4 % 9) * 140) + 200;
        object.position.y = -(Math.floor(index4 / 9) * 180) + 700;
        index4++;
        break;
      default:
        object.position.x = 100000;
        object.position.y = 100000;
        break;
    }
    object.position.z = 200;
    targets.tile.push(object);
  }
  customState.tiles = [];
  var contitents = ['亚洲', '欧洲', '非洲', '美洲'];
  for (var i = 0; i < contitents.length; i++) {
    var tile = document.createElement('div');
    tile.id = 'tile-' + i;
    tile.className = 'tile';
    tile.innerHTML = contitents[i];
    tile.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!inControll)
        return;

      event.currentTarget.style.display = 'none';
      lastHotpot.position = camera.position.clone();
      lastHotpot.rotation = camera.rotation.clone();
      inControll = false;
      var position3d = customState.tiles.find(tile => tile.element.id === event.currentTarget.id);
      var verctorR = new THREE.Vector3(0, 0, 1);
      verctorR.applyAxisAngle(new THREE.Vector3(1, 0, 0), position3d.rotation.x);
      verctorR.applyAxisAngle(new THREE.Vector3(0, 1, 0), position3d.rotation.y);
      verctorR.applyAxisAngle(new THREE.Vector3(0, 0, 1), position3d.rotation.z);
      new TWEEN.Tween(camera.position)
        .to({
          x: position3d.position.x + 1200 * verctorR.x,
          y: position3d.position.y + 1200 * verctorR.y,
          z: position3d.position.z + 1200 * verctorR.z,
        }, 800)
        .start();
      new TWEEN.Tween(camera.rotation)
        .to({
          x: position3d.rotation.x,
          y: position3d.rotation.y,
          z: position3d.rotation.z
        }, 800)
        .onComplete(() => {
          currentObject = position3d.element;
        })
        .start();
      new TWEEN.Tween(this)
        .to({}, 900)
        .onUpdate(render)
        .start();
    });
    var object = new THREE.CSS3DObject(tile);
    switch (i) {
      case 0:
        object.position.x = -840;
        object.position.y = 430;
        break;
      case 1:
        object.position.x = 760;
        object.position.y = 430;
        break;
      case 2:
        object.position.x = -840;
        object.position.y = -470;
        break;
      case 3:
        object.position.x = 760;
        object.position.y = -470;
        break;
      default:
        break;
    }

    object.position.z = 210;
    scene.add(object);
    customState.tiles.push(object);
  }
}


export default {
  initCard,
  animate,
}