import React from 'react'
import styles from './styles.css'

// Componente custom que trabaja la interfaz de wishlist vacía.
const EmptyWishlist = () => {
    return(
        <div className={styles.emptyWishlist}>
            <p className={styles.emptyWishlist__text}>Aún no hay productos agregados</p>
        </div>
    );
}

export default EmptyWishlist;