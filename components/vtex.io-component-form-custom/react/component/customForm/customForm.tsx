import React, { FC, useState } from "react"
import axios from "axios"
import { Spinner } from "vtex.styleguide"
import styles from "./formCss.css"

interface Field {
  label: string
  type: string
  name: string
  required?: boolean
}

interface FormularioPruebaProps {
  logo?: string
  text?: string
  fields?: Field[]
  termsText?: string
  cancelText?: string
  cancelUrl?: string
  entity?: string
  promoCode?: string
  successText?: string
  successButtonText?: string
  successButtonColor?: string
  successButtonTextColor?: string
  successButtonUrl?: string
  submitButtonText?: string
  submitButtonColor?: string
  submitButtonTextColor?: string
}

const customForm: FC<FormularioPruebaProps> = ({
  logo,
  text,
  fields = [],
  termsText = "Acepto política de privacidad y términos y condiciones",
  cancelText = "¡Gracias, NO deseo participar!",
  cancelUrl = "/",
  entity = "FE",
  promoCode = "F455GF",
  successText,
  successButtonText,
  successButtonColor = "#000000",
  successButtonTextColor = "#ffffff",
  successButtonUrl = "#",
  submitButtonText = "Registrarse",
  submitButtonColor = "#28a745",
  submitButtonTextColor = "#ffffff",
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({})
  const [terms, setTerms] = useState<boolean>(false)
  const [registroExitoso, setRegistroExitoso] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const newUser = { ...formData, terms }

    axios
      .post(`/api/dataentities/${entity}/documents`, newUser, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      })
      .then(() => {
        setRegistroExitoso(true)
        setFormData({})
        setTerms(false)
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className={styles.formContainer}>
      {logo && <img src={logo} alt="Logo" className={styles.logoImage} />}
      {text && <p className={styles.customText}>{text}</p>}

      {registroExitoso ? (
        <div className={styles.successMessageContainer}>
          <div className={styles.successMessageWrapper}>
            <p className={styles.successMessage}>
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    successText ||
                    "✅ REGISTRO EXITOSO. ESTE ES TU CÓDIGO PARA PRIMERA COMPRA:",
                }}
              ></span>
              <strong style={{ marginLeft: "6px" }}>{promoCode}</strong>
            </p>

            {successButtonText && (
              <div className={styles.successButtonContainer}>
                <a
                  href={successButtonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.successButton}
                  style={{
                    backgroundColor: successButtonColor,
                    color: successButtonTextColor,
                  }}
                >
                  {successButtonText}
                </a>
              </div>
            )}
          </div>
        </div>
      ) : (
        <form className={styles.formWrapper} onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className={styles.formGroup}>
              <h3 className={styles.inputLabel}>
                {field.label}
                {field.required && <span style={{ color: "red" }}>*</span>}
              </h3>
              <input
                type={field.type}
                name={field.name}
                required={field.required}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className={styles.inputField}
                disabled={loading}
              />
            </div>
          ))}

          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              required
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className={styles.checkboxInput}
              disabled={loading}
            />
            <label className={styles.checkboxLabel}>{termsText}</label>
          </div>

          <div className={styles.containerButton}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
              style={{
                backgroundColor: submitButtonColor,
                color: submitButtonTextColor,
              }}
            >
              {loading ? <Spinner color="white" size={20} /> : submitButtonText}
            </button>
          </div>

          <a href={cancelUrl} className={styles.cancelMessage}>
            {cancelText}
          </a>
        </form>
      )}
    </div>
  )
}

;(customForm as any).schema = {
  title: "Formulario de Custom",
  description:
    "Formulario con logo, texto, campos dinámicos, botón editable y mensaje de éxito",
  type: "object",
  properties: {
    entity: {
      title: "Entidad de VTEX Data Entities (Acronym)",
      type: "string",
      default: "FE",
    },
    logo: {
      title: "URL del Logo",
      type: "string",
      widget: {
        "ui:widget": "image-uploader",
      },
    },
    text: {
      title: "Texto personalizado",
      type: "string",
      widget: {
        "ui:widget": "textarea",
      },
    },
    promoCode: {
      title: "Código de promoción",
      type: "string",
      default: "F455GF",
    },
    successText: {
      title: "Texto de confirmación (puede contener HTML)",
      type: "string",
      widget: {
        "ui:widget": "textarea",
      },
      default:
        "✅ REGISTRO EXITOSO. ESTE ES TU CÓDIGO PARA PRIMERA COMPRA:",
    },
    successButtonText: {
      title: "Texto del botón de éxito",
      type: "string",
      default: "Usar código",
    },
    successButtonColor: {
      title: "Color de fondo del botón de éxito",
      type: "string",
      default: "#000000",
      widget: {
        "ui:widget": "color",
      },
    },
    successButtonTextColor: {
      title: "Color del texto del botón de éxito",
      type: "string",
      default: "#ffffff",
      widget: {
        "ui:widget": "color",
      },
    },
    successButtonUrl: {
      title: "URL del botón de éxito",
      type: "string",
      default: "/",
    },
    submitButtonText: {
      title: "Texto del botón de registro",
      type: "string",
      default: "Registrarse",
    },
    submitButtonColor: {
      title: "Color de fondo del botón de registro",
      type: "string",
      default: "#28a745",
      widget: {
        "ui:widget": "color",
      },
    },
    submitButtonTextColor: {
      title: "Color del texto del botón de registro",
      type: "string",
      default: "#ffffff",
      widget: {
        "ui:widget": "color",
      },
    },
    fields: {
      title: "Campos del formulario",
      type: "array",
      items: {
        type: "object",
        properties: {
          label: {
            title: "Etiqueta del campo",
            type: "string",
          },
          type: {
            title: "Tipo de campo",
            type: "string",
            enum: ["text", "email", "tel", "number", "password", "date"],
            default: "text",
          },
          name: {
            title: "Nombre del campo",
            type: "string",
          },
          required: {
            title: "Campo obligatorio",
            type: "boolean",
            default: true,
          },
        },
      },
    },
    termsText: {
      title: "Texto de términos y condiciones",
      type: "string",
      default: "Acepto política de privacidad y términos y condiciones",
    },
    cancelText: {
      title: "Texto del enlace de cancelación",
      type: "string",
      default: "¡Gracias, NO deseo participar!",
    },
    cancelUrl: {
      title: "URL del enlace de cancelación",
      type: "string",
      default: "/",
    },
  },
}

export default customForm
