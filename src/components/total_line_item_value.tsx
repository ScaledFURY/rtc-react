import * as React from 'react'
import { RTCContext } from './rtc_context';

/** Displays the total of all the line items in the cart's currency */
export const TotalLineItemValue = () => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }
  return (
    <span className="rtc-total-line-item-value">{ctx.api.formatCurrency(ctx.cart.currencyCart.lineItemTotal)}</span>
  )
}
