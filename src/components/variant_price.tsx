import * as React from 'react'
import { RTCContext } from './rtc_context';

export interface IVariantPriceProps {
  variantId: string;
}

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
