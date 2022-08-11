

const getProp = function($global: any, id: string): any {
    let prop = $global.$sfet.prop[id];
    if (typeof prop === 'function') {
        prop = prop();
    }
    Object.entries(prop).forEach(([id, item]) => {
        if (typeof item === 'string' && item.startsWith('$sfetData:')) {
            let dataId = item.substring(10);
            prop[id] = $global.$store.state.data[dataId].data;
        }
    });
    return prop;
};

export {
    getProp
};