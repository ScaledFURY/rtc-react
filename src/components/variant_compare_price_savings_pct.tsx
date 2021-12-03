import * as React from 'react'
import { RTCContext } from './rtc_context';

export interface IVariantComparePriceSavingsPctProps {
  /** The variantId this control should display */
  variantId: string;
}

/** Displays a variant's compare price savings (compare-actual) in percent (without % symbol) */
export const VariantComparePriceSavingsPct = (props:IVariantComparePriceSavingsPctProps) => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }
  const variantData = ctx.api.getVariantData(props.variantId);
  if (!variantData) {
    return null;
  }
  return (
    <span className="rtc-variant-compare-price-savings-pct">{variantData.compareSavingsPct}</span>
  )
}
