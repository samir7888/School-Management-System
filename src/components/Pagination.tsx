import { Button } from "./ui/button";
import { IMeta } from "@/types/user";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type PaginationProps = {
  meta: IMeta;
};

export const Pagination = ({ meta }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get("page")) || 1;
  return (
    <div className="flex">
      <div>
        <Select
          onValueChange={(value) => {
            searchParams.set("take", value);
            setSearchParams(searchParams);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Take" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-5">
        <Button
          disabled={!meta.hasPreviousPage}
          onClick={() => {
            searchParams.set("page", String(pageNumber - 1));
            setSearchParams(searchParams);
          }}
        >
          PREV
        </Button>
        <span>{pageNumber}</span>
        <Button
          disabled={!meta.hasNextPage}
          onClick={() => {
            searchParams.set("page", String(pageNumber + 1));
            setSearchParams(searchParams);
          }}
        >
          NEXT
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
