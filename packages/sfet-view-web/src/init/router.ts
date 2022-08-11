import { Router, RouteRecordRaw } from 'vue-router';
import SFETWebConfig, { SFETWebConfigRouteItem } from '../class/config';
import { strToFunc } from '../common/func';

const layouts = import.meta.glob('../../node_modules/sfet-lib-web/lib/layout/*/*.vue');
const getHandleRoute = (router: Router, config: SFETWebConfig) => {
    const handleRoute = (routes: SFETWebConfigRouteItem[] = [], parent?: any): RouteRecordRaw | undefined => {
        let defaultRoute: RouteRecordRaw | undefined;
        routes.forEach((item: any) => {
            let currentDefault: RouteRecordRaw | undefined;
            // if (item.children && item.children.length > 0) {
            //     currentDefault = handleRoute(item.children, item.name);
            // }
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
                // if (item.default) {
                //     // route.path = '';
                // }
                router.addRoute(parent, route);
                // if (item.default) {
                //     defaultRoute = currentDefault || route;
                //     router.addRoute(parent, {
                //         name: item.name + '-default',
                //         path: '',
                //         redirect: defaultRoute
                //     });
                // }
            } else {
                // if (item.default) {
                //     // route.path = '/';
                //     // route.name = 'root';
                // }
                router.addRoute(route);
                // if (item.default) {
                //     defaultRoute = currentDefault || route;
                //     router.addRoute({
                //         name: item.name + '-default',
                //         path: '',
                //         redirect: defaultRoute
                //     });
                // }
            }

            if (item.children && item.children.length > 0) {
                currentDefault = handleRoute(item.children, item.name);
            }
            // if (item.children && item.children.length > 0) {
            //     handleRoute(item.children, route.name);
            // }
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
        // console.log(router, routes);
        console.log(router.getRoutes());
        return defaultRoute;
    };
    return handleRoute;
}

export default getHandleRoute;