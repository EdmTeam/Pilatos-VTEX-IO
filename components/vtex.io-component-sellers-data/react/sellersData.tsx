import React, { useEffect } from 'react';
import { useProduct } from 'vtex.product-context';

const sellers = [
  { sellerName: "bscolombia", nit: "805.005.865-7", sic: "805.005.865-7" },
  { sellerName: "AGUA BENDITA S.A.S.", nit: "811044893-1", sic: "811044893-1" },
  { sellerName: "DOPPLER", nit: "800164923", sic: "800164923" },
  { sellerName: "vans", nit: "900.460.312-0", sic: "900.460.312-0" },
  { sellerName: "new era", nit: "900.460.312-0", sic: "900.460.312-0" },
  { sellerName: "jansportc", nit: "900.460.312-0", sic: "900.460.312-0" },
  { sellerName: "The North Face", nit: "900.017.250-4", sic: "900.017.250-4" },
  { sellerName: "Kappa", nit: "900.017.250-4", sic: "900.017.250-4" },
  { sellerName: "Estudio de Moda S.A.", nit: "890926803", sic: "890.926.803" }
];

const SellersData = () => {
  const context = useProduct();

  const sellerName = context?.selectedItem?.sellers[0].sellerName;


  const findSellerDetails = (name: string) => {
    return sellers.find((seller) => seller.sellerName === name);
  };


  const sellerDetails = sellerName ? findSellerDetails(sellerName): null

  useEffect (()=> {
    console.log("este es el sellerName >>", sellerName)
  }, [sellerName])


  return (
    <div>
      {sellerDetails ? (
        <p>
         NIT: {sellerDetails.nit} - SIC: {sellerDetails.sic}
        </p>
      ) : null}
    </div>
  );
};

export default SellersData;
