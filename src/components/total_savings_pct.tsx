import * as React from 'react'
import { RTCContext } from './rtc_context';

/** Displays the total savings between the compare price and the actual price.  Does not include % symbol */
export function TotalSavingsPct() {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }

  const ts = ctx.cart.currencyCart.totalSavings();

  if (!ts.totalSavingsPct) {
    return null;
  }

  return (
    <span className="rtc-total-savings-pct">{ts.totalSavingsPct}</span>
  )
}
