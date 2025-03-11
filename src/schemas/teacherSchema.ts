import { bloodGroup } from '@/types/teacher-types';
import { z } from 'zod';

 export interface IData{
    id:string;
    name:string
}

// Allowance schema
const AllowanceSchema = z.object({
  amount: z.number().nonnegative("Allowance amount must be non-negative"),
  title: z.string().min(1, "Allowance title is required")
});

// Helper function to convert YYYY-MM-DD to ISO format
const dateStringToISO = (dateStr: string): string => {
  if (!dateStr) return "";
  // If it's already in ISO format, return as is
  if (dateStr.includes('T')) return dateStr;
  // Otherwise, convert YYYY-MM-DD to YYYY-MM-DDT00:00:00Z
  return `${dateStr}T00:00:00Z`;
};

// Teacher creation schema
export const CreateTeacherSchema = z.object({
  // Personal information
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Gender must be 'male', 'female', or 'other'" })
  }),
  dob: z.string()
    .refine(val => val.length > 0, "Date of birth is required")
    .transform(dateStringToISO)
    .pipe(z.string().datetime())
    .refine(
      (date) => new Date(date) < new Date(),
      { message: "Date of birth must be in the past" }
    ),
  bloodGroup: z.nativeEnum(bloodGroup, {
    errorMap: () => ({ message: "Invalid blood group" })
  }),
  shortDescription: z.string().max(500, "Description cannot exceed 500 characters"),
  
  // Contact information
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number format"),
  
  // Employment information
  joinedDate: z.string()
    .refine(val => val.length > 0, "Join date is required")
    .transform(dateStringToISO)
    .pipe(z.string().datetime()),
  qualification: z.string().min(1, "Qualification is required"),
  basicSalary: z.number().positive("Basic salary must be a positive number"),
  facultyIds: z.array(z.string()).min(1, "At least one faculty must be selected"),
  allowances: z.array(AllowanceSchema).optional(),
  
  // Profile image
  profileImageId: z.string().optional(),
  
  // Banking information
  bankName: z.string().min(1, "Bank name is required"),
  accountName: z.string().min(1, "Account name is required"),
  accountNumber: z.string().regex(/^[0-9]+$/, "Account number must contain only digits")
}).refine(
  (data) => {
    // Ensure date of birth is before join date
    const dobDate = new Date(data.dob);
    const joinedDate = new Date(data.joinedDate);
    return dobDate < joinedDate;
  },
  {
    message: "Date of birth must be before join date",
    path: ["dob"]
  }
);

// Type inference from the schema
export type CreateTeacherInput = z.infer<typeof CreateTeacherSchema>;