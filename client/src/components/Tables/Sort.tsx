// @ts-nocheck

import {
  DownArrowIcon,
  DefaultSortIcon,
  UpArrowIcon,
  Close,
  Logo,
} from "../Icons";
import { Link } from "react-router-dom";
import { useDisableScroll } from "../../../src/utils";

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
      className="flex w-max cursor-pointer items-center"
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

export function SortDropdown({ setDropdownVisible, table }) {
  useDisableScroll();

  return (
    <div className="absolute top-0 z-30 grid w-screen grid-cols-[auto_1fr]">
      <aside className="relative grid min-h-screen w-max grid-rows-[auto_1fr] bg-white-1 p-6 text-green-3">
        <div
          onClick={() => setDropdownVisible(false)}
          className="absolute right-3 top-3 w-max cursor-pointer rounded-full"
        >
          <Close color="#4b654b" />
        </div>

        <Link
          onClick={() => setDropdownVisible(false)}
          to="/"
          className="justify-self-start"
        >
          <Logo fullSize={true} title="Sort" description="" />
        </Link>

        <nav>
          <div className="grid h-full content-between">
            <div className="mt-8 grid gap-4 text-lg">
              {table.getHeaderGroups().map((headerGroup) => (
                <div
                  key={headerGroup.id}
                  className="grid justify-start py-2 font-semibold text-green-3"
                >
                  {headerGroup.headers.map((header) => {
                    let headerName = header.column.columnDef.header;
                    if (typeof headerName === "function")
                      headerName = undefined;

                    if (header.column.getCanSort())
                      return (
                        <div
                          key={header.id}
                          style={{ width: header.getSize() }}
                          className="mb-0 grid justify-start"
                        >
                          <Sort header={header}>{headerName}</Sort>
                        </div>
                      );
                  })}
                </div>
              ))}
            </div>
          </div>
        </nav>
      </aside>

      <div
        onClick={() => setDropdownVisible(false)}
        className="backdrop-brightness-50"
      ></div>
    </div>
  );
}
