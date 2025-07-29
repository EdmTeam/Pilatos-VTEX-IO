import { FunctionComponent } from 'react'

declare global {
  interface StorefrontFunctionComponent<P = {}> extends FunctionComponent<P> {
    getSchema?(props: P): object
    schema?: object
  }

  interface StorefrontComponent<P = {}, S = {}> extends Component<P, S> {
    getSchema?(props: P): object
    schema: object
  }

  interface LdJsonSchemaBrand {
    '@type': string
    name: string
  }
  interface LdJsonSchemaRatings {
    '@type': string
    ratingValue: string
    bestRating: string
    worstRating: string
    ratingCount: string
  }
  interface LdJsonSchema {
    '@context': string
    '@type': string
    name: string
    image: string
    description: string
    brand: LdJsonSchemaBrand
    sku: string
    aggregateRating: LdJsonSchemaRatings
  }
  interface PlpLdJsonSchema {
    url: string
    htmlId?: string
    data: LdJsonSchema
  }
  interface PdpLdJsonSchema {
    productId: string,
    data: LdJsonSchema
  }

  interface OpenGraphTag {
    property: string
    content: string
  }
  interface OpenGraphTags {
    url: string,
    tags: OpenGraphTag[]
  }
}
