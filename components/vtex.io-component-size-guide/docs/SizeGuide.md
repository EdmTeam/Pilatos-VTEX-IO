# Size Guide

The `size-guide` is the block is responsible for showing the size guide of a product, it is only shown if the indicated conditions are met, it only works in the context of the product

![image](https://user-images.githubusercontent.com/17678382/101969972-95bab680-3bf5-11eb-8c50-613be125db6e.PNG)
![image](https://user-images.githubusercontent.com/17678382/101969979-9d7a5b00-3bf5-11eb-8206-536ac947a94b.PNG)

## Configuration

1. Import the `blacksipqa.size-guide` app to your theme's dependencies in the `manifest.json`, for example:

```json
{
    "dependencies": {
        "blacksipqa.size-guide": "0.x"
    }
}
```

2. Add the `size-guide` block to any block below `store.product` (page product). For example:

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
    },
    "blacksipqa.size-guide:size-guide": {
        "props": {
            "conditionals": [
                {
                    "brands": ["121", "2000001"],
                    "categories": ["40"],
                    "imageDesktop": "/arquivos/camisa.png",
                    "imageTablet": "/arquivos/camisaTablet.png",
                    "imagePhone": "/arquivos/camisaPhone.png"
                },
                {
                    "categories": ["41"],
                    "imageDesktop": "/arquivos/pantalon.png",
                    "imageTablet": "/arquivos/pantalon.png",
                    "imagePhone": "/arquivos/pantalonPhone.png"
                }
            ]
        }
    }
}
```

| Prop name      | Type     | Description                                                   | Default value           |
| -------------- | -------- | ------------------------------------------------------------- | ----------------------- |
| `conditionals` | `Object` | Conditions to show the size guide, all conditions must be met | `Object *conditionals*` |

-   **`conditionals` object**

| Prop name      | Type       | Description                                                      | Default value |
| -------------- | ---------- | ---------------------------------------------------------------- | ------------- |
| `brands`       | `[String]` | Brands to show the size guide                                    | `null`        |
| `categories`   | `[String]` | Categories to show the size guide                                | `null`        |
| `imageDesktop` | `String`   | Image that will be shown as a guide on desktop or laptop devices | `null`        |
| `imageTablet`  | `String`   | Image that will be shown as a guide on tablet devices            | `null`        |
| `imagePhone`   | `String`   | Image that will be shown as a guide on phone devices             | `null`        |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles      |
| ---------------- |
| `label`          |
| `image`          |
| `modalContainer` |
| `modal`          |

## Custom translations

1. Install the `vtex.admin-graphql-ide@3.x` app using your terminal.
2. Access the **GraphQL admin IDE** section of the desired account. You may find it in the admin's side-bar menu:
   ![image](https://user-images.githubusercontent.com/52087100/66516950-95d29a00-eab8-11e9-8cea-080fbdab84d5.png)
3. From the dropdown list, choose the `vtex.messages` app.
4. Write the following mutation command in the text box that is displayed:

```JSON
mutation Save($saveArgs: SaveArgsV2!) {
  saveV2(args: $saveArgs)
}
```

5.  Then, click on **Query Variables** at the bottom of the page. Now, your screen may look like the following:
    ![image](https://user-images.githubusercontent.com/60782333/85610649-8e92f280-b62d-11ea-9a5e-aa7ced1a1549.png)
6.  Write the following statement in the **Query Variables** tab

```JSON
{
 "saveArgs": {
   "to": "en-US",  //Target translation locale.
   "messages": [
     {
       "srcLang": "en-DV", //Source message locale. Always must be en-DV.
       "srcMessage": "store/sizeGuide.label", //The id of your message string declared in the app's messages folder.
       "context": "blacksipqa.size-guide@0.x", //The name of the app in which the message is being overwritten.
       "targetMessage": "Size Guide" //Translated message string.
     }
   ]
 }
}
```

7.  Click on the **run button**.

> ℹ️ **NOTE:** To better understand the full process of overwriting an app message translation, [click here](https://vtex.io/docs/recipes/development/overwriting-the-messages-app/)

## Id messages

| id                      |
| ----------------------- |
| `store/sizeGuide.label` |
