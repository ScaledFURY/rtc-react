import React from 'react'
import { RTC } from 'rtc-react'
import { Site } from "./site";

const App = () => {
  return (
    <RTC component={Site}
         defaultVariantId="39507333480634"
         defaultAddons="39518515298490"
         nextUrl="https://www.whatever.com"
         apiEndpoint="api.burnerdomain.rtccart.io"
         landingPageName="LPN"
         upsellPageName="UPN"
         funnelName="FN"
         orderTag="OT"
         advertorialPageName="APN"
         trackStock={false}
         paypalConfirmUrl="http://www.whatever.com"
    />
  );
}

export default App;
