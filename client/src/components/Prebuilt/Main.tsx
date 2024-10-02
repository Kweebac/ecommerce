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
    <div className="my-3 grid gap-0.5 text-sm">
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
  let price = 0;
  for (const component in item.components) {
    if (typeof item.components[component] === "object")
      price += item.components[component].price;
  }
  price = Math.round(price * 100) / 100;

  return (
    <Link to={item._id}>
      <div className="card cursor-pointer rounded-xl bg-white-1 p-3 hover:shadow-lg">
        <div className="mb-2 flex rounded-xl">
          <img
            src={item.components.case.url}
            alt="Case"
            className="h-[148px] w-[148px] rounded-xl"
          />
          <div className="grid content-around">
            <img
              src={item.components.gpu.url}
              alt="GPU"
              className="rounded-xl"
            />
            <img
              src={item.components.cpu.url}
              alt="CPU"
              className="rounded-xl"
            />
          </div>
        </div>
        <div className="grid rounded-b-xl p-3">
          <div className="grid h-12 content-center text-center font-[650]">
            {item.name}
          </div>
          <ComponentList item={item} />
          <div className="mt-2 flex items-center justify-end gap-2 border-t border-t-[--background-color] pt-3">
            <div className="font-semibold">£{price}</div>
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
        const res = await fetch("http://localhost:3000/api/prebuilt", {
          signal: abortController.signal,
        });
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
      <div className="cards grid w-[85rem] gap-8">
        {prebuilts.map((prebuilt) => (
          <Card key={prebuilt._id} item={prebuilt} />
        ))}
      </div>
    </main>
  );
}
