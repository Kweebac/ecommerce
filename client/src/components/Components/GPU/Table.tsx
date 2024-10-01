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
import { SmallButton } from "../../Buttons";

const columns = [
  {
    accessorKey: "url",
    size: 60,
    cell: (props) => (
      <img
        src={props.getValue()}
        alt="GPU"
        className="ml-1 h-12 w-12 cursor-pointer p-0.5"
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
    size: 140,
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
    accessorKey: "length",
  },
  {
    accessorKey: "color",
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "_id",
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
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data: gpuList,
    columns,
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
