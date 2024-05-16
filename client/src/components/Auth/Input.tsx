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
    <div className="grid gap-1">
      <div className="rounded-md border border-[#dedede] px-3 py-1.5 text-sm">
        <label>
          <div className="text-[#707070]">{label}</div>
          <input
            type={type}
            name={name}
            required
            className="w-[36rem] bg-inherit outline-none"
          />
        </label>
      </div>
      <Errors errors={errors} path={name} />
    </div>
  );
}
