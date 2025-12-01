export interface UserFormFields {
  id: string;
  name: string;
  label: string;
  controlName: string;
  error: string;
  patternError: string;
};


export interface AddSongResponse {
  message: string;
  song: string;
  user: string;
  numberOnList: number;
}
