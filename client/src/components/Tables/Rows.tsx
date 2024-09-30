import { flexRender } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export default function Rows({ table }) {
  return (
    <>
      {table.getRowModel().rows.map((row) => (
        <div
          key={row.id}
          className="grid grid-flow-col items-center justify-start border-t border-t-gray-300"
        >
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Link>
              );
            else
              return (
                <div key={cell.id} style={{ width: cell.column.getSize() }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              );
          })}
        </div>
      ))}
    </>
  );
}
