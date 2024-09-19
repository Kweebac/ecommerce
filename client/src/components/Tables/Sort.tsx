import { DownArrowIcon, DefaultSortIcon, UpArrowIcon } from "../Icons";

type SortProps = {
  header: {
    column: {
      getToggleSortingHandler: () => () => void;
      getIsSorted: () => "asc" | "desc";
    };
  };
  children: React.ReactNode;
};

export default function Sort({ header, children }: SortProps) {
  return (
    <div
      onClick={header.column.getToggleSortingHandler()}
      className="flex cursor-pointer items-center"
    >
      {children}
      {{
        asc: <UpArrowIcon styles="h-6 w-6" />,
        desc: <DownArrowIcon styles="h-6 w-6" />,
      }[header.column.getIsSorted()] || (
        <DefaultSortIcon styles="h-5 w-5 m-0.5" />
      )}
    </div>
  );
}
