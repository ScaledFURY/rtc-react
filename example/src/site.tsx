import React from 'react'

import { DebugComponent, SubtotalValue, TotalValue, TaxValue, ShippingValue, DiscountValue } from 'rtc-react';
import 'rtc-react/dist/index.css'

export const Site = () => {
  return (
    <>
      <table>
      <tr><th>Subtotal</th><td><SubtotalValue /></td></tr>
      <tr><th>Shipping</th><td><ShippingValue /></td></tr>
      <tr><th>Discount</th><td><DiscountValue /></td></tr>
      <tr><th>Tax</th><td><TaxValue /></td></tr>
      <tr><th>Total</th><td><TotalValue /></td></tr>
      </table>
      <DebugComponent />
    </>
  );
}
