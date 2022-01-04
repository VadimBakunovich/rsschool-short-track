interface IOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: object;
  responseType?: XMLHttpRequestResponseType;
  signal?: AbortSignal;
}

export function load(url: string, options: IOptions = {}) {
  options.method = options.method || 'GET';
  options.body = options.body || null;
  options.responseType = options.responseType || 'json';

  const xhr = new XMLHttpRequest();
  xhr.open(options.method, url);
  xhr.responseType = options.responseType;
  xhr.setRequestHeader('Content-Type', 'application/json');
  if (options.signal) {
    options.signal.addEventListener('abort', () => xhr.abort());
  }
  
  return new Promise((resolve, reject) => {
    xhr.onload = () => {
      const response = {
        status: xhr.status,
        body: xhr.response as Response,
        statusText: xhr.statusText
      }
      if (xhr.status >= 200 && xhr.status < 400) resolve(response);
      else reject(response);
    };
    xhr.onerror = () => reject(xhr.response);
    xhr.onabort = () => reject(xhr.status);
    options.body
      ? xhr.send(JSON.stringify(options.body))
      : xhr.send();
  });
}