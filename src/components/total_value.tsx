import * as React from 'react'
import { RTCContext } from './rtc_context';

/** Displays the total value in the cart's currency */
export function TotalValue() {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }
  return (
    <span className="rtc-total-value">{ctx.api.formatCurrency(ctx.cart.currencyCart.total)}</span>
  )
}
