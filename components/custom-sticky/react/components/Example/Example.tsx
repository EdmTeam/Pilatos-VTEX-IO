import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useCssHandles } from 'vtex.css-handles';

/**
 * declare todos los modificadores de clases que necesite su proyecto recuerde
 * que esto permitira que su proyectos sea configurable
 */
const CSS_HANDLES = ['title'] as const;
/**
 * declaracion del componente
 */
const Example: StorefrontFunctionComponent<ExampleProps> = ({ title }) => {
    const handles = useCssHandles(CSS_HANDLES);
    const titleText = title || (
        <FormattedMessage id="admin/editor.example.title" />
    );

    return (
        <div
            className={`${handles.title} t-heading-2 fw3 w-100 c-muted-1 db tc`}
        >
            {titleText}
        </div>
    );
};

/**
 * propiedades del componente, incluya las porpiedades que necesite
 * para lograr la maxima paremetrizacion del componente
 */
interface ExampleProps {
    title: string;
}

/**
 * propiedades por defecto del componete
 */
Example.defaultProps = {
    title: 'esta es una prueba',
};

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
