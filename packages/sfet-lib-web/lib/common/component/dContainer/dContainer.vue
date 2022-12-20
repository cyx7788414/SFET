<template>
    <component :is="defineAsyncComponent(()=>import(`../../../${props.type}/${props.name}/${props.name}.vue`))" v-bind="componentProp"></component>
</template>
<script lang="ts" setup>
import { defineAsyncComponent, inject } from 'vue';
import { getProp } from '../../func';
type PropsComponentItem = {//same to type,for vue limit, can not import to defineProps
    name: string;
    type: 'component' | 'layout';
    id: string;
};
const props = defineProps<PropsComponentItem>();
const $global: any = inject('$global');
const componentProp = getProp($global, props.id);
</script>