import * as React from 'react'
import { RTCContext } from './rtc_context';

export const TotalCompareValue = () => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart || !ctx.currencyFormatter) {
    return null;
  }

  const ts = ctx.cart.currencyCart.totalSavings();

  if (!ts.compareAtTotal) {
    return null;
  }

  return (
    <span className="rtc-total-compare-value">{ctx.currencyFormatter.format(ts.compareAtTotal)}</span>
  )
}
