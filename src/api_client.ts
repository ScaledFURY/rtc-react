import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
//import { Settings } from "./components/rtc";

let apiEndpoint : string|null = null;

export function setApiEndpoint(newApiEndpoint:string) {
  apiEndpoint = newApiEndpoint;
}

let cartId : string|null = null;

function getCartId(resetCookie:boolean=false) {
  const COOKIE_NAME="checkoutSessionCookie";

  const setNewCookie = () => {
    cartId = uuidv4();
    Cookies.set(COOKIE_NAME, cartId, { expires: 1 });
  }

  if (resetCookie === true) {
    setNewCookie();
  }
  if (!cartId) {
    cartId = Cookies.get(COOKIE_NAME) || null;
    if (!cartId) {
      setNewCookie();
    }
  }
  console.log(`cartId = ${cartId}`);
  return cartId;
}

async function apiRequest(endPoint:string, opts:any={}, queryParams:any={}) {
  if (apiEndpoint === null) {
    throw Error("api called before calling setApiEndpoint");
  }
  const url = new URL(`https://${apiEndpoint}/v1/${endPoint}`);
  url.search = new URLSearchParams(queryParams).toString();
  const settings = Object.assign({
      method: 'get',
      mode: 'cors',
      headers: {
        'Content-Type': "application/json"
      },
      cache: 'no-cache',
  }, opts);

  const response = await fetch(url.toString(), settings);
  return await response.json();
}

export async function getCart(props:any) {
  return apiRequest(`cart/${getCartId(props.resetCookie)}`, {}, props);
}

export async function removeCoupon() {
  return apiRequest(`cart/${getCartId()}/remove_coupon`, { "method": "POST" }, {});
}

export async function  applyCoupon(code:string) {
  return apiRequest(`cart/${getCartId()}/apply_coupon`, { "method": "POST", "body": JSON.stringify({ "code": code }) }, {});
}

export async function toggleAddon(variantId:string) {
  return apiRequest(`cart/${getCartId()}/toggle_addon`, { "method": "POST", "body": JSON.stringify({ variantId }) }, {});
}


export async function loadPricing() {
  if (apiEndpoint === null) {
    throw Error("api called before calling setApiEndpoint");
  }
  console.log(`Loading Pricing`);

  try {
    const cdnUrl = apiEndpoint.replace(/^api\./, 'cdn.');
    const raw = await fetch(`https://${cdnUrl}/cafcb58f5f7280959b1327dc8606de30c450e4e1213dbae22afb3004be13f498.json`);
    const pricingData = Object.freeze(await raw.json());
    return pricingData;
  } catch(err) {
    console.log(err);
    return null;
  }
}
/*
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

window.Cookies = Cookies;

const COOKIE_NAME="checkoutSessionCookie";

window.resetCookie = () => {
  Cookies.set(COOKIE_NAME, uuidv4(), { expires: 1 });
  window.location.reload();
}

export default class ApiClient {
  constructor(props) {
    this.props = props;
    this.getSessionId();
  }

  getSessionId() {
    getCartId() = Cookies.get(COOKIE_NAME);

    const hasRecoveryCartId = typeof(this.props.recoveryCartId) === 'string' && this.props.recoveryCartId.length > 5;
    if (getCartId() === undefined || this.props.resetCookie || hasRecoveryCartId) {
      getCartId() = uuidv4();
      Cookies.set(COOKIE_NAME, getCartId(), { expires: 1 });
    }
    console.log(`RTC SessionID = ${getCartId()}`);
  }

  initBraintree(data) {
    return this.apiRequest(`braintree/${getCartId()}/init`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }

  initKlarna(data) {
    return this.apiRequest(`klarna/${getCartId()}/init`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }

  validateAddress(addr) {
    return this.apiRequest(`addresses/validate`, { "method": "POST", "body": JSON.stringify(addr) }, {});
  }

  getKlaviyoData() {
    return this.apiRequest(`cart/${getCartId()}/klaviyo_data`);
  }

  saveValues(data) {
    return this.apiRequest(`cart/${getCartId()}/save_values`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }


  commitApplePay(data) {
    return this.apiRequest(`applepay/${getCartId()}/commit`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }

  getApplepaySession(data) {
    return this.apiRequest(`applepay/${getCartId()}/init`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }

  addToAttentive(data) {
    return this.apiRequest(`attentive`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }

  getPixelData() {
    return this.apiRequest(`cart/${getCartId()}/pixel_data`);
  }

  // Not necessarily any data...
  sendEvent(data = {}) {
    data.sessionCartId = data.sessionCartId || getCartId();
    return this.apiRequest(`events/${getCartId()}`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }

  completeStripeIntent(data) {
    return this.apiRequest(`stripe/${getCartId()}/complete_intent`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }

  getMeta() {
    return this.apiRequest('meta');
  }

  setupQuadpay(data) {
    return this.apiRequest(`quadpay/${getCartId()}/init`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }


  setupStripeIntent() {
    return this.apiRequest(`stripe/${getCartId()}/create_intent`);
  }

  walletStripeIntent() {
    return this.apiRequest(`stripe/${getCartId()}/wallet_create_intent`);
  }

  walletCompleteStripeIntent(data) {
    return this.apiRequest(`stripe/${getCartId()}/wallet_complete_intent`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }

  walletRequestObject() {
    return this.apiRequest(`stripe/${getCartId()}/wallet_request_object`);
  }

  walletShipping(data) {
    return this.apiRequest(`stripe/${getCartId()}/wallet_shipping`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }

  charge(ccData) {
    return this.apiRequest(`cart/${getCartId()}/charge`, { "method": "POST", "body": JSON.stringify(ccData) }, {});

  }

  setCountry(country) {
    return this.apiRequest(`cart/${getCartId()}/set_country`, { "method": "POST", "body": JSON.stringify({ "country": country }) }, {});
  }

  setNextUrl(nextUrl) {
    return this.apiRequest(`cart/${getCartId()}/set_next_url`, { "method": "POST", "body": JSON.stringify({ "nextUrl": nextUrl }) }, {});
  }

  confirmPaypal() {
    return this.apiRequest(`paypal/${getCartId()}/confirm`, { "method": "GET" }, {});
  }

  toggleAddon(variantId) {
    return this.apiRequest(`cart/${getCartId()}/toggle_addon`, { "method": "POST", "body": JSON.stringify({ variantId }) }, {});
  }

  getReceipt(props) {
    return this.apiRequest(`cart/${getCartId()}/receipt`, {}, props);
  }


  getBrowserEvents(props) {
    return this.apiRequest(`browser_events/${getCartId()}`, {}, props);
  }


  getCart(props) {
    return this.apiRequest(`cart/${getCartId()}`, {}, props);
  }

  acceptUpsell(data) {
    return this.apiRequest(`cart/${getCartId()}/accept_upsell`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }

  setVariantQuantities(data) {
    return this.apiRequest(`cart/${getCartId()}/set_variant_quantities`, { "method": "POST", "body": JSON.stringify(data) }, {});

  }

  setCurrentVariant(variantId) {
    return this.apiRequest(`cart/${getCartId()}/set_current_variant`, { "method": "POST", "body": JSON.stringify({ "variantId": variantId }) }, {});
  }

  removeCoupon() {
    return this.apiRequest(`cart/${getCartId()}/remove_coupon`, { "method": "POST" }, {});
  }

  applyCoupon(code) {
    return this.apiRequest(`cart/${getCartId()}/apply_coupon`, { "method": "POST", "body": JSON.stringify({ "code": code }) }, {});
  }

  async apiRequest(endPoint, opts={}, queryParams={}) {

    const url = new URL(`https://${this.props.apiEndpoint}/v1/${endPoint}`);
    url.search = new URLSearchParams(queryParams).toString();
    const settings = Object.assign({
        method: 'get',
        mode: 'cors',
        headers: {
          'Content-Type': "application/json"
        },
        cache: 'no-cache',
    }, opts);

    const response = await fetch(url, settings);
    return await response.json();
  }
}
*/
