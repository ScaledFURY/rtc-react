import * as React from 'react'
import { RTCContext } from './rtc_context';
import { urlToAbsolute } from "../urlToAbsolute";
import * as ApiClient from '../api_client';
import { LocalCart } from "../local-cart";
import { createPublicApi } from "../createPublicApi";
//import { digestMessage } from "../digestMessage";
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
  eventHandler?: Function;
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

  const api = createPublicApi(ApiClient, setCart, cart, pricingData, settings, meta);
  if (debugMode) {
    window.RTC.api = api;
  }

  const Component = props.component;

  React.useEffect(() => {

    ApiClient.getCart(settings).then(newCart => {
      newCart.meta.localNow = +new Date();
      setMeta(newCart.meta);
      setCart(newCart.cart);
      // Send page view event.
      //api.fireEvent(createPageViewEvent(settings, newCart.cart, api));

    });
    ApiClient.loadPricing().then(newPricingData => {
      setPricingData(newPricingData);
    });

    ApiClient.getBrowserEvents().then(browserEvents => {
      if (browserEvents.events) {
        for (let i = 0; i < browserEvents.events.length; i++) {
          // We tell the server handler to not re-send else we cause an infinite loop.
          api.fireEvent(Object.assign({}, browserEvents.events[i], { noServer: true}));
        }
      }
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
    eventHandler?: Function;
}

/*
async function createPageViewEvent(settings:ISettings, cart:any, api:any) {
  const now = api.normalizedTimestamp();
  const hshKey = `page_view:${settings.sessionId}:${now}:${window.location.href}`;
  const eventId = await digestMessage(hshKey);

  const e = { eventType: "page_view",
              url: window.location.href,
              pageTitle: document.title,
              referrer: document.referrer,
              eventId,
              eventSourceUrl: window.location.href,
              createdAt: now,
//
// TODO: FIXME FIXME FIXME FIXME
//
//              isCheckoutPage: this.isCheckoutPage(),
//              ...this.eventsCommon(),
            };

  if (typeof(settings.landingPageName) === 'string' && settings.landingPageName.length > 0) {
    e.pageType = "lander";
  }

  if (typeof(settings.upsellPageName) === 'string' && settings.upsellPageName.length > 0) {
    e.pageType = "upsell";
    e.upsellPageName = settings.upsellPageName;
  }

  if (typeof(settings.advertorialPageName) === 'string' && settings.advertorialPageName.length > 0) {
    e.pageType = "advertorial";
    e.advertorialPageName = settings.advertorialPageName;
  }

  return e;
}
*/


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
    eventHandler:         props.eventHandler,
    paypalConfirmUrl:     urlToAbsolute(props.paypalConfirmUrl)
  };

  return settings;
}
