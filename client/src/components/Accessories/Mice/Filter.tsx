// @ts-nocheck

import CheckboxFilter from "../../Tables/Checkbox";
import SearchFilter from "../../Tables/Search";
import SliderFilter from "../../Tables/Slider";

type FilterProps = {
  columnFilters: [{ id: string; value: string }];
  setColumnFilters: (value: React.SetStateAction<never[]>) => void;
  checkboxOptions: string[][];
};

export default function Filter({
  columnFilters,
  setColumnFilters,
  checkboxOptions = [],
}: FilterProps) {
  return (
    <div className="grid w-[--filter-width] gap-4">
      <SearchFilter
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"price"}
        units={"£"}
        min={10}
        max={210}
        step={10}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id={"wireless"}
        options={checkboxOptions[0]}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"maxDpi"}
        name={"MAX DPI"}
        min={1000}
        max={36000}
        step={1000}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id={"color"}
        options={checkboxOptions[1]}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
}
