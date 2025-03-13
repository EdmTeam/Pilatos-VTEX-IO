import React, { useState, useEffect } from 'react';
import { useCssHandles} from 'vtex.css-handles';
import './styles.css';

interface HeaderComponentProps {
  saletext: string;
  redireccion: string;
  redireccionTexto: string; // Nuevo campo para el enlace en "aqui"
  campotextoaqui: string;
  finalDate: string; 
  vertyc: string;
  redireccionBoton: string;
}



const CSS_HANDLES = [
  'contadorcontainer',
  'contador',
  'item',
  'numero',
  'label',
  'grupotextos',
  'saletext',
  'contenedortyc',
  'vertyc',
  'botonComprarContainer',
  'campotextoaqui'
  
] as const

const Contador = ({saletext, redireccion,redireccionTexto,finalDate,vertyc, campotextoaqui}: HeaderComponentProps ) => {
  const handles = useCssHandles(CSS_HANDLES)


  const fechaObjetivo = new Date(finalDate).getTime();

  const [tiempoRestante, setTiempoRestante] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const ahora = new Date().getTime();
    const diferencia = fechaObjetivo - ahora;

    if (diferencia <= 0) {
      return { dias: 0,horas: 0, minutos: 0, segundos: 0 };
    }

    return {
      dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
      horas: Math.floor((diferencia / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((diferencia / (1000 * 60)) % 60),
      segundos: Math.floor((diferencia / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTiempoRestante(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  },  [finalDate]);

  return (
    <div className={handles.contadorcontainer}>
      <div className={handles.grupotextos}>
      <span className={handles.saletext}>
          {saletext.split("aqui").map((part, index, array) => (
            <React.Fragment key={index}>
              {part}
              {index !== array.length - 1 && (
                <a href={redireccionTexto} className={handles.saletext}  rel="noopener noreferrer">
                  <span className={handles.campotextoaqui}>{ campotextoaqui}</span>
                </a>
              )}
            </React.Fragment>
          ))}
        </span>

      </div>
 

    <div className={handles.contador}>

    <div className={handles.item}>
  <span className={handles.numero}>{String(tiempoRestante.dias).padStart(2, '0')}</span>
  <span className={handles.label}>Días</span>
  </div>
    
      <div className={handles.item}>
        <span className={handles.numero}>{String(tiempoRestante.horas).padStart(2, '0')}</span>
        <span className={handles.label}>Horas</span>
      </div>
      <div className={handles.item}>
        <span className={handles.numero}>{String(tiempoRestante.minutos).padStart(2, '0')}</span>
        <span className={handles.label}>Min</span>
      </div>
      <div className={handles.item}>
        <span className={handles.numero}>{String(tiempoRestante.segundos).padStart(2, '0')}</span>
        <span className={handles.label}>Seg</span>
      </div>
    </div>




    <div className={handles.contenedortyc}>
 <a href={redireccion} className={handles.vertyc} > {vertyc}</a>
  </div>

  </div>
  
  
  );

};

Contador.defaultProps = {
  saletext: "Aprovecha antes de que se acabe y compra aqui",
  finalDate: new Date().toISOString(),
  vertyc: "Aplican TyC" ,
  redireccion: "#",
  redireccionTexto: "#" , // Nuevo valor por defecto para el enlace en "aqui"
  campotextoaqui: "aqui" // Nuevo valor por defecto para el enlace en "aqui"

};

Contador.schema = {
  title: 'temporizador',
  type: 'object',
  properties: {

    saletext: {
      type: 'string',
      title: 'Texto principal',
    },

    finalDate: {
      title: 'Fecha Final',
      type: 'string',
      format: 'date-time', 
      widget: {
        "ui:widget": "datetime"
      },
    },


    vertyc: {
      type: 'string',
      title: 'Texto del enlace TYC', 
    },

    redireccion: {
      type: 'string',
      title: 'URL boton tyc',
    },

    redireccionTexto: {
      type: 'string',
      title: 'URL de la palabra "aqui"',
    },

    campotextoaqui: {
      type: 'string',
      title: 'Texto del enlace en "aqui"',
    },
  



 }
};


export default Contador;


