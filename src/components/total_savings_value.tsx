import * as React from 'react'
import { RTCContext } from './rtc_context';

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
    <span className="rtc-total-savings-value">{ctx.publicApi.formatCurrency(ts.totalSavings)}</span>
  )
}
