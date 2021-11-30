import * as React from 'react'

interface IRtcContext {
  cart:object|null;
  meta:object|null;
  currencyFormatter?:any;
}

export const RTCContext = React.createContext<IRtcContext>({
  cart: null,
  meta: null,
  currencyFormatter: null
});
