export {}

declare module 'vtex.store-resources' {
  import type { DocumentNode } from 'graphql'

  export const QueryItemsWithSimulation: DocumentNode
}

declare module 'vtex.store-resources/OrderFormContext' {
  export const orderFormConsumer
}

declare module 'vtex.store-resources/QueryAddress'
