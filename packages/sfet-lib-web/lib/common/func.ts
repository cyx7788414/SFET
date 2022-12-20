import { reactive, watch } from "vue";


const getProp = function($global: any, id: string): any {
    let prop = $global.$sfet.prop[id];//will loose reactive
    if (!prop) {
        return {};
    }
    if (typeof prop === 'function') {
        prop = prop();
    }
    prop = reactive(prop);//to make prop reactive
    Object.entries(prop).forEach(([key, item]) => {
        if (typeof item === 'string' && item.startsWith('$sfetData:')) {
            let index: string[] = item.substring(10).split('-');
            let dataId = index[0];
            let subIndex = index[1] || 'data';
            const store = $global.$sfet.data[dataId]();
            watch(store, (n, o) => {//watch store to follow child change
                prop[key] = store[subIndex];
            }, {immediate: true});
        }
    });
    return prop;
};

export {
    getProp
};