import React, { useState, useEffect } from 'react'
import { Helmet } from 'vtex.render-runtime'
import { useProduct } from 'vtex.product-context'

type PdpLdJsonSchema = {
  productId?: string
  skuId?: string
  htmlId: string
  data: object
}

type Props = {
  schemas: PdpLdJsonSchema[]
}

const seoSchemaPdp: StorefrontFunctionComponent<Props> = ({ schemas }) => {
  const context = useProduct()
  const [schema, setSchema] = useState<PdpLdJsonSchema | undefined>(undefined)

  useEffect(() => {
    if (context?.product) {
      const productId = context.product.productId
      const skuId = context.selectedItem?.itemId

      const matchByProductId = schemas.find(schema => schema.productId === productId)
      const matchBySkuId = schemas.find(schema => schema.skuId === skuId)

      setSchema(matchByProductId || matchBySkuId)
    }
  }, [context?.product, context?.selectedItem])

  return schema && schema.data ? (
    <Helmet>
      <script type="application/ld+json" id={schema.htmlId || ''}>
        {`${JSON.stringify(schema.data)}`}
      </script>
    </Helmet>
  ) : null
}

export default seoSchemaPdp
