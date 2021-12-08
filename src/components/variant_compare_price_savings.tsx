import * as React from 'react'
import { RTCContext } from './rtc_context';

/* Properties for the VariantComparePriceSavings component */
export interface IVariantComparePriceSavingsProps {
  /** The variantId this control should display */
  variantId: string;
}

/** Displays a variant's compare price savings (compare - actual) in the cart's currency */
export function VariantComparePriceSavings(props:IVariantComparePriceSavingsProps) {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }
  const variantData = ctx.api.getVariantData(props.variantId);
  if (!variantData) {
    return null;
  }
  return (
    <span className="rtc-variant-compare-price-savings">{variantData.compareSavingsFormatted}</span>
  )
}
