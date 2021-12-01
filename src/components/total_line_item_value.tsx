import * as React from 'react'
import { RTCContext } from './rtc_context';

export const TotalLineItemValue = () => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }
  return (
    <span className="rtc-total-line-item-value">{ctx.publicApi.formatCurrency(ctx.cart.currencyCart.lineItemTotal)}</span>
  )
}
