import React from 'react'
import { useProduct } from 'vtex.product-context'
import styles  from './styles.css'

export default function ProductName() {
  const tituloProductoh1 = useProduct()

  console.log("producto h1" ,tituloProductoh1)

  return (
    <h1 className={styles.tituloproducto}>{tituloProductoh1?.product?.productName}</h1>
  )
}
