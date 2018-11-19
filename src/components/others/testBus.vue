<template>
  <div>
    {{bus}}
    <hr>
    <el-input v-model="eventName" placeholder="请输入事件名称"></el-input>
    <el-button type="primary" :disabled="!eventName" @click="addEvent">添加事件</el-button>
    <el-button type="primary" @click="emitEvent">触发事件</el-button>
    <el-button type="primary" @click="emptyEvent">清空所有事件</el-button>
    <hr> {{callbackCon}}
  </div>
</template>

<script>
import Bus from '@/lib/bus'

export default {
  name: 'testBus',
  data() {
    return {
      bus: new Bus(),
      eventName: '',
      callbackCon: 0,
    }
  },
  computed: {
    eventList() {
      return []
    }
  },
  methods: {
    addEvent() {
      this.bus.addListener(this.eventName, () => {
        this.callbackCon++
      })
    },
    emitEvent() {
      this.bus.emit(this.eventName)
    },
    emptyEvent() {
      this.bus.removeListener(this.eventName)
    }
  }
}
</script>

<style scoped>

</style>
