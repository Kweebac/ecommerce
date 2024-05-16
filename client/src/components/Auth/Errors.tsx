type Errors = {
  errors: Record<string, string>[];
  path: string;
};

export default function Errors({ errors, path }: Errors) {
  return (
    <ul>
      {errors?.map(
        (error, index) =>
          error.path === path && (
            <li key={index} className="text-sm text-[#dd1d1d]">
              {error.msg}
            </li>
          ),
      )}
    </ul>
  );
}
