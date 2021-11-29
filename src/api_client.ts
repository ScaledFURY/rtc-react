import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
//import { Settings } from "./components/rtc";

let apiEndpoint : string|null = null;

export function setApiEndpoint(newApiEndpoint:string) {
  apiEndpoint = newApiEndpoint;
}

let cartId : string|null = null;

function getCartId(resetCookie:boolean) {
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
  alert(props.resetCookie);
  return apiRequest(`cart/${getCartId(props.resetCookie)}`, {}, props);
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
    this.sessionId = Cookies.get(COOKIE_NAME);

    const hasRecoveryCartId = typeof(this.props.recoveryCartId) === 'string' && this.props.recoveryCartId.length > 5;
    if (this.sessionId === undefined || this.props.resetCookie || hasRecoveryCartId) {
      this.sessionId = uuidv4();
      Cookies.set(COOKIE_NAME, this.sessionId, { expires: 1 });
    }
    console.log(`RTC SessionID = ${this.sessionId}`);
  }

  initBraintree(data) {
    return this.apiRequest(`braintree/${this.sessionId}/init`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }

  initKlarna(data) {
    return this.apiRequest(`klarna/${this.sessionId}/init`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }

  validateAddress(addr) {
    return this.apiRequest(`addresses/validate`, { "method": "POST", "body": JSON.stringify(addr) }, {});
  }

  getKlaviyoData() {
    return this.apiRequest(`cart/${this.sessionId}/klaviyo_data`);
  }

  saveValues(data) {
    return this.apiRequest(`cart/${this.sessionId}/save_values`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }


  commitApplePay(data) {
    return this.apiRequest(`applepay/${this.sessionId}/commit`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }

  getApplepaySession(data) {
    return this.apiRequest(`applepay/${this.sessionId}/init`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }

  addToAttentive(data) {
    return this.apiRequest(`attentive`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }

  getPixelData() {
    return this.apiRequest(`cart/${this.sessionId}/pixel_data`);
  }

  // Not necessarily any data...
  sendEvent(data = {}) {
    data.sessionCartId = data.sessionCartId || this.sessionId;
    return this.apiRequest(`events/${this.sessionId}`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }

  completeStripeIntent(data) {
    return this.apiRequest(`stripe/${this.sessionId}/complete_intent`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }

  getMeta() {
    return this.apiRequest('meta');
  }

  setupQuadpay(data) {
    return this.apiRequest(`quadpay/${this.sessionId}/init`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }


  setupStripeIntent() {
    return this.apiRequest(`stripe/${this.sessionId}/create_intent`);
  }

  walletStripeIntent() {
    return this.apiRequest(`stripe/${this.sessionId}/wallet_create_intent`);
  }

  walletCompleteStripeIntent(data) {
    return this.apiRequest(`stripe/${this.sessionId}/wallet_complete_intent`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }

  walletRequestObject() {
    return this.apiRequest(`stripe/${this.sessionId}/wallet_request_object`);
  }

  walletShipping(data) {
    return this.apiRequest(`stripe/${this.sessionId}/wallet_shipping`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }

  charge(ccData) {
    return this.apiRequest(`cart/${this.sessionId}/charge`, { "method": "POST", "body": JSON.stringify(ccData) }, {});

  }

  setCountry(country) {
    return this.apiRequest(`cart/${this.sessionId}/set_country`, { "method": "POST", "body": JSON.stringify({ "country": country }) }, {});
  }

  setNextUrl(nextUrl) {
    return this.apiRequest(`cart/${this.sessionId}/set_next_url`, { "method": "POST", "body": JSON.stringify({ "nextUrl": nextUrl }) }, {});
  }

  confirmPaypal() {
    return this.apiRequest(`paypal/${this.sessionId}/confirm`, { "method": "GET" }, {});
  }

  toggleAddon(variantId) {
    return this.apiRequest(`cart/${this.sessionId}/toggle_addon`, { "method": "POST", "body": JSON.stringify({ variantId }) }, {});
  }

  getReceipt(props) {
    return this.apiRequest(`cart/${this.sessionId}/receipt`, {}, props);
  }


  getBrowserEvents(props) {
    return this.apiRequest(`browser_events/${this.sessionId}`, {}, props);
  }


  getCart(props) {
    return this.apiRequest(`cart/${this.sessionId}`, {}, props);
  }

  acceptUpsell(data) {
    return this.apiRequest(`cart/${this.sessionId}/accept_upsell`, { "method": "POST", "body": JSON.stringify(data) }, {});
  }

  setVariantQuantities(data) {
    return this.apiRequest(`cart/${this.sessionId}/set_variant_quantities`, { "method": "POST", "body": JSON.stringify(data) }, {});

  }

  setCurrentVariant(variantId) {
    return this.apiRequest(`cart/${this.sessionId}/set_current_variant`, { "method": "POST", "body": JSON.stringify({ "variantId": variantId }) }, {});
  }

  removeCoupon() {
    return this.apiRequest(`cart/${this.sessionId}/remove_coupon`, { "method": "POST" }, {});
  }

  applyCoupon(code) {
    return this.apiRequest(`cart/${this.sessionId}/apply_coupon`, { "method": "POST", "body": JSON.stringify({ "code": code }) }, {});
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
