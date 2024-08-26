import type { Item } from '../ProductTypes';
import type { ProductContextState, Actions, ProductAndQuery } from '../ProductContextProvider';
export declare function getSelectedItem(skuId: string | undefined, items: Item[]): Item | undefined;
export declare const useProductReducer: ({ query, product }: ProductAndQuery) => [ProductContextState, import("react").Dispatch<Actions>];
