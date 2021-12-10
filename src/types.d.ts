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
    nextUrl: string;
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

//forceVariantId: string|null;
//landingPageName: string;
//upsellPageName: string;
//funnelName: string;
//orderTag: string;
//advertorialPageName: string;

// Overrideable


*/
