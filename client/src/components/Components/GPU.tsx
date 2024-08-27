import { useEffect, useState } from "react";

function Sidebar() {
  return <div className="w-40">Sidebar</div>;
}

function Filter() {
  return (
    <tr className="grid grid-flow-col grid-cols-[auto_1fr] items-center justify-items-start gap-8">
      <th className="w-12"></th>
      <th>Name</th>
      <th>Chipset</th>
      <th className="w-[70%]">Memory</th>
      <th>Core clock</th>
      <th>Boost clock</th>
      <th>Price</th>
      <th></th>
    </tr>
  );
}

type ItemProps = {
  gpu: {
    url: string;
    name: string;
    chipset: string;
    memory: number;
    coreClock: number;
    boostClock: number;
    color: string;
    length: number;
    tdp: number;
    price: number;
  };
};

function Item({ gpu }: ItemProps) {
  return (
    <tr className="grid grid-flow-col grid-cols-[auto_1fr] items-center gap-8 border-t border-t-gray-300">
      <td>
        <img src={gpu.url} alt="GPU" className="h-12 w-12 " />
      </td>
      <td>{gpu.name}</td>
      <td>{gpu.chipset}</td>
      <td>{gpu.memory} GB</td>
      <td>{gpu.coreClock} MHz</td>
      <td>{gpu.boostClock} MHz</td>
      <td>£{gpu.price}</td>

      <td>
        <button className="rounded-md bg-green-3 px-2 py-1 text-white-1">
          Add
        </button>
      </td>
    </tr>
  );
}

export default function GPU() {
  const [gpuList, setGPUList] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3000/api/components/gpu");
      const data = await res.json();

      setGPUList(data);
    })();
  }, []);

  return (
    <main className="grid grid-cols-[auto_1fr] gap-8">
      <Sidebar />
      <section>
        <table className="grid w-[50rem]">
          <Filter />
          {gpuList.map((gpuItem, index) => (
            <Item key={index} gpu={gpuItem} />
          ))}
        </table>
      </section>
    </main>
  );
}
