import axios from 'axios';
import { APIOptions } from '../utils/types';
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

  public async getUser() {
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

  public async tracksTest() {
    const token =
      'BQDHsFbSO8ObPfxjItkGMMYNbaKYAg9FxmIV1YgsPpNcR60XBz_j75FN2P51AGtnNquMmh9EMN5oh63yULRrWjHUPAYshAAg-Y-bNDucrzIc9thc9zrHoqr4AHSN1sTQ2oGQr4siEui_OBXPMpQ5zJCr4urBiQ-RBsWx-BNQU34x1GRu1tnjDDtgXuE';
    try {
      const data = (
        await axios.get('https://api.spotify.com/v1/me/top/tracks', {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).data;

      return data;
    } catch (e: any) {
      console.error(e);
      return null;
    }
  }
}
