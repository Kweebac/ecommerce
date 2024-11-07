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
import { SmallButton, SmallButtonPC } from "../../Buttons";
import { CPUIcon } from "../../Icons";
import PopupError from "../../PopupError";

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
  const table = useReactTable({
    data: cpuList,
    columns: [
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
    <main className="my-8 grid grid-flow-col items-start justify-center gap-20">
      {error && <PopupError message={error} />}

      <Filter
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        checkboxOptions={checkboxOptions}
        radioOptions={radioOptions}
      />

      <section style={{ width: table.getTotalSize() }}>
        <Headers table={table} />
        <Rows table={table} />
        <Pages table={table} />
      </section>
    </main>
  );
}
