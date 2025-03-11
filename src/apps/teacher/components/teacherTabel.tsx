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
import { ITeacher } from "@/types/teacher-types";



interface StudentTableProps {
  user: {
    data: ITeacher[];
  };
}

export const TeacherTable: React.FC<StudentTableProps> = ({ user }) => {
  
  return (
    <>
      <Table>
        <TableCaption>A list Students.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Email</TableHead>
            <TableHead >Phone Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user.data.map((user: ITeacher) => (
            <TableRow key={user.id}>
              <TableCell  className="font-medium">
                {user.teacherId}
              </TableCell>
              <TableCell  className="font-medium">
                {user.firstName}
              </TableCell>
              <TableCell  className="font-medium">
                {user?.lastName}
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
