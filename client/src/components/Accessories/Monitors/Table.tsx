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
  ["1920 x 1080", "2560 x 1440", "3840 x 2160"],
  ["IPS", "VA", "TN"],
  [
    "FreeSync",
    "FreeSync Premium",
    "FreeSync Premium Pro",
    "G-Sync",
    "G-Sync Compatible",
  ],
];

const radioOptions = [
  ["Yes", "No"],
  ["Yes", "No"],
];

export default function Monitors() {
  const [monitorList, setMonitorList] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const { xxxl, md } = useGetScreenWidth();
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const table = useReactTable({
    data: monitorList,
    columns: xxxl
      ? [
          {
            accessorKey: "url",
            size: 60,
            cell: (props) => (
              <img
                src={props.getValue()}
                alt="Monitor"
                className="ml-1 h-12 w-12 cursor-pointer object-contain p-0.5"
              />
            ),
            enableSorting: false,
          },
          {
            accessorKey: "name",
            header: "Name",
            size: 325,
            cell: (props) => (
              <p className="cursor-pointer hover:text-blue-500">
                {props.getValue()}
              </p>
            ),
          },
          {
            accessorKey: "screenSize",
            header: "Screen size",
            cell: (props) => <p>{props.getValue()}"</p>,
          },
          {
            accessorKey: "resolution",
            header: "Resolution",
          },
          {
            accessorKey: "refreshRate",
            header: "Refresh rate",
            cell: (props) => <p>{props.getValue()} Hz</p>,
          },
          {
            accessorKey: "responseTime",
            header: "Response time",
            size: 170,
            cell: (props) => <p>{props.getValue()} ms</p>,
          },
          {
            accessorKey: "panelType",
            header: "Panel",
            size: 110,
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
            accessorKey: "frameSync",
            filterFn: "arrIncludesSome",
          },
          {
            accessorKey: "brightness",
          },
          {
            accessorKey: "speakers",
          },
          {
            accessorKey: "curved",
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
                alt="Monitor"
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
            accessorKey: "screenSize",
            header: "Screen size",
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">Screen size</p>
                <p className="text-sm">{props.getValue()}"</p>
              </div>
            ),
          },
          {
            accessorKey: "resolution",
            header: "Resolution",
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">Resolution</p>
                <p className="text-sm">{props.getValue()}</p>
              </div>
            ),
          },
          {
            accessorKey: "refreshRate",
            header: "Refresh rate",
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">Refresh rate</p>
                <p className="text-sm">{props.getValue()} Hz</p>
              </div>
            ),
          },
          {
            accessorKey: "responseTime",
            header: "Response time",
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">Response time</p>
                <p className="text-sm">{props.getValue()} ms</p>
              </div>
            ),
          },
          {
            accessorKey: "panelType",
            header: "Panel",
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">Panel</p>
                <p className="text-sm">{props.getValue()}</p>
              </div>
            ),
          },
          {
            accessorKey: "frameSync",
            filterFn: "arrIncludesSome",
          },
          {
            accessorKey: "brightness",
          },
          {
            accessorKey: "speakers",
          },
          {
            accessorKey: "curved",
          },
          {
            accessorKey: "_id",
          },
        ],
    initialState: {
      columnVisibility: {
        frameSync: false,
        brightness: false,
        speakers: false,
        curved: false,
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
      const res = await fetch("http://localhost:3000/api/accessories/monitors");
      const data = await res.json();

      setMonitorList(data);
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
