export interface IUser {
  firstName: string;
  lastName: string;
  role: UserRole;
  branchId: string | undefined;
}

export enum UserRole {
  Admin = "admin",
  SuperAdmin = "super_admin",
  Student = "student",
  Teacher = "teacher",
}
