export interface IUser {
  access_token: string;
  firstName?: string;
  lastName?: string;
  role: string;
}

export enum UserRole {
  Admin = 'admin',
  SuperAdmin = 'super_admin',
  Student = 'student',
  Teacher = 'teacher'
}