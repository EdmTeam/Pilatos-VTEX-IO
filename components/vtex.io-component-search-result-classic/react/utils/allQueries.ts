import GET_PRODUCT from '../graphql/query.getProductInfo.gql'
import { useQuery } from 'react-apollo'


export const getAllProducts = (
  dataEntry: any
) => {

  const { data,
    error,
    loading } = useQuery(GET_PRODUCT, {
      variables: {
        // id: dataEntry
        id: "33396"
      }
    })

  const resultOneDoc = data
  const errorOneDoc = error
  const loadingOneDoc = loading
  return [
    resultOneDoc,
    loadingOneDoc,
    errorOneDoc
  ]
}
