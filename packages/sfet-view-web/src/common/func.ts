
export const strToFunc = function(funcBody: string = '', that?: any, ...rest: any[]) {
    return (...args: any[]) => {
        return new Function('$global', '...rest', funcBody).apply(that, [window.App.config.globalProperties, ...rest, ...args]);
    }
};