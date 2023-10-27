type SafeKey<T> = T extends string | number | boolean ? `${T}` : never

type ObjectPaths<O extends {}> = SafeKey<
    {
        [k in keyof O]: k | `${SafeKey<k>}.${Paths<O[k]>}`
    }[keyof O]
>

type ArrayPaths<O extends any[]> = O extends Array<infer U>
    ? `${number}` | `${number}.${Paths<U>}`
    : never

type LeafTypes =
    | string
    | number
    | boolean
    | null
    | undefined
    | Date
    | RegExp
    | Map<any, any>
    | Set<any>
    | WeakMap<any, any>
    | WeakSet<any>

type PathsOptions = {
    onlyLeaves: boolean
}

type _Paths<O> = O extends LeafTypes
    ? never
    : O extends any[]
    ? ArrayPaths<O>
    : O extends Object
    ? ObjectPaths<O>
    : never

// --- only leaves version

type ObjectPathsOnlyLeaves<O extends {}> = SafeKey<
    {
        [k in keyof O]: O[k] extends LeafTypes ? k : `${SafeKey<k>}.${Paths<O[k]>}`
    }[keyof O]
>

type ArrayPathsOnlyLeaves<O extends any[]> = O extends Array<infer U>
    ? U extends LeafTypes
    ? `${number}`
    : `${number}.${Paths<U>}`
    : never

type _PathsOnlyLeaves<O> = O extends LeafTypes
    ? never
    : O extends any[]
    ? ArrayPathsOnlyLeaves<O>
    : O extends Object
    ? ObjectPathsOnlyLeaves<O>
    : never


export type Paths<
    O,
    Options extends PathsOptions = { onlyLeaves: false }
> = Options['onlyLeaves'] extends true ? _PathsOnlyLeaves<O> : _Paths<O>
