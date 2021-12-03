# rtc-react

> RTC React

[![NPM](https://img.shields.io/npm/v/rtc-react.svg)](https://www.npmjs.com/package/rtc-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save rtc-react
```

## Usage

```tsx
import React from 'react'
import { RTC, CartDisplay } from 'rtc-react'

const App = () => {

  const eventHandler = async(e:any, rtcApi:any) => {
    console.log(`custom event handler received: ${e.eventType}`);
  };

  const ExampleSite = () => {
    return (
      <CartDisplay />
    )
  }

  return (
    <RTC component={ExampleSite}
         defaultVariantId="40194513993914"
         defaultAddons="39518515298490"
         forceVariantId="39507333480634"
         nextUrl="https://www.whatever.com"
         apiEndpoint="api.burnerdomain.rtccart.io"
         landingPageName="LPN"
         upsellPageName="UPN"
         funnelName="FN"
         orderTag="OT"
         advertorialPageName="APN"
         trackStock={false}
         paypalConfirmUrl="http://www.whatever.com"
         eventHandler={eventHandler}
         isCheckoutPage={false}
    />
  );
}

export default App;

```

## License

UNLICENSED © [scaledfury](https://github.com/scaledfury)
