export interface JwtPayload {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    dob: Date | string;
    email: string;
    registrationDate: Date | string;
    iat: Date | number;
    exp: Date | number;
    aud: string;
    iss: string;
    sub: string;
  }