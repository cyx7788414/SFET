import { App } from "vue";
import { SFETWebConfigApi } from "../class/config";
import { strToFunc } from '../common/func';

// export type SFETPropObj = unknown | Function;

const handleApi = (app: App, config: SFETWebConfigApi) => {
    // let propMap: Record<string, SFETPropObj> = {};
    // Object.entries(config).forEach(([id, item]) => {
    //     try {
    //         if (item.handle) {
    //             propMap[id] = strToFunc(item.handle, item);
    //         } else {
    //             propMap[id] = item.config;
    //         }
    //     } catch(err) {
    //         console.log(err);
    //     }
    // });
    // app.config.globalProperties.$sfet.prop = propMap;
};

export default handleApi;