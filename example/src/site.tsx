import React from 'react'

import { ExampleComponent } from 'rtc-react';

import { DebugComponent } from 'rtc-react';
//import config from 'react-global-configuration';
import 'rtc-react/dist/index.css'

export const Site = (props:any) => {
  return (
    <>
      <DebugComponent />
      <h1>test_component.tsx</h1>
      <ExampleComponent text={props.text} />
    </>
  );
}
