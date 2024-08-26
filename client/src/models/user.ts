export interface User {
  id?: number,
  username: string,
  firstName: string,
  lastName: string,
  dob: Date | string,
  email: string,
  registrationDate?: Date | string,
}
