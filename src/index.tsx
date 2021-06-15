export { ExampleComponent } from "./components/example";
import config from 'react-global-configuration';
import { useStateGateway } from './use-linked-state';

interface IConfiguration {
  apiEndpoint: string;
}



export function configureRtc(newConfig:IConfiguration) {
    config.set((newConfig as any));
}

export function getStateRtc() {
  return useStateGateway({});
}
