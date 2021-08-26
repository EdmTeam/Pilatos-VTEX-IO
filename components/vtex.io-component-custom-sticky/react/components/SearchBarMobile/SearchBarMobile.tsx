import React, { FC } from 'react';
import type { props } from '../../typings/CustomSticky';
import { useCssHandles } from 'vtex.css-handles';

/**
 * declare todos los modificadores de clases que necesite su proyecto recuerde
 * que esto permitira que su proyectos sea configurable
 */

const CSS_HANDLES = [
    'containerOpenSearchBar'
] as const;

/**
 * declaracion del componente
 */
const SearchBarMobile: FC<props> = ({
    children
}) => {
    const handles = useCssHandles(CSS_HANDLES);
    const {
        containerOpenSearchBar 
    } = handles;

    setTimeout(() => {
        const icoSearch = document.querySelector('.vtex-flex-layout-0-x-flexCol--contentSearchMobile');

        if(icoSearch){
            icoSearch?.addEventListener('click', openSearch);

            function openSearch(){
                const openContentHeaderBar = document.querySelector('.vtex-flex-layout-0-x-flexRow--contentHeaderBar');
                const openContentSearchBar = document.querySelector('.vtex-flex-layout-0-x-flexRow--contentSearchClose');

                if(openContentHeaderBar){
                    (openContentHeaderBar as HTMLElement).style.display = 'none';
                }
                if(openContentSearchBar){
                    (openContentSearchBar as HTMLElement).style.display = 'block';
                }
            }
        }
    }, 2000);

    const closeSearch = ()=>{

        const contentHeaderBar = document.querySelector('.vtex-flex-layout-0-x-flexRow--contentHeaderBar');
        const contentSearchBar = document.querySelector('.vtex-flex-layout-0-x-flexRow--contentSearchClose');

        if(contentHeaderBar){
            (contentHeaderBar as HTMLElement).style.display = 'block';
        }
        if(contentSearchBar){
            (contentSearchBar as HTMLElement).style.display = 'none';
        }
    }

    return (
            <div 
                className={ `${containerOpenSearchBar}  vtex-search-1-x-containerOpenSearchBar` }
                onClick={closeSearch}
            >
                {children}
            </div>
    );
};

export default SearchBarMobile;
