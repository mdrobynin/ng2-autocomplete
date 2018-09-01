export interface IDynamicComponentData {
    item: any;
    callback: (any) => any;
}

export interface IToastData {
    component: any;
    delay: number;
    data?: IDynamicComponentData;
}
