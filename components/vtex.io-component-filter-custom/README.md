# VTEX Custom Filter Navigator

Este componente reemplaza el `FilterNavigator` nativo de VTEX IO con una versión **personalizada** que permite replicar comportamientos avanzados (dropdown en hover, scroll horizontal, checkboxes estilizados).

---

## 📌 Información del componente

- **Nombre:** `component-custom-filter-navigator`
- **Vendor:** `pilatos21`
- **Versión:** `0.0.14`
- **Componente principal:** `CustomFilterNavigator`
- **Descripción:** Navegador de filtros custom para VTEX IO
- **Builder:** `react 3.x`, `store 0.x`

---

## 🧩 Instalación

Instalar el componente en tu tienda:

```bash
vtex install pilatos21.component-custom-filter-navigator
```

---

## 🚀 Uso en bloques

Declaración en `interfaces.json`:

```json
{
  "component-custom-filter-navigator": {
    "component": "customFilterNavigator"
  }
}
```

Ejemplo en `search.json`:

```json
{
  "search-result": {
    "children": ["component-custom-filter-navigator"]
  }
}
```

---

## ⚙️ Props disponibles

Actualmente no recibe `props` externos.  
El componente obtiene la información directamente desde:

- `useSearchPage()` → datos de la búsqueda
- `useRuntime()` → navegación sin recarga (`setQuery`)

---

## 🧠 Lógica Interna

- Obtiene los **facets** desde `searchQuery.data.facets.specificationFilters`.
- Construye `query` y `map` a partir de `queryArgs` (manteniendo `initialQuery` y `initialMap`).
- Al seleccionar/deseleccionar un filtro:
  - Se actualiza la URL con `setQuery`.
  - Se conserva el estado de filtros previos y activos.
- Comportamiento visual:
  - Cada filtro se despliega en un **dropdown** al hacer `hover`.
  - Los checkboxes se sincronizan con el estado `selected`.
  - El ícono (`caret`) rota cuando el dropdown está abierto.

---

## 🎨 CSS Handles

El componente expone múltiples handles para personalización:

```ts
const CSS_HANDLES = [
  'filtersWrapper',
  'filterContainer',
  'filterTitle',
  'filterContent',
  'filterItem',
  'filterLabel',
  'filterCheckbox',
  'filterCount',
  'filterDropdown',
  'filterOpen',
  'filterCheckboxLine',
  'filterCheckboxContainer',
  'filterCheckboxInner',
  'filterCheckboxBoxWrapper',
  'filterCheckboxBox',
  'filterCheckboxInput',
  'filterCheckboxLabel',
  'filterIconContainer',
  'filterIcon',
  'filterCheckboxBoxSelected',
  'filterIconHover',
  'filterFaceContainer'
]
```

Puedes sobrescribir estos estilos en un archivo `.css` vinculado al tema.

---

## 🧪 Requisitos y dependencias

Declaradas en `manifest.json`:

```json
{
  "vtex.css-handles": "0.x",
  "vtex.styleguide": "9.x",
  "vtex.search-page-context": "0.x",
  "vtex.render-runtime": "8.x",
  "vtex.slider": "0.x"
}
```

---

## 📸 Ejemplo visual

```md
![Custom Filter Navigator con dropdowns tipo Pandora]()
```

---

## 🧑‍💻 Autor

Desarrollado por Rubén Darío Suárez  
📧 [rsuarez@asylummarketing.com](mailto:rsuarez@asylummarketing.com)

---

## 📄 Licencia
