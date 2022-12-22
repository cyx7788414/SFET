<template>
    <el-container class="layout" :style="props.style || {}">
        <el-header class="header">
            <!-- <d-container v-bind="props.headerComp"></d-container> -->
        </el-header>
        <el-container class="body">
            <el-aside width="200px" class="aside">
                <el-scrollbar>
                    <d-container v-bind="props.asideComp"></d-container>
                </el-scrollbar>
            </el-aside>
            <el-main class="main">
                <el-scrollbar>
                    <router-view></router-view>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>
<script lang="ts" setup>
import {ElContainer, ElAside, ElMain, ElHeader, ElScrollbar} from 'element-plus';
import { DContainer } from '../../common/component/dContainer/index'
import { PropsComponentItem } from '../../common/type';
type kabiLayout1Props = {
    asideComp: PropsComponentItem;
    headerComp: PropsComponentItem;
    style?: {
        '--main-back-color'?: string;
        '--aside-back-color'?: string;
        '--header-back-color'?: string;
    }
};
const props = defineProps<kabiLayout1Props>();
// const $event: any = inject('$event');
// $event.onMounted((a: any, b: any, c: any)=> {
//     // console.log(2, a, b, c)
//     // console.log($event);
// });

</script>
<style lang="less" scoped>
.layout {
    height: 100%;
    background-color: #eee;
    --main-back-color: var(--sfet-bg-color);
    --aside-back-color: var(--sfet-color-primary);
    --header-back-color: var(--sfet-color-primary);
}
.body {
    overflow: auto;
    .aside {
        background-color: var(--aside-back-color);
    }
}
.header {
    background-color: var(--header-back-color);
}
.main {
    background-color: var(--main-back-color);
}
el-main, el-aside {
    overflow: auto;
}
</style>