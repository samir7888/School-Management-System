import { z } from "zod";

export const studentSchema = z.object({
  rollNo: z
    .string()
    .min(1, "Roll number is required")
    .regex(/^[A-Za-z0-9-]+$/, "Roll number must contain only letters, numbers, and hyphens"),
  
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be less than 50 characters")
    .regex(/^[A-Za-z\s.]+$/, "Name must contain only letters, spaces, and periods"),
  
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10,15}$/, "Phone number must be between 10-15 digits"),
  
  age: z
    .string()
    .min(1, "Age is required")
    .refine((val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 5 && num <= 100;
    }, "Age must be between 5 and 100"),
  
  gender: z
    .string()
    .min(1, "Gender is required")
    .refine((val) => ["male", "female", "other"].includes(val), "Please select a valid gender option")
});