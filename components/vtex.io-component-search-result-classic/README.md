# VTEX Search Result Classic Pagination

Este componente proporciona una paginación clásica para resultados de búsqueda en VTEX IO. Fue diseñado como una alternativa personalizable al scroll infinito, permitiendo al usuario navegar por páginas específicas mediante botones, flechas y un selector desplegable.

---

## 📌 Información del componente

- **Nombre:** `component-custom-result-pagination`
- **Vendor:** `pilatos21`
- **Versión:** `0.0.1`
- **Componente principal:** `Paginator`
- **Tipo de paginación:** `"show-more"` (por defecto)
- **Soporta:** botón o enlace como elemento HTML del paginador
- **Builder:** `react 3.x`, `store 0.x`

---

## 🧩 Instalación

Para instalar el componente en tu tienda VTEX:

```bash
vtex install pilatos21.component-custom-result-pagination
```

---

## 🚀 Uso en bloques

En el `interfaces.json`, se define el bloque como:

```json
{
  "search-result-pagination": {
    "component": "Paginator",
    "content": {
      "$ref": "app:pilatos21.component-custom-result-pagination#/definitions/Paginator"
    }
  }
}
```

Este bloque puede insertarse en la sección de resultados de búsqueda (`search.json`) o en cualquier plantilla que use `search-result`.

---

## ⚙️ Props disponibles

Según el archivo `contentSchemas.json`, este componente admite:

| Prop | Tipo | Descripción | Valores permitidos | Default |
|------|------|-------------|---------------------|---------|
| `htmlElementForButton` | `string` | Comportamiento del botón de paginación | `"button"` o `"a"` | `"button"` |

Se puede controlar desde el Site Editor como radio button.

---

## 🧠 Lógica Interna

- Usa `useSearchPage()` para obtener información de búsqueda.
- Usa `fetchMore` de `vtex.store-graphql` para cargar resultados paginados.
- Permite navegación por bloques (3 páginas visibles a la vez).
- Al hacer clic en una página:
  - Se activa un spinner en el botón seleccionado.
  - Se actualiza `currentPage`.
  - Se dispara `fetchMore`.

---

## 🎨 CSS Handles

Se pueden sobrescribir los siguientes handles:

```ts
const CSS_HANDLES = [
  'paginatorContainer',
  'resultsSummary',
  'paginationRow',
  'arrowPrev',
  'arrowNext',
  'contentSvg',
  'buttonPerPage',
  'buttonPerPageActive',
  'containerDropdown',
  'contentimg',
  'paginationEllipsis',
  'arrowPlaceholder'
]
```

Además, puedes usar el archivo `paginator.css` incluido para personalizar hover, botones activos, flechas, y media queries.

---

## 🧪 Requisitos y dependencias

Este componente requiere:

```json
{
  "vtex.store-graphql": "2.x",
  "vtex.search-page-context": "0.x",
  "vtex.css-handles": "0.x",
  "vtex.styleguide": "9.x",
  "vtex.slider-layout": "0.x"
}
```

Instálalas si aún no las tienes en tu `manifest.json`.

---

## 📸 Ejemplo visual

![Paginador clásico con botones y flechas]()

---

## 🧑‍💻 Autor

Desarrollado por Rubén Darío Suárez  
📧 [rsuarez@asylummarketing.com](mailto:rsuarez@asylummarketing.com)

---

## 📄 Licencia
