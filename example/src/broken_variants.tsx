import React from 'react'
import { Link } from "react-router-dom";

import { CartDisplay,
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
         VariantTitle,
         QuantityValue,
         IncreaseQuantityButton,
         DecreaseQuantityButton,
         QuantitySelector
       } from 'rtc-react';

export const BrokenVariants = (props:any) => {

  React.useEffect(() => {
    props.rtcApi.firePageView({
      pageType: "lander",
      landingPageName: "example"
    });
    if (!props.rtcApi.cartLoaded()) {
      props.rtcApi.loadCart({
        landingPageName: "example",
        defaultVariantId:"40194513993914",
        defaultAddons:"39518515298490",
        urlCoupon: "STEPHEN"
      });
    }
  }, [ props.rtcApi ]);

  return (
    <>
      <Link to="/checkout">Checkout Page!</Link>

      <h3>Cart Display</h3>
      <CartDisplay />
      <hr/>

      <h3>CartQuantityValue (39507333513402) (And DecreaseQuantityButton, IncreaseQuantityButton)</h3>
      <DecreaseQuantityButton variantId="NOEXIST" text="-" />
      <QuantityValue variantId="NOEXIST" />
      <IncreaseQuantityButton variantId="NOEXIST" text="+" />

      <hr />

      <h3>ToggleAddonButton</h3>
      <ToggleAddonButton text="small addon" variantId="NOEXIST" />
      <ToggleAddonButton text="medium addon" variantId="NOEXIST" />
      <ToggleAddonButton text="large addon" variantId="NOEXIST" />

      <hr/>
      <h3>SetPrimaryVariantButton</h3>
      <SetPrimaryVariantButton text="small widgets" variantId="NOEXIST" />
      <SetPrimaryVariantButton text="medium widgets" variantId="NOEXIST" />
      <SetPrimaryVariantButton text="large widgets" variantId="NOEXIST" />
      <SetPrimaryVariantButton text="sub widgets" variantId="NOEXIST" />
      <SetPrimaryVariantButton text="sub later widgets" variantId="NOEXIST" />
      <SetPrimaryVariantButton text="bundle widgets" variantId="NOEXIST" />

      <hr/>

      <h3>AddCouponComponent</h3>
      <AddCouponComponent text="Add coupon" />


      <hr/>

      <h3>QuantitySelector</h3>
      <QuantitySelector variantId="NOEXIST" max={10} />

      <h3>RemoveCouponButton</h3>
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

      <hr/>
      <div className="variant-data-demo">
        <div>
          <h3>VariantComparePriceSavingsPct</h3>
          <VariantComparePriceSavingsPct variantId="NOEXIST" />

          <h3>VariantComparePriceSavings</h3>
          <VariantComparePriceSavings variantId="NOEXIST" />

          <h3>VariantComparePrice</h3>
          <VariantComparePrice variantId="NOEXIST" />

          <h3>VariantDisplayName</h3>
          <VariantDisplayName variantId="NOEXIST" />

          <h3>VariantImage</h3>
          <VariantImage variantId="NOEXIST" />

          <h3>VariantPrice</h3>
          <VariantPrice variantId="NOEXIST" />

          <h3>VariantPropductTitle</h3>
          <VariantPropductTitle variantId="NOEXIST" />

          <h3>VariantTitle</h3>
          <VariantTitle variantId="NOEXIST" />
        </div>
        <div>
          <h3>VariantComparePriceSavingsPct</h3>
          <VariantComparePriceSavingsPct variantId="NOEXIST" />

          <h3>VariantComparePriceSavings</h3>
          <VariantComparePriceSavings variantId="NOEXIST" />

          <h3>VariantComparePrice</h3>
          <VariantComparePrice variantId="NOEXIST" />

          <h3>VariantDisplayName</h3>
          <VariantDisplayName variantId="NOEXIST" />

          <h3>VariantImage</h3>
          <VariantImage variantId="NOEXIST" />

          <h3>VariantPrice</h3>
          <VariantPrice variantId="NOEXIST" />

          <h3>VariantPropductTitle</h3>
          <VariantPropductTitle variantId="NOEXIST" />

          <h3>VariantTitle</h3>
          <VariantTitle variantId="NOEXIST" />
        </div>

        <div>
          <h3>VariantComparePriceSavingsPct</h3>
          <VariantComparePriceSavingsPct variantId="NOEXIST" />

          <h3>VariantComparePriceSavings</h3>
          <VariantComparePriceSavings variantId="NOEXIST" />

          <h3>VariantComparePrice</h3>
          <VariantComparePrice variantId="NOEXIST" />

          <h3>VariantDisplayName</h3>
          <VariantDisplayName variantId="NOEXIST" />

          <h3>VariantImage</h3>
          <VariantImage variantId="NOEXIST" />

          <h3>VariantPrice</h3>
          <VariantPrice variantId="NOEXIST" />

          <h3>VariantPropductTitle</h3>
          <VariantPropductTitle variantId="NOEXIST" />

          <h3>VariantTitle</h3>
          <VariantTitle variantId="NOEXIST" />
        </div>


      </div>


    </>
  );
}
