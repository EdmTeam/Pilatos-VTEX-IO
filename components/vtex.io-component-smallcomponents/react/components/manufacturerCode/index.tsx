import React, { useState, useEffect } from 'react';
import { useProduct } from "vtex.product-context";
import { useQuery } from 'react-apollo';
import styles from './styles.css'
import skuQuery from '../../graphql/manufacturerCode.gql';

function ManufacturerCode() {
  const [skuSelect, setSkuSelect] = useState<string | undefined>(undefined);
  let infoProduct = useProduct();

  useEffect(() => {
    setSkuSelect(infoProduct?.selectedItem?.itemId);
  }, [infoProduct?.selectedItem?.itemId]);

  const { data, loading, error } = useQuery(skuQuery, {
    variables: {
      identifier: { field: 'id', value: skuSelect }
    },
    skip: !skuSelect
  });
  if (loading || error) return null;

  let valManufacturerCode = data?.sku?.manufacturerCode;

  return (
    <div>
      <p className={`${styles.textManufacturerCode}`}>MC: {valManufacturerCode}</p>
    </div>
  );
}
export default ManufacturerCode;
