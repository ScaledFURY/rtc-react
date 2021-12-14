import * as React from "react";
import { CartDisplay } from "rtc-react";


export function Receipt(props:any) {
  React.useEffect(() => {
    props.rtcApi.firePageView({});
    if (!props.rtcApi.cartLoaded()) {
      props.rtcApi.loadCart({});
    }
  }, [ props.rtcApi ]);

  return (
    <>
    <h1>Thanks!</h1>
    <CartDisplay />
    </>
  )

}
