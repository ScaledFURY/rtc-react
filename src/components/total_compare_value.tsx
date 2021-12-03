import * as React from 'react'
import { RTCContext } from './rtc_context';

/** Displays the total of all the compare prices in the cart's currency */
export const TotalCompareValue = () => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }

  const ts = ctx.cart.currencyCart.totalSavings();

  if (!ts.compareAtTotal) {
    return null;
  }

  return (
    <span className="rtc-total-compare-value">{ctx.api.formatCurrency(ts.compareAtTotal)}</span>
  )
}
