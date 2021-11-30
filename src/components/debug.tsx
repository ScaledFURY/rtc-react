import * as React from 'react'
import { RTCContext } from './rtc_context';

export const DebugComponent = () => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx || !ctx.cart || !ctx.meta) {
    return null;
  }
  return (
    <div>
      <pre>{JSON.stringify(ctx.meta, null, 4)}</pre>
      <hr />
      <pre>{JSON.stringify(ctx.cart, null, 4)}</pre>

    </div>
  )
}
