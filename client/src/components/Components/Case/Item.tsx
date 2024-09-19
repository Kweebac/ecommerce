import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import URLError from "../../URLError";

type CaseItem = {
  name: string;
  type: string;
  motherboardFormFactors: string[];
  color: string;
  maxGpuLength: number;
  dimensions: string;
  price: number;
  url: string;
};

export default function CaseItem() {
  const [item, setItem] = useState<CaseItem | null>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://localhost:3000/api/components/case/${id}`,
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
                <div>Type</div>
                <div>Motherboard form factor</div>
                <div>Color</div>
                <div>Max GPU length</div>
                <div>Dimensions</div>
              </div>
              <div className="grid content-start gap-0.5">
                <div>{item.type}</div>
                <div>{item.motherboardFormFactors.join(", ")}</div>
                <div>{item.color}</div>
                <div>{item.maxGpuLength} mm</div>
                <div>{item.dimensions}</div>
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
