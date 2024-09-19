import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import URLError from "../../URLError";

type RAMItem = {
  name: string;
  modules: number;
  ddr: string;
  ddrSpeed: number;
  fwl: number;
  cl: number;
  color: string;
  price: number;
  pricePerGb: number;
  url: string;
};

export default function RAMItem() {
  const [item, setItem] = useState<RAMItem | null>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/api/components/ram/${id}`);

      if (res.status === 404) setItem(null);
      else {
        const data = await res.json();
        setItem(data);
      }
    })();
  }, [id]);

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <div className="mt-12 grid content-start justify-items-center">
        <div className="text-4xl">{item.name}</div>
        <div className="my-8 grid grid-flow-col content-start justify-center gap-12">
          <div>
            <img src={item.url} alt="GPU" className="h-[12rem] w-[12rem]" />
          </div>
          <div>
            <div className="grid grid-flow-col gap-6">
              <div className="grid content-start gap-0.5">
                <div>Modules</div>
                <div>Type</div>
                <div>Speed</div>
                <div>First word latency</div>
                <div>CAS latency</div>
                <div>Color</div>
              </div>
              <div className="grid content-start gap-0.5">
                <div>{item.modules} GB</div>
                <div>{item.ddr}</div>
                <div>{item.ddrSpeed}</div>
                <div>{item.fwl} ns</div>
                <div>{item.cl}</div>
                <div>{item.color}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid w-[16rem] justify-items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="text-3xl">£{item.price}</div>
            <div className="text-lg">(£{item.pricePerGb} / GB)</div>
          </div>
          <button className="w-full rounded-md bg-green-3 py-3 text-xl text-white-1">
            Add to Cart
          </button>
        </div>
      </div>
    );
}
