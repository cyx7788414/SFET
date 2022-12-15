import { App } from "vue";
import { Router } from "vue-router";
import SFETWebConfig from "../class/config";
import json from '../config.json';
import handleData from "./data";
import handleProp from "./prop";
import handleRoute from "./route";
import handleTheme from "./theme";
import handleApi from "./api";
import handleEvent from "./event";

const initConfig = (app: App, router: Router) => {
    const staticConfig = json.build?json:null;
    const cacheConfig = JSON.parse(localStorage.getItem('sfet-config') || 'null');
    let asyncConfig: any = null;
    let loadingStackPath: string = '';
    const handleConfig = function(config: SFETWebConfig) {
        
        app.config.globalProperties.$sfet = {
            config: config
        };

        config.api && handleApi(app, config.api || {});

        config.data && handleData(app, config.data || {});

        config.event && handleEvent(app, config.event || {});

        config.prop && handleProp(app, config.prop || {});

        config.route && handleRoute(app, router, config.route);

        config.theme && handleTheme(config.theme || {css: {}, var: {}});


        if (loadingStackPath) {
            router.replace(loadingStackPath);
        } else {
            router.replace('/');
        }
    }
    if (!staticConfig && !cacheConfig) {
    // if (true) {
        asyncConfig = staticConfig;//
        localStorage.setItem('sfet-config', JSON.stringify(asyncConfig));
        window.setTimeout(() => {
            handleConfig(asyncConfig);
        }, 1500);
    } else {
        handleConfig(staticConfig || cacheConfig);
    }
    router.afterEach((to, from, failure) => {
        if (!to.matched.length) {
            if (!staticConfig && !asyncConfig) {
                loadingStackPath = to.fullPath;
                router.push('/');
            } else {
                router.push('/404');
            }
        }
    });
};

export default initConfig;