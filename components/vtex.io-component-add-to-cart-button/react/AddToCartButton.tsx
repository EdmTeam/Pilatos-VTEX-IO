import React, { useState, useEffect, useRef, Fragment } from 'react'
import {
  FormattedMessage,
  MessageDescriptor,
  useIntl,
  defineMessages,
} from 'react-intl'
import { Button, Tooltip } from 'vtex.styleguide'
import { Utils } from 'vtex.checkout-resources'
import { useCssHandles } from 'vtex.css-handles'
import { useRuntime } from 'vtex.render-runtime'
import { usePixel } from 'vtex.pixel-manager'
import { useProductDispatch } from 'vtex.product-context'
import { usePWA } from 'vtex.store-resources/PWAContext'
import { useOrderItems } from 'vtex.order-items/OrderItems'

import { CartItem } from './modules/catalogItemToCart'
import useMarketingSessionParams from './hooks/useMarketingSessionParams'
import './addToCartButton.css'

interface ProductLink {
  linkText?: string
  productId?: string
}

interface Props {
  isOneClickBuy: boolean
  available: boolean
  disabled: boolean
  multipleAvailableSKUs: boolean
  customToastUrl?: string
  customOneClickBuyLink?: string
  skuItems: CartItem[]
  showToast: Function
  allSkuVariationsSelected: boolean
  text?: string
  unavailableText?: string
  productLink: ProductLink
  onClickBehavior: 'add-to-cart' | 'go-to-product-page' | 'ensure-sku-selection'
  customPixelEventId?: string
  addToCartFeedback?: 'customEvent' | 'toast'
  onClickEventPropagation: 'disabled' | 'enabled'
}

// We apply a fake loading to accidental consecutive clicks on the button
const FAKE_LOADING_DURATION = 500

const CSS_HANDLES = [
  'buttonText',
  'buttonDataContainer',
  'tooltipLabelText',
  'btnStyle',
  'btnStyleClose',
  'btnStyleBuy',
  'showTalla',
  'hideElement',
  'itemMenu',
  'itemMenuBuy',
  'alignBlock',
  'widthFull'
] as const

const messages = defineMessages({
  success: { id: 'store/add-to-cart.success' },
  duplicate: { id: 'store/add-to-cart.duplicate' },
  error: { id: 'store/add-to-cart.failure' },
  seeCart: { id: 'store/add-to-cart.see-cart' },
  skuVariations: {
    id: 'store/add-to-cart.select-sku-variations',
  },
  schemaTitle: { id: 'admin/editor.add-to-cart.title' },
  schemaTextTitle: { id: 'admin/editor.add-to-cart.text.title' },
  schemaTextDescription: { id: 'admin/editor.add-to-cart.text.description' },
  schemaUnavailableTextTitle: {
    id: 'admin/editor.add-to-cart.text-unavailable.title',
  },
  schemaUnavailableTextDescription: {
    id: 'admin/editor.add-to-cart.text-unavailable.description',
  },
})

const mapSkuItemForPixelEvent = (skuItem: CartItem) => {
  // Changes this `/Apparel & Accessories/Clothing/Tops/`
  // to this `Apparel & Accessories/Clothing/Tops`
  const category = skuItem.category ? skuItem.category.slice(1, -1) : ''

  return {
    skuId: skuItem.id,
    ean: skuItem.ean,
    variant: skuItem.variant,
    price: skuItem.price,
    name: skuItem.name,
    quantity: skuItem.quantity,
    productId: skuItem.productId,
    productRefId: skuItem.productRefId,
    brand: skuItem.brand,
    category,
    detailUrl: skuItem.detailUrl,
    imageUrl: skuItem.imageUrl,
    referenceId: skuItem?.referenceId?.[0]?.Value,
    seller: skuItem.seller,
    sellerName: skuItem.sellerName,
  }
}

function AddToCartButton(props: Props) {
  const {
    text,
    isOneClickBuy,
    available,
    disabled,
    skuItems,
    showToast,
    customToastUrl,
    unavailableText,
    customOneClickBuyLink,
    allSkuVariationsSelected = true,
    productLink,
    onClickBehavior,
    multipleAvailableSKUs,
    customPixelEventId,
    addToCartFeedback,
    onClickEventPropagation = 'disabled',
  } = props

  const intl = useIntl()
  const handles = useCssHandles(CSS_HANDLES)
  const { addItem } = useOrderItems()
  const productContextDispatch = useProductDispatch()
  const { rootPath = '', navigate } = useRuntime()
  const { url: checkoutURL, major } = Utils.useCheckoutURL()
  const { push } = usePixel()
  const { settings = {}, showInstallPrompt = undefined } = usePWA() || {}
  const { promptOnCustomEvent } = settings
  const { utmParams, utmiParams } = useMarketingSessionParams()
  const [isFakeLoading, setFakeLoading] = useState(false)
  const translateMessage = (message: MessageDescriptor) =>
    intl.formatMessage(message)

  // collect toast and fake loading delay timers
  const timers = useRef<Record<string, number | undefined>>({})

  // prevent timers from doing something if the component was unmounted
  useEffect(function onUnmount() {
    return () => {
      // We disable the eslint rule because we just want to clear the current existing timers
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(timers.current).forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    const currentTimers = timers.current

    if (isFakeLoading) {
      currentTimers.loading = window.setTimeout(
        () => setFakeLoading(false),
        FAKE_LOADING_DURATION
      )
    }
  }, [isFakeLoading])

  const resolveToastMessage = (success: boolean) => {
    if (!success) return translateMessage(messages.error)

    return translateMessage(messages.success)
  }

  const toastMessage = ({ success }: { success: boolean }) => {
    const message = resolveToastMessage(success)

    const action = success
      ? { label: translateMessage(messages.seeCart), href: customToastUrl }
      : undefined

    showToast({ message, action })
  }

  const handleAddToCart: React.MouseEventHandler = event => {
    if (onClickEventPropagation === 'disabled') {
      event.stopPropagation()
      event.preventDefault()
    }

    setFakeLoading(true)

    const productLinkIsValid = Boolean(
      productLink.linkText && productLink.productId
    )
    const shouldNavigateToProductPage =
      onClickBehavior === 'go-to-product-page' ||
      (onClickBehavior === 'ensure-sku-selection' && multipleAvailableSKUs)

    if (productLinkIsValid && shouldNavigateToProductPage) {
      navigate({
        page: 'store.product',
        params: {
          slug: productLink.linkText,
          id: productLink.productId,
        },
      })
      return
    }

    addItem(skuItems, { ...utmParams, ...utmiParams })

    const pixelEventItems = skuItems.map(mapSkuItemForPixelEvent)
    const pixelEvent =
      customPixelEventId && addToCartFeedback === 'customEvent'
        ? {
            id: customPixelEventId,
            event: 'addToCart',
            items: pixelEventItems,
          }
        : {
            event: 'addToCart',
            items: pixelEventItems,
          }

    // @ts-expect-error the event is not typed in pixel-manager
    push(pixelEvent)

    if (isOneClickBuy) {
      if (
        major > 0 &&
        (!customOneClickBuyLink || customOneClickBuyLink === checkoutURL)
      ) {
        navigate({ to: checkoutURL })
      } else {
        window.location.assign(
          `${rootPath}${customOneClickBuyLink ?? checkoutURL}`
        )
      }
    }

    addToCartFeedback === 'toast' &&
      (timers.current.toast = window.setTimeout(() => {
        toastMessage({ success: true })
      }, FAKE_LOADING_DURATION))

    /* PWA */
    if (promptOnCustomEvent === 'addToCart' && showInstallPrompt) {
      showInstallPrompt()
    }
  }

  const handleClick = (e: React.MouseEvent ) => {
    e.stopPropagation();
    e.preventDefault();

    if (productContextDispatch) {
      productContextDispatch({
        type: 'SET_BUY_BUTTON_CLICKED',
        args: { clicked: true },
      })
    }

    if (allSkuVariationsSelected) {
      handleAddToCart(e)
    }
  }

  const [showButton, setShowButton] = useState(false);

  //Funcion para mostrar las opciones completas de SKU
  const handleClickShowSku = (e: React.MouseEvent)=>{
    e.stopPropagation();
    e.preventDefault();

    const thisBtn = (e.target as Element).parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.childNodes;

    console.log(thisBtn);

    thisBtn?.forEach( content => {
      if(
        (content as Element).classList.contains('vtex-flex-layout-0-x-flexRow--contentSkuBtn')
      ){
        //Alinear bloques de sku y boton
        (content.childNodes[0] as Element).classList.add(handles.alignBlock);

        //Corregir ancho de bloques
        content.childNodes[0].childNodes.forEach(width => {
          (width as Element).classList.add(handles.widthFull);
        });

        const blockTalla = (content as Element).childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0];
        const blockColor = (content as Element).childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0];
        console.log(blockTalla)
        //Mostrar opciones de talla
        if(
          (blockTalla as Element).classList.contains('vtex-product-summary-2-x-SKUSelectorContainer')
        ){
          if(blockTalla?.childNodes[0]){
            (blockTalla?.childNodes[0] as Element).childNodes.forEach(talla => {
              if(
                (talla as Element).classList.contains('vtex-store-components-3-x-skuSelectorSubcontainer--talla')
              ){
                (talla as Element).classList.add(handles.showTalla);
                if(allSkuVariationsSelected){
                  setShowButton(true);
                }

                //Agregar label sku talla
                (talla as Element).childNodes[0].childNodes.forEach(label => {
                  if(
                    (label as Element).classList.contains('vtex-store-components-3-x-skuSelectorTextContainer')
                  ){
                    (label as Element).classList.add(handles.showTalla);
                    (label as Element).innerHTML = '<b>02.</b><span> Selecciona la talla</span>';
                  }
                });
              }else if(
                (talla as Element).classList.contains('pilatos21-product-summary-0-x-skuSelectorSubcontainer--color')
              ){
                //Agregar label sku Color
                (talla as Element).childNodes[0].childNodes.forEach(label => {
                  if(
                    (label as Element).classList.contains('pilatos21-product-summary-0-x-skuSelectorTextContainer')
                  ){
                    (label as Element).classList.add(handles.showTalla);
                    (label as Element).innerHTML = '<b>01.</b><span> Selecciona el color</span>';
                  }
                });
              }
            });

            (blockColor?.childNodes[0] as Element).childNodes.forEach(color => {
              if(
                (color as Element).classList.contains('pilatos21-product-summary-0-x-skuSelectorSubcontainer--color')
              ){
                //Agregar label sku Color
                (color as Element).childNodes[0].childNodes.forEach(label => {
                  if(
                    (label as Element).classList.contains('pilatos21-product-summary-0-x-skuSelectorTextContainer')
                  ){
                    (label as Element).classList.add(handles.showTalla);
                    (label as Element).innerHTML = '<b>01.</b><span> Selecciona el color</span>';
                  }else if((label as Element).classList.contains('pilatos21-product-summary-0-x-skuSelectorOptionsList')){
                    (label as Element).classList.add('pilatos21-product-summary-0-x-skuSelectorOptionsListMore');
                  }
                });
              }
            });

          }else{
            if (productContextDispatch) {
              productContextDispatch({
                type: 'SET_BUY_BUTTON_CLICKED',
                args: { clicked: true },
              });
            }

            if (allSkuVariationsSelected) {
              handleAddToCart(e);
            }
          }
        }
      }

      // Ocultar nombre y precio
      if(
        (content as Element).classList.contains('vtex-product-summary-2-x-nameContainer')
      ){
        (content as Element).classList.add(handles.hideElement);
      }else if((content as Element).classList.contains('vtex-product-summary-2-x-productBrandContainer')
      ){
        (content as Element).classList.add(handles.hideElement);
      }else if(
        (content as Element).classList.contains('vtex-flex-layout-0-x-flexRow--contentPrice')
      ){
        (content as Element).classList.add(handles.hideElement);
      }else if(
        (content as Element).classList.contains('vtex-stack-layout-0-x-stackContainer')
      ){
        (content as Element).childNodes.forEach(wish =>{
          if(
            (wish as Element).classList.contains('vtex-stack-layout-0-x-stackItem--addWishList')
          ){
            (wish as Element).classList.add(handles.hideElement);
          }
        });
      }
    });
  }

  const handleClickCloseSku = (e: any) =>{
    e.stopPropagation();
    e.preventDefault();

    setShowButton(false);

    const thisBtn = (e.target as Element).parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.childNodes;

    thisBtn?.forEach( content => {
      if(
        (content as Element).classList.contains('vtex-flex-layout-0-x-flexRow--contentSkuBtn')
      ){
        //Regresar alineamiento
        (content.childNodes[0] as Element).classList.remove(handles.alignBlock);

        const blockTalla = (content as Element).childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0];

        const blockColor = (content as Element).childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0];

        content.childNodes[0].childNodes.forEach(width => {
          (width as Element).classList.remove(handles.widthFull);
        });

        if(
          (blockTalla as Element).classList.contains('vtex-product-summary-2-x-SKUSelectorContainer')
        ){
          (blockTalla?.childNodes[0] as Element).childNodes.forEach(talla => {
            if(
              (talla as Element).classList.contains('pilatos21-add-to-cart-button-0-x-showTalla')
            ){
              (talla as Element).classList.remove(handles.showTalla);

              //Quitar label sku talla
              (talla as Element).childNodes[0].childNodes.forEach(label => {
                if(
                  (label as Element).classList.contains('vtex-store-components-3-x-skuSelectorTextContainer')
                ){
                  (label as Element).classList.remove(handles.showTalla);
                }
              });
            }else if(
              (talla as Element).classList.contains('pilatos21-product-summary-0-x-skuSelectorSubcontainer--color')
            ){
              //Quitar label sku Color
              (talla as Element).childNodes[0].childNodes.forEach(label => {
                if(
                  (label as Element).classList.contains('pilatos21-product-summary-0-x-skuSelectorTextContainer')
                ){
                  (label as Element).classList.remove(handles.showTalla);
                }else if((label as Element).classList.contains('pilatos21-product-summary-0-x-skuSelectorOptionsList')){
                  (label as Element).classList.remove('pilatos21-product-summary-0-x-skuSelectorOptionsListMore');
                }
              });
            }
          });

          (blockColor?.childNodes[0] as Element).childNodes.forEach(color => {
            if(
              (color as Element).classList.contains('pilatos21-product-summary-0-x-skuSelectorSubcontainer--color')
            ){
              //Quitar label sku Color
              (color as Element).childNodes[0].childNodes.forEach(label => {
                if(
                  (label as Element).classList.contains('pilatos21-product-summary-0-x-skuSelectorTextContainer')
                ){
                  (label as Element).classList.remove(handles.showTalla);
                }else if((label as Element).classList.contains('pilatos21-product-summary-0-x-skuSelectorOptionsList')){
                  (label as Element).classList.remove('pilatos21-product-summary-0-x-skuSelectorOptionsListMore');
                }
              });
            }
          });

        }
      }

      //Mostrar nombre y precio
      if(
        (content as Element).classList.contains('vtex-product-summary-2-x-nameContainer')
      ){
        (content as Element).classList.remove(handles.hideElement);
      }else if((content as Element).classList.contains('vtex-product-summary-2-x-productBrandContainer')
      ){
        (content as Element).classList.remove(handles.hideElement);
      }else if(
        (content as Element).classList.contains('vtex-flex-layout-0-x-flexRow--contentPrice')
      ){
        (content as Element).classList.remove(handles.hideElement);
      }else if(
        (content as Element).classList.contains('vtex-stack-layout-0-x-stackContainer')
      ){
        (content as Element).childNodes.forEach(wish =>{
          if(
            (wish as Element).classList.contains('vtex-stack-layout-0-x-stackItem--addWishList')
          ){
            (wish as Element).classList.remove(handles.hideElement);
          }
        });
      }
    });
  }

  /*
   * If text is an empty string it should render the default message
   */
  const availableButtonContent = (
    <Fragment>
      {text ? (
        <div className={`${handles.itemMenuBuy} icon-Cart`}><span>Comprar</span></div>
      ) : (
        <FormattedMessage id="store/add-to-cart.add-to-cart">
          {message => <span className={handles.buttonText}>{message}</span>}
        </FormattedMessage>
      )}
    </Fragment>
  )

  const unavailableButtonContent = unavailableText ? (
    <span className={handles.buttonText}>{unavailableText}</span>
  ) : (
    <FormattedMessage id="store/add-to-cart.label-unavailable">
      {message => <span className={handles.buttonText}>{message}</span>}
    </FormattedMessage>
  )

  const tooltipLabel = (
    <span className={handles.tooltipLabelText}>
      {intl.formatMessage(messages.skuVariations)}
    </span>
  );

  const ButtonWithLabel = (
    <Fragment>
      <Button
        block
        id={handles.btnStyleBuy}
        isLoading={isFakeLoading}
        disabled={disabled || !available}
        onClick={handleClick}
      >
        {available ? availableButtonContent : unavailableButtonContent}
      </Button>
      <Button
        block
        id={handles.btnStyleClose}
        onClick={handleClickCloseSku}
      >
        <div className={`${handles.itemMenuBuy} icon-cancel`}></div>
      </Button>
    </Fragment>
  );

  const ButtonValidate = (
    <Button
      block
      id={handles.btnStyle}
      onClick={handleClickShowSku}
      isLoading={isFakeLoading}
      disabled={disabled || !available}
    >
      {/* {available ? availableButtonContent : unavailableButtonContent} */}
      <div className={`${handles.itemMenu} icon-Cart`}></div>
    </Button>
  );

  return allSkuVariationsSelected ? (
    <Fragment>
      {showButton ?  ButtonWithLabel : ButtonValidate}
    </Fragment>
  ) : (
    <Fragment>
      <Tooltip trigger="click" label={tooltipLabel}>
        {showButton ?  ButtonWithLabel : ButtonValidate}
      </Tooltip>
    </Fragment>
  )
}

export default AddToCartButton
