import React from 'react'
import { RTC } from 'rtc-react'
import { Site } from "./site";

const App = () => {

  const eh = async(e:any, rtcApi:any) => {
    console.log("Hi from custom event handler");
    console.log(e);
    console.log(rtcApi);
  };

  return (
    <RTC component={Site}
         defaultVariantId="40194513993914"
         defaultAddons="39518515298490"
         forceVariantId="39507333480634"
         nextUrl="https://www.whatever.com"
         apiEndpoint="api.burnerdomain.rtccart.io"
         landingPageName="LPN"
         upsellPageName="UPN"
         funnelName="FN"
         orderTag="OT"
         advertorialPageName="APN"
         trackStock={false}
         paypalConfirmUrl="http://www.whatever.com"
         eventHandler={eh}
    />
  );
}

export default App;
