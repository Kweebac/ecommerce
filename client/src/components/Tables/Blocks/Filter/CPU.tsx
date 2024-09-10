import CheckboxFilter from "./Checkbox";
import RadioFilter from "./Radio";
import SearchFilter from "./Search";
import SliderFilter from "./Slider";

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
        id={"series"}
        options={checkboxOptions[0]}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"price"}
        units="£"
        min={50}
        max={700}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"cores"}
        min={4}
        max={24}
        step={2}
        setColumnFilters={setColumnFilters}
        minStepsBetweenThumbs={0}
      />

      <SliderFilter
        id={"pCoreClock"}
        name={"CORE CLOCK"}
        units="GHz"
        min={3}
        max={4.7}
        step={0.1}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"pBoostClock"}
        name={"BOOST CLOCK"}
        units="GHz"
        min={3.6}
        max={6}
        step={0.1}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"tdp"}
        units="W"
        min={65}
        max={170}
        step={10}
        setColumnFilters={setColumnFilters}
      />

      <RadioFilter
        id="integratedGraphics"
        name="INTEGRATED GRAPHICS"
        options={checkboxOptions[1]}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
}
