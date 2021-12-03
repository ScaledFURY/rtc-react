import * as React from 'react'
import { RTCContext } from './rtc_context';

/** Properties for the ToggleAddonButton component */
export interface IToggleAddonButtonProps {
  /** The variantId this control should toggle */
  variantId: string;
  /** Text for the button */
  text: string;
  /** An optional id to apply to this button */
  id?: string;
  /** Optional className to apply to this button */
  className?: string;
}

export const ToggleAddonButton = (props:IToggleAddonButtonProps) => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }

  let className = `rtc-toggle-addon ${props.className}`;

  if (ctx.api.hasVariant(props.variantId)) {
    className += " rtc-addon-enabled";
  }

  const handler = async () => {
    ctx.api.toggleAddon(props.variantId);
  };

  return (
    <button className={className} onClick={handler} id={props.id}>{props.text}</button>
  )
}
