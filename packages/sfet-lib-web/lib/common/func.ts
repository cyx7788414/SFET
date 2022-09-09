

const getProp = function($global: any, id: string): any {
    let prop = $global.$sfet.prop[id];
    if (typeof prop === 'function') {
        prop = prop();
    }
    Object.entries(prop).forEach(([key, item]) => {
        if (typeof item === 'string' && item.startsWith('$sfetData:')) {
            let index: string[] = item.substring(10).split('-');
            let dataId = index[0];
            let subIndex = index[1] || 'data';
            // prop[key] = $global.$store.state.data[dataId].data;
            prop[key] = $global.$pinia.state.value[`data-${dataId}`][subIndex];
        }
    });
    return prop;
};

export {
    getProp
};