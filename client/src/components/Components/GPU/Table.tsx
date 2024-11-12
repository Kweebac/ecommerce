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
import { GPUIcon } from "../../Icons";
import PopupError from "../../PopupError";
import { useGetScreenWidth } from "../../../../src/utils";
import { SortDropdown } from "../../Tables/Sort";
import FilterDropdown from "../../Tables/FilterDropdown";

const checkboxOptions = [
  [
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
  ],
  ["Black", "White"],
];

export default function GPU() {
  const [gpuList, setGpuList] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [error, setError] = useState("");
  const { xxxl, md } = useGetScreenWidth();
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const table = useReactTable({
    data: gpuList,
    columns: xxxl
      ? [
          {
            accessorKey: "url",
            size: 60,
            cell: (props) => (
              <img
                src={props.getValue()}
                alt="GPU"
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
            accessorKey: "chipset",
            header: "Chipset",
            filterFn: (row: Row, columnId: string, filterValue) => {
              const value = row.getValue(columnId);
              return filterValue.includes(value);
            },
            size: 300,
          },
          {
            accessorKey: "memory",
            header: "Memory",
            filterFn: "inNumberRange",
            size: 135,
            cell: (props) => <p>{props.getValue()} GB</p>,
          },
          {
            accessorKey: "coreClock",
            header: "Core clock",
            filterFn: "inNumberRange",
            cell: (props) => <p>{props.getValue()} MHz</p>,
          },
          {
            accessorKey: "boostClock",
            header: "Boost clock",
            filterFn: "inNumberRange",
            cell: (props) => <p>{props.getValue()} MHz</p>,
          },
          {
            accessorKey: "price",
            header: "Price",
            filterFn: "inNumberRange",
            size: 160,
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
                      icon={<GPUIcon styles="h-6 w-6" />}
                      limit={2}
                    />
                    <SmallButton itemInfo={rowItem} />
                  </div>
                </div>
              );
            },
          },
          {
            accessorKey: "length",
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
                alt="GPU"
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
                  <div className="flex gap-2">
                    <SmallButtonPC
                      setError={setError}
                      error={error}
                      itemInfo={rowItem}
                      icon={<GPUIcon styles="h-6 w-6" />}
                      limit={2}
                    />
                    <SmallButton itemInfo={rowItem} />
                  </div>
                </div>
              );
            },
          },
          {
            accessorKey: "chipset",
            header: "Chipset",
            filterFn: (row: Row, columnId: string, filterValue) => {
              const value = row.getValue(columnId);
              return filterValue.includes(value);
            },
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">Chipset</p>
                <p className="text-sm">{props.getValue()}</p>
              </div>
            ),
          },
          {
            accessorKey: "memory",
            header: "Memory",
            filterFn: "inNumberRange",
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">Memory</p>
                <p className="text-sm">{props.getValue()} GB</p>
              </div>
            ),
          },
          {
            accessorKey: "coreClock",
            header: "Core clock",
            filterFn: "inNumberRange",
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">Core clock</p>
                <p className="text-sm">{props.getValue()} MHz</p>
              </div>
            ),
          },
          {
            accessorKey: "boostClock",
            header: "Boost clock",
            filterFn: "inNumberRange",
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">Boost clock</p>
                <p className="text-sm">{props.getValue()} MHz</p>
              </div>
            ),
          },
          {
            accessorKey: "length",
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
        length: false,
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
      const res = await fetch("/api/components/gpu");
      const data = await res.json();

      setGpuList(data);
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
