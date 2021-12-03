import * as React from 'react'
import { RTCContext } from './rtc_context';

export interface IVariantComparePriceSavingsPctProps {
  variantId: string;
}

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
