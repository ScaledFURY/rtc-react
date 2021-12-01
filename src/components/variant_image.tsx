import * as React from 'react'
import { RTCContext } from './rtc_context';

interface IProps {
  variantId: string;
}

export const VariantImage = (props:IProps) => {
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
