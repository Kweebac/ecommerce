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
import { CustomButton, SmallButton, SmallButtonPC } from "../../Buttons";
import { StorageIcon } from "../../Icons";
import PopupError from "../../PopupError";
import { useGetScreenWidth } from "../../../../src/utils";
import { SortDropdown } from "../../Tables/Sort";
import FilterDropdown from "../../Tables/FilterDropdown";

const checkboxOptions = [["SSD", "HDD 7200 RPM", "HDD 5400 RPM"]];

export default function Storage() {
  const [storageList, setStorageList] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [error, setError] = useState("");
  const { xxxl, md } = useGetScreenWidth();
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const table = useReactTable({
    data: storageList,
    columns: xxxl
      ? [
          {
            accessorKey: "url",
            size: 60,
            cell: (props) => (
              <img
                src={props.getValue()}
                alt="Storage"
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
            accessorKey: "type",
            header: "Type",
            filterFn: "arrIncludesSome",
            size: 175,
          },
          {
            accessorKey: "capacity",
            header: "Capacity",
            filterFn: "inNumberRange",
            size: 130,
            cell: (props) => <p>{props.getValue()} GB</p>,
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
                      icon={<StorageIcon styles="h-6 w-6" />}
                      limit={2}
                    />
                    <SmallButton itemInfo={rowItem} />
                  </div>
                </div>
              );
            },
          },
          {
            accessorKey: "_id",
          },
        ]
      : [
          {
            accessorKey: "url",
            cell: (props) => (
              <img
                src={props.getValue()}
                alt="Storage"
                className="ml-1 h-12 w-12 cursor-pointer object-contain p-0.5"
              />
            ),
            enableSorting: false,
          },
          {
            accessorKey: "name",
            header: "Name",
            cell: (props) => (
              <p className="cursor-pointer hover:text-blue-500">
                {props.getValue()}
              </p>
            ),
          },
          {
            accessorKey: "price",
            header: "Price",
            filterFn: "inNumberRange",
            cell: (props) => {
              const rowItem = props.row.original;

              return (
                <div className="ml-5 grid items-center justify-items-center gap-0.5">
                  <div className="grid justify-items-center">
                    <p>£{props.getValue()}</p>
                    <p className="text-xs">(£{rowItem.pricePerGb} / GB)</p>
                  </div>
                  <div className="flex gap-2">
                    <SmallButtonPC
                      setError={setError}
                      error={error}
                      itemInfo={rowItem}
                      icon={<StorageIcon styles="h-6 w-6" />}
                      limit={2}
                    />
                    <SmallButton itemInfo={rowItem} />
                  </div>
                </div>
              );
            },
          },
          {
            accessorKey: "pricePerGb",
            header: "Price / GB",
            filterFn: "inNumberRange",
          },
          {
            accessorKey: "type",
            header: "Type",
            filterFn: "arrIncludesSome",
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">Type</p>
                <p className="text-sm">{props.getValue()}</p>
              </div>
            ),
          },
          {
            accessorKey: "capacity",
            header: "Capacity",
            filterFn: "inNumberRange",
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">Capacity</p>
                <p className="text-sm">{props.getValue()} GB</p>
              </div>
            ),
          },
          {
            accessorKey: "_id",
          },
        ],
    initialState: {
      columnVisibility: {
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
      const res = await fetch("http://localhost:3000/api/components/storage");
      const data = await res.json();

      setStorageList(data);
    })();
  }, []);

  return (
    <main className="my-8 grid grid-rows-[auto_1fr]">
      <div className="mb-8 grid h-max grid-flow-col justify-items-center">
        {!md && (
          <>
            <CustomButton onClick={() => setFilterDropdownVisible(true)}>
              Filter
            </CustomButton>

            <FilterDropdown
              setDropdownVisible={setFilterDropdownVisible}
              dropdownVisible={filterDropdownVisible}
              table={table}
            >
              <Filter
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                checkboxOptions={checkboxOptions}
              />
            </FilterDropdown>
          </>
        )}
        {!xxxl && (
          <>
            <CustomButton onClick={() => setSortDropdownVisible(true)}>
              Sort
            </CustomButton>

            {sortDropdownVisible && (
              <SortDropdown
                setDropdownVisible={setSortDropdownVisible}
                table={table}
              />
            )}
          </>
        )}
      </div>
      <div className="grid grid-flow-col items-start gap-20 md:grid-cols-[auto_1fr] 3xl:grid-cols-none 3xl:justify-center">
        {error && <PopupError message={error} />}

        {md && (
          <Filter
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            checkboxOptions={checkboxOptions}
          />
        )}

        <section
          style={{
            width: xxxl ? table.getTotalSize() : "100%",
          }}
        >
          {xxxl && <Headers table={table} />}
          <Rows table={table} />
          <Pages table={table} />
        </section>
      </div>
    </main>
  );
}
