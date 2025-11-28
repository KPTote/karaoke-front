export interface WSocketRes {
  type: string;
  payload: Payload;
}

export interface Payload {
  userName: string;
  songName: string;
  artistName: string;
  numberOnList: number;
}

export interface AddSongRequest {
  numberOnList: number;
  userName: string;
  songName: string;
  artistName: string;
}

export interface PlaylistRes {
  artistName: string;
  date: string;
  numberOnList: number;
  songName: string;
  userName: string;
}
