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
        className="h-12 w-12 cursor-pointer"
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
    accessorKey: "style",
    header: "Style",
  },
  {
    accessorKey: "wireless",
    header: "Wireless",
    filterFn: "arrIncludesSome",
    cell: (props) => {
      let value = props.getValue().join(", ");
      if (value === "No, Yes") value = "Both";

      return <p>{value}</p>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    filterFn: "inNumberRange",
    size: 130,
    cell: (props) => {
      const rowItem = props.row.original;

      return (
        <div className="flex items-center justify-between gap-3">
          <p>£{props.getValue()}</p>
          <SmallButton itemInfo={rowItem} />
        </div>
      );
    },
  },
  {
    accessorKey: "mechanical",
  },
  {
    accessorKey: "rgb",
  },
  {
    accessorKey: "tenkeyless",
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
  ["Gaming", "Mini", "Slim", "Standard"],
  ["Yes", "No"],
  ["Black", "White"],
];

const radioOptions = [
  ["Yes", "No"],
  ["Yes", "No"],
  ["Yes", "No"],
];

export default function Keyboards() {
  const [keyboardList, setKeyboardList] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data: keyboardList,
    columns,
    initialState: {
      columnVisibility: {
        mechanical: false,
        rgb: false,
        tenkeyless: false,
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
      const res = await fetch(
        "http://localhost:3000/api/accessories/keyboards",
      );
      const data = await res.json();

      setKeyboardList(data);
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
