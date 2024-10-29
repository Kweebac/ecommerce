// @ts-nocheck

import { SearchIcon } from "../Icons";

type SearchFilterProps = {
  columnFilters: [{ id: string; value: string }];
  setColumnFilters: (value: React.SetStateAction<never[]>) => void;
};

export default function SearchFilter({
  columnFilters,
  setColumnFilters,
}: SearchFilterProps) {
  const value = columnFilters.find((item) => item.id === "name")?.value;

  function handleSearchChange(id, value) {
    setColumnFilters((prev) =>
      prev.filter((filter) => filter.id !== id).concat({ id, value }),
    );
  }

  return (
    <div className="flex gap-1">
      <SearchIcon styles="h-6 w-6" />
      <input
        type="text"
        value={value}
        onChange={(e) => handleSearchChange("name", e.target.value)}
        className="mb-2 w-full rounded-md border border-gray-300 px-1.5 outline-none focus:border-green-3"
      />
    </div>
  );
}
