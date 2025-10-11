import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL, AUTH_HEADER_KEY, TENANT_HEADER_KEY } from '../utils';

let authToken: string | null = null;
let tenantId: string | null = null;

const attachInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => {
    config.headers = config.headers ?? {};

    if (authToken) {
      config.headers[AUTH_HEADER_KEY] = `Bearer ${authToken}`;
    }

    if (tenantId) {
      config.headers[TENANT_HEADER_KEY] = tenantId;
    }

    return config;
  });
};

const createInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
  });

  attachInterceptors(instance);
  return instance;
};

let schoolApi: AxiosInstance = createInstance(API_BASE_URL);

export const configureSchoolApi = (options: { baseURL?: string; token?: string | null; tenantId?: string | null }) => {
  if (typeof options.token !== 'undefined') {
    authToken = options.token;
  }

  if (typeof options.tenantId !== 'undefined') {
    tenantId = options.tenantId;
  }

  if (options.baseURL) {
    schoolApi = createInstance(options.baseURL);
  }
};

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

export const setTenantId = (id: string | null) => {
  tenantId = id;
};

export const getSchoolApi = (): AxiosInstance => schoolApi;
