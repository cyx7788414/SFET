import { AxiosRequestHeaders } from "axios";

export type SFETWEbConfigTheme = {
    css?: {
        [key: string]: string;
    };
    var?: {
        [key: string]: string | number;
    }
};

export type SFETWebConfigDataItem = {
    type: 'static' | 'dynamic' | 'process';
    data?: any;
    handle?: string;
    // origin?: string;
    // pathname?: string;
    // method?: string;
    // cache?: boolean;
    // preload?: boolean;
    // children?: Array<string>,
    // headers?: AxiosRequestHeaders;
    // params?: Object;
};

export type SFETWebConfigData = {
    [key: string]: SFETWebConfigDataItem;
};

export type SFETWebConfigApiItem = {
    type: 'standard' | 'ns';
    irigin?: string;
    pathname?: string;
    method: 'get' | 'post' | 'put' | 'delete';
    // "origin": "http://127.0.0.1:4523",
    //         "pathname": "/m1/1482061-0-default/api/test/a",
    //         "method": "get"
}

export type SFETWebConfigApi = {
    [key: string]: SFETWebConfigApiItem;
}

export type SFETWebConfigPropItem = {
    config: Record<string, string | number | boolean | null | undefined | any[] | object >;
    handle?: string;
};

export type SFETWebConfigProp = {
    [key: string]: SFETWebConfigPropItem;
};

export type SFETWebConfigRouteItem = {
    id: string;
    path?: string;
    name: string;
    layout: string;
    default?: boolean;
    children?: Array<SFETWebConfigRouteItem>;
};

type SFETWebConfig = {
    routes?: Array<SFETWebConfigRouteItem>;
    theme?: SFETWEbConfigTheme;  
    data?: SFETWebConfigData;
    props: SFETWebConfigProp;
};

export default SFETWebConfig;