export declare function exclude<Model, Key extends keyof Model>(model: Model, keys: Key[]): Omit<Model, Key>;
