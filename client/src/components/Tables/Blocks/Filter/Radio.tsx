type RadioFilterProps = {
  id: string;
  name?: string;
  options: string[];
  setColumnFilters: (value: React.SetStateAction<never[]>) => void;
};

export default function RadioFilter({
  id,
  name = id.toUpperCase(),
  options,
  setColumnFilters,
}: RadioFilterProps) {
  function handleClick(value: string) {
    setColumnFilters((prev) => {
      if (value === "All") return prev.filter((f) => f.id !== id);
      else return prev.filter((f) => f.id !== id).concat({ id, value });
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
            type="radio"
            defaultChecked={filter === "All"}
            name={id}
            onClick={() => handleClick(filter)}
            className="cursor-pointer"
          />{" "}
          {filter}
        </label>
      ))}
    </div>
  );
}
