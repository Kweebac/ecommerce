import { useEffect, useState } from "react";

function Card({ item }: { item: object }) {
  let price = 0;
  for (const component in item.components) {
    if (typeof item.components[component] === "object")
      price += item.components[component].price;
  }
  price = Math.ceil((price * 100) / 100);

  return (
    <div className="rounded-xl  border-green-3">
      <div className="mb-2 flex rounded-xl">
        <img
          src={item.components.case.url}
          alt="Case"
          className="h-[200px] w-[200px] rounded-xl"
        />
        <div className="grid content-around">
          <img src={item.components.gpu.url} alt="GPU" className="rounded-xl" />
          <img src={item.components.cpu.url} alt="CPU" className="rounded-xl" />
        </div>
      </div>
      <div className="rounded-b-xl bg-green-2 p-3">
        <div>{item.name}</div>
        <div>£{price}</div>
      </div>
    </div>
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
      <div className="cards grid w-[80rem] gap-8">
        {prebuilts.map((prebuilt) => (
          <Card key={prebuilt._id} item={prebuilt} />
        ))}
      </div>
    </main>
  );
}
