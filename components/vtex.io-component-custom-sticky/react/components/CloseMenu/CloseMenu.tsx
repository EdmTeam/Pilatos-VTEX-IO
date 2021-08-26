import React, { FC } from 'react';
import type { props } from '../../typings/CustomSticky';
import { useCssHandles } from 'vtex.css-handles';
import './CloseMenu.css'

/**
 * declare todos los modificadores de clases que necesite su proyecto recuerde
 * que esto permitira que su proyectos sea configurable
 */

const CSS_HANDLES = [
    'containerCloseMenu',
    'borderFocusClass'
] as const;

/**
 * declaracion del componente
 */
const CloseMenu: FC<props> = ({
    children
}) => {
    const handles = useCssHandles(CSS_HANDLES);
    const {
        containerCloseMenu,
        borderFocusClass
    } = handles

    const closeMenu = ()=>{

        const btnClose = document.querySelectorAll('.vtex-store-drawer-0-x-closeIconButton');

        btnClose.forEach(btn =>{
            (btn as HTMLElement).click();
        });
    }

    const selects = document.querySelectorAll('.pilatos21-store-locator-1-x-containerInfo .vtex-dropdown');
    const selectsV = document.querySelectorAll('.pilatos21-store-locator-0-x-containerInfo .vtex-dropdown');

    if(selects){
        selects.forEach(selectItem => {
            selectItem.addEventListener('click', borderFocus);

            function borderFocus(){
                selectItem.classList.add(borderFocusClass);
            }
        });
    }else{
        console.log('No encontrado')
    }

    if(selectsV){
        selectsV.forEach(selectItem => {
            selectItem.addEventListener('click', borderFocus);

            function borderFocus(){
                selectItem.classList.add(borderFocusClass);
            }
        });
    }else{
        console.log('No encontrado')
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
