import * as React from 'react'
import { RTCContext } from './rtc_context';

export interface IRemoveCouponButtonProps {
  text: string;
  id?: string;
  className?: string;
}

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
