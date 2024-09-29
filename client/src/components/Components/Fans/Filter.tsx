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
        min={0}
        max={170}
        step={10}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"size"}
        units=" mm"
        min={80}
        max={140}
        step={2}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"quantity"}
        min={1}
        max={3}
        step={1}
        setColumnFilters={setColumnFilters}
        minStepsBetweenThumbs={0}
      />

      <CheckboxFilter
        id="color"
        options={checkboxOptions[0]}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
}
