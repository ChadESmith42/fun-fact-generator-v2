import { error } from "console";

export interface RegisterUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: Date | string;
  email: string;
  registrationDate: Date | string;
}

export interface RegisterUserResponse {
  user: RegisterUser | null;
  error: string | null;
}
