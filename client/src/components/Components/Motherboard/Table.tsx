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
import { MotherboardIcon } from "../../Icons";
import PopupError from "../../PopupError";
import { useGetScreenWidth } from "../../../../src/utils";
import { SortDropdown } from "../../Tables/Sort";
import FilterDropdown from "../../Tables/FilterDropdown";

const checkboxOptions = [
  [
    "Intel Z790",
    "Intel Z690",
    "Intel B760",
    "Intel B660",
    "AMD X670",
    "AMD B650",
    "AMD B550",
  ],
  ["ATX", "Micro ATX", "Mini ITX", "EATX"],
  ["AM5", "AM4", "LGA1700"],
  ["DDR5", "DDR4"],
  ["Wi-Fi 7", "Wi-Fi 6E", "Wi-Fi 6", "Wi-Fi 5", "None"],
  ["Black", "Silver", "Black & Silver", "Colorful"],
];

export default function Motherboard() {
  const [motherboardList, setMotherboardList] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [error, setError] = useState("");
  const { xxxl, md } = useGetScreenWidth();
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const table = useReactTable({
    data: motherboardList,
    columns: xxxl
      ? [
          {
            accessorKey: "url",
            size: 60,
            cell: (props) => (
              <img
                src={props.getValue()}
                alt="Motherboard"
                className="ml-1 h-12 w-12 cursor-pointer object-contain p-0.5"
              />
            ),
            enableSorting: false,
          },
          {
            accessorKey: "name",
            header: "Name",
            size: 400,
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
            size: 165,
          },
          {
            accessorKey: "formFactor",
            header: "Form factor",
            filterFn: (row: Row, columnId: string, filterValue) => {
              const value = row.getValue(columnId);
              return filterValue.includes(value);
            },
          },
          {
            accessorKey: "cpuSocket",
            header: "CPU socket",
            filterFn: (row: Row, columnId: string, filterValue) => {
              const value = row.getValue(columnId);
              return filterValue.includes(value);
            },
          },
          {
            accessorKey: "ram.ddr",
            id: "ramDdr",
            header: "RAM",
            filterFn: "arrIncludesSome",
            size: 100,
          },
          {
            accessorKey: "wifi",
            header: "Wi-Fi",
            filterFn: (row: Row, columnId: string, filterValue) => {
              const value = row.getValue(columnId);
              return filterValue.includes(value);
            },
            size: 130,
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
                      icon={<MotherboardIcon styles="h-6 w-6" />}
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
                alt="Motherboard"
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
                      icon={<MotherboardIcon styles="h-6 w-6" />}
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
                <p>{props.getValue()}</p>
              </div>
            ),
          },
          {
            accessorKey: "formFactor",
            header: "Form factor",
            filterFn: (row: Row, columnId: string, filterValue) => {
              const value = row.getValue(columnId);
              return filterValue.includes(value);
            },
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">Form factor</p>
                <p>{props.getValue()}</p>
              </div>
            ),
          },
          {
            accessorKey: "cpuSocket",
            header: "CPU socket",
            filterFn: (row: Row, columnId: string, filterValue) => {
              const value = row.getValue(columnId);
              return filterValue.includes(value);
            },
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">CPU socket</p>
                <p>{props.getValue()}</p>
              </div>
            ),
          },
          {
            accessorKey: "ram.ddr",
            id: "ramDdr",
            header: "RAM",
            filterFn: "arrIncludesSome",
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">RAM</p>
                <p>{props.getValue()}</p>
              </div>
            ),
          },
          {
            accessorKey: "wifi",
            header: "Wi-Fi",
            filterFn: (row: Row, columnId: string, filterValue) => {
              const value = row.getValue(columnId);
              return filterValue.includes(value);
            },
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">Wi-Fi</p>
                <p>{props.getValue()}</p>
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
        ramSlots: false,
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
        "https://kweebac-ecommerce-api.up.railway.app/api/components/motherboard",
      );
      const data = await res.json();

      setMotherboardList(data);
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
