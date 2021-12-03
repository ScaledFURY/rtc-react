import * as React from 'react'
import { RTCContext } from './rtc_context';


interface IQuantityValueProps {
  variantId: string;
}

export const QuantityValue = (props:IQuantityValueProps) => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }


  return (
    <span className="rtc-cart-quantity">{ctx.api.getVariantQuantity(props.variantId)}</span>
  )
}
