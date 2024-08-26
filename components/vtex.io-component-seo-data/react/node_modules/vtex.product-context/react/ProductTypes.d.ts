export type { ProductContextState, AssemblyOptionItem, SkuSelectorContextState, } from './ProductContextProvider';
declare type Maybe<T> = T | null | undefined;
export declare type MaybeProduct = Maybe<Product>;
export declare type ProductSpecification = {
    name: string;
    originalName: string;
    values: string[];
};
/** @deprecated Use `ProductSpecification` */
export declare type SpecificationGroupItem = ProductSpecification;
export declare type SpecificationGroup = {
    name: string;
    originalName: string;
    specifications: ProductSpecification[];
};
export declare type Product = {
    brand: string;
    brandId: string;
    cacheId: string;
    categories: string[];
    categoriesIds: string[];
    categoryId: string;
    categoryTree: Array<{
        id: string;
        name: string;
        href: string;
    }>;
    clusterHighlights: Array<{
        id: string;
        name: string;
    }>;
    description: string;
    itemMetadata: ItemMetadata;
    items: Item[];
    link: string;
    linkText: string;
    metaTagDescription: string;
    priceRange: {
        sellingPrice: {
            highPrice: number;
            lowPrice: number;
        };
        listPrice: {
            highPrice: number;
            lowPrice: number;
        };
    };
    productClusters: Array<{
        id: string;
        name: string;
    }>;
    productId: string;
    productName: string;
    productReference: string;
    properties: ProductSpecification[];
    skuSpecifications: SkuSpecification[];
    specificationGroups: SpecificationGroup[];
    titleTag: string;
};
export declare type Item = {
    complementName: string;
    ean: string;
    images: Array<{
        imageId: string;
        imageLabel: string;
        imageTag: string;
        imageUrl: string;
        imageText: string;
    }>;
    itemId: string;
    measurementUnit: string;
    name: string;
    nameComplete: string;
    referenceId: Array<{
        Key: string;
        Value: string;
    }>;
    sellers: Seller[];
    unitMultiplier: number;
    variations: Array<{
        name: string;
        values: string[];
    }>;
    videos: Array<{
        videoUrl: string;
    }>;
};
export declare type SkuSpecification = {
    field: SkuSpecificationField;
    values: SkuSpecificationValues[];
};
export declare type SkuSpecificationField = {
    name: string;
};
export declare type SkuSpecificationValues = {
    name: string;
};
export declare type Seller = {
    sellerId: string;
    sellerName: string;
    addToCartLink: string;
    sellerDefault: boolean;
    commertialOffer: CommercialOffer;
};
declare type TeaserCondition = {
    minimumQuantity: number;
    parameters: Array<{
        name: string;
        value: string;
    }>;
};
declare type TeaserEffects = {
    parameters: Array<{
        name: string;
        value: string;
    }>;
};
export declare type Teaser = {
    name: string;
    conditions: TeaserCondition;
    effects: TeaserEffects;
};
export declare type CommercialOffer = {
    Installments: Installment[];
    discountHighlights: Array<{
        name: string;
    }>;
    teasers: Teaser[];
    Price: number;
    ListPrice: number;
    spotPrice: number;
    SellingPrice?: number;
    PriceWithoutDiscount: number;
    RewardValue: number;
    PriceValidUntil: string;
    AvailableQuantity: number;
    Tax: number;
    taxPercentage: number;
    CacheVersionUsedToCallCheckout: string;
};
export declare type Installment = {
    Value: number;
    InterestRate: number;
    TotalValuePlusInterestRate: number;
    NumberOfInstallments: number;
    PaymentSystemName: string;
    PaymentSystemGroupName: string;
    Name: string;
};
export declare type ItemMetadata = {
    items: Array<{
        id: string;
        name: string;
        imageUrl: string;
        seller: string;
        assemblyOptions: Array<{
            id: string;
            name: string;
            required: boolean;
            inputValues: InputValue[];
            composition: Composition | null;
        }>;
    }>;
    priceTable: Array<{
        type: string;
        values: Array<{
            id: string;
            assemblyId: string;
            price: number | null;
        }>;
    }>;
};
export declare type InputValue = TextInputValue | BooleanInputValue | OptionsInputValue;
declare const enum InputValueType {
    'TEXT' = "TEXT",
    'BOOLEAN' = "BOOLEAN",
    'OPTIONS' = "OPTIONS"
}
export declare type TextInputValue = {
    type: InputValueType.TEXT;
    defaultValue: '';
    label: string;
    maxLength: number;
    domain: null;
};
export declare type BooleanInputValue = {
    type: InputValueType.BOOLEAN;
    defaultValue: boolean;
    label: string;
    maxLength: null;
    domain: null;
};
export declare type OptionsInputValue = {
    type: InputValueType.OPTIONS;
    defaultValue: string;
    label: string;
    maxLength: null;
    domain: string[];
};
export declare type Composition = {
    minQuantity: number;
    maxQuantity: number;
    items: Array<{
        id: string;
        minQuantity: number;
        maxQuantity: number;
        priceTable: string;
        seller: string;
        initialQuantity: number;
    }>;
};
