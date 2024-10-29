// @ts-nocheck

import Sort from "./Sort";

export default function Headers({ table }) {
  return (
    <>
      {table.getHeaderGroups().map((headerGroup) => (
        <div
          key={headerGroup.id}
          className="grid grid-flow-col justify-start py-2 font-semibold text-green-3"
        >
          {headerGroup.headers.map((header) => {
            let headerName = header.column.columnDef.header;
            if (typeof headerName === "function") headerName = undefined;

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
    </>
  );
}
