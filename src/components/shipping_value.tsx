import * as React from 'react'
import { RTCContext } from './rtc_context';

export const ShippingValue = () => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }
  return (
    <span className="rtc-shipping-value">{ctx.publicApi.formatCurrency(ctx.cart.currencyCart.shippingTotal)}</span>
  )
}
