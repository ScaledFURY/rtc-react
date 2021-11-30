import * as React from 'react'
import { RTCContext } from './rtc_context';

interface IProps {
  variantId: string;
  text: string;
  id?: string;
  className?: string;
}

export const SetPrimaryVariantButton = (props:IProps) => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart || !ctx.currencyFormatter) {
    return null;
  }

  let className = `rtc-select-primary-variant ${props.className || ""}`;

  if (ctx.publicApi.hasVariant(props.variantId)) {
    className += " rtc-selected-primary-variant";
  }

  const handler = async () => {
    ctx.publicApi.setPrimaryVariant(props.variantId);
  };

  return (
    <button className={className} onClick={handler} id={props.id}>{props.text}</button>
  )
}
