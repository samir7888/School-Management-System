import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchInput from "@/components/SearchInput";

export const FilterStudents = () => {
  return (
    <div className="flex gap-3">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Search By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="firstName">Name</SelectItem>
        </SelectContent>
      </Select>
      <SearchInput />
    </div>
  );
};
