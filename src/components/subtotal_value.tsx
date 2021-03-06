import * as React from 'react'
import { RTCContext } from './rtc_context';

/** Displays the current subtotal in the cart's currency */
export function SubtotalValue() {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }
  return (
    <span className="rtc-subtotal-value">{ctx.api.formatCurrency(ctx.cart.currencyCart.subTotal)}</span>
  )
}
