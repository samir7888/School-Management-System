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

interface data {
  id:string;
  studentId: string;
  rollNo:number;
  fullName: string;
  gender: string;
  email: string;
  phone: string;
  age: number;
}

interface StudentTableProps {
  user: {
    data: data[];
  };
}

export const StudentTable: React.FC<StudentTableProps> = ({ user }) => {
  console.log(user.data)
  return (
    <>
      <Table>
        <TableCaption>A list Students.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Roll no.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Email</TableHead>
            <TableHead >Phone Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user.data.map((user: data) => (
            <TableRow key={user.id}>
              <TableCell  className="font-medium">
                {user.studentId}
              </TableCell>
              <TableCell  className="font-medium">
                {user.rollNo}
              </TableCell>
              <TableCell  className="font-medium">
                {user?.fullName}
              </TableCell>
              <TableCell  className="font-medium">
                {user.gender}
              </TableCell>
              <TableCell  className="font-medium">
                {user.email}
              </TableCell>
              <TableCell  className="font-medium">
                {user.phone}
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
