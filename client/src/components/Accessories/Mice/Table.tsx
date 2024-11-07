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
import { SmallButton } from "../../Buttons";

const columns = [
  {
    accessorKey: "url",
    size: 60,
    cell: (props) => (
      <img
        src={props.getValue()}
        alt="Mouse"
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
    accessorKey: "wireless",
    header: "Wireless",
    filterFn: "arrIncludesSome",
    size: 130,
    cell: (props) => {
      let value = props.getValue().join(", ");
      if (value === "No, Yes") value = "Both";

      return <p>{value}</p>;
    },
  },
  {
    accessorKey: "maxDpi",
    header: "Max DPI",
    filterFn: "inNumberRange",
    size: 130,
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
    accessorKey: "color",
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "_id",
  },
];

const checkboxOptions = [
  ["Yes", "No"],
  ["Black", "White"],
];

export default function Mice() {
  const [miceList, setMiceList] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data: miceList,
    columns,
    initialState: {
      columnVisibility: {
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
      const res = await fetch("http://localhost:3000/api/accessories/mice");
      const data = await res.json();

      setMiceList(data);
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
