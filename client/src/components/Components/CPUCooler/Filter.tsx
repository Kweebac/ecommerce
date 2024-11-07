import CheckboxFilter from "../../Tables/Checkbox";
import RadioFilter from "../../Tables/Radio";
import SearchFilter from "../../Tables/Search";
import SliderFilter from "../../Tables/Slider";

type FilterProps = {
  columnFilters: [{ id: string; value: string }];
  setColumnFilters: (value: React.SetStateAction<never[]>) => void;
  checkboxOptions: string[][];
  radioOptions: string[][];
};

export default function Filter({
  columnFilters,
  setColumnFilters,
  checkboxOptions = [],
  radioOptions = [],
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
        min={10}
        max={340}
        step={10}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id="color"
        options={checkboxOptions[1]}
        setColumnFilters={setColumnFilters}
      />

      <RadioFilter
        id="waterCooled"
        name="WATER COOLED"
        options={radioOptions[0]}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"height"}
        units=" mm"
        min={45}
        max={170}
        step={5}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
}
