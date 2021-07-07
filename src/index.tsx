export { ExampleComponent } from "./components/example";
export { RTCContext }       from "./components/rtc_context";
import config from 'react-global-configuration';

interface IConfiguration {
  apiEndpoint: string;
}

export function configureRtc(newConfig:IConfiguration) {
  config.set((newConfig as any));
}
