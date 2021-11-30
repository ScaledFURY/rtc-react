import * as React from 'react'
import { RTCContext } from './rtc_context';

export const TotalSavingsPct = () => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart || !ctx.currencyFormatter) {
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
