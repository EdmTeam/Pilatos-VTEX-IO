import React, { useState } from 'react';
import { ClearSearchFilterProps } from '../../typings/clear-search-filter';
import { Button } from 'vtex.styleguide';
import { Icon } from 'vtex.store-icons';
import { useRuntime } from 'vtex.render-runtime';
import { useCssHandles } from 'vtex.css-handles';

/**
 * declare todos los modificadores de clases que necesite su proyecto recuerde
 * que esto permitira que su proyectos sea configurable
 */
const CSS_HANDLES = [
    'container_mode1',
    'container_mode2',
    'label',
    'icon',
] as const;

/**
 * declaracion del componente
 */
const ClearSearchFilter: StorefrontFunctionComponent<ClearSearchFilterProps> = ({
    label,
    mode,
    icon,
}) => {
    const [reload] = useState(
        window?.location?.pathname + window?.location?.search
    );
    const { navigate } = useRuntime();
    const clearFilter = () => {
        navigate({
            to: reload,
        });
    };
    const handles = useCssHandles(CSS_HANDLES);
    const render = (mode: string) => {
        const mode1 = (
            <div className={`${handles.container_mode2}`}>
                <span className="ma3">
                    <Button
                        variation="tertiary"
                        size="small"
                        onClick={() => clearFilter()}
                    >
                        <span className={`${handles.label}`}>{label}</span>
                    </Button>
                </span>
            </div>
        );
        const mode2 = (
            <div
                className={`${handles.container_mode1} h-100 flex justify-center items-center pl4`}
            >
                <Button
                    variation="tertiary"
                    size="small"
                    onClick={() => clearFilter()}
                >
                    <span className={`${handles.label} c-on-base`}>
                        <Icon id={`${icon}`} size={20} />
                    </span>
                </Button>
            </div>
        );
        switch (mode) {
            /**
             * boton con texto
             */
            case 'mode1':
                return mode1;
            /**
             * boton con icono
             */
            case 'mode2':
                return mode2;
            default:
                return mode1;
        }
    };
    return <React.Fragment>{render(mode)}</React.Fragment>;
};

/**
 * propiedades por defecto del componete
 */
ClearSearchFilter.defaultProps = {
    label: 'Limpiar filtros',
    mode: 'mode1',
    icon: 'hpa-delete',
};

/**
 * esquema base del componente esto habilita el site editor desde el admin
 */
ClearSearchFilter.schema = {
    title: 'admin/editor.clear-search-filter.title',
    description: 'admin/editor.clear-search-filter.description',
    type: 'object',
    properties: {
        label: {
            title: 'admin/editor.clear-search-filter.label.title',
            type: 'string',
        },
        mode: {
            title: 'admin/editor.clear-search-filter.mode.title',
            type: 'string',
            enum: ['mode1', 'mode2'],
            widget: {
                'ui:widget': 'radio',
            },
            default: 'mode1',
        },
        icon: {
            title: 'admin/editor.clear-search-filter.mode.icon',
            type: 'string',
        },
    },
};

export default ClearSearchFilter;
