import React, { useMemo, useState, useEffect, FC } from 'react';
import { useLazyQuery } from 'react-apollo';
// @ts-expect-error - useTreePath is a private API
import { ExtensionPoint, useRuntime, useTreePath } from 'vtex.render-runtime';
import { useListContext, ListContextProvider } from 'vtex.list-context';
import { ProductListContext } from 'vtex.product-list-context';
import { Modal } from 'vtex.styleguide';

import { mapCatalogProductToProductSummary } from './utils/normalize';
import ProductListEventCaller from './components/ProductListEventCaller';
import productsQuery from './queries/productById.gql';
import ViewLists from './queries/viewLists.gql';
import { getSession } from './modules/session';
import storageFactory from './utils/storage';
import styles from './styles.css';

// Componente basado en AddProductBtn para hacer botón de acceso a wishlist con conteo de productos

const localStore = storageFactory(() => localStorage)
let isAuthenticated =
  JSON.parse(String(localStore.getItem('wishlist_isAuthenticated'))) ?? false;
let shopperId = localStore.getItem('wishlist_shopperId') ?? null;

const useSessionResponse = () => {
  const [session, setSession] = useState()
  const sessionPromise = getSession()

  useEffect(() => {
    if (!sessionPromise) {
      return;
    }

    sessionPromise.then(sessionResponse => {
      const { response } = sessionResponse;
      setSession(response);
    })
  }, [sessionPromise]);

  return session;
}

const ProductSummaryList: FC = ({children}) => {
  const { list } = useListContext() || [];
  const { treePath } = useTreePath();

  const sessionResponse: any = useSessionResponse();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {}, [isModalOpen]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    return null;
  }

  const handleCloseModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(false);
    return null;
  }

  const [
    loadLists,
    { data: dataLists, called: listCalled },
  ] = useLazyQuery(ViewLists, {
    ssr: false,
    fetchPolicy: 'network-only',
  });

  const [loadProducts, { data, error, called }] = useLazyQuery(
    productsQuery,
    {
      ssr: false,
      variables: {
        ids: dataLists?.viewLists[0]?.data.map((item: any) => {
          return item.productId
        }),
      },
    }
  );

  if (sessionResponse) {
    isAuthenticated =
      sessionResponse?.namespaces?.profile?.isAuthenticated?.value === 'true';
    shopperId = sessionResponse?.namespaces?.profile?.email?.value ?? null;

    localStore.setItem(
      'wishlist_isAuthenticated',
      JSON.stringify(isAuthenticated)
    );
    localStore.setItem('wishlist_shopperId', String(shopperId));
    if (!listCalled) {
      loadLists({
        variables: {
          shopperId,
        },
      });
    }
  }

  if (!called && dataLists) {
    loadProducts()
  }

  const { productsByIdentifier: products } = data || {}

  const newListContextValue = useMemo(() => {
    const getWishlistId = (productId: string) => {
      return dataLists?.viewLists[0]?.data.find((item: any) => {
        return item.productId === productId
      })?.id
    }
    const componentList = products?.map((product: any) => {
      const normalizedProduct = mapCatalogProductToProductSummary(
        product,
        getWishlistId(product.productId)
      )
      return (
        <ExtensionPoint
          id="product-summary"
          key={product.id}
          treePath={treePath}
          product={normalizedProduct}
        />
      )
    })
    return list.concat(componentList)
  }, [products, treePath, list, dataLists])

  if (sessionResponse && !isAuthenticated) {
    // Modificación para agregar modal con el login nativo
    return (
      <div>
        <a onClick = {handleOpenModal}>      
          <div className={styles.wishlist__icon}>
          </div>
        </a>
        <Modal
          centered
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          {children}
        </Modal>
      </div>
    );
  }

  if (!dataLists || !data || error) {
    return (
      // Edición nativa que hará el conteo del listado de productos en Wishlist.
      <ListContextProvider list={newListContextValue}>
        <div className={styles.wishlist__header}>
          <a className={styles.wishlist__header__link} href="/lista-de-deseos">
            <span className={styles.wishlist__icon}></span>
            {/*0*/}
          </a>
        </div>
      </ListContextProvider>
    );
  }

  return (
    // Edición nativa que hará el conteo del listado de productos en Wishlist.
    <ListContextProvider list={newListContextValue}>
      <div className={styles.wishlist__header}>
        <a className={styles.wishlist__header__link} href="/lista-de-deseos">
          <span className={styles.wishlist__icon}></span>
          {/*data.productsByIdentifier.length*/}
        </a>
      </div>
    </ListContextProvider>
  );
}

const EnhancedWishlistButton: FC = ({ children }) => {
  const { ProductListProvider } = ProductListContext;
  return (
    <ProductListProvider listName="wishlist">
      <ProductSummaryList>{children}</ProductSummaryList>
      <ProductListEventCaller />
    </ProductListProvider>
  );
};

export default EnhancedWishlistButton;
