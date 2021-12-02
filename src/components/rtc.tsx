import * as React from 'react'
import { RTCContext } from './rtc_context';
import { urlToAbsolute } from "../urlToAbsolute";
import * as ApiClient from '../api_client';
import { LocalCart } from "../local-cart";
import { createPublicApi } from "../createPublicApi";

declare global {
    interface Window { RTC: any; }
}

interface IProps {
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




export const RTC = (props: IProps) => {
  ApiClient.setApiEndpoint(props.apiEndpoint);
  const debugMode = props.apiEndpoint.match(/burnerdomain/);

  if (debugMode) {
    window.RTC = window.RTC || {};
    window.RTC.__ApiClient = ApiClient;
  }
  const settings : ISettings = load_settings(props);

  const [ cart, setCartOrig ]           = React.useState(null);
  const [ meta, setMeta ]               = React.useState(null);
  const [ pricingData, setPricingData ] = React.useState(null);

  const setCart = (newCart : any) => {
    if (newCart.localCart) {
      newCart.localCart = new LocalCart(newCart.localCart);
    }
    if (newCart.currencyCart) {
      newCart.currencyCart = new LocalCart(newCart.currencyCart);
    }
    if (debugMode) {
      window.RTC.cart = newCart;
    }
    setCartOrig(newCart);
  };

  const api = createPublicApi(ApiClient, setCart, cart, pricingData);
  if (debugMode) {
    window.RTC.api = api;
  }

  const Component = props.component;

  React.useEffect(() => {

    ApiClient.getCart(settings).then(newCart => {
      setMeta(newCart.meta);
      setCart(newCart.cart);
      console.log(newCart.cart.locale);
      console.log(newCart.cart.cartCurrency);
    });
    ApiClient.loadPricing().then(newPricingData => {
      setPricingData(newPricingData);
    });
  }, []);

  return (
    <RTCContext.Provider value={{ cart, meta, api }}>
      <Component rtcApi={api} />
    </RTCContext.Provider>
  )
}

export interface ISettings {
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

function load_settings(props: IProps) : ISettings {
  const urlParams = new URLSearchParams(window.location.search);

  const origParams = {};
  for (const [key,value] of urlParams.entries()) {
    origParams[key] = value;
  }

  const settings : ISettings = {
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
