import React, { useEffect, useState } from 'react';
import { useProduct } from 'vtex.product-context';
import { useCssHandles } from 'vtex.css-handles'

const sellers = [
  { sellerName: "Bancolombia", nit: "805.005.865-7", sic: "805.005.865-7" },
  { sellerName: "AGUA BENDITA S.A.S.", nit: "811044893-1", sic: "811044893-1" },
  { sellerName: "Disandina S.A.S", nit: "800164923-9", sic: "800164923-9" },
  { sellerName: "Dynamo Distribution S.A.S", nit: "900.460.312-0", sic: "900.460.312-0" },
  { sellerName: "jansportc", nit: "900.460.312-0", sic: "900.460.312-0" },
  { sellerName: "Pernine Ltda.", nit: "900.017.250-4", sic: "900.017.250-4" },
  { sellerName: "Kappa", nit: "900.017.250-4", sic: "900.017.250-4" },
  { sellerName: "Estudio de Moda S.A.S", nit: "890926803", sic: "890.926.803" },
  { sellerName: "Tennis SA", nit: "890920043-3", sic: "890920043-3" }
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
  const sellerTennis = context?.product?.properties?.[0]?.values?.[0];

  console.log("sellerName", context?.selectedItem)


  const findSellerDetails = (name: string) => {
    return sellers.find((seller) => seller.sellerName === name);
  };


  const sellerDetails = sellerName ? findSellerDetails(sellerName): null

  useEffect (()=> {
      setIsOwnSeller(sellerName === "Estudio de Moda S.A.S");
      console.log("Este es el estado >>", isOwnSeller);
  }, [sellerName])


 useEffect(() => {
    if (sellerTennis === "Grupo 13") {
      setTimeout(() => {
        const replaceGrupo13 = document.querySelector(
          ".vtex-product-specifications-1-x-specificationValue--last"
        );

        if (replaceGrupo13) {
          const flexGrupo13 = document.querySelector(
            ".vtex-flex-layout-0-x-flexRowContent--productSpecification"
          ) as HTMLElement | null;

          if (flexGrupo13) {
            flexGrupo13.style.display = "flex";
            flexGrupo13.style.flexDirection = "column";
          }

          replaceGrupo13.innerHTML = `
            <img 
              src="https://pilatos21.vteximg.com.br/arquivos/instrucciones-de-cuidado.JPG" 
              alt="Cuidado de prenda tennis" 
              style="display: block; margin-top: 1rem; width: 100%; max-width: 400px;" 
            />
          `;
        }
      }, 500);
    }
  }, [sellerTennis]);


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
