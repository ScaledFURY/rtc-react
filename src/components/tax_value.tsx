import * as React from 'react'
import { RTCContext } from './rtc_context';

export const TaxValue = () => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }
  return (
    <span className="rtc-tax-value">{ctx.api.formatCurrency(ctx.cart.currencyCart.taxTotal)}</span>
  )
}
