import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Filter from "./Blocks/Filter/Fans";
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
    accessorKey: "size",
    header: "Size",
    size: 120,
    cell: (props) => <p>{props.getValue()} mm</p>,
  },
  {
    accessorKey: "rpm",
    header: "RPM",
    size: 190,
    cell: (props) => <p>{props.getValue()} RPM</p>,
  },
  {
    accessorKey: "airflow",
    header: "Airflow",
    size: 190,
    cell: (props) => <p>{props.getValue()} CFM</p>,
  },
  {
    accessorKey: "noise",
    header: "Noise",
    size: 150,
    cell: (props) => <p>{props.getValue()} dB</p>,
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
    accessorKey: "quantity",
    filterFn: "inNumberRange",
  },
  {
    accessorKey: "color",
    filterFn: "arrIncludesSome",
  },
];

const checkboxOptions = [["Black", "White"]];

const radioOptions = [["Yes", "None"]];

export default function Fans() {
  const [fansList, setFansList] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data: fansList,
    columns,
    initialState: {
      columnVisibility: {
        quantity: false,
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
      const res = await fetch("http://localhost:3000/api/components/fans");
      const data = await res.json();

      setFansList(data);
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
