import * as React from 'react'
import { RTCContext } from './rtc_context';


/** Properties for the QuantitySelector component */
export interface IQuantitySelectorProps {
  /** The variantId this control should effect */
  variantId: string;
  id?: string;
  className?: string;
  max: number;
}

/** Creates a &lt;select&gt; element allowing the user to select a quantity for an item */
export function QuantitySelector(props:IQuantitySelectorProps) {
  const ctx : any = React.useContext(RTCContext);
  const [ curQty, setCurQty ] = React.useState(ctx.api.getVariantQuantity(props.variantId) || 0);

  if (!ctx.cart || curQty == null) {
    return null;
  }

  const handler = (e:any) => {
    setCurQty(e.target.value);
    ctx.api.setVariantQuantities({
      [props.variantId]: e.target.value
    });
  };

  const options = [];
  for (let i = 0; i <= props.max; i++) {
    options.push((<option key={`${props.variantId}:${i}`} value={i}>{i}</option>));
  }


  return (
    <select className={`rtc-quantity-selector ${props.className || ""}`} value={curQty} id={props.id} onChange={handler}>
      {options}
    </select>

  )
}
