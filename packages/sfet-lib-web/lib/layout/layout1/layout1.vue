<template>
    <div class="abc">layout1</div>
    <div>{{title}}</div>
    <router-view></router-view>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
export type AlertType = 'info' | 'success' | 'warning' | 'error';
const props = {
  title: {
    type: String,
    default: ''
  }
};
export default defineComponent({
  name: 'layout1',
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
