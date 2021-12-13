import * as React from 'react'
import { RTCContext } from './rtc_context';

/** Properties for the SetPrimaryVariantButton component */
export interface IPaypalCheckoutButtonProps {
  /** The variantId this control will set as primary */
  nextUrl: string;
  /** Text for the button */
  text: string;
  /** An optional id to apply to this button */
  id?: string;
  /** Optional className to apply to this button */
  className?: string;
}

/** Provides a button which allows the user to select a new variant as the primary variant */
export function PaypalCheckoutButton(props:IPaypalCheckoutButtonProps) {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }
  let className = `rtc-paypal-checkout-button ${props.className || ""}`;


  const handler = async () => {
    ctx.api.redirectToPaypal(props.nextUrl);
  };

  return (
    <button className={className} onClick={handler} id={props.id}>{props.text}</button>
  )
}
