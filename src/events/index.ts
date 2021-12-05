import { fireEventServer } from "./event_handlers/server";

export async function fireEvent(e:any) {
  const handlers = [ fireEventServer ];
  const promises = [];

  for (let i = 0; i < handlers.length; i++) {
    promises.push((handlers[i])(e));
  }
  await Promise.allSettled(promises);


}
