<template>
  <div class="tag_wrapper" id="vue_tags_input_20180808" :style="{width: width + 'px',height: tagHasFocus?focusHeight + 'px':height + 'px',}" ref="tagInput" :class="{focus:tagHasFocus}" @mouseover="mouseOver" @mouseout="mouseOut">
    <vue-tags-input :value="value" @input="v=> $emit('input', v)" :tags="tags" :separators="separators" @tags-changed="tagsChange" />
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'

export default {
  name: 'input-tags',
  components: {
    VueTagsInput,
  },
  props: {
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 50,
    },
    focusHeight: {
      type: Number,
      default: 100,
    },
    value: {
      type: String,
      default: '',
    },
    tags: {
      type: Array,
      default: function () { return [] },
    },
    separators: {
      type: Array,
      default: function () { return [';'] },
    }
  },
  data() {
    return {
      tagHasFocus: false,
      focusTime: null,
      tagTimeout: null
    }
  },
  methods: {
    tagsChange(newTags) {
      // this.tags = newTags.filter(item => {
      //   return !!item.text
      // })
      this.tagScroll()
      this.$emit('tags-changed', newTags)
    },
    tagScroll() {
      this.$nextTick(() => {
        if (this.tagTimeout) {
          clearTimeout(this.tagTimeout)
        }
        this.tagTimeout = setTimeout(() => {
          let tagWrap = this.$refs.tagInput
          tagWrap.scrollTop = tagWrap.scrollHeight
        }, 100)
      })
    },
    mouseOver(e) {
      if (this.focusTime) {
        clearTimeout(this.focusTime)
      }
      this.focusTime = setTimeout(() => {
        if (this.tagHasFocus === true) {
          return
        }
        this.tagHasFocus = true
        this.tagScroll()
      }, 200)
    },
    mouseOut(e) {
      if (this.focusTime) {
        clearTimeout(this.focusTime)
      }
      this.focusTime = setTimeout(() => {
        if (this.tagHasFocus === false) {
          return
        }
        this.tagHasFocus = false
        this.tagScroll()
      }, 200)
    },
  }
}
</script>

<style>
#vue_tags_input_20180808.tag_wrapper {
  border: 1px solid darkcyan;
  overflow: auto;
}

#vue_tags_input_20180808.tag_wrapper.focus {
  height: 100px;
}

#vue_tags_input_20180808.tag_wrapper .vue-tags-input .input {
  border-width: 0;
}

#vue_tags_input_20180808 .vue-tags-input .tags {
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
}

#vue_tags_input_20180808 .vue-tags-input .new-tag-input-wrapper,
#vue_tags_input_20180808 .vue-tags-input .tag {
  height: 30px;
  box-sizing: border-box;
}
</style>
