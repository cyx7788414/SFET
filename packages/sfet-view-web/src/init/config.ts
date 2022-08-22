import { App } from "vue";
import { Router } from "vue-router";
import SFETWebConfig from "../class/config";
import json from '../config.json';
import handleData from "./data";
import handleProp from "./prop";
import getHandleRoute from "./router";
import handleTheme from "./theme";

const initConfig = (app: App, router: Router) => {
    const staticConfig = json.build?json:null;
    const cacheConfig = JSON.parse(localStorage.getItem('sfet-config') || 'null');
    let asyncConfig: any = null;
    let loadingStackPath: string = '';
    const handleConfig = function(config: SFETWebConfig) {
        
        app.config.globalProperties.$sfet = {
            config: config
        };

        config.data && handleData(app, config.data || {});

        config.props && handleProp(app, config.props || {});

        getHandleRoute(router, config)(config.routes);

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