export interface ILogin {
  email: string;
  password: string;
}
export enum UserRole {
  SuperAdmin = 'SuperAdmin',
  SystemUser = 'SystemUser',
}
