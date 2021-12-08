import * as React from 'react'
import { RTCContext } from './rtc_context';

/** Properties for the VariantDisplayName component */
export interface IVariantDisplayNameProps {
  /** The variantId this control should display */
  variantId: string;
}

/** Displays a variants {producttitle} and {varianttitle} */
export function VariantDisplayName(props:IVariantDisplayNameProps) {
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
