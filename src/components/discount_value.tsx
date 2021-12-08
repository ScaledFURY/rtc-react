import * as React from 'react'
import { RTCContext } from './rtc_context';

/* Displays the cart's total discount value in the cart currency */
export function DiscountValue() {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }
  return (
    <span className="rtc-subtotal-value">{ctx.api.formatCurrency(ctx.cart.currencyCart.discountTotal)}</span>
  )
}
