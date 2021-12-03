import * as React from 'react'
import { RTCContext } from './rtc_context';

/** Properties for the VariantImage component */
export interface IVariantImageProps {
  /** The variantId this control should display */
  variantId: string;
}

/** Displays a variant's image */
export const VariantImage = (props:IVariantImageProps) => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }
  const variantData = ctx.api.getVariantData(props.variantId);
  if (!variantData || !variantData.image) {
    return null;
  }

  return (
    <img className="rtc-variant-image" src={variantData.image} alt={variantData.displayName} />
  )
}
