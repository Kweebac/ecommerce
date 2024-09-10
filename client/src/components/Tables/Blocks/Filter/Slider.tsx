import { useState } from "react";
import { Slider } from "../../../shadcn";

type SliderFilterProps = {
  min: number;
  max: number;
  defaultValue?: [number, number];
  step?: number;
  minStepsBetweenThumbs?: number;
  id: string;
  units?: string;
  name?: string;
  setColumnFilters: (value: React.SetStateAction<never[]>) => void;
};

export default function SliderFilter({
  min,
  max,
  defaultValue = [min, max],
  step = 50,
  minStepsBetweenThumbs = 1,
  id,
  name = id.toUpperCase(),
  units,
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
        {units === "£" ? (
          <div>({sliderValues})</div>
        ) : (
          <div>
            ({sliderValues}
            {`${units ? ` ${units}` : ""}`})
          </div>
        )}
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
