<template>
  <div class="orgChart">
    <org-edit :isAdd="isAdd" :newNodeName="nodeName" @selectedNode="changeSeleteNode"></org-edit>
    <br>
    当前选中的点：{{selectedName}}
    <el-input v-model="nodeName" placeholder="请输入内容"></el-input>
    <el-button @click="addNode">添加</el-button>
    <el-button @click="deleteNode">删除</el-button>
  </div>
</template>

<script>
import orgEdit from './orgEdit.vue'

export default {
  name: "orgChart",
  components: {
    'org-edit': orgEdit,
  },
  data() {
    return {
      orgchart: null,
      isAdd: 0,
      nodeName: '',
      selectedName: null,
      chartData: {
        name: "JavaScript",
        children: [
          {
            name: "Angular",
            children: [{ name: "?" }]
          },
          {
            name: "React",
            children: [{ name: "Preact" }]
          },
          {
            name: "Vue",
            children: [{ name: "Moon" }]
          }
        ]
      }
    }
  },
  methods: {
    addNode() {
      if (!this.nodeName || !this.selectedName) { return }
      this.isAdd++
    },
    deleteNode() {
      if (!this.selectedName) { return }
      this.isAdd--
    },
    changeSeleteNode(nodeName) {
      this.selectedName = nodeName
    }
  }
}
</script>


<style scoped>
.orgChart {
  height: 800px;
}
.orgChart-container {
  width: 1000px;
  height: 500px;
}
</style>
