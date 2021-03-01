import React, { FC } from 'react';
import type { props } from '../../typings/CustomSticky';
import { useCssHandles } from 'vtex.css-handles';

/**
 * declare todos los modificadores de clases que necesite su proyecto recuerde
 * que esto permitira que su proyectos sea configurable
 */

const CSS_HANDLES = [
    'containerCloseMenu'
] as const;

/**
 * declaracion del componente
 */
const CloseMenu: FC<props> = ({
    children
}) => {
    const handles = useCssHandles(CSS_HANDLES);
    const {
        containerCloseMenu 
    } = handles

    const closeMenu = ()=>{

        const btnClose = document.querySelectorAll('.vtex-store-drawer-0-x-closeIconButton');

        btnClose.forEach(btn =>{
            (btn as HTMLElement).click();
        });
    }

    return (
            <div 
                className={ `${containerCloseMenu}` }
                onClick={closeMenu}
            >
                {children}
            </div>
    );
};

export default CloseMenu;
