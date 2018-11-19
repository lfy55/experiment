<template>
  <div class="orgChart">
    <org-edit :data="chartData" :toggle-siblings-resp="true" :exportButton="true" :direction="'t2b'" :draggable="true" :status="status" :newNodeName="nodeName" @selectedNode="changeSeleteNode"></org-edit>
    <br> 当前选中的点：{{selectedName}}
    <el-input v-model="nodeName" placeholder="请输入内容"></el-input>
    <el-button @click="addNode">添加</el-button>
    <el-button @click="deleteNode">删除</el-button>
    <el-button @click="changeData">修改数据</el-button>
    <el-button @click="exportData">导出数据</el-button>
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
      status: 0,
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
      if (!this.nodeName) { return }
      this.status++
    },
    deleteNode() {
      if (!this.selectedName) { return }
      this.status--
    },
    changeSeleteNode(nodeName) {
      this.selectedName = nodeName
    },
    changeData() {
      if (!this.selectedName || !this.nodeName) { return }
      this.status = this.status - 2
    },
    exportData() {
      this.status = this.status + 2
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
