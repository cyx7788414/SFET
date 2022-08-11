<template>
<div class="loading" v-loading="true" element-loading-text="正在加载站点配置"></div>
</template>
<script lang="ts" setup>
import { ElLoading } from 'element-plus';
</script>
<style lang="less" scoped>
.loading {
    position: fixed;
    width: 100%;
    height: 100%;
}
</style>