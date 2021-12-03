import * as React from 'react'
import { RTCContext } from './rtc_context';

/** Properties for the DecreaseQuantityButton component */
export interface IDecreaseQuantityButtonProps {
  /** The variantId this control should effect */
  variantId: string;
  /** Text for the button */
  text: string;
  /** An optional id to apply to this button */
  id?: string;
  /** Optional className to apply to this button */
  className?: string;
  /** Optional minimum quantity this control will allow */
  min?: number;
}

/** A button that will decrease the quantity of variant in the cart */
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
    <button className={`rtc-decrease-quantity ${props.className || ""}`} onClick={handler}>{props.text}</button>
  )
}
