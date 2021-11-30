import React from 'react'

import { DebugComponent, CartDisplay, ToggleAddonButton } from 'rtc-react';

export const Site = () => {
  return (
    <>
      <h3>Cart Dispaly</h3>
      <CartDisplay />
      <hr/>
      <h3>Toggle Addon Buttons</h3>
      <ToggleAddonButton text="small addon" variantId="39518515298490" />
      <ToggleAddonButton text="medium addon" variantId="39518515331258" />
      <ToggleAddonButton text="large addon" variantId="39518515364026" />
      <hr/>
      <h3>Debug View</h3>
      <DebugComponent />
    </>
  );
}
