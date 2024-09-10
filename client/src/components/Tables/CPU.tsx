import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Filter from "./Blocks/Filter/CPU";
import Pages from "./Blocks/Pages";
import Rows from "./Blocks/Rows";
import Headers from "./Blocks/Headers";

const columns = [
  {
    accessorKey: "url",
    size: 60,
    cell: (props) => (
      <img src={props.getValue()} alt="CPU" className="h-12 w-12" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 375,
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "series",
    header: "Series",
    filterFn: (row: Row, columnId: string, filterValue: any) => {
      const value = row.getValue(columnId);
      return filterValue.includes(value);
    },
    size: 300,
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "cores",
    header: "Cores",
    filterFn: "inNumberRange",
    size: 135,
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "pCoreClock",
    header: "Core clock",
    filterFn: "inNumberRange",
    size: 150,
    cell: (props) => <p>{props.getValue()} GHz</p>,
  },
  {
    accessorKey: "pBoostClock",
    header: "Boost clock",
    filterFn: "inNumberRange",
    size: 150,
    cell: (props) => <p>{props.getValue()} GHz</p>,
  },
  {
    accessorKey: "price",
    header: "Price",
    filterFn: "inNumberRange",
    size: 130,
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
    accessorKey: "tdp",
  },
  {
    accessorKey: "integratedGraphics",
  },
];

const checkboxOptions = [
  [
    "Intel Core i9",
    "Intel Core i7",
    "Intel Core i5",
    "AMD Ryzen 9",
    "AMD Ryzen 7",
  ],
  ["All", "Yes", "No"],
];

export default function CPU() {
  const [cpuList, setCpuList] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({
    tdp: false,
    integratedGraphics: false,
  });
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data: cpuList,
    columns,
    initialState: {
      columnVisibility,
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
    <main className="mt-12 grid grid-flow-col items-start justify-center gap-20">
      <Filter
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        checkboxOptions={checkboxOptions}
      />

      <section style={{ width: table.getTotalSize() }}>
        <Headers table={table} />
        <Rows table={table} />
        <Pages table={table} />
      </section>
    </main>
  );
}
