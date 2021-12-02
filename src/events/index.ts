import { fireEventServer } from "./event_handlers/server";

export async function fireEvent(e:any, rtcApi:any) {
  console.log("Hi from fireEvent");
  const handlers = [ fireEventServer ];
  const promises = [];

  for (let i = 0; i < handlers.length; i++) {
    promises.push((handlers[i])(e, rtcApi));
  }
  await Promise.allSettled(promises);


}
