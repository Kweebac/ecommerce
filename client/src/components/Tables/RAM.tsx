import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Filter from "./Blocks/Filter/RAM";
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
    size: 425,
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
    accessorKey: "price",
    header: "Price",
    filterFn: "inNumberRange",
    size: 110,
    cell: (props) => <p>£{props.getValue()}</p>,
  },
  {
    accessorKey: "pricePerGb",
    header: "Price / GB",
    filterFn: "inNumberRange",
    size: 115,
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
    accessorKey: "color",
    filterFn: (row: Row, columnId: string, filterValue: any) => {
      const value = row.getValue(columnId);
      return filterValue.includes(value);
    },
  },
];

const checkboxOptions = [
  ["2 x 8", "2 x 16", "2 x 32"],
  ["DDR4", "DDR5"],
  ["Black", "White", "Black & White", "Colorful"],
];

export default function RAM() {
  const [ramList, setRamList] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data: ramList,
    columns,
    initialState: {
      columnVisibility: {
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
      const res = await fetch("http://localhost:3000/api/components/ram");
      const data = await res.json();

      setRamList(data);
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