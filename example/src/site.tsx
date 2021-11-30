import React from 'react'

import { CartDisplay } from "./cart_display";
import { DebugComponent } from 'rtc-react';

export const Site = () => {
  return (
    <>
      <CartDisplay />
      <DebugComponent />
    </>
  );
}
