import * as ApiClient from '../../rest_api_client';

export async function fireEventServer(e: any) {
  console.log(e);
  if (!e.noServer) {
    console.log(`Trying to send ${e} to server`);
    await ApiClient.sendEvent(e);
  }
}
