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
        id={"pricePerGb"}
        name="PRICE / GB"
        units={"£"}
        min={1.5}
        max={7}
        step={0.1}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"price"}
        units={"£"}
        min={30}
        max={280}
        step={10}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id="modules"
        options={checkboxOptions[0]}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id="ddr"
        name="TYPE"
        options={checkboxOptions[1]}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"ddrSpeed"}
        name="SPEED"
        min={3200}
        max={8000}
        step={200}
        minStepsBetweenThumbs={0}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"fwl"}
        name="FWL"
        units=" ns"
        min={8.5}
        max={10}
        step={0.1}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"cl"}
        name="CL"
        min={14}
        max={38}
        step={1}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id="color"
        options={checkboxOptions[2]}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
}
