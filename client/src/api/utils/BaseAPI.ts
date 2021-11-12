import axios from 'axios';
import * as dotenv from 'dotenv';
import { APIOptions } from '../../utils/types';

dotenv.config();

enum Methods {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

export class API {
  static accessToken = '';
  static options: APIOptions = { debug: false };
  constructor(private APIUrl: string) {
    axios.defaults.withCredentials = true; //Send Session Cookie every request
  }

  protected getUrl() {
    return this.APIUrl;
  }

  private LogCalls(url: string, type: Methods) {
    if (!API.options.debug) return;

    console.log(`Sending a ${type} Request to ${url}`);
  }

  protected async get(url?: string): Promise<any> {
    const endpoint = url ? url : this.APIUrl;

    try {
      this.LogCalls(endpoint, Methods.Get);
      return (await axios.get(endpoint)).data;
    } catch (err: any) {
      console.error(`${Methods.Get} ${err.message} at ${endpoint}`);
      return null;
    }
  }

  protected async post(options: any, url?: string): Promise<any> {
    const endpoint = url ? url : this.APIUrl;

    try {
      this.LogCalls(endpoint, Methods.Post);
      return (await axios.post(endpoint, options)).data;
    } catch (err: any) {
      console.error(`${Methods.Post} ${err.message} at ${endpoint}`);
      return null;
    }
  }

  protected async put(options: any, url?: string): Promise<any> {
    const endpoint = url ? url : this.APIUrl;

    try {
      this.LogCalls(endpoint, Methods.Put);
      return (await axios.put(endpoint, options)).data;
    } catch (err: any) {
      console.error(`${Methods.Put} ${err.message} at ${endpoint}`);
      return null;
    }
  }

  protected async delete(options: any, url?: string): Promise<any> {
    const endpoint = url ? url : this.APIUrl;

    try {
      this.LogCalls(endpoint, Methods.Delete);
      return (await axios.delete(endpoint, { data: options })).data;
    } catch (err: any) {
      console.error(`${Methods.Delete} ${err.message} at ${endpoint}`);
      return null;
    }
  }
}

/* This file is Copied from another project of mine below is incase you want to implement JWT tokens over Sessions */
// axios.interceptors.request.use((req: AxiosRequestConfig) => {
//   req.headers.authorization = `Bearer ${API.accessToken}`;
//   return req;
// });

// axios.interceptors.response.use(
//   (res) => {
//     // Important: response interceptors **must** return the response.

//     return res;
//   },
//   async (err) => {
//     const originalRequest = err.config;
//     const refreshExpired = originalRequest.url.includes('auth/refresh_token');

//     if (err.response.status === 401 && refreshExpired) {
//       return Promise.reject(err);
//     } else if (err.response.status === 401) {
//       originalRequest._retry = true;
//       await refreshToken('http://localhost:3000/auth/refresh_token');
//       return axios(originalRequest);
//     }

//     return Promise.reject(err);
//   }
// );
