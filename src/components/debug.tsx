import * as React from 'react'
import { RTCContext } from './rtc_context';

export const DebugComponent = () => {
  const ctx : any = React.useContext(RTCContext);
  if (!ctx || !ctx.cart || !ctx.meta) {
    return null;
  }

  const [ visible, setVisible ] = React.useState(false);

  return (
    <div>
      <button onClick={() => setVisible(!visible) }>Toggle Debug</button>
      {visible && (
        <React.Fragment>
        <pre>{JSON.stringify(ctx.meta, null, 4)}</pre>
        <pre>{JSON.stringify(ctx.cart, null, 4)}</pre>
        </React.Fragment>
      )}
    </div>
  )
}
