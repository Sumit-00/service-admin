import axios, { AxiosResponse, AxiosError, AxiosProgressEvent, Method } from 'axios';
import { API_TIMEOUT, API_BASE_URL } from './AppConfig';

const AxiosInstance = axios.create();

// axios.interceptors.response.use(
//   (response: AxiosResponse): Promise<AxiosResponse> =>
//     Promise.resolve(response),
//   (error: AxiosError): Promise<never> => {
//     if (error.response && error.response.status === 401) {
//       // If "401 Unauthorized" from backend, then User is not authenticated
//       // redirect user to auth service with current url as next url
//       // place your code for Unauthorized user here
//       // window?.["logoutUser"]?.();
//     }
//     return Promise.reject(error);
//   },
// );

AxiosInstance.interceptors.response.use(
  (response: AxiosResponse): Promise<AxiosResponse> => Promise.resolve(response),
  (error: AxiosError): any => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger

    if (error.code && error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('TimeOut, Internet Speed is Slow'));
    }

    if (error.message === 'Network Error') {
      return Promise.reject(new Error('Please check your Internet connection and retry.'));
    }

    if (error.response && error.response.status === 401) {
      // If "401 Unauthorized" from backend, then User is not authenticated
      // redirect user to auth service with current url as next url
      // place your code for Unauthorized user here
      // window?.["logoutUser"]?.();
    }

    if (error.response && error.response.status === 403) {
      // If "403 Forbidden" from backend, then User is not authorized or does not have necessary permission to complete this operation
      // Notify user about the "Unauthorized Access"
      return Promise.reject(
        new Error('You do not have sufficient permissions to complete this request.'),
      );
    }

    if (error.response && !error.response.data) {
      return Promise.reject(new Error('An unexpected error occurred'));
    }

    return error.response;
  },
);

const defaultHeaders: { [key: string]: string } = Object.freeze({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  // 'X-Internal-Base-Url': `${window.location.protocol}//${window.location.host}`,
});

interface AddJWTTokenParams {
  noJWT?: boolean;
  Authorization?: string;
}

async function addJWTToken(
  headers: { [key: string]: any },
  params?: AddJWTTokenParams,
): Promise<{ [key: string]: any }> {
  // Adding user id from cookie in header
  // if (!headers["X-Internal-User-Uuid"]) {
  // headers["X-Internal-User-Uuid"] = getUuidFromCookie();
  // }
  // if (!headers["X-Internal-Api-Version"]) {
  // headers["X-Internal-Api-Version"] = API_HEADER_VERSION;
  // }

  // Dont add jwt header if noJWT option is in params objects
  params = params || {};
  if (params.noJWT) {
    return headers;
  } else if (params.Authorization) {
    // Authorization can be sent as params while making request
    headers.Authorization = params.Authorization;
    // noinspection JSAnnotator
    return headers;
  }

  // const auth = await ApplicationStorage.getItem("auth");
  // const authLocalStorage = JSON.parse(auth);
  // if (authLocalStorage && authLocalStorage.jwt_token) {
  // headers.Authorization = `Bearer ${authLocalStorage.jwt_token}`;
  // }
  // add device UUID if is it available in local storage auth key
  // if (authLocalStorage && authLocalStorage.deviceUUID) {
  // headers["X-Internal-User-Uuid"] = authLocalStorage.deviceUUID;
  // }
  return headers;
}

interface WrapperOverAxiosParams {
  headers: { [key: string]: any };
  params?: AddJWTTokenParams & {
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
    timeout?: number;
  };
  BASE_URL: string;
  url: string;
  data?: any;
  typeOfMethod: Method;
}

async function wrapperOverAxios({
  headers,
  params,
  BASE_URL,
  url,
  data,
  typeOfMethod,
}: WrapperOverAxiosParams): Promise<AxiosResponse | any> {
  const manipulatedHeaders = await addJWTToken(headers, params);
  const promiseResponse = AxiosInstance(`${BASE_URL}${url}`, {
    method: typeOfMethod,
    headers: manipulatedHeaders,
    withCredentials: true,
    data,
    onUploadProgress: function (progressEvent) {
      if (params && params.onUploadProgress) {
        params.onUploadProgress(progressEvent);
      }
      // Do whatever you want with the native progress event
    },
    onDownloadProgress: function (progressEvent) {
      if (params && params.onDownloadProgress) {
        params.onDownloadProgress(progressEvent);
      }
      // Do whatever you want with the native progress event
    },
    timeout: (params && params.timeout) || API_TIMEOUT,
  })
    .then((response: AxiosResponse) => response)
    .catch((error: AxiosError) => error);

  return promiseResponse;
}

function setHeaders(Accept: string, ContentType?: string): { [key: string]: string } {
  const customHeaders = Object.assign({
    Accept,
    'Content-Type': ContentType ? ContentType : 'application/json',
  });
  return customHeaders;
}

interface RequestFactoryParams {
  BASE_URL: string;
}

function requestFactory({ BASE_URL }: RequestFactoryParams) {
  return {
    setUrl(url: string) {
      BASE_URL = url;
    },
    getWithoutDefaultHeaders(
      url: string,
      // _Accept: string,
      // _ContentType: string,
    ) {
      return AxiosInstance(`${BASE_URL}${url}`, {
        method: 'get',
        withCredentials: true,
        // headers: setHeaders(Accept, ContentType),
      })
        .then((response) => response)
        .catch((response) => response);
    },
    get(url: string, params?: AddJWTTokenParams) {
      const headers = Object.assign({}, defaultHeaders, {});
      return wrapperOverAxios({
        headers,
        params,
        BASE_URL,
        url,
        typeOfMethod: 'get',
      });
    },
    postWithoutDefaultHeaders(url: string, data: any, Accept: string, ContentType: string) {
      return AxiosInstance(`${BASE_URL}${url}`, {
        method: 'post',
        headers: setHeaders(Accept, ContentType),
        data,
      })
        .then((response) => response)
        .catch((response) => response);
    },
    post(url: string, data?: any, params?: AddJWTTokenParams) {
      const headers = Object.assign({}, defaultHeaders, {});
      return wrapperOverAxios({
        headers,
        params,
        BASE_URL,
        url,
        typeOfMethod: 'post',
        data,
      });
    },
    postWithCustomHeaders(
      url: string,
      data: any,
      params: AddJWTTokenParams,
      customHeaders: { [key: string]: any },
    ) {
      const headers = Object.assign({}, defaultHeaders, {}, customHeaders);
      return wrapperOverAxios({
        headers,
        params,
        BASE_URL,
        url,
        typeOfMethod: 'post',
        data,
      });
    },
    postDocument(url: string, data: any, params?: AddJWTTokenParams) {
      const headers = Object.assign({}, defaultHeaders, {
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      return wrapperOverAxios({
        headers,
        params,
        BASE_URL,
        url,
        typeOfMethod: 'post',
        data,
      });
    },
    put(url: string, data: any, params?: AddJWTTokenParams) {
      const headers = Object.assign({}, defaultHeaders, {});
      return wrapperOverAxios({
        headers,
        params,
        BASE_URL,
        url,
        typeOfMethod: 'put',
        data,
      });
    },
    delete(url: string, params?: AddJWTTokenParams) {
      const headers = Object.assign({}, defaultHeaders, {});
      return wrapperOverAxios({
        headers,
        params,
        BASE_URL,
        url,
        typeOfMethod: 'delete',
      });
    },
  };
}

export const api = requestFactory({ BASE_URL: API_BASE_URL });
export const externalApi = requestFactory({ BASE_URL: '' });
export const externalRequest = requestFactory({ BASE_URL: '' });
const request = requestFactory({ BASE_URL: API_BASE_URL });
export default request;
