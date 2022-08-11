import { App } from "vue";
import { SFETWebConfigProp } from "../class/config";
import { strToFunc } from '../common/func';

export type SFETPropObj = unknown | Function;

const handleProp = (app: App, config: SFETWebConfigProp) => {
    let propMap: Record<string, SFETPropObj> = {};
    Object.entries(config).forEach(([id, item]) => {
        try {
            if (item.handle) {
                propMap[id] = strToFunc(item.handle, item);
            } else {
                propMap[id] = item.config;
            }
        } catch(err) {
            console.log(err);
        }
    });
    app.config.globalProperties.$sfet.prop = propMap;
};

export default handleProp;