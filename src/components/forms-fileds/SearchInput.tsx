import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";

export const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [debouncedSearch] = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (!debouncedSearch) {
      searchParams.delete("search");
    } else {
      searchParams.set("search", debouncedSearch);
    }
    setSearchParams(searchParams);
  }, [debouncedSearch]);

  return (
    <div>
      <Input
        className="w-[200px]"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
