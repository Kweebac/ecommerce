import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Filter from "./Blocks/Filter/CPUCooler";
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
    size: 475,
  },
  {
    accessorKey: "rpm",
    header: "RPM",
    size: 200,
    cell: (props) => <p>{props.getValue()} RPM</p>,
  },
  {
    accessorKey: "noise",
    header: "Noise",
    size: 175,
    cell: (props) => <p>{props.getValue()} dB</p>,
  },
  {
    accessorKey: "waterCooled",
    header: "Water cooled",
    size: 190,
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
    accessorKey: "cpuSockets",
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "height",
  },
  {
    accessorKey: "color",
    filterFn: "arrIncludesSome",
  },
];

const checkboxOptions = [
  ["AM5", "AM4", "LGA1700"],
  ["Black", "White"],
];

const radioOptions = [["Yes", "None"]];

export default function CPUCooler() {
  const [cpuCoolerList, setCpuCoolerList] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data: cpuCoolerList,
    columns,
    initialState: {
      columnVisibility: {
        height: false,
        cpuSockets: false,
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
      const res = await fetch(
        "http://localhost:3000/api/components/cpu-cooler",
      );
      const data = await res.json();

      setCpuCoolerList(data);
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
