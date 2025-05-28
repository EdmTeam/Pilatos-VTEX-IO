import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "vtex.styleguide";
import styles from "./formCss.css";

interface Field {
  label: string;
  type: string;
  name: string;
  required?: boolean;
}

interface FormularioPruebaProps {
  logo?: string;
  text?: string;
  fields?: Field[];
  termsText?: string;
  cancelText?: string;
  cancelUrl?: string;
  entity?: string;
  redirectUrl?: string;
  playUrl?: string;
}

const customForm: FC<FormularioPruebaProps> = ({
  logo,
  text,
  fields = [],
  termsText = "Acepto política de privacidad y términos y condiciones",
  cancelText = "¡Gracias, NO deseo participar!",
  cancelUrl = "/",
  entity = "FE",
  redirectUrl = "/prueba-juego",
  playUrl = "/prueba-juego"
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [terms, setTerms] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedData = localStorage.getItem("juego-superdry");
    if (storedData) {
      setIsRegistered(true);
    }

    const savedFields = localStorage.getItem("formData");
    if (savedFields) {
      setFormData(JSON.parse(savedFields));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const newUser = { ...formData, terms };

    localStorage.setItem("juego-superdry", JSON.stringify(newUser));

    axios
      .post(`/api/dataentities/${entity}/documents`, newUser, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
      })
      .finally(() => {
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 1000);
      });
  };

  return (
    <div className={styles.formContainer}>
      {logo && <img src={logo} alt="Logo" className={styles.logoImage} />}
      {!isRegistered && text && <p className={styles.customText}>{text}</p>}

      {isRegistered ? (
        <div className={styles.containerRegister}>
          <h3 className={styles.inputLabelRegister}>¡Ya estás registrado! ¿Jugar?</h3>
          <button onClick={() => (window.location.href = playUrl)} className={styles.submitButton}>
            ¡Jugar!
          </button>
        </div>
      ) : (
        <form className={styles.formWrapper} onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className={styles.formGroup}>
              <h3 className={styles.inputLabel}>{field.label}{field.required ? "*" : ""}</h3>
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

          {/* Checkbox de términos y condiciones */}
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
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? <Spinner color="white" size={20} /> : "¡Jugar!"}
            </button>
          </div>

          {/* Enlace de cancelación con texto y URL dinámicos */}
          <a href={cancelUrl} className={styles.cancelMessage}>
            {cancelText}
          </a>
        </form>
      )}
    </div>
  );
};

// Configuración del esquema para Site Editor en VTEX IO
(customForm as any).schema = {
  title: "Formulario de Custom",
  description: "Formulario con logo, texto, campos dinámicos y redirección administrable",
  type: "object",
  properties: {
    entity: {
      title: "Entidad de VTEX Data Entities (	Acronym )",
      type: "string",
      default: "FE",
      description: "Entidad en la que se guardarán los datos",
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
    redirectUrl: {
      title: "URL de Redirección cuando el usuario se registra",
      type: "string",
      default: "/prueba-juego",
      description: "Define a qué URL redirigir después del formulario",
    },
    playUrl: {
      title: "URL del Redirección cuando el ya esta registrado",
      type: "string",
      default: "/prueba-juego",
      description: "Define la URL a la que dirige el botón Jugar",
    },
  },
};

export default customForm;
