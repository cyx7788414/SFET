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