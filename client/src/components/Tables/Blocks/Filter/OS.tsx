import CheckboxFilter from "./Checkbox";
import SearchFilter from "./Search";
import SliderFilter from "./Slider";

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
        min={90}
        max={130}
        step={5}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
}
