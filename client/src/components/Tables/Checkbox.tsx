// @ts-nocheck

type CheckboxFilterProps = {
  id: string;
  name?: string;
  options: string[];
  setColumnFilters: (value: React.SetStateAction<never[]>) => void;
};

export default function CheckboxFilter({
  id,
  name = id.toUpperCase(),
  options,
  setColumnFilters,
}: CheckboxFilterProps) {
  function handleClick(isActive: boolean, value: string) {
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
    <div className="grid justify-start">
      <h3 className="text-sm font-bold text-green-3">{name}</h3>
      {options.map((filter, index) => (
        <label
          key={index}
          className="flex w-max cursor-pointer items-center gap-1.5"
        >
          <input
            type="checkbox"
            onClick={(e) => handleClick(e.target.checked, filter)}
            className="cursor-pointer"
          />{" "}
          {filter}
        </label>
      ))}
    </div>
  );
}
