# Clear Search Filter

The `clear-search-filter` It is the block that allows you to delete all the search filters applied, it only works in the context of the store.search pages

![image](https://user-images.githubusercontent.com/17678382/103389686-5ab5ef80-4ade-11eb-890b-ec0442a8689d.PNG)
![image](https://user-images.githubusercontent.com/17678382/103389684-5984c280-4ade-11eb-9f0f-fe8c9c139268.PNG)

## Configuration

1. Import the `blacksipqa.clear-search-filter` app to your theme's dependencies in the `manifest.json`, for example:

```json
{
    "dependencies": {
        "blacksipqa.clear-search-filter": "0.x"
    }
}
```

2. Add the `clear-search-filter` block to any block below `store.search` (search result). For example:

```json
{
    "flex-layout.col#filter": {
        "children": ["clear-search-filter", "filter-navigator.v3"],
        "props": {
            "preventVerticalStretch": true,
            "blockClass": "filterCol"
        }
    }
}
```

| Prop name | Type        | Description                                                | Default value     |
| --------- | ----------- | ---------------------------------------------------------- | ----------------- |
| `label`   | `String`    | Label text                                                 | `Limpiar filtros` |
| `mode`    | `enum mode` | Modes in which the components are displayed                | `mode1`           |
| `icon`    | `String`    | Native vtex icons https://github.com/vtex-apps/store-icons | `hpa-delete`      |

-   **enum `mode`**

| Enum    | Description      |
| ------- | ---------------- |
| `mode1` | button with text |
| `mode2` | button with icon |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles       |
| ----------------- |
| `container_mode1` |
| `container_mode2` |
| `label`           |
| `icon`            |
