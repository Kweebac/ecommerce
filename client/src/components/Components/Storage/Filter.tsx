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
        id={"pricePerGb"}
        name="PRICE / GB"
        units={"£"}
        min={0.01}
        max={0.4}
        step={0.01}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"price"}
        units={"£"}
        min={20}
        max={420}
        step={10}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id="type"
        name="TYPE"
        options={checkboxOptions[0]}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"capacity"}
        name="CAPACITY"
        units={" GB"}
        min={128}
        max={4096}
        step={128}
        setColumnFilters={setColumnFilters}
        minStepsBetweenThumbs={0}
      />
    </div>
  );
}
