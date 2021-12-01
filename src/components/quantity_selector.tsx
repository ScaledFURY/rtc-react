import * as React from 'react'
import { RTCContext } from './rtc_context';


interface IProps {
  variantId: string;
  id?: string;
  className?: string;
  max: number;
}

export const QuantitySelector = (props:IProps) => {
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
    <select className={`rtc-quantity-selector`} value={curQty} id={props.id} onChange={handler}>
      {options}
    </select>

  )
}
