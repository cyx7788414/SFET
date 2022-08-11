export type ComponentPropsTheme = {
    css?: Array<string>;
    var?: {
        [key: string]: string | number;
    }
};

export type PropsComponentItem = {
    name: string;
    type: 'component' | 'layout';
    id: string;
}