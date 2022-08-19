import { Router, RouteRecordRaw } from 'vue-router';
import SFETWebConfig, { SFETWebConfigRouteItem } from '../class/config';
import { strToFunc } from '../common/func';

const layouts = import.meta.glob('../../node_modules/sfet-lib-web/lib/layout/*/*.vue');
const getHandleRoute = (router: Router, config: SFETWebConfig) => {
    const handleRoute = (routes: SFETWebConfigRouteItem[] = [], parent?: any): RouteRecordRaw | undefined => {
        let defaultRoute: RouteRecordRaw | undefined;
        routes.forEach((item: any) => {
            let route: RouteRecordRaw = {
                name: item.name,
                path: item.path,
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
            if (parent) {
                router.addRoute(parent, route);
            } else {
                router.addRoute(route);
            }
            let currentDefault: RouteRecordRaw | undefined;
            if (item.children && item.children.length > 0) {
                currentDefault = handleRoute(item.children, item.name);
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
    return handleRoute;
}

export default getHandleRoute;