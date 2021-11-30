import React from 'react'

import { CartDisplay } from "./cart_display";
import { DebugComponent } from 'rtc-react';
import 'rtc-react/dist/index.css'

export const Site = () => {
  return (
    <>
      <CartDisplay />
      <DebugComponent />
    </>
  );
}
