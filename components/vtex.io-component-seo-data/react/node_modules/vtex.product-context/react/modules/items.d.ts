import type { Item, Seller } from '../ProductTypes';
export declare function findAvailableProduct(item: Item): Seller | undefined;
export declare function itemHasVariation(item: Item, { name, value }: {
    name: string;
    value: string;
}): boolean;
