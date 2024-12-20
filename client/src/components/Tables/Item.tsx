// @ts-nocheck

import { ComponentValues } from "@/src/types/Components";
import Button, { ButtonPC } from "../Buttons";
import { useState } from "react";
import PopupError from "../PopupError";

type InfoItemProps = {
  name: string;
  value: string | number | number[];
};

export function InfoItem({ name, value }: InfoItemProps) {
  let arrayLength = 0;
  if (typeof value === "object") {
    arrayLength = value.length;
    value = value.join(", ");
  }

  return (
    <div className="grid max-w-[20rem] content-start rounded-xl bg-white-1 px-3 py-1.5">
      <span className="text-sm font-semibold text-green-3">{name}</span>

      {name === "RAM speeds" && (
        <span
          className={
            arrayLength > 10 ? "text-xs" : arrayLength > 5 ? "text-sm" : ""
          }
        >
          {value}
        </span>
      )}
      {name === "Frame sync" && (
        <span className={arrayLength > 1 ? "text-sm" : ""}>{value}</span>
      )}
      {name !== "RAM speeds" && name !== "Frame sync" && <span>{value}</span>}
    </div>
  );
}

type ItemProps = {
  item: ComponentValues | null | undefined;
  options?: { pricePerGb?: boolean; addToPc?: boolean };
  children?: React.ReactNode;
};

export default function Item({ item, options, children }: ItemProps) {
  const [error, setError] = useState("");

  return (
    <>
      {error && <PopupError PopupError message={error} />}

      <div className="my-8 grid items-start justify-center justify-items-center gap-12 lg:grid-flow-col">
        <div className="rounded-xl bg-white-1">
          <img
            src={item.url}
            alt="GPU"
            className="h-64 w-64 rounded-xl object-contain"
          />
        </div>
        <div className="grid justify-items-center gap-6 lg:justify-items-start">
          <div className="text-center text-3xl font-semibold">{item.name}</div>
          {children && (
            <div className="flex w-[360px] flex-wrap justify-center gap-2 sm:w-[30rem] lg:justify-start">
              {children}
            </div>
          )}
          <div className="grid w-64 justify-items-center gap-3">
            <div className="flex w-full gap-2">
              <Button itemInfo={item} />
              {options?.addToPc && (
                <ButtonPC setError={setError} error={error} itemInfo={item} />
              )}
            </div>
            {options?.pricePerGb ? (
              <div className="flex items-center gap-2">
                <div className="text-3xl">£{item.price}</div>
                <div className="text-lg">(£{item.pricePerGb} / GB)</div>
              </div>
            ) : (
              <div className="text-3xl">£{item.price}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
