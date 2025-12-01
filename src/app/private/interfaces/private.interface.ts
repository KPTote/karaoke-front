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

export interface LoginResponse {
  email: string;
  token: string;
}

export interface EditSongRes {
  message: string;
  updateSong: any;
}

export interface ClearPlaylistRes {
  message: string;
  clearPlaylist: any;
}
