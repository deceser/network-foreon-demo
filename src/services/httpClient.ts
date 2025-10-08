import {
  REFRESH_TOKEN_API,
  deleteAuthTokens,
  getAccessToken,
  sessionExpired,
  setAccessToken,
  setRefreshToken,
  tryRefreshAccessToken,
} from '@/services/auth';
import { APIError } from '@/services/error';
import type { IResponse } from '@/services/types';
import { showToastMessage } from '@/utils/helpers/toastMessage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

let isRefreshing = false;
const lockedRequests = [] as {
  options: RequestInit;
  reject: (reason: any) => void;
  resolve: (value: any) => void;
  url: string;
  data?: FormData | object;
}[];

const authorizationHeader = (options?: RequestInit): RequestInit => {
  const headers: RequestInit['headers'] = {
    'Content-Type': 'application/json',
  };

  const token = getAccessToken();
  if (token) {
    Object.assign(
      headers,
      {
        Authorization: `Bearer ${token}`,
      },
      options?.headers,
    );
  }
  return { headers, ...options };
};

const STATUS_CODE_UNAUTHORIZED = 401;

const request = async <TData>(
  endpoint: string,
  method: RequestInit['method'],
  data?: FormData | object,
  options: Omit<RequestInit, 'method'> = {},
): Promise<IResponse<TData>> => {
  const reqOptions = authorizationHeader(options);

  if (data) {
    reqOptions.body = JSON.stringify(data);
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    method,
    ...reqOptions,
  });

  if (
    endpoint !== REFRESH_TOKEN_API &&
    response.status === STATUS_CODE_UNAUTHORIZED
  ) {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const tokens = await tryRefreshAccessToken();
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);

        // Unlock all locked requests and execute them
        lockedRequests.forEach((lockedRequest) => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const { options, resolve, url, data } = lockedRequest;
          void request(url, method, data, {
            ...options,
          })
            .then(resolve)
            .catch(lockedRequest.reject);
        });

        lockedRequests.length = 0;

        // Retry the original request
        return await request(endpoint, method, data, options);
      } catch (error) {
        lockedRequests.forEach((lockedRequest) => {
          lockedRequest.reject(error);
        });
        lockedRequests.length = 0;
        deleteAuthTokens();
        showToastMessage(
          'error',
          'Your session has expired. Please log in again.',
        );

        window.dispatchEvent(sessionExpired);
      } finally {
        isRefreshing = false;
      }
    } else {
      // When the access token is being refreshed, lock the request and wait for the access token to be refreshed
      return new Promise((resolve, reject) => {
        lockedRequests.push({
          data,
          options: reqOptions,
          reject,
          resolve,
          url,
        });
      });
    }
  }

  if (!response.ok) {
    throw new APIError(
      `${response.status}: Couldn't fetch data ${endpoint}`,
      response.statusText,
    );
  }
  const resData = await response.json();

  return resData as IResponse<TData>;
};

const get = <TResponse = any>(
  url: string,
  params?: Record<string, any>,
  options?: RequestInit,
) => {
  const queryString = params
    ? `?${new URLSearchParams(params).toString()}`
    : '';
  const fullUrl = `${url}${queryString}`;
  return request<TResponse>(fullUrl, 'GET', undefined, options);
};

const del = <TResponse = any>(
  url: string,
  data?: object,
  options?: RequestInit,
) => request<TResponse>(url, 'DELETE', data, options);

const post = <TResponse = any>(
  url: string,
  data?: object,
  options?: RequestInit,
) => request<TResponse>(url, 'POST', data, options);

const put = <TResponse = any>(
  url: string,
  data?: object,
  options?: RequestInit,
) => request<TResponse>(url, 'PUT', data, options);

const patch = <TResponse = any>(
  url: string,
  data?: object,
  options?: RequestInit,
) => request<TResponse>(url, 'PATCH', data, options);

export { get, del, post, put, patch };
