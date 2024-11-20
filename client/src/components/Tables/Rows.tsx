// @ts-nocheck

import { useGetScreenWidth } from "../../../src/utils";
import { flexRender } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export default function Rows({ table }) {
  const { xxxl } = useGetScreenWidth();

  return (
    <div className="mx-2 grid gap-1.5 sm:mx-0 xl:grid-cols-2 3xl:grid-cols-1">
      {table.getRowModel().rows.map((row) => (
        <div
          key={row.id}
          className="grid w-full grid-cols-1 items-center justify-start rounded-3xl bg-white-1 p-2 sm:mx-0 sm:rounded-xl 3xl:w-max 3xl:grid-flow-col 3xl:p-0"
        >
          {xxxl ? (
            <>
              {row.getVisibleCells().map((cell) => {
                const cells = cell.row.getAllCells();
                const url = cells[cells.length - 1].renderValue();

                const id = cell.id.split("_")[1];

                if (id === "name" || id === "url")
                  return (
                    <Link
                      to={url}
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Link>
                  );
                else
                  return (
                    <div key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </div>
                  );
              })}
            </>
          ) : (
            <div className="grid gap-5 self-start">
              <div className="grid w-full grid-flow-col grid-cols-[auto_1fr_auto] gap-1">
                {row
                  .getVisibleCells()
                  .slice(0, 3)
                  .map((cell) => {
                    const cells = cell.row.getAllCells();
                    const url = cells[cells.length - 1].renderValue();

                    const id = cell.id.split("_")[1];

                    if (id === "name" || id === "url")
                      return (
                        <div key={cell.id} className="grid content-center">
                          <Link to={url} key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </Link>
                        </div>
                      );
                    else
                      return (
                        <div key={cell.id} className="grid content-center">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </div>
                      );
                  })}
              </div>
              {row.getVisibleCells().length > 3 && (
                <div className="flex w-full flex-wrap justify-start gap-3">
                  {row
                    .getVisibleCells()
                    .slice(3)
                    .map((cell) => {
                      if (cell.column.id === "pricePerGb") return;

                      return (
                        <div
                          key={cell.id}
                          className="rounded-lg bg-[--background-color] px-2 py-1 shadow-sm"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
