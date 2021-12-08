import React from 'react'
import { RTC, CartDisplay } from 'rtc-react'

const Site : any = (props:any) => {
  React.useEffect(() => {
      props.rtcApi.loadCart({
        defaultVariantId: "40194513993914",
        defaultAddons: "39518515298490"
      });

  }, [ props.rtcApi]);

  return (
    <CartDisplay />
  );

}

const App = () => {

  const eventHandler = async(e:any) => {
    console.log(`custom event handler received: ${e.eventType}`);
  };

  return (
    <RTC component={Site}
         nextUrl="https://www.whatever.com"
         apiEndpoint="api.burnerdomain.rtccart.io"
         eventHandler={eventHandler}
    />
  );
}

export default App;
