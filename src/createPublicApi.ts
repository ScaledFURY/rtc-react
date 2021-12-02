import { fireEvent } from "./events";

export const createPublicApi = (apiClient:any, setCart:Function, cart: any, pricingData:any, settings:any, meta:any) => {
  const result : any = {};

  let currencyFormatter : any = null;

  result.normalizedTimestamp = () => {
    const clientTimestampDrift = meta.localNow - (+new Date());
    return (+new Date()) + clientTimestampDrift;

  };

  result.fireEvent = async (e:any) => {
    const promises = [];
    promises.push(fireEvent(e, result));
    if (settings.eventHandler) {
      promises.push(settings.eventHandler(e, result));
    }
    return Promise.allSettled(promises);

  }

  result.formatCurrency = (val:string|number) => {
    if (!cart.locale) {
      return null;
    }
    currencyFormatter = currencyFormatter || new Intl.NumberFormat(cart.locale, { style: 'currency', currency: cart.cartCurrency });
    return currencyFormatter.format(val);
  }


  result.getVariantQuantity = (variantId:string) => {
    if (!cart) {
      return null;
    }
    return cart.currencyCart.getVariantQuantity(variantId);
  }

  result.getVariantData = (variantId:string|number) => {

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

      data.shippingRateFormatted = result.formatCurrency(data.shippingRate);
    } catch (err) {
      console.log(err);
    }

    delete data.shippingRates;

    ["price", "compareAtPrice", "compareSavings"].forEach(field => {
      const num = parseFloat(data[field]);
      if (num && !isNaN(num)) {
        data[field + "Formatted"] = result.formatCurrency(num);
      }
    });
    return data;
  }


  result.hasVariant = (variantId:string) => {
    return cart.currencyCart.hasVariant(variantId);
  }

  result.setVariantQuantities = async(data:any) => {
    const result = await apiClient.setVariantQuantities(data);
    if (result) {
      setCart(result);
      return true;
    } else {
      return false
    }
  }

  result.setPrimaryVariant = async (variantId:string) => {
    const result = await apiClient.setPrimaryVariant(variantId);
    if (result) {
      setCart(result);
      return true;
    } else {
      return false
    }
  }


  result.toggleAddon = async (variantId:string) => {
    const result = await apiClient.toggleAddon(variantId);
    if (result) {
      setCart(result);
      return true;
    } else {
      return false
    }
  }

  result.applyCoupon = async (code:string) => {
    const result = await apiClient.applyCoupon(code);
    if (result) {
      setCart(result);
      return true;
    } else {
      return false
    }
  };

  result.removeCoupon = async () => {
    const result = await apiClient.removeCoupon();
    if (result) {
      setCart(result);
      return true;
    } else {
      return false
    }
  };

  return result;
};
