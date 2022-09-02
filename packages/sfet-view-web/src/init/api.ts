import { App } from "vue";
import { SFETWebConfigApi, SFETWebConfigApiItem } from "../class/config";
import { strToFunc } from '../common/func';

import axios, { AxiosRequestHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';

export type SFETApiObj = {
    loading: boolean; 
    func?: Function;
};
export type SFETApiData = {
    status: string;
    msg: string;
    data: any;
};
export type SFETApiError = {
    status?: string | number;
    msg: any;
};

const getRequest = function(item: SFETWebConfigApiItem, data: Object = {}, header: Record<string, string | number | boolean> = {}) {
    let obj = {
        url: `${item.origin || ''}${item.pathname || '/api/'}`,
        method: item.method || 'get',
        headers: Object.assign({}, item.header || {}, header || {}),
        params: Object.assign({}, item.param || {}, item.method && item.method !== 'get'?{}:data),
        data: Object.assign({}, item.method && item.method !== 'get'?data:{})
    };
    let config = item.configHandle?strToFunc(item.configHandle, item)(obj):{};
    return axios(Object.assign(obj, config));
};

const handleApi = (app: App, config: SFETWebConfigApi) => {
    let apiMap: Record<string, SFETApiObj> = {};
    Object.entries(config).forEach(([id, item]) => {
        try {
            let onSuccess = item.onSuccess?strToFunc(item.onSuccess, item)():undefined;
            let onError = item.onError?strToFunc(item.onError, item)():undefined;
            let obj: SFETApiObj = {
                loading: false,
                func: undefined
            };
            if (item.type === 'standard') {
                obj.func = function(data: Object = {}, header?: Record<string, string | number | boolean>) {
                    return new Promise<SFETApiData | SFETApiError>((resolve, reject) => {
                        obj.loading = true;
                        const instance = getRequest(item, data, header);
                        instance.then((response: AxiosResponse<SFETApiData, any>) => {
                            obj.loading = false;
                            if (response.status === 200 && response.data.status === '2000') {
                                onSuccess && onSuccess();
                                resolve(response.data.data);
                            } else {
                                onError && onError();
                                reject({
                                    status: response.data?.status || response.status,
                                    msg: response.data?.msg || response.statusText
                                });
                            }
                        }).catch((reason) => {
                            obj.loading = false;
                            onError && onError();
                            reject({
                                msg: reason
                            });
                        });
                    });
                }
            } else if (item.type === 'ns') {
                obj.func = function(data: Object = {}, header?: Record<string, string | number | boolean>) {
                    const instance = getRequest(item, data, header);
                    instance.then((response) => {
                        if (response.status === 200 ) {

                        } else {

                        }
                    }).catch((reason) => {

                    });
                }
            }
            apiMap[id] = obj;
        } catch(err) {
            console.log(err);
        }
    });
    // app.config.globalProperties.$sfet.prop = propMap;
};

export default handleApi;