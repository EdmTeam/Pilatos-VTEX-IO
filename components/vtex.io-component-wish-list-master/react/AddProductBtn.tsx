/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {
  FC,
  useState,
  useContext,
  useEffect,
  SyntheticEvent,
} from 'react';
import { useMutation, useLazyQuery } from 'react-apollo';
import { defineMessages, useIntl } from 'react-intl';
import { ProductContext } from 'vtex.product-context';
import { Button, ToastContext, Modal } from 'vtex.styleguide';
// import { useRuntime } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles';
import AddBtnItf from './typings/addBtn';
import { ProductListContext } from 'vtex.product-list-context';

import { getSession } from './modules/session';
import storageFactory from './utils/storage';
import checkItem from './queries/checkItem.gql';
import addToList from './queries/addToList.gql';
import removeFromList from './queries/removeFromList.gql';
import styles from './styles.css';

const localStore = storageFactory(() => sessionStorage);
const CSS_HANDLES = ['wishlistIconContainer', 'wishlistIcon'] as const;

let isAuthenticated =
  JSON.parse(String(localStore.getItem('wishlist_isAuthenticated'))) ?? false;
let shopperId = localStore.getItem('wishlist_shopperId') ?? null;

const productCheck: {
  [key: string]: { isWishlisted: boolean; wishListId: string }
} = {};
const defaultValues = {
  LIST_NAME: 'Wishlist',
};

const messages: {
  [key: string]: { defaultMessage: string; id: string }
} = defineMessages({
  addButton: {
    defaultMessage: '',
    id: 'store/wishlist.addButton',
  },
  seeLists: {
    defaultMessage: '',
    id: 'store/wishlist-see-lists',
  },
  productAddedToList: {
    defaultMessage: '',
    id: 'store/wishlist-product-added-to-list',
  },
  addProductFail: {
    defaultMessage: '',
    id: 'store/wishlist-add-product-fail',
  },
  listNameDefault: {
    defaultMessage: '',
    id: 'store/wishlist-default-list-name',
  },
  login: {
    defaultMessage: '',
    id: 'store/wishlist-login',
  },
  notLogged: {
    defaultMessage: '',
    id: 'store/wishlist-not-logged',
  },
});

const useSessionResponse = () => {
  const [session, setSession] = useState();
  const sessionPromise = getSession();

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

const AddBtn: FC<AddBtnItf> = ({children}) => {
  const { useProductListDispatch } = ProductListContext;
  const dispatch = useProductListDispatch();
  const intl = useIntl();
  const [state, setState] = useState<any>({
    isLoading: true,
    isWishlisted: false,
    isWishlistPage: null,
    wishListId: null,
  });

  const [removeProduct, { loading: removeLoading }] = useMutation(
    removeFromList,
    {
      onCompleted: (res: any) => {
        if (productCheck[product.productId]) {
          productCheck[product.productId] = {
            isWishlisted: false,
            wishListId: '',
          }
        }
        setState({
          ...state,
          isWishlisted: !res.removeFromList,
          isWishlistPage: false,
          wishListId: res.removeFromList ? null : wishListId,
        });
      },
    }
  );
  
  const handles = useCssHandles(CSS_HANDLES);
  const { showToast } = useContext(ToastContext);
  const { product } = useContext(ProductContext) as any;
  const sessionResponse: any = useSessionResponse();
  const [handleCheck, { data, loading, called }] = useLazyQuery(checkItem);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {}, [isModalOpen]);

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//     return null;
// }

  const handleCloseModal = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsModalOpen(false);
      return null;
  }

  const toastMessage = (messsageKey: string) => {
    let action: any
    if (messsageKey === 'notLogged') {
      action = {
        label: intl.formatMessage(messages.login),
        onClick: () =>
          window.location.href = '/login?returnUrl=/login'
      }
    }
    if (messsageKey === 'productAddedToList') {
      action = {
        label: intl.formatMessage(messages.seeLists),
        onClick: () =>
          window.location.href = '/lista-deseos'
      }
    }

    showToast({
      message: intl.formatMessage(messages[messsageKey]),
      action,
    })
  }
  const [addProduct, { loading: addLoading, error: addError }] = useMutation(
    addToList,
    {
      onCompleted: (res: any) => {
        setState({
          ...state,
          isWishlisted: !!res.addToList,
          wishListId: res.addToList,
        });
        toastMessage('productAddedToList');
      },
    }
  );

  if (addError) {
    toastMessage('addProductFail');
  }

  if (sessionResponse) {
    isAuthenticated =
      sessionResponse?.namespaces?.profile?.isAuthenticated?.value === 'true';
    shopperId = sessionResponse?.namespaces?.profile?.email?.value ?? null;

    localStore.setItem(
      'wishlist_isAuthenticated',
      JSON.stringify(isAuthenticated)
    );
    localStore.setItem('wishlist_shopperId', String(shopperId));
  }

  const { isWishlisted, wishListId, isWishlistPage } = state;

  if (!product) return null;

  if (isWishlistPage === null && product?.wishlistPage) {
    setState({
      ...state,
      isWishlistPage: true,
    });
  }

  const getIdFromList = (list: string, item: any) => {
    const pos = item.listNames.findIndex((listName: string) => {
      return list === listName;
    });
    return item.listIds[pos];
  }

  if (isAuthenticated && product && !called) {
    handleCheck({
      variables: {
        shopperId: String(shopperId),
        productId: String(product.productId),
      },
    });
  }

  const handleAddProductClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) {
      if (isWishlistPage !== true && !isWishlisted) {
        console.log(product.productId)
        console.log(product.productName)
        addProduct({
          variables: {
            listItem: {
              productId: product.productId,
              title: product.productName,
            },
            shopperId,
            name: defaultValues.LIST_NAME,
          },
        });
      } else {
        async function callRemoveProduct(){
          await removeProduct({
            variables: {
              id: product?.wishlistId ?? wishListId,
              shopperId,
              name: defaultValues.LIST_NAME,
            },
          });
          window.location.reload();
        };
        callRemoveProduct();
      }
      dispatch({ type: 'SEND_IMPRESSION', args: { product: product }})
    } else {
      window.location.href = '/login'
      // handleOpenModal();
    }
  }

  if (
    data?.checkList?.inList &&
    !wishListId &&
    (!productCheck[product.productId] ||
      productCheck[product.productId].wishListId === null)
  ) {
    const itemWishListId = getIdFromList(
      defaultValues.LIST_NAME,
      data.checkList
    );
    setState({
      ...state,
      isWishlisted: data.checkList.inList,
      wishListId: itemWishListId,
    });
    productCheck[product.productId] = {
      isWishlisted: data.checkList.inList,
      wishListId: itemWishListId,
    };
  }

  const checkFill = () => {
    return (
      isWishlisted ||
      productCheck[product.productId]?.isWishlisted ||
      (isWishlistPage && wishListId === null)
    );
  }

  const eventPrevention = (e: SyntheticEvent) => {
    e.stopPropagation();
  }
  
  return (
    <div className={handles.wishlistIconContainer} onClick={eventPrevention}>
      <Button
        variation="tertiary"
        onClick={handleAddProductClick}
        isLoading={loading || addLoading || removeLoading}
      >
        <div className={styles.wishlist__button}>
          <span
            className={`${handles.wishlistIcon} ${
              checkFill() ? styles.fill : styles.outline
            } ${styles.iconSize}`}
          />
        </div>
      </Button>
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

export default AddBtn;
