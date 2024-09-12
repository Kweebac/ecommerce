import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Filter from "./Blocks/Filter/GPU";
import Pages from "./Blocks/Pages";
import Rows from "./Blocks/Rows";
import Headers from "./Blocks/Headers";

const columns = [
  {
    accessorKey: "url",
    size: 60,
    cell: (props) => (
      <img src={props.getValue()} alt="GPU" className="h-12 w-12" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 375,
  },
  {
    accessorKey: "chipset",
    header: "Chipset",
    filterFn: (row: Row, columnId: string, filterValue: any) => {
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
    size: 150,
    cell: (props) => <p>{props.getValue()} MHz</p>,
  },
  {
    accessorKey: "boostClock",
    header: "Boost clock",
    filterFn: "inNumberRange",
    size: 150,
    cell: (props) => <p>{props.getValue()} MHz</p>,
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
    accessorKey: "length",
  },
  {
    accessorKey: "color",
    filterFn: "arrIncludesSome",
  },
];

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
  const [columnVisibility, setColumnVisibility] = useState({
    length: false,
    color: false,
  });
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data: gpuList,
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
      const res = await fetch("http://localhost:3000/api/components/gpu");
      const data = await res.json();

      setGpuList(data);
    })();
  }, []);

  return (
    <main className="my-8 grid grid-flow-col items-start justify-center gap-20">
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
