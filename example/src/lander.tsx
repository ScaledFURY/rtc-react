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

export const Lander = (props:any) => {

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
      <DecreaseQuantityButton variantId="39507333513402" text="-" />
      <QuantityValue variantId="39507333513402" />
      <IncreaseQuantityButton variantId="39507333513402" text="+" />

      <hr />

      <h3>ToggleAddonButton</h3>
      <ToggleAddonButton text="small addon" variantId="39518515298490" />
      <ToggleAddonButton text="medium addon" variantId="39518515331258" />
      <ToggleAddonButton text="large addon" variantId="39518515364026" />

      <hr/>
      <h3>SetPrimaryVariantButton</h3>
      <SetPrimaryVariantButton text="small widgets" variantId="39507333447866" />
      <SetPrimaryVariantButton text="medium widgets" variantId="39507333480634" />
      <SetPrimaryVariantButton text="large widgets" variantId="39507333513402" />
      <SetPrimaryVariantButton text="sub widgets" variantId="39518512808122" />
      <SetPrimaryVariantButton text="sub later widgets" variantId="39983260598458" />
      <SetPrimaryVariantButton text="bundle widgets" variantId="40194513993914" />

      <hr/>

      <h3>AddCouponComponent</h3>
      <AddCouponComponent text="Add coupon" />


      <hr/>

      <h3>QuantitySelector</h3>
      <QuantitySelector variantId="39518515331258" max={10} />

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
