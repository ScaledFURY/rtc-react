import * as React from 'react'
import { RTCContext } from './rtc_context';

/** Displays the current tax total in the cart's currency */
export function TaxValue() {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }
  return (
    <span className="rtc-tax-value">{ctx.api.formatCurrency(ctx.cart.currencyCart.taxTotal)}</span>
  )
}
