import * as React from 'react'
import { RTCContext } from './rtc_context';

/** Displays the current shipping total in the cart's currency */
export const ShippingValue = () => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }
  return (
    <span className="rtc-shipping-value">{ctx.api.formatCurrency(ctx.cart.currencyCart.shippingTotal)}</span>
  )
}
