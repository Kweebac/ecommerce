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
    size: 165,
  },
  {
    accessorKey: "formFactor",
    header: "Form factor",
    filterFn: (row: Row, columnId: string, filterValue: any) => {
      const value = row.getValue(columnId);
      return filterValue.includes(value);
    },
  },
  {
    accessorKey: "cpuSocket",
    header: "CPU socket",
    filterFn: (row: Row, columnId: string, filterValue: any) => {
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
    accessorKey: "color",
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
  const table = useReactTable({
    data: motherboardList,
    columns,
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
