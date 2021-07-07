import React from 'react'

import { ExampleComponent, RTCContext } from 'rtc-react';
//import config from 'react-global-configuration';
import 'rtc-react/dist/index.css'

export const TestComponent = (props:any) => {

  const val : any = React.useContext(RTCContext);

  React.useEffect(()=> {
    setInterval(()=> {
      val.updateStateFn({ stuff: +new Date()})
    }, 1000);

  }, []);


  return (
    <>
      <ExampleComponent text={props.text} />
      {JSON.stringify(val)}

    </>
  )

}
