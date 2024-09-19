import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import URLError from "../../URLError";

type CPUCoolerItem = {
  name: string;
  rpm: number;
  noise: number;
  cpuSockets: string[];
  color: string;
  waterCooled: string;
  height: number;
  price: number;
  url: string;
};

export default function CPUCoolerItem() {
  const [item, setItem] = useState<CPUCoolerItem | null>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://localhost:3000/api/components/cpu-cooler/${id}`,
      );

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
                <div>RPM</div>
                <div>Noise</div>
                <div>CPU Socket</div>
                <div>Color</div>
                <div>Water cooled</div>
                <div>Height</div>
              </div>
              <div className="grid content-start gap-0.5">
                <div>{item.rpm} RPM</div>
                <div>{item.noise} dB</div>
                <div>{item.cpuSockets.join(", ")}</div>
                <div>{item.color}</div>
                <div>{item.waterCooled}</div>
                <div>{item.height} mm</div>
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
