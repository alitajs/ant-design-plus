export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ArgsType<T extends (...a: any) => any> = T extends (...a: infer R) => any ? R : any;
