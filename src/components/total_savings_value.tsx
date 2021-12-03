import * as React from 'react'
import { RTCContext } from './rtc_context';

/** Displays the difference between the line item total and the compare price total in the cart's currency */
export const TotalSavingsValue = () => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }

  const ts = ctx.cart.currencyCart.totalSavings();

  if (!ts.totalSavings) {
    return null;
  }

  return (
    <span className="rtc-total-savings-value">{ctx.api.formatCurrency(ts.totalSavings)}</span>
  )
}
