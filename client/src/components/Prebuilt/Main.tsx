// @ts-nocheck

import { useEffect, useState } from "react";
import { CPUIcon, GPUIcon, MotherboardIcon, RAMIcon } from "../Icons";
import { Link } from "react-router-dom";

function ComponentItem({ text, children }) {
  return (
    <div className="flex h-[24px] items-center gap-2">
      <div className="grid h-6 w-6 place-content-center">{children}</div>
      <div>{text}</div>
    </div>
  );
}

function ComponentList({ item }: { item: object }) {
  return (
    <div className="my-3 grid gap-0.5 text-[11.5px] sm:text-sm">
      <ComponentItem text={item.components.gpu.chipset}>
        <GPUIcon styles="h-6 w-6" />
      </ComponentItem>
      <ComponentItem text={item.components.cpu.series}>
        <CPUIcon styles="h-5 w-5" />
      </ComponentItem>
      <ComponentItem text={item.components.motherboard.chipset}>
        <MotherboardIcon styles="h-5 w-5" />
      </ComponentItem>
      <ComponentItem
        text={`${item.components.ram.modules} ${item.components.ram.ddr}`}
      >
        <RAMIcon styles="h-6 w-6" />
      </ComponentItem>
    </div>
  );
}

function Card({ item }: { item: object }) {
  return (
    <Link to={item._id}>
      <div className="card w-[172px] cursor-pointer rounded-xl bg-white-1 p-3 hover:shadow-lg sm:w-[250px]">
        <img src={item.url} alt="Prebuilt PC" />
        <div className="grid rounded-b-xl sm:p-3">
          <div className="mb-2 grid h-12 content-center text-center text-sm font-[650] sm:text-base">
            {item.name}
          </div>
          <ComponentList item={item} />
          <div className="mt-2 flex items-center justify-end gap-2 border-t border-t-[--background-color] pt-3">
            <div className="text-sm font-semibold sm:text-base">
              £{item.price}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Prebuilt() {
  const [prebuilts, setPrebuilts] = useState([]);

  useEffect(() => {
    (async () => {
      const abortController = new AbortController();

      try {
        const res = await fetch(
          "https://kweebac-ecommerce-api.up.railway.app/api/prebuilt",
          {
            signal: abortController.signal,
          },
        );
        const data = await res.json();

        setPrebuilts(data);
      } catch (error) {
        console.error(error);
      }

      return () => {
        abortController.abort();
      };
    })();
  }, []);

  return (
    <main className="my-8 grid justify-center">
      <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {prebuilts.map((prebuilt) => (
          <Card key={prebuilt._id} item={prebuilt} />
        ))}
      </div>
    </main>
  );
}
