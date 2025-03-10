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

export interface IMeta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
