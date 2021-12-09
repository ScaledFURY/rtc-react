import React from 'react'
import { Link } from "react-router-dom";
import { CartDisplay } from "rtc-react";

export function Checkout(props:any) {

  React.useEffect(() => {
    props.rtcApi.firePageView({
      pageType: "lander",
      landingPageName: "example",
      isCheckoutPage: true
    });
    props.rtcApi.loadCart({
      landingPageName: "example",
      defaultVariantId:"40194513993914",
      defaultAddons:"39518515298490",
      urlCoupon: "STEPHEN"
    });
  }, [ props.rtcApi ]);

  return (
    <>
    <Link to="/">Back to Lander</Link>
    <CartDisplay />
    <h1>Hello!</h1>
    </>
  )
}
