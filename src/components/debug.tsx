import * as React from 'react'
import { RTCContext } from './rtc_context';

export const DebugComponent = () => {
  const ctx = React.useContext(RTCContext);
  console.log("CONTEXT");
  console.log(JSON.stringify(ctx, null, 4));
  return <pre>{JSON.stringify(ctx, null, 4)}</pre>
}
