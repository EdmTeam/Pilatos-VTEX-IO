import { useEffect } from 'react'
import { useProduct } from 'vtex.product-context'

function SizebayHtml() {
  const context = useProduct()

  const allowedBrands: string[] = [
    'PILATOS',
    'Marithe Francois Girbaud',
    'Kipling',
    'Diesel',
    'New Balance',
    'Superdry',
    'Replay',
  ]

  // Cargar el script solo una vez
  useEffect(() => {
    if (!document.getElementById('sizebay-vfr-v4')) {
      const script = document.createElement('script')
      script.id = 'sizebay-vfr-v4'
      script.src = 'https://static.sizebay.technology/5885/prescript.js'
      script.defer = true
      document.body.appendChild(script)
    }
  }, [])

  // Manejar el div según la marca
  useEffect(() => {
    if (!context?.product) return

    const brand = context.product.brand
    const isAllowed = allowedBrands.includes(brand)
    const existingDiv = document.getElementById('sizebay-container')

    if (isAllowed) {
      if (!existingDiv) {
        const div = document.createElement('div')
        div.id = 'sizebay-container'
        document.body.appendChild(div)
      }
    } else {
      // Si la marca no es válida, eliminamos el div si existe
      if (existingDiv) {
        existingDiv.style.display = 'none'
      }
    }
  }, [context])

  return null
}

export default SizebayHtml
