import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import {
  CreateTeacherInput,
  CreateTeacherSchema,
} from "@/schemas/teacherSchema";
import {
  bloodGroup,
  ITeacherCreateRequest,
  MaritalStatus,
} from "@/types/teacher-types";
import { useTeacherMutation } from "@/hooks/useCreateTeacher";

// Import ShadCN UI components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectFaculties from "./SelectFaculties";
const initialValues: Partial<ITeacherCreateRequest> = {
  firstName: "Hari",
  lastName: "Prasad",
  email: "hari@gmail.com",
  phone: "98008989877",
  gender: "male",
  dob: "1976-12-01",
  joinedDate: "2024-12-01",
  basicSalary: 10000,
  qualification: "BCA",
  shortDescription: "Hey there",
  bloodGroup: bloodGroup.AB_Negative,
  maritalStatus: MaritalStatus.MARRIED,
  bankName: "Nabil",
  accountName: "Hari prasad",
  accountNumber: "99899999899",
  facultyIds: [],
  allowances: [],
};
export const TeacherForm: React.FC = () => {
  const { mutate, isPending, isError, error, isSuccess } = useTeacherMutation();
  // Initial values that match the schema requirements
 

  const handleSubmit = (values: CreateTeacherInput) => {
    console.log("Submitting teacher values:", values);
    mutate({...values,branchId:"9dd80040-7774-42d8-a589-ce90f65a349d"});
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Teacher Registration Form</CardTitle>
        <CardDescription>
          Enter teacher details to complete registration
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isSuccess && (
          <Alert className="mb-6 bg-green-50 text-green-900">
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Teacher successfully registered!
            </AlertDescription>
          </Alert>
        )}

        {isError && (
          <Alert className="mb-6 bg-red-50 text-red-900">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error?.message ||
                "An error occurred while registering the teacher."}
            </AlertDescription>
          </Alert>
        )}

        <Formik
         initialValues:initialValues
          validationSchema={toFormikValidationSchema(CreateTeacherSchema)}
          onSubmit={(values: CreateTeacherInput, actions) => {
            handleSubmit(values);
            // Don't reset form immediately to allow backend response
            if (isSuccess) {
              actions.resetForm();
            }
          }}
          enableReinitialize
        >
          {({ isSubmitting, handleSubmit }) => {
            return (
              <Form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-lg font-medium mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name Field */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <Field name="firstName">
                      {({ field, meta }: FieldProps) => (
                        <Input
                          {...field}
                          placeholder="Enter first name"
                          className={
                            meta.touched && meta.error ? "border-red-500" : ""
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  {/* Last Name Field */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium"
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <Field name="lastName">
                      {({ field, meta }: FieldProps) => (
                        <Input
                          {...field}
                          placeholder="Enter last name"
                          className={
                            meta.touched && meta.error ? "border-red-500" : ""
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Field name="email">
                      {({ field, meta }: FieldProps) => (
                        <Input
                          type="email"
                          {...field}
                          placeholder="Enter email address"
                          className={
                            meta.touched && meta.error ? "border-red-500" : ""
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  {/* Phone Number Field */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <Field name="phone">
                      {({ field, meta }: FieldProps) => (
                        <Input
                          type="text"
                          {...field}
                          placeholder="Enter phone number"
                          className={
                            meta.touched && meta.error ? "border-red-500" : ""
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  {/* Gender Field */}
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium"
                    >
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <Field name="gender">
                      {({ field, form }: FieldProps) => (
                        <Select
                          value={field.value}
                          onValueChange={(value) =>
                            form.setFieldValue(field.name, value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  {/* Blood Group Field */}
                  <div>
                    <label
                      htmlFor="bloodGroup"
                      className="block text-sm font-medium"
                    >
                      Blood Group <span className="text-red-500">*</span>
                    </label>
                    <Field name="bloodGroup">
                      {({ field, form }: FieldProps) => (
                        <Select
                          value={field.value}
                          onValueChange={(value) =>
                            form.setFieldValue(field.name, value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Blood Group" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage
                      name="bloodGroup"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                  {/*Marital status Field */}
                  <div>
                    <label
                      htmlFor="maritalStatus"
                      className="block text-sm font-medium"
                    >
                      Marital Status <span className="text-red-500">*</span>
                    </label>
                    <Field name="maritalStatus">
                      {({ field, form }: FieldProps) => (
                        <Select
                          value={field.value}
                          onValueChange={(value) =>
                            form.setFieldValue(field.name, value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder=" Select maritalStatus" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Windowed</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage
                      name="maritalStatus"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  {/* Date of Birth Field */}
                  <div>
                    <label htmlFor="dob" className="block text-sm font-medium">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <Field name="dob">
                      {({ field, meta }: FieldProps) => (
                        <Input
                          type="date"
                          {...field}
                          className={
                            meta.touched && meta.error ? "border-red-500" : ""
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="dob"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  {/* Join Date Field */}
                  <div>
                    <label
                      htmlFor="joinedDate"
                      className="block text-sm font-medium"
                    >
                      Join Date <span className="text-red-500">*</span>
                    </label>
                    <Field name="joinedDate">
                      {({ field, meta }: FieldProps) => (
                        <Input
                          type="date"
                          {...field}
                          className={
                            meta.touched && meta.error ? "border-red-500" : ""
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="joinedDate"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-medium mb-4">
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Qualification Field */}
                  <div>
                    <label
                      htmlFor="qualification"
                      className="block text-sm font-medium"
                    >
                      Qualification <span className="text-red-500">*</span>
                    </label>
                    <Field name="qualification">
                      {({ field, meta }: FieldProps) => (
                        <Input
                          {...field}
                          placeholder="Enter qualification"
                          className={
                            meta.touched && meta.error ? "border-red-500" : ""
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="qualification"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  {/* Basic Salary Field */}
                  <div>
                    <label
                      htmlFor="basicSalary"
                      className="block text-sm font-medium"
                    >
                      Basic Salary <span className="text-red-500">*</span>
                    </label>
                    <Field name="basicSalary">
                      {({ field, meta }: FieldProps) => (
                        <Input
                          type="number"
                          {...field}
                          placeholder="Enter basic salary"
                          className={
                            meta.touched && meta.error ? "border-red-500" : ""
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="basicSalary"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div>
                    <SelectFaculties />

                    <ErrorMessage
                      name="facultyIds"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  {/* Short Description Field - Spans full width */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="shortDescription"
                      className="block text-sm font-medium"
                    >
                      Short Description <span className="text-red-500">*</span>
                    </label>
                    <Field name="shortDescription">
                      {({ field, meta }: FieldProps) => (
                        <Textarea
                          {...field}
                          placeholder="Enter a short description"
                          className={
                            meta.touched && meta.error ? "border-red-500" : ""
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="shortDescription"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-medium mb-4">
                  Banking Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Bank Name Field */}
                  <div>
                    <label
                      htmlFor="bankName"
                      className="block text-sm font-medium"
                    >
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <Field name="bankName">
                      {({ field, meta }: FieldProps) => (
                        <Input
                          {...field}
                          placeholder="Enter bank name"
                          className={
                            meta.touched && meta.error ? "border-red-500" : ""
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="bankName"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  {/* Account Name Field */}
                  <div>
                    <label
                      htmlFor="accountName"
                      className="block text-sm font-medium"
                    >
                      Account Name <span className="text-red-500">*</span>
                    </label>
                    <Field name="accountName">
                      {({ field, meta }: FieldProps) => (
                        <Input
                          {...field}
                          placeholder="Enter account name"
                          className={
                            meta.touched && meta.error ? "border-red-500" : ""
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="accountName"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  {/* Account Number Field */}
                  <div>
                    <label
                      htmlFor="accountNumber"
                      className="block text-sm font-medium"
                    >
                      Account Number <span className="text-red-500">*</span>
                    </label>
                    <Field name="accountNumber">
                      {({ field, meta }: FieldProps) => (
                        <Input
                          {...field}
                          placeholder="Enter account number"
                          className={
                            meta.touched && meta.error ? "border-red-500" : ""
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="accountNumber"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <CardFooter className="flex justify-end px-0 pt-6">
                  <Button type="submit" disabled={isPending || isSubmitting}>
                    {isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isPending ? "Submitting..." : "Register Teacher"}
                  </Button>
                </CardFooter>
              </Form>
            );
          }}
        </Formik>
      </CardContent>
    </Card>
  );
};
