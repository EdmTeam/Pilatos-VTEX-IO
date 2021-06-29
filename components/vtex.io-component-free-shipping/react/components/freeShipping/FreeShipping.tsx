import React, { useState, useEffect } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { Progress } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedCurrency } from 'vtex.format-currency'
import { FreeShippingProps } from '../../typings/free-shipping'

/**
 * Modifiers of each of the component classes allow you to style each of the blocks
 */
const CSS_HANDLES = [
  'fs_globalFreeShippingContainer',
  'fs_informativeFreeShippingText',
  'fs_freeShippingProgressBar',
  'fs_rangeFreeShippingContainer',
  'fs_initialRangeFreeShippingText',
  'fs_endRangeFreeShippingText',
] as const

const FreeShipping: StorefrontFunctionComponent<FreeShippingProps> = ({
  valueOfFreeShipping,
  infoLabel,
  show,
}) => {
  const handles = useCssHandles(CSS_HANDLES)

  // Get subTotal of my cart that is equal to the sum of the prices of the items in the cart
  const {
    orderForm: { totalizers },
  } = useOrderForm()

  const [missingForFreeShipping, setMissingForFreeShipping] = useState(0)
  const [percentageForFreeShipping, setPercentageForFreeShipping] = useState(1)

  let subTotal = totalizers.length === 0  ? 0 : totalizers[0].value / 100

  useEffect(() => {
    setMissingForFreeShipping(
      valueOfFreeShipping - subTotal <= 0 ? 0 : valueOfFreeShipping - subTotal
    )
    setPercentageForFreeShipping(
      (subTotal * 100) / valueOfFreeShipping > 100
        ? 100
        : (subTotal * 100) / valueOfFreeShipping
    )
  }, [subTotal])

  return (
    <div>
      {show.freeShippingComponent && (
        <div className={`w-90 pa3 ${handles.fs_globalFreeShippingContainer}`}>
        {show.informativeFreeShippingText && (
          <p
            className={`t-body mw9 mw-100 ${handles.fs_informativeFreeShippingText} vtex-freeShipping-2-x-contentLabel`}
          >
            <span>
              {show.labelInitial &&
                percentageForFreeShipping < 100 &&
                infoLabel.labelInitial}
              {show.subTotal && percentageForFreeShipping < 100 && (
                <FormattedCurrency value={subTotal} />
              )}
            </span>
            <span className="vtex-freeShipping-2-x-labelBetween">
              {show.labelBetween &&
                percentageForFreeShipping < 100 &&
                infoLabel.labelBetween}
              {show.missingForFreeShipping && percentageForFreeShipping < 100 && (
                <FormattedCurrency value={missingForFreeShipping} />
              )}
            </span>
            <span className="vtex-freeShipping-2-x-labelFinal">
              {show.labelFinal &&
                percentageForFreeShipping < 100 &&
                infoLabel.labelFinal}
            </span>
            <span className="vtex-freeShipping-2-x-labelAdditional">
              {show.labelAdditional &&
                percentageForFreeShipping < 100 &&
                infoLabel.labelAdditional}
            </span>
            <span className="vtex-freeShipping-2-x-labelComplete">
              {show.labelFreeShippingComplete &&
                percentageForFreeShipping === 100 &&
                infoLabel.labelFreeShippingComplete}
            </span>
          </p>
        )}
        {show.rangeFreeShipping && (
          <div
            className={`flex flex-wrap items-center justify-between pa2 ${handles.fs_rangeFreeShippingContainer}`}
          >
            {show.percentageFreeShipping && (
              <Progress
                type="line"
                percent={percentageForFreeShipping}
                className={`mw-100 ${handles.fs_freeShippingProgressBar}`}
              />
            )}
            <p
              className={`t-body mw9 self-start ${handles.fs_initialRangeFreeShippingText}`}
            >
              {' '}
              <FormattedCurrency value={0} />{' '}
            </p>
            <p
              className={`t-body mw9 self-end ${handles.fs_endRangeFreeShippingText}`}
            >
              {' '}
              <FormattedCurrency value={valueOfFreeShipping} />{' '}
            </p>
          </div>
        )}
      </div>
      )}
    </div>
  )
}

FreeShipping.defaultProps = {
  valueOfFreeShipping: 1,
  infoLabel: {
    labelInitial: 'Valor actual:',
    labelBetween: '¡Faltan ',
    labelFinal: 'para que su envío sea totalmente gratis!',
    labelFreeShippingComplete: '¡Su envio es totalmente gratis!',
    labelAdditional: 'test',
  },
  show: {
    freeShippingComponent: true,
    informativeFreeShippingText: true,
    percentageFreeShipping: true,
    rangeFreeShipping: true,
    labelInitial: true,
    subTotal: true,
    labelBetween: true,
    missingForFreeShipping: true,
    labelFinal: true,
    labelAdditional: true,
    labelFreeShippingComplete: true,
  },
}

FreeShipping.schema = {
  title: 'admin/editor.free-shipping.title',
  description: 'admin/editor.free-shipping.description',
  type: 'object',
  properties: {
    valueOfFreeShipping: {
      title: 'admin/editor.free-shipping.valueOfFreeShipping.title',
      type: 'number',
    },
    infoLabel: {
      title: '',
      type: 'object',
      properties: {
        labelInitial: {
          title: 'admin/editor.free-shipping.infoLabel.labelInitial.title',
          type: 'string',
        },
        labelBetween: {
          title: 'admin/editor.free-shipping.infoLabel.labelBetween.title',
          type: 'string',
        },
        labelFinal: {
          title: 'admin/editor.free-shipping.infoLabel.labelFinal.title',
          type: 'string',
        },
        labelAdditional: {
          title: 'admin/editor.free-shipping.infoLabel.labelAdditional.title',
          type: 'string',
        },
        labelFreeShippingComplete: {
          title:
            'admin/editor.free-shipping.infoLabel.labelFreeShippingComplete.title',
          type: 'string',
        },
      },
    },
  },
}

export default FreeShipping
