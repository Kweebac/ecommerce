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
        min={250}
        max={2500}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id={"chipset"}
        options={checkboxOptions[0]}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"memory"}
        name={"MEMORY"}
        units="GB"
        min={8}
        max={24}
        step={4}
        setColumnFilters={setColumnFilters}
        minStepsBetweenThumbs={0}
      />

      <SliderFilter
        id={"coreClock"}
        name={"CORE CLOCK"}
        units="MHz"
        min={1700}
        max={2550}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"boostClock"}
        name={"BOOST CLOCK"}
        units="MHz"
        min={2430}
        max={2830}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id="color"
        options={checkboxOptions[1]}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"length"}
        units="mm"
        min={163}
        max={358}
        step={10}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
}
