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
        alt="Monitor"
        className="ml-1 h-12 w-12 cursor-pointer object-contain p-0.5"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 325,
    cell: (props) => (
      <p className="cursor-pointer hover:text-blue-500">{props.getValue()}</p>
    ),
  },
  {
    accessorKey: "screenSize",
    header: "Screen size",
    cell: (props) => <p>{props.getValue()}"</p>,
  },
  {
    accessorKey: "resolution",
    header: "Resolution",
  },
  {
    accessorKey: "refreshRate",
    header: "Refresh rate",
    cell: (props) => <p>{props.getValue()} Hz</p>,
  },
  {
    accessorKey: "responseTime",
    header: "Response time",
    size: 170,
    cell: (props) => <p>{props.getValue()} ms</p>,
  },
  {
    accessorKey: "panelType",
    header: "Panel",
    size: 110,
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
    accessorKey: "frameSync",
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "brightness",
  },
  {
    accessorKey: "speakers",
  },
  {
    accessorKey: "curved",
  },
  {
    accessorKey: "_id",
  },
];

const checkboxOptions = [
  ["1920 x 1080", "2560 x 1440", "3840 x 2160"],
  ["IPS", "VA", "TN"],
  [
    "FreeSync",
    "FreeSync Premium",
    "FreeSync Premium Pro",
    "G-Sync",
    "G-Sync Compatible",
  ],
];

const radioOptions = [
  ["Yes", "No"],
  ["Yes", "No"],
];

export default function Monitors() {
  const [monitorList, setMonitorList] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data: monitorList,
    columns,
    initialState: {
      columnVisibility: {
        frameSync: false,
        brightness: false,
        speakers: false,
        curved: false,
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
      const res = await fetch("http://localhost:3000/api/accessories/monitors");
      const data = await res.json();

      setMonitorList(data);
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
