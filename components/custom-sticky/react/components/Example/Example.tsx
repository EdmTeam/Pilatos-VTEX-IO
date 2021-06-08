import React from 'react';
import { useCssHandles } from 'vtex.css-handles';

/**
 * declare todos los modificadores de clases que necesite su proyecto recuerde
 * que esto permitira que su proyectos sea configurable
 */
const CSS_HANDLES = ['icono'] as const;
/**
 * declaracion del componente
 */
const Example: StorefrontFunctionComponent<ExampleProps> = ({ classIco }) => {
    const handles = useCssHandles(CSS_HANDLES);

    return (
        <div
            className={`${handles.icono} ${classIco}`}
        >
            
        </div>
    );
};

/**
 * propiedades del componente, incluya las porpiedades que necesite
 * para lograr la maxima paremetrizacion del componente
 */
interface ExampleProps {
    classIco: string;
}

/**
 * propiedades por defecto del componete
 */

/**
 * esquema base del componenete esto habilita el site editor desde el admin
 */

Example.schema = {
    title: 'admin/editor.example.title',
    description: 'admin/editor.example.description',
    type: 'object',
    properties: {
        title: {
            title: 'I am a title',
            type: 'string',
            default: null,
        },
    },
};

export default Example;
