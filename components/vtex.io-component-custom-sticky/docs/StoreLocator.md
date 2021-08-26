# Product Name

The `ProductName` is a block responsible for **displaying the product name** along other information such as **SKU** or **brand**.

![image](https://user-images.githubusercontent.com/17678382/101309181-c081c500-3819-11eb-8927-c1db3dab5f96.PNG)

## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json`, for example:

```json
{
  "dependencies": {
    "vtex.store-components": "3.x"
  }
}
```

2. Add the `store-locator` block to any block below `store.custom#storeLocator` (page custom template). For example:

```json
{
  "store.custom#storeLocator": {
    "blocks": [
      "flex-layout.row#storeLocator"
    ],
    "flex-layout.row#storeLocator": {
      "children": [
        "store-locator"
      ]
    }
  }
}
```

| Prop name | Type | Description | Default value |
| --- | --- | --- | ---| 
| `apiKeyGoogle` | `String` | Show product SKU | `false` |
| `showProductReference` | `Boolean` | Show product reference | `false`| 
| `showBrandName` | `Boolean` | Show brand name | `false`| 

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| --- |
| `globalContainer` |
| `title` |
| `subtitle` |
| `description` |
| `containerInfo` |
| `containerLevel1` |
| `containerLevel2` |
| `containerMap` |
| `containerStoreInfo` |
| `storeNameLabel` |
| `storeDirectionLabel` |
| `storePhoneLabel` |
| `storeHoraryLabel` |
| `storeDescriptionLabel` |
| `storeName` |
| `storeDirection` |
| `storePhone` |
| `storeHorary` |
| `storeDescription` |
