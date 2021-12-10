import * as React from 'react'
import { RTCContext } from './rtc_context';
import * as usstates from "../us_states.json";
import * as castates from "../ca_states.json";

interface IStateSelectOptionsProps {
  /** Two letter country code in upper case */
  countryCode: string;
}

function CustomStates(props:any) {
  let data = null;
  if (props.countryCode === 'US') {
    data = usstates;
  }
  if (props.countryCode === 'CA') {
    data = castates;
  }
  if (!data) {
    return null;
  }

  const result = [];

  for (const [abbr, full] of Object.entries(data)) {
    // artifact of typings.d.ts I think....
    if (abbr !== 'default') {
      result.push(
        <option key={abbr} value={abbr}>{full}</option>
      );
    }
  }

  return (
    <React.Fragment>
      {result}
    </React.Fragment>
  )
}

export function StateSelectOptions(props:IStateSelectOptionsProps) {
    const ctx : any = React.useContext(RTCContext);
    if (!ctx.cart) {
      return null;
    }

    if (props.countryCode === 'US' || props.countryCode === 'CA') {
      return (
        <React.Fragment>
          <option value="" key="state_choice_null">- Select State -</option>
          <CustomStates {...props} />
        </React.Fragment>
      )
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
