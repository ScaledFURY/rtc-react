import * as React from 'react'
import { RTCContext } from './rtc_context';

export const TotalLineItemValue = () => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart || !ctx.currencyFormatter) {
    return null;
  }
  return (
    <span className="rtc-total-line-item-value">{ctx.currencyFormatter.format(ctx.cart.currencyCart.lineItemTotal)}</span>
  )
}
