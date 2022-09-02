import { createApp, defineAsyncComponent } from 'vue'
import * as Vue from 'vue';
import App from './App.vue';
import router from './router';
import initConfig from './init/config';
// import { createStore, Store } from 'vuex';
import { createPinia } from 'pinia';

const app = createApp(App);

declare global {
    interface Window {
        App: Vue.App<Element>;
        Vue: unknown;
    }
}

// const store = createStore({});

const pinia = createPinia();

window.App = app;
window.Vue= Vue;

// app.use(store);
app.use(pinia);

initConfig(app, router);

app.use(router);
app.mount('#app');