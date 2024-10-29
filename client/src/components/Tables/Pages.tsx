// @ts-nocheck

import { LeftArrowIcon, RightArrowIcon } from "../Icons";

export default function Pages({ table }) {
  if (table.getPageCount() > 1)
    return (
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
              <LeftArrowIcon styles="h-8 w-8 bg-white-1 rounded-full" />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <RightArrowIcon styles="h-8 w-8 bg-white-1 rounded-full" />
            </button>
          </div>
        </div>
      </>
    );
}
