<template>
    <div class="empty">
        123321

        {{props.a}}
        {{props.b}}
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    a: {
        type: String
    },
    b: {
        type: String
    }
})
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