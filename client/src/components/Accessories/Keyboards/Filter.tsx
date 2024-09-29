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
        min={0}
        max={600}
        step={10}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id={"style"}
        options={checkboxOptions[0]}
        setColumnFilters={setColumnFilters}
      />

      <RadioFilter
        id={"mechanical"}
        options={radioOptions[0]}
        setColumnFilters={setColumnFilters}
      />

      <RadioFilter
        id={"tenkeyless"}
        options={radioOptions[1]}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id={"wireless"}
        options={checkboxOptions[1]}
        setColumnFilters={setColumnFilters}
      />

      <RadioFilter
        id={"rgb"}
        options={radioOptions[2]}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id={"color"}
        options={checkboxOptions[2]}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
}
