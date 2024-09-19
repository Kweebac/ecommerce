import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import URLError from "../../URLError";

type GPUItem = {
  name: string;
  chipset: string;
  memory: number;
  coreClock: number;
  boostClock: number;
  color: string;
  length: number;
  tdp: number;
  price: number;
  url: string;
};

export default function GPUItem() {
  const [item, setItem] = useState<GPUItem | null>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/api/components/gpu/${id}`);

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
                <div>Chipset</div>
                <div>Memory</div>
                <div>Core Clock</div>
                <div>Boost Clock</div>
                <div>Color</div>
                <div>Length</div>
                <div>TDP</div>
              </div>
              <div className="grid content-start gap-0.5">
                <div>{item.chipset}</div>
                <div>{item.memory} GB</div>
                <div>{item.coreClock} MHz</div>
                <div>{item.boostClock} MHz</div>
                <div>{item.color}</div>
                <div>{item.length} mm</div>
                <div>{item.tdp} W</div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid w-[12rem] justify-items-center gap-2">
          <div className="text-3xl">£{item.price}</div>
          <button className="w-full rounded-md bg-green-3 py-3 text-xl text-white-1">
            Add to Cart
          </button>
        </div>
      </div>
    );
}
