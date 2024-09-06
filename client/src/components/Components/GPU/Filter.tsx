import { SearchIcon } from "../../Icons";

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

  function handleCheckboxChange(id, value) {
    setColumnFilters((prev) =>
      prev.filter((filter) => filter.id !== id).concat({ id, value }),
    );
  }

  return (
    <div className="grid gap-4">
      <div className="flex gap-1">
        <SearchIcon styles="h-6 w-6" />
        <input
          type="text"
          value={value}
          onChange={(e) => handleCheckboxChange("name", e.target.value)}
          className="mb-2 rounded-md border border-gray-300 px-1.5 outline-none focus:border-green-3"
        />
      </div>

      <div className="grid justify-start">
        <h3 className="text-sm font-bold tracking-wide text-green-3">
          CHIPSET
        </h3>
        {chipsetFilters.map((filter, index) => (
          <CheckboxInput
            key={index}
            id="chipset"
            value={filter}
            setColumnFilters={setColumnFilters}
          />
        ))}
      </div>

      <div className="grid justify-start">
        <h3 className="text-sm font-bold tracking-wide text-green-3">MEMORY</h3>
      </div>

      <div className="grid justify-start">
        <h3 className="text-sm font-bold tracking-wide text-green-3">
          CORE CLOCK
        </h3>
      </div>

      <div className="grid justify-start">
        <h3 className="text-sm font-bold tracking-wide text-green-3">
          BOOST CLOCK
        </h3>
      </div>

      <div className="grid justify-start">
        <h3 className="text-sm font-bold tracking-wide text-green-3">PRICE</h3>
        <input type="range" min={259.98} max={2452.1} />
      </div>
    </div>
  );
}
