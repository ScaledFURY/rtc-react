import * as React from 'react'

interface IRtcContext {
  settings?:object;
  setState?:Function;

}

export const RTCContext = React.createContext<IRtcContext>({});
