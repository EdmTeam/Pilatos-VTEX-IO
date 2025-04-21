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
    // Inyectar el script una sola vez
    if (!document.getElementById('sizebay-vfr-v4')) {
      const script = document.createElement('script')
      script.id = 'sizebay-vfr-v4'
      script.src = 'https://static.sizebay.technology/5885/prescript.js'
      script.defer = true
      document.body.appendChild(script)
    }
  }, []) // Se ejecuta solo una vez cuando se monta el componente

  useEffect(() => {
    if (!context?.product) return

    const brand = context.product.brand
    const isAllowed = allowedBrands.includes(brand)

    setShowSizebay(isAllowed)
  }, [context])

  return showSizebay ? <div id="sizebay-container"></div> : null
}

export default SizebayHtml
