import React from 'react'

import { DebugComponent, CartDisplay, ToggleAddonButton } from 'rtc-react';

export const Site = () => {
  return (
    <>
      <CartDisplay />
      <ToggleAddonButton text="small addon" variantId="39518515298490" />
      <ToggleAddonButton text="medium addon" variantId="39518515331258" />
      <ToggleAddonButton text="large addon" variantId="39518515364026" />
      <DebugComponent />
    </>
  );
}
