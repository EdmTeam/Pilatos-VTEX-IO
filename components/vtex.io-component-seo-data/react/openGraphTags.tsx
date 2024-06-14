import React, { useState, useEffect } from 'react'
import { useRuntime, Helmet } from 'vtex.render-runtime'

type Props = {
	metaTags: OpenGraphTags[]
}

const openGraphTags: StorefrontFunctionComponent<Props> = ({ metaTags }) => {
	const { route }: any = useRuntime();
	const [tagsGroup, setTagsGroup] = useState<OpenGraphTags | undefined>(undefined);

	useEffect(() => {
		setTagsGroup(metaTags.filter((group: OpenGraphTags) => group.url === route.canonicalPath)[0]);
	}, [route])

	return tagsGroup && tagsGroup.tags ? (
		<Helmet>
			{tagsGroup.tags.map((tag: OpenGraphTag, index: number) => <meta key={index} property={tag.property} content={tag.content} />)}
		</Helmet>
	) : null;
}

export default openGraphTags