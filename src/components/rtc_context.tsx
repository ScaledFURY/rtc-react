import * as React from 'react'

interface IRtcContext {
  cart:object|null;
  meta:object|null;
  currencyFormatter?:any;
  api:object|null;
}

export const RTCContext = React.createContext<IRtcContext>({
  cart: null,
  meta: null,
  currencyFormatter: null,
  api: null
});
