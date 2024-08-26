export interface UserById {
  username: string;
  city: string;
  state: string;
  createdDate: Date | string;
}

export interface UserByIdResponse {
  user: UserById | null;
  error: string | null;
}
