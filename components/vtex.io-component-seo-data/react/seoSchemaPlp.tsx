import React, { useState, useEffect } from 'react'
import { useRuntime, Helmet } from 'vtex.render-runtime'

type Props = {
	schemas: PlpLdJsonSchema[]
}

const seoSchemaPlp: StorefrontFunctionComponent<Props> = ({ schemas }) => {
	const { route }: any = useRuntime();
	const [schema, setSchema] = useState<PlpLdJsonSchema | undefined>(undefined);

	useEffect(() => {
		setSchema(schemas.filter((schema: PlpLdJsonSchema) => schema.url === route.canonicalPath)[0]);
	}, [route])

	return schema && schema.data ? (
		<Helmet>
			<script type="application/ld+json" id={schema.htmlId || ''}>{`${JSON.stringify(schema.data)}`}</script>
		</Helmet>
	) : null;
}

export default seoSchemaPlp