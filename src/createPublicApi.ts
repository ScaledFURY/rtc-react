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



export function updatePublicApi(newApiClient:any, newSetCart:Function, newCart: any, newPricingData:any, newSettings:any, newMeta:any) {
  apiClient   = newApiClient;
  setCart     = newSetCart;
  cart        = newCart;
  pricingData = newPricingData;
  settings    = newSettings;
  meta        = newMeta;
}

export const normalizedTimestamp = () => {
  const clientTimestampDrift = meta.serverNow - localNow;
  return (+new Date()) + clientTimestampDrift;
};

export const sendEvent = async(e:any) => {
  return apiClient.sendEvent(e);
}

export const fireEvent = async (e:any) => {
  const promises = [];
  promises.push(doFireEvent(e, {})); // FIXME
  if (settings.eventHandler) {
    promises.push(settings.eventHandler(e, {})); // FIXME
  }
  return Promise.allSettled(promises);

}

export const formatCurrency = (val:string|number) => {
  if (!cart.locale) {
    return null;
  }
  currencyFormatter = currencyFormatter || new Intl.NumberFormat(cart.locale, { style: 'currency', currency: cart.cartCurrency });
  return currencyFormatter.format(val);
}


export const getVariantQuantity = (variantId:string) => {
  if (!cart) {
    return null;
  }
  return cart.currencyCart.getVariantQuantity(variantId);
}

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


export const hasVariant = (variantId:string) => {
  return cart.currencyCart.hasVariant(variantId);
}

export const setVariantQuantities = async(data:any) => {
  const result = await apiClient.setVariantQuantities(data);
  if (result) {
    setCart(result);
    return true;
  } else {
    return false
  }
}

export const setPrimaryVariant = async (variantId:string) => {
  const result = await apiClient.setPrimaryVariant(variantId);
  if (result) {
    setCart(result);
    return true;
  } else {
    return false
  }
}


export const toggleAddon = async (variantId:string) => {
  const result = await apiClient.toggleAddon(variantId);
  if (result) {
    setCart(result);
    return true;
  } else {
    return false
  }
}

export const applyCoupon = async (code:string) => {
  const result = await apiClient.applyCoupon(code);
  if (result) {
    setCart(result);
    return true;
  } else {
    return false
  }
};

export const removeCoupon = async () => {
  const result = await apiClient.removeCoupon();
  if (result) {
    setCart(result);
    return true;
  } else {
    return false
  }
};
