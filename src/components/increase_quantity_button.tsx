import * as React from 'react'
import { RTCContext } from './rtc_context';


export interface IIncreaseQuantityButtonProps {
  variantId: string;
  text: string;
  id?: string;
  className?: string;
  max?: number;
}

export const IncreaseQuantityButton = (props:IIncreaseQuantityButtonProps) => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }

  const handler = () => {
    const curQty : number = ctx.api.getVariantQuantity(props.variantId);
    const newQty = Math.min(curQty + 1, props.max || 99999);
    if (curQty != newQty) {
      ctx.api.setVariantQuantities({ [props.variantId]: newQty });
    }
  };


  return (
    <button className="rtc-increase-quantity" onClick={handler}>{props.text}</button>
  )
}
