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

const columns = [
  {
    accessorKey: "url",
    size: 60,
    cell: (props) => (
      <img
        src={props.getValue()}
        alt="CPU"
        className="h-12 w-12 cursor-pointer"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 375,
    cell: (props) => (
      <p className="cursor-pointer hover:text-blue-500">{props.getValue()}</p>
    ),
  },
  {
    accessorKey: "series",
    header: "Series",
    filterFn: (row: Row, columnId: string, filterValue: any) => {
      const value = row.getValue(columnId);
      return filterValue.includes(value);
    },
    size: 300,
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
    size: 120,
    cell: (props) => (
      <div className="flex items-center justify-between gap-3">
        <p>£{props.getValue()}</p>
        <button className="rounded-md bg-green-3 px-2 py-1 text-white-1">
          Add
        </button>
      </div>
    ),
  },
  {
    accessorKey: "integratedGraphics",
  },
  {
    accessorKey: "socket",
    filterFn: (row: Row, columnId: string, filterValue: any) => {
      const value = row.getValue(columnId);
      return filterValue.includes(value);
    },
  },
  {
    accessorKey: "_id",
  },
];

const checkboxOptions = [
  [
    "AMD Ryzen 9",
    "AMD Ryzen 7",
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
  const table = useReactTable({
    data: cpuList,
    columns,
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
