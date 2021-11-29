import * as React from 'react'
import { RTCContext } from './rtc_context';

export const DebugComponent = () => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx || !ctx.cart) {
    return null;
  }
  return (
    <div>
      <h1>{ctx?.cart?.sessionCartId}</h1>
      <pre>{JSON.stringify(ctx, null, 4)}</pre>
    </div>
  )
}
