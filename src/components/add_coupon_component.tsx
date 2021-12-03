import * as React from 'react'
import { RTCContext } from './rtc_context';

/** this is an interface typedoc! */
export interface IAddCouponComponentProps {
  /** Blarg */
  text: string;
  id?: string;
  className?: string;
}

/** Creates a textfield/button combo to add coupons */
export const AddCouponComponent = (props:IAddCouponComponentProps) => {
  const ctx : any = React.useContext(RTCContext);
  let [ couponCode, setCouponCode ] = React.useState("");

  if (!ctx.cart) {
    return null;
  }

  if (typeof(ctx.cart.couponCode) === 'string' && ctx.cart.couponCode.length > 0) {
    return null;
  }

  const btnHandler = async () => {
    await ctx.api.applyCoupon(couponCode);
    setCouponCode("");
  };

  const keyupHandler = (e:any) => {
    if (e.keyCode === 13) {
      btnHandler();
    }
  }

  return (
    <div id={props.id} className={`rtc-add-coupon-component ${props.className || ""}`}>
      <input type="text" value={couponCode} onKeyUp={keyupHandler} onChange={(e) => setCouponCode(e.target.value)} />
      <button onClick={btnHandler}>{props.text}</button>
    </div>
  )
}
