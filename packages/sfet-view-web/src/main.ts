import { createApp, defineAsyncComponent } from 'vue'
import * as Vue from 'vue';
import App from './App.vue';
import router from './router';
import initConfig from './init/config';
import { createPinia } from 'pinia';
import * as $router from 'vue-router';

const app = createApp(App);

declare global {
    interface Window {
        App: Vue.App<Element>;
        Vue: any;
        Router: any;
    }
}

const pinia = createPinia();

window.App = app;
window.Vue= Vue;
window.Router = $router;

app.use(pinia);

initConfig(app, router);

app.use(router);
app.mount('#app');