import * as React from 'react'
import { RTCContext } from './rtc_context';

/** Properties for the line item component */
export interface ILineItemsProps {
  /** A React component that should be used to render the line items.  */
  component: Function;
}

//{"variantId":"40194513993914","title":"the big bundle","subtitle":"the big bundle","price":"CA$169.00","quantity":1,"shippingRatePerItem":"CA$0.00","discountable":true,"compareAtPrice":null,"productImage":"https://cdn.shopify.com/s/files/1/0533/1979/4874/products/cat.jpg?v=1628176645"}
export interface IFormattedLineItem {
  variantId: string;
  title: string;
  subtitle: string;
  price: any;
  quantity: any;
  shippingRatePerItem: string;
  discountable: boolean;
  compareAtPrice: any;
  productImage: string;
  totalPrice: any;
  totalCompareAtPrice: any;
  totalShipping: any;
}

/**
  Renders a list of line items currently in the cart.
  The component passed will be used to render each line item.
  The Component will be passed properties from @IFormattedLineItem
*/
export const LineItems = (props:ILineItemsProps) => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }

  const Component = props.component;
  return ctx.cart.currencyCart.lineItems.map((li:any) => {
    const formattedLi : IFormattedLineItem = Object.assign({}, li);
    if (formattedLi.price) {
      formattedLi.totalPrice = parseFloat(formattedLi.price) * formattedLi.quantity;
    } else {
      formattedLi.totalPrice = null;
    }
    if (formattedLi.compareAtPrice) {
      formattedLi.totalCompareAtPrice = parseFloat(formattedLi.compareAtPrice) * formattedLi.quantity;
    } else {
      formattedLi.totalCompareAtPrice = null;
    }

    if (formattedLi.shippingRatePerItem) {
      formattedLi.totalShipping = parseFloat(formattedLi.shippingRatePerItem) * formattedLi.quantity;
    } else {
      formattedLi.totalShipping = null;
    }

    [ "price", "compareAtPrice", "totalPrice","totalCompareAtPrice", "shippingRatePerItem", "totalShipping"].forEach(x => {
      if (formattedLi[x] !== null) {
        formattedLi[x] = ctx.api.formatCurrency(parseFloat(formattedLi[x]));
      }
    });

    return ( <Component key={li.variantId} lineItem={formattedLi} /> );

  });

}
