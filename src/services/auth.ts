import { get, post } from '@/services/httpClient';
import type { TISODateString } from '@/types/common';

const REFRESH_TOKEN_KEY = 'refresh_token';
const ACCESS_TOKEN_KEY = 'access_token';

const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);
const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

const setAccessToken = (token: string) =>
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
const setRefreshToken = (token: string) =>
  localStorage.setItem(REFRESH_TOKEN_KEY, token);

const deleteAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);
const deleteRefreshToken = () => localStorage.removeItem(REFRESH_TOKEN_KEY);

const deleteAuthTokens = () => {
  deleteAccessToken();
  deleteRefreshToken();
};

export interface IRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface ILoginData {
  accessToken: string;
  exp: string;
  refreshToken: string;
  user: {
    createdAt: string;
    deletedAt: string | null;
    id: number;
    isDeleted: number;
    updatedAt: string;
    walletAddress: string;
  };
}

const tryLogin = async ({
  signature,
  key,
  walletAddress,
}: {
  key: string;
  signature: string;
  walletAddress: string;
}) => {
  const response = await post<ILoginData>('/auth/login', {
    signature,
    key,
    walletAddress,
  });

  return response.data;
};

const REFRESH_TOKEN_API = '/auth/refresh-token';

const tryRefreshAccessToken = async () => {
  const response = await post<IRefreshTokenResponse>(REFRESH_TOKEN_API, {
    refreshToken: getRefreshToken(),
    type: 'admin',
  });

  return response.data;
};

interface IProfile {
  createdAt: TISODateString;
  deletedAt: TISODateString | null;
  id: number;
  isDeleted: number;
  updatedAt: TISODateString;
  walletAddress: string;
}

const tryGetMe = async () => {
  const response = await get<IProfile>('/auth/me');

  return response.data;
};

const sessionExpired = new CustomEvent('sessionExpired');

export {
  tryLogin,
  tryGetMe,
  tryRefreshAccessToken,
  deleteAuthTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  REFRESH_TOKEN_API,
  sessionExpired,
};
