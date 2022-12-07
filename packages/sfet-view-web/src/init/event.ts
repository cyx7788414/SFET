import { App } from "vue";
import { SFETWebConfigEvent } from "../class/config";
import { strToFunc } from '../common/func';

export type SFETEventObj = unknown | Function;

const handleEvent = (app: App, config: SFETWebConfigEvent) => {
    let eventMap: Record<string, SFETEventObj> = {};
    Object.entries(config).forEach(([id, item]) => {
        try {
            // if (item.handle) {
            //     propMap[id] = strToFunc(item.handle, item);
            // } else {
            //     propMap[id] = item.config;
            // }
        } catch(err) {
            console.log(err);
        }
    });
    app.config.globalProperties.$sfet.event = eventMap;
};

export default handleEvent;