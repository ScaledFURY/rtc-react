import * as rtcApi from "../../rtc_api";

export async function fireEventServer(e: any) {
  console.log(e);
  if (!e.noServer) {
    console.log(`Trying to send ${e} to server`);
    await rtcApi.sendEvent(e);
  }
}
