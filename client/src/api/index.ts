import axios from 'axios';
import { APIOptions } from '../utils/types';
import { UserAPI } from './UserAPI';
import { API } from './utils/BaseAPI';

export default class MusicWrappedAPI {
  constructor(private apiURL: string, private options?: APIOptions) {
    if (this.options) {
      API.options = this.options;
    }

    if (this.apiURL.endsWith('/')) {
      this.apiURL = this.apiURL.slice(0, this.apiURL.length - 2);
    }
  }

  public User = new UserAPI(this.apiURL);

  public async Login() {
    axios.defaults.withCredentials = true;
    // const loginURL = `${this.apiURL}/auth/spotify`;
    const loginURL = `${this.apiURL}/`;

    const transport = axios.create({
      withCredentials: true,
    });

    transport.defaults.withCredentials = true;

    try {
      const data = (await transport.get(loginURL)).data;
      return data;
    } catch (e: any) {
      console.error(e);
      return null;
    }
  }
}
