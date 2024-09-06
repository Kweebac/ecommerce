import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import Sort from "./Sort";
import { LeftArrowIcon, RightArrowIcon } from "../../Icons";

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
    size: 375,
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "chipset",
    header: "Chipset",
    filterFn: (row: Row, columnId: string, filterValue: any) => {
      const value = row.getValue(columnId);
      return filterValue.includes(value);
    },
    size: 300,
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "memory",
    header: "Memory",
    filterFn: "inNumberRange",
    size: 135,
    cell: (props) => <p>{props.getValue()} GB</p>,
  },
  {
    accessorKey: "coreClock",
    header: "Core clock",
    filterFn: "inNumberRange",
    size: 150,
    cell: (props) => <p>{props.getValue()} MHz</p>,
  },
  {
    accessorKey: "boostClock",
    header: "Boost clock",
    filterFn: "inNumberRange",
    size: 150,
    cell: (props) => <p>{props.getValue()} MHz</p>,
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
];

export default function GPU() {
  const [gpuList, setGPUList] = useState([]);
  const [columnFilters, setColumnFilters] = useState([
    {
      id: "price",
      value: [1000, 1100],
    },
  ]);
  const table = useReactTable({
    data: gpuList,
    columns,
    state: { columnFilters },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3000/api/components/gpu");
      const data = await res.json();

      setGPUList(data);
    })();
  }, []);

  return (
    <main className="mt-12 grid grid-flow-col items-start justify-center gap-20">
      <Filter
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />

      <section style={{ width: table.getTotalSize() }}>
        {table.getHeaderGroups().map((headerGroup) => (
          <div
            key={headerGroup.id}
            className="grid grid-flow-col justify-start py-2 font-semibold text-green-3"
          >
            {headerGroup.headers.map((header) => {
              const headerName = header.column.columnDef.header;

              return (
                <div
                  key={header.id}
                  style={{ width: header.getSize() }}
                  className="grid justify-start"
                >
                  {header.column.getCanSort() ? (
                    <Sort header={header}>{headerName}</Sort>
                  ) : (
                    <div>{headerName}</div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {table.getRowModel().rows.map((row) => (
          <div
            key={row.id}
            className="grid grid-flow-col items-center justify-start border-t border-t-gray-300"
          >
            {row.getVisibleCells().map((cell) => (
              <div key={cell.id} style={{ width: cell.column.getSize() }}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))}

        {table.getPageCount() > 1 && (
          <>
            <br />
            <div className="grid justify-items-center gap-1">
              <div className="text-lg">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <LeftArrowIcon styles="h-8 w-8 bg-white-2 rounded-full" />
                </button>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <RightArrowIcon styles="h-8 w-8 bg-white-2 rounded-full" />
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
