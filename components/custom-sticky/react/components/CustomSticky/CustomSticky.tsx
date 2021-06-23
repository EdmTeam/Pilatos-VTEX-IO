import React, { FC, Fragment, useState, useEffect } from 'react';
import type { props } from '../../typings/CustomSticky';
import { useCssHandles } from 'vtex.css-handles';
import './CustomSticky.css';

/**
 * declare todos los modificadores de clases que necesite su proyecto recuerde
 * que esto permitira que su proyectos sea configurable
 */

const CSS_HANDLES = [
    'containerSticky',
    'stickyActive',
    'noStickyActive',
    'filterSticky'
] as const;

/**
 * declaracion del componente
 */
const CustomSticky: FC<props> = ({
    multiHeader = true,
    children
}) => {
    const handles = useCssHandles(CSS_HANDLES);
    const {
        containerSticky, 
        stickyActive,
        noStickyActive,
        filterSticky
    } = handles

    //Efecto sticky
    const [stickyEffect, setSticky] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', headerSticky);

        function headerSticky() {
            let scrollsticky = window.scrollY;

            scrollsticky > 0 ? setSticky(true) : setSticky(false);

            // const activeBar = document.querySelector('.pilatos21-custom-sticky-0-x-noStickyActive');
            let loginModal;
            loginModal = document.querySelectorAll('.vtex-login-2-x-portalContainer');

            if(loginModal){
                loginModal.forEach(modal => {
                    (modal as HTMLElement).style.display = 'none';
                });
            }

            let cartModal;
            cartModal = document.querySelectorAll('.vtex-minicart-2-x-popupWrapper');

            if(cartModal){
                cartModal.forEach(modal => {
                    (modal as HTMLElement).style.display = 'none';
                });
            }
        }
        
        return () => window.removeEventListener('scroll', headerSticky);
    }, []);

    //FilterSticky
    window.addEventListener('scroll', FilterSticky);
    const heightHeader = 100;

    function FilterSticky(){
        let topBanners = document.querySelector('.vtex-flex-layout-0-x-flexRow--contentSearch');
        let contentResult = document.querySelector('body');
        let heightTopBanner = (topBanners as HTMLElement).offsetHeight - heightHeader;
        let bodyResult = (contentResult as HTMLElement).offsetHeight - 1150;
        let scrollsticky = window.scrollY;
        let filterCol = document.querySelector('.vtex-flex-layout-0-x-flexCol--filterCol');
        console.log(scrollsticky, bodyResult);
        if((topBanners as HTMLElement)){
            if(scrollsticky >= heightTopBanner && scrollsticky <= bodyResult){
                (filterCol as HTMLElement).classList.add(filterSticky);
                (filterCol as HTMLElement).style.marginTop = `${heightHeader}px`;
            }else {
                (filterCol as HTMLElement).classList.remove(filterSticky);
                (filterCol as HTMLElement).style.marginTop = '0';
            }
        }
    }

    const displayNone = {
        display: 'none'
    }

    if(multiHeader){
        return (
                <div style={displayNone} className={`
                    ${containerSticky} ${stickyEffect ? stickyActive : ''}
                ` }>
                    {children}
                </div>
        );
    }else{
        return (
            <Fragment>
                <div style={displayNone} className={`
                    ${containerSticky} ${stickyEffect ? '' : noStickyActive}
                `}>
                    {children}
                </div>
            </Fragment>
        );
    }
};

export default CustomSticky;
