<template>
    <div class="host">
        <div class="text-box">
            <h1>开发者寄语：</h1>
            <h2>小前端终结者欢迎你！</h2>
            <h2>希望这微不足道的劳动成果</h2>
            <h2>也能够帮助到你</h2>
            <h2>—— kabi</h2>
            <h3><router-link to="doc">点此查阅文档</router-link></h3>
        </div>
        <div class="login-box">
            <div>{{ form.username }}</div>
            <el-form :form="form" label-position="top">
                <el-form-item label="用户名">
                    <el-input v-model="form.username" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" type="password" show-password/>
                </el-form-item>
            </el-form>
            <el-button class="login-btn" type="success" auto-insert-space>登录</el-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
const form = reactive({
    username: '',
    password: ''
});
</script>
<style lang="less" scoped>
.host {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-color: #fed;
}
.text-box {
    margin-top: 100px;
    margin-left: 100px;
}
.login-box {
    position: absolute;
    right: 200px;
    width: 200px;
    top: 50%;
    transform: -50%;
    border: 1px solid #ccc;
    border-radius: 4px;
    transform: translate(0, -50%);
    padding: 20px;

    .login-btn {
        width: 100%;
    }
}
</style>