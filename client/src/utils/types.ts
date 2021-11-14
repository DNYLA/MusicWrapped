import { Range } from '../api/UserAPI';

export type APIOptions = {
  debug?: boolean;
};

export type User = {
  id: string;
  username: string;
  displayName: string;
  photoUrl: string;
  refreshToken: string;
  accessToken: string;
  expires_in: number;
};

export type Song = {
  id: string;
  name: string;
  songRanking: SongRanking[];
};

export type SongRanking = {
  id: string;
  currentRank: number;
  previousRank: number;
  song: Song;
  User: User;
  range: Range;
};
