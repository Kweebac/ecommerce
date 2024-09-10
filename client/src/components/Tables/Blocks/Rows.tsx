import { flexRender } from "@tanstack/react-table";

export default function Rows({ table }) {
  return (
    <>
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
    </>
  );
}
