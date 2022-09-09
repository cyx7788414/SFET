import { App } from "vue";
import { SFETWebConfigData } from "../class/config";
import { strToFunc } from '../common/func';

import axios from 'axios';
import { Pinia, defineStore } from "pinia";
import { SFETApiObj } from "./api";


export type SFETDataSubscriber = {
    callback: Function;
    onError?: Function;
    keep?: Boolean;
    called?: boolean;
}

export type SFETDataObj = {
    data: any;
    status: 'done' | 'loading' | 'error';
    subscriber?: Array<SFETDataSubscriber>;
    refresh?: Function
}

const handleData = (app: App, config: SFETWebConfigData) => {
    // let dataMap: Record<string, SFETDataObj> = {};
    // const $store = app.config.globalProperties.$store;
    // $store.registerModule('data', {
    //     namespaced: true
    // });
    const $pinia: Pinia = app.config.globalProperties.$pinia;
    const $api: Record<string, SFETApiObj> = app.config.globalProperties.$sfet.api;
    Object.entries(config).forEach(([id, item]) => {
        try {
            if (item.type === 'static') {
                // dataMap[id] = {
                //     data: item.handle?strToFunc(item.handle, item)(item.data):item.data,
                //     status: 'done'
                // };
                const data = item.handle?strToFunc(item.handle, item)(item.data):item.data;
                // $store.registerModule(['data', id], {
                //     namespaced: true,
                //     state() {
                //         return {
                //             data: data
                //         };
                //     },
                //     // getters: {
                //     //     data(state: any) {
                //     //         return state.data;
                //     //     }
                //     // }
                // });
                defineStore(`data-${id}`, {
                    state: () => {
                        return {
                            data: data,
                            loading: false
                        };
                    }
                })();
            } else if (item.type === 'dynamic') {
                defineStore(`data-${id}`, {
                    state: () => {
                        return {
                            data: item.default,
                            loading: false
                        };
                    },
                    actions: {
                        async update() {
                            this.loading = true;
                            this.data = await $api[item.api!].func!();
                            this.loading = false;
                        },
                        reset() {
                            this.data = item.default;
                        }
                    }
                })();
                // let obj: SFETDataObj = {
                //     data: undefined,
                //     status: 'loading',
                //     subscriber: [],
                //     refresh: (params?: Object) => {
                //         axios({
                //             url: `${item.origin || ''}${item.pathname || '/api/'}`,
                //             method: item.method || 'get',
                //             headers: item.headers,
                //             params: params || {}
                //         }).then(function (response) {
                //             if (response.status === 200) {
                //                 obj.status = 'done';
                //                 let data = item.handle?strToFunc(item.handle, item)(response.data.data):response.data.data;
                //                 if (item.cache) {
                //                     obj.data = data;
                //                 }
                //                 obj.subscriber?.forEach(sub => {
                //                     sub.callback(data);
                //                     sub.called = !sub.keep;
                //                 });
                //             } else {
                //                 obj.subscriber?.forEach(sub => {
                //                     sub.onError && sub.onError(response.data);
                //                     sub.called = !sub.keep;
                //                 });
                //             }
                //             obj.subscriber = obj.subscriber?.filter(sub => !sub.called);
                //         }).catch(function (error) {
                //             console.log(error);
                //         });
                //     }
                // };
                // dataMap[id] = obj;
                // if (item.preload) {
                //     obj.refresh && obj.refresh();
                // }
            }
        } catch(err) {
            console.log(err)
        }
    });
    // app.config.globalProperties.$sfet.data = dataMap;
};

export default handleData;