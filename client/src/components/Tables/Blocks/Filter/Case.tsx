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
        min={30}
        max={370}
        step={10}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id={"type"}
        options={checkboxOptions[0]}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id={"motherboardFormFactors"}
        name="MOTHERBOARD FORM FACTOR"
        options={checkboxOptions[1]}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id="color"
        options={checkboxOptions[2]}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"maxGpuLength"}
        name="MAX GPU LENGTH"
        units="mm"
        min={280}
        max={460}
        step={10}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
}
