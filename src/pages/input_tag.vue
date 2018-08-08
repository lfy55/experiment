<template>
  <div>
    <taginput v-model="tag" :tags="tags" @tags-changed="tagsChange"></taginput>
  </div>
</template>
<script>
import taginput from '../components/styleEffect/inputTags.vue'

export default {
  components: {
    taginput,
  },
  data() {
    return {
      tag: 'dsadsa',
      tags: []
    }
  },
  methods: {
    tagsChange(newTags) {
      this.tags = newTags.filter(item => {
        return !!item.text
      })
    }
  },
}
</script>
