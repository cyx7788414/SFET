

const getProp = function($global: any, id: string): any {
    let prop = $global.$sfet.prop[id];
    if (typeof prop === 'function') {
        prop = prop();
    }
    Object.entries(prop).forEach(([key, item]) => {
        if (typeof item === 'string' && item.startsWith('$sfetData:')) {
            let dataId = item.substring(10);
            // prop[key] = $global.$store.state.data[dataId].data;
            prop[key] = $global.$pinia.state.value[`data-${dataId}`].data
        }
    });
    return prop;
};

export {
    getProp
};