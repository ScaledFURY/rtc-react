import React from 'react'
import { RTC } from 'rtc-react'
import { Site } from "./site";

const App = () => {
  return (
    <RTC component={Site} nextUrl="https://www.google.com" apiEndpoint="api.burnerdomain.rtccart.io" />
  );
}

export default App;
