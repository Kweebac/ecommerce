// @ts-nocheck

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import Pages from "../../Tables/Pages";
import Rows from "../../Tables/Rows";
import Headers from "../../Tables/Headers";
import { CustomButton, SmallButton, SmallButtonPC } from "../../Buttons";
import { CPUIcon } from "../../Icons";
import PopupError from "../../PopupError";
import { useGetScreenWidth } from "../../../../src/utils";
import { SortDropdown } from "../../Tables/Sort";
import FilterDropdown from "../../Tables/FilterDropdown";

const checkboxOptions = [
  [
    "AMD Ryzen 9",
    "AMD Ryzen 7",
    "AMD Ryzen 5",
    "Intel Core i9",
    "Intel Core i7",
    "Intel Core i5",
  ],
  ["AM5", "AM4", "LGA1700"],
];
const radioOptions = [["Yes", "None"]];

export default function CPU() {
  const [cpuList, setCpuList] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [error, setError] = useState("");
  const { xxxl, md } = useGetScreenWidth();
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const table = useReactTable({
    data: cpuList,
    columns: xxxl
      ? [
          {
            accessorKey: "url",
            size: 60,
            cell: (props) => (
              <img
                src={props.getValue()}
                alt="CPU"
                className="ml-1 h-12 w-12 cursor-pointer object-contain p-0.5"
              />
            ),
            enableSorting: false,
          },
          {
            accessorKey: "name",
            header: "Name",
            size: 300,
            cell: (props) => (
              <p className="cursor-pointer hover:text-blue-500">
                {props.getValue()}
              </p>
            ),
          },
          {
            accessorKey: "series",
            header: "Series",
            filterFn: (row: Row, columnId: string, filterValue) => {
              const value = row.getValue(columnId);
              return filterValue.includes(value);
            },
            size: 200,
          },
          {
            accessorKey: "cores",
            header: "Cores",
            filterFn: "inNumberRange",
            size: 135,
          },
          {
            accessorKey: "pCoreClock",
            header: "Core clock",
            filterFn: "inNumberRange",
            cell: (props) => <p>{props.getValue()} GHz</p>,
          },
          {
            accessorKey: "pBoostClock",
            header: "Boost clock",
            filterFn: "inNumberRange",
            cell: (props) => <p>{props.getValue()} GHz</p>,
          },
          {
            accessorKey: "price",
            header: "Price",
            filterFn: "inNumberRange",
            size: 155,
            cell: (props) => {
              const rowItem = props.row.original;

              return (
                <div className="mr-2 flex items-center justify-between gap-3">
                  <p>£{props.getValue()}</p>
                  <div className="flex gap-2">
                    <SmallButtonPC
                      setError={setError}
                      error={error}
                      itemInfo={rowItem}
                      icon={<CPUIcon styles="h-6 w-6" />}
                    />
                    <SmallButton itemInfo={rowItem} />
                  </div>
                </div>
              );
            },
          },
          {
            accessorKey: "integratedGraphics",
          },
          {
            accessorKey: "socket",
            filterFn: (row: Row, columnId: string, filterValue) => {
              const value = row.getValue(columnId);
              return filterValue.includes(value);
            },
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
                alt="CPU"
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
                <div className="ml-5 grid items-center justify-items-center">
                  <p>£{props.getValue()}</p>
                  <div className="flex gap-2">
                    <SmallButtonPC
                      setError={setError}
                      error={error}
                      itemInfo={rowItem}
                      icon={<CPUIcon styles="h-6 w-6" />}
                    />
                    <SmallButton itemInfo={rowItem} />
                  </div>
                </div>
              );
            },
          },
          {
            accessorKey: "series",
            header: "Series",
            filterFn: (row: Row, columnId: string, filterValue) => {
              const value = row.getValue(columnId);
              return filterValue.includes(value);
            },
          },
          {
            accessorKey: "cores",
            header: "Cores",
            filterFn: "inNumberRange",
          },
          {
            accessorKey: "pCoreClock",
            header: "Core clock",
            filterFn: "inNumberRange",
            cell: (props) => <p>{props.getValue()} GHz</p>,
          },
          {
            accessorKey: "pBoostClock",
            header: "Boost clock",
            filterFn: "inNumberRange",
            cell: (props) => <p>{props.getValue()} GHz</p>,
          },
          {
            accessorKey: "integratedGraphics",
          },
          {
            accessorKey: "socket",
            filterFn: (row: Row, columnId: string, filterValue) => {
              const value = row.getValue(columnId);
              return filterValue.includes(value);
            },
          },
          {
            accessorKey: "_id",
          },
        ],
    initialState: {
      columnVisibility: {
        integratedGraphics: false,
        socket: false,
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
      const res = await fetch("http://localhost:3000/api/components/cpu");
      const data = await res.json();

      setCpuList(data);
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
        {error && <PopupError message={error} />}

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
