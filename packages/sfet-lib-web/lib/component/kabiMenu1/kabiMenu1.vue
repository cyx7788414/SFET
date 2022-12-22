<template>
    <div class="sfet-var-container" :class="theme.css" :style="theme.var">
        <el-menu class="el-menu-vertical-demo" default-active="2" router>
            <kabiMenu1Item v-for="item in data" :data="item" :base="basePath"></kabiMenu1Item>
        </el-menu>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, defineAsyncComponent } from "vue";
import { KabiMenu1DataItem } from './type';
import { ComponentPropsTheme } from '../../common/type';
import kabiMenu1Item from './kabiMenu1Item.vue';

const props = {
    data: {
        type: Array as PropType<KabiMenu1DataItem[]>,
        default: () => [],
        required: true,
        validator: (value: any) => {
            return value.length >= 0;
        }
    },
    basePath: {
        type: String,
        default: '/',
        required: false
    },
    theme: {
        type: Object as PropType<ComponentPropsTheme>,
        default: () => ({}),
        required: false
    }
};

const computed = {
    // handledData: (vm: any) => {
    //     const handle = (item: KabiMenu1DataItem, base: string) => {
    //         if (item.path) {
    //             item.path = base + (base.endsWith('/')?'':'/') + item.path;
    //         }
    //         if (item.children) {
    //             item.children = item.children.map(v => handle(v, item.path || base));
    //         }
    //         return item;
    //     };
    //     return vm.data.map((v: KabiMenu1DataItem) => handle(v, vm.basePath));
    // }
};

const methods = {
    defineAsyncComponent
}

export default defineComponent({
    name: "kabiMenu1",
    props,
    computed,
    methods,
    setup(props, { slots, emit }) {
        
    },
    components: {
        kabiMenu1Item
    }
})
</script>
<!-- <script lang="ts" setup>
export type KabiMenu1DataItem = {
    name: string;
    path: string;
    children?: KabiMenu1DataItem[];
}
export type KabiMenu1Props = {
    data?: KabiMenu1DataItem[];
    config?: {
        type?: string;
    };
};
const props = withDefaults(defineProps<KabiMenu1Props>(), {
    data: () => [],
    config: () => {
        return {
            type: 'A'
        };
    }
});
console.log(props);
</script> -->
<style lang="less" scoped>
.sfet-var-container {
    --el-menu-active-color: red;
    // --el-menu-bg-color: var(--sfet-color-primary);
    // --el-menu-active-color: var(--sfet-color-primary);
    // --el-menu-text-color: var(--sfet-text-color-primary);

    // --el-menu-hover-text-color: var(--sfet-color-primary);
    // --el-menu-bg-color: var(--el-fill-color-blank);
    // --el-menu-hover-bg-color: var(--el-color-primary-light-9);
    // --el-menu-item-height: 56px;
    // --el-menu-sub-item-height: calc(var(--el-menu-item-height) - 6px);
    // --el-menu-horizontal-sub-item-height: 36px;
    // --el-menu-item-font-size: var(--el-font-size-base);
    // --el-menu-item-hover-fill: var(--el-color-primary-light-9);
    // --el-menu-border-color: var(--el-border-color);
    // --el-menu-base-level-padding: 20px;
    // --el-menu-level-padding: 20px;
    // --el-menu-icon-width: 24px;
    // --el-menu-icon-transform-closed: none;
    // --el-menu-icon-transform-open: rotateZ(180deg);
}
</style>