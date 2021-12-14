import * as React from "react";
import { AcceptUpsellButton } from "rtc-react";
import { useNavigate } from "react-router-dom";

export function Upsell1(props:any) {
  const navigate = useNavigate();
  console.log("Rendering accept upsell button");
  React.useEffect(() => {
    props.rtcApi.firePageView({
      pageType: "lander",
      landingPageName: "example"
    });
    if (!props.rtcApi.cartLoaded()) {
      props.rtcApi.loadCart({
        landingPageName: "example",
        defaultVariantId:"40194513993914",
        defaultAddons:"39518515298490",
        urlCoupon: "STEPHEN"
      });
    }
  }, [ props.rtcApi ]);

  const afterAccepted = () => {
    navigate("/receipt");

  }

  return (
    <AcceptUpsellButton text="Accept Upsell" variantId="40463250653370" callback={afterAccepted} />
  )
}
