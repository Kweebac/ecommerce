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
import { SmallButton, SmallButtonPC } from "../../Buttons";
import { RAMIcon } from "../../Icons";
import PopupError from "../../PopupError";

const checkboxOptions = [
  ["2 x 8", "2 x 16", "2 x 32"],
  ["DDR4", "DDR5"],
  ["Black", "White", "Black & White", "Colorful"],
];

export default function RAM() {
  const [ramList, setRamList] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [error, setError] = useState("");
  const table = useReactTable({
    data: ramList,
    columns: [
      {
        accessorKey: "url",
        size: 60,
        cell: (props) => (
          <img
            src={props.getValue()}
            alt="RAM"
            className="ml-1 h-12 w-12 cursor-pointer object-contain p-0.5"
          />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 425,
        cell: (props) => (
          <p className="cursor-pointer hover:text-blue-500">
            {props.getValue()}
          </p>
        ),
      },
      {
        accessorKey: "modules",
        header: "Modules",
        filterFn: "arrIncludesSome",
        size: 130,
        cell: (props) => <p>{props.getValue()} GB</p>,
      },
      {
        accessorKey: "ddr",
        header: "Type",
        filterFn: "arrIncludesSome",
        size: 110,
      },
      {
        accessorKey: "ddrSpeed",
        header: "Speed",
        filterFn: "inNumberRange",
        size: 110,
      },
      {
        accessorKey: "fwl",
        header: "FWL",
        filterFn: "inNumberRange",
        size: 100,
        cell: (props) => <p>{props.getValue()} ns</p>,
      },
      {
        accessorKey: "cl",
        header: "CL",
        filterFn: "inNumberRange",
        size: 85,
      },
      {
        accessorKey: "pricePerGb",
        header: "Price / GB",
        filterFn: "inNumberRange",
        size: 140,
        cell: (props) => <p>£{props.getValue()}</p>,
      },
      {
        accessorKey: "price",
        header: "Price",
        filterFn: "inNumberRange",
        size: 155,
        cell: (props) => {
          const rowItem = props.row.original;

          return (
            <div className="mr-2 flex items-center justify-between gap-3">
              <p>£{props.getValue()}</p>
              <div className="flex gap-2">
                <SmallButtonPC
                  setError={setError}
                  error={error}
                  itemInfo={rowItem}
                  icon={<RAMIcon styles="h-6 w-6" />}
                  limit={2}
                />
                <SmallButton itemInfo={rowItem} />
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "color",
        filterFn: (row: Row, columnId: string, filterValue) => {
          const value = row.getValue(columnId);
          return filterValue.includes(value);
        },
      },
      {
        accessorKey: "_id",
      },
    ],
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
      const res = await fetch(
        "https://kweebac-ecommerce-api.up.railway.app/api/components/ram",
      );
      const data = await res.json();

      setRamList(data);
    })();
  }, []);

  return (
    <main className="my-8 grid grid-flow-col items-start justify-center gap-20">
      {error && <PopupError message={error} />}

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
