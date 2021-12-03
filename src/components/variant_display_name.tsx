import * as React from 'react'
import { RTCContext } from './rtc_context';

export interface IVariantDisplayNameProps {
  variantId: string;
}

export const VariantDisplayName = (props:IVariantDisplayNameProps) => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }
  const variantData = ctx.api.getVariantData(props.variantId);
  if (!variantData) {
    return null;
  }
  return (
    <span className="rtc-variant-display-name">{variantData.displayName}</span>
  )
}
