import React from 'react'

import { DebugComponent,
         CartDisplay,
         ToggleAddonButton,
         RemoveCouponButton,
         SetPrimaryVariantButton,
         AddCouponComponent,
         TotalLineItemValue,
         TotalCompareValue,
         TotalSavingsValue,
         TotalSavingsPct,
         SubtotalValue,
         TotalValue,
         ShippingValue,
         DiscountValue
       } from 'rtc-react';

export const Site = () => {
  return (
    <>
      <h3>Cart Display</h3>
      <CartDisplay />
      <hr/>
      <h3>Toggle Addon Buttons</h3>
      <ToggleAddonButton text="small addon" variantId="39518515298490" />
      <ToggleAddonButton text="medium addon" variantId="39518515331258" />
      <ToggleAddonButton text="large addon" variantId="39518515364026" />

      <hr/>
      <h3>Set Primary Variant Buttons</h3>
      <SetPrimaryVariantButton text="small widgets" variantId="39507333447866" />
      <SetPrimaryVariantButton text="medium widgets" variantId="39507333480634" />
      <SetPrimaryVariantButton text="large widgets" variantId="39507333513402" />
      <SetPrimaryVariantButton text="sub widgets" variantId="39518512808122" />
      <SetPrimaryVariantButton text="sub later widgets" variantId="39983260598458" />
      <SetPrimaryVariantButton text="bundle widgets" variantId="40194513993914" />

      <hr/>

      <h3>Add Coupon Component</h3>
      <AddCouponComponent text="Add coupon" />


      <hr/>

      <h3>Remove Coupon Button</h3>
      <RemoveCouponButton text="remove coupon" />

      <hr/>

      <h3>SubtotalValue</h3>
      <SubtotalValue />

      <h3>TotalValue</h3>
      <TotalValue />

      <h3>DiscountValue</h3>
      <DiscountValue />

      <h3>ShippingValue</h3>
      <ShippingValue />

      <h3>TotalLineItemValue</h3>
      <TotalLineItemValue />

      <h3>TotalCompareValue</h3>
      <TotalCompareValue />

      <h3>TotalSavingsValue</h3>
      <TotalSavingsValue />

      <h3>TotalSavingsPct</h3>
      <TotalSavingsPct />

      <h3>LineItems</h3>
      No demo for LineItems

      <h3>Debug View</h3>
      <DebugComponent />


    </>
  );
}
