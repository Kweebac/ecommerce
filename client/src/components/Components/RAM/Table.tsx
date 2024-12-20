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
import { CustomButton, SmallButton, SmallButtonPC } from "../../Buttons";
import { RAMIcon } from "../../Icons";
import PopupError from "../../PopupError";
import { useGetScreenWidth } from "../../../../src/utils";
import { SortDropdown } from "../../Tables/Sort";
import FilterDropdown from "../../Tables/FilterDropdown";

const checkboxOptions = [
  ["2 x 8", "2 x 16", "2 x 32"],
  ["DDR4", "DDR5"],
  ["Black", "White", "Black & White", "Colorful"],
];

export default function RAM() {
  const [ramList, setRamList] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [error, setError] = useState("");
  const { xxxl, md } = useGetScreenWidth();
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const table = useReactTable({
    data: ramList,
    columns: xxxl
      ? [
          {
            accessorKey: "url",
            size: 60,
            cell: (props) => (
              <img
                src={props.getValue()}
                alt="RAM"
                className="ml-1 h-12 w-12 cursor-pointer object-contain p-0.5"
              />
            ),
            enableSorting: false,
          },
          {
            accessorKey: "name",
            header: "Name",
            size: 425,
            cell: (props) => (
              <p className="cursor-pointer hover:text-blue-300">
                {props.getValue()}
              </p>
            ),
          },
          {
            accessorKey: "modules",
            header: "Modules",
            filterFn: "arrIncludesSome",
            size: 130,
            cell: (props) => <p>{props.getValue()} GB</p>,
          },
          {
            accessorKey: "ddr",
            header: "Type",
            filterFn: "arrIncludesSome",
            size: 110,
          },
          {
            accessorKey: "ddrSpeed",
            header: "Speed",
            filterFn: "inNumberRange",
            size: 110,
          },
          {
            accessorKey: "fwl",
            header: "FWL",
            filterFn: "inNumberRange",
            size: 100,
            cell: (props) => <p>{props.getValue()} ns</p>,
          },
          {
            accessorKey: "cl",
            header: "CL",
            filterFn: "inNumberRange",
            size: 85,
          },
          {
            accessorKey: "pricePerGb",
            header: "Price / GB",
            filterFn: "inNumberRange",
            size: 140,
            cell: (props) => <p>£{props.getValue()}</p>,
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
                      icon={<RAMIcon styles="h-6 w-6" />}
                      limit={2}
                    />
                    <SmallButton itemInfo={rowItem} />
                  </div>
                </div>
              );
            },
          },
          {
            accessorKey: "color",
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
                alt="RAM"
                className="ml-1 h-12 w-12 cursor-pointer object-contain p-0.5"
              />
            ),
            enableSorting: false,
          },
          {
            accessorKey: "name",
            header: "Name",
            cell: (props) => (
              <p className="cursor-pointer hover:text-blue-300">
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
                  <div className="grid justify-items-center">
                    <p>£{props.getValue()}</p>
                    <p className="text-xs">(£{rowItem.pricePerGb} / GB)</p>
                  </div>
                  <div className="flex gap-2">
                    <SmallButtonPC
                      setError={setError}
                      error={error}
                      itemInfo={rowItem}
                      icon={<RAMIcon styles="h-6 w-6" />}
                      limit={2}
                    />
                    <SmallButton itemInfo={rowItem} />
                  </div>
                </div>
              );
            },
          },
          {
            accessorKey: "pricePerGb",
            header: "Price / GB",
            filterFn: "inNumberRange",
          },
          {
            accessorKey: "modules",
            header: "Modules",
            filterFn: "arrIncludesSome",
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">Modules</p>
                <p className="text-sm">{props.getValue()} GB</p>
              </div>
            ),
          },
          {
            accessorKey: "ddr",
            header: "Type",
            filterFn: "arrIncludesSome",
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">Type</p>
                <p className="text-sm">{props.getValue()}</p>
              </div>
            ),
          },
          {
            accessorKey: "ddrSpeed",
            header: "Speed",
            filterFn: "inNumberRange",
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">Speed</p>
                <p className="text-sm">{props.getValue()}</p>
              </div>
            ),
          },
          {
            accessorKey: "fwl",
            header: "FWL",
            filterFn: "inNumberRange",

            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">FWL</p>
                <p className="text-sm">{props.getValue()} ns</p>
              </div>
            ),
          },
          {
            accessorKey: "cl",
            header: "CL",
            filterFn: "inNumberRange",
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">CL</p>
                <p className="text-sm">{props.getValue()}</p>
              </div>
            ),
          },
          {
            accessorKey: "color",
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
        import.meta.env.VITE_BACKEND_HOST + "/api/components/ram",
      );
      const data = await res.json();

      setRamList(data);
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
