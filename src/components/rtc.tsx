import * as React from 'react'
import { RTCContext } from './rtc_context';
import * as ApiClient from '../api_client';

declare global {
    interface Window { RTC: any; }
}

window.RTC = window.RTC || {};
window.RTC.ApiClient = ApiClient;

interface Props {
  component: any;
  apiEndpoint: string;
}

export const RTC = (props: Props) => {
  ApiClient.setApiEndpoint(props.apiEndpoint);
  const [ state, setState ] = React.useState({});
  const Component = props.component;

  React.useEffect(() => {
    ApiClient.getCart({ checkoutPageParams: JSON.stringify({}) }).then(newCart => {
      setState(Object.assign({}, state, newCart));
    });
  }, []);

  return (
    <RTCContext.Provider value={{ ...state, setState }}>
      <Component state={state} />
    </RTCContext.Provider>
  )
}
