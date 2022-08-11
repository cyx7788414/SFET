<template>
    <div class="empty">
        <el-empty description="404 Not Found">
            <el-button type="primary" @click="$router.push('/')">首页</el-button>
        </el-empty>
    </div>
</template>
<script lang="ts" setup>
import { ElEmpty } from 'element-plus';
import { ElButton } from 'element-plus';
</script>
<style lang="less" scoped>
.empty {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
}
</style>