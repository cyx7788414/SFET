<template>
    <el-menu-item-group v-if="data!.group" :title="data!.name">
        <kabi-menu1-item v-for="item in data!.children" :data="item" :base="routerPath"></kabi-menu1-item>
    </el-menu-item-group>
    <el-sub-menu v-else-if="data!.children" :index="data!.id">
        <template #title>
            <component v-if="data!.icon" :is="async(()=>import(`../../component/${data!.icon!.component}/${data!.icon!.component}.vue`))" v-bind="data!.icon.props"></component>
            <span>{{data!.name}}</span>
        </template>
        <kabi-menu1-item v-for="item in data!.children" :data="item" :base="routerPath"></kabi-menu1-item>
    </el-sub-menu>
    <el-menu-item v-else :index="routerPath">
        <component v-if="data!.icon" :is="data!.icon.component" v-bind="data!.icon.props"></component>
        <span>{{data!.name}}</span>
    </el-menu-item>
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent, PropType } from "vue";
import { KabiMenu1DataItem } from './type';
import KabiIcon1 from '../kabiIcon1/kabiIcon1.vue';

const props = {
    data: {
        type: Object as PropType<KabiMenu1DataItem>,
        required: true
    },
    base: {
        type: String,
        required: true
    }
};

const computed = {
    routerPath: (vm: any) => {
        return vm.base + (vm.base.endsWith('/')?'':'/') + (vm.data.path || '');
    }
};

const methods = {
    async: defineAsyncComponent
};

export default defineComponent({
    name: "kabiMenu1Item",
    props,
    methods,
    computed,
    setup(props, { slots, emit }) {
    },
    components: { KabiIcon1 }
})
</script>
<style lang="less">
</style>