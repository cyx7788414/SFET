import * as VueRouter from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import LoadingViewVue from './views/LoadingView.vue';
import FofViewVue from './views/FofView.vue';
import { getCurrentInstance } from 'vue';


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'root',
        component: LoadingViewVue,
    },
    {
        path: '/404',
        name: '404',
        component: FofViewVue
    }
];

const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
});
router.onError((error: any, to, from) => {
    console.log(error, to, from);
});


export default router;