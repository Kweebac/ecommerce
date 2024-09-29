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
        max={720}
        step={20}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"wattage"}
        units={" W"}
        min={0}
        max={260}
        step={5}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"power"}
        units={" W"}
        min={0}
        max={130}
        step={5}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id="color"
        options={checkboxOptions[0]}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
}
