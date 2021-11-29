import React from 'react'
import { RTC } from 'rtc-react'
import { Site } from "./site";

const App = () => {
  return (
    <RTC component={Site} apiEndpoint="api.burnerdomain.rtccart.io" />
  );
}

export default App;
