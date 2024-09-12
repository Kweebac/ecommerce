import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Filter from "./Blocks/Filter/Motherboard";
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
    accessorKey: "chipset",
    header: "Chipset",
    filterFn: (row: Row, columnId: string, filterValue: any) => {
      const value = row.getValue(columnId);
      return filterValue.includes(value);
    },
    size: 165,
  },
  {
    accessorKey: "formFactor",
    header: "Form factor",
    filterFn: (row: Row, columnId: string, filterValue: any) => {
      const value = row.getValue(columnId);
      return filterValue.includes(value);
    },
    size: 150,
  },
  {
    accessorKey: "cpuSocket",
    header: "CPU Socket",
    filterFn: (row: Row, columnId: string, filterValue: any) => {
      const value = row.getValue(columnId);
      return filterValue.includes(value);
    },
    size: 150,
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
    filterFn: (row: Row, columnId: string, filterValue: any) => {
      const value = row.getValue(columnId);
      return filterValue.includes(value);
    },
    size: 130,
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
    accessorKey: "color",
    filterFn: (row: Row, columnId: string, filterValue: any) => {
      const value = row.getValue(columnId);
      return filterValue.includes(value);
    },
  },
];

const checkboxOptions = [
  [
    "Intel Z790",
    "Intel Z690",
    "Intel B760",
    "Intel B660",
    "Intel H610",
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
  const [columnVisibility, setColumnVisibility] = useState({
    color: false,
    ramSlots: false,
  });
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data: motherboardList,
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
      const res = await fetch(
        "http://localhost:3000/api/components/motherboard",
      );
      const data = await res.json();

      setMotherboardList(data);
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
