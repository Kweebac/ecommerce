import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import URLError from "../../URLError";

type CPUItem = {
  name: string;
  series: string;
  cores: number;
  pCoreClock: number;
  pBoostClock: number;
  integratedGraphics: string;
  socket: string;
  tdp: number;
  price: number;
  url: string;
};

export default function CPUItem() {
  const [item, setItem] = useState<CPUItem | null>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/api/components/cpu/${id}`);

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
                <div>Series</div>
                <div>Cores</div>
                <div>Core clock</div>
                <div>Boost Clock</div>
                <div>Integrated graphics</div>
                <div>Socket</div>
                <div>TDP</div>
              </div>
              <div className="grid content-start gap-0.5">
                <div>{item.series}</div>
                <div>{item.cores} GB</div>
                <div>{item.pCoreClock} MHz</div>
                <div>{item.pBoostClock} MHz</div>
                <div>{item.integratedGraphics}</div>
                <div>{item.socket}</div>
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
