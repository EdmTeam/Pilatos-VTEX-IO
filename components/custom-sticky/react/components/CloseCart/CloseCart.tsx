import React, { FC } from 'react';
import type { props } from '../../typings/CloseCart';
import { useCssHandles } from 'vtex.css-handles';

/**
 * declare todos los modificadores de clases que necesite su proyecto recuerde
 * que esto permitira que su proyectos sea configurable
 */

const CSS_HANDLES = [
    'containerCloseCart'
] as const;

/**
 * declaracion del componente
 */
const CloseMenu: FC<props> = ({
    children
}) => {
    const handles = useCssHandles(CSS_HANDLES);
    const {
        containerCloseCart 
    } = handles

    const closeCart = ()=>{

        const btnClose = document.querySelectorAll('.vtex-minicart-2-x-portalWrapper .fixed');

        btnClose.forEach(btn =>{
            (btn as HTMLElement).click();
        });
    }

    return (
            <div 
                className={ `${containerCloseCart}` }
                onClick={closeCart}
            >
                {children}
            </div>
    );
};

export default CloseMenu;
