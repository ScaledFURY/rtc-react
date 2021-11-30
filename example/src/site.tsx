import React from 'react'

import { DebugComponent, SubtotalValue } from 'rtc-react';
//import config from 'react-global-configuration';
import 'rtc-react/dist/index.css'

export const Site = () => {
  return (
    <>
      <SubtotalValue />
      <DebugComponent />
    </>
  );
}
