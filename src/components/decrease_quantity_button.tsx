import * as React from 'react'
import { RTCContext } from './rtc_context';


interface IDecreaseQuantityButtonProps {
  variantId: string;
  text: string;
  id?: string;
  className?: string;
  min?: number;
}

export const DecreaseQuantityButton = (props:IDecreaseQuantityButtonProps) => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }

  const handler = () => {
    const curQty : number = ctx.api.getVariantQuantity(props.variantId);
    const newQty = Math.max(curQty - 1, props.min || 0);
    if (curQty != newQty) {
      ctx.api.setVariantQuantities({ [props.variantId]: newQty });
    }
  };

  return (
    <button className="rtc-decrease-quantity" onClick={handler}>{props.text}</button>
  )
}
