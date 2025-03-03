import React, { useState, useEffect } from 'react';
import { useCssHandles} from 'vtex.css-handles';
import './styles.css';

interface HeaderComponentProps {
  saletext: string;
  redireccion: string;
  finalDate: string; 
  vertyc: string;
  botonComprar: string;
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
  'botonComprar'
] as const

const Contador = ({saletext, redireccion,finalDate,vertyc,botonComprar, redireccionBoton}: HeaderComponentProps ) => {
  const handles = useCssHandles(CSS_HANDLES)


  const fechaObjetivo = new Date(finalDate).getTime();

  const [tiempoRestante, setTiempoRestante] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const ahora = new Date().getTime();
    const diferencia = fechaObjetivo - ahora;

    if (diferencia <= 0) {
      return { dias: 0, horas: 0, minutos: 0, segundos: 0 };
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
      <span className={handles.saletext}>{saletext}</span>

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

    <div className={handles.botonComprarContainer}>
      <a href={redireccionBoton} className={handles.botonComprar}>{botonComprar}</a>
    </div>


    <div className={handles.contenedortyc}>
 <a href={redireccion} className={handles.vertyc} > {vertyc}</a>
  </div>

  </div>
  
  
  );

};

Contador.defaultProps = {
  saletext: "VTEX",
  finalDate: new Date().toISOString(),
  vertyc: "Ver TYC" ,
  botonComprar: "Comprar"
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
    botonComprar: {
      type: 'string',
      title: 'Texto del boton comprar',
  },

  redireccionBoton: {
    type: 'string',
    title: 'URL boton comprar',
  },


    vertyc: {
      type: 'string',
      title: 'Texto del enlace TYC', 
    },

    redireccion: {
      type: 'string',
      title: 'URL boton tyc',
    }
  



 }
};


export default Contador;
