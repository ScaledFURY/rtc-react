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
         DiscountValue,
         VariantComparePriceSavingsPct,
         VariantComparePriceSavings,
         VariantComparePrice,
         VariantDisplayName,
         VariantImage,
         VariantPrice,
         VariantPropductTitle,
         VariantTitle
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

      <hr />
      <h3>Debug View</h3>
      <DebugComponent />

      <hr/>
      <div className="variant-data-demo">
        <div>
          <h3>VariantComparePriceSavingsPct</h3>
          <VariantComparePriceSavingsPct variantId="39507333447866" />

          <h3>VariantComparePriceSavings</h3>
          <VariantComparePriceSavings variantId="39507333447866" />

          <h3>VariantComparePrice</h3>
          <VariantComparePrice variantId="39507333447866" />

          <h3>VariantDisplayName</h3>
          <VariantDisplayName variantId="39507333447866" />

          <h3>VariantImage</h3>
          <VariantImage variantId="39507333447866" />

          <h3>VariantPrice</h3>
          <VariantPrice variantId="39507333447866" />

          <h3>VariantPropductTitle</h3>
          <VariantPropductTitle variantId="39507333447866" />

          <h3>VariantTitle</h3>
          <VariantTitle variantId="39507333447866" />
        </div>
        <div>
          <h3>VariantComparePriceSavingsPct</h3>
          <VariantComparePriceSavingsPct variantId="39518515298490" />

          <h3>VariantComparePriceSavings</h3>
          <VariantComparePriceSavings variantId="39518515298490" />

          <h3>VariantComparePrice</h3>
          <VariantComparePrice variantId="39518515298490" />

          <h3>VariantDisplayName</h3>
          <VariantDisplayName variantId="39518515298490" />

          <h3>VariantImage</h3>
          <VariantImage variantId="39518515298490" />

          <h3>VariantPrice</h3>
          <VariantPrice variantId="39518515298490" />

          <h3>VariantPropductTitle</h3>
          <VariantPropductTitle variantId="39518515298490" />

          <h3>VariantTitle</h3>
          <VariantTitle variantId="39518515298490" />
        </div>

        <div>
          <h3>VariantComparePriceSavingsPct</h3>
          <VariantComparePriceSavingsPct variantId="39518512808122" />

          <h3>VariantComparePriceSavings</h3>
          <VariantComparePriceSavings variantId="39518512808122" />

          <h3>VariantComparePrice</h3>
          <VariantComparePrice variantId="39518512808122" />

          <h3>VariantDisplayName</h3>
          <VariantDisplayName variantId="39518512808122" />

          <h3>VariantImage</h3>
          <VariantImage variantId="39518512808122" />

          <h3>VariantPrice</h3>
          <VariantPrice variantId="39518512808122" />

          <h3>VariantPropductTitle</h3>
          <VariantPropductTitle variantId="39518512808122" />

          <h3>VariantTitle</h3>
          <VariantTitle variantId="39518512808122" />
        </div>


      </div>


    </>
  );
}
