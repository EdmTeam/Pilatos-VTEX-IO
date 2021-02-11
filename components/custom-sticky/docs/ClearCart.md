# Clear Cart

The `ClearCart` is a block responsible for **Clear all the products in the shopping cart**.

![image](https://user-images.githubusercontent.com/43254037/102838099-547f8f00-43cb-11eb-93b5-a215572e6741.png)

## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json`, for example:

```json
{
  "dependencies": {
    "vtex.store-components": "3.x"
  }
}
```

2. Add the `clear-cart` block to any block below `store.custom#ClearCart` (page custom template). For example:

```json
{
  "store.custom#ClearCart": {
    "blocks": [
      "flex-layout.row#ClearCart"
    ],
    "flex-layout.row#ClearCart": {
      "children": [
        "clear-cart"
      ]
    }
  }
}
```

| Prop name | Type | Description | Default value |
| --- | --- | --- | ---| 
| `title` | `String` | Show button description. | `false` |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| --- |
| `button` |