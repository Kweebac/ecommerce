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
    <div className="grid w-[--filter-width] gap-4">
      <SearchFilter
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id={"price"}
        units={"£"}
        min={100}
        max={1150}
        step={10}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id="screenSize"
        name="SCREEN SIZE"
        units='"'
        min={21.5}
        max={55}
        step={1}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id="resolution"
        options={checkboxOptions[0]}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id="refreshRate"
        name="REFRESH RATE"
        units=" Hz"
        min={60}
        max={540}
        step={15}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id="responseTime"
        name="RESPONSE TIME"
        units=" ms"
        min={0.2}
        max={5}
        step={1}
        minStepsBetweenThumbs={0}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id="panelType"
        name="PANEL"
        options={checkboxOptions[1]}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id="frameSync"
        name="FRAME SYNC"
        options={checkboxOptions[2]}
        setColumnFilters={setColumnFilters}
      />

      <SliderFilter
        id="brightness"
        units=" cd/m²"
        min={250}
        max={1000}
        setColumnFilters={setColumnFilters}
      />

      <RadioFilter
        id="speakers"
        options={radioOptions[0]}
        setColumnFilters={setColumnFilters}
      />

      <RadioFilter
        id="curved"
        options={radioOptions[1]}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
}
