import React, { useState, useEffect } from 'react'
import { Helmet } from 'vtex.render-runtime'
import { useProduct } from 'vtex.product-context'

type Props = {
	schemas: PdpLdJsonSchema[]
}

const seoSchemaPdp: StorefrontFunctionComponent<Props> = ({ schemas }) => {
	const context = useProduct()
	const [schema, setSchema] = useState<PdpLdJsonSchema | undefined>(undefined);

	useEffect(() => {
		if (context?.product) {
			const id = context?.product.productId;
			setSchema(schemas.filter((schema: PdpLdJsonSchema) => schema.productId === id)[0]);
		}
	}, [context?.product])

	return schema && schema.data ? (
		<Helmet>
			<script type="application/ld+json">{`${JSON.stringify(schema.data)}`}</script>
		</Helmet>
	) : null;
}

export default seoSchemaPdp
