import { fireEvent as doFireEvent } from "./events";

console.log("Setting localNow");
const localNow = +new Date();


let currencyFormatter : any = null;
let apiClient : any= null;
let setCart : any= null;
let cart : any = null;
let pricingData : any = null;
let settings : any = null;
let meta : any = null;


/** @internal */
export function updatePublicApi(newApiClient:any, newSetCart:Function, newCart: any, newPricingData:any, newSettings:any, newMeta:any) {
  apiClient   = newApiClient;
  setCart     = newSetCart;
  cart        = newCart;
  pricingData = newPricingData;
  settings    = newSettings;
  meta        = newMeta;
}

/** Returns a timestamp value that has been normalized against the server's time */
export const normalizedTimestamp = () => {
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
  if (!cart.locale) {
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
export const toggleAddon = async (variantId:string) => {
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
