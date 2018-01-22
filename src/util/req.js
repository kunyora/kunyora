export function allowedReqProps(obj) {
	let allowedProp = {
		"method": true,
		"url": true,
		"baseURL": true,
		"transformRequest": true,
		"transformResponse": true,
		"headers": true,
		"params": true,
		"paramsSerializer": true,
		"data": true,
		"timeout": true,
		"withCredentials": true,
		"adapter": true,
		"auth": true,
		"responseType": true,
		"xsrfCookieName": true,
		"xsrfHeaderName": true,
		"onUploadProgress": true,
		"onDownloadProgress": true,
		"maxContentLength": true,
		"maxRedirects": true,
		"httpAgent": true,
		"httpsAgent": true,
		"proxy": true,
		"cancelToken": true
	};

	let out = {}

	for (let prop in obj){
		if (allowedProp[prop]){
			out[prop] = obj[prop]
		}
	}
	return out

}