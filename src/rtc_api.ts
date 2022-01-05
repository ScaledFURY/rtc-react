import { fireEvent as doFireEvent } from "./events";
import * as apiClient from './rest_api_client';
import { errorWithOffset } from './logging';
const localNow = +new Date();
import { digestMessage } from "./digestMessage";
import * as csp from 'country-state-picker';


declare global {
    interface Window { RTC: any; }
}

let currencyFormatter : any = null;
let setCart : any = null;
let setMeta : any = null;
let cart : any = null;
let pricingData : any = null;
let settings : any = null;
let meta : any = null;
let pendingPageViews : any = [];

/** @internal */
export function setApiEndpoint(endpoint:string) {
  return apiClient.setApiEndpoint(endpoint);
}

/** @internal */
export function updatePublicApi(newSetCart:Function, newSetMeta:Function, newCart: any, newPricingData:any, newSettings:any, newMeta:any, debugMode:boolean) {
  setCart     = newSetCart;
  setMeta     = newSetMeta;
  cart        = newCart;
  pricingData = newPricingData;
  settings    = newSettings;
  meta        = newMeta;
  if (debugMode) {
    window.RTC.meta = meta;
    window.RTC.cart = cart;
    window.RTC.pricingData = pricingData;
  }
  if (cart && meta) {
    while (pendingPageViews.length > 0) {
      firePageView(pendingPageViews.pop());
    }
  }

}

/** Returns current shipping zone */
export function currentShippingZone() {
  return !cart ? null : cart.shippingZone;
}


let countryCache : any = null;

/** Returns list of cournties */
export function getCountries() {
  if (!countryCache) {
    countryCache = csp.getCountries();
    // TODO:  We need to fork CSP to make it not do this.
    for (let i = 0; i < countryCache.length; i++) {
      countryCache[i].code = countryCache[i].code.toUpperCase();
    }
  }
  return countryCache;
}

/** Returns list of provinces for the current shipping zone */
export function statesForCountry(countryCode:string) {
  return csp.getStates(countryCode.toLowerCase());
}

/** Checks if cart has already been loaded. */
export function cartLoaded() {
  return cart !== null;
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
    errorWithOffset("loadCart() was called before settings were available");
    return null;
  }
  const loadCartSettings = Object.assign({}, settings, cartSettings);
  const newCart = await apiClient.getCart(loadCartSettings);
  setMeta(newCart.meta);
  setCart(newCart.cart);
  return newCart.cart;
}

/** Returns a timestamp value that has been normalized against the server's time */
export function normalizedTimestamp() {
  if (!meta) {
    errorWithOffset("called normalizedTimestamp before cart was loaded");
    return null;
  }
  const clientTimestampDrift = meta.serverNow - localNow;
  return (+new Date()) + clientTimestampDrift;
};

/**
  Transmits an event to the server
  @internal
*/
export async function sendEvent(e:any) {
  return apiClient.sendEvent(e);
}

/*** Bulk updates several options on a cart at once (STILL IN DEVELOPMENT) */
//export async function updateCart = async(data:any) => {
//  return apiClient.updateCart(data);
//}

/** Sends an event to the event handling system and any defined custom event handlers */
export async function fireEvent(e:any) {
  const promises = [];
  promises.push(doFireEvent(e)); // FIXME
  if (settings.eventHandler) {
    promises.push(settings.eventHandler(e)); // FIXME
  }
  return Promise.allSettled(promises);

}

/** Converts a value 1.24 into a formmated currency string for the current locale and cartCurrency */
export function formatCurrency(val:string|number) {
  if (!cart || !cart.locale) {
    errorWithOffset("formatCurrency was called before the cart was loaded");
    return null;
  }
  currencyFormatter = currencyFormatter || new Intl.NumberFormat(cart.locale, { style: 'currency', currency: cart.cartCurrency });
  return currencyFormatter.format(val);
}

/** sets the current shipping zone */
export async function setShippingZone(newZone:string) {
  const result = await apiClient.setShippingZone(newZone);
  if (result && !result.error) {
    setCart(result);
    return true;
  } else {
    errorWithOffset("setShippingZone: " + JSON.stringify(result, null, 4));
    return false
  }

}

/** Returns the quantity of a given variant currently in the cart */
export function getVariantQuantity(variantId:string) {
  if (!cart) {
    return null;
  }
  return cart.currencyCart.getVariantQuantity(variantId);
}

/** Save arbitary data to the cart, will not overwrite previously saved values */
export async function saveValues(savedValues:any) {
  return apiClient.saveValues(savedValues);
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
export function getVariantData(variantId:string|number) {

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


export async function creditCardCheckout(checkoutData:ICheckoutData) {
  let checkoutCopy : ICheckoutData = Object.assign({}, checkoutData);

  if (checkoutCopy.billing_use_shipping) {
    checkoutCopy.billing = checkoutCopy.shipping;
  }
  console.log(checkoutCopy);
  const result = await apiClient.charge(checkoutCopy);
  if (result.error) {
    return Error(result.error);
  } else {
    setCart(result);
    return true;
  }
}

/** Returns true/false if the specified variantId is in the cart */
export function hasVariant(variantId:string) {
  if (!cart) {
    errorWithOffset("hasVariant was called before cart was loaded");
    return false;
  }
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
export async function setVariantQuantities(data:any) {
  const result = await apiClient.setVariantQuantities(data);
  if (result && !result.error) {
    setCart(result);
    return true;
  } else {
    errorWithOffset("setVariantQuantities: " + JSON.stringify(result, null, 4));
    return false
  }
}

/** Sets the primary variant of the cart.  A cart can only have one primary variant */
export async function setPrimaryVariant(variantId:string) {
  const result = await apiClient.setPrimaryVariant(variantId);
  if (result && !result.error) {
    setCart(result);
    return true;
  } else {
    errorWithOffset("setPrimaryVariant: " + JSON.stringify(result, null, 4));
    return false
  }
}

/** Toggles a variant in the cart */
export async function toggleVariant(variantId:string) {
  const result = await apiClient.toggleAddon(variantId);
  if (result && !result.error) {
    setCart(result);
    return true;
  } else {
    errorWithOffset("toggleVariant: " + JSON.stringify(result, null, 4));
    return false
  }
}

/** Accepts an upsell */
export async function acceptUpsell(data:IUpsellParams) {
  const result = await apiClient.acceptUpsell(data);
  if (result && !result.error) {
    setCart(result);
    return true;
  } else {
    errorWithOffset("acceptUpsell: " + JSON.stringify(result, null, 4));
    return false
  }
}

/** Apples a coupon to the cart */
export async function applyCoupon(code:string) {
  const result = await apiClient.applyCoupon(code);
  if (result && !result.error) {
    setCart(result);
    return true;
  } else {
    errorWithOffset("applyCoupon: " + JSON.stringify(result, null, 4));
    return false
  }
};

/** Removes a coupon from the cart */
export async function removeCoupon() {
  const result = await apiClient.removeCoupon();
  if (result && !result.error) {
    setCart(result);
    return true;
  } else {
    errorWithOffset("removeCoupon: " + JSON.stringify(result, null, 4));
    return false
  }
};


export async function fireCheckoutStarted(props:ICheckoutStartedProps) {
  //  email: string;
  //  eventSourceUrl?: string;

  const hshKey = `${cart.sessionCartId}:checkout_started`;
  const eventId = await digestMessage(hshKey);
  const e = { eventType: "checkout_started",
              email: props.email,
              eventId,
              currency: meta.storeCurrency,
              value: cart.localCart.subTotal, // Always use localCart when making stats.
              eventSourceUrl: props.eventSourceUrl || window.location.href,
              createdAt: normalizedTimestamp(),
              ...eventsCommon()
  };
  return fireEvent(e);
}

export async function firePageView(props:IPageViewProps) {
  if (!cart || !meta) {
    pendingPageViews.push(props);
    return;
  }
  const validPageTypes = ["lander","upsell","advertorial"];
  if (validPageTypes.indexOf(props.pageType) === -1) {
    errorWithOffset(`firePageView: '${props.pageType}' is not a valid pageType`)
  }
  if (props.pageType === "lander" && !props.landingPageName) {
    errorWithOffset(`firePageView: pageType is 'lander' but landingPageName was not specified`);
  }
  if (props.pageType === "upsell" && !props.upsellPageName) {
    errorWithOffset(`firePageView: pageType is 'upsell' but upsellPageName was not specified`);
  }
  if (props.pageType === "advertorial" && !props.advertorialPageName) {
    errorWithOffset(`firePageView: pageType is 'advertorial' but advertorialPageName was not specified`);
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
              ...eventsCommon(),
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
  return fireEvent(e);

}

export function redirectToPaypal(nextUrl:string) {
  apiClient.redirectToPaypal(nextUrl);
}

function eventsCommon() {
    if (!meta || !cart) {
      errorWithOffset("eventsCommon was called before cart was loaded");
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
