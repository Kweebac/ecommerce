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
    <div className="grid w-[--filter-width] gap-4 text-sm sm:text-base">
      <SearchFilter
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"price"}
        units={"£"}
        min={70}
        max={580}
        step={10}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"wattage"}
        name="WATTAGE"
        units={" W"}
        min={550}
        max={1650}
        step={50}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id="rating"
        name="RATING"
        options={checkboxOptions[0]}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id="color"
        name="COLOR"
        options={checkboxOptions[1]}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
}
