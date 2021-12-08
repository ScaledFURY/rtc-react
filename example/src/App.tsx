import React from 'react'
import { RTC } from 'rtc-react'
import { Site } from "./site";

const App = () => {

  const eh = async(e:any, rtcApi:any) => {
    console.log(`custom event handler received: ${e.eventType}`);
    rtcApi.normalizedTimestamp(); // keep TS compiler happy about otherwise unused rtcApi.
  };

  return (
    <RTC component={Site}
         nextUrl="https://www.whatever.com"
         apiEndpoint="api.burnerdomain.rtccart.io"
         eventHandler={eh}
    />
  );
}

export default App;
