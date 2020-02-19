import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import cookieParser from './cookieParser';

export const createAxios = () => {
  // cookie now become the single source of truth for jwt token
  const { token = '' } = cookieParser(document.cookie);
  
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `bearer ${token}` : undefined,
    },
    withCredentials: true,
  });
};

axios.defaults.withCredentials = true;

export const get = (url, config) => {
  const instance = createAxios();
  return instance.get(url, config);
};

export const post = (url, data, config) => {
  const instance = createAxios();
  return instance.post(url, { ...data }, config);
};

export const del = (url, config) => {
  const instance = createAxios();
  return instance.delete(url, config);
};

export const upload = (url, data, config) => {
  const instance = axios.create();
  return instance.post(url, data, { withCredentials: false, headers: { 'Content-Type': 'application/json' } });
};
export default axios;
