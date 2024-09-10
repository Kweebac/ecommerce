import CheckboxFilter from "../../Filter/Checkbox";
import SearchFilter from "../../Filter/Search";
import SliderFilter from "../../Filter/Slider";

type FilterProps = {
  columnFilters: [{ id: string; value: string }];
  setColumnFilters: (value: React.SetStateAction<never[]>) => void;
  checkboxOptions: string[];
};

export default function Filter({
  columnFilters,
  setColumnFilters,
  checkboxOptions,
}: FilterProps) {
  return (
    <div className="grid w-[--filter-width] gap-4">
      <SearchFilter
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id="chipset"
        options={checkboxOptions}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"price"}
        min={250}
        max={2500}
        setColumnFilters={setColumnFilters}
        minStepsBetweenThumbs={1}
      />

      <SliderFilter
        id={"memory"}
        name={"MEMORY"}
        min={8}
        max={24}
        step={4}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"coreClock"}
        name={"CORE CLOCK"}
        min={1700}
        max={2550}
        setColumnFilters={setColumnFilters}
        minStepsBetweenThumbs={2}
      />

      <SliderFilter
        id={"boostClock"}
        name={"BOOST CLOCK"}
        min={2430}
        max={2830}
        setColumnFilters={setColumnFilters}
        minStepsBetweenThumbs={2}
      />

      <SliderFilter
        id={"length"}
        min={163}
        max={358}
        step={10}
        setColumnFilters={setColumnFilters}
        minStepsBetweenThumbs={1}
      />

      <SliderFilter
        id={"tdp"}
        min={115}
        max={450}
        step={10}
        setColumnFilters={setColumnFilters}
        minStepsBetweenThumbs={2}
      />
    </div>
  );
}
