<template>
  <div>
    <el-radio-group v-model="menuType">
      <el-radio-button label="horizontal">水平菜单</el-radio-button>
      <el-radio-button label="vertical">垂直菜单</el-radio-button>
    </el-radio-group>
    <hr>
    <nav class="multi_drop_menu" :class="{'vertical':menuType==='vertical'}">
      <!-- 一级开始 -->
      <ul>
        <li>
          <a href="#">Power</a>
        </li>
        <li>
          <a href="#">Money</a>
        </li>
        <li>
          <a href="#">Love</a>
        </li>
        <li>
          <a href="#">Fame</a>
          <!-- 二级开始 -->
          <ul>
            <li>
              <a href="#">Sports Star</a>
            </li>
            <li>
              <a href="#">Movie Star</a>
            </li>
            <li>
              <a href="#">Rock Star</a>
              <!-- 三级开始 -->
              <ul>
                <li>
                  <a href="#">Bruce Springsteen</a>
                </li>
                <li>
                  <a href="#">Bono</a>
                </li>
                <li>
                  <a href="#">Mick Jagger</a>
                </li>
                <li>
                  <a href="#">Bob Dylan</a>
                </li>
              </ul>
              <!-- 三级结束 -->
            </li>
            <li>
              <a href="#">Web Designer</a>
            </li>
          </ul>
          <!-- 二级结束 -->
        </li>
      </ul>
      <!-- 一级结束 -->
    </nav>
  </div>
</template>

<script>
export default {
  name: 'menu',
  data() {
    return {
      menuType: 'horizontal'
    }
  },
}
</script>
<style scoped>
.multi_drop_menu {
  font-size: 1em;
}
.multi_drop_menu a {
  text-decoration: none;
  display: block;
  color: #555;
  background: #eee;
  padding: 0.2em 1em;
  background-clip: padding-box;
  border-right: 3px solid rgb(65, 184, 253);
}
.multi_drop_menu ul li:last-child a {
  border-right-width: 0;
}
.multi_drop_menu a:hover {
  color: #fff;
  background: #aaa;
}
.multi_drop_menu a:active {
  background: #fff;
  color: #cccccc;
}
.multi_drop_menu ul {
  margin: 0;
  padding: 0;
}
.multi_drop_menu ul {
  float: left;
}
.multi_drop_menu li {
  float: left;
  list-style-type: none;
  position: relative;
}
.multi_drop_menu li ul {
  display: none;
}
/* 二级菜单的样式 */
.multi_drop_menu li ul {
  width: 9em;
}
.multi_drop_menu li li a {
  border-right-width: 0;
  border-top: 3px solid rgb(65, 184, 253);
}
.multi_drop_menu li ul {
  display: none;
  position: absolute;
  left: 0;
  top: 100%;
}
.multi_drop_menu li:hover > ul {
  display: block;
}
.multi_drop_menu li li {
  float: none;
}
.multi_drop_menu li li ul {
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
}

/* 改为垂直菜单 */
.multi_drop_menu.vertical {
  width: 8em;
}
.multi_drop_menu.vertical li a {
  border-right-width: 0;
  border-top: 3px solid rgb(65, 184, 253);
}
.multi_drop_menu li ul {
  top: 0;
  left: 100%;
}
</style>
