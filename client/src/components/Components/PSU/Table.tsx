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
        alt="GPU"
        className="h-12 w-12 cursor-pointer"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 475,
    cell: (props) => (
      <p className="cursor-pointer hover:text-blue-500">{props.getValue()}</p>
    ),
  },
  {
    accessorKey: "wattage",
    header: "Wattage",
    filterFn: "inNumberRange",
    size: 130,
    cell: (props) => <p>{props.getValue()} W</p>,
  },
  {
    accessorKey: "rating",
    header: "Rating",
    filterFn: "arrIncludesSome",
    size: 175,
  },
  {
    accessorKey: "price",
    header: "Price",
    filterFn: "inNumberRange",
    size: 125,
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
  ["80+ Titanium", "80+ Platinum", "80+ Gold", "80+ Bronze"],
  ["Black", "White", "Black & White"],
];

export default function PSU() {
  const [psuList, setPsuList] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data: psuList,
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
      const res = await fetch("http://localhost:3000/api/components/psu");
      const data = await res.json();

      setPsuList(data);
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
