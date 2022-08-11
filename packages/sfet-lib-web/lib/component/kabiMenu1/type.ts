import { ComponentPropsTheme } from "lib/common/type";


export type KabiMenu1DataItem = {
    id: string;
    name: string;
    path?: string;
    icon?: {
        component: string;
        props?: unknown;
    };
    group?: boolean;
    children?: KabiMenu1DataItem[];
};

export type KabiMenu1Props = {
    data?: KabiMenu1DataItem[];
    theme?: ComponentPropsTheme;
};