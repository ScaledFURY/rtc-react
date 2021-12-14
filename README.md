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

const Site : any = (props:any) => {
  React.useEffect(() => {
      props.rtcApi.loadCart({
        defaultVariantId: "40194513993914",
        defaultAddons: "39518515298490"
      });

  }, [ props.rtcApi]);

  return (
    <CartDisplay />
  );

}

const App = () => {

  const eventHandler = async(e:any) => {
    console.log(`custom event handler received: ${e.eventType}`);
  };

  return (
    <RTC component={Site}
         apiEndpoint="api.burnerdomain.rtccart.io"
         eventHandler={eventHandler}
    />
  );
}

export default App;


```

## License

UNLICENSED © [scaledfury](https://github.com/scaledfury)
