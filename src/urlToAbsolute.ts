export function urlToAbsolute(url?:string) : string|undefined {
  if (typeof url !== 'string') {
    return url;
  }
  if (!url.match(/^http(s)*:/)) {
    const tmp = document.createElement("a");
    tmp.href = url;
    return tmp.href;
  } else {
    return url;
  }
};
