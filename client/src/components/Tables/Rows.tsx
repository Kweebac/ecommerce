import { flexRender } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

export default function Rows({ table }) {
  const navigate = useNavigate();

  function attemptNavigate(cell, id = cell.id.split("_")[1]) {
    const cells = cell.row.getAllCells();
    const itemId = cells[cells.length - 1].renderValue();

    if (id === "url" || id === "name") navigate(itemId);
  }

  return (
    <>
      {table.getRowModel().rows.map((row) => (
        <div
          key={row.id}
          className="grid grid-flow-col items-center justify-start border-t border-t-gray-300"
        >
          {row.getVisibleCells().map((cell) => (
            <div
              key={cell.id}
              style={{ width: cell.column.getSize() }}
              onClick={() => attemptNavigate(cell)}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
