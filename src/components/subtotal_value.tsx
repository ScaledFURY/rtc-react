import * as React from 'react'
import { RTCContext } from './rtc_context';

export const SubtotalValue = () => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart || !ctx.currencyFormatter) {
    return null;
  }
  return (
    <span className="rtc-subtotal-value">{ctx.currencyFormatter.format(ctx.cart.currencyCart.subTotal)}</span>
  )
}
