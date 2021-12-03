import * as React from 'react'
import { RTCContext } from './rtc_context';

export interface IToggleAddonButtonProps {
  variantId: string;
  text: string;
  id?: string;
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
