export interface FreeShippingProps {
  valueOfFreeShipping: number
  infoLabel: InfoProps
  show: ShowProps
}

export interface InfoProps {
  labelInitial?: string
  labelBetween?: string
  labelFinal?: string
  labelFreeShippingComplete?: string
  labelAdditional?: string
}

export interface ShowProps {
  freeShippingComponent?: boolean
  informativeFreeShippingText?: boolean
  percentageFreeShipping?: boolean
  rangeFreeShipping?: boolean
  labelInitial?: boolean
  subTotal?: boolean
  labelBetween?: boolean
  missingForFreeShipping?: boolean
  labelFinal?: boolean
  labelFreeShippingComplete?: boolean
  labelAdditional?: boolean
}
