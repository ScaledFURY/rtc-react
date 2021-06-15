import React from 'react'

import { ExampleComponent, configureRtc } from 'rtc-react'
import 'rtc-react/dist/index.css'


configureRtc({
    apiEndpoint: "api.burnerdomain.rtccart.io"
});

const App = () => {
  return <ExampleComponent text="Create React Library Example 😄" />
}

export default App
