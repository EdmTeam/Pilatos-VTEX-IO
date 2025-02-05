📢 Use this project, [contribute](https://dev.azure.com/ecomsurproy/LevisMX/_git/seo-tags) to it or [open issues](https://dev.azure.com/ecomsurproy/LevisMX) to help evolve it.

# SEO TAGS

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

The **Seo Tags** app provides blocks that can help you to render a seo meta tags and custom schemas if the browser path is included in the indicated urls.

## Configuration 

To use this component you need:

1. Add the seo tags app to your theme's dependencies in the `manifest.json`:

```diff
"dependencies": {
+   "{account}.seo-tags": "0.x"
}
```

Now, you are able to use all blocks exported by the `seo-tags` app. Check out the full list below:

| Block name | Description | 
| --------  | ------------ | 
| `seo-schema-pdp` | Defines the block that renders the desired schema in the PDP if the **productId** coincides with the **productId** declared in the custom schema. (This interface only works in PDP pages) |
| `seo-schema-plp` | Defines the block that renders the desired schema in any page if the browser path coincides with the **url** declared in the custom schema. |
| `open-graph-tags` | Defines the block that renders a open graph meta tags in any page if the browser path coincides with the **url** declared in the **metaTags** object. |

### `seo-schema-pdp`

Declare the app block in your store theme inside the `store.product` block.

```diff
{
  "store.product": {
    "children": [ "responsive-layout.desktop#pdp"]
  },
  "responsive-layout.desktop#pdp": {
    "children": [
+     "seo-schema-pdp",
      "..."
    ]
  }
}
```

```jsonc
"seo-schema-pdp" {
  "props": {
    "schemas": [
      {
        "productId": "3067",
        "data": {
          "@context": "https://schema.org/", 
          "@type": "Product", 
          "name": "Pants Deportivos GOLD TAB® para Mujer",
          "image": "https://levimx.vtexassets.com/arquivos/ids/703290-150-auto?v=637986961661130000&width=150&height=auto&aspect=true",
          "description": "Con los Pants Deportivos para mujer GOLD TAB® eleva tu estilo. Explora nuestra selección de sweatpants para un look juvenil. ¡Descúbrelos!",
          "brand": {
            "@type": "Brand",
            "name": "Levi’s"
          },
          "sku": "",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": "5"
          }
        }
      }
    ]
  }
}
```

### `seo-schema-pdp` props

| Prop name | Type | Description | Default value |
| --- | --- | --- | --- |
| `schemas` | `SeoSchemaPdpSchema[]` | Array of custom schemas. | `undefined` |

### `SeoSchemaPdpSchema`

| Prop name | Type | Description | Default value |
| --- | --- | --- | --- |
| `productId` | `string` | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) ProductId against which the product context id will be compared to determine if custom schema is rendered or not. | `undefined` |
| `data` | `object` | Custom schema that will be rendered if the productId coincides with the product context id. | `undefined` |


### `seo-schema-plp`

Declare the app block in your store theme.

```diff
{
  "...": {
    "children": [
+     "seo-schema-plp",
      "..."
    ]
  }
}
```

```jsonc
"seo-schema-plp" {
  "props": {
    "schemas": [
      {
        "url": "/hombre/accesorios/underwear-y-socks",
        "data": {
          "@context": "https://schema.org/", 
          "@type": "Product", 
          "name": "Ropa Interior para Hombre Levi's®",
          "image": "https://levimx.vtexassets.com/arquivos/ids/840085-660-800?width=660&height=800&aspect=true",
          "description": "¿Buscas Ropa Interior para hombre? Explora nuestro catálogo y encuentra boxers, calcetines y más. ¡Todo disponible en nuestra tienda en línea!",
          "brand": {
            "@type": "Brand",
            "name": "Levi’s"
          },
          "sku": "",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": "5"
          }
        }
      }
    ]
  }
}
```
### `seo-schema-plp` props

| Prop name | Type | Description | Default value |
| --- | --- | --- | --- |
| `schemas` | `SeoSchemaPlpSchema[]` | Array of custom schemas. | `undefined` |

### `SeoSchemaPlpSchema`

| Prop name | Type | Description | Default value |
| --- | --- | --- | --- |
| `url` | `string` | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Url against which the browser path will be compared to determine if custom schema is rendered or not. | `undefined` |
| `data` | `object` | Custom schema that will be rendered if the browser path coincides with the schema url. | `undefined` |





### `open-graph-tags`

Declare the app block in your store theme.

```diff
"...": {
  "children": [
+   "open-graph-tags",
  ]
}
```

```jsonc
"open-graph-tags" {
  "props": {
    "metaTags": [
      {
        "url": "/levis-gold-tab-sweatpants-a3743-0000/p",
        "tags": [
          {
            "property": "og:title",
            "content": "Pants Deportivos GOLD TAB® para Mujer | Levi's® México"
          },
          {
            "property": "og:image",
            "content": "https://levimx.vtexassets.com/arquivos/ids/703290/A3743-0000_1.jpg?v=637986961661130000"
          },
          {
            "property": "og:description",
            "content": "Con los pants deportivos para mujer GOLD TAB® eleva tu estilo. Explora nuestra selección de sweatpants para un look juvenil y cómodo ¡Descúbrelos aquí!"
          },
          {
            "property": "og:type",
            "content": "website"
          }
        ]
      }
    ]
  }
}
```

### `open-graph-tags` props

| Prop name | Type | Description | Default value |
| --- | --- | --- | --- |
| `metaTags` | `OpenGraphTagsMetaTags[]` | Array of custom meta tags. | `undefined` |

### `OpenGraphTagsMetaTags`

| Prop name | Type | Description | Default value |
| --- | --- | --- | --- |
| `url` | `string` | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Url against which the browser path will be compared to determine if custom meta tags are rendered or not. | `undefined` |
| `OpenGraphTag` | `OpenGraphTag[]` | Custom tags that will be rendered if the browser path coincides with the meta tags url. | `undefined` |

### `OpenGraphTag`

| Prop name | Type | Description | Default value |
| --- | --- | --- | --- |
| `property` | `string` | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Text to set in meta tag property attribute. | `undefined` |
| `content` | `string` | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Text to set in meta tag content attribute. | `undefined` |

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="mailto:jaguilar@infracommerce.lat"><img src="https://gitlab.com/uploads/-/system/user/avatar/8848520/avatar.png?width=100" width="100px;" alt=""/><br /><sub><b>Jorge Aguilar</b></sub></a><br /><a href="mailto:jaguilar@infracommerce.lat" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->
### Copyright Ecomsur 2023