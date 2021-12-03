import * as React from 'react'
import { RTCContext } from './rtc_context';

export interface ISetPrimaryVariantButtonProps {
  variantId: string;
  text: string;
  id?: string;
  className?: string;
}

export const SetPrimaryVariantButton = (props:ISetPrimaryVariantButtonProps) => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }
  let className = `rtc-select-primary-variant ${props.className || ""}`;

  if (ctx.api.hasVariant(props.variantId)) {
    className += " rtc-selected-primary-variant";
  }

  const handler = async () => {
    ctx.api.setPrimaryVariant(props.variantId);
  };

  return (
    <button className={className} onClick={handler} id={props.id}>{props.text}</button>
  )
}
