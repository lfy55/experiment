<template>
  <div class="orgChart-container" id="chart-container" @click="clickNode" ></div>
</template>
<script>
import "@/lib/orgchartstyle.css"

import OrgChart from '@/lib/orgchart.js'
import { bindEventHandler, clickNode, clickChart, closest, getId } from '@/lib/orgutils.js'

export default {
  name: 'orgEdit',
  data() {
    return {
      orgchart: null,
      selectedNode: null,
    }
  },
  props: {
    isAdd: { type: Number, default: 0 },
    newNodeName: { type: String },
  },
  mounted() {
    this.orgchart = new OrgChart({
      'chartContainer': '#chart-container',
      'toggleSiblingsResp': true,
      'draggable': true,
      createNode: function (node) {
        node.id = getId()
      },
      data: {
        name: 'JavaScript',
        children: [
          {
            name: 'Angular',
            children: [{ name: '?' }]
          },
          {
            name: 'React',
            children: [{ name: 'Preact' }]
          },
          {
            name: 'Vue',
            children: [{ name: 'Moon' }]
          }
        ]
      }
    })
    // this.$nextTick(() => {
    //   bindEventHandler('.node', 'click', clickNode, '#chart-container')
    //   bindEventHandler('.orgchart', 'click', clickChart, '#chart-container')
    // })
  },
  methods: {
    clickNode(event) {
      if ((event.target.classList && event.target.classList.contains('node')) || closest(event.target, el => el.classList && el.classList.contains('node'))) {
        let sNode = closest(event.target, el => el.classList && el.classList.contains('node'))
        let selectedNodeValue = sNode.querySelector('.title').textContent
        this.selectedNode = sNode.id
        this.$emit('selectedNode', selectedNodeValue)
      } else if ((event.target.classList && event.target.classList.contains('orgchart')) || closest(event.target, el => el.classList && el.classList.contains('orgchart'))) {
        this.selectedNode = null
        this.$emit('selectedNode', '')
      }
    },
    addNode(nodeName) {
      console.log('sqk=============>addNode')
      if (!this.selectedNode || !nodeName) {
        return
      }
      let selectedNode = document.getElementById(this.selectedNode)
      if (!selectedNode) {
        return
      }
      let hasChild = selectedNode.parentNode.colSpan > 1
      if (!hasChild) {
        this.orgchart.addChildren(selectedNode, {
          'children': [{ 'name': nodeName, 'relationship': '100', 'Id': getId() }]
        })
      } else {
        this.orgchart.addSiblings(
          closest(selectedNode, el => el.nodeName === 'TABLE').querySelector('.nodes').querySelector('.node'),
          {
            'siblings': [{ 'name': nodeName, 'relationship': '110', 'Id': getId() }]
          })
      }
    },
    deleteNode() {
      console.log('sqk=============>deleteNode')
      if (!this.selectedNode) {
        return
      }
      let selectedNode = document.getElementById(this.selectedNode)
      if (!selectedNode) {
        return
      }
      this.orgchart.removeNodes(selectedNode)
      this.selectedNode = null
      this.$emit('selectedNode', '')
    },
  },
  watch: {
    isAdd(newVal, oldVal) {
      if (newVal - oldVal === 1 && this.newNodeName) {
        this.addNode(this.newNodeName)
      } else if (newVal - oldVal === -1) {
        this.deleteNode()
      }
    }
  }
}
</script>

<style scoped>
.orgChart-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>

