import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";

export const FilterStudents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Persisting state from URL
  const [searchBy, setSearchBy] = useState(searchParams.get("searchBy") || "firstName");
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

  // Capitalize first letter
  const formattedSearchValue = searchValue.length > 0
    ? searchValue.charAt(0).toUpperCase() + searchValue.slice(1)
    : "";

  // Debounce input to avoid excessive requests
  const [debounceSearch] = useDebounce(formattedSearchValue, 1000);

  // Update URL when filter changes
  useEffect(() => {
    setSearchParams({ searchBy, search: debounceSearch });
  }, [searchBy, debounceSearch]);

  return (
    <div className="flex gap-3">
      <Select onValueChange={setSearchBy} defaultValue={searchBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Search By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="firstName">Name</SelectItem>
          <SelectItem value="class">Class Name</SelectItem>
        </SelectContent>
      </Select>

      {searchBy && (
        <Input
          className="w-[200px]"
          placeholder={`Search by ${searchBy}`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      )}
    </div>
  );
};
