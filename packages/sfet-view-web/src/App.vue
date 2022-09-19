<script setup lang="ts">
import { getCurrentInstance, provide, reactive, readonly } from 'vue';
const $global = reactive(getCurrentInstance()!.appContext.config.globalProperties);
provide('$global', readonly($global));
provide('$event', {
  onMounted: window.Vue.onMounted,
  onUnmounted: window.Vue.onUnmounted,
  onBeforeRouteUpdate: window.Router.onBeforeRouteUpdate
});
</script>

<template>
  <router-view></router-view>
</template>

<style lang="less">
html, body {
  height: 100%;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  overflow: auto;
  background-color: var(--sfet-bg-color);
}
</style>
