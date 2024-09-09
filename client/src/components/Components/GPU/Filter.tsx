import { useState } from "react";
import { SearchIcon } from "../../Icons";
import { Slider } from "../shadcn";

type CheckboxInputProps = {
  id: string;
  value: string;
  setColumnFilters: (value: React.SetStateAction<never[]>) => void;
};

function CheckboxInput({ id, value, setColumnFilters }: CheckboxInputProps) {
  function handleClick(isActive) {
    setColumnFilters((prev) => {
      const existingFilters = prev.find((filter) => filter.id === id)?.value;

      if (!existingFilters) return prev.concat({ id, value: [value] });
      const test = prev.filter((f) => f.id === id);
      if (test && existingFilters.length === 1 && !isActive)
        return prev.filter((f) => f.id !== id);

      return prev.map((f) =>
        f.id === id
          ? {
              ...f,
              value: isActive
                ? existingFilters.concat([value])
                : existingFilters.filter((g) => g !== value),
            }
          : f,
      );
    });
  }

  return (
    <label className="flex cursor-pointer items-center gap-1.5">
      <input
        type="checkbox"
        onClick={(e) => handleClick(e.target.checked)}
        className="cursor-pointer"
      />{" "}
      {value}
    </label>
  );
}

function RangeInput({
  min,
  max,
  defaultValue = [min, max],
  step = 50,
  minStepsBetweenThumbs = 0,
  id,
  name = id.toUpperCase(),
  setColumnFilters,
}) {
  const [values, setValues] = useState(defaultValue);

  const sliderValues =
    values[0] === values[1]
      ? id === "price"
        ? `£${values[0]}`
        : `${values[0]}`
      : id === "price"
        ? `£${values[0]} - £${values[1]}`
        : `${values[0]} - ${values[1]}`;

  function handleSliderChange(id, value) {
    setValues(value);

    setColumnFilters((prev) =>
      prev
        .filter((filter) => filter.id !== id)
        .concat({
          id,
          value,
        }),
    );
  }

  return (
    <div className="grid justify-start">
      <div className="flex items-center gap-1 text-sm">
        <h3 className="font-bold text-green-3">{name}</h3>
        {id === "memory" && <div>({sliderValues} GB)</div>}
        {id === "coreClock" && <div>({sliderValues} MHz)</div>}
        {id === "boostClock" && <div>({sliderValues} MHz)</div>}
        {id === "price" && <div>({sliderValues})</div>}
      </div>
      <Slider
        min={min}
        max={max}
        defaultValue={defaultValue}
        step={step}
        minStepsBetweenThumbs={minStepsBetweenThumbs}
        onValueChange={(value) => handleSliderChange(id, value)}
        id={id}
      />
    </div>
  );
}

type FilterProps = {
  columnFilters: [{ id: string; value: string }];
  setColumnFilters: (value: React.SetStateAction<never[]>) => void;
};

const chipsetFilters = [
  "GeForce RTX 4090",
  "GeForce RTX 4080",
  "GeForce RTX 4070 Ti",
  "GeForce RTX 4070",
  "GeForce RTX 4060 Ti",
  "GeForce RTX 4060",
  "Radeon RX 7900 XT",
  "Radeon RX 7800 XT",
  "Radeon RX 7700 XT",
  "Radeon RX 7600 XT",
];

export default function Filter({
  columnFilters,
  setColumnFilters,
}: FilterProps) {
  const value = columnFilters.find((item) => item.id === "name")?.value;

  function handleSearchChange(id, value) {
    setColumnFilters((prev) =>
      prev.filter((filter) => filter.id !== id).concat({ id, value }),
    );
  }

  return (
    <div className="grid w-[--filter-width] gap-4">
      <div className="flex gap-1">
        <SearchIcon styles="h-6 w-6" />
        <input
          type="text"
          value={value}
          onChange={(e) => handleSearchChange("name", e.target.value)}
          className="mb-2 w-full rounded-md border border-gray-300 px-1.5 outline-none focus:border-green-3"
        />
      </div>

      <div className="grid justify-start">
        <h3 className="text-sm font-bold text-green-3">CHIPSET</h3>
        {chipsetFilters.map((filter, index) => (
          <CheckboxInput
            key={index}
            id="chipset"
            value={filter}
            setColumnFilters={setColumnFilters}
          />
        ))}
      </div>

      <RangeInput
        id={"memory"}
        name={"MEMORY"}
        min={8}
        max={16}
        step={4}
        setColumnFilters={setColumnFilters}
      />

      <RangeInput
        id={"coreClock"}
        name={"CORE CLOCK"}
        min={1700}
        max={2550}
        setColumnFilters={setColumnFilters}
        minStepsBetweenThumbs={2}
      />

      <RangeInput
        id={"boostClock"}
        name={"BOOST CLOCK"}
        min={2430}
        max={2830}
        setColumnFilters={setColumnFilters}
        minStepsBetweenThumbs={2}
      />

      <RangeInput
        id={"price"}
        min={250}
        max={2500}
        setColumnFilters={setColumnFilters}
        minStepsBetweenThumbs={1}
      />
    </div>
  );
}
