import React, {useEffect, Fragment} from 'react';
import { useProduct } from "vtex.product-context";

const SegmentifyProductObject = () => {
    var infoProduct = useProduct();
    useEffect(() => {
        if(!infoProduct.loading) {
            setTimeout(() => {
                window.segProductInfo = [{
                    brand: infoProduct.product.brand,
                    title: infoProduct.product.productName,
                    productId: infoProduct.product.productId,
                    image: infoProduct.selectedItem.images[0].imageUrl,
                    price: infoProduct.selectedItem.sellers[0].commertialOffer.Price,
                    oldPrice: infoProduct.selectedItem.sellers[0].commertialOffer.ListPrice,
                    inStock: infoProduct.selectedItem.sellers[0].commertialOffer.AvailableQuantity > 0 ? true : false
                }]
            }, 1000);
        }
    }, [infoProduct]);
    return (
        <Fragment>
        </Fragment>
    )
}

export default SegmentifyProductObject