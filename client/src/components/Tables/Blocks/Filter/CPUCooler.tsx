import CheckboxFilter from "./Checkbox";
import RadioFilter from "./Radio";
import SearchFilter from "./Search";
import SliderFilter from "./Slider";

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
    <div className="grid w-[--filter-width] gap-4">
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
        id={"cpuSockets"}
        name="CPU SOCKET"
        options={checkboxOptions[0]}
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
        units="mm"
        min={45}
        max={170}
        step={5}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
}
