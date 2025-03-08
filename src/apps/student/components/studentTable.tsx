import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: number;
  firstName: string;
  gender: string;
  email: string;
  phone: string;
  age: number;
}

interface StudentTableProps {
  user: {
    users: User[];
  };
}

export const StudentTable: React.FC<StudentTableProps> = ({ user }) => {
  return (
    <>
      <Table>
        <TableCaption>A list Users.</TableCaption>
        <TableHeader className="">
          <TableRow className="">
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>FirstName</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>email</TableHead>
            <TableHead className="">phone number</TableHead>
            <TableHead className="">age</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user.users.map((user: User, id: number) => (
            <TableRow>
              <TableCell key={id} className="font-medium">
                {user.id}
              </TableCell>
              <TableCell key={id} className="font-medium">
                {user.firstName}
              </TableCell>
              <TableCell key={id} className="font-medium">
                {user.gender}
              </TableCell>
              <TableCell key={id} className="font-medium">
                {user.email}
              </TableCell>
              <TableCell key={id} className="font-medium">
                {user.phone}
              </TableCell>
              <TableCell key={id} className="font-medium">
                {user.age}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
