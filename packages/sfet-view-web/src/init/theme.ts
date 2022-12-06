import { SFETWebConfigTheme } from "../class/config";

const getStr = (obj: {[key: string]: string | number}, pre: string = ''): string => {
    return Object.keys(obj).map(v => `${pre}${v}: ${obj[v]};`).join('\n');
};

const handleTheme = (config: SFETWebConfigTheme) => {
    const css = config.css || {};
    const vars = config.var || {};
    let style: HTMLStyleElement = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        :root {
            ${getStr(css)}
            ${getStr(vars, '--sfet-')}
        }
    `;
    document.querySelector('head')?.appendChild(style);
};

export default handleTheme;