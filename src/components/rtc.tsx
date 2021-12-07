import * as React from 'react'
import { RTCContext } from './rtc_context';
import { urlToAbsolute } from "../urlToAbsolute";
import * as ApiClient from '../rest_api_client';
import { LocalCart } from "../local-cart";
import * as api from "../rtc_api";
import { digestMessage } from "../digestMessage";
declare global {
    interface Window { RTC: any; }
}

/** Properties for the RTC Component */
export interface IRTCProps {
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
  isCheckoutPage?: boolean;
}



/**
  Main wrapper of RTC Library

  The user passes a <Component> that should be the main entry point to the lander.

  Example:

  ```
  <RTC component={Site}
       defaultVariantId="40194513993914"
       defaultAddons="39518515298490"
       forceVariantId="39507333480634"
       nextUrl="https://www.whatever.com"
       apiEndpoint="api.burnerdomain.rtccart.io"
       landingPageName="LPN"
       upsellPageName="UPN"
       funnelName="FN"
       orderTag="OT"
       advertorialPageName="APN"
       trackStock={false}
       paypalConfirmUrl="http://www.whatever.com"
       eventHandler={eh}
       isCheckoutPage={false}
  />
  ```



*/
export const RTC = (props: IRTCProps) => {
  //console.log("Starting RTC Render");
  React.useEffect(() => {
    ApiClient.setApiEndpoint(props.apiEndpoint);
  });
  const debugMode = props.apiEndpoint.match(/burnerdomain/);

  if (debugMode) {
    window.RTC = window.RTC || {};
    window.RTC.__ApiClient = ApiClient;
  }
  const settings : ISettings = load_settings(props);

  const [ cart, setCartOrig ]           = React.useState(null);
  const [ meta, setMeta ]               = React.useState(null);
  const [ pricingData, setPricingData ] = React.useState(null);
  const [ ready, setReady ]             = React.useState(false);

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

  api.updatePublicApi(ApiClient, setCart, cart, pricingData, settings, meta);
  if (debugMode) {
    window.RTC.api = api;
  }

  const Component = props.component;

  React.useEffect(() => {

    ApiClient.getCart(settings).then(newCart => {
      setMeta(newCart.meta);
      setCart(newCart.cart);
    });
    ApiClient.loadPricing().then(newPricingData => {
      setPricingData(newPricingData);
    });

  }, []);


  React.useEffect(()=> {
    if (meta && cart && pricingData && !ready) {
      setReady(true);
      (async function() {
        ApiClient.getBrowserEvents().then(browserEvents => {
          if (browserEvents.events) {
            for (let i = 0; i < browserEvents.events.length; i++) {
              // We tell the server handler to not re-send else we cause an infinite loop.
              api.fireEvent(Object.assign({}, browserEvents.events[i], { noServer: true}));
            }
          }
        });
        await api.fireEvent(await createPageViewEvent(api, settings, cart, meta));
      })();
    }
  }, [meta, cart, ready]);

  return (
    <RTCContext.Provider value={{ cart, meta, api }}>
      <Component rtcApi={ready ? api : null} />
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
    isCheckoutPage: boolean;
}

function load_settings(props: IRTCProps) : ISettings {
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
    paypalConfirmUrl:     urlToAbsolute(props.paypalConfirmUrl),
    isCheckoutPage:       props.isCheckoutPage === true
  };

  return settings;
}

function eventsCommon(cart:any, meta:any) {
    return {
      ip: meta.ipAddress,
      userAgent: meta.userAgent,
      sessionCartId: cart.sessionCartId,
      advertorialPageName: cart.advertorialPageName,
      landingPageName: cart.landingPageName,
      funnelName: cart.funnelName,
      pageParams: cart.checkoutPageParams,
      country: cart.shippingZone,
      primaryVariantId: cart.primaryVariantId,
      //splitDecisions: this.splitDecisions, // TODO: Are we still doing split decisions?  How?
      locale: cart.locale,
      parentSessionCartId: cart.parentSessionCartId
    }
}

async function createPageViewEvent(api:any, settings:any, cart:any, meta:any) {
  const now = api.normalizedTimestamp();
  const hshKey = `page_view:${cart.sessionCartId}:${now}:${window.location.href}`;
  const eventId = await digestMessage(hshKey);

  const e:any = { eventType: "page_view",
              url: window.location.href,
              pageTitle: document.title,
              referrer: document.referrer,
              eventId,
              eventSourceUrl: window.location.href,
              createdAt: now,
              ...eventsCommon(cart, meta),
              isCheckoutPage: settings.isCheckoutPage
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
