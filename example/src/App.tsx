import React from 'react'
import { RTC } from 'rtc-react'
import { Site } from "./site";

const App = () => {
  return (
    <RTC component={Site}
         defaultVariantId="40194513993914"
         defaultAddons="39507333447866"
         nextUrl="https://www.google.com"
         apiEndpoint="api.burnerdomain.rtccart.io"
         landingPageName="LPN"
         upsellPageName="UPN"
         funnelName="FN"
         orderTag="OT"
         advertorialPageName="APN"
         trackStock={false}
         paypalConfirmUrl="http://www.bing.com"

    />
  );
}

export default App;
