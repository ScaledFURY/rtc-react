import * as React from 'react'
import { RTCContext } from './rtc_context';


interface IProps {
  variantId: string;
}

export const QuantityValue = (props:IProps) => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }


  return (
    <span className="rtc-cart-quantity">{ctx.api.getVariantQuantity(props.variantId)}</span>
  )
}
