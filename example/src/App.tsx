import React from 'react'

import { configureRtc, RTCContext } from 'rtc-react'
import 'rtc-react/dist/index.css'
import { TestComponent } from "./test_component";

configureRtc({
    apiEndpoint: "api.burnerdomain.rtccart.io"
});

const App = () => {

  const [ value, setValue ] = React.useState({
    stuff: "BLARG"
  });


  console.log(setValue);

  return (
    <RTCContext.Provider value={{updateStateFn: setValue, ...value}}>
      <TestComponent text="Create React Library Example 😄" />
    </RTCContext.Provider>

  )

}

export default App
