import * as React from 'react'
import { RTCContext } from './rtc_context';

/** Properties for the SetPrimaryVariantButton component */
export interface ISetPrimaryVariantButtonProps {
  /** The variantId this control will set as primary */
  variantId: string;
  /** Text for the button */
  text: string;
  /** An optional id to apply to this button */
  id?: string;
  /** Optional className to apply to this button */
  className?: string;
}

/** Provides a button which allows the user to select a new variant as the primary variant */
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
