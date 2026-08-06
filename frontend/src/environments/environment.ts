const API = (typeof process !== 'undefined' && (process as any).env?.NG_API_URL) || 'http://localhost:3000/api';

export const environment = {
  apiBaseUrl: API,
  production: false,
};
