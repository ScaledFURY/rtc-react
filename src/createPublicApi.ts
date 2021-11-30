export const createPublicApi = (apiClient:any, setCart:Function) => {
  const result : any = {};

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
