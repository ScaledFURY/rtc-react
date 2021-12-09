import { fireEvent as doFireEvent } from "./events";
import * as apiClient from './rest_api_client';
//import { ISettings } from './components/rtc';
import { warnWithOffset } from './logging';
const localNow = +new Date();
import { digestMessage } from "./digestMessage";

let currencyFormatter : any = null;
let setCart : any = null;
let setMeta : any = null;
let cart : any = null;
let pricingData : any = null;
let settings : any = null;
let meta : any = null;


/** @internal */
export function setApiEndpoint(endpoint:string) {
  return apiClient.setApiEndpoint(endpoint);
}

/** @internal */
export function updatePublicApi(newSetCart:Function, newSetMeta:Function, newCart: any, newPricingData:any, newSettings:any, newMeta:any) {
  setCart     = newSetCart;
  setMeta     = newSetMeta;
  cart        = newCart;
  pricingData = newPricingData;
  settings    = newSettings;
  meta        = newMeta;
}

export interface ILoadCartSettings {
  /** Forces this variant to be the primary variant, overrides current cart */
  forceVariantId?: string|null;
  /** Sets the landing page name if it hasn't been already set */
  landingPageName?: string;
  /** Sets the funnelName if it hasn't already been set */
  funnelName?: string;
  /** Sets the orderTag if it hasn't already been set */
  orderTag?: string;
  /** Sets the advertorialPageName if it hasn't already been set */
  advertorialPageName?: string;
  /** Forces the shipping zone to the specified value, debug purposes */
  forceShippingZone?: string|null;
  /** Enables foreign currency debug mode (overrides foreign currency global enabled/disabled admin config option) */
  debugForeignCurrency?: string;
  /** Sets the primary variantId for NEW carts */
  defaultVariantId?: string;
  /** Sets the default addons for NEW carts */
  defaultAddons?: string;
  /** Sets the URL to redirect to after checkout success (paypal) */
  nextUrl?: string;
}

/** Loads the cart */
export async function loadCart(cartSettings:ILoadCartSettings) {
  if (!settings) {
    warnWithOffset("loadCart() was called before settings were available");
    return null;
  }
  const loadCartSettings = Object.assign({}, settings, cartSettings);
  apiClient.getCart(loadCartSettings).then(newCart => {
    setMeta(newCart.meta);
    setCart(newCart.cart);
  });
  return;
}

/** Returns a timestamp value that has been normalized against the server's time */
export const normalizedTimestamp = () => {
  if (!meta) {
    return null;
  }
  const clientTimestampDrift = meta.serverNow - localNow;
  return (+new Date()) + clientTimestampDrift;
};

/**
  Transmits an event to the server
  @internal
*/
export const sendEvent = async(e:any) => {
  return apiClient.sendEvent(e);
}

/** Bulk updates several options on a cart at once (STILL IN DEVELOPMENT) */
export const updateCart = async(data:any) => {
  return apiClient.updateCart(data);
}

/** Sends an event to the event handling system and any defined custom event handlers */
export const fireEvent = async (e:any) => {
  const promises = [];
  promises.push(doFireEvent(e)); // FIXME
  if (settings.eventHandler) {
    promises.push(settings.eventHandler(e)); // FIXME
  }
  return Promise.allSettled(promises);

}

/** Converts a value 1.24 into a formmated currency string for the current locale and cartCurrency */
export const formatCurrency = (val:string|number) => {
  if (!cart || !cart.locale) {
    return null;
  }
  currencyFormatter = currencyFormatter || new Intl.NumberFormat(cart.locale, { style: 'currency', currency: cart.cartCurrency });
  return currencyFormatter.format(val);
}


/** Returns the quantity of a given variant currently in the cart */
export const getVariantQuantity = (variantId:string) => {
  if (!cart) {
    return null;
  }
  return cart.currencyCart.getVariantQuantity(variantId);
}

/** Returns a structure of variant data

For example,
```
{
    "productTitle": "Widgets",
    "variantTitle": "large",
    "displayName": "Widgets - large",
    "price": "30.25",
    "inStock": true,
    "compareAtPrice": null,
    "image": "https://cdn.shopify.com/s/files/1/0533/1979/4874/products/randombox.png?v=1618435551",
    "sku": "",
    "compareSavings": null,
    "compareSavingsPct": null,
    "shippingRate": "7.00",
    "shippingRateFormatted": "$7.00",
    "priceFormatted": "$30.25"
}
```
*/
export const getVariantData = (variantId:string|number) => {

  if (!cart || !pricingData || !pricingData[variantId]) {
    return null;
  }

  const data = Object.assign({}, pricingData[variantId], pricingData[variantId].presentmentPrices[cart.cartCurrency]);
  delete data.presentmentPrices;

  data.shippingRate = 0;
  data.shippingRateFormatted = "";


  try {
    if (data.shippingRates[cart.shippingZone]) {
      data.shippingRate = data.shippingRates[cart.shippingZone];
    } else {
      data.shippingRate = data.shippingRates["DEFAULT"] || 0;
    }

    data.shippingRateFormatted = formatCurrency(data.shippingRate);
  } catch (err) {
    console.log(err);
  }

  delete data.shippingRates;

  ["price", "compareAtPrice", "compareSavings"].forEach(field => {
    const num = parseFloat(data[field]);
    if (num && !isNaN(num)) {
      data[field + "Formatted"] = formatCurrency(num);
    }
  });
  return data;
}


/** Returns true/false if the specified variantId is in the cart */
export const hasVariant = (variantId:string) => {
  return cart.currencyCart.hasVariant(variantId);
}


/** Pass a map of variantId -> quantities that you want to update

for example,
```
setVariantQuantities({
  "39507333513402": 3
})
```

*/
export const setVariantQuantities = async(data:any) => {
  const result = await apiClient.setVariantQuantities(data);
  if (result) {
    setCart(result);
    return true;
  } else {
    return false
  }
}

/** Sets the primary variant of the cart.  A cart can only have one primary variant */
export const setPrimaryVariant = async (variantId:string) => {
  const result = await apiClient.setPrimaryVariant(variantId);
  if (result) {
    setCart(result);
    return true;
  } else {
    return false
  }
}

/** Toggles a variant in the cart */
export const toggleVariant = async (variantId:string) => {
  const result = await apiClient.toggleAddon(variantId);
  if (result) {
    setCart(result);
    return true;
  } else {
    return false
  }
}

/** Apples a coupon to the cart */
export const applyCoupon = async (code:string) => {
  const result = await apiClient.applyCoupon(code);
  if (result) {
    setCart(result);
    return true;
  } else {
    return false
  }
};

/** Removes a coupon from the cart */
export const removeCoupon = async () => {
  const result = await apiClient.removeCoupon();
  if (result) {
    setCart(result);
    return true;
  } else {
    return false
  }
};


interface IPageViewProps {
  /** Specifies pageType: advertorial, lander, upsell */
  pageType:string;
  /** Is this a page where the customer can checkout */
  isCheckoutPage:boolean;
  /** Optionally override eventSourceUrl: defaults to window.location.href */
  eventSourceUrl?:string;
  /** Optionally override url: defaults to window.location.href */
  url?:string;
  /** Optionally override pageTitle: defaults to document.title */
  pageTitle?:string;
  /** Optionally override referrer: defaults to document.referrer */
  referrer?:string;
  /** Required when pageType="advertorial" */
  advertorialPageName?:string;
  /** Required when pageType="upsell" */
  upsellPageName?:string;
  /** Required when pageType="lander" */
  landingPageName?:string;
}


export async function firePageView(props:IPageViewProps) {
  const validPageTypes = ["lander","upsell","advertorial"];
  if (validPageTypes.indexOf(props.pageType) === -1) {
    warnWithOffset(`firePageView: '${props.pageType}' is not a valid pageType`)
  }
  if (props.pageType === "lander" && !props.landingPageName) {
    warnWithOffset(`firePageView: pageType is 'lander' but landingPageName was not specified`);
  }
  if (props.pageType === "upsell" && !props.upsellPageName) {
    warnWithOffset(`firePageView: pageType is 'upsell' but upsellPageName was not specified`);
  }
  if (props.pageType === "advertorial" && !props.advertorialPageName) {
    warnWithOffset(`firePageView: pageType is 'advertorial' but advertorialPageName was not specified`);
  }

  const now = normalizedTimestamp();
  const hshKey = `page_view:${cart.sessionCartId}:${now}:${window.location.href}:${JSON.stringify(props)}`;
  const eventId = await digestMessage(hshKey);


  const e:any = { eventType: "page_view",
              url: props.url || window.location.href,
              pageTitle: props.pageTitle || document.title,
              referrer: props.referrer || document.referrer,
              eventId,
              eventSourceUrl: props.eventSourceUrl || window.location.href,
              createdAt: now,
              ...eventsCommon,
              isCheckoutPage: props.isCheckoutPage,
              pageType: props.pageType
            };

  switch(e.pageType) {
    case 'lander':
      e.landingPageName = props.landingPageName;
      break;
    case 'upsell':
      e.upsellPageName = props.upsellPageName;
      break;
    case 'advertorial':
      e.advertorialPageName = props.advertorialPageName;
      break;
  }
  await fireEvent(e);

}

export function eventsCommon() {
    if (!meta || !cart) {
      return {};
    }
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
