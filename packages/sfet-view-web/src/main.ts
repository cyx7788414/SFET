import { createApp, defineAsyncComponent } from 'vue'
import * as Vue from 'vue';
import App from './App.vue';
import router from './router';
import initConfig from './init/config';
import { createStore, Store } from 'vuex';

const app = createApp(App);

declare global {
    interface Window {
        App: Vue.App<Element>;
        Vue: unknown;
    }
}

const store = createStore({});

window.App = app;
window.Vue= Vue;

app.use(store);

initConfig(app, router);

app.use(router);
app.mount('#app');