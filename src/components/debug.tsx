import * as React from 'react'
import { RTCContext } from './rtc_context';

export function DebugComponent() {
  const ctx : any = React.useContext(RTCContext);
  const [ visible, setVisible ] = React.useState(false);

  if (!ctx.cart || !ctx.meta) {
    return null;
  }


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
