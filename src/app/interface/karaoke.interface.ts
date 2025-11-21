export interface Song {
  numberOnList: number;
  songName: string;
  artistName: string;
  userName: string;
}

export interface HistoryItem extends Song {
  date: string;
  time: string;
}

export interface FormStructure {
  userName: string,
  userLastName: string,
  songName: string,
  artistName: string
}

export interface FormSettings {
  showTitle: boolean;
  showDescription: boolean;
  title?: string;
  description?: string;
}
