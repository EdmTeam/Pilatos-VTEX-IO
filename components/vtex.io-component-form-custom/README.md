# VTEX Custom Form

Este componente permite crear un **formulario personalizado**, totalmente configurable desde el Site Editor.  
Se conecta con **Master Data (Data Entities)** para almacenar información de usuarios, validar registros por correo y mostrar mensajes de éxito o error.

---

## 📌 Información del componente

- **Nombre:** `component-custom-form`
- **Vendor:** `pilatos21`
- **Versión:** `0.0.5`
- **Componente principal:** `customForm`
- **Descripción:** Formulario custom editable desde el Site Editor
- **Builder:** `react 3.x`, `store 0.x`

---

## 🧩 Instalación

Instalar el componente en tu tienda:

```bash
vtex install pilatos21.component-custom-form
```

---

## 🚀 Uso en bloques

Declaración en `interfaces.json`:

```json
{
  "component-custom-form": {
    "component": "customForm"
  }
}
```

Ejemplo en `home.json`:

```json
{
  "store.home": {
    "children": ["component-custom-form"]
  }
}
```

---

## ⚙️ Props disponibles (Schema Site Editor)

El componente es **editable desde el Site Editor** gracias a su `schema`. Las propiedades disponibles incluyen:

| Prop | Tipo | Descripción |
|------|------|-------------|
| `entity` | `string` | Acrónimo de la entidad en Master Data (ej: `"FE"`) |
| `logo` | `string` | URL de la imagen de logo (widget `image-uploader`) |
| `text` | `string` | Texto superior del formulario |
| `subtitle` | `string` | Subtítulo del formulario |
| `italicSubtitle` | `boolean` | ¿Mostrar subtítulo en cursiva? |
| `fields` | `array` | Lista de campos (etiqueta, tipo, nombre, requerido) |
| `termsText` | `string` | Texto para términos y condiciones |
| `cancelText` | `string` | Texto del link de cancelación |
| `cancelUrl` | `string` | URL del link de cancelación |
| `promoCode` | `string` | Código de promoción mostrado tras registro exitoso |
| `successText` | `string` | Mensaje de éxito (permite HTML) |
| `successButtonText` | `string` | Texto del botón de éxito |
| `successButtonColor` | `string` | Color de fondo del botón de éxito |
| `successButtonTextColor` | `string` | Color del texto del botón de éxito |
| `successButtonUrl` | `string` | URL del botón de éxito |
| `submitButtonText` | `string` | Texto del botón de registro |
| `submitButtonColor` | `string` | Color de fondo del botón de registro |
| `submitButtonTextColor` | `string` | Color del texto del botón de registro |

---

## 🧠 Lógica Interna

1. **Validación previa**  
   - Antes de registrar, se consulta Master Data (`/api/dataentities/{entity}/search`) para validar si el correo ya existe.
2. **Registro en Master Data**  
   - Si no existe, se crea un documento en la entidad (`/api/dataentities/{entity}/documents`).
3. **Mensajes dinámicos**  
   - Si el registro es exitoso: muestra `successText` + código promocional.
   - Si hay error: muestra `errorMessage` en rojo.
4. **Botón de cancelación**  
   - Redirige a `cancelUrl`.

---

## 🎨 Estilos (CSS)

Definidos en `formCss.css`.  
Clases principales:

- `formContainer`, `formWrapper` → contenedor principal
- `logoImage`, `customText`, `subtitleText`, `italicText`
- `inputLabel`, `inputField`, `textareaField`
- `checkboxContainer`, `checkboxInput`, `checkboxLabel`
- `submitButton`, `cancelMessage`
- `successMessageContainer`, `successButton`

El diseño es **responsive** con media queries para <850px y <600px.

---

## 🧪 Requisitos y dependencias

Declaradas en `manifest.json`:

```json
{
  "vtex.css-handles": "0.x",
  "vtex.styleguide": "9.x"
}
```

---

## 📸 Ejemplo visual

```md
![Custom Form con campos dinámicos y mensaje de éxito]()
```

---

## 🧑‍💻 Autor

Desarrollado por Rubén Darío Suárez  
📧 [rsuarez@asylummarketing.com](mailto:rsuarez@asylummarketing.com)

---

## 📄 Licencia
