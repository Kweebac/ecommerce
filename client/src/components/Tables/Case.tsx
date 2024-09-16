import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Filter from "./Blocks/Filter/Case";
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
    size: 400,
  },
  {
    accessorKey: "type",
    header: "Type",
    filterFn: (row: Row, columnId: string, filterValue: any) => {
      const value = row.getValue(columnId);
      return filterValue.includes(value);
    },
    size: 250,
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
    accessorKey: "motherboardFormFactors",
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "maxGpuLength",
  },
  {
    accessorKey: "color",
    filterFn: "arrIncludesSome",
  },
];

const checkboxOptions = [
  [
    "ATX Full Tower",
    "ATX Mid Tower",
    "MicroATX Mid Tower",
    "MicroATX Mini Tower",
  ],
  ["ATX", "Micro ATX", "Mini ITX", "EATX"],
  ["Black", "White"],
];

export default function Case() {
  const [caseList, setCaseList] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data: caseList,
    columns,
    initialState: {
      columnVisibility: {
        maxGpuLength: false,
        motherboardFormFactors: false,
        color: false,
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
      const res = await fetch("http://localhost:3000/api/components/case");
      const data = await res.json();

      setCaseList(data);
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
