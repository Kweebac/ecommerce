import CheckboxFilter from "../../Tables/Checkbox";
import RadioFilter from "../../Tables/Radio";
import SearchFilter from "../../Tables/Search";
import SliderFilter from "../../Tables/Slider";

type FilterProps = {
  columnFilters: [{ id: string; value: string }];
  setColumnFilters: (value: React.SetStateAction<never[]>) => void;
  radioOptions: string[][];
  checkboxOptions: string[][];
};

export default function Filter({
  columnFilters,
  setColumnFilters,
  radioOptions = [],
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
        units="£"
        min={50}
        max={700}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id={"series"}
        options={checkboxOptions[0]}
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
        units=" GHz"
        min={3}
        max={4.7}
        step={0.1}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"pBoostClock"}
        name={"BOOST CLOCK"}
        units=" GHz"
        min={3.6}
        max={6}
        step={0.1}
        setColumnFilters={setColumnFilters}
      />

      <RadioFilter
        id="integratedGraphics"
        name="INTEGRATED GRAPHICS"
        options={radioOptions[0]}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id="socket"
        options={checkboxOptions[1]}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
}
