export type EntityChangeset<T = any> = {
  inserts: Array<{index: number; value: T}>;
  updates: Array<{index: number; value: T}>;
  deletions: Array<number>;
};
