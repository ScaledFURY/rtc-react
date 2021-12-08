interface ISettings {
    urlCoupon : string|null;
    //forceVariantId: string|null;
    recoveryCartId: string|null;
    resetCookie: boolean;
    forceShippingZone: string|null;
    debugForeignCurrency: string;
    checkoutPage: Location;
    checkoutPageParams: string;
    //isReceiptPage: boolean;
    defaultVariantId?: string;
    defaultAddons?: string;
    nextUrl: string;
    //landingPageName: string;
    //upsellPageName: string;
    //funnelName: string;
    //orderTag: string;
    //advertorialPageName: string;
    //trackStock: boolean;
    //paypalConfirmUrl?: string;
    eventHandler?: Function;
    //isCheckoutPage: boolean;
}
