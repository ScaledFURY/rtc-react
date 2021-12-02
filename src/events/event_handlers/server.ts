export async function fireEventServer(e: any, rtcApi:any) {
  if (!e.noServer) {
    await rtcApi.sendEvent(e);
  } else {
    console.log("Skipping e");
    console.log(e);
  }
}
