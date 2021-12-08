const startupOffset : number = +new Date();

export function logWithOffset(message:string) {
  const diff = (+new Date()) - startupOffset;
  console.log(`[RTC +${diff}] ${message}`);
}

export function warnWithOffset(message:string) {
  const diff = (+new Date()) - startupOffset;
  console.warn(`[RTC +${diff}] WARNING: ${message}`);
}