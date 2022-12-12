import { App } from "vue";
import { SFETWebConfigEvent } from "../class/config";
import { strToFunc } from '../common/func';

export type SFETEventObj = unknown | Function;

const handleEvent = (app: App, config: SFETWebConfigEvent) => {
    let eventMap: Record<string, Function> = {
        '-1': function() {console.log('empty event: ', arguments);}
    };
    Object.entries(config).forEach(([id, item]) => {
        try {
            if (item.type === 'f') {
                eventMap[id] = strToFunc(item.body as string, item);
            } else {
                // propMap[id] = item.config;
            }
        } catch(err) {
            console.log(err);
        }
    });
    app.config.globalProperties.$sfet.event = eventMap;
};

export default handleEvent;