const startupOffset : number = +new Date();

export function logWithOffset(message:string) {
  const diff = (+new Date()) - startupOffset;
  console.log(`[RTC +${diff}] ${message}`);
}

export function errorWithOffset(message:string) {
  const diff = (+new Date()) - startupOffset;
  console.error(`[RTC +${diff}] WARNING: ${message}`);
}
