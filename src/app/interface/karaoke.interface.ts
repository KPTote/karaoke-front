export interface Song{
  numberOnList: number;
  songName: string;
  artistName: string;
  userName: string;
}

export interface HistoryItem extends Song{
  date: string;
  time: string;
}
