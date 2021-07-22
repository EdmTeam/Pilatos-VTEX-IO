import React, { useState, useEffect, useMemo } from 'react';
import { SizeGuideProps, ConditionalsProps } from '../../typings/size-guide';
import { useCssHandles } from 'vtex.css-handles';
import { Modal } from 'vtex.styleguide';
import useProduct from 'vtex.product-context/useProduct';
import { useDevice } from 'vtex.device-detector'
import { FormattedMessage } from 'react-intl'

/**
 * declare todos los modificadores de clases que necesite su proyecto recuerde
 * que esto permitira que su proyectos sea configurable
 */
const CSS_HANDLES = ['label', 'image', 'modalContainer', 'modal'] as const;
/**
 * declaracion del componente
 */
const SizeGuide: StorefrontFunctionComponent<SizeGuideProps> = ({
    conditionals,
}) => {
    const [isModalOpen, handleOpenModal] = useState(false);
    const [showGuide, setShowGuide] = useState(false);
    const [guide, setGuide]: any = useState();
    const { product } = useProduct() ?? {};
    const { brandId, categoryTree } = product ?? {};
    /*
  se usa memo para que solo se cargue una vez estos valores 
  */
    const memoProduct = useMemo(() => {
        return { brandId, categoryTree };
    }, [product]);
    /*
  verifica la condicion de existencia de la marca en el contexto de producto
  */
    const matchBrand = (conditional: ConditionalsProps) => {
        return conditional?.brands?.includes(String(memoProduct?.brandId));
    };
    /*
  verifica la condicion de existencia de la catrgoria en el contexto de producto
  */
    const matchCategory = (conditional: ConditionalsProps) => {
        for (let i = 0; i < conditional?.categories?.length; i++) {
            const element = String(conditional?.categories[i]);
            const result = Boolean(
                memoProduct?.categoryTree?.find(
                    (category: any) => String(category?.id) === element
                )
            );
            if (result) {
                return true;
            }
        }
        return false;
    };
    /*
  confronta las condiciones para determinar si se muestra la guia de tallas o no y que imagen mostrara
  */
    const { device } = useDevice()
    const getGuide = () => {
        if (conditionals?.length > 0) {
            let necessaryMatch = 0;
            let countMatch = 0;
            for (let i = 0; i < conditionals?.length; i++) {
                necessaryMatch = 2;
                countMatch = 0;
                const condition = conditionals[i];
                condition.categories?.length > 0
                    ? matchCategory(condition)
                        ? (countMatch += 1)
                        : null
                    : (necessaryMatch -= 1);
                condition.brands?.length > 0
                    ? matchBrand(condition)
                        ? (countMatch += 1)
                        : null
                    : (necessaryMatch -= 1);
                if (necessaryMatch > 0 && necessaryMatch === countMatch) {
                    if (device === 'phone' && condition.imagePhone != "") {
                        setShowGuide(true);
                        setGuide(condition?.imagePhone);
                    } else if (device === 'tablet' && condition.imageTablet != "") {
                        setShowGuide(true);
                        setGuide(condition?.imageTablet);
                    } else {
                        setShowGuide(true);
                        setGuide(condition?.imageDesktop);
                    }
                    return;
                }
            }
        }
    };
    useEffect(() => {
        getGuide();
    }, [product]);
    const handles = useCssHandles(CSS_HANDLES);
    console.log(guide);
    return (
        <React.Fragment>
            {showGuide ? (
                <div className={`ml1 mt3 t-body c-muted-2`}>
                    <span
                        className={`pointer ${handles.label}`}
                        onClick={() => handleOpenModal(true)}
                    >
                        <FormattedMessage id="store/sizeGuide.label" />
                    </span>
                </div>
            ) : null}
            <Modal
                centered
                isOpen={isModalOpen}
                onClose={(e: any) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleOpenModal(false);
                }}
                class={handles.image}
            >
                <div
                    className={`vtex-modal-content flex flex-center ${handles.modalContainer}`}
                >
                    <img className={handles.image} src={guide} />
                </div>
            </Modal>
        </React.Fragment>
    );
};

/**
 * esquema base del componenete esto habilita el site editor desde el admin
 */

SizeGuide.schema = {
    title: 'admin/editor.size-guide.title',
    description: 'admin/editor.size-guide.description',
    type: 'object',
    properties: {
        conditionals: {
            title: 'admin/editor.size-guide.conditionals.title',
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    brands: {
                        title: 'admin/editor.size-guide.brands.title',
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                    },
                    categories: {
                        title: 'admin/editor.size-guide.categories.title',
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                    },
                    imageDesktop: {
                        title: 'admin/editor.size-guide.imageDesktop.title',
                        type: 'string',
                        widget: {
                            'ui:widget': 'image-uploader',
                        },
                    }, imageTablet: {
                        title: 'admin/editor.size-guide.imageTablet.title',
                        type: 'string',
                        widget: {
                            'ui:widget': 'image-uploader',
                        },
                    }, imagePhone: {
                        title: 'admin/editor.size-guide.imagePhone.title',
                        type: 'string',
                        widget: {
                            'ui:widget': 'image-uploader',
                        },
                    },
                },
            },
        },
    },
};

export default SizeGuide;
