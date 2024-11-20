// @ts-nocheck

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import Pages from "../../Tables/Pages";
import Rows from "../../Tables/Rows";
import Headers from "../../Tables/Headers";
import { CustomButton, SmallButton } from "../../Buttons";
import { useGetScreenWidth } from "../../../../src/utils";
import { SortDropdown } from "../../Tables/Sort";
import FilterDropdown from "../../Tables/FilterDropdown";

const checkboxOptions = [
  ["Gaming", "Mini", "Slim", "Standard"],
  ["Yes", "No"],
  ["Black", "White"],
];

const radioOptions = [
  ["Yes", "No"],
  ["Yes", "No"],
  ["Yes", "No"],
];

export default function Keyboards() {
  const [keyboardList, setKeyboardList] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const { xxxl, md } = useGetScreenWidth();
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const table = useReactTable({
    data: keyboardList,
    columns: xxxl
      ? [
          {
            accessorKey: "url",
            size: 60,
            cell: (props) => (
              <img
                src={props.getValue()}
                alt="Keyboard"
                className="ml-1 h-12 w-12 cursor-pointer object-contain p-0.5"
              />
            ),
            enableSorting: false,
          },
          {
            accessorKey: "name",
            header: "Name",
            size: 375,
            cell: (props) => (
              <p className="cursor-pointer hover:text-blue-500">
                {props.getValue()}
              </p>
            ),
          },
          {
            accessorKey: "style",
            header: "Style",
          },
          {
            accessorKey: "wireless",
            header: "Wireless",
            filterFn: "arrIncludesSome",
            cell: (props) => {
              let value = props.getValue().join(", ");
              if (value === "No, Yes") value = "Both";

              return <p>{value}</p>;
            },
          },
          {
            accessorKey: "price",
            header: "Price",
            filterFn: "inNumberRange",
            size: 115,
            cell: (props) => {
              const rowItem = props.row.original;

              return (
                <div className="mr-2 flex items-center justify-between gap-3">
                  <p>£{props.getValue()}</p>
                  <SmallButton itemInfo={rowItem} />
                </div>
              );
            },
          },
          {
            accessorKey: "mechanical",
          },
          {
            accessorKey: "rgb",
          },
          {
            accessorKey: "tenkeyless",
          },
          {
            accessorKey: "color",
            filterFn: "arrIncludesSome",
          },
          {
            accessorKey: "_id",
          },
        ]
      : [
          {
            accessorKey: "url",
            cell: (props) => (
              <img
                src={props.getValue()}
                alt="Keyboard"
                className="ml-1 h-12 w-12 cursor-pointer object-contain p-0.5"
              />
            ),
            enableSorting: false,
          },
          {
            accessorKey: "name",
            header: "Name",
            cell: (props) => (
              <p className="cursor-pointer hover:text-blue-500">
                {props.getValue()}
              </p>
            ),
          },
          {
            accessorKey: "price",
            header: "Price",
            filterFn: "inNumberRange",
            cell: (props) => {
              const rowItem = props.row.original;

              return (
                <div className="ml-5 grid items-center justify-items-center gap-0.5">
                  <p>£{props.getValue()}</p>
                  <SmallButton itemInfo={rowItem} />
                </div>
              );
            },
          },
          {
            accessorKey: "style",
            header: "Style",
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">Style</p>
                <p className="text-sm">{props.getValue()}</p>
              </div>
            ),
          },
          {
            accessorKey: "wireless",
            header: "Wireless",
            filterFn: "arrIncludesSome",
            cell: (props) => {
              let value = props.getValue().join(", ");
              if (value === "No, Yes") value = "Both";

              return (
                <div>
                  <p className="text-xs text-green-3">Wireless</p>
                  <p className="text-sm">{value}</p>
                </div>
              );
            },
          },
          {
            accessorKey: "mechanical",
          },
          {
            accessorKey: "rgb",
          },
          {
            accessorKey: "tenkeyless",
          },
          {
            accessorKey: "color",
            filterFn: "arrIncludesSome",
          },
          {
            accessorKey: "_id",
          },
        ],
    initialState: {
      columnVisibility: {
        mechanical: false,
        rgb: false,
        tenkeyless: false,
        color: false,
        _id: false,
      },
    },
    state: { columnFilters },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    (async () => {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_HOST + "/api/accessories/keyboards",
      );
      const data = await res.json();

      setKeyboardList(data);
    })();
  }, []);

  return (
    <main className="my-8 grid grid-rows-[auto_1fr]">
      <div className="mb-8 grid h-max grid-flow-col justify-items-center">
        {!md && (
          <>
            <CustomButton onClick={() => setFilterDropdownVisible(true)}>
              Filter
            </CustomButton>

            <FilterDropdown
              setDropdownVisible={setFilterDropdownVisible}
              dropdownVisible={filterDropdownVisible}
              table={table}
            >
              <Filter
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                checkboxOptions={checkboxOptions}
                radioOptions={radioOptions}
              />
            </FilterDropdown>
          </>
        )}
        {!xxxl && (
          <>
            <CustomButton onClick={() => setSortDropdownVisible(true)}>
              Sort
            </CustomButton>

            {sortDropdownVisible && (
              <SortDropdown
                setDropdownVisible={setSortDropdownVisible}
                table={table}
              />
            )}
          </>
        )}
      </div>
      <div className="grid grid-flow-col items-start gap-20 md:grid-cols-[auto_1fr] 3xl:grid-cols-none 3xl:justify-center">
        {md && (
          <Filter
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            checkboxOptions={checkboxOptions}
            radioOptions={radioOptions}
          />
        )}

        <section
          style={{
            width: xxxl ? table.getTotalSize() : "100%",
          }}
        >
          {xxxl && <Headers table={table} />}
          <Rows table={table} />
          <Pages table={table} />
        </section>
      </div>
    </main>
  );
}
