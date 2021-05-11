import React, {useState} from 'react'
import styles from './styles.css'

// Componente custom que trabaja la interfaz de wishlist vacía.
const EmptyWishlist = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    const handleClick = () => {
        setToggleMenu(!toggleMenu);
    }

    const categoryList = <>
        <li className={styles.emptyWishlist__list__item}><a href="/calzacosta/d/mujer">Mujer</a></li>
        <li className={styles.emptyWishlist__list__item}><a href="/calzacosta/d/hombre">Hombre</a></li>
        <li className={styles.emptyWishlist__list__item}><a href="/calzacosta/d/kids">Kids</a></li>
        <li className={styles.emptyWishlist__list__item}><a href="/calzacosta/d/accesorios">Accesorios</a></li>
    </>;
    
    return(
        <div className={styles.emptyWishlist}>
            <p className={styles.emptyWishlist__text}>Aún no hay productos agregados</p>
            <div className={styles.emptyWishlist__category}>
                <h2 className={styles.emptyWishlist__category__title}>Agrégalos desde tu categoría preferida</h2>
                <a 
                    className={styles.emptyWishlist__toggleMenu}
                    onClick={handleClick}
                >Escoge tu categoría <span className={styles.isClosed}></span></a>
                {toggleMenu == true
                    ? <ul className={styles.emptyWishlist__list__opened}>
                        {categoryList}
                    </ul>
                    : <ul className={styles.emptyWishlist__list}>
                        {categoryList}
                    </ul>
                }
            </div>
        </div>
    );
}

export default EmptyWishlist;