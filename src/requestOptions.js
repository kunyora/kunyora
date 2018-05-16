/**
 * @description filters the properties in the config object to only allow
 * properties that are defined in the allowedProp variable
 *
 * @param obj {object} the config object
 * @return {Object} the request config object
 */
export function allowedReqProps(obj) {
  let allowedProp = {
    method: true,
    url: true,
    baseURL: true,
    transformRequest: true,
    transformResponse: true,
    headers: true,
    params: true,
    paramsSerializer: true,
    data: true,
    timeout: true,
    withCredentials: true,
    adapter: true,
    auth: true,
    responseType: true,
    xsrfCookieName: true,
    xsrfHeaderName: true,
    onUploadProgress: true,
    onDownloadProgress: true,
    maxContentLength: true,
    maxRedirects: true,
    httpAgent: true,
    httpsAgent: true,
    proxy: true,
    cancelToken: true
  }

  let out = {}

  for (let prop in obj) {
    if (allowedProp[prop]) {
      out[prop] = obj[prop]
    }
  }
  return out
}
