import { useState } from "react";
import { Slider } from "../Components/shadcn";

type SliderFilterProps = {
  min: number;
  max: number;
  defaultValue?: [number, number];
  step?: number;
  minStepsBetweenThumbs?: number;
  id: string;
  name?: string;
  setColumnFilters: (value: React.SetStateAction<never[]>) => void;
};

export default function SliderFilter({
  min,
  max,
  defaultValue = [min, max],
  step = 50,
  minStepsBetweenThumbs = 0,
  id,
  name = id.toUpperCase(),
  setColumnFilters,
}: SliderFilterProps) {
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
        {id === "length" && <div>({sliderValues} mm)</div>}
        {id === "tdp" && <div>({sliderValues} W)</div>}
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
