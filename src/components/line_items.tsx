import * as React from 'react'
import { RTCContext } from './rtc_context';

interface IProps {
  component: Function;
}

//{"variantId":"40194513993914","title":"the big bundle","subtitle":"the big bundle","price":"CA$169.00","quantity":1,"shippingRatePerItem":"CA$0.00","discountable":true,"compareAtPrice":null,"productImage":"https://cdn.shopify.com/s/files/1/0533/1979/4874/products/cat.jpg?v=1628176645"}
interface IFormattedLineItem {
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

export const LineItems = (props:IProps) => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart || !ctx.currencyFormatter || !ctx.cart.currencyCart || !ctx.cart.currencyCart.lineItems) {
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
      console.log(formattedLi.compareAtPrice);
      formattedLi.totalCompareAtPrice = parseFloat(formattedLi.compareAtPrice) * formattedLi.quantity;
    } else {
      formattedLi.totalCompareAtPrice = null;
    }

    if (formattedLi.shippingRatePerItem) {
      formattedLi.totalShipping = parseFloat(formattedLi.shippingRatePerItem) * formattedLi.quantity;
    }

    [ "price", "compareAtPrice", "totalPrice","totalCompareAtPrice", "shippingRatePerItem", "totalShipping"].forEach(x => {
      if (formattedLi[x] !== null) {
        formattedLi[x] = ctx.currencyFormatter.format(parseFloat(formattedLi[x]));
      }
    });
    console.log(JSON.stringify(formattedLi, null, 4));

    return ( <Component key={li.variantId} lineItem={formattedLi} /> );

  });

}
