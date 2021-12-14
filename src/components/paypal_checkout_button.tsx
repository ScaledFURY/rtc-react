import * as React from 'react'
import { RTCContext } from './rtc_context';

/** Properties for the PaypalCheckoutButton component */
export interface IPaypalCheckoutButtonProps {
  /** The location the user should be redirected to after coming back from paypal */
  nextUrl: string;
  /** Text for the button */
  text: string;
  /** An optional id to apply to this button */
  id?: string;
  /** Optional className to apply to this button */
  className?: string;
}

/** Provides a button which redirects the user to Paypal */
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
