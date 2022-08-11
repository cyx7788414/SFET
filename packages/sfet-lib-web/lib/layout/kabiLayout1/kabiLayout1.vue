<template>
    <el-container class="layout">
        <el-header>{{props}}</el-header>
        <el-container class="body">
            <el-aside width="200px">
                <el-scrollbar>
                    <component :is="defineAsyncComponent(()=>import(`../../${asideComp?.type}/${asideComp?.name}/${asideComp?.name}.vue`))" v-bind="asideCompConf"></component>
                </el-scrollbar>
            </el-aside>
            <el-main>
                <el-scrollbar>
                    <router-view></router-view>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>
<script lang="ts" setup>
import {ElContainer, ElAside, ElMain, ElHeader, ElScrollbar} from 'element-plus';
import { defineAsyncComponent, PropType, inject, reactive } from 'vue';
import { PropsComponentItem } from '../../common/type';
import { getProp } from '../../common/func';
const props = defineProps({
    asideComp: {
        type: Object as PropType<PropsComponentItem>
    }
});
const $global: any = inject('$global');
const asideprop = props.asideComp?getProp($global, props.asideComp.id):{};
const asideCompConf = reactive(asideprop); 
</script>
<script lang="ts">
</script>
<style lang="less" scoped>
.layout {
    height: 100%;
    background-color: #eee;
}
.body {
    overflow: auto;
}
el-header {
    background-color: #6fba2c;
}
el-main, el-aside {
    overflow: auto;
}
</style>