import * as React from 'react'
import { RTCContext } from './rtc_context';


interface IStateSelectOptionsProps {
  /** Two letter country code in upper case */
  countryCode: string;
}


export function StateSelectOptions(props:IStateSelectOptionsProps) {
    const ctx : any = React.useContext(RTCContext);
    if (!ctx.cart) {
      return null;
    }
    const states = ctx.api.statesForCountry(props.countryCode);
    if (!states) {
      return null;
    }
    const result = states.map((state:any) => (
      <option key={state} value={state}>{state}</option>
    ));
    return (
      <React.Fragment>
        <option value="" key="state_choice_null">- Select State -</option>
        {result}
      </React.Fragment>
    )
}
