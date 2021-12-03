import * as React from 'react'
import { RTCContext } from './rtc_context';

/** Properties for the VariantComparePrice component */
export interface IVariantComparePriceProps {
  /** The variantId this control should display */
  variantId: string;
}

/** Display's a variants compare price in the cart's currency */
export const VariantComparePrice = (props:IVariantComparePriceProps) => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }
  const variantData = ctx.api.getVariantData(props.variantId);
  if (!variantData) {
    return null;
  }
  return (
    <span className="rtc-variant-compare-price">{variantData.compareAtPriceFormatted}</span>
  )
}
