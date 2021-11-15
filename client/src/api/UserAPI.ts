import { API } from './utils/BaseAPI';

export class UserAPI extends API {
  constructor(apiUrl: string) {
    super(`${apiUrl}/spotify`);
  }

  async getUser() {
    const url = this.getUrl() + '/user';

    return await this.get(url);
  }

  async getTopTracks(range: Range) {
    const url = this.getUrl() + `/top/tracks?time_range=${range}`;

    return await this.get(url);
  }

  async getTopArtists(range: Range) {
    const url = this.getUrl() + `/top/artists?time_range=${range}`;

    return await this.get(url);
  }
}

export enum Range {
  Long = 'long',
  Medium = 'medium',
  Short = 'short',
}
