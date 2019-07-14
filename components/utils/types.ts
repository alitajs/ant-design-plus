export type PowerPartial<T> = { [U in keyof T]?: T[U] extends object ? PowerPartial<T[U]> : T[U] };

export type PowerRequired<T> = {
  [U in keyof T]-?: T[U] extends object ? PowerRequired<T[U]> : T[U];
};

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ArgsType<T extends (...a: any) => any> = T extends (...a: infer R) => any ? R : any;

export type ArgsOrArg0<T extends (...a: any) => any> = ArgsType<T> extends [ArgsType<T>[0]]
  ? (ArgsType<T> | ArgsType<T>[0])
  : ArgsType<T>;
