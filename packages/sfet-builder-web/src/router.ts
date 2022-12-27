import * as VueRouter from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import FofViewVue from './views/FofView.vue';
import LoginView from './views/LoginView.vue';
import PagesView from './views/PagesView.vue';
import DocView from './views/DocView.vue';



const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'root',
        component: PagesView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/doc',
        name: 'doc',
        component: DocView
    },
    {
        path: '/404',
        name: '404',
        component: FofViewVue
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
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