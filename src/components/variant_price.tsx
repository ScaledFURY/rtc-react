import * as React from 'react'
import { RTCContext } from './rtc_context';

/** Properties for the VariantPrice component */
export interface IVariantPriceProps {
  /** The variantId this control should display */
  variantId: string;
}

/** Displays a variant's actual price in the cart's currency */
export const VariantPrice = (props:IVariantPriceProps) => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }
  const variantData = ctx.api.getVariantData(props.variantId);
  if (!variantData) {
    return null;
  }
  return (
    <span className="rtc-variant-price">{variantData.priceFormatted}</span>
  )
}
