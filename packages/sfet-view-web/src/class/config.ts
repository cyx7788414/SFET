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
    type: 's' | 'd' | 'p';//s: static, d: dynamic, p: process
    data?: any;
    default?: any;
    api?: string;
    handle?: string;
};

export type SFETWebConfigData = {
    [key: string]: SFETWebConfigDataItem;
};

export type SFETWebConfigApiItem = {
    type: 's' | 'ns'; // s: standard, ns: no standard
    origin?: string;
    pathname?: string;
    method: 'get' | 'post' | 'put' | 'delete';
    header?: Record<string, string | number | boolean>;
    param?: Record<string, any>;
    data?: any;
    configHandle?: string;
    onSuccess?: string;
    onError?: string;
    nsCheck?: string;
    nsHandle?: string;
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
    api?: SFETWebConfigApi
};

export default SFETWebConfig;