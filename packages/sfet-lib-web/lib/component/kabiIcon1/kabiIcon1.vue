<template>
<div>
    <el-icon :size="size" :color="color" :class="{'is-loading': loading}">
        <component :is="name"></component>
    </el-icon>
</div>
</template>
<script lang="ts">
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { defineComponent } from 'vue';

const props = {
    name: {
        type: String,
        default: '',
        required: true
    },
    size: {
        type: Number,
        default: undefined,
        required: false
    },
    color: {
        type: String,
        default: 'inherit',
        required: false
    },
    loading: {
        type: Boolean,
        default: false,
        require: false
    }
};

export default defineComponent({
    name: 'kabiIcon1',
    props,
    components: {
        ...ElementPlusIconsVue
    }
});
</script>