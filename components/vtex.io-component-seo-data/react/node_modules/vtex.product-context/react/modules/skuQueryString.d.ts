import type { Item } from '../ProductTypes';
interface QueryParams {
    skuId?: string;
    idsku?: string;
}
export declare const getSelectedSKUFromQueryString: (query: QueryParams, items?: Item[]) => string | undefined;
export {};
