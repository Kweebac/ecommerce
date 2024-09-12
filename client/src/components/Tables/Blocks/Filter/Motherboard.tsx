import CheckboxFilter from "./Checkbox";
import SearchFilter from "./Search";
import SliderFilter from "./Slider";

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
        min={50}
        max={710}
        step={25}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id={"chipset"}
        options={checkboxOptions[0]}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id={"formFactor"}
        name="FORM FACTOR"
        options={checkboxOptions[1]}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id={"cpuSocket"}
        name="CPU SOCKET"
        options={checkboxOptions[2]}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id={"ramDdr"}
        name="RAM"
        options={checkboxOptions[3]}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id={"wifi"}
        name="WI-FI"
        options={checkboxOptions[4]}
        setColumnFilters={setColumnFilters}
      />

      <CheckboxFilter
        id={"color"}
        options={checkboxOptions[5]}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
}
