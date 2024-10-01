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
        alt="Fans"
        className="ml-1 h-12 w-12 cursor-pointer p-0.5"
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
    accessorKey: "quantity",
    filterFn: "inNumberRange",
  },
  {
    accessorKey: "color",
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "_id",
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
