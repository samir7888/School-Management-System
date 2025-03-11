// src/types/teacher-types.ts

// Define the profile image type
export interface IProfileImage {
  id: string;
  url: string;
}

// Define the account type
export interface IAccount {
  id: string;
  verifiedAt: string | null;
  profileImage: IProfileImage;
}

// Define the faculty type
export interface IFaculty {
  id: string;
  name: string;
}

// Define the main teacher type
export interface ITeacher {
  id: string;
  createdAt: string;
  teacherId: number;
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "other";
  email: string;
  phone: string;
  dob: string;
  joinedDate: string;
  account: IAccount;
  faculties: IFaculty[];
}
export enum bloodGroup {
  A_Positive = "A+",
  B_Positive = "B+",
  AB_Positive = "AB+",
  O_Positive = "O+",
  A_Negative = "A-",
  B_Negative = "B-",
  AB_Negative = "AB-",
  O_Negative = "O-",
}
export enum MaritalStatus {
  SINGLE = "single",
  MARRIED = "married",
  DIVORCED = "divorced",
  WIDOWED = "widowed",
}
type AllowanceDto = {
  amount: number; // or the appropriate type
  title: string; // or the appropriate type
};

// Create a type for teacher creation/update requests (omitting auto-generated fields)
export type ITeacherCreateRequest = Omit<
  ITeacher,
  "id" | "createdAt" | "account" | "faculties" | "teacherId"
> & {
  facultyIds: string[];
  allowances?: AllowanceDto[];
  basicSalary: number;
  profileImageId?: string;
  qualification: string;
  shortDescription: string;
  bloodGroup: bloodGroup;
  bankName: string;
  maritalStatus:MaritalStatus;
  accountName: string;
  accountNumber: string;
};

// Create a type for displaying teacher in lists (with fewer fields)
export interface ITeacherListItem {
  id: string;
  teacherId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  faculties: IFaculty[];
  profileImageUrl?: string;
}
