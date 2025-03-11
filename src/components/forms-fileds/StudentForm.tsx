import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useStudentMutation } from "@/hooks/useCreateStudent";
import { IStudent } from "@/types/student-types";
import { studentSchema } from "@/schemas/studentSchema";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const StudentForm: React.FC = () => {
  const { mutate, isPending, isError, error, isSuccess } = useStudentMutation();

  // Make sure this matches your backend API expectations
  const initialValues: IStudent = {
    rollNo: "",
    fullName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
  };

  const handleSubmit = (values: IStudent) => {
    console.log("Submitting values:", values); // Add logging to debug
    mutate(values);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Student Registration Form</CardTitle>
        <CardDescription>
          Enter student details to complete registration
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isSuccess && (
          <Alert className="mb-6 bg-green-50 text-green-900">
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Student successfully registered!
            </AlertDescription>
          </Alert>
        )}

        {isError && (
          <Alert className="mb-6 bg-red-50 text-red-900">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error?.message || "An error occurred while registering the student."}
            </AlertDescription>
          </Alert>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(studentSchema)}
          onSubmit={(values, actions) => {
            handleSubmit(values);
            // Don't reset form immediately to allow backend response
            if (isSuccess) {
              actions.resetForm();
            }
          }}
          enableReinitialize
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-lg font-medium mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Roll No Field */}
                <div>
                  <label
                    htmlFor="rollNo"
                    className="block text-sm font-medium"
                  >
                    Roll No <span className="text-red-500">*</span>
                  </label>
                  <Field name="rollNo">
                    {({ field, meta }: FieldProps) => (
                      <Input
                        {...field}
                        placeholder="Enter roll number"
                        className={
                          meta.touched && meta.error ? "border-red-500" : ""
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="rollNo"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
                
                {/* Full Name Field */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Field name="fullName">
                    {({ field, meta }: FieldProps) => (
                      <Input
                        {...field}
                        placeholder="Enter full name"
                        className={
                          meta.touched && meta.error ? "border-red-500" : ""
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
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

              {/* Age Field */}
              <div>
                <label htmlFor="age" className="block text-sm font-medium">
                  Age <span className="text-red-500">*</span>
                </label>
                <Field name="age">
                  {({ field, meta }: FieldProps) => (
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter age"
                      className={
                        meta.touched && meta.error ? "border-red-500" : ""
                      }
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="age"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium">
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
                <label htmlFor="gender" className="block text-sm font-medium">
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

              {/* Submit Button */}
              <CardFooter className="flex justify-end px-0 pt-6">
                <Button type="submit" disabled={isPending || isSubmitting}>
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isPending ? "Submitting..." : "Register Student"}
                </Button>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};