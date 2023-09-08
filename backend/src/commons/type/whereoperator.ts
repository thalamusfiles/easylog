export type ExpandProperty<T> = T extends (infer U)[] ? NonNullable<U> : NonNullable<T>;
export type Scalar = boolean | number | string | bigint | symbol | Date | RegExp | Uint8Array; //| { toHexString(): string; }
export type ExpandScalar<T> = null | (T extends string ? T | RegExp : T extends Date ? Date | string : T);
export type OperatorMap<T> = {
  $and?: Query<T>[];
  $or?: Query<T>[];
  $not?: Query<T>;
  $eq?: ExpandScalar<T> | ExpandScalar<T>[];
  $ne?: ExpandScalar<T>;
  $in?: ExpandScalar<T>[];
  $nin?: ExpandScalar<T>[];
  $gt?: ExpandScalar<T>;
  $gte?: ExpandScalar<T>;
  $lt?: ExpandScalar<T>;
  $lte?: ExpandScalar<T>;
  //$like?: string;
  //$re?: string;
  //$ilike?: string;
  //$fulltext?: string;
  //$overlap?: string[];
  $contains?: string[];
  //$contained?: string[];
  $exists?: boolean;
};

export type FilterValue2<T> = T | ExpandScalar<T>;
export type FilterValue<T> = OperatorMap<FilterValue2<T>> | FilterValue2<T> | FilterValue2<T>[] | null;
type ExpandObject<T> = T extends object
  ? T extends Scalar
    ? never
    : {
        -readonly [K in keyof T]?: Query<ExpandProperty<T[K]>> | FilterValue<ExpandProperty<T[K]>> | null;
      }
  : never;
export type Query<T> = T extends object ? (T extends Scalar ? never : FilterQuery<T>) : FilterValue<T>;
export type EntityProps<T> = { -readonly [K in keyof T]?: T[K] };
export type ObjectQuery<T> = ExpandObject<T> & OperatorMap<T>;
export type FilterQuery<T> = ObjectQuery<T> | NonNullable<EntityProps<T> & OperatorMap<T>> | FilterQuery<T>[];

//Outros operadores não implementados: '$like' | '$re' | '$fulltext' | '$ilike' | '$overlap' | '$contained'
export type QueryOperator = '$eq' | '$in' | '$nin' | '$gt' | '$gte' | '$lt' | '$lte' | '$ne' | '$not' | '$exists' | '$contains';
export const QueryOperators: Array<string> = ['$eq', '$in', '$nin', '$gt', '$gte', '$lt', '$lte', '$ne', '$not', '$exists', '$contains'];

/*type Teste1 = { aaaa: string; bbbb: { aaaa: string } };
const teste1: FilterQuery<Teste1> = {
  aaaa: { $eq: '11' },
  bbbb: { aaaa: { $and: [{ $eq: '123' }, { $like: 'a123' }] } },
};

type Teste2 = any;
const teste2: FilterQuery<Teste2> = {
  aaaa: { $eq: '11' },
  bbbb: { aaaa: { $and: [{ $eq: '123' }, { $like: 'a123' }] } },
  ccc: { $gte: 'aaaa' },
  ddd: { $as: 123 },
};*/
