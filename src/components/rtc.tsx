import * as React from 'react'
import { RTCContext } from './rtc_context';
import { urlToAbsolute } from "../urlToAbsolute";
import * as ApiClient from '../api_client';

declare global {
    interface Window { RTC: any; }
}

window.RTC = window.RTC || {};
window.RTC.ApiClient = ApiClient;

interface Props {
  component: any;
  apiEndpoint: string;
  forceVariantId?: string;
  isReceiptPage?: boolean; // Needed?
  defaultVariantId?: string;
  defaultAddons?: string;
  nextUrl: string;
  landingPageName?: string;
  upsellPageName?: string;
  funnelName?: string;
  orderTag?: string; // Needed?
  advertorialPageName?: string;
  trackStock?: boolean;
  paypalConfirmUrl?: string;
}

export const RTC = (props: Props) => {
  ApiClient.setApiEndpoint(props.apiEndpoint);
  const [ state, setState ] = React.useState({});
  const Component = props.component;

  React.useEffect(() => {
    const settings : Settings = load_settings(props);
    ApiClient.getCart(settings).then(newCart => {
      setState(Object.assign({}, state, newCart, { settings }));
    });
  }, []);

  return (
    <RTCContext.Provider value={{ ...state, setState }}>
      <Component {...state} />
    </RTCContext.Provider>
  )
}

export interface Settings {
    urlCoupon : string|null;
    forceVariantId: string|null;
    recoveryCartId: string|null;
    resetCookie: boolean;
    forceShippingZone: string|null;
    debugForeignCurrency: string;
    checkoutPage: Location;
    checkoutPageParams: string;
    isReceiptPage: boolean;
    defaultVariantId?: string;
    defaultAddons?: string;
    nextUrl: string;
    landingPageName: string;
    upsellPageName: string;
    funnelName: string;
    orderTag: string;
    advertorialPageName: string;
    trackStock: boolean;
    paypalConfirmUrl?: string;
}

function load_settings(props: Props) : Settings {
  const urlParams = new URLSearchParams(window.location.search);

  const origParams = {};
  for (const [key,value] of urlParams.entries()) {
    origParams[key] = value;
  }

  const settings : Settings = {
    urlCoupon:            urlParams.get('coupon'),
    forceVariantId:       urlParams.get('forceVariantId') || props.forceVariantId || null,
    recoveryCartId:       urlParams.get('recoveryCartId'),
    resetCookie:          urlParams.get('resetCookie') === "true",
    forceShippingZone:    urlParams.get('forceShippingZone') || "",
    debugForeignCurrency: urlParams.get('debugForeignCurrency') || "false",
    checkoutPage:         window.location,
    checkoutPageParams:   JSON.stringify(origParams),
    isReceiptPage:        props.isReceiptPage || false,
    defaultVariantId:     props.defaultVariantId,
    defaultAddons:        props.defaultAddons || "",
    nextUrl:              props.nextUrl,
    landingPageName:      props.landingPageName || "",
    upsellPageName:       props.upsellPageName || "",
    funnelName:           props.funnelName || "",
    orderTag:             props.orderTag || "",
    advertorialPageName:  props.advertorialPageName || "",
    trackStock:           !!props.trackStock,
    paypalConfirmUrl:     urlToAbsolute(props.paypalConfirmUrl)
  };

  return settings;
}
