import * as React from 'react'
import { RTCContext } from './rtc_context';

/** Properties for the IncreaseQuantityButton component */
export interface IIncreaseQuantityButtonProps {
  /** The variantId this control should effect */
  variantId: string;
  /** Text for the button */
  text: string;
  /** An optional id to apply to this button */
  id?: string;
  /** Optional className to apply to this button */
  className?: string;
  //** Optional maximum quantity this control will allow */
  max?: number;
}

/** A button that will increase the quantity of variant in the cart */
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
