import * as rtcApi from "../../rtcApi";

export async function fireEventServer(e: any) {
  console.log(e);
  if (!e.noServer) {
    console.log(`Trying to send ${e} to server`);
    await rtcApi.sendEvent(e);
  }
}
