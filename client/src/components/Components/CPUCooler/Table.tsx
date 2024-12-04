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
import { CPUCoolerIcon } from "../../Icons";
import PopupError from "../../PopupError";
import { useGetScreenWidth } from "../../../../src/utils";
import { SortDropdown } from "../../Tables/Sort";
import FilterDropdown from "../../Tables/FilterDropdown";

const checkboxOptions = [
  ["AM5", "AM4", "LGA1700"],
  ["Black", "White"],
];

const radioOptions = [["Yes", "None"]];

export default function CPUCooler() {
  const [cpuCoolerList, setCpuCoolerList] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [error, setError] = useState("");
  const { xxxl, md } = useGetScreenWidth();
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const table = useReactTable({
    data: cpuCoolerList,
    columns: xxxl
      ? [
          {
            accessorKey: "url",
            size: 60,
            cell: (props) => (
              <img
                src={props.getValue()}
                alt="CPU Cooler"
                className="ml-1 h-12 w-12 cursor-pointer object-contain p-0.5"
              />
            ),
            enableSorting: false,
          },
          {
            accessorKey: "name",
            header: "Name",
            size: 475,
            cell: (props) => (
              <p className="cursor-pointer hover:text-blue-300">
                {props.getValue()}
              </p>
            ),
          },
          {
            accessorKey: "rpm",
            header: "RPM",
            size: 200,
            cell: (props) => <p>{props.getValue()} RPM</p>,
          },
          {
            accessorKey: "noise",
            header: "Noise",
            size: 175,
            cell: (props) => <p>{props.getValue()} dB</p>,
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
                      icon={<CPUCoolerIcon styles="h-6 w-6" />}
                    />
                    <SmallButton itemInfo={rowItem} />
                  </div>
                </div>
              );
            },
          },
          {
            accessorKey: "waterCooled",
          },
          {
            accessorKey: "height",
          },
          {
            accessorKey: "color",
            filterFn: "arrIncludesSome",
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
                alt="CPU Cooler"
                className="ml-1 h-12 w-12 cursor-pointer object-contain p-0.5"
              />
            ),
            enableSorting: false,
          },
          {
            accessorKey: "name",
            header: "Name",
            cell: (props) => (
              <p className="cursor-pointer hover:text-blue-300">
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
                  <p>£{props.getValue()}</p>
                  <div className="flex gap-2">
                    <SmallButtonPC
                      setError={setError}
                      error={error}
                      itemInfo={rowItem}
                      icon={<CPUCoolerIcon styles="h-6 w-6" />}
                    />
                    <SmallButton itemInfo={rowItem} />
                  </div>
                </div>
              );
            },
          },
          {
            accessorKey: "rpm",
            header: "RPM",
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">RPM</p>
                <p className="text-sm">{props.getValue()} RPM</p>
              </div>
            ),
          },
          {
            accessorKey: "noise",
            header: "Noise",
            cell: (props) => (
              <div>
                <p className="text-xs text-green-3">Noise</p>
                <p className="text-sm">{props.getValue()} dB</p>
              </div>
            ),
          },
          {
            accessorKey: "waterCooled",
          },
          {
            accessorKey: "height",
          },
          {
            accessorKey: "color",
            filterFn: "arrIncludesSome",
          },
          {
            accessorKey: "_id",
          },
        ],
    initialState: {
      columnVisibility: {
        waterCooled: false,
        height: false,
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
        import.meta.env.VITE_BACKEND_HOST + "/api/components/cpu-cooler",
      );
      const data = await res.json();

      setCpuCoolerList(data);
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
                radioOptions={radioOptions}
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
            radioOptions={radioOptions}
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
