import Errors from "./Errors";

type InputProps = {
  type: string;
  name: string;
  label?: string;
  errors: Record<string, string>[];
};

export default function Input({
  type,
  name,
  label = name[0].toUpperCase() + name.slice(1),
  errors,
}: InputProps) {
  return (
    <div className="grid gap-1 rounded-md">
      <div className="focus-within rounded-md border border-[#dedede] bg-white-1 px-3 py-1.5">
        <label>
          <div className="text-sm text-[#707070]">{label}</div>
          <input
            type={type}
            name={name}
            required
            className="w-[36rem] bg-inherit text-lg outline-none"
          />
        </label>
      </div>
      <Errors errors={errors} path={name} />
    </div>
  );
}
