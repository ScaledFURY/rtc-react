import * as React from 'react'
import { RTCContext } from './rtc_context';

interface IProps {
  variantId: string;
  text: string;
  id?: string;
  className?: string;
}

export const ToggleAddonButton = (props:IProps) => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart || !ctx.currencyFormatter) {
    return null;
  }

  let className = `rtc-toggle-addon ${props.className}`;

  if (ctx.publicApi.hasVariant(props.variantId)) {
    className += " rtc-addon-enabled";
  }

  const handler = async () => {
    ctx.publicApi.toggleAddon(props.variantId);
  };

  return (
    <button className={className} onClick={handler} id={props.id}>{props.text}</button>
  )
}
