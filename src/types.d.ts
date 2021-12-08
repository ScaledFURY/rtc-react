interface ISettings {
    resetCookie: boolean;
    urlCoupon : string|null;
    recoveryCartId: string|null;
    forceShippingZone: string|null;
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


/*

//forceVariantId: string|null;
//landingPageName: string;
//upsellPageName: string;
//funnelName: string;
//orderTag: string;
//advertorialPageName: string;

// Overrideable


*/
