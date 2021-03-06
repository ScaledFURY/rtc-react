import React from 'react'
import { RTCContext } from './rtc_context';
import { SubtotalValue } from "./subtotal_value";
import { TotalValue } from "./total_value";
import { TaxValue } from "./tax_value";
import { ShippingValue } from "./shipping_value";
import { DiscountValue } from "./discount_value";
import { LineItems } from "./line_items";

/*
  {
    "variantId": "39507333447866",
    "title": "small",
    "subtitle": "small",
    "price": "CA$13.00",
    "quantity": 1,
    "shippingRatePerItem": "CA$2.56",
    "discountable": true,
    "compareAtPrice": "CA$26.00",
    "productImage": "https://cdn.shopify.com/s/files/1/0533/1979/4874/products/randombox.png?v=1618435551",
    "totalPrice": "CA$13.00",
    "totalCompareAtPrice": "CA$26.00",
    "totalShipping": "CA$2.56"
  }
*/

const LineItem = (props:any) => {
  return (
    <tr>
      <td>
        {!props.lineItem.productImage ? null : (<img height="100" src={props.lineItem.productImage} title={props.lineItem.title} />)}</td>
      <td>{props.lineItem.quantity}x {props.lineItem.title} {props.lineItem.subtitle}</td>
      <td>
        <s>{props.lineItem.totalCompareAtPrice}</s><br/>
        {props.lineItem.totalPrice}
      </td>

    </tr>
  )
  return JSON.stringify(props.lineItem);
};

/** A generic component for showing the current cart.<br>
    You are also free to implmement your own cart display using:<br>
    LineItems, SubtotalValue, ShippingValue, DiscountValue, TaxValue, TotalValue, etc.<br>
 */
export function CartDisplay() {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }
  return (
      <table className="rtc-cart-display">
        <tbody>
          <LineItems component={LineItem} />
          <tr><th colSpan={2}>Subtotal</th><td><SubtotalValue /></td></tr>
          <tr><th colSpan={2}>Shipping</th><td><ShippingValue /></td></tr>
          <tr><th colSpan={2}>Discount</th><td><DiscountValue /></td></tr>
          <tr><th colSpan={2}>Tax</th><td><TaxValue /></td></tr>
          <tr><th colSpan={2}>Total</th><td><TotalValue /></td></tr>
        </tbody>
      </table>
  );
}
