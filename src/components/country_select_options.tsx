import * as React from 'react'
import { RTCContext } from './rtc_context';


export function CountrySelectOptions() {

  const ctx : any = React.useContext(RTCContext);
  if (!ctx.cart) {
    return null;
  }

  let rawCountries = ctx.api.getCountries();
  return rawCountries.map((c:any) => {
    return (
      <option key={c.code} value={c.code}>{c.name}</option>
    )
  });

}
