import { App } from 'vue';
import { Router, RouteRecordRaw } from 'vue-router';
import SFETWebConfig, { SFETWebConfigRouteItem } from '../class/config';
import { strToFunc } from '../common/func';

const layouts = import.meta.glob('../../node_modules/sfet-lib-web/lib/layout/*/*.vue');
const handleRoute = (app: App, router: Router, config: SFETWebConfig) => {
    router.afterEach((to, from, failure) => {
        if (!failure) {
            let i;
            for (i = 0; i < to.matched.length; i++) {
                if (to.matched[i] !== from.matched[i]) {
                    break;
                }
            }
            to.matched.slice(i).forEach(v => {
                if (!v.meta.eventAfter) {return;}
                let call = app.config.globalProperties.$sfet.event[v.meta.eventAfter as string || '-1'];
                call(v);
            });
        }
    });
    const buildRoute = (routes: SFETWebConfigRouteItem[] = [], parent?: any): RouteRecordRaw | undefined => {
        let defaultRoute: RouteRecordRaw | undefined;
        routes.forEach((item: any) => {
            let route: RouteRecordRaw = {
                name: item.name,
                path: item.path,
                meta: {},
                component: layouts[`../../node_modules/sfet-lib-web/lib/layout/${item.layout}/${item.layout}.vue`],
                props: route => {//
                    const prop = config.props[item.id];
                    if (prop && prop.handle) {
                        return strToFunc(prop.handle, prop)();
                    } else {
                        return prop?.config || {};
                    }
                }
            };
            //event
            if (item.eventAfter) {
                route.meta!.eventAfter = item.eventAfter;
            }

            //
            if (parent) {
                router.addRoute(parent, route);
            } else {
                router.addRoute(route);
            }
            let currentDefault: RouteRecordRaw | undefined;
            if (item.children && item.children.length > 0) {
                currentDefault = buildRoute(item.children, item.name);
            }
            if (item.default) {
                defaultRoute = currentDefault || route;
                let redirect = {
                    name: item.name + '-default',
                    path: '',
                    redirect: defaultRoute
                };
                if (parent) {
                    router.addRoute(parent, redirect);
                } else {
                    router.addRoute(redirect);
                }
            }
        });
        return defaultRoute;
    };
    buildRoute(config.routes);
}

export default handleRoute;