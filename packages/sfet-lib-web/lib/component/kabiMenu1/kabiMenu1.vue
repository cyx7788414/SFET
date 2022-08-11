<template>
    <div class="sfet-var-container" :class="theme.css" :style="theme.var">
        <!-- <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2" -->
        <el-menu class="el-menu-vertical-demo" default-active="2" router>
                <!-- <el-sub-menu v-for="item in data" index="1">
                    <template #title>
                        <component v-if="" :is="defineAsyncComponent(()=>import(`../../component/${asideComp}/${asideComp}.vue`))" v-bind="asideCompData"></component>
                        <span>menus</span>
                    </template>
                    <el-menu-item v-for="item in data" :index="item.path">
                        <component v-if="" :is="defineAsyncComponent(()=>import(`../../component/${asideComp}/${asideComp}.vue`))" v-bind="asideCompData"></component>
                        <span>{{item.name}}</span>
                    </el-menu-item>
                </el-sub-menu>         -->
                <kabiMenu1Item v-for="item in data" :data="item"></kabiMenu1Item>
        </el-menu>
        <!-- <div v-for="item in data">
            <div>{{typeof item}}</div>
            <div>{{item}}</div>
            <div>{{JSON.stringify(item)}}</div>
        </div> -->
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
    theme: {
        type: Object as PropType<ComponentPropsTheme>,
        default: () => ({}),
        required: false
    }
};

const computed = {
};

const methods = {
    defineAsyncComponent
}
console.log(this);

export default defineComponent({
    name: "kabiMenu1",
    props,
    computed,
    methods,
    setup(props, { slots, emit }) {
        console.log(props)
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
    --el-menu-bg-color: var(--sfet-color-primary);
    --el-menu-active-color: var(--sfet-color-primary);
    --el-menu-text-color: var(--sfet-text-color-primary);

    --el-menu-hover-text-color: var(--sfet-color-primary);
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