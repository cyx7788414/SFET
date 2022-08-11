<template>
    <div class="abc">layout2</div>
    <div>{{title}}</div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
const props = {
  title: {
    type: String,
    default: ''
  }
};
export default defineComponent({
  name: 'layout2',
  props,
  setup(props, { slots }) {
    const prefix = 'vxp-divider'

    const hasText = computed(() => {
      return !!slots.default
    })

    return {
      prefix,

      hasText,
    }
  }
})
</script>
<style lang="less" scoped>
.abc {
    color: red;
}
</style>
