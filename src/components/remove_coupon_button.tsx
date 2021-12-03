import * as React from 'react'
import { RTCContext } from './rtc_context';

/** Properties for the RemoveCouponButton component */
export interface IRemoveCouponButtonProps {
  /** Text for the button */
  text: string;
  /** An optional id to apply to this button */
  id?: string;
  /** Optional className to apply to this button */
  className?: string;
}

/** Creates a button which allows the user to remove an applied coupon */
export const RemoveCouponButton = (props:IRemoveCouponButtonProps) => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }

  if (!ctx.cart.couponCode) {
    return null;
  }

  let className = `rtc-remove-coupon ${props.className || ""}`;

  const handler = async () => {
    ctx.api.removeCoupon();
  };

  return (
    <button className={className} onClick={handler} id={props.id}>{props.text}</button>
  )
}
