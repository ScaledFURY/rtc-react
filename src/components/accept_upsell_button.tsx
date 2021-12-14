import * as React from "react";
import { RTCContext } from './rtc_context';

interface IAcceptUpsellButtonProps {
  callback: Function;
  variantId: string;
  text: string;
  id?:string;
  className?: string;
}

export function AcceptUpsellButton(props:IAcceptUpsellButtonProps) {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }

  const handler = async () => {
    await ctx.api.acceptUpsell({
      upsellType: "add-variant",
      upsellParam1: props.variantId
    });
    props.callback();
  }

  return (<button onClick={handler} className={`rtc-accept-upsell-button ${props.className || ""}`}>{props.text}</button>);
}
