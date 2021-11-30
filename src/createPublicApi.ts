export const createPublicApi = (apiClient:any, setCart:Function, cart: any) => {
  const result : any = {};

  result.hasVariant = (variantId:string) => {
    return cart.currencyCart.hasVariant(variantId);
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
