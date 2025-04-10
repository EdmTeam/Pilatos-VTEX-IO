import React, { useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'

function SizebayHtml() {
  const context = useProduct()
  const [showSizebay, setShowSizebay] = useState(false)

  const allowedBrands: string[] = [
    'PILATOS',
    'Marithe Francois Girbaud',
    'Kipling',
    'Diesel',
    'New Balance',
    'Superdry',
    'Replay',
  ]

  useEffect(() => {
    if (!context?.product) return

    const brand = context.product.brand

    const isAllowed = allowedBrands.includes(brand)

    setShowSizebay(isAllowed)



  }, [context])

  if (!showSizebay) return null // No renderiza nada si no aplica

  return <div id="sizebay-container"></div>
}

export default SizebayHtml