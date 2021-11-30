import * as React from 'react'
import { RTCContext } from './rtc_context';

export const ShippingValue = () => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart || !ctx.currencyFormatter) {
    return null;
  }
  return (
    <span className="rtc-shipping-value">{ctx.currencyFormatter.format(ctx.cart.currencyCart.shippingTotal)}</span>
  )
}
