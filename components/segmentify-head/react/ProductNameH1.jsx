import React from 'react'
import { useProduct } from 'vtex.product-context'

export default function ProductNameH1() {
  const tituloProductoh1 = useProduct()


  const suma = (a, b) => a + b
  console.log(suma(1, 2))

  console.log("producto h1" ,tituloProductoh1)

  return (
    <h1>{tituloProductoh1?.product?.productName}</h1>
  )
}
