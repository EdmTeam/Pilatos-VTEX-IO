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
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setErrorMessage("")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage("")

    const mail = formData.mail

    try {
      const searchRes = await axios.get(
        `/api/dataentities/${entity}/search?_where=mail=${mail}&_fields=mail`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/vnd.vtex.ds.v10+json',
          },
        }
      )

      if (searchRes.data.length > 0) {
        setErrorMessage("⚠️ Este correo ya está registrado.")
        setLoading(false)
        return
      }

      await axios.post(`/api/dataentities/${entity}/documents`, {
        ...formData,
        terms,
      }, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        }
      })

      setRegistroExitoso(true)
      setFormData({})
      setTerms(false)
    } catch (err) {
      console.error("Error:", err.response?.data || err.message)
      setErrorMessage("❌ Hubo un error al registrar.")
    } finally {
      setLoading(false)
    }
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

          {errorMessage && (
            <p className={styles.errorMessage} style={{ color: "red", marginBottom: "12px" }}>
              {errorMessage}
            </p>
          )}

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
  title: "Formulario Custom",
  description: "Formulario editable desde el Site Editor",
  type: "object",
  properties: {
    entity: {
      title: "Entidad (acronym)",
      type: "string",
      default: "FE",
    },
    logo: {
      title: "URL del logo",
      type: "string",
      widget: {
        "ui:widget": "image-uploader",
      },
    },
    text: {
      title: "Texto superior del formulario",
      type: "string",
    },
    promoCode: {
      title: "Código de promoción",
      type: "string",
    },
    successText: {
      title: "Texto de éxito (HTML permitido)",
      type: "string",
      widget: {
        "ui:widget": "textarea",
      },
    },
    successButtonText: {
      title: "Texto del botón de éxito",
      type: "string",
    },
    successButtonColor: {
      title: "Color de fondo del botón de éxito",
      type: "string",
      widget: {
        "ui:widget": "color",
      },
    },
    successButtonTextColor: {
      title: "Color del texto del botón de éxito",
      type: "string",
      widget: {
        "ui:widget": "color",
      },
    },
    successButtonUrl: {
      title: "Link del botón de éxito",
      type: "string",
    },
    submitButtonText: {
      title: "Texto del botón de registro",
      type: "string",
    },
    submitButtonColor: {
      title: "Color de fondo del botón de registro",
      type: "string",
      widget: {
        "ui:widget": "color",
      },
    },
    submitButtonTextColor: {
      title: "Color del texto del botón de registro",
      type: "string",
      widget: {
        "ui:widget": "color",
      },
    },
    termsText: {
      title: "Texto de términos y condiciones",
      type: "string",
    },
    cancelText: {
      title: "Texto de cancelación",
      type: "string",
    },
    cancelUrl: {
      title: "Link de cancelación",
      type: "string",
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
            enum: ["text", "email", "tel", "number", "date"],
            default: "text",
          },
          name: {
            title: "Nombre (name) del campo",
            type: "string",
          },
          required: {
            title: "¿Es obligatorio?",
            type: "boolean",
            default: true,
          },
        },
      },
    },
  },
}

export default customForm;
