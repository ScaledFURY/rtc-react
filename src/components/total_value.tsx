import * as React from 'react'
import { RTCContext } from './rtc_context';

export const TotalValue = () => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }
  return (
    <span className="rtc-total-value">{ctx.publicApi.formatCurrency(ctx.cart.currencyCart.total)}</span>
  )
}
