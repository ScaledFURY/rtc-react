interface ISettings {
    /** Forces a new session to be created */
    resetCookie: boolean;
    /** Sets a default coupon code, defaults to value ?coupon= from URL */
    urlCoupon : string|null;
    /** Tries to rebuild current cart from an old cart */
    recoveryCartId: string|null;
    /** Forces server to reset shipping zone, read from URL */
    forceShippingZone: string|null;
    /** Enables debug currency, read from URL */
    debugForeignCurrency: string;

    defaultVariantId?: string;
    defaultAddons?: string;
    checkoutPage: Location;
    checkoutPageParams: string;
    //isReceiptPage: boolean;
    //trackStock: boolean;
    //paypalConfirmUrl?: string;
    eventHandler?: Function;
    //isCheckoutPage: boolean;
}

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

interface ICheckoutStartedProps {
  email: string;
  eventSourceUrl?: string;
}

/*

const [ checkoutProps, setCheckoutProps ] = React.useState({
  "accepts_marketing": true,
  "accepts_attentive": false,
  "shipping": {
      "first_name": "",
      "last_name": "",
      "address1": "",
      "address2": "",
      "city": "",
      "state": "",
      "postal_code": "",
      "country": "",
      "phone": ""
  },
  "billing": {
      "first_name": "",
      "last_name": "",
      "address1": "",
      "address2": "",
      "city": "",
      "state": "",
      "postal_code": "",
      "country": "",
      "phone": ""
  },
  "email": "",
  "billing_use_shipping": true,
  "cc_number": "",
  "cc_exp_month": "",
  "cc_exp_year": "",
  "cc_cvv": "",
  "combo_mode": "credit"
});

*/

interface IAddress {
  first_name: string;
  last_name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postal_code:string;
  country: string;
  phone: string;
}

interface ICheckoutData {
  accepts_marketing: boolean;
  accepts_attentive: boolean;
  shipping: IAddress;
  billing: IAddress;
  email: string;
  billing_use_shipping: boolean;
  cc_number: string;
  cc_exp_month: string;
  cc_exp_year: string;
  cc_cvv: string;
  combo_mode: string;
}

/*

//forceVariantId: string|null;
//landingPageName: string;
//upsellPageName: string;
//funnelName: string;
//orderTag: string;
//advertorialPageName: string;

// Overrideable


*/
