import * as React from 'react'
import { RTCContext } from './rtc_context';

interface IProps {
  variantId: string;
}

export const VariantTitle = (props:IProps) => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }
  const variantData = ctx.api.getVariantData(props.variantId);
  if (!variantData) {
    return null;
  }
  return (
    <span className="rtc-variant-title">{variantData.variantTitle}</span>
  )
}
