<template>
  <div class="orgChart-container" id="chart-container" @click="clickNode"></div>
</template>
<script>
import "@/lib/orgchart/orgchartstyle.css"

import OrgChart from '@/lib/orgchart/orgchart.js'
import * as _ from 'lodash'

const closest = (el, fn) => {
  return el && ((fn(el) && el !== document.querySelector('.orgchart')) ? el : closest(el.parentNode, fn))
}
const getId = () => {
  return (new Date().getTime()) * 1000 + Math.floor(Math.random() * 1001)
}

export default {
  name: 'orgEdit',
  data() {
    return {
      orgchart: null,
      selectedNode: null,
      defaultOptions: {
        chartContainer: '#chart-container',
        createNode: function (node) {
          node.id = getId()
        }
      },
    }
  },
  props: {
    status: { type: Number, default: 0 },
    newNodeName: { type: String },
    data: { type: Object },
    pan: { type: Boolean, default: false },
    zoom: { type: Boolean, default: false },
    direction: { type: String, default: 't2b' },
    verticalDepth: { type: Number },
    toggleSiblingsResp: { type: Boolean, default: false },
    ajaxURL: { type: Object },
    depth: { type: Number, default: 999 },
    nodeTitle: { type: String, default: 'name' },
    parentNodeSymbol: { type: String, default: '' },
    nodeContent: { type: String },
    nodeId: { type: String, default: 'id' },
    createNode: { type: Function },
    exportButton: { type: Boolean, default: false },
    exportButtonName: { type: String, default: 'Export' },
    exportFilename: { type: String, default: 'chart' },
    chartClass: { type: String, default: '' },
    draggable: { type: Boolean, default: false },
    dropCriteria: { type: Function },
    toggleCollapse: { type: Boolean, default: true }
  },
  mounted() {
    let orgOption = _.merge(this.defaultOptions, this.$props)
    this.orgchart = new OrgChart(orgOption)
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
      let chartContainer = document.getElementById('chart-container')
      if (!chartContainer.children.length && nodeName) {
        let orgchart = new OrgChart({
          'chartContainer': '#chart-container',
          'data': { 'name': nodeName },
          'parentNodeSymbol': 'fa-th-large',
          'createNode': function (node) {
            node.id = getId()
          }
        })
        orgchart.chart.classList.add('view-state')
        this.orgchart = orgchart

        return
      }
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
    status(newVal, oldVal) {
      if (newVal - oldVal === 1 && this.newNodeName) {
        this.addNode(this.newNodeName)
      } else if (newVal - oldVal === -1) {
        this.deleteNode()
      } else if (newVal - oldVal === 2) {
        this.$emit('exportData', this.orgchart.getChartJSON())
      } else if (newVal - oldVal === -2 && this.newNodeName) {
        let target = JSON.parse(document.getElementById(this.selectedNode).getAttribute('data-source'))
        target.name = this.newNodeName
        document.getElementById(this.selectedNode).querySelector('.title').innerText = this.newNodeName
        document.getElementById(this.selectedNode).setAttribute('data-source', JSON.stringify(target))
      }
    },
    data: {
      handler() {
        let rootDom = document.getElementById('chart-container').querySelector('.orgchart').querySelector('.node')
        this.orgchart.removeNodes(rootDom)
        this.selectedNode = null
        this.$emit('selectedNode', '')
        let orgOption = _.merge(this.defaultOptions, this.$props)
        this.orgchart = new OrgChart(orgOption)
      },
      deep: false,
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

