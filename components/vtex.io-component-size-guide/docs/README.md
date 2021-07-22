# Custom Components

## Description

Custom Components is a collection of components that can be used to create/extend others VTEX apps.

## Table of Contents

-   [Usage](#usage)
-   [Components Specs](#components-specs)

## Usage

This app uses our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

To use this app, you need to import in your dependencies on `manifest.json`.

```json
  "dependencies": {
    "blacksipqa.size-guide": "0.x"
  }
```

For example, now you can change the behavior of `product-price` block that is in the product details. See an example of how to configure:

```json
{
    "flex-layout.col#right-col": {
        "props": {
            "preventVerticalStretch": true,
            "rowGap": 0
        },
        "children": [
            "add-to-list-btn",
            "flex-layout.row#product-name",
            "product-rating-summary",
            "flex-layout.row#product-brand",
            "product-identifier.product",
            "product-price#product",
            "blacksipqa.size-guide:size-guide",
            "product-separator",
            "sku-selector",
            "product-quantity",
            "product-assembly-options",
            "product-gifts",
            "flex-layout.row#buy-button",
            "availability-subscriber",
            "flex-layout.row#share-and-payments"
        ]
    }
}
```

## Components Specs

Below we have a README for each component of this project that explains how to use them.

-   [Size Guide](SizeGuide.md)
