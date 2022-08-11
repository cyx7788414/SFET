import { layout1 } from "./layout1";
import { layout2 } from "./layout2";
import { layout3 } from "./layout3";
import { kabiLayout1 } from "./kabiLayout1";

const layoutList = [
    layout1,
    layout2,
    layout3,
    kabiLayout1
];

export {layoutList};

// export default {
//     ...layoutList
// };
export * from './layout1';
export * from './layout2';
export * from './layout3';
export * from './kabiLayout1';