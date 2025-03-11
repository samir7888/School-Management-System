import React, { useState } from "react";
import { BASEURL } from "@/utils/constant";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/hooks/useAuth";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandInput, CommandItem } from "../ui/command";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import {  useFormikContext } from "formik";
import { IFacultyOption } from "@/types/user";
import { CommandGroup, CommandList } from "cmdk";

export const useGetFacultyOptions = () => {
  const axiosInstance = useAxiosAuth();
  return useQuery({
    queryKey: ["faculties"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get<IFacultyOption[]>(
          `${BASEURL}/faculties/options`
        );
        // Ensure we're returning an array, even if res.data is undefined
        return res.data || [];
      } catch (error) {
        console.error(error);
        // Return an empty array instead of throwing an error
        return [];
      }
    },
    placeholderData: keepPreviousData,
    // Add this to specify initial data if the query hasn't run yet
    initialData: [],
  });
};

const SelectFaculties = () => {
  const { data } = useGetFacultyOptions();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const formik = useFormikContext();

  const handleSelect = (faculty: IFacultyOption) => {
    setSelected((current) => {
      // If already selected, remove it from the array
      if (current.includes(faculty.id)) {
        const newValue = current.filter(id => id !== faculty.id);
        formik.setFieldValue("facultyIds", newValue);
        return newValue;
      }
      // Otherwise, add it to the array
      const newValue = [...current, faculty.id];
      console.log(newValue)
      formik.setFieldValue("facultyIds", newValue);
      return newValue;
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
              {selected.length > 0 ? (data.filter((i)=> selected.includes(i.id)).map((i)=>i.name).join(', ')):(<div>Select Faculties</div>)}
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <ScrollArea className="max-h-60">
            <CommandGroup>
              {data.map((faculty) => (
                <CommandList>
                  <CommandItem
                    key={faculty.id}
                    onSelect={() => handleSelect(faculty)}
                    className="cursor-pointer flex items-center"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected.includes(faculty.id) 
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {faculty.name}
                  </CommandItem>
                </CommandList>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectFaculties;
