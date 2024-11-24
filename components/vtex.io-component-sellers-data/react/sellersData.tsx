import React, { useEffect, useState } from 'react';
import { useProduct } from 'vtex.product-context';
import { useCssHandles } from 'vtex.css-handles'

const sellers = [
  { sellerName: "bscolombia", nit: "805.005.865-7", sic: "805.005.865-7" },
  { sellerName: "AGUA BENDITA S.A.S.", nit: "811044893-1", sic: "811044893-1" },
  { sellerName: "DOPPLER", nit: "800164923-9", sic: "800164923-9" },
  { sellerName: "vans", nit: "900.460.312-0", sic: "900.460.312-0" },
  { sellerName: "new era", nit: "900.460.312-0", sic: "900.460.312-0" },
  { sellerName: "jansportc", nit: "900.460.312-0", sic: "900.460.312-0" },
  { sellerName: "The North Face", nit: "900.017.250-4", sic: "900.017.250-4" },
  { sellerName: "Kappa", nit: "900.017.250-4", sic: "900.017.250-4" },
  { sellerName: "Estudio de Moda S.A.", nit: "890926803", sic: "890.926.803" }
];

const CSS_HANDLES = [
  'text_sellers_container',
  'text_sellers'
] as const

const SellersData = () => {

  const handles = useCssHandles(CSS_HANDLES)
  const context = useProduct();
  const [isOwnSeller, setIsOwnSeller] = useState(false);

  const sellerName = context?.selectedItem?.sellers[0].sellerName;


  const findSellerDetails = (name: string) => {
    return sellers.find((seller) => seller.sellerName === name);
  };


  const sellerDetails = sellerName ? findSellerDetails(sellerName): null

  useEffect (()=> {
      setIsOwnSeller(sellerName === "Estudio de Moda S.A.");
      console.log("Este es el estado >>", isOwnSeller);
  }, [sellerName])


  return (
    <div className={`w-90 pa3 flex justify-center ${handles.text_sellers_conatiner}`}>
      {sellerDetails ? (
        <>
        <p className={`w-90 pa3 f7 tc ${handles.text_sellers}`}>
         NIT: {sellerDetails.nit} - SIC: {sellerDetails.sic}
        </p>
        {isOwnSeller ? <p className={`w-90 pa3 f7 tc dn`} id="ownship"></p>
        :
        <p className={`w-90 pa3 f7 tc dn`} id="othership"></p>}
      </>
      ) : null}
    </div>
  );
};

export default SellersData;
